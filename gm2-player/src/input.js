var inputFull = {
	disabled: false,
	run: function (vm, canvas, touchareas) {
		//add inputs for vm and mouse.
		//key down input
		document.addEventListener("keydown", (e) => {
			if (!inputFull.disabled) {
				vm.postIOData("keyboard", {
					isDown: true,
					key: e.key
				})
			}
		})
		//key up input
		document.addEventListener("keyup", (e) => {
			vm.postIOData("keyboard", {
				isDown: false,
				key: e.key
			})
		})
		//mouse input


		var mousedata = {
			x: 0,
			y: 0,
			down: false
		};
		function sendMouse(event) {
			try {
				const {
					x,
					y
				} = mousedata
					var rect = canvas.getBoundingClientRect();
				const mousePosition = {
					x: x - rect.left,
					y: y - rect.top
				}
				vm.postIOData('mouse', {
					isDown: mousedata["down"],
					...mousePosition,
					canvasWidth: rect.width,
					canvasHeight: rect.height
				})
			} catch (e) {
				//try again when function called
				//if throws an error then ignore (this fixes most bugs.)
			};
			setTimeout(sendMouse, 1);
			return;
		}
		setTimeout(sendMouse, 1);
		//set X And Y Cords
		for (var toucharea of touchareas) {
			toucharea.addEventListener("mousemove", (e) => {
				mousedata.x = e.x;
				mousedata.y = e.y;
			})
		}
		//Set mouse down.
		canvas.addEventListener("mousedown", (e) => {
			if (!inputFull.disabled) {
				mousedata.down = true;
			}
		})
		document.addEventListener("mouseup", (e) => {
			mousedata.down = false;
		})
	}
}
module.exports = inputFull;