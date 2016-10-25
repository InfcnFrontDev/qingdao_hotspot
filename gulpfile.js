'use strict';
const path = require('path');
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const del = require('del');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const bsReload = browserSync.reload;
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');

var webpackConfig = {
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        alias: {
            common: path.join(__dirname, "src/common"),
            static: path.join(__dirname, "src/static")
        },
        extensions: ['', '.js', '.vue', '.scss', '.css']
    },
    output: {
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '[id].js?[hash]'
    },
    module: {
        noParse: [/vue.js/],
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'images/[name].[ext]?[hash:10]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [],
    babel: { //配置babel
        "presets": ["es2015", 'stage-2'],
        "plugins": ["transform-runtime"]
    }
};

// dev
gulp.task('dev', function () {
    runSequence(['sass', 'es6'], ['sass:watch', 'es6:watch'], 'server')
});

// build
gulp.task('build', function () {
    runSequence(['sass', 'es6'], ['js:build', 'css:build'])
});

gulp.task('server', function () {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*", "!app/**/*.*__"],
        server: {
            baseDir: 'app'
        },
        open: false,
        notify: true
    });
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //nested, compact, expanded, compressed
        .pipe(postcss([autoprefixer({browsers: ['last 2 version', '> 10%']})]))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('es6', function () {
    return gulp.src('./src/*.js')
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .on('error', function (err) {
            this.end()
        })
        .pipe(gulp.dest('./app/js'));
});

gulp.task('es6:watch', function () {
    gulp.watch('./src/**/*.{vue,js}', ['es6']);
});

gulp.task('js:build', function () {
    gulp.src(['./app/js/**/*.js', '!./app/js/**/*-min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'));
});

gulp.task('css:build', function () {
    gulp.src(['./app/css/**/*.css', '!./app/css/**/*-min.css'])
        .pipe(minifycss())
        .pipe(gulp.dest('./app/css'));
});