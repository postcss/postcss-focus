let { equal } = require('uvu/assert')
let { test } = require('uvu')
let postcss = require('postcss')

let plugin = require('./')

async function run(input, output) {
  let result = postcss([plugin()]).process(input, { from: undefined })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('adds focus selector', async () => {
  await run('a:hover, b {}', 'a:hover, b, a:focus {}')
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
})

test.run()
