
var apiURL = "https://gm2-proj-download.glitch.me/";
async function loadProject(arrayBuffer) {
	return await JSZip.loadAsync(arrayBuffer);
}
async function downloadProject(id) {
	var response = await fetch(apiURL+"project/"+id+"/download");
	var arrayBuffer = await response.arrayBuffer();
	return await loadProject(arrayBuffer);
}



module.exports = {loadFile:loadProject,downloadFile:downloadProject};