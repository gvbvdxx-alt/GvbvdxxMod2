const VirtualMachine = require('./virtual-machine');
window.GvbvdxxMod2VM = {
	VirtualMachine:VirtualMachine,
	AudioEngine:require('scratch-audio'),
	Renderer:require('scratch-render'),
	SvgRenderer:require('scratch-svg-renderer'),
	ScratchStorage:require('scratch-storage')
};
module.exports = VirtualMachine;