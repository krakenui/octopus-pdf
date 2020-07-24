import fs from "fs";
import path from "path";

import { HtmlReport, ReportOptions } from "../src";

const users = [
  {
    name: "Duy Lương",
  },
  {
    name: "Jasmine",
  },
];

const reportOptions: ReportOptions = {
  title: "Test report with chartjs",
  useChartJs: true,
  pdfOptions: {
    margin: {
      top: "100px",
      bottom: "200px",
      right: "30px",
      left: "30px",
    },
  },
  template: path.resolve("./__test__/templates/template.ejs"),
  headerTemplate: path.resolve("./__test__/templates/header.ejs"),
  footerTemplate: path.resolve("./__test__/templates/footer.ejs"),
  styles: [path.resolve("./__test__/templates/styles.css")],
  scripts: [
    path.resolve("./__test__/templates/utils.js"),
    path.resolve("./__test__/templates/index.js"),
  ],
  data: {
    users,
    title: "Test report with chartjs",
    author: "Duy Lương",
    time: "2020",
  },
};

(async () => {
  const start = Date.now();
  const htmlReport = new HtmlReport();
  const reportPdf = await htmlReport.createPdf(reportOptions);
  const savePath = path.resolve("./__test__/chartjs_report.pdf");
  fs.writeFileSync(savePath, reportPdf, "binary");
  console.log("Execution time", Date.now() - start, "ms");

  process.exit(0);
})();
