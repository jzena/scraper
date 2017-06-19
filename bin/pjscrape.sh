#!/bin/bash
phantomjs $(dirname $0)/../pjscrape.js $*;
prettyjson --number=green data.json;
