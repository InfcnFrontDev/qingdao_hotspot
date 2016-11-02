'use strict';
const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const watchPath = require('gulp-watch-path');
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
const jade = require('gulp-jade');
const htmlBeautify = require('gulp-html-beautify');

// webpack
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

// clean, dev, build
gulp.task('clean', function () {
});
gulp.task('dev', function () {
    runSequence(['sass', 'es6', 'js', 'jade', 'images', 'vendor'], ['sass:watch', 'es6:watch', 'js:watch', 'jade:watch', 'images:watch', 'vendor:watch'], 'server')
});
gulp.task('build', function () {
    runSequence(['sass', 'es6', 'js', 'jade', 'images', 'vendor'])
});

// server
gulp.task('server', function () {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*"],
        server: {
            baseDir: 'app/'
        },
        open: false,
        notify: true
    });
});

// jade
gulp.task('jade', function () {
    compileJade('src/jade/*.jade', 'app/')
});
gulp.task('jade:watch', function () {
    gulp.watch('src/jade/*/**/*.jade', ['jade']);
    watch('src/jade/*.jade', function (event) {
        var paths = watchPath(event, 'src/jade/', 'app/');
        compileJade(paths.srcPath, paths.distDir);
    });
});
function compileJade(srcPath, destPath) {
    gulp.src(srcPath)
        .pipe(jade())
        .on('error', function (err) {
            console.error(err);
            this.end()
        })
        .pipe(htmlBeautify({
            indent_size: 4,
            indent_char: ' ',
            unformatted: false,// 这里是关键，可以让一个标签独占一行
            extra_liners: []// 默认情况下，body | head 标签前会有一行空格
        }))
        .pipe(gulp.dest(destPath));
}

// sass
gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //nested, compact, expanded, compressed
        .pipe(postcss([autoprefixer({browsers: ['last 2 version', '> 10%']})]))
        .pipe(concat('all.css'))
        .pipe(minifycss({
            keepBreaks: true,
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest('app/css/'));
});
gulp.task('sass:watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

// es6
gulp.task('es6', function () {
    return gulp.src('src/es6/*.js')
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .on('error', function (err) {
            console.error(err);
            this.end()
        })
        .pipe(gulp.dest('app/js/'));
});
gulp.task('es6:watch', function () {
    gulp.watch('src/es6/**/*.{vue,js}', ['es6']);
});

// js
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('app/js/'));
});
gulp.task('js:watch', function () {
    watch('src/js/**/*.js', function (event) {
        var paths = watchPath(event, 'src/js/', 'app/js/');
        return gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});

// images
gulp.task('images', function () {
    return gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('app/images/'));
});
gulp.task('images:watch', function () {
    watch('src/images/**/*.*', function (event) {
        var paths = watchPath(event, 'src/images/', 'app/images/');
        return gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});

// vendor
gulp.task('vendor', function () {
    return gulp.src('src/vendor/**/*.*')
        .pipe(gulp.dest('app/vendor/'));
});
gulp.task('vendor:watch', function () {
    watch('src/vendor/**/*.*', function (event) {
        var paths = watchPath(event, 'src/vendor/', 'app/vendor/');
        return gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});

// views
gulp.task('views', function () {
    return gulp.src('src/views/**/*.*')
        .pipe(gulp.dest('app/'));
});
gulp.task('views:watch', function () {
    watch('src/views/**/*.*', function (event) {
        var paths = watchPath(event, 'src/views/', 'app/');
        return gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});