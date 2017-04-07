var yaml = require('js-yaml');
var fs = require('fs');
var markdown = require( "markdown" ).markdown;

var args = process.argv.splice(process.execArgv.length + 2);

args.forEach( function(filename) {

	try {
	  var doc = yaml.safeLoad(fs.readFileSync(filename+'.yml', 'utf8'));
	  console.log( doc.push );
	} catch (e) {
	  console.log(e);
	}

	// fs.readFile(filename+'.md', function (err, input) {
 //    if (err) {
 //      return console.error(err);
 //    }
 //    var output = yamlFront.loadFront(input);
 //    output.desc = markdown.toHTML(output.__content);
	// 	delete output.__content;

	// 	fs.writeFile(filename+'.json', JSON.stringify(output), function (err) {
	// 	  if (err) return console.log(err);
	// 	  console.log('created > %s.json', filename);
	// 	});
	// });
});
