(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/cdk/layout'), require('@angular/material'), require('core-js/es7/reflect'), require('zone.js/dist/zone'), require('@angular/common'), require('@angular/cdk/table'), require('@angular/cdk/tree'), require('@angular/forms'), require('@angular/platform-browser'), require('@angular/platform-browser/animations'), require('@angular/common/http'), require('rxjs/operators'), require('jwt-decode'), require('@angular/http'), require('@angular/router'), require('ngx-gallery')) :
    typeof define === 'function' && define.amd ? define('pxt-shared-components', ['exports', '@angular/core', 'rxjs', '@angular/cdk/layout', '@angular/material', 'core-js/es7/reflect', 'zone.js/dist/zone', '@angular/common', '@angular/cdk/table', '@angular/cdk/tree', '@angular/forms', '@angular/platform-browser', '@angular/platform-browser/animations', '@angular/common/http', 'rxjs/operators', 'jwt-decode', '@angular/http', '@angular/router', 'ngx-gallery'], factory) :
    (factory((global['pxt-shared-components'] = {}),global.ng.core,global.rxjs,global.ng.cdk.layout,global.ng.material,null,null,global.ng.common,global.ng.cdk.table,global.ng.cdk.tree,global.ng.forms,global.ng.platformBrowser,global.ng.platformBrowser.animations,global.ng.common.http,global.rxjs.operators,global.jwt_decode,global.ng.http,global.ng.router,global.ngxGallery));
}(this, (function (exports,core,rxjs,layout,material,reflect,zone,common,table,tree,forms,platformBrowser,animations,http,operators,jwt_decode,http$1,router,ngxGallery) { 'use strict';

    jwt_decode = jwt_decode && jwt_decode.hasOwnProperty('default') ? jwt_decode['default'] : jwt_decode;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtContentBody = (function () {
        function PxtContentBody(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        PxtContentBody.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ad-pxt-content]',
                    },] }
        ];
        /** @nocollapse */
        PxtContentBody.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef }
            ];
        };
        return PxtContentBody;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtAppComponentService = (function () {
        function PxtAppComponentService() {
            this.submenusItens = new rxjs.Subject();
            this.submenusItensObservable = this.submenusItens.asObservable();
            this._loadComponent = new rxjs.Subject();
            this.loadComponentObservable = this._loadComponent.asObservable();
            this._setUserLogged = new rxjs.Subject();
            this.userLoggedObservable = this._setUserLogged.asObservable();
            this._setInfoInit = new rxjs.Subject();
            this.infoInitial = this._setInfoInit.asObservable();
        }
        /**
         * @param {?} routes
         * @return {?}
         */
        PxtAppComponentService.prototype.setSubmenus = /**
         * @param {?} routes
         * @return {?}
         */
            function (routes) {
                this.submenusItens.next(routes);
            };
        /**
         * @param {?} infoInitial
         * @return {?}
         */
        PxtAppComponentService.prototype.setInitialInfo = /**
         * @param {?} infoInitial
         * @return {?}
         */
            function (infoInitial) {
                this._setInfoInit.next(infoInitial);
            };
        /**
         * @param {?} component
         * @return {?}
         */
        PxtAppComponentService.prototype.loadComponent = /**
         * @param {?} component
         * @return {?}
         */
            function (component) {
                this._loadComponent.next(component);
            };
        /**
         * @param {?} user
         * @return {?}
         */
        PxtAppComponentService.prototype.setUser = /**
         * @param {?} user
         * @return {?}
         */
            function (user) {
                this._setUserLogged.next(user);
            };
        PxtAppComponentService.decorators = [
            { type: core.Injectable }
        ];
        return PxtAppComponentService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtAppComponent = (function () {
        //Constructor
        function PxtAppComponent(changeDetectorRef, media, componentFactoryResolver, pxtAppComponentService) {
            var _this = this;
            this.componentFactoryResolver = componentFactoryResolver;
            this.pxtAppComponentService = pxtAppComponentService;
            //Properties
            this.routes = [];
            this.groups = [];
            this.menus = [];
            this.system = "SYSTEM NAME";
            this.urlImg = 'http://imagensdsv.peixoto.com.br/auth/mini_logo.png';
            this.menuSelected = "";
            this.usuerLogged = "Loogged user";
            this.shouldRun = true;
            this.currentAdIndex = -1;
            this.mobileQuery = media.matchMedia('(max-width: 600px)');
            this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
            this.mobileQuery.addListener(this._mobileQueryListener);
            this.result = pxtAppComponentService.infoInitial.subscribe(function (infoInitial) {
                if (infoInitial != undefined) {
                    _this.usuerLogged = infoInitial.userLogged;
                    _this.system = infoInitial.system;
                    _this.menusReceived = infoInitial.sideBarMenus;
                    _this.menus = infoInitial.sideBarMenus;
                    _this.prepareMenu();
                }
            });
            this.subscribeComponent();
        }
        /**
         * @return {?}
         */
        PxtAppComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.mobileQuery.removeListener(this._mobileQueryListener);
                clearInterval(this.interval);
            };
        // Include of components in the application body
        /**
         * @param {?} route
         * @param {?} adHost
         * @return {?}
         */
        PxtAppComponent.prototype.loadComponent = /**
         * @param {?} route
         * @param {?} adHost
         * @return {?}
         */
            function (route, adHost) {
                this.menuSelected = route.menuText;
                /** @type {?} */
                var adItem = route.menuSource;
                /** @type {?} */
                var componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
                /** @type {?} */
                var viewContainerRef = adHost.viewContainerRef;
                viewContainerRef.clear();
                /** @type {?} */
                var componentRef = viewContainerRef.createComponent(componentFactory);
            };
        // Subscription to the service responsible for including components in the body of the application
        /**
         * @return {?}
         */
        PxtAppComponent.prototype.subscribeComponent = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.pxtAppComponentService.loadComponentObservable.subscribe(function (componentObj) {
                    /** @type {?} */
                    var arrayAux = _this.menusReceived.filter(function (x) { return x.menuSource != undefined && x.menuSource.component === componentObj.component; });
                    console.log(arrayAux);
                    if (arrayAux.length == 1) {
                        _this.menuSelected = arrayAux[0].menuText;
                    }
                    /** @type {?} */
                    var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(componentObj.component);
                    /** @type {?} */
                    var viewContainerRef = _this.adHost.viewContainerRef;
                    viewContainerRef.clear();
                    /** @type {?} */
                    var componentRef = viewContainerRef.createComponent(componentFactory);
                    ((componentRef.instance)).data = componentObj.data;
                });
            };
        // Responsible for call method "loadcomponents()" informing parameters
        /**
         * @param {?} nav
         * @return {?}
         */
        PxtAppComponent.prototype.selectItemMenu = /**
         * @param {?} nav
         * @return {?}
         */
            function (nav) {
                this.loadComponent(nav, this.adHost);
            };
        // Method responsible for preparing application menus;
        /**
         * @return {?}
         */
        PxtAppComponent.prototype.prepareMenu = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var arrayAux;
                arrayAux = this.menus.filter(function (x) { return x.menuType == "group" && x.menuParent == ""; });
                /** @type {?} */
                var arrayAuxGroup = this.menus.filter(function (x) { return x.menuType == "group" && x.menuParent !== ""; });
                /** @type {?} */
                var arrayAuxItem = this.menus.filter(function (x) { return x.menuType == "item" && x.menuParent !== ""; });
                //add itens in groups
                arrayAuxItem.forEach(function (item) {
                    /** @type {?} */
                    var arrayTmp = arrayAuxGroup.filter(function (x) { return x.menuId == item.menuParent; });
                    if (arrayTmp.length == 1) {
                        if (arrayTmp[0].childs == undefined) {
                            arrayTmp[0].childs = [];
                        }
                        arrayTmp[0].childs.push(item);
                    }
                });
                //add groups in groups
                arrayAuxGroup.forEach(function (item) {
                    /** @type {?} */
                    var arrayTmp = arrayAuxGroup.filter(function (x) { return x.menuId == item.menuParent; });
                    if (arrayTmp.length == 1) {
                        if (arrayTmp[0].childs == undefined) {
                            arrayTmp[0].childs = [];
                        }
                        arrayTmp[0].childs.push(item);
                    }
                });
                //add groups in super-groups
                arrayAuxGroup.forEach(function (item) {
                    /** @type {?} */
                    var arrayTmp = arrayAux.filter(function (x) { return x.menuId == item.menuParent; });
                    if (arrayTmp.length == 1) {
                        if (arrayTmp[0].childs == undefined) {
                            arrayTmp[0].childs = [];
                            arrayTmp[0].childs.push(item);
                        }
                        else {
                            arrayTmp[0].childs.push(item);
                        }
                    }
                });
                //add itens in super-groups
                arrayAuxItem.forEach(function (item) {
                    /** @type {?} */
                    var arrayTmp = arrayAux.filter(function (x) { return x.menuId == item.menuParent; });
                    if (arrayTmp.length == 1) {
                        if (arrayTmp[0].childs == undefined) {
                            arrayTmp[0].childs = [];
                        }
                        arrayTmp[0].childs.push(item);
                    }
                });
                this.menus = arrayAux;
            };
        PxtAppComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-app',
                        template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button style=\"z-index: 1;\" (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <img [src]=\"urlImg\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{system | uppercaseFirst}}</h1>\n    <h1 class=\"system\">{{menuSelected | uppercaseFirst}}</h1>\n    <span class=\"example-spacer\"></span>\n    <span>Ol\u00E1, {{usuerLogged | uppercaseFirst}} </span>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <button mat-menu-item>\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n       \n        <span *ngFor=\"let item of menus\">\n          <!-- Handle branch node menu items -->\n          <span *ngIf=\"item.childs && item.childs.length > 0\">\n            <button mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n              <mat-icon>{{item.menuIcon}}</mat-icon>\n              <span>{{item.menuText | uppercaseFirst}}</span>\n            </button>\n            <pxt-app-menu-item #menu [items]=\"item.childs\"></pxt-app-menu-item>\n          </span>\n          <!-- Handle leaf node menu items -->\n          <span *ngIf=\"!item.childs || item.childs.length === 0\">\n            <button *ngIf=\"item.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"selectItemMenu(item)\">\n              <mat-icon>{{item.menuIcon}}</mat-icon>\n              <span>{{item.menuText | uppercaseFirst}}</span>\n            </button>\n            <button *ngIf=\"item.menuType=='group'\" mat-menu-item color=\"primary\" >\n                <mat-icon>{{item.menuIcon}}</mat-icon>\n                <span>{{item.menuText | uppercaseFirst}}</span>\n              </button>\n          </span>\n        </span>\n      \n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n\n</div>\n<div *ngIf=\"!shouldRun\">Please open on Stackblitz to see result</div>",
                        styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-container>.example-toolbar,.example-is-mobile .example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}"]
                    }] }
        ];
        /** @nocollapse */
        PxtAppComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef },
                { type: layout.MediaMatcher },
                { type: core.ComponentFactoryResolver },
                { type: undefined, decorators: [{ type: core.Inject, args: [PxtAppComponentService,] }] }
            ];
        };
        PxtAppComponent.propDecorators = {
            matMenu: [{ type: core.Input }],
            subContainer1: [{ type: core.ViewChild, args: ['menus', { read: core.ViewContainerRef },] }],
            contextMenuTrigger: [{ type: core.ViewChild, args: ['contextMenuTrigger', { read: material.MatMenuTrigger },] }],
            adHost: [{ type: core.ViewChild, args: [PxtContentBody,] }]
        };
        return PxtAppComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /***************************************************************************************************
     * APPLICATION IMPORTS
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MaterialAngularModule = (function () {
        function MaterialAngularModule() {
        }
        MaterialAngularModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            table.CdkTableModule,
                            tree.CdkTreeModule,
                            material.MatAutocompleteModule,
                            material.MatBadgeModule,
                            material.MatBottomSheetModule,
                            material.MatButtonModule,
                            material.MatButtonToggleModule,
                            material.MatCardModule,
                            material.MatCheckboxModule,
                            material.MatChipsModule,
                            material.MatStepperModule,
                            material.MatDatepickerModule,
                            material.MatDialogModule,
                            material.MatDividerModule,
                            material.MatExpansionModule,
                            material.MatGridListModule,
                            material.MatIconModule,
                            material.MatInputModule,
                            material.MatListModule,
                            material.MatMenuModule,
                            material.MatNativeDateModule,
                            material.MatPaginatorModule,
                            material.MatProgressBarModule,
                            material.MatProgressSpinnerModule,
                            material.MatRadioModule,
                            material.MatRippleModule,
                            material.MatSelectModule,
                            material.MatSidenavModule,
                            material.MatSliderModule,
                            material.MatSlideToggleModule,
                            material.MatSnackBarModule,
                            material.MatSortModule,
                            material.MatTableModule,
                            material.MatTabsModule,
                            material.MatToolbarModule,
                            material.MatTooltipModule,
                            material.MatTreeModule,
                            material.MatIconModule,
                            platformBrowser.BrowserModule,
                            animations.BrowserAnimationsModule,
                            common.CommonModule,
                            forms.FormsModule,
                            material.MatCardModule, material.MatIconModule, material.MatLineModule,
                            material.MatListModule, material.MatSortModule, material.MatTabsModule, material.MatTreeModule,
                            material.MatBadgeModule, material.MatChipsModule, material.MatInputModule, material.MatRadioModule,
                            material.MatTableModule, material.MatButtonModule, material.MatCommonModule, material.MatDialogModule,
                            material.MatOptionModule, material.MatRippleModule, material.MatSelectModule, material.MatSliderModule,
                            material.MatDividerModule, material.MatSidenavModule, material.MatStepperModule, material.MatToolbarModule,
                            material.MatToolbarModule, material.MatTooltipModule, material.MatCheckboxModule, material.MatGridListModule,
                            material.MatSnackBarModule, material.MatExpansionModule, material.MatFormFieldModule, material.MatPaginatorModule,
                            material.MatDatepickerModule, material.MatNativeDateModule, material.MatBottomSheetModule, material.MatProgressBarModule,
                            material.MatSlideToggleModule, material.MatAutocompleteModule, material.MatButtonToggleModule, material.MatPseudoCheckboxModule,
                            material.MatProgressSpinnerModule, platformBrowser.BrowserModule, common.CommonModule,
                            platformBrowser.BrowserModule,
                            animations.BrowserAnimationsModule,
                            forms.FormsModule,
                            material.MatNativeDateModule,
                            forms.ReactiveFormsModule,
                        ],
                        exports: [
                            table.CdkTableModule,
                            tree.CdkTreeModule,
                            material.MatAutocompleteModule,
                            material.MatBadgeModule,
                            material.MatBottomSheetModule,
                            material.MatButtonModule,
                            material.MatButtonToggleModule,
                            material.MatCardModule,
                            material.MatCheckboxModule,
                            material.MatChipsModule,
                            material.MatStepperModule,
                            material.MatDatepickerModule,
                            material.MatDialogModule,
                            material.MatDividerModule,
                            material.MatExpansionModule,
                            material.MatGridListModule,
                            material.MatIconModule,
                            material.MatInputModule,
                            material.MatListModule,
                            material.MatMenuModule,
                            material.MatNativeDateModule,
                            material.MatPaginatorModule,
                            material.MatProgressBarModule,
                            material.MatProgressSpinnerModule,
                            material.MatRadioModule,
                            material.MatRippleModule,
                            material.MatSelectModule,
                            material.MatSidenavModule,
                            material.MatSliderModule,
                            material.MatSlideToggleModule,
                            material.MatSnackBarModule,
                            material.MatSortModule,
                            material.MatTableModule,
                            material.MatTabsModule,
                            material.MatToolbarModule,
                            material.MatTooltipModule,
                            material.MatTreeModule,
                            material.MatIconModule,
                            platformBrowser.BrowserModule,
                            animations.BrowserAnimationsModule,
                            common.CommonModule,
                            forms.FormsModule,
                            material.MatMenuModule, material.MatCardModule, material.MatIconModule, material.MatLineModule,
                            material.MatListModule, material.MatSortModule, material.MatTabsModule, material.MatTreeModule,
                            material.MatBadgeModule, material.MatChipsModule, material.MatInputModule, material.MatRadioModule,
                            material.MatTableModule, material.MatButtonModule, material.MatCommonModule, material.MatDialogModule,
                            material.MatOptionModule, material.MatRippleModule, material.MatSelectModule, material.MatSliderModule,
                            material.MatDividerModule, material.MatSidenavModule, material.MatStepperModule, material.MatToolbarModule,
                            material.MatToolbarModule, material.MatTooltipModule, material.MatCheckboxModule, material.MatGridListModule,
                            material.MatSnackBarModule, material.MatExpansionModule, material.MatFormFieldModule, material.MatPaginatorModule,
                            material.MatDatepickerModule, material.MatNativeDateModule, material.MatBottomSheetModule, material.MatProgressBarModule,
                            material.MatSlideToggleModule, material.MatAutocompleteModule, material.MatButtonToggleModule, material.MatPseudoCheckboxModule,
                            material.MatProgressSpinnerModule, platformBrowser.BrowserModule, common.CommonModule,
                            material.MatNativeDateModule,
                            forms.ReactiveFormsModule
                        ]
                    },] }
        ];
        return MaterialAngularModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ConfigService = (function () {
        function ConfigService(injector) {
            this.injector = injector;
        }
        /**
         * @param {?} url
         * @return {?}
         */
        ConfigService.prototype.load = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                var _this = this;
                /** @type {?} */
                var injectHttp = this.injector.get(http.HttpClient);
                return new Promise(function (resolve) {
                    injectHttp.get(url).pipe(operators.map(function (res) { return res; })).subscribe(function (config) {
                        _this.config = config;
                        resolve();
                    });
                });
            };
        /**
         * @param {?} element
         * @param {?=} dataList
         * @return {?}
         */
        ConfigService.prototype.getConfiguration = /**
         * @param {?} element
         * @param {?=} dataList
         * @return {?}
         */
            function (element, dataList) {
                if (!dataList) {
                    /** @type {?} */
                    var urlWithElement = this.config[element];
                    return this.verifyUrl(urlWithElement);
                }
                else {
                    /** @type {?} */
                    var urlWithDataList = this.config[dataList][element];
                    return this.verifyUrl(urlWithDataList);
                }
            };
        /**
         * @param {?} typeModel
         * @return {?}
         */
        ConfigService.prototype.verifyUrl = /**
         * @param {?} typeModel
         * @return {?}
         */
            function (typeModel) {
                if (typeModel.includes('/', typeModel.length - 1)) {
                    /** @type {?} */
                    var typeRelease = typeModel;
                    return typeRelease;
                }
                else {
                    /** @type {?} */
                    var newType = typeModel + '/';
                    return newType;
                }
            };
        ConfigService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigService.ctorParameters = function () {
            return [
                { type: core.Injector }
            ];
        };
        return ConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HttpHelperService = (function () {
        function HttpHelperService(configService) {
            this.configService = configService;
        }
        /**
         * @return {?}
         */
        HttpHelperService.prototype.getApi = /**
         * @return {?}
         */
            function () {
                return this.configService.getConfiguration('API', 'PATH');
            };
        /**
         * @return {?}
         */
        HttpHelperService.prototype.getApiSgi = /**
         * @return {?}
         */
            function () {
                return this.configService.getConfiguration('API', 'SGI');
            };
        /**
         * @param {?} name
         * @param {?} url
         * @return {?}
         */
        HttpHelperService.prototype.getApiUrl = /**
         * @param {?} name
         * @param {?} url
         * @return {?}
         */
            function (name, url) {
                return this.configService.getConfiguration(url, name);
            };
        HttpHelperService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HttpHelperService.ctorParameters = function () {
            return [
                { type: ConfigService }
            ];
        };
        return HttpHelperService;
    }());

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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var environment = {
        production: true,
        envName: 'dev',
        version: '0.0.1',
        CONFIG_FILE: 'assets/config/env.json',
        esbApiPxt: "http://esbdsv.peixoto.com.br/sge/",
        system: {
            id: 108,
            prex: "PORCRP"
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var system = environment.system;
    var TokenService = (function () {
        function TokenService() {
        }
        /**
         * @return {?}
         */
        TokenService.prototype.getAccessToken = /**
         * @return {?}
         */
            function () {
                debugger;
                /** @type {?} */
                var token = localStorage.getItem('token');
                if (token != null) {
                    return token;
                }
            };
        /**
         * @param {?} res
         * @return {?}
         */
        TokenService.prototype.setTokenStorage = /**
         * @param {?} res
         * @return {?}
         */
            function (res) {
                localStorage.setItem('token', JSON.stringify(res));
            };
        /**
         * @return {?}
         */
        TokenService.prototype.removeTokenStorage = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var token = localStorage.getItem('token');
                /** @type {?} */
                var decoded = (jwt_decode(token));
                localStorage.removeItem(system.id + system.prex + decoded.sub);
            };
        /**
         * @return {?}
         */
        TokenService.prototype.deleteToken = /**
         * @return {?}
         */
            function () {
                this.removeTokenStorage();
            };
        /**
         * @return {?}
         */
        TokenService.prototype.tokenExists = /**
         * @return {?}
         */
            function () {
                return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== '';
            };
        TokenService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TokenService.ctorParameters = function () { return []; };
        return TokenService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtHttpService = (function (_super) {
        __extends(PxtHttpService, _super);
        function PxtHttpService(backend, options, injector, tokenService) {
            var _this = _super.call(this, backend, options) || this;
            _this.backend = backend;
            _this.injector = injector;
            _this.tokenService = tokenService;
            _this.isUnathourized = false;
            return _this;
        }
        /**
         *  Control Services
         */
        /**
         *  Control Services
         * @return {?}
         */
        PxtHttpService.prototype.getHeaders = /**
         *  Control Services
         * @return {?}
         */
            function () {
                /** @type {?} */
                var headers = new http$1.Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Cache-Control', 'no-store');
                headers.append('Pragma', 'no-cache');
                return headers;
            };
        /**
         * @param {?} observable
         * @param {?=} url
         * @return {?}
         */
        PxtHttpService.prototype.handleResponse = /**
         * @param {?} observable
         * @param {?=} url
         * @return {?}
         */
            function (observable, url) {
                var _this = this;
                /** @type {?} */
                var result = null;
                /** @type {?} */
                var orig = this.origRequest;
                result = observable.pipe(operators.catchError(function (error) {
                    return _this.onCatch(error);
                }), operators.map(function (res) {
                    return _this.onResult(res);
                }));
                return result;
            };
        /**
         * @param {?} res
         * @return {?}
         */
        PxtHttpService.prototype.onResult = /**
         * @param {?} res
         * @return {?}
         */
            function (res) {
                if (res.status == 201) {
                    return res._body;
                }
                else {
                    return res.json();
                }
            };
        /**
         * @param {?} api
         * @param {?=} loader
         * @return {?}
         */
        PxtHttpService.prototype.doGet = /**
         * @param {?} api
         * @param {?=} loader
         * @return {?}
         */
            function (api, loader) {
                /** @type {?} */
                var url = api;
                /** @type {?} */
                var requestOptions = new http$1.RequestOptions({ headers: this.getHeaders() });
                return this.handleResponse(_super.prototype.get.call(this, url, requestOptions));
            };
        /**
         * @param {?} endpoint
         * @param {?=} params
         * @return {?}
         */
        PxtHttpService.prototype.doPost = /**
         * @param {?} endpoint
         * @param {?=} params
         * @return {?}
         */
            function (endpoint, params) {
                /** @type {?} */
                var url = endpoint;
                /** @type {?} */
                var requestOptions = new http$1.RequestOptions({ headers: this.getHeaders() });
                return this.handleResponse(_super.prototype.post.call(this, url, params, requestOptions), url);
            };
        /**
         * @param {?} api
         * @param {?=} params
         * @return {?}
         */
        PxtHttpService.prototype.doPut = /**
         * @param {?} api
         * @param {?=} params
         * @return {?}
         */
            function (api, params) {
                /** @type {?} */
                var url = api;
                /** @type {?} */
                var requestOptions = new http$1.RequestOptions({ headers: this.getHeaders() });
                return this.handleResponse(_super.prototype.put.call(this, url, params, requestOptions), url);
            };
        /**
         * @param {?} api
         * @param {?=} params
         * @param {?=} loader
         * @return {?}
         */
        PxtHttpService.prototype.doPath = /**
         * @param {?} api
         * @param {?=} params
         * @param {?=} loader
         * @return {?}
         */
            function (api, params, loader) {
                /** @type {?} */
                var url = api;
                /** @type {?} */
                var requestOptions = new http$1.RequestOptions({ headers: this.getHeaders() });
                return this.handleResponse(_super.prototype.patch.call(this, url, params, requestOptions), url);
            };
        /**
         * @param {?} api
         * @param {?} params
         * @param {?=} loader
         * @return {?}
         */
        PxtHttpService.prototype.doDelete = /**
         * @param {?} api
         * @param {?} params
         * @param {?=} loader
         * @return {?}
         */
            function (api, params, loader) {
                /** @type {?} */
                var url = api;
                /** @type {?} */
                var urlParam = url + '/' + params;
                /** @type {?} */
                var requestOptions = new http$1.RequestOptions({ headers: this.getHeaders() });
                return this.handleResponse(_super.prototype.delete.call(this, urlParam, requestOptions), urlParam);
            };
        /**
         * @param {?} url
         * @param {?=} options
         * @return {?}
         */
        PxtHttpService.prototype.request = /**
         * @param {?} url
         * @param {?=} options
         * @return {?}
         */
            function (url, options) {
                options = this.requestArgs(options);
                if (typeof url === 'string') {
                    this.urlRequest = url;
                }
                else {
                    this.urlRequest = url.url;
                    this.origRequest = url;
                }
                if (this.urlRequest !== environment.CONFIG_FILE) {
                    /** @type {?} */
                    var token = this.tokenService.getAccessToken();
                    if (token != null) {
                        this.origRequest.headers.set('Authorization', 'Bearer '.concat(token));
                        options.headers.set('Authorization', 'Bearer '.concat(token));
                    }
                }
                url = this.origRequest;
                return _super.prototype.request.call(this, url, options);
            };
        /**
         * @param {?} options
         * @return {?}
         */
        PxtHttpService.prototype.requestArgs = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                if (options == null) {
                    options = new http$1.RequestOptions({ headers: this.getHeaders() });
                }
                return options;
            };
        /**
         * @param {?} error
         * @return {?}
         */
        PxtHttpService.prototype.onCatch = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                switch (error.status) {
                    case 401:
                        if (!this.isUnathourized) {
                            console.log(401);
                            //this.tokenService.removeTokenStorage();
                            //window.location.href = environment.esbApiPxt + "?erro=401";
                        }
                        this.isUnathourized = true;
                        break;
                    case 400:
                        console.log("error 400");
                        // this.tokenService.removeTokenStorage();
                        //window.location.href = environment.esbApiPxt + "?erro=400";
                        break;
                    case 404:
                        console.log("error 400");
                        //this.tokenService.removeTokenStorage();
                        //window.location.href = environment.esbApiPxt + "?erro=404";
                        break;
                    default:
                        console.log("error 400");
                        // window.location.href = environment.esbApiPxt + "?erro=0";
                        break;
                }
                return rxjs.Observable.throw(error);
            };
        PxtHttpService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PxtHttpService.ctorParameters = function () {
            return [
                { type: http$1.XHRBackend },
                { type: http$1.RequestOptions },
                { type: core.Injector },
                { type: TokenService }
            ];
        };
        return PxtHttpService;
    }(http$1.Http));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var RequestBaseService = (function () {
        function RequestBaseService(httpService, helper) {
            this.httpService = httpService;
            this.helper = helper;
            this.urlService = helper.getApi();
        }
        /**
         * @return {?}
         */
        RequestBaseService.prototype.load = /**
         * @return {?}
         */
            function () {
                return this.httpService.doGet(this.urlServiceAuto);
            };
        /**
         * @param {?=} model
         * @return {?}
         */
        RequestBaseService.prototype.save = /**
         * @param {?=} model
         * @return {?}
         */
            function (model) {
                return this.httpService.doPost(this.urlServiceAuto, model);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        RequestBaseService.prototype.delete = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return this.httpService.doDelete(this.urlServiceAuto, id);
            };
        /**
         * @param {?} path
         * @return {?}
         */
        RequestBaseService.prototype.doGet = /**
         * @param {?} path
         * @return {?}
         */
            function (path) {
                if (path.indexOf('http') > -1) {
                    return this.httpService.doGet(path);
                }
                else {
                    return this.httpService.doGet(this.urlService + path);
                }
            };
        /**
         * @param {?} path
         * @param {?=} model
         * @return {?}
         */
        RequestBaseService.prototype.doPost = /**
         * @param {?} path
         * @param {?=} model
         * @return {?}
         */
            function (path, model) {
                if (path.indexOf('http') > -1) {
                    return this.httpService.doPost(path, model);
                }
                else {
                    return this.httpService.doPost(this.urlService + path, model);
                }
            };
        /**
         * @param {?} path
         * @param {?=} model
         * @return {?}
         */
        RequestBaseService.prototype.doPut = /**
         * @param {?} path
         * @param {?=} model
         * @return {?}
         */
            function (path, model) {
                if (path.indexOf('http') > -1) {
                    return this.httpService.doPut(path, model);
                }
                else {
                    return this.httpService.doPut(this.urlService + path, model);
                }
            };
        /**
         * @param {?} path
         * @param {?} id
         * @return {?}
         */
        RequestBaseService.prototype.doDelete = /**
         * @param {?} path
         * @param {?} id
         * @return {?}
         */
            function (path, id) {
                if (path.indexOf('http') > -1) {
                    return this.httpService.doDelete(path, id);
                }
                else {
                    return this.httpService.doDelete(this.urlService + path, id);
                }
            };
        RequestBaseService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        RequestBaseService.ctorParameters = function () {
            return [
                { type: PxtHttpService },
                { type: HttpHelperService }
            ];
        };
        return RequestBaseService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var UpercaseFirst = (function (_super) {
        __extends(UpercaseFirst, _super);
        function UpercaseFirst() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} text
         * @param {?=} args
         * @return {?}
         */
        UpercaseFirst.prototype.transform = /**
         * @param {?} text
         * @param {?=} args
         * @return {?}
         */
            function (text, args) {
                /** @type {?} */
                var words = text.toLowerCase().split(" ");
                for (var a = 0; a < words.length; a++) {
                    if (words[a].length > 3) {
                        /** @type {?} */
                        var w = words[a];
                        words[a] = w[0].toUpperCase() + w.slice(1);
                    }
                }
                return words.join(" ");
            };
        UpercaseFirst.decorators = [
            { type: core.Pipe, args: [{
                        name: 'uppercaseFirst'
                    },] }
        ];
        return UpercaseFirst;
    }(common.UpperCasePipe));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Constants = (function () {
        function Constants() {
        }
        Constants.DATE_FMT = 'dd/MM/yyyy';
        Constants.DATE_TIME_FMT = Constants.DATE_FMT + " - hh:mm:ss a";
        return Constants;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DateFormatPipe = (function (_super) {
        __extends(DateFormatPipe, _super);
        function DateFormatPipe() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
        DateFormatPipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
            function (value, args) {
                return _super.prototype.transform.call(this, value, Constants.DATE_FMT);
            };
        DateFormatPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'dateFormat'
                    },] }
        ];
        return DateFormatPipe;
    }(common.DatePipe));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DateTimeFormatPipe = (function (_super) {
        __extends(DateTimeFormatPipe, _super);
        function DateTimeFormatPipe() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
        DateTimeFormatPipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
            function (value, args) {
                /** @type {?} */
                var datePipe = new common.DatePipe("en-US");
                return datePipe.transform(value, Constants.DATE_TIME_FMT);
            };
        DateTimeFormatPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'dateTimeFormat'
                    },] }
        ];
        return DateTimeFormatPipe;
    }(common.DatePipe));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PipeModule = (function () {
        function PipeModule() {
        }
        PipeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe],
                        exports: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe]
                    },] }
        ];
        return PipeModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtAppMenuItemComponent = (function () {
        function PxtAppMenuItemComponent(pxtAppComponentService) {
            this.pxtAppComponentService = pxtAppComponentService;
        }
        /**
         * @return {?}
         */
        PxtAppMenuItemComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @param {?} child
         * @return {?}
         */
        PxtAppMenuItemComponent.prototype.loadComponent = /**
         * @param {?} child
         * @return {?}
         */
            function (child) {
                this.pxtAppComponentService.loadComponent({ component: child.menuSource.component, data: "" });
            };
        PxtAppMenuItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-app-menu-item',
                        template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n  <span *ngFor=\"let child of items\">\n    <!-- Handle branch node menu items -->\n    <span *ngIf=\"child.childs && child.childs.length > 0\">\n      <a mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n      <pxt-app-menu-item #menu [items]=\"child.childs\"></pxt-app-menu-item>\n    </span>\n    <!-- Handle leaf node menu items -->\n    <span *ngIf=\"!child.childs || child.childs.length === 0\">\n      <a *ngIf=\"child.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"loadComponent(child)\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n\n      <a *ngIf=\"child.menuType=='group'\" mat-menu-item color=\"primary\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n    </span>\n  </span>\n</mat-menu>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtAppMenuItemComponent.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [PxtAppComponentService,] }] }
            ];
        };
        PxtAppMenuItemComponent.propDecorators = {
            items: [{ type: core.Input }],
            childMenu: [{ type: core.ViewChild, args: ['childMenu',] }]
        };
        return PxtAppMenuItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtAppMenuItemModule = (function () {
        function PxtAppMenuItemModule() {
        }
        PxtAppMenuItemModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PipeModule
                        ],
                        declarations: [PxtAppMenuItemComponent],
                        exports: [PxtAppMenuItemComponent],
                        entryComponents: [PxtAppMenuItemComponent]
                    },] }
        ];
        return PxtAppMenuItemModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HashDirective = (function () {
        function HashDirective(vcRef) {
            this.vcRef = vcRef;
        }
        HashDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[hash]',
                    },] }
        ];
        /** @nocollapse */
        HashDirective.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef }
            ];
        };
        HashDirective.propDecorators = {
            hash: [{ type: core.Input }]
        };
        return HashDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AuthorityService = (function () {
        function AuthorityService(_http, _httpHelper) {
            this._http = _http;
            this._httpHelper = _httpHelper;
        }
        /**
         * @param {?} codigoSistema
         * @return {?}
         */
        AuthorityService.prototype.buscarAuthorities = /**
         * @param {?} codigoSistema
         * @return {?}
         */
            function (codigoSistema) {
                /** @type {?} */
                var url = this._httpHelper.getApiSgi() + "permissoes/buscarPerfilSistema/?";
                /** @type {?} */
                var params = "codigoSistema=" + codigoSistema;
                return this._http.doGet(url + params);
            };
        AuthorityService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AuthorityService.ctorParameters = function () {
            return [
                { type: PxtHttpService },
                { type: HttpHelperService }
            ];
        };
        return AuthorityService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var pxtConfiguration = { systemId: 104, systemPrex: "SGE_NEW" };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisibleInRolesGuard = (function () {
        function VisibleInRolesGuard(router$$1, httpHelper, authorityService) {
            this.router = router$$1;
            this.httpHelper = httpHelper;
            this.authorityService = authorityService;
        }
        /**
         * @param {?} next
         * @param {?} state
         * @return {?}
         */
        VisibleInRolesGuard.prototype.canActivate = /**
         * @param {?} next
         * @param {?} state
         * @return {?}
         */
            function (next, state) {
                /** @type {?} */
                var token = localStorage.getItem('token');
                if (token !== 'undefined' && token !== '' && token !== null) {
                    try {
                        /** @type {?} */
                        var decoded_1 = (jwt_decode(token));
                        /** @type {?} */
                        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + decoded_1.sub);
                        if (tokenAuthorities === 'undefined' || tokenAuthorities === '' || tokenAuthorities === null) {
                            this.authorityService.buscarAuthorities(pxtConfiguration.systemId).subscribe(function (data) {
                                localStorage.setItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + decoded_1.sub, data.authority);
                            });
                        }
                    }
                    catch (err) {
                        //window.location.href = this.httpHelper.getUrlAutenticacao() + "?erro=401";
                        console.log(err);
                        return false;
                    }
                }
                else {
                    // window.location.href = this.httpHelper.getUrlAutenticacao() + "?erro=401";
                    console.log("Token Undefined");
                    return false;
                }
            };
        VisibleInRolesGuard.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        VisibleInRolesGuard.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: HttpHelperService },
                { type: AuthorityService }
            ];
        };
        return VisibleInRolesGuard;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtAppModule = (function () {
        function PxtAppModule() {
        }
        PxtAppModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PipeModule,
                            material.MatMenuModule,
                            PxtAppMenuItemModule,
                        ],
                        declarations: [PxtAppComponent, PxtContentBody, HashDirective],
                        exports: [PxtAppComponent],
                        providers: [PxtAppComponentService, PxtHttpService,
                            RequestBaseService, HttpHelperService, ConfigService,
                            VisibleInRolesGuard, TokenService, AuthorityService]
                    },] }
        ];
        return PxtAppModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtContentComponent = (function () {
        function PxtContentComponent() {
        }
        PxtContentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-content-body',
                        template: "\n<mat-card>\n    <ng-content></ng-content>\n</mat-card>",
                        styles: [".pxt-content-body{padding:10px}.pxt-content-body mat-card{margin:5px;border-top:4px solid;border-radius:4px;border-bottom:4px solid}"]
                    }] }
        ];
        /** @nocollapse */
        PxtContentComponent.ctorParameters = function () { return []; };
        PxtContentComponent.propDecorators = {
            data: [{ type: core.Input }]
        };
        return PxtContentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtContentModule = (function () {
        function PxtContentModule() {
        }
        PxtContentModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            http.HttpClientModule,
                            http$1.HttpModule
                        ],
                        declarations: [PxtContentComponent],
                        exports: [PxtContentComponent],
                        entryComponents: [PxtContentComponent]
                    },] }
        ];
        return PxtContentModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtButton = (function () {
        function PxtButton(icon, menu, enable, id) {
            this.icon = icon;
            this.menu = menu;
            this.enable = enable;
            this.enum = id;
        }
        return PxtButton;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var OptionsSubmenu = {
        SALVAR: 1,
        PESQUISAR: 2,
        LIMPAR: 3,
        NOVO: 4,
        VOLTAR: 5,
        EXCLUIR: 6,
    };
    OptionsSubmenu[OptionsSubmenu.SALVAR] = 'SALVAR';
    OptionsSubmenu[OptionsSubmenu.PESQUISAR] = 'PESQUISAR';
    OptionsSubmenu[OptionsSubmenu.LIMPAR] = 'LIMPAR';
    OptionsSubmenu[OptionsSubmenu.NOVO] = 'NOVO';
    OptionsSubmenu[OptionsSubmenu.VOLTAR] = 'VOLTAR';
    OptionsSubmenu[OptionsSubmenu.EXCLUIR] = 'EXCLUIR';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var PxtSubmenusComponent = (function () {
        function PxtSubmenusComponent(_pxtAppService, _serviceBase, helper) {
            var _this = this;
            this._pxtAppService = _pxtAppService;
            this._serviceBase = _serviceBase;
            this.helper = helper;
            this.model = /** @type {?} */ ({});
            this.urlService = "";
            this.listing = new core.EventEmitter();
            this.statusSave = new core.EventEmitter();
            this.statusDelete = new core.EventEmitter();
            this.buttons = [];
            this.enableSave = true;
            this.enableBack = true;
            this.enableClear = true;
            this.enableSearch = true;
            this.enableAdd = true;
            this.enableDelete = true;
            this.buttons.push(new PxtButton("keyboard_backspace", "VOLTAR", true, OptionsSubmenu.VOLTAR));
            this.buttons.push(new PxtButton("add", "SALVAR", true, OptionsSubmenu.SALVAR));
            this.buttons.push(new PxtButton("add", "NOVO", true, OptionsSubmenu.NOVO));
            this.buttons.push(new PxtButton("delete", "LIMPAR", true, OptionsSubmenu.LIMPAR));
            this.buttons.push(new PxtButton("search", "PESQUISAR", true, OptionsSubmenu.PESQUISAR));
            this.buttons.push(new PxtButton("delete", "EXCLUIR", true, OptionsSubmenu.EXCLUIR));
            setTimeout(function () {
                _this.urlService = helper.getApi() + _this.model.constructor.name;
                _this._serviceBase.urlServiceAuto = _this.urlService;
                console.log(_this.urlService);
            }, 100);
        }
        /**
         * @return {?}
         */
        PxtSubmenusComponent.prototype.save = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._serviceBase.save(this.model).subscribe(function (result) {
                    _this.statusSave.emit(result);
                });
            };
        /**
         * @return {?}
         */
        PxtSubmenusComponent.prototype.search = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._serviceBase.load().subscribe(function (result) {
                    _this.listing.emit(result);
                });
            };
        /**
         * @param {?} id
         * @return {?}
         */
        PxtSubmenusComponent.prototype.delete = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                var _this = this;
                this._serviceBase.delete(id).subscribe(function (result) {
                    _this.statusDelete.emit(result);
                });
            };
        /**
         * @return {?}
         */
        PxtSubmenusComponent.prototype.clear = /**
         * @return {?}
         */
            function () {
                this.model = /** @type {?} */ ({});
            };
        /**
         * @return {?}
         */
        PxtSubmenusComponent.prototype.add = /**
         * @return {?}
         */
            function () {
                throw new Error("Method 'add()' not implemented.");
            };
        /**
         * @return {?}
         */
        PxtSubmenusComponent.prototype.back = /**
         * @return {?}
         */
            function () {
                throw new Error("Method 'back()' not implemented.");
            };
        PxtSubmenusComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-submenus',
                        template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"delete(0)\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu | uppercaseFirst}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtSubmenusComponent.ctorParameters = function () {
            return [
                { type: PxtAppComponentService },
                { type: RequestBaseService },
                { type: HttpHelperService }
            ];
        };
        PxtSubmenusComponent.propDecorators = {
            model: [{ type: core.Input }],
            listing: [{ type: core.Output }],
            statusSave: [{ type: core.Output }],
            statusDelete: [{ type: core.Output }],
            controller: [{ type: core.Input }]
        };
        return PxtSubmenusComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtSubmenusModule = (function () {
        function PxtSubmenusModule() {
        }
        PxtSubmenusModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PipeModule
                        ],
                        declarations: [PxtSubmenusComponent],
                        exports: [PxtSubmenusComponent],
                        providers: [PxtHttpService, RequestBaseService, HttpHelperService, ConfigService]
                    },] }
        ];
        return PxtSubmenusModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = function () {
    };
    /** @type {?} */
    var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return PxtDatepickerComponent; }),
        multi: true
    };
    var PxtDatepickerComponent = (function () {
        function PxtDatepickerComponent() {
            this.placeholder = "Escolha uma data";
            this.inputDisabled = false;
            this.onChange = new core.EventEmitter();
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
        Object.defineProperty(PxtDatepickerComponent.prototype, "dataSelecionada", {
            get: /**
             * @return {?}
             */ function () {
                return this.dateModel;
            },
            set: /**
             * @param {?} d
             * @return {?}
             */ function (d) {
                if (d !== this.dateModel) {
                    this.dateModel = d;
                    this.onChangeCallback(d);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PxtDatepickerComponent.prototype.onBlur = /**
         * @return {?}
         */
            function () {
                this.onTouchedCallback();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        PxtDatepickerComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.dateModel = value;
                this.onChangeCallback(value);
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        PxtDatepickerComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        PxtDatepickerComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        /**
         * @return {?}
         */
        PxtDatepickerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @return {?}
         */
        PxtDatepickerComponent.prototype.onDateChange = /**
         * @return {?}
         */
            function () {
                this.onChange.emit(true);
            };
        /**
         * @return {?}
         */
        PxtDatepickerComponent.prototype.clear = /**
         * @return {?}
         */
            function () {
                this.writeValue(undefined);
                this.onDateChange();
            };
        PxtDatepickerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-datepicker',
                        template: "<mat-form-field (click)=\"inputDisabled ? picker.open() : undefined\">\r\n  <input matInput [matDatepicker]=\"picker\" [placeholder]=\"placeholder\" disabled=\"{{inputDisabled}}\" [min]=\"minDate\" [max]=\"maxDate\"\r\n    [(ngModel)]=\"dataSelecionada\" (dateChange)=\"onDateChange()\">\r\n  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n  <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\r\n  <button mat-icon-button class=\"btn-clear\" type=\"button\" (click)=\"clear()\">\r\n    <mat-icon>clear</mat-icon>\r\n  </button>\r\n</mat-form-field>",
                        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                        styles: ["mat-form-field{width:100%}.btn-clear{width:24px;height:24px;line-height:24px;right:0;top:0;position:absolute;margin-top:4px;opacity:.8}.btn-clear mat-icon{font-size:17px}"]
                    }] }
        ];
        /** @nocollapse */
        PxtDatepickerComponent.ctorParameters = function () { return []; };
        PxtDatepickerComponent.propDecorators = {
            placeholder: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            inputDisabled: [{ type: core.Input }],
            onChange: [{ type: core.Output }]
        };
        return PxtDatepickerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtDatePickerModule = (function () {
        function PxtDatePickerModule() {
        }
        PxtDatePickerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, MaterialAngularModule],
                        providers: [common.DatePipe],
                        declarations: [PxtDatepickerComponent],
                        exports: [PxtDatepickerComponent],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA, core.NO_ERRORS_SCHEMA]
                    },] }
        ];
        return PxtDatePickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtUploadFileComponent = (function () {
        function PxtUploadFileComponent() {
            this.fileSelected = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        PxtUploadFileComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @param {?} event
         * @return {?}
         */
        PxtUploadFileComponent.prototype.onChangeImagem = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event != undefined) {
                    /** @type {?} */
                    var imagem = event;
                    this.placeholder = imagem.name;
                    return this.fileSelected.next(imagem);
                }
            };
        PxtUploadFileComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-upload-file',
                        template: "<mat-form-field>\n  <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"imgFileInput.click()\">\n    <mat-icon>add</mat-icon>\n  </button>\n  <input hidden type=\"file\" accept=\"image/*\" #imgFileInput (change)=\"onChangeImagem($event.target.files[0])\" />\n  <div (click)=\"imgFileInput.click()\">\n    <input matInput type=\"text\" disabled [placeholder]=\"placeholder\">\n  </div>\n</mat-form-field>",
                        styles: ["mat-form-field{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}"]
                    }] }
        ];
        /** @nocollapse */
        PxtUploadFileComponent.ctorParameters = function () { return []; };
        PxtUploadFileComponent.propDecorators = {
            placeholder: [{ type: core.Input }],
            fileSelected: [{ type: core.Output }]
        };
        return PxtUploadFileComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtUploadFileModule = (function () {
        function PxtUploadFileModule() {
        }
        PxtUploadFileModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule
                        ],
                        declarations: [PxtUploadFileComponent],
                        exports: [PxtUploadFileComponent],
                        entryComponents: [PxtUploadFileComponent],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA, core.NO_ERRORS_SCHEMA]
                    },] }
        ];
        return PxtUploadFileModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtGalleryComponent = (function () {
        function PxtGalleryComponent() {
            this.width = "100%";
            this.height = '400px';
        }
        /**
         * @return {?}
         */
        PxtGalleryComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.galleryOptions = [
                    {
                        width: this.width,
                        height: this.height,
                        thumbnailsColumns: 4,
                        imageAnimation: ngxGallery.NgxGalleryAnimation.Slide
                    },
                    // max-width 800
                    {
                        breakpoint: 800,
                        width: this.width,
                        height: this.height,
                        imagePercent: 80,
                        thumbnailsPercent: 20,
                        thumbnailsMargin: 20,
                        thumbnailMargin: 20
                    },
                    {
                        breakpoint: 400,
                        preview: false
                    }
                ];
            };
        PxtGalleryComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-gallery',
                        template: "<ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n",
                        styles: [".custom-position{z-index:0!important}"]
                    }] }
        ];
        /** @nocollapse */
        PxtGalleryComponent.ctorParameters = function () { return []; };
        PxtGalleryComponent.propDecorators = {
            galleryImages: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }]
        };
        return PxtGalleryComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtGalleryModule = (function () {
        function PxtGalleryModule() {
        }
        PxtGalleryModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, MaterialAngularModule, ngxGallery.NgxGalleryModule],
                        declarations: [PxtGalleryComponent],
                        exports: [PxtGalleryComponent],
                        entryComponents: [PxtGalleryComponent]
                    },] }
        ];
        return PxtGalleryModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.PxtAppModule = PxtAppModule;
    exports.PxtAppComponent = PxtAppComponent;
    exports.PxtContentModule = PxtContentModule;
    exports.PxtContentComponent = PxtContentComponent;
    exports.MaterialAngularModule = MaterialAngularModule;
    exports.PxtSubmenusModule = PxtSubmenusModule;
    exports.PxtSubmenusComponent = PxtSubmenusComponent;
    exports.PipeModule = PipeModule;
    exports.PxtAppComponentService = PxtAppComponentService;
    exports.PxtHttpService = PxtHttpService;
    exports.ConfigService = ConfigService;
    exports.HttpHelperService = HttpHelperService;
    exports.RequestBaseService = RequestBaseService;
    exports.VisibleInRolesGuard = VisibleInRolesGuard;
    exports.AuthorityService = AuthorityService;
    exports.pxtConfiguration = pxtConfiguration;
    exports.PxtDatePickerModule = PxtDatePickerModule;
    exports.PxtUploadFileModule = PxtUploadFileModule;
    exports.PxtGalleryModule = PxtGalleryModule;
    exports.PxtGalleryComponent = PxtGalleryComponent;
    exports.ɵg = HashDirective;
    exports.ɵf = PxtContentBody;
    exports.ɵe = PxtAppMenuItemComponent;
    exports.ɵd = PxtAppMenuItemModule;
    exports.ɵi = CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR;
    exports.ɵj = PxtDatepickerComponent;
    exports.ɵk = PxtUploadFileComponent;
    exports.ɵb = DateFormatPipe;
    exports.ɵc = DateTimeFormatPipe;
    exports.ɵa = UpercaseFirst;
    exports.ɵh = TokenService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlLnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3Rva2VuLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy91cHBlcmNhc2UtZmlyc3QudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3V0aWwvY29uc3RhbnRzLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLWZvcm1hdC5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLXRpbWUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3BpcGVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9IYXNoRGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dENvbmZpZ3VyYXRpb24udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtY29udGVudC9weHQtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9tb2RlbC9weHQtc3VibWVudXMubW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL2VudW0vb3B0aW9uLXN1Ym1lbnUuZW51bS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGF0ZXBpY2tlci9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC11cGxvYWQtZmlsZS9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC11cGxvYWQtZmlsZS9weHQtdXBsb2FkLWZpbGUubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZ2FsbGVyeS9weHQtZ2FsbGVyeS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thZC1weHQtY29udGVudF0nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudEJvZHkge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50U2VydmljZSB7XHJcbiAgICBwcml2YXRlIHN1Ym1lbnVzSXRlbnM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBzdWJtZW51c0l0ZW5zT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5zdWJtZW51c0l0ZW5zLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRDb21wb25lbnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2FkQ29tcG9uZW50T2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fbG9hZENvbXBvbmVudC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRVc2VyTG9nZ2VkOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdXNlckxvZ2dlZE9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3NldFVzZXJMb2dnZWQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0SW5mb0luaXQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBpbmZvSW5pdGlhbDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0SW5mb0luaXQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgc2V0U3VibWVudXMocm91dGVzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnN1Ym1lbnVzSXRlbnMubmV4dChyb3V0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluaXRpYWxJbmZvKGluZm9Jbml0aWFsKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0SW5mb0luaXQubmV4dChpbmZvSW5pdGlhbClcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQ29tcG9uZW50KGNvbXBvbmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZENvbXBvbmVudC5uZXh0KGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VXNlcih1c2VyOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9zZXRVc2VyTG9nZ2VkLm5leHQodXNlcik7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IE1lZGlhTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBJbnB1dCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFB4dEFwcCB9IGZyb20gJy4vcHh0LWFwcCc7XG5pbXBvcnQgeyBQeHRBcHBNb2RlbCB9IGZyb20gJy4vbW9kZWwvcHh0LWFwcC5tb2RlbCc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRNZW51LCBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBTYWZlSHRtbCwgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1hcHAuY29tcG9uZW50LnNjc3MnXVxuXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcENvbXBvbmVudCB7XG5cbiAgLy9Qcm9wZXJ0aWVzXG4gIHJvdXRlczogYW55W10gPSBbXTtcbiAgZ3JvdXBzOiBhbnlbXSA9IFtdO1xuICBtZW51czogYW55W10gPSBbXTtcbiAgc3lzdGVtOiBTdHJpbmcgPSBcIlNZU1RFTSBOQU1FXCJcbiAgdXJsSW1nOiBzdHJpbmcgPSAnaHR0cDovL2ltYWdlbnNkc3YucGVpeG90by5jb20uYnIvYXV0aC9taW5pX2xvZ28ucG5nJztcbiAgbWVudVNlbGVjdGVkID0gXCJcIjtcbiAgdXN1ZXJMb2dnZWQgPSBcIkxvb2dnZWQgdXNlclwiO1xuICBtZW51c0h0bWw6IFNhZmVIdG1sO1xuICByZXN1bHQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIF9tb2JpbGVRdWVyeUxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBtb2JpbGVRdWVyeTogTWVkaWFRdWVyeUxpc3Q7XG4gIHNob3VsZFJ1biA9IHRydWU7XG4gIEBJbnB1dCgpIG1hdE1lbnU6IE1hdE1lbnU7XG4gIEBWaWV3Q2hpbGQoJ21lbnVzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIHN1YkNvbnRhaW5lcjE6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRleHRNZW51VHJpZ2dlcicsIHsgcmVhZDogTWF0TWVudVRyaWdnZXIgfSkgY29udGV4dE1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcjtcbiAgY3VycmVudEFkSW5kZXggPSAtMTtcbiAgQFZpZXdDaGlsZChQeHRDb250ZW50Qm9keSkgYWRIb3N0OiBQeHRDb250ZW50Qm9keTtcbiAgaW50ZXJ2YWw6IGFueTtcbiAgbWVudXNSZWNlaXZlZCA6IGFueVtdO1xuICBcbiAgLy9Db25zdHJ1Y3RvclxuICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgbWVkaWE6IE1lZGlhTWF0Y2hlcixcbiAgICBwdWJsaWMgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQEluamVjdChQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSBwdWJsaWMgcHh0QXBwQ29tcG9uZW50U2VydmljZVxuICApIHtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5ID0gbWVkaWEubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNjAwcHgpJyk7XG4gICAgdGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lciA9ICgpID0+IGNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5LmFkZExpc3RlbmVyKHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIpO1xuICAgIHRoaXMucmVzdWx0ID0gcHh0QXBwQ29tcG9uZW50U2VydmljZS5pbmZvSW5pdGlhbC5zdWJzY3JpYmUoaW5mb0luaXRpYWwgPT4ge1xuICAgICAgaWYgKGluZm9Jbml0aWFsICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnVzdWVyTG9nZ2VkID0gaW5mb0luaXRpYWwudXNlckxvZ2dlZDtcbiAgICAgICAgdGhpcy5zeXN0ZW0gPSBpbmZvSW5pdGlhbC5zeXN0ZW07XG4gICAgICAgIHRoaXMubWVudXNSZWNlaXZlZCA9IGluZm9Jbml0aWFsLnNpZGVCYXJNZW51cztcbiAgICAgICAgdGhpcy5tZW51cyA9IGluZm9Jbml0aWFsLnNpZGVCYXJNZW51cztcbiAgICAgICAgdGhpcy5wcmVwYXJlTWVudSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaWJlQ29tcG9uZW50KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICAvLyBJbmNsdWRlIG9mIGNvbXBvbmVudHMgaW4gdGhlIGFwcGxpY2F0aW9uIGJvZHlcbiAgbG9hZENvbXBvbmVudChyb3V0ZTogYW55LCBhZEhvc3QpIHtcbiAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IHJvdXRlLm1lbnVUZXh0O1xuICAgIGxldCBhZEl0ZW0gPSByb3V0ZS5tZW51U291cmNlO1xuICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoYWRJdGVtLmNvbXBvbmVudCk7XG4gICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSBhZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICB9XG5cbiAgLy8gU3Vic2NyaXB0aW9uIHRvIHRoZSBzZXJ2aWNlIHJlc3BvbnNpYmxlIGZvciBpbmNsdWRpbmcgY29tcG9uZW50cyBpbiB0aGUgYm9keSBvZiB0aGUgYXBwbGljYXRpb25cbiAgc3Vic2NyaWJlQ29tcG9uZW50KCkge1xuICAgIHRoaXMucHh0QXBwQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50T2JzZXJ2YWJsZS5zdWJzY3JpYmUoY29tcG9uZW50T2JqID0+IHtcbiAgICAgIHZhciBhcnJheUF1eCA9IHRoaXMubWVudXNSZWNlaXZlZC5maWx0ZXIoeD0+eC5tZW51U291cmNlICE9IHVuZGVmaW5lZCAmJiB4Lm1lbnVTb3VyY2UuY29tcG9uZW50ID09PSBjb21wb25lbnRPYmouY29tcG9uZW50KTtcbiAgICAgIGNvbnNvbGUubG9nKGFycmF5QXV4KTtcbiAgICAgIGlmKGFycmF5QXV4Lmxlbmd0aCA9PSAxKXtcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSBhcnJheUF1eFswXS5tZW51VGV4dDtcbiAgICAgIH1cbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50T2JqLmNvbXBvbmVudCk7XG4gICAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuYWRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICAoPEFkQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YSA9IGNvbXBvbmVudE9iai5kYXRhO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gUmVzcG9uc2libGUgZm9yIGNhbGwgbWV0aG9kIFwibG9hZGNvbXBvbmVudHMoKVwiIGluZm9ybWluZyBwYXJhbWV0ZXJzXG4gIHNlbGVjdEl0ZW1NZW51KG5hdikge1xuICAgIHRoaXMubG9hZENvbXBvbmVudChuYXYsIHRoaXMuYWRIb3N0KTtcbiAgfVxuXG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgcHJlcGFyaW5nIGFwcGxpY2F0aW9uIG1lbnVzO1xuICBwcmVwYXJlTWVudSgpIHtcbiAgICBsZXQgYXJyYXlBdXg6IGFueVtdO1xuICAgIGFycmF5QXV4ID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiZ3JvdXBcIiAmJiB4Lm1lbnVQYXJlbnQgPT0gXCJcIik7XG4gICAgdmFyIGFycmF5QXV4R3JvdXAgPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJncm91cFwiICYmIHgubWVudVBhcmVudCAhPT0gXCJcIik7XG4gICAgdmFyIGFycmF5QXV4SXRlbSA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcIml0ZW1cIiAmJiB4Lm1lbnVQYXJlbnQgIT09IFwiXCIpO1xuXG4gICAgLy9hZGQgaXRlbnMgaW4gZ3JvdXBzXG4gICAgYXJyYXlBdXhJdGVtLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eEdyb3VwLmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy9hZGQgZ3JvdXBzIGluIGdyb3Vwc1xuICAgIGFycmF5QXV4R3JvdXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4R3JvdXAuZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pXG4gICAgICB9O1xuICAgIH0pO1xuICAgIC8vYWRkIGdyb3VwcyBpbiBzdXBlci1ncm91cHNcbiAgICBhcnJheUF1eEdyb3VwLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvL2FkZCBpdGVucyBpbiBzdXBlci1ncm91cHNcbiAgICBhcnJheUF1eEl0ZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4LmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdGhpcy5tZW51cyA9IGFycmF5QXV4O1xuICB9XG59XG4iLCJpbXBvcnQgJy4vLi4vLi4vLi4vcG9seWZpbGxzJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge0Nka1RhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtDZGtUcmVlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgTWF0QmFkZ2VNb2R1bGUsXG4gIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICBNYXRCdXR0b25Nb2R1bGUsXG4gIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgTWF0Q2FyZE1vZHVsZSxcbiAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gIE1hdENoaXBzTW9kdWxlLFxuICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICBNYXREaWFsb2dNb2R1bGUsXG4gIE1hdERpdmlkZXJNb2R1bGUsXG4gIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgTWF0R3JpZExpc3RNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRMaXN0TW9kdWxlLFxuICBNYXRNZW51TW9kdWxlLFxuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gIE1hdFJhZGlvTW9kdWxlLFxuICBNYXRSaXBwbGVNb2R1bGUsXG4gIE1hdFNlbGVjdE1vZHVsZSxcbiAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgTWF0U2xpZGVyTW9kdWxlLFxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgTWF0U25hY2tCYXJNb2R1bGUsXG4gIE1hdFNvcnRNb2R1bGUsXG4gIE1hdFN0ZXBwZXJNb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRUYWJzTW9kdWxlLFxuICBNYXRUb29sYmFyTW9kdWxlLFxuICBNYXRUb29sdGlwTW9kdWxlLFxuICBNYXRUcmVlTW9kdWxlLFxuICBNYXRMaW5lTW9kdWxlLFxuICBNYXRDb21tb25Nb2R1bGUsXG4gIE1hdE9wdGlvbk1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge3BsYXRmb3JtQnJvd3NlckR5bmFtaWN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG5pbXBvcnQge0Jyb3dzZXJBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ2RrVHJlZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxNYXRJY29uTW9kdWxlLE1hdExpbmVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxNYXRTb3J0TW9kdWxlLE1hdFRhYnNNb2R1bGUsTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxNYXRDaGlwc01vZHVsZSxNYXRJbnB1dE1vZHVsZSxNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxNYXRCdXR0b25Nb2R1bGUsTWF0Q29tbW9uTW9kdWxlLE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsTWF0UmlwcGxlTW9kdWxlLE1hdFNlbGVjdE1vZHVsZSxNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxNYXRTaWRlbmF2TW9kdWxlLE1hdFN0ZXBwZXJNb2R1bGUsTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLE1hdFRvb2x0aXBNb2R1bGUsTWF0Q2hlY2tib3hNb2R1bGUsTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsTWF0RXhwYW5zaW9uTW9kdWxlLE1hdEZvcm1GaWVsZE1vZHVsZSxNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxNYXROYXRpdmVEYXRlTW9kdWxlLE1hdEJvdHRvbVNoZWV0TW9kdWxlLE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxNYXRCdXR0b25Ub2dnbGVNb2R1bGUsTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLE1hdENhcmRNb2R1bGUsTWF0SWNvbk1vZHVsZSxNYXRMaW5lTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsTWF0U29ydE1vZHVsZSxNYXRUYWJzTW9kdWxlLE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsTWF0Q2hpcHNNb2R1bGUsTWF0SW5wdXRNb2R1bGUsTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsTWF0QnV0dG9uTW9kdWxlLE1hdENvbW1vbk1vZHVsZSxNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLE1hdFJpcHBsZU1vZHVsZSxNYXRTZWxlY3RNb2R1bGUsTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsTWF0U2lkZW5hdk1vZHVsZSxNYXRTdGVwcGVyTW9kdWxlLE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxNYXRUb29sdGlwTW9kdWxlLE1hdENoZWNrYm94TW9kdWxlLE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLE1hdEV4cGFuc2lvbk1vZHVsZSxNYXRGb3JtRmllbGRNb2R1bGUsTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsTWF0TmF0aXZlRGF0ZU1vZHVsZSxNYXRCb3R0b21TaGVldE1vZHVsZSxNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxNYXRBdXRvY29tcGxldGVNb2R1bGUsTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQ29tbW9uTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsQW5ndWxhck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XHJcbiAgY29uZmlnOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkgeyB9XHJcblxyXG4gIGxvYWQodXJsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGluamVjdEh0dHAgPSB0aGlzLmluamVjdG9yLmdldChIdHRwQ2xpZW50KTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpbmplY3RIdHRwLmdldCh1cmwpLnBpcGUoXHJcbiAgICAgICAgbWFwKHJlcyA9PiByZXMpXHJcbiAgICAgICkuc3Vic2NyaWJlKGNvbmZpZyA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29uZmlndXJhdGlvbihlbGVtZW50OiBzdHJpbmcsIGRhdGFMaXN0Pzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIWRhdGFMaXN0KSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhFbGVtZW50ID0gdGhpcy5jb25maWdbZWxlbWVudF07XHJcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeVVybCh1cmxXaXRoRWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB1cmxXaXRoRGF0YUxpc3QgPSB0aGlzLmNvbmZpZ1tkYXRhTGlzdF1bZWxlbWVudF07XHJcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeVVybCh1cmxXaXRoRGF0YUxpc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmVyaWZ5VXJsKHR5cGVNb2RlbDogYW55KSB7XHJcbiAgICBpZiAodHlwZU1vZGVsLmluY2x1ZGVzKCcvJywgdHlwZU1vZGVsLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgIGNvbnN0IHR5cGVSZWxlYXNlID0gdHlwZU1vZGVsO1xyXG4gICAgICByZXR1cm4gdHlwZVJlbGVhc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBuZXdUeXBlID0gdHlwZU1vZGVsICsgJy8nO1xyXG4gICAgICByZXR1cm4gbmV3VHlwZTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwSGVscGVyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRBcGkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ0FQSScsICdQQVRIJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEFwaVNnaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1NHSScpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBnZXRBcGlVcmwgKG5hbWUsIHVybCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKHVybCwgbmFtZSk7XHJcbiAgfVxyXG59IiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJcbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudCA9IHtcbiAgcHJvZHVjdGlvbjogdHJ1ZSxcbiAgZW52TmFtZTogJ2RldicsXG4gIHZlcnNpb246ICcwLjAuMScsXG4gIENPTkZJR19GSUxFOiAnYXNzZXRzL2NvbmZpZy9lbnYuanNvbicsXG4gIGVzYkFwaVB4dCA6IFwiaHR0cDovL2VzYmRzdi5wZWl4b3RvLmNvbS5ici9zZ2UvXCIsXG4gIHN5c3RlbToge1xuICAgIGlkOiAxMDgsXG4gICAgcHJleDogXCJQT1JDUlBcIlxuICB9XG59O1xuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5cbnZhciBzeXN0ZW0gPSBlbnZpcm9ubWVudC5zeXN0ZW07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb2tlblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgIGRlYnVnZ2VyXG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfVxuICBzZXRUb2tlblN0b3JhZ2UocmVzOiBhbnkpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgfVxuICByZW1vdmVUb2tlblN0b3JhZ2UoKSB7XG4gICAgdmFyIHRva2VuID0gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXG4gICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+IGp3dF9kZWNvZGUodG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN5c3RlbS5pZCtzeXN0ZW0ucHJleCtkZWNvZGVkLnN1Yik7XG4gIH1cbiAgXG4gIGRlbGV0ZVRva2VuKCkge1xuICAgIHRoaXMucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gIH1cblxuICB0b2tlbkV4aXN0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IG51bGwgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IHVuZGVmaW5lZCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gJyc7XG4gIH1cbn1cbiIsImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdCwgZm9yd2FyZFJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNBcmdzLCBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiwgZmluYWxpemUsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi8uLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbi8vaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL0h0dHBIZWxwZXJTZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFB4dEh0dHBTZXJ2aWNlIGV4dGVuZHMgSHR0cCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kLFxuICAgIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIC8vcHJpdmF0ZSB1cmxIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoYmFja2VuZCwgb3B0aW9ucyk7XG4gIH1cblxuICB1cmxSZXF1ZXN0OiBhbnk7XG4gIG9yaWdSZXF1ZXN0OiBSZXF1ZXN0O1xuICBpc1VuYXRob3VyaXplZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiAgQ29udHJvbCBTZXJ2aWNlc1xuICAgKi9cbiAgZ2V0SGVhZGVycygpIHtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQ2FjaGUtQ29udHJvbCcsICduby1zdG9yZScpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdQcmFnbWEnLCAnbm8tY2FjaGUnKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIGhhbmRsZVJlc3BvbnNlKG9ic2VydmFibGU6IE9ic2VydmFibGU8UmVzcG9uc2U+LCB1cmw/OiBzdHJpbmcpIHtcblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGNvbnN0IG9yaWcgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJlc3VsdCA9IG9ic2VydmFibGUucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uQ2F0Y2goZXJyb3IpO1xuICAgICAgfSksXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25SZXN1bHQocmVzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIG9uUmVzdWx0KHJlcykge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDIwMSkge1xuICAgICAgcmV0dXJuIHJlcy5fYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICB9XG5cbiAgZG9HZXQoYXBpOiBzdHJpbmcsIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICAvLyB0aGlzLnByZUxvYWRlclNlcnZpY2UudXBkYXRlKHRydWUpO1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKSk7XG4gIH1cblxuICBkb1Bvc3QoZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gZW5kcG9pbnQ7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wb3N0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1B1dChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucHV0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1BhdGgoYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBhdGNoKHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb0RlbGV0ZShhcGk6IHN0cmluZywgcGFyYW1zOiBhbnksIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgdXJsUGFyYW0gPSB1cmwgKyAnLycgKyBwYXJhbXM7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmRlbGV0ZSh1cmxQYXJhbSwgcmVxdWVzdE9wdGlvbnMpLCB1cmxQYXJhbSk7XG4gIH1cblxuXG4gIHJlcXVlc3QodXJsOiBzdHJpbmcgfCBSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIG9wdGlvbnMgPSB0aGlzLnJlcXVlc3RBcmdzKG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy51cmxSZXF1ZXN0ID0gdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmwudXJsO1xuICAgICAgdGhpcy5vcmlnUmVxdWVzdCA9IHVybDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy51cmxSZXF1ZXN0ICE9PSBlbnZpcm9ubWVudC5DT05GSUdfRklMRSkge1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpO1xuICAgICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5vcmlnUmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cmwgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJldHVybiBzdXBlci5yZXF1ZXN0KHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RBcmdzKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zQXJncyk6IFJlcXVlc3RPcHRpb25zQXJncyB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuICBwdWJsaWMgb25DYXRjaChlcnJvcjogYW55KSB7XG4gICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgIGNhc2UgNDAxOlxuICAgICAgICBpZiAoIXRoaXMuaXNVbmF0aG91cml6ZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyg0MDEpO1xuICAgICAgICAgIC8vdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDAxXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1VuYXRob3VyaXplZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDA6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgNDAwXCIpO1xuICAgICAgICAvLyB0aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDAwXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgNDAwXCIpO1xuICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlPFQ+IHtcblxuICBwdWJsaWMgbW9kZWw6IFQ7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0bzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCk7XG4gIH1cbiAgbG9hZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMudXJsU2VydmljZUF1dG8pO1xuICB9O1xuICBzYXZlKG1vZGVsPzogVCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZUF1dG8sIG1vZGVsKTtcbiAgfTtcbiAgZGVsZXRlKGlkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh0aGlzLnVybFNlcnZpY2VBdXRvLCBpZCk7XG4gIH07XG5cbiAgZG9HZXQocGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyBwYXRoKTtcbiAgICB9XG4gIH07XG5cbiAgZG9Qb3N0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdChwYXRoICwgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH07XG4gIH07XG5cbiAgZG9QdXQocGF0aDogc3RyaW5nLCBtb2RlbD86IFQpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQocGF0aCAsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH1cbiAgfTtcblxuICBkb0RlbGV0ZShwYXRoOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUocGF0aCAsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgaWQpO1xuICAgIH07XG4gIH07XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndXBwZXJjYXNlRmlyc3QnXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgVXBlcmNhc2VGaXJzdCBleHRlbmRzIFVwcGVyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHZhciB3b3JkcyA9IHRleHQudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB3b3Jkcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICBpZiAod29yZHNbYV0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICAgIHZhciB3ID0gd29yZHNbYV07XHJcbiAgICAgICAgICAgICAgd29yZHNbYV0gPSB3WzBdLnRvVXBwZXJDYXNlKCkgKyB3LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcclxuICAgIH1cclxuICB9IiwiZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9GTVQgPSAnZGQvTU0veXl5eSc7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9USU1FX0ZNVCA9IGAke0NvbnN0YW50cy5EQVRFX0ZNVH0gLSBoaDptbTpzcyBhYDtcclxuICB9IiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdkYXRlRm9ybWF0J1xyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfRk1UKTtcclxuICAgIH1cclxuICB9IiwiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2RhdGVUaW1lRm9ybWF0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICB2YXIgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoXCJlbi1VU1wiKTtcclxuICAgIHJldHVybiAgZGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9USU1FX0ZNVCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4vdXBwZXJjYXNlLWZpcnN0JztcclxuaW1wb3J0IHsgRGF0ZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtZm9ybWF0LnBpcGUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtdGltZS1mb3JtYXQucGlwZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlIF0sXHJcbiAgICBleHBvcnRzOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBpcGVNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGl0ZW1zOiBhbnlbXTtcbiAgQFZpZXdDaGlsZCgnY2hpbGRNZW51JykgcHVibGljIGNoaWxkTWVudTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkQ29tcG9uZW50KGNoaWxkKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnQoe2NvbXBvbmVudDogY2hpbGQubWVudVNvdXJjZS5jb21wb25lbnQsIGRhdGE6XCJcIn0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRBcHBNZW51SXRlbUNvbXBvbmVudF0sXG4gICBleHBvcnRzOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgXVxuICBcbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaGFzaF0nLFxyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIEhhc2hEaXJlY3RpdmUgIHtcclxuICAgIEBJbnB1dCgpIGhhc2g6IHN0cmluZztcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2Y1JlZjogVmlld0NvbnRhaW5lclJlZikge31cclxuICB9IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlzaWJsZUluUm9sZXNHdWFyZCB9IGZyb20gJy4uL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aG9yaXR5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIF9odHRwSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSkgeyB9XG5cbiAgYnVzY2FyQXV0aG9yaXRpZXMgKGNvZGlnb1Npc3RlbWEpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9odHRwSGVscGVyLmdldEFwaVNnaSgpICsgXCJwZXJtaXNzb2VzL2J1c2NhclBlcmZpbFNpc3RlbWEvP1wiO1xuICAgIGNvbnN0IHBhcmFtcyA9IFwiY29kaWdvU2lzdGVtYT1cIiArIGNvZGlnb1Npc3RlbWE7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZG9HZXQodXJsICsgcGFyYW1zKTtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBweHRDb25maWd1cmF0aW9uID0ge3N5c3RlbUlkOiAxMDQgLHN5c3RlbVByZXg6IFwiU0dFX05FV1wifVxyXG4gICIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aG9yaXR5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIlxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzaWJsZUluUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGh0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLCBwcml2YXRlIGF1dGhvcml0eVNlcnZpY2U6IEF1dGhvcml0eVNlcnZpY2UpIHsgfVxyXG4gIGNhbkFjdGl2YXRlKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgaWYgKHRva2VuICE9PSAndW5kZWZpbmVkJyAmJiB0b2tlbiAhPT0gJycgJiYgdG9rZW4gIT09IG51bGwpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKHRva2VuKTtcclxuICAgICAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1Yik7XHJcbiAgICAgICAgaWYgKHRva2VuQXV0aG9yaXRpZXMgPT09ICd1bmRlZmluZWQnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09ICcnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXV0aG9yaXR5U2VydmljZS5idXNjYXJBdXRob3JpdGllcyhweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1YiwgZGF0YS5hdXRob3JpdHkpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmh0dHBIZWxwZXIuZ2V0VXJsQXV0ZW50aWNhY2FvKCkgKyBcIj9lcnJvPTQwMVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gVW5kZWZpbmVkXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSwgICAgXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcENvbXBvbmVudCwgUHh0Q29udGVudEJvZHksIEhhc2hEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbUHh0QXBwQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbUHh0QXBwQ29tcG9uZW50U2VydmljZSwgUHh0SHR0cFNlcnZpY2UsIFxuICAgIFJlcXVlc3RCYXNlU2VydmljZSwgSHR0cEhlbHBlclNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsICAgICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFRva2VuU2VydmljZSxBdXRob3JpdHlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2FkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jb250ZW50LWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY29udGVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzICBBZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRhdGE6IGFueTtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgdGVtcGxhdGVKaXRVcmwgfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0Q29udGVudENvbXBvbmVudF0sXG4gICBleHBvcnRzOiBbUHh0Q29udGVudENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRDb250ZW50Q29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudE1vZHVsZSB7IH1cbiIsIlxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQeHRCdXR0b24ge1xyXG4gICAgaWNvbjogU3RyaW5nO1xyXG4gICAgbWVudTogU3RyaW5nO1xyXG4gICAgZW5hYmxlOiBCb29sZWFuO1xyXG4gICAgZW51bSA6IE51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGljb246IFN0cmluZywgbWVudTogU3RyaW5nLCBlbmFibGU6IEJvb2xlYW4sIGlkIDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcclxuICAgICAgICB0aGlzLm1lbnUgPSBtZW51O1xyXG4gICAgICAgIHRoaXMuZW5hYmxlID0gZW5hYmxlO1xyXG4gICAgICAgIHRoaXMuZW51bSA9IGlkO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgZW51bSBPcHRpb25zU3VibWVudSB7XHJcbiAgICBTQUxWQVIgPSAxLFxyXG4gICAgUEVTUVVJU0FSID0gMixcclxuICAgIExJTVBBUiA9IDMsXHJcbiAgICBOT1ZPID0gNCxcclxuICAgIFZPTFRBUj0gNSxcclxuICAgIEVYQ0xVSVI9IDZcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0QnV0dG9uIH0gZnJvbSAnLi9tb2RlbC9weHQtc3VibWVudXMubW9kZWwnO1xuaW1wb3J0IHsgT3B0aW9uc1N1Ym1lbnUgfSBmcm9tICcuL2VudW0vb3B0aW9uLXN1Ym1lbnUuZW51bSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1zdWJtZW51cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc3VibWVudXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtc3VibWVudXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFN1Ym1lbnVzQ29tcG9uZW50PFQ+IHtcblxuICBASW5wdXQoKSBtb2RlbD86IFQgPSB7fSBhcyBUO1xuICBwcml2YXRlIHVybFNlcnZpY2UgPSBcIlwiO1xuXG4gIEBPdXRwdXQoKSBsaXN0aW5nOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHN0YXR1c1NhdmU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzRGVsZXRlOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgY29udHJvbGxlcj86IFN0cmluZztcblxuICBzYXZlKCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLnNhdmUodGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLnN0YXR1c1NhdmUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBzZWFyY2goKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2UubG9hZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5saXN0aW5nLmVtaXQocmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcbiAgZGVsZXRlKGlkKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2UuZGVsZXRlKGlkKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMuc3RhdHVzRGVsZXRlLmVtaXQocmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcbiAgY2xlYXIoKSB7XG4gICB0aGlzLm1vZGVsID0ge30gYXMgVDtcbiAgfTtcbiAgYWRkKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYWRkKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG5cbiAgYnV0dG9uczogUHh0QnV0dG9uW10gPSBbXTtcbiAgZW5hYmxlU2F2ZSA9IHRydWU7XG4gIGVuYWJsZUJhY2sgPSB0cnVlO1xuICBlbmFibGVDbGVhciA9IHRydWU7XG4gIGVuYWJsZVNlYXJjaCA9IHRydWU7XG4gIGVuYWJsZUFkZCA9IHRydWU7XG4gIGVuYWJsZURlbGV0ZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9weHRBcHBTZXJ2aWNlOiBQeHRBcHBDb21wb25lbnRTZXJ2aWNlLCBwdWJsaWMgX3NlcnZpY2VCYXNlOiBSZXF1ZXN0QmFzZVNlcnZpY2U8VD4scHVibGljIGhlbHBlcjogIEh0dHBIZWxwZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImtleWJvYXJkX2JhY2tzcGFjZVwiLCBcIlZPTFRBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5WT0xUQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiU0FMVkFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlNBTFZBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJOT1ZPXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51Lk5PVk8pKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiTElNUEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkxJTVBBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJzZWFyY2hcIiwgXCJQRVNRVUlTQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuUEVTUVVJU0FSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkVYQ0xVSVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuRVhDTFVJUikpO1xuXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKSArIHRoaXMubW9kZWwuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnVybFNlcnZpY2VBdXRvID0gdGhpcy51cmxTZXJ2aWNlIDtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsU2VydmljZSk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0U3VibWVudXNDb21wb25lbnQgfSBmcm9tICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOltQeHRIdHRwU2VydmljZSwgUmVxdWVzdEJhc2VTZXJ2aWNlLCBIdHRwSGVscGVyU2VydmljZSwgQ29uZmlnU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNNb2R1bGUgeyB9XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHREYXRlcGlja2VyQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3B4dC1kYXRlcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBTdHJpbmcgPSBcIkVzY29saGEgdW1hIGRhdGFcIjtcclxuICBASW5wdXQoKSBtaW5EYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgaW5wdXREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBkYXRlTW9kZWw6IERhdGU7XHJcblxyXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xyXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcblxyXG4gIGdldCBkYXRhU2VsZWNpb25hZGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlTW9kZWw7XHJcbiAgfVxyXG5cclxuICBzZXQgZGF0YVNlbGVjaW9uYWRhKGQ6IERhdGUpIHtcclxuICAgIGlmIChkICE9PSB0aGlzLmRhdGVNb2RlbCkge1xyXG4gICAgICB0aGlzLmRhdGVNb2RlbCA9IGQ7XHJcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlTW9kZWwgPSB2YWx1ZTtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgb25EYXRlQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUodW5kZWZpbmVkKTtcclxuICAgIHRoaXMub25EYXRlQ2hhbmdlKCk7XHJcbiAgfVxyXG4gIFxyXG59IiwiXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQeHREYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW0RhdGVQaXBlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUHh0RGF0ZXBpY2tlckNvbXBvbmVudF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlUGlja2VyTW9kdWxlIHtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC11cGxvYWQtZmlsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBmaWxlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGFycmF5SW1hZ2VzOiBGaWxlUmVhZGVyO1xuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIG9uQ2hhbmdlSW1hZ2VtKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGltYWdlbTogRmlsZSA9IGV2ZW50O1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGltYWdlbS5uYW1lO1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlbGVjdGVkLm5leHQoaW1hZ2VtKTtcbiAgICB9XG5cbiAgfTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6W1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHMgOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRVcGxvYWRGaWxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hHYWxsZXJ5T3B0aW9ucywgTmd4R2FsbGVyeUltYWdlLCBOZ3hHYWxsZXJ5QW5pbWF0aW9uIH0gZnJvbSAnbmd4LWdhbGxlcnknO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZ2FsbGVyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBnYWxsZXJ5T3B0aW9uczogTmd4R2FsbGVyeU9wdGlvbnNbXTtcbiAgQElucHV0KCkgZ2FsbGVyeUltYWdlczogTmd4R2FsbGVyeUltYWdlW107XG4gIEBJbnB1dCgpIHdpZHRoOiBhbnkgPSBcIjEwMCVcIjtcbiAgQElucHV0KCkgaGVpZ2h0OiBhbnkgPSAnNDAwcHgnO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZ2FsbGVyeU9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICB0aHVtYm5haWxzQ29sdW1uczogNCxcbiAgICAgICAgaW1hZ2VBbmltYXRpb246IE5neEdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgIH0sXG4gICAgICAvLyBtYXgtd2lkdGggODAwXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIGltYWdlUGVyY2VudDogODAsXG4gICAgICAgIHRodW1ibmFpbHNQZXJjZW50OiAyMCxcbiAgICAgICAgdGh1bWJuYWlsc01hcmdpbjogMjAsXG4gICAgICAgIHRodW1ibmFpbE1hcmdpbjogMjBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDQwMCxcbiAgICAgICAgcHJldmlldzogZmFsc2VcbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE5neEdhbGxlcnlNb2R1bGUgfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5pbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsIE5neEdhbGxlcnlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkRpcmVjdGl2ZSIsIlZpZXdDb250YWluZXJSZWYiLCJTdWJqZWN0IiwiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdG9yUmVmIiwiTWVkaWFNYXRjaGVyIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiSW5qZWN0IiwiSW5wdXQiLCJWaWV3Q2hpbGQiLCJNYXRNZW51VHJpZ2dlciIsIk5nTW9kdWxlIiwiQ2RrVGFibGVNb2R1bGUiLCJDZGtUcmVlTW9kdWxlIiwiTWF0QXV0b2NvbXBsZXRlTW9kdWxlIiwiTWF0QmFkZ2VNb2R1bGUiLCJNYXRCb3R0b21TaGVldE1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEJ1dHRvblRvZ2dsZU1vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJNYXRDaGVja2JveE1vZHVsZSIsIk1hdENoaXBzTW9kdWxlIiwiTWF0U3RlcHBlck1vZHVsZSIsIk1hdERhdGVwaWNrZXJNb2R1bGUiLCJNYXREaWFsb2dNb2R1bGUiLCJNYXREaXZpZGVyTW9kdWxlIiwiTWF0RXhwYW5zaW9uTW9kdWxlIiwiTWF0R3JpZExpc3RNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRMaXN0TW9kdWxlIiwiTWF0TWVudU1vZHVsZSIsIk1hdE5hdGl2ZURhdGVNb2R1bGUiLCJNYXRQYWdpbmF0b3JNb2R1bGUiLCJNYXRQcm9ncmVzc0Jhck1vZHVsZSIsIk1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSIsIk1hdFJhZGlvTW9kdWxlIiwiTWF0UmlwcGxlTW9kdWxlIiwiTWF0U2VsZWN0TW9kdWxlIiwiTWF0U2lkZW5hdk1vZHVsZSIsIk1hdFNsaWRlck1vZHVsZSIsIk1hdFNsaWRlVG9nZ2xlTW9kdWxlIiwiTWF0U25hY2tCYXJNb2R1bGUiLCJNYXRTb3J0TW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRUYWJzTW9kdWxlIiwiTWF0VG9vbGJhck1vZHVsZSIsIk1hdFRvb2x0aXBNb2R1bGUiLCJNYXRUcmVlTW9kdWxlIiwiQnJvd3Nlck1vZHVsZSIsIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJNYXRMaW5lTW9kdWxlIiwiTWF0Q29tbW9uTW9kdWxlIiwiTWF0T3B0aW9uTW9kdWxlIiwiTWF0Rm9ybUZpZWxkTW9kdWxlIiwiTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiSHR0cENsaWVudCIsIm1hcCIsIkluamVjdG9yIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJIZWFkZXJzIiwiY2F0Y2hFcnJvciIsIlJlcXVlc3RPcHRpb25zIiwiT2JzZXJ2YWJsZSIsIlhIUkJhY2tlbmQiLCJIdHRwIiwiUGlwZSIsIlVwcGVyQ2FzZVBpcGUiLCJEYXRlUGlwZSIsInJvdXRlciIsIlJvdXRlciIsIkh0dHBDbGllbnRNb2R1bGUiLCJIdHRwTW9kdWxlIiwiRXZlbnRFbWl0dGVyIiwiT3V0cHV0IiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSIsIk5PX0VSUk9SU19TQ0hFTUEiLCJOZ3hHYWxsZXJ5QW5pbWF0aW9uIiwiTmd4R2FsbGVyeU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7UUFNRSx3QkFBbUIsZ0JBQWtDO1lBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7U0FBSzs7b0JBSjNEQSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtxQkFDN0I7Ozs7O3dCQUptQkMscUJBQWdCOzs7NkJBQXBDOzs7Ozs7O0FDQUE7O2lDQUswQyxJQUFJQyxZQUFPLEVBQU87MkNBQ0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7a0NBRXJELElBQUlBLFlBQU8sRUFBTzsyQ0FDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtrQ0FFdEQsSUFBSUEsWUFBTyxFQUFPO3dDQUNELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFO2dDQUVyRCxJQUFJQSxZQUFPLEVBQU87K0JBQ1IsSUFB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