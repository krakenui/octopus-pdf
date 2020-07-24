import fs from "fs";
import path from "path";

import { Html2Pdf, PdfOptions } from "./exporters";
import { HtmlParser, ParserData, ReportData } from "./parsers";

export * from "./exporters";
export * from "./parsers";

export interface ReportOptions {
  title: string;

  useChartJs: boolean;

  pdfOptions?: PdfOptions;
  /**
   * template file path
   */
  template: string;
  /**
   * template file path
   */
  footerTemplate?: string;
  /**
   * template file path
   */
  headerTemplate?: string;
  /**
   * style files path
   */
  styles: string[];
  /**
   * script files path
   */
  scripts: string[];

  data: ReportData;
}

export class HtmlReport {
  private _parser = new HtmlParser();

  async createPdf(options: ReportOptions): Promise<Buffer> {
    const pageContent = await this._$loadReportTemplate(options);
    let styles = options.styles;
    let scripts = options.scripts;

    if (options.useChartJs) {
      styles = [path.resolve("./themes/chartjs/chart.css"), ...styles];
      scripts = [path.resolve("./themes/chartjs/chart.js"), ...scripts];
    }

    const pageStyles = await this._$loadReportStyles({ styles });
    const pageScripts = await this._$loadReportScripts({ scripts });

    const reportData: ParserData = {
      title: options.title,
      styles: pageStyles,
      scripts: pageScripts,
      content: pageContent,
    };

    const reportTemplatePath = path.resolve("./themes/default.ejs");
    const reportTemplate = fs
      .readFileSync(reportTemplatePath)
      .toString("utf-8");
    const reportHtml = await this._parser.parse(reportTemplate, reportData);

    let headerTemplate = null;
    let footerTemplate = null;
    if (options.headerTemplate != null) {
      headerTemplate = await this._$loadReportTemplate({
        data: options.data,
        template: options.headerTemplate,
      });
    }

    if (options.footerTemplate != null) {
      footerTemplate = await this._$loadReportTemplate({
        data: options.data,
        template: options.footerTemplate,
      });
    }

    const pdfOptions = options.pdfOptions || {};
    pdfOptions.headerTemplate = headerTemplate || "";
    pdfOptions.footerTemplate = footerTemplate || "";
    pdfOptions.displayHeaderFooter =
      headerTemplate != null || footerTemplate != null;

    const html2Pdf = new Html2Pdf(pdfOptions);

    return html2Pdf.createPdf(reportHtml);
  }

  async _$loadReportTemplate({
    data,
    template: absoluteTemplateUrl,
  }): Promise<string> {
    const templateUrl = path.resolve(absoluteTemplateUrl);
    if (!fs.existsSync(templateUrl)) {
      throw new Error("Template url is invalid");
    }

    const template = fs.readFileSync(templateUrl);
    if (template == null) {
      throw new Error("Template is empty");
    }

    const templateStr = template.toString("utf-8");
    const contentData: ParserData = {
      ...data,
      scripts: [],
      styles: [],
    };

    return this._parser.parse(templateStr, contentData);
  }

  async _$loadReportStyles({ styles }) {
    return styles
      .map((p) => {
        p = path.resolve(p);
        const style = fs.readFileSync(p);

        if (style != null && style.length > 0) {
          return style.toString("utf-8");
        }

        return null;
      })
      .filter((s) => s != null);
  }

  async _$loadReportScripts({ scripts }) {
    return scripts
      .map((p) => {
        p = path.resolve(p);
        const script = fs.readFileSync(p);

        if (script != null && script.length > 0) {
          return script.toString("utf-8");
        }

        return null;
      })
      .filter((s) => s != null);
  }
}
