const {src, dest, parallel } = require('gulp');
const rename = require('gulp-rename');
const minifyJS = require('gulp-uglify');
const minifyCSS = require('gulp-uglifycss');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const cssimport = require('gulp-cssimport');

function base(){
    return src('src/templates/*.html')
    .pipe(dest('public/'));
}

function javascript(){
    return src('src/js/*.js')
    .pipe(babel({
        presets:[ '@babel/env' ]
    }))
    .pipe(minifyJS())
    .pipe(rename({extname:'.min.js'}))
    .pipe(dest('public/assets/js/'));
}

function css(){
    return src('src/css/*.css')
    .pipe(cssimport())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename({extname:'.min.css'}))
    .pipe(dest('public/assets/css/'));
}



exports.default = parallel(base, javascript, css);