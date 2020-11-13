(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-home-home-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/sample-contract/sample-contract.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/sample-contract/sample-contract.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p class=\"ion-padding-top\">\r\n  <strong>Beacon Sample Contract</strong>\r\n</p>\r\n<p>\r\n  This allows you to set a number and a true or false flag and is deployed on\r\n  <strong>Carthagenet</strong>\r\n  .\r\n</p>\r\n<ion-card class=\"ion-no-margin\">\r\n  <ion-card-content>\r\n    <ion-card-subtitle>\r\n      Current Smart Contract State\r\n    </ion-card-subtitle>\r\n    <ion-item lines=\"none\" class=\"ion-no-padding ion-padding-bottom\">\r\n      <pre>\r\nNumber: {{ number }}\r\nFlag: {{ flag }}</pre\r\n      >\r\n    </ion-item>\r\n    <ion-button (click)=\"getState()\">Update State</ion-button>\r\n    <a href=\"https://you.better-call.dev/carthagenet/KT1RxKJyi48W3bZR8HErRiisXZQw19HwLGWj/storage\" target=\"_blank\">\r\n      <ion-button fill=\"outline\">\r\n        State on BetterCallDev\r\n      </ion-button>\r\n    </a>\r\n  </ion-card-content>\r\n</ion-card>\r\n<ion-card class=\"ion-no-margin\">\r\n  <ion-card-content>\r\n    <ion-card-subtitle>\r\n      Change Number\r\n    </ion-card-subtitle>\r\n    <ion-item lines=\"none\" class=\"ion-no-padding ion-padding-bottom\">\r\n      <ion-label position=\"stacked\">Number</ion-label>\r\n      <ion-input [(ngModel)]=\"newNumber\" placeholder=\"7\"></ion-input>\r\n    </ion-item>\r\n    <ion-button (click)=\"setNumber()\">Update Number</ion-button>\r\n  </ion-card-content>\r\n</ion-card>\r\n<ion-card class=\"ion-no-margin\">\r\n  <ion-card-content>\r\n    <ion-card-subtitle>\r\n      Change Flag\r\n    </ion-card-subtitle>\r\n    The new value needs to be different to the old value.\r\n    <ion-item lines=\"none\" class=\"ion-no-padding ion-padding-bottom\">\r\n      <ion-label>Flag</ion-label>\r\n      <ion-checkbox slot=\"end\" [(ngModel)]=\"newFlag\"></ion-checkbox>\r\n    </ion-item>\r\n    <ion-button (click)=\"setFlag()\">Update Flag</ion-button>\r\n  </ion-card-content>\r\n</ion-card>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/supporting-project-item/supporting-project-item.component.html":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/supporting-project-item/supporting-project-item.component.html ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-card class=\"ion-no-margin\">\r\n  <ion-card-header>\r\n    <img *ngIf=\"logo\" src=\"assets/img/{{ logo }}\" />\r\n    <h3 *ngIf=\"!logo\" class=\"ion-no-padding ion-no-margin\">{{ title }}</h3>\r\n  </ion-card-header>\r\n  <ion-card-content>\r\n    <p [innerHTML]=\"description\"></p>\r\n  </ion-card-content>\r\n  <div class=\"ion-margin\">\r\n    <a href=\"{{ btnLink }}\" target=\"_blank\">\r\n      <ion-button fill=\"outline\">\r\n        {{ btnDescription }}\r\n      </ion-button>\r\n    </a>\r\n  </div>\r\n</ion-card>\r\n");

/***/ }),

/***/ "./src/app/components/sample-contract/sample-contract.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/components/sample-contract/sample-contract.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2FtcGxlLWNvbnRyYWN0L3NhbXBsZS1jb250cmFjdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/components/sample-contract/sample-contract.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/sample-contract/sample-contract.component.ts ***!
  \*************************************************************************/
/*! exports provided: SampleContractComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleContractComponent", function() { return SampleContractComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @airgap/beacon-sdk */ "../beacon-sdk/dist/esm/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/beacon/beacon.service */ "./src/app/services/beacon/beacon.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");






let SampleContractComponent = class SampleContractComponent {
    constructor(http, beaconService, toastController) {
        this.http = http;
        this.beaconService = beaconService;
        this.toastController = toastController;
        this.newNumber = 0;
        this.newFlag = false;
        this.contractDestination = 'KT1RxKJyi48W3bZR8HErRiisXZQw19HwLGWj';
        this.activeAccount$ = this.beaconService.activeAccount$;
        this.activeAccount$.subscribe((activeAccount) => {
            this.activeAccount = activeAccount;
        });
        this.getState().catch(console.error);
    }
    getState() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const result = yield this.http
                .get('https://tezos-carthagenet-node-1.kubernetes.papers.tech/chains/main/blocks/head/context/contracts/KT1RxKJyi48W3bZR8HErRiisXZQw19HwLGWj/storage')
                .toPromise();
            this.number = result.args[0].int;
            this.flag = result.args[1].prim;
            const toast = yield this.toastController.create({
                message: 'State updated',
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
    setNumber() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.activeAccount) {
                throw new Error('No active account set!');
            }
            const response = yield this.beaconService.client.requestOperation({
                operationDetails: [
                    {
                        kind: _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["TezosOperationType"].TRANSACTION,
                        amount: '0',
                        destination: this.contractDestination,
                        parameters: {
                            entrypoint: 'setNumber',
                            value: {
                                int: this.newNumber.toString()
                            }
                        }
                    }
                ]
            });
            console.log(response);
        });
    }
    setFlag() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.activeAccount) {
                throw new Error('No active account set!');
            }
            const response = yield this.beaconService.client.requestOperation({
                operationDetails: [
                    {
                        kind: _airgap_beacon_sdk__WEBPACK_IMPORTED_MODULE_1__["TezosOperationType"].TRANSACTION,
                        amount: '0',
                        destination: this.contractDestination,
                        parameters: {
                            entrypoint: 'toggleStatus',
                            value: {
                                prim: this.newFlag ? 'True' : 'False'
                            }
                        }
                    }
                ]
            });
            console.log(response);
        });
    }
};
SampleContractComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: src_app_services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_4__["BeaconService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"] }
];
SampleContractComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'beacon-sample-contract',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./sample-contract.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/sample-contract/sample-contract.component.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./sample-contract.component.scss */ "./src/app/components/sample-contract/sample-contract.component.scss")).default]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
        src_app_services_beacon_beacon_service__WEBPACK_IMPORTED_MODULE_4__["BeaconService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"]])
], SampleContractComponent);



/***/ }),

/***/ "./src/app/components/supporting-project-item/supporting-project-item.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/components/supporting-project-item/supporting-project-item.component.scss ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("img {\n  max-width: 124px;\n  height: auto;\n  max-height: 48px;\n}\n\nimg,\nh3 {\n  min-height: 48px;\n}\n\nh3 {\n  display: flex;\n  align-items: center;\n}\n\nion-card {\n  min-height: 260px;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdXBwb3J0aW5nLXByb2plY3QtaXRlbS9DOlxcVXNlcnNcXGtsYXNfXFxHaXRcXGJlYWNvbi1leGFtcGxlLWRhcHAvc3JjXFxhcHBcXGNvbXBvbmVudHNcXHN1cHBvcnRpbmctcHJvamVjdC1pdGVtXFxzdXBwb3J0aW5nLXByb2plY3QtaXRlbS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zdXBwb3J0aW5nLXByb2plY3QtaXRlbS9zdXBwb3J0aW5nLXByb2plY3QtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FEQ0E7O0VBRUUsZ0JBQUE7QUNFRjs7QURBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQ0dGOztBRERBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FDSUYiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3N1cHBvcnRpbmctcHJvamVjdC1pdGVtL3N1cHBvcnRpbmctcHJvamVjdC1pdGVtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1nIHtcclxuICBtYXgtd2lkdGg6IDEyNHB4O1xyXG4gIGhlaWdodDogYXV0bztcclxuICBtYXgtaGVpZ2h0OiA0OHB4O1xyXG59XHJcbmltZyxcclxuaDMge1xyXG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XHJcbn1cclxuaDMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5pb24tY2FyZCB7XHJcbiAgbWluLWhlaWdodDogMjYwcHg7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbiIsImltZyB7XG4gIG1heC13aWR0aDogMTI0cHg7XG4gIGhlaWdodDogYXV0bztcbiAgbWF4LWhlaWdodDogNDhweDtcbn1cblxuaW1nLFxuaDMge1xuICBtaW4taGVpZ2h0OiA0OHB4O1xufVxuXG5oMyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmlvbi1jYXJkIHtcbiAgbWluLWhlaWdodDogMjYwcHg7XG4gIGhlaWdodDogMTAwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/supporting-project-item/supporting-project-item.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/components/supporting-project-item/supporting-project-item.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: SupportingProjectItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportingProjectItemComponent", function() { return SupportingProjectItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let SupportingProjectItemComponent = class SupportingProjectItemComponent {
    constructor() { }
    ngOnInit() { }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], SupportingProjectItemComponent.prototype, "logo", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], SupportingProjectItemComponent.prototype, "title", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], SupportingProjectItemComponent.prototype, "description", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], SupportingProjectItemComponent.prototype, "btnDescription", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], SupportingProjectItemComponent.prototype, "btnLink", void 0);
SupportingProjectItemComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'beacon-supporting-project-item',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./supporting-project-item.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/supporting-project-item/supporting-project-item.component.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./supporting-project-item.component.scss */ "./src/app/components/supporting-project-item/supporting-project-item.component.scss")).default]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], SupportingProjectItemComponent);



/***/ }),

/***/ "./src/app/pages/home/home.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_components_sample_contract_sample_contract_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/components/sample-contract/sample-contract.component */ "./src/app/components/sample-contract/sample-contract.component.ts");
/* harmony import */ var src_app_components_supporting_project_item_supporting_project_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/supporting-project-item/supporting-project-item.component */ "./src/app/components/supporting-project-item/supporting-project-item.component.ts");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home.page */ "./src/app/pages/home/home.page.ts");









let HomePageModule = class HomePageModule {
};
HomePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_8__["HomePage"]
                }
            ])
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_8__["HomePage"], src_app_components_sample_contract_sample_contract_component__WEBPACK_IMPORTED_MODULE_6__["SampleContractComponent"], src_app_components_supporting_project_item_supporting_project_item_component__WEBPACK_IMPORTED_MODULE_7__["SupportingProjectItemComponent"]]
    })
], HomePageModule);



/***/ })

}]);
//# sourceMappingURL=pages-home-home-module.js.map