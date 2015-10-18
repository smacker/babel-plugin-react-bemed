var assert = require('assert');
var fs = require('fs');
var vm = require('vm');

var bReactContent = fs.readFileSync(__dirname + '/../dist/bReact.js', 'utf-8');

// Mock
var React = {
    createElement: function (_, config) {
        return config.className;
    }
};

var util = require('util');
var sandbox = { React: React };
vm.createContext(sandbox);
vm.runInNewContext(bReactContent, sandbox);

var bReact = sandbox.bReact;


function testBlock() {
    var props = {bBlock: 'my-block'};
    assert.equal(bReact.createElement(null, props), 'my-block');
}

function testElem() {
    var props = {bElem: 'my-block__elem'};
    assert.equal(bReact.createElement(null, props), 'my-block__elem');
}

function testSaveClassName() {
    var props = {bElem: 'my-block__elem', className: 'override'};
    assert.equal(bReact.createElement(null, props), 'my-block__elem override');
}

function testMods() {
    var props = {bBlock: 'my-block', bMods: {key: 'value'}};
    assert.equal(bReact.createElement(null, props), 'my-block my-block_key_value');

    var props = {bBlock: 'my-block', bMods: {key: true}};
    assert.equal(bReact.createElement(null, props), 'my-block my-block_key');
}

function testBevis() {
    bReact.bevis = true;

    var props = {bBlock: 'my-block', bMods: {key: 'value'}};
    assert.equal(bReact.createElement(null, props), 'my-block _key_value');

    var props = {bBlock: 'my-block', bMods: {key: true}};
    assert.equal(bReact.createElement(null, props), 'my-block _key');
}


testBlock();
testElem();
testSaveClassName();
testMods();
testBevis();

console.log('Class names generator - ok');
