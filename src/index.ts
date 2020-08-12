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
  template?: string;
  /**
   * template raw text
   */
  rawTemplate?: string;
  /**
   * template file path
   */
  footerTemplate?: string;
  /**
   * template file path
   */
  rawFooterTemplate?: string;
  /**
   * template file path
   */
  headerTemplate?: string;
  /**
   * template raw text
   */
  rawHeaderTemplate?: string;
  /**
   * style files path
   */
  styles?: string[];
  /**
   * style raw text
   */
  rawStyles?: string[];
  /**
   * script files path
   */
  scripts?: string[];
  /**
   * script raw text
   */
  rawScripts?: string[];

  data: ReportData;
}

export class HtmlReport {
  private _parser = new HtmlParser();

  async createPdf(options: ReportOptions): Promise<Buffer> {
    let {
      data,
      template,
      rawTemplate,
      styles,
      rawStyles,
      scripts,
      rawScripts,
      headerTemplate,
      rawHeaderTemplate,
      footerTemplate,
      rawFooterTemplate,
    } = options;

    let defaultScripts = [];

    if (options.useChartJs) {
      styles = [
        path.resolve(__dirname, "../themes/chartjs/chart.css"),
        ...styles,
      ];
      defaultScripts = [path.resolve(__dirname, "../themes/chartjs/chart.js")];
    }

    //  load default resources
    const pageDefaultScripts = await this._$loadReportScripts({
      scripts: defaultScripts,
    });

    // load page resources
    const pageContent = await this._$loadReportTemplate(
      data,
      template,
      rawTemplate
    );
    const pageStyles = rawStyles || (await this._$loadReportStyles({ styles }));
    const pageScripts =
      rawScripts || (await this._$loadReportScripts({ scripts }));
    const reportData: ParserData = {
      title: options.title,
      styles: pageStyles,
      scripts: pageScripts,
      defaultScripts: pageDefaultScripts,
      content: pageContent,
    };

    // load report theme
    const reportTemplatePath = path.resolve(__dirname, "../themes/default.ejs");
    const reportTemplate = fs
      .readFileSync(reportTemplatePath)
      .toString("utf-8");
    const reportHtml = await this._parser.parse(reportTemplate, reportData);

    headerTemplate = await this._$loadReportTemplate(
      data,
      headerTemplate,
      rawHeaderTemplate
    );
    footerTemplate = await this._$loadReportTemplate(
      data,
      footerTemplate,
      rawFooterTemplate
    );

    const pdfOptions = options.pdfOptions || {};
    pdfOptions.headerTemplate = headerTemplate || "";
    pdfOptions.footerTemplate = footerTemplate || "";
    pdfOptions.displayHeaderFooter =
      headerTemplate != null || footerTemplate != null;

    const html2Pdf = new Html2Pdf(pdfOptions);

    return html2Pdf.createPdf(reportHtml);
  }

  async _$loadReportTemplate(
    data,
    absoluteTemplateUrl,
    rawTemplate = null
  ): Promise<string> {
    if (rawTemplate == null) {
      const templateUrl = path.resolve(absoluteTemplateUrl);
      if (!fs.existsSync(templateUrl)) {
        throw new Error("Template url is invalid");
      }

      const template = fs.readFileSync(templateUrl);
      if (template == null) {
        throw new Error("Template is empty");
      }

      rawTemplate = template.toString("utf-8");
    }

    const contentData: ParserData = {
      ...data,
      scripts: [],
      defaultScripts: [],
      styles: [],
    };

    return this._parser.parse(rawTemplate, contentData);
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
