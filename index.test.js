let { equal } = require('uvu/assert')
let { test } = require('uvu')
let postcss = require('postcss')

let plugin = require('./')

function run(input, output, opts = {}) {
  let result = postcss([plugin(opts)]).process(input, { from: undefined })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('adds focus selector', () => {
  run('a:hover, b {}', 'a:hover, b {}a:focus-visible {}')
})

test('supports old focus', () => {
  run('a:hover, b {}', 'a:hover, b {}a:focus {}', {
    oldFocus: true
  })
})

test('supports non-splitting', () => {
  run('a:hover, b {}', 'a:hover, b, a:focus-visible {}', {
    splitRules: false
  })
})

test('supports split rules', () => {
  run('a:hover, b {}', 'a:hover, b {}a:focus-visible {}')
})

test('supports split rules and old focus', () => {
  run('a:hover, b {}', 'a:hover, b, a:focus {}', {
    oldFocus: true,
    splitRules: false
  })
})

test('adds focus selectors', () => {
  run(
    'a:hover, b:hover {}',
    'a:hover, b:hover {}a:focus-visible, b:focus-visible {}'
  )
})

test('ignores hover selector because of focus', () => {
  run(
    '.foo:hover {} .foo:focus-visible {} ' +
      'a:hover, b:hover {} ' +
      'b:focus-visible {} ' +
      '@media { b:hover {} }',
    '.foo:hover {} .foo:focus-visible {} ' +
      'a:hover, b:hover {} a:focus-visible {} ' +
      'b:focus-visible {} ' +
      '@media { b:hover {} b:focus-visible {} }'
  )
  run(
    '.foo:hover {} .foo:focus {} ' +
      'a:hover, b:hover {} ' +
      'b:focus {} ' +
      '@media { b:hover {} }',
    '.foo:hover {} .foo:focus {} ' +
      'a:hover, b:hover {} a:focus {} ' +
      'b:focus {} ' +
      '@media { b:hover {} b:focus {} }',
    {
      oldFocus: true
    }
  )
})

test.run()
