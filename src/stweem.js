var dust = require('dustjs-linkedin'),
    through = require('through2');


var stweem = function(tlName, writeCb) {
  var transform = function(chunk, enc, cb) {
    dust.stream(tlName, chunk, writeCb);
    cb();
  };

  return through.obj(transform);
};
