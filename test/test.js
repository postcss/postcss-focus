var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, done) {
    postcss([ plugin() ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        done();
    });
};

describe('postcss-focus', function () {

    it('adds focus selector', function (done) {
        test('b, a:hover { }', 'b, a:hover, a:focus { }', done);
    });

});
