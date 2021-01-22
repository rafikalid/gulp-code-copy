/**
 * Copy and past code snippets
 */
'use strict';
var Through2;

Through2 = require('through2');

module.exports = function() {
  return Through2.obj(function(file, enc, cb) {
    var content, e, err, i, leadingSpace, len, line, r, result, snippet, st, varname, vars;
    err = null;
    try {
      content = file.contents.toString('utf8');
      // PROCESS COPY
      // regex= /^(\s*)(\#|\/\/)\s*=copy\s+(.*?)\s*$/gm
      vars = {}; // store temp vars
      content = content.split("\n");
      result = [];
      st = 0;
      snippet = [];
      for (i = 0, len = content.length; i < len; i++) {
        line = content[i];
        switch (st) {
          case 0: // Out of snippet code
            if (r = line.match(/^(\s*)(\#|\/\/)\s*=copy\s+(.*?)\s*$/)) {
              leadingSpace = r[1];
              varname = r[3];
              st = 1;
            } else {
              result.push(line);
            }
            break;
          case 1: // inside snipet code
            if (line.match(/^\s*(\#|\/\/)\s*=end-copy/)) {
              vars[varname] = snippet.splice(0);
              st = 0;
            } else {
              snippet.push(line.substr(leadingSpace.length));
            }
        }
      }
      content = result.join("\n");
      // PAST
      content = content.replace(/^(\s*)(\#|\/\/)\s*=past\s+(.*?)\s*$/gm, function(_, leadingSpace, _2, varname) {
        var data, j, len1;
        if (data = vars[varname]) {
          r = [];
          leadingSpace = leadingSpace.replace(/^\n/, ''); // Remove line return on windows
          for (j = 0, len1 = data.length; j < len1; j++) {
            line = data[j];
            r.push(leadingSpace + line);
          }
          return r.join("\n");
        } else {
          return "";
        }
      });
      // Save content
      file.contents = Buffer.from(content);
    } catch (error) {
      e = error;
      err = new PluginError('Gulp-code-copy', err, {
        filename: file.path
      });
    }
    cb(err, file);
  });
};
