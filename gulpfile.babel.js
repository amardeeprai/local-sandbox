/**
 *  Copyright 2017 Amardeep Rai
 *  
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

 /*
 * The following file has been based on the MDL gulp configuration
 * credit: https://github.com/google/material-design-lite
 */

'use strict';

// Include Gulp & Tools We'll Use
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import uniffe from './utils/uniffe.js';
import pkg from './package.json';
import fileinclude from 'gulp-file-include';
import htmlmin from 'gulp-html-minifier';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' * @copyright 2017 <%= pkg.author %>',
  ' * @link https://github.com/<%= pkg.repository %>',
  ' */',
  ''].join('\n');

// Define the browsers that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

const SOURCES = [
  'src/assets/scripts.js',
  // Add any additional JavaScript files you create here
];

// Generate and optimise the HTML pages
gulp.task('pages', function() {
  gulp.src([
    'src/**/*.html',
    '!src/partials/*.html'
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// Lint JavaScript
gulp.task('lint', () => {
  return gulp.src([
      'src/**/*.js',
      'gulpfile.babel.js'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jscs())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jscs.reporter())
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe($.if(!browserSync.active, $.jscs.reporter('fail')));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src('src/assets/stylesheet.scss')
    // Generate Source Maps
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.cssInlineImages({webRoot: 'src'}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    // Concatenate styles
    .pipe($.concat('styles.css'))
    .pipe($.header(banner, {pkg}))
    // .pipe(gulp.dest('dist/css'))
    // Minify styles
    .pipe($.if('*.css', $.csso()))
    .pipe($.header(banner, {pkg}))
    .pipe($.concat('styles.min.css'))
    // Write source maps
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({title: 'styles'}));
});

// Build JavaScript files
gulp.task('scripts',  () => {
  return gulp.src(SOURCES)
    .pipe($.if(/scripts\.js/, $.util.noop(), uniffe()))
    .pipe($.sourcemaps.init())
    // Concatenate scripts
    .pipe($.concat('scripts.js'))
    .pipe($.iife({useStrict: true}))
    // .pipe(gulp.dest('dist/js'))
    // Minify scripts
    .pipe($.uglify({
      sourceRoot: '.',
      sourceMapIncludeSources: true
    }))
    .pipe($.header(banner, {pkg}))
    .pipe($.concat('scripts.min.js'))
    // Write source maps
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({title: 'scripts'}));
});

// Optimise images
gulp.task('images', () => {
  return gulp.src('src/**/*.{svg,png,jpg}')
    .pipe($.flatten())
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Clean output directory
gulp.task('clean', () => del(['dist', '.publish']));

// Build production files
gulp.task('default', ['clean'], cb => {
  runSequence(
    ['styles'],
    ['scripts'],
    ['pages'],
    cb);
});

// Build production files & optimise images
gulp.task('all', ['clean'], cb => {
  runSequence(
    ['styles'],
    ['scripts'],
    ['pages'],
    ['images'],
    cb);
});

// Run the local environment for browser testing and development
gulp.task('browser', ['default'], () => {

  browserSync({
    server: {
      baseDir: ['dist']
    }
  });

  gulp.watch(
    ['src/**/*.js'],
    ['scripts', reload]
  );
  gulp.watch(
    ['src/**/*.{scss,css}'],
    ['styles', reload]
  );
  gulp.watch(
    ['src/**/*.html'],
    ['pages', reload]
  );
  gulp.watch(
    ['src/**/*.{svg,png,jpg}'],
    ['images', reload]
  );

});