function hasAlready(parent, selector) {
  return parent.some(i => {
    return i.type === 'rule' && i.selectors.includes(selector)
  })
}

module.exports = (opts = {}) => {
  let pseudoClass = opts.oldFocus ? ':focus' : ':focus-visible'
  let splitRules = typeof opts.splitRules === 'undefined' ? true : opts.splitRules

  return {
    postcssPlugin: 'postcss-focus',
    Rule: rule => {
      if (rule.selector.includes(':hover')) {
        let focuses = []
        for (let selector of rule.selectors) {
          if (selector.includes(':hover')) {
            let replaced = selector.replace(/:hover/g, pseudoClass)
            if (!hasAlready(rule.parent, replaced)) {
              focuses.push(replaced)
            }
          }
        }
        if (focuses.length) {
          if (splitRules) {
            let clone = rule.cloneAfter()
            clone.selectors = focuses;
          } else {
            rule.selectors = rule.selectors.concat(focuses)
          }
        }
      }
    }
  }
}
module.exports.postcss = true
