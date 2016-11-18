'use strict'

var gulp = require('gulp');
var gulpLess = require('gulp-less');
var bower = require('gulp-bower');

gulp.task('cmp-less', function () {
    return gulp.src([
        'public/assets/less/**/*.less',
        '!public/assets/less/**/nocmp_*.less'])
        .pipe(gulpLess()) // Converts Less to CSS with gulp-less
        .pipe(gulp.dest('public/assets/css'))
});

gulp.task('bower-install', function () {
    return bower();
});

gulp.task('asset-watch', function () {
    gulp.watch('public/assets/less/**/*.less', ['cmp-less']);
    // Other watchers
})