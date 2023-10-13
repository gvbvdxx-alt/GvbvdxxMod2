(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[73],{

/***/ 1825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(176);
/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intl_messageformat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings_store_singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _lib_data_uri_to_blob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(576);
/* harmony import */ var _event_target__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(478);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(192);
/* harmony import */ var _generated_addon_manifests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(120);
/* harmony import */ var _addons_l10n_en_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1850);
var _addons_l10n_en_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(1850, 1);
/* harmony import */ var _generated_l10n_entries__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1851);
/* harmony import */ var _generated_addon_entries__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1852);
/* harmony import */ var _contextmenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1854);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1855);
/* harmony import */ var _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1829);
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(893);
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_polyfill__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _conditional_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1858);
/* harmony import */ var _addon_precedence__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1859);
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

















/* eslint-disable no-console */

const escapeHTML = str => str.replace(/([<>'"&])/g, (_, l) => "&#".concat(l.charCodeAt(0), ";"));
const kebabCaseToCamelCase = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());
let _scratchClassNames = null;
const getScratchClassNames = () => {
  if (_scratchClassNames) {
    return _scratchClassNames;
  }
  const cssRules = Array.from(document.styleSheets)
  // Ignore some scratch-paint stylesheets
  .filter(styleSheet => !(styleSheet.ownerNode.textContent.startsWith('/* DO NOT EDIT\n@todo This file is copied from GUI and should be pulled out into a shared library.') && (styleSheet.ownerNode.textContent.includes('input_input-form') || styleSheet.ownerNode.textContent.includes('label_input-group_')))).map(e => {
    try {
      return [...e.cssRules];
    } catch (_e) {
      return [];
    }
  }).flat();
  const classes = cssRules.map(e => e.selectorText).filter(e => e).map(e => e.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g)).filter(e => e).flat();
  _scratchClassNames = [...new Set(classes)];
  const observer = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      for (const node of mutation.addedNodes) {
        if (node.tagName === 'STYLE') {
          _scratchClassNames = null;
          observer.disconnect();
          return;
        }
      }
    }
  });
  observer.observe(document.head, {
    childList: true
  });
  return _scratchClassNames;
};
let _mutationObserver;
let _mutationObserverCallbacks = [];
const addMutationObserverCallback = newCallback => {
  if (!_mutationObserver) {
    _mutationObserver = new MutationObserver(() => {
      for (const cb of _mutationObserverCallbacks) {
        cb();
      }
    });
    _mutationObserver.observe(document.documentElement, {
      attributes: false,
      childList: true,
      subtree: true
    });
  }
  _mutationObserverCallbacks.push(newCallback);
};
const removeMutationObserverCallback = callback => {
  _mutationObserverCallbacks = _mutationObserverCallbacks.filter(i => i !== callback);
};
class Redux extends _event_target__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] {
  constructor() {
    super();
    this._isInReducer = false;
    this._initialized = false;
    this._nextState = null;
  }
  initialize() {
    if (!this._initialized) {
      _hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].appStateReducer = (action, prev, next) => {
        this._isInReducer = true;
        this._nextState = next;
        this.dispatchEvent(new CustomEvent('statechanged', {
          detail: {
            action,
            prev,
            next
          }
        }));
        this._nextState = null;
        this._isInReducer = false;
      };
      this._initialized = true;
    }
  }
  dispatch(m) {
    if (this._isInReducer) {
      queueMicrotask(() => _hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].appStateStore.dispatch(m));
    } else {
      _hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].appStateStore.dispatch(m);
    }
  }
  get state() {
    if (this._nextState) return this._nextState;
    return _hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].appStateStore.getState();
  }
}
const getEditorMode = () => {
  // eslint-disable-next-line no-use-before-define
  const mode = tabReduxInstance.state.scratchGui.mode;
  if (mode.isEmbedded) return 'embed';
  if (mode.isFullScreen) return 'fullscreen';
  if (mode.isPlayerOnly) return 'projectpage';
  return 'editor';
};
const tabReduxInstance = new Redux();
const language = tabReduxInstance.state.locales.locale.split('-')[0];
const getTranslations = async () => {
  if (_generated_l10n_entries__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"][language]) {
    const localeMessages = await _generated_l10n_entries__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"][language]();
    Object.assign(_addons_l10n_en_json__WEBPACK_IMPORTED_MODULE_6__, localeMessages);
  }
};
const addonMessagesPromise = getTranslations();
const untilInEditor = () => {
  if (!tabReduxInstance.state.scratchGui.mode.isPlayerOnly || tabReduxInstance.state.scratchGui.mode.isEmbedded) {
    return;
  }
  return new Promise(resolve => {
    const handler = () => {
      if (!tabReduxInstance.state.scratchGui.mode.isPlayerOnly) {
        resolve();
        tabReduxInstance.removeEventListener('statechanged', handler);
      }
    };
    tabReduxInstance.initialize();
    tabReduxInstance.addEventListener('statechanged', handler);
  });
};
const getDisplayNoneWhileDisabledClass = id => "addons-display-none-".concat(id);
const parseArguments = code => code.split(/(?=[^\\]%[nbs])/g).map(i => i.trim()).filter(i => i.charAt(0) === '%').map(i => i.substring(0, 2));
const fixDisplayName = displayName => displayName.replace(/([^\s])(%[nbs])/g, (_, before, arg) => "".concat(before, " ").concat(arg));
const compareArrays = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let _firstAddBlockRan = false;
const addonBlockColor = {
  color: '#29beb8',
  secondaryColor: '#3aa8a4',
  tertiaryColor: '#3aa8a4'
};
const contextMenuCallbacks = [];
const CONTEXT_MENU_ORDER = ['editor-devtools', 'block-switching', 'blocks2image', 'swap-local-global'];
let createdAnyBlockContextMenus = false;
const getInternalKey = element => Object.keys(element).find(key => key.startsWith('__reactInternalInstance$'));
class Tab extends _event_target__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] {
  constructor(id) {
    super();
    this._id = id;
    this._seenElements = new WeakSet();
    // traps is public API
    this.traps = {
      get vm() {
        return tabReduxInstance.state.scratchGui.vm;
      },
      getBlockly: () => {
        if (_hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].blockly) {
          return Promise.resolve(_hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].blockly);
        }
        return new Promise(resolve => {
          _hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].blocklyCallbacks.push(() => resolve(_hooks__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].blockly));
        });
      },
      getPaper: async () => {
        const modeSelector = await this.waitForElement("[class*='paint-editor_mode-selector']", {
          reduxCondition: state => state.scratchGui.editorTab.activeTabIndex === 1 && !state.scratchGui.mode.isPlayerOnly
        });
        const reactInternalKey = Object.keys(modeSelector).find(key => key.startsWith('__reactInternalInstance$'));
        const internalState = modeSelector[reactInternalKey].child;
        // .tool or .blob.tool only exists on the selected tool
        let toolState = internalState;
        let tool;
        while (toolState) {
          const toolInstance = toolState.child.stateNode;
          if (toolInstance.tool) {
            tool = toolInstance.tool;
            break;
          }
          if (toolInstance.blob && toolInstance.blob.tool) {
            tool = toolInstance.blob.tool;
            break;
          }
          toolState = toolState.sibling;
        }
        if (tool) {
          const paperScope = tool._scope;
          return paperScope;
        }
        throw new Error('cannot find paper :(');
      },
      getInternalKey
    };
  }
  get redux() {
    return tabReduxInstance;
  }
  waitForElement(selector) {
    let {
      markAsSeen = false,
      condition,
      reduxCondition,
      reduxEvents
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let externalEventSatisfied = true;
    const evaluateCondition = () => {
      if (!externalEventSatisfied) return false;
      if (condition && !condition()) return false;
      if (reduxCondition && !reduxCondition(tabReduxInstance.state)) return false;
      return true;
    };
    if (evaluateCondition()) {
      const firstQuery = document.querySelectorAll(selector);
      for (const element of firstQuery) {
        if (this._seenElements.has(element)) continue;
        if (markAsSeen) this._seenElements.add(element);
        return Promise.resolve(element);
      }
    }
    let reduxListener;
    if (reduxEvents) {
      externalEventSatisfied = false;
      reduxListener = _ref => {
        let {
          detail
        } = _ref;
        const type = detail.action.type;
        // As addons can't run before DOM exists here, ignore fontsLoaded/SET_FONTS_LOADED
        // Otherwise, as our font loading is very async, we could activate more often than required.
        if (reduxEvents.includes(type) && type !== 'fontsLoaded/SET_FONTS_LOADED') {
          externalEventSatisfied = true;
        }
      };
      this.redux.initialize();
      this.redux.addEventListener('statechanged', reduxListener);
    }
    return new Promise(resolve => {
      const callback = () => {
        if (!evaluateCondition()) {
          return;
        }
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          if (this._seenElements.has(element)) continue;
          resolve(element);
          removeMutationObserverCallback(callback);
          if (markAsSeen) this._seenElements.add(element);
          if (reduxListener) {
            this.redux.removeEventListener('statechanged', reduxListener);
          }
          break;
        }
      };
      addMutationObserverCallback(callback);
    });
  }
  appendToSharedSpace(_ref2) {
    let {
      space,
      element,
      order,
      scope
    } = _ref2;
    const SHARED_SPACES = {
      stageHeader: {
        element: () => document.querySelector("[class^='stage-header_stage-size-row']"),
        from: () => [],
        until: () => [document.querySelector("[class^='stage-header_stage-size-toggle-group']"), document.querySelector("[class^='stage-header_stage-size-row']").lastChild]
      },
      fullscreenStageHeader: {
        element: () => document.querySelector("[class^='stage-header_stage-menu-wrapper']"),
        from: function from() {
          let emptyDiv = this.element().querySelector('.addon-spacer');
          if (!emptyDiv) {
            emptyDiv = document.createElement('div');
            emptyDiv.style.marginLeft = 'auto';
            emptyDiv.className = 'addon-spacer';
            this.element().insertBefore(emptyDiv, this.element().lastChild);
          }
          return [emptyDiv];
        },
        until: () => [document.querySelector("[class^='stage-header_stage-menu-wrapper']").lastChild]
      },
      afterGreenFlag: {
        element: () => document.querySelector("[class^='controls_controls-container']"),
        from: () => [],
        until: () => [document.querySelector("[class^='stop-all_stop-all']")]
      },
      afterStopButton: {
        element: () => document.querySelector("[class^='controls_controls-container']"),
        from: () => [document.querySelector("[class^='stop-all_stop-all']")],
        until: () => []
      },
      afterSoundTab: {
        element: () => document.querySelector("[class^='react-tabs_react-tabs__tab-list']"),
        from: () => [document.querySelector("[class^='react-tabs_react-tabs__tab-list']").children[2]],
        until: () => [document.querySelector('.sa-find-bar')]
      },
      assetContextMenuAfterExport: {
        element: () => scope,
        from: () => Array.prototype.filter.call(scope.children, c => c.textContent === this.scratchMessage('gui.spriteSelectorItem.contextMenuExport')),
        until: () => Array.prototype.filter.call(scope.children, c => c.textContent === this.scratchMessage('gui.spriteSelectorItem.contextMenuDelete'))
      },
      assetContextMenuAfterDelete: {
        element: () => scope,
        from: () => Array.prototype.filter.call(scope.children, c => c.textContent === this.scratchMessage('gui.spriteSelectorItem.contextMenuDelete')),
        until: () => []
      },
      paintEditorZoomControls: {
        element: () => document.querySelector('.sa-paintEditorZoomControls-wrapper') || (() => {
          const wrapper = Object.assign(document.createElement('div'), {
            className: 'sa-paintEditorZoomControls-wrapper'
          });
          wrapper.style.display = 'flex';
          wrapper.style.flexDirection = 'row-reverse';
          wrapper.style.height = 'calc(1.95rem + 2px)';
          const zoomControls = document.querySelector("[class^='paint-editor_zoom-controls']");
          zoomControls.replaceWith(wrapper);
          wrapper.appendChild(zoomControls);
          return wrapper;
        })(),
        from: () => [],
        until: () => []
      }
    };
    const spaceInfo = SHARED_SPACES[space];
    const spaceElement = spaceInfo.element();
    if (!spaceElement) return false;
    const from = spaceInfo.from();
    const until = spaceInfo.until();
    element.dataset.saSharedSpaceOrder = order;
    let foundFrom = false;
    if (from.length === 0) foundFrom = true;

    // insertAfter = element whose nextSibling will be the new element
    // -1 means append at beginning of space (prepend)
    // This will stay null if we need to append at the end of space
    let insertAfter = null;
    const children = Array.from(spaceElement.children);
    for (const indexString of children.keys()) {
      const child = children[indexString];
      const i = Number(indexString);

      // Find either element from "from" before doing anything
      if (!foundFrom) {
        if (from.includes(child)) {
          foundFrom = true;
          // If this is the last child, insertAfter will stay null
          // and the element will be appended at the end of space
        }

        continue;
      }
      if (until.includes(child)) {
        // This is the first SA element appended to this space
        // If from = [] then prepend, otherwise append after
        // previous child (likely a "from" element)
        if (i === 0) insertAfter = -1;else insertAfter = children[i - 1];
        break;
      }
      if (child.dataset.saSharedSpaceOrder) {
        if (Number(child.dataset.saSharedSpaceOrder) > order) {
          // We found another SA element with higher order number
          // If from = [] and this is the first child, prepend.
          // Otherwise, append before this child.
          if (i === 0) insertAfter = -1;else insertAfter = children[i - 1];
          break;
        }
      }
    }
    if (!foundFrom) return false;
    // It doesn't matter if we didn't find an "until"

    if (insertAfter === null) {
      // This might happen with until = []
      spaceElement.appendChild(element);
    } else if (insertAfter === -1) {
      // This might happen with from = []
      spaceElement.prepend(element);
    } else {
      // Works like insertAfter but using insertBefore API.
      // nextSibling cannot be null because insertAfter
      // is always set to children[i-1], so it must exist
      spaceElement.insertBefore(element, insertAfter.nextSibling);
    }
    return true;
  }
  addBlock(procedureCode, _ref3) {
    let {
      args,
      displayName,
      callback
    } = _ref3;
    const procCodeArguments = parseArguments(procedureCode);
    if (args.length !== procCodeArguments.length) {
      throw new Error('Procedure code and argument list do not match');
    }
    if (displayName) {
      displayName = fixDisplayName(displayName);
      const displayNameArguments = parseArguments(displayName);
      if (!compareArrays(procCodeArguments, displayNameArguments)) {
        console.warn("displayName ".concat(displayName, " for ").concat(procedureCode, " has invalid arguments, ignoring it."));
        displayName = procedureCode;
      }
    } else {
      displayName = procedureCode;
    }
    const wrappedCallback = (a, util) => callback(a, util.thread);
    const vm = this.traps.vm;
    vm.addAddonBlock({
      procedureCode,
      arguments: args,
      callback: wrappedCallback,
      // Ignored by VM but used by scratch-blocks traps
      displayName
    });
    if (!_firstAddBlockRan) {
      _firstAddBlockRan = true;
      this.traps.getBlockly().then(ScratchBlocks => {
        const BlockSvg = ScratchBlocks.BlockSvg;
        const oldUpdateColour = BlockSvg.prototype.updateColour;
        BlockSvg.prototype.updateColour = function () {
          // procedures_prototype also has a procedure code but we do not want to color them.
          if (!this.isInsertionMarker() && this.type === 'procedures_call') {
            const block = this.procCode_ && vm.runtime.getAddonBlock(this.procCode_);
            if (block) {
              this.colour_ = addonBlockColor.color;
              this.colourSecondary_ = addonBlockColor.secondaryColor;
              this.colourTertiary_ = addonBlockColor.tertiaryColor;
              this.customContextMenu = null;
            }
          }
          for (var _len = arguments.length, args2 = new Array(_len), _key = 0; _key < _len; _key++) {
            args2[_key] = arguments[_key];
          }
          return oldUpdateColour.call(this, ...args2);
        };
        const originalCreateAllInputs = ScratchBlocks.Blocks.procedures_call.createAllInputs_;
        ScratchBlocks.Blocks.procedures_call.createAllInputs_ = function () {
          const block = this.procCode_ && vm.runtime.getAddonBlock(this.procCode_);
          for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args2[_key2] = arguments[_key2];
          }
          if (block && block.displayName) {
            const originalProcCode = this.procCode_;
            this.procCode_ = block.displayName;
            const ret = originalCreateAllInputs.call(this, ...args2);
            this.procCode_ = originalProcCode;
            return ret;
          }
          return originalCreateAllInputs.call(this, ...args2);
        };
        if (vm.editingTarget) {
          vm.emitWorkspaceUpdate();
        }
      });
    }
  }
  getCustomBlock(procedureCode) {
    const vm = this.traps.vm;
    return vm.getAddonBlock(procedureCode);
  }
  getCustomBlockColor() {
    return addonBlockColor;
  }
  setCustomBlockColor(newColor) {
    Object.assign(addonBlockColor, newColor);
  }
  createBlockContextMenu(callback) {
    let {
      workspace = false,
      blocks = false,
      flyout = false,
      comments = false
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    contextMenuCallbacks.push({
      addonId: this._id,
      callback,
      workspace,
      blocks,
      flyout,
      comments
    });
    contextMenuCallbacks.sort((b, a) => CONTEXT_MENU_ORDER.indexOf(b.addonId) - CONTEXT_MENU_ORDER.indexOf(a.addonId));
    if (createdAnyBlockContextMenus) return;
    createdAnyBlockContextMenus = true;
    this.traps.getBlockly().then(ScratchBlocks => {
      const oldShow = ScratchBlocks.ContextMenu.show;
      ScratchBlocks.ContextMenu.show = function (event, items, rtl) {
        const gesture = ScratchBlocks.mainWorkspace.currentGesture_;
        const block = gesture.targetBlock_;

        // eslint-disable-next-line no-shadow
        for (const {
          callback,
          workspace,
          blocks,
          flyout,
          comments
        } of contextMenuCallbacks) {
          const injectMenu =
          // Workspace
          workspace && !block && !gesture.flyout_ && !gesture.startBubble_ ||
          // Block in workspace
          blocks && block && !gesture.flyout_ ||
          // Block in flyout
          flyout && gesture.flyout_ ||
          // Comments
          comments && gesture.startBubble_;
          if (injectMenu) {
            try {
              items = callback(items, block);
            } catch (e) {
              console.error('Error while calling context menu callback: ', e);
            }
          }
        }
        oldShow.call(this, event, items, rtl);
        const blocklyContextMenu = ScratchBlocks.WidgetDiv.DIV.firstChild;
        items.forEach((item, i) => {
          if (i !== 0 && item.separator) {
            const itemElt = blocklyContextMenu.children[i];
            itemElt.style.paddingTop = '2px';
            itemElt.classList.add('sa-blockly-menu-item-border');
            itemElt.style.borderTop = '1px solid hsla(0, 0%, 0%, 0.15)';
          }
        });
      };
    });
  }
  createEditorContextMenu(callback, options) {
    Object(_contextmenu__WEBPACK_IMPORTED_MODULE_9__[/* addContextMenu */ "a"])(this, callback, options);
  }
  copyImage(dataURL) {
    if (!navigator.clipboard.write) {
      return Promise.reject(new Error('Clipboard API not supported'));
    }
    const items = [
    // eslint-disable-next-line no-undef
    new ClipboardItem({
      'image/png': Object(_lib_data_uri_to_blob__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(dataURL)
    })];
    return navigator.clipboard.write(items);
  }
  scratchMessage(id) {
    return tabReduxInstance.state.locales.messages[id];
  }
  scratchClass() {
    const scratchClasses = getScratchClassNames();
    const classes = [];
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    for (const arg of args) {
      if (typeof arg === 'string') {
        for (const scratchClass of scratchClasses) {
          if (scratchClass.startsWith("".concat(arg, "_")) && scratchClass.length === arg.length + 6) {
            classes.push(scratchClass);
            break;
          }
        }
      }
    }
    const options = args[args.length - 1];
    if (typeof options === 'object') {
      const others = Array.isArray(options.others) ? options.others : [options.others];
      for (const className of others) {
        classes.push(className);
      }
    }
    return classes.join(' ');
  }
  get editorMode() {
    return getEditorMode();
  }
  displayNoneWhileDisabled(el) {
    el.classList.add(getDisplayNoneWhileDisabledClass(this._id));
  }
  get direction() {
    return this.redux.state.locales.isRtl ? 'rtl' : 'ltr';
  }
  createModal(title) {
    let {
      isOpen = false
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _modal__WEBPACK_IMPORTED_MODULE_10__[/* createEditorModal */ "b"](this, title, {
      isOpen
    });
  }
  confirm() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return _modal__WEBPACK_IMPORTED_MODULE_10__[/* confirm */ "a"](this, ...args);
  }
  prompt() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return _modal__WEBPACK_IMPORTED_MODULE_10__[/* prompt */ "c"](this, ...args);
  }
}
class Settings extends _event_target__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] {
  constructor(addonId, manifest) {
    super();
    this._addonId = addonId;
    this._manifest = manifest;
  }
  get(id) {
    return _settings_store_singleton__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getAddonSetting(this._addonId, id);
  }
}
class Self extends _event_target__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] {
  constructor(id, getResource) {
    super();
    this.id = id;
    this.disabled = false;
    this.getResource = getResource;
  }
}
class AddonRunner {
  constructor(id) {
    AddonRunner.instances.push(this);
    const manifest = _generated_addon_manifests__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"][id];
    this.id = id;
    this.manifest = manifest;
    this.messageCache = {};
    this.loading = true;

    /**
     * @type {Record<string, unknown>}
     */
    this.resources = null;
    this.publicAPI = {
      global,
      console,
      addon: {
        tab: new Tab(id),
        settings: new Settings(id, manifest),
        self: new Self(id, this.getResource.bind(this))
      },
      msg: this.msg.bind(this),
      safeMsg: this.safeMsg.bind(this)
    };
  }
  _msg(key, vars, handler) {
    const namespacedKey = "".concat(this.id, "/").concat(key);
    if (this.messageCache[namespacedKey]) {
      return this.messageCache[namespacedKey].format(vars);
    }
    let translation = _addons_l10n_en_json__WEBPACK_IMPORTED_MODULE_6__[namespacedKey];
    if (!translation) {
      return namespacedKey;
    }
    if (handler) {
      translation = handler(translation);
    }
    const messageFormat = new intl_messageformat__WEBPACK_IMPORTED_MODULE_0___default.a(translation, language);
    this.messageCache[namespacedKey] = messageFormat;
    return messageFormat.format(vars);
  }
  msg(key, vars) {
    return this._msg(key, vars, null);
  }
  safeMsg(key, vars) {
    return this._msg(key, vars, escapeHTML);
  }
  getResource(path) {
    const withoutSlash = path.substring(1);
    const url = this.resources[withoutSlash];
    if (typeof url !== 'string') {
      throw new Error("Unknown asset: ".concat(path));
    }
    return url;
  }
  updateAllStyles() {
    _conditional_style__WEBPACK_IMPORTED_MODULE_13__[/* updateAll */ "b"]();
    this.updateCssVariables();
  }
  updateCssVariables() {
    const addonId = kebabCaseToCamelCase(this.id);
    if (this.manifest.settings) {
      for (const setting of this.manifest.settings) {
        const settingId = setting.id;
        const cssProperty = "--".concat(addonId, "-").concat(kebabCaseToCamelCase(settingId));
        const value = this.publicAPI.addon.settings.get(settingId);
        document.documentElement.style.setProperty(cssProperty, value);
      }
    }
    if (this.manifest.customCssVariables) {
      for (const variable of this.manifest.customCssVariables) {
        const name = variable.name;
        const cssProperty = "--".concat(addonId, "-").concat(name);
        const value = variable.value;
        const evaluated = this.evaluateCustomCssVariable(value);
        document.documentElement.style.setProperty(cssProperty, evaluated);
      }
    }
  }
  evaluateCustomCssVariable(variable) {
    if (typeof variable !== 'object' || variable === null) {
      return variable;
    }
    switch (variable.type) {
      case 'alphaBlend':
        {
          const opaqueSource = this.evaluateCustomCssVariable(variable.opaqueSource);
          const transparentSource = this.evaluateCustomCssVariable(variable.transparentSource);
          return _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__[/* alphaBlend */ "a"](opaqueSource, transparentSource);
        }
      case 'alphaThreshold':
        {
          const source = this.evaluateCustomCssVariable(variable.source);
          const alpha = _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__[/* parseHex */ "e"](source).a;
          const threshold = this.evaluateCustomCssVariable(variable.threshold) || 0.5;
          if (alpha >= threshold) {
            return this.evaluateCustomCssVariable(variable.opaque);
          }
          return this.evaluateCustomCssVariable(variable.transparent);
        }
      case 'brighten':
        {
          const source = this.evaluateCustomCssVariable(variable.source);
          return _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__[/* brighten */ "b"](source, variable);
        }
      case 'makeHsv':
        {
          const h = this.evaluateCustomCssVariable(variable.h);
          const s = this.evaluateCustomCssVariable(variable.s);
          const v = this.evaluateCustomCssVariable(variable.v);
          return _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__[/* makeHsv */ "c"](h, s, v);
        }
      case 'map':
        {
          return variable.options[this.evaluateCustomCssVariable(variable.source)];
        }
      case 'multiply':
        {
          const hex = this.evaluateCustomCssVariable(variable.source);
          return _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__[/* multiply */ "d"](hex, variable);
        }
      case 'recolorFilter':
        {
          const source = this.evaluateCustomCssVariable(variable.source);
          return _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__[/* recolorFilter */ "f"](source);
        }
      case 'settingValue':
        {
          return this.publicAPI.addon.settings.get(variable.settingId);
        }
      case 'textColor':
        {
          const hex = this.evaluateCustomCssVariable(variable.source);
          const black = this.evaluateCustomCssVariable(variable.black);
          const white = this.evaluateCustomCssVariable(variable.white);
          const threshold = this.evaluateCustomCssVariable(variable.threshold);
          return _libraries_common_cs_text_color_esm_js__WEBPACK_IMPORTED_MODULE_11__[/* textColor */ "h"](hex, black, white, threshold);
        }
    }
    console.warn("Unknown customCssVariable", variable);
    return '#000000';
  }
  settingsChanged() {
    this.updateAllStyles();
    this.publicAPI.addon.settings.dispatchEvent(new CustomEvent('change'));
  }
  dynamicEnable() {
    if (this.loading) {
      return;
    }

    // This order is important. We need to update styles before calling the addon's dynamic
    // toggle event. We also need to update `disabled` before we can update styles because
    // the ConditionalStyle callbacks are implemented using the API.
    this.publicAPI.addon.self.disabled = false;
    this.updateAllStyles();
    this.publicAPI.addon.self.dispatchEvent(new CustomEvent('reenabled'));
  }
  dynamicDisable() {
    if (this.loading) {
      return;
    }

    // See comment in dynamicEnable().
    this.publicAPI.addon.self.disabled = true;
    this.updateAllStyles();
    this.publicAPI.addon.self.dispatchEvent(new CustomEvent('disabled'));
  }
  async run() {
    if (this.manifest.editorOnly) {
      await untilInEditor();
    }
    const mod = await _generated_addon_entries__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"][this.id]();
    this.resources = mod.resources;
    if (!this.manifest.noTranslations) {
      await addonMessagesPromise;
    }

    // Multiply by big number because the first userstyle is + 0, second is + 1, third is + 2, etc.
    // This number just has to be larger than the maximum number of userstyles in a single addon.
    const baseStylePrecedence = Object(_addon_precedence__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])(this.id) * 100;
    if (this.manifest.userstyles) {
      for (let i = 0; i < this.manifest.userstyles.length; i++) {
        const userstyle = this.manifest.userstyles[i];
        const userstylePrecedence = baseStylePrecedence + i;
        const userstyleCondition = () => !this.publicAPI.addon.self.disabled && _settings_store_singleton__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].evaluateCondition(this.id, userstyle.if);
        for (const [moduleId, cssText] of this.resources[userstyle.url]) {
          const sheet = _conditional_style__WEBPACK_IMPORTED_MODULE_13__[/* create */ "a"](moduleId, cssText);
          sheet.addDependent(this.id, userstylePrecedence, userstyleCondition);
        }
      }
    }
    const disabledCSS = ".".concat(getDisplayNoneWhileDisabledClass(this.id), "{display:none !important;}");
    const disabledStylesheet = _conditional_style__WEBPACK_IMPORTED_MODULE_13__[/* create */ "a"]("_disabled/".concat(this.id), disabledCSS);
    disabledStylesheet.addDependent(this.id, baseStylePrecedence, () => this.publicAPI.addon.self.disabled);
    this.updateCssVariables();
    if (this.manifest.userscripts) {
      for (const userscript of this.manifest.userscripts) {
        if (!_settings_store_singleton__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].evaluateCondition(userscript.if)) {
          continue;
        }
        const fn = this.resources[userscript.url];
        fn(this.publicAPI);
      }
    }
    this.loading = false;
  }
}
AddonRunner.instances = [];
const runAddon = addonId => {
  const runner = new AddonRunner(addonId);
  runner.run();
};
let oldMode = getEditorMode();
const emitUrlChange = () => {
  // In Scratch, URL changes usually mean someone went from editor to fullscreen or something like that.
  // This is not the case in TW -- the URL can change for many other reasons that addons probably aren't prepared
  // to handle.
  const newMode = getEditorMode();
  if (newMode !== oldMode) {
    oldMode = newMode;
    setTimeout(() => {
      for (const addon of AddonRunner.instances) {
        addon.publicAPI.addon.tab.dispatchEvent(new CustomEvent('urlChange'));
      }
    });
  }
};
const originalReplaceState = history.replaceState;
history.replaceState = function () {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  originalReplaceState.apply(this, args);
  emitUrlChange();
};
const originalPushState = history.pushState;
history.pushState = function () {
  for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }
  originalPushState.apply(this, args);
  emitUrlChange();
};
_settings_store_singleton__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].addEventListener('addon-changed', e => {
  const addonId = e.detail.addonId;
  const runner = AddonRunner.instances.find(i => i.id === addonId);
  if (runner) {
    runner.settingsChanged();
  }
  if (e.detail.dynamicEnable) {
    if (runner) {
      runner.dynamicEnable();
    } else {
      runAddon(addonId);
    }
  } else if (e.detail.dynamicDisable) {
    if (runner) {
      runner.dynamicDisable();
    }
  }
});
for (const id of Object.keys(_generated_addon_manifests__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])) {
  if (!_settings_store_singleton__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getAddonEnabled(id)) {
    continue;
  }
  runAddon(id);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(44)))

/***/ }),

/***/ 1826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isPaused; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setPaused; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return onPauseChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return onSingleStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRunningThread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return singleStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setup; });
/* harmony import */ var _event_target_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(478);
 /* inserted by pull.js */

// https://github.com/LLK/scratch-vm/blob/bb352913b57991713a5ccf0b611fda91056e14ec/src/engine/thread.js#L198
const STATUS_RUNNING = 0;
const STATUS_PROMISE_WAIT = 1;
const STATUS_YIELD = 2;
const STATUS_YIELD_TICK = 3;
const STATUS_DONE = 4;
let vm;
let paused = false;
let pausedThreadState = new WeakMap();
let pauseNewThreads = false;
let steppingThread = null;
const eventTarget = new _event_target_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]();
let audioContextStateChange = Promise.resolve();
const isPaused = () => paused;
const pauseThread = thread => {
  if (thread.updateMonitor || pausedThreadState.has(thread)) {
    // Thread is already paused or shouldn't be paused.
    return;
  }
  const pauseState = {
    time: vm.runtime.currentMSecs,
    status: thread.status
  };
  pausedThreadState.set(thread, pauseState);

  // Pausing a thread now works by just setting its status to STATUS_PROMISE_WAIT.
  // At the start of each frame, we make sure each paused thread is still paused.
  // This is really the best way to implement this.
  // Converting thread.status into a getter/setter causes Scratch's sequencer to permanently
  //    perform significantly slower in some projects. I think this is because it causes some
  //    very hot functions to be deoptimized.
  // Trapping sequencer.stepThread to no-op for a paused thread causes Scratch's sequencer
  //    to waste 24ms of CPU time every frame because it thinks a thread is running.
  thread.status = STATUS_PROMISE_WAIT;
};
const ensurePausedThreadIsStillPaused = thread => {
  if (thread.status === STATUS_DONE) {
    // If a paused thread is finished by single stepping, let it keep being done.
    return;
  }
  const pauseState = pausedThreadState.get(thread);
  if (pauseState) {
    if (thread.status !== STATUS_PROMISE_WAIT) {
      // We'll record the change so we can properly resume the thread, but the thread must still be paused for now.
      pauseState.status = thread.status;
      thread.status = STATUS_PROMISE_WAIT;
    }
  }
};
const setSteppingThread = thread => {
  steppingThread = thread;
};
const compensateForTimePassedWhilePaused = (thread, pauseState) => {
  // TW: Compiled threads store their timer in a different place.
  if (thread.timer) {
    thread.timer.startTime += vm.runtime.currentMSecs - pauseState.time;
  }
  const stackFrame = thread.peekStackFrame();
  if (stackFrame && stackFrame.executionContext && stackFrame.executionContext.timer) {
    stackFrame.executionContext.timer.startTime += vm.runtime.currentMSecs - pauseState.time;
  }
};
const stepUnsteppedThreads = lastSteppedThread => {
  // If we paused in the middle of a tick, we need to make sure to step the scripts that didn't get
  // stepped in that tick to avoid affecting project behavior.
  const threads = vm.runtime.threads;
  const startingIndex = getThreadIndex(lastSteppedThread);
  if (startingIndex !== -1) {
    for (let i = startingIndex; i < threads.length; i++) {
      const thread = threads[i];
      const status = thread.status;
      if (status === STATUS_RUNNING || status === STATUS_YIELD || status === STATUS_YIELD_TICK) {
        vm.runtime.sequencer.activeThread = thread;
        vm.runtime.sequencer.stepThread(thread);
      }
    }
  }
};
const setPaused = _paused => {
  const didChange = paused !== _paused;
  if (didChange) {
    paused = _paused;
    eventTarget.dispatchEvent(new CustomEvent("change"));
  }

  // Don't check didChange as new threads could've started that we need to pause.
  if (paused) {
    audioContextStateChange = audioContextStateChange.then(() => {
      return vm.runtime.audioEngine.audioContext.suspend();
    });
    if (!vm.runtime.ioDevices.clock._paused) {
      vm.runtime.ioDevices.clock.pause();
    }
    vm.runtime.threads.forEach(pauseThread);
    const activeThread = vm.runtime.sequencer.activeThread;
    if (activeThread) {
      setSteppingThread(activeThread);
      eventTarget.dispatchEvent(new CustomEvent("step"));
    }
  }

  // Only run unpausing logic when pause state changed to avoid unnecessary work
  if (!paused && didChange) {
    audioContextStateChange = audioContextStateChange.then(() => {
      return vm.runtime.audioEngine.audioContext.resume();
    });
    vm.runtime.ioDevices.clock.resume();
    for (const thread of vm.runtime.threads) {
      const pauseState = pausedThreadState.get(thread);
      if (pauseState) {
        compensateForTimePassedWhilePaused(thread, pauseState);
        thread.status = pauseState.status;
      }
    }
    pausedThreadState = new WeakMap();
    const lastSteppedThread = steppingThread;
    // This must happen after the "change" event is fired to fix https://github.com/ScratchAddons/ScratchAddons/issues/4281
    stepUnsteppedThreads(lastSteppedThread);
    steppingThread = null;
  }
};
const onPauseChanged = listener => {
  eventTarget.addEventListener("change", () => listener(paused));
};
const onSingleStep = listener => {
  eventTarget.addEventListener("step", listener);
};
const getRunningThread = () => steppingThread;

// A modified version of this function
// https://github.com/LLK/scratch-vm/blob/0e86a78a00db41af114df64255e2cd7dd881329f/src/engine/sequencer.js#L179
// Returns if we should continue executing this thread.
const singleStepThread = thread => {
  if (thread.status === STATUS_DONE) {
    return false;
  }
  // TW: Can't single-step compiled threads
  if (thread.isCompiled) {
    return false;
  }
  const currentBlockId = thread.peekStack();
  if (!currentBlockId) {
    thread.popStack();
    if (thread.stack.length === 0) {
      thread.status = STATUS_DONE;
      return false;
    }
  }
  pauseNewThreads = true;
  vm.runtime.sequencer.activeThread = thread;

  /*
    We need to call execute(this, thread) like the original sequencer. We don't
    have access to that method, so we need to force the original stepThread to run
    execute for us then exit before it tries to run more blocks.
    So, we make `thread.blockGlowInFrame = ...` throw an exception, so this line:
    https://github.com/LLK/scratch-vm/blob/bb352913b57991713a5ccf0b611fda91056e14ec/src/engine/sequencer.js#L214
    will end the function early. We then have to set it back to normal afterward.
     Why are we here just to suffer?
  */
  const specialError = ["special error used by Scratch Addons for implementing single-stepping"];
  Object.defineProperty(thread, "blockGlowInFrame", {
    set(_block) {
      throw specialError;
    }
  });
  try {
    thread.status = STATUS_RUNNING;

    // Restart the warp timer on each step.
    // If we don't do this, Scratch will think a lot of time has passed and may yield this thread.
    if (thread.warpTimer) {
      thread.warpTimer.start();
    }
    try {
      vm.runtime.sequencer.stepThread(thread);
    } catch (err) {
      if (err !== specialError) throw err;
    }
    if (thread.status !== STATUS_RUNNING) {
      return false;
    }
    if (thread.peekStack() === currentBlockId) {
      thread.goToNextBlock();
    }
    while (!thread.peekStack()) {
      thread.popStack();
      if (thread.stack.length === 0) {
        thread.status = STATUS_DONE;
        return false;
      }
      const stackFrame = thread.peekStackFrame();
      if (stackFrame.isLoop) {
        if (thread.peekStackFrame().warpMode) {
          continue;
        } else {
          return false;
        }
      } else if (stackFrame.waitingReporter) {
        return false;
      }
      thread.goToNextBlock();
    }
    return true;
  } finally {
    pauseNewThreads = false;
    vm.runtime.sequencer.activeThread = null;
    Object.defineProperty(thread, "blockGlowInFrame", {
      value: currentBlockId,
      configurable: true,
      enumerable: true,
      writable: true
    });

    // Strictly this doesn't seem to be necessary, but let's make sure the thread is still paused after we step it.
    if (thread.status !== STATUS_DONE) {
      thread.status = STATUS_PROMISE_WAIT;
    }
  }
};
const getRealStatus = thread => {
  const pauseState = pausedThreadState.get(thread);
  if (pauseState) {
    return pauseState.status;
  }
  return thread.status;
};
const getThreadIndex = thread => {
  // We can't use vm.runtime.threads.indexOf(thread) because threads can be restarted.
  // This can happens when, for example, a "when I receive message1" script broadcasts message1.
  // The object in runtime.threads is replaced when this happens.
  if (!thread) return -1;
  return vm.runtime.threads.findIndex(otherThread => otherThread.target === thread.target && otherThread.topBlock === thread.topBlock && otherThread.stackClick === thread.stackClick && otherThread.updateMonitor === thread.updateMonitor);
};
const findNewSteppingThread = startingIndex => {
  const threads = vm.runtime.threads;
  for (let i = startingIndex; i < threads.length; i++) {
    const possibleNewThread = threads[i];
    if (possibleNewThread.updateMonitor) {
      // Never single-step monitor update threads.
      continue;
    }
    // TW: Can't single-step compiled threads
    if (possibleNewThread.isCompiled) {
      continue;
    }
    const status = getRealStatus(possibleNewThread);
    if (status === STATUS_RUNNING || status === STATUS_YIELD || status === STATUS_YIELD_TICK) {
      // Thread must not be running for single stepping to work.
      pauseThread(possibleNewThread);
      return possibleNewThread;
    }
  }
  return null;
};
const singleStep = () => {
  if (steppingThread) {
    const pauseState = pausedThreadState.get(steppingThread);
    // We can assume pauseState is defined as any single stepping threads must already be paused.

    // Make it look like no time has passed
    compensateForTimePassedWhilePaused(steppingThread, pauseState);
    pauseState.time = vm.runtime.currentMSecs;

    // Execute the block
    const continueExecuting = singleStepThread(steppingThread);
    if (!continueExecuting) {
      // Try to move onto the next thread
      steppingThread = findNewSteppingThread(getThreadIndex(steppingThread) + 1);
    }
  }

  // If we don't have a thread, than we are between VM steps and should search for a new thread
  if (!steppingThread) {
    setSteppingThread(findNewSteppingThread(0));

    // End of VM step, emulate one frame of time passing.
    vm.runtime.ioDevices.clock._pausedTime += vm.runtime.currentStepTime;
    // Skip all sounds forward by vm.runtime.currentStepTime milliseconds so it's as
    //  if they where playing for one frame.
    const audioContext = vm.runtime.audioEngine.audioContext;
    for (const target of vm.runtime.targets) {
      for (const soundId of Object.keys(target.sprite.soundBank.soundPlayers)) {
        const soundPlayer = target.sprite.soundBank.soundPlayers[soundId];
        if (soundPlayer.outputNode) {
          soundPlayer.outputNode.stop(audioContext.currentTime);
          soundPlayer._createSource();
          soundPlayer.outputNode.start(audioContext.currentTime, audioContext.currentTime - soundPlayer.startingUntil + vm.runtime.currentStepTime / 1000);
          soundPlayer.startingUntil -= vm.runtime.currentStepTime / 1000;
        }
      }
    }
    // Move all threads forward one frame in time. For blocks like `wait () seconds`
    for (const thread of vm.runtime.threads) {
      if (pausedThreadState.has(thread)) {
        pausedThreadState.get(thread).time += vm.runtime.currentStepTime;
      }
    }

    // Try to run edge activated hats
    pauseNewThreads = true;
    const hats = vm.runtime._hats;
    for (const hatType in hats) {
      if (!Object.prototype.hasOwnProperty.call(hats, hatType)) continue;
      const hat = hats[hatType];
      if (hat.edgeActivated) {
        vm.runtime.startHats(hatType);
      }
    }
    pauseNewThreads = false;
  }
  eventTarget.dispatchEvent(new CustomEvent("step"));
};
const setup = _vm => {
  if (vm) {
    return;
  }
  vm = _vm;
  const originalStepThreads = vm.runtime.sequencer.stepThreads;
  vm.runtime.sequencer.stepThreads = function () {
    if (isPaused()) {
      for (const thread of this.runtime.threads) {
        ensurePausedThreadIsStillPaused(thread);
      }
    }
    return originalStepThreads.call(this);
  };

  // Unpause when green flag
  const originalGreenFlag = vm.runtime.greenFlag;
  vm.runtime.greenFlag = function () {
    setPaused(false);
    return originalGreenFlag.call(this);
  };

  // Disable edge-activated hats and hats like "when key pressed" while paused.
  const originalStartHats = vm.runtime.startHats;
  vm.runtime.startHats = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const hat = args[0];
    // These hats can be manually started by the user when paused or while single stepping.
    const isUserInitiated = hat === "event_whenbroadcastreceived" || hat === "control_start_as_clone";
    if (pauseNewThreads) {
      if (!isUserInitiated && !this.getIsEdgeActivatedHat(hat)) {
        return [];
      }
      const newThreads = originalStartHats.apply(this, args);
      for (const thread of newThreads) {
        pauseThread(thread);
      }
      return newThreads;
    } else if (paused && !isUserInitiated) {
      return [];
    }
    return originalStartHats.apply(this, args);
  };

  // Paused threads should not be counted as running when updating GUI state.
  const originalGetMonitorThreadCount = vm.runtime._getMonitorThreadCount;
  vm.runtime._getMonitorThreadCount = function (threads) {
    let count = originalGetMonitorThreadCount.call(this, threads);
    if (paused) {
      for (const thread of threads) {
        if (pausedThreadState.has(thread)) {
          count++;
        }
      }
    }
    return count;
  };
};

/***/ }),

/***/ 1829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return parseHex; });
/* unused harmony export convertToHex */
/* unused harmony export convertFromHsv */
/* unused harmony export convertToHsv */
/* unused harmony export brightness */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return textColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return brighten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alphaBlend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return makeHsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return recolorFilter; });
function parseHex(hex) {
  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
    a: hex.length >= 9 ? parseInt(hex.substring(7, 9), 16) / 255 : 1
  };
}
function convertComponentToHex(a) {
  a = Math.round(a).toString(16);
  if (a.length === 1) return "0".concat(a);
  return a;
}
function convertToHex(obj) {
  const r = convertComponentToHex(obj.r);
  const g = convertComponentToHex(obj.g);
  const b = convertComponentToHex(obj.b);
  const a = obj.a !== undefined ? convertComponentToHex(255 * obj.a) : "";
  return "#".concat(r).concat(g).concat(b).concat(a);
}
function convertFromHsv(_ref) {
  let {
    h,
    s,
    v
  } = _ref;
  if (s === 0) return {
    r: 255 * v,
    g: 255 * v,
    b: 255 * v
  };
  h %= 360;
  if (h < 0) h += 360;
  const h1 = h / 60;
  const hi = Math.floor(h1);
  const x = v * (1 - s * (1 - h1 + hi));
  const y = v * (1 - s * (h1 - hi));
  const z = v * (1 - s);
  switch (hi) {
    case 0:
      return {
        r: 255 * v,
        g: 255 * x,
        b: 255 * z
      };
    case 1:
      return {
        r: 255 * y,
        g: 255 * v,
        b: 255 * z
      };
    case 2:
      return {
        r: 255 * z,
        g: 255 * v,
        b: 255 * x
      };
    case 3:
      return {
        r: 255 * z,
        g: 255 * y,
        b: 255 * v
      };
    case 4:
      return {
        r: 255 * x,
        g: 255 * z,
        b: 255 * v
      };
    case 5:
      return {
        r: 255 * v,
        g: 255 * z,
        b: 255 * y
      };
  }
}
function convertToHsv(_ref2) {
  let {
    r,
    g,
    b
  } = _ref2;
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b);
  const d = v - Math.min(r, g, b);
  if (d === 0) return {
    h: 0,
    s: 0,
    v: v
  }; // gray
  const s = d / v;
  const hr = (v - r) / d;
  const hg = (v - g) / d;
  const hb = (v - b) / d;
  let h1;
  if (!hr) h1 = hb - hg;else if (!hg) h1 = 2 + hr - hb;else if (!hb) h1 = 4 + hg - hr;
  const h = 60 * h1 % 360;
  return {
    h,
    s,
    v
  };
}
function brightness(hex) {
  const {
    r,
    g,
    b
  } = parseHex(hex);
  return r * 0.299 + g * 0.587 + b * 0.114;
}
function textColor(hex, black, white, threshold) {
  threshold = threshold !== undefined ? threshold : 170;
  if (typeof threshold !== "number") threshold = brightness(threshold);
  if (brightness(hex) > threshold) {
    // https://stackoverflow.com/a/3943023
    return black !== undefined ? black : "#575e75";
  } else {
    return white !== undefined ? white : "#ffffff";
  }
}
function multiply(hex, c) {
  const {
    r,
    g,
    b,
    a
  } = parseHex(hex);
  if (c.r === undefined) c.r = 1;
  if (c.g === undefined) c.g = 1;
  if (c.b === undefined) c.b = 1;
  if (c.a === undefined) c.a = 1;
  return convertToHex({
    r: c.r * r,
    g: c.g * g,
    b: c.b * b,
    a: c.a * a
  });
}
function brighten(hex, c) {
  const {
    r,
    g,
    b,
    a
  } = parseHex(hex);
  if (c.r === undefined) c.r = 1;
  if (c.g === undefined) c.g = 1;
  if (c.b === undefined) c.b = 1;
  if (c.a === undefined) c.a = 1;
  return convertToHex({
    r: (1 - c.r) * 255 + c.r * r,
    g: (1 - c.g) * 255 + c.g * g,
    b: (1 - c.b) * 255 + c.b * b,
    a: 1 - c.a + c.a * a
  });
}
function alphaBlend(opaqueHex, transparentHex) {
  const {
    r: r1,
    g: g1,
    b: b1
  } = parseHex(opaqueHex);
  const {
    r: r2,
    g: g2,
    b: b2,
    a
  } = parseHex(transparentHex);
  return convertToHex({
    r: (1 - a) * r1 + a * r2,
    g: (1 - a) * g1 + a * g2,
    b: (1 - a) * b1 + a * b2
  });
}
function removeAlpha(hex) {
  return hex.substring(0, 7);
}
function makeHsv(hSource, sSource, vSource) {
  const h = typeof hSource === "number" ? hSource : convertToHsv(parseHex(hSource)).h;
  const s = typeof hSource !== "number" && convertToHsv(parseHex(hSource)).s === 0 ? 0 : typeof sSource === "number" ? sSource : convertToHsv(parseHex(sSource)).s;
  const v = typeof vSource === "number" ? vSource : convertToHsv(parseHex(vSource)).v;
  return convertToHex(convertFromHsv({
    h,
    s,
    v
  }));
}
function recolorFilter(hex) {
  const {
    r,
    g,
    b
  } = parseHex(hex);
  return "url(\"data:image/svg+xml,\n    <svg xmlns='http://www.w3.org/2000/svg'>\n      <filter id='recolor'>\n        <feColorMatrix color-interpolation-filters='sRGB' values='\n          0 0 0 0 ".concat(r / 255, "\n          0 0 0 0 ").concat(g / 255, "\n          0 0 0 0 ").concat(b / 255, "\n          0 0 0 1 0\n        '/>\n      </filter>\n    </svg>#recolor\n  \")").split("\n").join("");
}


/***/ }),

/***/ 1835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ Utils_Utils; });

// EXTERNAL MODULE: ./src/addons/addons/find-bar/blockly/BlockInstance.js
var BlockInstance = __webpack_require__(1837);

// CONCATENATED MODULE: ./src/addons/addons/find-bar/blockly/BlockFlasher.js
/**
 * Helper class to flash a Blockly scratch block in the users workspace
 */
class BlockFlasher {
  /**
   * FLash a block 3 times
   * @param block the block to flash
   */
  static flash(block) {
    if (myFlash.timerID > 0) {
      clearTimeout(myFlash.timerID);
      if (myFlash.block.svgPath_) {
        myFlash.block.svgPath_.style.fill = "";
      }
    }
    let count = 4;
    let flashOn = true;
    myFlash.block = block;

    /**
     * Internal method to switch the colour of a block between light yellow and it's original colour
     * @private
     */
    function _flash() {
      if (myFlash.block.svgPath_) {
        myFlash.block.svgPath_.style.fill = flashOn ? "#ffff80" : "";
      }
      flashOn = !flashOn;
      count--;
      if (count > 0) {
        myFlash.timerID = setTimeout(_flash, 200);
      } else {
        myFlash.timerID = 0;
        myFlash.block = null;
      }
    }
    _flash();
  }
}
const myFlash = {
  block: null,
  timerID: null
};
// CONCATENATED MODULE: ./src/addons/addons/find-bar/blockly/Utils.js



// Make these global so that every addon uses the same arrays.
let views = [];
let forward = [];
class Utils_Utils {
  constructor(addon) {
    this.addon = addon;
    this.addon.tab.traps.getBlockly().then(blockly => {
      this.blockly = blockly;
    });
    /**
     * Scratch Virtual Machine
     * @type {null|*}
     */
    this.vm = this.addon.tab.traps.vm;
    // this._myFlash = { block: null, timerID: null, colour: null };
    this.offsetX = 32;
    this.offsetY = 32;
    this.navigationHistory = new NavigationHistory();
    /**
     * The workspace
     */
    this._workspace = null;
  }

  /**
   * Get the Scratch Editing Target
   * @returns {?Target} the scratch editing target
   */
  getEditingTarget() {
    return this.vm.runtime.getEditingTarget();
  }

  /**
   * Set the current workspace (switches sprites)
   * @param targetID {string}
   */
  setEditingTarget(targetID) {
    if (this.getEditingTarget().id !== targetID) {
      this.vm.setEditingTarget(targetID);
    }
  }

  /**
   * Returns the main workspace
   * @returns !Blockly.Workspace
   */
  getWorkspace() {
    const currentWorkspace = Blockly.getMainWorkspace();
    if (currentWorkspace.getToolbox()) {
      // Sadly get get workspace does not always return the 'real' workspace... Not sure how to get that at the moment,
      //  but we can work out whether it's the right one by whether it has a toolbox.
      this._workspace = currentWorkspace;
    }
    return this._workspace;
  }

  /**
   * Based on wksp.centerOnBlock(li.data.labelID);
   * @param blockOrId {Blockly.Block|{id}|BlockInstance} A Blockly Block, a block id, or a BlockInstance
   */
  scrollBlockIntoView(blockOrId) {
    var _this$blockly;
    let workspace = this.getWorkspace();
    /** @type {Blockly.Block} */
    let block; // or is it really a Blockly.BlockSvg?

    if (blockOrId instanceof BlockInstance["a" /* default */]) {
      // Switch to sprite
      this.setEditingTarget(blockOrId.targetId);
      // Highlight the block!
      block = workspace.getBlockById(blockOrId.id);
    } else {
      block = blockOrId && blockOrId.id ? blockOrId : workspace.getBlockById(blockOrId);
    }
    if (!block) {
      return;
    }

    /**
     * !Blockly.Block
     */
    let root = block.getRootBlock();
    let base = this.getTopOfStackFor(block);
    let ePos = base.getRelativeToSurfaceXY(),
      // Align with the top of the block
      rPos = root.getRelativeToSurfaceXY(),
      // Align with the left of the block 'stack'
      scale = workspace.scale,
      x = rPos.x * scale,
      y = ePos.y * scale,
      xx = block.width + x,
      // Turns out they have their x & y stored locally, and they are the actual size rather than scaled or including children...
      yy = block.height + y,
      s = workspace.getMetrics();
    if (x < s.viewLeft + this.offsetX - 4 || xx > s.viewLeft + s.viewWidth || y < s.viewTop + this.offsetY - 4 || yy > s.viewTop + s.viewHeight) {
      // sx = s.contentLeft + s.viewWidth / 2 - x,
      let sx = x - s.contentLeft - this.offsetX,
        // sy = s.contentTop - y + Math.max(Math.min(32, 32 * scale), (s.viewHeight - yh) / 2);
        sy = y - s.contentTop - this.offsetY;
      this.navigationHistory.storeView(this.navigationHistory.peek(), 64);

      // workspace.hideChaff(),
      workspace.scrollbar.set(sx, sy);
      this.navigationHistory.storeView({
        left: sx,
        top: sy
      }, 64);
    }
    (_this$blockly = this.blockly) === null || _this$blockly === void 0 ? void 0 : _this$blockly.hideChaff();
    BlockFlasher.flash(block);
  }

  /**
   * Find the top stack block of a  stack
   * @param block a block in a stack
   * @returns {*} a block that is the top of the stack of blocks
   */
  getTopOfStackFor(block) {
    let base = block;
    while (base.getOutputShape() && base.getSurroundParent()) {
      base = base.getSurroundParent();
    }
    return base;
  }
}
class NavigationHistory {
  /**
   * Keep a record of the scroll and zoom position
   */
  storeView(next, dist) {
    forward = [];
    let workspace = Blockly.getMainWorkspace(),
      s = workspace.getMetrics();
    let pos = {
      left: s.viewLeft,
      top: s.viewTop
    };
    if (!next || distance(pos, next) > dist) {
      views.push(pos);
    }
  }
  peek() {
    return views.length > 0 ? views[views.length - 1] : null;
  }
  goBack() {
    const workspace = Blockly.getMainWorkspace(),
      s = workspace.getMetrics();
    let pos = {
      left: s.viewLeft,
      top: s.viewTop
    };
    let view = this.peek();
    if (!view) {
      return;
    }
    if (distance(pos, view) < 64) {
      // Go back to current if we are already far away from it
      if (views.length > 1) {
        views.pop();
        forward.push(view);
      }
    }
    view = this.peek();
    if (!view) {
      return;
    }
    let sx = view.left - s.contentLeft,
      sy = view.top - s.contentTop;

    // transform.setTranslate(-600,0);

    workspace.scrollbar.set(sx, sy);

    /*
              let blocklySvg = document.getElementsByClassName('blocklySvg')[0];
              let blocklyBlockCanvas = blocklySvg.getElementsByClassName('blocklyBlockCanvas')[0];
              let transform = blocklyBlockCanvas.transform.baseVal.getItem(0);
              let scale = blocklyBlockCanvas.transform.baseVal.getItem(1);
               let transformMatrix = transform.matrix;
              let scaleMatrix = scale.matrix;
               console.log('Transform - getMetrics', s);
              console.log('sx, sy: ', sx, sy);
              console.log('left, top: ', view.left, view.top);
              console.log('contentLeft, right:', s.contentLeft, s.contentTop);
              console.log('transform, scale matrix: ', transformMatrix, scaleMatrix);
    */
  }

  goForward() {
    let view = forward.pop();
    if (!view) {
      return;
    }
    views.push(view);
    let workspace = Blockly.getMainWorkspace(),
      s = workspace.getMetrics();
    let sx = view.left - s.contentLeft,
      sy = view.top - s.contentTop;
    workspace.scrollbar.set(sx, sy);
  }
}
function distance(pos, next) {
  return Math.sqrt(Math.pow(pos.left - next.left, 2) + Math.pow(pos.top - next.top, 2));
}

/***/ }),

/***/ 1837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockInstance; });
/**
 * Encapsulates a block (either in this sprite or another / Blockly, or native JSON block
 */
class BlockInstance {
  constructor(target, block) {
    this.targetId = target.id;
    this.id = block.id;
  }
}

/***/ }),

/***/ 1838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setVolume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getVolume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isMuted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setUnmutedVolume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setMuted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return onVolumeChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return setup; });
// Volumes in this file are always in 0-1.

let hasSetup = false;
/** @type {AudioParam|null} */
let gainNode = null;
let unmuteVolume = 1;
let volumeBeforeFinishSetup = 1;
const callbacks = [];
const setVolume = newVolume => {
  if (gainNode) {
    gainNode.value = newVolume;
  } else {
    volumeBeforeFinishSetup = newVolume;
  }
  callbacks.forEach(i => i());
};
const getVolume = () => {
  if (gainNode) {
    return gainNode.value;
  }
  return volumeBeforeFinishSetup;
};
const isMuted = () => {
  return getVolume() === 0;
};
const setUnmutedVolume = newUnmuteVolume => {
  unmuteVolume = newUnmuteVolume;
};
const setMuted = newMuted => {
  if (newMuted) {
    setUnmutedVolume(getVolume());
    setVolume(0);
  } else {
    setVolume(unmuteVolume);
  }
};
const onVolumeChanged = callback => {
  callbacks.push(callback);
};
const gotAudioEngine = audioEngine => {
  gainNode = audioEngine.inputNode.gain;
  gainNode.value = volumeBeforeFinishSetup;
};
const setup = vm => {
  if (hasSetup) {
    return;
  }
  hasSetup = true;
  const audioEngine = vm.runtime.audioEngine;
  if (audioEngine) {
    gotAudioEngine(audioEngine);
  } else {
    vm.runtime.once("PROJECT_LOADED", () => {
      gotAudioEngine(vm.runtime.audioEngine);
    });
  }
};

/***/ }),

/***/ 1850:
/***/ (function(module) {

module.exports = JSON.parse("{\"editor-devtools/clean-plus\":\"Clean up Blocks +\",\"editor-devtools/copy-all\":\"Copy All\",\"editor-devtools/copy-block\":\"Copy Block\",\"editor-devtools/cut-block\":\"Cut Block\",\"editor-devtools/lists\":\"lists\",\"editor-devtools/make-space\":\"Make Space\",\"editor-devtools/orphaned\":\"{count, plural, one {Developer tools: Delete 1 orphaned reporter block?} other {Developer tools: Delete # orphaned reporter blocks?} }\",\"editor-devtools/paste\":\"Paste\",\"editor-devtools/replace\":\"Developer tools: Switch all {name} in this sprite for the variable named:\",\"editor-devtools/swap\":\"Swap {var} in Sprite\",\"editor-devtools/unused-list\":\"{count, plural, one {Developer tools: Delete 1 unused local list? Here it is:\\n} other {Developer tools: Delete # unused local lists? Here they are:\\n} }\",\"editor-devtools/unused-var\":\"{count, plural, one {Developer tools: Delete 1 unused local variable? Here it is:\\n} other {Developer tools: Delete # unused local variables? Here they are:\\n} }\",\"editor-devtools/var-not-exist\":\"That variable does not exist...\",\"editor-devtools/variables\":\"variables\",\"find-bar/complex-broadcast\":\"(expression)\",\"find-bar/find-placeholder\":\"Find (Ctrl+F)\",\"middle-click-popup/start-typing\":\"Start Typing...\",\"editor-searchable-dropdowns/createBroadcast\":\"Create message \\\"{name}\\\"\",\"editor-searchable-dropdowns/createGlobalList\":\"Create list \\\"{name}\\\" for all sprites\",\"editor-searchable-dropdowns/createGlobalVariable\":\"Create variable \\\"{name}\\\" for all sprites\",\"editor-searchable-dropdowns/createLocalList\":\"Create list \\\"{name}\\\" for this sprite only\",\"editor-searchable-dropdowns/createLocalVariable\":\"Create variable \\\"{name}\\\" for this sprite only\",\"data-category-tweaks-v2/for-all-sprites\":\"For all sprites:\",\"data-category-tweaks-v2/for-this-sprite-only\":\"For this sprite only:\",\"data-category-tweaks-v2/list-category\":\"Lists\",\"hide-flyout/lock\":\"Lock Palette\",\"hide-flyout/unlock\":\"Unlock Palette\",\"mediarecorder/cancel\":\"Cancel\",\"mediarecorder/click-flag\":\"Waiting...\",\"mediarecorder/click-flag-description\":\"Click the green flag to start recording. Click this button to stop.\",\"mediarecorder/option-title\":\"Record Options\",\"mediarecorder/record\":\"Record\",\"mediarecorder/record-after-flag\":\"Do not start recording until the Green Flag is clicked\",\"mediarecorder/record-audio\":\"Include project sounds\",\"mediarecorder/record-audio-description\":\"This does not include Text-to-Speech.\",\"mediarecorder/record-description\":\"Record the stage as a WebM file. You can save it to your computer after the recording is finished.\\nNote: variable and list monitors will not be visible.\",\"mediarecorder/record-duration\":\"Record Duration (in seconds)\",\"mediarecorder/record-mic\":\"Include sounds from microphone\",\"mediarecorder/record-until-stop\":\"Stop recording after the project has stopped\",\"mediarecorder/record-until-stop-disabled\":\"You need to enable \\\"{afterFlagOption}\\\" to use this option.\",\"mediarecorder/start\":\"Start\",\"mediarecorder/start-delay\":\"Start Delay (in seconds)\",\"mediarecorder/starting-in\":\"Starting in {secs}...\",\"mediarecorder/stop\":\"Stop Recording\",\"debugger/block-breakpoint\":\"breakpoint\",\"debugger/block-error\":\"error %s\",\"debugger/block-log\":\"log %s\",\"debugger/block-warn\":\"warn %s\",\"debugger/cannot-pause-player\":\"Breakpoint block can only be used while on the editor.\",\"debugger/clear\":\"Clear\",\"debugger/clone-of\":\"Clone of {sprite}\",\"debugger/close\":\"Close\",\"debugger/console\":\"Logs\",\"debugger/debug\":\"Debug\",\"debugger/empty-string\":\"(empty string)\",\"debugger/enter-format\":\"Enter export format:\",\"debugger/export\":\"Export\",\"debugger/export-desc\":\"Click while holding Shift to customize export format.\",\"debugger/icon-error\":\"Error\",\"debugger/icon-warn\":\"Warning\",\"debugger/log-msg-broadcasted\":\"Broadcasted '{broadcast}'.\",\"debugger/log-msg-clone-cap\":\"Failed to create clone of '{sprite}', cannot create over 300 clones.\",\"debugger/log-msg-clone-created\":\"Created clone of '{sprite}'.\",\"debugger/log-msg-flag-clicked\":\"Green flag clicked.\",\"debugger/no-logs\":\"There are no logs to display.\",\"debugger/no-threads-running\":\"No threads running.\",\"debugger/step\":\"Step\",\"debugger/step-desc\":\"Executes one block.\",\"debugger/tab-logs\":\"Logs\",\"debugger/tab-threads\":\"Threads\",\"debugger/thread\":\"Thread {id}\",\"debugger/unknown-sprite\":\"(unknown sprite)\",\"debugger/unpause\":\"Resume\",\"pause/pause\":\"Pause\",\"clones/clones\":\"clones: {cloneCount}\",\"color-picker/hex\":\"hex color\",\"remove-sprite-confirm/confirm\":\"Do you want to delete the sprite?\",\"block-count/blocks\":\"{num, plural, one {1 block} other {# blocks}}\",\"onion-skinning/behind\":\"Behind\",\"onion-skinning/front\":\"Front\",\"onion-skinning/layering\":\"Layering\",\"onion-skinning/merge\":\"Merge\",\"onion-skinning/mode\":\"Mode\",\"onion-skinning/next\":\"Next costumes\",\"onion-skinning/opacity\":\"Opacity (%)\",\"onion-skinning/opacityStep\":\"Opacity step (%)\",\"onion-skinning/previous\":\"Previous costumes\",\"onion-skinning/settings\":\"Onion Skinning Settings\",\"onion-skinning/tint\":\"Tint\",\"onion-skinning/toggle\":\"Toggle Onion Skinning\",\"paint-snap/boxCenter\":\"Center of selection\",\"paint-snap/boxCorners\":\"Corners of selection\",\"paint-snap/boxEdgeMids\":\"Selection edge midpoints\",\"paint-snap/objectCenters\":\"Centers of objects\",\"paint-snap/objectCorners\":\"Corners of objects\",\"paint-snap/objectEdges\":\"Edges of objects\",\"paint-snap/objectMidlines\":\"Midlines of objects\",\"paint-snap/off\":\"Off\",\"paint-snap/on\":\"On\",\"paint-snap/pageAxes\":\"Page x and y axes\",\"paint-snap/pageCenter\":\"Center of the page\",\"paint-snap/pageCorners\":\"Corners of the page\",\"paint-snap/pageEdges\":\"Edges of the page\",\"paint-snap/settings\":\"Snap Settings\",\"paint-snap/snapFrom\":\"Snap from:\",\"paint-snap/snapTo\":\"Snap to:\",\"paint-snap/threshold\":\"Snapping distance\",\"paint-snap/toggle\":\"Toggle Snapping\",\"2d-color-picker/shade\":\"Shade\",\"better-img-uploads/upload\":\"HD Upload\",\"variable-manager/for-all-sprites\":\"Variables for all sprites\",\"variable-manager/for-this-sprite\":\"Variables for this sprite\",\"variable-manager/search\":\"Search\",\"variable-manager/too-big\":\"Click to display very large value.\",\"variable-manager/variables\":\"Variables\",\"search-sprites/placeholder\":\"Search sprites...\",\"sprite-properties/close-properties-panel-tooltip\":\"Collapse properties panel\",\"sprite-properties/open-properties-panel-tooltip\":\"Open properties panel\",\"gamepad/axes-a-b\":\"Axes {a} & {b}\",\"gamepad/axis-arrows\":\"Arrow Keys\",\"gamepad/axis-cursor\":\"Cursor\",\"gamepad/axis-custom\":\"Custom\",\"gamepad/axis-none\":\"None\",\"gamepad/browser-support\":\"This browser and operating system have known bugs that may make this addon difficult to use. Try another browser if you encounter problems.\",\"gamepad/button-n\":\"Button {n}\",\"gamepad/clear\":\"Clear all controls\",\"gamepad/config-header\":\"This comment contains configuration for gamepad support in third-party tools or websites such as https://turbowarp.org/\\nDo not edit by hand\",\"gamepad/key-click\":\"Click\",\"gamepad/key-down\":\"Down\",\"gamepad/key-enter\":\"Enter\",\"gamepad/key-left\":\"Left\",\"gamepad/key-none\":\"(none)\",\"gamepad/key-right\":\"Right\",\"gamepad/key-space\":\"Space\",\"gamepad/key-up\":\"Up\",\"gamepad/keyinput-title\":\"Click and press a key or click to change button. Escape to cancel. Backspace or delete to clear.\",\"gamepad/no-controllers\":\"No controllers detected. Try plugging one in and pressing a button on it.\",\"gamepad/reset\":\"Reset all controls to project defaults\",\"gamepad/settings\":\"Gamepad Settings\",\"gamepad/store-in-project\":\"Store these settings in the project to override the default configuration (Experimental tool for project creators)\",\"folders/add-to-folder\":\"add to folder: {folder}\",\"folders/closed-folder\":\"Folder\",\"folders/confirm-backpack-folder\":\"Save entire folder to backpack?\",\"folders/create-folder\":\"create folder\",\"folders/name-not-allowed\":\"Invalid folder name\",\"folders/name-prompt\":\"Name of folder:\",\"folders/name-prompt-title\":\"Create Folder\",\"folders/open-folder\":\"Opened\",\"folders/remove-folder\":\"remove folder\",\"folders/remove-from-folder\":\"remove from folder\",\"folders/rename-folder\":\"rename folder\",\"folders/rename-folder-prompt\":\"Rename folder to:\",\"folders/rename-folder-prompt-title\":\"Rename Folder\",\"block-switching/control_forever\":\"forever\",\"block-switching/control_if\":\"if\",\"block-switching/control_if_else\":\"if... else\",\"block-switching/control_repeat_until\":\"repeat until\",\"block-switching/control_wait_until\":\"wait until\",\"block-switching/data_changevariableby\":\"change variable\",\"block-switching/data_deletealloflist\":\"delete all\",\"block-switching/data_deleteoflist\":\"delete item\",\"block-switching/data_hidelist\":\"hide list\",\"block-switching/data_hidevariable\":\"hide variable\",\"block-switching/data_insertatlist\":\"insert item\",\"block-switching/data_replaceitemoflist\":\"replace item\",\"block-switching/data_setvariableto\":\"set variable\",\"block-switching/data_showlist\":\"show list\",\"block-switching/data_showvariable\":\"show variable\",\"block-switching/debugger_error\":\"error\",\"block-switching/debugger_log\":\"log\",\"block-switching/debugger_warn\":\"warn\",\"block-switching/event_broadcast\":\"broadcast\",\"block-switching/event_broadcastandwait\":\"broadcast and wait\",\"block-switching/looks_backdropnumbername\":\"backdrop number or name\",\"block-switching/looks_changeeffectby\":\"change effect\",\"block-switching/looks_changesizeby\":\"change size\",\"block-switching/looks_costumenumbername\":\"costume number or name\",\"block-switching/looks_goforwardbackwardlayers\":\"go forward or backward layers\",\"block-switching/looks_gotofrontback\":\"go to front or back layer\",\"block-switching/looks_hide\":\"hide\",\"block-switching/looks_nextbackdrop\":\"next backdrop\",\"block-switching/looks_nextcostume\":\"next costume\",\"block-switching/looks_say\":\"say\",\"block-switching/looks_sayforsecs\":\"say for seconds\",\"block-switching/looks_seteffectto\":\"set effect\",\"block-switching/looks_setsizeto\":\"set size\",\"block-switching/looks_show\":\"show\",\"block-switching/looks_switchbackdropto\":\"switch backdrop\",\"block-switching/looks_switchbackdroptoandwait\":\"switch backdrop and wait\",\"block-switching/looks_think\":\"think\",\"block-switching/looks_thinkforsecs\":\"think for seconds\",\"block-switching/motion_changexby\":\"change x\",\"block-switching/motion_changeyby\":\"change y\",\"block-switching/motion_setx\":\"set x\",\"block-switching/motion_sety\":\"set y\",\"block-switching/motion_turnleft\":\"turn left\",\"block-switching/motion_turnright\":\"turn right\",\"block-switching/motion_xposition\":\"x position\",\"block-switching/motion_yposition\":\"y position\",\"block-switching/music_changeTempo\":\"change tempo\",\"block-switching/music_setTempo\":\"set tempo\",\"block-switching/operator_add\":\"+\",\"block-switching/operator_and\":\"and\",\"block-switching/operator_divide\":\"/\",\"block-switching/operator_equals\":\"=\",\"block-switching/operator_gt\":\">\",\"block-switching/operator_lt\":\"<\",\"block-switching/operator_mod\":\"mod\",\"block-switching/operator_multiply\":\"*\",\"block-switching/operator_or\":\"or\",\"block-switching/operator_subtract\":\"-\",\"block-switching/pen_changePenColorParamBy\":\"change parameter\",\"block-switching/pen_changePenHueBy\":\"change hue\",\"block-switching/pen_changePenShadeBy\":\"change shade\",\"block-switching/pen_changePenSizeBy\":\"change size\",\"block-switching/pen_penDown\":\"pen down\",\"block-switching/pen_penUp\":\"pen up\",\"block-switching/pen_setPenColorParamTo\":\"set parameter\",\"block-switching/pen_setPenHueToNumber\":\"set hue\",\"block-switching/pen_setPenShadeToNumber\":\"set shade\",\"block-switching/pen_setPenSizeTo\":\"set size\",\"block-switching/sensing_coloristouchingcolor\":\"color touching color\",\"block-switching/sensing_mousex\":\"mouse x\",\"block-switching/sensing_mousey\":\"mouse y\",\"block-switching/sensing_touchingcolor\":\"touching color\",\"block-switching/sound_changeeffectby\":\"change effect\",\"block-switching/sound_changevolumeby\":\"change volume\",\"block-switching/sound_play\":\"start\",\"block-switching/sound_playuntildone\":\"play until done\",\"block-switching/sound_seteffectto\":\"set effect\",\"block-switching/sound_setvolumeto\":\"set volume\",\"blocks2image/error_blocks_not_added\":\"Add blocks to workspace!\",\"blocks2image/export_all_to_PNG\":\"Export all as PNG\",\"blocks2image/export_all_to_SVG\":\"Export all as SVG\",\"blocks2image/export_selected_to_PNG\":\"Export block as PNG\",\"blocks2image/export_selected_to_SVG\":\"Export block as SVG\",\"editor-extra-keys/enter-key\":\"enter\",\"move-to-top-bottom/bottom\":\"move to bottom\",\"move-to-top-bottom/top\":\"move to top\",\"rename-broadcasts/RENAME_BROADCAST\":\"Rename message\",\"rename-broadcasts/RENAME_BROADCAST_MODAL_TITLE\":\"Rename Message\",\"rename-broadcasts/RENAME_BROADCAST_TITLE\":\"Rename all \\\"{name}\\\" messages to:\",\"swap-local-global/cant-convert-cloud\":\"Cloud variables can't be converted to this sprite only.\",\"swap-local-global/cant-convert-conflict\":\"Can't convert because it would conflict with variables in another sprite: {sprites}\",\"swap-local-global/cant-convert-stage\":\"The stage can't have variables for this sprite only.\",\"swap-local-global/cant-convert-to-local\":\"Can't convert because it's used by multiple sprites: {sprites}\",\"swap-local-global/cant-convert-used-elsewhere\":\"Can't convert because it's used by another sprite: {sprite}\",\"swap-local-global/edit\":\"Edit properties:\",\"swap-local-global/edit-list-header\":\"Edit List\",\"swap-local-global/edit-list-option\":\"Rename or edit list\",\"swap-local-global/edit-variable-header\":\"Edit Variable\",\"swap-local-global/edit-variable-option\":\"Rename or edit variable\",\"swap-local-global/to-global\":\"Convert to \\\"For all sprites\\\"\",\"swap-local-global/to-local\":\"Convert to \\\"For this sprite only\\\"\",\"hide-stage/hide-stage\":\"Hide stage\"}");

/***/ }),

/***/ 1851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* generated by pull.js */
/* harmony default export */ __webpack_exports__["a"] = ({
  "de": () => __webpack_require__.e(/* import() | addon-l10n-de */ 57).then(__webpack_require__.t.bind(null, 1860, 3)),
  "es": () => __webpack_require__.e(/* import() | addon-l10n-es */ 58).then(__webpack_require__.t.bind(null, 1861, 3)),
  "fr": () => __webpack_require__.e(/* import() | addon-l10n-fr */ 59).then(__webpack_require__.t.bind(null, 1862, 3)),
  "hu": () => __webpack_require__.e(/* import() | addon-l10n-hu */ 60).then(__webpack_require__.t.bind(null, 1863, 3)),
  "it": () => __webpack_require__.e(/* import() | addon-l10n-it */ 61).then(__webpack_require__.t.bind(null, 1864, 3)),
  "ja": () => __webpack_require__.e(/* import() | addon-l10n-ja */ 62).then(__webpack_require__.t.bind(null, 1865, 3)),
  "ko": () => __webpack_require__.e(/* import() | addon-l10n-ko */ 63).then(__webpack_require__.t.bind(null, 1866, 3)),
  "nl": () => __webpack_require__.e(/* import() | addon-l10n-nl */ 64).then(__webpack_require__.t.bind(null, 1867, 3)),
  "pl": () => __webpack_require__.e(/* import() | addon-l10n-pl */ 65).then(__webpack_require__.t.bind(null, 1868, 3)),
  "pt": () => __webpack_require__.e(/* import() | addon-l10n-pt */ 66).then(__webpack_require__.t.bind(null, 1869, 3)),
  "ro": () => __webpack_require__.e(/* import() | addon-l10n-ro */ 67).then(__webpack_require__.t.bind(null, 1870, 3)),
  "ru": () => __webpack_require__.e(/* import() | addon-l10n-ru */ 68).then(__webpack_require__.t.bind(null, 1871, 3)),
  "sl": () => __webpack_require__.e(/* import() | addon-l10n-sl */ 69).then(__webpack_require__.t.bind(null, 1872, 3)),
  "tr": () => __webpack_require__.e(/* import() | addon-l10n-tr */ 70).then(__webpack_require__.t.bind(null, 1873, 3)),
  "zh-tw": () => __webpack_require__.e(/* import() | addon-l10n-zh-tw */ 71).then(__webpack_require__.t.bind(null, 1874, 3))
});

/***/ }),

/***/ 1852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* generated by pull.js */
/* harmony default export */ __webpack_exports__["a"] = ({
  "cat-blocks": () => __webpack_require__.e(/* import() | addon-entry-cat-blocks */ 10).then(__webpack_require__.bind(null, 1971)),
  "editor-devtools": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1954)),
  "find-bar": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1964)),
  "middle-click-popup": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1972)),
  "jump-to-def": () => __webpack_require__(1969),
  "editor-searchable-dropdowns": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1973)),
  "data-category-tweaks-v2": () => __webpack_require__.e(/* import() | addon-entry-data-category-tweaks-v2 */ 16).then(__webpack_require__.bind(null, 1974)),
  "block-palette-icons": () => __webpack_require__.e(/* import() | addon-entry-block-palette-icons */ 8).then(__webpack_require__.bind(null, 1952)),
  "hide-flyout": () => __webpack_require__.e(/* import() | addon-entry-hide-flyout */ 31).then(__webpack_require__.bind(null, 1958)),
  "mediarecorder": () => __webpack_require__.e(/* import() | addon-entry-mediarecorder */ 36).then(__webpack_require__.bind(null, 1975)),
  "drag-drop": () => __webpack_require__(1970),
  "debugger": () => __webpack_require__.e(/* import() | addon-entry-debugger */ 17).then(__webpack_require__.bind(null, 1950)),
  "pause": () => __webpack_require__(1957),
  "mute-project": () => __webpack_require__(1963),
  "vol-slider": () => __webpack_require__.e(/* import() | addon-entry-vol-slider */ 55).then(__webpack_require__.bind(null, 1956)),
  "clones": () => __webpack_require__.e(/* import() | addon-entry-clones */ 11).then(__webpack_require__.bind(null, 1959)),
  "mouse-pos": () => __webpack_require__.e(/* import() | addon-entry-mouse-pos */ 37).then(__webpack_require__.bind(null, 1976)),
  "color-picker": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1965)),
  "remove-sprite-confirm": () => __webpack_require__.e(/* import() | addon-entry-remove-sprite-confirm */ 43).then(__webpack_require__.bind(null, 1977)),
  "block-count": () => __webpack_require__.e(/* import() | addon-entry-block-count */ 7).then(__webpack_require__.bind(null, 1978)),
  "onion-skinning": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1955)),
  "paint-snap": () => __webpack_require__.e(/* import() | addon-entry-paint-snap */ 41).then(__webpack_require__.bind(null, 1951)),
  "default-costume-editor-color": () => __webpack_require__.e(/* import() | addon-entry-default-costume-editor-color */ 18).then(__webpack_require__.bind(null, 1979)),
  "bitmap-copy": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1980)),
  "2d-color-picker": () => __webpack_require__.e(/* import() | addon-entry-2d-color-picker */ 5).then(__webpack_require__.bind(null, 1960)),
  "better-img-uploads": () => __webpack_require__.e(/* import() | addon-entry-better-img-uploads */ 6).then(__webpack_require__.bind(null, 1966)),
  "pick-colors-from-stage": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1981)),
  "custom-block-shape": () => __webpack_require__.e(/* import() | addon-entry-custom-block-shape */ 13).then(__webpack_require__.bind(null, 1982)),
  "zebra-striping": () => __webpack_require__.e(/* import() | addon-entry-zebra-striping */ 56).then(__webpack_require__.bind(null, 1983)),
  "editor-theme3": () => __webpack_require__.e(/* import() | addon-entry-editor-theme3 */ 27).then(__webpack_require__.bind(null, 1984)),
  "custom-block-text": () => __webpack_require__.e(/* import() | addon-entry-custom-block-text */ 14).then(__webpack_require__.bind(null, 1914)),
  "editor-colored-context-menus": () => __webpack_require__.e(/* import() | addon-entry-editor-colored-context-menus */ 22).then(__webpack_require__.bind(null, 1985)),
  "editor-stage-left": () => __webpack_require__.e(/* import() | addon-entry-editor-stage-left */ 25).then(__webpack_require__.bind(null, 1986)),
  "editor-buttons-reverse-order": () => __webpack_require__.e(/* import() | addon-entry-editor-buttons-reverse-order */ 21).then(__webpack_require__.bind(null, 1919)),
  "variable-manager": () => __webpack_require__.e(/* import() | addon-entry-variable-manager */ 54).then(__webpack_require__.bind(null, 1961)),
  "search-sprites": () => __webpack_require__.e(/* import() | addon-entry-search-sprites */ 45).then(__webpack_require__.bind(null, 1987)),
  "sprite-properties": () => __webpack_require__.e(/* import() | addon-entry-sprite-properties */ 46).then(__webpack_require__.bind(null, 1962)),
  "gamepad": () => __webpack_require__.e(/* import() | addon-entry-gamepad */ 29).then(__webpack_require__.bind(null, 1953)),
  "editor-sounds": () => __webpack_require__.e(/* import() | addon-entry-editor-sounds */ 24).then(__webpack_require__.bind(null, 1988)),
  "folders": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1967)),
  "block-switching": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1989)),
  "load-extensions": () => __webpack_require__.e(/* import() | addon-entry-load-extensions */ 35).then(__webpack_require__.bind(null, 1990)),
  "custom-zoom": () => __webpack_require__.e(/* import() | addon-entry-custom-zoom */ 15).then(__webpack_require__.bind(null, 1991)),
  "initialise-sprite-position": () => __webpack_require__.e(/* import() | addon-entry-initialise-sprite-position */ 34).then(__webpack_require__.bind(null, 1992)),
  "blocks2image": () => __webpack_require__.e(/* import() | addon-entry-blocks2image */ 9).then(__webpack_require__.bind(null, 1993)),
  "remove-curved-stage-border": () => __webpack_require__.e(/* import() | addon-entry-remove-curved-stage-border */ 42).then(__webpack_require__.bind(null, 1930)),
  "transparent-orphans": () => __webpack_require__.e(/* import() | addon-entry-transparent-orphans */ 48).then(__webpack_require__.bind(null, 1932)),
  "paint-by-default": () => __webpack_require__.e(/* import() | addon-entry-paint-by-default */ 40).then(__webpack_require__.bind(null, 1994)),
  "block-cherry-picking": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 1995)),
  "hide-new-variables": () => __webpack_require__.e(/* import() | addon-entry-hide-new-variables */ 32).then(__webpack_require__.bind(null, 1996)),
  "editor-extra-keys": () => __webpack_require__.e(/* import() | addon-entry-editor-extra-keys */ 23).then(__webpack_require__.bind(null, 1997)),
  "hide-delete-button": () => __webpack_require__.e(/* import() | addon-entry-hide-delete-button */ 30).then(__webpack_require__.bind(null, 1934)),
  "no-script-bumping": () => __webpack_require__.e(/* import() | addon-entry-no-script-bumping */ 38).then(__webpack_require__.bind(null, 1998)),
  "disable-stage-drag-select": () => __webpack_require__.e(/* import() | addon-entry-disable-stage-drag-select */ 20).then(__webpack_require__.bind(null, 1999)),
  "move-to-top-bottom": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 2000)),
  "disable-paste-offset": () => __webpack_require__.e(/* import() | addon-entry-disable-paste-offset */ 19).then(__webpack_require__.bind(null, 2001)),
  "block-duplicate": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 2002)),
  "rename-broadcasts": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 2003)),
  "swap-local-global": () => __webpack_require__.e(/* import() | addon-entry-swap-local-global */ 47).then(__webpack_require__.bind(null, 2004)),
  "editor-comment-previews": () => __webpack_require__.e(/* import() | addon-default-entry */ 4).then(__webpack_require__.bind(null, 2005)),
  "columns": () => __webpack_require__.e(/* import() | addon-entry-columns */ 12).then(__webpack_require__.bind(null, 2006)),
  "number-pad": () => __webpack_require__.e(/* import() | addon-entry-number-pad */ 39).then(__webpack_require__.bind(null, 2007)),
  "script-snap": () => __webpack_require__.e(/* import() | addon-entry-script-snap */ 44).then(__webpack_require__.bind(null, 2008)),
  "fullscreen": () => __webpack_require__.e(/* import() | addon-entry-fullscreen */ 28).then(__webpack_require__.bind(null, 2009)),
  "hide-stage": () => __webpack_require__.e(/* import() | addon-entry-hide-stage */ 33).then(__webpack_require__.bind(null, 1968)),
  "tw-straighten-comments": () => __webpack_require__.e(/* import() | addon-entry-tw-straighten-comments */ 53).then(__webpack_require__.bind(null, 2010)),
  "tw-remove-backpack": () => __webpack_require__.e(/* import() | addon-entry-tw-remove-backpack */ 51).then(__webpack_require__.bind(null, 2011)),
  "tw-remove-feedback": () => __webpack_require__.e(/* import() | addon-entry-tw-remove-feedback */ 52).then(__webpack_require__.bind(null, 1948)),
  "tw-disable-cloud-variables": () => __webpack_require__.e(/* import() | addon-entry-tw-disable-cloud-variables */ 49).then(__webpack_require__.bind(null, 2012)),
  "tw-disable-compiler": () => __webpack_require__.e(/* import() | addon-entry-tw-disable-compiler */ 50).then(__webpack_require__.bind(null, 2013)),
  "editor-stepping": () => __webpack_require__.e(/* import() | addon-entry-editor-stepping */ 26).then(__webpack_require__.bind(null, 2014))
});

/***/ }),

/***/ 1853:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".pause-btn {\n  width: 2rem;\n  height: 2rem;\n  padding: 0.375rem;\n  border-radius: 0.25rem;\n  user-select: none;\n  user-drag: none;\n  cursor: pointer;\n}\n\n.pause-btn:hover {\n  background-color: hsla(0, 100%, 65%, 0.15);\n}\n", ""]);

// exports


/***/ }),

/***/ 1854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addContextMenu; });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// This file is imported from
// https://github.com/ScratchAddons/ScratchAddons/blob/master/addon-api/content-script/contextmenu.js

/* eslint-disable */

let initialized = false;
let hasDynamicContextMenu = false;
let contextMenus = [];
const onReactContextMenu = function onReactContextMenu(e) {
  var _ctxTarget$this$traps10, _ctxTarget$this$traps11, _ctxTarget$this$traps12, _ctxTarget$this$traps13, _ctxTarget$this$traps14, _ctxTarget$this$traps15;
  if (!e.target) return;
  const ctxTarget = e.target.closest(".react-contextmenu-wrapper");
  if (!ctxTarget) return;
  let ctxMenu = ctxTarget.querySelector("nav.react-contextmenu");
  let type;
  const extra = {};
  if (false) { var _ctxTarget$this$traps, _ctxTarget$this$traps2, _ctxTarget$this$traps3, _ctxTarget$this$traps4, _ctxTarget$this$traps5, _ctxTarget$this$traps6, _ctxTarget$this$traps7, _ctxTarget$this$traps8, _ctxTarget$this$traps9; } else if ((_ctxTarget$this$traps10 = ctxTarget[this.traps.getInternalKey(ctxTarget)]) !== null && _ctxTarget$this$traps10 !== void 0 && (_ctxTarget$this$traps11 = _ctxTarget$this$traps10.return) !== null && _ctxTarget$this$traps11 !== void 0 && (_ctxTarget$this$traps12 = _ctxTarget$this$traps11.return) !== null && _ctxTarget$this$traps12 !== void 0 && (_ctxTarget$this$traps13 = _ctxTarget$this$traps12.return) !== null && _ctxTarget$this$traps13 !== void 0 && (_ctxTarget$this$traps14 = _ctxTarget$this$traps13.stateNode) !== null && _ctxTarget$this$traps14 !== void 0 && (_ctxTarget$this$traps15 = _ctxTarget$this$traps14.props) !== null && _ctxTarget$this$traps15 !== void 0 && _ctxTarget$this$traps15.dragType) {
    // SpriteSelectorItem which despite its name is used for costumes, sounds, backpacked script etc
    const props = ctxTarget[this.traps.getInternalKey(ctxTarget)].return.return.return.stateNode.props;
    type = props.dragType.toLowerCase();
    extra.name = props.name;
    extra.itemId = props.id;
    extra.index = props.index;
  } else {
    return;
  }
  const ctx = _objectSpread({
    menuItem: ctxMenu,
    target: ctxTarget,
    type
  }, extra);
  Array.from(ctxMenu.children).forEach(existing => {
    if (existing.classList.contains("sa-ctx-menu")) existing.remove();
  });
  for (const item of hasDynamicContextMenu ? contextMenus.flatMap(menu => typeof menu === "function" ? menu(type, ctx) : menu) : contextMenus) {
    if (!item) continue;
    if (item.types && !item.types.some(itemType => type === itemType)) continue;
    if (item.condition && !item.condition(ctx)) continue;
    const itemElem = document.createElement("div");
    const classes = ["context-menu_menu-item"];
    if (item.border) classes.push("context-menu_menu-item-bordered");
    if (item.dangerous) classes.push("context-menu_menu-item-danger");
    itemElem.className = this.scratchClass(...classes, {
      others: ["react-contextmenu-item", "sa-ctx-menu", item.className || ""]
    });
    const label = document.createElement("span");
    label.textContent = item.label;
    itemElem.append(label);
    this.displayNoneWhileDisabled(itemElem, {
      display: "block"
    });
    itemElem.addEventListener("click", e => {
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent("REACT_CONTEXTMENU_HIDE", {
        detail: {
          action: "REACT_CONTEXTMENU_HIDE"
        }
      }));
      item.callback(ctx);
    });
    this.appendToSharedSpace({
      space: item.position,
      order: item.order,
      scope: ctxMenu,
      element: itemElem
    });
  }
  return;
};
const initialize = tab => {
  if (initialized) return;
  initialized = true;
  document.body.addEventListener("contextmenu", e => onReactContextMenu.call(tab, e), {
    capture: true
  });
};
const addContextMenu = (tab, callback, opts) => {
  if (typeof opts === "undefined") {
    contextMenus.push(callback);
    hasDynamicContextMenu = true;
  } else {
    contextMenus.push(_objectSpread(_objectSpread({}, opts), {}, {
      callback
    }));
  }
  initialize(tab);
};

/***/ }),

/***/ 1855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createEditorModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return confirm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return prompt; });
/* harmony import */ var _components_close_button_icon_close_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(166);
/* harmony import */ var _components_close_button_icon_close_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_close_button_icon_close_svg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1856);
/* harmony import */ var _modal_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modal_css__WEBPACK_IMPORTED_MODULE_1__);
// Based on
// https://github.com/ScratchAddons/ScratchAddons/blob/master/addon-api/content-script/modal.js



const createEditorModal = function createEditorModal(tab, title) {
  let {
    isOpen = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const container = Object.assign(document.createElement('div'), {
    className: tab.scratchClass('modal_modal-overlay'),
    dir: tab.direction
  });
  container.style.display = isOpen ? '' : 'none';
  document.body.appendChild(container);
  const modal = Object.assign(document.createElement('div'), {
    className: tab.scratchClass('modal_modal-content')
  });
  modal.addEventListener('click', e => e.stopPropagation());
  container.appendChild(modal);
  const header = Object.assign(document.createElement('div'), {
    className: tab.scratchClass('modal_header')
  });
  modal.appendChild(header);
  header.appendChild(Object.assign(document.createElement('div'), {
    className: tab.scratchClass('modal_header-item', 'modal_header-item-title'),
    innerText: title
  }));
  const closeContainer = Object.assign(document.createElement('div'), {
    className: tab.scratchClass('modal_header-item', 'modal_header-item-close')
  });
  header.appendChild(closeContainer);
  const closeButton = Object.assign(document.createElement('div'), {
    className: tab.scratchClass('close-button_close-button', 'close-button_large')
  });
  closeContainer.appendChild(closeButton);
  closeButton.appendChild(Object.assign(document.createElement('img'), {
    className: tab.scratchClass('close-button_close-icon'),
    src: _components_close_button_icon_close_svg__WEBPACK_IMPORTED_MODULE_0___default.a
  }));
  const content = Object.assign(document.createElement('div'), {
    className: _modal_css__WEBPACK_IMPORTED_MODULE_1___default.a.modalContent
  });
  modal.appendChild(content);
  return {
    container: modal,
    content,
    backdrop: container,
    closeButton,
    open: () => {
      container.style.display = '';
    },
    close: () => {
      container.style.display = 'none';
    },
    remove: container.remove.bind(container)
  };
};
const createButtonRow = tab => {
  const buttonRow = Object.assign(document.createElement('div'), {
    className: tab.scratchClass('prompt_button-row')
  });
  const cancelButton = Object.assign(document.createElement('button'), {
    className: tab.scratchClass('prompt_cancel-button'),
    innerText: tab.scratchMessage('gui.prompt.cancel')
  });
  buttonRow.appendChild(cancelButton);
  const okButton = Object.assign(document.createElement('button'), {
    className: tab.scratchClass('prompt_ok-button'),
    innerText: tab.scratchMessage('gui.prompt.ok')
  });
  buttonRow.appendChild(okButton);
  return {
    buttonRow,
    cancelButton,
    okButton
  };
};
const confirm = function confirm(tab, title, message) {
  let {
    useEditorClasses = false
  } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const {
    remove,
    container,
    content,
    backdrop,
    closeButton
  } = tab.createModal(title, {
    isOpen: true,
    useEditorClasses: useEditorClasses,
    useSizesClass: true
  });
  const mode = tab.editorMode !== null && useEditorClasses ? 'editor' : tab.clientVersion;
  if (mode === 'editor') {
    container.classList.add(tab.scratchClass('prompt_modal-content'));
    content.classList.add(tab.scratchClass('prompt_body'));
  }
  content.appendChild(Object.assign(document.createElement('div'), {
    className: tab.scratchClass('prompt_label'),
    innerText: message
  }));
  const {
    buttonRow,
    cancelButton,
    okButton
  } = createButtonRow(tab, mode);
  content.appendChild(buttonRow);
  okButton.focus();
  return new Promise(resolve => {
    const cancel = () => {
      remove();
      resolve(false);
    };
    const ok = () => {
      remove();
      resolve(true);
    };
    backdrop.addEventListener('click', cancel);
    closeButton.addEventListener('click', cancel);
    cancelButton.addEventListener('click', cancel);
    okButton.addEventListener('click', ok);
    container.addEventListener('keydown', e => {
      if (e.key === 'Enter') ok();
      if (e.key === 'Escape') cancel();
    });
  });
};
const prompt = function prompt(tab, title, message) {
  let defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  let {
    useEditorClasses = false
  } = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  const {
    remove,
    container,
    content,
    backdrop,
    closeButton
  } = tab.createModal(title, {
    isOpen: true,
    useEditorClasses: useEditorClasses,
    useSizesClass: true
  });
  container.classList.add(tab.scratchClass('prompt_modal-content'));
  content.classList.add(tab.scratchClass('prompt_body'));
  content.appendChild(Object.assign(document.createElement('div'), {
    className: tab.scratchClass('prompt_label'),
    innerText: message
  }));
  const input = Object.assign(document.createElement('input'), {
    className: tab.scratchClass('prompt_variable-name-text-input'),
    value: defaultValue
  });
  content.appendChild(input);
  input.focus();
  input.select();
  const {
    buttonRow,
    cancelButton,
    okButton
  } = createButtonRow(tab);
  content.appendChild(buttonRow);
  return new Promise(resolve => {
    const cancel = () => {
      remove();
      resolve(null);
    };
    const ok = () => {
      remove();
      resolve(input.value);
    };
    backdrop.addEventListener('click', cancel);
    closeButton.addEventListener('click', cancel);
    cancelButton.addEventListener('click', cancel);
    okButton.addEventListener('click', ok);
    container.addEventListener('keydown', e => {
      if (e.key === 'Enter') ok();
      if (e.key === 'Escape') cancel();
    });
  });
};

/***/ }),

/***/ 1856:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1857);

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

/***/ 1857:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".modal_modal-content_vp9Mi {\n  background-color: white;\n  color: #575e75;\n}\n[theme=\"dark\"] .modal_modal-content_vp9Mi {\n  background-color: var(--ui-primary);\n  color: var(--text-primary);\n}\n", ""]);

// exports
exports.locals = {
	"modal-content": "modal_modal-content_vp9Mi",
	"modalContent": "modal_modal-content_vp9Mi"
};

/***/ }),

/***/ 1858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateAll; });
// Stylesheets are added at the end of <body> so that they have higher precedence
// than those in <head> and above dark mode which is appended at the start of <body>
const stylesheetContainer = document.createElement('div');
stylesheetContainer.style.display = 'none';
document.body.appendChild(stylesheetContainer);

/**
 * Maps opaque module IDs to its ConditionalStyle.
 * @type {Map<unknown, ConditionalStyle>}
 */
const allSheets = new Map();

/**
 * Determine if the contents of a list are equal (===) to each other.
 * @param {unknown[]} a The first list
 * @param {unknown[]} b The second list
 * @returns {boolean} true if the lists are identical
 */
const areArraysEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; a++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};
const updateAll = () => {
  for (const sheet of allSheets.values()) {
    sheet.update();
  }
};
class ConditionalStyle {
  /**
   * @param {string} styleText CSS text
   */
  constructor(styleText) {
    /**
     * Lazily created <style> element.
     * @type {HTMLStyleElement}
     */
    this.el = null;

    /**
     * Temporary storing place for the CSS text until the style sheet is created.
     * @type {string|null}
     */
    this.styleText = styleText;

    /**
     * Higher number indicates this element should override lower numbers.
     * @type {number}
     */
    this.precedence = 0;

    /**
     * List of [addonId, condition] tuples.
     * @type {Array<[string, () => boolean>]}
     */
    this.dependents = [];

    /**
     * List of addonIds that were enabled on the previous call to update()
     * @type {string[]}
     */
    this.previousEnabledDependents = [];
  }
  addDependent(addonId, precedence, condition) {
    this.dependents.push([addonId, condition]);
    if (precedence > this.precedence) {
      this.precedence = precedence;
      if (this.el) {
        this.el.dataset.precedence = precedence;
      }
    }
    this.update();
  }
  getEnabledDependents() {
    const enabledDependents = [];
    for (const [addonId, condition] of this.dependents) {
      if (condition()) {
        enabledDependents.push(addonId);
      }
    }
    return enabledDependents;
  }
  dependsOn(addonId) {
    return this.dependents.some(dependent => dependent[0] === addonId);
  }
  getElement() {
    if (!this.el) {
      const el = document.createElement('style');
      el.className = 'scratch-addons-style';
      el.dataset.precedence = this.precedence;
      el.textContent = this.styleText;
      this.styleText = null;
      this.el = el;
    }
    return this.el;
  }
  update() {
    const enabledDependents = this.getEnabledDependents();
    if (areArraysEqual(enabledDependents, this.previousEnabledDependents)) {
      // Nothing to do.
      return;
    }
    this.previousEnabledDependents = enabledDependents;
    if (enabledDependents.length > 0) {
      const el = this.getElement();
      el.dataset.addons = enabledDependents.join(',');
      for (const child of stylesheetContainer.children) {
        const otherPrecedence = +child.dataset.precedence || 0;
        if (otherPrecedence >= this.precedence) {
          // We need to be before this style.
          stylesheetContainer.insertBefore(el, child);
          return;
        }
      }

      // We have higher precedence than all existing stylesheets.
      stylesheetContainer.appendChild(el);
    } else if (this.el) {
      this.el.remove();
    }
  }
}
const create = (moduleId, styleText) => {
  if (!allSheets.get(moduleId)) {
    const newSheet = new ConditionalStyle(styleText);
    allSheets.set(moduleId, newSheet);
  }
  return allSheets.get(moduleId);
};


/***/ }),

/***/ 1859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// This list is a subset of `addons` and defines the order by which addon CSS should
// applied in. Items later in this list are given higher precedence. Addons not listed
// here are implied to have the lowest possible precedence.
const addonPrecedence = ['columns', 'editor-stage-left', 'editor-theme3'];

/**
 * @param {string} addonId The addon ID
 * @returns {number} An integer >= 0
 */
const getPrecedence = addonId => addonPrecedence.indexOf(addonId) + 1;
/* harmony default export */ __webpack_exports__["a"] = (getPrecedence);

/***/ }),

/***/ 1957:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// EXTERNAL MODULE: ./src/addons/addons/debugger/module.js
var debugger_module = __webpack_require__(1826);

// CONCATENATED MODULE: ./src/addons/addons/pause/userscript.js

/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    console,
    msg
  } = _ref;
  Object(debugger_module["f" /* setup */])(addon.tab.traps.vm);
  const img = document.createElement("img");
  img.className = "pause-btn";
  img.draggable = false;
  img.title = msg("pause");
  const setSrc = () => img.src = addon.self.getResource(Object(debugger_module["b" /* isPaused */])() ? "/play.svg" : "/pause.svg") /* rewritten by pull.js */;
  img.addEventListener("click", () => Object(debugger_module["e" /* setPaused */])(!Object(debugger_module["b" /* isPaused */])()));
  addon.tab.displayNoneWhileDisabled(img);
  addon.self.addEventListener("disabled", () => Object(debugger_module["e" /* setPaused */])(false));
  setSrc();
  Object(debugger_module["c" /* onPauseChanged */])(setSrc);
  while (true) {
    await addon.tab.waitForElement("[class^='green-flag']", {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"]
    });
    addon.tab.appendToSharedSpace({
      space: "afterGreenFlag",
      element: img,
      order: 0
    });
  }
});
// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/pause/style.css
var style = __webpack_require__(1853);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/pause/pause.svg
/* harmony default export */ var pause = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTgiIHdpZHRoPSIxOCI+PHBhdGggZD0iTTIzMS40MjkgMTg4LjkyOVYxNzEuMDdoNC4yODV2MTcuODU4em0xMi4xNDIgMFYxNzEuMDdoNC4yODZ2MTcuODU4eiIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wMzMwOSAwIDAgLjk1NDI3IC0yMzguNTczIC0xNjIuNzY5KSIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZhZTAwIiBzdHJva2U9IiNkODk0MDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm5vcm1hbCIvPjwvc3ZnPg==");
// CONCATENATED MODULE: ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/pause/play.svg
/* harmony default export */ var play = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTgiIHdpZHRoPSIxOCI+PHBhdGggZD0ibTI0Ni4wNTUgMTgwLTEyLjExIDEyLjExdi0yNC4yMnoiIHRyYW5zZm9ybT0ibWF0cml4KDEuMTM5NDkgMCAwIC42Nzk0MyAtMjY0LjU5NSAtMTEzLjI5OCkiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlPSIjZDg5NDAwIiBmaWxsPSIjZmZhZTAwIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iLz48L3N2Zz4=");
// CONCATENATED MODULE: ./src/addons/addons/pause/_runtime_entry.js
/* generated by pull.js */




const resources = {
  "userscript.js": userscript,
  "style.css": style_default.a,
  "pause.svg": pause,
  "play.svg": play
};

/***/ }),

/***/ 1963:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// EXTERNAL MODULE: ./src/addons/addons/vol-slider/module.js
var vol_slider_module = __webpack_require__(1838);

// CONCATENATED MODULE: ./src/addons/addons/mute-project/userscript.js

/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    console
  } = _ref;
  const vm = addon.tab.traps.vm;
  Object(vol_slider_module["g" /* setup */])(vm);
  const icon = document.createElement("img");
  icon.loading = "lazy";
  icon.src = addon.self.getResource("/mute.svg") /* rewritten by pull.js */;
  icon.className = "sa-mute-project-icon";
  icon.style.userSelect = "none";
  addon.tab.displayNoneWhileDisabled(icon);
  const updateIcon = () => {
    icon.style.display = addon.self.disabled || !Object(vol_slider_module["b" /* isMuted */])() ? "none" : "";
  };
  Object(vol_slider_module["c" /* onVolumeChanged */])(updateIcon);
  updateIcon();
  const clickMuteButton = e => {
    if (!addon.self.disabled && (e.ctrlKey || e.metaKey)) {
      e.cancelBubble = true;
      e.preventDefault();
      Object(vol_slider_module["d" /* setMuted */])(!Object(vol_slider_module["b" /* isMuted */])());
    }
  };
  addon.self.addEventListener("disabled", () => {
    if (Object(vol_slider_module["b" /* isMuted */])()) {
      Object(vol_slider_module["d" /* setMuted */])(false);
    }
  });
  while (true) {
    let button = await addon.tab.waitForElement("[class^='green-flag_green-flag']", {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"]
    });
    addon.tab.appendToSharedSpace({
      space: "afterStopButton",
      element: icon,
      order: 0
    });
    button.addEventListener("click", clickMuteButton);
    button.addEventListener("contextmenu", clickMuteButton);
  }
});
// CONCATENATED MODULE: ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/mute-project/mute.svg
/* harmony default export */ var mute = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Tb3VuZC9FZmZlY3RzL011dGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iU291bmQvRWZmZWN0cy9NdXRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBmaWxsPSIjQ0Y2M0NGIiBkPSJNMTMuNDU0MTc0OSw1LjA0ODE1MjQzIEwxNS42MjgxMTY4LDIuODc0MjEwNTQgQzE1LjkyMTAxLDIuNTgxMzE3MzIgMTYuMzk1ODgzNywyLjU4MTMxNzMyIDE2LjY4ODc3NywyLjg3NDIxMDU0IEMxNi45ODE2NzAyLDMuMTY3MTAzNzYgMTYuOTgxNjcwMiwzLjY0MTk3NzQ5IDE2LjY4ODc3NywzLjkzNDg3MDcxIEw0LjUzMDMzMDA5LDE2LjA5MzMxNzYgQzQuMjM3NDM2ODcsMTYuMzg2MjEwOCAzLjc2MjU2MzEzLDE2LjM4NjIxMDggMy40Njk2Njk5MSwxNi4wOTMzMTc2IEMzLjE3Njc3NjcsMTUuODAwNDI0NCAzLjE3Njc3NjcsMTUuMzI1NTUwNiAzLjQ2OTY2OTkxLDE1LjAzMjY1NzQgTDYuMzEyMTQ5MzIsMTIuMTkwMTc4IEM2LjEyNDExOTEsMTIuMDYyMTM3OSA2LDExLjg0NjMzMzEgNiwxMS42MDI5ODc1IEw2LDguNjM3NDg3NSBDNiw4LjI0NzExMjUgNi4zMTk0MTUyNyw3LjkyNzYxMjUgNi43MDk2ODY3NSw3LjkyNzYxMjUgTDcuMDI0NjAzMjIsNy45Mjc2MTI1IEM4Ljc1Nzc2ODQ4LDcuOTI3NjEyNSAxMC4yOTQxMTEsNi44MTM4NjI1IDEwLjgzMzk2NzgsNS4xNjY4NjI1IEMxMC45Mjk1Njc0LDQuODc0MzYyNSAxMS4yMDE3NDUyLDQuNjc3NDg3NSAxMS41MDc2NjQxLDQuNjc3NDg3NSBMMTIuODMxNDM3OSw0LjY3NzQ4NzUgQzEzLjEwMDI4NDQsNC42Nzc0ODc1IDEzLjMzNDEwNzUsNC44MjcxNzIwOCAxMy40NTQxNzQ5LDUuMDQ4MTUyNDMgWiBNMTMuNTQsOS4wODM2NDc3MSBMMTMuNTQsMTQuODUzMTEyNSBDMTMuNTQsMTUuMjQ1NzM3NSAxMy4yMjI4MzQxLDE1LjU2Mjk4NzUgMTIuODMxNDM3OSwxNS41NjI5ODc1IEwxMS41MDc2NjQxLDE1LjU2Mjk4NzUgQzExLjIwMTc0NTIsMTUuNTYyOTg3NSAxMC45Mjk1Njc0LDE1LjM2NjExMjUgMTAuODMzOTY3OCwxNS4wNzM2MTI1IEMxMC41NzczNzg1LDE0LjI5MDgwNzcgMTAuMDk1NjgxMywxMy42Mjg0NjUgOS40NzQ3MzUzMSwxMy4xNDg5MTI0IEwxMy41NCw5LjA4MzY0NzcxIFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+Cg==");
// CONCATENATED MODULE: ./src/addons/addons/mute-project/_runtime_entry.js
/* generated by pull.js */


const resources = {
  "userscript.js": userscript,
  "mute.svg": mute
};

/***/ }),

/***/ 1969:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// EXTERNAL MODULE: ./src/addons/addons/find-bar/blockly/Utils.js + 1 modules
var Utils = __webpack_require__(1835);

// CONCATENATED MODULE: ./src/addons/addons/jump-to-def/userscript.js

/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    msg,
    console
  } = _ref;
  const utils = new Utils["a" /* default */](addon);
  const Blockly = await addon.tab.traps.getBlockly();
  Object.defineProperty(Blockly.Gesture.prototype, "jumpToDef", {
    get() {
      return !addon.self.disabled;
    }
  });
  const _doBlockClick_ = Blockly.Gesture.prototype.doBlockClick_;
  Blockly.Gesture.prototype.doBlockClick_ = function () {
    if (!addon.self.disabled && (this.mostRecentEvent_.button === 1 || this.mostRecentEvent_.shiftKey)) {
      // Wheel button...
      // Intercept clicks to allow jump to...?
      let block = this.startBlock_;
      for (; block; block = block.getSurroundParent()) {
        if (block.type === "procedures_call") {
          let findProcCode = block.getProcCode();
          let topBlocks = utils.getWorkspace().getTopBlocks();
          for (const root of topBlocks) {
            if (root.type === "procedures_definition") {
              let label = root.getChildren()[0];
              let procCode = label.getProcCode();
              if (procCode && procCode === findProcCode) {
                // Found... navigate to it!
                utils.scrollBlockIntoView(root);
                return;
              }
            }
          }
        }
      }
    }
    _doBlockClick_.call(this);
  };
});
// CONCATENATED MODULE: ./src/addons/addons/jump-to-def/_runtime_entry.js
/* generated by pull.js */

const resources = {
  "userscript.js": userscript
};

/***/ }),

/***/ 1970:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// CONCATENATED MODULE: ./src/addons/addons/drag-drop/userscript.js
/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    console
  } = _ref;
  /** @type {HTMLElement|null} */
  let currentDraggingElement = null;

  /** @type {WeakMap<HTMLElement, Animation>} */
  const allAnimations = new WeakMap();
  const FORWARD = 1;
  const REVERSE = -1;

  /**
   * @param {HTMLElement} element
   * @param {number} direction
   * @returns {Animation}
   */
  const animateElement = (element, direction) => {
    /** @type {Animation} */
    let animation;
    if (allAnimations.has(element)) {
      animation = allAnimations.get(element);
    } else {
      animation = element.animate([{
        // this object intentionally empty so the element animates from whatever its default value
        // is in CSS.
      }, {
        backgroundColor: "hsla(0, 100%, 77%, 1)"
      }], {
        duration: 250,
        fill: "forwards",
        easing: "ease"
      });
      allAnimations.set(element, animation);
    }
    animation.playbackRate = direction;
  };
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  const reactAwareSetValue = (el, value) => {
    nativeInputValueSetter.call(el, value);
    el.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  };
  const globalHandleDragOver = e => {
    if (addon.self.disabled) return;
    if (!e.dataTransfer.types.includes("Files")) {
      return;
    }
    let el;
    let callback;
    if ((el = e.target.closest('div[class*="sprite-selector_sprite-selector"]')) || (el = e.target.closest('div[class*="stage-selector_stage-selector"]')) || (el = e.target.closest('div[class*="selector_wrapper"]'))) {
      callback = files => {
        const hdFilter = addon.settings.get("use-hd-upload") ? "" : ":not(.sa-better-img-uploads-input)";
        const fileInput = el.querySelector('input[class*="action-menu_file-input"]' + hdFilter);
        fileInput.files = files;
        fileInput.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      };
    } else if (el = e.target.closest('div[class*="monitor_list-monitor"]')) {
      callback = files => {
        const contextMenuBefore = document.querySelector("body > .react-contextmenu.react-contextmenu--visible");
        // Simulate a right click on the list monitor
        el.dispatchEvent(new MouseEvent("contextmenu", {
          bubbles: true
        }));
        // Get the right click menu that opened (monitor context menus are
        // children of <body>)
        const contextMenuAfter = document.querySelector("body > .react-contextmenu.react-contextmenu--visible");
        // `contextMenuAfter` is only null if the context menu was already open
        // for the list monitor, in which case we can use the context menu from
        // before the simulated right click
        const contextMenu = contextMenuAfter === null ? contextMenuBefore : contextMenuAfter;
        // Sometimes the menu flashes open, so force hide it.
        contextMenu.style.display = "none";
        // Override DOM methods to import the text file directly
        // See: https://github.com/LLK/scratch-gui/blob/develop/src/lib/import-csv.js#L21-L22
        const appendChild = document.body.appendChild;
        document.body.appendChild = fileInput => {
          // Restore appendChild to <body>
          document.body.appendChild = appendChild;
          if (fileInput instanceof HTMLInputElement) {
            document.body.appendChild(fileInput);
            // Prevent Scratch from opening the file input dialog
            fileInput.click = () => {};
            // Insert files from the drop event into the file input
            fileInput.files = files;
            fileInput.dispatchEvent(new Event("change"));
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                contextMenu.style.display = null;
                contextMenu.style.opacity = 0;
                contextMenu.style.pointerEvents = "none";
              });
            });
          } else {
            // The next call for `appendChild` SHOULD be the file input, but if
            // it's not, then make `appendChild` behave as normal.
            console.error('File input was not immediately given to appendChild upon clicking "Import"!');
            return appendChild(fileInput);
          }
        };
        // Simulate clicking on the "Import" option
        contextMenu.children[0].click();
      };
    } else if (el = e.target.closest('div[class*="question_question-input"] > input[class*="input_input-form_l9eYg"]')) {
      callback = async files => {
        const text = (await Promise.all(Array.from(files, file => file.text()))).join("")
        // Match pasting behavior: remove all newline characters at the end
        .replace(/[\r\n]+$/, "").replace(/\r?\n|\r/g, " ");
        const selectionStart = el.selectionStart;
        reactAwareSetValue(el, el.value.slice(0, selectionStart) + text + el.value.slice(el.selectionEnd));
        el.setSelectionRange(selectionStart, selectionStart + text.length);
      };
    }
    if (!el) {
      return;
    }
    e.preventDefault();
    if (el === currentDraggingElement) {
      return;
    }
    currentDraggingElement = el;

    /** @type {HTMLElement[]} */
    const elementsToAnimate = [el, el.querySelector('div[class*="stage-selector_header_"]'), el.querySelector('div[class*="sprite-info_sprite-info"]'), el.querySelector('div[class*="monitor_list-body"]')].filter(i => i);
    for (const el of elementsToAnimate) {
      animateElement(el, FORWARD);
    }
    const handleDrop = e => {
      e.preventDefault();
      cleanup();
      if (e.dataTransfer.types.includes("Files") && e.dataTransfer.files.length > 0) {
        callback(e.dataTransfer.files);
      }
    };
    const handleDragOver = e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    };
    e.dataTransfer.dropEffect = "copy";
    const handleDragLeave = e => {
      e.preventDefault();
      cleanup();
    };
    const cleanup = () => {
      currentDraggingElement = null;
      el.removeEventListener("dragover", handleDragOver);
      el.removeEventListener("dragleave", handleDragLeave);
      el.removeEventListener("drop", handleDrop);
      for (const el of elementsToAnimate) {
        animateElement(el, REVERSE);
      }
    };
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);
  };
  document.addEventListener("dragover", globalHandleDragOver, {
    useCapture: true
  });
});
// CONCATENATED MODULE: ./src/addons/addons/drag-drop/_runtime_entry.js
/* generated by pull.js */

const resources = {
  "userscript.js": userscript
};

/***/ }),

/***/ 893:
/***/ (function(module, exports) {

/* eslint-disable no-extend-native */

if (!Blob.prototype.text) {
  Blob.prototype.text = function () {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = () => reject(new Error('Cannot read blob as text'));
      fr.readAsText(this);
    });
  };
}
if (!Array.prototype.flat) {
  Array.prototype.flat = function () {
    let depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    const result = [];
    for (const i of this) {
      if (Array.isArray(i)) {
        if (depth < 1) {
          result.push(i);
        } else {
          for (const j of i.flat(depth - 1)) {
            result.push(j);
          }
        }
      } else {
        result.push(i);
      }
    }
    return result;
  };
}
if (typeof queueMicrotask !== 'function') {
  window.queueMicrotask = callback => {
    Promise.resolve().then(callback);
  };
}

/***/ })

}]);