var dust = require('dustjs-linkedin'),
    through = require('through2');


var stweem = function(tlName, writeCb) {
  var transform = function(chunk, enc, cb) {
    var data = chunk;
    var s = dust.stream(tlName, data);
    s.on('data', function(o) {
      cb(null, o);
    });
    s.on('error', function(e) {
      cb(e);
    });
  };

  return through.obj(transform);
};

module.exports = stweem;
