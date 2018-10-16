import { Directive, ViewContainerRef, Injectable, ChangeDetectorRef, Component, Input, ViewChild, ComponentFactoryResolver, Inject, NgModule, Injector, Pipe, Output, EventEmitter, HostListener, forwardRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatMenuTrigger, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatLineModule, MatCommonModule, MatOptionModule, MatFormFieldModule, MatPseudoCheckboxModule, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { CommonModule, UpperCasePipe, DatePipe } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpRequest, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { __extends } from 'tslib';
import { Headers, Http, RequestOptions, XHRBackend, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryModule } from 'ngx-gallery';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtContentBody = /** @class */ (function () {
    function PxtContentBody(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    PxtContentBody.decorators = [
        { type: Directive, args: [{
                    selector: '[ad-pxt-content]',
                },] }
    ];
    /** @nocollapse */
    PxtContentBody.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return PxtContentBody;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtAppComponentService = /** @class */ (function () {
    function PxtAppComponentService() {
        this.submenusItens = new Subject();
        this.submenusItensObservable = this.submenusItens.asObservable();
        this._loadComponent = new Subject();
        this.loadComponentObservable = this._loadComponent.asObservable();
        this._setUserLogged = new Subject();
        this.userLoggedObservable = this._setUserLogged.asObservable();
        this._setInfoInit = new Subject();
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
        { type: Injectable }
    ];
    return PxtAppComponentService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtAppComponent = /** @class */ (function () {
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
            (/** @type {?} */ (componentRef.instance)).data = componentObj.data;
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
        { type: Component, args: [{
                    selector: 'pxt-app',
                    template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button style=\"z-index: 1;\" (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <img [src]=\"urlImg\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{system | uppercaseFirst}}</h1>\n    <h1 class=\"system\" *ngIf=\"!mobileQuery.matches\">{{menuSelected | uppercaseFirst}}</h1>\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button [matMenuTriggerFor]=\"notification\"><mat-icon>notifications</mat-icon> </button>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    <mat-menu #notification=\"matMenu\" [overlapTrigger]=\"false\">\n        <span disabled mat-menu-item><small>Sem novas notifica\u00E7\u00F5es</small></span>\n      </mat-menu>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <span disabled mat-menu-item *ngIf=\"usuerLogged\" ><small>Ol\u00E1, {{usuerLogged | uppercaseFirst}}</small></span>\n      <button mat-menu-item>\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [mode]=\"'over'\" [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n      <span *ngFor=\"let item of menus\">\n        <!-- Handle branch node menu items -->\n        <span *ngIf=\"item.childs && item.childs.length > 0\">\n          <button mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <pxt-app-menu-item #menu [items]=\"item.childs\"></pxt-app-menu-item>\n        </span>\n        <!-- Handle leaf node menu items -->\n        <span *ngIf=\"!item.childs || item.childs.length === 0\">\n          <button *ngIf=\"item.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"selectItemMenu(item)\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <button *ngIf=\"item.menuType=='group'\" mat-menu-item color=\"primary\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n        </span>\n      </span>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n\n</div>",
                    styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}.form{margin-left:10px;border:2px solid #d3d3d3;width:600px;padding-left:5px;margin-top:10px}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}pxt-input{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    PxtAppComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: MediaMatcher },
        { type: ComponentFactoryResolver },
        { type: undefined, decorators: [{ type: Inject, args: [PxtAppComponentService,] }] }
    ]; };
    PxtAppComponent.propDecorators = {
        matMenu: [{ type: Input }],
        subContainer1: [{ type: ViewChild, args: ['menus', { read: ViewContainerRef },] }],
        contextMenuTrigger: [{ type: ViewChild, args: ['contextMenuTrigger', { read: MatMenuTrigger },] }],
        adHost: [{ type: ViewChild, args: [PxtContentBody,] }]
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
var MaterialAngularModule = /** @class */ (function () {
    function MaterialAngularModule() {
    }
    MaterialAngularModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CdkTableModule,
                        CdkTreeModule,
                        MatAutocompleteModule,
                        MatBadgeModule,
                        MatBottomSheetModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatChipsModule,
                        MatStepperModule,
                        MatDatepickerModule,
                        MatDialogModule,
                        MatDividerModule,
                        MatExpansionModule,
                        MatGridListModule,
                        MatIconModule,
                        MatInputModule,
                        MatListModule,
                        MatMenuModule,
                        MatNativeDateModule,
                        MatPaginatorModule,
                        MatProgressBarModule,
                        MatProgressSpinnerModule,
                        MatRadioModule,
                        MatRippleModule,
                        MatSelectModule,
                        MatSidenavModule,
                        MatSliderModule,
                        MatSlideToggleModule,
                        MatSnackBarModule,
                        MatSortModule,
                        MatTableModule,
                        MatTabsModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        MatTreeModule,
                        MatIconModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        CommonModule,
                        FormsModule,
                        MatCardModule, MatIconModule, MatLineModule,
                        MatListModule, MatSortModule, MatTabsModule, MatTreeModule,
                        MatBadgeModule, MatChipsModule, MatInputModule, MatRadioModule,
                        MatTableModule, MatButtonModule, MatCommonModule, MatDialogModule,
                        MatOptionModule, MatRippleModule, MatSelectModule, MatSliderModule,
                        MatDividerModule, MatSidenavModule, MatStepperModule, MatToolbarModule,
                        MatToolbarModule, MatTooltipModule, MatCheckboxModule, MatGridListModule,
                        MatSnackBarModule, MatExpansionModule, MatFormFieldModule, MatPaginatorModule,
                        MatDatepickerModule, MatNativeDateModule, MatBottomSheetModule, MatProgressBarModule,
                        MatSlideToggleModule, MatAutocompleteModule, MatButtonToggleModule, MatPseudoCheckboxModule,
                        MatProgressSpinnerModule, BrowserModule, CommonModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        FormsModule,
                        MatNativeDateModule,
                        ReactiveFormsModule,
                    ],
                    exports: [
                        CdkTableModule,
                        CdkTreeModule,
                        MatAutocompleteModule,
                        MatBadgeModule,
                        MatBottomSheetModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatChipsModule,
                        MatStepperModule,
                        MatDatepickerModule,
                        MatDialogModule,
                        MatDividerModule,
                        MatExpansionModule,
                        MatGridListModule,
                        MatIconModule,
                        MatInputModule,
                        MatListModule,
                        MatMenuModule,
                        MatNativeDateModule,
                        MatPaginatorModule,
                        MatProgressBarModule,
                        MatProgressSpinnerModule,
                        MatRadioModule,
                        MatRippleModule,
                        MatSelectModule,
                        MatSidenavModule,
                        MatSliderModule,
                        MatSlideToggleModule,
                        MatSnackBarModule,
                        MatSortModule,
                        MatTableModule,
                        MatTabsModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        MatTreeModule,
                        MatIconModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        CommonModule,
                        FormsModule,
                        MatMenuModule, MatCardModule, MatIconModule, MatLineModule,
                        MatListModule, MatSortModule, MatTabsModule, MatTreeModule,
                        MatBadgeModule, MatChipsModule, MatInputModule, MatRadioModule,
                        MatTableModule, MatButtonModule, MatCommonModule, MatDialogModule,
                        MatOptionModule, MatRippleModule, MatSelectModule, MatSliderModule,
                        MatDividerModule, MatSidenavModule, MatStepperModule, MatToolbarModule,
                        MatToolbarModule, MatTooltipModule, MatCheckboxModule, MatGridListModule,
                        MatSnackBarModule, MatExpansionModule, MatFormFieldModule, MatPaginatorModule,
                        MatDatepickerModule, MatNativeDateModule, MatBottomSheetModule, MatProgressBarModule,
                        MatSlideToggleModule, MatAutocompleteModule, MatButtonToggleModule, MatPseudoCheckboxModule,
                        MatProgressSpinnerModule, BrowserModule, CommonModule,
                        MatNativeDateModule,
                        ReactiveFormsModule
                    ]
                },] }
    ];
    return MaterialAngularModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ConfigService = /** @class */ (function () {
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
        var injectHttp = this.injector.get(HttpClient);
        return new Promise(function (resolve) {
            injectHttp.get(url).pipe(map(function (res) { return res; })).subscribe(function (config) {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return ConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HttpHelperService = /** @class */ (function () {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpHelperService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    return HttpHelperService;
}());

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
var TokenService = /** @class */ (function () {
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
        var decoded = /** @type {?} */ (jwt_decode(token));
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
        { type: Injectable }
    ];
    /** @nocollapse */
    TokenService.ctorParameters = function () { return []; };
    return TokenService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtHttpService = /** @class */ (function (_super) {
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
        var headers = new Headers();
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
        result = observable.pipe(catchError(function (error) {
            return _this.onCatch(error);
        }), map(function (res) {
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
        var requestOptions = new RequestOptions({ headers: this.getHeaders() });
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
        var requestOptions = new RequestOptions({ headers: this.getHeaders() });
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
        var requestOptions = new RequestOptions({ headers: this.getHeaders() });
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
        var requestOptions = new RequestOptions({ headers: this.getHeaders() });
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
        var requestOptions = new RequestOptions({ headers: this.getHeaders() });
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
            options = new RequestOptions({ headers: this.getHeaders() });
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
        return Observable.throw(error);
    };
    PxtHttpService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PxtHttpService.ctorParameters = function () { return [
        { type: XHRBackend },
        { type: RequestOptions },
        { type: Injector },
        { type: TokenService }
    ]; };
    return PxtHttpService;
}(Http));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RequestBaseService = /** @class */ (function () {
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
        var httpOptions = new HttpHeaders(header);
        /** @type {?} */
        var token = this.tokenService.getAccessToken();
        /** @type {?} */
        var formdata = this.setParamsFormdata(params);
        /** @type {?} */
        var req = new HttpRequest('POST', path, formdata, {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    RequestBaseService.ctorParameters = function () { return [
        { type: PxtHttpService },
        { type: HttpHelperService },
        { type: TokenService },
        { type: HttpClient }
    ]; };
    return RequestBaseService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var UpercaseFirst = /** @class */ (function (_super) {
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
        { type: Pipe, args: [{
                    name: 'uppercaseFirst'
                },] }
    ];
    return UpercaseFirst;
}(UpperCasePipe));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Constants = /** @class */ (function () {
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
var DateFormatPipe = /** @class */ (function (_super) {
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
        { type: Pipe, args: [{
                    name: 'dateFormat'
                },] }
    ];
    return DateFormatPipe;
}(DatePipe));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DateTimeFormatPipe = /** @class */ (function (_super) {
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
        var datePipe = new DatePipe("en-US");
        return datePipe.transform(value, Constants.DATE_TIME_FMT);
    };
    DateTimeFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'dateTimeFormat'
                },] }
    ];
    return DateTimeFormatPipe;
}(DatePipe));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PipeModule = /** @class */ (function () {
    function PipeModule() {
    }
    PipeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
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
var PxtAppMenuItemComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'pxt-app-menu-item',
                    template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n  <span *ngFor=\"let child of items\">\n    <!-- Handle branch node menu items -->\n    <span *ngIf=\"child.childs && child.childs.length > 0\">\n      <a mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n      <pxt-app-menu-item #menu [items]=\"child.childs\"></pxt-app-menu-item>\n    </span>\n    <!-- Handle leaf node menu items -->\n    <span *ngIf=\"!child.childs || child.childs.length === 0\">\n      <a *ngIf=\"child.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"loadComponent(child)\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n\n      <a *ngIf=\"child.menuType=='group'\" mat-menu-item color=\"primary\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n    </span>\n  </span>\n</mat-menu>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PxtAppMenuItemComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PxtAppComponentService,] }] }
    ]; };
    PxtAppMenuItemComponent.propDecorators = {
        items: [{ type: Input }],
        childMenu: [{ type: ViewChild, args: ['childMenu',] }]
    };
    return PxtAppMenuItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtAppMenuItemModule = /** @class */ (function () {
    function PxtAppMenuItemModule() {
    }
    PxtAppMenuItemModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var HashDirective = /** @class */ (function () {
    function HashDirective(vcRef) {
        this.vcRef = vcRef;
    }
    HashDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[hash]',
                },] }
    ];
    /** @nocollapse */
    HashDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    HashDirective.propDecorators = {
        hash: [{ type: Input }]
    };
    return HashDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AuthorityService = /** @class */ (function () {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthorityService.ctorParameters = function () { return [
        { type: PxtHttpService },
        { type: HttpHelperService }
    ]; };
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
var VisibleInRolesGuard = /** @class */ (function () {
    function VisibleInRolesGuard(router, httpHelper, authorityService) {
        this.router = router;
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
                var decoded_1 = /** @type {?} */ (jwt_decode(token));
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
        { type: Injectable }
    ];
    /** @nocollapse */
    VisibleInRolesGuard.ctorParameters = function () { return [
        { type: Router },
        { type: HttpHelperService },
        { type: AuthorityService }
    ]; };
    return VisibleInRolesGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtAppModule = /** @class */ (function () {
    function PxtAppModule() {
    }
    PxtAppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule,
                        PipeModule,
                        MatMenuModule,
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
var pxtInputField = /** @class */ (function () {
    function pxtInputField() {
    }
    return pxtInputField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var pxtCheckboxField = /** @class */ (function () {
    function pxtCheckboxField() {
    }
    return pxtCheckboxField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var pxtDateField = /** @class */ (function () {
    function pxtDateField() {
    }
    return pxtDateField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var pxtFilterField = /** @class */ (function () {
    function pxtFilterField() {
    }
    return pxtFilterField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var pxtRadioButtonField = /** @class */ (function () {
    function pxtRadioButtonField() {
    }
    return pxtRadioButtonField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var pxtSelectField = /** @class */ (function () {
    function pxtSelectField() {
    }
    return pxtSelectField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var pxtfilterCustomField = /** @class */ (function () {
    function pxtfilterCustomField() {
    }
    return pxtfilterCustomField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtContentComponent = /** @class */ (function () {
    //Constructor
    function PxtContentComponent(fb) {
        this.fb = fb;
        this.fields = [];
        this.cols = 5;
        this.colsInitial = 5;
        this.submit = new EventEmitter();
    }
    Object.defineProperty(PxtContentComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
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
                        var instanceFilterCustom = /** @type {?} */ (_this.field[key]);
                        instanceFilterCustom.type = 'filter';
                        _this.fields.push(instanceFilterCustom);
                        break;
                    //Input
                    case pxtInputField.name:
                        /** @type {?} */
                        var instanceInput = /** @type {?} */ (_this.field[key]);
                        instanceInput.type = 'input';
                        _this.fields.push(instanceInput);
                        break;
                    //Checkbox
                    case pxtCheckboxField.name:
                        /** @type {?} */
                        var instanceCheck = /** @type {?} */ (_this.field[key]);
                        instanceCheck.type = 'checkbox';
                        _this.fields.push(instanceCheck);
                        break;
                    //Date
                    case pxtDateField.name:
                        /** @type {?} */
                        var instanceDate = /** @type {?} */ (_this.field[key]);
                        instanceDate.type = 'date';
                        _this.fields.push(instanceDate);
                        break;
                    //Filter
                    case pxtFilterField.name:
                        /** @type {?} */
                        var instanceFilter = /** @type {?} */ (_this.field[key]);
                        instanceFilter.type = 'filter';
                        _this.fields.push(instanceFilter);
                        break;
                    //RadioButton
                    case pxtRadioButtonField.name:
                        /** @type {?} */
                        var instanceRadio = /** @type {?} */ (_this.field[key]);
                        instanceRadio.type = 'radio';
                        _this.fields.push(instanceRadio);
                        break;
                    //Select
                    case pxtSelectField.name:
                        /** @type {?} */
                        var instanceSelect = /** @type {?} */ (_this.field[key]);
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
            return Validators.compose(validList_1);
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
        { type: Component, args: [{
                    selector: 'pxt-content-body',
                    template: "<mat-card class=\"pxt-mat-card\">\n    <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\" (window:resize)=\"onResize($event)\">\n            <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n                <div>\n                <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n                    <ng-container class=\"pxt-style\" dynamicField [field]=\"field\" [group]=\"form\">\n                    </ng-container>\n                </mat-grid-tile>\n                <mat-grid-tile class=\"mat-grid-tile-content\">\n                </mat-grid-tile>\n            </div>\n            </mat-grid-list>\n        </form>\n    </div>\n    <div *ngIf=\"!auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\" (window:resize)=\"onResize($event)\">\n                <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n                        <ng-content></ng-content>\n                </mat-grid-list>\n        </form>\n    </div>\n</mat-card>",
                    styles: [".pxt-content-body{padding:10px}.pxt-content-body mat-card{margin:5px;border-top:4px solid;border-radius:4px;border-bottom:4px solid}mat-form-field,pxt-datepicker,select-filial,td{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}.div-imagem-cardapio{margin-bottom:2%;text-align:center}.pxt-component-tag{width:100%}.pxt-style{width:100%;height:100%}::ng-deep .mat-grid-tile .mat-figure{right:15px!important}.pxt-mat-card{padding:10px!important}"]
                }] }
    ];
    /** @nocollapse */
    PxtContentComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    PxtContentComponent.propDecorators = {
        data: [{ type: Input }],
        auto: [{ type: Input }],
        fields: [{ type: Input }],
        cols: [{ type: Input }],
        field: [{ type: Input }],
        submit: [{ type: Output }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return PxtContentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtInputComponent = /** @class */ (function () {
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
        { type: Component, args: [{
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
var PxtButtonComponent = /** @class */ (function () {
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
        { type: Component, args: [{
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
var PxtDateComponent = /** @class */ (function () {
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
        { type: Component, args: [{
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
var PxtCheckboxComponent = /** @class */ (function () {
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
        { type: Component, args: [{
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
var PxtRadiobuttonComponent = /** @class */ (function () {
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
        { type: Component, args: [{
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
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return PxtSelectComponent; }),
    multi: true
};
var PxtSelectComponent = /** @class */ (function () {
    function PxtSelectComponent(pxthttp) {
        this.pxthttp = pxthttp;
        this.required = false;
        this.placeholder = 'Selecione';
        this.selectionChange = new EventEmitter();
        this.controller = "";
        this.auto = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.options = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PxtSelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        debugger;
        if (changes["params"] != undefined && !changes["params"].firstChange) {
            this.params = changes["params"].currentValue;
            this.find();
        }
    };
    Object.defineProperty(PxtSelectComponent.prototype, "selectedOption", {
        get: /**
         * @return {?}
         */
        function () {
            return this.option;
        },
        set: /**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            if (f != undefined) {
                if (f !== this.option) {
                    this.option = f;
                    this.onChangeCallback(f.codigo);
                    this.selectionChange.emit(this.option);
                }
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
        console.log(this.params);
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
        { type: Component, args: [{
                    selector: 'pxt-select',
                    template: "\n\n<mat-form-field *ngIf=\"auto\" class=\"demo-full-width\" [formGroup]=\"group\">\n  <mat-select [placeholder]=\"field.label | uppercaseFirst\" [formControlName]=\"field.name\"  >\n    <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n    <mat-option *ngFor=\"let item of field.options\" [value]=\"item.identificador\">{{item.codigo +' - '+item.descricao}}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<mat-form-field *ngIf=\"!auto\" class=\"demo-full-width\">\n    <mat-select placeholder=\"{{ placeholder }}\" required=\"{{required}}\" [(ngModel)]=\"selectedOption\">\n      <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n      <mat-option *ngFor=\"let option of options\" [value]=\"option\">\n        {{ option.codigo + ' - ' + option.descricao }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>",
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                    styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    PxtSelectComponent.ctorParameters = function () { return [
        { type: RequestBaseService }
    ]; };
    PxtSelectComponent.propDecorators = {
        required: [{ type: Input }],
        placeholder: [{ type: Input }],
        model: [{ type: Input }],
        params: [{ type: Input }],
        selectionChange: [{ type: Output }]
    };
    return PxtSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtDialogFilterComponent = /** @class */ (function () {
    function PxtDialogFilterComponent(fb, dialogRef, data, helper, http) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.helper = helper;
        this.http = http;
        this.displayedColumns = ['codigo', 'descricao'];
        this.dataSource = new MatTableDataSource();
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
         */
        function () {
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
                        var instanceFilterCustom = /** @type {?} */ (_this.field[key]);
                        instanceFilterCustom.type = 'filter';
                        _this.fields.push(instanceFilterCustom);
                        _this.fieldsHist.push(instanceFilterCustom);
                        break;
                    //Input
                    case pxtInputField.name:
                        /** @type {?} */
                        var instanceInput = /** @type {?} */ (_this.field[key]);
                        instanceInput.type = 'input';
                        _this.fields.push(instanceInput);
                        _this.fieldsHist.push(instanceInput);
                        break;
                    //Checkbox
                    case pxtCheckboxField.name:
                        /** @type {?} */
                        var instanceCheck = /** @type {?} */ (_this.field[key]);
                        instanceCheck.type = 'checkbox';
                        _this.fields.push(instanceCheck);
                        _this.fieldsHist.push(instanceCheck);
                        break;
                    //Date
                    case pxtDateField.name:
                        /** @type {?} */
                        var instanceDate = /** @type {?} */ (_this.field[key]);
                        instanceDate.type = 'date';
                        _this.fields.push(instanceDate);
                        _this.fieldsHist.push(instanceDate);
                        break;
                    //Filter
                    case pxtFilterField.name:
                        /** @type {?} */
                        var instanceFilter = /** @type {?} */ (_this.field[key]);
                        instanceFilter.type = 'filter';
                        _this.fields.push(instanceFilter);
                        _this.fieldsHist.push(instanceFilter);
                        break;
                    //RadioButton
                    case pxtRadioButtonField.name:
                        /** @type {?} */
                        var instanceRadio = /** @type {?} */ (_this.field[key]);
                        instanceRadio.type = 'radio';
                        _this.fields.push(instanceRadio);
                        _this.fieldsHist.push(instanceRadio);
                        break;
                    //Select
                    case pxtSelectField.name:
                        /** @type {?} */
                        var instanceSelect = /** @type {?} */ (_this.field[key]);
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
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
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
            return Validators.compose(validList_1);
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    PxtDialogFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-dialog-filter',
                    template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\"><mat-icon>close</mat-icon></button>\n   \n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content >\n    <mat-card>\n      <div *ngIf=\"!auto\">\n        <table>\n          <tr>\n            <td class=\"td-id\">\n              <mat-form-field>\n                <input type=\"number\" matInput placeholder=\"Codigo\" [(ngModel)]=\"filter.code\">\n              </mat-form-field>\n            </td>\n            <td>\n              <mat-form-field>\n                <input matInput placeholder=\"Descri\u00E7\u00E3o\" [(ngModel)]=\"filter.description\">\n              </mat-form-field>\n            </td>\n          </tr>\n        </table>\n      </div>\n\n      <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\">\n          <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n              <ng-container dynamicFieldDialog [field]=\"field\" [group]=\"form\">\n              </ng-container>\n            </mat-grid-tile>\n            <mat-grid-tile class=\"mat-grid-tile-content\">\n            </mat-grid-tile>\n          </mat-grid-list>\n        </form>\n      </div>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                    styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}"]
                }] }
    ];
    /** @nocollapse */
    PxtDialogFilterComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
        { type: HttpHelperService },
        { type: RequestBaseService }
    ]; };
    PxtDialogFilterComponent.propDecorators = {
        paginator: [{ type: ViewChild, args: [MatPaginator,] }],
        sort: [{ type: ViewChild, args: [MatSort,] }]
    };
    return PxtDialogFilterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtInputFilterComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'pxt-input-filter',
                    template: "<!--\n<mat-grid-list cols=\"6\" rowHeight=\"5:3\">\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='5'>\n    <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" disabled=\"isDisabled\">\n      <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n      <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n        <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n      </ng-container>\n    </mat-form-field>\n  </mat-grid-tile>\n\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='1'>\n    <button mat-icon-button>\n      <mat-icon (click)=\"openFilter()\">search</mat-icon>\n    </button>\n  </mat-grid-tile>\n\n</mat-grid-list>\n-->\n<mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label | uppercaseFirst\" size=\"10\" [type]=\"field.inputType\">\n    <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n      <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n    </ng-container>\n  </mat-form-field>",
                    styles: ["mat-form-field{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}:host{width:100%;height:100%}.pxt-dialog .mat-dialog-container{padding:0!important}::ng-deep .mat-dialog-container{padding:0!important}"]
                }] }
    ];
    /** @nocollapse */
    PxtInputFilterComponent.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
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
var DynamicFieldDirective = /** @class */ (function () {
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
        { type: Directive, args: [{
                    selector: "[dynamicField]"
                },] }
    ];
    /** @nocollapse */
    DynamicFieldDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef }
    ]; };
    DynamicFieldDirective.propDecorators = {
        field: [{ type: Input }],
        group: [{ type: Input }]
    };
    return DynamicFieldDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtInputModule = /** @class */ (function () {
    function PxtInputModule() {
    }
    PxtInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var PxtButtonModule = /** @class */ (function () {
    function PxtButtonModule() {
    }
    PxtButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var PxtDateModule = /** @class */ (function () {
    function PxtDateModule() {
    }
    PxtDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var PxtSelectModule = /** @class */ (function () {
    function PxtSelectModule() {
    }
    PxtSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule,
                        PipeModule
                    ],
                    exports: [PxtSelectComponent],
                    entryComponents: [PxtSelectComponent],
                    declarations: [PxtSelectComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
                },] }
    ];
    return PxtSelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtRadiobuttonModule = /** @class */ (function () {
    function PxtRadiobuttonModule() {
    }
    PxtRadiobuttonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var PxtCheckboxModule = /** @class */ (function () {
    function PxtCheckboxModule() {
    }
    PxtCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var DynamicFieldDirectiveDialog = /** @class */ (function () {
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
        { type: Directive, args: [{
                    selector: "[dynamicFieldDialog]"
                },] }
    ];
    /** @nocollapse */
    DynamicFieldDirectiveDialog.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef }
    ]; };
    DynamicFieldDirectiveDialog.propDecorators = {
        field: [{ type: Input }],
        group: [{ type: Input }]
    };
    return DynamicFieldDirectiveDialog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ɵ0$1 = {}, ɵ1 = { hasBackdrop: true };
var PxtDialogFilterModule = /** @class */ (function () {
    function PxtDialogFilterModule() {
    }
    PxtDialogFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule
                    ],
                    declarations: [PxtDialogFilterComponent, DynamicFieldDirectiveDialog],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                    exports: [PxtDialogFilterComponent],
                    entryComponents: [PxtDialogFilterComponent],
                    providers: [
                        { provide: MAT_DIALOG_DATA, useValue: ɵ0$1 },
                        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: ɵ1 }
                    ]
                },] }
    ];
    return PxtDialogFilterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtInputFilterModule = /** @class */ (function () {
    function PxtInputFilterModule() {
    }
    PxtInputFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var PxtContentModule = /** @class */ (function () {
    function PxtContentModule() {
    }
    PxtContentModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule,
                        HttpClientModule,
                        HttpModule,
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
var PxtButton = /** @class */ (function () {
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
var PxtSubmenusComponent = /** @class */ (function () {
    function PxtSubmenusComponent(_pxtAppService, _serviceBase, helper) {
        var _this = this;
        this._pxtAppService = _pxtAppService;
        this._serviceBase = _serviceBase;
        this.helper = helper;
        this.model = /** @type {?} */ ({});
        this.urlService = "";
        this.listing = new EventEmitter();
        this.statusSave = new EventEmitter();
        this.statusDelete = new EventEmitter();
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
            _this.urlService = helper.getApi() + _this.model.constructor.name.toLowerCase();
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
        { type: Component, args: [{
                    selector: 'pxt-submenus',
                    template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"delete(0)\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu | uppercaseFirst}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PxtSubmenusComponent.ctorParameters = function () { return [
        { type: PxtAppComponentService },
        { type: RequestBaseService },
        { type: HttpHelperService }
    ]; };
    PxtSubmenusComponent.propDecorators = {
        model: [{ type: Input }],
        listing: [{ type: Output }],
        statusSave: [{ type: Output }],
        statusDelete: [{ type: Output }],
        controller: [{ type: Input }]
    };
    return PxtSubmenusComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtSubmenusModule = /** @class */ (function () {
    function PxtSubmenusModule() {
    }
    PxtSubmenusModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return PxtDatepickerComponent; }),
    multi: true
};
var PxtDatepickerComponent = /** @class */ (function () {
    function PxtDatepickerComponent() {
        this.placeholder = "Escolha uma data";
        this.inputDisabled = false;
        this.onChange = new EventEmitter();
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
    }
    Object.defineProperty(PxtDatepickerComponent.prototype, "dataSelecionada", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateModel;
        },
        set: /**
         * @param {?} d
         * @return {?}
         */
        function (d) {
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
        { type: Component, args: [{
                    selector: 'pxt-datepicker',
                    template: "<mat-form-field (click)=\"inputDisabled ? picker.open() : undefined\">\r\n  <input matInput [matDatepicker]=\"picker\" [placeholder]=\"placeholder\" disabled=\"{{inputDisabled}}\" [min]=\"minDate\" [max]=\"maxDate\"\r\n    [(ngModel)]=\"dataSelecionada\" (dateChange)=\"onDateChange()\">\r\n  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n  <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\r\n  <button mat-icon-button class=\"btn-clear\" type=\"button\" (click)=\"clear()\">\r\n    <mat-icon>clear</mat-icon>\r\n  </button>\r\n</mat-form-field>",
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1],
                    styles: ["mat-form-field{width:100%}.btn-clear{width:24px;height:24px;line-height:24px;right:0;top:0;position:absolute;margin-top:4px;opacity:.8}.btn-clear mat-icon{font-size:17px}"]
                }] }
    ];
    /** @nocollapse */
    PxtDatepickerComponent.ctorParameters = function () { return []; };
    PxtDatepickerComponent.propDecorators = {
        placeholder: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        inputDisabled: [{ type: Input }],
        onChange: [{ type: Output }]
    };
    return PxtDatepickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtDatePickerModule = /** @class */ (function () {
    function PxtDatePickerModule() {
    }
    PxtDatePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MaterialAngularModule],
                    providers: [DatePipe],
                    declarations: [PxtDatepickerComponent],
                    exports: [PxtDatepickerComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
                },] }
    ];
    return PxtDatePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtDialogComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'app-pxt-dialog',
                    template: "<h2 mat-dialog-title>{{data.titleDialog}}</h2>\n\n<mat-dialog-content>\n      {{data.contentDialog}}  \n</mat-dialog-content>\n\n<mat-dialog-actions>\n    <button mat-button>Confirmar</button>\n    <button mat-button mat-dialog-close>Cancelar</button>\n</mat-dialog-actions>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PxtDialogComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    PxtDialogComponent.propDecorators = {
        placeholder: [{ type: Input }]
    };
    return PxtDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtDialogModule = /** @class */ (function () {
    function PxtDialogModule() {
    }
    PxtDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var PxtFilterComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'app-pxt-filter',
                    template: "<h2 mat-dialog-title>{{data.titleDialog}}</h2>\n\n<mat-dialog-content>\n\n  <mat-form-field>\n    <ng-content>\n\n    </ng-content>\n  </mat-form-field>\n\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button>Confirmar</button>\n  <button mat-button>Cancelar</button>\n</mat-dialog-actions>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PxtFilterComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return PxtFilterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtFilterModule = /** @class */ (function () {
    function PxtFilterModule() {
    }
    PxtFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
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
var PxtDialogFilterCustomComponent = /** @class */ (function () {
    function PxtDialogFilterCustomComponent(fb, dialogRef, data, http) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.http = http;
        this.displayedColumns = ['codigo', 'descricao'];
        this.dataSource = new MatTableDataSource();
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
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
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
    /**
     * @return {?}
     */
    PxtDialogFilterCustomComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    PxtDialogFilterCustomComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-dialog-filter-custom',
                    template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <ng-content></ng-content>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                    styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}::ng-deep .mat-dialog-container{padding:0!important;max-height:inherit}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}"]
                }] }
    ];
    /** @nocollapse */
    PxtDialogFilterCustomComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
        { type: RequestBaseService }
    ]; };
    PxtDialogFilterCustomComponent.propDecorators = {
        filters: [{ type: Input }],
        model: [{ type: Input }],
        paginator: [{ type: ViewChild, args: [MatPaginator,] }],
        sort: [{ type: ViewChild, args: [MatSort,] }]
    };
    return PxtDialogFilterCustomComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ɵ0$3 = {}, ɵ1$1 = { hasBackdrop: true };
var PxtDialogFilterCustomModule = /** @class */ (function () {
    function PxtDialogFilterCustomModule() {
    }
    PxtDialogFilterCustomModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule
                    ],
                    declarations: [PxtDialogFilterCustomComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                    exports: [PxtDialogFilterCustomComponent],
                    entryComponents: [PxtDialogFilterCustomComponent],
                    providers: [
                        { provide: MAT_DIALOG_DATA, useValue: ɵ0$3 },
                        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: ɵ1$1 }
                    ]
                },] }
    ];
    return PxtDialogFilterCustomModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var pxtFields = /** @class */ (function () {
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
var PxtUploadFileComponent = /** @class */ (function () {
    function PxtUploadFileComponent() {
        this.fileSelected = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'pxt-upload-file',
                    template: "<mat-form-field>\n  <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"imgFileInput.click()\">\n    <mat-icon>add</mat-icon>\n  </button>\n  <input hidden type=\"file\" accept=\"image/*\" #imgFileInput (change)=\"onChangeImagem($event.target.files[0])\" />\n  <div (click)=\"imgFileInput.click()\">\n    <input matInput type=\"text\" disabled [placeholder]=\"placeholder\">\n  </div>\n</mat-form-field>",
                    styles: ["mat-form-field{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}"]
                }] }
    ];
    /** @nocollapse */
    PxtUploadFileComponent.ctorParameters = function () { return []; };
    PxtUploadFileComponent.propDecorators = {
        placeholder: [{ type: Input }],
        fileSelected: [{ type: Output }]
    };
    return PxtUploadFileComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtUploadFileModule = /** @class */ (function () {
    function PxtUploadFileModule() {
    }
    PxtUploadFileModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule
                    ],
                    declarations: [PxtUploadFileComponent],
                    exports: [PxtUploadFileComponent],
                    entryComponents: [PxtUploadFileComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
                },] }
    ];
    return PxtUploadFileModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtGalleryComponent = /** @class */ (function () {
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
                imageAnimation: NgxGalleryAnimation.Slide
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
        { type: Component, args: [{
                    selector: 'pxt-gallery',
                    template: "<ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n",
                    styles: [".custom-position{z-index:0!important}"]
                }] }
    ];
    /** @nocollapse */
    PxtGalleryComponent.ctorParameters = function () { return []; };
    PxtGalleryComponent.propDecorators = {
        galleryImages: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }]
    };
    return PxtGalleryComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtGalleryModule = /** @class */ (function () {
    function PxtGalleryModule() {
    }
    PxtGalleryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MaterialAngularModule, NgxGalleryModule],
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

export { PxtAppModule, PxtAppComponent, PxtContentModule, PxtContentComponent, MaterialAngularModule, PxtSubmenusModule, PxtSubmenusComponent, PxtDatePickerModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1 as CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, PxtDatepickerComponent, PxtDialogModule, PxtDialogComponent, PxtFilterModule, PxtFilterComponent, PxtDialogFilterCustomModule, PxtDialogFilterCustomComponent, PxtSelectModule, PipeModule, PxtAppComponentService, PxtHttpService, ConfigService, HttpHelperService, RequestBaseService, VisibleInRolesGuard, AuthorityService, pxtConfiguration, pxtFields, pxtEnumTagHtml, PxtUploadFileModule, PxtGalleryModule, PxtGalleryComponent, pxtCheckboxField, pxtfilterCustomField, pxtDateField, pxtFilterField, pxtInputField, pxtRadioButtonField, pxtSelectField, HashDirective as ɵg, DynamicFieldDirective as ɵz, DynamicFieldDirectiveDialog as ɵx, PxtContentBody as ɵf, PxtAppMenuItemComponent as ɵe, PxtAppMenuItemModule as ɵd, PxtDialogFilterComponent as ɵw, PxtDialogFilterModule as ɵv, PxtUploadFileComponent as ɵba, PxtButtonComponent as ɵl, PxtButtonModule as ɵk, PxtCheckboxComponent as ɵt, PxtCheckboxModule as ɵs, PxtDateComponent as ɵn, PxtDateModule as ɵm, PxtInputFilterComponent as ɵy, PxtInputFilterModule as ɵu, PxtInputComponent as ɵj, PxtInputModule as ɵi, PxtRadiobuttonComponent as ɵr, PxtRadiobuttonModule as ɵq, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR as ɵo, PxtSelectComponent as ɵp, DateFormatPipe as ɵb, DateTimeFormatPipe as ɵc, UpercaseFirst as ɵa, TokenService as ɵh };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC90b2tlbi5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvdXBwZXJjYXNlLWZpcnN0LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC91dGlsL2NvbnN0YW50cy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvZGF0ZS1mb3JtYXQucGlwZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvZGF0ZS10aW1lLWZvcm1hdC5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZGVscy9weHRDb25maWd1cmF0aW9uLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC92aXNpYmxlLWluLXJvbGVzLmd1YXJkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZGF0ZS1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1maWx0ZXItZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci9weHQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZmlsdGVyL3B4dC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWVsZHMtbW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2VudW0vcHh0LWVudW0tdGFnLWh0bWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3VibWVudXNJdGVuczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnN1Ym1lbnVzSXRlbnMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRDb21wb25lbnRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9sb2FkQ29tcG9uZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldFVzZXJMb2dnZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VyTG9nZ2VkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0VXNlckxvZ2dlZC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRJbmZvSW5pdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9Jbml0aWFsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRJbmZvSW5pdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZXRTdWJtZW51cyhyb3V0ZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VibWVudXNJdGVucy5uZXh0KHJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbEluZm8oaW5mb0luaXRpYWwpIHtcclxuICAgICAgICB0aGlzLl9zZXRJbmZvSW5pdC5uZXh0KGluZm9Jbml0aWFsKVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50Lm5leHQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NldFVzZXJMb2dnZWQubmV4dCh1c2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHh0QXBwIH0gZnJvbSAnLi9weHQtYXBwJztcbmltcG9ydCB7IFB4dEFwcE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9weHQtYXBwLm1vZGVsJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdE1lbnUsIE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFNhZmVIdG1sLCBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC5jb21wb25lbnQuc2NzcyddXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50IHtcblxuICAvL1Byb3BlcnRpZXNcbiAgcm91dGVzOiBhbnlbXSA9IFtdO1xuICBncm91cHM6IGFueVtdID0gW107XG4gIG1lbnVzOiBhbnlbXSA9IFtdO1xuICBzeXN0ZW06IFN0cmluZyA9IFwiU1lTVEVNIE5BTUVcIlxuICB1cmxJbWc6IHN0cmluZyA9ICdodHRwOi8vaW1hZ2Vuc2Rzdi5wZWl4b3RvLmNvbS5ici9hdXRoL21pbmlfbG9nby5wbmcnO1xuICBtZW51U2VsZWN0ZWQgPSBcIlwiO1xuICB1c3VlckxvZ2dlZCA9IFwiTG9vZ2dlZCB1c2VyXCI7XG4gIG1lbnVzSHRtbDogU2FmZUh0bWw7XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgX21vYmlsZVF1ZXJ5TGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF0TWVudTogTWF0TWVudTtcbiAgQFZpZXdDaGlsZCgnbWVudXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgc3ViQ29udGFpbmVyMTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnVUcmlnZ2VyJywgeyByZWFkOiBNYXRNZW51VHJpZ2dlciB9KSBjb250ZXh0TWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuICBtZW51c1JlY2VpdmVkIDogYW55W107XG4gIFxuICAvL0NvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBtZWRpYTogTWVkaWFNYXRjaGVyLFxuICAgIHB1YmxpYyBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMubW9iaWxlUXVlcnkgPSBtZWRpYS5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA2MDBweCknKTtcbiAgICB0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyID0gKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubW9iaWxlUXVlcnkuYWRkTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgdGhpcy5yZXN1bHQgPSBweHRBcHBDb21wb25lbnRTZXJ2aWNlLmluZm9Jbml0aWFsLnN1YnNjcmliZShpbmZvSW5pdGlhbCA9PiB7XG4gICAgICBpZiAoaW5mb0luaXRpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudXN1ZXJMb2dnZWQgPSBpbmZvSW5pdGlhbC51c2VyTG9nZ2VkO1xuICAgICAgICB0aGlzLnN5c3RlbSA9IGluZm9Jbml0aWFsLnN5c3RlbTtcbiAgICAgICAgdGhpcy5tZW51c1JlY2VpdmVkID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLm1lbnVzID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLnByZXBhcmVNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpYmVDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubW9iaWxlUXVlcnkucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIC8vIEluY2x1ZGUgb2YgY29tcG9uZW50cyBpbiB0aGUgYXBwbGljYXRpb24gYm9keVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnksIGFkSG9zdCkge1xuICAgIHRoaXMubWVudVNlbGVjdGVkID0gcm91dGUubWVudVRleHQ7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlLm1lbnVTb3VyY2U7XG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShhZEl0ZW0uY29tcG9uZW50KTtcbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IGFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZpY2UgcmVzcG9uc2libGUgZm9yIGluY2x1ZGluZyBjb21wb25lbnRzIGluIHRoZSBib2R5IG9mIHRoZSBhcHBsaWNhdGlvblxuICBzdWJzY3JpYmVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnRPYnNlcnZhYmxlLnN1YnNjcmliZShjb21wb25lbnRPYmogPT4ge1xuICAgICAgdmFyIGFycmF5QXV4ID0gdGhpcy5tZW51c1JlY2VpdmVkLmZpbHRlcih4PT54Lm1lbnVTb3VyY2UgIT0gdW5kZWZpbmVkICYmIHgubWVudVNvdXJjZS5jb21wb25lbnQgPT09IGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgY29uc29sZS5sb2coYXJyYXlBdXgpO1xuICAgICAgaWYoYXJyYXlBdXgubGVuZ3RoID09IDEpe1xuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IGFycmF5QXV4WzBdLm1lbnVUZXh0O1xuICAgICAgfVxuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRPYmouY29tcG9uZW50KTtcbiAgICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5hZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICg8QWRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhID0gY29tcG9uZW50T2JqLmRhdGE7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXNwb25zaWJsZSBmb3IgY2FsbCBtZXRob2QgXCJsb2FkY29tcG9uZW50cygpXCIgaW5mb3JtaW5nIHBhcmFtZXRlcnNcbiAgc2VsZWN0SXRlbU1lbnUobmF2KSB7XG4gICAgdGhpcy5sb2FkQ29tcG9uZW50KG5hdiwgdGhpcy5hZEhvc3QpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBwcmVwYXJpbmcgYXBwbGljYXRpb24gbWVudXM7XG4gIHByZXBhcmVNZW51KCkge1xuICAgIGxldCBhcnJheUF1eDogYW55W107XG4gICAgYXJyYXlBdXggPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJncm91cFwiICYmIHgubWVudVBhcmVudCA9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhHcm91cCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhJdGVtID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiaXRlbVwiICYmIHgubWVudVBhcmVudCAhPT0gXCJcIik7XG5cbiAgICAvL2FkZCBpdGVucyBpbiBncm91cHNcbiAgICBhcnJheUF1eEl0ZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4R3JvdXAuZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSlcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy9hZGQgZ3JvdXBzIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4R3JvdXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4LmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLm1lbnVzID0gYXJyYXlBdXg7XG4gIH1cbn1cbiIsImltcG9ydCAnLi8uLi8uLi8uLi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7Q2RrVGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0Nka1RyZWVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICBNYXRCYWRnZU1vZHVsZSxcbiAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSxcbiAgTWF0Q2hpcHNNb2R1bGUsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gIE1hdERpYWxvZ01vZHVsZSxcbiAgTWF0RGl2aWRlck1vZHVsZSxcbiAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdExpc3RNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0UmFkaW9Nb2R1bGUsXG4gIE1hdFJpcHBsZU1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTaWRlbmF2TW9kdWxlLFxuICBNYXRTbGlkZXJNb2R1bGUsXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0U3RlcHBlck1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRhYnNNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdFRvb2x0aXBNb2R1bGUsXG4gIE1hdFRyZWVNb2R1bGUsXG4gIE1hdExpbmVNb2R1bGUsXG4gIE1hdENvbW1vbk1vZHVsZSxcbiAgTWF0T3B0aW9uTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICBcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7cGxhdGZvcm1Ccm93c2VyRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsTWF0Q2FyZE1vZHVsZSxNYXRJY29uTW9kdWxlLE1hdExpbmVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxNYXRTb3J0TW9kdWxlLE1hdFRhYnNNb2R1bGUsTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxNYXRDaGlwc01vZHVsZSxNYXRJbnB1dE1vZHVsZSxNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxNYXRCdXR0b25Nb2R1bGUsTWF0Q29tbW9uTW9kdWxlLE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsTWF0UmlwcGxlTW9kdWxlLE1hdFNlbGVjdE1vZHVsZSxNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxNYXRTaWRlbmF2TW9kdWxlLE1hdFN0ZXBwZXJNb2R1bGUsTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLE1hdFRvb2x0aXBNb2R1bGUsTWF0Q2hlY2tib3hNb2R1bGUsTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsTWF0RXhwYW5zaW9uTW9kdWxlLE1hdEZvcm1GaWVsZE1vZHVsZSxNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxNYXROYXRpdmVEYXRlTW9kdWxlLE1hdEJvdHRvbVNoZWV0TW9kdWxlLE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxNYXRCdXR0b25Ub2dnbGVNb2R1bGUsTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBjb25maWc6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgbG9hZCh1cmw6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5qZWN0SHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGluamVjdEh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgICBtYXAocmVzID0+IHJlcylcclxuICAgICAgKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWd1cmF0aW9uKGVsZW1lbnQ6IHN0cmluZywgZGF0YUxpc3Q/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZGF0YUxpc3QpIHtcclxuICAgICAgY29uc3QgdXJsV2l0aEVsZW1lbnQgPSB0aGlzLmNvbmZpZ1tlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhEYXRhTGlzdCA9IHRoaXMuY29uZmlnW2RhdGFMaXN0XVtlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhEYXRhTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2ZXJpZnlVcmwodHlwZU1vZGVsOiBhbnkpIHtcclxuICAgIGlmICh0eXBlTW9kZWwuaW5jbHVkZXMoJy8nLCB0eXBlTW9kZWwubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgY29uc3QgdHlwZVJlbGVhc2UgPSB0eXBlTW9kZWw7XHJcbiAgICAgIHJldHVybiB0eXBlUmVsZWFzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlTW9kZWwgKyAnLyc7XHJcbiAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEFwaVVybCAobmFtZSwgdXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24odXJsLCBuYW1lKTtcclxuICB9XHJcbn0iLCJcbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudCA9IHtcbiAgcHJvZHVjdGlvbjogdHJ1ZSxcbiAgZW52TmFtZTogJ2RldicsXG4gIHZlcnNpb246ICcwLjAuMScsXG4gIENPTkZJR19GSUxFOiAnYXNzZXRzL2NvbmZpZy9lbnYuanNvbicsXG4gIGVzYkFwaVB4dCA6IFwiaHR0cDovL2VzYmRzdi5wZWl4b3RvLmNvbS5ici9zZ2UvXCIsXG4gIHN5c3RlbToge1xuICAgIGlkOiAxMDgsXG4gICAgcHJleDogXCJQT1JDUlBcIlxuICB9XG59O1xuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5cbnZhciBzeXN0ZW0gPSBlbnZpcm9ubWVudC5zeXN0ZW07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb2tlblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgIGRlYnVnZ2VyXG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfVxuICBzZXRUb2tlblN0b3JhZ2UocmVzOiBhbnkpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgfVxuICByZW1vdmVUb2tlblN0b3JhZ2UoKSB7XG4gICAgdmFyIHRva2VuID0gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXG4gICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+IGp3dF9kZWNvZGUodG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN5c3RlbS5pZCtzeXN0ZW0ucHJleCtkZWNvZGVkLnN1Yik7XG4gIH1cbiAgXG4gIGRlbGV0ZVRva2VuKCkge1xuICAgIHRoaXMucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gIH1cblxuICB0b2tlbkV4aXN0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IG51bGwgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IHVuZGVmaW5lZCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gJyc7XG4gIH1cbn1cbiIsImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdCwgZm9yd2FyZFJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNBcmdzLCBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiwgZmluYWxpemUsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi8uLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbi8vaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL0h0dHBIZWxwZXJTZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFB4dEh0dHBTZXJ2aWNlIGV4dGVuZHMgSHR0cCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kLFxuICAgIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIC8vcHJpdmF0ZSB1cmxIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoYmFja2VuZCwgb3B0aW9ucyk7XG4gIH1cblxuICB1cmxSZXF1ZXN0OiBhbnk7XG4gIG9yaWdSZXF1ZXN0OiBSZXF1ZXN0O1xuICBpc1VuYXRob3VyaXplZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiAgQ29udHJvbCBTZXJ2aWNlc1xuICAgKi9cbiAgZ2V0SGVhZGVycygpIHtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQ2FjaGUtQ29udHJvbCcsICduby1zdG9yZScpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdQcmFnbWEnLCAnbm8tY2FjaGUnKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIGhhbmRsZVJlc3BvbnNlKG9ic2VydmFibGU6IE9ic2VydmFibGU8UmVzcG9uc2U+LCB1cmw/OiBzdHJpbmcpIHtcblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGNvbnN0IG9yaWcgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJlc3VsdCA9IG9ic2VydmFibGUucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uQ2F0Y2goZXJyb3IpO1xuICAgICAgfSksXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25SZXN1bHQocmVzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIG9uUmVzdWx0KHJlcykge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDIwMSkge1xuICAgICAgcmV0dXJuIHJlcy5fYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICB9XG5cbiAgZG9HZXQoYXBpOiBzdHJpbmcsIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICAvLyB0aGlzLnByZUxvYWRlclNlcnZpY2UudXBkYXRlKHRydWUpO1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKSk7XG4gIH1cblxuICBkb1Bvc3QoZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gZW5kcG9pbnQ7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wb3N0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1B1dChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucHV0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1BhdGgoYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBhdGNoKHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb0RlbGV0ZShhcGk6IHN0cmluZywgcGFyYW1zOiBhbnksIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgdXJsUGFyYW0gPSB1cmwgKyAnLycgKyBwYXJhbXM7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmRlbGV0ZSh1cmxQYXJhbSwgcmVxdWVzdE9wdGlvbnMpLCB1cmxQYXJhbSk7XG4gIH1cblxuXG4gIHJlcXVlc3QodXJsOiBzdHJpbmcgfCBSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIG9wdGlvbnMgPSB0aGlzLnJlcXVlc3RBcmdzKG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy51cmxSZXF1ZXN0ID0gdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmwudXJsO1xuICAgICAgdGhpcy5vcmlnUmVxdWVzdCA9IHVybDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy51cmxSZXF1ZXN0ICE9PSBlbnZpcm9ubWVudC5DT05GSUdfRklMRSkge1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpO1xuICAgICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5vcmlnUmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cmwgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJldHVybiBzdXBlci5yZXF1ZXN0KHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RBcmdzKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zQXJncyk6IFJlcXVlc3RPcHRpb25zQXJncyB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuICBwdWJsaWMgb25DYXRjaChlcnJvcjogYW55KSB7XG4gICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgIGNhc2UgNDAxOlxuICAgICAgICBpZiAoIXRoaXMuaXNVbmF0aG91cml6ZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyg0MDEpO1xuICAgICAgICAgIC8vdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDAxXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1VuYXRob3VyaXplZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDA6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgNDAwXCIpO1xuICAgICAgICAvLyB0aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDAwXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgNDAwXCIpO1xuICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RCYXNlU2VydmljZSB7XG5cbiAgcHVibGljIG1vZGVsOiBhbnk7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0bzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBfaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2VBdXRvLCBtb2RlbCk7XG4gIH07XG4gIGRlbGV0ZShpZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlQXV0bywgaWQpO1xuICB9O1xuXG4gIGRvR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogTWFwPGFueSwgYW55Pikge1xuICAgIGRlYnVnZ2VyO1xuICAgIGxldCB1cmxcbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zLnNpemUgPiAwKSB7XG4gICAgICB1cmwgPSBwYXRoICsgdGhpcy5idWlsZFJlcXVlc3RQYXJhbXMocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gcGF0aDtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyB1cmwpO1xuICAgIH1cbiAgfTtcblxuICBkb1Bvc3QocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QocGF0aCwgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH07XG4gIH07XG5cbiAgZG9QdXQocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dChwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9EZWxldGUocGF0aDogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHBhdGgsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgaWQpO1xuICAgIH07XG4gIH07XG5cbiAgdXBsb2FkSW1hZ2UocGF0aCwgcGFyYW1zPzogTWFwPGFueSwgYW55Pik6IGFueSB7XG5cbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPD0gLTEpIHtcbiAgICAgIHBhdGggPSB0aGlzLnVybFNlcnZpY2UgKyBwYXRoIDtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcuY29uY2F0KHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpXG4gICAgfTtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IG5ldyBIdHRwSGVhZGVycyhoZWFkZXIpO1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBjb25zdCBmb3JtZGF0YSA9IHRoaXMuc2V0UGFyYW1zRm9ybWRhdGEocGFyYW1zKTtcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QoJ1BPU1QnLCBwYXRoLCBmb3JtZGF0YSwge1xuICAgICAgaGVhZGVyczogaHR0cE9wdGlvbnMsXG4gICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHBDbGllbnQucmVxdWVzdChyZXEpO1xuICB9XG5cblxuICBzZXRQYXJhbXNGb3JtZGF0YShwYXJhbXM6IE1hcDxhbnksIGFueT4pOiBGb3JtRGF0YSB7XG4gICAgY29uc3QgZm9ybWRhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBmb3JtZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1kYXRhO1xuICB9O1xuXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtczogTWFwPGFueSwgYW55Pik6IHN0cmluZyB7XG4gICAgbGV0IGZpbmFsID0gJyc7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpZiAocHJpbWVpcmFJdGVyYWNhbykge1xuICAgICAgICBmaW5hbCArPSAnPycgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgcHJpbWVpcmFJdGVyYWNhbyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWwgKz0gJyYnICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3VwcGVyY2FzZUZpcnN0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBlcmNhc2VGaXJzdCBleHRlbmRzIFVwcGVyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHdvcmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgaWYgKHdvcmRzW2FdLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgIHZhciB3ID0gd29yZHNbYV07XHJcbiAgICAgICAgICB3b3Jkc1thXSA9IHdbMF0udG9VcHBlckNhc2UoKSArIHcuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX0ZNVCA9ICdkZC9NTS95eXl5JztcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX1RJTUVfRk1UID0gYCR7Q29uc3RhbnRzLkRBVEVfRk1UfSAtIGhoOm1tOnNzIGFgO1xyXG4gIH0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2RhdGVGb3JtYXQnXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9GTVQpO1xyXG4gICAgfVxyXG4gIH0iLCJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZGF0ZVRpbWVGb3JtYXQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIHZhciBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZShcImVuLVVTXCIpO1xyXG4gICAgcmV0dXJuICBkYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIENvbnN0YW50cy5EQVRFX1RJTUVfRk1UKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBVcGVyY2FzZUZpcnN0IH0gZnJvbSAnLi91cHBlcmNhc2UtZmlyc3QnO1xyXG5pbXBvcnQgeyBEYXRlRm9ybWF0UGlwZSB9IGZyb20gJy4vZGF0ZS1mb3JtYXQucGlwZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lRm9ybWF0UGlwZSB9IGZyb20gJy4vZGF0ZS10aW1lLWZvcm1hdC5waXBlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUgXSxcclxuICAgIGV4cG9ydHM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGlwZU1vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYXBwLW1lbnUtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgaXRlbXM6IGFueVtdO1xuICBAVmlld0NoaWxkKCdjaGlsZE1lbnUnKSBwdWJsaWMgY2hpbGRNZW51O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUHh0QXBwQ29tcG9uZW50U2VydmljZSkgcHVibGljIHB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHsgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRDb21wb25lbnQoY2hpbGQpIHtcbiAgICB0aGlzLnB4dEFwcENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudCh7Y29tcG9uZW50OiBjaGlsZC5tZW51U291cmNlLmNvbXBvbmVudCwgZGF0YTpcIlwifSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgIGV4cG9ydHM6IFtQeHRBcHBNZW51SXRlbUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCBdXG4gIFxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNZW51SXRlbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1toYXNoXScsXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgSGFzaERpcmVjdGl2ZSAge1xyXG4gICAgQElucHV0KCkgaGFzaDogc3RyaW5nO1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxyXG4gIH0iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRob3JpdHlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogUHh0SHR0cFNlcnZpY2UsIHByaXZhdGUgX2h0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlKSB7IH1cblxuICBidXNjYXJBdXRob3JpdGllcyAoY29kaWdvU2lzdGVtYSkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2h0dHBIZWxwZXIuZ2V0QXBpU2dpKCkgKyBcInBlcm1pc3NvZXMvYnVzY2FyUGVyZmlsU2lzdGVtYS8/XCI7XG4gICAgY29uc3QgcGFyYW1zID0gXCJjb2RpZ29TaXN0ZW1hPVwiICsgY29kaWdvU2lzdGVtYTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5kb0dldCh1cmwgKyBwYXJhbXMpO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IHB4dENvbmZpZ3VyYXRpb24gPSB7c3lzdGVtSWQ6IDEwNCAsc3lzdGVtUHJleDogXCJTR0VfTkVXXCJ9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aG9yaXR5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIlxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzaWJsZUluUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGh0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLCBwcml2YXRlIGF1dGhvcml0eVNlcnZpY2U6IEF1dGhvcml0eVNlcnZpY2UpIHsgfVxyXG4gIGNhbkFjdGl2YXRlKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgaWYgKHRva2VuICE9PSAndW5kZWZpbmVkJyAmJiB0b2tlbiAhPT0gJycgJiYgdG9rZW4gIT09IG51bGwpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKHRva2VuKTtcclxuICAgICAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1Yik7XHJcbiAgICAgICAgaWYgKHRva2VuQXV0aG9yaXRpZXMgPT09ICd1bmRlZmluZWQnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09ICcnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXV0aG9yaXR5U2VydmljZS5idXNjYXJBdXRob3JpdGllcyhweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1YiwgZGF0YS5hdXRob3JpdHkpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmh0dHBIZWxwZXIuZ2V0VXJsQXV0ZW50aWNhY2FvKCkgKyBcIj9lcnJvPTQwMVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gVW5kZWZpbmVkXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSwgICAgXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcENvbXBvbmVudCwgUHh0Q29udGVudEJvZHksIEhhc2hEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbUHh0QXBwQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbUHh0QXBwQ29tcG9uZW50U2VydmljZSwgUHh0SHR0cFNlcnZpY2UsIFxuICAgIFJlcXVlc3RCYXNlU2VydmljZSwgSHR0cEhlbHBlclNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsICAgICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFRva2VuU2VydmljZSxBdXRob3JpdHlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0SW5wdXRGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dENoZWNrYm94RmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgaW5wdXRUeXBlPzogc3RyaW5nO1xyXG4gICAgZmlsdGVycz86IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dERhdGVGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB0eXBlPzogc3RyaW5nO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkOiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dEZpbHRlckZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGNsYXNzTmFtZT86IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn1cclxuIiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBweHRSYWRpb0J1dHRvbkZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIG9wdGlvbnM/OiBzdHJpbmdbXTtcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0U2VsZWN0RmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgaW5wdXRUeXBlPzogc3RyaW5nO1xyXG4gICAgY2xhc3NOYW1lPzogYW55O1xyXG4gICAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICAgIHBhcmFtZXRlcj86IGFueTsgXHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgY2xhc3NOYW1lPzogYW55O1xyXG4gICAgaW5wdXRUeXBlPzogc3RyaW5nO1xyXG4gICAgZmlsdGVycz86IGFueTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IHB4dElucHV0RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWlucHV0LWZpZWxkJztcbmltcG9ydCB7IHB4dENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkJztcbmltcG9ydCB7IHB4dERhdGVGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZGF0ZS1maWVsZCc7XG5pbXBvcnQgeyBweHRGaWx0ZXJGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkJztcbmltcG9ydCB7IHB4dFJhZGlvQnV0dG9uRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LXJhZGlvYnV0dG9uLWZpZWxkJztcbmltcG9ydCB7IHB4dFNlbGVjdEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1zZWxlY3QtZmllbGQnO1xuaW1wb3J0IHsgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtY29udGVudC1ib2R5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1jb250ZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgQWRDb21wb25lbnQge1xuICAvL1Byb3BlcnRpZXMgXG4gIEBJbnB1dCgpIGRhdGE6IGFueTtcbiAgQElucHV0KCkgYXV0bz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZpZWxkczogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBASW5wdXQoKSBjb2xzOiBudW1iZXIgPSA1O1xuICBASW5wdXQoKSBmaWVsZDogYW55O1xuICBjb2xzSW5pdGlhbCA9IDU7XG4gIEBPdXRwdXQoKSBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcblxuICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0udmFsdWU7XG4gIH1cblxuICAvL0NvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmYjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgaWYgKHRoaXMuZmllbGQgIT0gdW5kZWZpbmVkKXtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZpZWxkKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBzd2l0Y2ggKHRoaXMuZmllbGRba2V5XS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG5cbiAgICAgICAgLy9GaWx0ZXJDdXN0b21cbiAgICAgICAgY2FzZSBweHRmaWx0ZXJDdXN0b21GaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlckN1c3RvbSA9IDxweHRmaWx0ZXJDdXN0b21GaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VGaWx0ZXJDdXN0b20udHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vSW5wdXRcbiAgICAgICAgY2FzZSBweHRJbnB1dEZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlSW5wdXQgPSA8cHh0SW5wdXRGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VJbnB1dC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlSW5wdXQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vQ2hlY2tib3hcbiAgICAgICAgY2FzZSBweHRDaGVja2JveEZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VDaGVjay50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vRGF0ZVxuICAgICAgICBjYXNlIHB4dERhdGVGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZURhdGUgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9GaWx0ZXJcbiAgICAgICAgY2FzZSBweHRGaWx0ZXJGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRmlsdGVyLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL1JhZGlvQnV0dG9uXG4gICAgICAgIGNhc2UgcHh0UmFkaW9CdXR0b25GaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VSYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgXG4gICAgICAgIC8vU2VsZWN0XG4gICAgICAgIGNhc2UgcHh0U2VsZWN0RmllbGQubmFtZTpcbiAgICAgICAgdmFyIGluc3RhbmNlU2VsZWN0ID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgIGluc3RhbmNlU2VsZWN0LnR5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgdGhpcy5jb2xzSW5pdGlhbCA9IHRoaXMuY29scztcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgfVxuXG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgY3JlYXRlIGNvbnRyb2xcbiAgcHVibGljIG9uU3VibWl0KGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuXG4gICAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGVBbGxGb3JtRmllbGRzKHRoaXMuZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBwdWJsaWMgY3JlYXRlQ29udHJvbCgpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgIHRoaXMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09IFwiYnV0dG9uXCIpIHJldHVybjtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZiLmNvbnRyb2woXG4gICAgICAgIHsgdmFsdWU6IGZpZWxkLnZhbHVlLCBkaXNhYmxlZDogZmllbGQuZGlzYWJsZWQgfSxcbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbnMoZmllbGQudmFsaWRhdGlvbnMgfHwgW10pXG4gICAgICApO1xuICAgICAgZ3JvdXAuYWRkQ29udHJvbChmaWVsZC5uYW1lLCBjb250cm9sKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBwdWJsaWMgYmluZFZhbGlkYXRpb25zKHZhbGlkYXRpb25zOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB2YWxpZExpc3QgPSBbXTtcbiAgICAgIHZhbGlkYXRpb25zLmZvckVhY2godmFsaWQgPT4ge1xuICAgICAgICB2YWxpZExpc3QucHVzaCh2YWxpZC52YWxpZGF0b3IpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkTGlzdCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlQWxsRm9ybUZpZWxkcyhmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gZm9ybUdyb3VwLmdldChmaWVsZCk7XG4gICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfVxuICBzY3JlZW5XaWR0aDtcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50Pykge1xuICAgIHRoaXMuc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNjcmVlbldpZHRoKTtcbiAgICBpZiAodGhpcy5zY3JlZW5XaWR0aCA8PSA4MDApIHtcbiAgICAgIHRoaXMuY29scyA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjcmVlbldpZHRoIDw9IDExMDApIHtcbiAgICAgIHRoaXMuY29scyA9IDM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29scyA9IHRoaXMuY29sc0luaXRpYWw7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1pbnB1dC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuICAiLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGF0ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kYXRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1jaGVja2JveC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXJhZGlvYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHh0U2VsZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VsZWNpb25lJztcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgQElucHV0KCkgcGFyYW1zOiBhbnk7XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgZGVidWdnZXI7XG4gICAgaWYgKGNoYW5nZXMucGFyYW1zICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5wYXJhbXMuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMucGFyYW1zID0gY2hhbmdlcy5wYXJhbXMuY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5maW5kKCk7XG4gICAgfVxuICB9XG5cbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGF1dG8gPSBmYWxzZTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgb3B0aW9uOiBhbnk7XG5cbiAgb3B0aW9uczogYW55W10gPSBbXTtcblxuICBnZXQgc2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZE9wdGlvbihmOiBhbnkpIHtcbiAgICBpZiAoZiAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChmICE9PSB0aGlzLm9wdGlvbikge1xuICAgICAgICB0aGlzLm9wdGlvbiA9IGY7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhmLmNvZGlnbyk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5vcHRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMub3B0aW9uID0gdmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBweHRodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucGFyYW1zKTtcbiAgICBpZiAodGhpcy5tb2RlbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMubW9kZWwuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIHRoaXMuZmllbGQgPSB0aGlzLm1vZGVsO1xuICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZpZWxkICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpZWxkLmNsYXNzTmFtZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMuZmllbGQuY2xhc3NOYW1lLm5hbWU7XG4gICAgICB0aGlzLmF1dG8gPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBmaW5kKCkge1xuICAgIGlmICh0aGlzLmNvbnRyb2xsZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnB4dGh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCB0aGlzLnBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgICAgICB0aGlzLmZpZWxkLm9wdGlvbnMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZpbmQoKTtcbiAgfTtcbn1cblxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEsIE1hdFRhYmxlRGF0YVNvdXJjZSwgTWF0U29ydCwgTWF0UGFnaW5hdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcblxuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnc2VsZW5pdW0td2ViZHJpdmVyL2h0dHAnO1xuXG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kaWFsb2ctZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGRpc3BsYXllZENvbHVtbnMgPSBbJ2NvZGlnbycsICdkZXNjcmljYW8nXTtcbiAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8YW55PigpO1xuICBjb250cm9sbGVyID0gXCJcIjtcbiAgY29scyA9IDI7XG4gIGZpZWxkczogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBmaWVsZHNIaXN0OiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIGF1dG86IGJvb2xlYW47XG4gIGZpbHRlciA9IHsgY29kZTogdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogdW5kZWZpbmVkIH07XG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcblxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBkYXRhLmNvbnRyb2xsZXIubmFtZTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmF1dG8gPSB0aGlzLmRhdGEuYXV0bztcbiAgICBpZiAodGhpcy5hdXRvKSB7XG4gICAgICB0aGlzLmZpZWxkID0gdGhpcy5kYXRhLmZpbHRlcnM7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpZWxkKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5maWVsZFtrZXldLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgICAgICBjYXNlIHB4dGZpbHRlckN1c3RvbUZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VGaWx0ZXJDdXN0b20gPSA8cHh0ZmlsdGVyQ3VzdG9tRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VGaWx0ZXJDdXN0b20udHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlckN1c3RvbSk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUZpbHRlckN1c3RvbSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvL0lucHV0XG4gICAgICAgICAgY2FzZSBweHRJbnB1dEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VJbnB1dCA9IDxweHRJbnB1dEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlSW5wdXQudHlwZSA9ICdpbnB1dCc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlSW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vQ2hlY2tib3hcbiAgICAgICAgICBjYXNlIHB4dENoZWNrYm94RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUNoZWNrID0gPHB4dENoZWNrYm94RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VDaGVjay50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9EYXRlXG4gICAgICAgICAgY2FzZSBweHREYXRlRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZURhdGUgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9GaWx0ZXJcbiAgICAgICAgICBjYXNlIHB4dEZpbHRlckZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VGaWx0ZXIgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRmlsdGVyLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VGaWx0ZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL1JhZGlvQnV0dG9uXG4gICAgICAgICAgY2FzZSBweHRSYWRpb0J1dHRvbkZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VSYWRpbyA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VSYWRpby50eXBlID0gJ3JhZGlvJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vU2VsZWN0XG4gICAgICAgICAgY2FzZSBweHRTZWxlY3RGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlU2VsZWN0ID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZVNlbGVjdC50eXBlID0gJ3NlbGVjdCc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlU2VsZWN0KTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlU2VsZWN0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZmllbGRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5maWVsZHNIaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVDb250cm9sKCk7XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsYXRpb24oKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoZmFsc2UpO1xuICB9XG4gIGNvbmZpcm1hdGlvbihldmVudCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICB9XG5cbiAgLy9TZWFyY2guXG4gIHNlYXJjaCgpIHtcbiAgICBsZXQgcGFyYW1zID0gbmV3IE1hcDxhbnksIGFueT4oKTtcbiAgICBpZiAodGhpcy5kYXRhLmF1dG8pIHtcbiAgICAgIGlmICh0aGlzLmZvcm0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0udmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5mb3JtLnZhbHVlW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdGhpcy5mb3JtLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5maWx0ZXIuY29kZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWx0ZXIuY29kZSAhPSAwICYmIHRoaXMuZmlsdGVyLmNvZGUgIT0gXCJcIikge1xuICAgICAgICBwYXJhbXMuc2V0KFwiY29kaWdvXCIsIHRoaXMuZmlsdGVyLmNvZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpbHRlci5kZXNjcmlwdGlvbiAhPSBcIlwiKSB7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJkZXNjcmljYW9cIiwgdGhpcy5maWx0ZXIuZGVzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5odHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgcGFyYW1zKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgc2VsZWN0Um93KHJvdykge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHJvdyk7XG4gIH07XG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgY3JlYXRlIGNvbnRyb2xcbiAgY3JlYXRlQ29udHJvbCgpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgIHRoaXMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09IFwiYnV0dG9uXCIpIHJldHVybjtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZiLmNvbnRyb2woXG4gICAgICAgIHsgdmFsdWU6IGZpZWxkLnZhbHVlLCBkaXNhYmxlZDogZmllbGQuZGlzYWJsZWQgfSxcbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbnMoZmllbGQudmFsaWRhdGlvbnMgfHwgW10pXG4gICAgICApO1xuICAgICAgZ3JvdXAuYWRkQ29udHJvbChmaWVsZC5uYW1lLCBjb250cm9sKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgYmluZFZhbGlkYXRpb25zKHZhbGlkYXRpb25zOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB2YWxpZExpc3QgPSBbXTtcbiAgICAgIHZhbGlkYXRpb25zLmZvckVhY2godmFsaWQgPT4ge1xuICAgICAgICB2YWxpZExpc3QucHVzaCh2YWxpZC52YWxpZGF0b3IpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkTGlzdCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHZhbGlkYXRlQWxsRm9ybUZpZWxkcyhmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gZm9ybUdyb3VwLmdldChmaWVsZCk7XG4gICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShmYWxzZSk7XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0Rpc2FibGVkID0gdHJ1ZTtcbiAgYXV0bzogYm9vbGVhbjtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIHZhbHVlOiBcIlwiO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGQudmFsdWU7XG4gIH1cblxuICAvL01ldGhvZCByZXNwb3NpYmxlIGZvciBvcGVuIGRpYWxvZyBmaWx0ZXJcbiAgb3BlbkZpbHRlcigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmZpZWxkKTtcbiAgICBpZiAodGhpcy5maWVsZC5maWx0ZXJzICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgIGRhdGE6IHsgYXV0bzogdGhpcy5hdXRvLCBmaWx0ZXJzOiB0aGlzLmZpZWxkLmZpbHRlcnMsIGNvbnRyb2xsZXI6IHRoaXMuZmllbGQuY2xhc3NOYW1lLCB0aXRsZURpYWxvZzogXCJTZWxlY2lvbmU6ICggXCIgKyB0aGlzLmZpZWxkLmNsYXNzTmFtZS5uYW1lICsgXCIgKVwiIH1cbiAgICB9KTtcbiAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZpZWxkLnZhbHVlID0gcmVzdWx0LmNvZGlnbztcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXApO1xuICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHh0RGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRDaGVja2JveENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGNvbXBvbmVudE1hcHBlciA9IHtcclxuICBpbnB1dDogUHh0SW5wdXRDb21wb25lbnQsXHJcbiAgYnV0dG9uOiBQeHRCdXR0b25Db21wb25lbnQsXHJcbiAgZGF0ZTogUHh0RGF0ZUNvbXBvbmVudCxcclxuICBzZWxlY3Q6IFB4dFNlbGVjdENvbXBvbmVudCxcclxuICByYWRpb2J1dHRvbjogUHh0UmFkaW9idXR0b25Db21wb25lbnQsXHJcbiAgY2hlY2tib3g6IFB4dENoZWNrYm94Q29tcG9uZW50LFxyXG4gIGZpbHRlcjogUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQsXHJcbn07XHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBcIltkeW5hbWljRmllbGRdXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkQ29uZmlnO1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBGb3JtR3JvdXA7XHJcbiAgY29tcG9uZW50UmVmOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkgeyB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb21wb25lbnRNYXBwZXJbdGhpcy5maWVsZC50eXBlXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGQgPSB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0SW5wdXRDb21wb25lbnRdLFxuICBleHBvcnRzOltQeHRJbnB1dENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0SW5wdXRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3B4dC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6W1B4dEJ1dHRvbkNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0QnV0dG9uQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRCdXR0b25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERhdGVDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dERhdGVDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHREYXRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHREYXRlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3B4dC1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0U2VsZWN0Q29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0U2VsZWN0Q29tcG9uZW50XSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFNlbGVjdE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tICcuL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dFJhZGlvYnV0dG9uQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRSYWRpb2J1dHRvbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL3B4dC1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0Q2hlY2tib3hDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0Q2hlY2tib3hDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dENoZWNrYm94Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDaGVja2JveE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFB4dERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFNlbGVjdENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCBjb21wb25lbnRNYXBwZXIgPSB7XHJcbiAgaW5wdXQ6IFB4dElucHV0Q29tcG9uZW50LFxyXG4gIGJ1dHRvbjogUHh0QnV0dG9uQ29tcG9uZW50LFxyXG4gIGRhdGU6IFB4dERhdGVDb21wb25lbnQsXHJcbiAgc2VsZWN0OiBQeHRTZWxlY3RDb21wb25lbnQsXHJcbiAgcmFkaW9idXR0b246IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50LFxyXG4gIGNoZWNrYm94OiBQeHRDaGVja2JveENvbXBvbmVudCxcclxuICBmaWx0ZXI6IFB4dElucHV0RmlsdGVyQ29tcG9uZW50LFxyXG59O1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbZHluYW1pY0ZpZWxkRGlhbG9nXVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZENvbmZpZztcclxuICBASW5wdXQoKSBncm91cDogRm9ybUdyb3VwO1xyXG4gIGNvbXBvbmVudFJlZjogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcclxuICApIHsgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgZGVidWdnZXI7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCxEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2ddLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV0sXG4gIGV4cG9ydHM6W1B4dERpYWxvZ0ZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREFUQSwgdXNlVmFsdWU6IHt9fSxcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMsIHVzZVZhbHVlOiB7aGFzQmFja2Ryb3A6IHRydWV9fVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0ZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIubW9kdWxlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS1kaWFsb2cnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFB4dERpYWxvZ0ZpbHRlck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dElucHV0RmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dElucHV0RmlsdGVyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRJbnB1dEZpbHRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dENvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3B4dC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IHRlbXBsYXRlSml0VXJsIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUHh0SW5wdXRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0Lm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IFB4dERhdGVNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0U2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRSYWRpb2J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IFB4dENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBIdHRwTW9kdWxlLFxuICAgIFB4dElucHV0TW9kdWxlLFxuICAgIFB4dEJ1dHRvbk1vZHVsZSxcbiAgICBQeHREYXRlTW9kdWxlLFxuICAgIFB4dFNlbGVjdE1vZHVsZSxcbiAgICBQeHRSYWRpb2J1dHRvbk1vZHVsZSxcbiAgICBQeHRDaGVja2JveE1vZHVsZSxcbiAgICBQeHRJbnB1dEZpbHRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRDb250ZW50Q29tcG9uZW50LCBEeW5hbWljRmllbGREaXJlY3RpdmVdLFxuICAgZXhwb3J0czogW1B4dENvbnRlbnRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgUHh0Q29udGVudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudE1vZHVsZSB7IH1cbiIsIlxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQeHRCdXR0b24ge1xyXG4gICAgaWNvbjogU3RyaW5nO1xyXG4gICAgbWVudTogU3RyaW5nO1xyXG4gICAgZW5hYmxlOiBCb29sZWFuO1xyXG4gICAgZW51bSA6IE51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGljb246IFN0cmluZywgbWVudTogU3RyaW5nLCBlbmFibGU6IEJvb2xlYW4sIGlkIDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcclxuICAgICAgICB0aGlzLm1lbnUgPSBtZW51O1xyXG4gICAgICAgIHRoaXMuZW5hYmxlID0gZW5hYmxlO1xyXG4gICAgICAgIHRoaXMuZW51bSA9IGlkO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgZW51bSBPcHRpb25zU3VibWVudSB7XHJcbiAgICBTQUxWQVIgPSAxLFxyXG4gICAgUEVTUVVJU0FSID0gMixcclxuICAgIExJTVBBUiA9IDMsXHJcbiAgICBOT1ZPID0gNCxcclxuICAgIFZPTFRBUj0gNSxcclxuICAgIEVYQ0xVSVI9IDZcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0QnV0dG9uIH0gZnJvbSAnLi9tb2RlbC9weHQtc3VibWVudXMubW9kZWwnO1xuaW1wb3J0IHsgT3B0aW9uc1N1Ym1lbnUgfSBmcm9tICcuL2VudW0vb3B0aW9uLXN1Ym1lbnUuZW51bSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1zdWJtZW51cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc3VibWVudXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtc3VibWVudXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFN1Ym1lbnVzQ29tcG9uZW50PFQ+IHtcblxuICBASW5wdXQoKSBtb2RlbD86IFQgPSB7fSBhcyBUO1xuICBwcml2YXRlIHVybFNlcnZpY2UgPSBcIlwiO1xuXG4gIEBPdXRwdXQoKSBsaXN0aW5nOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHN0YXR1c1NhdmU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzRGVsZXRlOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgY29udHJvbGxlcj86IFN0cmluZztcblxuICBzYXZlKCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLnNhdmUodGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLnN0YXR1c1NhdmUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBzZWFyY2goKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2UubG9hZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5saXN0aW5nLmVtaXQocmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcbiAgZGVsZXRlKGlkKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2UuZGVsZXRlKGlkKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMuc3RhdHVzRGVsZXRlLmVtaXQocmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcbiAgY2xlYXIoKSB7XG4gICB0aGlzLm1vZGVsID0ge30gYXMgVDtcbiAgfTtcbiAgYWRkKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYWRkKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG5cbiAgYnV0dG9uczogUHh0QnV0dG9uW10gPSBbXTtcbiAgZW5hYmxlU2F2ZSA9IHRydWU7XG4gIGVuYWJsZUJhY2sgPSB0cnVlO1xuICBlbmFibGVDbGVhciA9IHRydWU7XG4gIGVuYWJsZVNlYXJjaCA9IHRydWU7XG4gIGVuYWJsZUFkZCA9IHRydWU7XG4gIGVuYWJsZURlbGV0ZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9weHRBcHBTZXJ2aWNlOiBQeHRBcHBDb21wb25lbnRTZXJ2aWNlLCBwdWJsaWMgX3NlcnZpY2VCYXNlOiBSZXF1ZXN0QmFzZVNlcnZpY2UscHVibGljIGhlbHBlcjogIEh0dHBIZWxwZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImtleWJvYXJkX2JhY2tzcGFjZVwiLCBcIlZPTFRBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5WT0xUQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiU0FMVkFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlNBTFZBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJOT1ZPXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51Lk5PVk8pKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiTElNUEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkxJTVBBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJzZWFyY2hcIiwgXCJQRVNRVUlTQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuUEVTUVVJU0FSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkVYQ0xVSVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuRVhDTFVJUikpO1xuXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKSArIHRoaXMubW9kZWwuY29uc3RydWN0b3IubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdGhpcy5fc2VydmljZUJhc2UudXJsU2VydmljZUF1dG8gPSB0aGlzLnVybFNlcnZpY2UgO1xuICAgICAgY29uc29sZS5sb2codGhpcy51cmxTZXJ2aWNlKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTdWJtZW51c0NvbXBvbmVudCB9IGZyb20gJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBwcm92aWRlcnM6W1B4dEh0dHBTZXJ2aWNlLCBSZXF1ZXN0QmFzZVNlcnZpY2UsIEh0dHBIZWxwZXJTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c01vZHVsZSB7IH1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dERhdGVwaWNrZXJDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncHh0LWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFN0cmluZyA9IFwiRXNjb2xoYSB1bWEgZGF0YVwiO1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBpbnB1dERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGRhdGVNb2RlbDogRGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgZ2V0IGRhdGFTZWxlY2lvbmFkYSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGVNb2RlbDtcclxuICB9XHJcblxyXG4gIHNldCBkYXRhU2VsZWNpb25hZGEoZDogRGF0ZSkge1xyXG4gICAgaWYgKGQgIT09IHRoaXMuZGF0ZU1vZGVsKSB7XHJcbiAgICAgIHRoaXMuZGF0ZU1vZGVsID0gZDtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmRhdGVNb2RlbCA9IHZhbHVlO1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBvbkRhdGVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMud3JpdGVWYWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UoKTtcclxuICB9XHJcbiAgXHJcbn0iLCJcclxuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFB4dERhdGVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1B4dERhdGVwaWNrZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVQaWNrZXJNb2R1bGUge1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBjYW5jZWxhdGlvbigpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShmYWxzZSk7XG4gIH1cbiAgY29uZmlybWF0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICBzZWxlY3RSb3cocm93KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uocm93KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0RGlhbG9nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dDb21wb25lbnRdXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWZpbHRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZGF0YSA6IGFueTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dDb21wb25lbnQ+LCBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEZpbHRlckNvbXBvbmVudF1cbiBcbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSwgTWF0VGFibGVEYXRhU291cmNlLCBNYXRQYWdpbmF0b3IsIE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZmlsdGVyczogYW55O1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuICBcbiAgZGlzcGxheWVkQ29sdW1ucyA9IFsnY29kaWdvJywgJ2Rlc2NyaWNhbyddO1xuICBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIC8vU2VhcmNoLlxuICBzZWFyY2goKSB7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBNYXA8YW55LCBhbnk+KCk7XG4gICAgaWYgKHRoaXMuZmlsdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1trZXldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBhcmFtcy5zZXQoa2V5LCB0aGlzLmZpbHRlcnNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgICB9KTtcbiAgfTtcblxuICAvL1JvdyBTZWxlY3RlZFxuICBzZWxlY3RSb3cocm93KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uocm93KTtcbiAgfTtcblxuICAvL0Nsb3NlXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH07XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnRdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV0sXG4gIGV4cG9ydHM6W1B4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREFUQSwgdXNlVmFsdWU6IHt9fSxcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMsIHVzZVZhbHVlOiB7aGFzQmFja2Ryb3A6IHRydWV9fVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0ZpbHRlckN1c3RvbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IHB4dEVudW1UYWdIdG1sIH0gZnJvbSBcIi4uL2VudW0vcHh0LWVudW0tdGFnLWh0bWxcIjtcclxuaW1wb3J0IHsgcHh0RW51bVR5cGVUYWcgfSBmcm9tIFwiLi4vZW51bS9weHQtZW51bS10eXBlLXRhZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBweHRGaWVsZHMge1xyXG4gICAgdHlwZTogcHh0RW51bVR5cGVUYWc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgdGFnOiBweHRFbnVtVGFnSHRtbDtcclxufVxyXG4iLCJleHBvcnQgZW51bSBweHRFbnVtVGFnSHRtbCB7XHJcbiAgICBJbnB1dCA9IDEsXHJcbiAgICBDb21ibyA9IDIsXHJcbiAgICBGaWx0ZXIgPSAzLFxyXG4gICAgQ2hlY2tib3ggPSA0XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC11cGxvYWQtZmlsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDpzdHJpbmc7XG4gIEBPdXRwdXQoKSBmaWxlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGFycmF5SW1hZ2VzIDpGaWxlUmVhZGVyO1xuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIG9uQ2hhbmdlSW1hZ2VtKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGltYWdlbTogRmlsZSA9IGV2ZW50O1xuICAgICAgdGhpcy5wbGFjZWhvbGRlcj0gaW1hZ2VtLm5hbWU7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVNlbGVjdGVkLm5leHQoaW1hZ2VtKTtcbiAgICB9XG5cbiAgfTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6W1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHMgOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRVcGxvYWRGaWxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hHYWxsZXJ5T3B0aW9ucywgTmd4R2FsbGVyeUltYWdlLCBOZ3hHYWxsZXJ5QW5pbWF0aW9uIH0gZnJvbSAnbmd4LWdhbGxlcnknO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZ2FsbGVyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBnYWxsZXJ5T3B0aW9uczogTmd4R2FsbGVyeU9wdGlvbnNbXTtcbiAgQElucHV0KCkgZ2FsbGVyeUltYWdlczogTmd4R2FsbGVyeUltYWdlW107XG4gIEBJbnB1dCgpIHdpZHRoOiBhbnkgPSBcIjEwMCVcIjtcbiAgQElucHV0KCkgaGVpZ2h0OiBhbnkgPSAnNDAwcHgnO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZ2FsbGVyeU9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICB0aHVtYm5haWxzQ29sdW1uczogNCxcbiAgICAgICAgaW1hZ2VBbmltYXRpb246IE5neEdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgIH0sXG4gICAgICAvLyBtYXgtd2lkdGggODAwXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIGltYWdlUGVyY2VudDogODAsXG4gICAgICAgIHRodW1ibmFpbHNQZXJjZW50OiAyMCxcbiAgICAgICAgdGh1bWJuYWlsc01hcmdpbjogMjAsXG4gICAgICAgIHRodW1ibmFpbE1hcmdpbjogMjBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDQwMCxcbiAgICAgICAgcHJldmlldzogZmFsc2VcbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE5neEdhbGxlcnlNb2R1bGUgfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5pbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsIE5neEdhbGxlcnlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiY29tcG9uZW50TWFwcGVyIiwibm9vcCIsIkNVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU1FLHdCQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtLQUFLOztnQkFKM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7O2dCQUptQixnQkFBZ0I7O3lCQUFwQzs7Ozs7OztBQ0FBOzs2QkFLMEMsSUFBSSxPQUFP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TyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7Ozs7OztJQUVELG1DQUFNOzs7OztJQUFOLFVBQU8sSUFBWSxFQUFFLEtBQVc7UUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9EO0tBQ0Y7Ozs7OztJQUVELGtDQUFLOzs7OztJQUFMLFVBQU0sSUFBWSxFQUFFLEtBQVc7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlEO0tBQ0Y7Ozs7OztJQUVELHFDQUFROzs7OztJQUFSLFVBQVMsSUFBWSxFQUFFLEVBQVU7UUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxD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