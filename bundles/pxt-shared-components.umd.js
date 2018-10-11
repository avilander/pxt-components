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
    var pxtfilterCustomField = (function () {
        function pxtfilterCustomField() {
        }
        return pxtfilterCustomField;
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
                if (this.field != undefined) {
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
                }
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
                        styles: [".pxt-content-body{padding:10px}.pxt-content-body mat-card{margin:5px;border-top:4px solid;border-radius:4px;border-bottom:4px solid}mat-form-field,pxt-datepicker,select-filial,td{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}.div-imagem-cardapio{margin-bottom:2%;text-align:center}.pxt-component-tag{width:100%}.pxt-style{width:100%;height:100%}::ng-deep .mat-grid-tile .mat-figure{right:15px!important}"]
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
                        template: "<mat-form-field  [formGroup]=\"group\" > \n  <input matInput [formControlName]=\"field.name\" [placeholder]=\"field.label | uppercaseFirst\"  size=\"10\" [type]=\"field.inputType\">\n</mat-form-field>",
                        styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
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
                        styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
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
                        styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
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
                        styles: [":host{width:100%;height:100%;padding-top:13%}mat-form-field{width:100%}"]
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
                        template: "<div class=\"demo-full-width\" [formGroup]=\"group\">\n  <label class=\"radio-label-padding\">{{field.label | uppercaseFirst}}:</label>\n  <mat-radio-group [formControlName]=\"field.name\" color=\"primary\" >\n    <mat-radio-button color=\"primary\"  *ngFor=\"let item of field.options\" [value]=\"item\">{{item}}</mat-radio-button>\n  </mat-radio-group>\n</div>",
                        styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
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
    /** @type {?} */
    var noop = function () {
    };
    /** @type {?} */
    var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return PxtSelectComponent; }),
        multi: true
    };
    var PxtSelectComponent = (function () {
        function PxtSelectComponent(pxthttp) {
            this.pxthttp = pxthttp;
            this.required = false;
            this.placeholder = 'Selecione';
            this.controller = "";
            this.auto = false;
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
            this.options = [];
        }
        Object.defineProperty(PxtSelectComponent.prototype, "selectedOption", {
            get: /**
             * @return {?}
             */ function () {
                return this.option;
            },
            set: /**
             * @param {?} f
             * @return {?}
             */ function (f) {
                if (f !== this.option) {
                    this.option = f;
                    this.onChangeCallback(f.codigo);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PxtSelectComponent.prototype.onBlur = /**
         * @return {?}
         */
            function () {
                this.onTouchedCallback();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        PxtSelectComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.option = value;
                this.onChangeCallback(value);
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        PxtSelectComponent.prototype.registerOnChange = /**
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
        PxtSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        /**
         * @return {?}
         */
        PxtSelectComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (this.model != undefined) {
                    this.controller = this.model.constructor.name;
                    this.field = this.model;
                    this.auto = false;
                }
                else if (this.field != undefined && this.field.className != undefined) {
                    this.controller = this.field.className.name;
                    this.auto = true;
                }
            };
        /**
         * @return {?}
         */
        PxtSelectComponent.prototype.find = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.controller != undefined) {
                    this.pxthttp.doGet(this.controller, this.params).subscribe(function (result) {
                        console.log(result);
                        if (_this.auto) {
                            _this.field.options = result;
                        }
                        else {
                            _this.options = result;
                        }
                    });
                }
            };
        /**
         * @return {?}
         */
        PxtSelectComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.find();
            };
        PxtSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-select',
                        template: "\n\n<mat-form-field *ngIf=\"auto\" class=\"demo-full-width\" [formGroup]=\"group\">\n  <mat-select [placeholder]=\"field.label | uppercaseFirst\" [formControlName]=\"field.name\"  >\n    <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n    <mat-option *ngFor=\"let item of field.options\" [value]=\"item.identificador\">{{item.codigo +' - '+item.descricao}}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<mat-form-field *ngIf=\"!auto\" class=\"demo-full-width\">\n    <mat-select placeholder=\"{{ placeholder }}\" required=\"{{required}}\" [(ngModel)]=\"selectedOption\" >\n      <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n      <mat-option *ngFor=\"let option of options\" [value]=\"option\">\n        {{ option.codigo + ' - ' + option.descricao }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>",
                        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                        styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        PxtSelectComponent.ctorParameters = function () {
            return [
                { type: RequestBaseService }
            ];
        };
        PxtSelectComponent.propDecorators = {
            required: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            model: [{ type: core.Input }],
            params: [{ type: core.Input }]
        };
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
            this.cols = 2;
            this.fields = [];
            this.fieldsHist = [];
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
                                _this.fieldsHist.push(instanceFilterCustom);
                                break;
                            //Input
                            case pxtInputField.name:
                                /** @type {?} */
                                var instanceInput = (_this.field[key]);
                                instanceInput.type = 'input';
                                _this.fields.push(instanceInput);
                                _this.fieldsHist.push(instanceInput);
                                break;
                            //Checkbox
                            case pxtCheckboxField.name:
                                /** @type {?} */
                                var instanceCheck = (_this.field[key]);
                                instanceCheck.type = 'checkbox';
                                _this.fields.push(instanceCheck);
                                _this.fieldsHist.push(instanceCheck);
                                break;
                            //Date
                            case pxtDateField.name:
                                /** @type {?} */
                                var instanceDate = (_this.field[key]);
                                instanceDate.type = 'date';
                                _this.fields.push(instanceDate);
                                _this.fieldsHist.push(instanceDate);
                                break;
                            //Filter
                            case pxtFilterField.name:
                                /** @type {?} */
                                var instanceFilter = (_this.field[key]);
                                instanceFilter.type = 'filter';
                                _this.fields.push(instanceFilter);
                                _this.fieldsHist.push(instanceFilter);
                                break;
                            //RadioButton
                            case pxtRadioButtonField.name:
                                /** @type {?} */
                                var instanceRadio = (_this.field[key]);
                                instanceRadio.type = 'radio';
                                _this.fields.push(instanceRadio);
                                _this.fieldsHist.push(instanceRadio);
                                break;
                            //Select
                            case pxtSelectField.name:
                                /** @type {?} */
                                var instanceSelect = (_this.field[key]);
                                instanceSelect.type = 'select';
                                _this.fields.push(instanceSelect);
                                _this.fieldsHist.push(instanceSelect);
                                break;
                        }
                    });
                    this.fields.sort(function (a, b) {
                        if (a.position < b.position)
                            return -1;
                        if (a.position > b.position)
                            return 1;
                        if (a.position < b.position)
                            return -1;
                        if (a.position > b.position)
                            return 1;
                        return 0;
                    });
                    this.fieldsHist.sort(function (a, b) {
                        if (a.position < b.position)
                            return -1;
                        if (a.position > b.position)
                            return 1;
                        if (a.position < b.position)
                            return -1;
                        if (a.position > b.position)
                            return 1;
                        return 0;
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
                            if (_this.form.value[key] != undefined) {
                                params.set(key, _this.form.value[key]);
                            }
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
        /**
         * @return {?}
         */
        PxtDialogFilterComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
            };
        PxtDialogFilterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-dialog-filter',
                        template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\"><mat-icon>close</mat-icon></button>\n   \n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content >\n    <mat-card>\n      <div *ngIf=\"!auto\">\n        <table>\n          <tr>\n            <td class=\"td-id\">\n              <mat-form-field>\n                <input type=\"number\" matInput placeholder=\"Codigo\" [(ngModel)]=\"filter.code\">\n              </mat-form-field>\n            </td>\n            <td>\n              <mat-form-field>\n                <input matInput placeholder=\"Descri\u00E7\u00E3o\" [(ngModel)]=\"filter.description\">\n              </mat-form-field>\n            </td>\n          </tr>\n        </table>\n      </div>\n\n      <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\">\n          <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n              <ng-container dynamicFieldDialog [field]=\"field\" [group]=\"form\">\n              </ng-container>\n            </mat-grid-tile>\n            <mat-grid-tile class=\"mat-grid-tile-content\">\n            </mat-grid-tile>\n          </mat-grid-list>\n        </form>\n      </div>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                        styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important}.example-spacer{flex:1 1 auto}"]
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
                    panelClass: 'pxt-dialog',
                    data: { auto: this.auto, filters: this.field.filters, controller: this.field.className, titleDialog: "Selecione: ( " + this.field.className.name + " )" }
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result !== undefined) {
                        _this.field.value = result.codigo;
                    }
                    console.log(_this.group);
                    console.log(result);
                });
            };
        PxtInputFilterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-input-filter',
                        template: "<!--\n<mat-grid-list cols=\"6\" rowHeight=\"5:3\">\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='5'>\n    <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" disabled=\"isDisabled\">\n      <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n      <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n        <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n      </ng-container>\n    </mat-form-field>\n  </mat-grid-tile>\n\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='1'>\n    <button mat-icon-button>\n      <mat-icon (click)=\"openFilter()\">search</mat-icon>\n    </button>\n  </mat-grid-tile>\n\n</mat-grid-list>\n-->\n<mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label | uppercaseFirst\" size=\"10\" [type]=\"field.inputType\">\n    <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n      <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n    </ng-container>\n  </mat-form-field>",
                        styles: ["mat-form-field{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}:host{width:100%;height:100%}.pxt-dialog .mat-dialog-container{padding:0!important}::ng-deep .mat-dialog-container{padding:0!important}"]
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
                            MaterialAngularModule,
                            PipeModule
                        ],
                        exports: [PxtSelectComponent],
                        entryComponents: [PxtSelectComponent],
                        declarations: [PxtSelectComponent],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA, core.NO_ERRORS_SCHEMA]
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
                            MaterialAngularModule,
                            PipeModule
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
    var ɵ0$1 = {}, ɵ1 = { hasBackdrop: true };
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
                            { provide: material.MAT_DIALOG_DATA, useValue: ɵ0$1 },
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
                            PxtDialogFilterModule,
                            PipeModule
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
    var noop$1 = function () {
    };
    /** @type {?} */
    var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1 = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return PxtDatepickerComponent; }),
        multi: true
    };
    var PxtDatepickerComponent = (function () {
        function PxtDatepickerComponent() {
            this.placeholder = "Escolha uma data";
            this.inputDisabled = false;
            this.onChange = new core.EventEmitter();
            this.onTouchedCallback = noop$1;
            this.onChangeCallback = noop$1;
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
                        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1],
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
        /**
         * @param {?} row
         * @return {?}
         */
        PxtDialogComponent.prototype.selectRow = /**
         * @param {?} row
         * @return {?}
         */
            function (row) {
                this.dialogRef.close(row);
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
    var PxtDialogFilterCustomComponent = (function () {
        function PxtDialogFilterCustomComponent(fb, dialogRef, data, http$$1) {
            this.fb = fb;
            this.dialogRef = dialogRef;
            this.data = data;
            this.http = http$$1;
            this.displayedColumns = ['codigo', 'descricao'];
            this.dataSource = new material.MatTableDataSource();
        }
        /**
         * @return {?}
         */
        PxtDialogFilterCustomComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        //Search.
        /**
         * @return {?}
         */
        PxtDialogFilterCustomComponent.prototype.search = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var params = new Map();
                if (this.filters !== undefined) {
                    Object.keys(this.filters).forEach(function (key) {
                        if (_this.filters[key] != undefined) {
                            params.set(key, _this.filters[key]);
                        }
                    });
                }
                this.http.doGet(this.model.constructor.name, params).subscribe(function (result) {
                    _this.dataSource.data = result;
                });
            };
        //Row Selected
        /**
         * @param {?} row
         * @return {?}
         */
        PxtDialogFilterCustomComponent.prototype.selectRow = /**
         * @param {?} row
         * @return {?}
         */
            function (row) {
                this.dialogRef.close(row);
            };
        //Close
        /**
         * @return {?}
         */
        PxtDialogFilterCustomComponent.prototype.close = /**
         * @return {?}
         */
            function () {
                this.dialogRef.close(undefined);
            };
        PxtDialogFilterCustomComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pxt-dialog-filter-custom',
                        template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <ng-content></ng-content>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                        styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}::ng-deep .mat-dialog-container{padding:0!important}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important}.example-spacer{flex:1 1 auto}"]
                    }] }
        ];
        /** @nocollapse */
        PxtDialogFilterCustomComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: material.MatDialogRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] }] },
                { type: RequestBaseService }
            ];
        };
        PxtDialogFilterCustomComponent.propDecorators = {
            filters: [{ type: core.Input }],
            model: [{ type: core.Input }]
        };
        return PxtDialogFilterCustomComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$3 = {}, ɵ1$1 = { hasBackdrop: true };
    var PxtDialogFilterCustomModule = (function () {
        function PxtDialogFilterCustomModule() {
        }
        PxtDialogFilterCustomModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialAngularModule
                        ],
                        declarations: [PxtDialogFilterCustomComponent],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA, core.NO_ERRORS_SCHEMA],
                        exports: [PxtDialogFilterCustomComponent],
                        entryComponents: [PxtDialogFilterCustomComponent],
                        providers: [
                            { provide: material.MAT_DIALOG_DATA, useValue: ɵ0$3 },
                            { provide: material.MAT_DIALOG_DEFAULT_OPTIONS, useValue: ɵ1$1 }
                        ]
                    },] }
        ];
        return PxtDialogFilterCustomModule;
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
    exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1;
    exports.PxtDatepickerComponent = PxtDatepickerComponent;
    exports.PxtDialogModule = PxtDialogModule;
    exports.PxtDialogComponent = PxtDialogComponent;
    exports.PxtFilterModule = PxtFilterModule;
    exports.PxtFilterComponent = PxtFilterComponent;
    exports.PxtDialogFilterCustomModule = PxtDialogFilterCustomModule;
    exports.PxtDialogFilterCustomComponent = PxtDialogFilterCustomComponent;
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
    exports.pxtfilterCustomField = pxtfilterCustomField;
    exports.pxtDateField = pxtDateField;
    exports.pxtFilterField = pxtFilterField;
    exports.pxtInputField = pxtInputField;
    exports.pxtRadioButtonField = pxtRadioButtonField;
    exports.pxtSelectField = pxtSelectField;
    exports.ɵg = HashDirective;
    exports.ɵba = DynamicFieldDirective;
    exports.ɵy = DynamicFieldDirectiveDialog;
    exports.ɵf = PxtContentBody;
    exports.ɵe = PxtAppMenuItemComponent;
    exports.ɵd = PxtAppMenuItemModule;
    exports.ɵx = PxtDialogFilterComponent;
    exports.ɵw = PxtDialogFilterModule;
    exports.ɵbb = PxtUploadFileComponent;
    exports.ɵl = PxtButtonComponent;
    exports.ɵk = PxtButtonModule;
    exports.ɵu = PxtCheckboxComponent;
    exports.ɵt = PxtCheckboxModule;
    exports.ɵn = PxtDateComponent;
    exports.ɵm = PxtDateModule;
    exports.ɵz = PxtInputFilterComponent;
    exports.ɵv = PxtInputFilterModule;
    exports.ɵj = PxtInputComponent;
    exports.ɵi = PxtInputModule;
    exports.ɵs = PxtRadiobuttonComponent;
    exports.ɵr = PxtRadiobuttonModule;
    exports.ɵp = CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR;
    exports.ɵq = PxtSelectComponent;
    exports.ɵo = PxtSelectModule;
    exports.ɵb = DateFormatPipe;
    exports.ɵc = DateTimeFormatPipe;
    exports.ɵa = UpercaseFirst;
    exports.ɵh = TokenService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlLnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3Rva2VuLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy91cHBlcmNhc2UtZmlyc3QudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3V0aWwvY29uc3RhbnRzLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLWZvcm1hdC5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9kYXRlLXRpbWUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3BpcGVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtYXBwL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9IYXNoRGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dENvbmZpZ3VyYXRpb24udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1pbnB1dC1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1jaGVja2JveC1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1kYXRlLWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWZpbHRlci1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1zZWxlY3QtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtY29udGVudC9weHQtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9tb2RlbC9weHQtc3VibWVudXMubW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL2VudW0vb3B0aW9uLXN1Ym1lbnUuZW51bS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGF0ZXBpY2tlci9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZmlsdGVyL3B4dC1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXIvcHh0LWZpbHRlci5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2RlbHMvcHh0LWZpZWxkcy1tb2RlbC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZW51bS9weHQtZW51bS10YWctaHRtbC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtdXBsb2FkLWZpbGUvcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtdXBsb2FkLWZpbGUvcHh0LXVwbG9hZC1maWxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZ2FsbGVyeS9weHQtZ2FsbGVyeS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYWQtcHh0LWNvbnRlbnRdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRCb2R5IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFB4dEFwcENvbXBvbmVudFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBzdWJtZW51c0l0ZW5zOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3VibWVudXNJdGVuc09ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuc3VibWVudXNJdGVucy5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkQ29tcG9uZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9hZENvbXBvbmVudE9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX2xvYWRDb21wb25lbnQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0VXNlckxvZ2dlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHVzZXJMb2dnZWRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRVc2VyTG9nZ2VkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldEluZm9Jbml0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW5mb0luaXRpYWw6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3NldEluZm9Jbml0LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNldFN1Ym1lbnVzKHJvdXRlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdWJtZW51c0l0ZW5zLm5leHQocm91dGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbml0aWFsSW5mbyhpbmZvSW5pdGlhbCkge1xyXG4gICAgICAgIHRoaXMuX3NldEluZm9Jbml0Lm5leHQoaW5mb0luaXRpYWwpXHJcbiAgICB9XHJcblxyXG4gICAgbG9hZENvbXBvbmVudChjb21wb25lbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQubmV4dChjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXIodXNlcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0VXNlckxvZ2dlZC5uZXh0KHVzZXIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgSW5wdXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQeHRBcHAgfSBmcm9tICcuL3B4dC1hcHAnO1xuaW1wb3J0IHsgUHh0QXBwTW9kZWwgfSBmcm9tICcuL21vZGVsL3B4dC1hcHAubW9kZWwnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0TWVudSwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2FmZUh0bWwsIERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLmNvbXBvbmVudC5zY3NzJ11cblxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnQge1xuXG4gIC8vUHJvcGVydGllc1xuICByb3V0ZXM6IGFueVtdID0gW107XG4gIGdyb3VwczogYW55W10gPSBbXTtcbiAgbWVudXM6IGFueVtdID0gW107XG4gIHN5c3RlbTogU3RyaW5nID0gXCJTWVNURU0gTkFNRVwiXG4gIHVybEltZzogc3RyaW5nID0gJ2h0dHA6Ly9pbWFnZW5zZHN2LnBlaXhvdG8uY29tLmJyL2F1dGgvbWluaV9sb2dvLnBuZyc7XG4gIG1lbnVTZWxlY3RlZCA9IFwiXCI7XG4gIHVzdWVyTG9nZ2VkID0gXCJMb29nZ2VkIHVzZXJcIjtcbiAgbWVudXNIdG1sOiBTYWZlSHRtbDtcbiAgcmVzdWx0OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBfbW9iaWxlUXVlcnlMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgbW9iaWxlUXVlcnk6IE1lZGlhUXVlcnlMaXN0O1xuICBzaG91bGRSdW4gPSB0cnVlO1xuICBASW5wdXQoKSBtYXRNZW51OiBNYXRNZW51O1xuICBAVmlld0NoaWxkKCdtZW51cycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBzdWJDb250YWluZXIxOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdjb250ZXh0TWVudVRyaWdnZXInLCB7IHJlYWQ6IE1hdE1lbnVUcmlnZ2VyIH0pIGNvbnRleHRNZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXI7XG4gIGN1cnJlbnRBZEluZGV4ID0gLTE7XG4gIEBWaWV3Q2hpbGQoUHh0Q29udGVudEJvZHkpIGFkSG9zdDogUHh0Q29udGVudEJvZHk7XG4gIGludGVydmFsOiBhbnk7XG4gIG1lbnVzUmVjZWl2ZWQgOiBhbnlbXTtcbiAgXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IoY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG1lZGlhOiBNZWRpYU1hdGNoZXIsXG4gICAgcHVibGljIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEBJbmplY3QoUHh0QXBwQ29tcG9uZW50U2VydmljZSkgcHVibGljIHB4dEFwcENvbXBvbmVudFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeSA9IG1lZGlhLm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDYwMHB4KScpO1xuICAgIHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIgPSAoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5hZGRMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICB0aGlzLnJlc3VsdCA9IHB4dEFwcENvbXBvbmVudFNlcnZpY2UuaW5mb0luaXRpYWwuc3Vic2NyaWJlKGluZm9Jbml0aWFsID0+IHtcbiAgICAgIGlmIChpbmZvSW5pdGlhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy51c3VlckxvZ2dlZCA9IGluZm9Jbml0aWFsLnVzZXJMb2dnZWQ7XG4gICAgICAgIHRoaXMuc3lzdGVtID0gaW5mb0luaXRpYWwuc3lzdGVtO1xuICAgICAgICB0aGlzLm1lbnVzUmVjZWl2ZWQgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMubWVudXMgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMucHJlcGFyZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmliZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgLy8gSW5jbHVkZSBvZiBjb21wb25lbnRzIGluIHRoZSBhcHBsaWNhdGlvbiBib2R5XG4gIGxvYWRDb21wb25lbnQocm91dGU6IGFueSwgYWRIb3N0KSB7XG4gICAgdGhpcy5tZW51U2VsZWN0ZWQgPSByb3V0ZS5tZW51VGV4dDtcbiAgICBsZXQgYWRJdGVtID0gcm91dGUubWVudVNvdXJjZTtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGFkSXRlbS5jb21wb25lbnQpO1xuICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gYWRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgfVxuXG4gIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VydmljZSByZXNwb25zaWJsZSBmb3IgaW5jbHVkaW5nIGNvbXBvbmVudHMgaW4gdGhlIGJvZHkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gIHN1YnNjcmliZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLnB4dEFwcENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudE9ic2VydmFibGUuc3Vic2NyaWJlKGNvbXBvbmVudE9iaiA9PiB7XG4gICAgICB2YXIgYXJyYXlBdXggPSB0aGlzLm1lbnVzUmVjZWl2ZWQuZmlsdGVyKHg9PngubWVudVNvdXJjZSAhPSB1bmRlZmluZWQgJiYgeC5tZW51U291cmNlLmNvbXBvbmVudCA9PT0gY29tcG9uZW50T2JqLmNvbXBvbmVudCk7XG4gICAgICBjb25zb2xlLmxvZyhhcnJheUF1eCk7XG4gICAgICBpZihhcnJheUF1eC5sZW5ndGggPT0gMSl7XG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gYXJyYXlBdXhbMF0ubWVudVRleHQ7XG4gICAgICB9XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgKDxBZENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGEgPSBjb21wb25lbnRPYmouZGF0YTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJlc3BvbnNpYmxlIGZvciBjYWxsIG1ldGhvZCBcImxvYWRjb21wb25lbnRzKClcIiBpbmZvcm1pbmcgcGFyYW1ldGVyc1xuICBzZWxlY3RJdGVtTWVudShuYXYpIHtcbiAgICB0aGlzLmxvYWRDb21wb25lbnQobmF2LCB0aGlzLmFkSG9zdCk7XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIHByZXBhcmluZyBhcHBsaWNhdGlvbiBtZW51cztcbiAgcHJlcGFyZU1lbnUoKSB7XG4gICAgbGV0IGFycmF5QXV4OiBhbnlbXTtcbiAgICBhcnJheUF1eCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ID09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEdyb3VwID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiZ3JvdXBcIiAmJiB4Lm1lbnVQYXJlbnQgIT09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEl0ZW0gPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJpdGVtXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIGdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIC8vYWRkIGdyb3VwcyBpbiBncm91cHNcbiAgICBhcnJheUF1eEdyb3VwLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eEdyb3VwLmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKVxuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy9hZGQgaXRlbnMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhJdGVtLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMubWVudXMgPSBhcnJheUF1eDtcbiAgfVxufVxuIiwiaW1wb3J0ICcuLy4uLy4uLy4uL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtDZGtUYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7Q2RrVHJlZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gIE1hdEJhZGdlTW9kdWxlLFxuICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxuICBNYXRDaGlwc01vZHVsZSxcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgTWF0RGlhbG9nTW9kdWxlLFxuICBNYXREaXZpZGVyTW9kdWxlLFxuICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gIE1hdEdyaWRMaXN0TW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TGlzdE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRSYWRpb01vZHVsZSxcbiAgTWF0UmlwcGxlTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNpZGVuYXZNb2R1bGUsXG4gIE1hdFNsaWRlck1vZHVsZSxcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gIE1hdFNuYWNrQmFyTW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRTdGVwcGVyTW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VGFic01vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgTWF0VHJlZU1vZHVsZSxcbiAgTWF0TGluZU1vZHVsZSxcbiAgTWF0Q29tbW9uTW9kdWxlLFxuICBNYXRPcHRpb25Nb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gIFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtwbGF0Zm9ybUJyb3dzZXJEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsTWF0SWNvbk1vZHVsZSxNYXRMaW5lTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsTWF0U29ydE1vZHVsZSxNYXRUYWJzTW9kdWxlLE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsTWF0Q2hpcHNNb2R1bGUsTWF0SW5wdXRNb2R1bGUsTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsTWF0QnV0dG9uTW9kdWxlLE1hdENvbW1vbk1vZHVsZSxNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLE1hdFJpcHBsZU1vZHVsZSxNYXRTZWxlY3RNb2R1bGUsTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsTWF0U2lkZW5hdk1vZHVsZSxNYXRTdGVwcGVyTW9kdWxlLE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxNYXRUb29sdGlwTW9kdWxlLE1hdENoZWNrYm94TW9kdWxlLE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLE1hdEV4cGFuc2lvbk1vZHVsZSxNYXRGb3JtRmllbGRNb2R1bGUsTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsTWF0TmF0aXZlRGF0ZU1vZHVsZSxNYXRCb3R0b21TaGVldE1vZHVsZSxNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxNYXRBdXRvY29tcGxldGVNb2R1bGUsTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ2RrVHJlZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gIGNvbmZpZzogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcclxuICApIHsgfVxyXG5cclxuICBsb2FkKHVybDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmplY3RIdHRwID0gdGhpcy5pbmplY3Rvci5nZXQoSHR0cENsaWVudCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgaW5qZWN0SHR0cC5nZXQodXJsKS5waXBlKFxyXG4gICAgICAgIG1hcChyZXMgPT4gcmVzKVxyXG4gICAgICApLnN1YnNjcmliZShjb25maWcgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvbmZpZ3VyYXRpb24oZWxlbWVudDogc3RyaW5nLCBkYXRhTGlzdD86IHN0cmluZykge1xyXG4gICAgaWYgKCFkYXRhTGlzdCkge1xyXG4gICAgICBjb25zdCB1cmxXaXRoRWxlbWVudCA9IHRoaXMuY29uZmlnW2VsZW1lbnRdO1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlVcmwodXJsV2l0aEVsZW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdXJsV2l0aERhdGFMaXN0ID0gdGhpcy5jb25maWdbZGF0YUxpc3RdW2VsZW1lbnRdO1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlVcmwodXJsV2l0aERhdGFMaXN0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZlcmlmeVVybCh0eXBlTW9kZWw6IGFueSkge1xyXG4gICAgaWYgKHR5cGVNb2RlbC5pbmNsdWRlcygnLycsIHR5cGVNb2RlbC5sZW5ndGggLSAxKSkge1xyXG4gICAgICBjb25zdCB0eXBlUmVsZWFzZSA9IHR5cGVNb2RlbDtcclxuICAgICAgcmV0dXJuIHR5cGVSZWxlYXNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbmV3VHlwZSA9IHR5cGVNb2RlbCArICcvJztcclxuICAgICAgcmV0dXJuIG5ld1R5cGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEhlbHBlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0QXBpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnUEFUSCcpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBnZXRBcGlTZ2koKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ0FQSScsICdTR0knKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpVXJsIChuYW1lLCB1cmwpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbih1cmwsIG5hbWUpO1xyXG4gIH1cclxufSIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiXG5leHBvcnQgY29uc3QgZW52aXJvbm1lbnQgPSB7XG4gIHByb2R1Y3Rpb246IHRydWUsXG4gIGVudk5hbWU6ICdkZXYnLFxuICB2ZXJzaW9uOiAnMC4wLjEnLFxuICBDT05GSUdfRklMRTogJ2Fzc2V0cy9jb25maWcvZW52Lmpzb24nLFxuICBlc2JBcGlQeHQgOiBcImh0dHA6Ly9lc2Jkc3YucGVpeG90by5jb20uYnIvc2dlL1wiLFxuICBzeXN0ZW06IHtcbiAgICBpZDogMTA4LFxuICAgIHByZXg6IFwiUE9SQ1JQXCJcbiAgfVxufTtcblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG52YXIgc3lzdGVtID0gZW52aXJvbm1lbnQuc3lzdGVtO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICBkZWJ1Z2dlclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gIH1cbiAgc2V0VG9rZW5TdG9yYWdlKHJlczogYW55KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gIH1cbiAgcmVtb3ZlVG9rZW5TdG9yYWdlKCkge1xuICAgIHZhciB0b2tlbiA9ICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgIGNvbnN0IGRlY29kZWQgPSA8YW55PiBqd3RfZGVjb2RlKHRva2VuKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzeXN0ZW0uaWQrc3lzdGVtLnByZXgrZGVjb2RlZC5zdWIpO1xuICB9XG4gIFxuICBkZWxldGVUb2tlbigpIHtcbiAgICB0aGlzLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICB9XG5cbiAgdG9rZW5FeGlzdHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSBudWxsICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSB1bmRlZmluZWQgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09ICcnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3QsIGZvcndhcmRSZWYsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UsIFhIUkJhY2tlbmQsIFJlcXVlc3RPcHRpb25zQXJncywgUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4sIGZpbmFsaXplLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4vLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vdG9rZW4uc2VydmljZSc7XG4vL2ltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9IdHRwSGVscGVyU2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQeHRIdHRwU2VydmljZSBleHRlbmRzIEh0dHAge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2VuZDogWEhSQmFja2VuZCxcbiAgICBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAvL3ByaXZhdGUgdXJsSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGJhY2tlbmQsIG9wdGlvbnMpO1xuICB9XG5cbiAgdXJsUmVxdWVzdDogYW55O1xuICBvcmlnUmVxdWVzdDogUmVxdWVzdDtcbiAgaXNVbmF0aG91cml6ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIENvbnRyb2wgU2VydmljZXNcbiAgICovXG4gIGdldEhlYWRlcnMoKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnUHJhZ21hJywgJ25vLWNhY2hlJyk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBoYW5kbGVSZXNwb25zZShvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiwgdXJsPzogc3RyaW5nKSB7XG5cbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBjb25zdCBvcmlnID0gdGhpcy5vcmlnUmVxdWVzdDtcbiAgICByZXN1bHQgPSBvYnNlcnZhYmxlLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkNhdGNoKGVycm9yKTtcbiAgICAgIH0pLFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uUmVzdWx0KHJlcyk7XG4gICAgICB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBvblJlc3VsdChyZXMpIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDEpIHtcbiAgICAgIHJldHVybiByZXMuX2JvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgfVxuXG4gIGRvR2V0KGFwaTogc3RyaW5nLCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgLy8gdGhpcy5wcmVMb2FkZXJTZXJ2aWNlLnVwZGF0ZSh0cnVlKTtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5nZXQodXJsLCByZXF1ZXN0T3B0aW9ucykpO1xuICB9XG5cbiAgZG9Qb3N0KGVuZHBvaW50OiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgIGNvbnN0IHVybCA9IGVuZHBvaW50O1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucG9zdCh1cmwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpLCB1cmwpO1xuICB9XG5cbiAgZG9QdXQoYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnB1dCh1cmwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpLCB1cmwpO1xuICB9XG5cbiAgZG9QYXRoKGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wYXRjaCh1cmwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpLCB1cmwpO1xuICB9XG5cbiAgZG9EZWxldGUoYXBpOiBzdHJpbmcsIHBhcmFtczogYW55LCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHVybFBhcmFtID0gdXJsICsgJy8nICsgcGFyYW1zO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5kZWxldGUodXJsUGFyYW0sIHJlcXVlc3RPcHRpb25zKSwgdXJsUGFyYW0pO1xuICB9XG5cblxuICByZXF1ZXN0KHVybDogc3RyaW5nIHwgUmVxdWVzdCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBvcHRpb25zID0gdGhpcy5yZXF1ZXN0QXJncyhvcHRpb25zKTtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudXJsUmVxdWVzdCA9IHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxSZXF1ZXN0ID0gdXJsLnVybDtcbiAgICAgIHRoaXMub3JpZ1JlcXVlc3QgPSB1cmw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudXJsUmVxdWVzdCAhPT0gZW52aXJvbm1lbnQuQ09ORklHX0ZJTEUpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMub3JpZ1JlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcuY29uY2F0KHRva2VuKSk7XG4gICAgICAgIG9wdGlvbnMuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcuY29uY2F0KHRva2VuKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXJsID0gdGhpcy5vcmlnUmVxdWVzdDtcbiAgICByZXR1cm4gc3VwZXIucmVxdWVzdCh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0QXJncyhvcHRpb25zOiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBSZXF1ZXN0T3B0aW9uc0FyZ3Mge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbiAgcHVibGljIG9uQ2F0Y2goZXJyb3I6IGFueSkge1xuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKCF0aGlzLmlzVW5hdGhvdXJpemVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coNDAxKTtcbiAgICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwMVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNVbmF0aG91cml6ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAwOlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgLy8gdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwMFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA0OlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDA0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz0wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0QmFzZVNlcnZpY2Uge1xuXG4gIHB1YmxpYyBtb2RlbDogYW55O1xuICBwdWJsaWMgdXJsU2VydmljZTogc3RyaW5nO1xuICBwdWJsaWMgdXJsU2VydmljZUF1dG86IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBQeHRIdHRwU2VydmljZSxcbiAgICBwcml2YXRlIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSxcbiAgICBwdWJsaWMgX2h0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCk7XG4gIH1cbiAgbG9hZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMudXJsU2VydmljZUF1dG8pO1xuICB9O1xuICBzYXZlKG1vZGVsPzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlQXV0bywgbW9kZWwpO1xuICB9O1xuICBkZWxldGUoaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZUF1dG8sIGlkKTtcbiAgfTtcblxuICBkb0dldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IE1hcDxhbnksIGFueT4pIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBsZXQgdXJsXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkICYmIHBhcmFtcy5zaXplID4gMCkge1xuICAgICAgdXJsID0gcGF0aCArIHRoaXMuYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHBhdGg7XG4gICAgfVxuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldChwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlICsgdXJsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9Qb3N0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBhbnkpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHBhdGgsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9O1xuICB9O1xuXG4gIGRvUHV0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBhbnkpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQocGF0aCwgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dCh0aGlzLnVybFNlcnZpY2UgKyBwYXRoLCBtb2RlbCk7XG4gICAgfVxuICB9O1xuXG4gIGRvRGVsZXRlKHBhdGg6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZShwYXRoLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZSArIHBhdGgsIGlkKTtcbiAgICB9O1xuICB9O1xuXG4gIHVwbG9hZEltYWdlKHBhdGgsIHBhcmFtcz86IE1hcDxhbnksIGFueT4pOiBhbnkge1xuXG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpIDw9IC0xKSB7XG4gICAgICBwYXRoID0gdGhpcy51cmxTZXJ2aWNlICsgcGF0aCA7XG4gICAgfTtcblxuICAgIGNvbnN0IGhlYWRlciA9IHtcbiAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnLmNvbmNhdCh0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpKVxuICAgIH07XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSBuZXcgSHR0cEhlYWRlcnMoaGVhZGVyKTtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgY29uc3QgZm9ybWRhdGEgPSB0aGlzLnNldFBhcmFtc0Zvcm1kYXRhKHBhcmFtcyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KCdQT1NUJywgcGF0aCwgZm9ybWRhdGEsIHtcbiAgICAgIGhlYWRlcnM6IGh0dHBPcHRpb25zLFxuICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9odHRwQ2xpZW50LnJlcXVlc3QocmVxKTtcbiAgfVxuXG5cbiAgc2V0UGFyYW1zRm9ybWRhdGEocGFyYW1zOiBNYXA8YW55LCBhbnk+KTogRm9ybURhdGEge1xuICAgIGNvbnN0IGZvcm1kYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGxldCBwcmltZWlyYUl0ZXJhY2FvID0gdHJ1ZTtcbiAgICBwYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgZm9ybWRhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3JtZGF0YTtcbiAgfTtcblxuICBwcml2YXRlIGJ1aWxkUmVxdWVzdFBhcmFtcyhwYXJhbXM6IE1hcDxhbnksIGFueT4pOiBzdHJpbmcge1xuICAgIGxldCBmaW5hbCA9ICcnO1xuICAgIGxldCBwcmltZWlyYUl0ZXJhY2FvID0gdHJ1ZTtcbiAgICBwYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgaWYgKHByaW1laXJhSXRlcmFjYW8pIHtcbiAgICAgICAgZmluYWwgKz0gJz8nICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICAgIHByaW1laXJhSXRlcmFjYW8gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbmFsICs9ICcmJyArIGtleSArICc9JyArIHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaW5hbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlLCBVcHBlckNhc2VQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICd1cHBlcmNhc2VGaXJzdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVwZXJjYXNlRmlyc3QgZXh0ZW5kcyBVcHBlckNhc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICBpZiAodGV4dCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFyIHdvcmRzID0gdGV4dC50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKTtcclxuICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB3b3Jkcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIGlmICh3b3Jkc1thXS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICB2YXIgdyA9IHdvcmRzW2FdO1xyXG4gICAgICAgICAgd29yZHNbYV0gPSB3WzBdLnRvVXBwZXJDYXNlKCkgKyB3LnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gd29yZHMuam9pbihcIiBcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9GTVQgPSAnZGQvTU0veXl5eSc7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9USU1FX0ZNVCA9IGAke0NvbnN0YW50cy5EQVRFX0ZNVH0gLSBoaDptbTpzcyBhYDtcclxuICB9IiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdkYXRlRm9ybWF0J1xyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfRk1UKTtcclxuICAgIH1cclxuICB9IiwiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2RhdGVUaW1lRm9ybWF0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICB2YXIgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoXCJlbi1VU1wiKTtcclxuICAgIHJldHVybiAgZGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9USU1FX0ZNVCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4vdXBwZXJjYXNlLWZpcnN0JztcclxuaW1wb3J0IHsgRGF0ZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtZm9ybWF0LnBpcGUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtdGltZS1mb3JtYXQucGlwZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlIF0sXHJcbiAgICBleHBvcnRzOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBpcGVNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGl0ZW1zOiBhbnlbXTtcbiAgQFZpZXdDaGlsZCgnY2hpbGRNZW51JykgcHVibGljIGNoaWxkTWVudTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkQ29tcG9uZW50KGNoaWxkKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnQoe2NvbXBvbmVudDogY2hpbGQubWVudVNvdXJjZS5jb21wb25lbnQsIGRhdGE6XCJcIn0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRBcHBNZW51SXRlbUNvbXBvbmVudF0sXG4gICBleHBvcnRzOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgXVxuICBcbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaGFzaF0nLFxyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIEhhc2hEaXJlY3RpdmUgIHtcclxuICAgIEBJbnB1dCgpIGhhc2g6IHN0cmluZztcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2Y1JlZjogVmlld0NvbnRhaW5lclJlZikge31cclxuICB9IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlzaWJsZUluUm9sZXNHdWFyZCB9IGZyb20gJy4uL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aG9yaXR5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIF9odHRwSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSkgeyB9XG5cbiAgYnVzY2FyQXV0aG9yaXRpZXMgKGNvZGlnb1Npc3RlbWEpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9odHRwSGVscGVyLmdldEFwaVNnaSgpICsgXCJwZXJtaXNzb2VzL2J1c2NhclBlcmZpbFNpc3RlbWEvP1wiO1xuICAgIGNvbnN0IHBhcmFtcyA9IFwiY29kaWdvU2lzdGVtYT1cIiArIGNvZGlnb1Npc3RlbWE7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZG9HZXQodXJsICsgcGFyYW1zKTtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBweHRDb25maWd1cmF0aW9uID0ge3N5c3RlbUlkOiAxMDQgLHN5c3RlbVByZXg6IFwiU0dFX05FV1wifVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhvcml0eVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgcHh0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuL21vZGVscy9weHRDb25maWd1cmF0aW9uXCJcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc2libGVJblJvbGVzR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBodHRwSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSwgcHJpdmF0ZSBhdXRob3JpdHlTZXJ2aWNlOiBBdXRob3JpdHlTZXJ2aWNlKSB7IH1cclxuICBjYW5BY3RpdmF0ZShuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHwgUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuICAgIGlmICh0b2tlbiAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9rZW4gIT09ICcnICYmIHRva2VuICE9PSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+and0X2RlY29kZSh0b2tlbik7XHJcbiAgICAgICAgdmFyIHRva2VuQXV0aG9yaXRpZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkICsgcHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1QcmV4ICsgZGVjb2RlZC5zdWIpO1xyXG4gICAgICAgIGlmICh0b2tlbkF1dGhvcml0aWVzID09PSAndW5kZWZpbmVkJyB8fCB0b2tlbkF1dGhvcml0aWVzID09PSAnJyB8fCB0b2tlbkF1dGhvcml0aWVzID09PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmF1dGhvcml0eVNlcnZpY2UuYnVzY2FyQXV0aG9yaXRpZXMocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkICsgcHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1QcmV4ICsgZGVjb2RlZC5zdWIsIGRhdGEuYXV0aG9yaXR5KVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5odHRwSGVscGVyLmdldFVybEF1dGVudGljYWNhbygpICsgXCI/ZXJybz00MDFcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmh0dHBIZWxwZXIuZ2V0VXJsQXV0ZW50aWNhY2FvKCkgKyBcIj9lcnJvPTQwMVwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlRva2VuIFVuZGVmaW5lZFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgQVBQX0lOSVRJQUxJWkVSIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBQeHRBcHBNZW51SXRlbU1vZHVsZSB9IGZyb20gJy4vcHh0LWFwcC1tZW51LWl0ZW0vcHh0LWFwcC1tZW51LWl0ZW0ubW9kdWxlJztcbmltcG9ydCB7IEhhc2hEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL0hhc2hEaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlzaWJsZUluUm9sZXNHdWFyZCB9IGZyb20gJy4uLy4uL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgQXV0aG9yaXR5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlJztcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3Rva2VuLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgUHh0QXBwTWVudUl0ZW1Nb2R1bGUsICAgIFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRBcHBDb21wb25lbnQsIFB4dENvbnRlbnRCb2R5LCBIYXNoRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1B4dEFwcENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1B4dEFwcENvbXBvbmVudFNlcnZpY2UsIFB4dEh0dHBTZXJ2aWNlLCBcbiAgICBSZXF1ZXN0QmFzZVNlcnZpY2UsIEh0dHBIZWxwZXJTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCAgICAgXG4gICAgVmlzaWJsZUluUm9sZXNHdWFyZCxUb2tlblNlcnZpY2UsQXV0aG9yaXR5U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dElucHV0RmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgaW5wdXRUeXBlPzogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRDaGVja2JveEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIGZpbHRlcnM/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBweHREYXRlRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdHlwZT86IHN0cmluZztcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRGaWx0ZXJGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59XHJcbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0UmFkaW9CdXR0b25GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dFNlbGVjdEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIGNsYXNzTmFtZT86IGFueTtcclxuICAgIG9wdGlvbnM/OiBzdHJpbmdbXTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICBwYXJhbWV0ZXI/OiBhbnk7IFxyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dGZpbHRlckN1c3RvbUZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGNsYXNzTmFtZT86IGFueTtcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIGZpbHRlcnM/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBweHRJbnB1dEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1pbnB1dC1maWVsZCc7XG5pbXBvcnQgeyBweHRDaGVja2JveEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1jaGVja2JveC1maWVsZCc7XG5pbXBvcnQgeyBweHREYXRlRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWRhdGUtZmllbGQnO1xuaW1wb3J0IHsgcHh0RmlsdGVyRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWZpbHRlci1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5pbXBvcnQgeyBweHRTZWxlY3RGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkJztcbmltcG9ydCB7IHB4dGZpbHRlckN1c3RvbUZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItY3VzdG9tLWZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWNvbnRlbnQtYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1jb250ZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFkQ29tcG9uZW50IHtcbiAgLy9Qcm9wZXJ0aWVzIFxuICBASW5wdXQoKSBkYXRhOiBhbnk7XG4gIEBJbnB1dCgpIGF1dG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBmaWVsZHM6IFB4dEZpZWxkQ29uZmlnW10gPSBbXTtcbiAgQElucHV0KCkgY29sczogbnVtYmVyID0gNTtcbiAgQElucHV0KCkgZmllbGQ6IGFueTtcbiAgY29sc0luaXRpYWwgPSA1O1xuICBAT3V0cHV0KCkgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnZhbHVlO1xuICB9XG5cbiAgLy9Db25zdHJ1Y3RvclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIGlmICh0aGlzLmZpZWxkICE9IHVuZGVmaW5lZCl7XG4gICAgT2JqZWN0LmtleXModGhpcy5maWVsZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLmZpZWxkW2tleV0uY29uc3RydWN0b3IubmFtZSkge1xuXG4gICAgICAgIC8vRmlsdGVyQ3VzdG9tXG4gICAgICAgIGNhc2UgcHh0ZmlsdGVyQ3VzdG9tRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VGaWx0ZXJDdXN0b20gPSA8cHh0ZmlsdGVyQ3VzdG9tRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRmlsdGVyQ3VzdG9tLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0lucHV0XG4gICAgICAgIGNhc2UgcHh0SW5wdXRGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUlucHV0ID0gPHB4dElucHV0RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlSW5wdXQudHlwZSA9ICdpbnB1dCc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0NoZWNrYm94XG4gICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUNoZWNrID0gPHB4dENoZWNrYm94RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlQ2hlY2sudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0RhdGVcbiAgICAgICAgY2FzZSBweHREYXRlRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRlID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vRmlsdGVyXG4gICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VGaWx0ZXIgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUZpbHRlci50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9SYWRpb0J1dHRvblxuICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VSYWRpbyA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIFxuICAgICAgICAvL1NlbGVjdFxuICAgICAgICBjYXNlIHB4dFNlbGVjdEZpZWxkLm5hbWU6XG4gICAgICAgIHZhciBpbnN0YW5jZVNlbGVjdCA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICBpbnN0YW5jZVNlbGVjdC50eXBlID0gJ3NlbGVjdCc7XG4gICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIHRoaXMuY29sc0luaXRpYWwgPSB0aGlzLmNvbHM7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVDb250cm9sKCk7XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIHB1YmxpYyBvblN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcblxuICAgICAgdGhpcy5zdWJtaXQuZW1pdCh0aGlzLmZvcm0udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRlQWxsRm9ybUZpZWxkcyh0aGlzLmZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgY3JlYXRlIGNvbnRyb2xcbiAgcHVibGljIGNyZWF0ZUNvbnRyb2woKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSBcImJ1dHRvblwiKSByZXR1cm47XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5mYi5jb250cm9sKFxuICAgICAgICB7IHZhbHVlOiBmaWVsZC52YWx1ZSwgZGlzYWJsZWQ6IGZpZWxkLmRpc2FibGVkIH0sXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb25zKGZpZWxkLnZhbGlkYXRpb25zIHx8IFtdKVxuICAgICAgKTtcbiAgICAgIGdyb3VwLmFkZENvbnRyb2woZmllbGQubmFtZSwgY29udHJvbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgcHVibGljIGJpbmRWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogYW55KTogYW55IHtcbiAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdmFsaWRMaXN0ID0gW107XG4gICAgICB2YWxpZGF0aW9ucy5mb3JFYWNoKHZhbGlkID0+IHtcbiAgICAgICAgdmFsaWRMaXN0LnB1c2godmFsaWQudmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZExpc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZmllbGQpO1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cbiAgc2NyZWVuV2lkdGg7XG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudD8pIHtcbiAgICB0aGlzLnNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc29sZS5sb2codGhpcy5zY3JlZW5XaWR0aCk7XG4gICAgaWYgKHRoaXMuc2NyZWVuV2lkdGggPD0gODAwKSB7XG4gICAgICB0aGlzLmNvbHMgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY3JlZW5XaWR0aCA8PSAxMTAwKSB7XG4gICAgICB0aGlzLmNvbHMgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbHMgPSB0aGlzLmNvbHNJbml0aWFsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtaW5wdXQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1idXR0b24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiAgIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWRhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRhdGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGF0ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY2hlY2tib3guY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1yYWRpb2J1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dFNlbGVjdENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VsZWNpb25lJztcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgQElucHV0KCkgcGFyYW1zOiBhbnk7XG5cbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGF1dG8gPSBmYWxzZTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgb3B0aW9uOiBhbnk7XG5cbiAgb3B0aW9uczogYW55W10gPSBbXTtcblxuICBnZXQgc2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZE9wdGlvbihmOiBhbnkpIHtcbiAgICBpZiAoZiAhPT0gdGhpcy5vcHRpb24pIHtcbiAgICAgIHRoaXMub3B0aW9uID0gZjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhmLmNvZGlnbyk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5vcHRpb24gPSB2YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBweHRodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB0aGlzLmZpZWxkID0gdGhpcy5tb2RlbDtcbiAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZC5jbGFzc05hbWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLmZpZWxkLmNsYXNzTmFtZS5uYW1lO1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgZmluZCgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sbGVyIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnB4dGh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCB0aGlzLnBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIGlmKHRoaXMuYXV0byl7XG4gICAgICAgICAgdGhpcy5maWVsZC5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMgPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgdGhpcy5maW5kKCk7XG4gIH07XG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSwgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcblxuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnc2VsZW5pdW0td2ViZHJpdmVyL2h0dHAnO1xuXG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kaWFsb2ctZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGRpc3BsYXllZENvbHVtbnMgPSBbJ2NvZGlnbycsICdkZXNjcmljYW8nXTtcbiAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8YW55PigpO1xuICBjb250cm9sbGVyID0gXCJcIjtcbiAgY29scyA9IDI7XG4gIGZpZWxkczogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBmaWVsZHNIaXN0OiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIGF1dG86IGJvb2xlYW47XG4gIGZpbHRlciA9IHsgY29kZTogdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogdW5kZWZpbmVkIH07XG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgaHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gZGF0YS5jb250cm9sbGVyLm5hbWU7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdXRvID0gdGhpcy5kYXRhLmF1dG87XG4gICAgaWYgKHRoaXMuYXV0bykge1xuICAgICAgdGhpcy5maWVsZCA9IHRoaXMuZGF0YS5maWx0ZXJzO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5maWVsZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRba2V5XS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgY2FzZSBweHRmaWx0ZXJDdXN0b21GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRmlsdGVyQ3VzdG9tLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9JbnB1dFxuICAgICAgICAgIGNhc2UgcHh0SW5wdXRGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlSW5wdXQgPSA8cHh0SW5wdXRGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlSW5wdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0NoZWNrYm94XG4gICAgICAgICAgY2FzZSBweHRDaGVja2JveEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlQ2hlY2sudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vRGF0ZVxuICAgICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRlID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vRmlsdGVyXG4gICAgICAgICAgY2FzZSBweHRGaWx0ZXJGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUZpbHRlci50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9SYWRpb0J1dHRvblxuICAgICAgICAgIGNhc2UgcHh0UmFkaW9CdXR0b25GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvL1NlbGVjdFxuICAgICAgICAgIGNhc2UgcHh0U2VsZWN0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVNlbGVjdCA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmZpZWxkcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZmllbGRzSGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICAgIH1cbiAgfVxuXG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGZhbHNlKTtcbiAgfVxuICBjb25maXJtYXRpb24oZXZlbnQpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgfVxuXG4gIC8vU2VhcmNoLlxuICBzZWFyY2goKSB7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBNYXA8YW55LCBhbnk+KCk7XG4gICAgaWYgKHRoaXMuZGF0YS5hdXRvKSB7XG4gICAgICBpZiAodGhpcy5mb3JtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5mb3JtLnZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuZm9ybS52YWx1ZVtrZXldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zLnNldChrZXksIHRoaXMuZm9ybS52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5odHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgcGFyYW1zKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZmlsdGVyLmNvZGUgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmlsdGVyLmNvZGUgIT0gMCAmJiB0aGlzLmZpbHRlci5jb2RlICE9IFwiXCIpIHtcbiAgICAgICAgcGFyYW1zLnNldChcImNvZGlnb1wiLCB0aGlzLmZpbHRlci5jb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmZpbHRlci5kZXNjcmlwdGlvbiAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWx0ZXIuZGVzY3JpcHRpb24gIT0gXCJcIikge1xuICAgICAgICBwYXJhbXMuc2V0KFwiZGVzY3JpY2FvXCIsIHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLmNvbnRyb2xsZXIsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNlbGVjdFJvdyhyb3cpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShyb3cpO1xuICB9XG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgY3JlYXRlIGNvbnRyb2xcbiAgY3JlYXRlQ29udHJvbCgpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgIHRoaXMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09IFwiYnV0dG9uXCIpIHJldHVybjtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZiLmNvbnRyb2woXG4gICAgICAgIHsgdmFsdWU6IGZpZWxkLnZhbHVlLCBkaXNhYmxlZDogZmllbGQuZGlzYWJsZWQgfSxcbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbnMoZmllbGQudmFsaWRhdGlvbnMgfHwgW10pXG4gICAgICApO1xuICAgICAgZ3JvdXAuYWRkQ29udHJvbChmaWVsZC5uYW1lLCBjb250cm9sKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGZhbHNlKTtcbiAgfTtcbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWlucHV0LWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXNEaXNhYmxlZCA9IHRydWU7XG4gIGF1dG86IGJvb2xlYW47XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICB2YWx1ZTogXCJcIjtcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmZpZWxkLnZhbHVlO1xuICB9XG5cbiAgLy9NZXRob2QgcmVzcG9zaWJsZSBmb3Igb3BlbiBkaWFsb2cgZmlsdGVyXG4gIG9wZW5GaWx0ZXIoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5maWVsZCk7XG4gICAgaWYgKHRoaXMuZmllbGQuZmlsdGVycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXV0byA9IHRydWU7XG4gICAgfVxuICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICBwYW5lbENsYXNzOiAncHh0LWRpYWxvZycsXG4gICAgICBkYXRhOiB7IGF1dG86IHRoaXMuYXV0bywgZmlsdGVyczogdGhpcy5maWVsZC5maWx0ZXJzLCBjb250cm9sbGVyOiB0aGlzLmZpZWxkLmNsYXNzTmFtZSwgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgdGhpcy5maWVsZC5jbGFzc05hbWUubmFtZSArIFwiIClcIiB9XG4gICAgfSk7XG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5maWVsZC52YWx1ZSA9IHJlc3VsdC5jb2RpZ287XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFB4dERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFNlbGVjdENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCBjb21wb25lbnRNYXBwZXIgPSB7XHJcbiAgaW5wdXQ6IFB4dElucHV0Q29tcG9uZW50LFxyXG4gIGJ1dHRvbjogUHh0QnV0dG9uQ29tcG9uZW50LFxyXG4gIGRhdGU6IFB4dERhdGVDb21wb25lbnQsXHJcbiAgc2VsZWN0OiBQeHRTZWxlY3RDb21wb25lbnQsXHJcbiAgcmFkaW9idXR0b246IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50LFxyXG4gIGNoZWNrYm94OiBQeHRDaGVja2JveENvbXBvbmVudCxcclxuICBmaWx0ZXI6IFB4dElucHV0RmlsdGVyQ29tcG9uZW50LFxyXG59O1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbZHluYW1pY0ZpZWxkXVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZENvbmZpZztcclxuICBASW5wdXQoKSBncm91cDogRm9ybUdyb3VwO1xyXG4gIGNvbXBvbmVudFJlZjogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcclxuICApIHsgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgZGVidWdnZXI7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dElucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0SW5wdXRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOltQeHRCdXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEJ1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0RGF0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOltQeHRTZWxlY3RDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRDaGVja2JveENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY29tcG9uZW50TWFwcGVyID0ge1xyXG4gIGlucHV0OiBQeHRJbnB1dENvbXBvbmVudCxcclxuICBidXR0b246IFB4dEJ1dHRvbkNvbXBvbmVudCxcclxuICBkYXRlOiBQeHREYXRlQ29tcG9uZW50LFxyXG4gIHNlbGVjdDogUHh0U2VsZWN0Q29tcG9uZW50LFxyXG4gIHJhZGlvYnV0dG9uOiBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCxcclxuICBjaGVja2JveDogUHh0Q2hlY2tib3hDb21wb25lbnQsXHJcbiAgZmlsdGVyOiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCxcclxufTtcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW2R5bmFtaWNGaWVsZERpYWxvZ11cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmaWVsZDogRmllbGRDb25maWc7XHJcbiAgQElucHV0KCkgZ3JvdXA6IEZvcm1Hcm91cDtcclxuICBjb21wb25lbnRSZWY6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIGNvbXBvbmVudE1hcHBlclt0aGlzLmZpZWxkLnR5cGVdXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5maWVsZCA9IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS1kaWFsb2cnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nXSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdLFxuICBleHBvcnRzOltQeHREaWFsb2dGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dERpYWxvZ0ZpbHRlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RBVEEsIHVzZVZhbHVlOiB7fX0sXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TLCB1c2VWYWx1ZToge2hhc0JhY2tkcm9wOiB0cnVlfX1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQeHREaWFsb2dGaWx0ZXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQeHREaWFsb2dGaWx0ZXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRJbnB1dEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRJbnB1dEZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyB0ZW1wbGF0ZUppdFVybCB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlJztcbmltcG9ydCB7IFB4dElucHV0TW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0QnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHREYXRlTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUubW9kdWxlJztcbmltcG9ydCB7IFB4dFNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Nb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgSHR0cE1vZHVsZSxcbiAgICBQeHRJbnB1dE1vZHVsZSxcbiAgICBQeHRCdXR0b25Nb2R1bGUsXG4gICAgUHh0RGF0ZU1vZHVsZSxcbiAgICBQeHRTZWxlY3RNb2R1bGUsXG4gICAgUHh0UmFkaW9idXR0b25Nb2R1bGUsXG4gICAgUHh0Q2hlY2tib3hNb2R1bGUsXG4gICAgUHh0SW5wdXRGaWx0ZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0Q29udGVudENvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXSxcbiAgIGV4cG9ydHM6IFtQeHRDb250ZW50Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dENvbnRlbnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRNb2R1bGUgeyB9XG4iLCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uIHtcclxuICAgIGljb246IFN0cmluZztcclxuICAgIG1lbnU6IFN0cmluZztcclxuICAgIGVuYWJsZTogQm9vbGVhbjtcclxuICAgIGVudW0gOiBOdW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihpY29uOiBTdHJpbmcsIG1lbnU6IFN0cmluZywgZW5hYmxlOiBCb29sZWFuLCBpZCA6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5tZW51ID0gbWVudTtcclxuICAgICAgICB0aGlzLmVuYWJsZSA9IGVuYWJsZTtcclxuICAgICAgICB0aGlzLmVudW0gPSBpZDtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gT3B0aW9uc1N1Ym1lbnUge1xyXG4gICAgU0FMVkFSID0gMSxcclxuICAgIFBFU1FVSVNBUiA9IDIsXHJcbiAgICBMSU1QQVIgPSAzLFxyXG4gICAgTk9WTyA9IDQsXHJcbiAgICBWT0xUQVI9IDUsXHJcbiAgICBFWENMVUlSPSA2XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEJ1dHRvbiB9IGZyb20gJy4vbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsJztcbmltcG9ydCB7IE9wdGlvbnNTdWJtZW51IH0gZnJvbSAnLi9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0nO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtc3VibWVudXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c0NvbXBvbmVudDxUPiB7XG5cbiAgQElucHV0KCkgbW9kZWw/OiBUID0ge30gYXMgVDtcbiAgcHJpdmF0ZSB1cmxTZXJ2aWNlID0gXCJcIjtcblxuICBAT3V0cHV0KCkgbGlzdGluZzogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNTYXZlOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHN0YXR1c0RlbGV0ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI/OiBTdHJpbmc7XG5cbiAgc2F2ZSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5zYXZlKHRoaXMubW9kZWwpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNTYXZlLmVtaXQocmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcbiAgc2VhcmNoKCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmxvYWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMubGlzdGluZy5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIGRlbGV0ZShpZCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmRlbGV0ZShpZCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLnN0YXR1c0RlbGV0ZS5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIGNsZWFyKCkge1xuICAgdGhpcy5tb2RlbCA9IHt9IGFzIFQ7XG4gIH07XG4gIGFkZCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2FkZCgpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9O1xuICBiYWNrKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYmFjaygpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9O1xuXG4gIGJ1dHRvbnM6IFB4dEJ1dHRvbltdID0gW107XG4gIGVuYWJsZVNhdmUgPSB0cnVlO1xuICBlbmFibGVCYWNrID0gdHJ1ZTtcbiAgZW5hYmxlQ2xlYXIgPSB0cnVlO1xuICBlbmFibGVTZWFyY2ggPSB0cnVlO1xuICBlbmFibGVBZGQgPSB0cnVlO1xuICBlbmFibGVEZWxldGUgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfcHh0QXBwU2VydmljZTogUHh0QXBwQ29tcG9uZW50U2VydmljZSwgcHVibGljIF9zZXJ2aWNlQmFzZTogUmVxdWVzdEJhc2VTZXJ2aWNlLHB1YmxpYyBoZWxwZXI6ICBIdHRwSGVscGVyU2VydmljZSkge1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJrZXlib2FyZF9iYWNrc3BhY2VcIiwgXCJWT0xUQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuVk9MVEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIlNBTFZBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5TQUxWQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiTk9WT1wiLCB0cnVlLCBPcHRpb25zU3VibWVudS5OT1ZPKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkxJTVBBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5MSU1QQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwic2VhcmNoXCIsIFwiUEVTUVVJU0FSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlBFU1FVSVNBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJFWENMVUlSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkVYQ0xVSVIpKTtcblxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCkgKyB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB0aGlzLl9zZXJ2aWNlQmFzZS51cmxTZXJ2aWNlQXV0byA9IHRoaXMudXJsU2VydmljZSA7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnVybFNlcnZpY2UpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFB4dFN1Ym1lbnVzQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtc3VibWVudXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRTdWJtZW51c0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRTdWJtZW51c0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczpbUHh0SHR0cFNlcnZpY2UsIFJlcXVlc3RCYXNlU2VydmljZSwgSHR0cEhlbHBlclNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFN1Ym1lbnVzTW9kdWxlIHsgfVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHh0RGF0ZXBpY2tlckNvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdweHQtZGF0ZXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHh0RGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogU3RyaW5nID0gXCJFc2NvbGhhIHVtYSBkYXRhXCI7XHJcbiAgQElucHV0KCkgbWluRGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBtYXhEYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpIGlucHV0RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZGF0ZU1vZGVsOiBEYXRlO1xyXG5cclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG5cclxuICBnZXQgZGF0YVNlbGVjaW9uYWRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0ZU1vZGVsO1xyXG4gIH1cclxuXHJcbiAgc2V0IGRhdGFTZWxlY2lvbmFkYShkOiBEYXRlKSB7XHJcbiAgICBpZiAoZCAhPT0gdGhpcy5kYXRlTW9kZWwpIHtcclxuICAgICAgdGhpcy5kYXRlTW9kZWwgPSBkO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkJsdXIoKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuZGF0ZU1vZGVsID0gdmFsdWU7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG9uRGF0ZUNoYW5nZSgpIHtcclxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0cnVlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy53cml0ZVZhbHVlKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLm9uRGF0ZUNoYW5nZSgpO1xyXG4gIH1cclxuICBcclxufSIsIlxyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUHh0RGF0ZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFtEYXRlUGlwZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZXBpY2tlckNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1B4dERhdGVwaWNrZXJDb21wb25lbnRdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHh0RGF0ZVBpY2tlck1vZHVsZSB7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1weHQtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGZhbHNlKTtcbiAgfVxuICBjb25maXJtYXRpb24oZXZlbnQpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgfVxuXG4gIHNlbGVjdFJvdyhyb3cpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShyb3cpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREaWFsb2dDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dERpYWxvZ0NvbXBvbmVudF1cblxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1weHQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZmlsdGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBkYXRhIDogYW55O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBkYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RmlsdGVyQ29tcG9uZW50XVxuIFxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSwgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGZpbHRlcnM6IGFueTtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgZGlzcGxheWVkQ29sdW1ucyA9IFsnY29kaWdvJywgJ2Rlc2NyaWNhbyddO1xuICBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIC8vU2VhcmNoLlxuICBzZWFyY2goKSB7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBNYXA8YW55LCBhbnk+KCk7XG4gICAgaWYgKHRoaXMuZmlsdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1trZXldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBhcmFtcy5zZXQoa2V5LCB0aGlzLmZpbHRlcnNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgfSk7XG4gIH07XG5cbiAgLy9Sb3cgU2VsZWN0ZWRcbiAgc2VsZWN0Um93KHJvdykge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHJvdyk7XG4gIH07XG5cbiAgLy9DbG9zZVxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh1bmRlZmluZWQpO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnRdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV0sXG4gIGV4cG9ydHM6W1B4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREFUQSwgdXNlVmFsdWU6IHt9fSxcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMsIHVzZVZhbHVlOiB7aGFzQmFja2Ryb3A6IHRydWV9fVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0ZpbHRlckN1c3RvbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IHB4dEVudW1UYWdIdG1sIH0gZnJvbSBcIi4uL2VudW0vcHh0LWVudW0tdGFnLWh0bWxcIjtcclxuaW1wb3J0IHsgcHh0RW51bVR5cGVUYWcgfSBmcm9tIFwiLi4vZW51bS9weHQtZW51bS10eXBlLXRhZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBweHRGaWVsZHMge1xyXG4gICAgdHlwZTogcHh0RW51bVR5cGVUYWc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgdGFnOiBweHRFbnVtVGFnSHRtbDtcclxufVxyXG4iLCJleHBvcnQgZW51bSBweHRFbnVtVGFnSHRtbCB7XHJcbiAgICBJbnB1dCA9IDEsXHJcbiAgICBDb21ibyA9IDIsXHJcbiAgICBGaWx0ZXIgPSAzLFxyXG4gICAgQ2hlY2tib3ggPSA0XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC11cGxvYWQtZmlsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDpzdHJpbmc7XG4gIEBPdXRwdXQoKSBmaWxlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGFycmF5SW1hZ2VzIDpGaWxlUmVhZGVyO1xuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIG9uQ2hhbmdlSW1hZ2VtKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGltYWdlbTogRmlsZSA9IGV2ZW50O1xuICAgICAgdGhpcy5wbGFjZWhvbGRlcj0gaW1hZ2VtLm5hbWU7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVNlbGVjdGVkLm5leHQoaW1hZ2VtKTtcbiAgICB9XG5cbiAgfTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6W1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHMgOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRVcGxvYWRGaWxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hHYWxsZXJ5T3B0aW9ucywgTmd4R2FsbGVyeUltYWdlLCBOZ3hHYWxsZXJ5QW5pbWF0aW9uIH0gZnJvbSAnbmd4LWdhbGxlcnknO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZ2FsbGVyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBnYWxsZXJ5T3B0aW9uczogTmd4R2FsbGVyeU9wdGlvbnNbXTtcbiAgQElucHV0KCkgZ2FsbGVyeUltYWdlczogTmd4R2FsbGVyeUltYWdlW107XG4gIEBJbnB1dCgpIHdpZHRoOiBhbnkgPSBcIjEwMCVcIjtcbiAgQElucHV0KCkgaGVpZ2h0OiBhbnkgPSAnNDAwcHgnO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZ2FsbGVyeU9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICB0aHVtYm5haWxzQ29sdW1uczogNCxcbiAgICAgICAgaW1hZ2VBbmltYXRpb246IE5neEdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgIH0sXG4gICAgICAvLyBtYXgtd2lkdGggODAwXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIGltYWdlUGVyY2VudDogODAsXG4gICAgICAgIHRodW1ibmFpbHNQZXJjZW50OiAyMCxcbiAgICAgICAgdGh1bWJuYWlsc01hcmdpbjogMjAsXG4gICAgICAgIHRodW1ibmFpbE1hcmdpbjogMjBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDQwMCxcbiAgICAgICAgcHJldmlldzogZmFsc2VcbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE5neEdhbGxlcnlNb2R1bGUgfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5pbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsIE5neEdhbGxlcnlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkRpcmVjdGl2ZSIsIlZpZXdDb250YWluZXJSZWYiLCJTdWJqZWN0IiwiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdG9yUmVmIiwiTWVkaWFNYXRjaGVyIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiSW5qZWN0IiwiSW5wdXQiLCJWaWV3Q2hpbGQiLCJNYXRNZW51VHJpZ2dlciIsIk5nTW9kdWxlIiwiQ2RrVGFibGVNb2R1bGUiLCJDZGtUcmVlTW9kdWxlIiwiTWF0QXV0b2NvbXBsZXRlTW9kdWxlIiwiTWF0QmFkZ2VNb2R1bGUiLCJNYXRCb3R0b21TaGVldE1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEJ1dHRvblRvZ2dsZU1vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJNYXRDaGVja2JveE1vZHVsZSIsIk1hdENoaXBzTW9kdWxlIiwiTWF0U3RlcHBlck1vZHVsZSIsIk1hdERhdGVwaWNrZXJNb2R1bGUiLCJNYXREaWFsb2dNb2R1bGUiLCJNYXREaXZpZGVyTW9kdWxlIiwiTWF0RXhwYW5zaW9uTW9kdWxlIiwiTWF0R3JpZExpc3RNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRMaXN0TW9kdWxlIiwiTWF0TWVudU1vZHVsZSIsIk1hdE5hdGl2ZURhdGVNb2R1bGUiLCJNYXRQYWdpbmF0b3JNb2R1bGUiLCJNYXRQcm9ncmVzc0Jhck1vZHVsZSIsIk1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSIsIk1hdFJhZGlvTW9kdWxlIiwiTWF0UmlwcGxlTW9kdWxlIiwiTWF0U2VsZWN0TW9kdWxlIiwiTWF0U2lkZW5hdk1vZHVsZSIsIk1hdFNsaWRlck1vZHVsZSIsIk1hdFNsaWRlVG9nZ2xlTW9kdWxlIiwiTWF0U25hY2tCYXJNb2R1bGUiLCJNYXRTb3J0TW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRUYWJzTW9kdWxlIiwiTWF0VG9vbGJhck1vZHVsZSIsIk1hdFRvb2x0aXBNb2R1bGUiLCJNYXRUcmVlTW9kdWxlIiwiQnJvd3Nlck1vZHVsZSIsIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJNYXRMaW5lTW9kdWxlIiwiTWF0Q29tbW9uTW9kdWxlIiwiTWF0T3B0aW9uTW9kdWxlIiwiTWF0Rm9ybUZpZWxkTW9kdWxlIiwiTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiSHR0cENsaWVudCIsIm1hcCIsIkluamVjdG9yIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJIZWFkZXJzIiwiY2F0Y2hFcnJvciIsIlJlcXVlc3RPcHRpb25zIiwiT2JzZXJ2YWJsZSIsIlhIUkJhY2tlbmQiLCJIdHRwIiwiSHR0cEhlYWRlcnMiLCJIdHRwUmVxdWVzdCIsIlBpcGUiLCJVcHBlckNhc2VQaXBlIiwiRGF0ZVBpcGUiLCJyb3V0ZXIiLCJSb3V0ZXIiLCJFdmVudEVtaXR0ZXIiLCJWYWxpZGF0b3JzIiwiRm9ybUJ1aWxkZXIiLCJPdXRwdXQiLCJIb3N0TGlzdGVuZXIiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJodHRwIiwiTWF0VGFibGVEYXRhU291cmNlIiwiTWF0RGlhbG9nUmVmIiwiTUFUX0RJQUxPR19EQVRBIiwiTWF0RGlhbG9nIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSIsIk5PX0VSUk9SU19TQ0hFTUEiLCJjb21wb25lbnRNYXBwZXIiLCJNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyIsIkh0dHBDbGllbnRNb2R1bGUiLCJIdHRwTW9kdWxlIiwibm9vcCIsIkNVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SIiwiTmd4R2FsbGVyeUFuaW1hdGlvbiIsIk5neEdhbGxlcnlNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO1FBTUUsd0JBQW1CLGdCQUFrQztZQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1NBQUs7O29CQUozREEsY0FBUyxTQUFD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