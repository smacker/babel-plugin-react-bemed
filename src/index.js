const fs = require('fs');
const babel = require('babel')

const bReactContent = fs.readFileSync(__dirname + '/bReact.js', 'utf8');
const bReactASTBody = babel.parse(bReactContent.replace('\n', '')).body[0];

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

module.exports = function ({ Plugin, types: t }) {

  return new Plugin('plugin-smacker', {
    visitor: {
      Program(node, parent, scope, file) {
        const opts = getOptions(file);

        // set options from settings
        let properties = bReactASTBody.declarations[0].init.properties;
        properties[0].value = t.literal(opts.modDelim);
        properties[1].value = t.literal(opts.bevis);

        this.unshiftContainer('body', bReactASTBody);
      },

      JSXOpeningElement(node, parent, scope) {
        var ln = node.attributes.length;

        if (!ln) {
          return
        }

        const opts = getOptions(scope.hub.file);

        var blockName = scope.parent.block.id.name;
        blockName = camelToDash(blockName);

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
