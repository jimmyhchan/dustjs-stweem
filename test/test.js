var test = require('tape'),
    stweem = require('../'),
    dust = require('dustjs-linkedin'),
    tlName = 'tl',
    source;

source = 'hello {foo}';
dust.loadSource(dust.compile(source, tlName));



test('stream json to a dust stream', function(t) {
  var s = dust.stream(tlName, {foo: 'you'});
  s.on('data', function(o) {
    t.equal(o, 'hello you');
  });

  t.end();
});
