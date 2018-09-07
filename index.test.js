var plugin = require('./')

var postcss = require('postcss')

function run (input, output) {
  return postcss([plugin]).process(input, { from: undefined })
    .then(function (result) {
      expect(result.css).toEqual(output)
      expect(result.warnings()).toHaveLength(0)
    })
}

it('adds focus selector', function () {
  return run('a:hover, b {}', 'a:hover, b, a:focus {}')
})

it('adds focus selectors', function () {
  return run(
    'a:hover, b:hover {}',
    'a:hover, b:hover, a:focus, b:focus {}'
  )
})

it('ignores hover selector because of focus', function () {
  return run(
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
