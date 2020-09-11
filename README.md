# PostCSS Focus

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="https://postcss.org/logo-leftp.svg">

[PostCSS] plugin to add `:focus` selector to every `:hover`
for keyboard accessibility.

See also [postcss-pseudo-class-enter] for more explicit way.

[postcss-pseudo-class-enter]: https://github.com/jonathantneal/postcss-pseudo-class-enter
[PostCSS]:                    https://github.com/postcss/postcss

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

<a href="https://evilmartians.com/?utm_source=postcss-focus">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-focus
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-focus'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
