var postcss = require('postcss');

module.exports = postcss.plugin('postcss-focus', function () {
    return function (css) {
        css.walkRules(function (rule) {
            if ( rule.selector.indexOf(':hover') !== -1 ) {
                var focuses = [];
                rule.selectors.forEach(function (selector) {
                    if ( selector.indexOf(':hover') !== -1 ) {
                        var replaced = selector.replace(/:hover/g, ':focus');
                        if (!rule.parent.nodes.some(function (i) {
                            return i.selector === replaced;
                        })) {
                            focuses.push(replaced);
                        }
                    }
                });
                if ( focuses.length ) {
                    rule.selectors = rule.selectors.concat(focuses);
                }
            }
        });
    };
});
