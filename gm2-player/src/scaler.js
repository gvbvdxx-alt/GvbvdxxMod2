//scales the canvas and the monitors.


var scaler = {
	monitorDiv:document.createElement("div"),
	cvs:null,
	vm:null,
	start:function () {
		//setup canvas for use on scaler.
		
		scaler.cvs.style.position = "fixed";
		scaler.cvs.style.top = "50%";
		scaler.cvs.style.left = "50%";
		
		//do the same for monitors.
		
		scaler.monitorDiv.style.position = "fixed";
		scaler.monitorDiv.style.top = "50%";
		scaler.monitorDiv.style.left = "50%";
		var lastScale = 0;
		
		var lastwidth = 480;
		var lastheight = 360;
		setInterval(() => {
			var width = scaler.vm.runtime.stageWidth;
			var height = scaler.vm.runtime.stageHeight;
			var scale = window.innerHeight/height; //basicly finds how many times the stages height
			if (!((lastScale == scale) && (lastwidth == width) && (lastheight == height))) {
				//resize canvas.
				scaler.cvs.width = (scale*width);
				scaler.cvs.height = (scale*height);
				scaler.cvs.style.marginLeft = `-${(scale*width)/2}px`;
				scaler.cvs.style.marginTop = `-${(scale*height)/2}px`;
				
				//scale monitors.
				scaler.monitorDiv.style.width = (width)+"px";
				scaler.monitorDiv.style.height = (height)+"px";
				scaler.monitorDiv.style.marginLeft = `-${(width)/2}px`;
				scaler.monitorDiv.style.marginTop = `-${(height)/2}px`;
				scaler.monitorDiv.style.transform = `scale(${scale})`;
				
				lastScale = scale;
				
				lastwidth = width;
				lastheight = height;
			}
		},1)
	}
};
module.exports = scaler;