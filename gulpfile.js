var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");
const bom = require('gulp-bom');

gulp.task('styles', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(bom())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('minify', function() {
  return gulp.src('./home.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true, removeAttributeQuotes: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(bom())
    .pipe(gulp.dest('./'));
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/scss/*.scss', ['styles']);
  gulp.watch('./**/*.html', ['minify']).on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'minify', 'serve']);
