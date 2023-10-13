function PlainHTMLTextToHTML(plain) {
	var div = document.createElement("div");
	div.innerHTML = plain;
	return div.children[0];
}
module.exports = PlainHTMLTextToHTML;