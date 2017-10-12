# PostCSS Focus [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.svg">

[PostCSS] plugin to add `:focus` selector to every `:hover`
for keyboard accessibility.

See also [postcss-pseudo-class-enter] for more explicit way.

[postcss-pseudo-class-enter]: https://github.com/jonathantneal/postcss-pseudo-class-enter
[PostCSS]:                    https://github.com/postcss/postcss
[ci-img]:                     https://travis-ci.org/postcss/postcss-focus.svg
[ci]:                         https://travis-ci.org/postcss/postcss-focus

```css
*:focus {
    outline: 0;
}
.button:hover {
    background: red;
}
```

```css
*:focus {
    outline: 0;
}
.button:hover, .button:focus {
    background: red;
}
```

If there is a `:focus` selector, it will be excluded from the processing.

```css
.a:hover, .b:hover {
    outline: 0;
}
.b:focus {
    background: red;
}
```

```css
.a:hover, .b:hover, .a:focus {
    outline: 0;
}
.b:focus {
    background: red;
}
```

## Usage

```js
postcss([ require('postcss-focus') ])
```

See [PostCSS] docs for examples for your environment.
