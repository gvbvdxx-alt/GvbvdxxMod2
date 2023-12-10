var options = {}; //Init our options
var colors = GM2Player.colors;

//Turbowarp options.

options.cloneLimit = false; //if you want more then 300 clones, this does that, changing it to true enables the 300 limit.
options.miscLimits = false; //other limits that scratch has, false means disable these, like sound pitch and stuff.
options.fps = 30; //frames per second, default is 60, the heigher, the more faster your project runs, the lower the slower it runs.
options.fencing = true; //fencing allows for sprites to get bigger or small as they want, allows them to go offscreen, ext.
options.width = 480; //default stage width is 480.
options.height = 360; //default stage height is 360.
options.warpTimer = false; //set to true to prevent projects from crashing suddenly.
options.enableCompiler = true; //makes scratch projects run faster by compiling them.
options.highQualityPen = true; //if true, makes the pen high quality looking.

//Player options.

options.useTurbomode = false; //use turbo mode, turbo mode makes your project run like crazy, increases the fps by alot, usefull for those very slow projects.
options.hideCursor = false; //set to true to hide the cursor (DOES NOT LOCK THE POINTER).
options.clickToStart = false; //in a situatuon, such as animations, you will NEED this enabled, so your audio will sync, this is because the audio will not start to play until you interact with the page, like clicking it.

//Loading screen options.

options.loadingImage = null; //change the null to something (example: "myimage.png") if you want a image in the background displayed when the project is loading.
options.progressBar = true; //show how much of the assets are loaded.
options.progressBarColors = true; //make the progress bar have a style, instead of the browsers default.

//Set the options.

GM2Player.setOptions(options);

//Player colors.

/* These Can Only Be Set Before The Player Loads, Not After */
colors.BGColor = "black"; //the color displayed behind the project, appears after loading.
colors.loadingBGColor = "black"; //the background color displayed when loading the project.
colors.progressBar.incompleteBGColor = "#454544"; //the color displayed for the incomplete amount on the progress bar.
colors.progressBar.incompleteBorderColor = "#696969"; //the progress bar's background color.
colors.progressBar.completeBGColor = "#fafaf7"; //the complete part's color of the progress bar

//Start loading and run the project!
GM2Player.start(document.getElementById("Player"));