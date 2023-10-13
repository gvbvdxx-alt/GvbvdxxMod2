exports.ids = ["iframe-extension-worker"];
exports.modules = {

/***/ "./src/extension-support/tw-iframe-extension-worker.js":
/*!*************************************************************!*\
  !*** ./src/extension-support/tw-iframe-extension-worker.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const uid = __webpack_require__(/*! ../util/uid */ "./src/util/uid.js");

const frameSource = __webpack_require__(/*! ./tw-load-script-as-plain-text!./tw-iframe-extension-worker-entry */ "./src/extension-support/tw-load-script-as-plain-text.js!./src/extension-support/tw-iframe-extension-worker-entry.js");

const none = "'none'";
const allow = '*';
const featurePolicy = {
  'accelerometer': none,
  'ambient-light-sensor': none,
  'autoplay': none,
  'battery': none,
  'camera': none,
  'display-capture': none,
  'document-domain': none,
  'encrypted-media': none,
  'fullscreen': none,
  'gamepad': allow,
  'geolocation': none,
  'gyroscope': none,
  'magnetometer': none,
  'microphone': none,
  'midi': none,
  'payment': none,
  'picture-in-picture': none,
  'publickey-credentials-get': none,
  'speaker-selection': none,
  'usb': none,
  'vibrate': none,
  'vr': none,
  'screen-wake-lock': none,
  'web-share': none,
  'interest-cohort': none
};

const generateAllow = () => Object.entries(featurePolicy).map((_ref) => {
  let [name, permission] = _ref;
  return "".concat(name, " ").concat(permission);
}).join('; ');

class IframeExtensionWorker {
  constructor() {
    this.id = uid();
    this.isRemote = true;
    this.ready = false;
    this.queuedMessages = [];
    this.iframe = document.createElement('iframe');
    this.iframe.className = 'tw-custom-extension-frame';
    this.iframe.dataset.id = this.id;
    this.iframe.style.display = 'none';
    this.iframe.setAttribute('aria-hidden', 'true');
    this.iframe.sandbox = 'allow-scripts';
    this.iframe.allow = generateAllow();
    document.body.appendChild(this.iframe);
    window.addEventListener('message', this._onWindowMessage.bind(this));
    const blob = new Blob([// eslint-disable-next-line max-len
    "<!DOCTYPE html><body><script>window.__WRAPPED_IFRAME_ID__=".concat(JSON.stringify(this.id), ";").concat(frameSource, "</script></body>")], {
      type: 'text/html'
    });
    this.iframe.src = URL.createObjectURL(blob);
  }

  _onWindowMessage(e) {
    if (!e.data || e.data.vmIframeId !== this.id) {
      return;
    }

    if (e.data.ready) {
      this.ready = true;

      for (const {
        data,
        transfer
      } of this.queuedMessages) {
        this.postMessage(data, transfer);
      }

      this.queuedMessages.length = 0;
    }

    if (e.data.message) {
      this.onmessage({
        data: e.data.message
      });
    }
  }

  onmessage() {// Should be overridden
  }

  postMessage(data, transfer) {
    if (this.ready) {
      if (transfer) {
        this.iframe.contentWindow.postMessage(data, '*', transfer);
      } else {
        this.iframe.contentWindow.postMessage(data, '*');
      }
    } else {
      this.queuedMessages.push({
        data,
        transfer
      });
    }
  }

}

module.exports = IframeExtensionWorker;

/***/ }),

/***/ "./src/extension-support/tw-load-script-as-plain-text.js!./src/extension-support/tw-iframe-extension-worker-entry.js":
/*!***************************************************************************************************************************!*\
  !*** ./src/extension-support/tw-load-script-as-plain-text.js!./src/extension-support/tw-iframe-extension-worker-entry.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Not supported in non-web environment");

/***/ })

};;
//# sourceMappingURL=iframe-extension-worker.js.map