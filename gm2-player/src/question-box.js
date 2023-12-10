var checkURI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjIgKDU3NTE5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5HZW5lcmFsL0NoZWNrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTcuODYxNDQwNTksMTUuNDAyODc3NiBDNy40MzUyNjg1OSwxNS40MDI4Nzc2IDcuMDA5MDk2NTgsMTUuMjM5NzMzNiA2LjY4NDQ3MzM4LDE0LjkxNTExMDQgTDMuNDg4MTgzMzYsMTEuNzE4ODIwNCBDMi44MzcyNzIyMSwxMS4wNjc5MDkzIDIuODM3MjcyMjEsMTAuMDE1Nzk3MSAzLjQ4ODE4MzM2LDkuMzY0ODg2IEM0LjEzOTA5NDUsOC43MTM5NzQ4NSA1LjE5MTIwNjY0LDguNzEzOTc0ODUgNS44NDIxMTc3OCw5LjM2NDg4NiBMNy44NjE0NDA1OSwxMS4zODQyMDg4IEwxNC4xNTkxMzA4LDUuMDg4MTgzMzYgQzE0LjgwODM3NzIsNC40MzcyNzIyMSAxNS44NjIxNTQsNC40MzcyNzIyMSAxNi41MTMwNjUyLDUuMDg4MTgzMzYgQzE3LjE2MjMxMTYsNS43Mzc0Mjk3NyAxNy4xNjIzMTE2LDYuNzkxMjA2NjQgMTYuNTEzMDY1Miw3LjQ0MjExNzc4IEw5LjAzODQwNzgsMTQuOTE1MTEwNCBDOC43MTM3ODQ2LDE1LjIzOTczMzYgOC4yODc2MTI1OSwxNS40MDI4Nzc2IDcuODYxNDQwNTksMTUuNDAyODc3NiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IkdlbmVyYWwvQ2hlY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHVzZSBpZD0iQ2hlY2siIGZpbGw9IiM1NzVFNzUiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgIDxnIGlkPSJDb2xvci9XaGl0ZSIgbWFzaz0idXJsKCNtYXNrLTIpIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IkNvbG9yIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
var checkBoxDiv = document.createElement("div");
checkBoxDiv.style.position = "fixed";
checkBoxDiv.style.bottom = "0px";
checkBoxDiv.style.left = "50%";
checkBoxDiv.style.width = "70%";
checkBoxDiv.style.height = "64px";
checkBoxDiv.style.marginLeft = "calc(70% / -2)";
checkBoxDiv.style.backgroundColor = "white";
checkBoxDiv.style.borderStyle = "solid";
checkBoxDiv.style.borderRadius = "0.5rem";
checkBoxDiv.style.borderColor = "hsla(0, 0%, 0%, 0.15)";
checkBoxDiv.style.borderWidth = "2px";
checkBoxDiv.style.display = "flex";

var checkBoxLabel = document.createElement("div");
checkBoxLabel.style.fontWeight = "bold";
checkBoxLabel.style.color = "hsla(225, 15%, 40%, 1)";
checkBoxLabel.style.fontSize = "15px";
checkBoxLabel.style.marginLeft = "2px";
checkBoxLabel.style.position = "absolute";
checkBoxLabel.style.top = "5px";
checkBoxLabel.style.left = "2px";

var checkBoxInput = document.createElement("input");
checkBoxInput.style.fontWeight = "bold";
checkBoxInput.style.color = "hsla(225, 15%, 40%, 1)";
checkBoxInput.style.fontSize = "0.75rem";
checkBoxInput.style.marginTop = "25px";
checkBoxInput.style.width = "95%";
checkBoxInput.style.height = "50%";
checkBoxInput.style.borderStyle = "solid";
checkBoxInput.style.borderColor = "hsla(0, 0%, 0%, 0.15)";
checkBoxInput.style.borderWidth = "1px";
checkBoxInput.style.borderRadius = "2rem";

var checkBoxImage = document.createElement("img");
checkBoxImage.src = checkURI;
checkBoxImage.style.width = "calc(2rem - 0.5rem)";
checkBoxImage.style.height = "calc(2rem - 0.5rem)";

var checkBoxAccept = document.createElement("div");
checkBoxAccept.style.width = "calc(2rem - 0.5rem)";
checkBoxAccept.style.height = "calc(2rem - 0.5rem)";
checkBoxAccept.style.backgroundColor = "hsla(30, 100%, 65%, 1)";
checkBoxAccept.style.borderRadius = "100%";
checkBoxAccept.style.marginTop = "30px";
checkBoxAccept.style.marginLeft = "10px";
checkBoxAccept.style.cursor = "pointer";

checkBoxAccept.append(checkBoxImage);


checkBoxDiv.append(checkBoxLabel);
checkBoxDiv.append(document.createElement("br"));
checkBoxDiv.append(checkBoxInput);
checkBoxDiv.append(checkBoxAccept);

var checkBoxContainer = document.createElement("div");
checkBoxContainer.append(checkBoxDiv);

var checkBox = {
	element:checkBoxContainer,
	run: function (vm,input) {
		checkBoxContainer.hidden = true;
		vm.runtime.addListener('QUESTION', questionData => {
			setTimeout(() => {
				if (!(questionData === null)) {
					checkBoxContainer.hidden = false;
					checkBoxInput.value = ""; //make the box empty
					checkBoxInput.focus(); //make it focused
					checkBoxLabel.textContent = questionData;
					input.disabled = true;
				} else {
					//returns null when something else cancels it.
					checkBoxContainer.hidden = true;
					input.disabled = false;
				}
			},1000*0.05); //0.05 seconds
		})
		function hidebox() {
			//hide the box because we do not need it anymore.
			checkBoxContainer.hidden = true;
			//send the info to the vm.
			vm.runtime.emit('ANSWER', checkBoxInput.value);
			input.disabled = false;
		}
		checkBoxInput.onkeydown = (e) => {
			if (e.key.toLowerCase() == "enter") {
				hidebox();
			}
		};
		checkBoxAccept.onclick = () => {
			hidebox();
		};
	}
};

module.exports = checkBox;