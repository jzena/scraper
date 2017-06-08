pjs.config({
    allowRepeatUrls: true,
    log: 'stdout',
    format: 'json',
    writer: 'file',
    outFile: './data.json'
});

pjs.addSuite({
    url: 'http://mysites.safelink.cms.stage.3cinteractive.com/',
    moreUrls: function() {
        return _pjs.getAnchorUrls('li a, p a, nav a');
    },
    scrapers: [
      function() {
        _pjs.state.counter = _pjs.state.counter + 1 || 0;

        var items = [];
        $('a').each(function() {
          if ($(this).attr('href') && $(this).attr('href').length && ($(this).attr('href').indexOf('/tfredir') > -1 || $(this).attr('href').indexOf('/redir/') > -1)) {
            var text = $(this).text().trim().length ? $(this).text().trim() : "This link doesn't have a text, maybe its child is an image";
            var link = $(this).attr('href');
            items.push({
                text: text,
                link: link,
            });
          }
        });

        return items;
      }
    ]
});
