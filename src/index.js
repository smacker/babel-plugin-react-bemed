const fs = require('fs');
const path = require('path');
const babel = require('babel');

const bReactContent = fs.readFileSync(path.join(__dirname, 'bReact.js'), 'utf8');
const bReactASTBody = babel.parse(bReactContent).body[0];

function getOptions(file) {
  var opts = file.opts.extra['react-bemed'] || {};

  return {
    elemDelim: opts.elemDelim || '__',
    modDelim: opts.modDelim || '_',
    bevis: opts.bevis || false
  };
}

function camelToDash(input) {
  return input
          .replace(/([A-Z])/g, i => '-' + i.toLowerCase())
          .replace(/^-/, '');
}

function safeGetter(obj, getPath) {
  getPath = getPath.split('.');

  let result = obj;
  for (let i = 0; i < getPath.length; i++) {
    result = result[getPath[i]];
    if (!result) {
      return null;
    }
  }

  return result;
}

module.exports = function ({ Plugin, types: t }) {

  return new Plugin('plugin-smacker', {
    visitor: {
      Program(node, parent, scope, file) {
        const opts = getOptions(file);

        // set options from settings
        let properties = bReactASTBody.declarations[0].init.properties;
        properties[0].value = t.literal(opts.modDelim);
        properties[1].value = t.literal(opts.bevis);
        bReactASTBody._compact = true;

        this.unshiftContainer('body', bReactASTBody);
      },

      JSXOpeningElement(node, parent, scope, file) {
        if (!node.attributes.length) {
          return;
        }

        const opts = getOptions(file);

        let blockName = scope.data.__bemBlockName;

        if (!blockName) {
          // A functional component using an ES2015 (ES6) arrow function
          if (safeGetter(scope, 'block.type') === 'ArrowFunctionExpression' &&
              safeGetter(scope, 'parentBlock.type') === 'VariableDeclarator') {
            blockName = scope.parentBlock.id.name;
          // Class component
          } else if (safeGetter(scope, 'parent.block.type') === 'ClassDeclaration') {
            blockName = scope.parent.block.id.name;
          }

          if (blockName) {
            blockName = camelToDash(blockName);
            scope.data.__bemBlockName = blockName;
          } else {
            // Don't process unknown constractions
            return;
          }
        }

        node.attributes.forEach(attr => {
          if (attr.name.name === 'bElem') {
            attr.value = t.literal(blockName + opts.elemDelim + attr.value.value);
            return;
          }

          if (attr.name.name === 'bBlock') {
            attr.value = t.literal(blockName);
          }
        });
      }
    }
  });

};
