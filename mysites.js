pjs.config({
    //allowRepeatUrls: true,
    ignoreDuplicates: true,
    log: 'stdout',
    format: 'json',
    writer: 'file',
    outFile: './data.json'
});

pjs.addSuite({
    url: [
        'http://mysites.myfamilymobile.cms.stage.3cinteractive.com',
        'http://mysites.net10.cms.stage.3cinteractive.com',
        'http://mysites.safelink.cms.stage.3cinteractive.com',
        'http://mysites.simplemobile.cms.stage.3cinteractive.com',
        'http://mysites.straighttalk.cms.stage.3cinteractive.com',
        'http://mysites.totalwireless.cms.stage.3cinteractive.com',
        'http://mysites.tracfone.cms.stage.3cinteractive.com/index'
    ],
    moreUrls: function () {
        var followUrls = [];
        var unfilteredFollowUrls = _pjs.getAnchorUrls('a', false);
        for (var i = 0; i < unfilteredFollowUrls.length; i++) {
            if (unfilteredFollowUrls[i].indexOf('/redir') === -1 && unfilteredFollowUrls[i].indexOf('/r/') === -1) {
                followUrls.push(unfilteredFollowUrls[i]);
            }
        }
        return followUrls;
    },
    scrapers: [
        function () {
            _pjs.state.counter = _pjs.state.counter + 1 || 0;

            var items = [];

            var isInDestSites = function(href) {
                var searchDestSites = [
                    'a.net10.com',
                    'a.simplemobile.com',
                    'a.straighttalk.com',
                    'a.totalwireless.com',
                    't.tracfone.com'
                ];

                var result = false;

                $.each(searchDestSites, function(key, destSite) {
                    result = result || href.indexOf(destSite) !== -1;
                });

                return result;
            };

            $('a').each(function () {
                var $this = $(this);
                var href = $this.attr('href');

                if (href && href.length && isInDestSites(href)) {
                    var text = $this.text().trim() || "This link doesn't have a text, maybe its child is an image";
                    items.push({
                        text: text,
                        link: href
                    });
                }
            });

            return items;
        }
    ]
});
