# PostCSS Focus [![Build Status](https://travis-ci.org/postcss/postcss-focus.svg)](https://travis-ci.org/postcss/postcss-focus)

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[PostCSS] plugin to add `:focus` selector to every `:hover`.

[PostCSS]: https://github.com/postcss/postcss

```css
.button:hover {
    background: red;
}
```

```css
.button:hover, .button:focus {
    background: red;
}
```

## Usage

```js
postcss([ require('postcss-focus') ])
```

See [PostCSS] docs for examples for your environment.
