var postcss = require('postcss')

function hasAlready (parent, selector) {
  return parent.nodes.some(function (i) {
    return i.type === 'rule' && i.selectors.indexOf(selector) !== -1
  })
}

module.exports = postcss.plugin('postcss-focus', function () {
  return function (css) {
    css.walkRules(function (rule) {
      if (rule.selector.indexOf(':hover') !== -1) {
        var focuses = []
        rule.selectors.forEach(function (selector) {
          if (selector.indexOf(':hover') !== -1) {
            var replaced = selector.replace(/:hover/g, ':focus')
            if (!hasAlready(rule.parent, replaced)) {
              focuses.push(replaced)
            }
          }
        })
        if (focuses.length) {
          rule.selectors = rule.selectors.concat(focuses)
        }
      }
    })
  }
})
