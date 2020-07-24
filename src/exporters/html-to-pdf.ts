import fs from "fs";
import path from "path";
import puppeteer, { Browser, PDFFormat } from "puppeteer";
import { v4 as uuidv4 } from "uuid";

import { PdfOptions } from "./types";

export class Html2Pdf {
  private _browser: Browser;
  private _options: PdfOptions;

  constructor(options?: PdfOptions) {
    this._options = options || {
      format: "A4" as PDFFormat,
      headerTemplate:
        '<p style="font-size:10px !important; color:#808080; padding-left:10px">Html to pdf</p>',
      footerTemplate:
        '<p style="font-size:10px !important; color:#808080; padding-left:10px">Luong Phung @2020</p>',
      displayHeaderFooter: true,
      margin: {
        top: "100px",
        bottom: "200px",
        right: "30px",
        left: "30px",
      },
      //   printBackground: true,
      path: "data.pdf",
    };
  }

  async _initBrowser(): Promise<void> {
    this._browser = await puppeteer.launch({
      args: ["--no-sandbox", "--mute-audio"],
      headless: true,
      defaultViewport: null,
    });
  }

  async createPdf(html: string): Promise<Buffer> {
    // ignore save file
    this._options.path = null;

    if (this._browser == null) {
      await this._initBrowser();
    }

    // write temp unique file
    const tmpPath = path.resolve(`${uuidv4()}.html`);
    const writer = fs.createWriteStream(tmpPath);
    writer.write(html);
    writer.close();

    const $page = await this._browser.newPage();
    await $page.emulateMediaType("screen");
    await $page.goto(`file://${tmpPath}`, {
      waitUntil: "networkidle0",
    });

    const buffer = await $page.pdf(this._options);

    // remove temp file
    fs.unlinkSync(tmpPath);

    return buffer;
  }

  release() {
    if (this._browser != null) {
      this._browser.close();
      delete this._browser;
    }
  }
}

export function html2Pdf(html: string) {}
