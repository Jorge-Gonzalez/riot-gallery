'use strict';

/*eslint-disable no-console*/

var fs   = require('fs');
var path = require('path');
var util = require('util');
var yaml = require('js-yaml');
var markdown = require( "markdown" ).markdown;

var MarkdownYamlType = new yaml.Type('!md', {
  // 'sequence' (arrays) 'scalar' (string) 'mapping' (object).
  kind: 'scalar',

  // Loader must check if the input object is suitable for this type.
  resolve: function (data) {
    return typeof data === 'string' || data instanceof String;
  },

  construct: function (data) {
    console.log('cosntruct')
    return markdown.toHTML(data);
  }
});

// After our types are defined, it's time to join them into a schema.
var MARKDOWN_SCHEMA = yaml.Schema.create([ MarkdownYamlType ]);

// do not execute the following if file is required (http://stackoverflow.com/a/6398335)
if (require.main === module) {

  // And read a document using that schema.
  fs.readFile(path.join(__dirname, 'custom_types.yml'), 'utf8', function (error, data) {
    var loaded;

    if (!error) {
      loaded = yaml.load(data, { schema: SPACE_SCHEMA });
      console.log(util.inspect(loaded, false, 20, true));
    } else {
      console.error(error.stack || error.message || String(error));
    }
  });
}

module.exports.MarkdownYamlType = MarkdownYamlType;
module.exports.MARKDOWN_SCHEMA  = MARKDOWN_SCHEMA;
