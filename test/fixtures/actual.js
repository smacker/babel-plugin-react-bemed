'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class MyBlock extends React.Component {
    render() {
        <div bBlock>
            <div bElem='first'>first</div>
            <div bElem='second'>
                <span bElem='third'>third</span>
            </div>
        </div>
    }
}
