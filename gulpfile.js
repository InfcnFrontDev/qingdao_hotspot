'use strict';

const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const bsReload = browserSync.reload;

const uglify = require('gulp-uglify');

const postcss = require('gulp-postcss'); //postcss本身
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const watch = require('gulp-watch');

gulp.task('clean', function () {
});

gulp.task('dev', function () {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*"],
        server: {
            baseDir: 'app'
        },
        open: false,
        notify: true
    });
});

gulp.task('build', function () {
});


gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))//nested, compact, expanded, compressed
        .pipe(postcss([autoprefixer({browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 10%']})]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});