var gvbvdxxPack = require("gvbvdxx-pack-2");
var fs = require("fs");
var files = gvbvdxxPack.scanFiles("./src/");
var compiledCode = gvbvdxxPack.compile(files,false);
gvbvdxxPack.devServer(compiledCode, fs.readFileSync("src/index.html"), 3625);
