//////////////////////////////////////////////////
// VARS
//////////////////////////////////////////////////

// IMPORTS
var gulp    		= require('gulp'),
    del     		= require('del'),
    eslint  		= require('gulp-eslint'),
    concat  		= require('gulp-concat'),
    uglify  		= require('gulp-uglify'),
	util 			= require('gulp-util'),
	plumber 		= require('gulp-plumber'),
	sourcemaps 		= require('gulp-sourcemaps'),
	sass 			= require('gulp-sass'),
	cmq 			= require('gulp-combine-media-queries'),
	autoprefixer 	= require('gulp-autoprefixer'),
	minifyCSS 		= require('gulp-minify-css'),
	modTranspiler  	= require('gulp-es6-module-transpiler'),
	babel 			= require('gulp-babel'),
	imagemin 		= require('gulp-imagemin'),
	cp 				= require('child_process'),
	browserSync 	= require('browser-sync');

// PATHS
var paths 	= {
	distFolder: 			'./public/dist/',
	mainStyleFile: 			'./public/src/main.scss',
	componentStyleFiles:	'./public/src/components/**/*.scss',
	srcStyleFiles: [
		mainStyleFile,
		componentStyleFiles
	],
	mainScriptFile: 		'./public/src/main.js',
	componentScriptFiles: 	'./public/src/components/**/*.js',
	srcScriptFiles: [
		mainScriptFile,
		componentScriptFiles
	],
	srcImageFiles: 			['./public/src/images/**/*.{gif,jpg,png,svg}'],
	srcFontFiles: 			['./public/src/fonts/**/*.{ttf,woff,eot,svg}'],
};


// ERRORS
var onError = function (err) {
	var errorMessage = '';

	util.beep();

	errorMessage += util.colors.red('\n-----------------------------------');
	errorMessage += util.colors.red('\n' + err.message);
	errorMessage += util.colors.red('\n-----------------------------------');
	console.log(errorMessage);
	this.emit('end');
};
var customSassError = function (err) {
	var errorMessage = '';

	util.beep();

	errorMessage += util.colors.red('\n-----------------------------------');
	errorMessage += util.colors.red('\n' + err.file);
	errorMessage += util.colors.red('\n' + err.message);
	errorMessage += util.colors.red('\nline: ' + err.line + ' col: ' + err.column);
	errorMessage += util.colors.red('\n-----------------------------------');
	errorMessage += '\n';

	console.log(errorMessage);
};



//////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////

// GENERAL
gulp.task('default', 'assets');
gulp.task('assets', ['styles', 'scripts', 'images', 'fonts']);
gulp.task('serve', ['default', 'browser-sync', 'watch']);


// STYLES
gulp.task('styles', function () {
	return gulp.src(paths.mainStyleFile)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(sass({onError: customSassError}))
		.pipe(concat('all.min.css'))
		.pipe(cmq())
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.distFolder))
		.pipe(gulp.dest('_site/public/dist/'));
});

// SCRIPTS
gulp.task('scripts', function(){
	return gulp.src(paths.srcScriptFiles)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'))
		.pipe(moduleTranspiler({formatter: 'bundle'}))
		.pipe(babel())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.distFolder))
		.pipe(gulp.dest('_site/public/dist/'));
});

// IMAGES
gulp.task('images', function (){
	return gulp.src(paths.srcImageFiles)
		.pipe(plumber({errorHandler: onError}))
		.pipe(imagemin())
		.pipe(gulp.dest(paths.distFolder + 'images'));
});

// FONTS
gulp.task('fonts', function() {
	return gulp.src(paths.srcFontFiles)
		.pipe(plumber({errorHandler: onError}))
		.pipe(gulp.dest(paths.distFolder + 'fonts'));
});

// BROWSERSYNC
gulp.task('browser-sync', ['default'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		},
		open: 'ui'
	});
});

// WATCH
gulp.task('watch', ['default'], function () {
	gulp.watch(paths.srcStyleFiles, ['styles', browserSync.reload]);
	gulp.watch(paths.srcScriptFiles, ['scripts', browserSync.reload]);
	gulp.watch(paths.srcImageFiles, ['images', browserSync.reload]);
	gulp.watch(paths.srcFontFiles, ['fonts', browserSync.reload]);
	gulp.watch(paths.srcMarkdownFiles, ['markdown', browserSync.reload]);
});

// // clean dist directory
// gulp.task('clean:dist', function( callback ) {
//     del([
//         'dist/styles/*',
//         // here we use a globbing pattern to match everything inside the `mobile` folder
//         // 'dist/mobile/**/*',
//         // we don't want to clean this file though so we negate the pattern
//         // '!dist/mobile/deploy.json'
//     ], cb);
// });
//
// gulp.task('lint', function() {
//     return gulp.src(paths.scripts, {cwd: bases.app})
//               // eslint() attaches the lint output to the eslint property
//               // of the file object so it can be used by other modules.
//               .pipe(eslint())
//               // eslint.format() outputs the lint results to the console.
//               // Alternatively use eslint.formatEach() (see Docs).
//               .pipe(eslint.format())
//               // To have the process exit with an error code (1) on
//               // lint error, return the stream and pipe to failOnError last.
//               .pipe(eslint.failOnError());
// });
//
// // process scripts & concatenate into output file
// gulp.task('scripts', ['clean'], function() {
//     gulp.src(paths.scripts, {cwd: bases.app})
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(uglify())
//         .pipe(concat('app.min.js'))
//         .pipe(gulp.dest(bases.dist + 'scripts/'));
// });
//
// // imagemin minimizes images and outputs to dist
// // gulp.task('imgmin', ['clean'], function() {
// //     gulp.src(paths.images, {cwd: bases.app})
// //         .pipe(imgmin())
// //         .pipe(gulp.dest(bases.dist + 'images/'));
// // });
//
// // copy all other files to dist directly
// gulp.task('copy', ['clean'], function() {
//     // copy html
//     gulp.src(paths.html, {cwd: bases.app})
//         .pipe(gulp.dest(bases.dist));
//
//     // copy styles
//     gulp.src(paths.styles, {cwd: bases.app})
//         .pipe(gulp.dest(bases.dist + 'styles'));
//
//     // copy lib scripts, maintaining original directory structure
//     // gulp.src(paths.libs, {cwd: 'app/**'})
//     //    .pipe(gulp.dest(bases.dist));
// });
//
// // observes file changes
// gulp.task('watch', function() {
//     gulp.watch('app/**/*', ['scripts', 'copy']);
// });
//
// // define the default sequence of tasks
// // gulp.task('default', ['clean:dist', 'scripts', 'imgmin', 'copy']);
// gulp.task('default', ['clean:dist', 'scripts', 'copy']);
