var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    sass    = require('gulp-sass');

gulp.task('build-css', function() {
   return gulp.src('source/scss/**/*.scss')
});

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
    return gulp.src('source/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch('source/scripts/**/*.js', ['jshint']);
});