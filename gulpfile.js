'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let bower = require('gulp-bower');
let uglifycss = require('gulp-uglifycss');

// gulp.task('cmp-less', function () {
//     return gulp.src([
//         'public/assets/less/**/*.less',
//         '!public/assets/less/**/nocmp_*.less'])
//         .pipe(gulpLess()) // Converts Less to CSS with gulp-less
//         .pipe(gulp.dest('public/assets/css'))
// });

// I switched from less to sass because of Foundation.
// Anyway, I just wanted to try out sass.

gulp.task('default', function () {
    console.log('Hello! Check gulpfile for available commands!');
});

gulp.task('sass:cmp', function () {
    return gulp.src([
        'resources/sass/**/*.scss'
    ]).pipe(sass({
        style: 'expanded'
    }).on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
});

// It was a bad idea... :/
// gulp.task('sass:cmp:assets', function () {
//     return gulp.src([
//         'public/bower/foundation-sites/assets/foundation.scss',
//         'public/bower/font-awesome/scss/font-awesome.scss'
//         ])
//         .pipe(sass({}))
//         .pipe(gulp.dest('public/assets/css'));
// });

gulp.task('sass:cmp:all', function () {
    return gulp.src([
        'resources/sass/**/*.scss'])
        .pipe(sass({
            style: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
});


gulp.task('sass:watch', function () {
    gulp.watch('resources/sass/**/*.scss', ['sass:cmp:all']);
});

gulp.task('compress:css', ['sass:cmp:all'], function () {
    gulp.src('public/assets/css/**/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('bower:install', function () {
    return bower();
});

gulp.task('full-compress:css', ['sass:cmp:assets'], function () {
    gulp.start('compress:css');
});

gulp.task('deploy:process:cmp', ['bower:install'], function () {
    gulp.start('full-compress:css');
});

gulp.task('deploy', function () {
    gulp.start('deploy:process:cmp');
});