//Convert turbowarp extensions into GM2 extensions, using the turbowarp-new-extensions-support.js file

var fs = require("fs");
var path = require("path");

function generate(textContents) {
	
		var allLines = textContents.split("\r\n");
		var end = allLines.length-1;
		var p1 = allLines[end-1];
		
		var extensionConverted = "var extensionSupport = require('../turbowarp-new-extensions-support.js');module.exports = extensionSupport";
		extensionConverted += "\n";
		extensionConverted += allLines.slice(0,allLines.length-3).join("\r\n");
		extensionConverted += "\n";
		extensionConverted += "  return ";
		extensionConverted += allLines[end-2].replaceAll("Scratch.extensions.register(new","").replaceAll(" ","").replaceAll("());",";");
	extensionConverted += "\n});";
	return extensionConverted;
}
var extensions = JSON.parse(fs.readFileSync("extensions/extensions/extensions.json").toString());

for (var ext of extensions) {
	try{
		fs.writeFileSync(path.join("generated/",ext.replaceAll("/","_")+".js"),generate(fs.readFileSync(path.join("extensions/extensions/",ext+".js"),{encoding:"UTF-8"})));
	}catch(e){}
}