var test = require('tape'),
    Readable = require('stream').Readable,
    stweem = require('../'),
    dust = require('dustjs-linkedin'),
    tlName = 'tl',
    source,
    textStream;

textStream = new Readable({objectMode:true});
textStream._read = function() {
  textStream.push('1');
  textStream.push('2');
  textStream.push('3');
  textStream.push(null);
};
source = 'hello {foo}';
dust.loadSource(dust.compile(source, tlName));



test('dust exposes a readable stream', function(t) {
  t.plan(1);
  var s = dust.stream(tlName, {foo: 'you'});
  s.on('data', function(o) {
    t.equal(o, 'hello you');
  });

});

test('stweem exposes a writable stream', function(t) {
  t.plan(3);
  var s = stweem(tlName),
      count = 1;
  textStream.pipe(s);
  s.on('data', function(o) {
    t.equal(o, 'hello '+count);
    count++;
  });
});

