var gulp		 = require('gulp');
var uglify		 = require('gulp-uglify');
var watch		 = require('gulp-watch');
var concat		 = require('gulp-concat');
var connect		 = require('gulp-connect');
var sourcemaps	 = require('gulp-sourcemaps');
var htmlmin 	 = require('gulp-htmlmin');
var server 		 = require( 'gulp-develop-server' );

gulp.task( 'server:start', function() {
	server.listen( { path: './server/app.js' } );
});

gulp.task( 'server:restart', function() {
	console.log('restart');
});

gulp.task('connect', function() {
	connect.server({
		port: 1337,
		livereload: true,
		root: 'static',
	})
});

gulp.task('js', function() {
	gulp.src(['static/source/settings.js', 'static/source/main.js', 'static/source/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(uglify().on('error', function(error) {
			console.log("[Error in " + error.plugin + " plugin!]");
			console.log("message: " + error.message);
			console.log("fileName: " + error.fileName);
			console.log("lineNumber: " + error.lineNumber);
		}))
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('static/js'))
		.pipe(connect.reload());
})

gulp.task('html', function() {
	gulp.src('static/html/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('static'))
		.pipe(connect.reload());
});

gulp.task('js-min', function() {
	gulp.src(['static/source/settings.js', 'static/source/main.js', 'static/source/**/*.js'])
		.pipe(uglify().on('error', function(error) {
			console.log("[Error in " + error.plugin + " plugin!]");
			console.log("message: " + error.message);
			console.log("fileName: " + error.fileName);
			console.log("lineNumber: " + error.lineNumber);
		}))
		.pipe(concat('app.min.js'))		
		.pipe(gulp.dest('static/js'));
});

gulp.task('watch', function() {
	gulp.watch('static/source/**/*.js', ['js']);
	gulp.watch('static/html/**/*.html', ['html']);
	gulp.watch('server/**/*', server.restart);	
});

gulp.task('prodactionBuild', ['html', 'js-min']);
gulp.task('default', ['html', 'js', 'connect', 'watch', 'server:start']);