let postcss = require('postcss')

let plugin = require('./')

async function run (input, output) {
  let result = await postcss([plugin]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('adds focus selector', async () => {
  await run('a:hover, b {}', 'a:hover, b, a:focus {}')
})

it('adds focus selectors', async () => {
  await run('a:hover, b:hover {}', 'a:hover, b:hover, a:focus, b:focus {}')
})

it('ignores hover selector because of focus', async () => {
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
