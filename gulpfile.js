var gulp    = require('gulp'),
    babel   = require('gulp-babel'),
    clean   = require('gulp-clean'),
    jshint  = require('gulp-jshint'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    imgmin  = require('gulp-imagemin');

var bases   = {
                app: 'app/',
                dist: 'dist/'
              };

var paths   = {
                scripts:  ['scripts/**/*.js'],
                styles:   ['styles/**/*.css'],
                html:     ['index.html', '404.html'],
                images:   ['images/**/*.png']
                // libs:     ['scripts/libs/*.js']
              };

// clean dist directory
gulp.task('clean', function() {
    return gulp.src(bases.dist)
            .pipe(clean());
});

// process scripts & concatenate into output file
gulp.task('scripts', ['clean'], function() {
    gulp.src(paths.scripts, {cwd: bases.app})
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));
});

// imagemin minimizes images and outputs to dist
gulp.task('imgmin', ['clean'], function() {
        gulp.src(paths.images, {cwd: bases.app})
        .pipe(imgmin())
        .pipe(gulp.dest(bases.dist + 'images/'));
});

// copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
    // copy html
    gulp.src(paths.html, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist));

    // copy styles
    gulp.src(paths.styles, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist + 'styles'));

  // copy lib scripts, maintaining original directory structure
  // gulp.src(paths.libs, {cwd: 'app/**'})
  //    .pipe(gulp.dest(bases.dist));
});

// observes file changes
gulp.task('watch', function() {
    gulp.watch('app/**/*', ['scripts', 'copy']);
});

// define the default sequence of tasks
gulp.task('default', ['clean', 'scripts', 'imgmin', 'copy']);
