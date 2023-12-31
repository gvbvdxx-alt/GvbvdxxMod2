(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[11],{

/***/ 1899:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(208);
exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".clone-container-container {\n  display: none;\n  align-items: center;\n  padding: 0.25rem;\n  user-select: none;\n  color: #a065ff;\n}\n\n.clone-container {\n  font-size: 0.625rem;\n  font-weight: bold;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  white-space: nowrap;\n}\n\n.clone-icon {\n  margin: 0.25rem;\n  display: inline-block;\n  background-image: url(" + escape(__webpack_require__(1900)) + ");\n  height: 16px;\n  width: 16px;\n}\n\n.clone-container-container[data-count=\"none\"] {\n  display: none;\n}\n\n.clone-container-container[data-count=\"full\"] {\n  color: #ff6680;\n}\n\n.clone-container-container[data-count=\"full\"] .clone-icon {\n  background-image: url(" + escape(__webpack_require__(1901)) + ");\n}\n\n.clone-count::after {\n  content: attr(data-str);\n}\n\n.sa-clones-small .clone-container-container {\n  display: none !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 1900:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/8a30520407ffdf5b0e7e06e490db9c1d.svg";

/***/ }),

/***/ 1901:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/60fb267c5ab0c6f4ed9ab4a891ca7dd5.svg";

/***/ }),

/***/ 1959:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// CONCATENATED MODULE: ./src/addons/addons/clones/userscript.js
/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    console,
    msg
  } = _ref;
  const vm = addon.tab.traps.vm;
  let showIconOnly = addon.settings.get("showicononly");
  if (addon.tab.redux.state && addon.tab.redux.state.scratchGui.stageSize.stageSize === "small") {
    document.body.classList.add("sa-clones-small");
  }
  document.addEventListener("click", e => {
    if (e.target.closest("[class*='stage-header_stage-button-first']")) {
      document.body.classList.add("sa-clones-small");
    } else if (e.target.closest("[class*='stage-header_stage-button-last']")) {
      document.body.classList.remove("sa-clones-small");
    }
  }, {
    capture: true
  });
  let countContainerContainer = document.createElement("div");
  addon.tab.displayNoneWhileDisabled(countContainerContainer);
  let countContainer = document.createElement("div");
  let count = document.createElement("span");
  let icon = document.createElement("span");
  countContainerContainer.className = "clone-container-container";
  countContainer.className = "clone-container";
  count.className = "clone-count";
  icon.className = "clone-icon";
  countContainerContainer.appendChild(icon);
  countContainerContainer.appendChild(countContainer);
  countContainer.appendChild(count);
  let lastChecked = 0;
  const cache = Array(301).fill().map((_, i) => msg("clones", {
    cloneCount: i
  }));
  function doCloneChecks(force) {
    const v = vm.runtime._cloneCounter;
    // performance
    if (v === lastChecked && !force) return;
    lastChecked = v;
    if (v === 0) {
      countContainerContainer.dataset.count = "none";
    } else if (v >= vm.runtime.runtimeOptions.maxClones) {
      countContainerContainer.dataset.count = "full";
    } else {
      countContainerContainer.dataset.count = "";
    }
    if (showIconOnly) {
      count.dataset.str = v;
    } else {
      count.dataset.str = cache[v] || msg("clones", {
        cloneCount: v
      });
    }
    if (v === 0) countContainerContainer.style.display = "none";else countContainerContainer.style.display = "flex";
  }
  addon.settings.addEventListener("change", () => {
    showIconOnly = addon.settings.get("showicononly");
    doCloneChecks(true);
  });
  const oldStep = vm.runtime._step;
  vm.runtime._step = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const ret = oldStep.call(this, ...args);
    doCloneChecks();
    return ret;
  };

  /*
  if (addon.self.enabledLate) {
    // Clone count might be inaccurate if the user deleted sprites
    // before enabling the addon
    let count = 0;
    for (let target of vm.runtime.targets) {
      if (!target.isOriginal) ++count;
    }
    vm.runtime._cloneCounter = count;
  }
  */

  while (true) {
    await addon.tab.waitForElement('[class*="controls_controls-container"]', {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"]
    });
    if (addon.tab.editorMode === "editor" || addon.tab.redux.state.scratchGui.mode.isEmbedded) {
      addon.tab.appendToSharedSpace({
        space: "afterStopButton",
        element: countContainerContainer,
        order: 2
      });
    }
  }
});
// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/clones/style.css
var style = __webpack_require__(1899);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/clones/300cats.svg
/* harmony default export */ var _300cats = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTS0xLTFoODAydjYwMkgtMXoiLz48ZyBmaWxsPSIjZmZkMWQ4Ij48Y2lyY2xlIGN5PSI4LjQ4NCIgY3g9IjcuNDE0IiByPSI0LjczMyIvPjxwYXRoIGQ9Im0zLjg0MyA2LjEuMjk2LTQuODMgMi4yMzYgNC4yNjVtMS40MTEtLjEwOEw5LjQuODY2bC45NzUgNC43MTYiIGZpbGwtb3BhY2l0eT0ibnVsbCIvPjwvZz48ZyBmaWxsPSIjZmY5MWEzIj48Y2lyY2xlIGN5PSI5LjEwNCIgY3g9IjcuOTg3IiByPSI0LjczMyIvPjxwYXRoIGQ9Im00LjQxNSA2LjcyLjI5Ni00LjgzIDIuMjM3IDQuMjY1bTEuNDEtLjEwOCAxLjYxNi00LjU2Ljk3NCA0LjcxNSIgZmlsbC1vcGFjaXR5PSJudWxsIi8+PC9nPjxnIGZpbGw9IiNmZjY2ODAiPjxjaXJjbGUgY3k9IjkuNDg2IiBjeD0iOC45NDEiIHI9IjQuNzMzIi8+PHBhdGggZD0ibTUuMzcgNy4xMDIuMjk1LTQuODMgMi4yMzcgNC4yNjVtMS40MS0uMTA3IDEuNjE2LTQuNTYyLjk3NCA0LjcxNiIgZmlsbC1vcGFjaXR5PSJudWxsIi8+PC9nPjwvc3ZnPg==");
// CONCATENATED MODULE: ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/clones/cat.svg
/* harmony default export */ var cat = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTS0xLTFoODAydjYwMkgtMXoiLz48ZyBmaWxsPSIjZGNjOWZmIj48Y2lyY2xlIGN5PSI4LjQ4NCIgY3g9IjcuNDE0IiByPSI0LjczMyIvPjxwYXRoIGQ9Im0zLjg0MyA2LjEuMjk2LTQuODMgMi4yMzYgNC4yNjVtMS40MTEtLjEwOEw5LjQuODY2bC45NzUgNC43MTYiIGZpbGwtb3BhY2l0eT0ibnVsbCIvPjwvZz48ZyBmaWxsPSIjYmM5NmZmIj48Y2lyY2xlIGN5PSI5LjEwNCIgY3g9IjcuOTg3IiByPSI0LjczMyIvPjxwYXRoIGQ9Im00LjQxNSA2LjcyLjI5Ni00LjgzIDIuMjM3IDQuMjY1bTEuNDEtLjEwOCAxLjYxNi00LjU2Ljk3NCA0LjcxNSIgZmlsbC1vcGFjaXR5PSJudWxsIi8+PC9nPjxnIGZpbGw9IiNhMDY1ZmYiPjxjaXJjbGUgY3k9IjkuNDg2IiBjeD0iOC45NDEiIHI9IjQuNzMzIi8+PHBhdGggZD0ibTUuMzcgNy4xMDIuMjk1LTQuODMgMi4yMzcgNC4yNjVtMS40MS0uMTA3IDEuNjE2LTQuNTYyLjk3NCA0LjcxNiIgZmlsbC1vcGFjaXR5PSJudWxsIi8+PC9nPjwvc3ZnPg==");
// CONCATENATED MODULE: ./src/addons/addons/clones/_runtime_entry.js
/* generated by pull.js */




const resources = {
  "userscript.js": userscript,
  "style.css": style_default.a,
  "300cats.svg": _300cats,
  "cat.svg": cat
};

/***/ })

}]);