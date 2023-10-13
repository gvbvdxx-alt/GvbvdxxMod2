
//This is not an offical TW script, it just replaces it an simulates it, used for the Latest Relased Turbowarp extension addition.

class ScratchConstructor {
	constructor () {
		var ArgumentType = require('../argument-type');
		var BlockType = require('../block-type');
		var Cast = require('../../util/cast');
		var TargetType = require('../target-type');
		var vm = window.vm || window.LatestVirtualMachine;
		var log = require('../../util/log');
		
		this.log = log;
		this.vm = vm;
		this.renderer = vm.runtime.renderer;
		this.storage = vm.runtime.storage;
		this.audio = vm.runtime.audioEngine;
		this.audioEngine = vm.runtime.audioEngine;
		this.fetch = window.fetch;
		this.ArgumentType = ArgumentType;
		this.BlockType = BlockType;
		this.Cast = Cast;
		this.TargetType = TargetType;
		this._extensionConstructor = null;
		this._extensionPrecreated = null;
		this.extensions = {
			unsandboxed:true, //Some extensions require this.
			register: this.register.bind(this)
		};
	}
	register (ext) {
		this.vm.extensionManager.GM2RegisterExtension(ext);
	}
	async canEmbed () {
		return true;
	}
	async canFetch () {
		return true;
	}
	async canNotify () {
		return true;
	}
}

function runExtensionSync (extensionJavascript) {
	//not sure if this is a promise related system, but im going for sync it anyways!
	var Scratch = new ScratchConstructor();
	var globalThis = {//HMM, idk what this is for, some sort of "object"? need to see what this is in turbowarp.
		Scratch:Scratch
	};
	//Not sure if this is safe or not :/
	eval(extensionJavascript);
	
	return; //Return undefined, extension-manager should automaticly handle undefined responses.
}

module.exports = {
	ScratchConstructor:ScratchConstructor,
	runExtensionSync:runExtensionSync
}