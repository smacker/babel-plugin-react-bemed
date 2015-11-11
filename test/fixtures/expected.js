'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var bReact = { modDelim: '_', bevis: false, createElement: function createElement(type, config) { var _React2; for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) { children[_key - 2] = arguments[_key]; } if (!config || !config.bElem && !config.bBlock) { var _React; return (_React = React).createElement.apply(_React, [type, config].concat(children)); } var bemName; var bemFullName; if (config.bElem) { bemName = config.bElem; } else if (config.bBlock) { bemName = config.bBlock; } bemFullName = bemName; if (config.bMods) { var mods = config.bMods; var modName; var modVal; for (modName in mods) { if (mods.hasOwnProperty(modName) && mods[modName]) { modVal = mods[modName]; bemFullName += ' ' + (!this.bevis ? bemName : '') + this.modDelim + modName + (modVal !== true ? this.modDelim + modVal : ''); } } } var className = config.className; config.className = bemFullName + (className ? ' ' + className : ''); return (_React2 = React).createElement.apply(_React2, [type, config].concat(children)); } };'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var MyBlock = (function (_React$Component) {
    _inherits(MyBlock, _React$Component);

    function MyBlock() {
        _classCallCheck(this, MyBlock);

        _get(Object.getPrototypeOf(MyBlock.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MyBlock, [{
        key: 'render',
        value: function render() {
            bReact.createElement(
                'div',
                { bBlock: 'my-block' },
                bReact.createElement(
                    'div',
                    { bElem: 'my-block__first' },
                    'first'
                ),
                bReact.createElement(
                    'div',
                    { bElem: 'my-block__second' },
                    bReact.createElement(
                        'span',
                        { bElem: 'my-block__third' },
                        'third'
                    )
                )
            );
        }
    }]);

    return MyBlock;
})(React.Component);
