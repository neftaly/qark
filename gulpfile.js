"use strict";


var gulp = require("gulp"),
    eslint = require("gulp-eslint");

gulp.task("default", ["lint"]);


/**
 * Lint JS
 */

gulp.task("lint", function () {
    return gulp.src([
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./gulpfile.js",
        "./webpack.config.js",
        "./server.js"
    ])
        .pipe(eslint())
        .pipe(eslint.format());
        //.pipe(eslint.failOnError());
});
