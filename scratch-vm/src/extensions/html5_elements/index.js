const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const turnSkinIntoImageData = (skin) => {
    const svgSkin = /** @type {RenderWebGL.SVGSkin} */(skin);
    if (svgSkin._svgImage) {
        // This is an SVG skin
        return null;
    }

    // It's probably a bitmap skin.
    // The most reliable way to get the bitmap in every runtime is through the silhouette.
    // This is very slow and could involve reading the texture from the GPU.
    const silhouette = skin._silhouette;
    // unlazy() only exists in TW
    if (silhouette.unlazy) {
        silhouette.unlazy();
    }
    const colorData = silhouette._colorData;
    const width = silhouette._width;
    const height = silhouette._height;
    const imageData = new ImageData(
            colorData,
            silhouette._width,
            silhouette._height);
    return {
        img: imageData,
        width: silhouette._width,
        height: silhouette._height
    };
};

class Scratch3NewBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        this.vm = runtime.vm;
        this.canvases = {};
    }

    getInfo() {
        return {
            id: 'html5',
            name: 'HTML5',
            color1: "#ff5500",
            color2: "#ba562b",
            color3: "#853e20",
            blocks: [{
                    opcode: 'showspritecanvas',
                    blockType: BlockType.COMMAND,
                    text: 'Show current costume at x: [x] y: [y] with id: [id]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                }, {
                    opcode: 'hidespritecanvas',
                    blockType: BlockType.COMMAND,
                    text: 'Remove costume on page by id: [id]',
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                }, {
                    opcode: 'movespritecanvas',
                    blockType: BlockType.COMMAND,
                    text: 'Move costume on page to x: [x] y: [y] using id: [id]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                }
            ],
            menus: {}
        };
    }

    showspritecanvas(args, util) {
        try {
            var id = Cast.toString(args.id);
            var x = Cast.toNumber(args.x);
            var y = Cast.toNumber(args.y);
            if (this.canvases[id]) {
                this.canvases[id].cvs.remove();
            }
            var costume = util.target.getCostumes()[util.target.currentCostume];
            var skin = this.vm.renderer._allSkins[costume.skinId];
            var imgData = turnSkinIntoImageData(skin);
            if (imgData) {
                var cvs = document.createElement("canvas");
                var ctx = cvs.getContext("2d");
                cvs.width = imgData.width;
                cvs.height = imgData.height;
                ctx.putImageData(imgData.img, 0, 0);

                cvs.style.zIndex = "495938586395868";
                cvs.style.position = "fixed";
				this.useCostumeRotationToAlignPos(costume,cvs,x,y);

                document.body.appendChild(cvs);

                this.canvases[id] = {cvs:cvs,cos:costume};
            }
        } catch (e) {
            console.error("HTML5 extension error", e);
        }
    }
	
	useCostumeRotationToAlignPos(cos,cvs,x2,y2) {
		var x = x2;
		x += (cos.rotationCenterX*-1);
		var y = y2;
		y += (cos.rotationCenterY*-1);
		cvs.style.left = x + "px"; //allways gets me, why dont they make a second css property that replaces that.
        cvs.style.top = y + "px";
	}

    hidespritecanvas(args, util) {
        try {
            var id = Cast.toString(args.id);
            var x = Cast.toNumber(args.x);
            var y = Cast.toNumber(args.y);
            if (this.canvases[id]) {
                var cvs = this.canvases[id].cvs;
                cvs.remove();
            }
        } catch (e) {
            console.error("HTML5 extension error", e);
        }
    }

    movespritecanvas(args, util) {
        try {
            var id = Cast.toString(args.id);
            var x = Cast.toNumber(args.x);
            var y = Cast.toNumber(args.y);
            if (this.canvases[id]) {
                var cvs = this.canvases[id].cvs;
				var costume = this.canvases[id].cos;
                cvs.style.position = "fixed";
                this.useCostumeRotationToAlignPos(costume,cvs,x,y);
            }
        } catch (e) {
            console.error("HTML5 extension error", e);
        }
    }
}

module.exports = Scratch3NewBlocks;
