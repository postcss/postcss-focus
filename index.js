var postcss = require('postcss');

module.exports = postcss.plugin('postcss-focus', function () {
    return function (css) {
        css.eachRule(function (rule) {
            if ( rule.selector.indexOf(':hover') !== -1 ) {
                var focuses = [];
                rule.selectors.forEach(function (selector) {
                    if ( selector.indexOf(':hover') !== -1 ) {
                        focuses.push(selector.replace(/:hover/g, ':focus'));
                    }
                });
                if ( focuses.length ) {
                    rule.selector = rule.selector + ', ' + focuses.join(', ');
                }
            }
        });
    };
});
