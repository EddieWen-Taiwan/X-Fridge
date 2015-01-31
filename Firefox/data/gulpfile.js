var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('default', ['newtab'], function () {
	gulp.watch('./assets/newtab/js/*.js', ['newtab']);
});

gulp.task('newtab', function () {
	gulp.src('./assets/newtab/js/*.js')
		.pipe(concat('app.js'))
//		.pipe(uglify())
		.pipe(gulp.dest('./assets/newtab'));
});