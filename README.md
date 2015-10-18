# babel-plugin-hello-world

Bemed react jsx plugin for Babel.

## Example

**In**

```jsx
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class MyBlock extends React.Component {
    render() {
        <div bBlock>
            <div bElem='first'>first</div>
            <div bElem='second' mMods={{size: 'large'}}>
                <span bElem='third' className="custom">third</span>
            </div>
        </div>
    }
}
```

**Rendered in browser**

```html
<div class="my-block" data-reactid=".0">
    <div class="my-block__first" data-reactid=".0.0">first</div>
    <div class="my-block__second block__second_size_large" data-reactid=".0.1">
        <div class="my-block__third custom" data-reactid=".0.1.0"></div>
    </div>
</div>
```

## How does it works?

Build step:

1. Plugin analyzes your code
2. It finds component name
3. Convert CamelCase to dashes
4. Changes `bBlock` and `bElem` props with block name
5. Adds `bReact` methods to build file.

Runtime:

`bReact.createElement` concats blockName, elemName, mods, className and set it to className.


## Installation

```sh
$ npm install babel-plugin-react-bemed
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["react-bemed"],
  "jsxPragma": "bReact.createElement"
}
```

### Via CLI

```sh
$ babel --plugins react-bemed --jsxPragma bReact.createElement script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
  plugins: ['react-bemed'],
  jsxPragma: 'bReact.createElement'
});
```

## Options

You can set options in `.babelrc`.


Defaults:

```json
{
    "extra": {
        "react-bemed": {
            "elemDelim": "__",
            "modDelim": '_',
            "bevis": false
        }
    }
}
```

Bevis mod generates className without repeating block/element name like `block__elem _modName_modVal` instead of `block__elem block__elem_modName_modVal`.
