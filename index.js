var postcss = require('postcss');

module.exports = postcss.plugin('postcss-focus', function () {
    return function (css) {
        css.walkRules(function (rule) {
            if ( rule.selector.indexOf(':hover') !== -1 ) {
                var focuses = [];
                rule.selectors.forEach(function (selector) {
                    if ( selector.indexOf(':hover') !== -1 && !/:hover:only/i.test(selector) ) {
                        focuses.push(selector.replace(/:hover/g, ':focus'));
                    }
                });
                if ( /:hover:only/i.test(rule.selector) ) {
                    rule.selector = rule.selector.replace(/:hover:only/g, ':hover');
                }
                if ( focuses.length ) {
                    rule.selectors = rule.selectors.concat(focuses);
                }
            }
        });
    };
});
