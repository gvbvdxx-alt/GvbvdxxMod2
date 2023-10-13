var axios = require("axios"); //communicate with the roku, this way.

class Roku {
	constructor (ws) {
		this.ws = ws;
		this.connectedRokuIP = null;
		var t = this;
		ws.on("message", (raw) => {
			t.handleMessage(JSON.parse(raw));
		});
	}
	handleMessage (d) {
		this[d.funct](d);
	}
	connectToRoku (data) {
		this.connectedRokuIP = data.ip;
		this.updateXML(data);
	}
	checkConnectionWorks (data) {
		var t = this;
		axios.get(`http://${data.ip}:8060/`).then((res) => {
			//no thrown errors! then that means that the roku connection was successful.
			t.ws.send(JSON.stringify({
				type:"CheckConnectionResponse",
				id:data.id,
				val:true
			}))
		}).catch(() => {
			//catched a thrown error, return the connection as a failure.
			t.ws.send(JSON.stringify({
				type:"CheckConnectionResponse",
				id:data.id,
				val:false
			}))
		})
	}
	launchAppById (data) {
		if (this.connectedRokuIP) {
			axios.post(`http://${this.connectedRokuIP}:8060/launch/${data.id}`,"").then((res) => {}).catch(() => {})
		}
	}
	updateXML (data) {
		var sendid = -1;
		if (data) {
			sendid = data.id;
		}
		if (this.connectedRokuIP) {
			var t = this;
			function sendUpdateFinished() {
				t.ws.send(JSON.stringify({
					type:"UpdateFinished",
					id:sendid
				}))
			}
			axios.get(`http://${this.connectedRokuIP}:8060/`).then((res) => {
				var xml = res.data;
				t.ws.send(JSON.stringify({
					type:"UpdateXML",
					xml:xml,
					id:sendid
				}))
				axios.get(`http://${this.connectedRokuIP}:8060/query/device-info`).then((res) => {
					var xml = res.data;
					t.ws.send(JSON.stringify({
						type:"UpdateInfoXML",
						xml:xml,
						id:sendid
					}))
					axios.get(`http://${this.connectedRokuIP}:8060/query/apps`).then((res) => {
						t.ws.send(JSON.stringify({
							type:"UpdateAppsXML",
							xml:res.data,
							id:sendid
						}))
						sendUpdateFinished();
					}).catch(() => {
						t.connectedRokuIP = null;
						sendUpdateFinished();
						//setInterval(()=>{t.updateXML()},1)
					});
				}).catch(() => {
					t.connectedRokuIP = null;
					sendUpdateFinished();
					//setInterval(()=>{t.updateXML()},1)
				});
			}).catch(() => {
				t.connectedRokuIP = null;
				sendUpdateFinished();
				//setInterval(()=>{t.updateXML()},1)
			});
			
		} else {
			this.ws.send(JSON.stringify({
				type:"UpdateFinished",
				id:sendid
			}))
			var t = this;
			//setInterval(()=>{t.updateXML()},1)
		}
	}
	pressKey (data) {
		if (this.connectedRokuIP) {
			axios.post(`http://${this.connectedRokuIP}:8060/keypress/${data.key}`,"").then((res) => {
				
			}).catch(() => {
				
			});
		}
	}
}
module.exports = Roku;