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
export declare class HtmlReport {
    private _parser;
    createPdf(options: ReportOptions): Promise<Buffer>;
    _$loadReportTemplate(data: any, absoluteTemplateUrl: any, rawTemplate?: any): Promise<string>;
    _$loadReportStyles({ styles }: {
        styles: any;
    }): Promise<any>;
    _$loadReportScripts({ scripts }: {
        scripts: any;
    }): Promise<any>;
}
