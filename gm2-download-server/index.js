var PORT = 8080;

var fetch = require('node-fetch');
var express = require("express");
var jszip = require("jszip");
var app = express();

function fixCors(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}
app.use(function(req, res, next) {
	
	console.log(`[${req.headers['x-forwarded-for'] || req.connection.remoteAddress}]: ${req.method} ${req.url} ${req.headers["user-agent"]}`);
	
	next();
});
app.get('/', function (req, res) {
    res.send("<!DOCTYPE HTML>\n<html>\n<head>\n<title>API Only</title>\n</head>\n<body>\n<h2>API ONLY for Gvbvdxx Mod 2 Packager.</h2>\n</body>\n</html>");
});

app.get('/project/:id/download', async function (req, res) {
  var fakeHeaders = {};
  /*for (var header of Object.keys(req.headers)) {
    if (!((header == "host") ||
(header == "x-forwarded-for") ||
(header == "x-forwarded-proto") ||
(header == "x-forwarded-port") ||
(header == "x-forwarded-host")))
      {
        fakeHeaders[header] = req.headers[header];
    }
  }*/
  fakeHeaders.Cookie = "scratchlanguage=en;";
  fakeHeaders["X-CSRFToken"] = "a";
  fakeHeaders.referer = "https://scratch.mit.edu";
  fixCors(res);
    var ipAddress = req.socket.remoteAddress;
	var projectDownloadID = req.params.id;
	var zipfile = new jszip();
    try {
		function getProjectAssetURL(asset) {
			return `https://assets.scratch.mit.edu/internalapi/asset/${asset}/get`;
		}
      var tmp1 = await (await fetch("https://api.scratch.mit.edu/projects/"+projectDownloadID,{headers:fakeHeaders})).text();
	 	var projectInfo = JSON.parse(tmp1);
		var projectSB3Json = JSON.parse(await (await fetch("https://projects.scratch.mit.edu/"+projectDownloadID+"?token="+projectInfo.project_token,{headers:fakeHeaders})).text());
		zipfile.file("project.json",JSON.stringify(projectSB3Json,null,"\t"),{text:true});
		for (var target of projectSB3Json.targets) {
			for (var costume of target.costumes) {
				var buffer = await (await fetch(getProjectAssetURL(costume.md5ext),{headers:fakeHeaders})).buffer();
				var base64 = buffer.toString('base64');
				zipfile.file(costume.md5ext,base64,{base64:true});
			}
			for (var sound of target.sounds) {
				var buffer = await (await fetch(getProjectAssetURL(sound.md5ext),{headers:fakeHeaders})).buffer();
				var base64 = buffer.toString('base64');
				zipfile.file(sound.md5ext,base64,{base64:true});
			}
		}
		var zipbuffer = await zipfile.generateAsync({type:"nodebuffer"});
		res.setHeader('content-type', 'application/zip');
		res.send(zipbuffer);
    } catch (e) {
		console.log(e);
        res.status(400);
		res.send();
    }

});

app.listen(PORT);

console.log("Server Is Listening On " + PORT);