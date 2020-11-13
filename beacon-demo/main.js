(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../beacon-sdk/dist/esm/MockWindow.js":
/*!********************************************!*\
  !*** ../beacon-sdk/dist/esm/MockWindow.js ***!
  \********************************************/
/*! exports provided: myWindow, clearMockWindowState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myWindow", function() { return myWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMockWindowState", function() { return clearMockWindowState; });
const cbs = [(_) => undefined];
/**
 * A mock for postmessage if run in node.js environment
 */
let myWindow = {
    postMessage: (message, _target) => {
        console.log('GOT MOCK POST MESSAGE', message);
        cbs.forEach((callbackElement) => {
            callbackElement({ data: message });
        });
    },
    addEventListener: (_name, eventCallback) => {
        cbs.push(eventCallback);
    },
    removeEventListener: (_name, eventCallback) => {
        cbs.splice(cbs.indexOf((element) => element === eventCallback), 1);
    }
};
try {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        myWindow = window;
    }
}
catch (windowError) {
    console.log(`not defined: ${windowError}`);
}
const clearMockWindowState = () => {
    cbs.length = 0;
};

//# sourceMappingURL=MockWindow.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/Serializer.js":
/*!********************************************!*\
  !*** ../beacon-sdk/dist/esm/Serializer.js ***!
  \********************************************/
/*! exports provided: Serializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Serializer", function() { return Serializer; });
/* harmony import */ var bs58check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bs58check */ "../beacon-sdk/node_modules/bs58check/index.js");
/* harmony import */ var bs58check__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bs58check__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * The Serializer is used to serialize / deserialize JSON objects and encode them with bs58check
 */
class Serializer {
    /**
     * Serialize and bs58check encode an object
     *
     * @param message JSON object to serialize
     */
    serialize(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const str = JSON.stringify(message);
            return bs58check__WEBPACK_IMPORTED_MODULE_0__["encode"](Buffer.from(str));
        });
    }
    /**
     * Deserialize a bs58check encoded string
     *
     * @param encoded String to be deserialized
     */
    deserialize(encoded) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof encoded !== 'string') {
                throw new Error('Encoded payload needs to be a string');
            }
            return JSON.parse(bs58check__WEBPACK_IMPORTED_MODULE_0__["decode"](encoded).toString());
        });
    }
}
//# sourceMappingURL=Serializer.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/alert/Alert.js":
/*!*********************************************!*\
  !*** ../beacon-sdk/dist/esm/alert/Alert.js ***!
  \*********************************************/
/*! exports provided: closeAlert, closeAlerts, openAlert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeAlert", function() { return closeAlert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeAlerts", function() { return closeAlerts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openAlert", function() { return openAlert; });
/* harmony import */ var _utils_generate_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/generate-uuid */ "../beacon-sdk/dist/esm/utils/generate-uuid.js");
/* harmony import */ var _utils_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/platform */ "../beacon-sdk/dist/esm/utils/platform.js");
/* harmony import */ var _utils_replace_in_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/replace-in-template */ "../beacon-sdk/dist/esm/utils/replace-in-template.js");
/* harmony import */ var _alert_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alert-templates */ "../beacon-sdk/dist/esm/alert/alert-templates.js");
// Taken from https://github.com/WalletConnect/walletconnect-monorepo/blob/master/packages/qrcode-modal/src/browser.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let document;
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    document = window.document;
}
const timeout = {};
const formatBody = (dataString) => {
    if (typeof dataString === 'string') {
        return dataString.replace('<svg', `<svg class="beacon-alert__image"`);
    }
    return dataString;
};
const formatAlert = (id, body, title, type, buttons, pairingPayload) => {
    const callToAction = title;
    const buttonsHtml = buttons.map((button, index) => `<button id="beacon-alert-${id}-${index}" class="beacon-modal__button${button.style === 'outline' ? '--outline' : ''}">${button.text}</button>`);
    let allStyles = _alert_templates__WEBPACK_IMPORTED_MODULE_3__["alertTemplates"].default.css;
    if (type === 'pair') {
        allStyles += _alert_templates__WEBPACK_IMPORTED_MODULE_3__["alertTemplates"].pair.css;
    }
    let alertContainer = `<style>${allStyles}</style>${_alert_templates__WEBPACK_IMPORTED_MODULE_3__["alertTemplates"].container}`;
    alertContainer = Object(_utils_replace_in_template__WEBPACK_IMPORTED_MODULE_2__["replaceInTemplate"])(alertContainer, 'main', type === 'pair' ? _alert_templates__WEBPACK_IMPORTED_MODULE_3__["alertTemplates"].pair.html : _alert_templates__WEBPACK_IMPORTED_MODULE_3__["alertTemplates"].default.html);
    alertContainer = Object(_utils_replace_in_template__WEBPACK_IMPORTED_MODULE_2__["replaceInTemplate"])(alertContainer, 'callToAction', callToAction);
    alertContainer = Object(_utils_replace_in_template__WEBPACK_IMPORTED_MODULE_2__["replaceInTemplate"])(alertContainer, 'buttons', buttonsHtml.join(' '));
    alertContainer = Object(_utils_replace_in_template__WEBPACK_IMPORTED_MODULE_2__["replaceInTemplate"])(alertContainer, 'body', body);
    alertContainer = Object(_utils_replace_in_template__WEBPACK_IMPORTED_MODULE_2__["replaceInTemplate"])(alertContainer, 'id', id);
    alertContainer = Object(_utils_replace_in_template__WEBPACK_IMPORTED_MODULE_2__["replaceInTemplate"])(alertContainer, 'payload', pairingPayload !== null && pairingPayload !== void 0 ? pairingPayload : '');
    if (alertContainer.indexOf('{{') >= 0) {
        const start = alertContainer.indexOf('{{');
        const end = alertContainer.indexOf('}}');
        console.error('Not all placeholders replaced!', alertContainer.substr(start, end - start));
        throw new Error('Not all placeholders replaced!');
    }
    return alertContainer;
};
/**
 * Close an alert by ID
 *
 * @param id ID of alert
 */
const closeAlert = (id) => new Promise((resolve) => {
    const elm = document.getElementById(`beacon-alert-modal-${id}`);
    if (elm) {
        const animationDuration = 300;
        const localTimeout = timeout[id];
        if (localTimeout) {
            clearTimeout(localTimeout);
            timeout[id] = undefined;
        }
        elm.className = elm.className.replace('fadeIn', 'fadeOut');
        window.setTimeout(() => {
            const wrapper = document.getElementById(`beacon-alert-wrapper-${id}`);
            if (wrapper) {
                document.body.removeChild(wrapper);
            }
            resolve();
        }, animationDuration);
    }
    else {
        resolve();
    }
});
/**
 * Close all alerts
 */
const closeAlerts = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const openAlertElements = document.querySelectorAll('[id^="beacon-alert-wrapper-"]');
        if (openAlertElements.length > 0) {
            const alertIds = [];
            openAlertElements.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                alertIds.push(element.id.split('-')[3]);
            }));
            yield Promise.all(alertIds.map(closeAlert));
            resolve();
        }
        else {
            resolve();
        }
    }));
});
/**
 * Show an alert
 *
 * @param alertConfig The configuration of the alert
 */
// eslint-disable-next-line complexity
const openAlert = (alertConfig) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const body = alertConfig.body;
    const title = alertConfig.title;
    const timer = alertConfig.timer;
    const pairingPayload = alertConfig.pairingPayload;
    const confirmButtonText = alertConfig.confirmButtonText;
    const actionButtonText = alertConfig.actionButtonText;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const confirmCallback = alertConfig.confirmCallback;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const actionCallback = alertConfig.actionCallback;
    yield closeAlerts();
    const id = (yield Object(_utils_generate_uuid__WEBPACK_IMPORTED_MODULE_0__["generateGUID"])()).split('-').join('');
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', `beacon-alert-wrapper-${id}`);
    const buttons = [...((_a = alertConfig.buttons) !== null && _a !== void 0 ? _a : [])];
    if (actionButtonText || actionCallback) {
        buttons.push({
            text: actionButtonText !== null && actionButtonText !== void 0 ? actionButtonText : 'click',
            actionCallback: (_b = actionCallback) !== null && _b !== void 0 ? _b : (() => Promise.resolve()),
            style: 'outline'
        });
    }
    if (confirmButtonText || confirmCallback) {
        buttons.push({
            text: confirmButtonText !== null && confirmButtonText !== void 0 ? confirmButtonText : 'click',
            actionCallback: (_c = confirmCallback) !== null && _c !== void 0 ? _c : (() => Promise.resolve()),
            style: 'solid'
        });
    }
    const formattedBody = body ? formatBody(body) : '';
    wrapper.innerHTML = formatAlert(id, formattedBody, title, 'pair', buttons, pairingPayload);
    if (timer) {
        timeout[id] = window.setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield closeAlert(id);
        }), timer);
    }
    document.body.appendChild(wrapper);
    buttons.forEach((button, index) => {
        const buttonElement = document.getElementById(`beacon-alert-${id}-${index}`);
        if (buttonElement) {
            buttonElement.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
                yield closeAlert(id);
                if (button.actionCallback) {
                    yield button.actionCallback();
                }
            }));
        }
    });
    const closeButton = document.getElementById(`beacon-alert-${id}-close`);
    if (closeButton) {
        closeButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            yield closeAlert(id);
        }));
    }
    const platform = Object(_utils_platform__WEBPACK_IMPORTED_MODULE_1__["isAndroid"])(window) ? 'android' : Object(_utils_platform__WEBPACK_IMPORTED_MODULE_1__["isIOS"])(window) ? 'ios' : 'desktop';
    const mainText = document.getElementById(`beacon-main-text`);
    const iosList = document.getElementById(`beacon-ios-list`);
    const androidList = document.getElementById(`beacon-android-list`);
    const desktopList = document.getElementById(`beacon-desktop-list`);
    const webList = document.getElementById(`beacon-web-list`);
    if (mainText && iosList && androidList && desktopList && webList) {
        const showPlatform = (type) => {
            const platformSwitch = document.getElementById(`beacon-switch`);
            if (platformSwitch) {
                platformSwitch.innerHTML =
                    type === 'none' ? 'Pair Wallet on same device' : 'Pair Wallet on different device';
            }
            mainText.style.display = 'none';
            iosList.style.display = 'none';
            androidList.style.display = 'none';
            desktopList.style.display = 'none';
            webList.style.display = 'none';
            switch (type) {
                case 'ios':
                    iosList.style.display = 'initial';
                    break;
                case 'android':
                    androidList.style.display = 'initial';
                    break;
                case 'desktop':
                    desktopList.style.display = 'initial';
                    webList.style.display = 'initial';
                    break;
                default:
                    mainText.style.display = 'initial';
            }
        };
        let showQr = platform === 'desktop';
        const switchPlatform = () => {
            showPlatform(showQr ? 'none' : platform);
            showQr = !showQr;
        };
        switchPlatform();
        {
            const platformSwitch = document.getElementById(`beacon-switch`);
            if (platformSwitch) {
                platformSwitch.addEventListener('click', switchPlatform);
            }
        }
    }
    return id;
});

//# sourceMappingURL=Alert.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/alert/Toast.js":
/*!*********************************************!*\
  !*** ../beacon-sdk/dist/esm/alert/Toast.js ***!
  \*********************************************/
/*! exports provided: closeToast, openToast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeToast", function() { return closeToast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openToast", function() { return openToast; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let document;
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    document = window.document;
}
let timeout;
const getToastHTML = (config) => {
    const text = config.body;
    return `
  <style>
    :root {
      --animation-duration: 300ms;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    
    .animated {
      animation-duration: var(--animation-duration);
      animation-fill-mode: both;
    }
    
    .fadeIn {
      animation-name: fadeIn;
    }
    
    .fadeOut {
      animation-name: fadeOut;
    }

    .beacon-toast__base {
      position: absolute;
      bottom: 16px;
      right: 16px;
      padding: 16px;
      height: 64px;
      z-index: 2147483000;
      background: #fff;
      margin: 0 auto;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
    }

    .beacon-toast__content {
      padding: 0 0 0 16px;
      font-family: Roboto, Helvetica, sans-serif;
    }
    .spinner .loader,
    .spinner .loader:after {
      border-radius: 50%;
      width: 32px;
      height: 32px;
    }
    .spinner .loader {
      position: relative;
      text-indent: -9999em;
      border-top: 4px solid rgba(56,128,255, 0.2);
      border-right: 4px solid rgba(56,128,255, 0.2);
      border-bottom: 4px solid rgba(56,128,255, 0.2);
      border-left: 4px solid #3880ff;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation: spinner 1.1s infinite linear;
      animation: spinner 1.1s infinite linear;
    }
    @-webkit-keyframes spinner {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes spinner {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  </style>
  
  <div id="beacon-toast" class="beacon-toast__base animated fadeIn">
    <div class="load-container spinner">
      <div class="loader">Loading...</div>
    </div>
    <div class="beacon-toast__content">
      <p>${text}</p>
    </div>
    ${config.showDoneButton ? '<div id="beacon-toast-button-done"></div>' : ''}
  </div>
`;
};
/**
 * Close a toast
 */
const closeToast = () => new Promise((resolve) => {
    const elm = document.getElementById('beacon-toast');
    if (elm) {
        const animationDuration = 300;
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
        elm.className = elm.className.replace('fadeIn', 'fadeOut');
        window.setTimeout(() => {
            const wrapper = document.getElementById('beacon-toast-wrapper');
            if (wrapper) {
                document.body.removeChild(wrapper);
            }
            resolve();
        }, animationDuration);
    }
    else {
        resolve();
    }
});
/**
 * Create a new toast
 *
 * @param toastConfig Configuration of the toast
 */
const openToast = (toastConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const timer = toastConfig.timer;
    yield closeToast();
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'beacon-toast-wrapper');
    wrapper.innerHTML = getToastHTML(toastConfig);
    if (timer) {
        timeout = window.setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield closeToast();
        }), timer);
    }
    document.body.appendChild(wrapper);
    const doneButton = document.getElementById('beacon-toast-button-done');
    if (doneButton) {
        doneButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            yield closeToast();
        }));
    }
});

//# sourceMappingURL=Toast.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/alert/alert-templates.js":
/*!*******************************************************!*\
  !*** ../beacon-sdk/dist/esm/alert/alert-templates.js ***!
  \*******************************************************/
/*! exports provided: alertTemplates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alertTemplates", function() { return alertTemplates; });
const alertTemplates = { "container": "<div id=\"beacon-alert-modal-{{id}}\" class=\"beacon-alert__base animated fadeIn\">\r\n  <div class=\"beacon-modal__wrapper\">\r\n    <div class=\"beacon-modal__header\">\r\n      <svg\r\n        xmlns=\"http://www.w3.org/2000/svg\"\r\n        id=\"Guides\"\r\n        x=\"0\"\r\n        y=\"0\"\r\n        version=\"1.1\"\r\n        viewBox=\"0 0 179.2 43\"\r\n        xml:space=\"preserve\"\r\n        width=\"140\"\r\n        height=\"40\"\r\n      >\r\n        <style>\r\n          .st0 {\r\n            fill: #3880ff;\r\n          }\r\n          .st1 {\r\n            fill: #fff;\r\n          }\r\n        </style>\r\n        <path\r\n          d=\"M45 19v.9c0 .3-.2 7.5-3.4 13.2-3.3 5.6-9.4 9.3-9.7 9.5l-.8.4-1.3-.8-7.6-4.4c-.5-.3-.9-.6-1.4-.9-.4-.3-.7-.5-1.1-.8-.8-.7-1.5-1.4-2.1-2.2-.9-1.1-1.6-2.4-2.1-3.7-.9-2.3-1.3-4.8-1.2-7.5.8-.4 1.6-.6 2.4-.6h.6c-.2 2.4.1 4.6.8 6.6 1 2.8 2.9 5.1 5.5 6.6l7.4 4.3c.2-.1.4-.2.6-.4 1.9-1.3 5.3-4.1 7.3-7.6 2.2-3.9 2.8-8.9 3-10.8L38.8 19c.3-1 .4-2.1.5-3.2L45 19z\"\r\n          class=\"st0\"\r\n        />\r\n        <path\r\n          d=\"M36.3 4.1v10.3c0 .5 0 1.1-.1 1.6s-.1.9-.2 1.3c-.2 1-.5 2-.9 3-.5 1.3-1.3 2.6-2.2 3.7-1.5 1.9-3.5 3.6-5.9 4.8-.9-.6-1.6-1.3-2-2.4 2.1-1 3.9-2.3 5.2-4 1.9-2.3 3-5.1 3-8.1V5.9l-.6-.3c-2-1-6.1-2.6-10.1-2.6-4.5 0-9.1 2-10.9 2.9v3.6c-1 .3-2 .7-3 1.1V4.1l.8-.4C9.7 3.5 16 0 22.5 0s12.8 3.5 13.1 3.6l.7.5z\"\r\n          class=\"st0\"\r\n        />\r\n        <path\r\n          d=\"M10.5 16.5l-7.4 4.3v.7c.2 2.1.9 6.5 2.9 10 2.2 3.9 6.2 6.9 7.9 8l3.1-1.8c.8.7 1.6 1.4 2.5 2L13.8 43l-.8-.5c-.3-.2-6.4-3.9-9.7-9.5C.1 27.4 0 20.2 0 19.9V19l1.3-.8L9 13.9c.5-.3.9-.5 1.4-.7.4-.2.8-.4 1.3-.5 1-.4 2-.6 3-.7 1.4-.2 2.9-.2 4.3 0 2.4.3 4.8 1.2 7.1 2.7 0 1-.4 2-1 2.9-1.9-1.3-4-2.2-6-2.5-3.1-.6-6-.1-8.6 1.4z\"\r\n          class=\"st0\"\r\n        />\r\n        <g>\r\n          <path\r\n            d=\"M73.9 23c.9 1 1.3 2.3 1.3 3.7 0 1.9-.6 3.4-1.9 4.5-1.3 1.1-3.1 1.7-5.5 1.7h-8.6v-23h8.4c2.3 0 4.1.5 5.3 1.5 1.2 1 1.8 2.4 1.8 4.2 0 1.5-.4 2.7-1.2 3.6-.8.9-1.8 1.5-3.1 1.8 1.5.3 2.6 1 3.5 2zm-11.7-3h5c1.5 0 2.6-.3 3.4-1 .8-.7 1.2-1.6 1.2-2.8 0-1.2-.4-2.1-1.1-2.8-.8-.7-1.9-1-3.5-1h-4.8V20zm8.7 9.4c.9-.7 1.3-1.7 1.3-3s-.4-2.3-1.3-3c-.9-.7-2.1-1.1-3.7-1.1h-5v8.2h5c1.6-.1 2.8-.4 3.7-1.1zM95.3 24.6H81c.1 2.1.6 3.6 1.7 4.6s2.4 1.5 4 1.5c1.4 0 2.6-.4 3.6-1.1 1-.7 1.6-1.7 1.8-2.9h3.2c-.2 1.2-.7 2.4-1.5 3.3-.8 1-1.7 1.7-2.9 2.3-1.2.5-2.6.8-4.1.8-1.7 0-3.2-.4-4.6-1.1-1.3-.7-2.4-1.8-3.1-3.2-.8-1.4-1.1-3-1.1-4.9 0-1.9.4-3.5 1.1-4.9.8-1.4 1.8-2.5 3.1-3.2 1.3-.7 2.9-1.1 4.6-1.1 1.7 0 3.3.4 4.6 1.1 1.3.7 2.3 1.7 3 3 .7 1.2 1 2.6 1 4.1.1.7 0 1.2-.1 1.7zm-3.5-4.8c-.5-.9-1.2-1.6-2.1-2-.9-.4-1.8-.7-2.8-.7-1.6 0-3 .5-4.1 1.5-1.1 1-1.7 2.5-1.8 4.5h11.5c0-1.3-.2-2.4-.7-3.3zM111.2 16c1.2.9 2.1 2 2.5 3.5V15h3v18h-3v-4.6c-.5 1.5-1.3 2.6-2.5 3.5-1.2.9-2.7 1.3-4.4 1.3-1.6 0-3-.4-4.3-1.1-1.2-.7-2.2-1.8-2.9-3.2-.7-1.4-1.1-3-1.1-4.9 0-1.9.4-3.5 1.1-4.9.7-1.4 1.7-2.5 2.9-3.2 1.2-.7 2.7-1.1 4.3-1.1 1.7-.1 3.1.4 4.4 1.2zm-8 3.1c-1.1 1.2-1.7 2.8-1.7 4.8 0 2.1.5 3.7 1.7 4.8 1.1 1.2 2.6 1.8 4.4 1.8 1.2 0 2.2-.3 3.2-.8.9-.5 1.7-1.3 2.2-2.3.5-1 .8-2.1.8-3.5 0-1.3-.3-2.5-.8-3.5s-1.2-1.8-2.2-2.3c-.9-.5-2-.8-3.2-.8-1.9.1-3.3.7-4.4 1.8zM135 16.6c1.5 1.2 2.4 2.9 2.8 4.9h-3.1c-.2-1.3-.8-2.3-1.8-3-1-.7-2.2-1.1-3.6-1.1-1 0-2 .2-2.9.7-.9.5-1.6 1.2-2.1 2.2-.5 1-.8 2.2-.8 3.7s.3 2.7.8 3.7 1.2 1.7 2.1 2.2c.9.5 1.8.7 2.9.7 1.4 0 2.6-.4 3.6-1.1 1-.7 1.6-1.8 1.8-3h3.1c-.3 2.1-1.3 3.7-2.8 4.9-1.5 1.2-3.4 1.8-5.7 1.8-1.7 0-3.2-.4-4.6-1.1-1.3-.7-2.4-1.8-3.1-3.2-.8-1.4-1.1-3-1.1-4.9 0-1.9.4-3.5 1.1-4.9.8-1.4 1.8-2.5 3.1-3.2 1.3-.7 2.9-1.1 4.6-1.1 2.3-.1 4.2.6 5.7 1.8zM154.5 15.9c1.4.7 2.4 1.8 3.2 3.2.8 1.4 1.2 3 1.2 4.9 0 1.9-.4 3.5-1.2 4.9-.8 1.4-1.8 2.4-3.2 3.2-1.4.7-2.9 1.1-4.6 1.1-1.7 0-3.3-.4-4.6-1.1-1.4-.7-2.4-1.8-3.2-3.2-.8-1.4-1.2-3-1.2-4.9 0-1.9.4-3.5 1.2-4.9.8-1.4 1.9-2.5 3.2-3.2 1.4-.7 2.9-1.1 4.6-1.1 1.7-.1 3.2.3 4.6 1.1zm-7.6 2.2c-.9.5-1.6 1.2-2.2 2.2-.6 1-.8 2.2-.8 3.7 0 1.4.3 2.7.8 3.6.6 1 1.3 1.7 2.2 2.2.9.5 1.9.7 3 .7s2.1-.2 3-.7c.9-.5 1.6-1.2 2.2-2.2.6-1 .8-2.2.8-3.6 0-1.5-.3-2.7-.8-3.7-.6-1-1.3-1.7-2.2-2.2-.9-.5-1.9-.7-3-.7s-2.1.2-3 .7zM177.3 16.7c1.3 1.3 1.9 3.3 1.9 5.8v10.4h-3V22.8c0-1.8-.5-3.2-1.4-4.1-.9-1-2.2-1.4-3.7-1.4-1.6 0-2.9.5-3.9 1.6s-1.5 2.6-1.5 4.6V33h-3V15h3v4.3c.5-1.5 1.3-2.6 2.4-3.4 1.2-.8 2.5-1.2 4-1.2 2.2 0 3.9.6 5.2 2z\"\r\n            class=\"st1\"\r\n          />\r\n        </g>\r\n      </svg>\r\n      <div class=\"beacon-modal__close__wrapper\">\r\n        <div id=\"beacon-alert-{{id}}-close\" class=\"beacon-modal__close__icon\">\r\n          <div class=\"beacon-modal__close__line1\"></div>\r\n          <div class=\"beacon-modal__close__line2\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"beacon-modal__base\">\r\n      <div class=\"beacon-modal__content\">\r\n        <div>\r\n          <p class=\"beacon-alert__title\">\r\n            {{callToAction}}\r\n          </p>\r\n\r\n          {{main}}\r\n\r\n          <div class=\"beacon-action__container\">\r\n            {{buttons}}\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", "default": { "html": "<div id=\"beacon-main-text\" class=\"beacon-alert__text\">\r\n  {{body}}\r\n</div>\r\n", "css": ":root {\r\n  --animation-duration: 300ms;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.animated {\r\n  animation-duration: var(--animation-duration);\r\n  animation-fill-mode: both;\r\n}\r\n\r\n.fadeIn {\r\n  animation-name: fadeIn;\r\n}\r\n\r\n.fadeOut {\r\n  animation-name: fadeOut;\r\n}\r\n\r\n.beacon-modal__wrapper {\r\n  position: relative;\r\n  transform: translateY(-50%);\r\n  top: 50%;\r\n  display: inline-block;\r\n  z-index: 2147483000;\r\n  max-width: 500px;\r\n  width: 100%;\r\n}\r\n\r\n.beacon-modal__base,\r\n.beacon-modal__close__wrapper {\r\n  background: #fff;\r\n  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.beacon-modal__base {\r\n  margin: 0 auto;\r\n  border-radius: 32px;\r\n  overflow: hidden;\r\n}\r\n\r\n.beacon-modal__header {\r\n  padding: 16px 0;\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.beacon-modal__headerLogo {\r\n  width: 100%;\r\n  max-width: 320px;\r\n  margin: 20px auto;\r\n  height: 100%;\r\n}\r\n\r\n.beacon-alert__text,\r\n.beacon-alert__title,\r\n.beacon-selection__name,\r\np,\r\nbutton {\r\n  font-family: Roboto, Helvetica, sans-serif;\r\n}\r\n\r\n.beacon-modal__close__wrapper {\r\n  position: absolute;\r\n  top: 20px;\r\n  right: 0;\r\n  z-index: 10000;\r\n  cursor: pointer;\r\n  border-radius: 100%;\r\n}\r\n\r\n.beacon-modal__close__icon {\r\n  width: 16px;\r\n  height: 16px;\r\n  position: relative;\r\n  top: 0;\r\n  right: 0;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  transform: rotate(45deg);\r\n  margin: 8px;\r\n}\r\n\r\n.beacon-modal__close__line1 {\r\n  position: absolute;\r\n  width: 90%;\r\n  border: 1px solid #000;\r\n}\r\n\r\n.beacon-modal__close__line2 {\r\n  position: absolute;\r\n  width: 90%;\r\n  border: 1px solid #000;\r\n  transform: rotate(90deg);\r\n}\r\n\r\n.beacon-alert__base {\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 2147482999;\r\n  background-color: rgb(17 17 17 / 0.84);\r\n  text-align: center;\r\n}\r\n\r\n.beacon-alert__text,\r\n.beacon-alert__title {\r\n  text-align: center;\r\n  margin: 0 auto;\r\n  padding: 0 0 16px;\r\n}\r\n\r\n.margin__bottom {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.beacon-alert__title {\r\n  color: #7c828b;\r\n  font-size: 18px;\r\n}\r\n\r\n.beacon-alert__text {\r\n  color: #000;\r\n  font-size: 14px;\r\n}\r\n\r\n.beacon-modal__button,\r\n.beacon-modal__button--outline {\r\n  height: 36px;\r\n  font-size: 14px;\r\n  letter-spacing: 0.84px;\r\n  margin-bottom: 4px;\r\n  margin-inline-end: 2px;\r\n  margin-inline-start: 2px;\r\n  margin-left: 2px;\r\n  margin-right: 2px;\r\n  margin-top: 4px;\r\n  padding-inline-end: 15.4px;\r\n  padding-inline-start: 15.4px;\r\n  padding-left: 15.4px;\r\n  padding-right: 15.4px;\r\n  overflow-wrap: break-word;\r\n  pointer-events: auto;\r\n  text-align: center;\r\n  border: 2px solid #3880ff;\r\n  border-radius: 4px;\r\n}\r\n\r\n.beacon-modal__button {\r\n  background: #3880ff;\r\n  color: #fff;\r\n}\r\n\r\n.beacon-modal__button--outline {\r\n  background: #fff;\r\n  color: #3880ff;\r\n}\r\n\r\n.beacon-alert__image {\r\n  width: 300px;\r\n  height: 300px;\r\n  box-sizing: border-box;\r\n  box-shadow: 0 10px 20px 0 rgba(17, 17, 17, 0.12);\r\n  border: 1px solid rgba(17, 17, 17, 0.04);\r\n  border-radius: 16px;\r\n}\r\n\r\n.beacon-modal__content {\r\n  padding: 24px;\r\n}\r\n\r\n.beacon-action__container {\r\n  padding-top: 24px;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n" }, "pair": { "html": "<div id=\"beacon-main-text\" class=\"beacon-alert__text\">\r\n  {{body}}\r\n</div>\r\n\r\n<div id=\"beacon-ios-list\">\r\n  <div class=\"beacon-selection__container\">\n      <a alt=\"Open in AirGap Wallet\" href=\"airgap-wallet://?type=tzip10&data={{payload}}\" target=\"_blank\" class=\"beacon-selection__list\">\n        <div class=\"beacon-selection__name\">AirGap Wallet</div>\n        <div>\n          <img class=\"beacon-selection__img\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAALT0lEQVR4AeXBCXiU9Z3A8e/vfd+5kskBARYIkAsCSIRyRe5AKbhQ8CqWemGpVnF1qVKPrdoSrSiW6qq0lhZXu7UrskVQSq0VpAIGwxGgHAE5RBMIgUAyk8xkMjOZ+e/zZh9cauXNTMjx7MPnI0qpRkC4PCkDEEDj8hTVuMxpXOY02om3xsfix1/jlumP4qmu48saAiHumv1TFj/2Kp7qOtqLQRsLhxp549U/8x8vvY2vth7TkUNljBwziAsdO3KCnUWl7Cwq5U+rP+KO+ddx8x3TsNtttCWDNhKNRPnjW5tZ9twqTp88xxcUIMKXiQZKKUQEf12AlxatYOVr73PPgzcyY9Z4NE2jLeiFhYULAaGVNDZGWLdqM4/8y0usXbkJf12A84J9u1Je+M/MnjSCPrqdC3Xt1okrhmRz5FA5NWdrMfnrAnz4l538Ze3HJKUkkNOvF5qm0YqUQSs5frSCdX/YxDsrN1F91ssXFARzu1L5/dFUT87FyoRvDGP85KGsX1fM8hfXcPRgGSLC58dO8eP5L/PiohVc952JzLxxAr0zu9MaDFpIKcXBfcfZvH4XG9/bzpHSMkSELyjwj8rgzK0j8YzNBEVMRISpM0czZcYoPtq4h9d/vY4dRQcQEc6eruGVF9ew/IXVDLwyi0nTRjLhG8Ppf0UGCC1iEKNoNMqxwyfYs/0TSj4uZXvRAWrO1SIimEQEUyTZSc2MQZyd9TUCmZ1AAYq4iQjjJw9l/OShfHr4BKt+/wHvrt5CrcePiHBo/2cc2v8ZL//sv+nSLZWR4/IYPmogw/IHkNm3JyJCLAya8Unp57z09Bvs3naIQH0QEeE8EcEUdTuondiXmin98Y7JQmlCE8VXqo1GiEd2bi8efvJ2Fvz4Vor+uof164rZtL4Ef10AEeFclZf31hTx3poilFIkJrkYmj+Aex+ezYC8TKwYWAjUB5k3+ym8NT5MIkITpQjmdKVubBbe8dnUDeuNEmK2xF9JgT2JBNGIh2HTKZg6nIKpw4k0RigpPsiWD3ax9cO/8enhk4gIIkK9r4GijXv4W8lh3i1eijspgYsxsFBSXIq3xocp3D0ZX34GvhG9qR2VQaiLG5SiJf4a9pF5di/9dCeCYBLAEP5BZzGY60pjhiOVC+mGTv64PPLH5fHDhXCmsprizfvYufUAO7aWcrriHD5vPTu3ljLx6hFcjIGFqsoazit7Yhq1I3rzBaW4FFXRCFVRP7FYHfSwPLkPd7q6cjHdunfmmm8XcM23C9j5cSl33fhTTGcqa7CiYcHr8XFeJMVJRyr0nSJWKalulKJJrdeHFQ0Lfl8DTaKKcKcEOtKpaJhGFLHo3CWZaDSKyVdbjxUNC746PyZRikiKk46Ub0vAQIhFUkoiIjTx+xuwomGhIRDCpOwGEYdBR+mmGSxLyiBWdrsNh9OOKRgIYcXAQsAfxKQS7CACKOI1yeZmiiOZJNFpic6aznR7KqmaTjwS3S481XUE6huwYmAhEGjA1JhoB6WIR4JovJmSxUxHKh0h0e3CU11HQ0MIKxoWQsFGTMppgFLE49dJfZjpSKWj2OwGpnAwjBUNC4H6BkzKaQNFzHJ0O7e40uhIDocdUyAQxIqGBb+/AVPEZSMeo2xuhI6V6HZiqvc3YEXDQjAQwhR12vj/xuGyYwo2hLGiYaEhEMQUddmIR3HYh6JjOZ0OTIH6IFY0LAQCQUxRp0E8jkVC/FfgHB0pIdGJKRBowIqGhXCoEZOyG8Tr7roy3gnW0FHsdgNTONSIFQMLkcYoJmVoxKteRbnO8ykFNjdTHckki855OvBdVxdcotFWdEPHFI1EsWJgQSmFKaoLLbUp7GNT2MeFbnd25p6EbrQlTdcwKYUlDQsiNNGiitY00HDR1qLRKCYRLGlY0G06JglFaE1/CnqI0rYawxFMuk3HioEFl8tBqCGMVh+iNW0J+7nec5Q7XF1wi8bFuEVnmC0BAyFefl8AU0KCEysGFpJT3XhrfOjeBlrb2qCXtUEvzemr23krNYfBRgLx8Hp8mJJTErGiYaFzWjIme5UPhA5xNBLiW55jNKKIR1VlDaa0rilY0bDQPb0LJvsJD4LQUY5GQuwO1xMrpRQV5VWYuqd3wYqGhcycHjQJNeIo99CRFLE7WX6GQH0DpozsHljRsNA/L5MmIiTuq6CjZOt2htkSiNW+kqNomoYpd1AGVjQsfG1Ef5RSmJJ2lNERsjQ7q1NyMBBitWPrAUxKKYaMyMWKgYXUzknkXpHBkYNlJG8+iqirUUJcrrYnMceZRrKmc56GIPwfAYR/lCQ6I+2J2BBiFY0qNm/YhanfwD506pyMFYNmFEwdzpGDZeg1AZI/Po53TBaxusOVxvLkTIT2U7xlL+fOeBGBgqnDaY5GM6bfMA6lFKZuK3aBEBMBFrnTEdrXG6/8GRFQSjH9hnE0R6MZmTk9GTF2ECZ30XHce08RC7do/JNmoz3tLTlM0cY9mEaMHURW33SaoxGDO+dfj1IKBHr9fCOxqFNRDjU20G4UPPfE64gISinu+sENxEIjBleNy2NUwWBMrv2n6LLuALG4p/Zz/CpKe/jjqs3s23UU0+iJgxk5dhCxMIjRQ0/MYfaUR4g0Run5/Id4x+cQTnFi5cOwj4Fn9/MtZydSRScWugiDDRffdKSgI8TCU13H80++jkk3NB4snEOsDGKU3a8Xc+6ZyWtL30H3Buiz6H2OLbkWlMJKeTTMC/VniFe+4eLdTrmkaQbNWfSjV/DW+DDddvcMsvv1IlYacZj3wCyy+/fClLzhMF3X7KWtbG8McG9tGc1Zs2IjG9Ztw5TVL515P5xFPDTiYLMbLH55PnaHDQTSn91A4qEztJXVwRrqVZSLKd37Kc8+/ltEBJvD4JmX/xW73UY8NOLUt39vHnv2TpRSSChC9v1vYT/toy2EUdSpCF+lsuIc989dQigYRinFj57+HrkDM4iXRgvMnDWB2+bNwGRU+ek3byW26npaW2/NTjfNxpdVn/Uy76anOHvag+mmO6dx3exJtIRGCz3w+C1MuXYUJntZDbnfW4HjVB2tRYBnk9IR/l5FeRVzry+k7Fglpq9PH8mDC+fQUhotJCI8/eJ9TJgyDJO9vIb+t/2O5F0niJ0CFKAAhQAacKXhZFVKNjc507jQjq0HuHXGY5Qfr8Q0umAwz/xyPpomtJTBJdANneeWL+DR+b9g/dpi9JoAOXe9SdXtV1ExbyxRm8ZXydBsrEjNZoiRgPC/BLCJAILO3wuFwvzq53/gd8vWoaIKU8HVw/nZsvux2QwuhcEl0g2dxb+cT1bfdJb/+2qUUnT97TZSNnzCyYe+jmd8DijFhZ5ypzPa5iYWWz7YzZKF/8mJz07TRGDuvddw78PfQdOES2XQCkSEeQtmkT92ED954FdUlFVhP+Eha/5q/CN6c+q+8dQN6QmKJr10O83Zt/sIv1i8ku0f7UdEMHVPT6Pw+Xnkj82jteiFhYULAaEV9OjVlRtunkxjJMKB3ceIKoX9VC2d395L8p4Kwj2SCaan8l1nGpm6g69SUnyQpx55haVPr6CivAoRQdc1bvn+NJb8ZgGZOT1pRcqglTlddn7w6M1cf9Mknn/y92x6vwQRIXH75+Rs+4zAlT2xLVsAmUlc6PSpczx89wvsLTmCiCAiKKUYN3koC35yK1l902kLBm2kT1YPXnjtIXZvP8TSZ95k9/ZDiAiu/adwVHghsxcXqjx5jn27jiIiKKUYPDyX+/5tNiPHDKItGbSxofkDeHVNIds+2s+rS9/G6/HRf1AmX9ZvQG/652XidruYe9+1jJk4hPZg0E6uGpfHVePyuJgEt4sV7z1De9O4zGlc5gxAAVEuT+p/ABopEAN9AKm/AAAAAElFTkSuQmCC\"/>\n        </div>\n      </a>\n      </div>\r\n</div>\r\n<div id=\"beacon-android-list\"><a href=\"tezos://?type=tzip10&data={{payload}}\" target=\"_blank\"><button class=\"beacon-modal__button\">Connect Wallet</button></a></div>\r\n<div id=\"beacon-desktop-list\">\n      <a alt=\"Open in Galleon\" href=\"galleon://?type=tzip10&data={{payload}}\" target=\"_blank\" class=\"beacon-selection__list\">\n        <div class=\"beacon-selection__name\">Galleon</div>\n        <div>\n          <img class=\"beacon-selection__img\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAN6ElEQVR4Ad3BC3SW9X3A8e/v/7yX3IAQCLdwhyCKGlARRBRorbdZaWu1lx27Xlydp+txW1vtXLs2nh0723o6e13VdhU7dahzFdGCchOEAAICohAScg/kfnnzXvI+z/P/7U0lPVlGIIE31O3zEYaZqoI2OerlTLfqzzJGJnmJ7rxAOJiFVZP0bTJkJKJOoEGUanGkFMdvhxGICMNNSDNVhY62IBnBpSpcD+5SVRagZINyRiIKUilGSnDZJMZ5lYycWhFhOAhpoloBfv6Vat0vqdXbUB1DOohYEXbiOE+JJJ/GjO0QEdJFOEdquyQRdz8WDsj9av1FDCeRTjHBXx1vbPnhpIJd9SJ3cK6Es6SqqI0tU899BOtfzvkkEhcn9KgY7yFxciOcA+EsWK87Dxv7kfr2TkD4UxFTK478tQRG/U5EOBvCEKgqfjK2QrR7FaqT+YAQE3wiltR7c0aMijFEDoOkWoF6oW/gJ54EcvkgUXtZKCC3fLf4W+uKH3yonSFwGAS11vG73V9i7TcBwweR6gTr+5/+bvHfbC5+8JF6BsnhDDQRDagXexrkc3zACeSgwU8X33//tuLvPVzNIDichlrfqO3+jar/Gf7vCKsjnywu/vbrxQ8+VM8ZOAxAVfGT7Q+j/j0MM5vsRpwAaRS2vr+y+MFvvVD84PfaOQ3DAGyy689F9RsMIzfSRndLA1UvPkW6CYy3rn0x2R3P4jQMp6Be9wVY95cMM7ezDT/RRe3a1cSO15B26hcFSD6qqgzE0I/aSMB6sadAszlPrO9R/uSPGQ5qvbvUi6xkAIZ+1NevonYh51nr/t207HmT4aC+9zP14yM4BUMf6sfHqe99hz+R8qd+hnoeaadaoL77gOpq+jOcpKokE7EHUB3FeeDFuvBiXfQVb6in9vfPMxzUevdGI9dNoh/DSWqTEwKOfJnzpOLZx/DicfqrfvEp3K5O0k41MyvD+bqq0pehl9/1V6hmch50lr1L/WsvcSpeLErVC79hOKj1v4StG0UfhhS10YBauYvzQK1P6eM/BFUGUv/6SySajpN2qiPVjvgsfRhS1Pc+jGoB50Ht2tVEq49xOup5VD73a4aD+v6dqkovo6rg2ds4DxJNJ6h6/jcMRuO214nVVZN2yiKiHZM5ydDUKCp6M+fB0V//CD/ZzWCoKlX/+STpp0aN3sRJhrwRc1AKGGZNJZtofXsnQ9G0YyPxEzWknWNWqCo9jNrkYlCGkxfrouzJnzBUqkrNmv8g3VTtYminhwEpYphVPPsYyfZWzkbD1nW4kQ7SS6fjB3JJMVh7AcOo8+gh6l9fw9myrsuJTWtJK1VRnzmkGIWpDBP1fUof/yGoci6Ob3wZVEknC1NJMaDjGSY1Lz9DtKaCcxVvqKf93X2kk7H+eFIMMJJhEG+oo+qFVaTL8U1rSSdfdQQpBtUQw+DoE49g3STp0rxrK148Sro4jgmRYgBLmjW88Xva3tlLOlk3SVPJJtJGxJJiEBMjjdxIO+VP/Zzh0LjtddLFT7oxUgxoK2lUvupnuF2dDIf29/aT7GglHZxQqJUUA1LHIFlrUQbWdmA3Ddte438TQAABBBAQ+hAGRZWW3dtIB1XqSQkI5phil3AG1lruL/457ZEY//T3dzE+P4/+wmPGMf87P+Z/EFKEPxAQThIwoRA9ir79I1BlMMKjx3LuBEHKSQlgvEP4nFYy6fL14l+wbssuetz02fv4yuc/zp133EAoGKCXk5FFtPYYg9Xd2kCPcN54BkVh5OyLOGdCVIKRSlICSOgtSDKQxuZ27v2HR9l76Ci9ovEE3//FM6x6fh1f/PTNfPKjy8jOyiQ0egxNJZtpKtnCcJj9hXsxwSBDYa3ltS17eOfdMv72nk9hjCFlHzLBJyUgSd2pjrioBuln85v7eOCfH6elrZNTOdHUykM/+S3/8thzXL98ITcsX8hVf/lNUEvTzq2k0+zP30vB9R9nMKxV9h8qY/2W3bz82nYaW9rpUd/QwsP/eA/BYHibiNAjQDQRkVGh7ar+Mk5qaGrl+z99hpc37GAwYt3d/Ne6bfxu3TYcY5hXOJWrE1nMz4iRDi9E80luOMYFFauZUjCO/DG55ORk4WDw1CcSidLY0k5VbQOHj1ax/1AZXfEE/b28sYSW9ghfu/v29ZwkpNhE+9+p+o80NrXx62de4ZkXXyfhuvQwIiiKtSACRgQFVJXTcUS5e0wr8zPjnItn23PZGMmhPxFSBFRRhkJa4k2HJ9ZVH3NJCZCy6ulnV+8+WPf998pqnDmzp3PNVQvooVZRAd9TMsLg++C6EAg6gI+Ig7VKIGA4VlVHWUUNyvt8FX7Zksfn89qYGkpyNkrcsTiXXc0NpIhQXllLWUUNiKBKijJUin2+rvqYy0kBepi5tT4n1o8ckXPTpq07sYAqgyICapUZUydx3bLFiCrGMRyrqqO0vIpfteQhDJ1y0pad/IEqs2ZM5vrlV4EqIhBLJDlaXkV9YzOO46CqnEnCDf4bfQgnTbtk5U3BUPIV0kGVGVMLuGDWNKwq8USCnXvfIel6pI0qmeEQhbOmM3H8GHzf8j5FRFCrBEMhPN9HfZduV/HV7nzj1R2LKys300s4KTD/MpnmjNsryHzOgghY35I/ZjSTC8YzJncUoVCIZLKb7KxsFl5xCQcOHKa5rR0siAHHOPjWJxwOknQ9GpvbqKiqIxKNImI4WyKCquK7HggEwyFCJkA4y3xiz8YXX6QPoY+pl3/01hDe7xgEVSU/L5eLLyok6Bh6iDE0t7RRU3eC5tZOPM8lEAzSQ1XpTwQEwfU8Ao7D+Pw8ZkwrYGRODmotCBw6coza442ICOfG7Kn0Wei9vVbpI0AfsUT1S8HgxI3iyIc4BccYFi6Yx6gR2YDQ3NLG9p37SHo+p+IEAqgqA1EFRXEcBwVONLVyoqmVXgJ87o5b6IrGiMYSHK2opryiBkQYIk3GE1/z3t2g9CP0M6Xo2gvDgex9QJgeqswtnMGMKZPwrWXX3ndoj3QhAoKgpKiipN81VxbR1NbJ4aMVqCqFM6cyZ8YURAxbS/bSGY0xGKr+qvLwlL9gx6/oT+jv9tuZVRa7LxDg4aWLFpCdmUEymcQ4BmsVARQLOCjvM6KoVUSEHj5wtKySmvoGEGGoFLhpxVW8d7SSqtrj9DU2L5eii+bQnXQZNSKbg++VU11/nIEI1HZ1ZRcdP/J8K6cgnMLd93zFXLH42nVHSyuv64onKK+qpbyiBjEGVeVMHCMUzpzOtMnjQZWE67HzrYMkkknOJOA4rLxxGZve3ENrewd9BRyHlTcu5/mXNyACqHLpRYVcueASXt24jboTTfTj+9Z+pGLfuk0MQBjAvKU35yei/i4xZjrnKBwKseSKS8nMCHO4rJJj1XWcSu7IHK67djFr1m2h23XpS4DbbrmONes20+169LrmyiKq6hoZm5dLwYSxbN25j/bOLnq4ycR9Eqn4QWVlJQMRTmPCrI9cnJMbeAMYTTqoMrdwJrOnFVBaUU3psWp6zZ09nakFE1i/pYT+FFh54wq2vLmTjkiMXpdfOpdorJvDZRX0EOCaxZeRGQ6xedvbj3eM9b5c+8oaTsfhNLrajjVOnFH4hu9zBxAmRQRUwXoWtRaL4DgGYRBEaG5tp7SimrGjc7l64Xyam9tZumgB8XiCHXsO0J8RuO3mFWx+8y06IlF6zb+oEAEOHi6nr6ra4zQ2Na1+4tEHvvjIfd9QzkAYhE996atXjcoZvTZgzGirihEwThAERC1J1wUMxoAxhtb2CAcOHSHpeigDK5iQzyf+7MOsWr2GjkiU/jJCIT56wzJe3bCNrlicXpfOLSQUNLx18Aj9+RL87fjM6BdKtm7wGARhkBbfcvvFTfWda0TMdE5DVckbNZKii+cQCgYQMZRVVFNWWYuI0CM7K4PlS66gsamV3fsPAUJ/UyaO4/KiC1mzfiu+tfS6/JILAGXPwVL6s+r+oK3KfrOtZaNlkIQhmHHhsnwysp52DNcxWKoUzpzKzOlTCAUcfN+SSCTZsmMPvlr6U4VrFy3A8z127DlIX1cvLKKto4t3S8vpJxpL2rtDGa3/Xrl7N0MhDFHBkmtNOJH5dSPmQSDMIMyYMomL5syksyvKm7vexqpyKuPGjmbpwgVs27WPxpY2eglw04eXcuhIOVW1x+lL0d3GDd159MBLRzgLwtm4/XYmVMcvzEqYn5qA+yFOIRQMsGRhEVkZGVTU1PFeaQWIcCrhYJAVS6+kIxJh++4DiPBHeaNGsGLpItZv3k4kGuOPNNDRnbTFMXPiJy0H9nicJeEc5M6YQzB/zq0jfa9YkPkoFM0rZNL4fJKux/bd+4l3dzOQjFCIa6+6DBQ273iLpOvxR6osvryIzIwQm7a/RR/xOP5j3SbwUPPuVxo5R0IaBJYslWmJSTd+8uZFX92xd//19Q1NDgNRZea0ycydPZ3uZJI3Svbheh59TRw3lsWXXULJ3gMcb2zhfVLneYEnWqIj/jWyIHmC554jHYR0Gnkr4yc0TM4MmDska9StjsoSgaAIzJs7m4IJ+QhCeVUtpeVVIEJf2VkZLF+ykKamVnbtP0RKXbdNvOIkEi90BXI2NB98zSPNhGGSPXEiubnTRnzuMx9bNH3yxCtWPbN2XkNL50zEFACjQTMBA7jhcCiy8sblDR0dsepX168/4pnAft/rLIn62aXthzcr/1/kXng15OQzadZCcifPkbyCQpORP5fr77qLd8rKgHmcb/8N3VaULP16cD8AAAAASUVORK5CYII=\"/>\n        </div>\n      </a>\n      </div>\r\n<div id=\"beacon-web-list\">\n      <a alt=\"Open in Kukai\" href=\"https://preview.kukai.app?type=tzip10&data={{payload}}\" target=\"_blank\" class=\"beacon-selection__list\">\n        <div class=\"beacon-selection__name\">Kukai</div>\n        <div>\n          <img class=\"beacon-selection__img\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAF0klEQVR4AeXBb0yU9wHA8e/z44FD/gY5j91xWAODRYdJVcIwJSyx1ZkUfaFThqBN6l620VogLKuwCoettuKStTRFX1hN1jUp2jVReWNMrCAJWztKAqVEbMqBOO+AeHCcPPc8qy9MjOF5gIe7SfN8PpL2EyxMYHECixNYnMDiBBYnsDiBxQksTmBxAosTWJzA4gQWJ7A4gcXJGMjPX4eqqszl1VcPUlVVjZ7e3l7Ky8sIh8Po2bBhI+fPX0AIwbMiY0DTNDRNYy6apqFHURSOHv0ziqKgJz4+Ho+nCSEEz5IgCs6ePUN/fz9G3njjCGvWrOFZE0TY0NAQLS0fYqSgoIDKyv38P4TDYYzIRJCmadTVvUUoFELPihUr8HiOI4TgSefOnWNg4DuKijazceNGMjMzMcvrHaa7+190dNzkq69ucPNmJ3pkIuizz/5Bd3c3Ro4cqWL16tU8bXzcT1vb57S1fc4jK1euJDc3l+eeW4PL5cJuX0Vqairx8TZkWUZRFGZmQgQCAe7f/y9er5c7d+4wMPAdfr+fx4QQGJGJkLGxMd577yRGCgt/Q0VFBQvh9/vp6uqiq6uLaBJEyLFjfyEQCKAnISEBj6cJSZJYTgQRcOXKFa5du4aR6uoa3G43enJyckhMTCTSCgoKMCKzRJOTk3g8jRjZvHkzZWV/wMiOHTvZsuVF2tuv0t5+la6uLkKhEIslSRJ5eXls2fIipaU7yM7OxojMEr377jv4fPfRk5iYSGNjE5IkMZ/ExER27drNrl27mZmZoaenh97ebxkcHGR4eBif7z4PHjxgdnaWmJgYEhISSEtLw+VykZ2dw9q1a3n++Q3Y7XYWSmYJOjo6uHixDSM1NbW4XC4WKz4+nsLCQgoLC4kmgUnBYJD6+qMYeeGFYvbs2cNC+Hw+ZmZmiLSRkRGMyJj0xReXmJ6eRk9SUhINDY1IksRCXLp0kdOnm8nNzSUv71fk5OSQlZWF0+nC7XaTnp6OHkVRGBq6zd27d/F6R/jhhzt8//0A/f39BAIBvvmmBz0yJk1PT2OktvZPOJ1OFkNRFPr6+ujr6+NJpaWlnDz5PnpGRkbYuXMHc7HZbBgRREFJSQm7d/+eyJGIFkEU7N1bxs+FIAoaGhrw+/38HAiiYGzsLlVVb6KqKsudIEo6Ozv44IO/sdwJTCoqKiI2NhYjH33Uwo0bN1jOBCatW/drqqqqMaKqKjU1VYyOjrJcCZbgwIFXeOmlrRiZmJjg8OFDzM7OYpamqRhRVRWzBEvk8TThdrsx0tPzH06ceAcjQgj0+P1+jPj9PswSLFFKSgqnTp0mNjYWIxcuXODy5cvoSUpKQk9PTw/BYBA9nZ2dmCWIgPXr11NdXcN86ure4vbt28wlI+MX6JmamuLMmVbmMjo6yvnzn2CWIEL27z/A1q3bMDI1NcWhQ68TDAZ5Wm7uLzHS0vIhp069z8TEOI+EQiHa269SUVHO5OQkZslEkMfTRF9fH8PDP6JncHCQ+vo6Tpw4yZOcTheZmW683mHmomkara0fc/bsGVJSUgkEHqAoCksliKDk5GSam08TFxeHkS+//Ceffvp3nrZ9+3bmo6oqExPjKIpCJAgiLD8/n+rqGuZz/HgTvb29PKmiohKbzcZi2e2rMEsQBZWV+9m27XcYefjwIYcPH2JycpLHnE4nr732Oou1b98+zBJESWOjh6ysLIx4vcPU1tagaRqPHTz4R/buLWOhysv38fLLpZglMKBpmJacnExz81+Ji4vDyPXr12lt/ZjHJEni7beP0dR0nIyMDPSkp9tpaGikrq6epZC0n6Dj3r176ElISCApKYn5jI+PMzs7ixEhJOz2VTxNURRu3brF11//m7GxMVQ1TEpKKps2baKk5LfYbDYeCYfD+Hw+9DgcDvTIGHA4HCxVWloaZsmyTHFxMcXFxRiJiYnB4XBghsDiBBYnsDiBxQksTmBxAosTWJzA4gQWJ7A4gcUJLO5/vUsAKT+5wpMAAAAASUVORK5CYII=\"/>\n        </div>\n      </a>\n      </div>\r\n\r\n<div>\r\n  <button id=\"beacon-switch\" class=\"beacon-modal__button--outline\"></button>\r\n</div>\r\n", "css": "#beacon-main-text {\r\n  display: initial;\r\n}\r\n.beacon-selection__container {\r\n  padding: 16px 16px 0;\r\n}\r\n.beacon-selection__list {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  text-decoration: none;\r\n  padding-bottom: 24px;\r\n  align-items: center;\r\n}\r\n.beacon-selection__name {\r\n  font-size: 1.5rem;\r\n  font-weight: 600;\r\n  color: #3b3d40;\r\n}\r\n.beacon-selection__img {\r\n  width: 48px;\r\n  height: 48px;\r\n  box-shadow: 0 4px 12px 0 rgba(17, 17, 17, 0.24);\r\n  border-radius: 16px;\r\n}\r\n" } };
//# sourceMappingURL=alert-templates.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/beacon-message-events.js":
/*!*******************************************************!*\
  !*** ../beacon-sdk/dist/esm/beacon-message-events.js ***!
  \*******************************************************/
/*! exports provided: messageEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageEvents", function() { return messageEvents; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "../beacon-sdk/dist/esm/events.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ "../beacon-sdk/dist/esm/index.js");


const messageEvents = {
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].PermissionRequest]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].PERMISSION_REQUEST_SENT,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].PERMISSION_REQUEST_SUCCESS,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].PERMISSION_REQUEST_ERROR
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].PermissionResponse]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].OperationRequest]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].OPERATION_REQUEST_SENT,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].OPERATION_REQUEST_SUCCESS,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].OPERATION_REQUEST_ERROR
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].OperationResponse]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].SignPayloadRequest]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].SIGN_REQUEST_SENT,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].SIGN_REQUEST_SUCCESS,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].SIGN_REQUEST_ERROR
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].SignPayloadResponse]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].BroadcastRequest]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].BROADCAST_REQUEST_SENT,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].BROADCAST_REQUEST_SUCCESS,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].BROADCAST_REQUEST_ERROR
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].BroadcastResponse]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].Disconnect]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN
    },
    [___WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"].Error]: {
        sent: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        success: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN,
        error: _events__WEBPACK_IMPORTED_MODULE_0__["BeaconEvent"].UNKNOWN
    }
};
//# sourceMappingURL=beacon-message-events.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/clients/beacon-client/BeaconClient.js":
/*!********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/clients/beacon-client/BeaconClient.js ***!
  \********************************************************************/
/*! exports provided: BeaconClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeaconClient", function() { return BeaconClient; });
/* harmony import */ var _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/exposed-promise */ "../beacon-sdk/dist/esm/utils/exposed-promise.js");
/* harmony import */ var _utils_generate_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/generate-uuid */ "../beacon-sdk/dist/esm/utils/generate-uuid.js");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../.. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events */ "../beacon-sdk/dist/esm/events.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "../beacon-sdk/dist/esm/constants.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/**
 * The beacon client is an abstract client that handles everything that is shared between all other clients.
 * Specifically, it handles managing the beaconId and and the local keypair.
 */
class BeaconClient {
    constructor(config) {
        /** The beaconId is a public key that is used to identify one specific application (dapp or wallet).
         * This is used inside a message to specify the sender, for example.
         */
        this._beaconId = new _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"]();
        this.events = new _events__WEBPACK_IMPORTED_MODULE_4__["BeaconEventHandler"]();
        /**
         * The local keypair that is used for the communication encryption
         */
        this._keyPair = new _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"]();
        if (!config.name) {
            throw new Error('Name not set');
        }
        if (!config.storage) {
            throw new Error('Storage not set');
        }
        this.name = config.name;
        this.storage = config.storage;
        this.initSDK().catch(console.error);
    }
    get beaconId() {
        return this._beaconId.promise;
    }
    get keyPair() {
        return this._keyPair.promise;
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeBeaconEntriesFromStorage();
        });
    }
    initSDK() {
        return __awaiter(this, void 0, void 0, function* () {
            this.storage.set(___WEBPACK_IMPORTED_MODULE_3__["StorageKey"].BEACON_SDK_VERSION, _constants__WEBPACK_IMPORTED_MODULE_5__["SDK_VERSION"]).catch(console.error);
            this.loadOrCreateBeaconSecret().catch(console.error);
            return this.keyPair.then((keyPair) => {
                this._beaconId.resolve(Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["toHex"])(keyPair.publicKey));
            });
        });
    }
    removeBeaconEntriesFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const allKeys = Object.values(___WEBPACK_IMPORTED_MODULE_3__["StorageKey"]);
            yield Promise.all(allKeys.map((key) => this.storage.delete(key)));
        });
    }
    /**
     * This method tries to load the seed from storage, if it doesn't exist, a new one will be created and persisted.
     */
    loadOrCreateBeaconSecret() {
        return __awaiter(this, void 0, void 0, function* () {
            const storageValue = yield this.storage.get(___WEBPACK_IMPORTED_MODULE_3__["StorageKey"].BEACON_SDK_SECRET_SEED);
            if (storageValue && typeof storageValue === 'string') {
                this._keyPair.resolve(yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getKeypairFromSeed"])(storageValue));
            }
            else {
                const key = yield Object(_utils_generate_uuid__WEBPACK_IMPORTED_MODULE_1__["generateGUID"])();
                yield this.storage.set(___WEBPACK_IMPORTED_MODULE_3__["StorageKey"].BEACON_SDK_SECRET_SEED, key);
                this._keyPair.resolve(yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getKeypairFromSeed"])(key));
            }
        });
    }
}
//# sourceMappingURL=BeaconClient.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/clients/client/Client.js":
/*!*******************************************************!*\
  !*** ../beacon-sdk/dist/esm/clients/client/Client.js ***!
  \*******************************************************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return Client; });
/* harmony import */ var _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/exposed-promise */ "../beacon-sdk/dist/esm/utils/exposed-promise.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events */ "../beacon-sdk/dist/esm/events.js");
/* harmony import */ var _utils_available_transports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/available-transports */ "../beacon-sdk/dist/esm/utils/available-transports.js");
/* harmony import */ var _beacon_client_BeaconClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../beacon-client/BeaconClient */ "../beacon-sdk/dist/esm/clients/beacon-client/BeaconClient.js");
/* harmony import */ var _managers_AccountManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../managers/AccountManager */ "../beacon-sdk/dist/esm/managers/AccountManager.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/**
 * This abstract class handles the a big part of the logic that is shared between the dapp and wallet client.
 * For example, it selects and manages the transport and accounts.
 */
class Client extends _beacon_client_BeaconClient__WEBPACK_IMPORTED_MODULE_4__["BeaconClient"] {
    constructor(config) {
        var _a;
        super({ name: config.name, storage: config.storage });
        /**
         * How many requests can be sent after another
         */
        this.rateLimit = 2;
        /**
         * The time window in seconds in which the "rateLimit" is checked
         */
        this.rateLimitWindowInSeconds = 5;
        /**
         * Stores the times when requests have been made to determine if the rate limit has been reached
         */
        this.requestCounter = [];
        this._transport = new _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"]();
        /**
         * Returns whether or not the transport is successfully connected
         */
        this._isConnected = new _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"]();
        this.events = new _events__WEBPACK_IMPORTED_MODULE_2__["BeaconEventHandler"](config.eventHandlers);
        this.accountManager = new _managers_AccountManager__WEBPACK_IMPORTED_MODULE_5__["AccountManager"](config.storage);
        this.matrixNodes = (_a = config.matrixNodes) !== null && _a !== void 0 ? _a : [];
        this.handleResponse = (message, connectionInfo) => {
            throw new Error(`not overwritten${JSON.stringify(message)} - ${JSON.stringify(connectionInfo)}`);
        };
    }
    get transport() {
        return this._transport.promise;
    }
    get isConnected() {
        return this._isConnected.promise;
    }
    /**
     * Returns whether or not the transaport is ready
     */
    get ready() {
        return this.transport.then(() => undefined);
    }
    /**
     * Return all locally known accounts
     */
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.getAccounts();
        });
    }
    /**
     * Return the account by ID
     * @param accountIdentifier The ID of an account
     */
    getAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.getAccount(accountIdentifier);
        });
    }
    /**
     * Remove the account by ID
     * @param accountIdentifier The ID of an account
     */
    removeAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.removeAccount(accountIdentifier);
        });
    }
    /**
     * Remove all locally stored accounts
     */
    removeAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.removeAllAccounts();
        });
    }
    /**
     * Add a new request (current timestamp) to the pending requests, remove old ones and check if we are above the limit
     */
    addRequestAndCheckIfRateLimited() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date().getTime();
            this.requestCounter = this.requestCounter.filter((date) => date + this.rateLimitWindowInSeconds * 1000 > now);
            this.requestCounter.push(now);
            return this.requestCounter.length > this.rateLimit;
        });
    }
    /**
     * This method initializes the client. It will check if the connection should be established to a
     * browser extension or if the P2P transport should be used.
     *
     * @param isDapp A boolean flag indicating if this is the DAppClient or WalletClient
     * @param transport An optional transport that can be provided by the user
     */
    init(isDapp = true, transport) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._transport.status === _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromiseStatus"].RESOLVED) {
                return (yield this.transport).type;
            }
            if (transport) {
                yield this.setTransport(transport); // Let users define their own transport
                return transport.type;
            }
            else {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    const keyPair = yield this.keyPair; // We wait for keypair here so the P2P Transport creation is not delayed and causing issues
                    const setTransport = (newTransport) => __awaiter(this, void 0, void 0, function* () {
                        yield this.setTransport(newTransport);
                        resolve(newTransport.type);
                    });
                    const setBeaconTransport = () => __awaiter(this, void 0, void 0, function* () {
                        const newTransport = new ___WEBPACK_IMPORTED_MODULE_1__["P2PTransport"](this.name, keyPair, this.storage, this.events, this.matrixNodes, isDapp);
                        return setTransport(newTransport);
                    });
                    const setBeaconTransportTimeout = window.setTimeout(setBeaconTransport, 200);
                    return _utils_available_transports__WEBPACK_IMPORTED_MODULE_3__["availableTransports"].extension.then((postMessageAvailable) => __awaiter(this, void 0, void 0, function* () {
                        if (setBeaconTransportTimeout) {
                            window.clearTimeout(setBeaconTransportTimeout);
                        }
                        if (postMessageAvailable) {
                            return setTransport(new ___WEBPACK_IMPORTED_MODULE_1__["PostMessageTransport"](this.name, keyPair, this.storage, isDapp));
                        }
                        else {
                            return setBeaconTransport();
                        }
                    }));
                }));
            }
        });
    }
    /**
     * Return all known peers
     */
    getPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.transport).type === ___WEBPACK_IMPORTED_MODULE_1__["TransportType"].P2P) {
                return (yield this.transport).getPeers(); // TODO: Also support other transports?
            }
            else {
                return [];
            }
        });
    }
    /**
     * Add a new peer to the known peers
     * @param peer The new peer to add
     */
    addPeer(peer) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.transport).type === ___WEBPACK_IMPORTED_MODULE_1__["TransportType"].P2P) {
                return (yield this.transport).addPeer(peer); // TODO: Also support other transports?
            }
        });
    }
    /**
     * The method will attempt to initiate a connection using the active transport method.
     * If the method is called multiple times while it is connecting (meaning the initial connect didn't finish),
     * the transport will try to reconnect.
     */
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = yield this.transport;
            if (transport.connectionStatus === ___WEBPACK_IMPORTED_MODULE_1__["TransportStatus"].NOT_CONNECTED) {
                yield transport.connect();
                transport
                    .addListener((message, connectionInfo) => __awaiter(this, void 0, void 0, function* () {
                    if (typeof message === 'string') {
                        const deserializedMessage = (yield new ___WEBPACK_IMPORTED_MODULE_1__["Serializer"]().deserialize(message));
                        this.handleResponse(deserializedMessage, connectionInfo);
                    }
                }))
                    .catch((error) => console.log(error));
                this._isConnected.resolve(true);
            }
            else if (transport.connectionStatus === ___WEBPACK_IMPORTED_MODULE_1__["TransportStatus"].CONNECTING) {
                yield transport.reconnect();
            }
            else {
                // NO-OP
            }
            return this._isConnected.promise;
        });
    }
    /**
     * A "setter" for when the transport needs to be changed.
     */
    setTransport(transport) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._transport.isSettled()) {
                // If the promise has already been resolved we need to create a new one.
                this._transport = _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"].resolve(transport);
            }
            else {
                this._transport.resolve(transport);
            }
            yield this.events.emit(_events__WEBPACK_IMPORTED_MODULE_2__["BeaconEvent"].ACTIVE_TRANSPORT_SET, transport);
        });
    }
}
//# sourceMappingURL=Client.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/clients/dapp-client/DAppClient.js":
/*!****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/clients/dapp-client/DAppClient.js ***!
  \****************************************************************/
/*! exports provided: DAppClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAppClient", function() { return DAppClient; });
/* harmony import */ var _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/exposed-promise */ "../beacon-sdk/dist/esm/utils/exposed-promise.js");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Logger */ "../beacon-sdk/dist/esm/utils/Logger.js");
/* harmony import */ var _utils_generate_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/generate-uuid */ "../beacon-sdk/dist/esm/utils/generate-uuid.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events */ "../beacon-sdk/dist/esm/events.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants */ "../beacon-sdk/dist/esm/constants.js");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../.. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _beacon_message_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../beacon-message-events */ "../beacon-sdk/dist/esm/beacon-message-events.js");
/* harmony import */ var _utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/get-account-identifier */ "../beacon-sdk/dist/esm/utils/get-account-identifier.js");
/* harmony import */ var _types_BeaconErrorType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../types/BeaconErrorType */ "../beacon-sdk/dist/esm/types/BeaconErrorType.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"]('DAppClient');
/**
 * The DAppClient has to be used in decentralized applications. It handles all the logic related to connecting to beacon-compatible
 * wallets and sending requests.
 */
class DAppClient extends ___WEBPACK_IMPORTED_MODULE_6__["Client"] {
    constructor(config) {
        super(Object.assign({ storage: config.storage ? config.storage : new ___WEBPACK_IMPORTED_MODULE_6__["LocalStorage"]() }, config));
        /**
         * A map of requests that are currently "open", meaning we have sent them to a wallet and are still awaiting a response.
         */
        this.openRequests = new Map();
        /**
         * The currently active account. For all requests that are associated to a specific request (operation request, signing request),
         * the active account is used to determine the network and destination wallet
         */
        this._activeAccount = new _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"]();
        this.iconUrl = config.iconUrl;
        this.storage
            .get(___WEBPACK_IMPORTED_MODULE_6__["StorageKey"].ACTIVE_ACCOUNT)
            .then((activeAccountIdentifier) => __awaiter(this, void 0, void 0, function* () {
            if (activeAccountIdentifier) {
                yield this.setActiveAccount(yield this.accountManager.getAccount(activeAccountIdentifier));
            }
            else {
                yield this.setActiveAccount(undefined);
            }
        }))
            .catch((storageError) => __awaiter(this, void 0, void 0, function* () {
            yield this.setActiveAccount(undefined);
            console.error(storageError);
        }));
        this.handleResponse = (message, connectionInfo) => __awaiter(this, void 0, void 0, function* () {
            const openRequest = this.openRequests.get(message.id);
            if (openRequest) {
                if (message.type === ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].Error) {
                    openRequest.reject(message);
                }
                else {
                    openRequest.resolve({ message, connectionInfo });
                }
                this.openRequests.delete(message.id);
            }
            else {
                if (message.type === ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].Disconnect) {
                    const transport = yield this.transport;
                    if (transport.type === ___WEBPACK_IMPORTED_MODULE_6__["TransportType"].P2P) {
                        // TODO: Also handle postmessage transport
                        yield transport.removePeer({
                            name: '',
                            publicKey: message.senderId,
                            version: _constants__WEBPACK_IMPORTED_MODULE_4__["BEACON_VERSION"],
                            relayServer: ''
                        });
                        yield this.events.emit(_events__WEBPACK_IMPORTED_MODULE_3__["BeaconEvent"].P2P_CHANNEL_CLOSED);
                    }
                }
                else {
                    logger.error('handleResponse', 'no request found for id ', message.id);
                }
            }
        });
    }
    /**
     * Returns the status if the transport is connected
     */
    get isConnected() {
        return this._isConnected.promise;
    }
    init(_isDapp, transport) {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const initResponse = yield _super.init.call(this, true, transport);
            return initResponse;
        });
    }
    /**
     * Returns the active account
     */
    getActiveAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._activeAccount.promise;
        });
    }
    /**
     * Sets the active account
     *
     * @param account The account that will be set as the active account
     */
    setActiveAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._activeAccount.isSettled()) {
                // If the promise has already been resolved we need to create a new one.
                this._activeAccount = _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"].resolve(account);
            }
            else {
                this._activeAccount.resolve(account);
            }
            yield this.storage.set(___WEBPACK_IMPORTED_MODULE_6__["StorageKey"].ACTIVE_ACCOUNT, account ? account.accountIdentifier : undefined);
            yield this.events.emit(_events__WEBPACK_IMPORTED_MODULE_3__["BeaconEvent"].ACTIVE_ACCOUNT_SET, account);
            return;
        });
    }
    /**
     * Returns the metadata of this DApp
     */
    getAppMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                senderId: yield this.beaconId,
                name: this.name,
                icon: this.iconUrl
            };
        });
    }
    /**
     * The method will attempt to initiate a connection using the active transport method.
     * If the method is called multiple times while it is connecting (meaning the initial connect didn't finish),
     * the transport will try to reconnect.
     */
    connect() {
        const _super = Object.create(null, {
            _connect: { get: () => super._connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super._connect.call(this);
        });
    }
    /**
     * Will remove the account from the local storage and set a new active account if necessary.
     *
     * @param accountIdentifier ID of the account
     */
    removeAccount(accountIdentifier) {
        const _super = Object.create(null, {
            removeAccount: { get: () => super.removeAccount }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const removeAccountResult = _super.removeAccount.call(this, accountIdentifier);
            const activeAccount = yield this.getActiveAccount();
            if (activeAccount && activeAccount.accountIdentifier === accountIdentifier) {
                yield this.setActiveAccount(undefined);
            }
            return removeAccountResult;
        });
    }
    /**
     * Remove all accounts and set active account to undefined
     */
    removeAllAccounts() {
        const _super = Object.create(null, {
            removeAllAccounts: { get: () => super.removeAllAccounts }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.removeAllAccounts.call(this);
            yield this.setActiveAccount(undefined);
        });
    }
    /**
     * Removes a peer and all the accounts that have been connected through that peer
     *
     * @param peer Peer to be removed
     */
    removePeer(peer) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.transport).type === ___WEBPACK_IMPORTED_MODULE_6__["TransportType"].P2P) {
                // TODO: Allow for other transport types?
                const removePeerResult = (yield this.transport).removePeer(peer);
                yield this.removeAccountsForPeers([peer]);
                return removePeerResult;
            }
        });
    }
    /**
     * Remove all peers and all accounts that have been connected through those peers
     */
    removeAllPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.transport).type === ___WEBPACK_IMPORTED_MODULE_6__["TransportType"].P2P) {
                // TODO: Allow for other transport types?
                const peers = yield (yield this.transport).getPeers();
                const removePeerResult = (yield this.transport).removeAllPeers();
                yield this.removeAccountsForPeers(peers);
                return removePeerResult;
            }
        });
    }
    /**
     * Allows the user to subscribe to specific events that are fired in the SDK
     *
     * @param internalEvent The event to subscribe to
     * @param eventCallback The callback that will be called when the event occurs
     */
    subscribeToEvent(internalEvent, eventCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.events.on(internalEvent, eventCallback);
        });
    }
    /**
     * Check if we have permissions to send the specific message type to the active account.
     * If no active account is set, only permission requests are allowed.
     *
     * @param type The type of the message
     */
    checkPermissions(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].PermissionRequest) {
                return true;
            }
            const activeAccount = yield this.getActiveAccount();
            if (!activeAccount) {
                throw yield this.sendInternalError('No active account set!');
            }
            const permissions = activeAccount.scopes;
            switch (type) {
                case ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].OperationRequest:
                    return permissions.includes(___WEBPACK_IMPORTED_MODULE_6__["PermissionScope"].OPERATION_REQUEST);
                case ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].SignPayloadRequest:
                    return permissions.includes(___WEBPACK_IMPORTED_MODULE_6__["PermissionScope"].SIGN);
                case ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].BroadcastRequest:
                    return true;
                default:
                    return false;
            }
        });
    }
    /**
     * Send a permission request to the DApp. This should be done as the first step. The wallet will respond
     * with an publicKey and permissions that were given. The account returned will be set as the "activeAccount"
     * and will be used for the following requests.
     *
     * @param input The message details we need to prepare the PermissionRequest message.
     */
    requestPermissions(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                appMetadata: yield this.getAppMetadata(),
                type: ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].PermissionRequest,
                network: input && input.network ? input.network : { type: ___WEBPACK_IMPORTED_MODULE_6__["NetworkType"].MAINNET },
                scopes: input && input.scopes
                    ? input.scopes
                    : [___WEBPACK_IMPORTED_MODULE_6__["PermissionScope"].OPERATION_REQUEST, ___WEBPACK_IMPORTED_MODULE_6__["PermissionScope"].SIGN]
            };
            const { message, connectionInfo } = yield this.makeRequest(request).catch((requestError) => __awaiter(this, void 0, void 0, function* () {
                throw this.handleRequestError(request, requestError);
            }));
            // TODO: Migration code. Remove sometime after 1.0.0 release.
            const publicKey = message.publicKey || message.pubkey || message.pubKey;
            const address = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_5__["getAddressFromPublicKey"])(publicKey);
            const accountInfo = {
                accountIdentifier: yield Object(_utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_8__["getAccountIdentifier"])(address, message.network),
                senderId: message.senderId,
                origin: {
                    type: connectionInfo.origin,
                    id: connectionInfo.id
                },
                address,
                publicKey,
                network: message.network,
                scopes: message.scopes,
                threshold: message.threshold,
                connectedAt: new Date().getTime()
            };
            yield this.accountManager.addAccount(accountInfo);
            yield this.setActiveAccount(accountInfo);
            const { senderId, network, scopes, threshold } = message;
            const output = {
                senderId,
                address,
                network,
                scopes,
                publicKey,
                threshold
            }; // TODO: Should we return the account info here?
            yield this.notifySuccess(request, {
                account: accountInfo,
                output,
                connectionContext: connectionInfo
            });
            return output;
        });
    }
    /**
     * This method will send a "SignPayloadRequest" to the wallet. This method is meant to be used to sign
     * arbitrary data (eg. a string). It will return the signature in the format of "edsig..."
     *
     * @param input The message details we need to prepare the SignPayloadRequest message.
     */
    requestSignPayload(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.payload) {
                throw yield this.sendInternalError('Payload must be provided');
            }
            const activeAccount = yield this.getActiveAccount();
            if (!activeAccount) {
                throw yield this.sendInternalError('No active account!');
            }
            const request = {
                type: ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].SignPayloadRequest,
                payload: input.payload,
                sourceAddress: input.sourceAddress || activeAccount.address
            };
            const { message, connectionInfo } = yield this.makeRequest(request).catch((requestError) => __awaiter(this, void 0, void 0, function* () {
                throw this.handleRequestError(request, requestError);
            }));
            const { senderId, signature } = message;
            const output = { senderId, signature };
            yield this.notifySuccess(request, {
                account: activeAccount,
                output,
                connectionContext: connectionInfo
            });
            return output;
        });
    }
    /**
     * This method sends an OperationRequest to the wallet. This method should be used for all kinds of operations,
     * eg. transaction or delegation. Not all properties have to be provided. Data like "counter" and fees will be
     * fetched and calculated by the wallet (but they can still be provided if required).
     *
     * @param input The message details we need to prepare the OperationRequest message.
     */
    requestOperation(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.operationDetails) {
                throw yield this.sendInternalError('Operation details must be provided');
            }
            const activeAccount = yield this.getActiveAccount();
            if (!activeAccount) {
                throw yield this.sendInternalError('No active account!');
            }
            const request = {
                type: ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].OperationRequest,
                network: activeAccount.network || { type: ___WEBPACK_IMPORTED_MODULE_6__["NetworkType"].MAINNET },
                operationDetails: input.operationDetails,
                sourceAddress: activeAccount.address || ''
            };
            const { message, connectionInfo } = yield this.makeRequest(request).catch((requestError) => __awaiter(this, void 0, void 0, function* () {
                throw this.handleRequestError(request, requestError);
            }));
            const { senderId, transactionHash } = message;
            const output = { senderId, transactionHash };
            yield this.notifySuccess(request, {
                account: activeAccount,
                output,
                connectionContext: connectionInfo
            });
            return { senderId, transactionHash };
        });
    }
    /**
     * Sends a "BroadcastRequest" to the wallet. This method can be used to inject an already signed transaction
     * to the network.
     *
     * @param input The message details we need to prepare the BroadcastRequest message.
     */
    requestBroadcast(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.signedTransaction) {
                throw yield this.sendInternalError('Signed transaction must be provided');
            }
            const network = input.network || { type: ___WEBPACK_IMPORTED_MODULE_6__["NetworkType"].MAINNET };
            const request = {
                type: ___WEBPACK_IMPORTED_MODULE_6__["BeaconMessageType"].BroadcastRequest,
                network,
                signedTransaction: input.signedTransaction
            };
            const { message, connectionInfo } = yield this.makeRequest(request).catch((requestError) => __awaiter(this, void 0, void 0, function* () {
                throw this.handleRequestError(request, requestError);
            }));
            const { senderId, transactionHash } = message;
            const output = { senderId, transactionHash };
            yield this.notifySuccess(request, { network, output, connectionContext: connectionInfo });
            return { senderId, transactionHash };
        });
    }
    /**
     * This method will emit an internal error message.
     *
     * @param errorMessage The error message to send.
     */
    sendInternalError(errorMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.events.emit(_events__WEBPACK_IMPORTED_MODULE_3__["BeaconEvent"].INTERNAL_ERROR, errorMessage);
            throw new Error(errorMessage);
        });
    }
    /**
     * This method will remove all accounts associated with a specific peer.
     *
     * @param peersToRemove An array of peers for which accounts should be removed
     */
    removeAccountsForPeers(peersToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield this.accountManager.getAccounts();
            const peerIdsToRemove = peersToRemove.map((peer) => peer.publicKey);
            // Remove all accounts with origin of the specified peer
            const accountsToRemove = accounts.filter((account) => peerIdsToRemove.includes(account.origin.id));
            const accountIdentifiersToRemove = accountsToRemove.map((accountInfo) => accountInfo.accountIdentifier);
            yield this.accountManager.removeAccounts(accountIdentifiersToRemove);
            // Check if one of the accounts that was removed was the active account and if yes, set it to undefined
            const activeAccount = yield this.getActiveAccount();
            if (activeAccount) {
                if (accountIdentifiersToRemove.includes(activeAccount.accountIdentifier)) {
                    yield this.setActiveAccount(undefined);
                }
            }
        });
    }
    /**
     * This message handles errors that we receive from the wallet.
     *
     * @param request The request we sent
     * @param beaconError The error we received
     */
    handleRequestError(request, beaconError) {
        return __awaiter(this, void 0, void 0, function* () {
            if (beaconError.errorType) {
                let errorCallback = () => Promise.resolve();
                if (beaconError.errorType === _types_BeaconErrorType__WEBPACK_IMPORTED_MODULE_9__["BeaconErrorType"].NO_PRIVATE_KEY_FOUND_ERROR) {
                    errorCallback = () => __awaiter(this, void 0, void 0, function* () {
                        const operationRequest = request;
                        // if the account we requested is not available, we remove it locally
                        let accountInfo;
                        if (operationRequest.sourceAddress && operationRequest.network) {
                            const accountIdentifier = yield Object(_utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_8__["getAccountIdentifier"])(operationRequest.sourceAddress, operationRequest.network);
                            accountInfo = yield this.getAccount(accountIdentifier);
                            if (accountInfo) {
                                yield this.removeAccount(accountInfo.accountIdentifier);
                            }
                        }
                        // // Check if we currently have an active account. This shouldn't be the case because it has been removed above.
                        // // But because there could be a huge delay between request/response, it's possible that it has been set to a different account.
                        // const activeAccount = await this.getActiveAccount()
                        // if (!activeAccount) {
                        //   // send new permission request
                        //   await this.requestPermissions({
                        //     network: accountInfo?.network,
                        //     scopes: accountInfo?.scopes
                        //   })
                        // }
                        // // send operation again
                        // await this.requestOperation({ operationDetails: operationRequest.operationDetails })
                    });
                }
                this.events
                    .emit(_beacon_message_events__WEBPACK_IMPORTED_MODULE_7__["messageEvents"][request.type].error, beaconError, errorCallback)
                    .catch((emitError) => console.warn(emitError));
                throw ___WEBPACK_IMPORTED_MODULE_6__["BeaconError"].getError(beaconError.errorType);
            }
            console.error('requestError', beaconError);
            throw beaconError;
        });
    }
    /**
     * This message will send an event when we receive a successful response to one of the requests we sent.
     *
     * @param request The request we sent
     * @param response The response we received
     */
    notifySuccess(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.events
                .emit(_beacon_message_events__WEBPACK_IMPORTED_MODULE_7__["messageEvents"][request.type].success, response)
                .catch((emitError) => console.warn(emitError));
        });
    }
    /**
     * This method handles sending of requests to the DApp. It makes sure that the DAppClient is initialized and connected
     * to the transport. After that rate limits and permissions will be checked, an ID is attached and the request is sent
     * to the DApp over the transport.
     *
     * @param requestInput The BeaconMessage to be sent to the wallet
     * @param account The account that the message will be sent to
     */
    makeRequest(requestInput, account) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('makeRequest');
            yield this.init();
            logger.log('makeRequest', 'after init');
            yield this.connect();
            logger.log('makeRequest', 'after connecting');
            if (yield this.addRequestAndCheckIfRateLimited()) {
                this.events
                    .emit(_events__WEBPACK_IMPORTED_MODULE_3__["BeaconEvent"].LOCAL_RATE_LIMIT_REACHED)
                    .catch((emitError) => console.warn(emitError));
                throw new Error('rate limit reached');
            }
            if (!(yield this.checkPermissions(requestInput.type))) {
                this.events.emit(_events__WEBPACK_IMPORTED_MODULE_3__["BeaconEvent"].NO_PERMISSIONS).catch((emitError) => console.warn(emitError));
                throw new Error('No permissions to send this request to wallet!');
            }
            if (!this.beaconId) {
                throw yield this.sendInternalError('BeaconID not defined');
            }
            const request = Object.assign({ id: yield Object(_utils_generate_uuid__WEBPACK_IMPORTED_MODULE_2__["generateGUID"])(), version: _constants__WEBPACK_IMPORTED_MODULE_4__["BEACON_VERSION"], senderId: yield this.beaconId }, requestInput);
            const exposed = new _utils_exposed_promise__WEBPACK_IMPORTED_MODULE_0__["ExposedPromise"]();
            this.addOpenRequest(request.id, exposed);
            const payload = yield new ___WEBPACK_IMPORTED_MODULE_6__["Serializer"]().serialize(request);
            let origin;
            if (account) {
                origin = account.senderId;
            }
            yield (yield this.transport).send(payload, origin);
            this.events
                .emit(_beacon_message_events__WEBPACK_IMPORTED_MODULE_7__["messageEvents"][requestInput.type].sent)
                .catch((emitError) => console.warn(emitError));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return exposed.promise; // TODO: fix type
        });
    }
    /**
     * Adds a requests to the "openRequests" set so we know what messages have already been answered/handled.
     *
     * @param id The ID of the message
     * @param promise A promise that resolves once the response for that specific message is received
     */
    addOpenRequest(id, promise) {
        logger.log('addOpenRequest', this.name, `adding request ${id} and waiting for answer`);
        this.openRequests.set(id, promise);
    }
}
//# sourceMappingURL=DAppClient.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/clients/wallet-client/WalletClient.js":
/*!********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/clients/wallet-client/WalletClient.js ***!
  \********************************************************************/
/*! exports provided: WalletClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletClient", function() { return WalletClient; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../.. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _managers_PermissionManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../managers/PermissionManager */ "../beacon-sdk/dist/esm/managers/PermissionManager.js");
/* harmony import */ var _managers_AppMetadataManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../managers/AppMetadataManager */ "../beacon-sdk/dist/esm/managers/AppMetadataManager.js");
/* harmony import */ var _interceptors_IncomingRequestInterceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../interceptors/IncomingRequestInterceptor */ "../beacon-sdk/dist/esm/interceptors/IncomingRequestInterceptor.js");
/* harmony import */ var _interceptors_OutgoingResponseInterceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../interceptors/OutgoingResponseInterceptor */ "../beacon-sdk/dist/esm/interceptors/OutgoingResponseInterceptor.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





/**
 * The WalletClient has to be used in the wallet. It handles all the logic related to connecting to beacon-compatible
 * dapps and handling/responding to requests.
 */
class WalletClient extends ___WEBPACK_IMPORTED_MODULE_0__["Client"] {
    constructor(config) {
        super(Object.assign({ storage: new ___WEBPACK_IMPORTED_MODULE_0__["LocalStorage"]() }, config));
        /**
         * This array stores pending requests, meaning requests we received and have not yet handled / sent a response.
         */
        this.pendingRequests = [];
        this.permissionManager = new _managers_PermissionManager__WEBPACK_IMPORTED_MODULE_1__["PermissionManager"](new ___WEBPACK_IMPORTED_MODULE_0__["LocalStorage"]());
        this.appMetadataManager = new _managers_AppMetadataManager__WEBPACK_IMPORTED_MODULE_2__["AppMetadataManager"](new ___WEBPACK_IMPORTED_MODULE_0__["LocalStorage"]());
    }
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.init.call(this, false);
        });
    }
    /**
     * This method initiates a connection to the P2P network and registers a callback that will be called
     * whenever a message is received.
     *
     * @param newMessageCallback The callback that will be invoked for every message the transport receives.
     */
    connect(newMessageCallback) {
        const _super = Object.create(null, {
            _connect: { get: () => super._connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.handleResponse = (message, connectionInfo) => __awaiter(this, void 0, void 0, function* () {
                if (!this.pendingRequests.some((request) => request.id === message.id)) {
                    this.pendingRequests.push(message);
                    yield _interceptors_IncomingRequestInterceptor__WEBPACK_IMPORTED_MODULE_3__["IncomingRequestInterceptor"].intercept({
                        message,
                        connectionInfo,
                        appMetadataManager: this.appMetadataManager,
                        interceptorCallback: newMessageCallback
                    });
                }
            });
            return _super._connect.call(this);
        });
    }
    /**
     * This method sends a response for a specific request back to the DApp
     *
     * @param message The BeaconResponseMessage that will be sent back to the DApp
     */
    respond(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.pendingRequests.find((pendingRequest) => pendingRequest.id === message.id);
            if (!request) {
                throw new Error('No matching request found!');
            }
            this.pendingRequests = this.pendingRequests.filter((pendingRequest) => pendingRequest.id !== message.id);
            yield _interceptors_OutgoingResponseInterceptor__WEBPACK_IMPORTED_MODULE_4__["OutgoingResponseInterceptor"].intercept({
                senderId: yield this.beaconId,
                request,
                message,
                permissionManager: this.permissionManager,
                appMetadataManager: this.appMetadataManager,
                interceptorCallback: (response) => __awaiter(this, void 0, void 0, function* () {
                    yield this.respondToMessage(response);
                })
            });
        });
    }
    getAppMetadataList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.getAppMetadataList();
        });
    }
    getAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.getAppMetadata(senderId);
        });
    }
    removeAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.removeAppMetadata(senderId);
        });
    }
    removeAllAppMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.removeAllAppMetadata();
        });
    }
    getPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.getPermissions();
        });
    }
    getPermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.getPermission(accountIdentifier);
        });
    }
    removePermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.removePermission(accountIdentifier);
        });
    }
    removeAllPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.removeAllPermissions();
        });
    }
    removePeer(peer) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.transport).type === ___WEBPACK_IMPORTED_MODULE_0__["TransportType"].P2P) {
                const removePeerResult = (yield this.transport).removePeer(peer);
                yield this.removePermissionsForPeers([peer]);
                return removePeerResult;
            }
        });
    }
    removeAllPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.transport).type === ___WEBPACK_IMPORTED_MODULE_0__["TransportType"].P2P) {
                const peers = yield (yield this.transport).getPeers();
                const removePeerResult = (yield this.transport).removeAllPeers();
                yield this.removePermissionsForPeers(peers);
                return removePeerResult;
            }
        });
    }
    removePermissionsForPeers(peersToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissions = yield this.permissionManager.getPermissions();
            const peerIdsToRemove = peersToRemove.map((peer) => peer.publicKey);
            // Remove all permissions with origin of the specified peer
            const permissionsToRemove = permissions.filter((permission) => peerIdsToRemove.includes(permission.appMetadata.senderId));
            const permissionIdentifiersToRemove = permissionsToRemove.map((permissionInfo) => permissionInfo.accountIdentifier);
            yield this.permissionManager.removePermissions(permissionIdentifiersToRemove);
        });
    }
    /**
     * An internal method to send a BeaconMessage to the DApp
     *
     * @param message Send a message back to the DApp
     */
    respondToMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedMessage = yield new ___WEBPACK_IMPORTED_MODULE_0__["Serializer"]().serialize(message);
            yield (yield this.transport).send(serializedMessage);
        });
    }
}
//# sourceMappingURL=WalletClient.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/constants.js":
/*!*******************************************!*\
  !*** ../beacon-sdk/dist/esm/constants.js ***!
  \*******************************************/
/*! exports provided: SDK_VERSION, BEACON_VERSION, DEBUG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDK_VERSION", function() { return SDK_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BEACON_VERSION", function() { return BEACON_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBUG", function() { return DEBUG; });
const SDK_VERSION = '2.0.0-beta.10';
const BEACON_VERSION = '2';
const DEBUG = false;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/AbortedBeaconError.js":
/*!***********************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/AbortedBeaconError.js ***!
  \***********************************************************/
/*! exports provided: AbortedBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbortedBeaconError", function() { return AbortedBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class AbortedBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].ABORTED_ERROR, 'The action was aborted by the user.');
        this.name = 'UnknownBeaconError';
        this.title = 'Error';
    }
}
//# sourceMappingURL=AbortedBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/BeaconError.js":
/*!****************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/BeaconError.js ***!
  \****************************************************/
/*! exports provided: BeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeaconError", function() { return BeaconError; });
/* harmony import */ var _utils_assert_never__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/assert-never */ "../beacon-sdk/dist/esm/utils/assert-never.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");


class BeaconError {
    constructor(errorType, message) {
        this.name = 'BeaconError';
        this.title = 'Error'; // Visible in the UI
        this.message = `[${errorType}]:${message}`;
        this.description = message;
    }
    static getError(errorType) {
        switch (errorType) {
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].BROADCAST_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["NetworkNotSupportedBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].NETWORK_NOT_SUPPORTED:
                return new ___WEBPACK_IMPORTED_MODULE_1__["NetworkNotSupportedBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].NO_ADDRESS_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["NoAddressBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].NO_PRIVATE_KEY_FOUND_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["NoPrivateKeyBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].NOT_GRANTED_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["NotGrantedBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].PARAMETERS_INVALID_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["ParametersInvalidBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].TOO_MANY_OPERATIONS:
                return new ___WEBPACK_IMPORTED_MODULE_1__["TooManyOperationsBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].TRANSACTION_INVALID_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["TransactionInvalidBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].ABORTED_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["AbortedBeaconError"]();
            case ___WEBPACK_IMPORTED_MODULE_1__["BeaconErrorType"].UNKNOWN_ERROR:
                return new ___WEBPACK_IMPORTED_MODULE_1__["UnknownBeaconError"]();
            default:
                Object(_utils_assert_never__WEBPACK_IMPORTED_MODULE_0__["assertNever"])(errorType);
        }
    }
}
//# sourceMappingURL=BeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/BroadcastBeaconError.js":
/*!*************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/BroadcastBeaconError.js ***!
  \*************************************************************/
/*! exports provided: BroadcastBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BroadcastBeaconError", function() { return BroadcastBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class BroadcastBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].BROADCAST_ERROR, 'The transaction could not be broadcast to the network. Please try again.');
        this.name = 'BroadcastBeaconError';
        this.title = 'Broadcast Error';
    }
}
//# sourceMappingURL=BroadcastBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/NetworkNotSupportedBeaconError.js":
/*!***********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/NetworkNotSupportedBeaconError.js ***!
  \***********************************************************************/
/*! exports provided: NetworkNotSupportedBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkNotSupportedBeaconError", function() { return NetworkNotSupportedBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class NetworkNotSupportedBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].NETWORK_NOT_SUPPORTED, 'The wallet does not support this network. Please select another one.');
        this.name = 'NetworkNotSupportedBeaconError';
        this.title = 'Network Error';
    }
}
//# sourceMappingURL=NetworkNotSupportedBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/NoAddressBeaconError.js":
/*!*************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/NoAddressBeaconError.js ***!
  \*************************************************************/
/*! exports provided: NoAddressBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoAddressBeaconError", function() { return NoAddressBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class NoAddressBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].NO_ADDRESS_ERROR, 'The wallet does not have an account set up. Please make sure to set up your wallet and try again.');
        this.name = 'NoAddressBeaconError';
        this.title = 'No Address';
    }
}
//# sourceMappingURL=NoAddressBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/NoPrivateKeyBeaconError.js":
/*!****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/NoPrivateKeyBeaconError.js ***!
  \****************************************************************/
/*! exports provided: NoPrivateKeyBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoPrivateKeyBeaconError", function() { return NoPrivateKeyBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class NoPrivateKeyBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].NO_PRIVATE_KEY_FOUND_ERROR, 'The account you are trying to interact with is not available. Please make sure to add the account to your wallet and try again.');
        this.name = 'NoPrivateKeyBeaconError';
        this.title = 'Account Not Found';
    }
}
//# sourceMappingURL=NoPrivateKeyBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/NotGrantedBeaconError.js":
/*!**************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/NotGrantedBeaconError.js ***!
  \**************************************************************/
/*! exports provided: NotGrantedBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotGrantedBeaconError", function() { return NotGrantedBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class NotGrantedBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].NOT_GRANTED_ERROR, 'You do not have the necessary permissions to perform this action. Please initiate another permission request and give the necessary permissions.');
        this.name = 'NotGrantedBeaconError';
        this.title = 'Permission Not Granted';
    }
}
//# sourceMappingURL=NotGrantedBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/ParametersInvalidBeaconError.js":
/*!*********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/ParametersInvalidBeaconError.js ***!
  \*********************************************************************/
/*! exports provided: ParametersInvalidBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParametersInvalidBeaconError", function() { return ParametersInvalidBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class ParametersInvalidBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].PARAMETERS_INVALID_ERROR, 'Some of the parameters you provided are invalid and the request could not be completed. Please check your inputs and try again.');
        this.name = 'ParametersInvalidBeaconError';
        this.title = 'Parameters Invalid';
    }
}
//# sourceMappingURL=ParametersInvalidBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/TooManyOperationsBeaconError.js":
/*!*********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/TooManyOperationsBeaconError.js ***!
  \*********************************************************************/
/*! exports provided: TooManyOperationsBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooManyOperationsBeaconError", function() { return TooManyOperationsBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class TooManyOperationsBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].TOO_MANY_OPERATIONS, 'The request contains too many transactions. Please include fewer operations and try again.');
        this.name = 'TooManyOperationsBeaconError';
        this.title = 'Too Many Operations';
    }
}
//# sourceMappingURL=TooManyOperationsBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/TransactionInvalidBeaconError.js":
/*!**********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/TransactionInvalidBeaconError.js ***!
  \**********************************************************************/
/*! exports provided: TransactionInvalidBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionInvalidBeaconError", function() { return TransactionInvalidBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class TransactionInvalidBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].TRANSACTION_INVALID_ERROR, 'The transaction is invalid and the node did not accept it.');
        this.name = 'TransactionInvalidBeaconError';
        this.title = 'Transaction Invalid';
    }
}
//# sourceMappingURL=TransactionInvalidBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/errors/UnknownBeaconError.js":
/*!***********************************************************!*\
  !*** ../beacon-sdk/dist/esm/errors/UnknownBeaconError.js ***!
  \***********************************************************/
/*! exports provided: UnknownBeaconError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnknownBeaconError", function() { return UnknownBeaconError; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");

class UnknownBeaconError extends ___WEBPACK_IMPORTED_MODULE_0__["BeaconError"] {
    constructor() {
        super(___WEBPACK_IMPORTED_MODULE_0__["BeaconErrorType"].UNKNOWN_ERROR, 'An unknown error occured. Please try again or report it to a developer.');
        this.name = 'UnknownBeaconError';
        this.title = 'Error';
    }
}
//# sourceMappingURL=UnknownBeaconError.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/events.js":
/*!****************************************!*\
  !*** ../beacon-sdk/dist/esm/events.js ***!
  \****************************************/
/*! exports provided: BeaconEvent, defaultEventCallbacks, BeaconEventHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeaconEvent", function() { return BeaconEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultEventCallbacks", function() { return defaultEventCallbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeaconEventHandler", function() { return BeaconEventHandler; });
/* harmony import */ var _utils_get_tzip10_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/get-tzip10-link */ "../beacon-sdk/dist/esm/utils/get-tzip10-link.js");
/* harmony import */ var _alert_Toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alert/Toast */ "../beacon-sdk/dist/esm/alert/Toast.js");
/* harmony import */ var _alert_Alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alert/Alert */ "../beacon-sdk/dist/esm/alert/Alert.js");
/* harmony import */ var _utils_qr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/qr */ "../beacon-sdk/dist/esm/utils/qr.js");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Logger */ "../beacon-sdk/dist/esm/utils/Logger.js");
/* harmony import */ var _errors_BeaconError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors/BeaconError */ "../beacon-sdk/dist/esm/errors/BeaconError.js");
/* harmony import */ var _Serializer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Serializer */ "../beacon-sdk/dist/esm/Serializer.js");
/* harmony import */ var _utils_block_explorer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/block-explorer */ "../beacon-sdk/dist/esm/utils/block-explorer.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! . */ "../beacon-sdk/dist/esm/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









const logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"]('BeaconEvents');
const serializer = new _Serializer__WEBPACK_IMPORTED_MODULE_6__["Serializer"]();
/**
 * The different events that can be emitted by the beacon-sdk
 */
var BeaconEvent;
(function (BeaconEvent) {
    BeaconEvent["PERMISSION_REQUEST_SENT"] = "PERMISSION_REQUEST_SENT";
    BeaconEvent["PERMISSION_REQUEST_SUCCESS"] = "PERMISSION_REQUEST_SUCCESS";
    BeaconEvent["PERMISSION_REQUEST_ERROR"] = "PERMISSION_REQUEST_ERROR";
    BeaconEvent["OPERATION_REQUEST_SENT"] = "OPERATION_REQUEST_SENT";
    BeaconEvent["OPERATION_REQUEST_SUCCESS"] = "OPERATION_REQUEST_SUCCESS";
    BeaconEvent["OPERATION_REQUEST_ERROR"] = "OPERATION_REQUEST_ERROR";
    BeaconEvent["SIGN_REQUEST_SENT"] = "SIGN_REQUEST_SENT";
    BeaconEvent["SIGN_REQUEST_SUCCESS"] = "SIGN_REQUEST_SUCCESS";
    BeaconEvent["SIGN_REQUEST_ERROR"] = "SIGN_REQUEST_ERROR";
    BeaconEvent["BROADCAST_REQUEST_SENT"] = "BROADCAST_REQUEST_SENT";
    BeaconEvent["BROADCAST_REQUEST_SUCCESS"] = "BROADCAST_REQUEST_SUCCESS";
    BeaconEvent["BROADCAST_REQUEST_ERROR"] = "BROADCAST_REQUEST_ERROR";
    BeaconEvent["LOCAL_RATE_LIMIT_REACHED"] = "LOCAL_RATE_LIMIT_REACHED";
    BeaconEvent["NO_PERMISSIONS"] = "NO_PERMISSIONS";
    BeaconEvent["ACTIVE_ACCOUNT_SET"] = "ACTIVE_ACCOUNT_SET";
    BeaconEvent["ACTIVE_TRANSPORT_SET"] = "ACTIVE_TRANSPORT_SET";
    BeaconEvent["P2P_CHANNEL_CONNECT_SUCCESS"] = "P2P_CHANNEL_CONNECT_SUCCESS";
    BeaconEvent["P2P_LISTEN_FOR_CHANNEL_OPEN"] = "P2P_LISTEN_FOR_CHANNEL_OPEN";
    BeaconEvent["P2P_CHANNEL_CLOSED"] = "P2P_CHANNEL_CLOSED";
    BeaconEvent["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    BeaconEvent["UNKNOWN"] = "UNKNOWN";
})(BeaconEvent || (BeaconEvent = {}));
/**
 * Show a "Request sent" toast
 */
const showSentToast = () => __awaiter(void 0, void 0, void 0, function* () {
    Object(_alert_Toast__WEBPACK_IMPORTED_MODULE_1__["openToast"])({ body: 'Request sent', timer: 3000 }).catch((toastError) => console.error(toastError));
});
/**
 * Show a "No Permission" alert
 */
const showNoPermissionAlert = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])({
        title: 'No Permission',
        body: 'Please allow the wallet to handle this type of request.'
    });
});
/**
 * Show an error alert
 *
 * @param beaconError The beacon error
 */
const showErrorAlert = (beaconError, buttons) => __awaiter(void 0, void 0, void 0, function* () {
    const error = beaconError.errorType
        ? _errors_BeaconError__WEBPACK_IMPORTED_MODULE_5__["BeaconError"].getError(beaconError.errorType)
        : new ___WEBPACK_IMPORTED_MODULE_8__["UnknownBeaconError"]();
    console.log('showing error alert type ', beaconError.errorType);
    if (buttons) {
        // eslint-disable-next-line @typescript-eslint/tslint/config
    }
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])({
        title: error.title,
        body: error.description
    });
});
/**
 * Show a rate limit reached toast
 */
const showRateLimitReached = () => __awaiter(void 0, void 0, void 0, function* () {
    Object(_alert_Toast__WEBPACK_IMPORTED_MODULE_1__["openToast"])({
        body: 'Rate limit reached. Please slow down',
        timer: 3000
    }).catch((toastError) => console.error(toastError));
});
/**
 * Show a "connection successful" alert for 1.5 seconds
 */
const showBeaconConnectedAlert = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])({
        title: 'Success',
        body: 'A wallet has been paired over the beacon network.',
        confirmButtonText: 'Done',
        timer: 1500
    });
});
/**
 * Show a "channel closed" alert for 1.5 seconds
 */
const showChannelClosedAlert = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])({
        title: 'Channel closed',
        body: `Your peer has closed the connection.`,
        confirmButtonText: 'Done',
        timer: 1500
    });
});
const showInternalErrorAlert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const alertConfig = {
        title: 'Internal Error',
        confirmButtonText: 'Done',
        body: `${data}`,
        confirmCallback: () => undefined
    };
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])(alertConfig);
});
/**
 * Show a connect alert with QR code
 *
 * @param data The data that is emitted by the P2P_LISTEN_FOR_CHANNEL_OPEN event
 */
const showQrCode = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const dataString = JSON.stringify(data);
    console.log(dataString);
    const base58encoded = yield serializer.serialize(data);
    console.log(base58encoded);
    const uri = Object(_utils_get_tzip10_link__WEBPACK_IMPORTED_MODULE_0__["getTzip10Link"])('tezos://', base58encoded);
    // const childWindow = window.open() as Window
    // childWindow.opener = null
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // childWindow.location = uri as any
    const alertConfig = {
        title: 'Pair with Wallet',
        body: `${Object(_utils_qr__WEBPACK_IMPORTED_MODULE_3__["getQrData"])(uri, 'svg')}<p>Don't know what to do with this QR code? <a href="https://docs.walletbeacon.io/supported-wallets.html" target="_blank">Learn more</a>.</p>`,
        pairingPayload: base58encoded
    };
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])(alertConfig);
});
/**
 * Show a "Permission Granted" alert
 *
 * @param data The data that is emitted by the PERMISSION_REQUEST_SUCCESS event
 */
const showPermissionSuccessAlert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, output } = data;
    const alertConfig = {
        title: 'Permission Granted',
        body: `We received permissions for the address <strong>${output.address}</strong>
    <br>
    <br>
    Network: <strong>${output.network.type}</strong>
    <br>
    Permissions: <strong>${output.scopes}</strong>`,
        confirmButtonText: 'Done',
        confirmCallback: () => undefined,
        actionButtonText: 'Open Blockexplorer',
        actionCallback: () => __awaiter(void 0, void 0, void 0, function* () {
            const link = yield Object(_utils_block_explorer__WEBPACK_IMPORTED_MODULE_7__["getAccountBlockExplorerLinkForNetwork"])(account.network, output.address);
            window.open(link, '_blank');
        })
    };
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])(alertConfig);
});
/**
 * Show an "Operation Broadcasted" alert
 *
 * @param data The data that is emitted by the OPERATION_REQUEST_SUCCESS event
 */
const showOperationSuccessAlert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, output } = data;
    const alertConfig = {
        title: 'Operation Broadcasted',
        body: `The transaction has successfully been broadcasted to the network with the following hash. <strong>${output.transactionHash}</strong>`,
        confirmButtonText: 'Done',
        confirmCallback: () => undefined,
        actionButtonText: 'Open Blockexplorer',
        actionCallback: () => __awaiter(void 0, void 0, void 0, function* () {
            const link = yield Object(_utils_block_explorer__WEBPACK_IMPORTED_MODULE_7__["getTransactionBlockExplorerLinkForNetwork"])(account.network, output.transactionHash);
            window.open(link, '_blank');
        })
    };
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])(alertConfig);
});
/**
 * Show a "Transaction Signed" alert
 *
 * @param data The data that is emitted by the SIGN_REQUEST_SUCCESS event
 */
const showSignSuccessAlert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const output = data.output;
    const alertConfig = {
        title: 'Payload signed',
        body: `The payload has successfully been signed.
    <br>
    Signature: <strong>${output.signature}</strong>`,
        confirmButtonText: 'Done',
        confirmCallback: () => undefined
    };
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])(alertConfig);
});
/**
 * Show a "Broadcasted" alert
 *
 * @param data The data that is emitted by the BROADCAST_REQUEST_SUCCESS event
 */
const showBroadcastSuccessAlert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { network, output } = data;
    const alertConfig = {
        title: 'Broadcasted',
        body: `The transaction has successfully been broadcasted to the network with the following hash. <strong>${output.transactionHash}</strong>`,
        confirmButtonText: 'Done',
        confirmCallback: () => undefined,
        actionButtonText: 'Open Blockexplorer',
        actionCallback: () => __awaiter(void 0, void 0, void 0, function* () {
            const link = yield Object(_utils_block_explorer__WEBPACK_IMPORTED_MODULE_7__["getTransactionBlockExplorerLinkForNetwork"])(network, output.transactionHash);
            window.open(link, '_blank');
        })
    };
    yield Object(_alert_Alert__WEBPACK_IMPORTED_MODULE_2__["openAlert"])(alertConfig);
});
const emptyHandler = (eventType) => (data) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log('emptyHandler', eventType, data);
});
/**
 * The default event handlers
 */
const defaultEventCallbacks = {
    [BeaconEvent.PERMISSION_REQUEST_SENT]: showSentToast,
    [BeaconEvent.PERMISSION_REQUEST_SUCCESS]: showPermissionSuccessAlert,
    [BeaconEvent.PERMISSION_REQUEST_ERROR]: showErrorAlert,
    [BeaconEvent.OPERATION_REQUEST_SENT]: showSentToast,
    [BeaconEvent.OPERATION_REQUEST_SUCCESS]: showOperationSuccessAlert,
    [BeaconEvent.OPERATION_REQUEST_ERROR]: showErrorAlert,
    [BeaconEvent.SIGN_REQUEST_SENT]: showSentToast,
    [BeaconEvent.SIGN_REQUEST_SUCCESS]: showSignSuccessAlert,
    [BeaconEvent.SIGN_REQUEST_ERROR]: showErrorAlert,
    [BeaconEvent.BROADCAST_REQUEST_SENT]: showSentToast,
    [BeaconEvent.BROADCAST_REQUEST_SUCCESS]: showBroadcastSuccessAlert,
    [BeaconEvent.BROADCAST_REQUEST_ERROR]: showErrorAlert,
    [BeaconEvent.LOCAL_RATE_LIMIT_REACHED]: showRateLimitReached,
    [BeaconEvent.NO_PERMISSIONS]: showNoPermissionAlert,
    [BeaconEvent.ACTIVE_ACCOUNT_SET]: emptyHandler(BeaconEvent.ACTIVE_ACCOUNT_SET),
    [BeaconEvent.ACTIVE_TRANSPORT_SET]: emptyHandler(BeaconEvent.ACTIVE_TRANSPORT_SET),
    [BeaconEvent.P2P_CHANNEL_CONNECT_SUCCESS]: showBeaconConnectedAlert,
    [BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]: showQrCode,
    [BeaconEvent.P2P_CHANNEL_CLOSED]: showChannelClosedAlert,
    [BeaconEvent.INTERNAL_ERROR]: showInternalErrorAlert,
    [BeaconEvent.UNKNOWN]: emptyHandler(BeaconEvent.UNKNOWN)
};
/**
 * Handles beacon events
 */
class BeaconEventHandler {
    constructor(eventsToOverride = {}) {
        this.callbackMap = {
            [BeaconEvent.PERMISSION_REQUEST_SENT]: [defaultEventCallbacks.PERMISSION_REQUEST_SENT],
            [BeaconEvent.PERMISSION_REQUEST_SUCCESS]: [defaultEventCallbacks.PERMISSION_REQUEST_SUCCESS],
            [BeaconEvent.PERMISSION_REQUEST_ERROR]: [defaultEventCallbacks.PERMISSION_REQUEST_ERROR],
            [BeaconEvent.OPERATION_REQUEST_SENT]: [defaultEventCallbacks.OPERATION_REQUEST_SENT],
            [BeaconEvent.OPERATION_REQUEST_SUCCESS]: [defaultEventCallbacks.OPERATION_REQUEST_SUCCESS],
            [BeaconEvent.OPERATION_REQUEST_ERROR]: [defaultEventCallbacks.OPERATION_REQUEST_ERROR],
            [BeaconEvent.SIGN_REQUEST_SENT]: [defaultEventCallbacks.SIGN_REQUEST_SENT],
            [BeaconEvent.SIGN_REQUEST_SUCCESS]: [defaultEventCallbacks.SIGN_REQUEST_SUCCESS],
            [BeaconEvent.SIGN_REQUEST_ERROR]: [defaultEventCallbacks.SIGN_REQUEST_ERROR],
            [BeaconEvent.BROADCAST_REQUEST_SENT]: [defaultEventCallbacks.BROADCAST_REQUEST_SENT],
            [BeaconEvent.BROADCAST_REQUEST_SUCCESS]: [defaultEventCallbacks.BROADCAST_REQUEST_SUCCESS],
            [BeaconEvent.BROADCAST_REQUEST_ERROR]: [defaultEventCallbacks.BROADCAST_REQUEST_ERROR],
            [BeaconEvent.LOCAL_RATE_LIMIT_REACHED]: [defaultEventCallbacks.LOCAL_RATE_LIMIT_REACHED],
            [BeaconEvent.NO_PERMISSIONS]: [defaultEventCallbacks.NO_PERMISSIONS],
            [BeaconEvent.ACTIVE_ACCOUNT_SET]: [defaultEventCallbacks.ACTIVE_ACCOUNT_SET],
            [BeaconEvent.ACTIVE_TRANSPORT_SET]: [defaultEventCallbacks.ACTIVE_TRANSPORT_SET],
            [BeaconEvent.P2P_CHANNEL_CONNECT_SUCCESS]: [defaultEventCallbacks.P2P_CHANNEL_CONNECT_SUCCESS],
            [BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]: [defaultEventCallbacks.P2P_LISTEN_FOR_CHANNEL_OPEN],
            [BeaconEvent.P2P_CHANNEL_CLOSED]: [defaultEventCallbacks.P2P_CHANNEL_CLOSED],
            [BeaconEvent.INTERNAL_ERROR]: [defaultEventCallbacks.INTERNAL_ERROR],
            [BeaconEvent.UNKNOWN]: [defaultEventCallbacks.UNKNOWN]
        };
        this.overrideDefaults(eventsToOverride).catch((overrideError) => {
            logger.error('constructor', overrideError);
        });
    }
    /**
     * A method to subscribe to a specific beacon event and register a callback
     *
     * @param event The event being emitted
     * @param eventCallback The callback that will be invoked
     */
    on(event, eventCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const listeners = this.callbackMap[event] || [];
            listeners.push(eventCallback);
            this.callbackMap[event] = listeners;
        });
    }
    /**
     * Emit a beacon event
     *
     * @param event The event being emitted
     * @param data The data to be emit
     */
    emit(event, data, eventCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const listeners = this.callbackMap[event];
            if (listeners && listeners.length > 0) {
                listeners.forEach((listener) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield listener(data, eventCallback);
                    }
                    catch (listenerError) {
                        logger.error(`error handling event ${event}`, listenerError);
                    }
                }));
            }
        });
    }
    /**
     * Override beacon event default callbacks. This can be used to disable default alert/toast behaviour
     *
     * @param eventsToOverride An object with the events to override
     */
    overrideDefaults(eventsToOverride) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.keys(eventsToOverride).forEach((untypedEvent) => {
                const eventType = untypedEvent;
                const event = eventsToOverride[eventType];
                if (event) {
                    this.callbackMap[eventType] = [event.handler];
                }
            });
        });
    }
}
//# sourceMappingURL=events.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/index.js":
/*!***************************************!*\
  !*** ../beacon-sdk/dist/esm/index.js ***!
  \***************************************/
/*! exports provided: TezosOperationType, BeaconClient, Client, DAppClient, WalletClient, P2PCommunicationClient, NetworkType, BeaconMessageType, PermissionScope, Origin, ExtensionMessageTarget, BeaconError, BeaconErrorType, AbortedBeaconError, BroadcastBeaconError, NetworkNotSupportedBeaconError, NoAddressBeaconError, NoPrivateKeyBeaconError, NotGrantedBeaconError, ParametersInvalidBeaconError, TooManyOperationsBeaconError, TransactionInvalidBeaconError, UnknownBeaconError, TransportStatus, TransportType, Transport, PostMessageTransport, P2PTransport, ChromeMessageTransport, BeaconEvent, BeaconEventHandler, defaultEventCallbacks, Storage, StorageKey, ChromeStorage, LocalStorage, getStorage, AccountManager, AppMetadataManager, PermissionManager, SDK_VERSION, BEACON_VERSION, getAccountIdentifier, getAddressFromPublicKey, Serializer, availableTransports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transports_clients_P2PCommunicationClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transports/clients/P2PCommunicationClient */ "../beacon-sdk/dist/esm/transports/clients/P2PCommunicationClient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "P2PCommunicationClient", function() { return _transports_clients_P2PCommunicationClient__WEBPACK_IMPORTED_MODULE_0__["P2PCommunicationClient"]; });

/* harmony import */ var _types_beacon_BeaconMessageType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/beacon/BeaconMessageType */ "../beacon-sdk/dist/esm/types/beacon/BeaconMessageType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BeaconMessageType", function() { return _types_beacon_BeaconMessageType__WEBPACK_IMPORTED_MODULE_1__["BeaconMessageType"]; });

/* harmony import */ var _types_beacon_PermissionScope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/beacon/PermissionScope */ "../beacon-sdk/dist/esm/types/beacon/PermissionScope.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PermissionScope", function() { return _types_beacon_PermissionScope__WEBPACK_IMPORTED_MODULE_2__["PermissionScope"]; });

/* harmony import */ var _types_beacon_NetworkType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types/beacon/NetworkType */ "../beacon-sdk/dist/esm/types/beacon/NetworkType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NetworkType", function() { return _types_beacon_NetworkType__WEBPACK_IMPORTED_MODULE_3__["NetworkType"]; });

/* harmony import */ var _types_tezos_OperationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types/tezos/OperationTypes */ "../beacon-sdk/dist/esm/types/tezos/OperationTypes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TezosOperationType", function() { return _types_tezos_OperationTypes__WEBPACK_IMPORTED_MODULE_4__["TezosOperationType"]; });

/* harmony import */ var _types_Origin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types/Origin */ "../beacon-sdk/dist/esm/types/Origin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Origin", function() { return _types_Origin__WEBPACK_IMPORTED_MODULE_5__["Origin"]; });

/* harmony import */ var _types_ExtensionMessageTarget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types/ExtensionMessageTarget */ "../beacon-sdk/dist/esm/types/ExtensionMessageTarget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtensionMessageTarget", function() { return _types_ExtensionMessageTarget__WEBPACK_IMPORTED_MODULE_6__["ExtensionMessageTarget"]; });

/* harmony import */ var _clients_client_Client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clients/client/Client */ "../beacon-sdk/dist/esm/clients/client/Client.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return _clients_client_Client__WEBPACK_IMPORTED_MODULE_7__["Client"]; });

/* harmony import */ var _clients_wallet_client_WalletClient__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./clients/wallet-client/WalletClient */ "../beacon-sdk/dist/esm/clients/wallet-client/WalletClient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WalletClient", function() { return _clients_wallet_client_WalletClient__WEBPACK_IMPORTED_MODULE_8__["WalletClient"]; });

/* harmony import */ var _clients_dapp_client_DAppClient__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./clients/dapp-client/DAppClient */ "../beacon-sdk/dist/esm/clients/dapp-client/DAppClient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DAppClient", function() { return _clients_dapp_client_DAppClient__WEBPACK_IMPORTED_MODULE_9__["DAppClient"]; });

/* harmony import */ var _errors_BeaconError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./errors/BeaconError */ "../beacon-sdk/dist/esm/errors/BeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BeaconError", function() { return _errors_BeaconError__WEBPACK_IMPORTED_MODULE_10__["BeaconError"]; });

/* harmony import */ var _types_BeaconErrorType__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./types/BeaconErrorType */ "../beacon-sdk/dist/esm/types/BeaconErrorType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BeaconErrorType", function() { return _types_BeaconErrorType__WEBPACK_IMPORTED_MODULE_11__["BeaconErrorType"]; });

/* harmony import */ var _errors_BroadcastBeaconError__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./errors/BroadcastBeaconError */ "../beacon-sdk/dist/esm/errors/BroadcastBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BroadcastBeaconError", function() { return _errors_BroadcastBeaconError__WEBPACK_IMPORTED_MODULE_12__["BroadcastBeaconError"]; });

/* harmony import */ var _errors_NetworkNotSupportedBeaconError__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./errors/NetworkNotSupportedBeaconError */ "../beacon-sdk/dist/esm/errors/NetworkNotSupportedBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NetworkNotSupportedBeaconError", function() { return _errors_NetworkNotSupportedBeaconError__WEBPACK_IMPORTED_MODULE_13__["NetworkNotSupportedBeaconError"]; });

/* harmony import */ var _errors_NoAddressBeaconError__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./errors/NoAddressBeaconError */ "../beacon-sdk/dist/esm/errors/NoAddressBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoAddressBeaconError", function() { return _errors_NoAddressBeaconError__WEBPACK_IMPORTED_MODULE_14__["NoAddressBeaconError"]; });

/* harmony import */ var _errors_NoPrivateKeyBeaconError__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./errors/NoPrivateKeyBeaconError */ "../beacon-sdk/dist/esm/errors/NoPrivateKeyBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoPrivateKeyBeaconError", function() { return _errors_NoPrivateKeyBeaconError__WEBPACK_IMPORTED_MODULE_15__["NoPrivateKeyBeaconError"]; });

/* harmony import */ var _errors_NotGrantedBeaconError__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./errors/NotGrantedBeaconError */ "../beacon-sdk/dist/esm/errors/NotGrantedBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotGrantedBeaconError", function() { return _errors_NotGrantedBeaconError__WEBPACK_IMPORTED_MODULE_16__["NotGrantedBeaconError"]; });

/* harmony import */ var _errors_ParametersInvalidBeaconError__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./errors/ParametersInvalidBeaconError */ "../beacon-sdk/dist/esm/errors/ParametersInvalidBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParametersInvalidBeaconError", function() { return _errors_ParametersInvalidBeaconError__WEBPACK_IMPORTED_MODULE_17__["ParametersInvalidBeaconError"]; });

/* harmony import */ var _errors_TooManyOperationsBeaconError__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./errors/TooManyOperationsBeaconError */ "../beacon-sdk/dist/esm/errors/TooManyOperationsBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooManyOperationsBeaconError", function() { return _errors_TooManyOperationsBeaconError__WEBPACK_IMPORTED_MODULE_18__["TooManyOperationsBeaconError"]; });

/* harmony import */ var _errors_TransactionInvalidBeaconError__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./errors/TransactionInvalidBeaconError */ "../beacon-sdk/dist/esm/errors/TransactionInvalidBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionInvalidBeaconError", function() { return _errors_TransactionInvalidBeaconError__WEBPACK_IMPORTED_MODULE_19__["TransactionInvalidBeaconError"]; });

/* harmony import */ var _errors_UnknownBeaconError__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./errors/UnknownBeaconError */ "../beacon-sdk/dist/esm/errors/UnknownBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnknownBeaconError", function() { return _errors_UnknownBeaconError__WEBPACK_IMPORTED_MODULE_20__["UnknownBeaconError"]; });

/* harmony import */ var _types_transport_TransportStatus__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./types/transport/TransportStatus */ "../beacon-sdk/dist/esm/types/transport/TransportStatus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransportStatus", function() { return _types_transport_TransportStatus__WEBPACK_IMPORTED_MODULE_21__["TransportStatus"]; });

/* harmony import */ var _types_transport_TransportType__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./types/transport/TransportType */ "../beacon-sdk/dist/esm/types/transport/TransportType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransportType", function() { return _types_transport_TransportType__WEBPACK_IMPORTED_MODULE_22__["TransportType"]; });

/* harmony import */ var _transports_PostMessageTransport__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./transports/PostMessageTransport */ "../beacon-sdk/dist/esm/transports/PostMessageTransport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostMessageTransport", function() { return _transports_PostMessageTransport__WEBPACK_IMPORTED_MODULE_23__["PostMessageTransport"]; });

/* harmony import */ var _transports_Transport__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./transports/Transport */ "../beacon-sdk/dist/esm/transports/Transport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transport", function() { return _transports_Transport__WEBPACK_IMPORTED_MODULE_24__["Transport"]; });

/* harmony import */ var _transports_P2PTransport__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./transports/P2PTransport */ "../beacon-sdk/dist/esm/transports/P2PTransport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "P2PTransport", function() { return _transports_P2PTransport__WEBPACK_IMPORTED_MODULE_25__["P2PTransport"]; });

/* harmony import */ var _transports_ChromeMessageTransport__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./transports/ChromeMessageTransport */ "../beacon-sdk/dist/esm/transports/ChromeMessageTransport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChromeMessageTransport", function() { return _transports_ChromeMessageTransport__WEBPACK_IMPORTED_MODULE_26__["ChromeMessageTransport"]; });

/* harmony import */ var _storage_Storage__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./storage/Storage */ "../beacon-sdk/dist/esm/storage/Storage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return _storage_Storage__WEBPACK_IMPORTED_MODULE_27__["Storage"]; });

/* harmony import */ var _types_storage_StorageKey__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./types/storage/StorageKey */ "../beacon-sdk/dist/esm/types/storage/StorageKey.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StorageKey", function() { return _types_storage_StorageKey__WEBPACK_IMPORTED_MODULE_28__["StorageKey"]; });

/* harmony import */ var _storage_ChromeStorage__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./storage/ChromeStorage */ "../beacon-sdk/dist/esm/storage/ChromeStorage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChromeStorage", function() { return _storage_ChromeStorage__WEBPACK_IMPORTED_MODULE_29__["ChromeStorage"]; });

/* harmony import */ var _storage_LocalStorage__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./storage/LocalStorage */ "../beacon-sdk/dist/esm/storage/LocalStorage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return _storage_LocalStorage__WEBPACK_IMPORTED_MODULE_30__["LocalStorage"]; });

/* harmony import */ var _storage_getStorage__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./storage/getStorage */ "../beacon-sdk/dist/esm/storage/getStorage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return _storage_getStorage__WEBPACK_IMPORTED_MODULE_31__["getStorage"]; });

/* harmony import */ var _Serializer__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Serializer */ "../beacon-sdk/dist/esm/Serializer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Serializer", function() { return _Serializer__WEBPACK_IMPORTED_MODULE_32__["Serializer"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./constants */ "../beacon-sdk/dist/esm/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SDK_VERSION", function() { return _constants__WEBPACK_IMPORTED_MODULE_33__["SDK_VERSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BEACON_VERSION", function() { return _constants__WEBPACK_IMPORTED_MODULE_33__["BEACON_VERSION"]; });

/* harmony import */ var _managers_AccountManager__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./managers/AccountManager */ "../beacon-sdk/dist/esm/managers/AccountManager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccountManager", function() { return _managers_AccountManager__WEBPACK_IMPORTED_MODULE_34__["AccountManager"]; });

/* harmony import */ var _managers_AppMetadataManager__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./managers/AppMetadataManager */ "../beacon-sdk/dist/esm/managers/AppMetadataManager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppMetadataManager", function() { return _managers_AppMetadataManager__WEBPACK_IMPORTED_MODULE_35__["AppMetadataManager"]; });

/* harmony import */ var _managers_PermissionManager__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./managers/PermissionManager */ "../beacon-sdk/dist/esm/managers/PermissionManager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PermissionManager", function() { return _managers_PermissionManager__WEBPACK_IMPORTED_MODULE_36__["PermissionManager"]; });

/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./events */ "../beacon-sdk/dist/esm/events.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BeaconEvent", function() { return _events__WEBPACK_IMPORTED_MODULE_37__["BeaconEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BeaconEventHandler", function() { return _events__WEBPACK_IMPORTED_MODULE_37__["BeaconEventHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultEventCallbacks", function() { return _events__WEBPACK_IMPORTED_MODULE_37__["defaultEventCallbacks"]; });

/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAddressFromPublicKey", function() { return _utils_crypto__WEBPACK_IMPORTED_MODULE_38__["getAddressFromPublicKey"]; });

/* harmony import */ var _clients_beacon_client_BeaconClient__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./clients/beacon-client/BeaconClient */ "../beacon-sdk/dist/esm/clients/beacon-client/BeaconClient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BeaconClient", function() { return _clients_beacon_client_BeaconClient__WEBPACK_IMPORTED_MODULE_39__["BeaconClient"]; });

/* harmony import */ var _utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./utils/get-account-identifier */ "../beacon-sdk/dist/esm/utils/get-account-identifier.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAccountIdentifier", function() { return _utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_40__["getAccountIdentifier"]; });

/* harmony import */ var _errors_AbortedBeaconError__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./errors/AbortedBeaconError */ "../beacon-sdk/dist/esm/errors/AbortedBeaconError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbortedBeaconError", function() { return _errors_AbortedBeaconError__WEBPACK_IMPORTED_MODULE_41__["AbortedBeaconError"]; });

/* harmony import */ var _utils_available_transports__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./utils/available-transports */ "../beacon-sdk/dist/esm/utils/available-transports.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "availableTransports", function() { return _utils_available_transports__WEBPACK_IMPORTED_MODULE_42__["availableTransports"]; });












































// Tezos

// Clients

// Beacon

// Errors

// Transport

// Events

// Storage

// Managers

// Constants

// Utils

// Others

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/interceptors/IncomingRequestInterceptor.js":
/*!*************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/interceptors/IncomingRequestInterceptor.js ***!
  \*************************************************************************/
/*! exports provided: IncomingRequestInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IncomingRequestInterceptor", function() { return IncomingRequestInterceptor; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * The IncomingRequestInterceptor is used in the WalletClient to intercept an incoming request and enrich it with data, like app metadata.
 */
class IncomingRequestInterceptor {
    /**
     * The method that is called during the interception
     *
     * @param config
     */
    static intercept(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message, connectionInfo, appMetadataManager, interceptorCallback } = config;
            // TODO: Remove v1 compatibility in later version
            if (message.beaconId && !message.senderId) {
                message.senderId = message.beaconId;
                delete message.beaconId;
            }
            switch (message.type) {
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].PermissionRequest:
                    {
                        // TODO: Remove v1 compatibility in later version
                        if (message.appMetadata.beaconId && !message.appMetadata.senderId) {
                            message.appMetadata.senderId = message.appMetadata.beaconId;
                            delete message.appMetadata.beaconId;
                        }
                        yield appMetadataManager.addAppMetadata(message.appMetadata);
                        const request = message;
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].OperationRequest:
                    {
                        const appMetadata = yield IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId);
                        const request = Object.assign({ appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].SignPayloadRequest:
                    {
                        const appMetadata = yield IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId);
                        const request = Object.assign({ appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].BroadcastRequest:
                    {
                        const appMetadata = yield IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId);
                        const request = Object.assign({ appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                    }
                    break;
                default:
                    console.log('Message not handled');
            }
        });
    }
    static getAppMetadata(appMetadataManager, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appMetadata = yield appMetadataManager.getAppMetadata(senderId);
            if (!appMetadata) {
                throw new Error('AppMetadata not found');
            }
            return appMetadata;
        });
    }
}
//# sourceMappingURL=IncomingRequestInterceptor.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/interceptors/OutgoingResponseInterceptor.js":
/*!**************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/interceptors/OutgoingResponseInterceptor.js ***!
  \**************************************************************************/
/*! exports provided: OutgoingResponseInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutgoingResponseInterceptor", function() { return OutgoingResponseInterceptor; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "../beacon-sdk/dist/esm/constants.js");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony import */ var _utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/get-account-identifier */ "../beacon-sdk/dist/esm/utils/get-account-identifier.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * The OutgoingResponseInterceptor is used in the WalletClient to intercept an outgoing response and enrich it with data.
 */
class OutgoingResponseInterceptor {
    static intercept(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, request, message, permissionManager, appMetadataManager, interceptorCallback } = config;
            // TODO: Remove v1 compatibility in later version
            const interceptorCallbackWrapper = (msg) => {
                const untypedMessage = msg;
                untypedMessage.beaconId = msg.senderId;
                interceptorCallback(msg);
            };
            switch (message.type) {
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].Error: {
                    const response = {
                        type: message.type,
                        version: _constants__WEBPACK_IMPORTED_MODULE_1__["BEACON_VERSION"],
                        senderId,
                        id: message.id,
                        errorType: message.errorType
                    };
                    interceptorCallbackWrapper(response);
                    break;
                }
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].PermissionResponse: {
                    const response = Object.assign({ senderId, version: _constants__WEBPACK_IMPORTED_MODULE_1__["BEACON_VERSION"] }, message);
                    // TODO: Migration code. Remove sometime after 1.0.0 release.
                    const publicKey = response.publicKey || response.pubkey || response.pubKey;
                    const address = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getAddressFromPublicKey"])(publicKey);
                    const appMetadata = yield appMetadataManager.getAppMetadata(request.senderId);
                    if (!appMetadata) {
                        throw new Error('AppMetadata not found');
                    }
                    const permission = {
                        accountIdentifier: yield Object(_utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_3__["getAccountIdentifier"])(address, response.network),
                        senderId: request.senderId,
                        appMetadata,
                        website: '',
                        address,
                        publicKey,
                        network: response.network,
                        scopes: response.scopes,
                        connectedAt: new Date().getTime()
                    };
                    permissionManager.addPermission(permission).catch(console.error);
                    interceptorCallbackWrapper(response);
                    break;
                }
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].OperationResponse:
                    {
                        const response = Object.assign({ senderId, version: _constants__WEBPACK_IMPORTED_MODULE_1__["BEACON_VERSION"] }, message);
                        interceptorCallbackWrapper(response);
                    }
                    break;
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].SignPayloadResponse:
                    {
                        const response = Object.assign({ senderId, version: _constants__WEBPACK_IMPORTED_MODULE_1__["BEACON_VERSION"] }, message);
                        interceptorCallbackWrapper(response);
                    }
                    break;
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].BroadcastResponse:
                    {
                        const response = Object.assign({ senderId, version: _constants__WEBPACK_IMPORTED_MODULE_1__["BEACON_VERSION"] }, message);
                        interceptorCallbackWrapper(response);
                    }
                    break;
                default:
                    console.log('Message not handled');
            }
        });
    }
}
//# sourceMappingURL=OutgoingResponseInterceptor.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/managers/AccountManager.js":
/*!*********************************************************!*\
  !*** ../beacon-sdk/dist/esm/managers/AccountManager.js ***!
  \*********************************************************/
/*! exports provided: AccountManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountManager", function() { return AccountManager; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _StorageManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StorageManager */ "../beacon-sdk/dist/esm/managers/StorageManager.js");
/* harmony import */ var _PermissionValidator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PermissionValidator */ "../beacon-sdk/dist/esm/managers/PermissionValidator.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



/**
 * The AccountManager provides CRUD functionality for account entities and persists them to the provided storage.
 */
class AccountManager {
    constructor(storage) {
        this.storageManager = new _StorageManager__WEBPACK_IMPORTED_MODULE_1__["StorageManager"](storage, ___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].ACCOUNTS);
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getAll();
        });
    }
    getAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getOne((account) => account.accountIdentifier === accountIdentifier);
        });
    }
    addAccount(accountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.addOne(accountInfo, (account) => account.accountIdentifier === accountInfo.accountIdentifier);
        });
    }
    removeAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((account) => account.accountIdentifier === accountIdentifier);
        });
    }
    removeAccounts(accountIdentifiers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((account) => accountIdentifiers.includes(account.accountIdentifier));
        });
    }
    removeAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.removeAll();
        });
    }
    hasPermission(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return _PermissionValidator__WEBPACK_IMPORTED_MODULE_2__["PermissionValidator"].hasPermission(message, this.getAccount.bind(this), this.getAccounts.bind(this));
        });
    }
}
//# sourceMappingURL=AccountManager.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/managers/AppMetadataManager.js":
/*!*************************************************************!*\
  !*** ../beacon-sdk/dist/esm/managers/AppMetadataManager.js ***!
  \*************************************************************/
/*! exports provided: AppMetadataManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMetadataManager", function() { return AppMetadataManager; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _StorageManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StorageManager */ "../beacon-sdk/dist/esm/managers/StorageManager.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * The AppMetadataManager provides CRUD functionality for app-metadata entities and persists them to the provided storage.
 */
class AppMetadataManager {
    constructor(storage) {
        this.storageManager = new _StorageManager__WEBPACK_IMPORTED_MODULE_1__["StorageManager"](storage, ___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].APP_METADATA_LIST);
    }
    getAppMetadataList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getAll();
        });
    }
    getAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getOne((appMetadata) => appMetadata.senderId === senderId);
        });
    }
    addAppMetadata(appMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.addOne(appMetadata, (appMetadataElement) => appMetadataElement.senderId === appMetadata.senderId);
        });
    }
    removeAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((appMetadata) => appMetadata.senderId === senderId);
        });
    }
    removeAppMetadatas(senderIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((appMetadata) => senderIds.includes(appMetadata.senderId));
        });
    }
    removeAllAppMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.removeAll();
        });
    }
}
//# sourceMappingURL=AppMetadataManager.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/managers/PeerManager.js":
/*!******************************************************!*\
  !*** ../beacon-sdk/dist/esm/managers/PeerManager.js ***!
  \******************************************************/
/*! exports provided: PeerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeerManager", function() { return PeerManager; });
/* harmony import */ var _StorageManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StorageManager */ "../beacon-sdk/dist/esm/managers/StorageManager.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * The PeerManager provides CRUD functionality for peer entities and persists them to the provided storage.
 */
class PeerManager {
    constructor(storage, key) {
        this.storageManager = new _StorageManager__WEBPACK_IMPORTED_MODULE_0__["StorageManager"](storage, key);
    }
    hasPeer(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getPeer(publicKey)) ? true : false;
        });
    }
    getPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getAll();
        });
    }
    getPeer(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getOne((peer) => peer.publicKey === publicKey);
        });
    }
    addPeer(peerInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.addOne(peerInfo, (peer) => peer.publicKey === peerInfo.publicKey);
        });
    }
    removePeer(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((peer) => peer.publicKey === publicKey);
        });
    }
    removePeers(publicKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((peer) => publicKeys.includes(peer.publicKey));
        });
    }
    removeAllPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.removeAll();
        });
    }
}
//# sourceMappingURL=PeerManager.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/managers/PermissionManager.js":
/*!************************************************************!*\
  !*** ../beacon-sdk/dist/esm/managers/PermissionManager.js ***!
  \************************************************************/
/*! exports provided: PermissionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissionManager", function() { return PermissionManager; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _StorageManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StorageManager */ "../beacon-sdk/dist/esm/managers/StorageManager.js");
/* harmony import */ var _PermissionValidator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PermissionValidator */ "../beacon-sdk/dist/esm/managers/PermissionValidator.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



/**
 * The PermissionManager provides CRUD functionality for permission entities and persists them to the provided storage.
 */
class PermissionManager {
    constructor(storage) {
        this.storageManager = new _StorageManager__WEBPACK_IMPORTED_MODULE_1__["StorageManager"](storage, ___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].PERMISSION_LIST);
    }
    getPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getAll();
        });
    }
    getPermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getOne((permission) => permission.accountIdentifier === accountIdentifier);
        });
    }
    addPermission(permissionInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.addOne(permissionInfo, (permission) => permission.accountIdentifier === permissionInfo.accountIdentifier);
        });
    }
    removePermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((permissionInfo) => permissionInfo.accountIdentifier === accountIdentifier);
        });
    }
    removePermissions(accountIdentifiers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((permission) => accountIdentifiers.includes(permission.accountIdentifier));
        });
    }
    removeAllPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.removeAll();
        });
    }
    hasPermission(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return _PermissionValidator__WEBPACK_IMPORTED_MODULE_2__["PermissionValidator"].hasPermission(message, this.getPermission.bind(this), this.getPermissions.bind(this));
        });
    }
}
//# sourceMappingURL=PermissionManager.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/managers/PermissionValidator.js":
/*!**************************************************************!*\
  !*** ../beacon-sdk/dist/esm/managers/PermissionValidator.js ***!
  \**************************************************************/
/*! exports provided: PermissionValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissionValidator", function() { return PermissionValidator; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get-account-identifier */ "../beacon-sdk/dist/esm/utils/get-account-identifier.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * The PermissionValidator is used to check if permissions for a certain message type have been given
 */
class PermissionValidator {
    /**
     * Check if permissions were given for a certain message type.
     *
     * PermissionRequest and BroadcastRequest will always return true.
     *
     * @param message Beacon Message
     */
    static hasPermission(message, getOne, getAll) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (message.type) {
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].PermissionRequest:
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].BroadcastRequest: {
                    return true;
                }
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].OperationRequest: {
                    const accountIdentifier = yield Object(_utils_get_account_identifier__WEBPACK_IMPORTED_MODULE_1__["getAccountIdentifier"])(message.sourceAddress, message.network);
                    const permission = yield getOne(accountIdentifier);
                    if (!permission) {
                        return false;
                    }
                    return permission.scopes.includes(___WEBPACK_IMPORTED_MODULE_0__["PermissionScope"].OPERATION_REQUEST);
                }
                case ___WEBPACK_IMPORTED_MODULE_0__["BeaconMessageType"].SignPayloadRequest: {
                    const permissions = yield getAll();
                    const filteredPermissions = permissions.filter((permission) => permission.address === message.sourceAddress);
                    if (filteredPermissions.length === 0) {
                        return false;
                    }
                    return filteredPermissions.some((permission) => permission.scopes.includes(___WEBPACK_IMPORTED_MODULE_0__["PermissionScope"].SIGN));
                }
                default:
                    throw new Error('Message not handled');
            }
        });
    }
}
//# sourceMappingURL=PermissionValidator.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/managers/StorageManager.js":
/*!*********************************************************!*\
  !*** ../beacon-sdk/dist/esm/managers/StorageManager.js ***!
  \*********************************************************/
/*! exports provided: StorageManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageManager", function() { return StorageManager; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable prefer-arrow/prefer-arrow-functions */
function fixArrayType(array) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return array;
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
/**
 * The StorageManager provides CRUD functionality for specific entities and persists them to the provided storage.
 */
class StorageManager {
    constructor(storage, storageKey) {
        this.storage = storage;
        this.storageKey = storageKey;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storage.get(this.storageKey);
        });
    }
    getOne(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.storage.get(this.storageKey);
            return fixArrayType(entities).find(predicate);
        });
    }
    addOne(element, predicate, overwrite = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.storage.get(this.storageKey);
            if (!fixArrayType(entities).some(predicate)) {
                fixArrayType(entities).push(element);
            }
            else if (overwrite) {
                for (let i = 0; i < entities.length; i++) {
                    if (predicate(fixArrayType(entities)[i])) {
                        entities[i] = element;
                    }
                }
            }
            return this.storage.set(this.storageKey, entities);
        });
    }
    remove(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.storage.get(this.storageKey);
            const filteredEntities = fixArrayType(entities).filter((entity) => !predicate(entity));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return this.storage.set(this.storageKey, filteredEntities);
        });
    }
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storage.delete(this.storageKey);
        });
    }
}
//# sourceMappingURL=StorageManager.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/MatrixClient.js":
/*!************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/MatrixClient.js ***!
  \************************************************************/
/*! exports provided: MatrixClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixClient", function() { return MatrixClient; });
/* harmony import */ var _MatrixClientStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MatrixClientStore */ "../beacon-sdk/dist/esm/matrix-client/MatrixClientStore.js");
/* harmony import */ var _MatrixHttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MatrixHttpClient */ "../beacon-sdk/dist/esm/matrix-client/MatrixHttpClient.js");
/* harmony import */ var _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/MatrixRoom */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixRoom.js");
/* harmony import */ var _services_MatrixRoomService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/MatrixRoomService */ "../beacon-sdk/dist/esm/matrix-client/services/MatrixRoomService.js");
/* harmony import */ var _services_MatrixUserService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/MatrixUserService */ "../beacon-sdk/dist/esm/matrix-client/services/MatrixUserService.js");
/* harmony import */ var _services_MatrixEventService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/MatrixEventService */ "../beacon-sdk/dist/esm/matrix-client/services/MatrixEventService.js");
/* harmony import */ var _MatrixClientEventEmitter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MatrixClientEventEmitter */ "../beacon-sdk/dist/esm/matrix-client/MatrixClientEventEmitter.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const MAX_POLLING_RETRIES = 3;
/**
 * The matrix client used to connect to the matrix network
 */
class MatrixClient {
    constructor(store, eventEmitter, userService, roomService, eventService) {
        this.store = store;
        this.eventEmitter = eventEmitter;
        this.userService = userService;
        this.roomService = roomService;
        this.eventService = eventService;
        this.store.onStateChanged((oldState, newState, stateChange) => {
            this.eventEmitter.onStateChanged(oldState, newState, stateChange);
        }, 'rooms');
    }
    /**
     * Create a matrix client based on the options provided
     *
     * @param config
     */
    static create(config) {
        const store = new _MatrixClientStore__WEBPACK_IMPORTED_MODULE_0__["MatrixClientStore"](config.storage);
        const eventEmitter = new _MatrixClientEventEmitter__WEBPACK_IMPORTED_MODULE_6__["MatrixClientEventEmitter"]();
        const httpClient = new _MatrixHttpClient__WEBPACK_IMPORTED_MODULE_1__["MatrixHttpClient"](config.baseUrl);
        const accountService = new _services_MatrixUserService__WEBPACK_IMPORTED_MODULE_4__["MatrixUserService"](httpClient);
        const roomService = new _services_MatrixRoomService__WEBPACK_IMPORTED_MODULE_3__["MatrixRoomService"](httpClient);
        const eventService = new _services_MatrixEventService__WEBPACK_IMPORTED_MODULE_5__["MatrixEventService"](httpClient);
        return new MatrixClient(store, eventEmitter, accountService, roomService, eventService);
    }
    /**
     * Return all the rooms we are currently part of
     */
    get joinedRooms() {
        return Object.values(this.store.get('rooms')).filter((room) => room.status === _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__["MatrixRoomStatus"].JOINED);
    }
    /**
     * Return all the rooms to which we have received invitations
     */
    get invitedRooms() {
        return Object.values(this.store.get('rooms')).filter((room) => room.status === _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__["MatrixRoomStatus"].INVITED);
    }
    /**
     * Return all the rooms that we left
     */
    get leftRooms() {
        return Object.values(this.store.get('rooms')).filter((room) => room.status === _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__["MatrixRoomStatus"].LEFT);
    }
    /**
     * Initiate the connection to the matrix node and log in
     *
     * @param user
     */
    start(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.userService.login(user.id, user.password, user.deviceId);
            yield this.store.update({
                accessToken: response.access_token
            });
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.poll(0, (pollingResponse) => __awaiter(this, void 0, void 0, function* () {
                    if (!this.store.get('isRunning')) {
                        resolve();
                    }
                    yield this.store.update({
                        isRunning: true,
                        syncToken: pollingResponse.next_batch,
                        pollingTimeout: 30000,
                        pollingRetries: 0,
                        rooms: _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__["MatrixRoom"].fromSync(pollingResponse.rooms)
                    });
                }), (error) => __awaiter(this, void 0, void 0, function* () {
                    if (!this.store.get('isRunning')) {
                        reject(error);
                    }
                    yield this.store.update({
                        isRunning: false,
                        pollingRetries: this.store.get('pollingRetries') + 1
                    });
                }));
            }));
        });
    }
    /**
     * Subscribe to new matrix events
     *
     * @param event
     * @param listener
     */
    subscribe(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    /**
     * Unsubscribe from matrix events
     *
     * @param event
     * @param listener
     */
    unsubscribe(event, listener) {
        if (listener) {
            this.eventEmitter.removeListener(event, listener);
        }
        else {
            this.eventEmitter.removeAllListeners(event);
        }
    }
    getRoomById(id) {
        return this.store.getRoom(id);
    }
    /**
     * Create a private room with the supplied members
     *
     * @param members Members that will be in the room
     */
    createTrustedPrivateRoom(...members) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.requiresAuthorization('createRoom', (accessToken) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.roomService.createRoom(accessToken, {
                    invite: members,
                    preset: 'trusted_private_chat',
                    is_direct: true
                });
                return response.room_id;
            }));
        });
    }
    /**
     * Invite user to rooms
     *
     * @param user The user to be invited
     * @param roomsOrIds The rooms the user will be invited to
     */
    inviteToRooms(user, ...roomsOrIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requiresAuthorization('invite', (accessToken) => Promise.all(roomsOrIds.map((roomOrId) => {
                const room = this.store.getRoom(roomOrId);
                this.roomService
                    .inviteToRoom(accessToken, user, room)
                    .catch((error) => console.warn(error));
            })));
        });
    }
    /**
     * Join rooms
     *
     * @param roomsOrIds
     */
    joinRooms(...roomsOrIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requiresAuthorization('join', (accessToken) => Promise.all(roomsOrIds.map((roomOrId) => {
                const room = this.store.getRoom(roomOrId);
                return this.roomService.joinRoom(accessToken, room).catch((error) => console.warn(error));
            })));
        });
    }
    /**
     * Send a text message
     *
     * @param roomOrId
     * @param message
     */
    sendTextMessage(roomOrId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.requiresAuthorization('send', (accessToken) => __awaiter(this, void 0, void 0, function* () {
                    const room = this.store.getRoom(roomOrId);
                    const txnId = yield this.createTxnId();
                    return this.eventService.sendMessage(accessToken, room, {
                        msgtype: 'm.text',
                        body: message
                    }, txnId);
                }));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * Poll the server to get the latest data and get notified of changes
     *
     * @param interval
     * @param onSyncSuccess
     * @param onSyncError
     */
    poll(interval, onSyncSuccess, onSyncError) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = this.store;
            const sync = this.sync.bind(this);
            const pollSync = (resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let continueSyncing = false;
                try {
                    const response = yield sync();
                    onSyncSuccess(response);
                    continueSyncing = true;
                }
                catch (error) {
                    onSyncError(error);
                    continueSyncing = store.get('pollingRetries') < MAX_POLLING_RETRIES;
                    // console.warn('Could not sync:', error)
                    if (continueSyncing) {
                        console.log('Retry syncing...');
                    }
                }
                finally {
                    if (continueSyncing) {
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield pollSync(resolve, reject);
                        }), interval);
                    }
                    else {
                        reject(new Error(`Max polling retries exeeded: ${MAX_POLLING_RETRIES}`));
                    }
                }
            });
            return new Promise(pollSync);
        });
    }
    /**
     * Get state from server
     */
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.requiresAuthorization('sync', (accessToken) => __awaiter(this, void 0, void 0, function* () {
                return this.eventService.sync(accessToken, {
                    pollingTimeout: this.store.get('pollingTimeout'),
                    syncToken: this.store.get('syncToken')
                });
            }));
        });
    }
    /**
     * A helper method that makes sure an access token is provided
     *
     * @param name
     * @param action
     */
    requiresAuthorization(name, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedToken = this.store.get('accessToken');
            if (!storedToken) {
                return Promise.reject(`${name} requires authorization but no access token has been provided.`);
            }
            return action(storedToken);
        });
    }
    /**
     * Create a transaction ID
     */
    createTxnId() {
        return __awaiter(this, void 0, void 0, function* () {
            const timestamp = new Date().getTime();
            const counter = this.store.get('txnNo');
            yield this.store.update({
                txnNo: counter + 1
            });
            return `m${timestamp}.${counter}`;
        });
    }
}
//# sourceMappingURL=MatrixClient.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/MatrixClientEventEmitter.js":
/*!************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/MatrixClientEventEmitter.js ***!
  \************************************************************************/
/*! exports provided: MatrixClientEventEmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixClientEventEmitter", function() { return MatrixClientEventEmitter; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "../beacon-sdk/dist/esm/utils/utils.js");
/* harmony import */ var _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/MatrixRoom */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixRoom.js");
/* harmony import */ var _models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/MatrixClientEvent */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixClientEvent.js");




class MatrixClientEventEmitter extends events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] {
    constructor() {
        super(...arguments);
        this.eventEmitProviders = new Map([
            [_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_3__["MatrixClientEventType"].INVITE, () => [this.isInvite, this.emitInvite.bind(this)]],
            [_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_3__["MatrixClientEventType"].MESSAGE, () => [this.isMessage, this.emitMessage.bind(this)]]
        ]);
    }
    /**
     * This method is called every time the state is changed
     *
     * @param _oldState
     * @param _newState
     * @param stateChange
     */
    onStateChanged(_oldState, _newState, stateChange) {
        for (const event of Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["keys"])(_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_3__["MatrixClientEventType"])) {
            this.emitIfEvent(_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_3__["MatrixClientEventType"][event], stateChange);
        }
    }
    /**
     * Emit the message if we have listeners registered for that type
     *
     * @param eventType
     * @param object
     */
    emitIfEvent(eventType, object) {
        const provider = this.eventEmitProviders.get(eventType);
        if (provider) {
            const [predicate, emitter] = provider();
            if (predicate(object)) {
                emitter(eventType, object);
            }
        }
    }
    /**
     * Emit a client event
     *
     * @param eventType
     * @param content
     */
    emitClientEvent(eventType, content) {
        this.emit(eventType, {
            type: eventType,
            content
        });
    }
    /**
     * Check if event is an invite
     *
     * @param stateChange
     */
    isInvite(stateChange) {
        return stateChange.rooms
            ? stateChange.rooms.some((room) => room.status === _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__["MatrixRoomStatus"].INVITED)
            : false;
    }
    /**
     * Emit an invite
     *
     * @param eventType
     * @param stateChange
     */
    emitInvite(eventType, stateChange) {
        stateChange.rooms
            .filter((room) => room.status === _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_2__["MatrixRoomStatus"].INVITED)
            .map((room) => room.id)
            .forEach((id) => {
            this.emitClientEvent(eventType, {
                roomId: id
            });
        });
    }
    /**
     * Check if event is a message
     *
     * @param stateChange
     */
    isMessage(stateChange) {
        return stateChange.rooms ? stateChange.rooms.some((room) => room.messages.length > 0) : false;
    }
    /**
     * Emit an event to all rooms
     *
     * @param eventType
     * @param stateChange
     */
    emitMessage(eventType, stateChange) {
        stateChange.rooms
            .filter((room) => room.messages.length > 0)
            .map((room) => room.messages.map((message) => [room.id, message]))
            .reduce((flatten, toFlatten) => flatten.concat(toFlatten), [])
            .forEach(([roomId, message]) => {
            this.emitClientEvent(eventType, {
                roomId,
                message
            });
        });
    }
}
//# sourceMappingURL=MatrixClientEventEmitter.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/MatrixClientStore.js":
/*!*****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/MatrixClientStore.js ***!
  \*****************************************************************/
/*! exports provided: MatrixClientStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixClientStore", function() { return MatrixClientStore; });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "../beacon-sdk/dist/esm/utils/utils.js");
/* harmony import */ var _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/MatrixRoom */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixRoom.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const PRESERVED_FIELDS = ['syncToken', 'rooms'];
/**
 * The class managing the local state of matrix
 */
class MatrixClientStore {
    constructor(storage) {
        this.storage = storage;
        /**
         * The state of the matrix client
         */
        this.state = {
            isRunning: false,
            userId: undefined,
            deviceId: undefined,
            txnNo: 0,
            accessToken: undefined,
            syncToken: undefined,
            pollingTimeout: undefined,
            pollingRetries: 0,
            rooms: {}
        };
        /**
         * Listeners that will be called when the state changes
         */
        this.onStateChangedListeners = new Map();
        /**
         * A promise that resolves once the client is ready
         */
        this.waitReadyPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initFromStorage();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    /**
     * Get an item from the state
     *
     * @param key
     */
    get(key) {
        return this.state[key];
    }
    /**
     * Get the room from an ID or room instance
     *
     * @param roomOrId
     */
    getRoom(roomOrId) {
        const room = _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_1__["MatrixRoom"].from(roomOrId, _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_1__["MatrixRoomStatus"].UNKNOWN);
        return this.state.rooms[room.id] || room;
    }
    /**
     * Update the state with a partial state
     *
     * @param stateUpdate
     */
    update(stateUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitReady();
            const oldState = Object.assign({}, this.state);
            this.setState(stateUpdate);
            this.updateStorage(stateUpdate);
            this.notifyListeners(oldState, this.state, stateUpdate);
        });
    }
    /**
     * Register listeners that are called once the state has changed
     *
     * @param listener
     * @param subscribed
     */
    onStateChanged(listener, ...subscribed) {
        if (subscribed.length > 0) {
            subscribed.forEach((key) => {
                this.onStateChangedListeners.set(key, listener);
            });
        }
        else {
            this.onStateChangedListeners.set('all', listener);
        }
    }
    /**
     * A promise that resolves once the client is ready
     */
    waitReady() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.waitReadyPromise;
        });
    }
    /**
     * Read state from storage
     */
    initFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const preserved = yield this.storage.get(___WEBPACK_IMPORTED_MODULE_2__["StorageKey"].MATRIX_PRESERVED_STATE);
            this.setState(preserved);
        });
    }
    /**
     * Prepare data before persisting it in storage
     *
     * @param toStore
     */
    prepareData(toStore) {
        const requiresPreparation = ['rooms'];
        const toStoreCopy = requiresPreparation.some((key) => toStore[key] !== undefined)
            ? JSON.parse(JSON.stringify(toStore))
            : toStore;
        // there is no need for saving messages in a persistent storage
        Object.values(toStoreCopy.rooms || {}).forEach((room) => {
            room.messages = [];
        });
        return toStoreCopy;
    }
    /**
     * Persist state in storage
     *
     * @param stateUpdate
     */
    updateStorage(stateUpdate) {
        const updatedCachedFields = Object.entries(stateUpdate).filter(([key, value]) => PRESERVED_FIELDS.includes(key) && Boolean(value));
        if (updatedCachedFields.length > 0) {
            const filteredState = {};
            PRESERVED_FIELDS.forEach((key) => {
                filteredState[key] = this.state[key];
            });
            this.storage.set(___WEBPACK_IMPORTED_MODULE_2__["StorageKey"].MATRIX_PRESERVED_STATE, this.prepareData(filteredState));
        }
    }
    /**
     * Set the state
     *
     * @param partialState
     */
    setState(partialState) {
        this.state = {
            isRunning: partialState.isRunning || this.state.isRunning,
            userId: partialState.userId || this.state.userId,
            deviceId: partialState.deviceId || this.state.deviceId,
            txnNo: partialState.txnNo || this.state.txnNo,
            accessToken: partialState.accessToken || this.state.accessToken,
            syncToken: partialState.syncToken || this.state.syncToken,
            pollingTimeout: partialState.pollingTimeout || this.state.pollingTimeout,
            pollingRetries: partialState.pollingRetries || this.state.pollingRetries,
            rooms: this.mergeRooms(this.state.rooms, partialState.rooms)
        };
    }
    /**
     * Merge room records and eliminate duplicates
     *
     * @param oldRooms
     * @param _newRooms
     */
    mergeRooms(oldRooms, _newRooms) {
        if (!_newRooms) {
            return oldRooms;
        }
        const newRooms = Array.isArray(_newRooms) ? _newRooms : Object.values(_newRooms);
        const merged = Object.assign({}, oldRooms);
        newRooms.forEach((newRoom) => {
            merged[newRoom.id] = _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_1__["MatrixRoom"].merge(newRoom, oldRooms[newRoom.id]);
        });
        return merged;
    }
    /**
     * Notify listeners of state changes
     *
     * @param oldState
     * @param newState
     * @param stateChange
     */
    notifyListeners(oldState, newState, stateChange) {
        const listenForAll = this.onStateChangedListeners.get('all');
        if (listenForAll) {
            listenForAll(oldState, newState, stateChange);
        }
        Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["keys"])(stateChange)
            .filter((key) => stateChange[key] !== undefined)
            .forEach((key) => {
            const listener = this.onStateChangedListeners.get(key);
            if (listener) {
                listener(oldState, newState, stateChange);
            }
        });
    }
}
//# sourceMappingURL=MatrixClientStore.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/MatrixHttpClient.js":
/*!****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/MatrixHttpClient.js ***!
  \****************************************************************/
/*! exports provided: MatrixHttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixHttpClient", function() { return MatrixHttpClient; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../beacon-sdk/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "../beacon-sdk/dist/esm/utils/utils.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const CLIENT_API_R0 = '/_matrix/client/r0';
/**
 * Handling the HTTP connection to the matrix synapse node
 */
class MatrixHttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    /**
     * Get data from the synapse node
     *
     * @param endpoint
     * @param params
     * @param options
     */
    get(endpoint, params, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send('GET', endpoint, options, params);
        });
    }
    /**
     * Post data to the synapse node
     *
     * @param endpoint
     * @param body
     * @param options
     * @param params
     */
    post(endpoint, body, options, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send('POST', endpoint, options, params, body);
        });
    }
    /**
     * Put data to the synapse node
     *
     * @param endpoint
     * @param body
     * @param options
     * @param params
     */
    put(endpoint, body, options, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send('PUT', endpoint, options, params, body);
        });
    }
    /**
     * Send a request to the synapse node
     *
     * @param method
     * @param endpoint
     * @param config
     * @param requestParams
     * @param data
     */
    send(method, endpoint, config, requestParams, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = config ? this.getHeaders(config) : undefined;
            const params = requestParams ? this.getParams(requestParams) : undefined;
            const response = yield axios__WEBPACK_IMPORTED_MODULE_0___default.a.request({
                method,
                url: endpoint,
                baseURL: this.apiUrl(CLIENT_API_R0),
                headers,
                data,
                params
            });
            return response.data;
        });
    }
    /**
     * Get the headers based on the options object
     *
     * @param options
     */
    getHeaders(options) {
        const headers = {};
        const entries = [];
        if (options.accessToken) {
            entries.push(['Authorization', `Bearer ${options.accessToken}`]);
        }
        if (entries.length === 0) {
            return undefined;
        }
        for (const [key, value] of entries) {
            headers[key] = value;
        }
        return headers;
    }
    /**
     * Get parameters
     *
     * @param _params
     */
    getParams(_params) {
        if (!_params) {
            return undefined;
        }
        const params = Object.assign(_params, {});
        Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["keys"])(params).forEach((key) => params[key] === undefined && delete params[key]);
        return params;
    }
    /**
     * Construct API URL
     */
    apiUrl(...parts) {
        const apiBase = this.baseUrl.endsWith('/')
            ? this.baseUrl.substr(0, this.baseUrl.length - 1)
            : this.baseUrl;
        const apiParts = parts.map((path) => (path.startsWith('/') ? path.substr(1) : path));
        return [apiBase, ...apiParts].join('/');
    }
}
//# sourceMappingURL=MatrixHttpClient.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/models/MatrixClientEvent.js":
/*!************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/models/MatrixClientEvent.js ***!
  \************************************************************************/
/*! exports provided: MatrixClientEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixClientEventType", function() { return MatrixClientEventType; });
var MatrixClientEventType;
(function (MatrixClientEventType) {
    MatrixClientEventType["INVITE"] = "invite";
    MatrixClientEventType["MESSAGE"] = "message";
})(MatrixClientEventType || (MatrixClientEventType = {}));
//# sourceMappingURL=MatrixClientEvent.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/models/MatrixMessage.js":
/*!********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/models/MatrixMessage.js ***!
  \********************************************************************/
/*! exports provided: MatrixMessageType, MatrixMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixMessageType", function() { return MatrixMessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixMessage", function() { return MatrixMessage; });
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/events */ "../beacon-sdk/dist/esm/matrix-client/utils/events.js");

var MatrixMessageType;
(function (MatrixMessageType) {
    MatrixMessageType["TEXT"] = "m.text";
})(MatrixMessageType || (MatrixMessageType = {}));
class MatrixMessage {
    constructor(type, sender, content) {
        this.type = type;
        this.sender = sender;
        this.content = content;
    }
    /**
     * Construct a message from a message event
     *
     * @param event
     */
    static from(event) {
        if (Object(_utils_events__WEBPACK_IMPORTED_MODULE_0__["isTextMessageEvent"])(event)) {
            return new MatrixMessage(event.content.msgtype, event.sender, event.content.body);
        }
        // for now only text messages are supported
        return undefined;
    }
}
//# sourceMappingURL=MatrixMessage.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/models/MatrixRoom.js":
/*!*****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/models/MatrixRoom.js ***!
  \*****************************************************************/
/*! exports provided: MatrixRoomStatus, MatrixRoom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixRoomStatus", function() { return MatrixRoomStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixRoom", function() { return MatrixRoom; });
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/events */ "../beacon-sdk/dist/esm/matrix-client/utils/events.js");
/* harmony import */ var _MatrixMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MatrixMessage */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixMessage.js");


var MatrixRoomStatus;
(function (MatrixRoomStatus) {
    MatrixRoomStatus[MatrixRoomStatus["UNKNOWN"] = 0] = "UNKNOWN";
    MatrixRoomStatus[MatrixRoomStatus["JOINED"] = 1] = "JOINED";
    MatrixRoomStatus[MatrixRoomStatus["INVITED"] = 2] = "INVITED";
    MatrixRoomStatus[MatrixRoomStatus["LEFT"] = 3] = "LEFT";
})(MatrixRoomStatus || (MatrixRoomStatus = {}));
class MatrixRoom {
    constructor(id, status = MatrixRoomStatus.UNKNOWN, members = [], messages = []) {
        this.id = id;
        this.status = status;
        this.members = members;
        this.messages = messages;
    }
    /**
     * Reconstruct rooms from a sync response
     *
     * @param roomSync
     */
    static fromSync(roomSync) {
        function create(rooms, creator) {
            return Object.entries(rooms).map(([id, room]) => creator(id, room));
        }
        return [
            ...create(roomSync.join, MatrixRoom.fromJoined),
            ...create(roomSync.invite, MatrixRoom.fromInvited),
            ...create(roomSync.leave, MatrixRoom.fromLeft)
        ];
    }
    /**
     * Reconstruct a room from an ID or object
     *
     * @param roomOrId
     * @param status
     */
    static from(roomOrId, status) {
        return roomOrId instanceof MatrixRoom
            ? status
                ? new MatrixRoom(roomOrId.id, status, roomOrId.members, roomOrId.messages)
                : roomOrId
            : new MatrixRoom(roomOrId, status || MatrixRoomStatus.UNKNOWN);
    }
    /**
     * Merge new and old state and remove duplicates
     *
     * @param newState
     * @param previousState
     */
    static merge(newState, previousState) {
        if (!previousState || previousState.id !== newState.id) {
            return MatrixRoom.from(newState);
        }
        return new MatrixRoom(newState.id, newState.status, [...previousState.members, ...newState.members].filter((member, index, array) => array.indexOf(member) === index), [...previousState.messages, ...newState.messages]);
    }
    /**
     * Create a room from a join
     *
     * @param id
     * @param joined
     */
    static fromJoined(id, joined) {
        const events = [...joined.state.events, ...joined.timeline.events];
        const members = MatrixRoom.getMembersFromEvents(events);
        const messages = MatrixRoom.getMessagesFromEvents(events);
        return new MatrixRoom(id, MatrixRoomStatus.JOINED, members, messages);
    }
    /**
     * Create a room from an invite
     *
     * @param id
     * @param invited
     */
    static fromInvited(id, invited) {
        const members = MatrixRoom.getMembersFromEvents(invited.invite_state.events);
        return new MatrixRoom(id, MatrixRoomStatus.INVITED, members);
    }
    /**
     * Create a room from a leave
     *
     * @param id
     * @param left
     */
    static fromLeft(id, left) {
        const events = [...left.state.events, ...left.timeline.events];
        const members = MatrixRoom.getMembersFromEvents(events);
        const messages = MatrixRoom.getMessagesFromEvents(events);
        return new MatrixRoom(id, MatrixRoomStatus.LEFT, members, messages);
    }
    /**
     * Extract members from an event
     *
     * @param events
     */
    static getMembersFromEvents(events) {
        return MatrixRoom.getUniqueEvents(events.filter((event) => Object(_utils_events__WEBPACK_IMPORTED_MODULE_0__["isCreateEvent"])(event) || Object(_utils_events__WEBPACK_IMPORTED_MODULE_0__["isJoinEvent"])(event)))
            .map((event) => event.sender)
            .filter((member, index, array) => array.indexOf(member) === index);
    }
    /**
     * Extract messages from an event
     *
     * @param events
     */
    static getMessagesFromEvents(events) {
        return MatrixRoom.getUniqueEvents(events.filter(_utils_events__WEBPACK_IMPORTED_MODULE_0__["isMessageEvent"]))
            .map((event) => _MatrixMessage__WEBPACK_IMPORTED_MODULE_1__["MatrixMessage"].from(event))
            .filter(Boolean);
    }
    /**
     * Get unique events and remove duplicates
     *
     * @param events
     */
    static getUniqueEvents(events) {
        const eventIds = {};
        const uniqueEvents = [];
        events.forEach((event, index) => {
            const eventId = event.event_id;
            if (eventId === undefined || !(eventId in eventIds)) {
                if (eventId !== undefined) {
                    eventIds[eventId] = index;
                }
                uniqueEvents.push(event);
            }
        });
        return uniqueEvents;
    }
}
//# sourceMappingURL=MatrixRoom.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/services/MatrixEventService.js":
/*!***************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/services/MatrixEventService.js ***!
  \***************************************************************************/
/*! exports provided: MatrixEventService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixEventService", function() { return MatrixEventService; });
/* harmony import */ var _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/MatrixRoom */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixRoom.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * A service to help with matrix event management
 */
class MatrixEventService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.cachedPromises = new Map();
    }
    /**
     * Get the latest state from the matrix node
     *
     * @param accessToken
     * @param options
     */
    sync(accessToken, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withCache('sync', () => this.httpClient.get('/sync', {
                timeout: options ? options.pollingTimeout : undefined,
                since: options ? options.syncToken : undefined
            }, { accessToken }));
        });
    }
    /**
     * Send a message to a room
     *
     * @param accessToken
     * @param room
     * @param content
     * @param txnId
     */
    sendMessage(accessToken, room, content, txnId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => this.scheduleEvent({
                accessToken,
                room,
                type: 'm.room.message',
                content,
                txnId,
                onSuccess: resolve,
                onError: reject
            }));
        });
    }
    /**
     * Schedules an event to be sent to the node
     *
     * @param event
     */
    scheduleEvent(event) {
        // TODO: actual scheduling
        this.sendEvent(event);
    }
    /**
     * Send an event to the matrix node
     *
     * @param scheduledEvent
     */
    sendEvent(scheduledEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            const { room, type, txnId, content, accessToken } = scheduledEvent;
            if (room.status !== _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_0__["MatrixRoomStatus"].JOINED && room.status !== _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_0__["MatrixRoomStatus"].UNKNOWN) {
                return Promise.reject(`User is not a member of room ${room.id}.`);
            }
            try {
                const response = yield this.httpClient.put(`/rooms/${room.id}/send/${type}/${txnId}`, content, { accessToken });
                scheduledEvent.onSuccess(response);
            }
            catch (error) {
                scheduledEvent.onError(error);
            }
        });
    }
    /**
     * Check the cache when interacting with the Matrix node, if there is an already ongoing call for the specified key, return its promise instead of duplicating the call.
     *
     * @param key
     * @param promiseProvider
     */
    withCache(key, promiseProvider) {
        let promise = this.cachedPromises.get(key);
        if (!promise) {
            promise = promiseProvider().finally(() => {
                this.cachedPromises.delete(key);
            });
            this.cachedPromises.set(key, promise);
        }
        return promise;
    }
}
//# sourceMappingURL=MatrixEventService.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/services/MatrixRoomService.js":
/*!**************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/services/MatrixRoomService.js ***!
  \**************************************************************************/
/*! exports provided: MatrixRoomService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixRoomService", function() { return MatrixRoomService; });
/* harmony import */ var _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/MatrixRoom */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixRoom.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * A service to help with matrix room management
 */
class MatrixRoomService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Create a room
     *
     * @param accessToken
     * @param config
     */
    createRoom(accessToken, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.httpClient.post('/createRoom', config, { accessToken });
        });
    }
    /**
     * Invite a user to a room
     *
     * @param accessToken
     * @param user
     * @param room
     */
    inviteToRoom(accessToken, user, room) {
        return __awaiter(this, void 0, void 0, function* () {
            if (room.status !== _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_0__["MatrixRoomStatus"].JOINED && room.status !== _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_0__["MatrixRoomStatus"].UNKNOWN) {
                return Promise.reject(`User is not a member of room ${room.id}.`);
            }
            return this.httpClient.post(`/rooms/${room.id}/invite`, { user_id: user }, { accessToken });
        });
    }
    /**
     * Join a specific room
     *
     * @param accessToken
     * @param room
     */
    joinRoom(accessToken, room) {
        return __awaiter(this, void 0, void 0, function* () {
            if (room.status === _models_MatrixRoom__WEBPACK_IMPORTED_MODULE_0__["MatrixRoomStatus"].JOINED) {
                return Promise.resolve({ room_id: room.id });
            }
            return this.httpClient.post(`/rooms/${room.id}/join`, {}, { accessToken });
        });
    }
}
//# sourceMappingURL=MatrixRoomService.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/services/MatrixUserService.js":
/*!**************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/services/MatrixUserService.js ***!
  \**************************************************************************/
/*! exports provided: MatrixUserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixUserService", function() { return MatrixUserService; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MatrixUserService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Log in to the matrix node with username and password
     *
     * @param user
     * @param password
     * @param deviceId
     */
    login(user, password, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.httpClient.post('/login', {
                type: 'm.login.password',
                identifier: {
                    type: 'm.id.user',
                    user
                },
                password,
                device_id: deviceId
            });
        });
    }
}
//# sourceMappingURL=MatrixUserService.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/matrix-client/utils/events.js":
/*!************************************************************!*\
  !*** ../beacon-sdk/dist/esm/matrix-client/utils/events.js ***!
  \************************************************************/
/*! exports provided: isCreateEvent, isJoinEvent, isMessageEvent, isTextMessageEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCreateEvent", function() { return isCreateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isJoinEvent", function() { return isJoinEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMessageEvent", function() { return isMessageEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTextMessageEvent", function() { return isTextMessageEvent; });
/* harmony import */ var _models_MatrixMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/MatrixMessage */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixMessage.js");

/**
 * Check if an event is a create event
 *
 * @param event MatrixStateEvent
 */
const isCreateEvent = (event) => event.type === 'm.room.create' && event.content instanceof Object && 'creator' in event.content;
/**
 * Check if an event is a join event
 *
 * @param event MatrixStateEvent
 */
const isJoinEvent = (event) => event.type === 'm.room.member' &&
    event.content instanceof Object &&
    'membership' in event.content &&
    // eslint-disable-next-line dot-notation
    event.content['membership'] === 'join';
/**
 * Check if an event is a message event
 *
 * @param event MatrixStateEvent
 */
const isMessageEvent = (event) => event.type === 'm.room.message';
/**
 * Check if an event is a text message event
 *
 * @param event MatrixStateEvent
 */
const isTextMessageEvent = (event) => isMessageEvent(event) &&
    event.content instanceof Object &&
    'msgtype' in event.content &&
    // eslint-disable-next-line dot-notation
    event.content['msgtype'] === _models_MatrixMessage__WEBPACK_IMPORTED_MODULE_0__["MatrixMessageType"].TEXT;
//# sourceMappingURL=events.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/storage/ChromeStorage.js":
/*!*******************************************************!*\
  !*** ../beacon-sdk/dist/esm/storage/ChromeStorage.js ***!
  \*******************************************************/
/*! exports provided: ChromeStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChromeStorage", function() { return ChromeStorage; });
/* harmony import */ var _types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/storage/StorageKeyReturnDefaults */ "../beacon-sdk/dist/esm/types/storage/StorageKeyReturnDefaults.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class ChromeStorage {
    static isSupported() {
        return __awaiter(this, void 0, void 0, function* () {
            return (typeof window !== 'undefined' &&
                typeof chrome !== 'undefined' &&
                Boolean(chrome) &&
                Boolean(chrome.runtime) &&
                Boolean(chrome.runtime.id));
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                chrome.storage.local.get(null, (storageContent) => {
                    if (storageContent[key]) {
                        resolve(storageContent[key]);
                    }
                    else {
                        if (typeof _types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__["defaultValues"][key] === 'object') {
                            resolve(JSON.parse(JSON.stringify(_types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__["defaultValues"][key])));
                        }
                        else {
                            resolve(_types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__["defaultValues"][key]);
                        }
                    }
                });
            });
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                chrome.storage.local.set({ [key]: value }, () => {
                    resolve();
                });
            });
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                chrome.storage.local.set({ [key]: undefined }, () => {
                    resolve();
                });
            });
        });
    }
}
//# sourceMappingURL=ChromeStorage.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/storage/LocalStorage.js":
/*!******************************************************!*\
  !*** ../beacon-sdk/dist/esm/storage/LocalStorage.js ***!
  \******************************************************/
/*! exports provided: LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return LocalStorage; });
/* harmony import */ var _types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/storage/StorageKeyReturnDefaults */ "../beacon-sdk/dist/esm/types/storage/StorageKeyReturnDefaults.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class LocalStorage {
    constructor(prefix) {
        this.prefix = prefix;
    }
    static isSupported() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(Boolean(typeof window !== 'undefined') && Boolean(window.localStorage));
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = localStorage.getItem(this.getPrefixedKey(key));
            if (!value) {
                if (typeof _types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__["defaultValues"][key] === 'object') {
                    return JSON.parse(JSON.stringify(_types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__["defaultValues"][key]));
                }
                else {
                    return _types_storage_StorageKeyReturnDefaults__WEBPACK_IMPORTED_MODULE_0__["defaultValues"][key];
                }
            }
            else {
                try {
                    return JSON.parse(value);
                }
                catch (jsonParseError) {
                    return value; // TODO: Validate storage
                }
            }
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof value === 'string') {
                return localStorage.setItem(this.getPrefixedKey(key), value);
            }
            else {
                return localStorage.setItem(this.getPrefixedKey(key), JSON.stringify(value));
            }
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(localStorage.removeItem(this.getPrefixedKey(key)));
        });
    }
    getPrefixedKey(key) {
        return this.prefix ? `${this.prefix}-${key}` : key;
    }
}
//# sourceMappingURL=LocalStorage.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/storage/Storage.js":
/*!*************************************************!*\
  !*** ../beacon-sdk/dist/esm/storage/Storage.js ***!
  \*************************************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
/**
 * The storage used in the SDK
 */
class Storage {
    /**
     * Returns a promise that resolves to true if the storage option is available on this platform.
     */
    static isSupported() {
        return Promise.resolve(false);
    }
}
//# sourceMappingURL=Storage.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/storage/getStorage.js":
/*!****************************************************!*\
  !*** ../beacon-sdk/dist/esm/storage/getStorage.js ***!
  \****************************************************/
/*! exports provided: getStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return getStorage; });
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Logger */ "../beacon-sdk/dist/esm/utils/Logger.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"]('STORAGE');
/**
 * Get a supported storage on this platform
 */
const getStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    if (yield ___WEBPACK_IMPORTED_MODULE_1__["ChromeStorage"].isSupported()) {
        logger.log('getStorage', 'USING CHROME STORAGE');
        return new ___WEBPACK_IMPORTED_MODULE_1__["ChromeStorage"]();
    }
    else if (yield ___WEBPACK_IMPORTED_MODULE_1__["LocalStorage"].isSupported()) {
        logger.log('getStorage', 'USING LOCAL STORAGE');
        return new ___WEBPACK_IMPORTED_MODULE_1__["LocalStorage"]();
    }
    else {
        throw new Error('no storage type supported');
    }
});
//# sourceMappingURL=getStorage.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/ChromeMessageTransport.js":
/*!*******************************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/ChromeMessageTransport.js ***!
  \*******************************************************************/
/*! exports provided: ChromeMessageTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChromeMessageTransport", function() { return ChromeMessageTransport; });
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Logger */ "../beacon-sdk/dist/esm/utils/Logger.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _managers_PeerManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../managers/PeerManager */ "../beacon-sdk/dist/esm/managers/PeerManager.js");
/* harmony import */ var _types_transport_TransportStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/transport/TransportStatus */ "../beacon-sdk/dist/esm/types/transport/TransportStatus.js");
/* harmony import */ var _clients_ChromeMessageClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clients/ChromeMessageClient */ "../beacon-sdk/dist/esm/transports/clients/ChromeMessageClient.js");
// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"]('ChromeMessageTransport');
class ChromeMessageTransport extends ___WEBPACK_IMPORTED_MODULE_1__["Transport"] {
    constructor(name, keyPair, storage) {
        super(name);
        this.type = ___WEBPACK_IMPORTED_MODULE_1__["TransportType"].CHROME_MESSAGE;
        this.keyPair = keyPair;
        this.client = new _clients_ChromeMessageClient__WEBPACK_IMPORTED_MODULE_4__["ChromeMessageClient"](this.name, this.keyPair, false);
        this.peerManager = new _managers_PeerManager__WEBPACK_IMPORTED_MODULE_2__["PeerManager"](storage, ___WEBPACK_IMPORTED_MODULE_1__["StorageKey"].TRANSPORT_POSTMESSAGE_PEERS);
        this.init().catch((error) => console.error(error));
        this.connect().catch((error) => console.error(error));
    }
    static isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const isAvailable = Boolean(window.chrome && chrome.runtime && chrome.runtime.id);
            return Promise.resolve(isAvailable);
        });
    }
    connect() {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('connect');
            this._isConnected = _types_transport_TransportStatus__WEBPACK_IMPORTED_MODULE_3__["TransportStatus"].CONNECTING;
            const knownPeers = yield this.peerManager.getPeers();
            if (knownPeers.length > 0) {
                logger.log('connect', `connecting to ${knownPeers.length} peers`);
                const connectionPromises = knownPeers.map((peer) => __awaiter(this, void 0, void 0, function* () { return this.listen(peer.publicKey); }));
                yield Promise.all(connectionPromises);
            }
            yield _super.connect.call(this);
        });
    }
    send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                target: ___WEBPACK_IMPORTED_MODULE_1__["ExtensionMessageTarget"].PAGE,
                payload
            };
            chrome.runtime.sendMessage(message, (data) => {
                logger.log('send', 'got response', data);
            });
        });
    }
    sendToTabs(publicKey, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.sendMessage(publicKey, payload);
        });
    }
    getPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.peerManager.getPeers();
        });
    }
    addPeer(newPeer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.peerManager.hasPeer(newPeer.publicKey))) {
                logger.log('addPeer', newPeer);
                yield this.peerManager.addPeer(newPeer);
                yield this.listen(newPeer.publicKey);
            }
            else {
                logger.log('addPeer', 'peer already added, skipping', newPeer);
            }
            yield this.client.sendPairingResponse(newPeer);
        });
    }
    removePeer(peerToBeRemoved) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('removePeer', peerToBeRemoved);
            yield this.peerManager.removePeer(peerToBeRemoved.publicKey);
            if (this.client) {
                yield this.client.unsubscribeFromEncryptedMessage(peerToBeRemoved.publicKey);
            }
        });
    }
    removeAllPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('removeAllPeers');
            yield this.peerManager.removeAllPeers();
            yield this.client.unsubscribeFromEncryptedMessages();
        });
    }
    listen(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .listenForEncryptedMessage(publicKey, (message, sender, sendResponse) => __awaiter(this, void 0, void 0, function* () {
                const connectionContext = {
                    origin: ___WEBPACK_IMPORTED_MODULE_1__["Origin"].WEBSITE,
                    id: sender.url ? sender.url : '',
                    extras: { sender, sendResponse }
                };
                this.notifyListeners(message, connectionContext).catch((error) => {
                    throw error;
                });
            }))
                .catch((error) => {
                throw error;
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                logger.log('init', 'receiving chrome message', message, sender);
                if (message && message.payload && typeof message.payload === 'string') {
                    // Handling PairingRequest and connect peer
                    new ___WEBPACK_IMPORTED_MODULE_1__["Serializer"]()
                        .deserialize(message.payload)
                        .then((deserialized) => {
                        // TODO: Add check if it's a peer
                        if (deserialized.publicKey) {
                            this.addPeer(deserialized).catch(console.error);
                        }
                        else {
                            // V1 does not support encryption, so we handle the message directly
                            if (deserialized.version === '1') {
                                this.notify(message, sender, sendResponse).catch((error) => {
                                    throw error;
                                });
                            }
                        }
                    })
                        .catch(undefined);
                }
                else if (message && message.payload) {
                    // Most likely an internal, unencrypted message
                    this.notify(message, sender, sendResponse).catch((error) => {
                        throw error;
                    });
                }
                // return true from the event listener to indicate you wish to send a response asynchronously
                // (this will keep the message channel open to the other end until sendResponse is called).
                // return true
            });
        });
    }
    notify(message, sender, sendResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionContext = {
                origin: ___WEBPACK_IMPORTED_MODULE_1__["Origin"].WEBSITE,
                id: sender.url ? sender.url : '',
                extras: { sender, sendResponse }
            };
            this.notifyListeners(message, connectionContext).catch((error) => {
                throw error;
            });
        });
    }
}
//# sourceMappingURL=ChromeMessageTransport.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/P2PTransport.js":
/*!*********************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/P2PTransport.js ***!
  \*********************************************************/
/*! exports provided: P2PTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P2PTransport", function() { return P2PTransport; });
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Logger */ "../beacon-sdk/dist/esm/utils/Logger.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events */ "../beacon-sdk/dist/esm/events.js");
/* harmony import */ var _managers_PeerManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../managers/PeerManager */ "../beacon-sdk/dist/esm/managers/PeerManager.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"]('P2PTransport');
class P2PTransport extends ___WEBPACK_IMPORTED_MODULE_1__["Transport"] {
    constructor(name, keyPair, storage, events, matrixNodes, isDapp) {
        super(name);
        this.type = ___WEBPACK_IMPORTED_MODULE_1__["TransportType"].P2P;
        this.isDapp = true;
        // Make sure we only listen once
        this.listeningForChannelOpenings = false;
        this.events = events;
        this.isDapp = isDapp;
        this.client = new ___WEBPACK_IMPORTED_MODULE_1__["P2PCommunicationClient"](this.name, keyPair, 1, storage, matrixNodes, false);
        this.peerManager = new _managers_PeerManager__WEBPACK_IMPORTED_MODULE_3__["PeerManager"](storage, ___WEBPACK_IMPORTED_MODULE_1__["StorageKey"].TRANSPORT_P2P_PEERS);
    }
    static isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(true);
        });
    }
    connect() {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('connect');
            this._isConnected = ___WEBPACK_IMPORTED_MODULE_1__["TransportStatus"].CONNECTING;
            yield this.client.start();
            const knownPeers = yield this.peerManager.getPeers();
            if (knownPeers.length > 0) {
                logger.log('connect', `connecting to ${knownPeers.length} peers`);
                const connectionPromises = knownPeers.map((peer) => __awaiter(this, void 0, void 0, function* () { return this.listen(peer.publicKey); }));
                yield Promise.all(connectionPromises);
            }
            else {
                if (this.isDapp) {
                    yield this.connectNewPeer();
                }
            }
            yield _super.connect.call(this);
        });
    }
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDapp) {
                yield this.connectNewPeer();
            }
        });
    }
    connectNewPeer() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('connectNewPeer');
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!this.listeningForChannelOpenings) {
                    yield this.client.listenForChannelOpening((peer) => __awaiter(this, void 0, void 0, function* () {
                        logger.log('connectNewPeer', `new publicKey`, peer.publicKey);
                        yield this.addPeer(peer);
                        this.events
                            .emit(_events__WEBPACK_IMPORTED_MODULE_2__["BeaconEvent"].P2P_CHANNEL_CONNECT_SUCCESS, peer)
                            .catch((emitError) => console.warn(emitError));
                        resolve();
                    }));
                    this.listeningForChannelOpenings = true;
                }
                this.events
                    .emit(_events__WEBPACK_IMPORTED_MODULE_2__["BeaconEvent"].P2P_LISTEN_FOR_CHANNEL_OPEN, yield this.client.getHandshakeInfo())
                    .catch((emitError) => console.warn(emitError));
            }));
        });
    }
    getPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.peerManager.getPeers();
        });
    }
    addPeer(newPeer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.peerManager.hasPeer(newPeer.publicKey))) {
                logger.log('addPeer', newPeer);
                yield this.peerManager.addPeer(newPeer);
                yield this.listen(newPeer.publicKey); // TODO: Prevent channels from being opened multiple times
            }
            else {
                logger.log('addPeer', 'peer already added, skipping', newPeer);
            }
            yield this.client.sendPairingResponse(newPeer); // TODO: Should we have a confirmation here?
        });
    }
    removePeer(peerToBeRemoved) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('removePeer', peerToBeRemoved);
            yield this.peerManager.removePeer(peerToBeRemoved.publicKey);
            if (this.client) {
                yield this.client.unsubscribeFromEncryptedMessage(peerToBeRemoved.publicKey);
            }
        });
    }
    removeAllPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('removeAllPeers');
            yield this.peerManager.removeAllPeers();
            yield this.client.unsubscribeFromEncryptedMessages();
        });
    }
    send(message, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            const knownPeers = yield this.peerManager.getPeers();
            if (recipient) {
                if (!knownPeers.some((peer) => peer.publicKey === recipient)) {
                    throw new Error('Recipient unknown');
                }
                return this.client.sendMessage(recipient, message);
            }
            else {
                // A broadcast request has to be sent everywhere.
                const promises = knownPeers.map((peer) => this.client.sendMessage(peer.publicKey, message));
                return (yield Promise.all(promises))[0];
            }
        });
    }
    listen(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .listenForEncryptedMessage(publicKey, (message) => {
                const connectionContext = {
                    origin: ___WEBPACK_IMPORTED_MODULE_1__["Origin"].P2P,
                    id: publicKey
                };
                this.notifyListeners(message, connectionContext).catch((error) => {
                    throw error;
                });
            })
                .catch((error) => {
                throw error;
            });
        });
    }
}
//# sourceMappingURL=P2PTransport.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/PostMessageTransport.js":
/*!*****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/PostMessageTransport.js ***!
  \*****************************************************************/
/*! exports provided: PostMessageTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostMessageTransport", function() { return PostMessageTransport; });
/* harmony import */ var _MockWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MockWindow */ "../beacon-sdk/dist/esm/MockWindow.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _types_Origin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Origin */ "../beacon-sdk/dist/esm/types/Origin.js");
/* harmony import */ var _managers_PeerManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../managers/PeerManager */ "../beacon-sdk/dist/esm/managers/PeerManager.js");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Logger */ "../beacon-sdk/dist/esm/utils/Logger.js");
/* harmony import */ var _Transport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Transport */ "../beacon-sdk/dist/esm/transports/Transport.js");
/* harmony import */ var _clients_PostMessageClient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clients/PostMessageClient */ "../beacon-sdk/dist/esm/transports/clients/PostMessageClient.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"]('PostMessageTransport');
class PostMessageTransport extends _Transport__WEBPACK_IMPORTED_MODULE_5__["Transport"] {
    constructor(name, keyPair, storage, isDapp) {
        super(name);
        this.type = ___WEBPACK_IMPORTED_MODULE_1__["TransportType"].POST_MESSAGE;
        /**
         * A flag indicating whether
         */
        this.isDapp = true;
        // Make sure we only listen once
        this.listeningForChannelOpenings = false;
        this.isDapp = isDapp;
        this.client = new _clients_PostMessageClient__WEBPACK_IMPORTED_MODULE_6__["PostMessageClient"](this.name, keyPair, false);
        this.peerManager = new _managers_PeerManager__WEBPACK_IMPORTED_MODULE_3__["PeerManager"](storage, ___WEBPACK_IMPORTED_MODULE_1__["StorageKey"].TRANSPORT_POSTMESSAGE_PEERS);
    }
    static isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fn = (event) => {
                    const data = event.data;
                    if (data && data.payload === 'pong') {
                        resolve(true);
                        _MockWindow__WEBPACK_IMPORTED_MODULE_0__["myWindow"].removeEventListener('message', fn);
                    }
                };
                _MockWindow__WEBPACK_IMPORTED_MODULE_0__["myWindow"].addEventListener('message', fn);
                const message = {
                    target: ___WEBPACK_IMPORTED_MODULE_1__["ExtensionMessageTarget"].EXTENSION,
                    payload: 'ping'
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                _MockWindow__WEBPACK_IMPORTED_MODULE_0__["myWindow"].postMessage(message, window.location.origin);
            });
        });
    }
    connect() {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('connect');
            this._isConnected = ___WEBPACK_IMPORTED_MODULE_1__["TransportStatus"].CONNECTING;
            const knownPeers = yield this.peerManager.getPeers();
            if (knownPeers.length > 0) {
                logger.log('connect', `connecting to ${knownPeers.length} peers`);
                const connectionPromises = knownPeers.map((peer) => __awaiter(this, void 0, void 0, function* () { return this.listen(peer.publicKey); }));
                yield Promise.all(connectionPromises);
            }
            else {
                if (this.isDapp) {
                    yield this.connectNewPeer();
                }
            }
            yield _super.connect.call(this);
        });
    }
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDapp) {
                yield this.connectNewPeer();
            }
        });
    }
    connectNewPeer() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('connectNewPeer');
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!this.listeningForChannelOpenings) {
                    yield this.client.listenForChannelOpening((pairingResponse) => __awaiter(this, void 0, void 0, function* () {
                        logger.log('connectNewPeer', `received PairingResponse`, pairingResponse);
                        yield this.addPeer(pairingResponse);
                        resolve();
                    }));
                    this.listeningForChannelOpenings = true;
                }
            }));
        });
    }
    getPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.peerManager.getPeers();
        });
    }
    addPeer(newPeer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.peerManager.hasPeer(newPeer.publicKey))) {
                logger.log('addPeer', newPeer);
                yield this.peerManager.addPeer(newPeer);
                yield this.listen(newPeer.publicKey);
            }
            else {
                logger.log('addPeer', 'peer already added, skipping', newPeer);
            }
        });
    }
    removePeer(peerToBeRemoved) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('removePeer', peerToBeRemoved);
            yield this.peerManager.removePeer(peerToBeRemoved.publicKey);
            yield this.client.unsubscribeFromEncryptedMessage(peerToBeRemoved.publicKey);
        });
    }
    removeAllPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('removeAllPeers');
            yield this.peerManager.removeAllPeers();
            yield this.client.unsubscribeFromEncryptedMessages();
        });
    }
    send(message, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('send', recipient, message);
            if (recipient) {
                yield this.client.sendMessage(recipient, message);
            }
            else {
                const peers = yield this.peerManager.getPeers();
                yield Promise.all(peers.map((peer) => this.client.sendMessage(peer.publicKey, message).catch(console.error)));
            }
        });
    }
    listen(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('listen', publicKey);
            yield this.client
                .listenForEncryptedMessage(publicKey, (message, context) => {
                const connectionContext = {
                    origin: _types_Origin__WEBPACK_IMPORTED_MODULE_2__["Origin"].EXTENSION,
                    id: context.id
                };
                this.notifyListeners(message, connectionContext).catch((error) => {
                    throw error;
                });
            })
                .catch((error) => {
                throw error;
            });
        });
    }
}
//# sourceMappingURL=PostMessageTransport.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/Transport.js":
/*!******************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/Transport.js ***!
  \******************************************************/
/*! exports provided: Transport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transport", function() { return Transport; });
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Logger */ "../beacon-sdk/dist/esm/utils/Logger.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"]('Transport');
class Transport {
    constructor(name) {
        /**
         * The type of the transport
         */
        this.type = ___WEBPACK_IMPORTED_MODULE_1__["TransportType"].POST_MESSAGE;
        /**
         * The status of the transport
         */
        this._isConnected = ___WEBPACK_IMPORTED_MODULE_1__["TransportStatus"].NOT_CONNECTED;
        /**
         * The listeners that will be notified when new messages are coming in
         */
        this.listeners = [];
        this.name = name;
    }
    /**
     * Return the status of the connection
     */
    get connectionStatus() {
        return this._isConnected;
    }
    /**
     * Returns a promise that resolves to true if the transport is available, false if it is not
     */
    static isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(false);
        });
    }
    /**
     * Connect the transport
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('connect');
            this._isConnected = ___WEBPACK_IMPORTED_MODULE_1__["TransportStatus"].CONNECTED;
            return;
        });
    }
    /**
     * Reconnect the transport
     *
     * This method will be called if we tried to connect, but it didn't work
     */
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('reconnect');
            return;
        });
    }
    /**
     * Send a message through the transport
     *
     * @param message The message to send
     * @param recipient The recipient of the message
     */
    send(message, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('send', message, recipient);
            return;
        });
    }
    /**
     * Add a listener to be called when a new message is received
     *
     * @param listener The listener that will be registered
     */
    addListener(listener) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('addListener');
            this.listeners.push(listener);
            return;
        });
    }
    /**
     * Remove a listener
     *
     * @param listener
     */
    removeListener(listener) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('removeListener');
            this.listeners = this.listeners.filter((element) => element !== listener);
            return;
        });
    }
    /**
     * Notify the listeners when a new message comes in
     *
     * @param message Message
     * @param connectionInfo Context info about the connection
     */
    notifyListeners(message, connectionInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('notifyListeners');
            if (this.listeners.length === 0) {
                logger.warn('notifyListeners', '0 listeners notified!', this);
            }
            else {
                logger.log(`Notifying ${this.listeners.length} listeners`, this);
            }
            this.listeners.forEach((listener) => {
                listener(message, connectionInfo);
            });
            return;
        });
    }
}
//# sourceMappingURL=Transport.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/clients/ChromeMessageClient.js":
/*!************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/clients/ChromeMessageClient.js ***!
  \************************************************************************/
/*! exports provided: ChromeMessageClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChromeMessageClient", function() { return ChromeMessageClient; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../.. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony import */ var _MessageBasedClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageBasedClient */ "../beacon-sdk/dist/esm/transports/clients/MessageBasedClient.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class ChromeMessageClient extends _MessageBasedClient__WEBPACK_IMPORTED_MODULE_2__["MessageBasedClient"] {
    constructor() {
        super(...arguments);
        this.activeListeners = new Map();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscribeToMessages().catch(console.error);
        });
    }
    listenForEncryptedMessage(senderPublicKey, messageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.activeListeners.has(senderPublicKey)) {
                return;
            }
            const callbackFunction = (message, sender, sendResponse) => __awaiter(this, void 0, void 0, function* () {
                if (message.hasOwnProperty('encryptedPayload')) {
                    const encryptedMessage = message;
                    try {
                        const decrypted = yield this.decryptMessage(senderPublicKey, encryptedMessage.encryptedPayload);
                        const decryptedMessage = {
                            payload: decrypted,
                            target: encryptedMessage.target,
                            sender: encryptedMessage.sender
                        };
                        messageCallback(decryptedMessage, sender, sendResponse);
                    }
                    catch (decryptionError) {
                        /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                    }
                }
            });
            this.activeListeners.set(senderPublicKey, callbackFunction);
        });
    }
    sendMessage(recipientPublicKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = {
                target: ___WEBPACK_IMPORTED_MODULE_0__["ExtensionMessageTarget"].PAGE,
                payload: message
            };
            // If no recipient public key is provided, we respond with an unencrypted message
            if (recipientPublicKey) {
                const payload = yield this.encryptMessage(recipientPublicKey, message);
                msg = {
                    target: ___WEBPACK_IMPORTED_MODULE_0__["ExtensionMessageTarget"].PAGE,
                    encryptedPayload: payload
                };
            }
            chrome.tabs.query({}, (tabs) => {
                // TODO: Find way to have direct communication with tab
                tabs.forEach(({ id }) => {
                    if (id) {
                        chrome.tabs.sendMessage(id, msg);
                    }
                }); // Send message to all tabs
            });
        });
    }
    sendPairingResponse(pairingRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedMessage = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_1__["sealCryptobox"])(JSON.stringify(yield this.getHandshakeInfo()), Buffer.from(pairingRequest.publicKey, 'hex'));
            const message = {
                target: ___WEBPACK_IMPORTED_MODULE_0__["ExtensionMessageTarget"].PAGE,
                payload: encryptedMessage
            };
            chrome.tabs.query({}, (tabs) => {
                // TODO: Find way to have direct communication with tab
                tabs.forEach(({ id }) => {
                    if (id) {
                        chrome.tabs.sendMessage(id, message);
                    }
                }); // Send message to all tabs
            });
        });
    }
    subscribeToMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                this.activeListeners.forEach((listener) => {
                    listener(message, sender, sendResponse);
                });
                // return true from the event listener to indicate you wish to send a response asynchronously
                // (this will keep the message channel open to the other end until sendResponse is called).
                return true;
            });
        });
    }
}
//# sourceMappingURL=ChromeMessageClient.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/clients/CommunicationClient.js":
/*!************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/clients/CommunicationClient.js ***!
  \************************************************************************/
/*! exports provided: CommunicationClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunicationClient", function() { return CommunicationClient; });
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libsodium-wrappers */ "../beacon-sdk/node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class CommunicationClient {
    constructor(keyPair) {
        this.keyPair = keyPair;
    }
    /**
     * Get the public key
     */
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_1__["toHex"])(this.keyPair.publicKey);
        });
    }
    /**
     * get the public key hash
     */
    getPublicKeyHash() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_1__["getHexHash"])(this.keyPair.publicKey);
        });
    }
    /**
     * Create a cryptobox shared key
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    createCryptoBox(otherPublicKey, selfPrivateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Don't calculate it every time?
            const kxSelfPrivateKey = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_sign_ed25519_sk_to_curve25519"](Buffer.from(selfPrivateKey)); // Secret bytes to scalar bytes
            const kxSelfPublicKey = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_sign_ed25519_pk_to_curve25519"](Buffer.from(selfPrivateKey).slice(32, 64)); // Secret bytes to scalar bytes
            const kxOtherPublicKey = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_sign_ed25519_pk_to_curve25519"](Buffer.from(otherPublicKey, 'hex')); // Secret bytes to scalar bytes
            return [
                Buffer.from(kxSelfPublicKey),
                Buffer.from(kxSelfPrivateKey),
                Buffer.from(kxOtherPublicKey)
            ];
        });
    }
    /**
     * Create a cryptobox server
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    createCryptoBoxServer(otherPublicKey, selfPrivateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.createCryptoBox(otherPublicKey, selfPrivateKey);
            return libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_kx_server_session_keys"](...keys);
        });
    }
    /**
     * Create a cryptobox client
     *
     * @param otherPublicKey
     * @param selfPrivateKey
     */
    createCryptoBoxClient(otherPublicKey, selfPrivateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.createCryptoBox(otherPublicKey, selfPrivateKey);
            return libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_kx_client_session_keys"](...keys);
        });
    }
}
//# sourceMappingURL=CommunicationClient.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/clients/MessageBasedClient.js":
/*!***********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/clients/MessageBasedClient.js ***!
  \***********************************************************************/
/*! exports provided: MessageBasedClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageBasedClient", function() { return MessageBasedClient; });
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libsodium-wrappers */ "../beacon-sdk/node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../beacon-sdk/dist/esm/constants.js");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony import */ var _CommunicationClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CommunicationClient */ "../beacon-sdk/dist/esm/transports/clients/CommunicationClient.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class MessageBasedClient extends _CommunicationClient__WEBPACK_IMPORTED_MODULE_3__["CommunicationClient"] {
    constructor(name, keyPair, debug = true) {
        super(keyPair);
        this.name = name;
        this.debug = debug;
        /**
         * The listeners that will be notified of new messages
         */
        this.activeListeners = new Map();
        this.init().catch(console.error);
    }
    /**
     * start the client and make sure all dependencies are ready
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["ready"];
        });
    }
    /**
     * Get the handshake information. This will be shared with the peer during the connection setup
     */
    getHandshakeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                name: this.name,
                version: _constants__WEBPACK_IMPORTED_MODULE_1__["BEACON_VERSION"],
                publicKey: yield this.getPublicKey()
            };
        });
    }
    /**
     * Unsubscribe from encrypted messages from a specific peer
     *
     * @param senderPublicKey
     */
    unsubscribeFromEncryptedMessage(senderPublicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const listener = this.activeListeners.get(senderPublicKey);
            if (!listener) {
                return;
            }
            this.activeListeners.delete(senderPublicKey);
        });
    }
    /**
     * Unsubscribe from all encrypted messages
     */
    unsubscribeFromEncryptedMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeListeners.clear();
        });
    }
    /**
     * Decrypt a message from a specific peer
     *
     * @param senderPublicKey
     * @param payload
     */
    decryptMessage(senderPublicKey, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sharedRx } = yield this.createCryptoBoxServer(senderPublicKey, this.keyPair.privateKey);
            const hexPayload = Buffer.from(payload, 'hex');
            if (hexPayload.length >=
                libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_NONCEBYTES"] + libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_MACBYTES"]) {
                try {
                    return yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["decryptCryptoboxPayload"])(hexPayload, sharedRx);
                }
                catch (decryptionError) {
                    /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                }
            }
            throw new Error('Could not decrypt message');
        });
    }
    /**
     * Encrypt a message for a specific publicKey (receiver)
     *
     * @param recipientPublicKey
     * @param message
     */
    encryptMessage(recipientPublicKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sharedTx } = yield this.createCryptoBoxClient(recipientPublicKey, this.keyPair.privateKey);
            return Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["encryptCryptoboxPayload"])(message, sharedTx);
        });
    }
}
//# sourceMappingURL=MessageBasedClient.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/clients/P2PCommunicationClient.js":
/*!***************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/clients/P2PCommunicationClient.js ***!
  \***************************************************************************/
/*! exports provided: P2PCommunicationClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P2PCommunicationClient", function() { return P2PCommunicationClient; });
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libsodium-wrappers */ "../beacon-sdk/node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bignumber.js */ "../beacon-sdk/node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony import */ var _matrix_client_MatrixClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../matrix-client/MatrixClient */ "../beacon-sdk/dist/esm/matrix-client/MatrixClient.js");
/* harmony import */ var _matrix_client_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../matrix-client/models/MatrixClientEvent */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixClientEvent.js");
/* harmony import */ var _matrix_client_models_MatrixMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../matrix-client/models/MatrixMessage */ "../beacon-sdk/dist/esm/matrix-client/models/MatrixMessage.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants */ "../beacon-sdk/dist/esm/constants.js");
/* harmony import */ var _CommunicationClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CommunicationClient */ "../beacon-sdk/dist/esm/transports/clients/CommunicationClient.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const KNOWN_RELAY_SERVERS = [
    'matrix.papers.tech'
    // 'matrix.tez.ie',
    // 'matrix-dev.papers.tech',
    // "matrix.stove-labs.com",
    // "yadayada.cryptonomic-infra.tech"
];
class P2PCommunicationClient extends _CommunicationClient__WEBPACK_IMPORTED_MODULE_7__["CommunicationClient"] {
    constructor(name, keyPair, replicationCount, storage, matrixNodes, debug = false) {
        super(keyPair);
        this.name = name;
        this.replicationCount = replicationCount;
        this.storage = storage;
        this.debug = debug;
        this.clients = [];
        this.activeListeners = new Map();
        this.KNOWN_RELAY_SERVERS = matrixNodes.length > 0 ? matrixNodes : KNOWN_RELAY_SERVERS;
    }
    getHandshakeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                name: this.name,
                version: _constants__WEBPACK_IMPORTED_MODULE_6__["BEACON_VERSION"],
                publicKey: yield this.getPublicKey(),
                relayServer: yield this.getRelayServer()
            };
        });
    }
    getRelayServer(publicKeyHash, nonce = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = publicKeyHash || (yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getHexHash"])(this.keyPair.publicKey));
            return this.KNOWN_RELAY_SERVERS.reduce((prevPromise, curr) => __awaiter(this, void 0, void 0, function* () {
                const prev = yield prevPromise;
                const prevRelayServerHash = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getHexHash"])(prev + nonce);
                const currRelayServerHash = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getHexHash"])(curr + nonce);
                const prevBigInt = yield this.getAbsoluteBigIntDifference(hash, prevRelayServerHash);
                const currBigInt = yield this.getAbsoluteBigIntDifference(hash, currRelayServerHash);
                return prevBigInt.isLessThan(currBigInt) ? prev : curr;
            }), Promise.resolve(this.KNOWN_RELAY_SERVERS[0]));
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.log('starting client');
            yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["ready"];
            const loginRawDigest = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_generichash"](32, libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["from_string"](`login:${Math.floor(Date.now() / 1000 / (5 * 60))}`));
            const rawSignature = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_sign_detached"](loginRawDigest, this.keyPair.privateKey);
            yield this.log(`connecting to ${this.replicationCount} servers`);
            for (let i = 0; i < this.replicationCount; i++) {
                // TODO: Parallel
                const client = _matrix_client_MatrixClient__WEBPACK_IMPORTED_MODULE_3__["MatrixClient"].create({
                    baseUrl: `https://${yield this.getRelayServer(yield this.getPublicKeyHash(), i.toString())}`,
                    storage: this.storage
                });
                client.subscribe(_matrix_client_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_4__["MatrixClientEventType"].INVITE, (event) => __awaiter(this, void 0, void 0, function* () {
                    yield client.joinRooms(event.content.roomId);
                }));
                yield this.log('login', yield this.getPublicKeyHash(), 'on', yield this.getRelayServer(yield this.getPublicKeyHash(), i.toString()));
                yield client
                    .start({
                    id: yield this.getPublicKeyHash(),
                    password: `ed:${Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["toHex"])(rawSignature)}:${yield this.getPublicKey()}`,
                    deviceId: Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["toHex"])(this.keyPair.publicKey)
                })
                    .catch((error) => this.log(error));
                yield client.joinRooms(...client.invitedRooms).catch((error) => this.log(error));
                this.clients.push(client);
            }
        });
    }
    listenForEncryptedMessage(senderPublicKey, messageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.activeListeners.has(senderPublicKey)) {
                return;
            }
            const { sharedRx } = yield this.createCryptoBoxServer(senderPublicKey, this.keyPair.privateKey);
            const callbackFunction = (event) => __awaiter(this, void 0, void 0, function* () {
                if (this.isTextMessage(event.content) && (yield this.isSender(event, senderPublicKey))) {
                    const payload = Buffer.from(event.content.message.content, 'hex');
                    if (payload.length >=
                        libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_NONCEBYTES"] + libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_MACBYTES"]) {
                        try {
                            messageCallback(yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["decryptCryptoboxPayload"])(payload, sharedRx));
                        }
                        catch (decryptionError) {
                            /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                        }
                    }
                }
            });
            this.activeListeners.set(senderPublicKey, callbackFunction);
            for (const client of this.clients) {
                client.subscribe(_matrix_client_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_4__["MatrixClientEventType"].MESSAGE, callbackFunction);
            }
        });
    }
    unsubscribeFromEncryptedMessage(senderPublicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const listener = this.activeListeners.get(senderPublicKey);
            if (!listener) {
                return;
            }
            for (const client of this.clients) {
                client.unsubscribe(_matrix_client_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_4__["MatrixClientEventType"].MESSAGE, listener);
            }
            this.activeListeners.delete(senderPublicKey);
        });
    }
    unsubscribeFromEncryptedMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const client of this.clients) {
                client.unsubscribe(_matrix_client_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_4__["MatrixClientEventType"].MESSAGE);
            }
            this.activeListeners.clear();
        });
    }
    sendMessage(recipientPublicKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sharedTx } = yield this.createCryptoBoxClient(recipientPublicKey, this.keyPair.privateKey);
            for (let i = 0; i < this.replicationCount; i++) {
                const recipientHash = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getHexHash"])(Buffer.from(recipientPublicKey, 'hex'));
                const recipient = Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["recipientString"])(recipientHash, yield this.getRelayServer(recipientHash, i.toString()));
                for (const client of this.clients) {
                    const room = yield this.getRelevantRoom(client, recipient);
                    client
                        .sendTextMessage(room.id, yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["encryptCryptoboxPayload"])(message, sharedTx))
                        .catch((error) => this.log(error));
                }
            }
        });
    }
    listenForChannelOpening(messageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const client of this.clients) {
                client.subscribe(_matrix_client_models_MatrixClientEvent__WEBPACK_IMPORTED_MODULE_4__["MatrixClientEventType"].MESSAGE, (event) => __awaiter(this, void 0, void 0, function* () {
                    yield this.log('channel opening', event);
                    if (this.isTextMessage(event.content) && (yield this.isChannelOpenMessage(event.content))) {
                        yield this.log('new channel open event!');
                        const splits = event.content.message.content.split(':');
                        const payload = Buffer.from(splits[splits.length - 1], 'hex');
                        if (payload.length >=
                            libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_NONCEBYTES"] + libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_MACBYTES"]) {
                            try {
                                messageCallback(JSON.parse(yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["openCryptobox"])(payload, this.keyPair.publicKey, this.keyPair.privateKey)));
                            }
                            catch (decryptionError) {
                                /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                            }
                        }
                    }
                }));
            }
        });
    }
    sendPairingResponse(pairingRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.log('open channel');
            const recipientHash = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getHexHash"])(Buffer.from(pairingRequest.publicKey, 'hex'));
            const recipient = Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["recipientString"])(recipientHash, pairingRequest.relayServer);
            yield this.log(`currently there are ${this.clients.length} clients open`);
            for (const client of this.clients) {
                const room = yield this.getRelevantRoom(client, recipient);
                // TODO: remove v1 backwards-compatibility
                const message = typeof pairingRequest.version === 'undefined'
                    ? yield this.getPublicKey() // v1
                    : JSON.stringify(yield this.getHandshakeInfo()); // v2
                const encryptedMessage = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["sealCryptobox"])(message, Buffer.from(pairingRequest.publicKey, 'hex'));
                client
                    .sendTextMessage(room.id, ['@channel-open', recipient, encryptedMessage].join(':'))
                    .catch((error) => this.log(error));
            }
        });
    }
    isTextMessage(content) {
        return content.message.type === _matrix_client_models_MatrixMessage__WEBPACK_IMPORTED_MODULE_5__["MatrixMessageType"].TEXT;
    }
    isChannelOpenMessage(content) {
        return __awaiter(this, void 0, void 0, function* () {
            return content.message.content.startsWith(`@channel-open:@${yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getHexHash"])(Buffer.from(yield this.getPublicKey(), 'hex'))}`);
        });
    }
    isSender(event, senderPublicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return event.content.message.sender.startsWith(`@${yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["getHexHash"])(Buffer.from(senderPublicKey, 'hex'))}`);
        });
    }
    getAbsoluteBigIntDifference(firstHash, secondHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const difference = new bignumber_js__WEBPACK_IMPORTED_MODULE_1___default.a(`0x${firstHash}`).minus(`0x${secondHash}`);
            return difference.absoluteValue();
        });
    }
    getRelevantRoom(client, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            const joinedRooms = client.joinedRooms;
            const relevantRooms = joinedRooms.filter((roomElement) => roomElement.members.some((member) => member === recipient));
            let room;
            if (relevantRooms.length === 0) {
                yield this.log(`no relevant rooms found`);
                const roomId = yield client.createTrustedPrivateRoom(recipient);
                room = client.getRoomById(roomId);
            }
            else {
                room = relevantRooms[0];
                yield this.log(`channel already open, reusing room ${room.id}`);
            }
            return room;
        });
    }
    log(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debug) {
                console.log(`--- [P2PCommunicationClient]:${this.name}: `, ...args);
            }
        });
    }
}
//# sourceMappingURL=P2PCommunicationClient.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/transports/clients/PostMessageClient.js":
/*!**********************************************************************!*\
  !*** ../beacon-sdk/dist/esm/transports/clients/PostMessageClient.js ***!
  \**********************************************************************/
/*! exports provided: PostMessageClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostMessageClient", function() { return PostMessageClient; });
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libsodium-wrappers */ "../beacon-sdk/node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MockWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../MockWindow */ "../beacon-sdk/dist/esm/MockWindow.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/crypto */ "../beacon-sdk/dist/esm/utils/crypto.js");
/* harmony import */ var _MessageBasedClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MessageBasedClient */ "../beacon-sdk/dist/esm/transports/clients/MessageBasedClient.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class PostMessageClient extends _MessageBasedClient__WEBPACK_IMPORTED_MODULE_4__["MessageBasedClient"] {
    constructor() {
        super(...arguments);
        this.activeListeners = new Map();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscribeToMessages().catch(console.error);
        });
    }
    listenForEncryptedMessage(senderPublicKey, messageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.activeListeners.has(senderPublicKey)) {
                return;
            }
            const callbackFunction = (message, context) => __awaiter(this, void 0, void 0, function* () {
                try {
                    messageCallback(yield this.decryptMessage(senderPublicKey, message.encryptedPayload), context);
                }
                catch (decryptionError) {
                    /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                }
            });
            this.activeListeners.set(senderPublicKey, callbackFunction);
        });
    }
    sendMessage(recipientPublicKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.encryptMessage(recipientPublicKey, message);
            const msg = {
                target: ___WEBPACK_IMPORTED_MODULE_2__["ExtensionMessageTarget"].EXTENSION,
                encryptedPayload: payload
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _MockWindow__WEBPACK_IMPORTED_MODULE_1__["myWindow"].postMessage(msg, window.location.origin);
        });
    }
    listenForChannelOpening(messageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fn = (event) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const data = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.message;
                if (data &&
                    data.target === ___WEBPACK_IMPORTED_MODULE_2__["ExtensionMessageTarget"].PAGE &&
                    (yield this.isChannelOpenMessage(data))) {
                    const payload = Buffer.from(data.payload, 'hex');
                    if (payload.length >=
                        libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_NONCEBYTES"] + libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_secretbox_MACBYTES"]) {
                        try {
                            const decrypted = yield Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_3__["openCryptobox"])(payload, this.keyPair.publicKey, this.keyPair.privateKey);
                            messageCallback(JSON.parse(decrypted));
                            _MockWindow__WEBPACK_IMPORTED_MODULE_1__["myWindow"].removeEventListener('message', fn);
                        }
                        catch (decryptionError) {
                            /* NO-OP. We try to decode every message, but some might not be addressed to us. */
                        }
                    }
                }
            });
            _MockWindow__WEBPACK_IMPORTED_MODULE_1__["myWindow"].addEventListener('message', fn);
            const message = {
                target: ___WEBPACK_IMPORTED_MODULE_2__["ExtensionMessageTarget"].EXTENSION,
                payload: yield new ___WEBPACK_IMPORTED_MODULE_2__["Serializer"]().serialize(yield this.getHandshakeInfo())
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _MockWindow__WEBPACK_IMPORTED_MODULE_1__["myWindow"].postMessage(message, window.location.origin);
        });
    }
    isChannelOpenMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeof message === 'object' && message.hasOwnProperty('payload');
        });
    }
    subscribeToMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            _MockWindow__WEBPACK_IMPORTED_MODULE_1__["myWindow"].addEventListener('message', (message) => {
                if (typeof message === 'object' && message) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = message.data;
                    if (data.message && data.message.target === ___WEBPACK_IMPORTED_MODULE_2__["ExtensionMessageTarget"].PAGE) {
                        this.activeListeners.forEach((listener) => {
                            listener(data.message, {
                                origin: ___WEBPACK_IMPORTED_MODULE_2__["Origin"].EXTENSION,
                                id: data.sender.id || ''
                            });
                        });
                    }
                }
            });
        });
    }
}
//# sourceMappingURL=PostMessageClient.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/BeaconErrorType.js":
/*!*******************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/BeaconErrorType.js ***!
  \*******************************************************/
/*! exports provided: BeaconErrorType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeaconErrorType", function() { return BeaconErrorType; });
var BeaconErrorType;
(function (BeaconErrorType) {
    BeaconErrorType["BROADCAST_ERROR"] = "BROADCAST_ERROR";
    BeaconErrorType["NETWORK_NOT_SUPPORTED"] = "NETWORK_NOT_SUPPORTED";
    BeaconErrorType["NO_ADDRESS_ERROR"] = "NO_ADDRESS_ERROR";
    BeaconErrorType["NO_PRIVATE_KEY_FOUND_ERROR"] = "NO_PRIVATE_KEY_FOUND_ERROR";
    BeaconErrorType["NOT_GRANTED_ERROR"] = "NOT_GRANTED_ERROR";
    BeaconErrorType["PARAMETERS_INVALID_ERROR"] = "PARAMETERS_INVALID_ERROR";
    BeaconErrorType["TOO_MANY_OPERATIONS"] = "TOO_MANY_OPERATIONS";
    BeaconErrorType["TRANSACTION_INVALID_ERROR"] = "TRANSACTION_INVALID_ERROR";
    BeaconErrorType["ABORTED_ERROR"] = "ABORTED_ERROR";
    BeaconErrorType["UNKNOWN_ERROR"] = "UNKNOWN_ERROR"; // Used as a wildcard if an unexpected error occured.
})(BeaconErrorType || (BeaconErrorType = {}));
//# sourceMappingURL=BeaconErrorType.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/ExtensionMessageTarget.js":
/*!**************************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/ExtensionMessageTarget.js ***!
  \**************************************************************/
/*! exports provided: ExtensionMessageTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtensionMessageTarget", function() { return ExtensionMessageTarget; });
var ExtensionMessageTarget;
(function (ExtensionMessageTarget) {
    ExtensionMessageTarget["BACKGROUND"] = "toBackground";
    ExtensionMessageTarget["PAGE"] = "toPage";
    ExtensionMessageTarget["EXTENSION"] = "toExtension";
})(ExtensionMessageTarget || (ExtensionMessageTarget = {}));
//# sourceMappingURL=ExtensionMessageTarget.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/Origin.js":
/*!**********************************************!*\
  !*** ../beacon-sdk/dist/esm/types/Origin.js ***!
  \**********************************************/
/*! exports provided: Origin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Origin", function() { return Origin; });
var Origin;
(function (Origin) {
    Origin["WEBSITE"] = "website";
    Origin["EXTENSION"] = "extension";
    Origin["P2P"] = "p2p";
})(Origin || (Origin = {}));
//# sourceMappingURL=Origin.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/beacon/BeaconMessageType.js":
/*!****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/beacon/BeaconMessageType.js ***!
  \****************************************************************/
/*! exports provided: BeaconMessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeaconMessageType", function() { return BeaconMessageType; });
var BeaconMessageType;
(function (BeaconMessageType) {
    BeaconMessageType["PermissionRequest"] = "permission_request";
    BeaconMessageType["SignPayloadRequest"] = "sign_payload_request";
    BeaconMessageType["OperationRequest"] = "operation_request";
    BeaconMessageType["BroadcastRequest"] = "broadcast_request";
    BeaconMessageType["PermissionResponse"] = "permission_response";
    BeaconMessageType["SignPayloadResponse"] = "sign_payload_response";
    BeaconMessageType["OperationResponse"] = "operation_response";
    BeaconMessageType["BroadcastResponse"] = "broadcast_response";
    BeaconMessageType["Disconnect"] = "disconnect";
    BeaconMessageType["Error"] = "error";
})(BeaconMessageType || (BeaconMessageType = {}));
//# sourceMappingURL=BeaconMessageType.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/beacon/NetworkType.js":
/*!**********************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/beacon/NetworkType.js ***!
  \**********************************************************/
/*! exports provided: NetworkType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkType", function() { return NetworkType; });
var NetworkType;
(function (NetworkType) {
    NetworkType["MAINNET"] = "mainnet";
    NetworkType["CARTHAGENET"] = "carthagenet";
    NetworkType["CUSTOM"] = "custom";
})(NetworkType || (NetworkType = {}));
//# sourceMappingURL=NetworkType.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/beacon/PermissionScope.js":
/*!**************************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/beacon/PermissionScope.js ***!
  \**************************************************************/
/*! exports provided: PermissionScope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissionScope", function() { return PermissionScope; });
var PermissionScope;
(function (PermissionScope) {
    PermissionScope["SIGN"] = "sign";
    PermissionScope["OPERATION_REQUEST"] = "operation_request";
    PermissionScope["THRESHOLD"] = "threshold"; // Allows the DApp to sign transactions below a certain threshold. This is currently not fully defined and unused
})(PermissionScope || (PermissionScope = {}));
//# sourceMappingURL=PermissionScope.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/storage/StorageKey.js":
/*!**********************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/storage/StorageKey.js ***!
  \**********************************************************/
/*! exports provided: StorageKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageKey", function() { return StorageKey; });
var StorageKey;
(function (StorageKey) {
    StorageKey["TRANSPORT_P2P_PEERS"] = "beacon:communication-peers";
    StorageKey["TRANSPORT_POSTMESSAGE_PEERS"] = "beacon:postmessage-peers";
    StorageKey["ACCOUNTS"] = "beacon:accounts";
    StorageKey["ACTIVE_ACCOUNT"] = "beacon:active-account";
    StorageKey["BEACON_SDK_SECRET_SEED"] = "beacon:sdk-secret-seed";
    StorageKey["APP_METADATA_LIST"] = "beacon:app-metadata-list";
    StorageKey["PERMISSION_LIST"] = "beacon:permissions";
    StorageKey["BEACON_SDK_VERSION"] = "beacon:sdk_version";
    StorageKey["MATRIX_PRESERVED_STATE"] = "beacon:sdk-matrix-preserved-state";
})(StorageKey || (StorageKey = {}));
//# sourceMappingURL=StorageKey.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/storage/StorageKeyReturnDefaults.js":
/*!************************************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/storage/StorageKeyReturnDefaults.js ***!
  \************************************************************************/
/*! exports provided: defaultValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValues", function() { return defaultValues; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../.. */ "../beacon-sdk/dist/esm/index.js");

const defaultValues = {
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].TRANSPORT_P2P_PEERS]: [],
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].TRANSPORT_POSTMESSAGE_PEERS]: [],
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].ACCOUNTS]: [],
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].ACTIVE_ACCOUNT]: undefined,
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].BEACON_SDK_SECRET_SEED]: undefined,
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].APP_METADATA_LIST]: [],
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].PERMISSION_LIST]: [],
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].BEACON_SDK_VERSION]: undefined,
    [___WEBPACK_IMPORTED_MODULE_0__["StorageKey"].MATRIX_PRESERVED_STATE]: {}
};
//# sourceMappingURL=StorageKeyReturnDefaults.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/tezos/OperationTypes.js":
/*!************************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/tezos/OperationTypes.js ***!
  \************************************************************/
/*! exports provided: TezosOperationType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TezosOperationType", function() { return TezosOperationType; });
var TezosOperationType;
(function (TezosOperationType) {
    TezosOperationType["ENDORSEMENT"] = "endorsement";
    TezosOperationType["SEED_NONCE_REVELATION"] = "seed_nonce_revelation";
    TezosOperationType["DOUBLE_ENDORSEMENT_EVIDENCE"] = "double_endorsement_evidence";
    TezosOperationType["DOUBLE_BAKING_EVIDENCE"] = "double_baking_evidence";
    TezosOperationType["ACTIVATE_ACCOUNT"] = "activate_account";
    TezosOperationType["PROPOSALS"] = "proposals";
    TezosOperationType["BALLOT"] = "ballot";
    TezosOperationType["REVEAL"] = "reveal";
    TezosOperationType["TRANSACTION"] = "transaction";
    TezosOperationType["ORIGINATION"] = "origination";
    TezosOperationType["DELEGATION"] = "delegation";
})(TezosOperationType || (TezosOperationType = {}));
//# sourceMappingURL=OperationTypes.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/transport/TransportStatus.js":
/*!*****************************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/transport/TransportStatus.js ***!
  \*****************************************************************/
/*! exports provided: TransportStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportStatus", function() { return TransportStatus; });
var TransportStatus;
(function (TransportStatus) {
    TransportStatus["NOT_CONNECTED"] = "NOT_CONNECTED";
    TransportStatus["CONNECTING"] = "CONNECTING";
    TransportStatus["CONNECTED"] = "CONNECTED";
})(TransportStatus || (TransportStatus = {}));
//# sourceMappingURL=TransportStatus.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/types/transport/TransportType.js":
/*!***************************************************************!*\
  !*** ../beacon-sdk/dist/esm/types/transport/TransportType.js ***!
  \***************************************************************/
/*! exports provided: TransportType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportType", function() { return TransportType; });
var TransportType;
(function (TransportType) {
    TransportType["CHROME_MESSAGE"] = "chrome_message";
    TransportType["POST_MESSAGE"] = "post_message";
    TransportType["LEDGER"] = "ledger";
    TransportType["P2P"] = "p2p";
})(TransportType || (TransportType = {}));
//# sourceMappingURL=TransportType.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/Logger.js":
/*!**********************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/Logger.js ***!
  \**********************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../beacon-sdk/dist/esm/constants.js");
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The logger that is used internally
 */
class Logger {
    constructor(service, debug = _constants__WEBPACK_IMPORTED_MODULE_0__["DEBUG"]) {
        this.name = service;
        this.debug = debug;
    }
    _log(color, method, args) {
        if (!this.debug) {
            return;
        }
        const origin = `%c[${this.name}](${method})`;
        const css = `background: #${color}`;
        if (args.length === 0) {
            console.log(origin, css);
        }
        else if (args.every((arg) => typeof arg === 'string')) {
            console.log(`${origin}:`, css, ...args);
        }
        else {
            console.log(`${origin}:`, css, ...args);
        }
    }
    log(method, ...args) {
        this._log('d3ffcf', method, args);
    }
    warn(method, ...args) {
        this._log('fff4cf', method, args);
    }
    error(method, ...args) {
        this._log('ffcfcf', method, args);
    }
}
//# sourceMappingURL=Logger.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/assert-never.js":
/*!****************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/assert-never.js ***!
  \****************************************************/
/*! exports provided: assertNever */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertNever", function() { return assertNever; });
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/**
 * A helper function to make sure if/elses and switch/cases are exhaustive
 *
 * @param empty The data that has to be empty
 */
function assertNever(empty) {
    return empty;
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=assert-never.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/available-transports.js":
/*!************************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/available-transports.js ***!
  \************************************************************/
/*! exports provided: availableTransports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "availableTransports", function() { return availableTransports; });
/* harmony import */ var _transports_PostMessageTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transports/PostMessageTransport */ "../beacon-sdk/dist/esm/transports/PostMessageTransport.js");

/**
 * An object with promises to indicate whether or not that transport is available.
 */
const availableTransports = {
    extension: _transports_PostMessageTransport__WEBPACK_IMPORTED_MODULE_0__["PostMessageTransport"].isAvailable()
};
//# sourceMappingURL=available-transports.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/block-explorer.js":
/*!******************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/block-explorer.js ***!
  \******************************************************/
/*! exports provided: getAccountBlockExplorerLinkForNetwork, getTransactionBlockExplorerLinkForNetwork */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccountBlockExplorerLinkForNetwork", function() { return getAccountBlockExplorerLinkForNetwork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTransactionBlockExplorerLinkForNetwork", function() { return getTransactionBlockExplorerLinkForNetwork; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "../beacon-sdk/dist/esm/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Return a blockexplorer link for an address
 *
 * @param network The network that was used
 * @param address The address to be opened
 */
const getAccountBlockExplorerLinkForNetwork = (network, address) => __awaiter(void 0, void 0, void 0, function* () {
    const urls = {
        [___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].MAINNET]: 'https://tezblock.io/account/',
        [___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].CARTHAGENET]: 'https://carthagenet.tezblock.io/account/',
        [___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].CUSTOM]: 'https://carthagenet.tezblock.io/account/'
    };
    const url = urls[network ? network.type : ___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].MAINNET];
    return `${url}${address}`;
});
/**
 * Return a blockexplorer link for a transaction hash
 *
 * @param network The network that was used
 * @param transactionHash The hash of the transaction
 */
const getTransactionBlockExplorerLinkForNetwork = (network, transactionHash) => __awaiter(void 0, void 0, void 0, function* () {
    const urls = {
        [___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].MAINNET]: 'https://tezblock.io/transaction/',
        [___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].CARTHAGENET]: 'https://carthagenet.tezblock.io/transaction/',
        [___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].CUSTOM]: 'https://carthagenet.tezblock.io/transaction/'
    };
    const url = urls[network ? network.type : ___WEBPACK_IMPORTED_MODULE_0__["NetworkType"].MAINNET];
    return `${url}${transactionHash}`;
});
//# sourceMappingURL=block-explorer.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/crypto.js":
/*!**********************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/crypto.js ***!
  \**********************************************/
/*! exports provided: toHex, getHexHash, getKeypairFromSeed, encryptCryptoboxPayload, decryptCryptoboxPayload, sealCryptobox, openCryptobox, getAddressFromPublicKey, recipientString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toHex", function() { return toHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHexHash", function() { return getHexHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeypairFromSeed", function() { return getKeypairFromSeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encryptCryptoboxPayload", function() { return encryptCryptoboxPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptCryptoboxPayload", function() { return decryptCryptoboxPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sealCryptobox", function() { return sealCryptobox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openCryptobox", function() { return openCryptobox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddressFromPublicKey", function() { return getAddressFromPublicKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recipientString", function() { return recipientString; });
/* harmony import */ var bs58check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bs58check */ "../beacon-sdk/node_modules/bs58check/index.js");
/* harmony import */ var bs58check__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bs58check__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libsodium-wrappers */ "../beacon-sdk/node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/* eslint-disable prefer-arrow/prefer-arrow-functions */
/**
 * Convert a value to hex
 *
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toHex(value) {
    return Buffer.from(value).toString('hex');
}
/**
 * Get the hex hash of a value
 *
 * @param key
 */
function getHexHash(key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["ready"];
        return toHex(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_generichash"](32, key));
    });
}
/**
 * Get a keypair from a seed
 *
 * @param seed
 */
function getKeypairFromSeed(seed) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["ready"];
        return libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_sign_seed_keypair"](libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_generichash"](32, libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["from_string"](seed)));
    });
}
/**
 * Encrypt a message with a shared key
 *
 * @param message
 * @param sharedKey
 */
function encryptCryptoboxPayload(message, sharedKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["ready"];
        const nonce = Buffer.from(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["randombytes_buf"](libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_secretbox_NONCEBYTES"]));
        const combinedPayload = Buffer.concat([
            nonce,
            Buffer.from(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_secretbox_easy"](Buffer.from(message, 'utf8'), nonce, sharedKey))
        ]);
        return toHex(combinedPayload);
    });
}
/**
 * Decrypt a message with a shared key
 *
 * @param payload
 * @param sharedKey
 */
function decryptCryptoboxPayload(payload, sharedKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["ready"];
        const nonce = payload.slice(0, libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_secretbox_NONCEBYTES"]);
        const ciphertext = payload.slice(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_secretbox_NONCEBYTES"]);
        return Buffer.from(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_secretbox_open_easy"](ciphertext, nonce, sharedKey)).toString('utf8');
    });
}
/**
 * Encrypt a message with a public key
 *
 * @param payload
 * @param publicKey
 */
function sealCryptobox(payload, publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["ready"];
        const kxSelfPublicKey = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_sign_ed25519_pk_to_curve25519"](Buffer.from(publicKey)); // Secret bytes to scalar bytes
        const encryptedMessage = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_box_seal"](payload, kxSelfPublicKey);
        return toHex(encryptedMessage);
    });
}
/**
 * Decrypt a message with public + private key
 *
 * @param encryptedPayload
 * @param publicKey
 * @param privateKey
 */
function openCryptobox(encryptedPayload, publicKey, privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["ready"];
        const kxSelfPrivateKey = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_sign_ed25519_sk_to_curve25519"](Buffer.from(privateKey)); // Secret bytes to scalar bytes
        const kxSelfPublicKey = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_sign_ed25519_pk_to_curve25519"](Buffer.from(publicKey)); // Secret bytes to scalar bytes
        const decryptedMessage = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_box_seal_open"](encryptedPayload, kxSelfPublicKey, kxSelfPrivateKey);
        return Buffer.from(decryptedMessage).toString();
    });
}
/**
 * Get an address from the public key
 *
 * @param publicKey
 */
function getAddressFromPublicKey(publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["ready"];
        let plainPublicKey;
        if (publicKey.length === 64) {
            plainPublicKey = publicKey;
        }
        else if (publicKey.startsWith('edpk') && publicKey.length === 54) {
            const edpkPrefixLength = 4;
            const decoded = bs58check__WEBPACK_IMPORTED_MODULE_0__["decode"](publicKey);
            plainPublicKey = decoded.slice(edpkPrefixLength, decoded.length).toString('hex');
        }
        else {
            throw new Error(`invalid publicKey: ${publicKey}`);
        }
        const payload = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_1__["crypto_generichash"](20, Buffer.from(plainPublicKey, 'hex'));
        const tz1Prefix = Buffer.from(new Uint8Array([6, 161, 159]));
        return bs58check__WEBPACK_IMPORTED_MODULE_0__["encode"](Buffer.concat([tz1Prefix, Buffer.from(payload)]));
    });
}
/**
 * Get the recipient string used in the matrix message
 *
 * @param recipientHash
 * @param relayServer
 */
function recipientString(recipientHash, relayServer) {
    return `@${recipientHash}:${relayServer}`;
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=crypto.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/exposed-promise.js":
/*!*******************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/exposed-promise.js ***!
  \*******************************************************/
/*! exports provided: ExposedPromiseStatus, ExposedPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExposedPromiseStatus", function() { return ExposedPromiseStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExposedPromise", function() { return ExposedPromise; });
var ExposedPromiseStatus;
(function (ExposedPromiseStatus) {
    ExposedPromiseStatus["PENDING"] = "pending";
    ExposedPromiseStatus["RESOLVED"] = "resolved";
    ExposedPromiseStatus["REJECTED"] = "rejected";
})(ExposedPromiseStatus || (ExposedPromiseStatus = {}));
const notInitialized = () => {
    throw new Error('ExposedPromise not initialized yet.');
};
/**
 * Exposed promise allow you to create a promise and then resolve it later, from the outside
 */
class ExposedPromise {
    constructor() {
        this._resolve = notInitialized;
        this._reject = notInitialized;
        this._status = ExposedPromiseStatus.PENDING;
        this._promise = new Promise((innerResolve, innerReject) => {
            this._resolve = (value) => {
                if (this.isSettled()) {
                    return;
                }
                this._promiseResult = value;
                innerResolve(value);
                this._status = ExposedPromiseStatus.RESOLVED;
                return;
            };
            this._reject = (reason) => {
                if (this.isSettled()) {
                    return;
                }
                this._promiseError = reason;
                innerReject(reason);
                this._status = ExposedPromiseStatus.REJECTED;
                return;
            };
        });
    }
    get promise() {
        return this._promise;
    }
    get resolve() {
        return this._resolve;
    }
    get reject() {
        return this._reject;
    }
    get status() {
        return this._status;
    }
    get promiseResult() {
        return this._promiseResult;
    }
    get promiseError() {
        return this._promiseError;
    }
    static resolve(value) {
        const promise = new ExposedPromise();
        promise.resolve(value);
        return promise;
    }
    static reject(reason) {
        const promise = new ExposedPromise();
        promise.reject(reason);
        return promise;
    }
    isPending() {
        return this.status === ExposedPromiseStatus.PENDING;
    }
    isResolved() {
        return this.status === ExposedPromiseStatus.RESOLVED;
    }
    isRejected() {
        return this.status === ExposedPromiseStatus.REJECTED;
    }
    isSettled() {
        return this.isResolved() || this.isRejected();
    }
}
//# sourceMappingURL=exposed-promise.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/generate-uuid.js":
/*!*****************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/generate-uuid.js ***!
  \*****************************************************/
/*! exports provided: generateGUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateGUID", function() { return generateGUID; });
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libsodium-wrappers */ "../beacon-sdk/node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Generate a random GUID
 */
function generateGUID() {
    return __awaiter(this, void 0, void 0, function* () {
        yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["ready"];
        const buf = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["randombytes_buf"](16);
        return [buf.slice(0, 4), buf.slice(4, 6), buf.slice(6, 8), buf.slice(8, 10), buf.slice(10, 16)]
            .map(function (subbuf) {
            return Buffer.from(subbuf).toString('hex');
        })
            .join('-');
    });
}
/* eslint-enable prefer-arrow/prefer-arrow-functions */
//# sourceMappingURL=generate-uuid.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/get-account-identifier.js":
/*!**************************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/get-account-identifier.js ***!
  \**************************************************************/
/*! exports provided: getAccountIdentifier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccountIdentifier", function() { return getAccountIdentifier; });
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libsodium-wrappers */ "../beacon-sdk/node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bs58check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bs58check */ "../beacon-sdk/node_modules/bs58check/index.js");
/* harmony import */ var bs58check__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bs58check__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * Generate a deterministic account identifier based on an address and a network
 *
 * @param address
 * @param network
 */
const getAccountIdentifier = (address, network) => __awaiter(void 0, void 0, void 0, function* () {
    const data = [address, network.type];
    if (network.name) {
        data.push(`name:${network.name}`);
    }
    if (network.rpcUrl) {
        data.push(`rpc:${network.rpcUrl}`);
    }
    yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["ready"];
    const buffer = Buffer.from(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__["crypto_generichash"](10, data.join('-')));
    return bs58check__WEBPACK_IMPORTED_MODULE_1__["encode"](buffer);
});
//# sourceMappingURL=get-account-identifier.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../beacon-example-dapp/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/get-tzip10-link.js":
/*!*******************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/get-tzip10-link.js ***!
  \*******************************************************/
/*! exports provided: getTzip10Link */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTzip10Link", function() { return getTzip10Link; });
const getTzip10Link = (url, payload) => `${url}?type=tzip10&data=${payload}`;
//# sourceMappingURL=get-tzip10-link.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/platform.js":
/*!************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/platform.js ***!
  \************************************************/
/*! exports provided: testUserAgent, isMobile, isIOS, isAndroid, isDesktop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testUserAgent", function() { return testUserAgent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIOS", function() { return isIOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAndroid", function() { return isAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDesktop", function() { return isDesktop; });
// Helper functions from https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/platform.ts
const testUserAgent = (win, expr) => expr.test(win.navigator.userAgent);
const matchMedia = (win, query) => win.matchMedia(query).matches;
const isMobile = (win) => matchMedia(win, '(any-pointer:coarse)');
// const isCordova = (win: any): boolean => Boolean(win.cordova || win.phonegap || win.PhoneGap)
// const isCapacitorNative = (win: any): boolean => {
//   const capacitor = win.Capacitor
//   return Boolean(capacitor && capacitor.isNative)
// }
// const isHybrid = (win: Window): boolean => isCordova(win) || isCapacitorNative(win)
// const isMobileWeb = (win: Window): boolean => isMobile(win) && !isHybrid(win)
const isIpad = (win) => {
    // iOS 12 and below
    if (testUserAgent(win, /iPad/i)) {
        return true;
    }
    // iOS 13+
    if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
        return true;
    }
    return false;
};
const isIOS = (win) => testUserAgent(win, /iPhone|iPod/i) || isIpad(win);
const isAndroid = (win) => testUserAgent(win, /android|sink/i);
const isDesktop = (win) => !isMobile(win);
//# sourceMappingURL=platform.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/qr.js":
/*!******************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/qr.js ***!
  \******************************************/
/*! exports provided: getQrData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQrData", function() { return getQrData; });
/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qrcode-generator */ "../beacon-sdk/node_modules/qrcode-generator/qrcode.js");
/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qrcode_generator__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Convert data to a QR code
 *
 * @param payload The data to be encoded as a QR code
 * @param type How the QR code will be encoded
 */
const getQrData = (payload, type) => {
    const typeNumber = 0;
    const errorCorrectionLevel = 'L';
    const qr = qrcode_generator__WEBPACK_IMPORTED_MODULE_0__(typeNumber, errorCorrectionLevel);
    try {
        qr.addData(payload);
        qr.make();
        if (type === 'svg') {
            return qr.createSvgTag();
        }
        else if (type === 'ascii') {
            const length = qr.getModuleCount();
            const black = '\x1B[40m  \x1B[0m';
            const white = '\x1B[47m  \x1B[0m';
            const whiteLine = new Array(length + 3).join(white);
            const blackLine = new Array(length + 3).join(black);
            let ascii = '';
            ascii += `${blackLine}\n`;
            ascii += `${whiteLine}\n`;
            for (let x = 0; x < length; x++) {
                ascii += white;
                for (let y = 0; y < length; y++) {
                    ascii += qr.isDark(x, y) ? black : white;
                }
                ascii += `${white}\n`;
            }
            ascii += whiteLine;
            ascii += blackLine;
            return ascii;
        }
        else {
            return qr.createDataURL();
        }
    }
    catch (qrError) {
        console.error('error', qrError);
        throw qrError;
    }
};
//# sourceMappingURL=qr.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/replace-in-template.js":
/*!***********************************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/replace-in-template.js ***!
  \***********************************************************/
/*! exports provided: replaceInTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceInTemplate", function() { return replaceInTemplate; });
const replaceInTemplate = (text, placeholder, value) => text.split(`{{${placeholder}}}`).join(value);
//# sourceMappingURL=replace-in-template.js.map

/***/ }),

/***/ "../beacon-sdk/dist/esm/utils/utils.js":
/*!*********************************************!*\
  !*** ../beacon-sdk/dist/esm/utils/utils.js ***!
  \*********************************************/
/*! exports provided: keys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/**
 * A helper function to improve typings of object keys
 *
 * @param obj Object
 */
function keys(obj) {
    return Object.keys(obj);
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ion-action-sheet-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-action-sheet-ios.entry.js",
		"common",
		"stencil-ion-action-sheet-ios-entry-js"
	],
	"./ion-action-sheet-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-action-sheet-md.entry.js",
		"common",
		"stencil-ion-action-sheet-md-entry-js"
	],
	"./ion-alert-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-alert-ios.entry.js",
		"common",
		"stencil-ion-alert-ios-entry-js"
	],
	"./ion-alert-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-alert-md.entry.js",
		"common",
		"stencil-ion-alert-md-entry-js"
	],
	"./ion-app_8-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-app_8-ios.entry.js",
		"common",
		"stencil-ion-app_8-ios-entry-js"
	],
	"./ion-app_8-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-app_8-md.entry.js",
		"common",
		"stencil-ion-app_8-md-entry-js"
	],
	"./ion-avatar_3-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-avatar_3-ios.entry.js",
		"common",
		"stencil-ion-avatar_3-ios-entry-js"
	],
	"./ion-avatar_3-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-avatar_3-md.entry.js",
		"common",
		"stencil-ion-avatar_3-md-entry-js"
	],
	"./ion-back-button-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-back-button-ios.entry.js",
		"common",
		"stencil-ion-back-button-ios-entry-js"
	],
	"./ion-back-button-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-back-button-md.entry.js",
		"common",
		"stencil-ion-back-button-md-entry-js"
	],
	"./ion-backdrop-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-backdrop-ios.entry.js",
		"stencil-ion-backdrop-ios-entry-js"
	],
	"./ion-backdrop-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-backdrop-md.entry.js",
		"stencil-ion-backdrop-md-entry-js"
	],
	"./ion-button_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-button_2-ios.entry.js",
		"common",
		"stencil-ion-button_2-ios-entry-js"
	],
	"./ion-button_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-button_2-md.entry.js",
		"common",
		"stencil-ion-button_2-md-entry-js"
	],
	"./ion-card_5-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-card_5-ios.entry.js",
		"common",
		"stencil-ion-card_5-ios-entry-js"
	],
	"./ion-card_5-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-card_5-md.entry.js",
		"common",
		"stencil-ion-card_5-md-entry-js"
	],
	"./ion-checkbox-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-checkbox-ios.entry.js",
		"common",
		"stencil-ion-checkbox-ios-entry-js"
	],
	"./ion-checkbox-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-checkbox-md.entry.js",
		"common",
		"stencil-ion-checkbox-md-entry-js"
	],
	"./ion-chip-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-chip-ios.entry.js",
		"common",
		"stencil-ion-chip-ios-entry-js"
	],
	"./ion-chip-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-chip-md.entry.js",
		"common",
		"stencil-ion-chip-md-entry-js"
	],
	"./ion-col_3.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-col_3.entry.js",
		"stencil-ion-col_3-entry-js"
	],
	"./ion-datetime_3-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-datetime_3-ios.entry.js",
		"common",
		"stencil-ion-datetime_3-ios-entry-js"
	],
	"./ion-datetime_3-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-datetime_3-md.entry.js",
		"common",
		"stencil-ion-datetime_3-md-entry-js"
	],
	"./ion-fab_3-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-fab_3-ios.entry.js",
		"common",
		"stencil-ion-fab_3-ios-entry-js"
	],
	"./ion-fab_3-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-fab_3-md.entry.js",
		"common",
		"stencil-ion-fab_3-md-entry-js"
	],
	"./ion-img.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-img.entry.js",
		"stencil-ion-img-entry-js"
	],
	"./ion-infinite-scroll_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-infinite-scroll_2-ios.entry.js",
		"common",
		"stencil-ion-infinite-scroll_2-ios-entry-js"
	],
	"./ion-infinite-scroll_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-infinite-scroll_2-md.entry.js",
		"common",
		"stencil-ion-infinite-scroll_2-md-entry-js"
	],
	"./ion-input-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-input-ios.entry.js",
		"common",
		"stencil-ion-input-ios-entry-js"
	],
	"./ion-input-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-input-md.entry.js",
		"common",
		"stencil-ion-input-md-entry-js"
	],
	"./ion-item-option_3-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-item-option_3-ios.entry.js",
		"common",
		"stencil-ion-item-option_3-ios-entry-js"
	],
	"./ion-item-option_3-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-item-option_3-md.entry.js",
		"common",
		"stencil-ion-item-option_3-md-entry-js"
	],
	"./ion-item_8-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-item_8-ios.entry.js",
		"common",
		"stencil-ion-item_8-ios-entry-js"
	],
	"./ion-item_8-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-item_8-md.entry.js",
		"common",
		"stencil-ion-item_8-md-entry-js"
	],
	"./ion-loading-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-loading-ios.entry.js",
		"common",
		"stencil-ion-loading-ios-entry-js"
	],
	"./ion-loading-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-loading-md.entry.js",
		"common",
		"stencil-ion-loading-md-entry-js"
	],
	"./ion-menu_3-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-menu_3-ios.entry.js",
		"common",
		"stencil-ion-menu_3-ios-entry-js"
	],
	"./ion-menu_3-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-menu_3-md.entry.js",
		"common",
		"stencil-ion-menu_3-md-entry-js"
	],
	"./ion-modal-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-modal-ios.entry.js",
		"common",
		"stencil-ion-modal-ios-entry-js"
	],
	"./ion-modal-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-modal-md.entry.js",
		"common",
		"stencil-ion-modal-md-entry-js"
	],
	"./ion-nav_2.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-nav_2.entry.js",
		"common",
		"stencil-ion-nav_2-entry-js"
	],
	"./ion-popover-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-popover-ios.entry.js",
		"common",
		"stencil-ion-popover-ios-entry-js"
	],
	"./ion-popover-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-popover-md.entry.js",
		"common",
		"stencil-ion-popover-md-entry-js"
	],
	"./ion-progress-bar-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-progress-bar-ios.entry.js",
		"common",
		"stencil-ion-progress-bar-ios-entry-js"
	],
	"./ion-progress-bar-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-progress-bar-md.entry.js",
		"common",
		"stencil-ion-progress-bar-md-entry-js"
	],
	"./ion-radio_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-radio_2-ios.entry.js",
		"common",
		"stencil-ion-radio_2-ios-entry-js"
	],
	"./ion-radio_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-radio_2-md.entry.js",
		"common",
		"stencil-ion-radio_2-md-entry-js"
	],
	"./ion-range-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-range-ios.entry.js",
		"common",
		"stencil-ion-range-ios-entry-js"
	],
	"./ion-range-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-range-md.entry.js",
		"common",
		"stencil-ion-range-md-entry-js"
	],
	"./ion-refresher_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-refresher_2-ios.entry.js",
		"common",
		"stencil-ion-refresher_2-ios-entry-js"
	],
	"./ion-refresher_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-refresher_2-md.entry.js",
		"common",
		"stencil-ion-refresher_2-md-entry-js"
	],
	"./ion-reorder_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-reorder_2-ios.entry.js",
		"common",
		"stencil-ion-reorder_2-ios-entry-js"
	],
	"./ion-reorder_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-reorder_2-md.entry.js",
		"common",
		"stencil-ion-reorder_2-md-entry-js"
	],
	"./ion-ripple-effect.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-ripple-effect.entry.js",
		"stencil-ion-ripple-effect-entry-js"
	],
	"./ion-route_4.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-route_4.entry.js",
		"common",
		"stencil-ion-route_4-entry-js"
	],
	"./ion-searchbar-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-searchbar-ios.entry.js",
		"common",
		"stencil-ion-searchbar-ios-entry-js"
	],
	"./ion-searchbar-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-searchbar-md.entry.js",
		"common",
		"stencil-ion-searchbar-md-entry-js"
	],
	"./ion-segment_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-segment_2-ios.entry.js",
		"common",
		"stencil-ion-segment_2-ios-entry-js"
	],
	"./ion-segment_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-segment_2-md.entry.js",
		"common",
		"stencil-ion-segment_2-md-entry-js"
	],
	"./ion-select_3-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-select_3-ios.entry.js",
		"common",
		"stencil-ion-select_3-ios-entry-js"
	],
	"./ion-select_3-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-select_3-md.entry.js",
		"common",
		"stencil-ion-select_3-md-entry-js"
	],
	"./ion-slide_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-slide_2-ios.entry.js",
		"stencil-ion-slide_2-ios-entry-js"
	],
	"./ion-slide_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-slide_2-md.entry.js",
		"stencil-ion-slide_2-md-entry-js"
	],
	"./ion-spinner.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-spinner.entry.js",
		"common",
		"stencil-ion-spinner-entry-js"
	],
	"./ion-split-pane-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-split-pane-ios.entry.js",
		"stencil-ion-split-pane-ios-entry-js"
	],
	"./ion-split-pane-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-split-pane-md.entry.js",
		"stencil-ion-split-pane-md-entry-js"
	],
	"./ion-tab-bar_2-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-tab-bar_2-ios.entry.js",
		"common",
		"stencil-ion-tab-bar_2-ios-entry-js"
	],
	"./ion-tab-bar_2-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-tab-bar_2-md.entry.js",
		"common",
		"stencil-ion-tab-bar_2-md-entry-js"
	],
	"./ion-tab_2.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js",
		"common",
		"stencil-ion-tab_2-entry-js"
	],
	"./ion-text.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-text.entry.js",
		"common",
		"stencil-ion-text-entry-js"
	],
	"./ion-textarea-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-textarea-ios.entry.js",
		"common",
		"stencil-ion-textarea-ios-entry-js"
	],
	"./ion-textarea-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-textarea-md.entry.js",
		"common",
		"stencil-ion-textarea-md-entry-js"
	],
	"./ion-toast-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-toast-ios.entry.js",
		"common",
		"stencil-ion-toast-ios-entry-js"
	],
	"./ion-toast-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-toast-md.entry.js",
		"common",
		"stencil-ion-toast-md-entry-js"
	],
	"./ion-toggle-ios.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-toggle-ios.entry.js",
		"common",
		"stencil-ion-toggle-ios-entry-js"
	],
	"./ion-toggle-md.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-toggle-md.entry.js",
		"common",
		"stencil-ion-toggle-md-entry-js"
	],
	"./ion-virtual-scroll.entry.js": [
		"./node_modules/@ionic/core/dist/esm/ion-virtual-scroll.entry.js",
		"stencil-ion-virtual-scroll-entry-js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./node_modules/@ionic/core/dist/esm lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"header--menu\">\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      <div class=\"logo--container ion-align-items-center\">\r\n        <div class=\"ion-align-items-center\">\r\n          <a href=\"https://walletbeacon.io\">\r\n            <img src=\"assets/img/beacon_logoy_type_hor_padding.svg\" />\r\n          </a>\r\n          <span><a href=\"https://airgap.it\" target=\"_blank\">by AirGap</a></span>\r\n        </div>\r\n        <ion-chip color=\"primary\" outline=\"true\" class=\"ion-margin-start\">\r\n          <ion-label>v{{ beaconSdkVersion }}</ion-label>\r\n        </ion-chip>\r\n      </div>\r\n    </ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"reset()\">\r\n        {{ connectionStatus$ | async }}\r\n        <ng-container *ngIf=\"activeAccount$ | async; let activeAccount\">\r\n          connected to {{ activeAccount.address }} on {{ activeAccount.network.type }}\r\n        </ng-container>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-app>\r\n  <ion-split-pane contentId=\"main-content\">\r\n    <ion-menu contentId=\"main-content\" type=\"overlay\">\r\n      <ion-content>\r\n        <ion-list lines=\"none\">\r\n          <ion-menu-toggle auto-hide=\"false\">\r\n            <!--TODO: handle generic -->\r\n            <ion-item\r\n              [class]=\"selectedTab === 'approach' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('approach')\"\r\n              (click)=\"select('approach')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'approach' ? 'primary' : 'black'\">\r\n                Approach\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'wallets_dapps' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('wallets_dapps')\"\r\n              (click)=\"select('wallets_dapps')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'wallets_dapps' ? 'primary' : 'black'\">\r\n                Wallets & dApps\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'transport_layer' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('transport_layer')\"\r\n              (click)=\"select('transport_layer')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'transport_layer' ? 'primary' : 'black'\">\r\n                Transport Layer\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'message_types' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('message_types')\"\r\n              (click)=\"select('message_types')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'message_types' ? 'primary' : 'black'\">Message Types</ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'permissionRequest' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('permissionRequest')\"\r\n              (click)=\"select('permissionRequest')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'permissionRequest' ? 'primary' : 'black'\">\r\n                permissionRequest\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'operationRequest' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('operationRequest')\"\r\n              (click)=\"select('operationRequest')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'operationRequest' ? 'primary' : 'black'\">\r\n                operationRequest\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'signPayloadRequest' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('signPayloadRequest')\"\r\n              (click)=\"select('signPayloadRequest')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'signPayloadRequest' ? 'primary' : 'black'\">\r\n                signPayloadRequest\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'broadcastRequest' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('broadcastRequest')\"\r\n              (click)=\"select('broadcastRequest')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'broadcastRequest' ? 'primary' : 'black'\">\r\n                broadcastRequest\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-item\r\n              [class]=\"selectedTab === 'components' ? 'item--active' : ''\"\r\n              (click)=\"scrollTo('components')\"\r\n              (click)=\"select('components')\"\r\n            >\r\n              <ion-label [color]=\"selectedTab === 'components' ? 'primary' : 'black'\">\r\n                Components\r\n              </ion-label>\r\n            </ion-item>\r\n          </ion-menu-toggle>\r\n        </ion-list>\r\n      </ion-content>\r\n      <ion-footer class=\"ion-no-border\">\r\n        <ion-toolbar>\r\n          <ion-row class=\"ion-padding-horizontal ion-justify-content-evenly\">\r\n            <a href=\"https://github.com/airgap-it/beacon-sdk\" target=\"_blank\">\r\n              <ion-icon name=\"logo-github\" color=\"medium\"></ion-icon>\r\n            </a>\r\n            <a href=\"https://docs.walletbeacon.io/\" target=\"_blank\">\r\n              <ion-icon name=\"document-text-outline\" color=\"medium\"></ion-icon>\r\n            </a>\r\n            <a href=\"https://twitter.com/AirGap_it\" target=\"_blank\">\r\n              <ion-icon name=\"logo-twitter\" color=\"medium\"></ion-icon>\r\n            </a>\r\n            <a href=\"https://t.me/AirGap\" target=\"_blank\">\r\n              <ion-icon src=\"/assets/img/telegram-plane-brands.svg\" color=\"medium\"></ion-icon>\r\n            </a>\r\n            <a href=\"https://medium.com/airgap-it\" target=\"_blank\">\r\n              <ion-icon src=\"/assets/img/medium-brands.svg\" color=\"medium\"></ion-icon>\r\n            </a>\r\n          </ion-row>\r\n        </ion-toolbar>\r\n      </ion-footer>\r\n    </ion-menu>\r\n    <ion-router-outlet id=\"main-content\"></ion-router-outlet>\r\n  </ion-split-pane>\r\n</ion-app>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/home.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/home.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content :scrollEvents=\"true\">\r\n  <ion-grid fixed=\"true\" class=\"ion-padding\">\r\n    <ion-row class=\"hero--container ion-align-items-center\">\r\n      <ion-col>\r\n        <h1>\r\n          Beacon\r\n          <br />\r\n          Connect dApps with Wallets\r\n        </h1>\r\n        <ion-button (click)=\"askForPermissions()\">Connect Beacon</ion-button>\r\n        <a href=\"https://chrome.google.com/webstore/detail/gpfndedineagiepkpinficbcbbgjoenn\" target=\"_blank\">\r\n          <ion-button fill=\"outline\">\r\n            Download Extension\r\n          </ion-button>\r\n        </a>\r\n      </ion-col>\r\n      <ion-col>\r\n        <img src=\"assets/img/beacon_illu_hero.svg\" />\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-bottom\">\r\n      <ion-col class=\"ion-no-padding ion-padding-bottom\">\r\n        <ion-card color=\"secondary\" class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <small>Latest News</small>\r\n            <p>\r\n              <strong>Beacon Android SDK Alpha</strong>\r\n              - Released for native Android development in Kotlin.\r\n              <a href=\"https://medium.com/airgap-it/beacon-android-sdk-alpha-released-69f896834189\" target=\"_blank\">\r\n                Read More\r\n              </a>\r\n            </p>\r\n            <p>\r\n              <strong>Least Authority Audit</strong>\r\n              - Beacon SDK has been successfully audited by Least Authority.\r\n              <a href=\"https://medium.com/airgap-it/beacon-sdk-audited-by-least-authority-fa12f83e91e0\" target=\"_blank\">\r\n                Read More\r\n              </a>\r\n            </p>\r\n          </ion-card-content>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-top\">\r\n      <ion-col>\r\n        <ion-row class=\"ion-align-items-center\">\r\n          <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding\">\r\n            <p class=\"intro__container\">\r\n              <strong>Beacon</strong>\r\n              is the implementation of\r\n              <a href=\"https://gitlab.com/tzip/tzip/tree/master/proposals/tzip-10\" target=\"_blank\">tzip-10</a>\r\n              which describes an interaction standard between a wallet and a dApp.\r\n            </p>\r\n            <p class=\"intro__container\">\r\n              Where a dApp impelementing the\r\n              <a href=\"https://github.com/airgap-it/beacon-sdk\" target=\"_blank\">beacon-sdk</a>\r\n              can build up a channel and send messages over a peer to peer communication layer to a wallet using the\r\n              sdk. This allows for a communication for example of a mobile wallet with a desktop application. The\r\n              requests of the dApp are sent to the wallet, signed and returned to the application.\r\n            </p>\r\n          </ion-col>\r\n          <ion-col size=\"12\" offset-md=\"1\" size-md=\"5\" class=\"ion-no-padding\">\r\n            <a href=\"https://youtu.be/-BrRTlgza10\" target=\"_blank\">\r\n              <img src=\"assets/img/beacon_video_preview.png\" />\r\n              <ion-button expand=\"block\">Play Video</ion-button>\r\n            </a>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-bottom\" id=\"approach\">\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding ion-padding-vertical\">\r\n        <h2>Approach</h2>\r\n        <p>\r\n          For the user there are two option to interact with dApps.\r\n        </p>\r\n        <p>\r\n          Either a browser extension is installed that communicates with the dApp and wallet by only pairing them once\r\n          or each dApp is paired directly with the wallet.\r\n        </p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-row class=\"selection--container\">\r\n          <ion-col size=\"12\" size-md=\"6\">\r\n            <ion-card class=\"ion-no-margin\">\r\n              <ion-card-header>\r\n                <img src=\"assets/img/beacon_extension.svg\" />\r\n                <ion-card-title>Browser Extension</ion-card-title>\r\n              </ion-card-header>\r\n              <ion-card-content>\r\n                <p>The Beacon browser extension is responsible for the communication with the dApp and the wallet.</p>\r\n              </ion-card-content>\r\n              <div class=\"ion-margin\">\r\n                <a href=\"https://github.com/airgap-it/beacon-extension/releases\" target=\"_blank\">\r\n                  <ion-button>\r\n                    Download Extension\r\n                  </ion-button>\r\n                </a>\r\n                <a href=\"https://youtu.be/Ws_1U6ioG8s\" target=\"_blank\">\r\n                  <ion-button fill=\"outline\">\r\n                    Video\r\n                  </ion-button>\r\n                </a>\r\n              </div>\r\n            </ion-card>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"6\">\r\n            <ion-card class=\"ion-no-margin\">\r\n              <ion-card-header>\r\n                <img src=\"assets/img/beacon_dapp.svg\" />\r\n                <ion-card-title>\r\n                  dApp Integration\r\n                </ion-card-title>\r\n              </ion-card-header>\r\n              <ion-card-content>\r\n                <p>\r\n                  With the implementation of the beacon-sdk, the dApp can also support direct connections. The user has\r\n                  to scan the pairing qr with his wallet for each dApp.\r\n                </p>\r\n              </ion-card-content>\r\n              <div class=\"ion-margin\">\r\n                <ion-button (click)=\"askForPermissions()\">Connect Beacon</ion-button>\r\n                <a href=\"https://youtu.be/-BrRTlgza10\" target=\"_blank\">\r\n                  <ion-button fill=\"outline\">\r\n                    Video\r\n                  </ion-button>\r\n                </a>\r\n              </div>\r\n            </ion-card>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-bottom integration--container\" id=\"wallets_dapps\">\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding ion-padding-vertical\">\r\n        <h2>Wallets & dApps</h2>\r\n        <p>\r\n          These wallets and dApps are using the\r\n          <a href=\"https://github.com/airgap-it/beacon-sdk\" target=\"_blank\">beacon-sdk</a>\r\n          to support a simple interaction for their users.\r\n        </p>\r\n        <p>\r\n          More Wallets and dApps will follow in the near future. If you're supporting Beacon in your project, please\r\n          reach out to us to be listed.\r\n        </p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-row class=\"ion-padding-top\">\r\n          <ion-col size=\"12\" class=\"ion-no-padding ion-padding-bottom\">\r\n            <strong>Wallets</strong>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'airgap_logo.svg'\"\r\n              [description]=\"'<strong>AirGap</strong> makes self custody  simple and secure. Protect your crypto and store your private keys offline. It’s time to set up your safe place for your coins and get rewards.'\"\r\n              [btnLink]=\"'https://airgap.it/'\"\r\n              [btnDescription]=\"'Download'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'thanos.svg'\"\r\n              [description]=\"'<strong>Thanos</strong> is a cryptocurrency wallet for Tezos blockchain as Web Extension for your Browser. An easy-to-use browser extension wallet for interacting with Tezos ecosystem.'\"\r\n              [btnLink]=\"'https://thanoswallet.com/'\"\r\n              [btnDescription]=\"'Download'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'ledger_logo.svg'\"\r\n              [description]=\"'Communication with <strong>Ledger</strong> hardware wallets is natively supported in the <strong>Beacon Extension</strong>, allowing any operation to be signed with a Ledger hardware wallet.'\"\r\n              [btnLink]=\"'https://chrome.google.com/webstore/detail/gpfndedineagiepkpinficbcbbgjoenn'\"\r\n              [btnDescription]=\"'Download'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-padding-top\">\r\n          <ion-col size=\"12\" class=\"ion-no-padding ion-padding-vertical\">\r\n            <strong>dApps</strong>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'beacon_logoy_type_hor_padding.svg'\"\r\n              [description]=\"'This website is the <strong>Beacon Example dApp</strong> that showcases various interactions with the beacon-sdk. The code is open source and available on GitHub.'\"\r\n              [btnLink]=\"'https://github.com/airgap-it/beacon-example-dapp'\"\r\n              [btnDescription]=\"'Open'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [title]=\"'Better Call Dev'\"\r\n              [description]=\"'<strong>Better Call Dev</strong> is a detailed Tezos smart contract explorer to inspect each contract call and allows you to run contract interactions directly from the Better Call Dev website.'\"\r\n              [btnLink]=\"'https://better-call.dev/'\"\r\n              [btnDescription]=\"'Open'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'dexter_logo.svg'\"\r\n              [description]=\"'<strong>Dexter</strong> is a decentralized, non-custodial exchange on the Tezos blockchain that enables users to exchange their XTZ with other tokens built on the Tezos FA1.2 token standard.'\"\r\n              [btnLink]=\"'https://app.dexter.exchange/'\"\r\n              [btnDescription]=\"'Beta Signup'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'minitez.png'\"\r\n              [description]=\"'<strong>MiniTez Store</strong> is a minimalistic token on Tezos to learn Michelson smart contract developemt and token contract best practice by building your own token by Claude Barde.'\"\r\n              [btnLink]=\"'https://minitez.netlify.app/'\"\r\n              [btnDescription]=\"'Open'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'tezblock_logo.svg'\"\r\n              [description]=\"'<strong>tezblock</strong> is a Tezos block explorer focused on the end user and accessibility of the Tezos blockchain data. Users can directly delegate on tezblock to any baker.'\"\r\n              [btnLink]=\"'https://tezblock.io'\"\r\n              [btnDescription]=\"'Open'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'tezos-domains_logo.svg'\"\r\n              [description]=\"'<strong>Tezos Domains</strong> is a distributed, open and extensible naming system using Tezos blockchain. The main function is to translate a meaningful and user-friendly alias to a Tezos address and vice versa.'\"\r\n              [btnLink]=\"'https://docs.tezos.domains/'\"\r\n              [btnDescription]=\"'Open'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-padding-top\">\r\n          <ion-col size=\"12\" class=\"ion-no-padding ion-padding-vertical\">\r\n            <strong>Libraries</strong>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <beacon-supporting-project-item\r\n              [logo]=\"'taquito.png'\"\r\n              [description]=\"'<strong>Taquito</strong> is a TypeScript library suite for development on the Tezos blockchain, for smart contract interactions. Supports Beacon in the Taquito Wallet API.'\"\r\n              [btnLink]=\"'https://tezostaquito.io/'\"\r\n              [btnDescription]=\"'Open'\"\r\n            ></beacon-supporting-project-item>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-bottom\" id=\"transport_layer\">\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding ion-padding-vertical\">\r\n        <h2>Transport Layer</h2>\r\n        <p>\r\n          As specified in\r\n          <a href=\"https://gitlab.com/tzip/tzip/tree/master/proposals/tzip-10\" target=\"_blank\">tzip-10</a>\r\n          Beacon utilizes a peer to peer network built with the\r\n          <a href=\"https://matrix.org/\" target=\"_blank\">matrix protocol</a>\r\n          to transport messages from the dApps to the Wallets thus leveraging a decentralized approach.\r\n        </p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-row class=\"ion-padding-top\">\r\n          <ion-col class=\"ion-no-padding\"><img src=\"assets/img/beacon_transport.png\" /></ion-col>\r\n        </ion-row>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row id=\"message_types\">\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding\">\r\n        <h2>Message Types</h2>\r\n        <p>\r\n          The following message types have been implemented from the\r\n          <a href=\"https://gitlab.com/tzip/tzip/tree/master/proposals/tzip-10\" target=\"_blank\">tzip-10</a>\r\n          standard in the\r\n          <a href=\"https://github.com/airgap-it/beacon-sdk\" target=\"_blank\">beacon-sdk</a>\r\n          . Examples for each messaging type have been implemented below.\r\n        </p>\r\n        <ion-row class=\"ion-padding-vertical\">\r\n          <ion-col class=\"ion-no-padding ion-padding-bottom\">\r\n            <ion-card color=\"secondary\" class=\"ion-no-margin\">\r\n              <ion-card-content>\r\n                <strong>Detailed Documentation</strong>\r\n                can also be found in the\r\n                <a href=\"http://docs.walletbeacon.io/\" target=\"_blank\">Beacon SDK Documentation.</a>\r\n              </ion-card-content>\r\n            </ion-card>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-bottom\" id=\"permissionRequest\">\r\n      <ion-col size-md=\"6\">\r\n        <h3>\r\n          permissionRequest\r\n          <a href=\"https://gitlab.com/tzip/tzip/blob/master/proposals/tzip-10/tzip-10.md#1-permission\" target=\"_blank\">\r\n            <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n          </a>\r\n        </h3>\r\n        <p class=\"ion-padding-bottom\">App requests permission to access account details from wallet.</p>\r\n      </ion-col>\r\n      <ion-col size-md=\"9\" class=\"ion-no-padding\">\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Granted Permissions\r\n            </ion-card-subtitle>\r\n            <ng-container *ngIf=\"!(activeAccount$ | async)\">\r\n              <p>No permissions yet. Request permissions from the wallet first.</p>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"(activeAccount$ | async); let activeAccount\">\r\n              <ion-list lines=\"none\">\r\n                <ion-item class=\"ion-no-padding\">\r\n                  <ion-label>\r\n                    {{ activeAccount.address }}\r\n                    <p *ngIf=\"activeAccount.network.rpcUrl\">{{ activeAccount.network.rpcUrl }}</p>\r\n                  </ion-label>\r\n                  <ion-badge color=\"primary\" slot=\"end\" *ngIf=\"activeAccount.network\">\r\n                    {{ activeAccount.network.type }}\r\n                  </ion-badge>\r\n                </ion-item>\r\n                <ion-item class=\"ion-no-padding\" [disabled]=\"!(activeAccount.scopes.indexOf('sign') >= 0)\">\r\n                  <ion-icon slot=\"start\" name=\"create\"></ion-icon>\r\n                  <ion-label>Sign transactions</ion-label>\r\n                </ion-item>\r\n                <ion-item class=\"ion-no-padding\" [disabled]=\"!(activeAccount.scopes.indexOf('operation_request') >= 0)\">\r\n                  <ion-icon slot=\"start\" name=\"color-wand\"></ion-icon>\r\n                  <ion-label>Operations requests</ion-label>\r\n                </ion-item>\r\n                <ion-item class=\"ion-no-padding\" [disabled]=\"!(activeAccount.scopes.indexOf('threshold') >= 0)\">\r\n                  <ion-icon slot=\"start\" name=\"code-working\"></ion-icon>\r\n                  <ion-label>Threshold</ion-label>\r\n                </ion-item>\r\n              </ion-list>\r\n            </ng-container>\r\n          </ion-card-content>\r\n        </ion-card>\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Connected Networks\r\n            </ion-card-subtitle>\r\n            <ion-list lines=\"none\">\r\n              <ion-item class=\"ion-no-padding\">\r\n                <ion-label>Network</ion-label>\r\n                <ion-select [(ngModel)]=\"selectedNetwork\" placeholder=\"Select one\">\r\n                  <ion-select-option value=\"mainnet\">Mainnet</ion-select-option>\r\n                  <ion-select-option value=\"carthagenet\">Carthagenet</ion-select-option>\r\n                  <ion-select-option value=\"custom\">Custom</ion-select-option>\r\n                </ion-select>\r\n              </ion-item>\r\n              <ng-container *ngIf=\"selectedNetwork === 'custom'\">\r\n                <ion-item>\r\n                  <ion-label>Name (optional)</ion-label>\r\n                  <ion-input [(ngModel)]=\"networkName\"></ion-input>\r\n                </ion-item>\r\n                <ion-item>\r\n                  <ion-label>RPC Url</ion-label>\r\n                  <ion-input [(ngModel)]=\"networkRpcUrl\"></ion-input>\r\n                </ion-item>\r\n              </ng-container>\r\n            </ion-list>\r\n            <ion-button class=\"ion-margin-top\" (click)=\"askForPermissions()\">Request Permissions</ion-button>\r\n          </ion-card-content>\r\n        </ion-card>\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Connected Accounts\r\n            </ion-card-subtitle>\r\n            <div *ngFor=\"let connectedAccount of connectedAccounts\">\r\n              <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n                <ion-label slot=\"start\">\r\n                  <h3>{{ connectedAccount.address }}</h3>\r\n                  <p>{{ connectedAccount.scopes }}</p>\r\n                  <ng-container *ngIf=\"(activeAccount$ | async) let activeAccount\">\r\n                    <ion-badge\r\n                      color=\"dark\"\r\n                      *ngIf=\"connectedAccount.accountIdentifier === activeAccount.accountIdentifier\"\r\n                    >\r\n                      Active Account\r\n                    </ion-badge>\r\n                  </ng-container>\r\n                </ion-label>\r\n                <ion-badge color=\"primary\" slot=\"end\">\r\n                  {{ connectedAccount.network.type }}\r\n                </ion-badge>\r\n              </ion-item>\r\n              <ion-button size=\"small\" (click)=\"activateAccount(connectedAccount)\">\r\n                Activate\r\n              </ion-button>\r\n              <ion-button size=\"small\" fill=\"outline\" (click)=\"disconnectAccount(connectedAccount.accountIdentifier)\">\r\n                Remove\r\n              </ion-button>\r\n            </div>\r\n            <ion-button class=\"ion-margin-top\" (click)=\"showConnectedAccounts()\">Load Accounts</ion-button>\r\n          </ion-card-content>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-padding-bottom\" id=\"operationRequest\">\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding\">\r\n        <h3>\r\n          operationRequest\r\n          <a\r\n            href=\"https://gitlab.com/tzip/tzip/blob/master/proposals/tzip-10/tzip-10.md#3-payment-request\"\r\n            target=\"_blank\"\r\n          >\r\n            <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n          </a>\r\n        </h3>\r\n        <p class=\"ion-padding-bottom\">\r\n          App sends parameters like recipient and amount to the wallet and the wallet will prepare the transaction and\r\n          broadcast it.\r\n        </p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" size-md=\"9\" class=\"ion-no-padding\">\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Contract Details\r\n            </ion-card-subtitle>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n              <ion-label position=\"stacked\">Contract Address</ion-label>\r\n              <ion-input [(ngModel)]=\"contractAddress\" placeholder=\"KT1...\"></ion-input>\r\n            </ion-item>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n              <ion-label *ngIf=\"activeAccount$ | async; let activeAccount\">{{ activeAccount.address }}</ion-label>\r\n            </ion-item>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n              <ion-icon name=\"wallet\" slot=\"start\"></ion-icon>\r\n              <ion-label>\r\n                <strong>\r\n                  <ng-container *ngIf=\"!contractBalance\">0</ng-container>\r\n                  {{ contractBalance }}\r\n                </strong>\r\n                FA Token Balance\r\n              </ion-label>\r\n            </ion-item>\r\n            <ion-button (click)=\"getBalanceOfContract()\" class=\"ion-margin-top\">Get Balance</ion-button>\r\n          </ion-card-content>\r\n        </ion-card>\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Transfer\r\n            </ion-card-subtitle>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n              <ion-label position=\"stacked\">Amount</ion-label>\r\n              <ion-input [(ngModel)]=\"transferAmount\" placeholder=\"15\"></ion-input>\r\n            </ion-item>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding ion-padding-bottom\">\r\n              <ion-label position=\"stacked\">Recipient</ion-label>\r\n              <ion-input [(ngModel)]=\"transferRecipient\" placeholder=\"tz1..\"></ion-input>\r\n            </ion-item>\r\n            <ion-button (click)=\"transfer()\">Transfer</ion-button>\r\n          </ion-card-content>\r\n        </ion-card>\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Custom Tezos Operation\r\n            </ion-card-subtitle>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding ion-padding-bottom\">\r\n              <ion-label position=\"stacked\">Operation Requests (Array)</ion-label>\r\n              <ion-textarea rows=\"10\" [(ngModel)]=\"rawOperationRequest\"></ion-textarea>\r\n            </ion-item>\r\n            <ion-button (click)=\"operationRequest()\">Custom Tezos Operation</ion-button>\r\n          </ion-card-content>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding\">\r\n        <h3 class=\"ion-padding-top\">operationRequest Examples</h3>\r\n        <p class=\"ion-padding-bottom\">\r\n          Additional reference implementations for the operationRequest message.\r\n        </p>\r\n        <p>\r\n          <strong>One Click Delegation</strong>\r\n        </p>\r\n        <p>\r\n          Prompts the wallet with a delegation operation for a specific baker. Bakers can use this on their websites as\r\n          an simple way to create a delegation operation for potential users.\r\n        </p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" size-md=\"9\" class=\"ion-no-padding\">\r\n        <ion-card class=\"ion-no-margin ion-padding-bottom\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Baker Details\r\n            </ion-card-subtitle>\r\n            <!--TODO: enter baker address -->\r\n            <ion-item lines=\"none\" class=\"ion-no-padding ion-padding-bottom\">\r\n              <ion-label position=\"stacked\">Baker address</ion-label>\r\n              <ion-input placeholder=\"tz1..\" [(ngModel)]=\"delegationAddress\"></ion-input>\r\n            </ion-item>\r\n            <ion-button (click)=\"delegate()\">One Click Delegation</ion-button>\r\n          </ion-card-content>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding\">\r\n        <p class=\"ion-padding-top\">\r\n          <strong>Tipping</strong>\r\n        </p>\r\n        <p>\r\n          Prompts the wallet with a spend operation to a pre-defined addres, in this case an address owned by AirGap.\r\n        </p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" size-md=\"9\" class=\"ion-no-padding\">\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Tippinng Details\r\n            </ion-card-subtitle>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding ion-padding-bottom\">\r\n              <ion-label position=\"stacked\">Amount in XTZ</ion-label>\r\n              <ion-input [(ngModel)]=\"tippingAmount\" placeholder=\"1\"></ion-input>\r\n            </ion-item>\r\n            <ion-button (click)=\"tip()\">Tip us</ion-button>\r\n          </ion-card-content>\r\n        </ion-card>\r\n        <beacon-sample-contract></beacon-sample-contract>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-padding-bottom\" id=\"signPayloadRequest\">\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding\">\r\n        <h3>\r\n          signPayloadRequest\r\n          <a\r\n            href=\"https://gitlab.com/tzip/tzip/blob/master/proposals/tzip-10/tzip-10.md#2-sign-payload\"\r\n            target=\"_blank\"\r\n          >\r\n            <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n          </a>\r\n        </h3>\r\n        <p class=\"ion-padding-bottom\">dApp requests that a payload is signed.</p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" size-md=\"9\" class=\"ion-no-padding\">\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Sign Transaction\r\n            </ion-card-subtitle>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n              <ion-label position=\"stacked\">Unsigned Transaction</ion-label>\r\n              <ion-textarea [(ngModel)]=\"unsignedTransaction\"></ion-textarea>\r\n            </ion-item>\r\n          </ion-card-content>\r\n          <ion-button (click)=\"sign()\" class=\"ion-margin\">Sign Transaction</ion-button>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-padding-bottom\" id=\"broadcastRequest\">\r\n      <ion-col size=\"12\" size-md=\"6\" class=\"ion-no-padding\">\r\n        <h3>\r\n          broadcastRequest\r\n          <a\r\n            href=\"https://gitlab.com/tzip/tzip/blob/master/proposals/tzip-10/tzip-10.md#4-broadcast-transactions\"\r\n            target=\"_blank\"\r\n          >\r\n            <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n          </a>\r\n        </h3>\r\n        <p class=\"ion-padding-bottom\">dApp requests a signed transaction to be broadcasted.</p>\r\n      </ion-col>\r\n      <ion-col size=\"12\" size-md=\"9\" class=\"ion-no-padding\">\r\n        <ion-card class=\"ion-no-margin\">\r\n          <ion-card-content>\r\n            <ion-card-subtitle>\r\n              Broadcast Transaction\r\n            </ion-card-subtitle>\r\n            <ion-item lines=\"none\" class=\"ion-no-padding\">\r\n              <ion-label position=\"stacked\">Signed Transaction</ion-label>\r\n              <ion-textarea [(ngModel)]=\"broadcastTransaction\"></ion-textarea>\r\n            </ion-item>\r\n          </ion-card-content>\r\n          <ion-button (click)=\"broadcast()\" class=\"ion-margin\">Broadcast Transaction</ion-button>\r\n        </ion-card>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-bottom\" id=\"beacon-sdk-info\">\r\n      <ion-col>\r\n        <h3>\r\n          Beacon SDK Info\r\n        </h3>\r\n        <p>\r\n          <strong>SDK Version:</strong>\r\n          {{ beaconSdkVersion }}\r\n        </p>\r\n        <p>\r\n          <strong>Beacon ID:</strong>\r\n          {{ beaconSdkBeaconId }}\r\n        </p>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-padding-bottom\" id=\"components\">\r\n      <ion-col>\r\n        <h3>\r\n          Components\r\n        </h3>\r\n        <p class=\"ion-padding-bottom\">The various Beacon components repositories for developers.</p>\r\n        <ion-row>\r\n          <ion-col size-md=\"4\" size=\"12\">\r\n            <h5>\r\n              SDK\r\n              <a href=\"https://github.com/airgap-it/beacon-sdk\" target=\"_blank\">\r\n                <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n              </a>\r\n            </h5>\r\n            <p>\r\n              The beacon-sdk simplifies and abstracts the communication between dApps and wallets over different\r\n              transport layers.\r\n            </p>\r\n          </ion-col>\r\n          <ion-col size-md=\"4\" size=\"12\">\r\n            <h5>\r\n              Extension\r\n              <a href=\"https://chrome.google.com/webstore/detail/gpfndedineagiepkpinficbcbbgjoenn\" target=\"_blank\">\r\n                <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n              </a>\r\n            </h5>\r\n            <p class=\"ion-padding-end\">\r\n              The Beacon Extension implements the beacon-sdk to interact with dApps that have implemented the beacon-sdk\r\n              and use the various signing methods.\r\n            </p>\r\n          </ion-col>\r\n          <ion-col size-md=\"4\" size=\"12\">\r\n            <h5>\r\n              dApp\r\n              <a href=\"https://github.com/airgap-it/beacon-example-dapp\" target=\"_blank\">\r\n                <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n              </a>\r\n            </h5>\r\n            <p>\r\n              The Beacon Example dApp is the reference implementation of a dApp that uses the beacon-sdk with various\r\n              examples of the different message types.\r\n            </p>\r\n          </ion-col>\r\n          <ion-col size-md=\"4\" size=\"12\">\r\n            <h5>\r\n              Android SDK\r\n              <a href=\"https://github.com/airgap-it/beacon-android-sdk\" target=\"_blank\">\r\n                <ion-icon name=\"open\" color=\"medium\" mode=\"ios\"></ion-icon>\r\n              </a>\r\n            </h5>\r\n            <p>\r\n              The beacon-android-sdk simplifies and abstracts the communication between dApps and wallets for Android.\r\n            </p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <ion-row class=\"ion-justify-content-center footer--container ion-margin-top ion-padding-vertical\">\r\n    <ion-col class=\"ion-no-padding\">\r\n      <ion-grid fixed=\"true\" class=\"ion-padding\">\r\n        <ion-row class=\"ion-padding-vertical\">\r\n          <ion-col size=\"12\" size-md=\"4\">\r\n            <img src=\"assets/img/beacon_logoy_type_hor_padding.svg\" class=\"ion-padding-top\" />\r\n            <p>\r\n              Beacon is developed and maintained by\r\n              <a href=\"https://airgap.it\" target=\"_blank\">AirGap</a>\r\n              .\r\n            </p>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"3\">\r\n            <h6>Developers</h6>\r\n            <ul class=\"ion-no-padding\">\r\n              <li><a href=\"https://github.com/airgap-it/beacon-sdk\" target=\"_blank\">beacon-sdk</a></li>\r\n              <li><a href=\"https://github.com/airgap-it/beacon-android-sdk\" target=\"_blank\">beacon-android-sdk</a></li>\r\n              <li><a href=\"https://github.com/airgap-it/beacon-extension\" target=\"_blank\">beacon-extension</a></li>\r\n              <li>\r\n                <a href=\"https://github.com/airgap-it/beacon-example-dapp\" target=\"_blank\">beacon-example-dapp</a>\r\n              </li>\r\n            </ul>\r\n          </ion-col>\r\n          <ion-col size=\"12\" size-md=\"3\">\r\n            <h6>Social Media</h6>\r\n            <ul class=\"ion-no-padding\">\r\n              <li><a href=\"https://twitter.com/AirGap_it\" target=\"_blank\">Twitter</a></li>\r\n              <li><a href=\"https://medium.com/airgap-it\" target=\"_blank\">Medium</a></li>\r\n              <li><a href=\"https://t.me/AirGap\" target=\"_blank\">Telegram</a></li>\r\n            </ul>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ion-col>\r\n  </ion-row>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



const routes = [
    {
        path: '',
        loadChildren: () => __webpack_require__.e(/*! import() | pages-home-home-module */ "pages-home-home-module").then(__webpack_require__.bind(null, /*! ./pages/home/home.module */ "./src/app/pages/home/home.module.ts")).then((m) => m.HomePageModule)
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, {
                preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__["PreloadAllModules"],
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                scrollOffset: [0, 64]
            })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/* active menu item styling */\n.item--active {\n  border-left-width: 4px;\n  border-left-color: var(--ion-color-primary);\n  border-left-style: solid;\n}\n/* mobile menu shadow */\n.show-menu {\n  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.24);\n}\nion-footer ion-icon {\n  font-size: 24px;\n}\n@media only screen and (max-width: 767px) {\n  ion-title {\n    padding: 0;\n  }\n\n  /* hides ion-buttons with connection status on mobile */\n  ion-header ion-buttons {\n    display: none;\n  }\n}\n/* header logo and status styling */\n.logo--container ion-label,\n.logo--container span {\n  font-size: 12px;\n}\n.logo--container span {\n  padding-top: 4px;\n  padding-left: 4px;\n}\n.logo--container span a {\n  color: var(--ion-color-dark);\n  font-weight: 400;\n}\n.logo--container,\n.logo--container div {\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXFVzZXJzXFxrbGFzX1xcR2l0XFxiZWFjb24tZXhhbXBsZS1kYXBwL3NyY1xcYXBwXFxhcHAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBQTtBQUNBO0VBQ0Usc0JBQUE7RUFDQSwyQ0FBQTtFQUNBLHdCQUFBO0FDQ0Y7QURDQSx1QkFBQTtBQUNBO0VBQ0UsK0NBQUE7QUNFRjtBRENFO0VBQ0UsZUFBQTtBQ0VKO0FEQ0E7RUFDRTtJQUNFLFVBQUE7RUNFRjs7RURBQSx1REFBQTtFQUVFO0lBQ0UsYUFBQTtFQ0VKO0FBQ0Y7QURDQSxtQ0FBQTtBQUVFOztFQUVFLGVBQUE7QUNBSjtBREVFO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQ0FKO0FEQ0k7RUFDRSw0QkFBQTtFQUNBLGdCQUFBO0FDQ047QURHQTs7RUFFRSxhQUFBO0FDQUYiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBhY3RpdmUgbWVudSBpdGVtIHN0eWxpbmcgKi9cclxuLml0ZW0tLWFjdGl2ZSB7XHJcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDRweDtcclxuICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIGJvcmRlci1sZWZ0LXN0eWxlOiBzb2xpZDtcclxufVxyXG4vKiBtb2JpbGUgbWVudSBzaGFkb3cgKi9cclxuLnNob3ctbWVudSB7XHJcbiAgYm94LXNoYWRvdzogMnB4IDRweCA0cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7XHJcbn1cclxuaW9uLWZvb3RlciB7XHJcbiAgaW9uLWljb24ge1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gIH1cclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgaW9uLXRpdGxlIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG4gIC8qIGhpZGVzIGlvbi1idXR0b25zIHdpdGggY29ubmVjdGlvbiBzdGF0dXMgb24gbW9iaWxlICovXHJcbiAgaW9uLWhlYWRlciB7XHJcbiAgICBpb24tYnV0dG9ucyB7XHJcbiAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi8qIGhlYWRlciBsb2dvIGFuZCBzdGF0dXMgc3R5bGluZyAqL1xyXG4ubG9nby0tY29udGFpbmVyIHtcclxuICBpb24tbGFiZWwsXHJcbiAgc3BhbiB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgfVxyXG4gIHNwYW4ge1xyXG4gICAgcGFkZGluZy10b3A6IDRweDtcclxuICAgIHBhZGRpbmctbGVmdDogNHB4O1xyXG4gICAgYSB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi5sb2dvLS1jb250YWluZXIsXHJcbi5sb2dvLS1jb250YWluZXIgZGl2IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbiIsIi8qIGFjdGl2ZSBtZW51IGl0ZW0gc3R5bGluZyAqL1xuLml0ZW0tLWFjdGl2ZSB7XG4gIGJvcmRlci1sZWZ0LXdpZHRoOiA0cHg7XG4gIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGJvcmRlci1sZWZ0LXN0eWxlOiBzb2xpZDtcbn1cblxuLyogbW9iaWxlIG1lbnUgc2hhZG93ICovXG4uc2hvdy1tZW51IHtcbiAgYm94LXNoYWRvdzogMnB4IDRweCA0cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7XG59XG5cbmlvbi1mb290ZXIgaW9uLWljb24ge1xuICBmb250LXNpemU6IDI0cHg7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgaW9uLXRpdGxlIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgLyogaGlkZXMgaW9uLWJ1dHRvbnMgd2l0aCBjb25uZWN0aW9uIHN0YXR1cyBvbiBtb2JpbGUgKi9cbiAgaW9uLWhlYWRlciBpb24tYnV0dG9ucyB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuLyogaGVhZGVyIGxvZ28gYW5kIHN0YXR1cyBzdHlsaW5nICovXG4ubG9nby0tY29udGFpbmVyIGlvbi1sYWJlbCxcbi5sb2dvLS1jb250YWluZXIgc3BhbiB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cbi5sb2dvLS1jb250YWluZXIgc3BhbiB7XG4gIHBhZGRpbmctdG9wOiA0cHg7XG4gIHBhZGRpbmctbGVmdDogNHB4O1xufVxuLmxvZ28tLWNvbnRhaW5lciBzcGFuIGEge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4ubG9nby0tY29udGFpbmVyLFxuLmxvZ28tLWNvbnRhaW5lciBkaXYge1xuICBkaXNwbGF5OiBmbGV4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @airgap/beacon-sdk */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
/* harmony import */ var _pages_home_home_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/home/home.page */ "./src/app/pages/home/home.page.ts");
/* harmony import */ var _services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/beacon/beacon.service */ "./src/app/services/beacon/beacon.service.ts");
/* harmony import */ var _services_scroll_scroll_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/scroll/scroll.service */ "./src/app/services/scroll/scroll.service.ts");







let AppComponent = class AppComponent {
    constructor(beaconService, scrollService, storage) {
        this.beaconService = beaconService;
        this.scrollService = scrollService;
        this.storage = storage;
        this.selectedTab = 'approach';
        this.beaconSdkVersion = _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["SDK_VERSION"];
        this.connectionStatus$ = this.beaconService.connectionStatus$;
        this.activeAccount$ = this.beaconService.activeAccount$;
        this.scrollService.currentSelectedTab$.subscribe((currentTab) => {
            this.selectedTab = currentTab;
        });
    }
    scrollTo(element) {
        this.scrollService.scrollTo(element);
    }
    select(element) {
        this.selectedTab = element;
        this.scrollService.setCurrentSelectedTab(element);
    }
    reset() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.beaconService.client.removeAllPeers();
            yield this.storage.clear();
            location.reload();
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: _services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_5__["BeaconService"] },
    { type: _services_scroll_scroll_service__WEBPACK_IMPORTED_MODULE_6__["ScrollService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_pages_home_home_page__WEBPACK_IMPORTED_MODULE_4__["HomePage"], { read: _pages_home_home_page__WEBPACK_IMPORTED_MODULE_4__["HomePage"] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _pages_home_home_page__WEBPACK_IMPORTED_MODULE_4__["HomePage"])
], AppComponent.prototype, "myContent", void 0);
AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-root',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_5__["BeaconService"],
        _services_scroll_scroll_service__WEBPACK_IMPORTED_MODULE_6__["ScrollService"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _classes_sentry_error_handler_sentry_error_handler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./classes/sentry-error-handler/sentry-error-handler */ "./src/app/classes/sentry-error-handler/sentry-error-handler.ts");










let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
        entryComponents: [],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"].forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"], _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["IonicStorageModule"].forRoot()],
        providers: [
            { provide: _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouteReuseStrategy"], useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicRouteStrategy"] },
            { provide: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ErrorHandler"], useClass: _classes_sentry_error_handler_sentry_error_handler__WEBPACK_IMPORTED_MODULE_9__["SentryErrorHandler"] }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/classes/sentry-error-handler/sentry-error-handler.ts":
/*!**********************************************************************!*\
  !*** ./src/app/classes/sentry-error-handler/sentry-error-handler.ts ***!
  \**********************************************************************/
/*! exports provided: ErrorCategory, setSentryRelease, setSentryUser, handleErrorIgnore, handleErrorSentry, SentryErrorHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorCategory", function() { return ErrorCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSentryRelease", function() { return setSentryRelease; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSentryUser", function() { return setSentryUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleErrorIgnore", function() { return handleErrorIgnore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleErrorSentry", function() { return handleErrorSentry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SentryErrorHandler", function() { return SentryErrorHandler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @airgap/beacon-sdk */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/browser */ "./node_modules/@sentry/browser/esm/index.js");




Object(_sentry_browser__WEBPACK_IMPORTED_MODULE_3__["init"])({
    dsn: 'https://bce0d14340384d60823b5ed9494b6d7d@sentry.papers.tech/172',
    release: 'unknown'
});
var ErrorCategory;
(function (ErrorCategory) {
    ErrorCategory["UNKNOWN"] = "unknown";
})(ErrorCategory || (ErrorCategory = {}));
const ERROR_CATEGORY_TAG = 'error-category';
const SDK_VERSION_TAG = 'sdk-version';
const handleErrorSentry = (category = ErrorCategory.UNKNOWN) => {
    return (error) => {
        try {
            Object(_sentry_browser__WEBPACK_IMPORTED_MODULE_3__["withScope"])((scope) => {
                scope.setTag(ERROR_CATEGORY_TAG, category);
                scope.setTag(SDK_VERSION_TAG, _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["SDK_VERSION"]);
                const eventId = Object(_sentry_browser__WEBPACK_IMPORTED_MODULE_3__["captureException"])(error.originalError || error);
                // tslint:disable-next-line
                console.debug(`[sentry](${category}) - ${eventId}`);
            });
        }
        catch (sentryReportingError) {
            // tslint:disable-next-line
            console.debug('Error reporting exception to sentry: ', sentryReportingError);
        }
    };
};
const handleErrorIgnore = (error) => {
    // tslint:disable
    console.debug('[Sentry]: not sending to sentry');
    console.debug(error.originalError || error);
    // tslint:enable
};
const setSentryRelease = (release) => {
    Object(_sentry_browser__WEBPACK_IMPORTED_MODULE_3__["configureScope"])((scope) => {
        scope.addEventProcessor((event) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            event.release = release;
            return event;
        }));
    });
};
const setSentryUser = (UUID) => {
    Object(_sentry_browser__WEBPACK_IMPORTED_MODULE_3__["configureScope"])((scope) => {
        scope.setUser({ id: UUID });
    });
};

let SentryErrorHandler = class SentryErrorHandler extends _angular_core__WEBPACK_IMPORTED_MODULE_2__["ErrorHandler"] {
    handleError(error) {
        super.handleError(error);
        handleErrorSentry()(error);
    }
};
SentryErrorHandler = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], SentryErrorHandler);



/***/ }),

/***/ "./src/app/pages/home/home.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".intro__container {\n  font-size: 1.2em;\n  margin-bottom: 1.2em;\n  line-height: 2;\n  font-weight: 200;\n}\n\n.hero--container {\n  min-height: 50vh;\n}\n\n.selection--container ion-card,\n.integration--container ion-card {\n  height: 100%;\n  justify-content: space-between;\n  display: flex;\n  flex-direction: column;\n}\n\n.selection--container ion-card ion-card-content,\n.integration--container ion-card ion-card-content {\n  flex: 1;\n}\n\n.selection--container ion-card img,\n.integration--container ion-card img {\n  width: 124px;\n  height: auto;\n}\n\n.selection--container ion-card img,\n.selection--container ion-card h3,\n.integration--container ion-card img,\n.integration--container ion-card h3 {\n  min-height: 48px;\n}\n\n.selection--container ion-card h3,\n.integration--container ion-card h3 {\n  display: flex;\n  align-items: center;\n}\n\n@media only screen and (min-width: 768px) {\n  .selection--container ion-card ion-button,\n.integration--container ion-card ion-button {\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n  }\n}\n\n.footer--container {\n  background: var(--ion-color-light);\n}\n\n.footer--container ul {\n  list-style: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvaG9tZS9DOlxcVXNlcnNcXGtsYXNfXFxHaXRcXGJlYWNvbi1leGFtcGxlLWRhcHAvc3JjXFxhcHBcXHBhZ2VzXFxob21lXFxob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUNDRjs7QURDQTtFQUNFLGdCQUFBO0FDRUY7O0FERUU7O0VBQ0UsWUFBQTtFQUNBLDhCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FDRUo7O0FEREk7O0VBQ0UsT0FBQTtBQ0lOOztBREZJOztFQUNFLFlBQUE7RUFDQSxZQUFBO0FDS047O0FESEk7Ozs7RUFFRSxnQkFBQTtBQ09OOztBRExJOztFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQ1FOOztBRE5JO0VBQ0U7O0lBQ0UsMEJBQUE7SUFBQSx1QkFBQTtJQUFBLGtCQUFBO0VDU047QUFDRjs7QURKQTtFQUNFLGtDQUFBO0FDT0Y7O0FETkU7RUFDRSxnQkFBQTtBQ1FKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbnRyb19fY29udGFpbmVyIHtcclxuICBmb250LXNpemU6IDEuMmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDEuMmVtO1xyXG4gIGxpbmUtaGVpZ2h0OiAyO1xyXG4gIGZvbnQtd2VpZ2h0OiAyMDA7XHJcbn1cclxuLmhlcm8tLWNvbnRhaW5lciB7XHJcbiAgbWluLWhlaWdodDogNTB2aDtcclxufVxyXG4uc2VsZWN0aW9uLS1jb250YWluZXIsXHJcbi5pbnRlZ3JhdGlvbi0tY29udGFpbmVyIHtcclxuICBpb24tY2FyZCB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGlvbi1jYXJkLWNvbnRlbnQge1xyXG4gICAgICBmbGV4OiAxO1xyXG4gICAgfVxyXG4gICAgaW1nIHtcclxuICAgICAgd2lkdGg6IDEyNHB4O1xyXG4gICAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICB9XHJcbiAgICBpbWcsXHJcbiAgICBoMyB7XHJcbiAgICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XHJcbiAgICB9XHJcbiAgICBoMyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmZvb3Rlci0tY29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIHVsIHtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgfVxyXG59XHJcbiIsIi5pbnRyb19fY29udGFpbmVyIHtcbiAgZm9udC1zaXplOiAxLjJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMS4yZW07XG4gIGxpbmUtaGVpZ2h0OiAyO1xuICBmb250LXdlaWdodDogMjAwO1xufVxuXG4uaGVyby0tY29udGFpbmVyIHtcbiAgbWluLWhlaWdodDogNTB2aDtcbn1cblxuLnNlbGVjdGlvbi0tY29udGFpbmVyIGlvbi1jYXJkLFxuLmludGVncmF0aW9uLS1jb250YWluZXIgaW9uLWNhcmQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5zZWxlY3Rpb24tLWNvbnRhaW5lciBpb24tY2FyZCBpb24tY2FyZC1jb250ZW50LFxuLmludGVncmF0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaW9uLWNhcmQtY29udGVudCB7XG4gIGZsZXg6IDE7XG59XG4uc2VsZWN0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaW1nLFxuLmludGVncmF0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaW1nIHtcbiAgd2lkdGg6IDEyNHB4O1xuICBoZWlnaHQ6IGF1dG87XG59XG4uc2VsZWN0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaW1nLFxuLnNlbGVjdGlvbi0tY29udGFpbmVyIGlvbi1jYXJkIGgzLFxuLmludGVncmF0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaW1nLFxuLmludGVncmF0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaDMge1xuICBtaW4taGVpZ2h0OiA0OHB4O1xufVxuLnNlbGVjdGlvbi0tY29udGFpbmVyIGlvbi1jYXJkIGgzLFxuLmludGVncmF0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaDMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAuc2VsZWN0aW9uLS1jb250YWluZXIgaW9uLWNhcmQgaW9uLWJ1dHRvbixcbi5pbnRlZ3JhdGlvbi0tY29udGFpbmVyIGlvbi1jYXJkIGlvbi1idXR0b24ge1xuICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgfVxufVxuXG4uZm9vdGVyLS1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xufVxuLmZvb3Rlci0tY29udGFpbmVyIHVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/home/home.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/home/home.page.ts ***!
  \*****************************************/
/*! exports provided: getTezblockLinkForAddress, getTezblockLinkForTxHash, HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTezblockLinkForAddress", function() { return getTezblockLinkForAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTezblockLinkForTxHash", function() { return getTezblockLinkForTxHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @airgap/beacon-sdk */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var airgap_coin_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! airgap-coin-lib */ "./node_modules/airgap-coin-lib/dist/index.js");
/* harmony import */ var airgap_coin_lib__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(airgap_coin_lib__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/beacon/beacon.service */ "./src/app/services/beacon/beacon.service.ts");
/* harmony import */ var _services_scroll_scroll_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/scroll/scroll.service */ "./src/app/services/scroll/scroll.service.ts");










const getTezblockLinkForAddress = (accountInfo, address) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const urls = {
        [_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].MAINNET]: 'https://tezblock.io/account/',
        [_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].CARTHAGENET]: 'https://carthagenet.tezblock.io/account/',
        [_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].CUSTOM]: 'https://carthagenet.tezblock.io/account/'
    };
    const url = urls[accountInfo && accountInfo.network ? accountInfo.network.type : _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].MAINNET];
    return `${url}${address}`;
});
const getTezblockLinkForTxHash = (accountInfo, txHash) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const urls = {
        [_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].MAINNET]: 'https://tezblock.io/transaction/',
        [_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].CARTHAGENET]: 'https://carthagenet.tezblock.io/transaction/',
        [_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].CUSTOM]: 'https://carthagenet.tezblock.io/transaction/'
    };
    const url = urls[accountInfo && accountInfo.network ? accountInfo.network.type : _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["NetworkType"].MAINNET];
    return `${url}${txHash}`;
});
let HomePage = class HomePage {
    constructor(alertController, beaconService, route, scrollService, toastController) {
        this.alertController = alertController;
        this.beaconService = beaconService;
        this.route = route;
        this.scrollService = scrollService;
        this.toastController = toastController;
        this.contractAddress = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn';
        this.contractBalance = '';
        this.selectedNetwork = 'carthagenet';
        this.delegationAddress = 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ';
        this.tippingAmount = '1';
        this.rawOperationRequest = `[
    {
      "kind": "transaction",
      "amount": "1234567",
      "destination": "tz1hrHoK11TBz3HwWD2YZyZVWUyAg44h3eqd"
    }
  ]`;
        this.unsignedTransaction = 'f8f9b125f7ef6bbae5ee27f4612220ac93aa7c392ac5f548d15e18c2bd9a7d926c00075da6a7c0ec09c550623fefd8a9cdf40d3d9910ad8100e1dc5fbc500001000012548f71994cb2ce18072d0dcb568fe35fb7493000';
        this.broadcastTransaction = '1ef017b560494ae7b102be63f4d64e64d70114ff4652df23f34ae4460645b3266b00641b67c32672f0b11263b89b05b51e42faa64a3f940ad8d79101904e0000c64ac48e550c2c289af4c5ce5fe52ca7ba7a91d1a411745313e154eff8d118f16c00641b67c32672f0b11263b89b05b51e42faa64a3fdc0bd9d79101bc5000000000641b67c32672f0b11263b89b05b51e42faa64a3f0085dcfbba4a00c5b4f89914c1819ccd8466f6328b74073d50406394e59fe32d89e62112fec2d5a9bc1e6787206fe50e26f90999ae3061ca76247b57e08b6e490a';
        this.transferAmount = '';
        this.transferRecipient = '';
        this.connectedAccounts = [];
        this.protocol = new airgap_coin_lib__WEBPACK_IMPORTED_MODULE_5__["TezosBTC"]();
        this.beaconSdkVersion = _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["SDK_VERSION"];
        this.activeAccount$ = this.beaconService.activeAccount$;
        this.activeAccount$.subscribe((activeAccount) => {
            this.activeAccount = activeAccount;
        });
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector(`#${f}`);
            if (element) {
                element.scrollIntoView();
            }
        });
        this.scrollService.scroll$.subscribe((element) => {
            this.scrollTo(element).catch(console.error);
        });
        this.beaconService.client.beaconId
            .then((beaconId) => {
            this.beaconSdkBeaconId = beaconId;
        })
            .catch(console.error);
    }
    askForPermissions() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.beaconService.client.requestPermissions({
                network: {
                    type: this.selectedNetwork,
                    name: this.networkName,
                    rpcUrl: this.networkRpcUrl
                }
            });
        });
    }
    showConnectedAccounts() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.connectedAccounts = yield this.beaconService.client.getAccounts();
        });
    }
    activateAccount(accountInfo) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.beaconService.client.setActiveAccount(accountInfo);
        });
    }
    disconnectAccount(accountIdentifier) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.beaconService.client.removeAccount(accountIdentifier);
            yield this.showConnectedAccounts();
        });
    }
    ionViewDidEnter() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let htmlElement;
            const firstElement = document.getElementById(this.scrollService.getFirstTab());
            this.scrollService.currentSelectedTab$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])((currentTab) => {
                htmlElement = document.getElementById(currentTab);
                return this.myContent.ionScroll.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["throttleTime"])(100, rxjs__WEBPACK_IMPORTED_MODULE_6__["asyncScheduler"], { leading: true, trailing: true }));
            }))
                .subscribe((scrollDetailEvent) => {
                if (scrollDetailEvent.detail.velocityY > 0) {
                    // scrolling down
                    if (htmlElement && htmlElement.offsetTop && scrollDetailEvent.detail.scrollTop > htmlElement.offsetTop) {
                        this.scrollService.selectNewTab('next');
                    }
                }
                else if (scrollDetailEvent.detail.velocityY < 0) {
                    // scrolling up
                    if (firstElement &&
                        scrollDetailEvent.detail.scrollTop > firstElement.offsetTop &&
                        htmlElement &&
                        htmlElement.offsetTop &&
                        scrollDetailEvent.detail.scrollTop < htmlElement.offsetTop - 1) {
                        this.scrollService.selectNewTab('previous');
                    }
                }
            });
        });
    }
    getBalanceOfContract() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.activeAccount && this.activeAccount.address) {
                const balance = yield this.protocol.getBalance(this.activeAccount.address);
                this.contractBalance = balance;
                console.log('tzbtc balance', balance);
            }
            else {
                this.contractBalance = '0';
            }
            const toast = yield this.toastController.create({
                message: 'Balance updated',
                position: 'bottom',
                duration: 1000,
                buttons: [
                    {
                        text: 'Done',
                        role: 'cancel'
                    }
                ]
            });
            toast.present();
        });
    }
    tip() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const amount = parseFloat(this.tippingAmount) * 1000000;
            if (isNaN(amount)) {
                return this.showAlertWithBlockExplorerLink('Error', 'Amount is invalid');
            }
            return this.requestOperationWithAlert([
                {
                    kind: _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["TezosOperationType"].TRANSACTION,
                    amount: amount.toString(),
                    destination: 'tz1hrHoK11TBz3HwWD2YZyZVWUyAg44h3eqd'
                }
            ], 'Thanks for your tip!');
        });
    }
    delegate() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.requestOperationWithAlert([{ kind: _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["TezosOperationType"].DELEGATION, delegate: this.delegationAddress }], 'Thanks for your delegation!');
        });
    }
    transfer() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const amount = parseFloat(this.transferAmount) * 1000000;
            if (isNaN(amount)) {
                return this.showAlertWithBlockExplorerLink('Error', 'Amount is invalid');
            }
            return this.requestOperationWithAlert([
                {
                    kind: _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["TezosOperationType"].TRANSACTION,
                    amount: amount.toString(),
                    destination: this.transferRecipient
                }
            ], 'The operation has been broadcasted to the network.');
        });
    }
    operationRequest() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.requestOperationWithAlert(JSON.parse(this.rawOperationRequest), 'The operation has been broadcasted to the network.');
        });
    }
    sign() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.activeAccount) {
                throw new Error('No active account set');
            }
            yield this.beaconService.client.requestSignPayload({
                payload: this.unsignedTransaction,
                sourceAddress: this.activeAccount.address
            });
        });
    }
    broadcast() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.activeAccount) {
                throw new Error('No active account set');
            }
            yield this.beaconService.client.requestBroadcast({
                network: this.activeAccount.network,
                signedTransaction: this.broadcastTransaction
            });
        });
    }
    scrollTo(element) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (document.getElementById(element) != null) {
                const yOffset = document.getElementById(element);
                if (yOffset && yOffset.offsetTop) {
                    yield this.myContent.scrollToPoint(0, yOffset.offsetTop, 500);
                }
            }
        });
    }
    showAlertWithBlockExplorerLink(header, message, transactionHash) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const buttons = [];
            if (transactionHash) {
                buttons.push({
                    text: 'Open Blockexplorer',
                    handler: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                        window.open(yield getTezblockLinkForTxHash(this.activeAccount, transactionHash), '_blank');
                    })
                });
            }
            buttons.push('OK');
            const alert = yield this.alertController.create({
                header,
                message,
                buttons
            });
            yield alert.present();
        });
    }
    requestOperationWithAlert(operations, _successMessage) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.activeAccount) {
                throw new Error('No active account set!');
            }
            try {
                yield this.beaconService.client.requestOperation({
                    operationDetails: operations
                });
            }
            catch (e) {
                console.log('operation-request error', e);
            }
        });
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: _services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_8__["BeaconService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _services_scroll_scroll_service__WEBPACK_IMPORTED_MODULE_9__["ScrollService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"], { read: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"] }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"])
], HomePage.prototype, "myContent", void 0);
HomePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-home',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/home.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./home.page.scss */ "./src/app/pages/home/home.page.scss")).default]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
        _services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_8__["BeaconService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _services_scroll_scroll_service__WEBPACK_IMPORTED_MODULE_9__["ScrollService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"]])
], HomePage);



/***/ }),

/***/ "./src/app/services/beacon/beacon.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/beacon/beacon.service.ts ***!
  \***************************************************/
/*! exports provided: BeaconService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BeaconService", function() { return BeaconService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @airgap/beacon-sdk */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let BeaconService = class BeaconService {
    constructor() {
        this.client = new _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["DAppClient"]({
            name: 'Beacon Example Dapp'
        });
        this._connectionStatus$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this._activeAccount$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.balance = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.client
            .subscribeToEvent(_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["BeaconEvent"].ACTIVE_ACCOUNT_SET, (data) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this._activeAccount$.next(data);
        }))
            .catch(console.error);
        this.client
            .subscribeToEvent(_airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["BeaconEvent"].ACTIVE_TRANSPORT_SET, (data) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (data.type === _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["TransportType"].POST_MESSAGE) {
                this._connectionStatus$.next('Chrome Extension');
            }
            else if (data.type === _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["TransportType"].P2P) {
                this._connectionStatus$.next('Beacon Connect');
            }
            else {
                this._connectionStatus$.next('Not connected');
            }
        }))
            .catch(console.error);
        this.initConnection().catch(console.error);
    }
    get connectionStatus$() {
        return this._connectionStatus$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])());
    }
    get activeAccount$() {
        return this._activeAccount$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])());
    }
    initConnection() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.client.init();
        });
    }
};
BeaconService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], BeaconService);



/***/ }),

/***/ "./src/app/services/scroll/scroll.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/scroll/scroll.service.ts ***!
  \***************************************************/
/*! exports provided: ScrollService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollService", function() { return ScrollService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



let ScrollService = class ScrollService {
    constructor() {
        this.currentTab = 'approach';
        this.scrollSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.selectedTabSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('approach');
        this.tabsInOrder = [
            'approach',
            'wallets_dapps',
            'transport_layer',
            'message_types',
            'permissionRequest',
            'operationRequest',
            'signPayloadRequest',
            'broadcastRequest'
        ];
        this.scroll$ = this.scrollSource.asObservable();
        this.currentSelectedTab$ = this.selectedTabSource.asObservable();
    }
    scrollTo(element) {
        this.scrollSource.next(element);
    }
    setCurrentSelectedTab(element) {
        this.currentTab = element;
        this.selectedTabSource.next(element);
    }
    selectNewTab(nextOrPrevious) {
        const idx = this.tabsInOrder.indexOf(this.currentTab);
        let newSelectedTab;
        if (nextOrPrevious === 'next') {
            newSelectedTab = this.tabsInOrder[idx + 1] ? this.tabsInOrder[idx + 1] : this.tabsInOrder[idx];
            this.selectedTabSource.next(newSelectedTab);
        }
        else if (nextOrPrevious === 'previous') {
            newSelectedTab = this.tabsInOrder[idx - 1] ? this.tabsInOrder[idx - 1] : this.tabsInOrder[0];
            this.selectedTabSource.next(newSelectedTab);
        }
        this.currentTab = newSelectedTab;
    }
    getFirstTab() {
        return this.tabsInOrder[0];
    }
};
ScrollService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], ScrollService);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch((err) => console.log(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\klas_\Git\beacon-example-dapp\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map