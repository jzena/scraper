import {casper} from "casper";

casper.start('http://casperjs.org/', () => {
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', () => {
    this.echo(this.getTitle());
});

casper.run();
