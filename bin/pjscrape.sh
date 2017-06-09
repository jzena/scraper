#!/bin/bash
/Users/epetrovich/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs $(dirname $0)/../pjscrape.js $*;
/Users/epetrovich/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs data.json;
