var gulp = require("gulp"),
    livereload = require("gulp-livereload"),
    uglify = require("gulp-uglify"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    bourbon = require("bourbon").includePaths,
    neat = require("bourbon-neat").includePaths,
    sass = require("gulp-sass");


gulp.task('imagemin', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./images'));
});


gulp.task('sass', function () {
    gulp.src(['./sass/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourcemaps: false,
            // outputStyle: 'compressed',
            includePaths: [bourbon, neat]
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'ie 9'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});

gulp.task('uglify', function () {
    gulp.src('./js/*.js')
        .pipe(uglify('wp-make2.min.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('css-copy', function () {
    gulp.src('./css/style.css')
        .pipe('.');
});

gulp.task('watch', function () {
    gulp.series('sass', 'css-copy');
    // livereload.listen();

    // gulp.watch('./js/*.js', ['uglify']);
    // gulp.watch(['./css/*.css', './templates/**/*.twig', './js/*.js'], function (files) {
    //     livereload.changed(files)
    // });
});


