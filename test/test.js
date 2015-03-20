var test = require('tape'),
    Readable = require('stream').Readable,
    stweem = require('../'),
    dust = require('dustjs-linkedin'),
    tlName = 'tl',
    source,
    objStream;

objStream = new Readable({objectMode:true});
objStream._read = function() {
  objStream.push({foo: 1});
  objStream.push({foo: 2});
  objStream.push({foo: 3});
  objStream.push(null);
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
  objStream.pipe(s);
  s.on('data', function(o) {
    t.equal(o, 'hello '+count);
    count++;
  });
});

