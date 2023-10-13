require("src/jszip.js");
var html = require("elements"); //html is outdated module and does not work that good, or even at all, but elements does work.
var file = require("file-loader");

var packagerUI = require("src/ui/index.js");

var body = html.createElementsFromJSON([
	{
		element:"style",
		innerHTML:file.read("src/stylesheet.css")
	},
	{
		element:"div",
		className: "packager-div",
		children: packagerUI
	}
]);
html.appendElements(document.body, body); //append all the elements.

require("src/ui-handler.js");