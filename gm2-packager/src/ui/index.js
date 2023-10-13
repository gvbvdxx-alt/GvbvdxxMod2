module.exports = [
	{
        element: "p",
        textContent: "Gvbvdxx Mod 2 Project Packager",
        style: {
            fontSize: "30px",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold"
        }
    },
	{
		element: "span",
		textContent: "Convert scratch projects to html, featuring support for Gvbvdxx Mod 2 extensions."
	},
	{element:"br"},
	{
		element: "span",
		style:{
			fontStyle:"italic"
		},
		textContent: "This site is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
	},
	{element:"br"},
	{element:"hr"},
	{
		element:"div",
		gid:"packagerScreenMain",
		children: require("src/ui/loadScreen.js")
	}
];
