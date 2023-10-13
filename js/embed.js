var GUI =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		76: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"1":"addon-settings~addons~editor~fullscreen~player","4":"addon-default-entry","5":"addon-entry-2d-color-picker","6":"addon-entry-better-img-uploads","7":"addon-entry-block-count","8":"addon-entry-block-palette-icons","9":"addon-entry-blocks2image","10":"addon-entry-cat-blocks","11":"addon-entry-clones","12":"addon-entry-columns","13":"addon-entry-custom-block-shape","14":"addon-entry-custom-block-text","15":"addon-entry-custom-zoom","16":"addon-entry-data-category-tweaks-v2","17":"addon-entry-debugger","18":"addon-entry-default-costume-editor-color","19":"addon-entry-disable-paste-offset","20":"addon-entry-disable-stage-drag-select","21":"addon-entry-editor-buttons-reverse-order","22":"addon-entry-editor-colored-context-menus","23":"addon-entry-editor-extra-keys","24":"addon-entry-editor-sounds","25":"addon-entry-editor-stage-left","26":"addon-entry-editor-stepping","27":"addon-entry-editor-theme3","28":"addon-entry-fullscreen","29":"addon-entry-gamepad","30":"addon-entry-hide-delete-button","31":"addon-entry-hide-flyout","32":"addon-entry-hide-new-variables","33":"addon-entry-hide-stage","34":"addon-entry-initialise-sprite-position","35":"addon-entry-load-extensions","36":"addon-entry-mediarecorder","37":"addon-entry-mouse-pos","38":"addon-entry-no-script-bumping","39":"addon-entry-number-pad","40":"addon-entry-paint-by-default","41":"addon-entry-paint-snap","42":"addon-entry-remove-curved-stage-border","43":"addon-entry-remove-sprite-confirm","44":"addon-entry-script-snap","45":"addon-entry-search-sprites","46":"addon-entry-sprite-properties","47":"addon-entry-swap-local-global","48":"addon-entry-transparent-orphans","49":"addon-entry-tw-disable-cloud-variables","50":"addon-entry-tw-disable-compiler","51":"addon-entry-tw-remove-backpack","52":"addon-entry-tw-remove-feedback","53":"addon-entry-tw-straighten-comments","54":"addon-entry-variable-manager","55":"addon-entry-vol-slider","56":"addon-entry-zebra-striping","57":"addon-l10n-de","58":"addon-l10n-es","59":"addon-l10n-fr","60":"addon-l10n-hu","61":"addon-l10n-it","62":"addon-l10n-ja","63":"addon-l10n-ko","64":"addon-l10n-nl","65":"addon-l10n-pl","66":"addon-l10n-pt","67":"addon-l10n-ro","68":"addon-l10n-ru","69":"addon-l10n-sl","70":"addon-l10n-tr","71":"addon-l10n-zh-tw","73":"addons","78":"iframe-extension-worker","79":"library-backdrops","80":"library-costumes","81":"library-sounds","82":"library-sprites","84":"sb"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1821,0,3,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/playground/import-first.js
var import_first = __webpack_require__(299);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(50);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var es = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/react-modal/lib/index.js
var lib = __webpack_require__(65);

// EXTERNAL MODULE: ./src/lib/app-state-hoc.jsx
var app_state_hoc = __webpack_require__(160);

// EXTERNAL MODULE: ./node_modules/lodash.bindall/index.js
var lodash_bindall = __webpack_require__(5);
var lodash_bindall_default = /*#__PURE__*/__webpack_require__.n(lodash_bindall);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var react_redux_es = __webpack_require__(6);

// EXTERNAL MODULE: ./src/reducers/mode.js
var mode = __webpack_require__(73);

// EXTERNAL MODULE: ./src/reducers/tw.js
var tw = __webpack_require__(34);

// EXTERNAL MODULE: ./src/lib/tw-fullscreen-api.js
var tw_fullscreen_api = __webpack_require__(178);

// CONCATENATED MODULE: ./src/lib/tw-embed-fullscreen-hoc.jsx
const _excluded = ["isFullScreen", "onSetIsFullScreen", "onSetWindowIsFullScreen"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







const tw_embed_fullscreen_hoc_TWFullScreenHOC = function TWFullScreenHOC(WrappedComponent) {
  class FullScreenComponent extends react_default.a.Component {
    constructor(props) {
      super(props);
      lodash_bindall_default()(this, ['handleFullScreenChange']);
    }
    componentDidMount() {
      document.addEventListener('fullscreenchange', this.handleFullScreenChange);
      document.addEventListener('webkitfullscreenchange', this.handleFullScreenChange);
    }
    shouldComponentUpdate(nextProps) {
      return this.props.isFullScreen !== nextProps.isFullScreen;
    }
    componentDidUpdate() {
      if (tw_fullscreen_api["a" /* default */].available()) {
        if (this.props.isFullScreen) {
          tw_fullscreen_api["a" /* default */].request();
        } else if (tw_fullscreen_api["a" /* default */].enabled()) {
          tw_fullscreen_api["a" /* default */].exit();
        }
      }
    }
    componentWillUnmount() {
      document.removeEventListener('fullscreenchange', this.handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', this.handleFullScreenChange);
    }
    handleFullScreenChange() {
      const isFullScreen = tw_fullscreen_api["a" /* default */].enabled();
      this.props.onSetWindowIsFullScreen(isFullScreen);
      this.props.onSetIsFullScreen(isFullScreen);
    }
    render() {
      const _this$props = this.props,
        {
          /* eslint-disable no-unused-vars */
          isFullScreen,
          onSetIsFullScreen,
          onSetWindowIsFullScreen
          /* eslint-enable no-unused-vars */
        } = _this$props,
        props = _objectWithoutProperties(_this$props, _excluded);
      return /*#__PURE__*/react_default.a.createElement(WrappedComponent, props);
    }
  }
  FullScreenComponent.propTypes = {
    isFullScreen: prop_types_default.a.bool,
    onSetIsFullScreen: prop_types_default.a.func,
    onSetWindowIsFullScreen: prop_types_default.a.func
  };
  const mapStateToProps = state => ({
    isFullScreen: state.scratchGui.mode.isFullScreen
  });
  const mapDispatchToProps = dispatch => ({
    onSetIsFullScreen: isFullScreen => dispatch(Object(mode["c" /* setFullScreen */])(isFullScreen)),
    onSetWindowIsFullScreen: isFullScreen => dispatch(Object(tw["setIsWindowFullScreen"])(isFullScreen))
  });
  return Object(react_redux_es["b" /* connect */])(mapStateToProps, mapDispatchToProps)(FullScreenComponent);
};

// EXTERNAL MODULE: ./src/lib/tw-state-manager-hoc.jsx
var tw_state_manager_hoc = __webpack_require__(163);

// EXTERNAL MODULE: ./src/addons/entry.js
var entry = __webpack_require__(172);

// EXTERNAL MODULE: ./src/playground/render-gui.jsx + 196 modules
var render_gui = __webpack_require__(173);

// EXTERNAL MODULE: ./src/playground/app-target.js
var app_target = __webpack_require__(67);

// CONCATENATED MODULE: ./src/playground/embed.jsx











const getProjectId = () => {
  // For compatibility reasons, we first look at the hash.
  // eg. https://turbowarp.org/embed.html#1
  const hashMatch = location.hash.match(/#(\d+)/);
  if (hashMatch !== null) {
    return hashMatch[1];
  }
  // Otherwise, we'll recreate what "wildcard" routing does.
  // eg. https://turbowarp.org/1/embed
  const pathMatch = location.pathname.match(/(\d+)\/embed/);
  if (pathMatch !== null) {
    return pathMatch[pathMatch.length - 1];
  }
  return '0';
};
const projectId = getProjectId();
const urlParams = new URLSearchParams(location.search);
let vm;
const onVmInit = _vm => {
  vm = _vm;
};
const onProjectLoaded = () => {
  if (urlParams.has('autoplay')) {
    vm.start();
    vm.greenFlag();
  }
};
const WrappedGUI = Object(es["d" /* compose */])(app_state_hoc["a" /* default */], tw_state_manager_hoc["a" /* default */], tw_embed_fullscreen_hoc_TWFullScreenHOC)(render_gui["a" /* default */]);
Object(lib["setAppElement"])(app_target["a" /* default */]);
react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(WrappedGUI, {
  isEmbedded: true,
  projectId: projectId,
  onVmInit: onVmInit,
  onProjectLoaded: onProjectLoaded,
  routingStyle: "none"
}), app_target["a" /* default */]);
if (urlParams.has('addons')) {
  Object(entry["a" /* default */])();
}

/***/ })

/******/ });