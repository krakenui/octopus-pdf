/// <reference types="node" />
import { PdfOptions } from "./exporters";
import { ReportData } from "./parsers";
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
export declare class HtmlReport {
    private _parser;
    createPdf(options: ReportOptions): Promise<Buffer>;
    _$loadReportTemplate({ data, template: absoluteTemplateUrl, }: {
        data: any;
        template: any;
    }): Promise<string>;
    _$loadReportStyles({ styles }: {
        styles: any;
    }): Promise<any>;
    _$loadReportScripts({ scripts }: {
        scripts: any;
    }): Promise<any>;
}
