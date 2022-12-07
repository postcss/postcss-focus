let { equal } = require('uvu/assert')
let { test } = require('uvu')
let postcss = require('postcss')

let plugin = require('./')

async function run(input, output, opts = {}) {
  let result = postcss([plugin(opts)]).process(input, { from: undefined })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('adds focus selector', async () => {
  await run('a:hover, b {}', 'a:hover, b, a:focus {}')
})

test('has focusVisible option', async () => {
  await run('a:hover, b {}', 'a:hover, b, a:focus-visible {}', {
    focusVisible: true
  })
})

test('adds focus selectors', async () => {
  await run('a:hover, b:hover {}', 'a:hover, b:hover, a:focus, b:focus {}')
})

test('ignores hover selector because of focus', async () => {
  await run(
    '.foo:hover {} .foo:focus {} ' +
      'a:hover, b:hover {} ' +
      'b:focus {} ' +
      '@media { b:hover {} }',
    '.foo:hover {} .foo:focus {} ' +
      'a:hover, b:hover, a:focus {} ' +
      'b:focus {} ' +
      '@media { b:hover, b:focus {} }'
  )
  await run(
    '.foo:hover {} .foo:focus-visible {} ' +
      'a:hover, b:hover {} ' +
      'b:focus-visible {} ' +
      '@media { b:hover {} }',
    '.foo:hover {} .foo:focus-visible {} ' +
      'a:hover, b:hover, a:focus-visible {} ' +
      'b:focus-visible {} ' +
      '@media { b:hover, b:focus-visible {} }',
    { focusVisible: true }
  )
})

test.run()
