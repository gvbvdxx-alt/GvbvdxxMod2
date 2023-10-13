(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[6],{

/***/ 1907:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "[data-for*=\"HD Upload\"]:hover + .__react_component_tooltip {\n  visibility: visible;\n}\n\n.sa-better-img-uploads-btn:not([id*=\"_right\"]) + .__react_component_tooltip {\n  left: auto;\n}\n\n.sa-better-img-uploads-btn[id*=\"_right\"] + .__react_component_tooltip,\n[data-for=\"sa-Choose_a_Backdrop-HD Upload\"] + .__react_component_tooltip {\n  right: auto;\n}\n", ""]);

// exports


/***/ }),

/***/ 1966:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// CONCATENATED MODULE: ./src/addons/addons/better-img-uploads/userscript.js
/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    console,
    msg
  } = _ref;
  let mode = addon.settings.get("fitting");
  addon.settings.addEventListener("change", () => {
    mode = addon.settings.get("fitting");
  });
  const createItem = (id, right) => {
    const uploadMsg = msg("upload");
    const wrapper = Object.assign(document.createElement("div"), {
      id
    });
    const button = Object.assign(document.createElement("button"), {
      className: "".concat(addon.tab.scratchClass("action-menu_button"), " ").concat(addon.tab.scratchClass("action-menu_more-button"), " sa-better-img-uploads-btn"),
      currentitem: "false"
    });
    button.dataset.for = "sa-".concat(id, "-HD Upload");
    button.dataset.tip = uploadMsg;
    const img = Object.assign(document.createElement("img"), {
      className: "".concat(addon.tab.scratchClass("action-menu_more-icon"), " sa-better-img-uploader"),
      draggable: "false",
      src: addon.self.getResource("/icon.svg") /* rewritten by pull.js */,
      height: "10",
      width: "10"
    });
    button.append(img);
    const input = Object.assign(document.createElement("input"), {
      accept: ".svg, .png, .bmp, .jpg, .jpeg",
      className: "".concat(addon.tab.scratchClass("action-menu_file-input" /* TODO: when adding dynamicDisable, ensure compat with drag-drop */), " sa-better-img-uploads-input"),
      multiple: "true",
      type: "file"
    });
    button.append(input);
    wrapper.append(button);
    const tooltip = Object.assign(document.createElement("div"), {
      className: "__react_component_tooltip place-".concat(right ? "left" : "right", " type-dark ").concat(addon.tab.scratchClass("action-menu_tooltip"), " sa-better-img-uploads-tooltip"),
      id: "sa-".concat(id, "-HD Upload"),
      textContent: uploadMsg
    });
    tooltip.dataset.id = "tooltip";
    wrapper.append(tooltip);
    addon.tab.displayNoneWhileDisabled(wrapper);
    return [wrapper, button, input, tooltip];
  };
  while (true) {
    //Catch all upload menus as they are created
    const spriteSelector = '[class*="sprite-selector_sprite-selector_"] [class*="action-menu_more-buttons_"]';
    const stageSelector = '[class*="stage-selector_stage-selector_"] [class*="action-menu_more-buttons_"]';
    const costumeSelector = '[data-tabs] > :nth-child(3) [class*="action-menu_more-buttons_"]';
    let menu = await addon.tab.waitForElement("".concat(spriteSelector, ", ").concat(stageSelector, ", ").concat(costumeSelector), {
      markAsSeen: true,
      reduxCondition: state => !state.scratchGui.mode.isPlayerOnly,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE", "scratch-gui/navigation/ACTIVATE_TAB"]
    });
    let button = menu.parentElement.previousElementSibling.previousElementSibling; //The base button that the popup menu is from

    let id = button.getAttribute("aria-label").replace(/\s+/g, "_");
    let isRight =
    //Is it on the right side of the screen?
    button.parentElement.classList.contains(addon.tab.scratchClass("sprite-selector_add-button")) || button.parentElement.classList.contains(addon.tab.scratchClass("stage-selector_add-button"));
    if (isRight) {
      id += "_right";
    }
    const [menuItem, hdButton, input, tooltip] = createItem(id, isRight);
    menu.prepend(menuItem);
    hdButton.addEventListener("click", e => {
      // When clicking on the button in the "add backdrop menu", don't switch to the stage before
      // a file was selected.
      e.stopPropagation();
      input.files = new FileList(); //Empty the input to make sure the change event fires even if the same file was uploaded.
      input.click();
    });
    input.addEventListener("change", e => {
      onchange(e, id);
    });
    let observer = new MutationObserver(() => doresize(id, menu, menuItem, isRight));
    observer.observe(menu, {
      attributes: true,
      subtree: true
    });
    function doresize(id, menu, menuItem, isRight) {
      let rect = menuItem.getBoundingClientRect();
      tooltip.style.top = rect.top + 2 + "px";
      tooltip.style[isRight ? "right" : "left"] = isRight ? window.innerWidth - rect.right + rect.width + 10 + "px" : rect.left + rect.width + "px";
    }
  }
  async function onchange(e, id) {
    let iD = id; //Save the id, not sure if this is really necessary?
    let el = e.target;
    let files = Array.from(el.files);
    let processed = new Array();
    for (let file of files) {
      if (file.type.includes("svg")) {
        //The file is already a svg, we should not change it...
        processed.push(file);
        continue;
      }
      let blob = await new Promise(resolve => {
        //Get the Blob data url for the image so that we can add it to the svg
        let reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.readAsDataURL(file);
      });
      let i = new Image(); //New image to get the image's size
      i.src = blob;
      await new Promise(resolve => {
        i.onload = resolve;
      });
      let dim = {
        width: i.width,
        height: i.height
      };
      const originalDim = JSON.parse(JSON.stringify(dim));
      if (mode === "fit") {
        //Make sure the image fits completely in the stage
        dim = getResizedWidthHeight(dim.width, dim.height);
      } else if (mode === "fill") {
        //Fill the stage with the image
        dim.height = dim.height / dim.width * 480;
        dim.width = 480;
        if (dim.height < 360) {
          dim.width = dim.width / dim.height * 360;
          dim.height = 360;
        }
        if (dim.width < 480) {
          dim.height = dim.height / dim.width * 480;
          dim.width = 480;
        }
      } //Otherwise just leave the image the same size

      function getResizedWidthHeight(oldWidth, oldHeight) {
        const STAGE_WIDTH = 479;
        const STAGE_HEIGHT = 360;
        const STAGE_RATIO = STAGE_WIDTH / STAGE_HEIGHT;

        // If both dimensions are smaller than or equal to corresponding stage dimension,
        // double both dimensions
        if (oldWidth <= STAGE_WIDTH && oldHeight <= STAGE_HEIGHT) {
          return {
            width: oldWidth,
            height: oldHeight
          };
        }

        // If neither dimension is larger than 2x corresponding stage dimension,
        // this is an in-between image, return it as is
        if (oldWidth <= STAGE_WIDTH && oldHeight <= STAGE_HEIGHT) {
          return {
            width: oldWidth,
            height: oldHeight
          };
        }
        const imageRatio = oldWidth / oldHeight;
        // Otherwise, figure out how to resize
        if (imageRatio >= STAGE_RATIO) {
          // Wide Image
          return {
            width: STAGE_WIDTH,
            height: Math.floor(STAGE_WIDTH / imageRatio)
          };
        }
        // In this case we have either:
        // - A wide image, but not with as big a ratio between width and height,
        // making it so that fitting the width to double stage size would leave
        // the height too big to fit in double the stage height
        // - A square image that's still larger than the double at least
        // one of the stage dimensions, so pick the smaller of the two dimensions (to fit)
        // - A tall image
        // In any of these cases, resize the image to fit the height to double the stage height
        return {
          width: Math.floor(STAGE_HEIGHT * imageRatio),
          height: STAGE_HEIGHT
        };
      }
      processed.push(new File(
      //Create the svg file
      ["<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewbox=\"0,0,".concat(dim.width, ",").concat(dim.height, "\" width=\"").concat(dim.width, "\" height=\"").concat(dim.height, "\">\n        <g>\n          <g\n              data-paper-data='{\"isPaintingLayer\":true}'\n              fill=\"none\"\n              fill-rule=\"nonzero\"\n              stroke=\"none\"\n              stroke-width=\"0.5\"\n              stroke-linecap=\"butt\"\n              stroke-linejoin=\"miter\"\n              stroke-miterlimit=\"10\"\n              stroke-dasharray=\"\"\n              stroke-dashoffset=\"0\"\n              style=\"mix-blend-mode: normal;\"\n          >\n            <image\n                width=\"").concat(originalDim.width, "\"\n                height=\"").concat(originalDim.height, "\"\n\t\t\t\ttransform=\"scale(").concat(dim.width / originalDim.width, ",").concat(dim.height / originalDim.height, ")\"\n                xlink:href=\"").concat(blob, "\"\n            />\n          </g>\n        </g>\n      </svg>")], "".concat(file.name.replace(/(.*)\..*/, "$1"), ".svg"), {
        type: "image/svg+xml"
      }));
    }
    (el = document.getElementById(iD).nextElementSibling.querySelector("input")).files = new FileList(processed); //Convert processed image array to a FileList, which is not normally constructible.

    el.dispatchEvent(new e.constructor(e.type, e)); //Start a new, duplicate, event, but allow scratch to receive it this time.
  }

  function FileList() {
    let arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    //File list constructor. Does not need the `new` keyword, but it is easier to read
    let filelist = new DataTransfer(); //This "creates" a FileList that we can add files to
    for (let file of arr) {
      filelist.items.add(file);
    }
    return filelist.files; //Completed FileList
  }
});
// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/better-img-uploads/style.css
var style = __webpack_require__(1907);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/better-img-uploads/icon.svg
/* harmony default export */ var icon = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY0MCI+PGRlZnM+PHBhdGggZD0iTTAgMGg2NDN2NjQzSDBWMHoiIGlkPSJhIi8+PHBhdGggZD0ibTUyMC41NyAzMzkuMjggMS4zNS4xOSAxLjMzLjI0IDEuMzEuMjkgMS4zLjM0IDEuMjYuMzggMS4yNS40NCAxLjIyLjQ4IDEuMi41MyAxLjE3LjU3IDEuMTQuNjEgMS4xMi42NiAxLjA4LjY5IDEuMDYuNzQgMS4wMi43OC45OS44Mi45Ni44NS45My44OS44OS45Mi44NS45Ni44Mi45OS43NyAxLjAzLjc0IDEuMDUuNyAxLjA5LjY2IDEuMTEuNjEgMS4xNS41NyAxLjE3LjUzIDEuMTkuNDggMS4yMy40MyAxLjI0LjM5IDEuMjcuMzQgMS4yOS4yOSAxLjMxLjI0IDEuMzQuMTkgMS4zNS4xMyAxLjM3LjA4IDEuMzkuMDMgMS40djczLjlsLS4wOSA0LjI1LS4yNSA0LjItLjQyIDQuMTYtLjU5IDQuMTEtLjc0IDQuMDYtLjkgNC0xLjA2IDMuOTUtMS4yIDMuODgtMS4zNSAzLjgxLTEuNSAzLjc1LTEuNjMgMy42Ny0xLjc3IDMuNi0xLjkgMy41Mi0yLjA0IDMuNDMtMi4xNiAzLjM1LTIuMjggMy4yNi0yLjQgMy4xNi0yLjUyIDMuMDctMi42MyAyLjk3LTIuNzUgMi44Ny0yLjg1IDIuNzYtMi45NSAyLjY1LTMuMDUgMi41My0zLjE1IDIuNDItMy4yNCAyLjMtMy4zNCAyLjE4LTMuNDIgMi4wNC0zLjUgMS45Mi0zLjU4IDEuNzktMy42NiAxLjY0LTMuNzQgMS41MS0zLjggMS4zNi0zLjg3IDEuMjEtMy45NCAxLjA3LTMuOTkuOTEtNC4wNS43NS00LjExLjU5LTQuMTUuNDMtNC4yLjI1LTQuMjUuMDlIMTkzLjQ3bC00LjI4LS4wOS00LjI0LS4yNS00LjE4LS40My00LjEzLS41OS00LjA4LS43NS00LjAyLS45MS0zLjk2LTEuMDctMy44OS0xLjIxLTMuODItMS4zNi0zLjc2LTEuNTEtMy42OC0xLjY0LTMuNi0xLjc5LTMuNTEtMS45Mi0zLjQ0LTIuMDQtMy4zNS0yLjE4LTMuMjUtMi4zLTMuMTYtMi40Mi0zLjA3LTIuNTMtMi45Ni0yLjY1LTIuODYtMi43Ni0yLjc1LTIuODctMi42NC0yLjk3LTIuNTItMy4wNy0yLjQxLTMuMTYtMi4yOS0zLjI2LTIuMTYtMy4zNS0yLjA0LTMuNDMtMS45MS0zLjUyLTEuNzctMy42LTEuNjQtMy42Ny0xLjQ5LTMuNzUtMS4zNS0zLjgxLTEuMjEtMy44OC0xLjA1LTMuOTUtLjkxLTQtLjc0LTQuMDYtLjU5LTQuMTEtLjQyLTQuMTYtLjI1LTQuMi0uMDktNC4yNXYtNzMuOWwuMDMtMS40LjA4LTEuMzkuMTQtMS4zNy4xOS0xLjM1LjI1LTEuMzQuMy0xLjMxLjM0LTEuMjkuNC0xLjI3LjQ1LTEuMjQuNDktMS4yMy41My0xLjE5LjU5LTEuMTcuNjItMS4xNS42Ny0xLjExLjcxLTEuMDkuNzUtMS4wNS43OC0xLjAzLjgzLS45OS44Ni0uOTYuOS0uOTIuOTMtLjg5Ljk3LS44NSAxLS44MiAxLjAyLS43OCAxLjA2LS43NCAxLjA5LS42OSAxLjEyLS42NiAxLjE0LS42MSAxLjE3LS41NyAxLjE5LS41MyAxLjIxLS40OCAxLjI0LS40NCAxLjI1LS4zOCAxLjI4LS4zNCAxLjMtLjI5IDEuMzEtLjI0IDEuMzMtLjE5IDEuMzQtLjEzIDEuMzYtLjA5IDEuMzctLjAyIDEuMzcuMDIgMS4zNi4wOSAxLjM1LjEzIDEuMzMuMTkgMS4zMS4yNCAxLjI5LjI5IDEuMjguMzQgMS4yNi4zOCAxLjIzLjQ0IDEuMjIuNDggMS4xOS41MyAxLjE3LjU3IDEuMTQuNjEgMS4xMS42NiAxLjA5LjY5IDEuMDYuNzQgMS4wMy43OCAxIC44Mi45Ni44NS45NC44OS44OS45Mi44Ny45Ni44Mi45OS43OSAxLjAzLjc1IDEuMDUuNzEgMS4wOS42NyAxLjExLjYyIDEuMTUuNTggMS4xNy41NCAxLjE5LjQ5IDEuMjMuNDUgMS4yNC4zOSAxLjI3LjM1IDEuMjkuMyAxLjMxLjI0IDEuMzQuMTkgMS4zNS4xNCAxLjM3LjA5IDEuMzkuMDMgMS40djczLjlsLjAzIDEuNDguMDkgMS40NS4xNCAxLjQ1LjIxIDEuNDMuMjYgMS40MS4zMSAxLjQuMzcgMS4zNy40MiAxLjM1LjQ4IDEuMzQuNTIgMS4zMS41NyAxLjI4LjYyIDEuMjYuNjcgMS4yMy43MSAxLjIxLjc2IDEuMTcuOCAxLjE1Ljg1IDEuMTEuODggMS4wOC45MiAxLjA1Ljk3IDEgMSAuOTggMS4wNC45MyAxLjA3LjkgMS4xMS44NSAxLjE0LjgxIDEuMTcuNzcgMS4yMS43MiAxLjIzLjY4IDEuMjYuNjMgMS4yOS41OSAxLjMyLjUzIDEuMzQuNDggMS4zNy40MyAxLjM5LjM4IDEuNDEuMzIgMS40My4yNyAxLjQ1LjIxIDEuNDcuMTUgMS40OS4wOSAxLjUxLjAzaDI1My41MWwxLjQ3LS4wMyAxLjQ2LS4wOSAxLjQ0LS4xNSAxLjQyLS4yMSAxLjQxLS4yNyAxLjM5LS4zMiAxLjM2LS4zOCAxLjM1LS40MyAxLjMyLS40OCAxLjI5LS41MyAxLjI4LS41OSAxLjI0LS42MyAxLjIyLS42OCAxLjE5LS43MiAxLjE2LS43NyAxLjEzLS44MSAxLjA5LS44NSAxLjA3LS45IDEuMDMtLjkzLjk5LS45OC45NS0xIC45Mi0xLjA1Ljg4LTEuMDguODQtMS4xMS43OS0xLjE1Ljc2LTEuMTcuNzEtMS4yMS42Ni0xLjIzLjYyLTEuMjYuNTctMS4yOC41Mi0xLjMxLjQ3LTEuMzQuNDItMS4zNS4zNy0xLjM3LjMxLTEuNC4yNi0xLjQxLjIxLTEuNDMuMTQtMS40NS4wOS0xLjQ1LjAzLTEuNDh2LTczLjlsLjAzLTEuNC4wOS0xLjM5LjE0LTEuMzcuMTktMS4zNS4yNC0xLjM0LjMtMS4zMS4zNS0xLjI5LjM5LTEuMjcuNDUtMS4yNC40OS0xLjIzLjU0LTEuMTkuNTgtMS4xNy42Mi0xLjE1LjY3LTEuMTEuNzEtMS4wOS43NS0xLjA1Ljc5LTEuMDMuODItLjk5Ljg3LS45Ni44OS0uOTIuOTQtLjg5Ljk2LS44NSAxLS44MiAxLjAzLS43OCAxLjA2LS43NCAxLjA5LS42OSAxLjExLS42NiAxLjE0LS42MSAxLjE3LS41NyAxLjE5LS41MyAxLjIyLS40OCAxLjIzLS40NCAxLjI2LS4zOCAxLjI4LS4zNCAxLjI5LS4yOSAxLjMxLS4yNCAxLjMzLS4xOSAxLjM1LS4xMyAxLjM2LS4wOSAxLjM3LS4wMiAxLjQuMDIgMS4zOS4wOSAxLjM3LjEzem0tMTI2LjQ2LTY0LjM2LjUxLjAxLjUxLjAxLjUxLjAxLjUxLjAxLjUxLjAxLjUxLjAyLjUxLjAyLjUxLjAyLjUxLjAyLjUxLjAyLjUxLjAzLjUxLjAyLjUxLjAzLjUxLjAzLjUxLjAzLjUxLjA0LjUxLjAzLjUxLjA0LjUxLjA0LjUxLjA0LjUxLjA0LjUxLjA1LjUuMDQuNTEuMDUuNTEuMDUuNTEuMDUuNTEuMDYuNS4wNS41MS4wNi41MS4wNi41MS4wNi41LjA2LjUxLjA3LjUxLjA3LjUuMDYuNTEuMDcuNDEuMDYuNDEuMDYuNDEuMDYuNDEuMDcuNDEuMDYuNDEuMDcuNDEuMDcuNDEuMDcuNDEuMDcuNDEuMDcuNDEuMDcuNC4wOC40MS4wNy40MS4wOC40MS4wOC40LjA4LjQxLjA5LjQxLjA4LjQuMDkuNDEuMDguNC4wOS40MS4wOS40LjEuNDEuMDkuNC4wOS40MS4xLjQuMS40LjEuNDEuMS40LjEuNC4xMS40LjEuNC4xMS40LjExLjQuMTEuNC4xMS40LjExLjQuMTEuNC4xMi40LjEyLjQ5LjE0LjQ5LjE1LjQ5LjE1LjQ5LjE2LjQ5LjE2LjQ4LjE2LjQ5LjE2LjQ4LjE3LjQ4LjE3LjQ5LjE4LjQ4LjE3LjQ3LjE4LjQ4LjE4LjQ4LjE5LjQ3LjE5LjQ4LjE5LjQ3LjIuNDcuMTkuNDcuMjEuNDcuMi40Ny4yMS40Ny4yMS40Ni4yMS40Ny4yMi40Ni4yMi40Ni4yMi40Ni4yMi40Ni4yMy40NS4yMy40Ni4yNC40NS4yMy40NS4yNC40Ni4yNS40NC4yNC40NS4yNS40NS4yNS40NC4yNi40NS4yNS40NC4yNi40NC4yNy4yNS4xNS4yNS4xNS4yNS4xNi4yNS4xNS4yNS4xNi4yNC4xNi4yNS4xNi4yNC4xNi4yNS4xNi4yNC4xNi4yNS4xNy4yNC4xNi4yNC4xNy4yNS4xNi4yNC4xNy4yNC4xNy4yNC4xNy4yNC4xNy4yMy4xNy4yNC4xNy4yNC4xOC4yMy4xNy4yNC4xOC4yMy4xNy4yNC4xOC4yMy4xOC4yMy4xOC4yNC4xOC4yMy4xOC4yMy4xOC4yMy4xOC4yMi4xOS4yMy4xOC4yMy4xOS4yMi4xOS4yMy4xOS4yMi4xOC4yMy4yLjIyLjE5LjIyLjE5LjUyLjQ2LjUyLjQ2LjUxLjQ3LjUuNDguNS40OC41LjQ4LjQ4LjQ5LjQ5LjQ5LjQ4LjUuNDcuNTEuNDcuNS40Ni41Mi40Ni41Mi40NS41Mi40NC41Mi40NC41NC40NC41My40My41NC40Mi41NS40Mi41NS40MS41NS40MS41Ni40LjU2LjQuNTYuMzkuNTcuMzguNTguMzguNTcuMzcuNTkuMzcuNTguMzYuNTkuMzUuNi4zNS41OS4zNC42LjMzLjYxLjMzLjYxLjMzLjYxLjMxLjYxLjMyLjYyLjMuNjMuMy42Mi4wNC4xLjA1LjA5LjA0LjA5LjA1LjEuMDQuMDkuMDUuMS4wNC4wOS4wNC4wOS4wNS4xLjA0LjA5LjA1LjEuMDQuMDkuMDQuMS4wNS4wOS4wNC4wOS4wNC4xLjA0LjA5LjA1LjEuMDQuMDkuMDQuMS4wNS4wOS4wNC4xLjA0LjA5LjA0LjEuMDQuMDkuMDUuMS4wNC4wOS4wNC4xLjA0LjA5LjA0LjEuMDQuMS4wNC4wOS4wNC4xLjA1LjA5LjA0LjEuMDQuMDkuMDQuMS4wNC4wOS4wNC4xLjA0LjEuMTcuNDIuMTcuNDIuMTYuNDMuMTcuNDIuMTYuNDMuMTYuNDMuMTYuNDIuMTUuNDMuMTUuNDMuMTUuNDMuMTUuNDMuMTUuNDQuMTQuNDMuMTQuNDMuMTQuNDQuMTMuNDMuMTMuNDQuMTMuNDMuMTMuNDQuMTMuNDQuMTIuNDQuMTIuNDQuMTIuNDQuMTEuNDQuMTEuNDQuMTEuNDQuMTEuNDUuMTEuNDQuMS40NC4xLjQ1LjEuNDQuMDkuNDUuMS40NC4wOC40NS4wOS40NS4wOS40NS4wOC40NS4wOC40NC4wOC40NS4wNy40NS4xMS42Ny4xMS42Ny4xLjY2LjA5LjY2LjA5LjY1LjA4LjY1LjA4LjY1LjA3LjY0LjA2LjYzLjA3LjYyLjA2LjYyLjA1LjYxLjA1LjYuMDUuNTkuMDQuNTguMDQuNTcuMDMuNTYuMDQuNTQuMDMuNTQuMDIuNTIuMDMuNTEuMDIuNS4wMi40OC4wMi40Ny4wMS40NS4wMi40My4wMS40Mi4wMS40MS4wMS4zOC4wMS4zNy4wMS4zNS4wMS4zMi4wMS4zMXYuMjlsLjAxLjI3LjAxLjI1LjAxLjIyLjAxLjIxLjAxLjE4LjAxLjE1djEuMzNsLS4wMS40NXYuNDRsLS4wMS40NC0uMDEuNDUtLjAxLjQ0LS4wMS40NC0uMDIuNDUtLjAxLjQ0LS4wMi40NC0uMDIuNDUtLjAyLjQ0LS4wMi40NC0uMDMuNDUtLjAyLjQ0LS4wMy40NC0uMDMuNDQtLjAzLjQ1LS4wMy40NC0uMDQuNDQtLjA0LjQ0LS4wMy40NC0uMDQuNDUtLjA0LjQ0LS4wNS40NC0uMDQuNDQtLjA1LjQ0LS4wNC40NC0uMDUuNDQtLjA2LjQ0LS4wNS40NC0uMDUuNDQtLjA2LjQ0LS4wNi40NC0uMDYuNDQtLjA2LjQ0LS4wNi40NC0uMDcuNDQtLjExLjcyLS4xMi43MS0uMTIuNy0uMTMuNjktLjEzLjY3LS4xMy42Ni0uMTMuNjQtLjE0LjY0LS4xNC42Mi0uMTQuNjEtLjE1LjU5LS4xNC41OC0uMTUuNTYtLjE0LjU2LS4xNS41My0uMTQuNTMtLjE1LjUxLS4xNC40OS0uMTUuNDgtLjE0LjQ3LS4xNC40NS0uMTMuNDQtLjE0LjQyLS4xMy40LS4xMy4zOS0uMTIuMzgtLjEyLjM2LS4xMi4zNC0uMTEuMzMtLjExLjMxLS4xLjI5LS4xLjI4LS4wOS4yNi0uMDguMjUtLjA4LjIzLS4wNy4yMS0uMDYuMi0uMDYuMTctLjA1LjE2LS4wNC4xNS0uMDMuMDgtLjAxLjAyLS4wMy4wOC0uMDIuMDYtLjAxLjA0LS4wMy4wNS0uMDIuMDctLjAyLjA0LS4wMi4wNi0uMDEuMDMtLjIxLjUxLS4yLjUxLS4yMS41LS4yMi41MS0uMjEuNS0uMjMuNS0uMjIuNS0uMjMuNS0uMjMuNDktLjI0LjUtLjI0LjQ5LS4yNS40OS0uMjQuNDgtLjI2LjQ5LS4yNS40OC0uMjYuNDktLjI2LjQ4LS4yNy40Ny0uMjcuNDgtLjI3LjQ3LS4yOC40Ny0uMjguNDctLjI5LjQ3LS4yOS40Ni0uMjkuNDctLjI5LjQ2LS4zLjQ1LS4zLjQ2LS4zMS40NS0uMzEuNDUtLjMxLjQ1LS4zMi40NS0uMzIuNDQtLjMyLjQ1LS4zMy40My0uMzMuNDQtLjM0LjQ0LS4zMy40My0uMzUuNDMtLjM0LjQyLS4xNS4xOS0uMTYuMTktLjE2LjE4LS4xNS4xOS0uMTYuMTgtLjE2LjE5LS4xNi4xOC0uMTYuMTktLjE2LjE4LS4xNi4xOC0uMTYuMTgtLjE2LjE4LS4xNi4xOC0uMTcuMTgtLjE2LjE4LS4xNy4xOC0uMTYuMTgtLjE3LjE3LS4xNy4xOC0uMTYuMTgtLjE3LjE3LS4xNy4xOC0uMTcuMTctLjE3LjE3LS4xNy4xOC0uMTcuMTctLjE3LjE3LS4xOC4xNy0uMTcuMTctLjE3LjE3LS4xOC4xNy0uMTcuMTctLjE4LjE2LS4xOC4xNy0uMTcuMTctLjE4LjE2LS4xOC4xNy0uMTguMTYtLjE4LjE2LS4xOC4xNy0uNS40NC0uNS40NC0uNTEuNDMtLjUxLjQzLS41Mi40Mi0uNTIuNDItLjUyLjQxLS41My40MS0uNTMuNC0uNTMuNC0uNTQuMzktLjU0LjM5LS41NC4zOC0uNTUuMzgtLjU1LjM4LS41NS4zNy0uNTYuMzYtLjU2LjM2LS41Ni4zNS0uNTcuMzUtLjU3LjM0LS41Ny4zNC0uNTguMzMtLjU4LjMzLS41OC4zMi0uNTguMzItLjU5LjMxLS41OS4zMS0uNTkuMy0uNi4yOS0uNi4yOS0uNi4yOS0uNjEuMjgtLjYuMjctLjYxLjI3LS42Mi4yNy0uNjEuMjUtLjYyLjI2LS42Mi4yNC0uNjIuMjQtLjEyLjA1LS4xMi4wNS0uMTIuMDQtLjEzLjA1LS4xMi4wNS0uMTIuMDQtLjEyLjA1LS4xMi4wNC0uMTIuMDUtLjEzLjA1LS4xMi4wNC0uMTIuMDUtLjEyLjA0LS4xMi4wNS0uMTIuMDQtLjEzLjA1LS4xMi4wNC0uMTIuMDQtLjEyLjA1LS4xMy4wNC0uMTIuMDQtLjEyLjA1LS4xMi4wNC0uMTMuMDQtLjEyLjA1LS4xMi4wNC0uMTMuMDQtLjEyLjA0LS4xMi4wNS0uMTIuMDQtLjEzLjA0LS4xMi4wNC0uMTIuMDQtLjEzLjA0LS4xMi4wNC0uMTIuMDQtLjEzLjA0LS4xMi4wNS0uMTIuMDQtLjEzLjA0LS41NC4xNy0uNTQuMTYtLjU1LjE3LS41NC4xNi0uNTUuMTYtLjU0LjE2LS41NS4xNS0uNTQuMTUtLjU1LjE1LS41NS4xNC0uNTUuMTQtLjU1LjE0LS41NS4xNC0uNTUuMTMtLjU2LjEzLS41NS4xMi0uNTUuMTMtLjU2LjEyLS41NS4xMi0uNTYuMTEtLjU1LjExLS41Ni4xMS0uNTYuMTEtLjU1LjEtLjU2LjEtLjU2LjEtLjU2LjA5LS41Ni4wOS0uNTYuMDktLjU2LjA5LS41Ni4wOC0uNTYuMDgtLjU3LjA4LS41Ni4wNy0uNTYuMDctLjU3LjA3LS41Ni4wNi0uNTYuMDYtLjU3LjA2LS41Ni4wNi0uMzMuMDMtLjMzLjAzLS4zMy4wMy0uMzMuMDMtLjMzLjAzLS4zMy4wMy0uMzMuMDItLjMzLjAzLS4zMy4wMi0uMzMuMDMtLjMzLjAyLS4zMy4wMy0uMzMuMDItLjMzLjAyLS4zMy4wMi0uMzMuMDItLjMzLjAyLS4zMy4wMi0uMzMuMDEtLjMzLjAyLS4zMy4wMi0uMzQuMDEtLjMzLjAxLS4zMy4wMi0uMzMuMDEtLjMzLjAxLS4zMy4wMS0uMzMuMDEtLjMzLjAxLS4zMy4wMS0uMzMuMDFoLS4zM2wtLjMzLjAxaC0uMzNsLS4zNC4wMWgtMy4wN2wtLjI4LS4wMWgtLjU1bC0uMjgtLjAxaC0uMjdsLS4yNy0uMDFoLS4yN2wtLjI3LS4wMWgtLjI2bC0uMjYtLjAxLS4yNS0uMDFoLS4yNWwtLjI1LS4wMS0uMjQtLjAxaC0uMjNsLS4yMy0uMDEtLjIyLS4wMWgtLjIybC0uMjEtLjAxLS4yMS0uMDFoLS4ybC0uMTktLjAxLS4xOC0uMDFoLS4xN2wtLjE3LS4wMWgtLjE2bC0uMTUtLjAxaC0uMTRsLS4xMy0uMDFoLS4xMmwtLjExLS4wMWgtLjI4bC0uMDctLjAxaC0uMTVsLS4xMi0uMDFoLS4wOGwtLjEyLS4wMWgtLjJsLS4wNy0uMDFoLS4xMmwtLjA4LS4wMWgtLjEybC0uMTItLjAxaC0uMTlsLS4wOC0uMDFoLS4xMmwtLjI1LS4wMi0uMjUtLjAxLS4yNC0uMDEtLjI1LS4wMS0uMjUtLjAyLS4yNS0uMDEtLjI0LS4wMS0uMjUtLjAyLS4yNS0uMDEtLjI0LS4wMi0uMjUtLjAyLS4yNS0uMDEtLjI1LS4wMi0uMjQtLjAyLS4yNS0uMDEtLjI1LS4wMi0uMjQtLjAyLS4yNS0uMDItLjI1LS4wMi0uMjQtLjAyLS4yNS0uMDItLjI1LS4wMi0uMjQtLjAyLS4yNS0uMDItLjI1LS4wMy0uMjQtLjAyLS4yNS0uMDItLjI1LS4wMi0uMjQtLjAzLS4yNS0uMDItLjI1LS4wMy0uMjQtLjAyLS4yNS0uMDMtLjI1LS4wMi0uMjQtLjAzLS4yNS0uMDMtLjI0LS4wMi0uMjUtLjAzLS4yNS0uMDMtLjI0LS4wM2gtLjA1bC0uMDUtLjAxLS4wOS0uMDEtLjA1LS4wMS0uMDktLjAxaC0uMDVsLS4xLS4wMS0uMDQtLjAxLS4xLS4wMS0uMDQtLjAxLS4xLS4wMWgtLjA1bC0uMDktLjAxLS4wNS0uMDEtLjA0LS4wMWgtLjA1bC0uMS0uMDEtLjA0LS4wMS0uMS0uMDEtLjA1LS4wMS0uMDktLjAxaC0uMDVsLS4wOS0uMDJoLS4wNWwtLjA5LS4wMS0uMDUtLjAxLS4wOS0uMDEtLjA1LS4wMS0uNDYtLjA2LS40NC0uMDYtLjQ1LS4wNS0uNDQtLjA3LS40My0uMDYtLjQzLS4wNi0uNDItLjA2LS40MS0uMDYtLjQxLS4wNi0uNC0uMDYtLjQtLjA2LS4zOS0uMDYtLjM4LS4wNi0uMzctLjA2LS4zNy0uMDYtLjM1LS4wNi0uMzUtLjA2LS4zNC0uMDUtLjM0LS4wNi0uMzItLjA1LS4zMS0uMDYtLjMxLS4wNS0uMjktLjA1LS4yOS0uMDUtLjI3LS4wNS0uMjctLjA1LS4yNS0uMDQtLjI1LS4wNS0uMjMtLjA0LS4yMi0uMDQtLjIxLS4wNC0uMi0uMDMtLjE5LS4wNC0uMTgtLjAzLS4xNi0uMDMtLjE1LS4wMy0uMTQtLjAyLS4xMi0uMDItLjExLS4wMi0uMS0uMDItLjItLjAzLS4yLS4wNC0uMi0uMDQtLjItLjA0LS4yLS4wNC0uMjEtLjA1LS4yLS4wNC0uMi0uMDQtLjItLjA0LS4yLS4wNS0uMi0uMDQtLjE5LS4wNS0uMi0uMDQtLjItLjA1LS4yLS4wNS0uMi0uMDUtLjItLjA0LS4yLS4wNS0uMi0uMDUtLjItLjA1LS4xOS0uMDUtLjItLjA2LS4yLS4wNS0uMi0uMDUtLjE5LS4wNS0uMi0uMDYtLjItLjA1LS4yLS4wNi0uMTktLjA2LS4yLS4wNS0uMi0uMDYtLjE5LS4wNi0uMi0uMDYtLjE5LS4wNS0uMi0uMDYtLjItLjA2LS4xOS0uMDctLjItLjA2LS4xOS0uMDYtLjItLjA2LS4wOC0uMDMtLjA4LS4wMy0uMDktLjAzLS4wOC0uMDItLjA4LS4wMy0uMDktLjAzLS4wOC0uMDMtLjA5LS4wMy0uMDgtLjAzLS4wOC0uMDItLjA5LS4wMy0uMDgtLjAzLS4wOC0uMDMtLjA5LS4wMy0uMDgtLjAzLS4wOC0uMDMtLjA5LS4wMy0uMDgtLjAzLS4wOC0uMDMtLjA4LS4wMy0uMDktLjAzLS4wOC0uMDMtLjA4LS4wMy0uMDktLjAzLS4wOC0uMDMtLjA4LS4wMy0uMDgtLjAzLS4wOS0uMDMtLjA4LS4wMy0uMDgtLjA0LS4wOC0uMDMtLjA5LS4wMy0uMDgtLjAzLS4wOC0uMDMtLjA4LS4wMy0uMDktLjA0LS4wOC0uMDMtLjA4LS4wMy0uMDgtLjAzLS4wOC0uMDQtLjE5LS4wNi0uMTgtLjA3LS4xOC0uMDctLjE4LS4wNy0uMTgtLjA4LS4xNy0uMDctLjE4LS4wOC0uMTgtLjA3LS4xOC0uMDgtLjE3LS4wOC0uMTgtLjA4LS4xNy0uMDgtLjE4LS4wOC0uMTctLjA4LS4xOC0uMDktLjE3LS4wOC0uMTctLjA5LS4xNy0uMDktLjE4LS4wOS0uMTctLjA5LS4xNy0uMDktLjE3LS4wOS0uMTYtLjA5LS4xNy0uMS0uMTctLjEtLjE3LS4wOS0uMTYtLjEtLjE3LS4xLS4xNi0uMS0uMTctLjEtLjE2LS4xMS0uMTYtLjEtLjE2LS4xMS0uMTctLjEtLjE2LS4xMS0uMTYtLjExLS4xNS0uMTEtLjE2LS4xMS0uMTYtLjExLS4xNi0uMTEtLjUzLS40Mi0uNTEtLjQyLS40Ny0uNDMtLjQ1LS40My0uNDItLjQ1LS40LS40NC0uMzctLjQ2LS4zNS0uNDUtLjMzLS40Ni0uMzEtLjQ2LS4yOC0uNDctLjI2LS40Ni0uMjUtLjQ2LS4yMi0uNDYtLjIxLS40Ni0uMTktLjQ1LS4xOC0uNDUtLjE2LS40NS0uMTUtLjQ0LS4xMy0uNDMtLjEyLS40My0uMTEtLjQyLS4xLS40MS0uMDktLjQtLjA4LS4zOC0uMDctLjM4LS4wNy0uMzctLjA2LS4zNS0uMDUtLjMzLS4wNS0uMzItLjA1LS4zMS0uMDQtLjI5LS4wNC0uMjctLjA1LS4yNS0uMDQtLjI0LS4wNC0uMjEtLjA0LS4xOS0uMDUtLjE3LS4wNS0uMTUtLjA1LS4xMlYyOTMuNTNsLjAxLS4wOHYtLjE3bC4wMS0uMDh2LS4xN2wuMDEtLjA5di0uMDhsLjAxLS4wOS4wMS0uMDh2LS4wOWwuMDEtLjA4LjAxLS4wOS4wMS0uMDguMDEtLjA4di0uMDlsLjAxLS4wOC4wMS0uMDkuMDEtLjA4LjAyLS4wOC4wMS0uMDkuMDEtLjA4LjAxLS4wOS4wMS0uMDguMDItLjA4LjAxLS4wOS4wMS0uMDguMDItLjA4LjAxLS4wOS4wMi0uMDguMDEtLjA5LjAyLS4wOC4wMi0uMDguMDItLjA4LjAzLS4xNi4wNC0uMTYuMDQtLjE1LjA0LS4xNS4wNC0uMTUuMDQtLjE0LjA1LS4xNC4wNC0uMTQuMDUtLjEzLjA1LS4xMy4wNC0uMTIuMDUtLjEyLjA1LS4xMi4wNS0uMTIuMDUtLjExLjA1LS4xMS4wNS0uMTEuMDQtLjEuMDUtLjEuMDUtLjA5LjA1LS4wOS4wNC0uMDkuMDUtLjA5LjA0LS4wOC4wNS0uMDguMDQtLjA3LjA0LS4wOC4wNC0uMDcuMDQtLjA2LjA0LS4wNi4wMy0uMDYuMDMtLjA2LjAzLS4wNS4wMy0uMDUuMDMtLjA1LjAyLS4wNC4wMy0uMDQuMDEtLjA0LjAyLS4wMy4wMS0uMDMuMDMtLjAzLjAyLS4wNC4wMy0uMDMuMDItLjAzLjAyLS4wNC4wMy0uMDMuMDItLjAzLjAzLS4wNC4wMi0uMDMuMDMtLjAzLjAyLS4wNC4wMy0uMDMuMDItLjAzLjAzLS4wMy4wMi0uMDQuMDMtLjAzLjAzLS4wMy4wMi0uMDMuMDMtLjAzLjAyLS4wNC4wMy0uMDMuMDMtLjAzLjAyLS4wMy4wMy0uMDMuMDMtLjAzLjAzLS4wNC4wMi0uMDMuMDMtLjAzLjAzLS4wMy4wMy0uMDMuMDItLjAzLjAzLS4wMy4wMy0uMDMuMDMtLjAzLjAzLS4wMy4wMy0uMDMuMDItLjAzLjAzLS4wMy4wMy0uMDMuMDMtLjAzLjIxLS4yLjItLjE5LjIxLS4xOS4yMi0uMTguMjEtLjE4LjIyLS4xNy4yMi0uMTcuMjItLjE3LjIyLS4xNi4yMy0uMTUuMjItLjE1LjIyLS4xNS4yMy0uMTQuMjItLjEzLjIyLS4xMy4yMS0uMTMuMjItLjEyLjIxLS4xMi4yMS0uMTEuMjEtLjExLjItLjExLjItLjEuMi0uMS4xOS0uMDkuMTgtLjA5LjE4LS4wOC4xNy0uMDguMTctLjA4LjE2LS4wNy4xNS0uMDcuMTUtLjA3LjE0LS4wNi4xMi0uMDYuMTItLjA1LjEyLS4wNi4xLS4wNC4wOS0uMDUuMDgtLjA0LjA3LS4wNC4wNi0uMDMuMDUtLjAyLjAyLS4wMS4wNS0uMDIuMDUtLjAyLjAyLS4wMS4wNS0uMDEuMDUtLjAyLjAyLS4wMS4wNS0uMDIuMDUtLjAyLjAyLS4wMS4wNS0uMDEuMDUtLjAyLjA1LS4wMi4wMi0uMDEuMDUtLjAyLjA1LS4wMS4wMi0uMDEuMDUtLjAyLjA1LS4wMi4wMi0uMDEuMDUtLjAxLjA1LS4wMi4wMi0uMDEuNTMtLjE3LjUzLS4xNi41My0uMTcuNTMtLjE2LjUzLS4xNS41My0uMTYuNTMtLjE1LjUzLS4xNS41My0uMTUuNTQtLjE0LjUzLS4xNC41NC0uMTQuNTMtLjE0LjU0LS4xMy41NC0uMTMuNTMtLjEzLjU0LS4xMi41NC0uMTIuNTQtLjEyLjU0LS4xMi41NC0uMTEuNTQtLjExLjU1LS4xMS41NC0uMS41NC0uMTEuNTQtLjEuNTUtLjA5LjU0LS4xLjU1LS4wOS41NC0uMDkuNTUtLjA4LjU1LS4wOC41NC0uMDguNTUtLjA4LjU1LS4wOC41NS0uMDcuNTUtLjA3LjU1LS4wNi41NC0uMDYuNTUtLjA2LjA1LS4wMS4wNS0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNC0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNC0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA0bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA0bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA5bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNC0uMDFoLjA1bC4wNS0uMDFoLjA1bC4wNS0uMDFoLjA1bC44Ni0uMDguODQtLjA4LjgzLS4wNy44MS0uMDYuNzktLjA3Ljc4LS4wNi43Ni0uMDUuNzUtLjA2LjcyLS4wNS43Mi0uMDQuNjktLjA1LjY4LS4wNC42NS0uMDQuNjUtLjAzLjYyLS4wMy42MS0uMDMuNTktLjAzLjU3LS4wMy41NS0uMDIuNTQtLjAyLjUyLS4wMi41LS4wMi40OC0uMDIuNDctLjAxLjQ1LS4wMi40My0uMDEuNDEtLjAxLjM5LS4wMS4zNy0uMDEuMzYtLjAxLjMzLS4wMS4zMi0uMDEuMy0uMDFoLjI4bC4yNy0uMDEuMjQtLjAxLjIyLS4wMWguMjFsLjE4LS4wMS4xNy0uMDFoMy4zNnptLTExNi4xNyAxLjU1aC40N2wuMTYuMDFoLjMybC4xNi4wMWguMTZsLjE2LjAxaC4xNmwuMTYuMDFoLjE2bC4xNS4wMS4xNi4wMWguMTZsLjE2LjAxLjE2LjAxLjE2LjAxLjE2LjAxLjE2LjAxLjE2LjAxLjE2LjAxLjE1LjAxLjE2LjAxLjE2LjAxLjE2LjAyLjE2LjAxLjE2LjAxLjE2LjAyLjE1LjAxLjE2LjAyLjE2LjAxLjE2LjAyLjE2LjAxLjE2LjAyLjE2LjAxLjUuMDYuNDguMDcuNDcuMDcuNDYuMDcuNDUuMDguNDMuMDguNDIuMDkuNC4wOS40LjA5LjM4LjA5LjM2LjEuMzYuMS4zNC4xLjMzLjEuMzIuMS4zMS4xMS4zLjEuMjguMS4yOC4xMS4yNi4xLjI1LjEuMjQuMS4yMy4xLjIzLjEuMjEuMS4yLjA5LjE5LjA5LjE5LjA5LjE3LjA4LjE2LjA5LjE2LjA3LjE1LjA4LjE0LjA2LjEzLjA3LjEyLjA2LjExLjA1LjExLjA1LjEuMDQuMDkuMDMuMDguMDMuMDQuMDIuMDQuMDMuMDQuMDIuMDQuMDMuMDMuMDIuMDQuMDIuMDQuMDMuMDQuMDIuMDMuMDMuMDQuMDIuMDQuMDMuMDMuMDIuMDQuMDMuMDQuMDIuMDQuMDMuMDMuMDIuMDQuMDMuMDQuMDIuMDMuMDMuMDQuMDMuMDQuMDIuMDMuMDMuMDQuMDMuMDMuMDIuMDQuMDMuMDQuMDIuMDMuMDMuMDQuMDMuMDMuMDMuMDQuMDIuMDMuMDMuMDQuMDMuMDMuMDIuMDQuMDMuMDQuMDMuMDMuMDMuMDQuMDMuMDMuMDIuMDQuMDMuMDMuMDMuMjguMjQuMjcuMjQuMjcuMjYuMjYuMjcuMjUuMjguMjUuMjkuMjQuMjkuMjMuMzEuMjIuMzIuMjIuMzMuMjEuMzMuMi4zNS4yLjM2LjE4LjM3LjE5LjM4LjE3LjM4LjE3LjQuMTYuNDEuMTUuNDIuMTQuNDMuMTQuNDMuMTMuNDUuMTMuNDYuMTIuNDcuMTEuNDguMS40OC4xLjUuMDguNTEuMDkuNTIuMDcuNTMuMDcuNTMuMDYuNTUuMDUuNTYuMDUuNTcuMDQuNTguMDMuNTguMDIuNi4wMi42MS4wMS42Mi4wMS42M3YxMzcuMjVsLS4xNy4wNS0uMTcuMDQtLjE3LjA0LS4xOC4wNS0uMTguMDQtLjE4LjA0LS4xOC4wNC0uMTkuMDQtLjE5LjA0LS4xOS4wNC0uMTkuMDQtLjE5LjA0LS4xOS4wMy0uMTkuMDQtLjE4LjA0LS4xOS4wMy0uMTkuMDQtLjE4LjAzLS4xOS4wMy0uMTguMDMtLjE3LjAzLS4xOC4wMy0uMTcuMDMtLjE2LjAzLS4xNi4wMy0uMTYuMDItLjE1LjAzLS4xNS4wMi0uMTQuMDItLjEzLjAzLS4xMy4wMi0uMTIuMDItLjEyLjAxLS4xLjAyLS4xLjAyLS4wOS4wMS0uMDguMDEtLjA3LjAyLS4wNi4wMS0uMDUuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA2LjAxLS4wNy4wMWgtLjA2bC0uMDcuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA2LjAxLS4wNy4wMS0uMDYuMDEtLjA3LjAxLS4wNy4wMS0uMDYuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA3LjAxaC0uMDZsLS4wNy4wMS0uMDYuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDFoLS4wNmwtLjA3LjAxLS4wNy4wMS0uMDYuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA2LjAxaC0uMDdsLS4wNy4wMS0uMDYuMDEtLjQ1LjA2LS40NC4wNS0uNDMuMDUtLjQzLjA1LS40My4wNC0uNDIuMDUtLjQyLjA0LS40MS4wMy0uNDEuMDQtLjQuMDMtLjM5LjAzLS4zOS4wMy0uMzguMDItLjM3LjAzLS4zNy4wMi0uMzYuMDItLjM1LjAyLS4zNC4wMS0uMzMuMDItLjMzLjAxLS4zMi4wMS0uMy4wMS0uMy4wMS0uMjkuMDEtLjI4LjAxLS4yNy4wMS0uMjYuMDFoLS4yNGwtLjI0LjAxaC0uMjNsLS4yMS4wMWgtLjJsLS4xOS4wMWgtLjM0bC0uMTYuMDFIMjgxbC0uMTMuMDFoLS4xMWwtLjEuMDEtMS4wMS0uMDEtLjk3LS4wMi0uOTMtLjA0LS45LS4wNS0uODYtLjA2LS44My0uMDgtLjc5LS4wOS0uNzYtLjA5LS43My0uMTEtLjctLjExLS42Ny0uMTMtLjY0LS4xMy0uNjEtLjE0LS41OC0uMTQtLjU1LS4xNS0uNTMtLjE2LS41LS4xNS0uNDgtLjE3LS40NS0uMTYtLjQzLS4xNi0uNDEtLjE3LS4zOS0uMTctLjM3LS4xNi0uMzUtLjE3LS4zMi0uMTYtLjMyLS4xNi0uMjktLjE1LS4yOC0uMTYtLjI2LS4xNC0uMjUtLjE0LS4yMy0uMTQtLjIyLS4xMi0uMjEtLjEyLS4xOS0uMTEtLjE5LS4xLS4xOC0uMDktLjE2LS4wOC0uMTYtLjA3LS4xNS0uMDUtLjE1LS4wNS0uMTEtLjEtLjEtLjEtLjExLS4xLS4xMS0uMS0uMS0uMTEtLjEtLjEtLjEtLjExLS4xLS4xLS4xLS4xMS0uMS0uMTEtLjEtLjExLS4wOS0uMTItLjEtLjExLS4wOS0uMTEtLjA5LS4xMi0uMDktLjExLS4wOS0uMTItLjA4LS4xMi0uMDktLjEyLS4wOS0uMTItLjA4LS4xMi0uMDgtLjEyLS4wOC0uMTItLjA4LS4xMi0uMDgtLjEzLS4wNy0uMTItLjA4LS4xMy0uMDctLjEzLS4wNy0uMTItLjA3LS4xMy0uMDctLjEzLS4wNy0uMTMtLjA3LS4xMy0uMDYtLjE0LS4wNy0uMTMtLjA2LS4xMy0uMDYtLjE0LS4wNi0uMTMtLjA1LS4xNC0uMDYtLjEzLS4xMy0uMzItLjEyLS4zMS0uMTItLjMzLS4xMS0uMzItLjEtLjMzLS4xLS4zMy0uMS0uMzMtLjA4LS4zMy0uMDktLjMzLS4wNy0uMzMtLjA4LS4zMy0uMDctLjMzLS4wNi0uMzMtLjA2LS4zMy0uMDUtLjMyLS4wNS0uMzItLjA1LS4zMS0uMDUtLjMyLS4wNC0uMy0uMDMtLjMtLjA0LS4zLS4wMy0uMjktLjAzLS4yOC0uMDMtLjI4LS4wMi0uMjctLjAzLS4yNS0uMDItLjI1LS4wMi0uMjQtLjAxLS4yNC0uMDItLjIyLS4wMi0uMi0uMDEtLjItLjAxLS4xOS0uMDItLjE3LS4wMS0uMTYtLjAxLS4xNS0uMDItLjEzLS4wMS0uMTItLjAxLS4xLS4wMi0uMDl2LS4yNWwtLjAxLS4wOHYtLjYxbC0uMDEtLjA0di00MS41N2gtNDkuNjN2NjAuMjNsLS4xNi4wNS0uMTcuMDQtLjE3LjA0LS4xOC4wNS0uMTguMDQtLjE4LjA0LS4xOS4wNC0uMTguMDQtLjE5LjA0LS4xOS4wNC0uMTkuMDQtLjE5LjA0LS4xOS4wMy0uMTkuMDQtLjE5LjA0LS4xOC4wMy0uMTkuMDQtLjE5LjAzLS4xOC4wMy0uMTguMDMtLjE4LjAzLS4xNy4wMy0uMTcuMDMtLjE3LjAzLS4xNi4wMy0uMTUuMDItLjE2LjAzLS4xNC4wMi0uMTQuMDItLjE0LjAzLS4xMi4wMi0uMTIuMDItLjEyLjAxLS4xLjAyLS4xLjAyLS4wOS4wMS0uMDguMDEtLjA3LjAyLS4wNi4wMS0uMDUuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA3LjAxLS4wNi4wMWgtLjA3bC0uMDYuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA2LjAxLS4wNy4wMS0uMDYuMDEtLjA3LjAxLS4wNy4wMS0uMDYuMDEtLjA3LjAxaC0uMDZsLS4wNy4wMS0uMDcuMDEtLjA2LjAxLS4wNy4wMS0uMDYuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDFoLS4wN2wtLjA2LjAxLS4wNy4wMS0uMDYuMDEtLjA3LjAxLS4wNi4wMS0uMDcuMDEtLjA3LjAxaC0uMDZsLS4wNy4wMS0uMDYuMDEtLjQ1LjA2LS40NC4wNS0uNDMuMDUtLjQ0LjA1LS40Mi4wNC0uNDMuMDUtLjQxLjA0LS40MS4wMy0uNDEuMDQtLjQuMDMtLjM5LjAzLS4zOS4wMy0uMzguMDItLjM3LjAzLS4zNy4wMi0uMzYuMDItLjM1LjAyLS4zNC4wMS0uMzQuMDItLjMyLjAxLS4zMi4wMS0uMzEuMDEtLjMuMDEtLjI4LjAxLS4yOC4wMS0uMjcuMDEtLjI2LjAxaC0uMjVsLS4yMy4wMWgtLjIzbC0uMjEuMDFoLS4ybC0uMTkuMDFoLS4zNWwtLjE1LjAxaC0uMTRsLS4xMi4wMWgtLjExbC0uMS4wMS0xLjAxLS4wMS0uOTctLjAyLS45NC0uMDQtLjg5LS4wNS0uODYtLjA2LS44My0uMDgtLjgtLjA5LS43Ni0uMDktLjczLS4xMS0uNjktLjExLS42Ny0uMTMtLjY0LS4xMy0uNjEtLjE0LS41OC0uMTQtLjU1LS4xNS0uNTMtLjE2LS41LS4xNS0uNDgtLjE3LS40Ni0uMTYtLjQzLS4xNi0uNDEtLjE3LS4zOC0uMTctLjM3LS4xNi0uMzUtLjE3LS4zMy0uMTYtLjMxLS4xNi0uMjktLjE1LS4yOC0uMTYtLjI2LS4xNC0uMjUtLjE0LS4yMy0uMTQtLjIyLS4xMi0uMjEtLjEyLS4yLS4xMS0uMTgtLjEtLjE4LS4wOS0uMTYtLjA4LS4xNi0uMDctLjE2LS4wNS0uMTQtLjA1LS4xMS0uMS0uMTEtLjEtLjEtLjEtLjExLS4xLS4xLS4xMS0uMTEtLjEtLjEtLjExLS4xLS4xLS4xLS4xMS0uMDktLjExLS4xLS4xMS0uMDktLjEyLS4xLS4xMS0uMDktLjExLS4wOS0uMTItLjA5LS4xMS0uMDktLjEyLS4wOS0uMTItLjA4LS4xMi0uMDktLjEyLS4wOC0uMTItLjA4LS4xMi0uMDgtLjEyLS4wOC0uMTItLjA4LS4xMy0uMDgtLjEyLS4wNy0uMTMtLjA3LS4xMy0uMDgtLjEyLS4wNy0uMTMtLjA3LS4xMy0uMDYtLjEzLS4wNy0uMTMtLjA2LS4xNC0uMDctLjEzLS4wNi0uMTMtLjA2LS4xNC0uMDYtLjEzLS4wNi0uMTQtLjA1LS4xMy0uMTMtLjMyLS4xMy0uMzEtLjExLS4zMy0uMTEtLjMyLS4xMS0uMzMtLjEtLjMzLS4wOS0uMzMtLjA5LS4zMy0uMDgtLjMzLS4wOC0uMzMtLjA3LS4zMy0uMDctLjMzLS4wNi0uMzMtLjA2LS4zMy0uMDYtLjMyLS4wNS0uMzItLjA0LS4zMS0uMDUtLjMyLS4wNC0uMy0uMDQtLjMtLjAzLS4zLS4wMy0uMjktLjAzLS4yOC0uMDMtLjI4LS4wMi0uMjctLjAzLS4yNS0uMDItLjI1LS4wMi0uMjQtLjAyLS4yNC0uMDEtLjIyLS4wMi0uMi0uMDEtLjItLjAyLS4xOS0uMDEtLjE3LS4wMS0uMTYtLjAyLS4xNS0uMDEtLjEzLS4wMS0uMTItLjAyLS4xLS4wMS0uMDl2LS4yMmwtLjAxLS4wM3YtLjQ3bC0uMDEtLjA0VjI3OC43OWwuMTgtLjAzLjE4LS4wMy4xOS0uMDMuMTktLjAzLjE5LS4wMy4yLS4wMy4xOS0uMDMuMi0uMDQuMi0uMDMuMTktLjAzLjItLjAzLjItLjAzLjItLjAzLjItLjA0LjE5LS4wMy4yLS4wMy4xOS0uMDMuMTktLjAzLjE5LS4wMy4xOS0uMDMuMTgtLjAyLjE4LS4wMy4xNy0uMDMuMTctLjAzLjE3LS4wMi4xNi0uMDMuMTYtLjAyLjE1LS4wMy4xNC0uMDIuMjctLjA0LjEyLS4wMi4xMi0uMDIuMS0uMDEuMS0uMDIuMDktLjAxLjA5LS4wMi4wNy0uMDEuMDYtLjAxLjA2LS4wMS4wNi0uMDEuMi0uMDMuMTMtLjAyLjItLjAzLjEzLS4wMi4xMy0uMDIuMi0uMDMuMTMtLjAyLjItLjAzLjEzLS4wMi4yLS4wMy4xMy0uMDIuMTMtLjAyLjItLjAzLjEzLS4wMi4yLS4wMy4xMy0uMDIuNDQtLjA2LjQ0LS4wNy40My0uMDYuNDMtLjA1LjQzLS4wNS40MS0uMDUuNDItLjA1LjQtLjA0LjQtLjA0LjQtLjA0LjM4LS4wMy4zOC0uMDQuMzctLjAzLjM3LS4wMi4zNi0uMDMuMzUtLjAyLjM0LS4wMi4zMy0uMDIuMzMtLjAyLjMyLS4wMi4zLS4wMS4zLS4wMS4yOS0uMDIuMjgtLjAxLjI3LS4wMWguMjZsLjI1LS4wMS4yNC0uMDEuMjMtLjAxaC4yMWwuMjEtLjAxaC4xOWwuMTktLjAxaC4xN2wuMTYtLjAxaC4xNWwuMTMtLjAxaC4xMmwuMTEtLjAxaDEuMjFsLjE2LjAxaC4zMmwuMTYuMDFoLjMybC4xNS4wMWguMTZsLjE2LjAxLjE2LjAxaC4xNmwuMTYuMDEuMTYuMDEuMTYuMDFoLjE2bC4xNi4wMS4xNS4wMS4xNi4wMS4xNi4wMS4xNi4wMS4xNi4wMS4xNi4wMS4xNi4wMi4xNi4wMS4xNS4wMS4xNi4wMS4xNi4wMi4xNi4wMS4xNi4wMi4xNi4wMS4xNi4wMi4xNS4wMS4xNi4wMi40OC4wNS40Ny4wNi40Ni4wNi40NC4wNy40My4wNy40MS4wNy40MS4wOC4zOS4wOC4zOC4wOC4zNi4wOC4zNi4wOS4zNC4wOS4zNC4wOC4zMi4wOS4zMS4xLjMuMDkuMjguMDkuMjguMDkuMjcuMDkuMjUuMDkuMjUuMDkuMjQuMDkuMjIuMDkuMjIuMDkuMjEuMDguMTkuMDkuMTkuMDguMTguMDcuMTcuMDguMTYuMDcuMTYuMDcuMTQuMDYuMTQuMDYuMTIuMDYuMTIuMDUuMTEuMDUuMTEuMDQuMS4wNC4wOC4wMy4wOS4wMi4wNC4wMy4wNS4wMi4wNS4wMy4wNC4wMy4wNS4wMi4wNC4wMy4wNS4wMy4wNS4wMi4wNC4wMy4wNS4wMy4wNC4wMy4wNS4wMy4wNC4wMi4wNS4wMy4wNC4wMy4wNS4wMy4wNC4wMy4wNS4wMy4wNC4wMi4wNS4wMy4wNC4wMy4wNS4wMy4wNC4wMy4wNS4wMy4wNC4wMy4wNC4wMy4wNS4wMy4wNC4wMy4wNS4wMy4wNC4wMy4wNC4wNC4wNS4wMy4wNC4wMy4wNC4wMy4wNC4wMy4wNS4wMy4wNC4wMy4wNC4wNC4wNS4wMy4wNC4wMy4zOC4zMS4zNi4zNC4zNC4zNS4zMy4zNi4zMS4zOC4yOC40LjI4LjQxLjI1LjQyLjI1LjQzLjIyLjQ0LjIxLjQ1LjIuNDUuMTkuNDYuMTcuNDcuMTYuNDYuMTUuNDcuMTMuNDcuMTMuNDcuMTIuNDcuMTEuNDYuMS40Ni4wOS40NS4wOC40NC4wOC40NC4wNy40Mi4wNi40Mi4wNi40LjA1LjM5LjA1LjM3LjA1LjM2LjA0LjM0LjA0LjMyLjA0LjMuMDQuMjkuMDMuMjUuMDQuMjQuMDQuMjEuMDQuMTguMDMuMTYuMDUuMTN2LjI1bC4wMS4wNXYuMjVsLjAxLjA1di40MWwuMDEuMDV2NDIuODNoNDkuNjN2LTYxbC4wOS0uMDEuMDktLjAyLjA4LS4wMS4wOS0uMDEuMDgtLjAyLjA5LS4wMS4wOS0uMDIuMDgtLjAxLjA5LS4wMi4wOS0uMDEuMDgtLjAxLjA5LS4wMi4wOS0uMDEuMDgtLjAyLjA5LS4wMS4wOS0uMDEuMDgtLjAyLjA5LS4wMS4wOS0uMDEuMDgtLjAyLjE1LS4wMi4xNS0uMDMuMTUtLjAyLjE1LS4wMi4xNS0uMDMuMTUtLjAyLjE1LS4wMy4xNS0uMDIuMTUtLjAyLjE1LS4wMy4xNC0uMDIuMTUtLjAyLjE1LS4wMy4xNC0uMDIuMTQtLjAyLjE0LS4wMi4xNC0uMDMuMTQtLjAyLjEzLS4wMi4xNC0uMDIuMTItLjAyLjEzLS4wMi4xMi0uMDIuMTItLjAyLjEyLS4wMS4xMS0uMDIuMTEtLjAyLjItLjAzLjM1LS4wNS4wNy0uMDEuMTQtLjAzaC4wNWwuMDUtLjAxLjA1LS4wMS4wNC0uMDEuMDYtLjAxLjItLjAzLjEzLS4wMi4yLS4wMy4xMy0uMDIuMTMtLjAyLjItLjAzLjEzLS4wMi4yLS4wMy4xMy0uMDIuMi0uMDMuMTMtLjAyLjEzLS4wMi4yLS4wMy4xMy0uMDIuMi0uMDMuMTMtLjAyLjQ0LS4wNi40NC0uMDcuNDQtLjA2LjQyLS4wNS40My0uMDUuNDItLjA1LjQxLS4wNS40LS4wNC40LS4wNC40LS4wNC4zOC0uMDMuMzgtLjA0LjM4LS4wMy4zNi0uMDIuMzYtLjAzLjM1LS4wMi4zNC0uMDIuMzQtLjAyLjMyLS4wMi4zMi0uMDIuMzEtLjAxLjI5LS4wMS4yOS0uMDIuMjgtLjAxLjI3LS4wMWguMjZsLjI1LS4wMS4yNC0uMDEuMjMtLjAxaC4yMmwuMi0uMDFoLjJsLjE4LS4wMWguMTdsLjE2LS4wMWguMTVsLjEzLS4wMWguMTJsLjExLS4wMWguNzR6bTExNi42OSAzNC44OS0uMjcuMDFoLS41MmwtLjI2LjAxaC0uMjVsLS4yNS4wMWgtLjI0bC0uMjUuMDEtLjI0LjAxaC0uMjNsLS4yMy4wMS0uMjMuMDEtLjIyLjAxLS4yMi4wMWgtLjIxbC0uMjEuMDEtLjIuMDEtLjIuMDEtLjE5LjAxLS4xOS4wMS0uMTguMDEtLjE3LjAxLS4xNy4wMS0uMTYuMDFoLS4xNmwtLjE1LjAxLS4xNC4wMS0uMTQuMDEtLjI1LjAxLS4xMS4wMS0uMTEuMDFoLS4xbC0uMDkuMDFoLS4xNmwtLjA3LjAxaC0uMDZsLS4xOS4wMS0uMTkuMDItLjE4LjAxLS4xOS4wMS0uMTkuMDItLjE5LjAxLS4xOS4wMi0uMTguMDEtLjE5LjAyLS4xOS4wMi0uMTkuMDEtLjE5LjAyLS4xOS4wMi0uMTkuMDEtLjE5LjAyLS4xOS4wMi0uMTkuMDItLjE5LjAxLS4xOS4wMi0uMTkuMDItLjE5LjAyLS4xOS4wMi0uMTkuMDItLjE5LjAyLS4yLjAyLS4xOS4wMy0uMTkuMDItLjE5LjAyLS4xOS4wMi0uMTkuMDItLjIuMDMtLjE5LjAyLS4xOS4wMi0uMi4wMy0uMTkuMDItLjE5LjAyLS4xOS4wMy0uMi4wMi0uMTkuMDMtLjIuMDN2ODkuOTVsLjE1LjAyLjE1LjAzLjE1LjAyLjE0LjAzLjE1LjAyLjE1LjAzLjE1LjAyLjE0LjAzLjE1LjAyLjE0LjAyLjE1LjAyLjE0LjAyLjE0LjAyLjE0LjAyLjEzLjAyLjE0LjAyLjEzLjAyLjEzLjAyLjEzLjAxLjEzLjAyLjEyLjAyLjEyLjAxLjEyLjAyLjExLjAxLjExLjAyLjExLjAxLjEuMDEuMS4wMi4wOS4wMS4wOS4wMS4xNy4wMi4wOC4wMS4wNy4wMS4wNi4wMWguMDZsLjA2LjAxLjA1LjAxaC4wNGwuMDQuMDEuMDYuMDFoLjA2bC4wNi4wMS4wNi4wMWguMDZsLjA2LjAxLjA3LjAxaC4wNmwuMDYuMDEuMDYuMDFoLjA2bC4wNi4wMS4wNi4wMWguMDdsLjA2LjAxLjA2LjAxaC4wNmwuMDYuMDFoLjA2bC4wNi4wMS4wNy4wMWguMDZsLjA2LjAxLjA2LjAxaC4wNmwuMDYuMDFoLjA2bC4wNy4wMS4wNi4wMWguMDZsLjA2LjAxaC4wNmwuMDYuMDEuMDYuMDFoLjA3bC4wNi4wMWguMDZsLjA2LjAxLjA2LjAxaC4wNmwuMzEuMDMuMy4wMy4zLjAyLjI5LjAzLjI5LjAyLjI4LjAyLjI4LjAyLjI3LjAyLjI3LjAxLjI2LjAyLjI2LjAxLjI1LjAyLjI0LjAxLjI0LjAxLjIzLjAxLjIzLjAxLjIyLjAxLjIxLjAxLjIxLjAxLjIuMDFoLjJsLjE5LjAxaC4xOGwuMTcuMDFoLjE3bC4xNy4wMWguNDVsLjEzLjAxaC4zN2wuMS4wMWguMzZsLjA3LjAxaDEuMDhsLjM0LS4wMS4zNC0uMDEuMzMtLjAxLjM0LS4wMS4zNC0uMDIuMzQtLjAxLjM0LS4wMi4zNC0uMDMuMzMtLjAyLjM0LS4wMy4zNC0uMDMuMzQtLjA0LjMzLS4wMy4zNC0uMDQuMzQtLjA0LjMzLS4wNC4zNC0uMDUuMzMtLjA1LjM0LS4wNS4zMy0uMDUuMzQtLjA2LjMzLS4wNi4zMy0uMDYuMzQtLjA2LjMzLS4wNy4zMy0uMDYuMzMtLjA4LjMzLS4wNy4zNC0uMDcuMzMtLjA4LjMyLS4wOC4zMy0uMDkuMzMtLjA4LjMzLS4wOS4zMy0uMDkuMzItLjA5LjMzLS4xLjQ0LS4xMy40NC0uMTUuNDQtLjE0LjQ0LS4xNi40My0uMTYuNDMtLjE2LjQzLS4xNy40My0uMTguNDItLjE4LjQyLS4xOC40Mi0uMTkuNDItLjIuNDEtLjIuNDEtLjIxLjQxLS4yMS40MS0uMjEuNC0uMjMuNC0uMjIuNC0uMjQuMzktLjIzLjM5LS4yNC4zOS0uMjUuMzgtLjI1LjM4LS4yNi4zOC0uMjYuMzgtLjI3LjM3LS4yNy4zNy0uMjcuMzYtLjI4LjM2LS4yOS4zNi0uMjkuMzYtLjI5LjM1LS4zLjM0LS4zMS4zNS0uMy4zNC0uMzIuMzMtLjMyLjM0LS4zMi4zMi0uMzIuMzMtLjMzLjI4LS4zLjI3LS4yOS4yNy0uMy4yNy0uMy4yNi0uMzEuMjYtLjMxLjI1LS4zMS4yNi0uMzEuMjQtLjMxLjI1LS4zMi4yNC0uMzIuMjQtLjMzLjIzLS4zMi4yMy0uMzMuMjMtLjMzLjIyLS4zNC4yMi0uMzMuMjEtLjM0LjIyLS4zNC4yLS4zNS4yMS0uMzQuMi0uMzUuMTktLjM1LjE5LS4zNS4xOS0uMzYuMTgtLjM1LjE4LS4zNi4xOC0uMzYuMTctLjM2LjE3LS4zNy4xNi0uMzcuMTYtLjM2LjE2LS4zOC4xNS0uMzcuMTUtLjM3LjE0LS4zOC4xNC0uMzguMTMtLjM4LjEzLS4zOC4xMy0uMzguMjEtLjY2LjIxLS42NS4xOS0uNjYuMTgtLjY2LjE3LS42Ni4xNi0uNjYuMTUtLjY2LjE0LS42Ni4xMy0uNjYuMTItLjY1LjEyLS42NC4xLS42NS4xLS42My4wOS0uNjMuMDgtLjYyLjA4LS42MS4wNy0uNjEuMDYtLjU5LjA2LS41OC4wNS0uNTcuMDUtLjU2LjA0LS41NS4wNC0uNTMuMDQtLjUxLjAzLS41MS4wMi0uNDguMDMtLjQ3LjAyLS40NC4wMi0uNDMuMDItLjQxLjAyLS4zOS4wMi0uMzcuMDEtLjM0LjAyLS4zMy4wMS0uMy4wMi0uMjcuMDEtLjI1LjAyLS4yMi4wMi0uMi4wMi0uMTYtLjAxLTEuMTQtLjAyLTEuMS0uMDQtMS4wOC0uMDUtMS4wNS0uMDYtMS4wMi0uMDgtMS0uMDgtLjk3LS4xLS45NC0uMTEtLjkxLS4xMi0uODktLjEyLS44Ny0uMTMtLjgzLS4xNC0uODEtLjE1LS43OS0uMTUtLjc2LS4xNi0uNzQtLjE2LS43MS0uMTYtLjY4LS4xNi0uNjctLjE3LS42My0uMTctLjYyLS4xNy0uNTktLjE2LS41Ny0uMTctLjU0LS4xNi0uNTItLjE2LS41LS4xNi0uNDctLjE1LS40Ni0uMTUtLjQzLS4xNC0uNDEtLjE0LS4zOC0uMTMtLjM3LS4xMi0uMzQtLjExLS4zMy0uMS0uMy0uMDktLjI4LS4wOC0uMjYtLjA3LS4yNS0uMDUtLjIyLS4wNC0uMi0uMTItLjI2LS4xMi0uMjUtLjEyLS4yNi0uMTItLjI1LS4xMy0uMjYtLjEyLS4yNS0uMTMtLjI1LS4xMy0uMjUtLjEzLS4yNS0uMTQtLjI1LS4xMy0uMjUtLjE0LS4yNC0uMTQtLjI1LS4xNC0uMjQtLjE1LS4yNC0uMTQtLjI0LS4xNS0uMjQtLjE1LS4yNC0uMTUtLjI0LS4xNi0uMjQtLjE1LS4yMy0uMTYtLjIzLS4xNi0uMjQtLjE2LS4yMy0uMTYtLjIzLS4xNy0uMjMtLjE2LS4yMi0uMTctLjIzLS4xNy0uMjMtLjE3LS4yMi0uMTgtLjIyLS4xNy0uMjItLjE4LS4yMi0uMTgtLjIyLS4xOC0uMjItLjE4LS4yMS0uMTktLjIxLS4xOS0uMjItLjE4LS4yMS0uMTktLjIxLS40Ni0uNDgtLjQ2LS40Ny0uNDctLjQ3LS40Ny0uNDUtLjQ5LS40NS0uNDktLjQzLS41LS40My0uNTEtLjQxLS41MS0uNDEtLjUyLS40LS41My0uMzktLjUzLS4zNy0uNTQtLjM3LS41NC0uMzYtLjU2LS4zNC0uNTYtLjM0LS41Ni0uMzMtLjU3LS4zMS0uNTctLjMxLS41OC0uMy0uNTktLjI4LS41OS0uMjctLjYtLjI3LS42LS4yNS0uNi0uMjQtLjYxLS4yMy0uNjItLjIyLS42Mi0uMjEtLjYyLS4yLS42My0uMTktLjYzLS4xNy0uNjMtLjE3LS42NC0uMTUtLjY0LS4xNC0uNjQtLjEzLS42NS0uMTItLjY1LS4xLS42NS0uMS0uNjYtLjA4LS42Ni0uMDctLjE1LS4wMi0uMTUtLjAxLS4xNS0uMDItLjE0LS4wMi0uMTUtLjAxLS4xNS0uMDItLjE1LS4wMS0uMTUtLjAyLS4xNS0uMDEtLjE1LS4wMS0uMTUtLjAyLS4xNS0uMDEtLjE1LS4wMS0uMTUtLjAxLS4xNS0uMDEtLjE1LS4wMi0uMTUtLjAxLS4xNS0uMDFoLS4xNWwtLjE1LS4wMS0uMTUtLjAxLS4xNi0uMDEtLjE1LS4wMS0uMTUtLjAxaC0uMTVsLS4xNS0uMDFoLS4xNWwtLjE1LS4wMWgtLjE1bC0uMTUtLjAxaC0uMTVsLS4xNS0uMDFoLS40NWwtLjE1LS4wMWgtMS4xNHpNMzIyLjk2IDkwLjEybC42OS4xLjY4LjEyLjY4LjE1LjY3LjE3LjY3LjIxLjY2LjIzLjY1LjI1LjY1LjI5LjY0LjMxLjYzLjM0LjYyLjM2LjYuMzkuNi40Mi41OS40NS41Ny40Ny41Ni41LjU1LjUzIDEyMi4yNyAxMjIuMjguODQuODguNzYuOTIuNjkuOTMuNjIuOTYuNTQuOTguNDguOTkuNCAxIC4zNCAxLjAyLjI4IDEuMDIuMjEgMS4wMy4xNCAxLjAzLjA4IDEuMDQuMDIgMS4wMy0uMDQgMS4wMy0uMSAxLjAyLS4xNSAxLjAxLS4yMiAxLS4wNy4yNkgxODEuMDRsLS4wNy0uMjYtLjIyLTEtLjE1LTEuMDEtLjEtMS4wMi0uMDQtMS4wMy4wMi0xLjAzLjA4LTEuMDQuMTUtMS4wMy4yLTEuMDMuMjgtMS4wMi4zNC0xLjAyLjQtMSAuNDgtLjk5LjU0LS45OC42Mi0uOTYuNjktLjkzLjc2LS45Mi44NC0uODhMMzA4LjEzIDk1LjQxbC41NS0uNTMuNTYtLjUuNTctLjQ3LjU5LS40NS42LS40Mi42LS4zOS42Mi0uMzYuNjMtLjM0LjY0LS4zMS42NS0uMjkuNjUtLjI1LjY3LS4yMy42Ni0uMjEuNjgtLjE3LjY3LS4xNS42OC0uMTIuNjktLjEuNjgtLjA3LjY5LS4wNC42OS0uMDEuNjkuMDEuNjkuMDQuNjguMDd6IiBpZD0iYiIvPjwvZGVmcz48dXNlIHhsaW5rOmhyZWY9IiNhIiBmaWxsLW9wYWNpdHk9IjAiLz48dXNlIHhsaW5rOmhyZWY9IiNiIiBmaWxsPSIjZmZmIi8+PHVzZSB4bGluazpocmVmPSIjYiIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwIi8+PC9zdmc+");
// CONCATENATED MODULE: ./src/addons/addons/better-img-uploads/_runtime_entry.js
/* generated by pull.js */



const resources = {
  "userscript.js": userscript,
  "style.css": style_default.a,
  "icon.svg": icon
};

/***/ })

}]);