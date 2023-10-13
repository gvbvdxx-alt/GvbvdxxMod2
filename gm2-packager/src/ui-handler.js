/* Basicly makes the ui of the packager atually work.*/
var html = require("elements");
var gconsole = require("log");
var projectLoader = require("src/project-download.js");

//options for the packager.

var pkgOptions = { //tempomary options for packager to keep up with, so when they are compiled, they will be seen.
	project:"file",
	projectZip:null
};
//set some variables containing the elements, organized by diffrent screens.
var pdui = {
	modes:{
		download:html.getGPId("projectModeURL"),
		file:html.getGPId("projectModeFile")
	},
	projectDownloadID:html.getGPId("projectDownloadID"),
	loadingError:html.getGPId("loadError"),
	loadButton:html.getGPId("loadProjectButton"),
	projectFile:html.getGPId("projectFile"),
	loadingProject:html.getGPId("loadingProject"),
	projectLoadProgress:html.getGPId("projectLoadProgress"),
	internetNotice:html.getGPId("internetNotice")
};
//here is the real code.

//hide some stuff.
pdui.loadingProject.hidden = true;
pdui.internetNotice.hidden = true;

//handle when the radio buttons are pushed.

pdui.modes.download.addEventListener("change", () => {
	if (pdui.modes.download.checked) {
		pkgOptions.project = "download";
	}
});
pdui.modes.file.addEventListener("change", () => {
	if (pdui.modes.file.checked) {
		pkgOptions.project = "file";
	}
});
//I don't know why, but it feels unproffesional to use set interval on a project like this, ..just me.... ok.
setInterval(() => {
	pdui.internetNotice.hidden = (pkgOptions.project == "file");
},1000/60)

if (pkgOptions.project == "file") {
	pdui.modes.download.checked = false;
	pdui.modes.file.checked = true;
} else {
	pdui.modes.download.checked = true;
	pdui.modes.file.checked = false;
}

//makes it when you press the "load project" button, it will load the project.
pdui.loadingError.textContent = "";
pdui.loadButton.addEventListener("click", async () => {
	pdui.loadButton.hidden = true;
	pdui.loadingProject.hidden = false;
	pdui.loadingError.textContent = "";
	if (pkgOptions.project == "file") {
		if (pdui.projectFile.files[0]) {
			var reader = new FileReader();
			reader.onload = async function () {
				try{
					pkgOptions.projectZip = await projectLoader.loadFile(reader.result);
					gconsole.log("Project load from file complete.");
					pdui.loadButton.hidden = false;
					pdui.loadingProject.hidden = true;
				}catch(e){
					console.error(e);
					pdui.loadingError.textContent = "Error! The project file was unable to be loaded!";
					pdui.loadButton.hidden = false;
					pdui.loadingProject.hidden = true;
				}
			};
			reader.readAsArrayBuffer(pdui.projectFile.files[0]);
		} else {
			console.error(e);
			pdui.loadingError.textContent = "Project file not selected!";
			pdui.loadButton.hidden = false;
			pdui.loadingProject.hidden = true;
		}
	} else {
		try{
			pkgOptions.projectZip = await projectLoader.downloadFile(pdui.projectDownloadID.value);
			gconsole.log("Project download complete.");
			pdui.loadButton.hidden = false;
			pdui.loadingProject.hidden = true;
		}catch(e){
			console.error(e);
			pdui.loadingError.textContent = "The project was unable to be downloaded!";
			pdui.loadButton.hidden = false;
			pdui.loadingProject.hidden = true;
		}
	}
})