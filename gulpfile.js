const gulp = require("gulp");
const fs = require("fs");
const path = require("path");

const destDir = "./dist";

gulp.task("bundle", (done) => {
  gulp.src(["*.md", "package.json"]).pipe(gulp.dest(destDir));
  gulp.src(["themes/**/*"]).pipe(gulp.dest(path.resolve(destDir, "themes")));
  gulp
    .src(["__test__/templates/*"])
    .pipe(gulp.dest(path.resolve(destDir, "__test__/templates")));

  gulp.src(["dist/src/**/*"]).pipe(gulp.dest("dist/lib"));

  done();
});
