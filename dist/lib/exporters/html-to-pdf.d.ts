/// <reference types="node" />
import { PdfOptions } from "./types";
export declare class Html2Pdf {
    private _browser;
    private _options;
    constructor(options?: PdfOptions);
    _initBrowser(): Promise<void>;
    createPdf(html: string): Promise<Buffer>;
    release(): void;
}
export declare function html2Pdf(html: string): void;
