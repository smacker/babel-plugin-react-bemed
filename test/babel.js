var babel = require('babel');
var chalk = require('chalk');
var diff = require('diff');
var fs = require('fs');

require('babel/register');

var pluginPath = require.resolve('../dist');

function runTest() {
    var output = babel.transformFileSync(__dirname + '/fixtures/actual.js', {
        optional: ['runtime'],
        plugins: [pluginPath],
        jsxPragma: 'bReact.createElement'
    });

    var expected = fs.readFileSync(__dirname + '/fixtures/expected.js', 'utf-8');

    function normalizeLines(str) {
        return str.trimRight().replace(/\r\n/g, '\n');
    }

    var parts = diff.diffLines(normalizeLines(output.code), normalizeLines(expected));
    var filesAreSame = parts.reduce(function (result, part) {
        return (!part.added && !part.removed) && result;
    }, true);

    if (filesAreSame) {
        console.log('Babel transformation - ok');
        return;
    }

    parts.forEach(function (part) {
        var value = part.value;
        if (part.added) {
            value = chalk.green(part.value);
        } else if (part.removed) {
            value = chalk.red(part.value);
        }
        process.stdout.write(value);
    });

    console.log();
}

runTest();
