var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output) {
    expect(postcss([ plugin() ]).process(input).css).to.eql(output);
};

describe('postcss-focus', function () {

    it('adds focus selector', function () {
        test('a:hover, b {}', 'a:hover, b, a:focus {}');
    });

    it('adds focus selectors', function () {
        test('a:hover, b:hover {}', 'a:hover, b:hover, a:focus, b:focus {}');
    });

});
