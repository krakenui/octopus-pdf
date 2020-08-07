import { ParserData, ParserOptions } from "./types";
export declare class HtmlParser {
    private _options;
    constructor(options?: ParserOptions);
    parse(template: string, data: ParserData): Promise<string>;
}
