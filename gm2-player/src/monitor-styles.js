//idk where to put this, i think monitors script will be better place, but idk.
var monitorStylesReal = document.createElement("style");

monitorStylesReal.innerHTML = `
			.monitor {
			  position: absolute;
			  border: 1px solid transparent;
			  border-radius: 0.25rem;
			  font-size: 0.75rem;
			  overflow: hidden;
			  padding: 3px;
			  white-space: pre;
			}
			.custom-monitor-colour .default .monitor-value,
			.custom-monitor-colour .slider .monitor-value,
			.custom-monitor-colour .large,
			.custom-monitor-colour .row-value {
				background-color: #8c8c8c;
			}
			.monitor {
				color: #575e75;
				font-family: arial;
				background-color: hsla(215, 100%, 95%, 1);
				border-style: solid;
				border-color: hsla(0, 0%, 0%, 0.15);
			}
			.show-monitor-box .monitor {
			  border-color: rgba(0, 0, 0, 0.2);
			  background-color: rgba(0, 0, 0, 0.3);
			}
			.monitor-label {
			  margin: 0 5px;
			  font-weight: bold;
			}
			.monitor-value {
			  display: inline-block;
			  vertical-align: top;
			  min-width: 34px;
			  text-align: center;
			  border-radius: 0.25rem;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  user-select: text;
			  transform: translateZ(0);
			background-color: rgb(255, 140, 26);
			color: white;
			height: 100%;
			min-height:11px;
			}
			.default .monitor-value,
			.slider .monitor-value {
			  margin: 0 5px;
			  padding: 1px 3px;
			}
			.show-monitor-box .default .monitor-value,
			.show-monitor-box .slider .monitor-value {
			  background-color: rgba(0, 0, 0, 0.5);
			}
			.large {
			  padding: 0.1rem 0.25rem;
			  min-width: 3rem;
			  background:none;
			  border:none;
			  min-width: 45px;
				margin-left: -3px;
				height: 23px;
			width:fit-content;
			}
			.show-monitor-box .large {
			  background-color: rgba(0, 0, 0, 0.6);
			}
			.large .monitor-label {
			  display: none;
			}
			.large .monitor-value {
			  font-size: 1rem;
			  min-width: 100%;
			  height:100%;
			  width:fit-content;
			  border-width: 1px;
			  border-color: lightgrey;
			  border-style: solid;
			}
			.list {
			  padding: 0;
			  overflow: hidden;
			  overflow-x: hidden;
			}
			.list .monitor-label {
			  text-align: center;
			  padding: 3px;
			  width: 100%;
			  display: block;
			  margin: 0;
			  box-sizing: border-box;
			  white-space: pre-wrap;
			  background: hsla(0, 100%, 100%, 1);
			  border-bottom: 1px solid hsla(0, 0%, 0%, 0.15);
			}
			.list .monitor-value {
			  display: block;
			  overflow-y: scroll;
			  background: none;
			  height: calc(100% - 20px);
			}
			.row {
			  display: flex;
			  align-items: center;
			  padding: 2px;
			  height: 24px;
			  box-sizing: border-box;
			  transform: translateZ(0);
			}
			.index {
			  font-weight: bold;
			  margin: 0 3px;
			  flex: none;
			   color: hsla(225, 15%, 40%, 1);
			}
			.row-value {
			  flex: auto;
			  margin: 0 3px;
			  text-align: left;
			  border-radius: 0.25rem;
			  border: 1px solid transparent;
			  height: 22px;
			  padding: 3px 5px;
			  box-sizing: border-box;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  background: rgb(255, 102, 26);
				color: rgb(255, 255, 255);
				
			border-radius: calc(0.5rem / 2);
			border: 1px solid hsla(0, 0%, 0%, 0.15);
			}
			.show-monitor-box .row-value {
			  border-color: rgba(0, 0, 0, 0.2);
			  background-color: rgba(0, 0, 0, 0.5);
			}
			.slider input {
			  display: block;
			  width: 100%;
			  transform: translateZ(0);
			}
`;

document.body.append(monitorStylesReal);
