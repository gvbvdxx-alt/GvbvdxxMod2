/**
	(C)Gvbvdxx 2023.
	This is a little usefull tool for handling that pain when
	you have to restart the command line, just to see your
	gvbvdxx pack program update, this automaticly does that
	for you, just like the real webpack dev server does.
	
	If you want automatic refresh, then add in this into your HTML file.
	
	<script>
		var updateWS = new WebSocket("ws://localhost:5737");
		updateWS.addEventListener("message", (e) => {
			if (e.data == "UPDATE") {
				window.location.reload();
			}
		});
	</script>
*/

//Change this stuff.

var devScriptPath = "dev.js"; //the dev server script for gvbvdxx pack.
var refreshUpdateServerPort = 5737; //websocket server port for detecting when to refresh.

//dont touch this stuff below.
var fs = require("fs");
var gvbvdxxPack = require("gvbvdxx-pack-2"); //only used to get src folder
var ws = require("ws");
var serv = new ws.WebSocketServer({port:refreshUpdateServerPort});
function updateFiles() {
		var files = gvbvdxxPack.scanFiles("./src/");
		files.forEach((file) =>{
			fs.unwatchFile(file);
		});
		files.forEach((file) =>{
			addCheckUpdate(file);
		});
}
setInterval(() => {
	
},0.5*1000);
var ls = null;
function doUpdate() {
	if (ls) {
		ls.kill();
	}
	
	setTimeout(() => {
		updateFiles();
	var { spawn } = require('node:child_process');
	ls = spawn('node', [devScriptPath], {stdio: "inherit"});
	serv.clients.forEach((ws) => {
		ws.send("UPDATE");
	})

	},1);
}
function addCheckUpdate(file) {
	fs.watchFile(file, {
	 
	  // Passing the options parameter
	  bigint: false,
	  persistent: true,
	  interval: 100,
	}, (curr, prev) => {
		console.log("File \""+file+"\" updated.");
	  doUpdate();
	})
}

updateFiles();
doUpdate();