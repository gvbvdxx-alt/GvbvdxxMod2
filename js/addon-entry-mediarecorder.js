(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[36],{

/***/ 1830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// From https://github.com/LLK/scratch-gui/blob/develop/src/lib/download-blob.js
/* harmony default export */ __webpack_exports__["a"] = ((filename, blob) => {
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  // Use special ms version if available to get it working on Edge.
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename);
    return;
  }
  if ("download" in HTMLAnchorElement.prototype) {
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.type = blob.type;
    downloadLink.click();
    // remove the link after a timeout to prevent a crash on iOS 13 Safari
    window.setTimeout(() => {
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    }, 1000);
  } else {
    // iOS 12 Safari, open a new page and set href to data-uri
    let popup = window.open("", "_blank");
    const reader = new FileReader();
    reader.onloadend = function () {
      popup.location.href = reader.result;
      popup = null;
    };
    reader.readAsDataURL(blob);
  }
});

/***/ }),

/***/ 1890:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".mediaRecorderPopup {\n  box-sizing: border-box;\n  width: 700px;\n  max-height: min(800px, 80vh);\n  max-width: 85%;\n  margin-top: 12vh;\n  overflow-y: auto;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.mediaRecorderPopupContent {\n  padding: 1.5rem 2.25rem;\n}\n\n.mediaRecorderPopup p {\n  font-size: 1rem;\n  margin: 0.5rem auto;\n}\n\n.mediaRecorderPopup p :last-child {\n  margin-left: 1rem;\n}\n\n.mediaRecorderPopup[dir=\"rtl\"] p :last-child {\n  margin-left: 0;\n  margin-right: 1rem;\n}\n\np.mediaRecorderPopupOption {\n  display: flex;\n  align-items: center;\n}\n\n.mediaRecorderPopupOption input[type=\"checkbox\"] {\n  height: 1.5rem;\n}\n\n#recordOptionSecondsInput,\n#recordOptionDelayInput {\n  width: 6rem;\n}\n\n.mediaRecorderPopupButtons {\n  margin-top: 1.5rem;\n}\n\n.mediaRecorderPopupButtons button {\n  margin-left: 0.5rem;\n}\n\n/* TW: Fixes cancel button in dark mode */\n.mediaRecorderPopupButtons button:nth-of-type(1) {\n  color: black;\n}\n", ""]);

// exports


/***/ }),

/***/ 1975:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// EXTERNAL MODULE: ./src/addons/libraries/common/cs/download-blob.js
var download_blob = __webpack_require__(1830);

// CONCATENATED MODULE: ./src/addons/addons/mediarecorder/userscript.js

/* harmony default export */ var userscript = (async _ref => {
  let {
    addon,
    console,
    msg
  } = _ref;
  let recordElem;
  let isRecording = false;
  let isWaitingForFlag = false;
  let waitingForFlagFunc = null;
  let abortController = null;
  let stopSignFunc = null;
  let recordBuffer = [];
  let recorder;
  let timeout;
  while (true) {
    const elem = await addon.tab.waitForElement('div[class*="menu-bar_file-group"] > div:last-child:not(.sa-record)', {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"]
    });
    const getOptions = () => {
      const {
        backdrop,
        container,
        content,
        closeButton,
        remove
      } = addon.tab.createModal(msg("option-title"), {
        isOpen: true,
        useEditorClasses: true
      });
      container.classList.add("mediaRecorderPopup");
      content.classList.add("mediaRecorderPopupContent");
      content.appendChild(Object.assign(document.createElement("p"), {
        textContent: msg("record-description"),
        className: "recordOptionDescription"
      }));

      // Seconds
      const recordOptionSeconds = document.createElement("p");
      const recordOptionSecondsInput = Object.assign(document.createElement("input"), {
        type: "number",
        min: 1,
        max: 300,
        defaultValue: 30,
        id: "recordOptionSecondsInput",
        className: addon.tab.scratchClass("prompt_variable-name-text-input")
      });
      const recordOptionSecondsLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionSecondsInput",
        textContent: msg("record-duration")
      });
      recordOptionSeconds.appendChild(recordOptionSecondsLabel);
      recordOptionSeconds.appendChild(recordOptionSecondsInput);
      content.appendChild(recordOptionSeconds);

      // Delay
      const recordOptionDelay = document.createElement("p");
      const recordOptionDelayInput = Object.assign(document.createElement("input"), {
        type: "number",
        min: 0,
        max: 300,
        defaultValue: 0,
        id: "recordOptionDelayInput",
        className: addon.tab.scratchClass("prompt_variable-name-text-input")
      });
      const recordOptionDelayLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionDelayInput",
        textContent: msg("start-delay")
      });
      recordOptionDelay.appendChild(recordOptionDelayLabel);
      recordOptionDelay.appendChild(recordOptionDelayInput);
      content.appendChild(recordOptionDelay);

      // Audio
      const recordOptionAudio = Object.assign(document.createElement("p"), {
        className: "mediaRecorderPopupOption"
      });
      const recordOptionAudioInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: true,
        id: "recordOptionAudioInput"
      });
      const recordOptionAudioLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionAudioInput",
        textContent: msg("record-audio"),
        title: msg("record-audio-description")
      });
      recordOptionAudio.appendChild(recordOptionAudioInput);
      recordOptionAudio.appendChild(recordOptionAudioLabel);
      content.appendChild(recordOptionAudio);

      // Mic
      const recordOptionMic = Object.assign(document.createElement("p"), {
        className: "mediaRecorderPopupOption"
      });
      const recordOptionMicInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: false,
        id: "recordOptionMicInput"
      });
      const recordOptionMicLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionMicInput",
        textContent: msg("record-mic")
      });
      recordOptionMic.appendChild(recordOptionMicInput);
      recordOptionMic.appendChild(recordOptionMicLabel);
      content.appendChild(recordOptionMic);

      // Green flag
      const recordOptionFlag = Object.assign(document.createElement("p"), {
        className: "mediaRecorderPopupOption"
      });
      const recordOptionFlagInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: true,
        id: "recordOptionFlagInput"
      });
      const recordOptionFlagLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionFlagInput",
        textContent: msg("record-after-flag")
      });
      recordOptionFlag.appendChild(recordOptionFlagInput);
      recordOptionFlag.appendChild(recordOptionFlagLabel);
      content.appendChild(recordOptionFlag);

      // Stop sign
      const recordOptionStop = Object.assign(document.createElement("p"), {
        className: "mediaRecorderPopupOption"
      });
      const recordOptionStopInput = Object.assign(document.createElement("input"), {
        type: "checkbox",
        defaultChecked: true,
        id: "recordOptionStopInput"
      });
      const recordOptionStopLabel = Object.assign(document.createElement("label"), {
        htmlFor: "recordOptionStopInput",
        textContent: msg("record-until-stop")
      });
      recordOptionFlagInput.addEventListener("change", () => {
        const disabled = recordOptionStopInput.disabled = !recordOptionFlagInput.checked;
        if (disabled) {
          recordOptionStopLabel.title = msg("record-until-stop-disabled", {
            afterFlagOption: msg("record-after-flag")
          });
        }
      });
      recordOptionStop.appendChild(recordOptionStopInput);
      recordOptionStop.appendChild(recordOptionStopLabel);
      content.appendChild(recordOptionStop);
      let resolvePromise = null;
      const optionPromise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      let handleOptionClose = null;
      backdrop.addEventListener("click", () => handleOptionClose(null));
      closeButton.addEventListener("click", () => handleOptionClose(null));
      handleOptionClose = value => {
        resolvePromise(value);
        remove();
      };
      const buttonRow = Object.assign(document.createElement("div"), {
        className: addon.tab.scratchClass("prompt_button-row", {
          others: "mediaRecorderPopupButtons"
        })
      });
      const cancelButton = Object.assign(document.createElement("button"), {
        textContent: msg("cancel")
      });
      cancelButton.addEventListener("click", () => handleOptionClose(null), {
        once: true
      });
      buttonRow.appendChild(cancelButton);
      const startButton = Object.assign(document.createElement("button"), {
        textContent: msg("start"),
        className: addon.tab.scratchClass("prompt_ok-button")
      });
      startButton.addEventListener("click", () => handleOptionClose({
        secs: Number(recordOptionSecondsInput.value),
        delay: Number(recordOptionDelayInput.value),
        audioEnabled: recordOptionAudioInput.checked,
        micEnabled: recordOptionMicInput.checked,
        waitUntilFlag: recordOptionFlagInput.checked,
        useStopSign: !recordOptionStopInput.disabled && recordOptionStopInput.checked
      }), {
        once: true
      });
      buttonRow.appendChild(startButton);
      content.appendChild(buttonRow);
      return optionPromise;
    };
    const disposeRecorder = () => {
      isRecording = false;
      recordElem.textContent = msg("record");
      recordElem.title = "";
      recorder = null;
      recordBuffer = [];
      clearTimeout(timeout);
      timeout = 0;
      if (stopSignFunc) {
        addon.tab.traps.vm.runtime.off("PROJECT_STOP_ALL", stopSignFunc);
        stopSignFunc = null;
      }
    };
    const stopRecording = force => {
      if (isWaitingForFlag) {
        addon.tab.traps.vm.runtime.off("PROJECT_START", waitingForFlagFunc);
        isWaitingForFlag = false;
        waitingForFlagFunc = null;
        abortController.abort();
        abortController = null;
        disposeRecorder();
        return;
      }
      if (!isRecording || !recorder || recorder.state === "inactive") return;
      if (force) {
        disposeRecorder();
      } else {
        recorder.onstop = () => {
          const blob = new Blob(recordBuffer, {
            type: "video/webm"
          });
          Object(download_blob["a" /* default */])("video.webm", blob);
          disposeRecorder();
        };
        recorder.stop();
      }
    };
    const startRecording = async opts => {
      // Timer
      const secs = Math.min(300, Math.max(1, opts.secs));

      // Initialize MediaRecorder
      recordBuffer = [];
      isRecording = true;
      const vm = addon.tab.traps.vm;
      let micStream;
      if (opts.micEnabled) {
        // Show permission dialog before green flag is clicked
        try {
          micStream = await navigator.mediaDevices.getUserMedia({
            audio: true
          });
        } catch (e) {
          if (e.name !== "NotAllowedError" && e.name !== "NotFoundError") throw e;
          opts.micEnabled = false;
        }
      }
      if (opts.waitUntilFlag) {
        isWaitingForFlag = true;
        Object.assign(recordElem, {
          textContent: msg("click-flag"),
          title: msg("click-flag-description")
        });
        abortController = new AbortController();
        try {
          await Promise.race([new Promise(resolve => {
            waitingForFlagFunc = () => resolve();
            vm.runtime.once("PROJECT_START", waitingForFlagFunc);
          }), new Promise((_, reject) => {
            abortController.signal.addEventListener("abort", () => reject("aborted"), {
              once: true
            });
          })]);
        } catch (e) {
          if (e.message === "aborted") return;
          throw e;
        }
      }
      isWaitingForFlag = false;
      waitingForFlagFunc = abortController = null;
      const stream = new MediaStream();
      const videoStream = vm.runtime.renderer.canvas.captureStream();
      stream.addTrack(videoStream.getVideoTracks()[0]);
      const ctx = new AudioContext();
      const dest = ctx.createMediaStreamDestination();
      if (opts.audioEnabled) {
        const mediaStreamDestination = vm.runtime.audioEngine.audioContext.createMediaStreamDestination();
        vm.runtime.audioEngine.inputNode.connect(mediaStreamDestination);
        const audioSource = ctx.createMediaStreamSource(mediaStreamDestination.stream);
        audioSource.connect(dest);
      }
      if (opts.micEnabled) {
        const micSource = ctx.createMediaStreamSource(micStream);
        micSource.connect(dest);
      }
      if (opts.audioEnabled || opts.micEnabled) {
        stream.addTrack(dest.stream.getAudioTracks()[0]);
      }
      recorder = new MediaRecorder(stream, {
        mimeType: "video/webm"
      });
      recorder.ondataavailable = e => {
        recordBuffer.push(e.data);
      };
      recorder.onerror = e => {
        console.warn("Recorder error:", e.error);
        stopRecording(true);
      };
      timeout = setTimeout(() => stopRecording(false), secs * 1000);
      if (opts.useStopSign) {
        stopSignFunc = () => stopRecording();
        vm.runtime.once("PROJECT_STOP_ALL", stopSignFunc);
      }

      // Delay
      const delay = opts.delay || 0;
      const roundedDelay = Math.floor(delay);
      for (let index = 0; index < roundedDelay; index++) {
        recordElem.textContent = msg("starting-in", {
          secs: roundedDelay - index
        });
        await new Promise(resolve => setTimeout(resolve, 975));
      }
      setTimeout(() => {
        recordElem.textContent = msg("stop");
        recorder.start(1000);
      }, (delay - roundedDelay) * 1000);
    };
    if (!recordElem) {
      recordElem = Object.assign(document.createElement("div"), {
        className: "sa-record " + elem.className,
        textContent: msg("record")
      });
      recordElem.addEventListener("click", async () => {
        if (isRecording) {
          stopRecording();
        } else {
          const opts = await getOptions();
          if (!opts) {
            console.log("Canceled");
            return;
          }
          startRecording(opts);
        }
      });
    }
    elem.parentElement.appendChild(recordElem);
  }
});
// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/mediarecorder/style.css
var style = __webpack_require__(1890);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./src/addons/addons/mediarecorder/_runtime_entry.js
/* generated by pull.js */


const resources = {
  "userscript.js": userscript,
  "style.css": style_default.a
};

/***/ })

}]);