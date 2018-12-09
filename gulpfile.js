var gulp = require('gulp');
var minCcss = require('gulp-clean-css');
var sass = require('gulp-sass');
var server = require('gulp-webserver');

gulp.task('devScss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minCcss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            proxies: [{
                source: '/users',
                target: 'http://localhost:3000/users'
            }]
        }))
})

gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.series('devScss'))
})

gulp.task('default', gulp.series('server', 'watch'))