# svg-icon.js

Web component for SVG icons. Works in any web framework and for any purpose.

## Install

Add the following script to your page:

```html
<script src="https://bicyclesystems.github.io/svg-icon/svg-icon.js"></script>
```

Set the `src-path` attribute to define the default icon source:

```html
<script src="https://bicyclesystems.github.io/svg-icon/svg-icon.js" src-path="icons/"></script>
```

Or use an external CDN:

```html
<script src="https://bicyclesystems.github.io/svg-icon/svg-icon.js" src-path="https://raincons.rnbw.dev/icons"></script>
```

## Usage

Set the icon name within the element's content:

```html
<svg-icon>arrow</svg-icon>
```

Use folders to categorize your icons:

```html
<svg-icon>arrows/right</svg-icon>
```

Override the source directly with the `src` attribute:

```html
<svg-icon src="https://example.com/icon.svg"></svg-icon>
```

## Styling

The fill color inherits from the element's CSS `color` property:

```html
<div style="color: red;">
  <svg-icon>arrow</svg-icon>
</div>
```

Set dimensions with CSS:

```html
<svg-icon style="width: 80px; height: 80px;">arrow</svg-icon>
```

## Dependencies

Built on [svg-inject](https://github.com/iconfu/svg-inject) for SVG property handling.