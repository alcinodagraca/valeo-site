"use strict";

const { src, dest, watch, series, parallel } = require('gulp');
const plumber                 = require('gulp-plumber');
const browserSync             = require('browser-sync').create();
const less                    = require('gulp-less');
const rename                  = require("gulp-rename");
const autoprefixer            = require('gulp-autoprefixer');
const minifyCSS               = require('gulp-csso');

//Tasks 


// Static Server + watching scss/html files
function server() {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    port: 3000
  })
}

//html task
function html() {
    return src('app/**/*.html')
      .pipe(plumber())
      .pipe(dest('app/public'));
  }

//compile less into css 
function styles() {
  //where are my less files
  return src('app/assets/styles/**/*.less', 'app/assets/styles/*.less')
      //Until compile, it will:
      //rename the file
      .pipe(rename({ suffix: ".min" }))
      //avoid errors
      .pipe(plumber())
      //compile less into css
      .pipe(less())
      //auto prefix
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
     }))
     //minify the css file
      //.pipe(minifyCSS())
      //alocate the CSS file to the public folder
      .pipe(dest('app/public/styles'))
      //Stream changes to all browsers
      .pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
  watch("app/assets/styles/**/*.less", styles);
  watch("app/**/*.html").on('change', browserSync.reload);
}

//const build = series(clean, gulp.parallel(css, images, jekyll, js));
const watcher = parallel(server, watchFiles);

exports.styles = styles;
exports.server = server;
exports.html = html;
exports.watchFiles = watcher;

 