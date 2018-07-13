var gulp = require('gulp')
var sass = require('gulp-sass')
var connect = require('gulp-connect')
gulp.task('default', ['connect','sass']);
gulp.task('sass', function () {
	return gulp.src('css/index.sass') 
		.pipe(sass())
		.pipe(gulp.dest('css/index')) 
})

gulp.task('connect', function() {

    connect.server({

    root: '',

    port: 8001,

    livereload: true

  });

});

