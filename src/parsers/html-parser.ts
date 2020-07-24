import ejs from "ejs";

import { ParserData, ParserOptions } from "./types";

export class HtmlParser {
  private _options: ParserOptions;

  constructor(options?: ParserOptions) {
    this._options = options || {
      async: true,
    };
  }

  async parse(template: string, data: ParserData): Promise<string> {
    // alway parse async
    this._options.async = true;
    const styles = data.styles.map((s) => {
      return `<style>${s}</style>`;
    });
    const scripts = data.scripts.map((s) => {
      return `<script>${s}</script>`;
    });

    data.styles = styles;
    data.scripts = scripts;

    return ejs.render(template, data, this._options);
  }
}
