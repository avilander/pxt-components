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
                        template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button style=\"z-index: 1;\" (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <img [src]=\"urlImg\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{system | uppercaseFirst}}</h1>\n    <h1 class=\"system\" *ngIf=\"!mobileQuery.matches\">{{menuSelected | uppercaseFirst}}</h1>\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button [matMenuTriggerFor]=\"notification\"><mat-icon>notifications</mat-icon> </button>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    <mat-menu #notification=\"matMenu\" [overlapTrigger]=\"false\">\n        <span disabled mat-menu-item><small>Sem novas notifica\u00E7\u00F5es</small></span>\n      </mat-menu>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <span disabled mat-menu-item *ngIf=\"usuerLogged\" ><small>Ol\u00E1, {{usuerLogged | uppercaseFirst}}</small></span>\n      <button mat-menu-item>\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [mode]=\"'over'\" [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n      <span *ngFor=\"let item of menus\">\n        <!-- Handle branch node menu items -->\n        <span *ngIf=\"item.childs && item.childs.length > 0\">\n          <button mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <pxt-app-menu-item #menu [items]=\"item.childs\"></pxt-app-menu-item>\n        </span>\n        <!-- Handle leaf node menu items -->\n        <span *ngIf=\"!item.childs || item.childs.length === 0\">\n          <button *ngIf=\"item.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"selectItemMenu(item)\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <button *ngIf=\"item.menuType=='group'\" mat-menu-item color=\"primary\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n        </span>\n      </span>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n\n</div>",
                        styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}"]
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
        function RequestBaseService(httpService, helper, tokenService, _httpClient) {
            this.httpService = httpService;
            this.helper = helper;
            this.tokenService = tokenService;
            this._httpClient = _httpClient;
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
         * @param {?=} params
         * @return {?}
         */
        RequestBaseService.prototype.doGet = /**
         * @param {?} path
         * @param {?=} params
         * @return {?}
         */
            function (path, params) {
                debugger;
                /** @type {?} */
                var url;
                if (params !== undefined && params.size > 0) {
                    url = path + this.buildRequestParams(params);
                }
                else {
                    url = path;
                }
                if (path.indexOf('http') > -1) {
                    return this.httpService.doGet(path);
                }
                else {
                    return this.httpService.doGet(this.urlService + url);
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
        /**
         * @param {?} path
         * @param {?=} params
         * @return {?}
         */
        RequestBaseService.prototype.uploadImage = /**
         * @param {?} path
         * @param {?=} params
         * @return {?}
         */
            function (path, params) {
                if (path.indexOf('http') <= -1) {
                    path = this.urlService + path;
                }
                /** @type {?} */
                var header = {
                    'Authorization': 'Bearer '.concat(this.tokenService.getAccessToken())
                };
                /** @type {?} */
                var httpOptions = new http.HttpHeaders(header);
                /** @type {?} */
                var token = this.tokenService.getAccessToken();
                /** @type {?} */
                var formdata = this.setParamsFormdata(params);
                /** @type {?} */
                var req = new http.HttpRequest('POST', path, formdata, {
                    headers: httpOptions,
                    reportProgress: true,
                    responseType: 'text'
                });
                return this._httpClient.request(req);
            };
        /**
         * @param {?} params
         * @return {?}
         */
        RequestBaseService.prototype.setParamsFormdata = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                /** @type {?} */
                var formdata = new FormData();
                params.forEach(function (value, key) {
                    formdata.append(key, value);
                });
                return formdata;
            };
        /**
         * @param {?} params
         * @return {?}
         */
        RequestBaseService.prototype.buildRequestParams = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                /** @type {?} */
                var final = '';
                /** @type {?} */
                var primeiraIteracao = true;
                params.forEach(function (value, key) {
                    if (primeiraIteracao) {
                        final += '?' + key + '=' + value;
                        primeiraIteracao = false;
                    }
                    else {
                        final += '&' + key + '=' + value;
                    }
                });
                return final;
            };
        RequestBaseService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        RequestBaseService.ctorParameters = function () {
            return [
                { type: PxtHttpService },
                { type: HttpHelperService },
                { type: TokenService },
                { type: http.HttpClient }
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
                if (text != undefined) {
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
                }
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
    var pxtfilterCustomField = (function () {
        function pxtfilterCustomField() {
        }
        return pxtfilterCustomField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var pxtInputField = (function () {
        function pxtInputField() {
        }
        return pxtInputField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var pxtCheckboxField = (function () {
        function pxtCheckboxField() {
        }
        return pxtCheckboxField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var pxtDateField = (function () {
        function pxtDateField() {
        }
        return pxtDateField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var pxtFilterField = (function () {
        function pxtFilterField() {
        }
        return pxtFilterField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var pxtRadioButtonField = (function () {
        function pxtRadioButtonField() {
        }
        return pxtRadioButtonField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var pxtSelectField = (function () {
        function pxtSelectField() {
        }
        return pxtSelectField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtContentComponent = (function () {
        //Constructor
        function PxtContentComponent(fb) {
            this.fb = fb;
            this.fields = [];
            this.cols = 5;
            this.colsInitial = 5;
            this.submit = new core.EventEmitter();
        }
        Object.defineProperty(PxtContentComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this.form.value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PxtContentComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                Object.keys(this.field).forEach(function (key) {
                    switch (_this.field[key].constructor.name) {
                        //FilterCustom
                        case pxtfilterCustomField.name:
                            /** @type {?} */
                            var instanceFilterCustom = (_this.field[key]);
                            instanceFilterCustom.type = 'filter';
                            _this.fields.push(instanceFilterCustom);
                            break;
                        //Input
                        case pxtInputField.name:
                            /** @type {?} */
                            var instanceInput = (_this.field[key]);
                            instanceInput.type = 'input';
                            _this.fields.push(instanceInput);
                            break;
                        //Checkbox
                        case pxtCheckboxField.name:
                            /** @type {?} */
                            var instanceCheck = (_this.field[key]);
                            instanceCheck.type = 'checkbox';
                            _this.fields.push(instanceCheck);
                            break;
                        //Date
                        case pxtDateField.name:
                            /** @type {?} */
                            var instanceDate = (_this.field[key]);
                            instanceDate.type = 'date';
                            _this.fields.push(instanceDate);
                            break;
                        //Filter
                        case pxtFilterField.name:
                            /** @type {?} */
                            var instanceFilter = (_this.field[key]);
                            instanceFilter.type = 'filter';
                            _this.fields.push(instanceFilter);
                            break;
                        //RadioButton
                        case pxtRadioButtonField.name:
                            /** @type {?} */
                            var instanceRadio = (_this.field[key]);
                            instanceRadio.type = 'radio';
                            _this.fields.push(instanceRadio);
                            break;
                        //Select
                        case pxtSelectField.name:
                            /** @type {?} */
                            var instanceSelect = (_this.field[key]);
                            instanceSelect.type = 'select';
                            _this.fields.push(instanceSelect);
                            break;
                        default:
                            break;
                    }
                });
                this.onResize();
                this.colsInitial = this.cols;
                this.form = this.createControl();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        PxtContentComponent.prototype.onSubmit = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (this.form.valid) {
                    this.submit.emit(this.form.value);
                }
                else {
                    this.validateAllFormFields(this.form);
                }
            };
        /**
         * @return {?}
         */
        PxtContentComponent.prototype.createControl = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var group = this.fb.group({});
                this.fields.forEach(function (field) {
                    if (field.type === "button")
                        return;
                    /** @type {?} */
                    var control = _this.fb.control({ value: field.value, disabled: field.disabled }, _this.bindValidations(field.validations || []));
                    group.addControl(field.name, control);
                });
                return group;
            };
        /**
         * @param {?} validations
         * @return {?}
         */
        PxtContentComponent.prototype.bindValidations = /**
         * @param {?} validations
         * @return {?}
         */
            function (validations) {
                if (validations.length > 0) {
                    /** @type {?} */
                    var validList_1 = [];
                    validations.forEach(function (valid) {
                        validList_1.push(valid.validator);
                    });
                    return forms.Validators.compose(validList_1);
                }
                return null;
            };
        /**
         * @param {?} formGroup
         * @return {?}
         */
        PxtContentComponent.prototype.validateAllFormFields = /**
         * @param {?} formGroup
         * @return {?}
         */
            function (formGroup) {
                Object.keys(formGroup.controls).forEach(function (field) {
                    /** @type {?} */
                    var control = formGroup.get(field);
                    control.markAsTouched({ onlySelf: true });
                });
            };
        /**
         * @param {?=} event
         * @return {?}
         */
        PxtContentComponent.prototype.onResize = /**
         * @param {?=} event
         * @return {?}
         */
            function (event) {
                this.screenWidth = window.innerWidth;
                console.log(this.screenWidth);
                if (this.screenWidth <= 800) {
                    this.cols = 1;
                }
                else if (this.screenWidth <= 1100) {
                    this.cols = 3;
                }
                else {
                    this.cols = this.colsInitial;
                }
            };
        PxtContentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-content-body',
                        template: "<mat-card>\n    <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\" (window:resize)=\"onResize($event)\">\n            <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n                <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n                    <ng-container dynamicField [field]=\"field\"  [group]=\"form\">\n                    </ng-container>\n                </mat-grid-tile>\n                <mat-grid-tile class=\"mat-grid-tile-content\">\n                </mat-grid-tile>\n            </mat-grid-list>\n        </form>\n    </div>\n    <div *ngIf=\"!auto\">\n        <ng-content></ng-content>\n    </div>\n</mat-card>",
                        styles: [".pxt-content-body{padding:10px}.pxt-content-body mat-card{margin:5px;border-top:4px solid;border-radius:4px;border-bottom:4px solid}mat-form-field,pxt-datepicker,select-filial,td{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}.div-imagem-cardapio{margin-bottom:2%;text-align:center}.pxt-component-tag{width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        PxtContentComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder }
            ];
        };
        PxtContentComponent.propDecorators = {
            data: [{ type: core.Input }],
            auto: [{ type: core.Input }],
            fields: [{ type: core.Input }],
            cols: [{ type: core.Input }],
            field: [{ type: core.Input }],
            submit: [{ type: core.Output }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return PxtContentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtInputComponent = (function () {
        function PxtInputComponent() {
        }
        /**
         * @return {?}
         */
        PxtInputComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        PxtInputComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-input',
                        template: "<mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" > \n  <input matInput [formControlName]=\"field.name\" [placeholder]=\"field.label | uppercaseFirst\"  size=\"10\" [type]=\"field.inputType\">\n</mat-form-field>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtInputComponent.ctorParameters = function () { return []; };
        return PxtInputComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtButtonComponent = (function () {
        function PxtButtonComponent() {
        }
        /**
         * @return {?}
         */
        PxtButtonComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        PxtButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-button',
                        template: "<div class=\"demo-full-width margin-top\" [formGroup]=\"group\">\n  <button type=\"submit\" mat-button color=\"primary\">{{field.label | uppercaseFirst}}</button>\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtButtonComponent.ctorParameters = function () { return []; };
        return PxtButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtDateComponent = (function () {
        function PxtDateComponent() {
        }
        /**
         * @return {?}
         */
        PxtDateComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        PxtDateComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-date',
                        template: "<mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n  <input matInput [matDatepicker]=\"picker\" [formControlName]=\"field.name\" [placeholder]=\"field.label | uppercaseFirst \">\n  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n  <mat-hint></mat-hint>\n  <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n    <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n  </ng-container>\n</mat-form-field>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtDateComponent.ctorParameters = function () { return []; };
        return PxtDateComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtCheckboxComponent = (function () {
        function PxtCheckboxComponent() {
        }
        /**
         * @return {?}
         */
        PxtCheckboxComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        PxtCheckboxComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-checkbox',
                        template: "<div class=\"demo-full-width\" [formGroup]=\"group\">\n  <mat-checkbox [formControlName]=\"field.name\" color=\"primary\"  >{{field.label | uppercaseFirst }}</mat-checkbox>\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtCheckboxComponent.ctorParameters = function () { return []; };
        return PxtCheckboxComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtRadiobuttonComponent = (function () {
        function PxtRadiobuttonComponent() {
        }
        /**
         * @return {?}
         */
        PxtRadiobuttonComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        PxtRadiobuttonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-radiobutton',
                        template: "<div class=\"demo-full-width\" [formGroup]=\"group\">\n  <label class=\"radio-label-padding\">{{field.label}}:</label>\n  <mat-radio-group [formControlName]=\"field.name\" color=\"primary\" >\n    <mat-radio-button color=\"primary\"  *ngFor=\"let item of field.options\" [value]=\"item\">{{item}}</mat-radio-button>\n  </mat-radio-group>\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtRadiobuttonComponent.ctorParameters = function () { return []; };
        return PxtRadiobuttonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtSelectComponent = (function () {
        function PxtSelectComponent() {
        }
        /**
         * @return {?}
         */
        PxtSelectComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        PxtSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-select',
                        template: "<mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n  <mat-select [placeholder]=\"field.label\" [formControlName]=\"field.name\">\n    <mat-option *ngFor=\"let item of field.options\" [value]=\"item\">{{item}}</mat-option>\n  </mat-select>\n</mat-form-field>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtSelectComponent.ctorParameters = function () { return []; };
        return PxtSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtDialogFilterComponent = (function () {
        function PxtDialogFilterComponent(fb, dialogRef, data, helper, http$$1) {
            this.fb = fb;
            this.dialogRef = dialogRef;
            this.data = data;
            this.helper = helper;
            this.http = http$$1;
            this.displayedColumns = ['codigo', 'descricao'];
            this.dataSource = new material.MatTableDataSource();
            this.controller = "";
            this.fields = [];
            this.filter = { code: undefined, description: undefined };
            this.controller = data.controller.name;
        }
        Object.defineProperty(PxtDialogFilterComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this.form.value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.auto = this.data.auto;
                if (this.auto) {
                    this.field = this.data.filters;
                    Object.keys(this.field).forEach(function (key) {
                        switch (_this.field[key].constructor.name) {
                            case pxtfilterCustomField.name:
                                /** @type {?} */
                                var instanceFilterCustom = (_this.field[key]);
                                instanceFilterCustom.type = 'filter';
                                _this.fields.push(instanceFilterCustom);
                                break;
                            //Input
                            case pxtInputField.name:
                                /** @type {?} */
                                var instanceInput = (_this.field[key]);
                                instanceInput.type = 'input';
                                _this.fields.push(instanceInput);
                                break;
                            //Checkbox
                            case pxtCheckboxField.name:
                                /** @type {?} */
                                var instanceCheck = (_this.field[key]);
                                instanceCheck.type = 'checkbox';
                                _this.fields.push(instanceCheck);
                                break;
                            //Date
                            case pxtDateField.name:
                                /** @type {?} */
                                var instanceDate = (_this.field[key]);
                                instanceDate.type = 'date';
                                _this.fields.push(instanceDate);
                                break;
                            //Filter
                            case pxtFilterField.name:
                                /** @type {?} */
                                var instanceFilter = (_this.field[key]);
                                instanceFilter.type = 'filter';
                                _this.fields.push(instanceFilter);
                                break;
                            //RadioButton
                            case pxtRadioButtonField.name:
                                /** @type {?} */
                                var instanceRadio = (_this.field[key]);
                                instanceRadio.type = 'radio';
                                _this.fields.push(instanceRadio);
                                break;
                            //Select
                            case pxtSelectField.name:
                                /** @type {?} */
                                var instanceSelect = (_this.field[key]);
                                instanceSelect.type = 'select';
                                _this.fields.push(instanceSelect);
                                break;
                        }
                    });
                    this.form = this.createControl();
                }
            };
        /**
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.cancelation = /**
         * @return {?}
         */
            function () {
                this.dialogRef.close(false);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.confirmation = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.dialogRef.close(true);
            };
        //Search.
        /**
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.search = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var params = new Map();
                if (this.data.auto) {
                    if (this.form.value !== undefined) {
                        Object.keys(this.form.value).forEach(function (key) {
                            params.set(key, _this.form.value[key]);
                        });
                    }
                    this.http.doGet(this.controller, params).subscribe(function (result) {
                        _this.dataSource.data = result;
                    });
                }
                else {
                    if (this.filter.code != undefined && this.filter.code != 0 && this.filter.code != "") {
                        params.set("codigo", this.filter.code);
                    }
                    if (this.filter.description != undefined && this.filter.description != "") {
                        params.set("descricao", this.filter.description);
                    }
                    this.http.doGet(this.controller, params).subscribe(function (result) {
                        _this.dataSource.data = result;
                    });
                }
            };
        /**
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @param {?} row
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.selectRow = /**
         * @param {?} row
         * @return {?}
         */
            function (row) {
                this.dialogRef.close(row);
            };
        // Method responsible for create control
        /**
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.createControl = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var group = this.fb.group({});
                this.fields.forEach(function (field) {
                    if (field.type === "button")
                        return;
                    /** @type {?} */
                    var control = _this.fb.control({ value: field.value, disabled: field.disabled }, _this.bindValidations(field.validations || []));
                    group.addControl(field.name, control);
                });
                return group;
            };
        /**
         * @param {?} validations
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.bindValidations = /**
         * @param {?} validations
         * @return {?}
         */
            function (validations) {
                if (validations.length > 0) {
                    /** @type {?} */
                    var validList_1 = [];
                    validations.forEach(function (valid) {
                        validList_1.push(valid.validator);
                    });
                    return forms.Validators.compose(validList_1);
                }
                return null;
            };
        /**
         * @param {?} formGroup
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.validateAllFormFields = /**
         * @param {?} formGroup
         * @return {?}
         */
            function (formGroup) {
                Object.keys(formGroup.controls).forEach(function (field) {
                    /** @type {?} */
                    var control = formGroup.get(field);
                    control.markAsTouched({ onlySelf: true });
                });
            };
        /**
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.close = /**
         * @return {?}
         */
            function () {
                this.dialogRef.close(false);
            };
        PxtDialogFilterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-dialog-filter',
                        template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\"><mat-icon>close</mat-icon></button>\n   \n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <div *ngIf=\"!auto\">\n        <table>\n          <tr>\n            <td class=\"td-id\">\n              <mat-form-field>\n                <input type=\"number\" matInput placeholder=\"Codigo\" [(ngModel)]=\"filter.code\">\n              </mat-form-field>\n            </td>\n            <td>\n              <mat-form-field>\n                <input matInput placeholder=\"Descri\u00E7\u00E3o\" [(ngModel)]=\"filter.description\">\n              </mat-form-field>\n            </td>\n          </tr>\n        </table>\n      </div>\n\n      <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\">\n          <mat-grid-list [cols]=\"2\" rowHeight=\"5:1\">\n            <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n              <ng-container dynamicFieldDialog [field]=\"field\" [group]=\"form\">\n              </ng-container>\n            </mat-grid-tile>\n            <mat-grid-tile class=\"mat-grid-tile-content\">\n            </mat-grid-tile>\n          </mat-grid-list>\n        </form>\n      </div>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                        styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}"]
                    }] }
        ];
        /** @nocollapse */
        PxtDialogFilterComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: material.MatDialogRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] }] },
                { type: HttpHelperService },
                { type: RequestBaseService }
            ];
        };
        return PxtDialogFilterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtInputFilterComponent = (function () {
        function PxtInputFilterComponent(dialog) {
            this.dialog = dialog;
            this.isDisabled = true;
        }
        /**
         * @return {?}
         */
        PxtInputFilterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.value = this.field.value;
            };
        //Method resposible for open dialog filter
        /**
         * @return {?}
         */
        PxtInputFilterComponent.prototype.openFilter = /**
         * @return {?}
         */
            function () {
                var _this = this;
                console.log(this.field);
                if (this.field.filters != undefined) {
                    this.auto = true;
                }
                /** @type {?} */
                var dialogRef = this.dialog.open(PxtDialogFilterComponent, {
                    width: '600px',
                    //height: '500px',
                    data: { auto: this.auto, filters: this.field.filters, controller: this.field.className, titleDialog: "Selecione: ( " + this.field.className.name + " )" }
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result !== undefined) {
                        _this.field.value = result.identificador;
                    }
                    console.log(_this.group);
                    console.log(result);
                });
            };
        PxtInputFilterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-input-filter',
                        template: "<!--\n<mat-grid-list cols=\"6\" rowHeight=\"5:3\">\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='5'>\n    <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" disabled=\"isDisabled\">\n      <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n      <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n        <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n      </ng-container>\n    </mat-form-field>\n  </mat-grid-tile>\n\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='1'>\n    <button mat-icon-button>\n      <mat-icon (click)=\"openFilter()\">search</mat-icon>\n    </button>\n  </mat-grid-tile>\n\n</mat-grid-list>\n-->\n<mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n    <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n      <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n    </ng-container>\n  </mat-form-field>",
                        styles: ["mat-form-field{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}"]
                    }] }
        ];
        /** @nocollapse */
        PxtInputFilterComponent.ctorParameters = function () {
            return [
                { type: material.MatDialog }
            ];
        };
        return PxtInputFilterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var componentMapper = {
        input: PxtInputComponent,
        button: PxtButtonComponent,
        date: PxtDateComponent,
        select: PxtSelectComponent,
        radiobutton: PxtRadiobuttonComponent,
        checkbox: PxtCheckboxComponent,
        filter: PxtInputFilterComponent,
    };
    var DynamicFieldDirective = (function () {
        function DynamicFieldDirective(resolver, container) {
            this.resolver = resolver;
            this.container = container;
        }
        /**
         * @return {?}
         */
        DynamicFieldDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                debugger;
                /** @type {?} */
                var factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);
                this.componentRef = this.container.createComponent(factory);
                this.componentRef.instance.field = this.field;
                this.componentRef.instance.group = this.group;
            };
        DynamicFieldDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: "[dynamicField]"
                    },] }
        ];
        /** @nocollapse */
        DynamicFieldDirective.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef }
            ];
        };
        DynamicFieldDirective.propDecorators = {
            field: [{ type: core.Input }],
            group: [{ type: core.Input }]
        };
        return DynamicFieldDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtInputModule = (function () {
        function PxtInputModule() {
        }
        PxtInputModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PipeModule
                        ],
                        declarations: [PxtInputComponent],
                        exports: [PxtInputComponent],
                        entryComponents: [PxtInputComponent]
                    },] }
        ];
        return PxtInputModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtButtonModule = (function () {
        function PxtButtonModule() {
        }
        PxtButtonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PipeModule
                        ],
                        declarations: [PxtButtonComponent],
                        exports: [PxtButtonComponent],
                        entryComponents: [PxtButtonComponent]
                    },] }
        ];
        return PxtButtonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtDateModule = (function () {
        function PxtDateModule() {
        }
        PxtDateModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PipeModule
                        ],
                        declarations: [PxtDateComponent],
                        exports: [PxtDateComponent],
                        entryComponents: [PxtDateComponent]
                    },] }
        ];
        return PxtDateModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtSelectModule = (function () {
        function PxtSelectModule() {
        }
        PxtSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule
                        ],
                        exports: [PxtSelectComponent],
                        entryComponents: [PxtSelectComponent],
                        declarations: [PxtSelectComponent]
                    },] }
        ];
        return PxtSelectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtRadiobuttonModule = (function () {
        function PxtRadiobuttonModule() {
        }
        PxtRadiobuttonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule
                        ],
                        declarations: [PxtRadiobuttonComponent],
                        exports: [PxtRadiobuttonComponent],
                        entryComponents: [PxtRadiobuttonComponent]
                    },] }
        ];
        return PxtRadiobuttonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtCheckboxModule = (function () {
        function PxtCheckboxModule() {
        }
        PxtCheckboxModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PipeModule
                        ],
                        declarations: [PxtCheckboxComponent],
                        exports: [PxtCheckboxComponent],
                        entryComponents: [PxtCheckboxComponent]
                    },] }
        ];
        return PxtCheckboxModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var componentMapper$1 = {
        input: PxtInputComponent,
        button: PxtButtonComponent,
        date: PxtDateComponent,
        select: PxtSelectComponent,
        radiobutton: PxtRadiobuttonComponent,
        checkbox: PxtCheckboxComponent,
        filter: PxtInputFilterComponent,
    };
    var DynamicFieldDirectiveDialog = (function () {
        function DynamicFieldDirectiveDialog(resolver, container) {
            this.resolver = resolver;
            this.container = container;
        }
        /**
         * @return {?}
         */
        DynamicFieldDirectiveDialog.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                debugger;
                /** @type {?} */
                var factory = this.resolver.resolveComponentFactory(componentMapper$1[this.field.type]);
                this.componentRef = this.container.createComponent(factory);
                this.componentRef.instance.field = this.field;
                this.componentRef.instance.group = this.group;
            };
        DynamicFieldDirectiveDialog.decorators = [
            { type: core.Directive, args: [{
                        selector: "[dynamicFieldDialog]"
                    },] }
        ];
        /** @nocollapse */
        DynamicFieldDirectiveDialog.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef }
            ];
        };
        DynamicFieldDirectiveDialog.propDecorators = {
            field: [{ type: core.Input }],
            group: [{ type: core.Input }]
        };
        return DynamicFieldDirectiveDialog;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0 = {}, ɵ1 = { hasBackdrop: true };
    var PxtDialogFilterModule = (function () {
        function PxtDialogFilterModule() {
        }
        PxtDialogFilterModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule
                        ],
                        declarations: [PxtDialogFilterComponent, DynamicFieldDirectiveDialog],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA, core.NO_ERRORS_SCHEMA],
                        exports: [PxtDialogFilterComponent],
                        entryComponents: [PxtDialogFilterComponent],
                        providers: [
                            { provide: material.MAT_DIALOG_DATA, useValue: ɵ0 },
                            { provide: material.MAT_DIALOG_DEFAULT_OPTIONS, useValue: ɵ1 }
                        ]
                    },] }
        ];
        return PxtDialogFilterModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtInputFilterModule = (function () {
        function PxtInputFilterModule() {
        }
        PxtInputFilterModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule,
                            PxtDialogFilterModule
                        ],
                        declarations: [PxtInputFilterComponent],
                        exports: [PxtInputFilterComponent],
                        entryComponents: [PxtInputFilterComponent]
                    },] }
        ];
        return PxtInputFilterModule;
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
                            http$1.HttpModule,
                            PxtInputModule,
                            PxtButtonModule,
                            PxtDateModule,
                            PxtSelectModule,
                            PxtRadiobuttonModule,
                            PxtCheckboxModule,
                            PxtInputFilterModule
                        ],
                        declarations: [PxtContentComponent, DynamicFieldDirective],
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
    var pxtFields = (function () {
        function pxtFields() {
        }
        return pxtFields;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var pxtEnumTagHtml = {
        Input: 1,
        Combo: 2,
        Filter: 3,
        Checkbox: 4,
    };
    pxtEnumTagHtml[pxtEnumTagHtml.Input] = 'Input';
    pxtEnumTagHtml[pxtEnumTagHtml.Combo] = 'Combo';
    pxtEnumTagHtml[pxtEnumTagHtml.Filter] = 'Filter';
    pxtEnumTagHtml[pxtEnumTagHtml.Checkbox] = 'Checkbox';

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
    exports.pxtFields = pxtFields;
    exports.pxtEnumTagHtml = pxtEnumTagHtml;
    exports.PxtDatePickerModule = PxtDatePickerModule;
    exports.PxtUploadFileModule = PxtUploadFileModule;
    exports.PxtGalleryModule = PxtGalleryModule;
    exports.PxtGalleryComponent = PxtGalleryComponent;
    exports.ɵg = HashDirective;
    exports.ɵz = DynamicFieldDirective;
    exports.ɵx = DynamicFieldDirectiveDialog;
    exports.ɵf = PxtContentBody;
    exports.ɵe = PxtAppMenuItemComponent;
    exports.ɵd = PxtAppMenuItemModule;
    exports.ɵba = CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR;
    exports.ɵbb = PxtDatepickerComponent;
    exports.ɵw = PxtDialogFilterComponent;
    exports.ɵv = PxtDialogFilterModule;
    exports.ɵbc = PxtUploadFileComponent;
    exports.ɵl = PxtButtonComponent;
    exports.ɵk = PxtButtonModule;
    exports.ɵt = PxtCheckboxComponent;
    exports.ɵs = PxtCheckboxModule;
    exports.ɵn = PxtDateComponent;
    exports.ɵm = PxtDateModule;
    exports.ɵy = PxtInputFilterComponent;
    exports.ɵu = PxtInputFilterModule;
    exports.ɵj = PxtInputComponent;
    exports.ɵi = PxtInputModule;
    exports.ɵr = PxtRadiobuttonComponent;
    exports.ɵq = PxtRadiobuttonModule;
    exports.ɵp = PxtSelectComponent;
    exports.ɵo = PxtSelectModule;
    exports.ɵb = DateFormatPipe;
    exports.ɵc = DateTimeFormatPipe;
    exports.ɵa = UpercaseFirst;
    exports.ɵh = TokenService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlLnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3Rva2VuLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy91cHBlcmNhc2UtZmlyc3QudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3V0aWwvY29uc3RhbnRzLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLWZvcm1hdC5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLXRpbWUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3BpcGVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9IYXNoRGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dENvbmZpZ3VyYXRpb24udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWx0ZXItY3VzdG9tLmZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWlucHV0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWRhdGUtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LXJhZGlvYnV0dG9uLWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LXNlbGVjdC1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtY29udGVudC9weHQtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9tb2RlbC9weHQtc3VibWVudXMubW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL2VudW0vb3B0aW9uLXN1Ym1lbnUuZW51bS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWVsZHMtbW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2VudW0vcHh0LWVudW0tdGFnLWh0bWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtdXBsb2FkLWZpbGUvcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtdXBsb2FkLWZpbGUvcHh0LXVwbG9hZC1maWxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZ2FsbGVyeS9weHQtZ2FsbGVyeS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYWQtcHh0LWNvbnRlbnRdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRCb2R5IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFB4dEFwcENvbXBvbmVudFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBzdWJtZW51c0l0ZW5zOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3VibWVudXNJdGVuc09ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuc3VibWVudXNJdGVucy5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkQ29tcG9uZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9hZENvbXBvbmVudE9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX2xvYWRDb21wb25lbnQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0VXNlckxvZ2dlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHVzZXJMb2dnZWRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRVc2VyTG9nZ2VkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldEluZm9Jbml0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW5mb0luaXRpYWw6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3NldEluZm9Jbml0LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNldFN1Ym1lbnVzKHJvdXRlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdWJtZW51c0l0ZW5zLm5leHQocm91dGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbml0aWFsSW5mbyhpbmZvSW5pdGlhbCkge1xyXG4gICAgICAgIHRoaXMuX3NldEluZm9Jbml0Lm5leHQoaW5mb0luaXRpYWwpXHJcbiAgICB9XHJcblxyXG4gICAgbG9hZENvbXBvbmVudChjb21wb25lbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQubmV4dChjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXIodXNlcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0VXNlckxvZ2dlZC5uZXh0KHVzZXIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgSW5wdXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQeHRBcHAgfSBmcm9tICcuL3B4dC1hcHAnO1xuaW1wb3J0IHsgUHh0QXBwTW9kZWwgfSBmcm9tICcuL21vZGVsL3B4dC1hcHAubW9kZWwnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0TWVudSwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2FmZUh0bWwsIERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLmNvbXBvbmVudC5zY3NzJ11cblxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnQge1xuXG4gIC8vUHJvcGVydGllc1xuICByb3V0ZXM6IGFueVtdID0gW107XG4gIGdyb3VwczogYW55W10gPSBbXTtcbiAgbWVudXM6IGFueVtdID0gW107XG4gIHN5c3RlbTogU3RyaW5nID0gXCJTWVNURU0gTkFNRVwiXG4gIHVybEltZzogc3RyaW5nID0gJ2h0dHA6Ly9pbWFnZW5zZHN2LnBlaXhvdG8uY29tLmJyL2F1dGgvbWluaV9sb2dvLnBuZyc7XG4gIG1lbnVTZWxlY3RlZCA9IFwiXCI7XG4gIHVzdWVyTG9nZ2VkID0gXCJMb29nZ2VkIHVzZXJcIjtcbiAgbWVudXNIdG1sOiBTYWZlSHRtbDtcbiAgcmVzdWx0OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBfbW9iaWxlUXVlcnlMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgbW9iaWxlUXVlcnk6IE1lZGlhUXVlcnlMaXN0O1xuICBzaG91bGRSdW4gPSB0cnVlO1xuICBASW5wdXQoKSBtYXRNZW51OiBNYXRNZW51O1xuICBAVmlld0NoaWxkKCdtZW51cycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBzdWJDb250YWluZXIxOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdjb250ZXh0TWVudVRyaWdnZXInLCB7IHJlYWQ6IE1hdE1lbnVUcmlnZ2VyIH0pIGNvbnRleHRNZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXI7XG4gIGN1cnJlbnRBZEluZGV4ID0gLTE7XG4gIEBWaWV3Q2hpbGQoUHh0Q29udGVudEJvZHkpIGFkSG9zdDogUHh0Q29udGVudEJvZHk7XG4gIGludGVydmFsOiBhbnk7XG4gIG1lbnVzUmVjZWl2ZWQgOiBhbnlbXTtcbiAgXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IoY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG1lZGlhOiBNZWRpYU1hdGNoZXIsXG4gICAgcHVibGljIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEBJbmplY3QoUHh0QXBwQ29tcG9uZW50U2VydmljZSkgcHVibGljIHB4dEFwcENvbXBvbmVudFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeSA9IG1lZGlhLm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDYwMHB4KScpO1xuICAgIHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIgPSAoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5hZGRMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICB0aGlzLnJlc3VsdCA9IHB4dEFwcENvbXBvbmVudFNlcnZpY2UuaW5mb0luaXRpYWwuc3Vic2NyaWJlKGluZm9Jbml0aWFsID0+IHtcbiAgICAgIGlmIChpbmZvSW5pdGlhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy51c3VlckxvZ2dlZCA9IGluZm9Jbml0aWFsLnVzZXJMb2dnZWQ7XG4gICAgICAgIHRoaXMuc3lzdGVtID0gaW5mb0luaXRpYWwuc3lzdGVtO1xuICAgICAgICB0aGlzLm1lbnVzUmVjZWl2ZWQgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMubWVudXMgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMucHJlcGFyZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmliZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgLy8gSW5jbHVkZSBvZiBjb21wb25lbnRzIGluIHRoZSBhcHBsaWNhdGlvbiBib2R5XG4gIGxvYWRDb21wb25lbnQocm91dGU6IGFueSwgYWRIb3N0KSB7XG4gICAgdGhpcy5tZW51U2VsZWN0ZWQgPSByb3V0ZS5tZW51VGV4dDtcbiAgICBsZXQgYWRJdGVtID0gcm91dGUubWVudVNvdXJjZTtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGFkSXRlbS5jb21wb25lbnQpO1xuICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gYWRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgfVxuXG4gIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VydmljZSByZXNwb25zaWJsZSBmb3IgaW5jbHVkaW5nIGNvbXBvbmVudHMgaW4gdGhlIGJvZHkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gIHN1YnNjcmliZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLnB4dEFwcENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudE9ic2VydmFibGUuc3Vic2NyaWJlKGNvbXBvbmVudE9iaiA9PiB7XG4gICAgICB2YXIgYXJyYXlBdXggPSB0aGlzLm1lbnVzUmVjZWl2ZWQuZmlsdGVyKHg9PngubWVudVNvdXJjZSAhPSB1bmRlZmluZWQgJiYgeC5tZW51U291cmNlLmNvbXBvbmVudCA9PT0gY29tcG9uZW50T2JqLmNvbXBvbmVudCk7XG4gICAgICBjb25zb2xlLmxvZyhhcnJheUF1eCk7XG4gICAgICBpZihhcnJheUF1eC5sZW5ndGggPT0gMSl7XG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gYXJyYXlBdXhbMF0ubWVudVRleHQ7XG4gICAgICB9XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgKDxBZENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGEgPSBjb21wb25lbnRPYmouZGF0YTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJlc3BvbnNpYmxlIGZvciBjYWxsIG1ldGhvZCBcImxvYWRjb21wb25lbnRzKClcIiBpbmZvcm1pbmcgcGFyYW1ldGVyc1xuICBzZWxlY3RJdGVtTWVudShuYXYpIHtcbiAgICB0aGlzLmxvYWRDb21wb25lbnQobmF2LCB0aGlzLmFkSG9zdCk7XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIHByZXBhcmluZyBhcHBsaWNhdGlvbiBtZW51cztcbiAgcHJlcGFyZU1lbnUoKSB7XG4gICAgbGV0IGFycmF5QXV4OiBhbnlbXTtcbiAgICBhcnJheUF1eCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ID09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEdyb3VwID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiZ3JvdXBcIiAmJiB4Lm1lbnVQYXJlbnQgIT09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEl0ZW0gPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJpdGVtXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIGdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIC8vYWRkIGdyb3VwcyBpbiBncm91cHNcbiAgICBhcnJheUF1eEdyb3VwLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eEdyb3VwLmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKVxuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy9hZGQgaXRlbnMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhJdGVtLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMubWVudXMgPSBhcnJheUF1eDtcbiAgfVxufVxuIiwiaW1wb3J0ICcuLy4uLy4uLy4uL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtDZGtUYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7Q2RrVHJlZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gIE1hdEJhZGdlTW9kdWxlLFxuICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxuICBNYXRDaGlwc01vZHVsZSxcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgTWF0RGlhbG9nTW9kdWxlLFxuICBNYXREaXZpZGVyTW9kdWxlLFxuICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gIE1hdEdyaWRMaXN0TW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TGlzdE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRSYWRpb01vZHVsZSxcbiAgTWF0UmlwcGxlTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNpZGVuYXZNb2R1bGUsXG4gIE1hdFNsaWRlck1vZHVsZSxcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gIE1hdFNuYWNrQmFyTW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRTdGVwcGVyTW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VGFic01vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgTWF0VHJlZU1vZHVsZSxcbiAgTWF0TGluZU1vZHVsZSxcbiAgTWF0Q29tbW9uTW9kdWxlLFxuICBNYXRPcHRpb25Nb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gIFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtwbGF0Zm9ybUJyb3dzZXJEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsTWF0SWNvbk1vZHVsZSxNYXRMaW5lTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsTWF0U29ydE1vZHVsZSxNYXRUYWJzTW9kdWxlLE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsTWF0Q2hpcHNNb2R1bGUsTWF0SW5wdXRNb2R1bGUsTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsTWF0QnV0dG9uTW9kdWxlLE1hdENvbW1vbk1vZHVsZSxNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLE1hdFJpcHBsZU1vZHVsZSxNYXRTZWxlY3RNb2R1bGUsTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsTWF0U2lkZW5hdk1vZHVsZSxNYXRTdGVwcGVyTW9kdWxlLE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxNYXRUb29sdGlwTW9kdWxlLE1hdENoZWNrYm94TW9kdWxlLE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLE1hdEV4cGFuc2lvbk1vZHVsZSxNYXRGb3JtRmllbGRNb2R1bGUsTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsTWF0TmF0aXZlRGF0ZU1vZHVsZSxNYXRCb3R0b21TaGVldE1vZHVsZSxNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxNYXRBdXRvY29tcGxldGVNb2R1bGUsTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ2RrVHJlZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gIGNvbmZpZzogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcclxuICApIHsgfVxyXG5cclxuICBsb2FkKHVybDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmplY3RIdHRwID0gdGhpcy5pbmplY3Rvci5nZXQoSHR0cENsaWVudCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgaW5qZWN0SHR0cC5nZXQodXJsKS5waXBlKFxyXG4gICAgICAgIG1hcChyZXMgPT4gcmVzKVxyXG4gICAgICApLnN1YnNjcmliZShjb25maWcgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvbmZpZ3VyYXRpb24oZWxlbWVudDogc3RyaW5nLCBkYXRhTGlzdD86IHN0cmluZykge1xyXG4gICAgaWYgKCFkYXRhTGlzdCkge1xyXG4gICAgICBjb25zdCB1cmxXaXRoRWxlbWVudCA9IHRoaXMuY29uZmlnW2VsZW1lbnRdO1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlVcmwodXJsV2l0aEVsZW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdXJsV2l0aERhdGFMaXN0ID0gdGhpcy5jb25maWdbZGF0YUxpc3RdW2VsZW1lbnRdO1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlVcmwodXJsV2l0aERhdGFMaXN0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZlcmlmeVVybCh0eXBlTW9kZWw6IGFueSkge1xyXG4gICAgaWYgKHR5cGVNb2RlbC5pbmNsdWRlcygnLycsIHR5cGVNb2RlbC5sZW5ndGggLSAxKSkge1xyXG4gICAgICBjb25zdCB0eXBlUmVsZWFzZSA9IHR5cGVNb2RlbDtcclxuICAgICAgcmV0dXJuIHR5cGVSZWxlYXNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbmV3VHlwZSA9IHR5cGVNb2RlbCArICcvJztcclxuICAgICAgcmV0dXJuIG5ld1R5cGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEhlbHBlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0QXBpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnUEFUSCcpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBnZXRBcGlTZ2koKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ0FQSScsICdTR0knKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpVXJsIChuYW1lLCB1cmwpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbih1cmwsIG5hbWUpO1xyXG4gIH1cclxufSIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiXG5leHBvcnQgY29uc3QgZW52aXJvbm1lbnQgPSB7XG4gIHByb2R1Y3Rpb246IHRydWUsXG4gIGVudk5hbWU6ICdkZXYnLFxuICB2ZXJzaW9uOiAnMC4wLjEnLFxuICBDT05GSUdfRklMRTogJ2Fzc2V0cy9jb25maWcvZW52Lmpzb24nLFxuICBlc2JBcGlQeHQgOiBcImh0dHA6Ly9lc2Jkc3YucGVpeG90by5jb20uYnIvc2dlL1wiLFxuICBzeXN0ZW06IHtcbiAgICBpZDogMTA4LFxuICAgIHByZXg6IFwiUE9SQ1JQXCJcbiAgfVxufTtcblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG52YXIgc3lzdGVtID0gZW52aXJvbm1lbnQuc3lzdGVtO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICBkZWJ1Z2dlclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gIH1cbiAgc2V0VG9rZW5TdG9yYWdlKHJlczogYW55KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gIH1cbiAgcmVtb3ZlVG9rZW5TdG9yYWdlKCkge1xuICAgIHZhciB0b2tlbiA9ICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgIGNvbnN0IGRlY29kZWQgPSA8YW55PiBqd3RfZGVjb2RlKHRva2VuKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzeXN0ZW0uaWQrc3lzdGVtLnByZXgrZGVjb2RlZC5zdWIpO1xuICB9XG4gIFxuICBkZWxldGVUb2tlbigpIHtcbiAgICB0aGlzLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICB9XG5cbiAgdG9rZW5FeGlzdHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSBudWxsICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSB1bmRlZmluZWQgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09ICcnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3QsIGZvcndhcmRSZWYsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UsIFhIUkJhY2tlbmQsIFJlcXVlc3RPcHRpb25zQXJncywgUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4sIGZpbmFsaXplLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4vLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vdG9rZW4uc2VydmljZSc7XG4vL2ltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9IdHRwSGVscGVyU2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQeHRIdHRwU2VydmljZSBleHRlbmRzIEh0dHAge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2VuZDogWEhSQmFja2VuZCxcbiAgICBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAvL3ByaXZhdGUgdXJsSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGJhY2tlbmQsIG9wdGlvbnMpO1xuICB9XG5cbiAgdXJsUmVxdWVzdDogYW55O1xuICBvcmlnUmVxdWVzdDogUmVxdWVzdDtcbiAgaXNVbmF0aG91cml6ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIENvbnRyb2wgU2VydmljZXNcbiAgICovXG4gIGdldEhlYWRlcnMoKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnUHJhZ21hJywgJ25vLWNhY2hlJyk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBoYW5kbGVSZXNwb25zZShvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiwgdXJsPzogc3RyaW5nKSB7XG5cbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBjb25zdCBvcmlnID0gdGhpcy5vcmlnUmVxdWVzdDtcbiAgICByZXN1bHQgPSBvYnNlcnZhYmxlLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkNhdGNoKGVycm9yKTtcbiAgICAgIH0pLFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uUmVzdWx0KHJlcyk7XG4gICAgICB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBvblJlc3VsdChyZXMpIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDEpIHtcbiAgICAgIHJldHVybiByZXMuX2JvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgfVxuXG4gIGRvR2V0KGFwaTogc3RyaW5nLCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgLy8gdGhpcy5wcmVMb2FkZXJTZXJ2aWNlLnVwZGF0ZSh0cnVlKTtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5nZXQodXJsLCByZXF1ZXN0T3B0aW9ucykpO1xuICB9XG5cbiAgZG9Qb3N0KGVuZHBvaW50OiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgIGNvbnN0IHVybCA9IGVuZHBvaW50O1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucG9zdCh1cmwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpLCB1cmwpO1xuICB9XG5cbiAgZG9QdXQoYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnB1dCh1cmwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpLCB1cmwpO1xuICB9XG5cbiAgZG9QYXRoKGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wYXRjaCh1cmwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpLCB1cmwpO1xuICB9XG5cbiAgZG9EZWxldGUoYXBpOiBzdHJpbmcsIHBhcmFtczogYW55LCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHVybFBhcmFtID0gdXJsICsgJy8nICsgcGFyYW1zO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5kZWxldGUodXJsUGFyYW0sIHJlcXVlc3RPcHRpb25zKSwgdXJsUGFyYW0pO1xuICB9XG5cblxuICByZXF1ZXN0KHVybDogc3RyaW5nIHwgUmVxdWVzdCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBvcHRpb25zID0gdGhpcy5yZXF1ZXN0QXJncyhvcHRpb25zKTtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudXJsUmVxdWVzdCA9IHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxSZXF1ZXN0ID0gdXJsLnVybDtcbiAgICAgIHRoaXMub3JpZ1JlcXVlc3QgPSB1cmw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudXJsUmVxdWVzdCAhPT0gZW52aXJvbm1lbnQuQ09ORklHX0ZJTEUpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMub3JpZ1JlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcuY29uY2F0KHRva2VuKSk7XG4gICAgICAgIG9wdGlvbnMuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcuY29uY2F0KHRva2VuKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXJsID0gdGhpcy5vcmlnUmVxdWVzdDtcbiAgICByZXR1cm4gc3VwZXIucmVxdWVzdCh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0QXJncyhvcHRpb25zOiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBSZXF1ZXN0T3B0aW9uc0FyZ3Mge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbiAgcHVibGljIG9uQ2F0Y2goZXJyb3I6IGFueSkge1xuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKCF0aGlzLmlzVW5hdGhvdXJpemVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coNDAxKTtcbiAgICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwMVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNVbmF0aG91cml6ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAwOlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgLy8gdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwMFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA0OlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDA0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz0wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0QmFzZVNlcnZpY2U8VD4ge1xuXG4gIHB1YmxpYyBtb2RlbDogVDtcbiAgcHVibGljIHVybFNlcnZpY2U6IHN0cmluZztcbiAgcHVibGljIHVybFNlcnZpY2VBdXRvOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2UsXG4gICAgcHVibGljIF9odHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7XG4gICAgdGhpcy51cmxTZXJ2aWNlID0gaGVscGVyLmdldEFwaSgpO1xuICB9XG4gIGxvYWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2VBdXRvKTtcbiAgfTtcbiAgc2F2ZShtb2RlbD86IFQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2VBdXRvLCBtb2RlbCk7XG4gIH07XG4gIGRlbGV0ZShpZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlQXV0bywgaWQpO1xuICB9O1xuXG4gIGRvR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogTWFwPGFueSwgYW55Pikge1xuICAgIGRlYnVnZ2VyO1xuICAgIGxldCB1cmxcbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zLnNpemUgPiAwKSB7XG4gICAgICB1cmwgPSBwYXRoICsgdGhpcy5idWlsZFJlcXVlc3RQYXJhbXMocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gcGF0aDtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyB1cmwpO1xuICAgIH1cbiAgfTtcblxuICBkb1Bvc3QocGF0aDogc3RyaW5nLCBtb2RlbD86IFQpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHBhdGgsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9O1xuICB9O1xuXG4gIGRvUHV0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHBhdGgsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH1cbiAgfTtcblxuICBkb0RlbGV0ZShwYXRoOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUocGF0aCwgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh0aGlzLnVybFNlcnZpY2UgKyBwYXRoLCBpZCk7XG4gICAgfTtcbiAgfTtcblxuICB1cGxvYWRJbWFnZShwYXRoLCBwYXJhbXM/OiBNYXA8YW55LCBhbnk+KTogYW55IHtcblxuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA8PSAtMSkge1xuICAgICAgcGF0aCA9IHRoaXMudXJsU2VydmljZSArIHBhdGggO1xuICAgIH07XG5cbiAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJy5jb25jYXQodGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSlcbiAgICB9O1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0gbmV3IEh0dHBIZWFkZXJzKGhlYWRlcik7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IGZvcm1kYXRhID0gdGhpcy5zZXRQYXJhbXNGb3JtZGF0YShwYXJhbXMpO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCgnUE9TVCcsIHBhdGgsIGZvcm1kYXRhLCB7XG4gICAgICBoZWFkZXJzOiBodHRwT3B0aW9ucyxcbiAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlLFxuICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCdcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faHR0cENsaWVudC5yZXF1ZXN0KHJlcSk7XG4gIH1cblxuXG4gIHNldFBhcmFtc0Zvcm1kYXRhKHBhcmFtczogTWFwPGFueSwgYW55Pik6IEZvcm1EYXRhIHtcbiAgICBjb25zdCBmb3JtZGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBsZXQgcHJpbWVpcmFJdGVyYWNhbyA9IHRydWU7XG4gICAgcGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGZvcm1kYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWRhdGE7XG4gIH07XG5cbiAgcHJpdmF0ZSBidWlsZFJlcXVlc3RQYXJhbXMocGFyYW1zOiBNYXA8YW55LCBhbnk+KTogc3RyaW5nIHtcbiAgICBsZXQgZmluYWwgPSAnJztcbiAgICBsZXQgcHJpbWVpcmFJdGVyYWNhbyA9IHRydWU7XG4gICAgcGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChwcmltZWlyYUl0ZXJhY2FvKSB7XG4gICAgICAgIGZpbmFsICs9ICc/JyArIGtleSArICc9JyArIHZhbHVlO1xuICAgICAgICBwcmltZWlyYUl0ZXJhY2FvID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaW5hbCArPSAnJicgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmluYWw7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSwgVXBwZXJDYXNlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAndXBwZXJjYXNlRmlyc3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVcGVyY2FzZUZpcnN0IGV4dGVuZHMgVXBwZXJDYXNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKHRleHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZhciB3b3JkcyA9IHRleHQudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIik7XHJcbiAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgd29yZHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICBpZiAod29yZHNbYV0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgdmFyIHcgPSB3b3Jkc1thXTtcclxuICAgICAgICAgIHdvcmRzW2FdID0gd1swXS50b1VwcGVyQ2FzZSgpICsgdy5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHdvcmRzLmpvaW4oXCIgXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERBVEVfRk1UID0gJ2RkL01NL3l5eXknO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERBVEVfVElNRV9GTVQgPSBgJHtDb25zdGFudHMuREFURV9GTVR9IC0gaGg6bW06c3MgYWA7XHJcbiAgfSIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL3V0aWwvY29uc3RhbnRzXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnZGF0ZUZvcm1hdCdcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0UGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICAgIHJldHVybiBzdXBlci50cmFuc2Zvcm0odmFsdWUsIENvbnN0YW50cy5EQVRFX0ZNVCk7XHJcbiAgICB9XHJcbiAgfSIsImltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL3V0aWwvY29uc3RhbnRzXCI7XHJcblxyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdkYXRlVGltZUZvcm1hdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVUaW1lRm9ybWF0UGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgdmFyIGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKFwiZW4tVVNcIik7XHJcbiAgICByZXR1cm4gIGRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfVElNRV9GTVQpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFVwZXJjYXNlRmlyc3QgfSBmcm9tICcuL3VwcGVyY2FzZS1maXJzdCc7XHJcbmltcG9ydCB7IERhdGVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLWZvcm1hdC5waXBlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLXRpbWUtZm9ybWF0LnBpcGUnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1VwZXJjYXNlRmlyc3QsIERhdGVGb3JtYXRQaXBlLERhdGVUaW1lRm9ybWF0UGlwZSBdLFxyXG4gICAgZXhwb3J0czogW1VwZXJjYXNlRmlyc3QsIERhdGVGb3JtYXRQaXBlLERhdGVUaW1lRm9ybWF0UGlwZSBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaXBlTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBpdGVtczogYW55W107XG4gIEBWaWV3Q2hpbGQoJ2NoaWxkTWVudScpIHB1YmxpYyBjaGlsZE1lbnU7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSBwdWJsaWMgcHh0QXBwQ29tcG9uZW50U2VydmljZSkgeyB9XG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbG9hZENvbXBvbmVudChjaGlsZCkge1xuICAgIHRoaXMucHh0QXBwQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50KHtjb21wb25lbnQ6IGNoaWxkLm1lbnVTb3VyY2UuY29tcG9uZW50LCBkYXRhOlwiXCJ9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICAgZXhwb3J0czogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IF1cbiAgXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2hhc2hdJyxcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBIYXNoRGlyZWN0aXZlICB7XHJcbiAgICBASW5wdXQoKSBoYXNoOiBzdHJpbmc7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XHJcbiAgfSIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpc2libGVJblJvbGVzR3VhcmQgfSBmcm9tICcuLi92aXNpYmxlLWluLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhvcml0eVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBfaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHsgfVxuXG4gIGJ1c2NhckF1dGhvcml0aWVzIChjb2RpZ29TaXN0ZW1hKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5faHR0cEhlbHBlci5nZXRBcGlTZ2koKSArIFwicGVybWlzc29lcy9idXNjYXJQZXJmaWxTaXN0ZW1hLz9cIjtcbiAgICBjb25zdCBwYXJhbXMgPSBcImNvZGlnb1Npc3RlbWE9XCIgKyBjb2RpZ29TaXN0ZW1hO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRvR2V0KHVybCArIHBhcmFtcyk7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgcHh0Q29uZmlndXJhdGlvbiA9IHtzeXN0ZW1JZDogMTA0ICxzeXN0ZW1QcmV4OiBcIlNHRV9ORVdcIn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXNpYmxlSW5Sb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsIHByaXZhdGUgYXV0aG9yaXR5U2VydmljZTogQXV0aG9yaXR5U2VydmljZSkgeyB9XHJcbiAgY2FuQWN0aXZhdGUobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuIHtcclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICBpZiAodG9rZW4gIT09ICd1bmRlZmluZWQnICYmIHRva2VuICE9PSAnJyAmJiB0b2tlbiAhPT0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW4pO1xyXG4gICAgICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViKTtcclxuICAgICAgICBpZiAodG9rZW5BdXRob3JpdGllcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gJycgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hdXRob3JpdHlTZXJ2aWNlLmJ1c2NhckF1dGhvcml0aWVzKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQpLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViLCBkYXRhLmF1dGhvcml0eSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5odHRwSGVscGVyLmdldFVybEF1dGVudGljYWNhbygpICsgXCI/ZXJybz00MDFcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJUb2tlbiBVbmRlZmluZWRcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIEFQUF9JTklUSUFMSVpFUiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWFwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0QXBwTWVudUl0ZW1Nb2R1bGUgfSBmcm9tICcuL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLm1vZHVsZSc7XG5pbXBvcnQgeyBIYXNoRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9IYXNoRGlyZWN0aXZlJztcbmltcG9ydCB7IFZpc2libGVJblJvbGVzR3VhcmQgfSBmcm9tICcuLi8uLi92aXNpYmxlLWluLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IEF1dGhvcml0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC90b2tlbi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIFB4dEFwcE1lbnVJdGVtTW9kdWxlLCAgICBcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwQ29tcG9uZW50LCBQeHRDb250ZW50Qm9keSwgSGFzaERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQeHRBcHBDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtQeHRBcHBDb21wb25lbnRTZXJ2aWNlLCBQeHRIdHRwU2VydmljZSwgXG4gICAgUmVxdWVzdEJhc2VTZXJ2aWNlLCBIdHRwSGVscGVyU2VydmljZSwgQ29uZmlnU2VydmljZSwgICAgIFxuICAgIFZpc2libGVJblJvbGVzR3VhcmQsVG9rZW5TZXJ2aWNlLEF1dGhvcml0eVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRmaWx0ZXJDdXN0b21GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGNsYXNzTmFtZT86IGFueTtcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIGZpbHRlcnM/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dElucHV0RmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dENoZWNrYm94RmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RGF0ZUZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdHlwZT86IHN0cmluZztcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRGaWx0ZXJGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGNsYXNzTmFtZT86IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn1cclxuIiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBweHRSYWRpb0J1dHRvbkZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRTZWxlY3RGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIG9wdGlvbnM/OiBzdHJpbmdbXTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IHB4dGZpbHRlckN1c3RvbUZpZWxkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3B4dC1maWx0ZXItY3VzdG9tLmZpZWxkJztcbmltcG9ydCB7IHB4dElucHV0RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWlucHV0LWZpZWxkJztcbmltcG9ydCB7IHB4dENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkJztcbmltcG9ydCB7IHB4dERhdGVGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZGF0ZS1maWVsZCc7XG5pbXBvcnQgeyBweHRGaWx0ZXJGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkJztcbmltcG9ydCB7IHB4dFJhZGlvQnV0dG9uRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LXJhZGlvYnV0dG9uLWZpZWxkJztcbmltcG9ydCB7IHB4dFNlbGVjdEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1zZWxlY3QtZmllbGQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtY29udGVudC1ib2R5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1jb250ZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZENvbXBvbmVudCB7XG4gIC8vUHJvcGVydGllcyBcbiAgQElucHV0KCkgZGF0YTogYW55O1xuICBASW5wdXQoKSBhdXRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmllbGRzOiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIEBJbnB1dCgpIGNvbHM6IG51bWJlciA9IDU7XG4gIEBJbnB1dCgpIGZpZWxkOiBhbnk7XG4gIGNvbHNJbml0aWFsID0gNTtcbiAgQE91dHB1dCgpIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy5maWVsZFtrZXldLmNvbnN0cnVjdG9yLm5hbWUpIHtcblxuICAgICAgICAvL0ZpbHRlckN1c3RvbVxuICAgICAgICBjYXNlIHB4dGZpbHRlckN1c3RvbUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlckN1c3RvbSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9JbnB1dFxuICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VJbnB1dCA9IDxweHRJbnB1dEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9DaGVja2JveFxuICAgICAgICBjYXNlIHB4dENoZWNrYm94RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9EYXRlXG4gICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0ZpbHRlclxuICAgICAgICBjYXNlIHB4dEZpbHRlckZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgY2FzZSBweHRSYWRpb0J1dHRvbkZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBcbiAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgY2FzZSBweHRTZWxlY3RGaWVsZC5uYW1lOlxuICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlU2VsZWN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB0aGlzLmNvbHNJbml0aWFsID0gdGhpcy5jb2xzO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBwdWJsaWMgb25TdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XG5cbiAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZUFsbEZvcm1GaWVsZHModGhpcy5mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIHB1YmxpYyBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG4gIHNjcmVlbldpZHRoO1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2NyZWVuV2lkdGgpO1xuICAgIGlmICh0aGlzLnNjcmVlbldpZHRoIDw9IDgwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NyZWVuV2lkdGggPD0gMTEwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xzID0gdGhpcy5jb2xzSW5pdGlhbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1pbnB1dC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYnV0dG9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiAgIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWRhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRhdGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGF0ZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1jaGVja2JveC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtcmFkaW9idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXNlbGVjdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvcHh0LWZpbHRlci1jdXN0b20uZmllbGQnO1xuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5cblxuZGVjbGFyZSB2YXIgJDogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWRpYWxvZy1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGZpZWxkczogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBhdXRvOiBib29sZWFuO1xuICBmaWx0ZXIgPSB7IGNvZGU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHVuZGVmaW5lZCB9O1xuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0udmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgcHVibGljIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsXG4gICAgcHVibGljIGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZTxhbnk+KSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gZGF0YS5jb250cm9sbGVyLm5hbWU7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdXRvID0gdGhpcy5kYXRhLmF1dG87XG4gICAgaWYgKHRoaXMuYXV0bykge1xuICAgICAgdGhpcy5maWVsZCA9IHRoaXMuZGF0YS5maWx0ZXJzO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5maWVsZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRba2V5XS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgY2FzZSBweHRmaWx0ZXJDdXN0b21GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRmlsdGVyQ3VzdG9tLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9JbnB1dFxuICAgICAgICAgIGNhc2UgcHh0SW5wdXRGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlSW5wdXQgPSA8cHh0SW5wdXRGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9DaGVja2JveFxuICAgICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9EYXRlXG4gICAgICAgICAgY2FzZSBweHREYXRlRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZURhdGUgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0ZpbHRlclxuICAgICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAvL1NlbGVjdFxuICAgICAgICAgIGNhc2UgcHh0U2VsZWN0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVNlbGVjdCA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgICB9XG4gIH1cblxuICBjYW5jZWxhdGlvbigpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShmYWxzZSk7XG4gIH1cbiAgY29uZmlybWF0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICAvL1NlYXJjaC5cbiAgc2VhcmNoKCkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgTWFwPGFueSwgYW55PigpO1xuXG4gICAgaWYgKHRoaXMuZGF0YS5hdXRvKSB7XG4gICAgICBpZiAodGhpcy5mb3JtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5mb3JtLnZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgcGFyYW1zLnNldChrZXksIHRoaXMuZm9ybS52YWx1ZVtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5maWx0ZXIuY29kZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWx0ZXIuY29kZSAhPSAwICYmIHRoaXMuZmlsdGVyLmNvZGUgIT0gXCJcIikge1xuICAgICAgICBwYXJhbXMuc2V0KFwiY29kaWdvXCIsIHRoaXMuZmlsdGVyLmNvZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpbHRlci5kZXNjcmlwdGlvbiAhPSBcIlwiKSB7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJkZXNjcmljYW9cIiwgdGhpcy5maWx0ZXIuZGVzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5odHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgcGFyYW1zKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgc2VsZWN0Um93KHJvdykge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHJvdyk7XG4gIH1cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGJpbmRWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogYW55KTogYW55IHtcbiAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdmFsaWRMaXN0ID0gW107XG4gICAgICB2YWxpZGF0aW9ucy5mb3JFYWNoKHZhbGlkID0+IHtcbiAgICAgICAgdmFsaWRMaXN0LnB1c2godmFsaWQudmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZExpc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZmllbGQpO1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoZmFsc2UpO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1pbnB1dC1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXNEaXNhYmxlZCA9IHRydWU7XG4gIGF1dG86IGJvb2xlYW47XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICB2YWx1ZTogXCJcIjtcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmZpZWxkLnZhbHVlO1xuICB9XG5cbiAgLy9NZXRob2QgcmVzcG9zaWJsZSBmb3Igb3BlbiBkaWFsb2cgZmlsdGVyXG4gIG9wZW5GaWx0ZXIoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5maWVsZCk7XG4gICAgaWYgKHRoaXMuZmllbGQuZmlsdGVycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXV0byA9IHRydWU7XG4gICAgfVxuICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAvL2hlaWdodDogJzUwMHB4JyxcbiAgICAgIGRhdGE6IHsgYXV0bzogdGhpcy5hdXRvLCBmaWx0ZXJzOiB0aGlzLmZpZWxkLmZpbHRlcnMsIGNvbnRyb2xsZXI6IHRoaXMuZmllbGQuY2xhc3NOYW1lLCB0aXRsZURpYWxvZzogXCJTZWxlY2lvbmU6ICggXCIgKyB0aGlzLmZpZWxkLmNsYXNzTmFtZS5uYW1lICsgXCIgKVwiIH1cbiAgICB9KTtcbiAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZpZWxkLnZhbHVlID0gcmVzdWx0LmlkZW50aWZpY2Fkb3I7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFB4dERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFNlbGVjdENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCBjb21wb25lbnRNYXBwZXIgPSB7XHJcbiAgaW5wdXQ6IFB4dElucHV0Q29tcG9uZW50LFxyXG4gIGJ1dHRvbjogUHh0QnV0dG9uQ29tcG9uZW50LFxyXG4gIGRhdGU6IFB4dERhdGVDb21wb25lbnQsXHJcbiAgc2VsZWN0OiBQeHRTZWxlY3RDb21wb25lbnQsXHJcbiAgcmFkaW9idXR0b246IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50LFxyXG4gIGNoZWNrYm94OiBQeHRDaGVja2JveENvbXBvbmVudCxcclxuICBmaWx0ZXI6IFB4dElucHV0RmlsdGVyQ29tcG9uZW50LFxyXG59O1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbZHluYW1pY0ZpZWxkXVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZENvbmZpZztcclxuICBASW5wdXQoKSBncm91cDogRm9ybUdyb3VwO1xyXG4gIGNvbXBvbmVudFJlZjogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcclxuICApIHsgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgZGVidWdnZXI7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dElucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0SW5wdXRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOltQeHRCdXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEJ1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0RGF0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czpbUHh0U2VsZWN0Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRTZWxlY3RDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRTZWxlY3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFNlbGVjdE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tICcuL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFJhZGlvYnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dFJhZGlvYnV0dG9uQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFJhZGlvYnV0dG9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRDaGVja2JveENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRDaGVja2JveENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0Q2hlY2tib3hDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dENoZWNrYm94TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHh0RGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRDaGVja2JveENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGNvbXBvbmVudE1hcHBlciA9IHtcclxuICBpbnB1dDogUHh0SW5wdXRDb21wb25lbnQsXHJcbiAgYnV0dG9uOiBQeHRCdXR0b25Db21wb25lbnQsXHJcbiAgZGF0ZTogUHh0RGF0ZUNvbXBvbmVudCxcclxuICBzZWxlY3Q6IFB4dFNlbGVjdENvbXBvbmVudCxcclxuICByYWRpb2J1dHRvbjogUHh0UmFkaW9idXR0b25Db21wb25lbnQsXHJcbiAgY2hlY2tib3g6IFB4dENoZWNrYm94Q29tcG9uZW50LFxyXG4gIGZpbHRlcjogUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQsXHJcbn07XHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBcIltkeW5hbWljRmllbGREaWFsb2ddXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkQ29uZmlnO1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBGb3JtR3JvdXA7XHJcbiAgY29tcG9uZW50UmVmOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkgeyB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb21wb25lbnRNYXBwZXJbdGhpcy5maWVsZC50eXBlXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGQgPSB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZ10sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFB4dERpYWxvZ0ZpbHRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRJbnB1dEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRJbnB1dEZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyB0ZW1wbGF0ZUppdFVybCB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlJztcbmltcG9ydCB7IFB4dElucHV0TW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0QnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHREYXRlTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUubW9kdWxlJztcbmltcG9ydCB7IFB4dFNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Nb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgSHR0cE1vZHVsZSxcbiAgICBQeHRJbnB1dE1vZHVsZSxcbiAgICBQeHRCdXR0b25Nb2R1bGUsXG4gICAgUHh0RGF0ZU1vZHVsZSxcbiAgICBQeHRTZWxlY3RNb2R1bGUsXG4gICAgUHh0UmFkaW9idXR0b25Nb2R1bGUsXG4gICAgUHh0Q2hlY2tib3hNb2R1bGUsXG4gICAgUHh0SW5wdXRGaWx0ZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0Q29udGVudENvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXSxcbiAgIGV4cG9ydHM6IFtQeHRDb250ZW50Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dENvbnRlbnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRNb2R1bGUgeyB9XG4iLCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uIHtcclxuICAgIGljb246IFN0cmluZztcclxuICAgIG1lbnU6IFN0cmluZztcclxuICAgIGVuYWJsZTogQm9vbGVhbjtcclxuICAgIGVudW0gOiBOdW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihpY29uOiBTdHJpbmcsIG1lbnU6IFN0cmluZywgZW5hYmxlOiBCb29sZWFuLCBpZCA6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5tZW51ID0gbWVudTtcclxuICAgICAgICB0aGlzLmVuYWJsZSA9IGVuYWJsZTtcclxuICAgICAgICB0aGlzLmVudW0gPSBpZDtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gT3B0aW9uc1N1Ym1lbnUge1xyXG4gICAgU0FMVkFSID0gMSxcclxuICAgIFBFU1FVSVNBUiA9IDIsXHJcbiAgICBMSU1QQVIgPSAzLFxyXG4gICAgTk9WTyA9IDQsXHJcbiAgICBWT0xUQVI9IDUsXHJcbiAgICBFWENMVUlSPSA2XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEJ1dHRvbiB9IGZyb20gJy4vbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsJztcbmltcG9ydCB7IE9wdGlvbnNTdWJtZW51IH0gZnJvbSAnLi9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0nO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtc3VibWVudXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c0NvbXBvbmVudDxUPiB7XG5cbiAgQElucHV0KCkgbW9kZWw/OiBUID0ge30gYXMgVDtcbiAgcHJpdmF0ZSB1cmxTZXJ2aWNlID0gXCJcIjtcblxuICBAT3V0cHV0KCkgbGlzdGluZzogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNTYXZlOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHN0YXR1c0RlbGV0ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI/OiBTdHJpbmc7XG5cbiAgc2F2ZSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5zYXZlKHRoaXMubW9kZWwpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNTYXZlLmVtaXQocmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcbiAgc2VhcmNoKCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmxvYWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMubGlzdGluZy5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIGRlbGV0ZShpZCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmRlbGV0ZShpZCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLnN0YXR1c0RlbGV0ZS5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIGNsZWFyKCkge1xuICAgdGhpcy5tb2RlbCA9IHt9IGFzIFQ7XG4gIH07XG4gIGFkZCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2FkZCgpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9O1xuICBiYWNrKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYmFjaygpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9O1xuXG4gIGJ1dHRvbnM6IFB4dEJ1dHRvbltdID0gW107XG4gIGVuYWJsZVNhdmUgPSB0cnVlO1xuICBlbmFibGVCYWNrID0gdHJ1ZTtcbiAgZW5hYmxlQ2xlYXIgPSB0cnVlO1xuICBlbmFibGVTZWFyY2ggPSB0cnVlO1xuICBlbmFibGVBZGQgPSB0cnVlO1xuICBlbmFibGVEZWxldGUgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfcHh0QXBwU2VydmljZTogUHh0QXBwQ29tcG9uZW50U2VydmljZSwgcHVibGljIF9zZXJ2aWNlQmFzZTogUmVxdWVzdEJhc2VTZXJ2aWNlPFQ+LHB1YmxpYyBoZWxwZXI6ICBIdHRwSGVscGVyU2VydmljZSkge1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJrZXlib2FyZF9iYWNrc3BhY2VcIiwgXCJWT0xUQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuVk9MVEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIlNBTFZBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5TQUxWQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiTk9WT1wiLCB0cnVlLCBPcHRpb25zU3VibWVudS5OT1ZPKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkxJTVBBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5MSU1QQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwic2VhcmNoXCIsIFwiUEVTUVVJU0FSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlBFU1FVSVNBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJFWENMVUlSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkVYQ0xVSVIpKTtcblxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCkgKyB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB0aGlzLl9zZXJ2aWNlQmFzZS51cmxTZXJ2aWNlQXV0byA9IHRoaXMudXJsU2VydmljZSA7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnVybFNlcnZpY2UpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFB4dFN1Ym1lbnVzQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtc3VibWVudXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRTdWJtZW51c0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRTdWJtZW51c0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczpbUHh0SHR0cFNlcnZpY2UsIFJlcXVlc3RCYXNlU2VydmljZSwgSHR0cEhlbHBlclNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFN1Ym1lbnVzTW9kdWxlIHsgfVxuXG4iLCJpbXBvcnQgeyBweHRFbnVtVGFnSHRtbCB9IGZyb20gXCIuLi9lbnVtL3B4dC1lbnVtLXRhZy1odG1sXCI7XHJcbmltcG9ydCB7IHB4dEVudW1UeXBlVGFnIH0gZnJvbSBcIi4uL2VudW0vcHh0LWVudW0tdHlwZS10YWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmllbGRzIHtcclxuICAgIHR5cGU6IHB4dEVudW1UeXBlVGFnO1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIHRhZzogcHh0RW51bVRhZ0h0bWw7XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gcHh0RW51bVRhZ0h0bWwge1xyXG4gICAgSW5wdXQgPSAxLFxyXG4gICAgQ29tYm8gPSAyLFxyXG4gICAgRmlsdGVyID0gMyxcclxuICAgIENoZWNrYm94ID0gNFxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dERhdGVwaWNrZXJDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncHh0LWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFN0cmluZyA9IFwiRXNjb2xoYSB1bWEgZGF0YVwiO1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBpbnB1dERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGRhdGVNb2RlbDogRGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgZ2V0IGRhdGFTZWxlY2lvbmFkYSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGVNb2RlbDtcclxuICB9XHJcblxyXG4gIHNldCBkYXRhU2VsZWNpb25hZGEoZDogRGF0ZSkge1xyXG4gICAgaWYgKGQgIT09IHRoaXMuZGF0ZU1vZGVsKSB7XHJcbiAgICAgIHRoaXMuZGF0ZU1vZGVsID0gZDtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmRhdGVNb2RlbCA9IHZhbHVlO1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBvbkRhdGVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMud3JpdGVWYWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UoKTtcclxuICB9XHJcbiAgXHJcbn0iLCJcclxuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFB4dERhdGVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1B4dERhdGVwaWNrZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVQaWNrZXJNb2R1bGUge1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXVwbG9hZC1maWxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgOnN0cmluZztcbiAgQE91dHB1dCgpIGZpbGVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgYXJyYXlJbWFnZXMgOkZpbGVSZWFkZXI7XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgb25DaGFuZ2VJbWFnZW0oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgaW1hZ2VtOiBGaWxlID0gZXZlbnQ7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyPSBpbWFnZW0ubmFtZTtcbiAgICByZXR1cm4gdGhpcy5maWxlU2VsZWN0ZWQubmV4dChpbWFnZW0pO1xuICAgIH1cblxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRVcGxvYWRGaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50cyA6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEdhbGxlcnlPcHRpb25zLCBOZ3hHYWxsZXJ5SW1hZ2UsIE5neEdhbGxlcnlBbmltYXRpb24gfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1nYWxsZXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGdhbGxlcnlPcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9uc1tdO1xuICBASW5wdXQoKSBnYWxsZXJ5SW1hZ2VzOiBOZ3hHYWxsZXJ5SW1hZ2VbXTtcbiAgQElucHV0KCkgd2lkdGg6IGFueSA9IFwiMTAwJVwiO1xuICBASW5wdXQoKSBoZWlnaHQ6IGFueSA9ICc0MDBweCc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5nYWxsZXJ5T3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHRodW1ibmFpbHNDb2x1bW5zOiA0LFxuICAgICAgICBpbWFnZUFuaW1hdGlvbjogTmd4R2FsbGVyeUFuaW1hdGlvbi5TbGlkZVxuICAgICAgfSxcbiAgICAgIC8vIG1heC13aWR0aCA4MDBcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogODAwLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgaW1hZ2VQZXJjZW50OiA4MCxcbiAgICAgICAgdGh1bWJuYWlsc1BlcmNlbnQ6IDIwLFxuICAgICAgICB0aHVtYm5haWxzTWFyZ2luOiAyMCxcbiAgICAgICAgdGh1bWJuYWlsTWFyZ2luOiAyMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNDAwLFxuICAgICAgICBwcmV2aWV3OiBmYWxzZVxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0R2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU1vZHVsZSB9IGZyb20gJ25neC1nYWxsZXJ5JztcbmltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdGVyaWFsQW5ndWxhck1vZHVsZSwgTmd4R2FsbGVyeU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0R2FsbGVyeUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dEdhbGxlcnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiRGlyZWN0aXZlIiwiVmlld0NvbnRhaW5lclJlZiIsIlN1YmplY3QiLCJJbmplY3RhYmxlIiwiQ29tcG9uZW50IiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJNZWRpYU1hdGNoZXIiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJJbmplY3QiLCJJbnB1dCIsIlZpZXdDaGlsZCIsIk1hdE1lbnVUcmlnZ2VyIiwiTmdNb2R1bGUiLCJDZGtUYWJsZU1vZHVsZSIsIkNka1RyZWVNb2R1bGUiLCJNYXRBdXRvY29tcGxldGVNb2R1bGUiLCJNYXRCYWRnZU1vZHVsZSIsIk1hdEJvdHRvbVNoZWV0TW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0QnV0dG9uVG9nZ2xlTW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdENoZWNrYm94TW9kdWxlIiwiTWF0Q2hpcHNNb2R1bGUiLCJNYXRTdGVwcGVyTW9kdWxlIiwiTWF0RGF0ZXBpY2tlck1vZHVsZSIsIk1hdERpYWxvZ01vZHVsZSIsIk1hdERpdmlkZXJNb2R1bGUiLCJNYXRFeHBhbnNpb25Nb2R1bGUiLCJNYXRHcmlkTGlzdE1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRJbnB1dE1vZHVsZSIsIk1hdExpc3RNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiTWF0TmF0aXZlRGF0ZU1vZHVsZSIsIk1hdFBhZ2luYXRvck1vZHVsZSIsIk1hdFByb2dyZXNzQmFyTW9kdWxlIiwiTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIiwiTWF0UmFkaW9Nb2R1bGUiLCJNYXRSaXBwbGVNb2R1bGUiLCJNYXRTZWxlY3RNb2R1bGUiLCJNYXRTaWRlbmF2TW9kdWxlIiwiTWF0U2xpZGVyTW9kdWxlIiwiTWF0U2xpZGVUb2dnbGVNb2R1bGUiLCJNYXRTbmFja0Jhck1vZHVsZSIsIk1hdFNvcnRNb2R1bGUiLCJNYXRUYWJsZU1vZHVsZSIsIk1hdFRhYnNNb2R1bGUiLCJNYXRUb29sYmFyTW9kdWxlIiwiTWF0VG9vbHRpcE1vZHVsZSIsIk1hdFRyZWVNb2R1bGUiLCJCcm93c2VyTW9kdWxlIiwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIk1hdExpbmVNb2R1bGUiLCJNYXRDb21tb25Nb2R1bGUiLCJNYXRPcHRpb25Nb2R1bGUiLCJNYXRGb3JtRmllbGRNb2R1bGUiLCJNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJIdHRwQ2xpZW50IiwibWFwIiwiSW5qZWN0b3IiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkhlYWRlcnMiLCJjYXRjaEVycm9yIiwiUmVxdWVzdE9wdGlvbnMiLCJPYnNlcnZhYmxlIiwiWEhSQmFja2VuZCIsIkh0dHAiLCJIdHRwSGVhZGVycyIsIkh0dHBSZXF1ZXN0IiwiUGlwZSIsIlVwcGVyQ2FzZVBpcGUiLCJEYXRlUGlwZSIsInJvdXRlciIsIlJvdXRlciIsIkV2ZW50RW1pdHRlciIsIlZhbGlkYXRvcnMiLCJGb3JtQnVpbGRlciIsIk91dHB1dCIsIkhvc3RMaXN0ZW5lciIsImh0dHAiLCJNYXRUYWJsZURhdGFTb3VyY2UiLCJNYXREaWFsb2dSZWYiLCJNQVRfRElBTE9HX0RBVEEiLCJNYXREaWFsb2ciLCJjb21wb25lbnRNYXBwZXIiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIiwiTk9fRVJST1JTX1NDSEVNQSIsIk1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TIiwiSHR0cENsaWVudE1vZHVsZSIsIkh0dHBNb2R1bGUiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJOZ3hHYWxsZXJ5QW5pbWF0aW9uIiwiTmd4R2FsbGVyeU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7UUFNRSx3QkFBbUIsZ0JBQWtDO1lBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7U0FBSzs7b0JBSjNEQSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtxQkFDN0I7Ozs7O3dCQUptQkMscUJBQWdCOzs7NkJBQXBDOzs7Ozs7O0FDQUE7O2lDQUswQyxJQUFJQyxZQUFPLEVBQU87MkNBQ0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7a0NBRXJELElBQUlBLFlBQU8sRUFBTzsyQ0FDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtrQ0FFdEQsSUFBSUEsWUFBTyxFQUFPO3dDQUNELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFO2dDQUVyRCxJQUFJQSxZQUFPLEVBQU87K0JBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7Ozs7OztRQUUvRSw0Q0FBVzs7OztZQUFYLFVBQVksTUFBVztnQkFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkM7Ozs7O1FBRUQsK0NBQWM7Ozs7WUFBZCxVQUFlLFdBQVc7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2FBQ3RDOzs7OztRQUVELDhDQUFhOzs7O1lBQWIsVUFBYyxTQUFjO2dCQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN2Qzs7Ozs7UUFFRCx3Q0FBTzs7OztZQUFQLFVBQVEsSUFBUztnQkFDYixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQzs7b0JBNUJKQyxlQUFVOztxQ0FIWDs7Ozs7OztBQ0FBOztRQTJDRSx5QkFBWSxpQkFBb0MsRUFDOUMsS0FBbUIsRUFDWiwwQkFDZ0Msc0JBQXNCO1lBSC9ELGlCQWtCQztZQWhCUSw2QkFBd0IsR0FBeEIsd0JBQXdCO1lBQ1EsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFBOzswQkF4Qi9DLEVBQUU7MEJBQ0YsRUFBRTt5QkFDSCxFQUFFOzBCQUNBLGFBQWE7MEJBQ2IscURBQXFEO2dDQUN2RCxFQUFFOytCQUNILGNBQWM7NkJBS2hCLElBQUk7a0NBSUMsQ0FBQyxDQUFDO1lBV2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxjQUFNLE9BQUEsaUJBQWlCLENBQUMsYUFBYSxFQUFFLEdBQUEsQ0FBQztZQUNwRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxXQUFXO2dCQUNwRSxJQUFJLFdBQVcsSUFBSSxTQUFTLEVBQUU7b0JBQzVCLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUNqQyxLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUM7b0JBQzlDLEtBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztvQkFDdEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUNwQjthQUNGLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCOzs7O1FBRUQscUNBQVc7OztZQUFYO2dCQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUMzRCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCOzs7Ozs7O1FBR0QsdUNBQWE7Ozs7O1lBQWIsVUFBYyxLQUFVLEVBQUUsTUFBTTtnQkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDOztnQkFDbkMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7Z0JBQzlCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBQy9GLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUMvQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Z0JBQ3pCLElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3ZFOzs7OztRQUdELDRDQUFrQjs7O1lBQWxCO2dCQUFBLGlCQWFDO2dCQVpDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsVUFBQSxZQUFZOztvQkFDeEUsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsVUFBVSxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxHQUFBLENBQUMsQ0FBQztvQkFDNUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsSUFBRyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQzt3QkFDdEIsS0FBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO3FCQUMxQzs7b0JBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztvQkFDckcsSUFBSSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUNwRCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7b0JBQ3pCLElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN0RSxFQUFjLFlBQVksQ0FBQyxRQUFRLEdBQUUsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7aUJBQy9ELENBQUMsQ0FBQzthQUNKOzs7Ozs7UUFHRCx3Q0FBYzs7OztZQUFkLFVBQWUsR0FBRztnQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDOzs7OztRQUdELHFDQUFXOzs7WUFBWDs7Z0JBQ0UsSUFBSSxRQUFRLENBQVE7Z0JBQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksRUFBRSxHQUFBLENBQUMsQ0FBQzs7Z0JBQy9FLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSyxFQUFFLEdBQUEsQ0FBQyxDQUFDOztnQkFDekYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLEVBQUUsR0FBQSxDQUFDLENBQUM7O2dCQUd2RixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7b0JBQ3ZCLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUEsQ0FBQyxDQUFDO29CQUN0RSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO3dCQUN4QixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFOzRCQUNuQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzt5QkFDekI7d0JBQ0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQy9CO2lCQUNGLENBQUMsQ0FBQzs7Z0JBRUgsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7O29CQUN4QixJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFBLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTt3QkFDeEIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTs0QkFDbkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7eUJBQ3pCO3dCQUNELFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO3FCQUM5QjtpQkFDRixDQUFDLENBQUM7O2dCQUVILGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJOztvQkFDeEIsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBQSxDQUFDLENBQUM7b0JBQ2pFLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7d0JBQ3hCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7NEJBQ25DLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOzRCQUN4QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDL0I7NkJBQU07NEJBQ0wsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQy9CO3FCQUNGO2lCQUNGLENBQUMsQ0FBQzs7Z0JBR0gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7O29CQUN2QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFBLENBQUMsQ0FBQztvQkFDakUsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTt3QkFDeEIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTs0QkFDbkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7eUJBQ3pCO3dCQUNELFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMvQjtpQkFDRixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7YUFDdkI7O29CQXpJRkMsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxTQUFTO3dCQUNuQixvdkZBQXVDOztxQkFHeEM7Ozs7O3dCQWpCUUMsc0JBQWlCO3dCQURqQkMsbUJBQVk7d0JBQytDQyw2QkFBd0I7d0RBNkN2RkMsV0FBTSxTQUFDLHNCQUFzQjs7Ozs4QkFaL0JDLFVBQUs7b0NBQ0xDLGNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUVULHFCQUFnQixFQUFFO3lDQUM3Q1MsY0FBUyxTQUFDLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxFQUFFQyx1QkFBYyxFQUFFOzZCQUV4REQsY0FBUyxTQUFDLGNBQWM7OzhCQXRDM0I7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7O29CQXVEQ0UsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsb0JBQWM7NEJBQ2RDLGtCQUFhOzRCQUNiQyw4QkFBcUI7NEJBQ3JCQyx1QkFBYzs0QkFDZEMsNkJBQW9COzRCQUNwQkMsd0JBQWU7NEJBQ2ZDLDhCQUFxQjs0QkFDckJDLHNCQUFhOzRCQUNiQywwQkFBaUI7NEJBQ2pCQyx1QkFBYzs0QkFDZEMseUJBQWdCOzRCQUNoQkMsNEJBQW1COzRCQUNuQkMsd0JBQWU7NEJBQ2ZDLHlCQUFnQjs0QkFDaEJDLDJCQUFrQjs0QkFDbEJDLDBCQUFpQjs0QkFDakJDLHNCQUFhOzRCQUNiQyx1QkFBYzs0QkFDZEMsc0JBQWE7NEJBQ2JDLHNCQUFhOzRCQUNiQyw0QkFBbUI7NEJBQ25CQywyQkFBa0I7NEJBQ2xCQyw2QkFBb0I7NEJBQ3BCQyxpQ0FBd0I7NEJBQ3hCQyx1QkFBYzs0QkFDZEMsd0JBQWU7NEJBQ2ZDLHdCQUFlOzRCQUNmQyx5QkFBZ0I7NEJBQ2hCQyx3QkFBZTs0QkFDZkMsNkJBQW9COzRCQUNwQkMsMEJBQWlCOzRCQUNqQkMsc0JBQWE7NEJBQ2JDLHVCQUFjOzRCQUNkQyxzQkFBYTs0QkFDYkMseUJBQWdCOzRCQUNoQkMseUJBQWdCOzRCQUNoQkMsc0JBQWE7NEJBQ2JwQixzQkFBYTs0QkFDYnFCLDZCQUFhOzRCQUNiQyxrQ0FBdUI7NEJBQ3ZCQyxtQkFBWTs0QkFDWkMsaUJBQVc7NEJBQ1hqQyxzQkFBYSxFQUFDUyxzQkFBYSxFQUFDeUIsc0JBQWE7NEJBQ3pDdkIsc0JBQWEsRUFBQ2Esc0JBQWEsRUFBQ0Usc0JBQWEsRUFBQ0csc0JBQWE7NEJBQ3ZEakMsdUJBQWMsRUFBQ00sdUJBQWMsRUFBQ1EsdUJBQWMsRUFBQ08sdUJBQWM7NEJBQzNEUSx1QkFBYyxFQUFDM0Isd0JBQWUsRUFBQ3FDLHdCQUFlLEVBQUM5Qix3QkFBZTs0QkFDOUQrQix3QkFBZSxFQUFDbEIsd0JBQWUsRUFBQ0Msd0JBQWUsRUFBQ0Usd0JBQWU7NEJBQy9EZix5QkFBZ0IsRUFBQ2MseUJBQWdCLEVBQUNqQix5QkFBZ0IsRUFBQ3dCLHlCQUFnQjs0QkFDbkVBLHlCQUFnQixFQUFDQyx5QkFBZ0IsRUFBQzNCLDBCQUFpQixFQUFDTywwQkFBaUI7NEJBQ3JFZSwwQkFBaUIsRUFBQ2hCLDJCQUFrQixFQUFDOEIsMkJBQWtCLEVBQUN2QiwyQkFBa0I7NEJBQzFFViw0QkFBbUIsRUFBQ1MsNEJBQW1CLEVBQUNoQiw2QkFBb0IsRUFBQ2tCLDZCQUFvQjs0QkFDakZPLDZCQUFvQixFQUFDM0IsOEJBQXFCLEVBQUNJLDhCQUFxQixFQUFDdUMsZ0NBQXVCOzRCQUN4RnRCLGlDQUF3QixFQUFFYyw2QkFBYSxFQUFFRSxtQkFBWTs0QkFDckRGLDZCQUFhOzRCQUNiQyxrQ0FBdUI7NEJBQ3ZCRSxpQkFBVzs0QkFDWHBCLDRCQUFtQjs0QkFDbkIwQix5QkFBbUI7eUJBQ3BCO3dCQUNELE9BQU8sRUFBRTs0QkFDUDlDLG9CQUFjOzRCQUNkQyxrQkFBYTs0QkFDYkMsOEJBQXFCOzRCQUNyQkMsdUJBQWM7NEJBQ2RDLDZCQUFvQjs0QkFDcEJDLHdCQUFlOzRCQUNmQyw4QkFBcUI7NEJBQ3JCQyxzQkFBYTs0QkFDYkMsMEJBQWlCOzRCQUNqQkMsdUJBQWM7NEJBQ2RDLHlCQUFnQjs0QkFDaEJDLDRCQUFtQjs0QkFDbkJDLHdCQUFlOzRCQUNmQyx5QkFBZ0I7NEJBQ2hCQywyQkFBa0I7NEJBQ2xCQywwQkFBaUI7NEJBQ2pCQyxzQkFBYTs0QkFDYkMsdUJBQWM7NEJBQ2RDLHNCQUFhOzRCQUNiQyxzQkFBYTs0QkFDYkMsNEJBQW1COzRCQUNuQkMsMkJBQWtCOzRCQUNsQkMsNkJBQW9COzRCQUNwQkMsaUNBQXdCOzRCQUN4QkMsdUJBQWM7NEJBQ2RDLHdCQUFlOzRCQUNmQyx3QkFBZTs0QkFDZkMseUJBQWdCOzRCQUNoQkMsd0JBQWU7NEJBQ2ZDLDZCQUFvQjs0QkFDcEJDLDBCQUFpQjs0QkFDakJDLHNCQUFhOzRCQUNiQyx1QkFBYzs0QkFDZEMsc0JBQWE7NEJBQ2JDLHlCQUFnQjs0QkFDaEJDLHlCQUFnQjs0QkFDaEJDLHNCQUFhOzRCQUNicEIsc0JBQWE7NEJBQ2JxQiw2QkFBYTs0QkFDYkMsa0NBQXVCOzRCQUN2QkMsbUJBQVk7NEJBQ1pDLGlCQUFXOzRCQUNYckIsc0JBQWEsRUFBQ1osc0JBQWEsRUFBQ1Msc0JBQWEsRUFBQ3lCLHNCQUFhOzRCQUN2RHZCLHNCQUFhLEVBQUNhLHNCQUFhLEVBQUNFLHNCQUFhLEVBQUNHLHNCQUFhOzRCQUN2RGpDLHVCQUFjLEVBQUNNLHVCQUFjLEVBQUNRLHVCQUFjLEVBQUNPLHVCQUFjOzRCQUMzRFEsdUJBQWMsRUFBQzNCLHdCQUFlLEVBQUNxQyx3QkFBZSxFQUFDOUIsd0JBQWU7NEJBQzlEK0Isd0JBQWUsRUFBQ2xCLHdCQUFlLEVBQUNDLHdCQUFlLEVBQUNFLHdCQUFlOzRCQUMvRGYseUJBQWdCLEVBQUNjLHlCQUFnQixFQUFDakIseUJBQWdCLEVBQUN3Qix5QkFBZ0I7NEJBQ25FQSx5QkFBZ0IsRUFBQ0MseUJBQWdCLEVBQUMzQiwwQkFBaUIsRUFBQ08sMEJBQWlCOzRCQUNyRWUsMEJBQWlCLEVBQUNoQiwyQkFBa0IsRUFBQzhCLDJCQUFrQixFQUFDdkIsMkJBQWtCOzRCQUMxRVYsNEJBQW1CLEVBQUNTLDRCQUFtQixFQUFDaEIsNkJBQW9CLEVBQUNrQiw2QkFBb0I7NEJBQ2pGTyw2QkFBb0IsRUFBQzNCLDhCQUFxQixFQUFDSSw4QkFBcUIsRUFBQ3VDLGdDQUF1Qjs0QkFDeEZ0QixpQ0FBd0IsRUFBRWMsNkJBQWEsRUFBRUUsbUJBQVk7NEJBQ3JEbkIsNEJBQW1COzRCQUNuQjBCLHlCQUFtQjt5QkFDcEI7cUJBQ0Y7O29DQTdLRDs7Ozs7OztBQ0FBO1FBT0UsdUJBQ1U7WUFBQSxhQUFRLEdBQVIsUUFBUTtTQUNiOzs7OztRQUVMLDRCQUFJOzs7O1lBQUosVUFBSyxHQUFXO2dCQUFoQixpQkFVQzs7Z0JBVEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUNDLGVBQVUsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztvQkFDekIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ3RCQyxhQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEdBQUEsQ0FBQyxDQUNoQixDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07d0JBQ2QsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7d0JBQ3JCLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUMsQ0FBQztpQkFDTixDQUFDLENBQUM7YUFDSjs7Ozs7O1FBRUQsd0NBQWdCOzs7OztZQUFoQixVQUFpQixPQUFlLEVBQUUsUUFBaUI7Z0JBQ2pELElBQUksQ0FBQyxRQUFRLEVBQUU7O29CQUNiLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzVDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDdkM7cUJBQU07O29CQUNMLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDeEM7YUFDRjs7Ozs7UUFFRCxpQ0FBUzs7OztZQUFULFVBQVUsU0FBYztnQkFDdEIsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFOztvQkFDakQsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDO29CQUM5QixPQUFPLFdBQVcsQ0FBQztpQkFDcEI7cUJBQU07O29CQUNMLElBQU0sT0FBTyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUM7b0JBQ2hDLE9BQU8sT0FBTyxDQUFDO2lCQUNoQjthQUNGOztvQkFyQ0YxRCxlQUFVOzs7Ozt3QkFIVTJELGFBQVE7Ozs0QkFEN0I7Ozs7Ozs7QUNFQTtRQU1FLDJCQUFvQixhQUE0QjtZQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtTQUMvQzs7OztRQUNNLGtDQUFNOzs7O2dCQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7O1FBR3JELHFDQUFTOzs7O2dCQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7UUFHcEQscUNBQVM7Ozs7O3NCQUFFLElBQUksRUFBRSxHQUFHO2dCQUN6QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7b0JBYnpEM0QsZUFBVTs7Ozs7d0JBRkYsYUFBYTs7O2dDQUp0Qjs7O0lDQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUVGLHVCQUEwQixDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLGdCQUFnQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQzs7Ozs7OztBQzFCRCxRQUFhLFdBQVcsR0FBRztRQUN6QixVQUFVLEVBQUUsSUFBSTtRQUNoQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsU0FBUyxFQUFHLG1DQUFtQztRQUMvQyxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsR0FBRztZQUNQLElBQUksRUFBRSxRQUFRO1NBQ2Y7S0FDRixDQUFDOzs7Ozs7QUNYRjtJQU1BLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7O1FBSzlCO1NBQ0M7Ozs7UUFDRCxxQ0FBYzs7O1lBQWQ7Z0JBQ0UsU0FBUTs7Z0JBQ1IsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO29CQUNqQixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGOzs7OztRQUNELHNDQUFlOzs7O1lBQWYsVUFBZ0IsR0FBUTtnQkFDdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3BEOzs7O1FBQ0QseUNBQWtCOzs7WUFBbEI7O2dCQUNFLElBQUksS0FBSyxHQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7O2dCQUMxQyxJQUFNLE9BQU8sSUFBUyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUM7Z0JBQ3hDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBQyxNQUFNLENBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1RDs7OztRQUVELGtDQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjs7OztRQUVELGtDQUFXOzs7WUFBWDtnQkFDRSxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3RJOztvQkEzQkZBLGVBQVU7Ozs7MkJBUlg7Ozs7Ozs7O1FDVW9DNEQsa0NBQUk7UUFFdEMsd0JBQW9CLE9BQW1CLEVBQ3JDLE9BQXVCLEVBQ2YsVUFFQTtZQUpWLFlBTUUsa0JBQU0sT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUN4QjtZQVBtQixhQUFPLEdBQVAsT0FBTyxDQUFZO1lBRTdCLGNBQVEsR0FBUixRQUFRO1lBRVIsa0JBQVksR0FBWixZQUFZO21DQU9MLEtBQUs7O1NBSnJCOzs7Ozs7OztRQVNELG1DQUFVOzs7O1lBQVY7O2dCQUNFLElBQU0sT0FBTyxHQUFHLElBQUlDLGNBQU8sRUFBRSxDQUFDO2dCQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sT0FBTyxDQUFDO2FBQ2hCOzs7Ozs7UUFFRCx1Q0FBYzs7Ozs7WUFBZCxVQUFlLFVBQWdDLEVBQUUsR0FBWTtnQkFBN0QsaUJBYUM7O2dCQVhDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7Z0JBQ2xCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzlCLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUN0QkMsb0JBQVUsQ0FBQyxVQUFDLEtBQUs7b0JBQ2YsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM1QixDQUFDLEVBQ0ZKLGFBQUcsQ0FBQyxVQUFBLEdBQUc7b0JBQ0wsT0FBTyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMzQixDQUFDLENBQ0gsQ0FBQztnQkFDRixPQUFPLE1BQU0sQ0FBQzthQUNmOzs7OztRQUNELGlDQUFROzs7O1lBQVIsVUFBUyxHQUFHO2dCQUNWLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7b0JBQ3JCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ25CO2FBQ0Y7Ozs7OztRQUVELDhCQUFLOzs7OztZQUFMLFVBQU0sR0FBVyxFQUFFLE1BQWdCOztnQkFFakMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDOztnQkFDaEIsSUFBTSxjQUFjLEdBQUcsSUFBSUsscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQU0sR0FBRyxZQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQzVEOzs7Ozs7UUFFRCwrQkFBTTs7Ozs7WUFBTixVQUFPLFFBQWdCLEVBQUUsTUFBWTs7Z0JBQ25DLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQzs7Z0JBQ3JCLElBQU0sY0FBYyxHQUFHLElBQUlBLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFNLElBQUksWUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGNBQWMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzFFOzs7Ozs7UUFFRCw4QkFBSzs7Ozs7WUFBTCxVQUFNLEdBQVcsRUFBRSxNQUFZOztnQkFDN0IsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDOztnQkFDaEIsSUFBTSxjQUFjLEdBQUcsSUFBSUEscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQU0sR0FBRyxZQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDekU7Ozs7Ozs7UUFFRCwrQkFBTTs7Ozs7O1lBQU4sVUFBTyxHQUFXLEVBQUUsTUFBWSxFQUFFLE1BQWdCOztnQkFDaEQsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDOztnQkFDaEIsSUFBTSxjQUFjLEdBQUcsSUFBSUEscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQU0sS0FBSyxZQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDM0U7Ozs7Ozs7UUFFRCxpQ0FBUTs7Ozs7O1lBQVIsVUFBUyxHQUFXLEVBQUUsTUFBVyxFQUFFLE1BQWdCOztnQkFDakQsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDOztnQkFDaEIsSUFBTSxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7O2dCQUNwQyxJQUFNLGNBQWMsR0FBRyxJQUFJQSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRTFFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBTSxNQUFNLFlBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzlFOzs7Ozs7UUFHRCxnQ0FBTzs7Ozs7WUFBUCxVQUFRLEdBQXFCLEVBQUUsT0FBNEI7Z0JBQ3pELE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7aUJBQ3hCO2dCQUVELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQUMsV0FBVyxFQUFFOztvQkFDL0MsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDakQsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztxQkFDL0Q7aUJBQ0Y7Z0JBRUQsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZCLE9BQU8saUJBQU0sT0FBTyxZQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNwQzs7Ozs7UUFFTyxvQ0FBVzs7OztzQkFBQyxPQUEyQjtnQkFDN0MsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO29CQUNuQixPQUFPLEdBQUcsSUFBSUEscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RDtnQkFDRCxPQUFPLE9BQU8sQ0FBQzs7Ozs7O1FBRVYsZ0NBQU87Ozs7c0JBQUMsS0FBVTtnQkFDdkIsUUFBUSxLQUFLLENBQUMsTUFBTTtvQkFDbEIsS0FBSyxHQUFHO3dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFOzRCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7eUJBR2xCO3dCQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUMzQixNQUFNO29CQUNSLEtBQUssR0FBRzt3QkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7d0JBR3pCLE1BQU07b0JBQ1IsS0FBSyxHQUFHO3dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Ozt3QkFHekIsTUFBTTtvQkFDUjt3QkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzt3QkFFekIsTUFBTTtpQkFDVDtnQkFDRCxPQUFPQyxlQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7b0JBdklsQ2hFLGVBQVU7Ozs7O3dCQVB1Q2lFLGlCQUFVO3dCQUFwQ0YscUJBQWM7d0JBREdKLGFBQVE7d0JBS3hDLFlBQVk7Ozs2QkFOckI7TUFVb0NPLFdBQUk7Ozs7OztBQ1Z4Qzs7OztRQWFFLDRCQUFvQixXQUEyQixFQUNyQyxRQUNBLGNBQ0Q7WUFIVyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7WUFDckMsV0FBTSxHQUFOLE1BQU07WUFDTixpQkFBWSxHQUFaLFlBQVk7WUFDYixnQkFBVyxHQUFYLFdBQVc7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkM7Ozs7UUFDRCxpQ0FBSTs7O1lBQUo7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDcEQ7Ozs7O1FBQ0QsaUNBQUk7Ozs7WUFBSixVQUFLLEtBQVM7Z0JBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVEOzs7OztRQUNELG1DQUFNOzs7O1lBQU4sVUFBTyxFQUFFO2dCQUNQLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMzRDs7Ozs7O1FBRUQsa0NBQUs7Ozs7O1lBQUwsVUFBTSxJQUFZLEVBQUUsTUFBc0I7Z0JBQ3hDLFNBQVM7O2dCQUNULElBQUksR0FBRyxDQUFBO2dCQUNQLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDM0MsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzlDO3FCQUFNO29CQUNMLEdBQUcsR0FBRyxJQUFJLENBQUM7aUJBQ1o7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUM3QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQztxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7Ozs7OztRQUVELG1DQUFNOzs7OztZQUFOLFVBQU8sSUFBWSxFQUFFLEtBQVM7Z0JBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzdDO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQy9EO2FBQ0Y7Ozs7OztRQUVELGtDQUFLOzs7OztZQUFMLFVBQU0sSUFBWSxFQUFFLEtBQVM7Z0JBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzlEO2FBQ0Y7Ozs7OztRQUVELHFDQUFROzs7OztZQUFSLFVBQVMsSUFBWSxFQUFFLEVBQVU7Z0JBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzlEO2FBQ0Y7Ozs7OztRQUVELHdDQUFXOzs7OztZQUFYLFVBQVksSUFBSSxFQUFFLE1BQXNCO2dCQUV0QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBRTtpQkFDaEM7O2dCQUVELElBQU0sTUFBTSxHQUFHO29CQUNiLGVBQWUsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQ3RFLENBQUM7O2dCQUNGLElBQU0sV0FBVyxHQUFHLElBQUlDLGdCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7O2dCQUM1QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDOztnQkFDakQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFDaEQsSUFBTSxHQUFHLEdBQUcsSUFBSUMsZ0JBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtvQkFDbEQsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLGNBQWMsRUFBRSxJQUFJO29CQUNwQixZQUFZLEVBQUUsTUFBTTtpQkFDckIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEM7Ozs7O1FBR0QsOENBQWlCOzs7O1lBQWpCLFVBQWtCLE1BQXFCOztnQkFDckMsSUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFFMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO29CQUN4QixRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDN0IsQ0FBQyxDQUFDO2dCQUNILE9BQU8sUUFBUSxDQUFDO2FBQ2pCOzs7OztRQUVPLCtDQUFrQjs7OztzQkFBQyxNQUFxQjs7Z0JBQzlDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7Z0JBQ2YsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztvQkFDeEIsSUFBSSxnQkFBZ0IsRUFBRTt3QkFDcEIsS0FBSyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQzt3QkFDakMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3FCQUMxQjt5QkFBTTt3QkFDTCxLQUFLLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO3FCQUNsQztpQkFDRixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxLQUFLLENBQUM7OztvQkF2R2hCcEUsZUFBVTs7Ozs7d0JBTEYsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1p5RCxlQUFVOzs7aUNBSm5COzs7Ozs7OztRQ01tQ0csaUNBQWE7Ozs7Ozs7OztRQUM5QyxpQ0FBUzs7Ozs7WUFBVCxVQUFVLElBQVMsRUFBRSxJQUFVO2dCQUM3QixJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7O29CQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDckMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7NEJBQ3ZCLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUM1QztxQkFDRjtvQkFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0Y7O29CQWZGUyxTQUFJLFNBQUM7d0JBQ0osSUFBSSxFQUFFLGdCQUFnQjtxQkFDdkI7OzRCQUxEO01BTW1DQyxvQkFBYTs7Ozs7Ozs7OzZCQ0xqQixZQUFZO2tDQUNKLFNBQVMsQ0FBQyxRQUFRLGtCQUFlO3dCQUZ4RTs7Ozs7Ozs7UUNPc0NWLGtDQUFROzs7Ozs7Ozs7UUFDMUMsa0NBQVM7Ozs7O1lBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVTtnQkFDOUIsT0FBTyxpQkFBTSxTQUFTLFlBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuRDs7b0JBTkpTLFNBQUksU0FBQzt3QkFDRixJQUFJLEVBQUUsWUFBWTtxQkFDbkI7OzZCQU5IO01BT3NDRSxlQUFROzs7Ozs7O1FDQ05YLHNDQUFROzs7Ozs7Ozs7UUFDOUMsc0NBQVM7Ozs7O1lBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVTs7Z0JBQzlCLElBQUksUUFBUSxHQUFHLElBQUlXLGVBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckMsT0FBUSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDNUQ7O29CQVBGRixTQUFJLFNBQUM7d0JBQ0osSUFBSSxFQUFFLGdCQUFnQjtxQkFDdkI7O2lDQVBEO01BUXdDRSxlQUFROzs7Ozs7QUNSaEQ7Ozs7b0JBT0M5RCxhQUFRLFNBQUM7d0JBQ04sT0FBTyxFQUFFLENBQUN3QyxtQkFBWSxDQUFDO3dCQUN2QixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFDLGtCQUFrQixDQUFFO3dCQUNqRSxPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFDLGtCQUFrQixDQUFFO3FCQUMvRDs7eUJBWEQ7Ozs7Ozs7QUNBQTtRQWNFLGlDQUFtRCxzQkFBc0I7WUFBdEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFBO1NBQUs7Ozs7UUFDOUUsMENBQVE7OztZQUFSO2FBQ0M7Ozs7O1FBRUQsK0NBQWE7Ozs7WUFBYixVQUFjLEtBQUs7Z0JBQ2pCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7YUFDN0Y7O29CQWhCRmhELGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsbUJBQW1CO3dCQUM3QixpaENBQWlEOztxQkFFbEQ7Ozs7O3dEQU1jSSxXQUFNLFNBQUMsc0JBQXNCOzs7OzRCQUh6Q0MsVUFBSztnQ0FDTEMsY0FBUyxTQUFDLFdBQVc7O3NDQVp4Qjs7Ozs7OztBQ0FBOzs7O29CQUtDRSxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQd0MsbUJBQVk7NEJBQ1oscUJBQXFCOzRCQUNyQixVQUFVO3lCQUNYO3dCQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO3dCQUN0QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDbkMsZUFBZSxFQUFFLENBQUUsdUJBQXVCLENBQUU7cUJBRTdDOzttQ0FmRDs7Ozs7OztBQ0FBO1FBUUksdUJBQW1CLEtBQXVCO1lBQXZCLFVBQUssR0FBTCxLQUFLLENBQWtCO1NBQUk7O29CQU5qRHBELGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsUUFBUTtxQkFDbkI7Ozs7O3dCQUp3QkMscUJBQWdCOzs7OzJCQU10Q1EsVUFBSzs7NEJBTlY7Ozs7Ozs7QUNBQTtRQU1FLDBCQUFvQixLQUFxQixFQUFVLFdBQThCO1lBQTdELFVBQUssR0FBTCxLQUFLLENBQWdCO1lBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1NBQUs7Ozs7O1FBRXRGLDRDQUFpQjs7OztZQUFqQixVQUFtQixhQUFhOztnQkFDOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxrQ0FBa0MsQ0FBQzs7Z0JBQzlFLElBQU0sTUFBTSxHQUFHLGdCQUFnQixHQUFHLGFBQWEsQ0FBQztnQkFDaEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7YUFDdkM7O29CQVJGTixlQUFVOzs7Ozt3QkFGRixjQUFjO3dCQUNkLGlCQUFpQjs7OytCQUgxQjs7Ozs7Ozs7QUNBQSxRQUFhLGdCQUFnQixHQUFHLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDOzs7Ozs7QUNBdEU7UUFVRSw2QkFBb0J3RSxTQUFjLEVBQVUsVUFBNkIsRUFBVSxnQkFBa0M7WUFBakcsV0FBTSxHQUFOQSxTQUFNLENBQVE7WUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFtQjtZQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7U0FBSzs7Ozs7O1FBQzFILHlDQUFXOzs7OztZQUFYLFVBQVksSUFBNEIsRUFDdEMsS0FBMEI7O2dCQUMxQixJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUMzRCxJQUFJOzt3QkFDRixJQUFNLFNBQU8sSUFBUSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUM7O3dCQUN2QyxJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxTQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ25ILElBQUksZ0JBQWdCLEtBQUssV0FBVyxJQUFJLGdCQUFnQixLQUFLLEVBQUUsSUFBSSxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7NEJBQzVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO2dDQUMvRSxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsU0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7NkJBQzVHLENBQUMsQ0FBQzt5QkFDSjtxQkFDRjtvQkFDRCxPQUFPLEdBQUcsRUFBRTs7d0JBRVYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakIsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7aUJBQ0Y7cUJBQU07O29CQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDL0IsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjs7b0JBMUJGeEUsZUFBVTs7Ozs7d0JBUEZ5RSxhQUFNO3dCQUdOLGlCQUFpQjt3QkFDakIsZ0JBQWdCOzs7a0NBTHpCOzs7Ozs7O0FDQUE7Ozs7b0JBb0JDaEUsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUHdDLG1CQUFZOzRCQUNaLHFCQUFxQjs0QkFDckIsVUFBVTs0QkFDVnBCLHNCQUFhOzRCQUNiLG9CQUFvQjt5QkFDckI7d0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUM7d0JBQzlELE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDMUIsU0FBUyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsY0FBYzs0QkFDaEQsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsYUFBYTs0QkFDcEQsbUJBQW1CLEVBQUMsWUFBWSxFQUFDLGdCQUFnQixDQUFDO3FCQUNyRDs7MkJBakNEOzs7Ozs7O0lDR0EsSUFBQTs7O21DQUhBO1FBY0MsQ0FBQTs7Ozs7O0lDWEQsSUFBQTs7OzRCQUhBO1FBWUMsQ0FBQTs7Ozs7O0lDVEQsSUFBQTs7OytCQUhBO1FBYUMsQ0FBQTs7Ozs7O0lDVEQsSUFBQTs7OzJCQUpBO1FBWUMsQ0FBQTs7Ozs7O0lDVEQsSUFBQTs7OzZCQUhBO1FBWUMsQ0FBQTs7Ozs7O0lDUkQsSUFBQTs7O2tDQUpBO1FBWUMsQ0FBQTs7Ozs7O0lDVEQsSUFBQTs7OzZCQUhBO1FBYUMsQ0FBQTs7Ozs7O0FDYkQ7O1FBb0NFLDZCQUFvQixFQUFlO1lBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTswQkFiQyxFQUFFO3dCQUNkLENBQUM7K0JBRVgsQ0FBQzswQkFDdUIsSUFBSTZDLGlCQUFZLEVBQU87U0FTckI7OEJBTDdCLHNDQUFLOzs7O2dCQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7O1FBTXpCLHNDQUFROzs7WUFBUjtnQkFBQSxpQkE4REM7Z0JBN0RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0JBQ2pDLFFBQVEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSTs7d0JBR3RDLEtBQUssb0JBQW9CLENBQUMsSUFBSTs7NEJBQzVCLElBQUksb0JBQW9CLElBQXlCLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUM7NEJBQ2pFLG9CQUFvQixDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7NEJBQ3JDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7NEJBQ3ZDLE1BQU07O3dCQUdSLEtBQUssYUFBYSxDQUFDLElBQUk7OzRCQUNyQixJQUFJLGFBQWEsSUFBa0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQzs0QkFDbkQsYUFBYSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7NEJBQzdCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUNoQyxNQUFNOzt3QkFHUixLQUFLLGdCQUFnQixDQUFDLElBQUk7OzRCQUN4QixJQUFJLGFBQWEsSUFBcUIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQzs0QkFDdEQsYUFBYSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7NEJBQ2hDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUNoQyxNQUFNOzt3QkFHUixLQUFLLFlBQVksQ0FBQyxJQUFJOzs0QkFDcEIsSUFBSSxZQUFZLElBQWlCLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUM7NEJBQ2pELFlBQVksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDOzRCQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDL0IsTUFBTTs7d0JBR1IsS0FBSyxjQUFjLENBQUMsSUFBSTs7NEJBQ3RCLElBQUksY0FBYyxJQUFpQixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDOzRCQUNuRCxjQUFjLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQzs0QkFDL0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ2pDLE1BQU07O3dCQUdSLEtBQUssbUJBQW1CLENBQUMsSUFBSTs7NEJBQzNCLElBQUksYUFBYSxJQUFpQixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDOzRCQUNsRCxhQUFhLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs0QkFDN0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQ2hDLE1BQU07O3dCQUlSLEtBQUssY0FBYyxDQUFDLElBQUk7OzRCQUN4QixJQUFJLGNBQWMsSUFBaUIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQzs0QkFDbkQsY0FBYyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7NEJBQy9CLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNqQyxNQUFNO3dCQUVOOzRCQUNFLE1BQU07cUJBQ1Q7aUJBQ0YsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNsQzs7Ozs7UUFHTSxzQ0FBUTs7OztzQkFBQyxLQUFZO2dCQUMxQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFFbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkM7Ozs7O1FBSUksMkNBQWE7Ozs7OztnQkFDbEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDdkIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQUUsT0FBTzs7b0JBQ3BDLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUM3QixFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQ2hELEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FDOUMsQ0FBQztvQkFDRixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3ZDLENBQUMsQ0FBQztnQkFDSCxPQUFPLEtBQUssQ0FBQzs7Ozs7O1FBR1IsNkNBQWU7Ozs7c0JBQUMsV0FBZ0I7Z0JBQ3JDLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O29CQUMxQixJQUFNLFdBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ3JCLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO3dCQUN2QixXQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDakMsQ0FBQyxDQUFDO29CQUNILE9BQU9DLGdCQUFVLENBQUMsT0FBTyxDQUFDLFdBQVMsQ0FBQyxDQUFDO2lCQUN0QztnQkFDRCxPQUFPLElBQUksQ0FBQzs7Ozs7O1FBR1AsbURBQXFCOzs7O3NCQUFDLFNBQW9CO2dCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLOztvQkFDM0MsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUMzQyxDQUFDLENBQUM7Ozs7OztRQUlMLHNDQUFROzs7O1lBRFIsVUFDUyxLQUFNO2dCQUNiLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzlCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDOUI7YUFDRjs7b0JBL0lGMUUsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLDR0QkFBMkM7O3FCQUU1Qzs7Ozs7d0JBaEIrQjJFLGlCQUFXOzs7OzJCQW1CeEN0RSxVQUFLOzJCQUNMQSxVQUFLOzZCQUNMQSxVQUFLOzJCQUNMQSxVQUFLOzRCQUNMQSxVQUFLOzZCQUVMdUUsV0FBTTsrQkF1SE5DLGlCQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztrQ0FsSjNDOzs7Ozs7O0FDQUE7UUFhRTtTQUFnQjs7OztRQUNoQixvQ0FBUTs7O1lBQVI7YUFDQzs7b0JBWEY3RSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLFdBQVc7d0JBQ3JCLDZPQUF5Qzs7cUJBRTFDOzs7O2dDQVJEOzs7Ozs7O0FDQUE7UUFhRTtTQUFnQjs7OztRQUNoQixxQ0FBUTs7O1lBQVIsZUFBYTs7b0JBVmRBLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsWUFBWTt3QkFDdEIsc0xBQTBDOztxQkFFM0M7Ozs7aUNBUkQ7Ozs7Ozs7QUNBQTtRQWFFO1NBQWdCOzs7O1FBQ2hCLG1DQUFROzs7WUFBUixlQUFhOztvQkFWZEEsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxVQUFVO3dCQUNwQiwra0JBQXdDOztxQkFFekM7Ozs7K0JBUkQ7Ozs7Ozs7QUNBQTtRQWFFO1NBQWdCOzs7O1FBQ2hCLHVDQUFROzs7WUFBUixlQUFhOztvQkFWZEEsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxjQUFjO3dCQUN4QixnTUFBNEM7O3FCQUU3Qzs7OzttQ0FSRDs7Ozs7OztBQ0FBO1FBYUU7U0FBZ0I7Ozs7UUFDaEIsMENBQVE7OztZQUFSLGVBQWE7O29CQVZkQSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjt3QkFDM0IscVdBQStDOztxQkFFaEQ7Ozs7c0NBUkQ7Ozs7Ozs7QUNBQTtRQWFFO1NBQWdCOzs7O1FBQ2hCLHFDQUFROzs7WUFBUixlQUFhOztvQkFWZEEsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxZQUFZO3dCQUN0Qiw0UkFBMEM7O3FCQUUzQzs7OztpQ0FSRDs7Ozs7OztBQ0FBO1FBb0NFLGtDQUNVLElBQ0EsV0FDd0IsSUFBUyxFQUNsQyxRQUNBOEU7WUFKQyxPQUFFLEdBQUYsRUFBRTtZQUNGLGNBQVMsR0FBVCxTQUFTO1lBQ2UsU0FBSSxHQUFKLElBQUksQ0FBSztZQUNsQyxXQUFNLEdBQU4sTUFBTTtZQUNOLFNBQUksR0FBSkEsT0FBSTtvQ0FsQk0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDOzhCQUM3QixJQUFJQywyQkFBa0IsRUFBTzs4QkFDN0IsRUFBRTswQkFDWSxFQUFFOzBCQUVwQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRTtZQWNsRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1NBQ3hDO1FBWEQsc0JBQUksMkNBQUs7OztnQkFBVDtnQkFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3hCOzs7V0FBQTs7OztRQVVELDJDQUFROzs7WUFBUjtnQkFBQSxpQkF5REM7Z0JBeERDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO3dCQUNqQyxRQUFRLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUk7NEJBQ3RDLEtBQUssb0JBQW9CLENBQUMsSUFBSTs7Z0NBQzVCLElBQUksb0JBQW9CLElBQXlCLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0NBQ2pFLG9CQUFvQixDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0NBQ3JDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0NBQ3ZDLE1BQU07OzRCQUVSLEtBQUssYUFBYSxDQUFDLElBQUk7O2dDQUNyQixJQUFJLGFBQWEsSUFBa0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQztnQ0FDbkQsYUFBYSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Z0NBQzdCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dDQUNoQyxNQUFNOzs0QkFHUixLQUFLLGdCQUFnQixDQUFDLElBQUk7O2dDQUN4QixJQUFJLGFBQWEsSUFBcUIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQztnQ0FDdEQsYUFBYSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7Z0NBQ2hDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dDQUNoQyxNQUFNOzs0QkFHUixLQUFLLFlBQVksQ0FBQyxJQUFJOztnQ0FDcEIsSUFBSSxZQUFZLElBQWlCLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0NBQ2pELFlBQVksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2dDQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQ0FDL0IsTUFBTTs7NEJBR1IsS0FBSyxjQUFjLENBQUMsSUFBSTs7Z0NBQ3RCLElBQUksY0FBYyxJQUFpQixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dDQUNuRCxjQUFjLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQ0FDL0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQ2pDLE1BQU07OzRCQUdSLEtBQUssbUJBQW1CLENBQUMsSUFBSTs7Z0NBQzNCLElBQUksYUFBYSxJQUFpQixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dDQUNsRCxhQUFhLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQ0FDN0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0NBQ2hDLE1BQU07OzRCQUlSLEtBQUssY0FBYyxDQUFDLElBQUk7O2dDQUN0QixJQUFJLGNBQWMsSUFBaUIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQztnQ0FDbkQsY0FBYyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0NBQy9CLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dDQUNqQyxNQUFNO3lCQUNUO3FCQUNGLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDbEM7YUFDRjs7OztRQUVELDhDQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3Qjs7Ozs7UUFDRCwrQ0FBWTs7OztZQUFaLFVBQWEsS0FBSztnQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7Ozs7O1FBR0QseUNBQU07OztZQUFOO2dCQUFBLGlCQXVCQzs7Z0JBdEJDLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxFQUFZLENBQUM7Z0JBRWpDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO3dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRzs0QkFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDdkMsQ0FBQyxDQUFDO3FCQUNKO29CQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTt3QkFDdkQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO3FCQUMvQixDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRTt3QkFDcEYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDeEM7b0JBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO3dCQUN6RSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUNsRDtvQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07d0JBQ3ZELEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztxQkFDL0IsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7Ozs7UUFDRCxrREFBZTs7O1lBQWY7YUFDQzs7Ozs7UUFFRCw0Q0FBUzs7OztZQUFULFVBQVUsR0FBRztnQkFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjs7Ozs7UUFFRCxnREFBYTs7O1lBQWI7Z0JBQUEsaUJBV0M7O2dCQVZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ3ZCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO3dCQUFFLE9BQU87O29CQUNwQyxJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FDN0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUNoRCxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQzlDLENBQUM7b0JBQ0YsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUN2QyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDZDs7Ozs7UUFFRCxrREFBZTs7OztZQUFmLFVBQWdCLFdBQWdCO2dCQUM5QixJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztvQkFDMUIsSUFBTSxXQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNyQixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzt3QkFDdkIsV0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ2pDLENBQUMsQ0FBQztvQkFDSCxPQUFPTCxnQkFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFTLENBQUMsQ0FBQztpQkFDdEM7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7YUFDYjs7Ozs7UUFFRCx3REFBcUI7Ozs7WUFBckIsVUFBc0IsU0FBb0I7Z0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7O29CQUMzQyxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzNDLENBQUMsQ0FBQzthQUNKOzs7O1FBRUQsd0NBQUs7OztZQUFMO2dCQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCOztvQkEvSkYxRSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjt3QkFDN0Isa3lGQUFpRDs7cUJBRWxEOzs7Ozt3QkFuQitCMkUsaUJBQVc7d0JBQ2xDSyxxQkFBWTt3REFxQ2hCNUUsV0FBTSxTQUFDNkUsd0JBQWU7d0JBcENsQixpQkFBaUI7d0JBQ2pCLGtCQUFrQjs7O3VDQUozQjs7Ozs7OztBQ0FBO1FBa0JFLGlDQUFtQixNQUFpQjtZQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXOzhCQU52QixJQUFJO1NBTXdCOzs7O1FBRXpDLDBDQUFROzs7WUFBUjtnQkFFRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQy9COzs7OztRQUdELDRDQUFVOzs7WUFBVjtnQkFBQSxpQkFpQkM7Z0JBaEJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ2xCOztnQkFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtvQkFDekQsS0FBSyxFQUFFLE9BQU87O29CQUVkLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFO2lCQUMxSixDQUFDLENBQUM7Z0JBQ0gsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07b0JBQ3RDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTt3QkFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztxQkFDekM7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JCLENBQUMsQ0FBQzthQUNKOztvQkFyQ0ZqRixjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsczlDQUFnRDs7cUJBRWpEOzs7Ozt3QkFOUWtGLGtCQUFTOzs7c0NBSmxCOzs7Ozs7O0FDQUE7SUFXQSxJQUFNLGVBQWUsR0FBRztRQUN0QixLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLFdBQVcsRUFBRSx1QkFBdUI7UUFDcEMsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixNQUFNLEVBQUUsdUJBQXVCO0tBQ2hDLENBQUM7O1FBUUEsK0JBQ1UsVUFDQTtZQURBLGFBQVEsR0FBUixRQUFRO1lBQ1IsY0FBUyxHQUFULFNBQVM7U0FDZDs7OztRQUNMLHdDQUFROzs7WUFBUjtnQkFDRSxTQUFTOztnQkFDVCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUNuRCxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDakMsQ0FBQztnQkFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDL0M7O29CQW5CRnRGLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsZ0JBQWdCO3FCQUMzQjs7Ozs7d0JBdEJRTyw2QkFBd0I7d0JBQTBDTixxQkFBZ0I7Ozs7NEJBd0J4RlEsVUFBSzs0QkFDTEEsVUFBSzs7b0NBekJSOzs7Ozs7O0FDQUE7Ozs7b0JBTUNHLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1B3QyxtQkFBWTs0QkFDWixxQkFBcUI7NEJBQ3JCLFVBQVU7eUJBQ1g7d0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pDLE9BQU8sRUFBQyxDQUFDLGlCQUFpQixDQUFDO3dCQUMzQixlQUFlLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQztxQkFDcEM7OzZCQWZEOzs7Ozs7O0FDQUE7Ozs7b0JBS0N4QyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQd0MsbUJBQVk7NEJBQ1oscUJBQXFCOzRCQUNyQixVQUFVO3lCQUNYO3dCQUNELFlBQVksRUFBRSxDQUFDLGtCQUFrQixDQUFDO3dCQUNsQyxPQUFPLEVBQUMsQ0FBQyxrQkFBa0IsQ0FBQzt3QkFDNUIsZUFBZSxFQUFDLENBQUMsa0JBQWtCLENBQUM7cUJBQ3JDOzs4QkFkRDs7Ozs7OztBQ0FBOzs7O29CQUtDeEMsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUHdDLG1CQUFZOzRCQUNaLHFCQUFxQjs0QkFDckIsVUFBVTt5QkFDWDt3QkFDRCxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDaEMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7d0JBQzNCLGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO3FCQUNwQzs7NEJBZEQ7Ozs7Ozs7QUNBQTs7OztvQkFLQ3hDLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1B3QyxtQkFBWTs0QkFDWixxQkFBcUI7eUJBQ3RCO3dCQUNELE9BQU8sRUFBQyxDQUFDLGtCQUFrQixDQUFDO3dCQUM1QixlQUFlLEVBQUMsQ0FBQyxrQkFBa0IsQ0FBQzt3QkFDcEMsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7cUJBQ25DOzs4QkFiRDs7Ozs7OztBQ0FBOzs7O29CQUtDeEMsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUHdDLG1CQUFZOzRCQUNaLHFCQUFxQjt5QkFDdEI7d0JBQ0QsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO3dCQUNsQyxlQUFlLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDM0M7O21DQWJEOzs7Ozs7O0FDQUE7Ozs7b0JBS0N4QyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQd0MsbUJBQVk7NEJBQ1oscUJBQXFCOzRCQUNyQixVQUFVO3lCQUNYO3dCQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO3dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDL0IsZUFBZSxFQUFDLENBQUMsb0JBQW9CLENBQUM7cUJBQ3ZDOztnQ0FkRDs7Ozs7OztBQ0FBO0lBV0EsSUFBTW1DLGlCQUFlLEdBQUc7UUFDdEIsS0FBSyxFQUFFLGlCQUFpQjtRQUN4QixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsTUFBTSxFQUFFLHVCQUF1QjtLQUNoQyxDQUFDOztRQVFBLHFDQUNVLFVBQ0E7WUFEQSxhQUFRLEdBQVIsUUFBUTtZQUNSLGNBQVMsR0FBVCxTQUFTO1NBQ2Q7Ozs7UUFDTCw4Q0FBUTs7O1lBQVI7Z0JBQ0UsU0FBUzs7Z0JBQ1QsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FDbkRBLGlCQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDakMsQ0FBQztnQkFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDL0M7O29CQW5CRnZGLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsc0JBQXNCO3FCQUNqQzs7Ozs7d0JBdEJRTyw2QkFBd0I7d0JBQTBDTixxQkFBZ0I7Ozs7NEJBd0J4RlEsVUFBSzs0QkFDTEEsVUFBSzs7MENBekJSOzs7Ozs7O0FDQUEsYUFpQnlDLEVBQUUsT0FDUyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7Ozs7O29CQVh0RUcsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUHdDLG1CQUFZOzRCQUNaLHFCQUFxQjt5QkFDdEI7d0JBQ0QsWUFBWSxFQUFFLENBQUMsd0JBQXdCLEVBQUMsMkJBQTJCLENBQUM7d0JBQ3BFLE9BQU8sRUFBRSxDQUFDb0MsMkJBQXNCLEVBQUVDLHFCQUFnQixDQUFDO3dCQUNuRCxPQUFPLEVBQUMsQ0FBQyx3QkFBd0IsQ0FBQzt3QkFDbEMsZUFBZSxFQUFDLENBQUMsd0JBQXdCLENBQUM7d0JBQzFDLFNBQVMsRUFBRTs0QkFDVCxFQUFDLE9BQU8sRUFBRUosd0JBQWUsRUFBRSxRQUFRLElBQUksRUFBQzs0QkFDeEMsRUFBQyxPQUFPLEVBQUVLLG1DQUEwQixFQUFFLFFBQVEsSUFBcUIsRUFBQzt5QkFDckU7cUJBQ0Y7O29DQXBCRDs7Ozs7OztBQ0FBOzs7O29CQU9DOUUsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUHdDLG1CQUFZOzRCQUNaLHFCQUFxQjs0QkFDckIscUJBQXFCO3lCQUN0Qjt3QkFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDdkMsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ2xDLGVBQWUsRUFBQyxDQUFDLHVCQUF1QixDQUFDO3FCQUMxQzs7bUNBaEJEOzs7Ozs7O0FDQUE7Ozs7b0JBZ0JDeEMsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUHdDLG1CQUFZOzRCQUNaLHFCQUFxQjs0QkFDckJ1QyxxQkFBZ0I7NEJBQ2hCQyxpQkFBVTs0QkFDVixjQUFjOzRCQUNkLGVBQWU7NEJBQ2YsYUFBYTs0QkFDYixlQUFlOzRCQUNmLG9CQUFvQjs0QkFDcEIsaUJBQWlCOzRCQUNqQixvQkFBb0I7eUJBQ3JCO3dCQUNELFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO3dCQUN6RCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDL0IsZUFBZSxFQUFFLENBQUUsbUJBQW1CLENBQUM7cUJBQ3hDOzsrQkFqQ0Q7Ozs7Ozs7SUNHQSxJQUFBO1FBS0ksbUJBQVksSUFBWSxFQUFFLElBQVksRUFBRSxNQUFlLEVBQUUsRUFBVztZQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNsQjt3QkFiTDtRQWVDLENBQUE7Ozs7Ozs7O1FDZEcsU0FBVTtRQUNWLFlBQWE7UUFDYixTQUFVO1FBQ1YsT0FBUTtRQUNSLFNBQVM7UUFDVCxVQUFVOztrQ0FMVixNQUFNO2tDQUNOLFNBQVM7a0NBQ1QsTUFBTTtrQ0FDTixJQUFJO2tDQUNKLE1BQU07a0NBQ04sT0FBTzs7Ozs7O0FDTlg7Ozs7UUF3REUsOEJBQW1CLGNBQXNDLEVBQVMsWUFBbUMsRUFBUSxNQUEwQjtZQUF2SSxpQkFjQztZQWRrQixtQkFBYyxHQUFkLGNBQWMsQ0FBd0I7WUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBdUI7WUFBUSxXQUFNLEdBQU4sTUFBTSxDQUFvQjsyQ0F6Q2xILEVBQU87OEJBQ1AsRUFBRTsyQkFFZ0IsSUFBSWYsaUJBQVksRUFBRTs4QkFDZixJQUFJQSxpQkFBWSxFQUFFO2dDQUNoQixJQUFJQSxpQkFBWSxFQUFFOzJCQTRCdkMsRUFBRTs4QkFDWixJQUFJOzhCQUNKLElBQUk7K0JBQ0gsSUFBSTtnQ0FDSCxJQUFJOzZCQUNQLElBQUk7Z0NBQ0QsSUFBSTtZQUdqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBR3BGLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hFLEtBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDs7OztRQS9DRCxtQ0FBSTs7O1lBQUo7Z0JBQUEsaUJBSUM7Z0JBSEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07b0JBQ2pELEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM5QixDQUFDLENBQUM7YUFDSjs7OztRQUNELHFDQUFNOzs7WUFBTjtnQkFBQSxpQkFJQztnQkFIQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07b0JBQ3ZDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMzQixDQUFDLENBQUM7YUFDSjs7Ozs7UUFDRCxxQ0FBTTs7OztZQUFOLFVBQU8sRUFBRTtnQkFBVCxpQkFJQztnQkFIQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO29CQUMzQyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDaEMsQ0FBQyxDQUFDO2FBQ0o7Ozs7UUFDRCxvQ0FBSzs7O1lBQUw7Z0JBQ0MsSUFBSSxDQUFDLEtBQUsscUJBQUcsRUFBTyxDQUFBLENBQUM7YUFDckI7Ozs7UUFDRCxrQ0FBRzs7O1lBQUg7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQ3BEOzs7O1FBQ0QsbUNBQUk7OztZQUFKO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQzthQUNyRDs7b0JBdENGekUsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxjQUFjO3dCQUN4QixpK0JBQTRDOztxQkFFN0M7Ozs7O3dCQVJRLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUVsQixpQkFBaUI7Ozs7NEJBUXZCSyxVQUFLOzhCQUdMdUUsV0FBTTtpQ0FDTkEsV0FBTTttQ0FDTkEsV0FBTTtpQ0FDTnZFLFVBQUs7O21DQXJCUjs7Ozs7OztBQ0FBOzs7O29CQVNDRyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQd0MsbUJBQVk7NEJBQ1oscUJBQXFCOzRCQUNyQixVQUFVO3lCQUNYO3dCQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO3dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDL0IsU0FBUyxFQUFDLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQztxQkFDakY7O2dDQWxCRDs7Ozs7OztBQ0lBLFFBQUE7Ozt3QkFKQTtRQVFDOzs7Ozs7OztRQ1BHLFFBQVM7UUFDVCxRQUFTO1FBQ1QsU0FBVTtRQUNWLFdBQVk7O2tDQUhaLEtBQUs7a0NBQ0wsS0FBSztrQ0FDTCxNQUFNO2tDQUNOLFFBQVE7Ozs7OztBQ0paO0lBR0EsSUFBTSxJQUFJLEdBQUc7S0FDWixDQUFDOztBQUVGLFFBQWEsbUNBQW1DLEdBQVE7UUFDcEQsT0FBTyxFQUFFeUMsdUJBQWlCO1FBQzFCLFdBQVcsRUFBRUMsZUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsR0FBQSxDQUFDO1FBQ3JELEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQzs7UUFpREE7K0JBdkMrQixrQkFBa0I7aUNBR2YsS0FBSzs0QkFDSyxJQUFJakIsaUJBQVksRUFBRTtxQ0FJdEIsSUFBSTtvQ0FDQyxJQUFJO1NBOEJqQztRQTVCaEIsc0JBQUksbURBQWU7OztnQkFBbkI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3ZCOzs7O2dCQUVELFVBQW9CLENBQU87Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzFCO2FBQ0Y7OztXQVBBOzs7O1FBU0QsdUNBQU07OztZQUFOO2dCQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCOzs7OztRQUVELDJDQUFVOzs7O1lBQVYsVUFBVyxLQUFVO2dCQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCOzs7OztRQUVELGlEQUFnQjs7OztZQUFoQixVQUFpQixFQUFPO2dCQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO2FBQzVCOzs7OztRQUVELGtEQUFpQjs7OztZQUFqQixVQUFrQixFQUFPO2dCQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO2FBQy9COzs7O1FBSUQseUNBQVE7OztZQUFSO2FBQ0M7Ozs7UUFFRCw2Q0FBWTs7O1lBQVo7Z0JBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7Ozs7UUFFRCxzQ0FBSzs7O1lBQUw7Z0JBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCOztvQkEzREZ6RSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjt3QkFDMUIseWxCQUE4Qzt3QkFFOUMsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7O3FCQUNqRDs7Ozs7a0NBR0VLLFVBQUs7OEJBQ0xBLFVBQUs7OEJBQ0xBLFVBQUs7b0NBQ0xBLFVBQUs7K0JBQ0x1RSxXQUFNOztxQ0F4QlQ7Ozs7Ozs7QUNDQTs7OztvQkFLQ3BFLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsQ0FBQ3dDLG1CQUFZLEVBQUkscUJBQXFCLENBQUM7d0JBQ2hELFNBQVMsRUFBRSxDQUFDc0IsZUFBUSxDQUFDO3dCQUNyQixZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7d0JBQ2pDLE9BQU8sRUFBRSxDQUFDYywyQkFBc0IsRUFBRUMscUJBQWdCLENBQUM7cUJBQ3BEOztrQ0FaRDs7Ozs7OztBQ0FBO1FBV0U7Z0NBRDRDLElBQUlaLGlCQUFZLEVBQUU7U0FDN0M7Ozs7UUFJakIseUNBQVE7OztZQUFSO2FBQ0M7Ozs7O1FBQ0QsK0NBQWM7Ozs7WUFBZCxVQUFlLEtBQUs7Z0JBQ2xCLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTs7b0JBQ3RCLElBQUksTUFBTSxHQUFTLEtBQUssQ0FBQztvQkFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRSxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNyQzthQUVGOztvQkF0QkZ6RSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjt3QkFDM0IsMGNBQStDOztxQkFFaEQ7Ozs7O2tDQUdFSyxVQUFLO21DQUNMdUUsV0FBTTs7cUNBVlQ7Ozs7Ozs7QUNBQTs7OztvQkFLQ3BFLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1B3QyxtQkFBWTs0QkFDWixxQkFBcUI7eUJBQ3RCO3dCQUNELFlBQVksRUFBRSxDQUFDLHNCQUFzQixDQUFDO3dCQUN0QyxPQUFPLEVBQUMsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDaEMsZUFBZSxFQUFHLENBQUMsc0JBQXNCLENBQUM7d0JBQzFDLE9BQU8sRUFBRSxDQUFDb0MsMkJBQXNCLEVBQUVDLHFCQUFnQixDQUFDO3FCQUNwRDs7a0NBZEQ7Ozs7Ozs7QUNBQTtRQWlCRTt5QkFGc0IsTUFBTTswQkFDTCxPQUFPO1NBRTdCOzs7O1FBQ0Qsc0NBQVE7OztZQUFSO2dCQUVFLElBQUksQ0FBQyxjQUFjLEdBQUc7b0JBQ3BCO3dCQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3dCQUNuQixpQkFBaUIsRUFBRSxDQUFDO3dCQUNwQixjQUFjLEVBQUVNLDhCQUFtQixDQUFDLEtBQUs7cUJBQzFDOztvQkFFRDt3QkFDRSxVQUFVLEVBQUUsR0FBRzt3QkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7d0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTt3QkFDbkIsWUFBWSxFQUFFLEVBQUU7d0JBQ2hCLGlCQUFpQixFQUFFLEVBQUU7d0JBQ3JCLGdCQUFnQixFQUFFLEVBQUU7d0JBQ3BCLGVBQWUsRUFBRSxFQUFFO3FCQUNwQjtvQkFDRDt3QkFDRSxVQUFVLEVBQUUsR0FBRzt3QkFDZixPQUFPLEVBQUUsS0FBSztxQkFDZjtpQkFDRixDQUFDO2FBQ0g7O29CQXJDRjNGLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsaUdBQTJDOztxQkFFNUM7Ozs7O29DQUlFSyxVQUFLOzRCQUNMQSxVQUFLOzZCQUNMQSxVQUFLOztrQ0FoQlI7Ozs7Ozs7QUNBQTs7OztvQkFPQ0csYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDd0MsbUJBQVksRUFBRSxxQkFBcUIsRUFBRTRDLDJCQUFnQixDQUFDO3dCQUNoRSxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7d0JBQzlCLGVBQWUsRUFBRSxDQUFDLG1CQUFtQixDQUFDO3FCQUN2Qzs7K0JBWkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=