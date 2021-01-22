###*
 * Copy and past code snippets
###
'use strict'
Through2=		require 'through2'

module.exports= ()->
	Through2.obj (file, enc, cb)->
		err= null
		try
			content= file.contents.toString 'utf8'
			# PROCESS COPY
			# regex= /^(\s*)(\#|\/\/)\s*=copy\s+(.*?)\s*$/gm
			vars= {} # store temp vars
			content= content.split "\n"
			result= []
			st= 0
			snippet= []
			for line in content
				switch st
					when 0	# Out of snippet code
						if r= line.match /^(\s*)(\#|\/\/)\s*=copy\s+(.*?)\s*$/
							leadingSpace= r[1]
							varname= r[3]
							st= 1
						else
							result.push line
					when 1 # inside snipet code
						if line.match /^\s*(\#|\/\/)\s*=end-copy/
							vars[varname]= snippet.splice(0)
							st= 0
						else
							snippet.push line.substr(leadingSpace.length)
			content= result.join "\n"
			# PAST
			content= content.replace /^(\s*)(\#|\/\/)\s*=past\s+(.*?)\s*$/gm, (_, leadingSpace, _2, varname)->
				if data= vars[varname]
					r= []
					leadingSpace= leadingSpace.replace(/^\n/, '') # Remove line return on windows
					for line in data
						r.push leadingSpace+line
					return r.join "\n"
				else return ""
			# Save content
			file.contents= Buffer.from content
		catch e
			err= new PluginError 'Gulp-code-copy', err, {filename: file.path}
		cb err, file
		return