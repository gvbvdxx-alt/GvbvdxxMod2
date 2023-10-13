/**
=========================================================
N O T I C E
This code your viewing now is very messy, and does not
have much of an expination, for now, you can still edit
it, but you might break something while doing so, I plan
on editing this to make it easier to modify, but for now,
just deal with it.
=========================================================
 */
var VMFull = require("./vmgrabber.js");
var ConvertPlainHTMLToHTML = require("./plaintohtml.js"); //basicly turns the html text into a html element
var flagLogoPlainText = require("!!raw-loader!./circleflag.svg").default;
var scaler = require("./scaler.js");
var monitors = require("./monitors.js");
var getProgressBarStyles = require("./progressbarstyle");
console.log(
    `%c****************************
     Gvbvdxx Mod 2 Player
-----------------------------
Disclaimer:
	 This mod is not in
	 any way affiliated
	 with Scratch.
****************************`,
    "color:orange;font-family:arial;font-weight:bold;");
var GM2Player = null;

var VideoProvider = require("./video.js");
var input = require("./input");
var gm2cvs = document.createElement("canvas");
var progressbar = document.createElement("progress");
var monitordiv = document.createElement("div");
var funnyGreenFlagThing = document.createElement("div");
var flagURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCwwLDgwLDgwIj48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAtMSI+PHBhdGggZD0iTTIxOSwyMDIuMDk4NnYtNDQuMTk3Mmg0MnY0NC4xOTcyeiIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMCwtMTQwKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjAyLDE4MGMwLC0yMC45ODY4MiAxNy4wMTMxOCwtMzggMzgsLTM4YzIwLjk4NjgyLDAgMzgsMTcuMDEzMTggMzgsMzhjMCwyMC45ODY4MiAtMTcuMDEzMTgsMzggLTM4LDM4Yy0yMC45ODY4MiwwIC0zOCwtMTcuMDEzMTggLTM4LC0zOHoiIGZpbGwtb3BhY2l0eT0iMC43NSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjAzLDE4MGMwLC0yMC40MzQ1IDE2LjU2NTUsLTM3IDM3LC0zN2MyMC40MzQ1LDAgMzcsMTYuNTY1NSAzNywzN2MwLDIwLjQzNDUgLTE2LjU2NTUsMzcgLTM3LDM3Yy0yMC40MzQ1LDAgLTM3LC0xNi41NjU1IC0zNywtMzd6TTIwMCwxODBjMCwtMjIuMDkxNCAxNy45MDg2LC00MCA0MCwtNDBjMjIuMDkxNCwwIDQwLDE3LjkwODYgNDAsNDBjMCwyMi4wOTE0IC0xNy45MDg2LDQwIC00MCw0MGMtMjIuMDkxNCwwIC00MCwtMTcuOTA4NiAtNDAsLTQweiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjEiLz48ZyBjbGlwLXBhdGg9InVybCgjY2xpcC0xKSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjIwLjg5NDIsMTYyLjk1MjVjMi44MDY2LC0yLjA4ODkgNi4yMTIsLTMuMjE3MSA5LjcxMDcsLTMuMjE3MWMzLjQ5ODcsMCA2LjkwNDEsMS4xMjgyIDkuNzEwOCwzLjIxNzF2MGMyLjgwNjYsMi4wODg5IDYuMjEyMSwzLjIxNzEgOS43MTA4LDMuMjE3MWMzLjQ5ODYsMCA2LjkwNDEsLTEuMTI4MiA5LjcxMDcsLTMuMjE3MXYyNi4yNjU4Yy0yLjgwNjYsMi4wODg5IC02LjIxMjEsMy4yMTcgLTkuNzEwNywzLjIxN2MtMy40OTg3LDAgLTYuOTA0MiwtMS4xMjgxIC05LjcxMDgsLTMuMjE3Yy0yLjgwNjcsLTIuMDg4OSAtNi4yMTIxLC0zLjIxNzEgLTkuNzEwOCwtMy4yMTcxYy0zLjQ5ODcsMCAtNi45MDQxLDEuMTI4MiAtOS43MTA3LDMuMjE3MSIgZmlsbD0iIzRjYmY1NiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTIzMC42MDUsMTYwLjk5ODJjLTMuMjI3MSwwIC02LjM2ODEsMS4wNDA2IC04Ljk1NjksMi45NjczYy0wLjU1OTQsMC40MTY0IC0xLjM1MDUsMC4zMDA0IC0xLjc2NjksLTAuMjU5MWMtMC40MTY0LC0wLjU1OTQgLTAuMzAwNCwtMS4zNTA1IDAuMjU5MSwtMS43NjY5YzMuMDI0NSwtMi4yNTExIDYuNjk0MywtMy40NjY4IDEwLjQ2NDcsLTMuNDY2OGMzLjc3MDMsMCA3LjQ0MDEsMS4yMTU3IDEwLjQ2NDcsMy40NjY4YzIuNTg4NywxLjkyNjcgNS43Mjk3LDIuOTY3MyA4Ljk1NjgsMi45NjczYzMuMjI3LDAgNi4zNjgxLC0xLjA0MDYgOC45NTY4LC0yLjk2NzNjMC4zODMsLTAuMjg1MSAwLjg5NDEsLTAuMzI5NyAxLjMyMDgsLTAuMTE1NGMwLjQyNjYsMC4yMTQzIDAuNjk1OSwwLjY1MDkgMC42OTU5LDEuMTI4NHYyNi4yNjU4YzAsMC4zOTkxIC0wLjE4ODYsMC43NzQ3IC0wLjUwODgsMS4wMTNjLTMuMDI0NiwyLjI1MTEgLTYuNjk0NCwzLjQ2NjggLTEwLjQ2NDcsMy40NjY4Yy0zLjc3MDMsMCAtNy40NDAxLC0xLjIxNTcgLTEwLjQ2NDcsLTMuNDY2OGMtMi41ODg4LC0xLjkyNjcgLTUuNzI5OCwtMi45NjczIC04Ljk1NjgsLTIuOTY3M2MtMy4yMjcxLDAgLTYuMzY4MSwxLjA0MDYgLTguOTU2OSwyLjk2NzNjLTAuNTU5NCwwLjQxNjQgLTEuMzUwNSwwLjMwMDQgLTEuNzY2OSwtMC4yNTkxYy0wLjQxNjQsLTAuNTU5NCAtMC4zMDA0LC0xLjM1MDUgMC4yNTkxLC0xLjc2NjljMy4wMjQ1LC0yLjI1MTEgNi42OTQzLC0zLjQ2NjkgMTAuNDY0NywtMy40NjY5YzMuNzcwMywwIDcuNDQwMSwxLjIxNTggMTAuNDY0NywzLjQ2NjljMi41ODg3LDEuOTI2NyA1LjcyOTcsMi45NjczIDguOTU2OCwyLjk2NzNjMy4wMTg0LDAgNS45NjE2LC0wLjkxMDQgOC40NDgsLTIuNjA0OHYtMjMuMzA1N2MtMi41NzY5LDEuNDE3NSAtNS40ODEzLDIuMTcwMiAtOC40NDgsMi4xNzAyYy0zLjc3MDMsMCAtNy40NDAxLC0xLjIxNTcgLTEwLjQ2NDcsLTMuNDY2OGMtMi41ODg4LC0xLjkyNjcgLTUuNzI5OCwtMi45NjczIC04Ljk1NjgsLTIuOTY3M3oiIGZpbGw9IiM0NTk5M2QiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0yMjAuODk0MiwxNTcuOTAxNGMxLjA0NjEsMCAxLjg5NDEsMC44NDggMS44OTQxLDEuODk0MXY0MC40MDg5YzAsMS4wNDYyIC0wLjg0OCwxLjg5NDIgLTEuODk0MSwxLjg5NDJjLTEuMDQ2MiwwIC0xLjg5NDIsLTAuODQ4IC0xLjg5NDIsLTEuODk0MnYtNDAuNDA4OWMwLC0xLjA0NjEgMC44NDgsLTEuODk0MSAxLjg5NDIsLTEuODk0MXoiIGZpbGw9IiM0NTk5M2QiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48L2c+PC9nPjwvc3ZnPg==";
funnyGreenFlagThing.style.position = "fixed";
funnyGreenFlagThing.style.top = "0px";
funnyGreenFlagThing.style.left = "0px";
funnyGreenFlagThing.style.width = "100vw";
funnyGreenFlagThing.style.height = "100vh";
funnyGreenFlagThing.style.opacity = "0.65";
funnyGreenFlagThing.style.background = "black";

funnyGreenFlagThing.style.cursor = "pointer";

var startFlag = document.createElement("img");

startFlag.src = flagURI;
startFlag.style.position = "fixed";
startFlag.style.top = "50%";
startFlag.style.left = "50%";

startFlag.style.width = "100px";
startFlag.style.height = "100px";

startFlag.style.marginLeft = "-50px";
startFlag.style.marginTop = "-50px";

startFlag.style.cursor = "pointer";

GM2Player = {
    options: {
        cloneLimit: true,
        width: 480,
        height: 360,
        fps: 30,
        clickToStart: true,
        miscLimits: true,
        fencing: true,
        useProgressBar: true,
        warpTimer: false,
        username: "player",
        useTurbomode: true,
        enableCompiler: true,
        hideCursor: false,
        progressBar: true,
        progressBarColors: true,
        project: "project.sb3?n=1",
        dataURIS: {}, //for the new GM2 packager, so all data will be contained into a single HTML file.
    },
    playerStarted: false,
    setOptions: function (setopts) {
        for (var opt of Object.keys(setopts)) {
            this.options[opt] = setopts[opt];
        }
        //when we modify the options, we must update them, only if the player has already started.
        if (this.playerStarted) {
            GM2Player.updateOptions();
        }
    },
    colors: {
        BGColor: "black",
        loadingBGColor: "black",
        progressBar: {
            incompleteBGColor: "#454544",
            incompleteBorderColor: "#696969",
            completeBGColor: "#fafaf7"
        },
        loadingText: "Please wait... Loading assets..."
    },
    cvs: gm2cvs,
    funnyGreenFlagThing: funnyGreenFlagThing,
    runtime: {
        vm: new VMFull.VirtualMachine(),
        storage: new VMFull.ScratchStorage(),
        audioEngine: new VMFull.AudioEngine(),
        svgRenderer: VMFull.SvgRenderer,
        renderer: new VMFull.Renderer(gm2cvs),
    },
    loaded: false,
    progressbar: progressbar,
    monitors: monitordiv,
    appElement: document.createElement("div"),
    loadingImage: null,
    updateOptions: function () {
        var app = GM2Player.appElement;
        var vm = GM2Player.runtime.vm;
        var clonesCap = 300;
        if (!GM2Player.options.cloneLimit) {
            clonesCap = Infinity;
        }
        vm.setRuntimeOptions({
            "maxClones": clonesCap,
            "miscLimits": GM2Player.options.miscLimits,
            "fencing": GM2Player.options.fencing
        });
        vm.setCompilerOptions({
            "enabled": GM2Player.options.enableCompiler,
            "warpTimer": GM2Player.options.warpTimer
        });
        vm.setStageSize(GM2Player.options.width, GM2Player.options.height);
        vm.setTurboMode(GM2Player.options.useTurbomode);
        vm.setFramerate(GM2Player.options.fps);
        vm.postIOData("userData", {
            username: GM2Player.options.username
        })

        if (GM2Player.options.hideCursor) {
            GM2Player.cvs.style.cursor = "none";
            GM2Player.monitors.style.cursor = "none";
        } else {
            GM2Player.cvs.style.cursor = "default";
            GM2Player.monitors.style.cursor = "default";
        }
        if (GM2Player.options.progressBar) {
            if (!GM2Player.loaded) {
                GM2Player.progressbar.hidden = false;
            } else {
                GM2Player.progressbar.hidden = true;
            }
        } else {
            GM2Player.progressbar.hidden = true;
        }
        if (GM2Player.options.loadingImage) {
            GM2Player.loadingImage.src = GM2Player.options.loadingImage;
            GM2Player.loadingImage.style.opacity = "1";
        } else {
            GM2Player.loadingImage.style.opacity = "0";
        }
        if (GM2Player.loaded) {
            app.style.background = GM2Player.colors.BGColor;
        } else {
            app.style.background = GM2Player.colors.loadingBGColor;
        }
    },
    start: function (d) {
        var runtime = GM2Player.runtime;
        var loadingimg = document.createElement("img");
        loadingimg.style.width = "100vw";
        loadingimg.style.height = "100vh";
        loadingimg.style.position = "fixed";
        loadingimg.style.left = "0px";
        loadingimg.style.top = "0px";
        GM2Player.loadingImage = loadingimg;

        var cvs = gm2cvs;

        //put the progress bar in the center of the screen.

        progressbar.style.position = "fixed";
        progressbar.style.top = "50%";
        progressbar.style.left = "50%";
        progressbar.style.width = "400px";
        progressbar.style.marginLeft = "-200px";
        progressbar.style.height = "32px";
        progressbar.style.marginTop = "-16px";

        if (d) {
            GM2Player.appElement = d;
        } else {
            console.warn("[GM2Player]: Its recommended that you use your own created DIV instead of GM2Players div.");
        }

        var app = GM2Player.appElement;
        var progressbarstyle = document.createElement("style");
        progressbarstyle.innerHTML = getProgressBarStyles(GM2Player.colors.progressBar);
        app.append(loadingimg);
        app.append(progressbarstyle);
        app.append(cvs);
        app.append(monitordiv);
        app.append(funnyGreenFlagThing);
        app.append(startFlag);

        app.append(progressbar);

        monitordiv.hidden = true;
        funnyGreenFlagThing.hidden = true;
        startFlag.hidden = true;

        app.style.position = "fixed";
        app.style.top = "0px";
        app.style.left = "0px";
        app.style.width = "100vw"; //take up 100% of the page.
        app.style.height = "100vh"; //take up 100% of the page.


        app.style.background = GM2Player.colors.loadingBGColor;

        //for the progress bar.
        //needs to be overwritten before loading the vm.
        var storage = runtime.storage;

        var _load = storage.webHelper.load;
        progressbar.min = 0;

        storage.webHelper.load = function (...args) {
            var result = _load.call(this, ...args)
                progressbar.max += 1;
            result.then(() => {
                progressbar.value += 1;
            })
            return result;
        };
        runtime.vm.attachStorage(runtime.storage);
        runtime.vm.attachRenderer(runtime.renderer);
        runtime.vm.attachV2BitmapAdapter(runtime.svgRenderer);
        runtime.vm.attachAudioEngine(runtime.audioEngine);

        scaler.monitorDiv = monitordiv;
        scaler.cvs = cvs;
        scaler.vm = runtime.vm;
        scaler.start(); //start the scaling loop.
        //runtime.vm.setVideoProvider(new VideoProvider(480, 360))
        runtime.vm.start();
        cvs.hidden = true;
        function startProject() {
            funnyGreenFlagThing.hidden = true;
            startFlag.hidden = true;
            input(runtime.vm, cvs, monitordiv); //monitordiv being the toucharea
            runtime.vm.greenFlag();
        }
        monitors.vm = runtime.vm;
        monitors.monitorWrapper = monitordiv;
        monitors.start();
        runtime.vm.runtime.emitProjectLoaded = function () {
            app.style.background = GM2Player.colors.BGColor;
            GM2Player.loaded = true;
            monitordiv.hidden = false;
            cvs.hidden = false;
            progressbar.hidden = true;
            loadingimg.hidden = true;
            if (GM2Player.options.clickToStart) {
                funnyGreenFlagThing.hidden = false;
                startFlag.hidden = false;
                funnyGreenFlagThing.addEventListener("click", startProject)
                startFlag.addEventListener("click", startProject)
            } else {
                startProject()
            }
        };
        GM2Player.updateOptions();
        (async function () {
            var assets = {};
            var dataURIs = GM2Player.options.dataURIS;
            if (Object.keys(dataURIs) > 0) {
                assets = dataURIs;
            } else {
                //no data urls, assuming that the project is using "dont pack assets" mode.
                //what is the point of using a asset list, when you already have the assets provided inside the project?
                var a = await fetch("assets/project.json?n=1");
                var b = await a.text();

                var data = JSON.parse(b);

                assets = {
                    "project": "assets/project.json?n=1" //use ?n=1 at end for automatic cache clearing for github
                };

                for (var target of data.targets) {
                    for (var costume of target.costumes) { //check the costumes for their files.
                        assets[costume.md5ext] = "assets/" + costume.md5ext + "?n=1"; //use ?n=1 at end for automatic cache clearing for github
                    }
                    for (var sound of target.sounds) { //check the sounds for their files.
                        assets[sound.md5ext] = "assets/" + sound.md5ext + "?n=1"; //use ?n=1 at end for automatic cache clearing for github
                    }
                }
                console.log("[GM2Player]: Created asset list from \"project.json\".", assets);
            }

            var AssetType = GM2Player.runtime.storage.AssetType;

            if (assets.project) {
                storage.addWebStore([AssetType.Project], () => assets.project)
                storage.addWebStore(
                    [AssetType.ImageVector, AssetType.ImageBitmap, AssetType.Sound],
                    ({
                        assetId,
                        dataFormat
                    }) => assets[`${assetId}.${dataFormat}`])
            }

            console.log("[GM2Player]: project download successfull.");
            runtime.vm.loadProject(data);
        })();
        GM2Player.playerStarted = true;
    }
};

console.log(VMFull);

window.GM2Player = GM2Player;
