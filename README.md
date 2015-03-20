#Stweem for dustjs
##this is a (proof of concept)

I would like to give Dust a writable stream interface


## use case

imagine you have all your templates compile and the done function is always the same but the data updates (e.g. pagination, infinite scroll).
It'll be nice to push new data in and have the templates drive instead of having to create a new stream every time we want to write new data.

```
// set up the template and the sink
dust.loadSource(dust.compile(tlSource, tlName));
var writeable = dust.stweem(tlName);

writable.on('data', function(html) {
  myApp.newMarkup(html);
});

// setup and wire up the source
var readable = getReadableStream();
readable.pipe(writable);
```

## so what
check out the test/test.js it's workable
