function hasAlready (parent, selector) {
  return parent.some(i => {
    return i.type === 'rule' && i.selectors.includes(selector)
  })
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-focus',
    Rule: rule => {
      if (rule.selector.includes(':hover')) {
        let focuses = []
        for (let selector of rule.selectors) {
          if (selector.includes(':hover')) {
            let replaced = selector.replace(/:hover/g, ':focus')
            if (!hasAlready(rule.parent, replaced)) {
              focuses.push(replaced)
            }
          }
        }
        if (focuses.length) {
          rule.selectors = rule.selectors.concat(focuses)
        }
      }
    }
  }
}
module.exports.postcss = true
