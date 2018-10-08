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
                        styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}.form{margin-left:10px;border:2px solid #d3d3d3;width:600px;padding-left:5px;margin-top:10px}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}pxt-input{width:100%;height:100%}"]
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
                        template: "<mat-card>\n    <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\" (window:resize)=\"onResize($event)\">\n            <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n                <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n                    <ng-container class=\"pxt-style\" dynamicField [field]=\"field\"  [group]=\"form\">\n                    </ng-container>\n                </mat-grid-tile>\n                <mat-grid-tile class=\"mat-grid-tile-content\">\n                </mat-grid-tile>\n            </mat-grid-list>\n        </form>\n    </div>\n    <div *ngIf=\"!auto\">\n        <ng-content></ng-content>\n    </div>\n</mat-card>",
                        styles: [".pxt-content-body{padding:10px}.pxt-content-body mat-card{margin:5px;border-top:4px solid;border-radius:4px;border-bottom:4px solid}mat-form-field,pxt-datepicker,select-filial,td{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}.div-imagem-cardapio{margin-bottom:2%;text-align:center}.pxt-component-tag{width:100%}.pxt-style{width:100%;height:100%}"]
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
                        styles: [":host{width:100%;height:100%}"]
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
                        styles: [":host{width:100%;height:100%}"]
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
                        styles: [":host{width:100%;height:100%}"]
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
                        styles: [":host{width:100%;height:100%}"]
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
                        styles: [":host{width:100%;height:100%}"]
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
                        styles: ["mat-form-field{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}:host{width:100%;height:100%}"]
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
    var PxtDialogComponent = (function () {
        function PxtDialogComponent(fb, dialogRef, data) {
            this.fb = fb;
            this.dialogRef = dialogRef;
            this.data = data;
        }
        /**
         * @return {?}
         */
        PxtDialogComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @return {?}
         */
        PxtDialogComponent.prototype.cancelation = /**
         * @return {?}
         */
            function () {
                this.dialogRef.close(false);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        PxtDialogComponent.prototype.confirmation = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.dialogRef.close(true);
            };
        PxtDialogComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-pxt-dialog',
                        template: "<h2 mat-dialog-title>{{data.titleDialog}}</h2>\n\n<mat-dialog-content>\n      {{data.contentDialog}}  \n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-button>Confirmar</button>\n    <button mat-button mat-dialog-close>Cancelar</button>\n</mat-dialog-actions>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtDialogComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: material.MatDialogRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] }] }
            ];
        };
        PxtDialogComponent.propDecorators = {
            placeholder: [{ type: core.Input }]
        };
        return PxtDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtDialogModule = (function () {
        function PxtDialogModule() {
        }
        PxtDialogModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule
                        ],
                        declarations: [PxtDialogComponent],
                        exports: [PxtDialogComponent],
                        entryComponents: [PxtDialogComponent]
                    },] }
        ];
        return PxtDialogModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtFilterComponent = (function () {
        function PxtFilterComponent(fb, dialogRef, data) {
            this.fb = fb;
            this.dialogRef = dialogRef;
            this.data = data;
        }
        /**
         * @return {?}
         */
        PxtFilterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        PxtFilterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-pxt-filter',
                        template: "<h2 mat-dialog-title>{{data.titleDialog}}</h2>\n\n<mat-dialog-content>\n\n  <mat-form-field>\n    <ng-content>\n\n    </ng-content>\n  </mat-form-field>\n\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button>Confirmar</button>\n  <button mat-button>Cancelar</button>\n</mat-dialog-actions>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        PxtFilterComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: material.MatDialogRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] }] }
            ];
        };
        return PxtFilterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PxtFilterModule = (function () {
        function PxtFilterModule() {
        }
        PxtFilterModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule
                        ],
                        declarations: [PxtFilterComponent],
                        exports: [PxtFilterComponent],
                        entryComponents: [PxtFilterComponent]
                    },] }
        ];
        return PxtFilterModule;
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
    var pxtfilterCustomField$1 = (function () {
        function pxtfilterCustomField() {
        }
        return pxtfilterCustomField;
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
    exports.PxtDatePickerModule = PxtDatePickerModule;
    exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR;
    exports.PxtDatepickerComponent = PxtDatepickerComponent;
    exports.PxtDialogModule = PxtDialogModule;
    exports.PxtDialogComponent = PxtDialogComponent;
    exports.PxtFilterModule = PxtFilterModule;
    exports.PxtFilterComponent = PxtFilterComponent;
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
    exports.PxtUploadFileModule = PxtUploadFileModule;
    exports.PxtGalleryModule = PxtGalleryModule;
    exports.PxtGalleryComponent = PxtGalleryComponent;
    exports.pxtCheckboxField = pxtCheckboxField;
    exports.pxtfilterCustomField = pxtfilterCustomField$1;
    exports.pxtDateField = pxtDateField;
    exports.pxtFilterField = pxtFilterField;
    exports.pxtInputField = pxtInputField;
    exports.pxtRadioButtonField = pxtRadioButtonField;
    exports.pxtSelectField = pxtSelectField;
    exports.ɵg = HashDirective;
    exports.ɵz = DynamicFieldDirective;
    exports.ɵx = DynamicFieldDirectiveDialog;
    exports.ɵf = PxtContentBody;
    exports.ɵe = PxtAppMenuItemComponent;
    exports.ɵd = PxtAppMenuItemModule;
    exports.ɵw = PxtDialogFilterComponent;
    exports.ɵv = PxtDialogFilterModule;
    exports.ɵba = PxtUploadFileComponent;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlLnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3Rva2VuLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy91cHBlcmNhc2UtZmlyc3QudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3V0aWwvY29uc3RhbnRzLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLWZvcm1hdC5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLXRpbWUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3BpcGVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9IYXNoRGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dENvbmZpZ3VyYXRpb24udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWx0ZXItY3VzdG9tLmZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWlucHV0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWRhdGUtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LXJhZGlvYnV0dG9uLWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LXNlbGVjdC1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtY29udGVudC9weHQtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9tb2RlbC9weHQtc3VibWVudXMubW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL2VudW0vb3B0aW9uLXN1Ym1lbnUuZW51bS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGF0ZXBpY2tlci9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZmlsdGVyL3B4dC1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXIvcHh0LWZpbHRlci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZGVscy9weHQtZmllbGRzLW1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9lbnVtL3B4dC1lbnVtLXRhZy1odG1sLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC11cGxvYWQtZmlsZS9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC11cGxvYWQtZmlsZS9weHQtdXBsb2FkLWZpbGUubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZ2FsbGVyeS9weHQtZ2FsbGVyeS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3VibWVudXNJdGVuczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnN1Ym1lbnVzSXRlbnMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRDb21wb25lbnRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9sb2FkQ29tcG9uZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldFVzZXJMb2dnZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VyTG9nZ2VkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0VXNlckxvZ2dlZC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRJbmZvSW5pdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9Jbml0aWFsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRJbmZvSW5pdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZXRTdWJtZW51cyhyb3V0ZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VibWVudXNJdGVucy5uZXh0KHJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbEluZm8oaW5mb0luaXRpYWwpIHtcclxuICAgICAgICB0aGlzLl9zZXRJbmZvSW5pdC5uZXh0KGluZm9Jbml0aWFsKVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50Lm5leHQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NldFVzZXJMb2dnZWQubmV4dCh1c2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHh0QXBwIH0gZnJvbSAnLi9weHQtYXBwJztcbmltcG9ydCB7IFB4dEFwcE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9weHQtYXBwLm1vZGVsJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdE1lbnUsIE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFNhZmVIdG1sLCBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC5jb21wb25lbnQuc2NzcyddXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50IHtcblxuICAvL1Byb3BlcnRpZXNcbiAgcm91dGVzOiBhbnlbXSA9IFtdO1xuICBncm91cHM6IGFueVtdID0gW107XG4gIG1lbnVzOiBhbnlbXSA9IFtdO1xuICBzeXN0ZW06IFN0cmluZyA9IFwiU1lTVEVNIE5BTUVcIlxuICB1cmxJbWc6IHN0cmluZyA9ICdodHRwOi8vaW1hZ2Vuc2Rzdi5wZWl4b3RvLmNvbS5ici9hdXRoL21pbmlfbG9nby5wbmcnO1xuICBtZW51U2VsZWN0ZWQgPSBcIlwiO1xuICB1c3VlckxvZ2dlZCA9IFwiTG9vZ2dlZCB1c2VyXCI7XG4gIG1lbnVzSHRtbDogU2FmZUh0bWw7XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgX21vYmlsZVF1ZXJ5TGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF0TWVudTogTWF0TWVudTtcbiAgQFZpZXdDaGlsZCgnbWVudXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgc3ViQ29udGFpbmVyMTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnVUcmlnZ2VyJywgeyByZWFkOiBNYXRNZW51VHJpZ2dlciB9KSBjb250ZXh0TWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuICBtZW51c1JlY2VpdmVkIDogYW55W107XG4gIFxuICAvL0NvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBtZWRpYTogTWVkaWFNYXRjaGVyLFxuICAgIHB1YmxpYyBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMubW9iaWxlUXVlcnkgPSBtZWRpYS5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA2MDBweCknKTtcbiAgICB0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyID0gKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubW9iaWxlUXVlcnkuYWRkTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgdGhpcy5yZXN1bHQgPSBweHRBcHBDb21wb25lbnRTZXJ2aWNlLmluZm9Jbml0aWFsLnN1YnNjcmliZShpbmZvSW5pdGlhbCA9PiB7XG4gICAgICBpZiAoaW5mb0luaXRpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudXN1ZXJMb2dnZWQgPSBpbmZvSW5pdGlhbC51c2VyTG9nZ2VkO1xuICAgICAgICB0aGlzLnN5c3RlbSA9IGluZm9Jbml0aWFsLnN5c3RlbTtcbiAgICAgICAgdGhpcy5tZW51c1JlY2VpdmVkID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLm1lbnVzID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLnByZXBhcmVNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpYmVDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubW9iaWxlUXVlcnkucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIC8vIEluY2x1ZGUgb2YgY29tcG9uZW50cyBpbiB0aGUgYXBwbGljYXRpb24gYm9keVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnksIGFkSG9zdCkge1xuICAgIHRoaXMubWVudVNlbGVjdGVkID0gcm91dGUubWVudVRleHQ7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlLm1lbnVTb3VyY2U7XG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShhZEl0ZW0uY29tcG9uZW50KTtcbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IGFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZpY2UgcmVzcG9uc2libGUgZm9yIGluY2x1ZGluZyBjb21wb25lbnRzIGluIHRoZSBib2R5IG9mIHRoZSBhcHBsaWNhdGlvblxuICBzdWJzY3JpYmVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnRPYnNlcnZhYmxlLnN1YnNjcmliZShjb21wb25lbnRPYmogPT4ge1xuICAgICAgdmFyIGFycmF5QXV4ID0gdGhpcy5tZW51c1JlY2VpdmVkLmZpbHRlcih4PT54Lm1lbnVTb3VyY2UgIT0gdW5kZWZpbmVkICYmIHgubWVudVNvdXJjZS5jb21wb25lbnQgPT09IGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgY29uc29sZS5sb2coYXJyYXlBdXgpO1xuICAgICAgaWYoYXJyYXlBdXgubGVuZ3RoID09IDEpe1xuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IGFycmF5QXV4WzBdLm1lbnVUZXh0O1xuICAgICAgfVxuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRPYmouY29tcG9uZW50KTtcbiAgICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5hZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICg8QWRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhID0gY29tcG9uZW50T2JqLmRhdGE7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXNwb25zaWJsZSBmb3IgY2FsbCBtZXRob2QgXCJsb2FkY29tcG9uZW50cygpXCIgaW5mb3JtaW5nIHBhcmFtZXRlcnNcbiAgc2VsZWN0SXRlbU1lbnUobmF2KSB7XG4gICAgdGhpcy5sb2FkQ29tcG9uZW50KG5hdiwgdGhpcy5hZEhvc3QpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBwcmVwYXJpbmcgYXBwbGljYXRpb24gbWVudXM7XG4gIHByZXBhcmVNZW51KCkge1xuICAgIGxldCBhcnJheUF1eDogYW55W107XG4gICAgYXJyYXlBdXggPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJncm91cFwiICYmIHgubWVudVBhcmVudCA9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhHcm91cCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhJdGVtID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiaXRlbVwiICYmIHgubWVudVBhcmVudCAhPT0gXCJcIik7XG5cbiAgICAvL2FkZCBpdGVucyBpbiBncm91cHNcbiAgICBhcnJheUF1eEl0ZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4R3JvdXAuZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSlcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy9hZGQgZ3JvdXBzIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4R3JvdXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4LmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLm1lbnVzID0gYXJyYXlBdXg7XG4gIH1cbn1cbiIsImltcG9ydCAnLi8uLi8uLi8uLi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7Q2RrVGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0Nka1RyZWVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICBNYXRCYWRnZU1vZHVsZSxcbiAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSxcbiAgTWF0Q2hpcHNNb2R1bGUsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gIE1hdERpYWxvZ01vZHVsZSxcbiAgTWF0RGl2aWRlck1vZHVsZSxcbiAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdExpc3RNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0UmFkaW9Nb2R1bGUsXG4gIE1hdFJpcHBsZU1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTaWRlbmF2TW9kdWxlLFxuICBNYXRTbGlkZXJNb2R1bGUsXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0U3RlcHBlck1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRhYnNNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdFRvb2x0aXBNb2R1bGUsXG4gIE1hdFRyZWVNb2R1bGUsXG4gIE1hdExpbmVNb2R1bGUsXG4gIE1hdENvbW1vbk1vZHVsZSxcbiAgTWF0T3B0aW9uTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICBcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7cGxhdGZvcm1Ccm93c2VyRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsTWF0Q2FyZE1vZHVsZSxNYXRJY29uTW9kdWxlLE1hdExpbmVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxNYXRTb3J0TW9kdWxlLE1hdFRhYnNNb2R1bGUsTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxNYXRDaGlwc01vZHVsZSxNYXRJbnB1dE1vZHVsZSxNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxNYXRCdXR0b25Nb2R1bGUsTWF0Q29tbW9uTW9kdWxlLE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsTWF0UmlwcGxlTW9kdWxlLE1hdFNlbGVjdE1vZHVsZSxNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxNYXRTaWRlbmF2TW9kdWxlLE1hdFN0ZXBwZXJNb2R1bGUsTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLE1hdFRvb2x0aXBNb2R1bGUsTWF0Q2hlY2tib3hNb2R1bGUsTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsTWF0RXhwYW5zaW9uTW9kdWxlLE1hdEZvcm1GaWVsZE1vZHVsZSxNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxNYXROYXRpdmVEYXRlTW9kdWxlLE1hdEJvdHRvbVNoZWV0TW9kdWxlLE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxNYXRCdXR0b25Ub2dnbGVNb2R1bGUsTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBjb25maWc6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgbG9hZCh1cmw6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5qZWN0SHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGluamVjdEh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgICBtYXAocmVzID0+IHJlcylcclxuICAgICAgKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWd1cmF0aW9uKGVsZW1lbnQ6IHN0cmluZywgZGF0YUxpc3Q/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZGF0YUxpc3QpIHtcclxuICAgICAgY29uc3QgdXJsV2l0aEVsZW1lbnQgPSB0aGlzLmNvbmZpZ1tlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhEYXRhTGlzdCA9IHRoaXMuY29uZmlnW2RhdGFMaXN0XVtlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhEYXRhTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2ZXJpZnlVcmwodHlwZU1vZGVsOiBhbnkpIHtcclxuICAgIGlmICh0eXBlTW9kZWwuaW5jbHVkZXMoJy8nLCB0eXBlTW9kZWwubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgY29uc3QgdHlwZVJlbGVhc2UgPSB0eXBlTW9kZWw7XHJcbiAgICAgIHJldHVybiB0eXBlUmVsZWFzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlTW9kZWwgKyAnLyc7XHJcbiAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEFwaVVybCAobmFtZSwgdXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24odXJsLCBuYW1lKTtcclxuICB9XHJcbn0iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIlxuZXhwb3J0IGNvbnN0IGVudmlyb25tZW50ID0ge1xuICBwcm9kdWN0aW9uOiB0cnVlLFxuICBlbnZOYW1lOiAnZGV2JyxcbiAgdmVyc2lvbjogJzAuMC4xJyxcbiAgQ09ORklHX0ZJTEU6ICdhc3NldHMvY29uZmlnL2Vudi5qc29uJyxcbiAgZXNiQXBpUHh0IDogXCJodHRwOi8vZXNiZHN2LnBlaXhvdG8uY29tLmJyL3NnZS9cIixcbiAgc3lzdGVtOiB7XG4gICAgaWQ6IDEwOCxcbiAgICBwcmV4OiBcIlBPUkNSUFwiXG4gIH1cbn07XG5cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cCwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcblxudmFyIHN5c3RlbSA9IGVudmlyb25tZW50LnN5c3RlbTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgZGVidWdnZXJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICB9XG4gIHNldFRva2VuU3RvcmFnZShyZXM6IGFueSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICB9XG4gIHJlbW92ZVRva2VuU3RvcmFnZSgpIHtcbiAgICB2YXIgdG9rZW4gPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICBjb25zdCBkZWNvZGVkID0gPGFueT4gand0X2RlY29kZSh0b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3lzdGVtLmlkK3N5c3RlbS5wcmV4K2RlY29kZWQuc3ViKTtcbiAgfVxuICBcbiAgZGVsZXRlVG9rZW4oKSB7XG4gICAgdGhpcy5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgfVxuXG4gIHRva2VuRXhpc3RzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gbnVsbCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gdW5kZWZpbmVkICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBmb3J3YXJkUmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlLCBYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc0FyZ3MsIFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuLCBmaW5hbGl6ZSwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuLy9pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vSHR0cEhlbHBlclNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHh0SHR0cFNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQsXG4gICAgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgLy9wcml2YXRlIHVybEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZVxuICApIHtcbiAgICBzdXBlcihiYWNrZW5kLCBvcHRpb25zKTtcbiAgfVxuXG4gIHVybFJlcXVlc3Q6IGFueTtcbiAgb3JpZ1JlcXVlc3Q6IFJlcXVlc3Q7XG4gIGlzVW5hdGhvdXJpemVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBDb250cm9sIFNlcnZpY2VzXG4gICAqL1xuICBnZXRIZWFkZXJzKCkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDYWNoZS1Db250cm9sJywgJ25vLXN0b3JlJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ1ByYWdtYScsICduby1jYWNoZScpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgaGFuZGxlUmVzcG9uc2Uob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxSZXNwb25zZT4sIHVybD86IHN0cmluZykge1xuXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgY29uc3Qgb3JpZyA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmVzdWx0ID0gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25DYXRjaChlcnJvcik7XG4gICAgICB9KSxcbiAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vblJlc3VsdChyZXMpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgb25SZXN1bHQocmVzKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gMjAxKSB7XG4gICAgICByZXR1cm4gcmVzLl9ib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gIH1cblxuICBkb0dldChhcGk6IHN0cmluZywgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIC8vIHRoaXMucHJlTG9hZGVyU2VydmljZS51cGRhdGUodHJ1ZSk7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZ2V0KHVybCwgcmVxdWVzdE9wdGlvbnMpKTtcbiAgfVxuXG4gIGRvUG9zdChlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBlbmRwb2ludDtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBvc3QodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUHV0KGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wdXQodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUGF0aChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55LCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucGF0Y2godXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvRGVsZXRlKGFwaTogc3RyaW5nLCBwYXJhbXM6IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCB1cmxQYXJhbSA9IHVybCArICcvJyArIHBhcmFtcztcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZGVsZXRlKHVybFBhcmFtLCByZXF1ZXN0T3B0aW9ucyksIHVybFBhcmFtKTtcbiAgfVxuXG5cbiAgcmVxdWVzdCh1cmw6IHN0cmluZyB8IFJlcXVlc3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgb3B0aW9ucyA9IHRoaXMucmVxdWVzdEFyZ3Mob3B0aW9ucyk7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsUmVxdWVzdCA9IHVybC51cmw7XG4gICAgICB0aGlzLm9yaWdSZXF1ZXN0ID0gdXJsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVybFJlcXVlc3QgIT09IGVudmlyb25tZW50LkNPTkZJR19GSUxFKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLm9yaWdSZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgICBvcHRpb25zLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVybCA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmV0dXJuIHN1cGVyLnJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdEFyZ3Mob3B0aW9uczogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnNBcmdzIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIHB1YmxpYyBvbkNhdGNoKGVycm9yOiBhbnkpIHtcbiAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xuICAgICAgY2FzZSA0MDE6XG4gICAgICAgIGlmICghdGhpcy5pc1VuYXRob3VyaXplZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKDQwMSk7XG4gICAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDFcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVW5hdGhvdXJpemVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwMDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIC8vIHRoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwNDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIC8vdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwNFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgNDAwXCIpO1xuICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89MFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4vcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlPFQ+IHtcblxuICBwdWJsaWMgbW9kZWw6IFQ7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0bzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBfaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBUKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlQXV0bywgbW9kZWwpO1xuICB9O1xuICBkZWxldGUoaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZUF1dG8sIGlkKTtcbiAgfTtcblxuICBkb0dldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IE1hcDxhbnksIGFueT4pIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBsZXQgdXJsXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkICYmIHBhcmFtcy5zaXplID4gMCkge1xuICAgICAgdXJsID0gcGF0aCArIHRoaXMuYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHBhdGg7XG4gICAgfVxuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldChwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlICsgdXJsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9Qb3N0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdChwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2UgKyBwYXRoLCBtb2RlbCk7XG4gICAgfTtcbiAgfTtcblxuICBkb1B1dChwYXRoOiBzdHJpbmcsIG1vZGVsPzogVCkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dChwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9EZWxldGUocGF0aDogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHBhdGgsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgaWQpO1xuICAgIH07XG4gIH07XG5cbiAgdXBsb2FkSW1hZ2UocGF0aCwgcGFyYW1zPzogTWFwPGFueSwgYW55Pik6IGFueSB7XG5cbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPD0gLTEpIHtcbiAgICAgIHBhdGggPSB0aGlzLnVybFNlcnZpY2UgKyBwYXRoIDtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcuY29uY2F0KHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpXG4gICAgfTtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IG5ldyBIdHRwSGVhZGVycyhoZWFkZXIpO1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBjb25zdCBmb3JtZGF0YSA9IHRoaXMuc2V0UGFyYW1zRm9ybWRhdGEocGFyYW1zKTtcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QoJ1BPU1QnLCBwYXRoLCBmb3JtZGF0YSwge1xuICAgICAgaGVhZGVyczogaHR0cE9wdGlvbnMsXG4gICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHBDbGllbnQucmVxdWVzdChyZXEpO1xuICB9XG5cblxuICBzZXRQYXJhbXNGb3JtZGF0YShwYXJhbXM6IE1hcDxhbnksIGFueT4pOiBGb3JtRGF0YSB7XG4gICAgY29uc3QgZm9ybWRhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBmb3JtZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1kYXRhO1xuICB9O1xuXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtczogTWFwPGFueSwgYW55Pik6IHN0cmluZyB7XG4gICAgbGV0IGZpbmFsID0gJyc7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpZiAocHJpbWVpcmFJdGVyYWNhbykge1xuICAgICAgICBmaW5hbCArPSAnPycgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgcHJpbWVpcmFJdGVyYWNhbyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWwgKz0gJyYnICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3VwcGVyY2FzZUZpcnN0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBlcmNhc2VGaXJzdCBleHRlbmRzIFVwcGVyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHdvcmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgaWYgKHdvcmRzW2FdLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgIHZhciB3ID0gd29yZHNbYV07XHJcbiAgICAgICAgICB3b3Jkc1thXSA9IHdbMF0udG9VcHBlckNhc2UoKSArIHcuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX0ZNVCA9ICdkZC9NTS95eXl5JztcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX1RJTUVfRk1UID0gYCR7Q29uc3RhbnRzLkRBVEVfRk1UfSAtIGhoOm1tOnNzIGFgO1xyXG4gIH0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2RhdGVGb3JtYXQnXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9GTVQpO1xyXG4gICAgfVxyXG4gIH0iLCJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZGF0ZVRpbWVGb3JtYXQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIHZhciBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZShcImVuLVVTXCIpO1xyXG4gICAgcmV0dXJuICBkYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIENvbnN0YW50cy5EQVRFX1RJTUVfRk1UKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBVcGVyY2FzZUZpcnN0IH0gZnJvbSAnLi91cHBlcmNhc2UtZmlyc3QnO1xyXG5pbXBvcnQgeyBEYXRlRm9ybWF0UGlwZSB9IGZyb20gJy4vZGF0ZS1mb3JtYXQucGlwZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lRm9ybWF0UGlwZSB9IGZyb20gJy4vZGF0ZS10aW1lLWZvcm1hdC5waXBlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUgXSxcclxuICAgIGV4cG9ydHM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGlwZU1vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYXBwLW1lbnUtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgaXRlbXM6IGFueVtdO1xuICBAVmlld0NoaWxkKCdjaGlsZE1lbnUnKSBwdWJsaWMgY2hpbGRNZW51O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUHh0QXBwQ29tcG9uZW50U2VydmljZSkgcHVibGljIHB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHsgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRDb21wb25lbnQoY2hpbGQpIHtcbiAgICB0aGlzLnB4dEFwcENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudCh7Y29tcG9uZW50OiBjaGlsZC5tZW51U291cmNlLmNvbXBvbmVudCwgZGF0YTpcIlwifSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgIGV4cG9ydHM6IFtQeHRBcHBNZW51SXRlbUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCBdXG4gIFxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNZW51SXRlbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1toYXNoXScsXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgSGFzaERpcmVjdGl2ZSAge1xyXG4gICAgQElucHV0KCkgaGFzaDogc3RyaW5nO1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxyXG4gIH0iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRob3JpdHlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogUHh0SHR0cFNlcnZpY2UsIHByaXZhdGUgX2h0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlKSB7IH1cblxuICBidXNjYXJBdXRob3JpdGllcyAoY29kaWdvU2lzdGVtYSkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2h0dHBIZWxwZXIuZ2V0QXBpU2dpKCkgKyBcInBlcm1pc3NvZXMvYnVzY2FyUGVyZmlsU2lzdGVtYS8/XCI7XG4gICAgY29uc3QgcGFyYW1zID0gXCJjb2RpZ29TaXN0ZW1hPVwiICsgY29kaWdvU2lzdGVtYTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5kb0dldCh1cmwgKyBwYXJhbXMpO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IHB4dENvbmZpZ3VyYXRpb24gPSB7c3lzdGVtSWQ6IDEwNCAsc3lzdGVtUHJleDogXCJTR0VfTkVXXCJ9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aG9yaXR5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIlxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzaWJsZUluUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGh0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLCBwcml2YXRlIGF1dGhvcml0eVNlcnZpY2U6IEF1dGhvcml0eVNlcnZpY2UpIHsgfVxyXG4gIGNhbkFjdGl2YXRlKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgaWYgKHRva2VuICE9PSAndW5kZWZpbmVkJyAmJiB0b2tlbiAhPT0gJycgJiYgdG9rZW4gIT09IG51bGwpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKHRva2VuKTtcclxuICAgICAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1Yik7XHJcbiAgICAgICAgaWYgKHRva2VuQXV0aG9yaXRpZXMgPT09ICd1bmRlZmluZWQnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09ICcnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXV0aG9yaXR5U2VydmljZS5idXNjYXJBdXRob3JpdGllcyhweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1YiwgZGF0YS5hdXRob3JpdHkpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmh0dHBIZWxwZXIuZ2V0VXJsQXV0ZW50aWNhY2FvKCkgKyBcIj9lcnJvPTQwMVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gVW5kZWZpbmVkXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSwgICAgXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcENvbXBvbmVudCwgUHh0Q29udGVudEJvZHksIEhhc2hEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbUHh0QXBwQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbUHh0QXBwQ29tcG9uZW50U2VydmljZSwgUHh0SHR0cFNlcnZpY2UsIFxuICAgIFJlcXVlc3RCYXNlU2VydmljZSwgSHR0cEhlbHBlclNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsICAgICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFRva2VuU2VydmljZSxBdXRob3JpdHlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRJbnB1dEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgaW5wdXRUeXBlPzogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRDaGVja2JveEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgaW5wdXRUeXBlPzogc3RyaW5nO1xyXG4gICAgZmlsdGVycz86IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dERhdGVGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHR5cGU/OiBzdHJpbmc7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmlsdGVyRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59XHJcbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0UmFkaW9CdXR0b25GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIG9wdGlvbnM/OiBzdHJpbmdbXTtcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0U2VsZWN0RmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uL21vZGVscy9weHQtZmlsdGVyLWN1c3RvbS5maWVsZCc7XG5pbXBvcnQgeyBweHRJbnB1dEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1pbnB1dC1maWVsZCc7XG5pbXBvcnQgeyBweHRDaGVja2JveEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1jaGVja2JveC1maWVsZCc7XG5pbXBvcnQgeyBweHREYXRlRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWRhdGUtZmllbGQnO1xuaW1wb3J0IHsgcHh0RmlsdGVyRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWZpbHRlci1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5pbXBvcnQgeyBweHRTZWxlY3RGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWNvbnRlbnQtYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1jb250ZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFkQ29tcG9uZW50IHtcbiAgLy9Qcm9wZXJ0aWVzIFxuICBASW5wdXQoKSBkYXRhOiBhbnk7XG4gIEBJbnB1dCgpIGF1dG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBmaWVsZHM6IFB4dEZpZWxkQ29uZmlnW10gPSBbXTtcbiAgQElucHV0KCkgY29sczogbnVtYmVyID0gNTtcbiAgQElucHV0KCkgZmllbGQ6IGFueTtcbiAgY29sc0luaXRpYWwgPSA1O1xuICBAT3V0cHV0KCkgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnZhbHVlO1xuICB9XG5cbiAgLy9Db25zdHJ1Y3RvclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZpZWxkKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBzd2l0Y2ggKHRoaXMuZmllbGRba2V5XS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG5cbiAgICAgICAgLy9GaWx0ZXJDdXN0b21cbiAgICAgICAgY2FzZSBweHRmaWx0ZXJDdXN0b21GaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlckN1c3RvbSA9IDxweHRmaWx0ZXJDdXN0b21GaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VGaWx0ZXJDdXN0b20udHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vSW5wdXRcbiAgICAgICAgY2FzZSBweHRJbnB1dEZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlSW5wdXQgPSA8cHh0SW5wdXRGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VJbnB1dC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlSW5wdXQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vQ2hlY2tib3hcbiAgICAgICAgY2FzZSBweHRDaGVja2JveEZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VDaGVjay50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vRGF0ZVxuICAgICAgICBjYXNlIHB4dERhdGVGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZURhdGUgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9GaWx0ZXJcbiAgICAgICAgY2FzZSBweHRGaWx0ZXJGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRmlsdGVyLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL1JhZGlvQnV0dG9uXG4gICAgICAgIGNhc2UgcHh0UmFkaW9CdXR0b25GaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VSYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgXG4gICAgICAgIC8vU2VsZWN0XG4gICAgICAgIGNhc2UgcHh0U2VsZWN0RmllbGQubmFtZTpcbiAgICAgICAgdmFyIGluc3RhbmNlU2VsZWN0ID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgIGluc3RhbmNlU2VsZWN0LnR5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgdGhpcy5jb2xzSW5pdGlhbCA9IHRoaXMuY29scztcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgfVxuXG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgY3JlYXRlIGNvbnRyb2xcbiAgcHVibGljIG9uU3VibWl0KGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuXG4gICAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGVBbGxGb3JtRmllbGRzKHRoaXMuZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBwdWJsaWMgY3JlYXRlQ29udHJvbCgpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgIHRoaXMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09IFwiYnV0dG9uXCIpIHJldHVybjtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZiLmNvbnRyb2woXG4gICAgICAgIHsgdmFsdWU6IGZpZWxkLnZhbHVlLCBkaXNhYmxlZDogZmllbGQuZGlzYWJsZWQgfSxcbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbnMoZmllbGQudmFsaWRhdGlvbnMgfHwgW10pXG4gICAgICApO1xuICAgICAgZ3JvdXAuYWRkQ29udHJvbChmaWVsZC5uYW1lLCBjb250cm9sKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBwdWJsaWMgYmluZFZhbGlkYXRpb25zKHZhbGlkYXRpb25zOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB2YWxpZExpc3QgPSBbXTtcbiAgICAgIHZhbGlkYXRpb25zLmZvckVhY2godmFsaWQgPT4ge1xuICAgICAgICB2YWxpZExpc3QucHVzaCh2YWxpZC52YWxpZGF0b3IpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkTGlzdCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlQWxsRm9ybUZpZWxkcyhmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gZm9ybUdyb3VwLmdldChmaWVsZCk7XG4gICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfVxuICBzY3JlZW5XaWR0aDtcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50Pykge1xuICAgIHRoaXMuc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNjcmVlbldpZHRoKTtcbiAgICBpZiAodGhpcy5zY3JlZW5XaWR0aCA8PSA4MDApIHtcbiAgICAgIHRoaXMuY29scyA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjcmVlbldpZHRoIDw9IDExMDApIHtcbiAgICAgIHRoaXMuY29scyA9IDM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29scyA9IHRoaXMuY29sc0luaXRpYWw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1pbnB1dC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuICAiLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGF0ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kYXRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1jaGVja2JveC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXJhZGlvYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvcHh0LWZpbHRlci1jdXN0b20uZmllbGQnO1xuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5cblxuZGVjbGFyZSB2YXIgJDogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWRpYWxvZy1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGZpZWxkczogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBhdXRvOiBib29sZWFuO1xuICBmaWx0ZXIgPSB7IGNvZGU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHVuZGVmaW5lZCB9O1xuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0udmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgcHVibGljIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsXG4gICAgcHVibGljIGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZTxhbnk+KSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gZGF0YS5jb250cm9sbGVyLm5hbWU7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdXRvID0gdGhpcy5kYXRhLmF1dG87XG4gICAgaWYgKHRoaXMuYXV0bykge1xuICAgICAgdGhpcy5maWVsZCA9IHRoaXMuZGF0YS5maWx0ZXJzO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5maWVsZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRba2V5XS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgY2FzZSBweHRmaWx0ZXJDdXN0b21GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRmlsdGVyQ3VzdG9tLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9JbnB1dFxuICAgICAgICAgIGNhc2UgcHh0SW5wdXRGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlSW5wdXQgPSA8cHh0SW5wdXRGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9DaGVja2JveFxuICAgICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9EYXRlXG4gICAgICAgICAgY2FzZSBweHREYXRlRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZURhdGUgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0ZpbHRlclxuICAgICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAvL1NlbGVjdFxuICAgICAgICAgIGNhc2UgcHh0U2VsZWN0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVNlbGVjdCA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgICB9XG4gIH1cblxuICBjYW5jZWxhdGlvbigpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShmYWxzZSk7XG4gIH1cbiAgY29uZmlybWF0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICAvL1NlYXJjaC5cbiAgc2VhcmNoKCkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgTWFwPGFueSwgYW55PigpO1xuXG4gICAgaWYgKHRoaXMuZGF0YS5hdXRvKSB7XG4gICAgICBpZiAodGhpcy5mb3JtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5mb3JtLnZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgcGFyYW1zLnNldChrZXksIHRoaXMuZm9ybS52YWx1ZVtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5maWx0ZXIuY29kZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWx0ZXIuY29kZSAhPSAwICYmIHRoaXMuZmlsdGVyLmNvZGUgIT0gXCJcIikge1xuICAgICAgICBwYXJhbXMuc2V0KFwiY29kaWdvXCIsIHRoaXMuZmlsdGVyLmNvZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpbHRlci5kZXNjcmlwdGlvbiAhPSBcIlwiKSB7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJkZXNjcmljYW9cIiwgdGhpcy5maWx0ZXIuZGVzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5odHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgcGFyYW1zKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgc2VsZWN0Um93KHJvdykge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHJvdyk7XG4gIH1cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGJpbmRWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogYW55KTogYW55IHtcbiAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdmFsaWRMaXN0ID0gW107XG4gICAgICB2YWxpZGF0aW9ucy5mb3JFYWNoKHZhbGlkID0+IHtcbiAgICAgICAgdmFsaWRMaXN0LnB1c2godmFsaWQudmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZExpc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZmllbGQpO1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoZmFsc2UpO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1pbnB1dC1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGlzRGlzYWJsZWQgPSB0cnVlO1xuICBhdXRvOiBib29sZWFuO1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgdmFsdWU6IFwiXCI7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZC52YWx1ZTtcbiAgfVxuXG4gIC8vTWV0aG9kIHJlc3Bvc2libGUgZm9yIG9wZW4gZGlhbG9nIGZpbHRlclxuICBvcGVuRmlsdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZmllbGQpO1xuICAgIGlmICh0aGlzLmZpZWxkLmZpbHRlcnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmF1dG8gPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgLy9oZWlnaHQ6ICc1MDBweCcsXG4gICAgICBkYXRhOiB7IGF1dG86IHRoaXMuYXV0bywgZmlsdGVyczogdGhpcy5maWVsZC5maWx0ZXJzLCBjb250cm9sbGVyOiB0aGlzLmZpZWxkLmNsYXNzTmFtZSwgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgdGhpcy5maWVsZC5jbGFzc05hbWUubmFtZSArIFwiIClcIiB9XG4gICAgfSk7XG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5maWVsZC52YWx1ZSA9IHJlc3VsdC5pZGVudGlmaWNhZG9yO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codGhpcy5ncm91cCk7XG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY29tcG9uZW50TWFwcGVyID0ge1xyXG4gIGlucHV0OiBQeHRJbnB1dENvbXBvbmVudCxcclxuICBidXR0b246IFB4dEJ1dHRvbkNvbXBvbmVudCxcclxuICBkYXRlOiBQeHREYXRlQ29tcG9uZW50LFxyXG4gIHNlbGVjdDogUHh0U2VsZWN0Q29tcG9uZW50LFxyXG4gIHJhZGlvYnV0dG9uOiBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCxcclxuICBjaGVja2JveDogUHh0Q2hlY2tib3hDb21wb25lbnQsXHJcbiAgZmlsdGVyOiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCxcclxufTtcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW2R5bmFtaWNGaWVsZF1cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmaWVsZDogRmllbGRDb25maWc7XHJcbiAgQElucHV0KCkgZ3JvdXA6IEZvcm1Hcm91cDtcclxuICBjb21wb25lbnRSZWY6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIGNvbXBvbmVudE1hcHBlclt0aGlzLmZpZWxkLnR5cGVdXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5maWVsZCA9IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tICcuL3B4dC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRJbnB1dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6W1B4dElucHV0Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRJbnB1dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0QnV0dG9uQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRCdXR0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RGF0ZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRhdGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERhdGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0RGF0ZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dERhdGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dERhdGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vcHh0LXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0U2VsZWN0Q29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0U2VsZWN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dFJhZGlvYnV0dG9uQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRSYWRpb2J1dHRvbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL3B4dC1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0Q2hlY2tib3hDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0Q2hlY2tib3hDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dENoZWNrYm94Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDaGVja2JveE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFB4dERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFNlbGVjdENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCBjb21wb25lbnRNYXBwZXIgPSB7XHJcbiAgaW5wdXQ6IFB4dElucHV0Q29tcG9uZW50LFxyXG4gIGJ1dHRvbjogUHh0QnV0dG9uQ29tcG9uZW50LFxyXG4gIGRhdGU6IFB4dERhdGVDb21wb25lbnQsXHJcbiAgc2VsZWN0OiBQeHRTZWxlY3RDb21wb25lbnQsXHJcbiAgcmFkaW9idXR0b246IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50LFxyXG4gIGNoZWNrYm94OiBQeHRDaGVja2JveENvbXBvbmVudCxcclxuICBmaWx0ZXI6IFB4dElucHV0RmlsdGVyQ29tcG9uZW50LFxyXG59O1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbZHluYW1pY0ZpZWxkRGlhbG9nXVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZENvbmZpZztcclxuICBASW5wdXQoKSBncm91cDogRm9ybUdyb3VwO1xyXG4gIGNvbXBvbmVudFJlZjogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcclxuICApIHsgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgZGVidWdnZXI7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCxEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2ddLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV0sXG4gIGV4cG9ydHM6W1B4dERpYWxvZ0ZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREFUQSwgdXNlVmFsdWU6IHt9fSxcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMsIHVzZVZhbHVlOiB7aGFzQmFja2Ryb3A6IHRydWV9fVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0ZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIubW9kdWxlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS1kaWFsb2cnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQeHREaWFsb2dGaWx0ZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0RmlsdGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgdGVtcGxhdGVKaXRVcmwgfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQeHRJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlJztcbmltcG9ydCB7IFB4dEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0RGF0ZU1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlck1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBNb2R1bGUsXG4gICAgUHh0SW5wdXRNb2R1bGUsXG4gICAgUHh0QnV0dG9uTW9kdWxlLFxuICAgIFB4dERhdGVNb2R1bGUsXG4gICAgUHh0U2VsZWN0TW9kdWxlLFxuICAgIFB4dFJhZGlvYnV0dG9uTW9kdWxlLFxuICAgIFB4dENoZWNrYm94TW9kdWxlLFxuICAgIFB4dElucHV0RmlsdGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENvbnRlbnRDb21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gICBleHBvcnRzOiBbUHh0Q29udGVudENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRDb250ZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50TW9kdWxlIHsgfVxuIiwiXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbiB7XHJcbiAgICBpY29uOiBTdHJpbmc7XHJcbiAgICBtZW51OiBTdHJpbmc7XHJcbiAgICBlbmFibGU6IEJvb2xlYW47XHJcbiAgICBlbnVtIDogTnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoaWNvbjogU3RyaW5nLCBtZW51OiBTdHJpbmcsIGVuYWJsZTogQm9vbGVhbiwgaWQgOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICAgICAgdGhpcy5lbnVtID0gaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIE9wdGlvbnNTdWJtZW51IHtcclxuICAgIFNBTFZBUiA9IDEsXHJcbiAgICBQRVNRVUlTQVIgPSAyLFxyXG4gICAgTElNUEFSID0gMyxcclxuICAgIE5PVk8gPSA0LFxyXG4gICAgVk9MVEFSPSA1LFxyXG4gICAgRVhDTFVJUj0gNlxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzU2F2ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNEZWxldGU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjb250cm9sbGVyPzogU3RyaW5nO1xuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2Uuc2F2ZSh0aGlzLm1vZGVsKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMuc3RhdHVzU2F2ZS5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBkZWxldGUoaWQpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5kZWxldGUoaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNEZWxldGUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBjbGVhcigpIHtcbiAgIHRoaXMubW9kZWwgPSB7fSBhcyBUO1xuICB9O1xuICBhZGQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdhZGQoKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcbiAgYmFjaygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2JhY2soKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcblxuICBidXR0b25zOiBQeHRCdXR0b25bXSA9IFtdO1xuICBlbmFibGVTYXZlID0gdHJ1ZTtcbiAgZW5hYmxlQmFjayA9IHRydWU7XG4gIGVuYWJsZUNsZWFyID0gdHJ1ZTtcbiAgZW5hYmxlU2VhcmNoID0gdHJ1ZTtcbiAgZW5hYmxlQWRkID0gdHJ1ZTtcbiAgZW5hYmxlRGVsZXRlID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX3B4dEFwcFNlcnZpY2U6IFB4dEFwcENvbXBvbmVudFNlcnZpY2UsIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZTxUPixwdWJsaWMgaGVscGVyOiAgSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwia2V5Ym9hcmRfYmFja3NwYWNlXCIsIFwiVk9MVEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlZPTFRBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJTQUxWQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuU0FMVkFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIk5PVk9cIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTk9WTykpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJMSU1QQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTElNUEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcInNlYXJjaFwiLCBcIlBFU1FVSVNBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5QRVNRVUlTQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiRVhDTFVJUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5FWENMVUlSKSk7XG5cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cmxTZXJ2aWNlID0gaGVscGVyLmdldEFwaSgpICsgdGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgdGhpcy5fc2VydmljZUJhc2UudXJsU2VydmljZUF1dG8gPSB0aGlzLnVybFNlcnZpY2UgO1xuICAgICAgY29uc29sZS5sb2codGhpcy51cmxTZXJ2aWNlKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTdWJtZW51c0NvbXBvbmVudCB9IGZyb20gJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBwcm92aWRlcnM6W1B4dEh0dHBTZXJ2aWNlLCBSZXF1ZXN0QmFzZVNlcnZpY2UsIEh0dHBIZWxwZXJTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c01vZHVsZSB7IH1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dERhdGVwaWNrZXJDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncHh0LWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFN0cmluZyA9IFwiRXNjb2xoYSB1bWEgZGF0YVwiO1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBpbnB1dERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGRhdGVNb2RlbDogRGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgZ2V0IGRhdGFTZWxlY2lvbmFkYSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGVNb2RlbDtcclxuICB9XHJcblxyXG4gIHNldCBkYXRhU2VsZWNpb25hZGEoZDogRGF0ZSkge1xyXG4gICAgaWYgKGQgIT09IHRoaXMuZGF0ZU1vZGVsKSB7XHJcbiAgICAgIHRoaXMuZGF0ZU1vZGVsID0gZDtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmRhdGVNb2RlbCA9IHZhbHVlO1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBvbkRhdGVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMud3JpdGVWYWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UoKTtcclxuICB9XHJcbiAgXHJcbn0iLCJcclxuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFB4dERhdGVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1B4dERhdGVwaWNrZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVQaWNrZXJNb2R1bGUge1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGZhbHNlKTtcbiAgfVxuICBjb25maXJtYXRpb24oZXZlbnQpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0RGlhbG9nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dDb21wb25lbnRdXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWZpbHRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZGF0YSA6IGFueTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dDb21wb25lbnQ+LCBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEZpbHRlckNvbXBvbmVudF1cbiBcbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgcHh0RW51bVRhZ0h0bWwgfSBmcm9tIFwiLi4vZW51bS9weHQtZW51bS10YWctaHRtbFwiO1xyXG5pbXBvcnQgeyBweHRFbnVtVHlwZVRhZyB9IGZyb20gXCIuLi9lbnVtL3B4dC1lbnVtLXR5cGUtdGFnXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dEZpZWxkcyB7XHJcbiAgICB0eXBlOiBweHRFbnVtVHlwZVRhZztcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICB0YWc6IHB4dEVudW1UYWdIdG1sO1xyXG59XHJcbiIsImV4cG9ydCBlbnVtIHB4dEVudW1UYWdIdG1sIHtcclxuICAgIElucHV0ID0gMSxcclxuICAgIENvbWJvID0gMixcclxuICAgIEZpbHRlciA9IDMsXHJcbiAgICBDaGVja2JveCA9IDRcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXVwbG9hZC1maWxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgOnN0cmluZztcbiAgQE91dHB1dCgpIGZpbGVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgYXJyYXlJbWFnZXMgOkZpbGVSZWFkZXI7XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgb25DaGFuZ2VJbWFnZW0oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgaW1hZ2VtOiBGaWxlID0gZXZlbnQ7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyPSBpbWFnZW0ubmFtZTtcbiAgICByZXR1cm4gdGhpcy5maWxlU2VsZWN0ZWQubmV4dChpbWFnZW0pO1xuICAgIH1cblxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRVcGxvYWRGaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50cyA6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEdhbGxlcnlPcHRpb25zLCBOZ3hHYWxsZXJ5SW1hZ2UsIE5neEdhbGxlcnlBbmltYXRpb24gfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1nYWxsZXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGdhbGxlcnlPcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9uc1tdO1xuICBASW5wdXQoKSBnYWxsZXJ5SW1hZ2VzOiBOZ3hHYWxsZXJ5SW1hZ2VbXTtcbiAgQElucHV0KCkgd2lkdGg6IGFueSA9IFwiMTAwJVwiO1xuICBASW5wdXQoKSBoZWlnaHQ6IGFueSA9ICc0MDBweCc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5nYWxsZXJ5T3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHRodW1ibmFpbHNDb2x1bW5zOiA0LFxuICAgICAgICBpbWFnZUFuaW1hdGlvbjogTmd4R2FsbGVyeUFuaW1hdGlvbi5TbGlkZVxuICAgICAgfSxcbiAgICAgIC8vIG1heC13aWR0aCA4MDBcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogODAwLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgaW1hZ2VQZXJjZW50OiA4MCxcbiAgICAgICAgdGh1bWJuYWlsc1BlcmNlbnQ6IDIwLFxuICAgICAgICB0aHVtYm5haWxzTWFyZ2luOiAyMCxcbiAgICAgICAgdGh1bWJuYWlsTWFyZ2luOiAyMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNDAwLFxuICAgICAgICBwcmV2aWV3OiBmYWxzZVxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0R2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU1vZHVsZSB9IGZyb20gJ25neC1nYWxsZXJ5JztcbmltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdGVyaWFsQW5ndWxhck1vZHVsZSwgTmd4R2FsbGVyeU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0R2FsbGVyeUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dEdhbGxlcnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxufSJdLCJuYW1lcyI6WyJEaXJlY3RpdmUiLCJWaWV3Q29udGFpbmVyUmVmIiwiU3ViamVjdCIsIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIk1lZGlhTWF0Y2hlciIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIkluamVjdCIsIklucHV0IiwiVmlld0NoaWxkIiwiTWF0TWVudVRyaWdnZXIiLCJOZ01vZHVsZSIsIkNka1RhYmxlTW9kdWxlIiwiQ2RrVHJlZU1vZHVsZSIsIk1hdEF1dG9jb21wbGV0ZU1vZHVsZSIsIk1hdEJhZGdlTW9kdWxlIiwiTWF0Qm90dG9tU2hlZXRNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRCdXR0b25Ub2dnbGVNb2R1bGUiLCJNYXRDYXJkTW9kdWxlIiwiTWF0Q2hlY2tib3hNb2R1bGUiLCJNYXRDaGlwc01vZHVsZSIsIk1hdFN0ZXBwZXJNb2R1bGUiLCJNYXREYXRlcGlja2VyTW9kdWxlIiwiTWF0RGlhbG9nTW9kdWxlIiwiTWF0RGl2aWRlck1vZHVsZSIsIk1hdEV4cGFuc2lvbk1vZHVsZSIsIk1hdEdyaWRMaXN0TW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0TGlzdE1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJNYXROYXRpdmVEYXRlTW9kdWxlIiwiTWF0UGFnaW5hdG9yTW9kdWxlIiwiTWF0UHJvZ3Jlc3NCYXJNb2R1bGUiLCJNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUiLCJNYXRSYWRpb01vZHVsZSIsIk1hdFJpcHBsZU1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdFNpZGVuYXZNb2R1bGUiLCJNYXRTbGlkZXJNb2R1bGUiLCJNYXRTbGlkZVRvZ2dsZU1vZHVsZSIsIk1hdFNuYWNrQmFyTW9kdWxlIiwiTWF0U29ydE1vZHVsZSIsIk1hdFRhYmxlTW9kdWxlIiwiTWF0VGFic01vZHVsZSIsIk1hdFRvb2xiYXJNb2R1bGUiLCJNYXRUb29sdGlwTW9kdWxlIiwiTWF0VHJlZU1vZHVsZSIsIkJyb3dzZXJNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiTWF0TGluZU1vZHVsZSIsIk1hdENvbW1vbk1vZHVsZSIsIk1hdE9wdGlvbk1vZHVsZSIsIk1hdEZvcm1GaWVsZE1vZHVsZSIsIk1hdFBzZXVkb0NoZWNrYm94TW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIkh0dHBDbGllbnQiLCJtYXAiLCJJbmplY3RvciIsInRzbGliXzEuX19leHRlbmRzIiwiSGVhZGVycyIsImNhdGNoRXJyb3IiLCJSZXF1ZXN0T3B0aW9ucyIsIk9ic2VydmFibGUiLCJYSFJCYWNrZW5kIiwiSHR0cCIsIkh0dHBIZWFkZXJzIiwiSHR0cFJlcXVlc3QiLCJQaXBlIiwiVXBwZXJDYXNlUGlwZSIsIkRhdGVQaXBlIiwicm91dGVyIiwiUm91dGVyIiwiRXZlbnRFbWl0dGVyIiwiVmFsaWRhdG9ycyIsIkZvcm1CdWlsZGVyIiwiT3V0cHV0IiwiSG9zdExpc3RlbmVyIiwiaHR0cCIsIk1hdFRhYmxlRGF0YVNvdXJjZSIsIk1hdERpYWxvZ1JlZiIsIk1BVF9ESUFMT0dfREFUQSIsIk1hdERpYWxvZyIsImNvbXBvbmVudE1hcHBlciIsIkNVU1RPTV9FTEVNRU5UU19TQ0hFTUEiLCJOT19FUlJPUlNfU0NIRU1BIiwiTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMiLCJIdHRwQ2xpZW50TW9kdWxlIiwiSHR0cE1vZHVsZSIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIk5neEdhbGxlcnlBbmltYXRpb24iLCJOZ3hHYWxsZXJ5TW9kdWxlIiwicHh0ZmlsdGVyQ3VzdG9tRmllbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO1FBTUUsd0JBQW1CLGdCQUFrQztZQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1NBQUs7O29CQUozREEsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxrQkFBa0I7cUJBQzdCOzs7Ozt3QkFKbUJDLHFCQUFnQjs7OzZCQUFwQzs7Ozs7OztBQ0FBOztpQ0FLMEMsSUFBSUMsWUFBTyxFQUFPOzJDQUNHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO2tDQUVyRCxJQUFJQSxZQUFPLEVBQU87MkNBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7a0NBRXRELElBQUlBLFlBQU8sRUFBTzt3Q0FDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtnQ0FFckQsSUFBSUEsWUFBTyxFQUFPOytCQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFOzs7Ozs7UUFFL0UsNENBQVc7Ozs7WUFBWCxVQUFZLE1BQVc7Z0JB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