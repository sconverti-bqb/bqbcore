var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('styles', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/scss/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'serve']);
