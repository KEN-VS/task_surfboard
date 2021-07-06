const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;
const { SRC_PATH, DIST_PATH } = require('./gulp.config');

const images = [
    `${SRC_PATH}/img/*.png`,
    `${SRC_PATH}/img/sprite.svg`,
    `${SRC_PATH}/img/mark.svg`,
    `${SRC_PATH}/img/check.svg`,
]

task("clean", () => {
    return src(`${DIST_PATH}/**/*`, { read: false })
        .pipe(rm())
});

task("video", () => {
    return src(`${SRC_PATH}/video/video.mp4`).pipe(dest(`${DIST_PATH}/video`));
});


task("copy:img", () => {
    return src(images).pipe(dest(`${DIST_PATH}/img`));
});

task("copy:html", () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({ stream: true }));
});

task("styles", () => {
    return src(`${SRC_PATH}/scss/main.scss`)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`./${DIST_PATH}/css`))
        .pipe(reload({ stream: true }));
});

task("scripts", () => {
    return src(`${SRC_PATH}/scripts/*.js`)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', { newLine: ';' }))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({ stream: true }));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

task('watch', () => {
    watch(`./${SRC_PATH}/scss/**/*.scss`, series("styles"));
    watch(`. /${SRC_PATH}/*.html`, series("copy:html"));
    watch(`./${SRC_PATH}/scripts/*.js`, series("scripts"));
});



task(
    'default',
    series('clean',
        parallel('copy:html', 'video', 'copy:img', 'styles', 'scripts'),
        parallel('watch', 'server')
    ));

task(
    'build',
    series('clean', parallel('copy:html', 'video', 'copy:img', 'styles', 'scripts'))
);