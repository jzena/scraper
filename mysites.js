pjs.config({
    allowRepeatUrls: true,
    log: 'stdout',
    format: 'json',
    writer: 'file',
    outFile: './data.json'
});

pjs.addSuite({
    url: 'http://mysites.tracfone.com/',
    moreUrls: function() {
        return _pjs.getAnchorUrls('li a, p a, nav a', false);
    },
    async: true,
    scrapers: [
      function() {
        _pjs.state.counter = _pjs.state.counter + 1 || 0;

        var items = [];
        $('a').each(function() {
          if ($(this).attr('href') && $(this).attr('href').length && $(this).attr('href').indexOf('/redir/') > -1) {
            var text = $(this).text().trim().length ? $(this).text().trim() : "This link doesn't have a text, maybe its child is an image";
            var link = $(this).attr('href');
            items.push({
                text: text,
                link: link,
            });
          }
        });

        return {
          urlFound: window.location.href,
          items: items,
          total: items.length,
        };
      }
    ]
});
