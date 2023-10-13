var ws = require("ws");
var wss = new ws.WebSocketServer({port:7423});

var helperExtensions = {
	roku:require("./roku/")
};


wss.on("connection",(ws) => {
	var helperExtension = null;
	ws.on("message", (raw) => {
		var data = JSON.parse(raw.toString());
		if (data.cmd == "setup") {
			helperExtension = new helperExtensions[data.type](ws);
		}
	});
})


process.stdout.write("  ____  ___ ___   ___   ___    __ __    ___  _      ____   ___  ____  \r\n /    ||   |   | /   \\ |   \\  |  |  |  /  _]| |    |    \\ /  _]|    \\ \r\n|   __|| _   _ ||     ||    \\ |  |  | /  [_ | |    |  o  )  [_ |  D  )\r\n|  |  ||  \\_/  ||  O  ||  D  ||  _  ||    _]| |___ |   _/    _]|    / \r\n|  |_ ||   |   ||     ||     ||  |  ||   [_ |     ||  | |   [_ |    \\ \r\n|     ||   |   ||     ||     ||  |  ||     ||     ||  | |     ||  .  \\\r\n|___,_||___|___| \\___/ |_____||__|__||_____||_____||__| |_____||__|\\_|\r\n                                                                      \r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \r\nThe program was started successfully, you can now load the extension in\r\nyour web browser.\r\n\r\nFor the first time loading, you will get a popup asking you to allow the app\r\nto create an internet server.");
process.title = "GModHelper";
process.on('uncaughtException', function (err) {
      // handle the error safely
	  console.log("The program threw an error:");
      console.log(err);
	  console.log("The program will continue to run though.");
    });