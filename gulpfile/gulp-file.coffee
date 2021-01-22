###*
 * Gulp file
###
GridfwGulp= require 'gulp-gridfw'
Gulp= require 'gulp'

compiler= new GridfwGulp Gulp,
	isProd: <%- isProd %>
	delay: 500


# # ::::::::::::::
# Through2=		require 'through2'

# INCLUDE PRECOMPILER PARAMS
params=
	#=include ../precompiler-params.coffee
# Compile
module.exports= compiler
	.js
		name:	'API>> Compile Coffee files'
		src:	'assets/index.coffee'
		dest:	'build/'
		watch:	['assets/**/*.coffee']
		data:	params