require("scratch-vm");

var grabbedFullVM = window.GvbvdxxMod2VM;

if (!grabbedFullVM) {
	throw new Error("Cannot find GM2 Vm module availiable, you must load it before GM2Player.");
}

module.exports = grabbedFullVM;