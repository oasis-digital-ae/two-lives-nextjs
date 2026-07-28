const { src, dest, series, watch } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const rename = require("gulp-rename");

const paths = {
  css: "demos/lawyer/twolives.css",
  js: "js/main.js",
};

function minifyCss() {
  return src(paths.css, { allowEmpty: false })
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("demos/lawyer"));
}

function minifyJs() {
  return src(paths.js, { allowEmpty: false })
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("js"));
}

function watchAssets() {
  watch(paths.css, minifyCss);
  watch(paths.js, minifyJs);
}

const minifyAssets = series(minifyCss, minifyJs);

exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
exports["minify-assets"] = minifyAssets;
exports["watch-assets"] = watchAssets;
exports.default = minifyAssets;
