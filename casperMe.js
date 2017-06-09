var prettyjson = require('prettyjson');
var links = [];
var casper = require('casper').create({
  logLevel: 'verbose',
  debug: true
});

function getLinks() {
  var links = document.querySelectorAll('a');
  return Array.prototype.map.call(links, function(e) {
    var link = e.getAttribute('href');
    return {
      link: link,
      text: e.textContent.trim(),
    };
  });
}

casper.start('http://mysites.tracfone.com/');

casper.waitFor(function check() {
    return this.evaluate(function() {
        return document.querySelectorAll('body a').length > 2;
    });
}, function then() {
    links = this.evaluate(getLinks);
})

casper.then(function() {
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    //console.log(prettyjson.render(links));
    this.echo(links.length + ' links found').exit();
});
