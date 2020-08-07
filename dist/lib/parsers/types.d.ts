import { Options } from "ejs";
export interface ParserData {
    scripts: string[];
    styles: string[];
    [name: string]: any;
}
export interface ReportData {
    [name: string]: any;
}
export interface ParserOptions extends Options {
}
