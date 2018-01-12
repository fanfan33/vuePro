var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');

//图片的无损压缩
gulp.task('imagemin', function () {
	return gulp.src('./dist/images/**.*').pipe(cache(imagemin({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))).pipe(gulp.dest('./dist/images'));
});
//js的压缩合并
gulp.task('uglify', function () {
	gulp.src('./js/*.js').pipe(concat('all.js')).pipe(gulp.dest('./dist')).pipe(rename('all.min.js')).pipe(uglify()).pipe(gulp.dest('./dist'));
});
//sass的编译压缩
gulp.task('sass', function () {
	return sass('./dist/css/*.scss', {
		style: 'compressed',
		loadPath: ['common/vars', 'mixins/mixin', 'mixins/css3', 'common/reset', 'common/com-class', 'placeholders/placeholder']
	}).pipe(gulp.dest('./dist/min'));
});
//实时监听任务
gulp.task('watch', function () {
	gulp.watch('./dist/css/*.scss', ['sass']);
	gulp.watch('./dist/react/main4.js', ['uglify']);
})
