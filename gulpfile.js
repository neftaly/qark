"use strict";


var gulp = require("gulp"),
    gutil = require("gulp-util"),
    eslint = require("gulp-eslint"),

    //sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    minifyCss = require("gulp-minify-css"),
    browserify = require("browserify"),
    collapse = require("bundle-collapser/plugin"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify");

var bundler;


/**
 * Main tasks
 */

gulp.task("default", ["lint"]);
gulp.task("build", ["html", "scss", "js"]);


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


/**
 * Build HTML
 */

gulp.task("html", function () {
    return gulp.src("./src/resources/index.html")
        .pipe(gulp.dest("./docs"));
});


/**
 * Build CSS
 */

gulp.task("scss", function () {
    //return gulp.src("./src/**/*.scss")
    return gulp.src("./src/**/*.css")
        //.pipe(sourcemaps.init())
        //.pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(concat("app.min.css"))
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./docs"));
});


/**
 * Build Browserified JS
 */

gulp.task("js", bundleJs);

function bundleJs () {
    return bundler.bundle()
        .on("error", gutil.log.bind(gutil, "Browserify Error"))
        .pipe(source("app.min.js"))
        .pipe(buffer())
        //.pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        //.pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./docs"));
}

bundler = browserify(["./src/index.js"], {
    fullPaths: false,
    extensions: [
        ".js",
        ".jsx"
    ]
})
    .transform("babelify")
    .transform("brfs")
    .plugin(collapse)
    .on("log", gutil.log);
