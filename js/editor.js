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
/******/ 		75: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"4":"addon-default-entry","5":"addon-entry-2d-color-picker","6":"addon-entry-better-img-uploads","7":"addon-entry-block-count","8":"addon-entry-block-palette-icons","9":"addon-entry-blocks2image","10":"addon-entry-cat-blocks","11":"addon-entry-clones","12":"addon-entry-columns","13":"addon-entry-custom-block-shape","14":"addon-entry-custom-block-text","15":"addon-entry-custom-zoom","16":"addon-entry-data-category-tweaks-v2","17":"addon-entry-debugger","18":"addon-entry-default-costume-editor-color","19":"addon-entry-disable-paste-offset","20":"addon-entry-disable-stage-drag-select","21":"addon-entry-editor-buttons-reverse-order","22":"addon-entry-editor-colored-context-menus","23":"addon-entry-editor-extra-keys","24":"addon-entry-editor-sounds","25":"addon-entry-editor-stage-left","26":"addon-entry-editor-stepping","27":"addon-entry-editor-theme3","28":"addon-entry-fullscreen","29":"addon-entry-gamepad","30":"addon-entry-hide-delete-button","31":"addon-entry-hide-flyout","32":"addon-entry-hide-new-variables","33":"addon-entry-hide-stage","34":"addon-entry-initialise-sprite-position","35":"addon-entry-load-extensions","36":"addon-entry-mediarecorder","37":"addon-entry-mouse-pos","38":"addon-entry-no-script-bumping","39":"addon-entry-number-pad","40":"addon-entry-paint-by-default","41":"addon-entry-paint-snap","42":"addon-entry-remove-curved-stage-border","43":"addon-entry-remove-sprite-confirm","44":"addon-entry-script-snap","45":"addon-entry-search-sprites","46":"addon-entry-sprite-properties","47":"addon-entry-swap-local-global","48":"addon-entry-transparent-orphans","49":"addon-entry-tw-disable-cloud-variables","50":"addon-entry-tw-disable-compiler","51":"addon-entry-tw-remove-backpack","52":"addon-entry-tw-remove-feedback","53":"addon-entry-tw-straighten-comments","54":"addon-entry-variable-manager","55":"addon-entry-vol-slider","56":"addon-entry-zebra-striping","57":"addon-l10n-de","58":"addon-l10n-es","59":"addon-l10n-fr","60":"addon-l10n-hu","61":"addon-l10n-it","62":"addon-l10n-ja","63":"addon-l10n-ko","64":"addon-l10n-nl","65":"addon-l10n-pl","66":"addon-l10n-pt","67":"addon-l10n-ro","68":"addon-l10n-ru","69":"addon-l10n-sl","70":"addon-l10n-tr","71":"addon-l10n-zh-tw","73":"addons","78":"iframe-extension-worker","79":"library-backdrops","80":"library-costumes","81":"library-sounds","82":"library-sprites","84":"sb"}[chunkId]||chunkId) + ".js"
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
/******/ 	deferredModules.push([894,0,3,1,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 112:
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(255);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(44)))

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/33b737193edfe1730f38112ad35a84b4.svg";

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "sw.js";

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(4);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var es = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var redux_es = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/index.es.js + 1 modules
var index_es = __webpack_require__(2);

// EXTERNAL MODULE: ./src/reducers/project-state.js
var project_state = __webpack_require__(11);

// EXTERNAL MODULE: ./src/containers/dom-element-renderer.jsx
var dom_element_renderer = __webpack_require__(141);

// EXTERNAL MODULE: ./src/lib/app-state-hoc.jsx
var app_state_hoc = __webpack_require__(160);

// EXTERNAL MODULE: ./src/lib/error-boundary-hoc.jsx + 2 modules
var error_boundary_hoc = __webpack_require__(78);

// EXTERNAL MODULE: ./src/lib/tw-project-meta-fetcher-hoc.jsx
var tw_project_meta_fetcher_hoc = __webpack_require__(162);

// EXTERNAL MODULE: ./src/lib/tw-state-manager-hoc.jsx
var tw_state_manager_hoc = __webpack_require__(163);

// EXTERNAL MODULE: ./src/lib/tw-theme-hoc.jsx
var tw_theme_hoc = __webpack_require__(90);

// EXTERNAL MODULE: ./src/lib/sb-file-uploader-hoc.jsx
var sb_file_uploader_hoc = __webpack_require__(164);

// EXTERNAL MODULE: ./src/addons/settings-store-singleton.js + 1 modules
var settings_store_singleton = __webpack_require__(52);

// EXTERNAL MODULE: ./src/lib/log.js
var log = __webpack_require__(18);

// CONCATENATED MODULE: ./src/lib/tw-fix-history-api.js

const originalReplaceState = history.replaceState;
history.replaceState = function () {
  try {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return originalReplaceState.call(this, ...args);
  } catch (e) {
    log["default"].error(e);
  }
};
const originalPushState = history.pushState;
history.pushState = function () {
  try {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return originalPushState.call(this, ...args);
  } catch (e) {
    log["default"].error(e);
  }
};
// EXTERNAL MODULE: ./src/playground/render-gui.jsx + 196 modules
var render_gui = __webpack_require__(173);

// EXTERNAL MODULE: ./src/components/menu-bar/menu-bar.jsx + 21 modules
var menu_bar = __webpack_require__(174);

// EXTERNAL MODULE: ./node_modules/lodash.bindall/index.js
var lodash_bindall = __webpack_require__(5);
var lodash_bindall_default = /*#__PURE__*/__webpack_require__.n(lodash_bindall);

// EXTERNAL MODULE: ./node_modules/react-tooltip/dist/index.js
var dist = __webpack_require__(66);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./src/components/tw-project-input/project-input.css
var project_input = __webpack_require__(116);
var project_input_default = /*#__PURE__*/__webpack_require__.n(project_input);

// EXTERNAL MODULE: ./src/lib/tw-navigation-utils.js
var tw_navigation_utils = __webpack_require__(92);

// CONCATENATED MODULE: ./src/components/tw-project-input/project-input.jsx









const PROJECT_BASE = 'https://scratch.mit.edu/projects/';
const messages = Object(index_es["d" /* defineMessages */])({
  tooltip: {
    "id": "tw.input.tooltip",
    "defaultMessage": "Copy and paste a Scratch project link here!"
  }
});
class project_input_ProjectInput extends react_default.a.Component {
  constructor(props) {
    super(props);
    lodash_bindall_default()(this, ['handleKeyDown', 'handleChange', 'handleBlur', 'handleFocus', 'inputRef', 'tooltipRef']);
    this.state = {
      projectId: this.props.projectId
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.projectId !== prevProps.projectId) {
      if (this.props.projectId === project_state["e" /* defaultProjectId */]) {
        this.input.focus();
        this.input.selectionStart = this.input.value.length;
      } else {
        this.input.blur();
      }
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        projectId: this.props.projectId
      });
    }
  }
  extractProjectId(text) {
    const numberMatch = text.match(/\d+/);
    return numberMatch ? numberMatch[0] : null;
  }
  readProjectId(e) {
    const id = this.extractProjectId(e.target.value);
    return id || project_state["e" /* defaultProjectId */];
  }
  handleKeyDown(e) {
    if (e.key === 'Enter' && this.state.projectId) {
      this.input.blur();
    }
  }
  handleChange(e) {
    this.setState({
      projectId: this.readProjectId(e) || project_state["e" /* defaultProjectId */]
    });
  }
  handleBlur() {
    if (this.state.projectId && this.state.projectId !== this.props.projectId) {
      this.props.setProjectId(this.state.projectId);
    }
    dist_default.a.hide(this.tooltip);
  }
  handleFocus(e) {
    if (this.extractProjectId(e.target.value)) {
      e.target.select();
    }
    dist_default.a.show(this.tooltip);
  }
  inputRef(el) {
    this.input = el;
  }
  tooltipRef(el) {
    this.tooltip = el;
  }
  render() {
    const projectId = this.state.projectId === project_state["e" /* defaultProjectId */] ? '' : this.state.projectId || '';
    return /*#__PURE__*/react_default.a.createElement("div", {
      ref: this.tooltipRef,
      "data-tip": this.props.intl.formatMessage(messages.tooltip)
    }, /*#__PURE__*/react_default.a.createElement(dist_default.a, {
      className: project_input_default.a.tooltip,
      effect: "solid"
    }), /*#__PURE__*/react_default.a.createElement("input", {
      ref: this.inputRef,
      spellCheck: "false",
      type: "text",
      value: "".concat(PROJECT_BASE).concat(projectId),
      className: project_input_default.a.input,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus
    }));
  }
}
project_input_ProjectInput.propTypes = {
  intl: index_es["f" /* intlShape */],
  projectId: prop_types_default.a.string,
  setProjectId: prop_types_default.a.func
};
const mapStateToProps = state => ({
  projectId: state.scratchGui.projectState.projectId
});
const mapDispatchToProps = dispatch => ({
  setProjectId: projectId => Object(tw_navigation_utils["a" /* setProjectId */])(dispatch, projectId)
});
/* harmony default export */ var tw_project_input_project_input = (Object(index_es["e" /* injectIntl */])(Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps)(project_input_ProjectInput)));
// EXTERNAL MODULE: ./src/components/tw-studioview/studioview.css
var studioview = __webpack_require__(25);
var studioview_default = /*#__PURE__*/__webpack_require__.n(studioview);

// CONCATENATED MODULE: ./src/components/tw-studioview/studioview.js
/* eslint-disable */
// Imported from:
// https://github.com/forkphorus/forkphorus/tree/master/studioview
// With changes to make it work properly in the scratch-gui environment.
// todo: we have to see if we are leaking memory when this is mounted and unmounted, esp. because of event listeners
// todo: use react-intl for translations




/**
 * @class
 */
var studioview_StudioView = function StudioView(studioId) {
  this.studioId = studioId;
  this.offset = 0;
  this.ended = false;
  this.loadingPage = false;
  this.unusedPlaceholders = [];
  this.root = document.createElement('div');
  this.root.className = studioview_default.a.studioviewRoot;
  this.projectList = document.createElement('div');
  this.projectList.className = studioview_default.a.studioviewList;
  this.root.appendChild(this.projectList);
  if ('IntersectionObserver' in window) {
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: this.projectList
    });
    this.loadNextPageObserver = new IntersectionObserver(this.handleLoadNextPageIntersection.bind(this), {
      root: this.projectList
    });
  } else {
    this.intersectionObserver = null;
    this.loadNextPageObserver = null;
  }

  // will be filled in by studioview.jsx
  this.messages = {
    AUTHOR_ATTRIBUTION: '',
    PROJECT_HOVER_TEXT: '',
    LOAD_ERROR: ''
  };
};

/**
 * Add a project to the view.
 * An unused placeholder element may be used, or it may be created.
 */
studioview_StudioView.prototype.addProject = function (details) {
  var el;
  if (this.unusedPlaceholders.length) {
    el = this.unusedPlaceholders.shift();
  } else {
    el = this.createPlaceholder();
    this.projectList.appendChild(el);
  }
  this.placeholderToProject(el, details.id, details.title, details.author);
};

/**
 * Create an <img> element that will load only when it becomes visible.
 */
studioview_StudioView.prototype.createLazyImage = function (src) {
  var el = document.createElement('img');
  if (this.intersectionObserver) {
    this.intersectionObserver.observe(el);
    el.dataset.src = src;
  } else {
    // then we just won't lazy load it
    el.src = src;
  }
  return el;
};

/**
 * Create a placeholder or placeholder element.
 */
studioview_StudioView.prototype.createPlaceholder = function () {
  var el = document.createElement('a');
  el.className = classnames_default()(studioview_default.a.studioviewProject, studioview_default.a.studioviewPlaceholder);
  var thumbnail = document.createElement('div');
  thumbnail.className = studioview_default.a.studioviewThumbnail;
  var title = document.createElement('div');
  title.className = studioview_default.a.studioviewTitle;
  var author = document.createElement('div');
  author.className = studioview_default.a.studioviewAuthor;
  el.thumbnailEl = thumbnail;
  el.titleEl = title;
  el.authorEl = author;
  el.appendChild(thumbnail);
  el.appendChild(title);
  el.appendChild(author);
  return el;
};

/**
 * Convert a placeholder element made by createPlaceholder to a project element.
 */
studioview_StudioView.prototype.placeholderToProject = function (el, id, title, author) {
  el.className = classnames_default()(studioview_default.a.studioviewProject, studioview_default.a.studioviewLoaded);
  el.dataset.id = id;
  el.dataset.title = title;
  el.dataset.author = author;
  el.title = this.messages.PROJECT_HOVER_TEXT.replace('$author', author).replace('$title', title);
  el.href = studioview_StudioView.PROJECT_PAGE.replace('$id', id);
  var thumbnailSrc = studioview_StudioView.THUMBNAIL_SRC.replace('$id', id);
  var thumbnailImg = this.createLazyImage(thumbnailSrc);
  el.thumbnailEl.appendChild(thumbnailImg);
  el.titleEl.innerText = title;
  el.authorEl.innerText = this.messages.AUTHOR_ATTRIBUTION.replace('$author', author);
  el.addEventListener('click', this.handleClick.bind(this), true);
  el.addEventListener('keydown', this.handleKeyDown.bind(this), true);
  return el;
};

/**
 * Adds an error message to the list.
 */
studioview_StudioView.prototype.addErrorElement = function () {
  var el = document.createElement('div');
  el.innerText = this.messages.LOAD_ERROR;
  el.className = studioview_default.a.studioviewError;
  this.projectList.appendChild(el);
};
studioview_StudioView.prototype.handleLoadNextPageIntersection = function (e) {
  for (var i = 0; i < e.length; i++) {
    var intersection = e[i];
    if (intersection.isIntersecting && this.canLoadNext()) {
      this.loadNextPage();
    }
  }
};

// Click a project element or a child of a project element
studioview_StudioView.prototype.clickProject = function (el) {
  while (!el.classList.contains(studioview_default.a.studioviewProject)) {
    el = el.parentNode;
  }
  var id = el.dataset.id;
  this.onselect(id, el);
};

// Called when click is fired on a project element
studioview_StudioView.prototype.handleClick = function (e) {
  e.preventDefault();
  this.clickProject(e.target);
};

// Called when keydown is fired on a project element
studioview_StudioView.prototype.handleKeyDown = function (e) {
  if (e.keyCode === 13) {
    // treat enter (13) as click
    e.preventDefault();
    this.clickProject(e.target);
  }
};

// Called by the IntersectionObserver when it sees an intersection
studioview_StudioView.prototype.handleIntersection = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var target = entry.target;
      target.src = target.dataset.src;
      target.dataset.src = '';
      target.className = '';
      observer.unobserve(target);
    }
  });
};

/**
 * Determines whether it is safe to attempt to load the next page.
 */
studioview_StudioView.prototype.canLoadNext = function () {
  return !this.loadingPage && !this.ended;
};

/**
 * Remove all unused placeholder elements.
 */
studioview_StudioView.prototype.cleanupPlaceholders = function () {
  while (this.unusedPlaceholders.length) {
    var el = this.unusedPlaceholders.pop();
    this.projectList.removeChild(el);
  }
};

/**
 * Add placeholder placeholder elements.
 */
studioview_StudioView.prototype.addPlaceholders = function () {
  for (var i = 0; i < studioview_StudioView.PLACEHOLDER_COUNT; i++) {
    var el = this.createPlaceholder();
    this.unusedPlaceholders.push(el);
    this.projectList.appendChild(el);
  }
};

/**
 * Make changes to the order of projects.
 * Default shuffler does nothing.
 */
studioview_StudioView.prototype.shuffler = function (projects) {
  return projects;
};

/**
 * Begins loading the next page.
 */
studioview_StudioView.prototype.loadNextPage = function () {
  if (this.loadingPage) {
    throw new Error('Already loading the next page');
  }
  if (this.ended) {
    throw new Error('There are no more pages to load');
  }
  if (this.unusedPlaceholders.length === 0) {
    this.addPlaceholders();
  }
  if (this.loadNextPageObserver) {
    this.loadNextPageObserver.disconnect();
  }
  this.root.setAttribute('loading', '');
  this.loadingPage = true;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function () {
    var rawProjects = xhr.response;
    if (!Array.isArray(rawProjects)) {
      xhr.onerror();
      return;
    }
    var projects = [];
    for (var i = 0; i < rawProjects.length; i++) {
      var p = rawProjects[i];
      projects.push({
        id: p.id,
        title: p.title,
        author: p.username
      });
    }
    projects = this.shuffler(projects);
    for (var i = 0; i < projects.length; i++) {
      this.addProject(projects[i]);
    }
    this.cleanupPlaceholders();
    if (rawProjects.length === 40) {
      if (this.loadNextPageObserver) {
        this.loadNextPageObserver.observe(this.projectList.lastChild);
      }
    } else {
      this.ended = true;
      this.onend();
    }
    this.offset += projects.length;
    this.loadingPage = false;
    this.root.removeAttribute('loading');
    this.onpageload();
  }.bind(this);
  xhr.onerror = function () {
    this.root.setAttribute('error', '');
    this.cleanupPlaceholders();
    this.addErrorElement();
    this.ended = true;
  }.bind(this);
  var url = studioview_StudioView.STUDIO_API.replace('$id', this.studioId).replace('$offset', '' + this.offset);
  xhr.open('GET', url);
  xhr.send();
};
studioview_StudioView.prototype.getURL = function () {
  return studioview_StudioView.STUDIO_PAGE.replace('$id', this.studioId);
};
studioview_StudioView.prototype.onselect = function (id, el) {};
studioview_StudioView.prototype.onpageload = function () {};
studioview_StudioView.prototype.onend = function () {};
studioview_StudioView.STUDIO_API = 'https://trampoline.turbowarp.org/api/studios/33606945/projects?offset=$offset';

// The URL to download thumbnails from.
// $id is replaced with the project's ID.
studioview_StudioView.THUMBNAIL_SRC = 'https://trampoline.turbowarp.org/thumbnails/$id?width=144&height=108';

// The URL for project pages.
// $id is replaced with the project ID.
studioview_StudioView.PROJECT_PAGE = 'https://turbowarp.org/$id';

// The URL for studio pages.
// $id is replaced with the studio ID.
studioview_StudioView.STUDIO_PAGE = 'https://scratch.mit.edu/studios/33606945/';

// The amount of "placeholders" to insert before the next page loads.
studioview_StudioView.PLACEHOLDER_COUNT = 9;
/* harmony default export */ var tw_studioview_studioview = (studioview_StudioView);
// CONCATENATED MODULE: ./src/components/tw-studioview/studioview.jsx







const studioview_messages = Object(index_es["d" /* defineMessages */])({
  authorAttribution: {
    "id": "tw.studioview.authorAttribution",
    "defaultMessage": "by {author}"
  },
  hoverText: {
    "id": "tw.studioview.hoverText",
    "defaultMessage": "{title} by {author}"
  },
  error: {
    "id": "tw.studioview.error",
    "defaultMessage": "There was an error loading the next page of projects."
  }
});
class studioview_StudioViewComponent extends react_default.a.Component {
  constructor(props) {
    super(props);
    lodash_bindall_default()(this, ['handleSelect', 'ref']);
  }
  componentDidMount() {
    this.studioView = new tw_studioview_studioview(this.props.id);
    this.studioView.messages.AUTHOR_ATTRIBUTION = this.props.intl.formatMessage(studioview_messages.authorAttribution, {
      // studioview uses $-based variables
      author: '$author'
    });
    this.studioView.messages.PROJECT_HOVER_TEXT = this.props.intl.formatMessage(studioview_messages.hoverText, {
      // studioview uses $-based variables
      author: '$author',
      title: '$title'
    });
    this.studioView.messages.LOAD_ERROR = this.props.intl.formatMessage(studioview_messages.error);
    if (this.props.placeholder) {
      this.studioView.addPlaceholders();
    } else {
      this.studioView.loadNextPage();
    }
    this.studioView.onselect = this.handleSelect;
    this.el.appendChild(this.studioView.root);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.placeholder && !this.props.placeholder) {
      this.studioView.loadNextPage();
    }
  }
  handleSelect(id) {
    this.props.onSelect(id);
  }
  ref(el) {
    this.el = el;
  }
  render() {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: classnames_default()(studioview_default.a.wrapper),
      ref: this.ref
    });
  }
}
studioview_StudioViewComponent.propTypes = {
  id: prop_types_default.a.string.isRequired,
  intl: index_es["f" /* intlShape */].isRequired,
  placeholder: prop_types_default.a.bool,
  onSelect: prop_types_default.a.func.isRequired
};
/* harmony default export */ var components_tw_studioview_studioview = (Object(index_es["e" /* injectIntl */])(studioview_StudioViewComponent));
// EXTERNAL MODULE: ./src/components/tw-featured-projects/featured-projects.css
var featured_projects = __webpack_require__(48);
var featured_projects_default = /*#__PURE__*/__webpack_require__.n(featured_projects);

// CONCATENATED MODULE: ./src/components/tw-featured-projects/featured-projects.jsx









class featured_projects_FeaturedProjects extends react_default.a.Component {
  constructor(props) {
    super(props);
    lodash_bindall_default()(this, ['handleSelect', 'handleOpenProjects']);
    this.state = {
      opened: false,
      transition: true
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.projectId === '0' && prevProps.projectId === null) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        opened: true,
        transition: false
      });
    }
  }
  handleSelect(id) {
    this.props.setProjectId(id);
  }
  handleOpenProjects() {
    this.setState({
      opened: true
    });
  }
  render() {
    const opened = this.state.opened;
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: featured_projects_default.a.container
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: classnames_default()(featured_projects_default.a.projects, {
        [featured_projects_default.a.opened]: opened,
        [featured_projects_default.a.transition]: this.state.transition
      })
    }, /*#__PURE__*/react_default.a.createElement(components_tw_studioview_studioview, {
      id: this.props.studio,
      onSelect: this.handleSelect,
      placeholder: !opened
    }), opened ? null : /*#__PURE__*/react_default.a.createElement("div", {
      className: featured_projects_default.a.openerContainer,
      onClick: this.handleOpenProjects
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: featured_projects_default.a.openerContent
    }, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
      defaultMessage: "Click to view featured projects.",
      id: "tw.viewFeaturedProjects"
    })))), /*#__PURE__*/react_default.a.createElement("div", {
      className: featured_projects_default.a.footer
    }, /*#__PURE__*/react_default.a.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://scratch.mit.edu/studios/".concat(this.props.studio, "/")
    }, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
      defaultMessage: "View studio on Scratch.",
      id: "tw.featuredProjectsStudio"
    }))));
  }
}
featured_projects_FeaturedProjects.propTypes = {
  setProjectId: prop_types_default.a.func,
  projectId: prop_types_default.a.string,
  studio: prop_types_default.a.string
};
const featured_projects_mapStateToProps = state => ({
  projectId: state.scratchGui.projectState.projectId
});
const featured_projects_mapDispatchToProps = dispatch => ({
  setProjectId: projectId => Object(tw_navigation_utils["a" /* setProjectId */])(dispatch, projectId)
});
/* harmony default export */ var tw_featured_projects_featured_projects = (Object(es["b" /* connect */])(featured_projects_mapStateToProps, featured_projects_mapDispatchToProps)(featured_projects_FeaturedProjects));
// EXTERNAL MODULE: ./src/components/tw-description/description.css
var tw_description_description = __webpack_require__(61);
var description_default = /*#__PURE__*/__webpack_require__.n(tw_description_description);

// EXTERNAL MODULE: ./node_modules/react-string-replace/index.js
var react_string_replace = __webpack_require__(96);
var react_string_replace_default = /*#__PURE__*/__webpack_require__.n(react_string_replace);

// CONCATENATED MODULE: ./src/components/tw-description/description.jsx





const decorate = text => {
  // https://github.com/LLK/scratch-www/blob/25232a06bcceeaddec8fcb24fb63a44d870cf1cf/src/lib/decorate-text.jsx

  // Make @mentions clickable
  text = react_string_replace_default()(text, /@([\w-]+)/, (match, i) => /*#__PURE__*/react_default.a.createElement("a", {
    href: "https://scratch.mit.edu/users/".concat(match, "/"),
    rel: "noreferrer",
    key: match + i
  }, "@".concat(match)));

  // Make links clickable
  const linkRegex = /(https?:\/\/[\w\d_\-.]{1,256}(?:\/(?:\S*[\w:/#[\]@$&'()*+=])?)?(?![^?!,:;\w\s]\S))/g;
  text = react_string_replace_default()(text, linkRegex, (match, i) => /*#__PURE__*/react_default.a.createElement("a", {
    href: match,
    rel: "noreferrer",
    key: match + i
  }, match));

  // Make hashtags clickable
  text = react_string_replace_default()(text, /#([\w-]+)/g, (match, i) => /*#__PURE__*/react_default.a.createElement("a", {
    href: "https://scratch.mit.edu/search/projects?q=".concat(match),
    key: match + i
  }, "#".concat(match)));
  return text;
};
const Description = _ref => {
  let {
    instructions,
    credits,
    projectId
  } = _ref;
  return instructions !== 'unshared' && credits !== 'unshared' && /*#__PURE__*/react_default.a.createElement("div", {
    className: description_default.a.description
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: description_default.a.projectLink
  }, /*#__PURE__*/react_default.a.createElement("a", {
    href: "https://scratch.mit.edu/projects/".concat(projectId, "/"),
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
    defaultMessage: "View project on Scratch",
    id: "tw.viewOnScratch"
  }))), instructions ? /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("h2", {
    className: description_default.a.header
  }, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
    defaultMessage: "Instructions",
    id: "tw.home.instructions"
  })), decorate(instructions)) : null, instructions && credits ? /*#__PURE__*/react_default.a.createElement("div", {
    className: description_default.a.divider
  }) : null, credits && /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("h2", {
    className: description_default.a.header
  }, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
    defaultMessage: "Notes and Credits",
    id: "tw.home.credit"
  })), decorate(credits)));
};
Description.propTypes = {
  instructions: prop_types_default.a.string,
  credits: prop_types_default.a.string,
  projectId: prop_types_default.a.string
};
/* harmony default export */ var components_tw_description_description = (Description);
// EXTERNAL MODULE: ./src/containers/webgl-modal.jsx + 1 modules
var webgl_modal = __webpack_require__(175);

// EXTERNAL MODULE: ./src/components/browser-modal/browser-modal.jsx
var browser_modal = __webpack_require__(171);

// EXTERNAL MODULE: ./src/components/tw-cloud-variable-badge/clouddata.svg
var clouddata = __webpack_require__(157);
var clouddata_default = /*#__PURE__*/__webpack_require__.n(clouddata);

// EXTERNAL MODULE: ./src/components/tw-cloud-variable-badge/cloud-variable-badge.css
var cloud_variable_badge = __webpack_require__(97);
var cloud_variable_badge_default = /*#__PURE__*/__webpack_require__.n(cloud_variable_badge);

// CONCATENATED MODULE: ./src/components/tw-cloud-variable-badge/cloud-variable-badge.jsx




const CloudVariableBadge = () => /*#__PURE__*/react_default.a.createElement("div", {
  className: cloud_variable_badge_default.a.badge
}, /*#__PURE__*/react_default.a.createElement("div", {
  className: cloud_variable_badge_default.a.icon
}, /*#__PURE__*/react_default.a.createElement("img", {
  src: clouddata_default.a,
  alt: "Cloud",
  width: "32",
  height: "32"
})), /*#__PURE__*/react_default.a.createElement("div", {
  className: cloud_variable_badge_default.a.text
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */]
// eslint-disable-next-line max-len
, {
  defaultMessage: "This project uses cloud variables. Anyone can put thier username as almost anything, remember that Gvbvdxx Mod 2 is not responsible for impersonation, anyone can pretend that they are somebody else. {learnMore}",
  id: "tw.cloudVariableBadge",
  values: {
    learnMore: /*#__PURE__*/react_default.a.createElement("a", {
      href: "https://docs.turbowarp.org/cloud-variables",
      target: "_blank",
      rel: "noreferrer"
    }, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
      defaultMessage: "Learn more.",
      id: "gui.alerts.cloudInfoLearnMore"
    }))
  }
})));
/* harmony default export */ var tw_cloud_variable_badge_cloud_variable_badge = (CloudVariableBadge);
// EXTERNAL MODULE: ./src/lib/tw-environment-support-prober.js
var tw_environment_support_prober = __webpack_require__(79);

// EXTERNAL MODULE: ./src/addons/channels.js
var channels = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/file-loader/dist/cjs.js?name=sw.js!./src/playground/service-worker.js
var service_worker = __webpack_require__(158);
var service_worker_default = /*#__PURE__*/__webpack_require__.n(service_worker);

// CONCATENATED MODULE: ./src/playground/load-service-worker.js


let loaded = false;
const actuallyLoadServiceWorker = () => {
  navigator.serviceWorker.register(service_worker_default.a).catch(err => {
    log["default"].error('sw error', err);
  });
};
const loadServiceWorker = () => {
  if (false) {}
};

// EXTERNAL MODULE: ./src/addons/entry.js
var entry = __webpack_require__(172);

// EXTERNAL MODULE: ./src/playground/interface.css
var playground_interface = __webpack_require__(19);
var interface_default = /*#__PURE__*/__webpack_require__.n(playground_interface);

// CONCATENATED MODULE: ./src/playground/render-interface.jsx
const _excluded = ["intl", "hasCloudVariables", "description", "isFullScreen", "isLoading", "isPlayerOnly", "isRtl", "onClickTheme", "projectId"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */






























if (window.parent !== window) {
  // eslint-disable-next-line no-alert
  alert('Using embed');
  throw new Error('Invalid embed');
}
let announcement = null;
if (false) {}
const handleClickAddonSettings = () => {
  const path =  false ? undefined : 'addons.html';
  window.open("".concat("").concat(path));
};
const render_interface_messages = Object(index_es["d" /* defineMessages */])({
  defaultTitle: {
    "id": "tw.guiDefaultTitle",
    "defaultMessage": "Run Scratch projects faster"
  }
});
const WrappedMenuBar = Object(redux_es["d" /* compose */])(sb_file_uploader_hoc["a" /* default */])(menu_bar["a" /* default */]);
if (channels["a" /* default */].reloadChannel) {
  channels["a" /* default */].reloadChannel.addEventListener('message', () => {
    location.reload();
  });
}
if (channels["a" /* default */].changeChannel) {
  channels["a" /* default */].changeChannel.addEventListener('message', e => {
    settings_store_singleton["a" /* default */].setStoreWithVersionCheck(e.data);
  });
}
Object(entry["a" /* default */])();
const Footer = () => /*#__PURE__*/react_default.a.createElement("footer", {
  className: interface_default.a.footer
}, /*#__PURE__*/react_default.a.createElement("div", {
  className: interface_default.a.footerContent
}, /*#__PURE__*/react_default.a.createElement("div", {
  className: interface_default.a.footerText
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */]
// eslint-disable-next-line max-len
, {
  defaultMessage: "Gvbvdxx Mod 2 is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation.",
  id: "tw.footer.disclaimer"
})), /*#__PURE__*/react_default.a.createElement("div", {
  className: interface_default.a.footerColumns
}, /*#__PURE__*/react_default.a.createElement("div", {
  className: interface_default.a.footerSection
}, /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://fosshost.org/"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "Hosting provided by Fosshost",
  id: "tw.footer.fosshost"
})), /*#__PURE__*/react_default.a.createElement("a", {
  href: "credits.html"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "Credits",
  id: "tw.footer.credits"
}))), /*#__PURE__*/react_default.a.createElement("div", {
  className: interface_default.a.footerSection
}, /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://desktop.turbowarp.org/"
}, 'TurboWarp Desktop'), /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://packager.turbowarp.org/"
}, 'TurboWarp Packager'), /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://docs.turbowarp.org/embedding"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "Embedding",
  id: "tw.footer.embed"
})), /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://docs.turbowarp.org/url-parameters"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "URL Parameters",
  id: "tw.footer.parameters"
})), /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://docs.turbowarp.org/translate"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "Help Translate TurboWarp",
  id: "tw.footer.translate"
}))), /*#__PURE__*/react_default.a.createElement("div", {
  className: interface_default.a.footerSection
}, /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://scratch.mit.edu/users/gvbvdxx/#comments"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "Feedback & Bugs",
  id: "tw.feedback"
})), /*#__PURE__*/react_default.a.createElement("a", {
  href: "https://github.com/TurboWarp/"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "Source Code",
  id: "tw.code"
})), /*#__PURE__*/react_default.a.createElement("a", {
  href: "privacy.html"
}, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
  defaultMessage: "Privacy Policy",
  id: "tw.privacy"
}))))));
class render_interface_Interface extends react_default.a.Component {
  constructor(props) {
    super(props);
    this.handleUpdateProjectTitle = this.handleUpdateProjectTitle.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      loadServiceWorker();
    }
  }
  handleUpdateProjectTitle(title, isDefault) {
    if (isDefault || !title) {
      document.title = "Gvbvdxx Mod 2 - ".concat(this.props.intl.formatMessage(render_interface_messages.defaultTitle));
    } else {
      document.title = "".concat(title, " - Gvbvdxx Mod 2");
    }
  }
  render() {
    const _this$props = this.props,
      {
        /* eslint-disable no-unused-vars */
        intl,
        hasCloudVariables,
        description,
        isFullScreen,
        isLoading,
        isPlayerOnly,
        isRtl,
        onClickTheme,
        projectId
        /* eslint-enable no-unused-vars */
      } = _this$props,
      props = _objectWithoutProperties(_this$props, _excluded);
    const isHomepage = isPlayerOnly && !isFullScreen;
    const isEditor = !isPlayerOnly;
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: classnames_default()(interface_default.a.container, {
        [interface_default.a.playerOnly]: isHomepage,
        [interface_default.a.editor]: isEditor
      })
    }, isHomepage ? /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.menu
    }, /*#__PURE__*/react_default.a.createElement(WrappedMenuBar, {
      canChangeLanguage: true,
      canManageFiles: true,
      enableSeeInside: true,
      onClickAddonSettings: handleClickAddonSettings,
      onClickTheme: onClickTheme
    })) : null, /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.center,
      style: isPlayerOnly ? {
        // add a couple pixels to account for border (TODO: remove weird hack)
        width: "".concat(Math.max(480, props.customStageSize.width) + 2, "px")
      } : null
    }, isHomepage && announcement ? /*#__PURE__*/react_default.a.createElement(dom_element_renderer["a" /* default */], {
      domElement: announcement
    }) : null, /*#__PURE__*/react_default.a.createElement(render_gui["a" /* default */], _extends({
      onClickAddonSettings: handleClickAddonSettings,
      onClickTheme: onClickTheme,
      onUpdateProjectTitle: this.handleUpdateProjectTitle,
      backpackVisible: true,
      backpackHost: "_local_"
    }, props)), isHomepage ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, Object(tw_environment_support_prober["c" /* isRendererSupported */])() ? null : /*#__PURE__*/react_default.a.createElement(webgl_modal["a" /* default */], {
      isRtl: isRtl
    }), Object(tw_environment_support_prober["b" /* isBrowserSupported */])() ? null : /*#__PURE__*/react_default.a.createElement(browser_modal["a" /* default */], {
      isRtl: isRtl
    }), /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.section
    }, /*#__PURE__*/react_default.a.createElement(tw_project_input_project_input, null)), (
    // eslint-disable-next-line max-len
    projectId === '0' || description.instructions === 'unshared' || description.credits === 'unshared') && /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.unsharedUpdate
    }, (description.instructions === 'unshared' || description.credits === 'unshared') && /*#__PURE__*/react_default.a.createElement("p", null, 'If the project was shared recently, then wait for a while, the Scratch API might take a moment to update.')), hasCloudVariables && projectId !== '0' && /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.section
    }, /*#__PURE__*/react_default.a.createElement(tw_cloud_variable_badge_cloud_variable_badge, null)), description.instructions || description.credits ? /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.section
    }, /*#__PURE__*/react_default.a.createElement(components_tw_description_description, {
      instructions: description.instructions,
      credits: description.credits,
      projectId: projectId
    })) : null, /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.section
    }, /*#__PURE__*/react_default.a.createElement("p", null, /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */]
    // eslint-disable-next-line max-len
    , {
      defaultMessage: "Gvbvdxx Mod 2, designed to make your Scratch projects into more powerful games, programs, and more!",
      id: "tw.home.description"
    }))), /*#__PURE__*/react_default.a.createElement("div", {
      className: interface_default.a.section
    }, /*#__PURE__*/react_default.a.createElement(tw_featured_projects_featured_projects, {
      studio: "33606945"
    }))) : null));
  }
}
render_interface_Interface.propTypes = {
  intl: index_es["f" /* intlShape */],
  hasCloudVariables: prop_types_default.a.bool,
  customStageSize: prop_types_default.a.shape({
    width: prop_types_default.a.number,
    height: prop_types_default.a.number
  }),
  description: prop_types_default.a.shape({
    credits: prop_types_default.a.string,
    instructions: prop_types_default.a.string
  }),
  isFullScreen: prop_types_default.a.bool,
  isLoading: prop_types_default.a.bool,
  isPlayerOnly: prop_types_default.a.bool,
  isRtl: prop_types_default.a.bool,
  onClickTheme: prop_types_default.a.func,
  projectId: prop_types_default.a.string
};
const render_interface_mapStateToProps = state => ({
  hasCloudVariables: state.scratchGui.tw.hasCloudVariables,
  customStageSize: state.scratchGui.customStageSize,
  description: state.scratchGui.tw.description,
  isFullScreen: state.scratchGui.mode.isFullScreen,
  isLoading: Object(project_state["m" /* getIsLoading */])(state.scratchGui.projectState.loadingState),
  isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
  isRtl: state.locales.isRtl,
  projectId: state.scratchGui.projectState.projectId
});
const render_interface_mapDispatchToProps = () => ({});
const ConnectedInterface = Object(index_es["e" /* injectIntl */])(Object(es["b" /* connect */])(render_interface_mapStateToProps, render_interface_mapDispatchToProps)(render_interface_Interface));
const WrappedInterface = Object(redux_es["d" /* compose */])(app_state_hoc["a" /* default */], Object(error_boundary_hoc["a" /* default */])('TW Interface'), tw_project_meta_fetcher_hoc["a" /* default */], tw_state_manager_hoc["a" /* default */], tw_theme_hoc["a" /* default */])(ConnectedInterface);
/* harmony default export */ var render_interface = __webpack_exports__["a"] = (WrappedInterface);

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(279);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(256);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/* #ffa587 */ /* #E9F1FC */ /* #D9E3F2 */ /* 90% transparent version of motion-primary */ /* #FFFFFF */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 15% transparent version of black */ /* #575E75 */ /* #4C97FF */ /* #3373CC */ /* 35% transparent version of motion-primary */ /* 15% transparent version of motion-primary */ /* opt-in theme overrides */ /* #FF661A */ /* #E64D00 */ /* #CF63CF */ /* #BD42BD */ /* #FFAB19 */ /* #FF8C1A */ /* #0FBD8C */ /* #0FBD8C */ /* #FF8C1A */ /* #FFB366 */ /* #FF8C1A */ /*#ff794d*/ /* #0FBD8C */ /* #0B8E69 */ /* 35% transparent version of extensions-primary */ /* opaque version of extensions-transparent, on white bg */ /* lighter than motion-primary */ /*Trying to match the colors of the orignal*/ /* #E5F0FF */ /* #E9F1FC */ /* #D9E3F2 */ /* 90% transparent version of motion-primary */ /* #FFFFFF */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 15% transparent version of black */ /* #575E75 */ /* #4C97FF */ /* #3373CC */ /* 35% transparent version of motion-primary */ /* 15% transparent version of motion-primary */ /* #FF661A */ /* #E64D00 */ /* #CF63CF */ /* #BD42BD */ /* #FFAB19 */ /* #FF8C1A */ /* #0FBD8C */ /* #0FBD8C */ /* #FF8C1A */ /* #FFB366 */ /* #FF8C1A */ /* #0FBD8C */ /* #0B8E69 */ /* 35% transparent version of extensions-primary */ /* opaque version of extensions-transparent, on white bg */ /* lighter than motion-primary */ /*\n    Contains constants for the z-index values of elements that are part of the global stack context.\n    In other words, z-index values that are \"inside\" a component are not added here.\n    This prevents conflicts between identical z-index values in different components.\n*/ /* Toolbox z-index: 40; set in scratch-blocks */ /* tooltips should go over add buttons if they overlap */ /* monitors go over add buttons */ /* \"ask\" block text input goes above monitors */ /* menu-bar should go over monitors, alerts and tutorials */ /* tw: show below menu bar normally */ /* Block drag z-index: 1000; default 50 is overriden in blocks.css */ /* so it is draggable into other panes */ /* in most interfaces, the context menu is always on top */ .project-input_input_1gT4y {\n    border: none;\n    width: 100%;\n    font-size: 23px;\n    line-height: 32px;\n    opacity: 0.5;\n    background-color: transparent;\n    color: inherit;\n} .project-input_input_1gT4y:focus {\n    opacity: 1;\n} .project-input_input_1gT4y:disabled {\n    opacity: 0.8;\n} .project-input_tooltip_3y9t4 {\n    opacity: 1 !important;\n    background-color: #e066ff !important;\n    border: 1px solid hsla(0, 0%, 0%, .1) !important;\n    box-shadow: 0 0 .5rem hsla(0, 0%, 0%, .25) !important;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n    border: 1px solid hsla(0, 0%, 0%, .1) !important;\n    z-index: 491 !important;\n} .project-input_tooltip_3y9t4:after {\n    border-top-color: #e066ff !important;\n}\n", ""]);

// exports
exports.locals = {
	"input": "project-input_input_1gT4y",
	"tooltip": "project-input_tooltip_3y9t4"
};

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/*\nImported from:\nhttps://github.com/forkphorus/forkphorus/tree/master/studioview\nWith changes to make it work properly in the scratch-gui environment.\n*/\n\n/* we wrap it in a <div> */\n\n.studioview_wrapper_GWWqn {\n  height: 100%;\n}\n\n/* fix some styles that can be messed up by scratch-gui */\n\n.studioview_studioview-root_z_auP * {\n  box-sizing: content-box !important;\n}\n\n.studioview_studioview-root_z_auP {\n  height: 100%;\n}\n\n.studioview_studioview-list_1X1Hw {\n  width: 100%;\n  height: 100%;\n  overflow-y: scroll;\n  overflow-anchor: none;\n}\n\n.studioview_studioview-project_2kPXX, .studioview_studioview-placeholder__NrP7 {\n  display: inline-block;\n  width: 144px;\n  padding: 3px;\n  margin-bottom: 1px;\n  margin-right: 1px;\n}\n\n.studioview_studioview-root_z_auP .studioview_studioview-project_2kPXX {\n  color: inherit;\n  position: relative;\n  text-decoration: none;\n}\n\n.studioview_studioview-loaded_mx24q:hover::before, .studioview_studioview-loaded_mx24q:active::before {\n  content: '';\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: currentColor;\n  opacity: 0.1;\n}\n\n.studioview_studioview-root_z_auP .studioview_studioview-loaded_mx24q:active::before {\n  opacity: 0.2;\n}\n\n.studioview_studioview-root_z_auP .studioview_studioview-title_1eZiq,\n.studioview_studioview-root_z_auP .studioview_studioview-author_Bs0a5 {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  color: inherit;\n  text-decoration: none;\n}\n\n.studioview_studioview-title_1eZiq {\n  font-size: 0.8em;\n  font-weight: bold;\n}\n\n.studioview_studioview-author_Bs0a5 {\n  font-size: 0.75em;\n}\n\n.studioview_studioview-error_ZX8-M {\n  width: 100%;\n}\n\n.studioview_studioview-thumbnail_2nU6_, .studioview_studioview-placeholder-thumbnail_4Fi8w {\n  position: relative;\n  width: 144px;\n  height: 108px;\n}\n\n.studioview_studioview-thumbnail_2nU6_::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: currentColor;\n  opacity: 0.1;\n}\n\n.studioview_studioview-thumbnail_2nU6_ img {\n  width: 100%;\n  height: 100%;\n}\n\n.studioview_studioview-placeholder__NrP7 .studioview_studioview-thumbnail_2nU6_,\n.studioview_studioview-placeholder__NrP7 .studioview_studioview-title_1eZiq,\n.studioview_studioview-placeholder__NrP7 .studioview_studioview-author_Bs0a5 {\n  background-color: currentColor;\n  opacity: 0.1;\n}\n\n.studioview_studioview-title_1eZiq {\n  height: 20px;\n  margin-top: 2px;\n}\n\n.studioview_studioview-author_Bs0a5 {\n  height: 18px;\n}\n\n.studioview_studioview-placeholder__NrP7 .studioview_studioview-title_1eZiq {\n  border-radius: 2px 2px 2px 0;\n  width: 100%;\n}\n\n.studioview_studioview-placeholder__NrP7 .studioview_studioview-author_Bs0a5 {\n  border-radius: 0 0 2px 2px;\n  width: 50%;\n}\n", ""]);

// exports
exports.locals = {
	"wrapper": "studioview_wrapper_GWWqn",
	"studioview-root": "studioview_studioview-root_z_auP",
	"studioviewRoot": "studioview_studioview-root_z_auP",
	"studioview-list": "studioview_studioview-list_1X1Hw",
	"studioviewList": "studioview_studioview-list_1X1Hw",
	"studioview-project": "studioview_studioview-project_2kPXX",
	"studioviewProject": "studioview_studioview-project_2kPXX",
	"studioview-placeholder": "studioview_studioview-placeholder__NrP7",
	"studioviewPlaceholder": "studioview_studioview-placeholder__NrP7",
	"studioview-loaded": "studioview_studioview-loaded_mx24q",
	"studioviewLoaded": "studioview_studioview-loaded_mx24q",
	"studioview-title": "studioview_studioview-title_1eZiq",
	"studioviewTitle": "studioview_studioview-title_1eZiq",
	"studioview-author": "studioview_studioview-author_Bs0a5",
	"studioviewAuthor": "studioview_studioview-author_Bs0a5",
	"studioview-error": "studioview_studioview-error_ZX8-M",
	"studioviewError": "studioview_studioview-error_ZX8-M",
	"studioview-thumbnail": "studioview_studioview-thumbnail_2nU6_",
	"studioviewThumbnail": "studioview_studioview-thumbnail_2nU6_",
	"studioview-placeholder-thumbnail": "studioview_studioview-placeholder-thumbnail_4Fi8w",
	"studioviewPlaceholderThumbnail": "studioview_studioview-placeholder-thumbnail_4Fi8w"
};

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".featured-projects_container_bte5t {\n    margin-bottom: 8px;\n}\n\n.featured-projects_opener-container_2VEwo {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    opacity: 0.8;\n    color: #222;\n}\n\n.featured-projects_opener-container_2VEwo:hover {\n    opacity: 1;\n}\n\n.featured-projects_opener-content_2nRNs {\n    background-color: white;\n    padding: 4px;\n    border: 1px solid black;\n    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);\n}\n\n.featured-projects_projects_3USxm {\n    position: relative;\n    height: 155px;\n}\n\n.featured-projects_projects_3USxm.featured-projects_transition_2s3rd {\n    transition: .2s height;\n}\n\n.featured-projects_projects_3USxm.featured-projects_opened_1ALXH {\n    height: 310px;\n}\n\n.featured-projects_footer_UQGNp {\n    \n}\n", ""]);

// exports
exports.locals = {
	"container": "featured-projects_container_bte5t",
	"opener-container": "featured-projects_opener-container_2VEwo",
	"openerContainer": "featured-projects_opener-container_2VEwo",
	"opener-content": "featured-projects_opener-content_2nRNs",
	"openerContent": "featured-projects_opener-content_2nRNs",
	"projects": "featured-projects_projects_3USxm",
	"transition": "featured-projects_transition_2s3rd",
	"opened": "featured-projects_opened_1ALXH",
	"footer": "featured-projects_footer_UQGNp"
};

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".description_description_TJxeu {\n    max-height: 250px;\n    overflow: auto;\n    white-space: pre-line;\n    overflow-wrap: break-word;\n    line-height: 1.5em;\n    padding: 0.5rem;\n    margin: 5px 0 8px 0;\n    border: 1px solid #b9d6ff;\n    background-color: #dbebff;\n    border-radius: 0.5rem;\n}\n\n.description_description_TJxeu a {\n    font-weight: bold;\n    text-decoration: none;\n}\n\n[theme=\"dark\"] .description_description_TJxeu {\n    border-color: #203652;\n    background-color: #16202c;\n}\n\n.description_header_3Bv2V {\n    font-weight: bold;\n    font-size: 1em;\n    margin: 0;\n    padding: 0;\n}\n\n.description_divider_NGZle {\n    margin-top: 8px;\n}\n\n.description_project-link_2xt5_ {\n    margin-bottom: 2px;\n}\n", ""]);

// exports
exports.locals = {
	"description": "description_description_TJxeu",
	"header": "description_header_3Bv2V",
	"divider": "description_divider_NGZle",
	"project-link": "description_project-link_2xt5_",
	"projectLink": "description_project-link_2xt5_"
};

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var baseIsRegExp = __webpack_require__(260),
    baseUnary = __webpack_require__(264),
    nodeUtil = __webpack_require__(265);

/* Node.js helper references. */
var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

module.exports = isRegExp;


/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(88),
    isObjectLike = __webpack_require__(72);

/** `Object#toString` result references. */
var regexpTag = '[object RegExp]';

/**
 * The base implementation of `_.isRegExp` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
function baseIsRegExp(value) {
  return isObjectLike(value) && baseGetTag(value) == regexpTag;
}

module.exports = baseIsRegExp;


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(156);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(89);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 263:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 264:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(156);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(210)(module)))

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(267);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = toString(string);
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
}

module.exports = escapeRegExp;


/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(268);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(89),
    arrayMap = __webpack_require__(269),
    isArray = __webpack_require__(112),
    isSymbol = __webpack_require__(270);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ 269:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(88),
    isObjectLike = __webpack_require__(72);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(88),
    isArray = __webpack_require__(112),
    isObjectLike = __webpack_require__(72);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(273);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(274),
    isFlattenable = __webpack_require__(275);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ 274:
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(89),
    isArguments = __webpack_require__(276),
    isArray = __webpack_require__(112);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(277),
    isObjectLike = __webpack_require__(72);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(88),
    isObjectLike = __webpack_require__(72);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".cloud-variable-badge_badge_1n_s5 {\n    padding: 0.5rem;\n    margin: 5px 0 8px 0;\n    border: 1px solid #b9d6ff;\n    background-color: #dbebff;\n    display: flex;\n    align-items: center;\n    border-radius: 0.5rem;\n}\n[theme=\"dark\"] .cloud-variable-badge_badge_1n_s5 {\n    border-color: #203652;\n    background-color: #16202c;\n}\n.cloud-variable-badge_icon_3ph5l {\n    margin-right: 0.25rem;\n}\n[theme=\"dark\"] .cloud-variable-badge_icon_3ph5l {\n    filter: invert(100%);\n}\n.cloud-variable-badge_text_2zFOB {\n\n}\n", ""]);

// exports
exports.locals = {
	"badge": "cloud-variable-badge_badge_1n_s5",
	"icon": "cloud-variable-badge_icon_3ph5l",
	"text": "cloud-variable-badge_text_2zFOB"
};

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/* Base styles used by Scratch https://github.com/LLK/scratch-www/blob/develop/src/main.scss */\nh1,\nh2,\nh3,\nh4,\nh5,\np {\n    margin: 0;\n    padding: 0;\n    border: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5 {\n    font-weight: bold;\n    line-height: 1.7em;\n}\nh1 {\n    font-weight: 2.5rem;\n}\nh2 {\n    font-weight: 2rem;\n}\nh3 {\n    font-size: 1.4rem;\n}\nh4 {\n    font-size: 1rem;\n}\na {\n    color: #25d;\n    cursor: pointer;\n    text-decoration: underline;\n}\n.interface_container_1cGgE {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n.interface_editor_3WnQ8 {\n    min-width: 1024px;\n    min-height: 640px;\n    height: 100%;\n}\n.interface_editor_3WnQ8 .interface_center_2vEJw {\n    height: 100%;\n}\n.interface_player-only_1YGqr .interface_center_2vEJw {\n    margin: auto;\n}\n.interface_menu_2TZCG {\n    margin-bottom: 8px;\n}\n.interface_section_3f_bi {\n    margin: 8px 0 8px 0;\n}\n.interface_footer_vF3nx {\n    padding: 10px 0;\n    margin-top: 10px;\n    border-top: 2px solid #ddd;\n}\n.interface_footer_vF3nx a {\n    font-weight: bold;\n    text-decoration: none;\n}\n[theme=\"dark\"] .interface_footer_vF3nx {\n    border-color: #1a1a1a;\n}\n.interface_footer-content_2-VDh {\n    max-width: 600px;\n    margin: auto;\n}\n.interface_footer-text_2qZPP {\n    text-align: center;\n    margin: 5px 0 10px 0;\n}\n.interface_footer-columns_22Cpb {\n    display: flex;\n    justify-content: center;\n    justify-items: center;\n    flex-wrap: wrap;\n}\n.interface_footer-section_vgGzW {\n    display: flex;\n    flex-direction: column;\n    width: 200px;\n    margin-bottom: 10px;\n}\n.interface_footer-section_vgGzW > * {\n    margin-bottom: 10px;\n}\n[theme=\"dark\"] .interface_container_1cGgE {\n    background-color: #111;\n}\n[theme=\"dark\"] .interface_player-only_1YGqr {\n    color: #ddd;\n}\n[theme=\"dark\"] a {\n    color: #4af;\n}\n.interface_unshared-update_zPoHa {\n    line-height: 1.5em;\n    padding: 0.5rem;\n    margin: 5px 0 8px 0;\n    border: 1px solid #b9d6ff;\n    background-color: #dbebff;\n    border-radius: 0.5rem;\n}\n[theme=\"dark\"] .interface_unshared-update_zPoHa {\n    border-color: #203652;\n    background-color: #16202c;\n}\n.interface_unshared-update_zPoHa p {\n    margin: 4px 0;\n}\n.interface_unshared-update_zPoHa a {\n    font-weight: bold;\n    text-decoration: none;\n}\n", ""]);

// exports
exports.locals = {
	"container": "interface_container_1cGgE",
	"editor": "interface_editor_3WnQ8",
	"center": "interface_center_2vEJw",
	"player-only": "interface_player-only_1YGqr",
	"playerOnly": "interface_player-only_1YGqr",
	"menu": "interface_menu_2TZCG",
	"section": "interface_section_3f_bi",
	"footer": "interface_footer_vF3nx",
	"footer-content": "interface_footer-content_2-VDh",
	"footerContent": "interface_footer-content_2-VDh",
	"footer-text": "interface_footer-text_2qZPP",
	"footerText": "interface_footer-text_2qZPP",
	"footer-columns": "interface_footer-columns_22Cpb",
	"footerColumns": "interface_footer-columns_22Cpb",
	"footer-section": "interface_footer-section_vgGzW",
	"footerSection": "interface_footer-section_vgGzW",
	"unshared-update": "interface_unshared-update_zPoHa",
	"unsharedUpdate": "interface_unshared-update_zPoHa"
};

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(257);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let changeChannel;
let reloadChannel;
if (typeof BroadcastChannel !== 'undefined') {
  changeChannel = new BroadcastChannel('addons-change');
  reloadChannel = new BroadcastChannel('addons-reload');
}
/* harmony default export */ __webpack_exports__["a"] = ({
  changeChannel,
  reloadChannel
});

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(258);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(89),
    getRawTag = __webpack_require__(262),
    objectToString = __webpack_require__(263);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(261);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 894:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_first__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(299);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _render_interface_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(159);
/* harmony import */ var _app_target__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(67);
/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */







Object(react_modal__WEBPACK_IMPORTED_MODULE_3__["setAppElement"])(_app_target__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_render_interface_jsx__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null), _app_target__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getInitialDarkMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeHOC; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw_loader_tw_theme_dark_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91);
/* harmony import */ var _raw_loader_tw_theme_dark_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_tw_theme_dark_css__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


const THEME_KEY = 'tw:theme';
const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const getInitialDarkMode = () => {
  try {
    const item = localStorage.getItem(THEME_KEY);
    if (item !== null) {
      return item === 'dark';
    }
  } catch (e) {
    // ignore
  }
  return darkMediaQuery.matches;
};
const darkModeStylesheet = document.createElement('style');
darkModeStylesheet.textContent = _raw_loader_tw_theme_dark_css__WEBPACK_IMPORTED_MODULE_1___default.a;
const ThemeHOC = function ThemeHOC(WrappedComponent) {
  class ThemeComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
      super(props);
      this.handleQueryChange = this.handleQueryChange.bind(this);
      this.handleClickTheme = this.handleClickTheme.bind(this);
      this.state = {
        dark: getInitialDarkMode()
      };
    }
    componentDidMount() {
      // media query does not have listeners in legacy edge
      if (darkMediaQuery.addEventListener) {
        darkMediaQuery.addEventListener('change', this.handleQueryChange);
      }
      this.updateDark();
    }
    componentDidUpdate() {
      try {
        localStorage.setItem(THEME_KEY, this.state.dark ? 'dark' : 'light');
      } catch (e) {
        // ignore
      }
      this.updateDark();
    }
    componentWillUnmount() {
      // media query does not have listeners in legacy edge
      if (darkMediaQuery.removeEventListener) {
        darkMediaQuery.removeEventListener('change', this.handleQueryChange);
      }
    }
    updateDark() {
      const dark = this.state.dark;
      document.body.setAttribute('theme', dark ? 'dark' : 'light');
      if (dark && !darkModeStylesheet.parentNode) {
        document.body.insertBefore(darkModeStylesheet, document.body.firstChild);
      } else if (!dark && darkModeStylesheet.parentNode) {
        darkModeStylesheet.parentNode.removeChild(darkModeStylesheet);
      }
    }
    handleQueryChange() {
      this.setState({
        dark: darkMediaQuery.matches
      });
    }
    handleClickTheme() {
      this.setState(state => ({
        dark: !state.dark
      }));
    }
    render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedComponent, _extends({
        onClickTheme: this.handleClickTheme,
        isDark: this.state.dark
      }, this.props));
    }
  }
  return ThemeComponent;
};


/***/ }),

/***/ 91:
/***/ (function(module, exports) {

module.exports = "/* GUI */\n:root {\n    background: #111;\n    color: #eee;\n    /* see colors.csss */\n    --ui-primary: rgb(17, 17, 17);\n    --ui-secondary: rgb(30, 30, 30);\n    --ui-tertiary: rgb(46, 46, 46);\n    --ui-modal-overlay: #333a;\n    --ui-black-transparent: rgba(255, 255, 255, 0.15);\n    --text-primary: #eee;\n    /* scratch-paint */\n    --paint-ui-pane-border: var(--ui-black-transparent);\n    --paint-text-primary: #eee;\n    --paint-form-border: var(--ui-black-transparent);\n}\n\n/* Blockly */\n.blocklySvg {\n    background-color: var(--ui-secondary) !important;\n}\n[id^=\"blocklyGridPattern\"] > line {\n    stroke: #484848;\n}\n.blocklyFlyoutBackground {\n    fill: #111;\n}\n.blocklyFlyoutLabelText {\n    fill: #ccc;\n}\n.blocklyFlyoutButton .blocklyText {\n    fill: #ccc;\n}\n.blocklyFlyoutButton:hover {\n    fill: #111;\n}\n.scratchCategoryMenu {\n    color: #ccc;\n}\n.blocklyToolboxDiv,\n.scratchCategoryMenu {\n    background: #111 !important;\n}\n.blocklyScrollbarHandle {\n    fill: #666;\n}\n.blocklyZoom {\n    filter: invert(100%);\n}\n.scratchCategoryMenuItem.categorySelected {\n    background: var(--ui-secondary);\n}\n.valueReportBox {\n    color: black;\n}\n.blocklyWidgetDiv .goog-menu {\n    background: var(--ui-primary);\n    border-color: var(--ui-black-transparent);\n}\n.blocklyWidgetDiv .goog-menuitem {\n    color: var(--text-primary);\n}\n.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {\n    color: #666 !important;\n}\n.sa-blockly-menu-item-border {\n    border-top-color: var(--ui-black-transparent) !important;\n}\n.blocklyWidgetDiv .goog-menuitem.goog-menuitem-highlight {\n    background-color: var(--ui-tertiary);\n    border-color: transparent; /* remove border */\n}\n.scratchCommentText {\n    color: black;\n}\n.blocklyInsertionMarker > .blocklyPath {\n    fill: #ccc;\n}\n\n/* Other / Multipurpose */\n.Popover-body {\n    background: var(--ui-secondary);\n    border-color: var(--ui-black-transparent);\n    color: var(--text-primary);\n}\n.Popover-tipShape {\n    fill: var(--ui-secondary);\n    stroke: var(--ui-black-transparent);\n}\n"

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable vars-on-top, no-var, prefer-template */
var isRegExp = __webpack_require__(259);
var escapeRegExp = __webpack_require__(266);
var isString = __webpack_require__(271);
var flatten = __webpack_require__(272);

/**
 * Given a string, replace every substring that is matched by the `match` regex
 * with the result of calling `fn` on matched substring. The result will be an
 * array with all odd indexed elements containing the replacements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * React will happily render an array as children of a react element, which
 * makes this approach very useful for tasks like surrounding certain text
 * within a string with react elements.
 *
 * Example:
 * matchReplace(
 *   'Emphasize all phone numbers like 884-555-4443.',
 *   /([\d|-]+)/g,
 *   (number, i) => <strong key={i}>{number}</strong>
 * );
 * // => ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
 *
 * @param {string} str
 * @param {regexp|str} match Must contain a matching group
 * @param {function} fn
 * @return {array}
 */
function replaceString(str, match, fn) {
  var curCharStart = 0;
  var curCharLen = 0;

  if (str === '') {
    return str;
  } else if (!str || !isString(str)) {
    throw new TypeError('First argument to react-string-replace#replaceString must be a string');
  }

  var re = match;

  if (!isRegExp(re)) {
    re = new RegExp('(' + escapeRegExp(re) + ')', 'gi');
  }

  var result = str.split(re);

  // Apply fn to all odd elements
  for (var i = 1, length = result.length; i < length; i += 2) {
    curCharLen = result[i].length;
    curCharStart += result[i - 1].length;
    result[i] = fn(result[i], i, curCharStart);
    curCharStart += curCharLen;
  }

  return result;
}

module.exports = function reactStringReplace(source, match, fn) {
  if (!Array.isArray(source)) source = [source];

  return flatten(source.map(function(x) {
    return isString(x) ? replaceString(x, match, fn) : x;
  }));
};


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(278);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });