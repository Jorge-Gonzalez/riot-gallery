'use strict';

/*eslint-disable no-console*/

var yaml = require('js-yaml');
var markdown = require( "markdown" ).markdown;

var MarkdownYamlType = new yaml.Type('!md', {
  // 'sequence':array 'scalar':string 'mapping':object.
  kind: 'scalar',

  // Check if the input is suitable for this type.
  resolve: function (data) {
    return data !='';
  },

  construct: function (data) {
    return markdown.toHTML(data);
  }
});

var MARKDOWN_SCHEMA = yaml.Schema.create([ MarkdownYamlType ]);

module.exports  = MARKDOWN_SCHEMA;
