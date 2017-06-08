var urls = [
    'http://mysites.safelink.cms.stage.3cinteractive.com/',
];

pjs.config({
    allowRepeatUrls: true,
    log: 'stdout',
    format: 'json',
    writer: 'file',
    outFile: './data.json'
});

pjs.addSuite({
    url: urls,
    moreUrls: function() {
        return _pjs.getAnchorUrls('a');
    },
    scrapers: [
      function() {
        var urls = [
            'http://mysites.safelink.cms.stage.3cinteractive.com/',
        ];

        _pjs.state.counter = _pjs.state.counter + 1 || 0;

        var items = [];
        $('a').each(function() {
          if ($(this).attr('href') && $(this).attr('href').length && ($(this).attr('href').indexOf('/tfredir') > -1 || $(this).attr('href').indexOf('/redir/') > -1)) {
            items.push({
                text: $(this).text().trim(),
                link: $(this).attr('href'),
            });
          }
        });

        return items;
      }
    ]
});
