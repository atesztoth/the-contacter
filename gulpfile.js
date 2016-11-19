'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var uglifycss = require('gulp-uglifycss');

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
        'public/assets/sass/**/*.scss',
        '!public/assets/less/**/_*.scss']) // We are not compiling files starting with an underscore! I treat them internal files.
        .pipe(sass({
            style: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass:cmp']);
});

gulp.task('compress:css', ['sass:cmp'], function () {
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

gulp.task('say:finished', ['compress:css'], function () {
    console.log('Installing finished, ready to roll!');
});

gulp.task('say:start', function () {
    console.log('Hello! Getting the frontend ready...');
});

gulp.task('deploy', ['say:start'], function () {
    gulp.start('say:finished');
});