var prettyjson = require('prettyjson');
var links = [];
var casper = require('casper').create({
  verbose: true,
  logLevel: "debug",
  clientScripts:  [
    'client/jquery.js',
  ],
  pageSettings: {
    // iPhone
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3)',
    // Android
    //userAgent: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
    // Lumia
    //userAgent: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)',
  }
});

function getLinks() {
  //var links = $('a[href^="http"]');
  var links = $('a[href*="/redir/"]');
  return Array.prototype.map.call(links, function (e) {
    var link = $(e).attr('href');
    var text = $(e).text().trim().length > 0 ? $(e).text().trim() : $(e).html();
    return {
      link: link,
      text: text,
    };
  });
}

casper.start('http://mysites.tracfone.cms.stage.3cinteractive.com/other-social');

casper.waitFor(function check() {
  return this.evaluate(function() {
    return document.querySelectorAll('body a').length > 2;
  });
}, function then() {
  links = this.evaluate(getLinks);
});

casper.run(function () {
  console.log(prettyjson.render(links));
  console.log(links.length);
  casper.exit();
});
