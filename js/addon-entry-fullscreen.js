(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[28],{

/***/ 1941:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".sa-fullscreen.sa-body-editor {\n  overflow: hidden !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 1942:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_full-screen\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_green-flag-overlay-wrapper\"] {\n  border: 0 !important;\n  border-radius: 0 !important;\n}\n\n[class*=\"stage_stage-overlays_\"][class*=\"stage_full-screen_\"] {\n  top: 0;\n  left: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1943:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "[class*=\"stage-wrapper_full-screen\"] [class*=\"stage-wrapper_stage-canvas-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_stage\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage-header_stage-menu-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] canvas {\n  width: min(calc((100vh - 44px) * var(--sa-fullscreen-width) / var(--sa-fullscreen-height)), 100vw) !important;\n}\n\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage-wrapper_stage-canvas-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_stage\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_green-flag-overlay-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] canvas {\n  height: min(calc(100vh - 44px), calc(100vw * var(--sa-fullscreen-height) / var(--sa-fullscreen-width))) !important;\n}\n\n[class*=\"stage-wrapper_full-screen\"] {\n  padding: 0rem !important;\n}\n\n[class*=\"stage-wrapper_full-screen\"] [class*=\"monitor-list_monitor-list\"] {\n  overflow: visible;\n}\n\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_question-wrapper\"] {\n  width: auto !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 1944:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "[class*=\"stage-wrapper_full-screen\"] [class*=\"stage-wrapper_stage-canvas-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_stage\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage-header_stage-menu-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] canvas {\n  width: min(calc(100vh * var(--sa-fullscreen-width) / var(--sa-fullscreen-height)), 100vw) !important;\n}\n\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage-wrapper_stage-canvas-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_stage\"],\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_green-flag-overlay-wrapper\"],\n[class*=\"stage-wrapper_full-screen\"] canvas {\n  height: min(100vh, calc(100vw * var(--sa-fullscreen-height) / var(--sa-fullscreen-width))) !important;\n}\n\n[class*=\"stage-wrapper_full-screen\"] {\n  padding: 0rem !important;\n}\n\n[class*=\"stage-wrapper_full-screen\"] [class*=\"monitor-list_monitor-list\"] {\n  overflow: visible;\n}\n\n[class*=\"stage-wrapper_full-screen\"] [class*=\"stage_question-wrapper\"] {\n  width: auto !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 1945:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "[class*=\"stage-wrapper_full-screen\"] [class*=\"stage-header_stage-header-wrapper-overlay\"] {\n  display: none;\n}\n\n[class*=\"stage-wrapper_full-screen\"] {\n  top: 0rem !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 2009:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// CONCATENATED MODULE: ./src/addons/addons/fullscreen/userscript.js
/**
 * Used for the automatic browser full screen setting
 * and for hiding the scrollbar in full screen.
 */
/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    console
  } = _ref;
  const vm = addon.tab.traps.vm;
  const updateStageSize = () => {
    document.documentElement.style.setProperty('--sa-fullscreen-width', vm.runtime.stageWidth);
    document.documentElement.style.setProperty('--sa-fullscreen-height', vm.runtime.stageHeight);
  };
  updateStageSize();
  vm.on('STAGE_SIZE_CHANGED', updateStageSize);

  // "Browser fullscreen" is defined as the mode that hides the browser UI.
  function updateBrowserFullscreen() {
    if (addon.settings.get("browserFullscreen") && !addon.self.disabled) {
      // If Scratch fullscreen is enabled, then browser fullscreen should also
      // be enabled, and vice versa for disabling.
      if (addon.tab.redux.state.scratchGui.mode.isFullScreen && document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
      } else if (!addon.tab.redux.state.scratchGui.mode.isFullScreen && document.fullscreenElement !== null) {
        document.exitFullscreen();
      }
    }
  }

  // "Scratch fullscreen" is defined as the mode normally toggled by the
  // rightmost button above the stage.
  function updateScratchFullscreen() {
    if (addon.settings.get("browserFullscreen") && !addon.self.disabled) {
      // If browser fullscreen is disabled, then Scratch fullscreen should also
      // be disabled.
      if (document.fullscreenElement === null && addon.tab.redux.state.scratchGui.mode.isFullScreen) {
        addon.tab.redux.dispatch({
          type: "scratch-gui/mode/SET_FULL_SCREEN",
          isFullScreen: false
        });
      }
    }
  }
  async function setPageScrollbar() {
    const body = await addon.tab.waitForElement(".sa-body-editor");
    if (addon.tab.redux.state.scratchGui.mode.isFullScreen) {
      body.classList.add("sa-fullscreen");
    } else {
      body.classList.remove("sa-fullscreen");
    }
  }

  // Properly resize the canvas and scale variable monitors on stage resize.
  let monitorScaler, resizeObserver, stage;
  async function initScaler() {
    monitorScaler = await addon.tab.waitForElement("[class*=monitor-list_monitor-list-scaler]");
    stage = await addon.tab.waitForElement('[class*="stage-wrapper_full-screen"] [class*="stage_stage"]');
    resizeObserver = new ResizeObserver(() => {
      const stageSize = stage.getBoundingClientRect();
      // When switching between project page and editor, the canvas
      // is removed from the DOM and inserted again in a different place.
      // This causes the size to be reported as 0x0.
      if (!stageSize.width || !stageSize.height) return;
      // Width and height attributes of the canvas need to match the actual size.
      const renderer = addon.tab.traps.vm.runtime.renderer;
      if (renderer) renderer.resize(stageSize.width, stageSize.height);
      // Scratch uses the `transform` CSS property on a stage overlay element
      // to control the scaling of variable monitors.
      const scale = stageSize.width / vm.runtime.stageWidth;
      monitorScaler.style.transform = "scale(".concat(scale, ", ").concat(scale, ")");
    });
    resizeObserver.observe(stage);
  }
  initScaler();

  // Running this on page load handles the case of the project initially
  // loading in Scratch fullscreen mode.
  setPageScrollbar();
  updateBrowserFullscreen();

  // Changing to or from Scratch fullscreen is signified by a state change
  // (URL change doesn't work when editing project without project page)
  addon.tab.redux.initialize();
  addon.tab.redux.addEventListener("statechanged", e => {
    if (e.detail.action.type === "scratch-gui/mode/SET_FULL_SCREEN") {
      initScaler();
      updateBrowserFullscreen();
      setPageScrollbar();
    }
  });
  // Changing to or from browser fullscreen is signified by a window resize.
  window.addEventListener("resize", () => {
    updateScratchFullscreen();
  });
  // Handles the case of F11 full screen AND document full screen being enabled
  // at the same time.
  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement === null && addon.tab.redux.state.scratchGui.mode.isFullScreen) {
      addon.tab.redux.dispatch({
        type: "scratch-gui/mode/SET_FULL_SCREEN",
        isFullScreen: false
      });
    }
  });
  // These handle the case of the user already being in Scratch fullscreen
  // (without being in browser fullscreen) when the addon or sync option are
  // dynamically enabled.
  addon.settings.addEventListener("change", () => {
    updateBrowserFullscreen();
  });
  addon.self.addEventListener("disabled", () => {
    resizeObserver.disconnect();
  });
  addon.self.addEventListener("reenabled", () => {
    resizeObserver.observe(stage);
    updateBrowserFullscreen();
  });
});
// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/fullscreen/hideOverflow.css
var hideOverflow = __webpack_require__(1941);
var hideOverflow_default = /*#__PURE__*/__webpack_require__.n(hideOverflow);

// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/fullscreen/removeBorder.css
var removeBorder = __webpack_require__(1942);
var removeBorder_default = /*#__PURE__*/__webpack_require__.n(removeBorder);

// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/fullscreen/resizeWindow.css
var resizeWindow = __webpack_require__(1943);
var resizeWindow_default = /*#__PURE__*/__webpack_require__.n(resizeWindow);

// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/fullscreen/resizeWindow_noToolbar.css
var resizeWindow_noToolbar = __webpack_require__(1944);
var resizeWindow_noToolbar_default = /*#__PURE__*/__webpack_require__.n(resizeWindow_noToolbar);

// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/fullscreen/hideToolbar.css
var hideToolbar = __webpack_require__(1945);
var hideToolbar_default = /*#__PURE__*/__webpack_require__.n(hideToolbar);

// CONCATENATED MODULE: ./src/addons/addons/fullscreen/_runtime_entry.js
/* generated by pull.js */






const resources = {
  "userscript.js": userscript,
  "hideOverflow.css": hideOverflow_default.a,
  "removeBorder.css": removeBorder_default.a,
  "resizeWindow.css": resizeWindow_default.a,
  "resizeWindow_noToolbar.css": resizeWindow_noToolbar_default.a,
  "hideToolbar.css": hideToolbar_default.a
};

/***/ })

}]);