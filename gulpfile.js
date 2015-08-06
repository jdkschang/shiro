var gulp    = require('gulp'),
    del     = require('del'),
    eslint  = require('gulp-eslint'),
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
gulp.task('clean:dist', function( callback ) {
    del([
        'dist/styles/*',
        // here we use a globbing pattern to match everything inside the `mobile` folder
        // 'dist/mobile/**/*',
        // we don't want to clean this file though so we negate the pattern
        // '!dist/mobile/deploy.json'
      ], cb);
});

gulp.task('lint', function() {
    return gulp.src(paths.scripts, {cwd: bases.app})
          // eslint() attaches the lint output to the eslint property
          // of the file object so it can be used by other modules.
          .pipe(eslint())
          // eslint.format() outputs the lint results to the console.
          // Alternatively use eslint.formatEach() (see Docs).
          .pipe(eslint.format())
          // To have the process exit with an error code (1) on
          // lint error, return the stream and pipe to failOnError last.
          .pipe(eslint.failOnError());
});

// process scripts & concatenate into output file
gulp.task('scripts', ['clean'], function() {
  gulp.src(paths.scripts, {cwd: bases.app})
      .pipe(eslint())
      .pipe(eslint.format())
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
