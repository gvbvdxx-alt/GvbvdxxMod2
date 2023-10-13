module.exports = [
	{
		element:"span",
		textContent:"Choose project type:"
	},
		{element:"br"},
	{
		element:"div",
		children:[
			{
				element:"div",
				children:[
					{
						element:"input",
						hidden:true,
						type:"radio",
						name:"projectMode",
						gid:"projectModeURL"
					},
					{
						element:"span",
						hidden:true,
						textContent:"Download project from id:"
					},
					{
						hidden:true,
						element:"input",
						type:"number",
						title:"The number in the scratch project's url.",
						min:1,
						gid:"projectDownloadID",
						value:60917032
					}
				]
			},
			{
				element:"div",
				children:[
					{
						element:"input",
						type:"radio",
						name:"projectMode",
						gid:"projectModeFile"
					},
					{
						element:"span",
						textContent:"File:"
					},
					{
						element:"input",
						type:"file",
						gid:"projectFile",
						accept: ".sb3"
					}
				]
			}
		]
	},
	{
		element:"b",
		style: {
			fontStyle:"italic"
		},
		gid: "internetNotice",
		textContent:"NOTICE: this requires you to have an proper internet connection to connect to the scratch server and download the project."
	},
	
	{ element:"hr" },
	{
		element:"span",
		textContent:"You must load a project to continue."
	},
	{ element:"br" },
	{
		element:"button",
		gid:"loadProjectButton",
		className:"buttonOrange",
		textContent:"Load project."
	},
	{ element:"div", gid:"loadingProject", children:[
			{
				element:"span",
				textContent:"Loading project... (This may take a while if your project has alot of assets)"
			}
		]
	},
	{element:"br"},{element:"br"},
	{
		element:"span",
		gid:"loadError",
		style:{
			color:"red",
			fontWeight:"bold"
		}
	}
];