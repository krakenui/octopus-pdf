"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlReport = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var exporters_1 = require("./exporters");
var parsers_1 = require("./parsers");
__exportStar(require("./exporters"), exports);
__exportStar(require("./parsers"), exports);
var HtmlReport = /** @class */ (function () {
    function HtmlReport() {
        this._parser = new parsers_1.HtmlParser();
    }
    HtmlReport.prototype.createPdf = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, template, rawTemplate, styles, rawStyles, scripts, rawScripts, headerTemplate, rawHeaderTemplate, footerTemplate, rawFooterTemplate, defaultScripts, defaultStyles, pageDefaultScripts, pageDefaultStyles, pageContent, pageStyles, _a, pageScripts, _b, reportData, reportTemplatePath, reportTemplate, reportHtml, pdfOptions, html2Pdf;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = options.data, template = options.template, rawTemplate = options.rawTemplate, styles = options.styles, rawStyles = options.rawStyles, scripts = options.scripts, rawScripts = options.rawScripts, headerTemplate = options.headerTemplate, rawHeaderTemplate = options.rawHeaderTemplate, footerTemplate = options.footerTemplate, rawFooterTemplate = options.rawFooterTemplate;
                        defaultScripts = [];
                        defaultStyles = [];
                        if (options.useChartJs) {
                            defaultStyles = [path_1.default.resolve(__dirname, "../themes/chartjs/chart.css")];
                            defaultScripts = [path_1.default.resolve(__dirname, "../themes/chartjs/chart.js")];
                        }
                        return [4 /*yield*/, this._$loadReportScripts({
                                scripts: defaultScripts,
                            })];
                    case 1:
                        pageDefaultScripts = _c.sent();
                        return [4 /*yield*/, this._$loadReportStyles({
                                styles: defaultStyles,
                            })];
                    case 2:
                        pageDefaultStyles = _c.sent();
                        return [4 /*yield*/, this._$loadReportTemplate(data, template, rawTemplate)];
                    case 3:
                        pageContent = _c.sent();
                        _a = rawStyles;
                        if (_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._$loadReportStyles({ styles: styles })];
                    case 4:
                        _a = (_c.sent());
                        _c.label = 5;
                    case 5:
                        pageStyles = _a;
                        _b = rawScripts;
                        if (_b) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._$loadReportScripts({ scripts: scripts })];
                    case 6:
                        _b = (_c.sent());
                        _c.label = 7;
                    case 7:
                        pageScripts = _b;
                        reportData = {
                            title: options.title,
                            styles: pageStyles,
                            scripts: pageScripts,
                            defaultScripts: pageDefaultScripts,
                            defaultStyles: pageDefaultStyles,
                            content: pageContent,
                        };
                        reportTemplatePath = path_1.default.resolve(__dirname, "../themes/default.ejs");
                        reportTemplate = fs_1.default
                            .readFileSync(reportTemplatePath)
                            .toString("utf-8");
                        return [4 /*yield*/, this._parser.parse(reportTemplate, reportData)];
                    case 8:
                        reportHtml = _c.sent();
                        return [4 /*yield*/, this._$loadReportTemplate(data, headerTemplate, rawHeaderTemplate)];
                    case 9:
                        headerTemplate = _c.sent();
                        return [4 /*yield*/, this._$loadReportTemplate(data, footerTemplate, rawFooterTemplate)];
                    case 10:
                        footerTemplate = _c.sent();
                        pdfOptions = options.pdfOptions || {};
                        pdfOptions.headerTemplate = headerTemplate || "";
                        pdfOptions.footerTemplate = footerTemplate || "";
                        pdfOptions.displayHeaderFooter =
                            headerTemplate != null || footerTemplate != null;
                        html2Pdf = new exporters_1.Html2Pdf(pdfOptions);
                        return [2 /*return*/, html2Pdf.createPdf(reportHtml)];
                }
            });
        });
    };
    HtmlReport.prototype._$loadReportTemplate = function (data, absoluteTemplateUrl, rawTemplate) {
        if (rawTemplate === void 0) { rawTemplate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var templateUrl, template, contentData;
            return __generator(this, function (_a) {
                if (rawTemplate == null) {
                    templateUrl = path_1.default.resolve(absoluteTemplateUrl);
                    if (!fs_1.default.existsSync(templateUrl)) {
                        throw new Error("Template url is invalid");
                    }
                    template = fs_1.default.readFileSync(templateUrl);
                    if (template == null) {
                        throw new Error("Template is empty");
                    }
                    rawTemplate = template.toString("utf-8");
                }
                contentData = __assign(__assign({}, data), { scripts: [], defaultScripts: [], defaultStyles: [], styles: [] });
                return [2 /*return*/, this._parser.parse(rawTemplate, contentData)];
            });
        });
    };
    HtmlReport.prototype._$loadReportStyles = function (_a) {
        var styles = _a.styles;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, styles
                        .map(function (p) {
                        p = path_1.default.resolve(p);
                        var style = fs_1.default.readFileSync(p);
                        if (style != null && style.length > 0) {
                            return style.toString("utf-8");
                        }
                        return null;
                    })
                        .filter(function (s) { return s != null; })];
            });
        });
    };
    HtmlReport.prototype._$loadReportScripts = function (_a) {
        var scripts = _a.scripts;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, scripts
                        .map(function (p) {
                        p = path_1.default.resolve(p);
                        var script = fs_1.default.readFileSync(p);
                        if (script != null && script.length > 0) {
                            return script.toString("utf-8");
                        }
                        return null;
                    })
                        .filter(function (s) { return s != null; })];
            });
        });
    };
    return HtmlReport;
}());
exports.HtmlReport = HtmlReport;
//# sourceMappingURL=index.js.map