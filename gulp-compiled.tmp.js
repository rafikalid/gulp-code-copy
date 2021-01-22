/**
 * Gulp file
 */
var GridfwGulp, Gulp, compiler, params;

GridfwGulp = require('gulp-gridfw');

Gulp = require('gulp');

compiler = new GridfwGulp(Gulp, {
  isProd: false,
  delay: 500
});

// # ::::::::::::::
// Through2=		require 'through2'

// INCLUDE PRECOMPILER PARAMS
params = {
  /**
   * Parmas for the precompilator
   * TO change app params, goto: assets/app/config.coffee
   */
  /** PARAMS */
  version: require('./package.json').version,
  isProd: false
};


// Compile
module.exports = compiler.js({
  name: 'API>> Compile Coffee files',
  src: 'assets/index.coffee',
  dest: 'build/',
  watch: ['assets/**/*.coffee'],
  data: params
});
