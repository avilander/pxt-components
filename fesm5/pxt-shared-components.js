import { Directive, ViewContainerRef, Injectable, ChangeDetectorRef, Component, Input, ViewChild, ComponentFactoryResolver, Inject, NgModule, Injector, EventEmitter, Output, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Pipe, HostListener, defineInjectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatMenuTrigger, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatLineModule, MatCommonModule, MatOptionModule, MatFormFieldModule, MatPseudoCheckboxModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { CommonModule, UpperCasePipe, DatePipe } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { __extends } from 'tslib';
import { Headers, Http, RequestOptions, XHRBackend, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
     * @return {?}
     */
    HttpHelperService.prototype.getFrontSgi = /**
     * @return {?}
     */
    function () {
        return this.configService.getConfiguration('FRONT', 'SGI');
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
     * @return {?}
     */
    PxtDialogComponent.prototype.confirmation = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(true);
    };
    PxtDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-pxt-dialog',
                    template: "<div class=\"example-container\">\n    <mat-card>\n        <h2 mat-dialog-title>{{data.titleDialog}}</h2>\n        <mat-dialog-content>\n            {{data.contentDialog}}\n        </mat-dialog-content>\n        <mat-dialog-actions>\n            <button mat-button (click)=\"confirmation()\">Confirmar</button>\n            <button mat-button mat-dialog-close>Cancelar</button>\n        </mat-dialog-actions>\n    </mat-card>\n</div>",
                    styles: [".example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}::ng-deep .mat-dialog-container{padding:0!important;max-height:inherit}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}"]
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
var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.errorMessage = "";
    }
    ErrorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ErrorService.ctorParameters = function () { return []; };
    /** @nocollapse */ ErrorService.ngInjectableDef = defineInjectable({ factory: function ErrorService_Factory() { return new ErrorService(); }, token: ErrorService, providedIn: "root" });
    return ErrorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Handles HttpClient errors
 */
var HttpErrorHandler = /** @class */ (function () {
    function HttpErrorHandler(errorService) {
        var _this = this;
        this.errorService = errorService;
        /**
         * Create handleError function that already knows the service name
         */
        this.createHandleError = function (serviceName) {
            if (serviceName === void 0) { serviceName = ''; }
            return function (operation, result) {
                if (operation === void 0) { operation = 'operation'; }
                if (result === void 0) { result = /** @type {?} */ ({}); }
                return _this.handleError(serviceName, operation, result);
            };
        };
    }
    /**
     * @param serviceName: name of the data service
     * @param operation: name of the failed operation
     * @param result: optional value to return as the observable result
     */
    /**
     * @template T
     * @param {?=} serviceName
     * @param {?=} operation
     * @param {?=} result
     * @return {?}
     */
    HttpErrorHandler.prototype.handleError = /**
     * @template T
     * @param {?=} serviceName
     * @param {?=} operation
     * @param {?=} result
     * @return {?}
     */
    function (serviceName, operation, result) {
        var _this = this;
        if (serviceName === void 0) { serviceName = ''; }
        if (operation === void 0) { operation = 'operation'; }
        if (result === void 0) { result = /** @type {?} */ ({}); }
        return function (error) {
            // Todo -> Send the error to remote logging infrastructure
            console.error(error);
            /** @type {?} */
            var message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                "{error code: " + error.status + ", body: \"" + error.message + "\"}";
            // Todo -> Transforming error for user consumption
            // Todo -> Transforming error for user consumption
            _this.errorService.errorMessage = serviceName + " -> " + operation + " failed.\n  Message: " + message;
            // -> Return a safe result.
            return of(result);
        };
    };
    HttpErrorHandler.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpErrorHandler.ctorParameters = function () { return [
        { type: ErrorService }
    ]; };
    return HttpErrorHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtHttpService = /** @class */ (function (_super) {
    __extends(PxtHttpService, _super);
    function PxtHttpService(backend, options, injector, urlHelper, dialog, tokenService, httpErrorHandler) {
        var _this = _super.call(this, backend, options) || this;
        _this.backend = backend;
        _this.injector = injector;
        _this.urlHelper = urlHelper;
        _this.dialog = dialog;
        _this.tokenService = tokenService;
        _this.httpErrorHandler = httpErrorHandler;
        _this.isUnathourized = false;
        _this.handleError = httpErrorHandler.createHandleError('CustomerService');
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
        headers.append("Cache-Control", "no-cache");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Credentials", "true");
        headers.append("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
        headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
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
        result = observable.pipe(
        // catchError(this.handleError('addCustomer', null)),
        catchError(function (error) {
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
        console.log(res);
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
        console.log(error);
        switch (error.status) {
            case 401:
                if (!this.isUnathourized) {
                    this.openDialog(401);
                    //this.tokenService.removeTokenStorage();
                    //window.location.href = environment.esbApiPxt + "?erro=401";
                }
                this.isUnathourized = true;
                break;
            case 400:
                console.log("error 400");
                this.openDialog(400);
                // this.tokenService.removeTokenStorage();
                //window.location.href = environment.esbApiPxt + "?erro=400";
                break;
            case 404:
                console.log("error 400");
                this.openDialog(404);
                //this.tokenService.removeTokenStorage();
                //window.location.href = environment.esbApiPxt + "?erro=404";
                break;
            case 403:
                console.log(403);
                this.openDialog(403);
                //this.tokenService.removeTokenStorage();
                //window.location.href = environment.esbApiPxt + "?erro=404";
                break;
            default:
                console.log(error);
                //this.openDialog(500);
                // window.location.href = environment.esbApiPxt + "?erro=0";
                break;
        }
        return Observable.throw(error);
    };
    /**
     * @param {?} erro
     * @return {?}
     */
    PxtHttpService.prototype.openDialog = /**
     * @param {?} erro
     * @return {?}
     */
    function (erro) {
        var _this = this;
        /** @type {?} */
        var contentDialog = "Você será redirecionado a tela de autenticação!";
        /** @type {?} */
        var dialogRef = this.dialog.open(PxtDialogComponent, {
            width: '600px',
            panelClass: 'pxt-dialog',
            data: { titleDialog: "Erro - " + erro, contentDialog: contentDialog }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(_this.urlHelper.getFrontSgi());
            window.location.href = _this.urlHelper.getFrontSgi() + "?erro=" + erro;
        });
    };
    PxtHttpService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PxtHttpService.ctorParameters = function () { return [
        { type: XHRBackend },
        { type: RequestOptions },
        { type: Injector },
        { type: HttpHelperService },
        { type: MatDialog },
        { type: TokenService },
        { type: HttpErrorHandler }
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
var ControllerPipe = /** @class */ (function () {
    function ControllerPipe() {
    }
    /**
     * @param {?} text
     * @param {?=} args
     * @return {?}
     */
    ControllerPipe.prototype.transform = /**
     * @param {?} text
     * @param {?=} args
     * @return {?}
     */
    function (text, args) {
        if (text != undefined) {
            /** @type {?} */
            var words = text;
            /** @type {?} */
            var aux = "";
            for (var a = 0; a < words.length; a++) {
                if (a == 0) {
                    aux = words[a].toLowerCase();
                }
                else {
                    aux = aux + words[a];
                }
            }
            return aux;
        }
    };
    ControllerPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'controllerPipe'
                },] }
    ];
    return ControllerPipe;
}());

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
                    declarations: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe, ControllerPipe],
                    exports: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe, ControllerPipe]
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
var InterceptService = /** @class */ (function () {
    function InterceptService() {
    }
    // intercept request and add token
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    InterceptService.prototype.intercept = /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        // modify request
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + localStorage.getItem('MY_TOKEN')
            }
        });
        console.log("----request----");
        console.log(request);
        console.log("--- end of request---");
        return next.handle(request)
            .pipe(tap(function (event) {
            if (event instanceof HttpResponse) {
                console.log(" all looks good");
                // http response status code
                console.log(event.status);
            }
        }, function (error) {
            // http response status code
            console.log("----response----");
            console.error("status code:");
            console.error(error.status);
            console.error(error.message);
            console.log("--- end of response---");
        }));
    };
    InterceptService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InterceptService.ctorParameters = function () { return []; };
    return InterceptService;
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
                        ToastrModule.forRoot({ progressBar: true })
                    ],
                    declarations: [PxtAppComponent, PxtContentBody, HashDirective],
                    exports: [PxtAppComponent],
                    providers: [PxtAppComponentService,
                        PxtHttpService,
                        RequestBaseService,
                        HttpHelperService,
                        ConfigService,
                        HttpErrorHandler,
                        VisibleInRolesGuard,
                        TokenService,
                        AuthorityService,
                        InterceptService, {
                            provide: HTTP_INTERCEPTORS,
                            useClass: InterceptService,
                            multi: true
                        }]
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
        this.controller = data.controller;
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
        else {
            if (this.data.displayedColumns != undefined) {
                this.displayedColumns = this.data.displayedColumns;
            }
        }
    };
    /**
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.cancelation = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(undefined);
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
        debugger;
        if (this.data.auto != undefined && this.data.auto) {
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
        this.dialogRef.close(undefined);
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
                    template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <div *ngIf=\"!auto\">\n          <mat-grid-list class=\"mat-grid-tile-content\" [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile [colspan]='1'>\n              <mat-form-field>\n                <input type=\"number\" matInput placeholder=\"Codigo\" [(ngModel)]=\"filter.code\">\n              </mat-form-field>\n            </mat-grid-tile>\n            <mat-grid-tile  class=\"mat-grid-tile-content\" [colspan]='1'>\n              <mat-form-field>\n                <input matInput placeholder=\"Descri\u00E7\u00E3o\" [(ngModel)]=\"filter.description\">\n              </mat-form-field>\n            </mat-grid-tile>\n          </mat-grid-list>\n      </div>\n\n      <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\">\n          <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n              <ng-container dynamicFieldDialog [field]=\"field\" [group]=\"form\">\n              </ng-container>\n            </mat-grid-tile>\n            <mat-grid-tile class=\"mat-grid-tile-content\">\n            </mat-grid-tile>\n          </mat-grid-list>\n        </form>\n      </div>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n\n          <ng-container *ngFor=\"let column of displayedColumns\" [matColumnDef]=\"column\">\n              <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> {{column}} </mat-header-cell>\n              <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\">{{item[column]}} </mat-cell>\n            </ng-container>\n        <!--\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n             -->\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n \n      </mat-table>\n   \n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                    styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}mat-form-field{width:100%;height:100%}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}"]
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
    //private onChangeCallback: (_: any) => void = noop;
    function PxtInputFilterComponent(dialog) {
        this.dialog = dialog;
        this.isDisabled = true;
        this.placeholder = " ";
        this.onValueCallback = new EventEmitter();
        this.value = " ";
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PxtInputFilterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["className"] != undefined && !changes["className"].firstChange) {
            this.className = changes["className"].currentValue;
        }
        if (changes["placeholder"] != undefined && !changes["placeholder"].firstChange) {
            this.placeholder = changes["placeholder"].currentValue;
        }
        if (changes["value"] != undefined && !changes["value"].firstChange) {
            this.value = changes["value"].currentValue;
        }
        if (changes["displayedColumns"] != undefined && !changes["displayedColumns"].firstChange) {
            this.displayedColumns = changes["displayedColumns"].currentValue;
        }
    };
    /**
     * @return {?}
     */
    PxtInputFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.field != undefined) {
            this.value = this.field.value;
        }
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
        if (this.field != undefined && this.field.filters != undefined) {
            this.auto = true;
            /** @type {?} */
            var dialogRef = this.dialog.open(PxtDialogFilterComponent, {
                width: '600px',
                panelClass: 'pxt-dialog',
                data: { auto: this.auto, filters: this.field.filters, controller: this.field.className, titleDialog: "Selecione: ( " + this.field.className + " )" }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result !== undefined) {
                    _this.field.value = result.codigo;
                }
            });
        }
        else {
            /** @type {?} */
            var dialogRef = this.dialog.open(PxtDialogFilterComponent, {
                width: '600px',
                panelClass: 'pxt-dialog',
                data: { controller: this.className, displayedColumns: this.displayedColumns, titleDialog: "Selecione: ( " + this.className + " )" }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result !== undefined) {
                    _this.value = result[_this.displayedColumns[1]];
                    _this.onValueCallback.emit(result);
                }
            });
        }
    };
    PxtInputFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-input-filter',
                    template: "<!--\n<mat-grid-list cols=\"6\" rowHeight=\"5:3\">\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='5'>\n    <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" disabled=\"isDisabled\">\n      <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n      <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n        <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n      </ng-container>\n    </mat-form-field>\n  </mat-grid-tile>\n\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='1'>\n    <button mat-icon-button>\n      <mat-icon (click)=\"openFilter()\">search</mat-icon>\n    </button>\n  </mat-grid-tile>\n\n</mat-grid-list>\n-->\n<div *ngIf=\"this.field != undefined\">\n  <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label | uppercaseFirst\" size=\"10\"\n      [type]=\"field.inputType\">\n    <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n      <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n    </ng-container>\n  </mat-form-field>\n</div>\n\n<div *ngIf=\"this.field == undefined\">\n  <mat-form-field class=\"demo-full-width\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [placeholder]=\"placeholder | uppercaseFirst\" size=\"10\" disabled=\"true\" [(ngModel)]=\"value\">\n  </mat-form-field>\n</div>",
                    styles: ["mat-form-field{width:100%;height:100%}.btn-input-file{position:absolute;right:0;bottom:0}:host{width:100%;height:100%}.pxt-dialog .mat-dialog-container{padding:0!important}::ng-deep .mat-dialog-container{padding:0!important}"]
                }] }
    ];
    /** @nocollapse */
    PxtInputFilterComponent.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    PxtInputFilterComponent.propDecorators = {
        className: [{ type: Input }],
        placeholder: [{ type: Input }],
        displayedColumns: [{ type: Input }],
        onValueCallback: [{ type: Output }],
        value: [{ type: Input }]
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
    function PxtSubmenusComponent(_pxtAppService, _serviceBase, helper, notificationService) {
        var _this = this;
        this._pxtAppService = _pxtAppService;
        this._serviceBase = _serviceBase;
        this.helper = helper;
        this.notificationService = notificationService;
        this.model = /** @type {?} */ ({});
        this.urlService = "";
        this.listing = new EventEmitter();
        this.statusSave = new EventEmitter();
        this.statusDelete = new EventEmitter();
        this.cols = 3;
        this.colspan = 1;
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
            debugger;
            _this.urlService = helper.getApi() + new ControllerPipe().transform(_this.model.constructor.name);
            _this._serviceBase.urlServiceAuto = _this.urlService;
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
        if (this.validationModel()) {
            this._serviceBase.save(this.model).subscribe(function (result) {
                _this.statusSave.emit(result);
            });
        }
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
    /**
     * @return {?}
     */
    PxtSubmenusComponent.prototype.validationModel = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (Object.keys(this.model).length > 0) {
            Object.keys(this.model).forEach(function (key) {
                if (_this.model[key] != undefined && _this.model[key] != "") {
                    _this.notificationService.error("Campo Obrigatório", key.toString().toLocaleUpperCase());
                    return false;
                }
            });
            return true;
        }
        else {
            debugger;
            this.notificationService.warning("Nenhum campo preenchido.", "Aviso!");
            return false;
        }
    };
    PxtSubmenusComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-submenus',
                    template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"delete(0)\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu | uppercaseFirst}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                    styles: [".btn-input-file{position:absolute;right:0;bottom:0}"]
                }] }
    ];
    /** @nocollapse */
    PxtSubmenusComponent.ctorParameters = function () { return [
        { type: PxtAppComponentService },
        { type: RequestBaseService },
        { type: HttpHelperService },
        { type: ToastrService }
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
                    template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\">\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <ng-content></ng-content>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                    styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}::ng-deep .mat-dialog-container{padding:0!important;max-height:inherit}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}mat-form-field{width:100%;height:100%}"]
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
var PxtFilterMatTableComponent = /** @class */ (function () {
    function PxtFilterMatTableComponent() {
        this.dataSource = new MatTableDataSource();
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.filters = [];
    }
    /**
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.add = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var input = event.input;
        /** @type {?} */
        var value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.filters = [];
            this.filters.push({ name: value.trim() });
            this.applyFilter(value);
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.applyFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        filter = filter.trim();
        filter = filter.toLowerCase();
        this.dataSource.filter = filter;
    };
    /**
     * @param {?} fruit
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.remove = /**
     * @param {?} fruit
     * @return {?}
     */
    function (fruit) {
        /** @type {?} */
        var index = this.filters.indexOf(fruit);
        if (index >= 0) {
            this.filters.splice(index, 1);
        }
        this.applyFilter('');
    };
    /**
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.configureFilterPredicate = /**
     * @return {?}
     */
    function () {
        this.dataSource.filterPredicate = function (row, event) {
            return (row.codigo.toString().indexOf(event) >= 0 ||
                row.nomeImagem.toString().indexOf(event) >= 0);
        };
    };
    PxtFilterMatTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-filter-mat-table',
                    template: "<mat-card class=\"card-filter\" >\n    <div class=\"filters\">\n        <mat-form-field class=\"example-chip-list\">\n            <mat-chip-list #chipList>\n              <mat-chip *ngFor=\"let filter of filters\" [selectable]=\"selectable\"\n                       [removable]=\"removable\" (removed)=\"remove(filter)\">\n                {{filter.name}}\n                <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon>\n              </mat-chip>\n              <input [placeholder]=\"placeholder\"\n                     [matChipInputFor]=\"chipList\"\n                     [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n                     [matChipInputAddOnBlur]=\"addOnBlur\"\n                     (matChipInputTokenEnd)=\"add($event)\">\n            </mat-chip-list>\n          </mat-form-field>\n    </div>\n  </mat-card >",
                    styles: [".card-filter{padding:initial!important}.filters{font-size:16px;padding-left:10px;padding-right:10px}mat-form-field{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    PxtFilterMatTableComponent.ctorParameters = function () { return []; };
    PxtFilterMatTableComponent.propDecorators = {
        dataSource: [{ type: Input }],
        placeholder: [{ type: Input }]
    };
    return PxtFilterMatTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtFilterMatTableModule = /** @class */ (function () {
    function PxtFilterMatTableModule() {
    }
    PxtFilterMatTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule
                    ],
                    declarations: [PxtFilterMatTableComponent],
                    exports: [PxtFilterMatTableComponent],
                    entryComponents: [PxtFilterMatTableComponent]
                },] }
    ];
    return PxtFilterMatTableModule;
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

export { PxtAppModule, PxtAppComponent, PxtContentModule, PxtContentComponent, MaterialAngularModule, PxtSubmenusModule, PxtSubmenusComponent, PxtDatePickerModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1 as CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, PxtDatepickerComponent, PxtDialogModule, PxtDialogComponent, PxtFilterModule, PxtFilterComponent, PxtDialogFilterCustomModule, PxtDialogFilterCustomComponent, PxtSelectModule, PipeModule, PxtInputFilterModule, PxtInputFilterComponent, PxtFilterMatTableModule, ControllerPipe, PxtAppComponentService, PxtHttpService, ConfigService, HttpHelperService, RequestBaseService, VisibleInRolesGuard, AuthorityService, pxtConfiguration, pxtFields, pxtEnumTagHtml, PxtUploadFileModule, PxtGalleryModule, PxtGalleryComponent, pxtCheckboxField, pxtfilterCustomField, pxtDateField, pxtFilterField, pxtInputField, pxtRadioButtonField, pxtSelectField, HashDirective as ɵg, DynamicFieldDirective as ɵba, DynamicFieldDirectiveDialog as ɵz, PxtContentBody as ɵf, PxtAppMenuItemComponent as ɵe, PxtAppMenuItemModule as ɵd, PxtDialogFilterComponent as ɵy, PxtDialogFilterModule as ɵx, PxtFilterMatTableComponent as ɵbb, PxtUploadFileComponent as ɵbc, PxtButtonComponent as ɵo, PxtButtonModule as ɵn, PxtCheckboxComponent as ɵw, PxtCheckboxModule as ɵv, PxtDateComponent as ɵq, PxtDateModule as ɵp, PxtInputComponent as ɵm, PxtInputModule as ɵl, PxtRadiobuttonComponent as ɵu, PxtRadiobuttonModule as ɵt, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR as ɵr, PxtSelectComponent as ɵs, DateFormatPipe as ɵb, DateTimeFormatPipe as ɵc, UpercaseFirst as ɵa, ErrorService as ɵj, HttpErrorHandler as ɵi, TokenService as ɵh, InterceptService as ɵk };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC90b2tlbi5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2Vycm9yLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtZXJyb3ItaGFuZGxlci50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3VwcGVyY2FzZS1maXJzdC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvdXRpbC9jb25zdGFudHMudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtdGltZS1mb3JtYXQucGlwZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvY29udHJvbGxlci5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZGVscy9weHRDb25maWd1cmF0aW9uLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC92aXNpYmxlLWluLXJvbGVzLmd1YXJkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaW50ZXJjZXB0b3IvaW50ZXJjZXB0LXNlcnZpY2UgLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZGF0ZS1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1maWx0ZXItZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXIvcHh0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci9weHQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci1tYXQtdGFibGUvcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXItbWF0LXRhYmxlL3B4dC1maWx0ZXItbWF0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWVsZHMtbW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2VudW0vcHh0LWVudW0tdGFnLWh0bWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3VibWVudXNJdGVuczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnN1Ym1lbnVzSXRlbnMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRDb21wb25lbnRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9sb2FkQ29tcG9uZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldFVzZXJMb2dnZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VyTG9nZ2VkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0VXNlckxvZ2dlZC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRJbmZvSW5pdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9Jbml0aWFsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRJbmZvSW5pdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZXRTdWJtZW51cyhyb3V0ZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VibWVudXNJdGVucy5uZXh0KHJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbEluZm8oaW5mb0luaXRpYWwpIHtcclxuICAgICAgICB0aGlzLl9zZXRJbmZvSW5pdC5uZXh0KGluZm9Jbml0aWFsKVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50Lm5leHQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NldFVzZXJMb2dnZWQubmV4dCh1c2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHh0QXBwIH0gZnJvbSAnLi9weHQtYXBwJztcbmltcG9ydCB7IFB4dEFwcE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9weHQtYXBwLm1vZGVsJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdE1lbnUsIE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFNhZmVIdG1sLCBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC5jb21wb25lbnQuc2NzcyddXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50IHtcblxuICAvL1Byb3BlcnRpZXNcbiAgcm91dGVzOiBhbnlbXSA9IFtdO1xuICBncm91cHM6IGFueVtdID0gW107XG4gIG1lbnVzOiBhbnlbXSA9IFtdO1xuICBzeXN0ZW06IFN0cmluZyA9IFwiU1lTVEVNIE5BTUVcIlxuICB1cmxJbWc6IHN0cmluZyA9ICdodHRwOi8vaW1hZ2Vuc2Rzdi5wZWl4b3RvLmNvbS5ici9hdXRoL21pbmlfbG9nby5wbmcnO1xuICBtZW51U2VsZWN0ZWQgPSBcIlwiO1xuICB1c3VlckxvZ2dlZCA9IFwiTG9vZ2dlZCB1c2VyXCI7XG4gIG1lbnVzSHRtbDogU2FmZUh0bWw7XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgX21vYmlsZVF1ZXJ5TGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF0TWVudTogTWF0TWVudTtcbiAgQFZpZXdDaGlsZCgnbWVudXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgc3ViQ29udGFpbmVyMTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnVUcmlnZ2VyJywgeyByZWFkOiBNYXRNZW51VHJpZ2dlciB9KSBjb250ZXh0TWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuICBtZW51c1JlY2VpdmVkIDogYW55W107XG4gIFxuICAvL0NvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBtZWRpYTogTWVkaWFNYXRjaGVyLFxuICAgIHB1YmxpYyBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMubW9iaWxlUXVlcnkgPSBtZWRpYS5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA2MDBweCknKTtcbiAgICB0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyID0gKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubW9iaWxlUXVlcnkuYWRkTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgdGhpcy5yZXN1bHQgPSBweHRBcHBDb21wb25lbnRTZXJ2aWNlLmluZm9Jbml0aWFsLnN1YnNjcmliZShpbmZvSW5pdGlhbCA9PiB7XG4gICAgICBpZiAoaW5mb0luaXRpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudXN1ZXJMb2dnZWQgPSBpbmZvSW5pdGlhbC51c2VyTG9nZ2VkO1xuICAgICAgICB0aGlzLnN5c3RlbSA9IGluZm9Jbml0aWFsLnN5c3RlbTtcbiAgICAgICAgdGhpcy5tZW51c1JlY2VpdmVkID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLm1lbnVzID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLnByZXBhcmVNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpYmVDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubW9iaWxlUXVlcnkucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIC8vIEluY2x1ZGUgb2YgY29tcG9uZW50cyBpbiB0aGUgYXBwbGljYXRpb24gYm9keVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnksIGFkSG9zdCkge1xuICAgIHRoaXMubWVudVNlbGVjdGVkID0gcm91dGUubWVudVRleHQ7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlLm1lbnVTb3VyY2U7XG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShhZEl0ZW0uY29tcG9uZW50KTtcbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IGFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZpY2UgcmVzcG9uc2libGUgZm9yIGluY2x1ZGluZyBjb21wb25lbnRzIGluIHRoZSBib2R5IG9mIHRoZSBhcHBsaWNhdGlvblxuICBzdWJzY3JpYmVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnRPYnNlcnZhYmxlLnN1YnNjcmliZShjb21wb25lbnRPYmogPT4ge1xuICAgICAgdmFyIGFycmF5QXV4ID0gdGhpcy5tZW51c1JlY2VpdmVkLmZpbHRlcih4PT54Lm1lbnVTb3VyY2UgIT0gdW5kZWZpbmVkICYmIHgubWVudVNvdXJjZS5jb21wb25lbnQgPT09IGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgaWYoYXJyYXlBdXgubGVuZ3RoID09IDEpe1xuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IGFycmF5QXV4WzBdLm1lbnVUZXh0O1xuICAgICAgfVxuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRPYmouY29tcG9uZW50KTtcbiAgICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5hZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICg8QWRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhID0gY29tcG9uZW50T2JqLmRhdGE7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXNwb25zaWJsZSBmb3IgY2FsbCBtZXRob2QgXCJsb2FkY29tcG9uZW50cygpXCIgaW5mb3JtaW5nIHBhcmFtZXRlcnNcbiAgc2VsZWN0SXRlbU1lbnUobmF2KSB7XG4gICAgdGhpcy5sb2FkQ29tcG9uZW50KG5hdiwgdGhpcy5hZEhvc3QpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBwcmVwYXJpbmcgYXBwbGljYXRpb24gbWVudXM7XG4gIHByZXBhcmVNZW51KCkge1xuICAgIGxldCBhcnJheUF1eDogYW55W107XG4gICAgYXJyYXlBdXggPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJncm91cFwiICYmIHgubWVudVBhcmVudCA9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhHcm91cCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhJdGVtID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiaXRlbVwiICYmIHgubWVudVBhcmVudCAhPT0gXCJcIik7XG5cbiAgICAvL2FkZCBpdGVucyBpbiBncm91cHNcbiAgICBhcnJheUF1eEl0ZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4R3JvdXAuZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSlcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy9hZGQgZ3JvdXBzIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4R3JvdXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4LmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLm1lbnVzID0gYXJyYXlBdXg7XG4gIH1cbn1cbiIsImltcG9ydCAnLi8uLi8uLi8uLi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7Q2RrVGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0Nka1RyZWVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICBNYXRCYWRnZU1vZHVsZSxcbiAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSxcbiAgTWF0Q2hpcHNNb2R1bGUsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gIE1hdERpYWxvZ01vZHVsZSxcbiAgTWF0RGl2aWRlck1vZHVsZSxcbiAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdExpc3RNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0UmFkaW9Nb2R1bGUsXG4gIE1hdFJpcHBsZU1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTaWRlbmF2TW9kdWxlLFxuICBNYXRTbGlkZXJNb2R1bGUsXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0U3RlcHBlck1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRhYnNNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdFRvb2x0aXBNb2R1bGUsXG4gIE1hdFRyZWVNb2R1bGUsXG4gIE1hdExpbmVNb2R1bGUsXG4gIE1hdENvbW1vbk1vZHVsZSxcbiAgTWF0T3B0aW9uTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICBcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7cGxhdGZvcm1Ccm93c2VyRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsTWF0Q2FyZE1vZHVsZSxNYXRJY29uTW9kdWxlLE1hdExpbmVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxNYXRTb3J0TW9kdWxlLE1hdFRhYnNNb2R1bGUsTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxNYXRDaGlwc01vZHVsZSxNYXRJbnB1dE1vZHVsZSxNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxNYXRCdXR0b25Nb2R1bGUsTWF0Q29tbW9uTW9kdWxlLE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsTWF0UmlwcGxlTW9kdWxlLE1hdFNlbGVjdE1vZHVsZSxNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxNYXRTaWRlbmF2TW9kdWxlLE1hdFN0ZXBwZXJNb2R1bGUsTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLE1hdFRvb2x0aXBNb2R1bGUsTWF0Q2hlY2tib3hNb2R1bGUsTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsTWF0RXhwYW5zaW9uTW9kdWxlLE1hdEZvcm1GaWVsZE1vZHVsZSxNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxNYXROYXRpdmVEYXRlTW9kdWxlLE1hdEJvdHRvbVNoZWV0TW9kdWxlLE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxNYXRCdXR0b25Ub2dnbGVNb2R1bGUsTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBjb25maWc6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgbG9hZCh1cmw6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5qZWN0SHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGluamVjdEh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgICBtYXAocmVzID0+IHJlcylcclxuICAgICAgKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWd1cmF0aW9uKGVsZW1lbnQ6IHN0cmluZywgZGF0YUxpc3Q/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZGF0YUxpc3QpIHtcclxuICAgICAgY29uc3QgdXJsV2l0aEVsZW1lbnQgPSB0aGlzLmNvbmZpZ1tlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhEYXRhTGlzdCA9IHRoaXMuY29uZmlnW2RhdGFMaXN0XVtlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhEYXRhTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2ZXJpZnlVcmwodHlwZU1vZGVsOiBhbnkpIHtcclxuICAgIGlmICh0eXBlTW9kZWwuaW5jbHVkZXMoJy8nLCB0eXBlTW9kZWwubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgY29uc3QgdHlwZVJlbGVhc2UgPSB0eXBlTW9kZWw7XHJcbiAgICAgIHJldHVybiB0eXBlUmVsZWFzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlTW9kZWwgKyAnLyc7XHJcbiAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEZyb250U2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdGUk9OVCcsICdTR0knKTtcclxuICB9O1xyXG5cclxuXHJcbiAgcHVibGljIGdldEFwaVVybCAobmFtZSwgdXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24odXJsLCBuYW1lKTtcclxuICB9XHJcbn0iLCJcbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudCA9IHtcbiAgcHJvZHVjdGlvbjogdHJ1ZSxcbiAgZW52TmFtZTogJ2RldicsXG4gIHZlcnNpb246ICcwLjAuMScsXG4gIENPTkZJR19GSUxFOiAnYXNzZXRzL2NvbmZpZy9lbnYuanNvbicsXG4gIGVzYkFwaVB4dCA6IFwiaHR0cDovL2VzYmRzdi5wZWl4b3RvLmNvbS5ici9zZ2UvXCIsICBcbiAgc3lzdGVtOiB7XG4gICAgaWQ6IDEwOCxcbiAgICBwcmV4OiBcIlBPUkNSUFwiXG4gIH1cbn07XG5cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cCwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcblxudmFyIHN5c3RlbSA9IGVudmlyb25tZW50LnN5c3RlbTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfVxuICBzZXRUb2tlblN0b3JhZ2UocmVzOiBhbnkpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgfVxuICByZW1vdmVUb2tlblN0b3JhZ2UoKSB7XG4gICAgdmFyIHRva2VuID0gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXG4gICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+IGp3dF9kZWNvZGUodG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN5c3RlbS5pZCtzeXN0ZW0ucHJleCtkZWNvZGVkLnN1Yik7XG4gIH1cbiAgXG4gIGRlbGV0ZVRva2VuKCkge1xuICAgIHRoaXMucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gIH1cblxuICB0b2tlbkV4aXN0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IG51bGwgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IHVuZGVmaW5lZCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gJyc7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBjYW5jZWxhdGlvbigpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShmYWxzZSk7XG4gIH1cbiAgY29uZmlybWF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFcnJvclNlcnZpY2Uge1xyXG5cclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZyA9IFwiXCI7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IEVycm9yU2VydmljZSB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgSGFuZGxlRXJyb3IgPSA8VD4gKG9wZXJhdGlvbj86IHN0cmluZywgcmVzdWx0PzogVCkgPT4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gT2JzZXJ2YWJsZTxUPjtcclxuXHJcbi8qKiBIYW5kbGVzIEh0dHBDbGllbnQgZXJyb3JzICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBFcnJvckhhbmRsZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqIENyZWF0ZSBoYW5kbGVFcnJvciBmdW5jdGlvbiB0aGF0IGFscmVhZHkga25vd3MgdGhlIHNlcnZpY2UgbmFtZSAqL1xyXG4gIGNyZWF0ZUhhbmRsZUVycm9yID0gKHNlcnZpY2VOYW1lID0gJycpID0+IDxUPlxyXG4gICAgKG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQgPSB7fSBhcyBUKSA9PiB0aGlzLmhhbmRsZUVycm9yKHNlcnZpY2VOYW1lLCBvcGVyYXRpb24sIHJlc3VsdCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBzZXJ2aWNlTmFtZTogbmFtZSBvZiB0aGUgZGF0YSBzZXJ2aWNlXHJcbiAgICogQHBhcmFtIG9wZXJhdGlvbjogbmFtZSBvZiB0aGUgZmFpbGVkIG9wZXJhdGlvblxyXG4gICAqIEBwYXJhbSByZXN1bHQ6IG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgKi9cclxuICBoYW5kbGVFcnJvcjxUPiAoc2VydmljZU5hbWUgPSAnJywgb3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdCA9IHt9IGFzIFQpIHtcclxuXHJcbiAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAvLyBUb2RvIC0+IFNlbmQgdGhlIGVycm9yIHRvIHJlbW90ZSBsb2dnaW5nIGluZnJhc3RydWN0dXJlXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcblxyXG4gICAgICBjb25zdCBtZXNzYWdlID0gKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3JFdmVudCkgP1xyXG4gICAgICAgIGVycm9yLmVycm9yLm1lc3NhZ2UgOlxyXG4gICAgICAgYHtlcnJvciBjb2RlOiAke2Vycm9yLnN0YXR1c30sIGJvZHk6IFwiJHtlcnJvci5tZXNzYWdlfVwifWA7XHJcblxyXG4gICAgICAvLyBUb2RvIC0+IFRyYW5zZm9ybWluZyBlcnJvciBmb3IgdXNlciBjb25zdW1wdGlvblxyXG4gICAgICB0aGlzLmVycm9yU2VydmljZS5lcnJvck1lc3NhZ2UgPSBgJHtzZXJ2aWNlTmFtZX0gLT4gJHtvcGVyYXRpb259IGZhaWxlZC5cXG4gIE1lc3NhZ2U6ICR7bWVzc2FnZX1gO1xyXG4gICAgICAvLyAtPiBSZXR1cm4gYSBzYWZlIHJlc3VsdC5cclxuICAgICAgcmV0dXJuIG9mKCByZXN1bHQgKTtcclxuICAgIH07XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBmb3J3YXJkUmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlLCBYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc0FyZ3MsIFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuLCBmaW5hbGl6ZSwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi8uLi8uLi9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIsIEhhbmRsZUVycm9yIH0gZnJvbSAnLi9odHRwLWVycm9yLWhhbmRsZXInO1xuXG4vL2ltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9IdHRwSGVscGVyU2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQeHRIdHRwU2VydmljZSBleHRlbmRzIEh0dHAge1xuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3I6IEhhbmRsZUVycm9yO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQsXG4gICAgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSB1cmxIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSxcbiAgICBwcml2YXRlIGh0dHBFcnJvckhhbmRsZXI6IEh0dHBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoYmFja2VuZCwgb3B0aW9ucyk7XG4gICAgdGhpcy5oYW5kbGVFcnJvciA9IGh0dHBFcnJvckhhbmRsZXIuY3JlYXRlSGFuZGxlRXJyb3IoJ0N1c3RvbWVyU2VydmljZScpO1xuICB9XG5cbiAgdXJsUmVxdWVzdDogYW55O1xuICBvcmlnUmVxdWVzdDogUmVxdWVzdDtcbiAgaXNVbmF0aG91cml6ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIENvbnRyb2wgU2VydmljZXNcbiAgICovXG4gIGdldEhlYWRlcnMoKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnUHJhZ21hJywgJ25vLWNhY2hlJyk7XG5cbiAgICBoZWFkZXJzLmFwcGVuZChcIkNhY2hlLUNvbnRyb2xcIiwgXCJuby1jYWNoZVwiKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiLCBcInRydWVcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBIRUFELCBQT1NULCBQVVQsIFBBVENILCBERUxFVEUsIE9QVElPTlNcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBBY2NlcHRcIik7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBoYW5kbGVSZXNwb25zZShvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiwgdXJsPzogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgY29uc3Qgb3JpZyA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmVzdWx0ID0gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAvLyBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ2FkZEN1c3RvbWVyJywgbnVsbCkpLFxuICAgICAgXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkNhdGNoKGVycm9yKTtcbiAgICAgIH0pLFxuICAgICAgXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25SZXN1bHQocmVzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIG9uUmVzdWx0KHJlcykge1xuICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gMjAxKSB7XG4gICAgICByZXR1cm4gcmVzLl9ib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gIH1cblxuICBkb0dldChhcGk6IHN0cmluZywgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIC8vIHRoaXMucHJlTG9hZGVyU2VydmljZS51cGRhdGUodHJ1ZSk7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZ2V0KHVybCwgcmVxdWVzdE9wdGlvbnMpKTtcbiAgfVxuXG4gIGRvUG9zdChlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBlbmRwb2ludDtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBvc3QodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUHV0KGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wdXQodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUGF0aChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55LCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucGF0Y2godXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvRGVsZXRlKGFwaTogc3RyaW5nLCBwYXJhbXM6IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCB1cmxQYXJhbSA9IHVybCArICcvJyArIHBhcmFtcztcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZGVsZXRlKHVybFBhcmFtLCByZXF1ZXN0T3B0aW9ucyksIHVybFBhcmFtKTtcbiAgfVxuXG5cbiAgcmVxdWVzdCh1cmw6IHN0cmluZyB8IFJlcXVlc3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgb3B0aW9ucyA9IHRoaXMucmVxdWVzdEFyZ3Mob3B0aW9ucyk7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsUmVxdWVzdCA9IHVybC51cmw7XG4gICAgICB0aGlzLm9yaWdSZXF1ZXN0ID0gdXJsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVybFJlcXVlc3QgIT09IGVudmlyb25tZW50LkNPTkZJR19GSUxFKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLm9yaWdSZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgICBvcHRpb25zLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVybCA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmV0dXJuIHN1cGVyLnJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdEFyZ3Mob3B0aW9uczogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnNBcmdzIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIHB1YmxpYyBvbkNhdGNoKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgIGNhc2UgNDAxOlxuICAgICAgICBpZiAoIXRoaXMuaXNVbmF0aG91cml6ZWQpIHtcbiAgICAgICAgICB0aGlzLm9wZW5EaWFsb2coNDAxKTtcbiAgICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwMVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNVbmF0aG91cml6ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAwOlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMCk7XG4gICAgICAgIC8vIHRoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwNDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIHRoaXMub3BlbkRpYWxvZyg0MDQpXG4gICAgICAgIC8vdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwNFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAzOlxuICAgICAgICBjb25zb2xlLmxvZyg0MDMpO1xuICAgICAgICB0aGlzLm9wZW5EaWFsb2coNDAzKVxuICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIC8vdGhpcy5vcGVuRGlhbG9nKDUwMCk7XG4gICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz0wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cblxuXG4gIG9wZW5EaWFsb2coZXJybykge1xuICAgIHZhciBjb250ZW50RGlhbG9nID0gXCJWb2PDg8KqIHNlcsODwqEgcmVkaXJlY2lvbmFkbyBhIHRlbGEgZGUgYXV0ZW50aWNhw4PCp8ODwqNvIVwiXG5cbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgcGFuZWxDbGFzczogJ3B4dC1kaWFsb2cnLFxuICAgICAgZGF0YTogeyB0aXRsZURpYWxvZzogXCJFcnJvIC0gXCIgKyBlcnJvLCBjb250ZW50RGlhbG9nOiBjb250ZW50RGlhbG9nIH1cbiAgICB9KTtcbiAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsSGVscGVyLmdldEZyb250U2dpKCkpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnVybEhlbHBlci5nZXRGcm9udFNnaSgpICsgXCI/ZXJybz1cIiArIGVycm87XG4gICAgfSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RCYXNlU2VydmljZSB7XG5cbiAgcHVibGljIG1vZGVsOiBhbnk7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0bzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBfaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2VBdXRvLCBtb2RlbCk7XG4gIH07XG4gIGRlbGV0ZShpZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlQXV0bywgaWQpO1xuICB9O1xuXG4gIGRvR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogTWFwPGFueSwgYW55Pikge1xuICAgIGxldCB1cmxcbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zLnNpemUgPiAwKSB7XG4gICAgICB1cmwgPSBwYXRoICsgdGhpcy5idWlsZFJlcXVlc3RQYXJhbXMocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gcGF0aDtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyB1cmwpO1xuICAgIH1cbiAgfTtcblxuICBkb1Bvc3QocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QocGF0aCwgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH07XG4gIH07XG5cbiAgZG9QdXQocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dChwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9EZWxldGUocGF0aDogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHBhdGgsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgaWQpO1xuICAgIH07XG4gIH07XG5cbiAgdXBsb2FkSW1hZ2UocGF0aCwgcGFyYW1zPzogTWFwPGFueSwgYW55Pik6IGFueSB7XG5cbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPD0gLTEpIHtcbiAgICAgIHBhdGggPSB0aGlzLnVybFNlcnZpY2UgKyBwYXRoIDtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcuY29uY2F0KHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpXG4gICAgfTtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IG5ldyBIdHRwSGVhZGVycyhoZWFkZXIpO1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBjb25zdCBmb3JtZGF0YSA9IHRoaXMuc2V0UGFyYW1zRm9ybWRhdGEocGFyYW1zKTtcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QoJ1BPU1QnLCBwYXRoLCBmb3JtZGF0YSwge1xuICAgICAgaGVhZGVyczogaHR0cE9wdGlvbnMsXG4gICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHBDbGllbnQucmVxdWVzdChyZXEpO1xuICB9XG5cblxuICBzZXRQYXJhbXNGb3JtZGF0YShwYXJhbXM6IE1hcDxhbnksIGFueT4pOiBGb3JtRGF0YSB7XG4gICAgY29uc3QgZm9ybWRhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBmb3JtZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1kYXRhO1xuICB9O1xuXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtczogTWFwPGFueSwgYW55Pik6IHN0cmluZyB7XG4gICAgbGV0IGZpbmFsID0gJyc7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpZiAocHJpbWVpcmFJdGVyYWNhbykge1xuICAgICAgICBmaW5hbCArPSAnPycgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgcHJpbWVpcmFJdGVyYWNhbyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWwgKz0gJyYnICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3VwcGVyY2FzZUZpcnN0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBlcmNhc2VGaXJzdCBleHRlbmRzIFVwcGVyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHdvcmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgaWYgKHdvcmRzW2FdLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgIHZhciB3ID0gd29yZHNbYV07XHJcbiAgICAgICAgICB3b3Jkc1thXSA9IHdbMF0udG9VcHBlckNhc2UoKSArIHcuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX0ZNVCA9ICdkZC9NTS95eXl5JztcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX1RJTUVfRk1UID0gYCR7Q29uc3RhbnRzLkRBVEVfRk1UfSAtIGhoOm1tOnNzIGFgO1xyXG4gIH0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2RhdGVGb3JtYXQnXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9GTVQpO1xyXG4gICAgfVxyXG4gIH0iLCJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZGF0ZVRpbWVGb3JtYXQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIHZhciBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZShcImVuLVVTXCIpO1xyXG4gICAgcmV0dXJuICBkYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIENvbnN0YW50cy5EQVRFX1RJTUVfRk1UKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NvbnRyb2xsZXJQaXBlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0O1xyXG4gICAgICB2YXIgYXV4ID0gXCJcIjtcclxuICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB3b3Jkcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIGlmIChhID09IDApIHtcclxuICAgICAgICAgICAgYXV4ID0gd29yZHNbYV0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYXV4ID0gYXV4ICsgd29yZHNbYV0gO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYXV4O1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFVwZXJjYXNlRmlyc3QgfSBmcm9tICcuL3VwcGVyY2FzZS1maXJzdCc7XHJcbmltcG9ydCB7IERhdGVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLWZvcm1hdC5waXBlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLXRpbWUtZm9ybWF0LnBpcGUnO1xyXG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4vY29udHJvbGxlci5waXBlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUsIENvbnRyb2xsZXJQaXBlIF0sXHJcbiAgICBleHBvcnRzOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlLCBDb250cm9sbGVyUGlwZSBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaXBlTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBpdGVtczogYW55W107XG4gIEBWaWV3Q2hpbGQoJ2NoaWxkTWVudScpIHB1YmxpYyBjaGlsZE1lbnU7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSBwdWJsaWMgcHh0QXBwQ29tcG9uZW50U2VydmljZSkgeyB9XG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbG9hZENvbXBvbmVudChjaGlsZCkge1xuICAgIHRoaXMucHh0QXBwQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50KHtjb21wb25lbnQ6IGNoaWxkLm1lbnVTb3VyY2UuY29tcG9uZW50LCBkYXRhOlwiXCJ9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICAgZXhwb3J0czogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IF1cbiAgXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2hhc2hdJyxcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBIYXNoRGlyZWN0aXZlICB7XHJcbiAgICBASW5wdXQoKSBoYXNoOiBzdHJpbmc7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XHJcbiAgfSIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpc2libGVJblJvbGVzR3VhcmQgfSBmcm9tICcuLi92aXNpYmxlLWluLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhvcml0eVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBfaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHsgfVxuXG4gIGJ1c2NhckF1dGhvcml0aWVzIChjb2RpZ29TaXN0ZW1hKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5faHR0cEhlbHBlci5nZXRBcGlTZ2koKSArIFwicGVybWlzc29lcy9idXNjYXJQZXJmaWxTaXN0ZW1hLz9cIjtcbiAgICBjb25zdCBwYXJhbXMgPSBcImNvZGlnb1Npc3RlbWE9XCIgKyBjb2RpZ29TaXN0ZW1hO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRvR2V0KHVybCArIHBhcmFtcyk7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgcHh0Q29uZmlndXJhdGlvbiA9IHtzeXN0ZW1JZDogMTA0ICxzeXN0ZW1QcmV4OiBcIlNHRV9ORVdcIn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXNpYmxlSW5Sb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsIHByaXZhdGUgYXV0aG9yaXR5U2VydmljZTogQXV0aG9yaXR5U2VydmljZSkgeyB9XHJcbiAgY2FuQWN0aXZhdGUobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuIHtcclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICBpZiAodG9rZW4gIT09ICd1bmRlZmluZWQnICYmIHRva2VuICE9PSAnJyAmJiB0b2tlbiAhPT0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW4pO1xyXG4gICAgICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViKTtcclxuICAgICAgICBpZiAodG9rZW5BdXRob3JpdGllcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gJycgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hdXRob3JpdHlTZXJ2aWNlLmJ1c2NhckF1dGhvcml0aWVzKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQpLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViLCBkYXRhLmF1dGhvcml0eSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5odHRwSGVscGVyLmdldFVybEF1dGVudGljYWNhbygpICsgXCI/ZXJybz00MDFcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJUb2tlbiBVbmRlZmluZWRcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBFdmVudCwgXHJcbiAgSHR0cEludGVyY2VwdG9yLCBcclxuICBIdHRwSGFuZGxlciwgXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvcix0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKCkvL3twcm92aWRlZEluOiAncm9vdCd9XHJcblxyXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0U2VydmljZSAgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHQvLyBpbnRlcmNlcHQgcmVxdWVzdCBhbmQgYWRkIHRva2VuXHJcbiAgXHRpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOk9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHJcbiAgICBcdC8vIG1vZGlmeSByZXF1ZXN0XHJcblx0ICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcclxuXHQgICAgICBzZXRIZWFkZXJzOiB7XHJcblx0ICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01ZX1RPS0VOJyl9YFxyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0ICAgXHJcblx0ICAgXHRjb25zb2xlLmxvZyhcIi0tLS1yZXF1ZXN0LS0tLVwiKTtcclxuXHJcblx0IFx0Y29uc29sZS5sb2cocmVxdWVzdCk7XHJcblxyXG5cdCBcdGNvbnNvbGUubG9nKFwiLS0tIGVuZCBvZiByZXF1ZXN0LS0tXCIpO1xyXG4gXHJcblxyXG5cdCAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdClcclxuXHQgICAgLnBpcGUoXHJcblx0ICAgICAgICB0YXAoZXZlbnQgPT4ge1xyXG5cdCAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcclxuXHQgICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgY29uc29sZS5sb2coXCIgYWxsIGxvb2tzIGdvb2RcIik7XHJcblx0ICAgICAgICAgICAgLy8gaHR0cCByZXNwb25zZSBzdGF0dXMgY29kZVxyXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnN0YXR1cyk7XHJcblx0ICAgICAgICAgIH1cclxuXHQgICAgICAgIH0sIGVycm9yID0+IHtcclxuXHQgICBcdFx0XHQvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0tcmVzcG9uc2UtLS0tXCIpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoXCJzdGF0dXMgY29kZTpcIik7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5lcnJvcihlcnJvci5zdGF0dXMpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0gZW5kIG9mIHJlc3BvbnNlLS0tXCIpO1xyXG5cclxuXHQgICAgICAgIH0pXHJcblx0ICAgICAgKVxyXG5cclxuICAgIH07XHJcbiAgXHJcbiBcclxufSIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdHJNb2R1bGUgfSBmcm9tICduZ3gtdG9hc3RyJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWVycm9yLWhhbmRsZXInO1xuaW1wb3J0IHsgSW50ZXJjZXB0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1pbnRlcmNlcHRvci9pbnRlcmNlcHQtc2VydmljZSAnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSxcbiAgICBUb2FzdHJNb2R1bGUuZm9yUm9vdCh7cHJvZ3Jlc3NCYXI6IHRydWV9KSAgICBcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwQ29tcG9uZW50LCBQeHRDb250ZW50Qm9keSwgSGFzaERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQeHRBcHBDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtQeHRBcHBDb21wb25lbnRTZXJ2aWNlLCBcbiAgICBQeHRIdHRwU2VydmljZSwgXG4gICAgUmVxdWVzdEJhc2VTZXJ2aWNlLCBcbiAgICBIdHRwSGVscGVyU2VydmljZSwgXG4gICAgQ29uZmlnU2VydmljZSwgIFxuICAgIEh0dHBFcnJvckhhbmRsZXIsICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFxuICAgIFRva2VuU2VydmljZSxcbiAgICBBdXRob3JpdHlTZXJ2aWNlLFxuICBJbnRlcmNlcHRTZXJ2aWNlICwge1xuICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgIHVzZUNsYXNzOiBJbnRlcmNlcHRTZXJ2aWNlLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRJbnB1dEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0Q2hlY2tib3hGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RGF0ZUZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHR5cGU/OiBzdHJpbmc7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmlsdGVyRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgY2xhc3NOYW1lPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dFJhZGlvQnV0dG9uRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRTZWxlY3RGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgcGFyYW1ldGVyPzogYW55OyBcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRmaWx0ZXJDdXN0b21GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jb250ZW50LWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY29udGVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZENvbXBvbmVudCB7XG4gIC8vUHJvcGVydGllcyBcbiAgQElucHV0KCkgZGF0YTogYW55O1xuICBASW5wdXQoKSBhdXRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmllbGRzOiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIEBJbnB1dCgpIGNvbHM6IG51bWJlciA9IDU7XG4gIEBJbnB1dCgpIGZpZWxkOiBhbnk7XG4gIGNvbHNJbml0aWFsID0gNTtcbiAgQE91dHB1dCgpIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IocHVibGljIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy5maWVsZFtrZXldLmNvbnN0cnVjdG9yLm5hbWUpIHtcblxuICAgICAgICAvL0ZpbHRlckN1c3RvbVxuICAgICAgICBjYXNlIHB4dGZpbHRlckN1c3RvbUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlckN1c3RvbSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9JbnB1dFxuICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VJbnB1dCA9IDxweHRJbnB1dEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9DaGVja2JveFxuICAgICAgICBjYXNlIHB4dENoZWNrYm94RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9EYXRlXG4gICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0ZpbHRlclxuICAgICAgICBjYXNlIHB4dEZpbHRlckZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgY2FzZSBweHRSYWRpb0J1dHRvbkZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBcbiAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgY2FzZSBweHRTZWxlY3RGaWVsZC5uYW1lOlxuICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlU2VsZWN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB0aGlzLmNvbHNJbml0aWFsID0gdGhpcy5jb2xzO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBwdWJsaWMgb25TdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XG5cbiAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZUFsbEZvcm1GaWVsZHModGhpcy5mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIHB1YmxpYyBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG4gIHNjcmVlbldpZHRoO1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLnNjcmVlbldpZHRoIDw9IDgwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NyZWVuV2lkdGggPD0gMTEwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xzID0gdGhpcy5jb2xzSW5pdGlhbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWlucHV0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4gICIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kYXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtcmFkaW9idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHRTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWxlY2lvbmUnO1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBwYXJhbXM6IGFueTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5wYXJhbXMgIT0gdW5kZWZpbmVkICYmICFjaGFuZ2VzLnBhcmFtcy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSBjaGFuZ2VzLnBhcmFtcy5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmZpbmQoKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sbGVyID0gXCJcIjtcbiAgYXV0byA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBvcHRpb246IGFueTtcblxuICBvcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIGdldCBzZWxlY3RlZE9wdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb247XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkT3B0aW9uKGY6IGFueSkge1xuICAgIGlmIChmICE9IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGYgIT09IHRoaXMub3B0aW9uKSB7XG4gICAgICAgIHRoaXMub3B0aW9uID0gZjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGYuY29kaWdvKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLm9wdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5vcHRpb24gPSB2YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHB4dGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB0aGlzLmZpZWxkID0gdGhpcy5tb2RlbDtcbiAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZC5jbGFzc05hbWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLmZpZWxkLmNsYXNzTmFtZS5uYW1lO1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgZmluZCgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5weHRodHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgdGhpcy5wYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvKSB7XG4gICAgICAgICAgdGhpcy5maWVsZC5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5maW5kKCk7XG4gIH07XG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFNvcnQsIE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbmltcG9ydCB7IHB4dElucHV0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWlucHV0LWZpZWxkJztcbmltcG9ydCB7IHB4dENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkJztcbmltcG9ydCB7IHB4dERhdGVGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZGF0ZS1maWVsZCc7XG5pbXBvcnQgeyBweHRGaWx0ZXJGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkJztcbmltcG9ydCB7IHB4dFNlbGVjdEZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1zZWxlY3QtZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQnO1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJ3NlbGVuaXVtLXdlYmRyaXZlci9odHRwJztcblxuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGlhbG9nLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGNvbHMgPSAyO1xuICBmaWVsZHM6IFB4dEZpZWxkQ29uZmlnW10gPSBbXTtcbiAgZmllbGRzSGlzdDogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBhdXRvOiBib29sZWFuO1xuICBmaWx0ZXIgPSB7IGNvZGU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHVuZGVmaW5lZCB9O1xuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgaHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gZGF0YS5jb250cm9sbGVyO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXV0byA9IHRoaXMuZGF0YS5hdXRvO1xuICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgIHRoaXMuZmllbGQgPSB0aGlzLmRhdGEuZmlsdGVycztcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmZpZWxkW2tleV0uY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgICAgIGNhc2UgcHh0ZmlsdGVyQ3VzdG9tRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlckN1c3RvbSA9IDxweHRmaWx0ZXJDdXN0b21GaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vSW5wdXRcbiAgICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUlucHV0ID0gPHB4dElucHV0RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VJbnB1dC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9DaGVja2JveFxuICAgICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0RhdGVcbiAgICAgICAgICBjYXNlIHB4dERhdGVGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0ZpbHRlclxuICAgICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgICBjYXNlIHB4dFNlbGVjdEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlU2VsZWN0LnR5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5maWVsZHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZpZWxkc0hpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmRpc3BsYXllZENvbHVtbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGF0YS5kaXNwbGF5ZWRDb2x1bW5zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH1cbiAgY29uZmlybWF0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICAvL1NlYXJjaC5cbiAgc2VhcmNoKCkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgTWFwPGFueSwgYW55PigpO1xuICAgIGRlYnVnZ2VyO1xuICAgIGlmICh0aGlzLmRhdGEuYXV0byAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLmF1dG8pIHtcbiAgICAgIGlmICh0aGlzLmZvcm0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0udmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5mb3JtLnZhbHVlW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdGhpcy5mb3JtLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLmNvbnRyb2xsZXIsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmZpbHRlci5jb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpbHRlci5jb2RlICE9IDAgJiYgdGhpcy5maWx0ZXIuY29kZSAhPSBcIlwiKSB7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJjb2RpZ29cIiwgdGhpcy5maWx0ZXIuY29kZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5maWx0ZXIuZGVzY3JpcHRpb24gIT0gdW5kZWZpbmVkICYmIHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uICE9IFwiXCIpIHtcbiAgICAgICAgcGFyYW1zLnNldChcImRlc2NyaWNhb1wiLCB0aGlzLmZpbHRlci5kZXNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3RSb3cocm93KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uocm93KTtcbiAgfTtcbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfTtcblxuICBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG4vKlxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbiovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIC8vcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXNEaXNhYmxlZCA9IHRydWU7XG4gIGF1dG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzTmFtZSA6U3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6IFN0cmluZyA9IFwiIFwiO1xuICBASW5wdXQoKSBkaXNwbGF5ZWRDb2x1bW5zIDogYW55W107XG4gIEBPdXRwdXQoKSBvblZhbHVlQ2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSB2YWx1ZSA6U3RyaW5nID0gXCIgXCI7XG4gICBcbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIC8vcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcbiBcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY2xhc3NOYW1lICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5jbGFzc05hbWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2hhbmdlcy5jbGFzc05hbWUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wbGFjZWhvbGRlciAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMucGxhY2Vob2xkZXIuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjaGFuZ2VzLnBsYWNlaG9sZGVyLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy52YWx1ZSAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMudmFsdWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucyAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy9NZXRob2QgcmVzcG9zaWJsZSBmb3Igb3BlbiBkaWFsb2cgZmlsdGVyXG4gIG9wZW5GaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmllbGQgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmllbGQuZmlsdGVycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXV0byA9IHRydWU7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YTogeyBhdXRvOiB0aGlzLmF1dG8sIGZpbHRlcnM6IHRoaXMuZmllbGQuZmlsdGVycywgY29udHJvbGxlcjogdGhpcy5maWVsZC5jbGFzc05hbWUsIHRpdGxlRGlhbG9nOiBcIlNlbGVjaW9uZTogKCBcIiArIHRoaXMuZmllbGQuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuZmllbGQudmFsdWUgPSByZXN1bHQuY29kaWdvO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9ZWxzZSB7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YToge2NvbnRyb2xsZXI6IHRoaXMuY2xhc3NOYW1lLCBkaXNwbGF5ZWRDb2x1bW5zOnRoaXMuZGlzcGxheWVkQ29sdW1ucywgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgIHRoaXMuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHRbdGhpcy5kaXNwbGF5ZWRDb2x1bW5zWzFdXTtcbiAgICAgICAgICB0aGlzLm9uVmFsdWVDYWxsYmFjay5lbWl0KHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHh0RGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRDaGVja2JveENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGNvbXBvbmVudE1hcHBlciA9IHtcclxuICBpbnB1dDogUHh0SW5wdXRDb21wb25lbnQsXHJcbiAgYnV0dG9uOiBQeHRCdXR0b25Db21wb25lbnQsXHJcbiAgZGF0ZTogUHh0RGF0ZUNvbXBvbmVudCxcclxuICBzZWxlY3Q6IFB4dFNlbGVjdENvbXBvbmVudCxcclxuICByYWRpb2J1dHRvbjogUHh0UmFkaW9idXR0b25Db21wb25lbnQsXHJcbiAgY2hlY2tib3g6IFB4dENoZWNrYm94Q29tcG9uZW50LFxyXG4gIGZpbHRlcjogUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQsXHJcbn07XHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBcIltkeW5hbWljRmllbGRdXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkQ29uZmlnO1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBGb3JtR3JvdXA7XHJcbiAgY29tcG9uZW50UmVmOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkgeyB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dElucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0SW5wdXRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOltQeHRCdXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEJ1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0RGF0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOltQeHRTZWxlY3RDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRDaGVja2JveENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY29tcG9uZW50TWFwcGVyID0ge1xyXG4gIGlucHV0OiBQeHRJbnB1dENvbXBvbmVudCxcclxuICBidXR0b246IFB4dEJ1dHRvbkNvbXBvbmVudCxcclxuICBkYXRlOiBQeHREYXRlQ29tcG9uZW50LFxyXG4gIHNlbGVjdDogUHh0U2VsZWN0Q29tcG9uZW50LFxyXG4gIHJhZGlvYnV0dG9uOiBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCxcclxuICBjaGVja2JveDogUHh0Q2hlY2tib3hDb21wb25lbnQsXHJcbiAgZmlsdGVyOiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCxcclxufTtcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW2R5bmFtaWNGaWVsZERpYWxvZ11cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmaWVsZDogRmllbGRDb25maWc7XHJcbiAgQElucHV0KCkgZ3JvdXA6IEZvcm1Hcm91cDtcclxuICBjb21wb25lbnRSZWY6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb21wb25lbnRNYXBwZXJbdGhpcy5maWVsZC50eXBlXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGQgPSB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZ10sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZyc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUHh0RGlhbG9nRmlsdGVyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0RmlsdGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgdGVtcGxhdGVKaXRVcmwgfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQeHRJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlJztcbmltcG9ydCB7IFB4dEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0RGF0ZU1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlck1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBNb2R1bGUsXG4gICAgUHh0SW5wdXRNb2R1bGUsXG4gICAgUHh0QnV0dG9uTW9kdWxlLFxuICAgIFB4dERhdGVNb2R1bGUsXG4gICAgUHh0U2VsZWN0TW9kdWxlLFxuICAgIFB4dFJhZGlvYnV0dG9uTW9kdWxlLFxuICAgIFB4dENoZWNrYm94TW9kdWxlLFxuICAgIFB4dElucHV0RmlsdGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENvbnRlbnRDb21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gICBleHBvcnRzOiBbUHh0Q29udGVudENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRDb250ZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50TW9kdWxlIHsgfVxuIiwiXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbiB7XHJcbiAgICBpY29uOiBTdHJpbmc7XHJcbiAgICBtZW51OiBTdHJpbmc7XHJcbiAgICBlbmFibGU6IEJvb2xlYW47XHJcbiAgICBlbnVtIDogTnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoaWNvbjogU3RyaW5nLCBtZW51OiBTdHJpbmcsIGVuYWJsZTogQm9vbGVhbiwgaWQgOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICAgICAgdGhpcy5lbnVtID0gaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIE9wdGlvbnNTdWJtZW51IHtcclxuICAgIFNBTFZBUiA9IDEsXHJcbiAgICBQRVNRVUlTQVIgPSAyLFxyXG4gICAgTElNUEFSID0gMyxcclxuICAgIE5PVk8gPSA0LFxyXG4gICAgVk9MVEFSPSA1LFxyXG4gICAgRVhDTFVJUj0gNlxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4uLy4uL3BpcGVzL3VwcGVyY2FzZS1maXJzdCc7XG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL2NvbnRyb2xsZXIucGlwZSc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzU2F2ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNEZWxldGU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjb250cm9sbGVyPzogU3RyaW5nO1xuXG4gIHNhdmUoKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbk1vZGVsKCkpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnNhdmUodGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzU2F2ZS5lbWl0KHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBkZWxldGUoaWQpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5kZWxldGUoaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNEZWxldGUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBjbGVhcigpIHtcbiAgICB0aGlzLm1vZGVsID0ge30gYXMgVDtcbiAgfTtcbiAgYWRkKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYWRkKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGNvbHMgPSAzO1xuICBjb2xzcGFuID0gMTtcbiAgYnV0dG9uczogUHh0QnV0dG9uW10gPSBbXTtcbiAgZW5hYmxlU2F2ZSA9IHRydWU7XG4gIGVuYWJsZUJhY2sgPSB0cnVlO1xuICBlbmFibGVDbGVhciA9IHRydWU7XG4gIGVuYWJsZVNlYXJjaCA9IHRydWU7XG4gIGVuYWJsZUFkZCA9IHRydWU7XG4gIGVuYWJsZURlbGV0ZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9weHRBcHBTZXJ2aWNlOiBQeHRBcHBDb21wb25lbnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uU2VydmljZTogVG9hc3RyU2VydmljZSkge1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJrZXlib2FyZF9iYWNrc3BhY2VcIiwgXCJWT0xUQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuVk9MVEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIlNBTFZBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5TQUxWQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiTk9WT1wiLCB0cnVlLCBPcHRpb25zU3VibWVudS5OT1ZPKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkxJTVBBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5MSU1QQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwic2VhcmNoXCIsIFwiUEVTUVVJU0FSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlBFU1FVSVNBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJFWENMVUlSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkVYQ0xVSVIpKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGVidWdnZXI7XG4gICAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCkgKyBuZXcgQ29udHJvbGxlclBpcGUoKS50cmFuc2Zvcm0odGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnVybFNlcnZpY2VBdXRvID0gdGhpcy51cmxTZXJ2aWNlO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICB2YWxpZGF0aW9uTW9kZWwoKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxba2V5XSAhPSB1bmRlZmluZWQgJiYgdGhpcy5tb2RlbFtrZXldICE9IFwiXCIpIHtcbiAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXCJDYW1wbyBPYnJpZ2F0w4PCs3Jpb1wiLCBrZXkudG9TdHJpbmcoKS50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmcoXCJOZW5odW0gY2FtcG8gcHJlZW5jaGlkby5cIiwgXCJBdmlzbyFcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFB4dFN1Ym1lbnVzQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtc3VibWVudXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgVG9hc3RyTW9kdWxlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOltQeHRIdHRwU2VydmljZSwgUmVxdWVzdEJhc2VTZXJ2aWNlLCBIdHRwSGVscGVyU2VydmljZSwgQ29uZmlnU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNNb2R1bGUgeyB9XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHREYXRlcGlja2VyQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3B4dC1kYXRlcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBTdHJpbmcgPSBcIkVzY29saGEgdW1hIGRhdGFcIjtcclxuICBASW5wdXQoKSBtaW5EYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgaW5wdXREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBkYXRlTW9kZWw6IERhdGU7XHJcblxyXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xyXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcblxyXG4gIGdldCBkYXRhU2VsZWNpb25hZGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlTW9kZWw7XHJcbiAgfVxyXG5cclxuICBzZXQgZGF0YVNlbGVjaW9uYWRhKGQ6IERhdGUpIHtcclxuICAgIGlmIChkICE9PSB0aGlzLmRhdGVNb2RlbCkge1xyXG4gICAgICB0aGlzLmRhdGVNb2RlbCA9IGQ7XHJcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlTW9kZWwgPSB2YWx1ZTtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgb25EYXRlQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUodW5kZWZpbmVkKTtcclxuICAgIHRoaXMub25EYXRlQ2hhbmdlKCk7XHJcbiAgfVxyXG4gIFxyXG59IiwiXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQeHREYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW0RhdGVQaXBlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUHh0RGF0ZXBpY2tlckNvbXBvbmVudF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlUGlja2VyTW9kdWxlIHtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREaWFsb2dDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dERpYWxvZ0NvbXBvbmVudF1cblxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1weHQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZmlsdGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBkYXRhIDogYW55O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBkYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RmlsdGVyQ29tcG9uZW50XVxuIFxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFBhZ2luYXRvciwgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGlhbG9nLWZpbHRlci1jdXN0b20nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmaWx0ZXJzOiBhbnk7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG4gIFxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgcHVibGljIGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgLy9TZWFyY2guXG4gIHNlYXJjaCgpIHtcbiAgICBsZXQgcGFyYW1zID0gbmV3IE1hcDxhbnksIGFueT4oKTtcbiAgICBpZiAodGhpcy5maWx0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJzW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGFyYW1zLnNldChrZXksIHRoaXMuZmlsdGVyc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWUsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vUm93IFNlbGVjdGVkXG4gIHNlbGVjdFJvdyhyb3cpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShyb3cpO1xuICB9O1xuXG4gIC8vQ2xvc2VcbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodW5kZWZpbmVkKTtcbiAgfTtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdENoaXBJbnB1dEV2ZW50LCBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0NPTU1BLCBFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWZpbHRlci1tYXQtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZmlsdGVyLW1hdC10YWJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEZpbHRlck1hdFRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+KCk7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDogU3RyaW5nIDtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHZpc2libGUgPSB0cnVlO1xuICBzZWxlY3RhYmxlID0gdHJ1ZTtcbiAgcmVtb3ZhYmxlID0gdHJ1ZTtcbiAgYWRkT25CbHVyID0gdHJ1ZTtcbiAgcmVhZG9ubHkgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuICBmaWx0ZXJzOiBhbnlbXSA9IFtdO1xuXG4gIGFkZChldmVudDogTWF0Q2hpcElucHV0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LmlucHV0O1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudmFsdWU7XG5cbiAgICAvLyBBZGQgb3VyIGZydWl0XG4gICAgaWYgKCh2YWx1ZSB8fCAnJykudHJpbSgpKSB7XG4gICAgICB0aGlzLmZpbHRlcnMgPSBbXTtcbiAgICAgIHRoaXMuZmlsdGVycy5wdXNoKHtuYW1lOiB2YWx1ZS50cmltKCl9KTtcbiAgICAgIHRoaXMuYXBwbHlGaWx0ZXIodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IHRoZSBpbnB1dCB2YWx1ZVxuICAgIGlmIChpbnB1dCkge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9IFxuICB9XG5cbiAgYXBwbHlGaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcbiAgICBmaWx0ZXIgPSBmaWx0ZXIudHJpbSgpO1xuICAgIGZpbHRlciA9IGZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBmaWx0ZXI7XG4gIH1cblxuICByZW1vdmUoZnJ1aXQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWx0ZXJzLmluZGV4T2YoZnJ1aXQpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseUZpbHRlcignJyk7XG4gIH1cblxuXG4gIGNvbmZpZ3VyZUZpbHRlclByZWRpY2F0ZSgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyUHJlZGljYXRlID0gKHJvdywgZXZlbnQpID0+XG4gICAgICAoIHJvdy5jb2RpZ28udG9TdHJpbmcoKS5pbmRleE9mKGV2ZW50KSA+PSAwIHx8XG4gICAgICByb3cubm9tZUltYWdlbS50b1N0cmluZygpLmluZGV4T2YoZXZlbnQpID49IDApO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50cyA6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyTWF0VGFibGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBweHRFbnVtVGFnSHRtbCB9IGZyb20gXCIuLi9lbnVtL3B4dC1lbnVtLXRhZy1odG1sXCI7XHJcbmltcG9ydCB7IHB4dEVudW1UeXBlVGFnIH0gZnJvbSBcIi4uL2VudW0vcHh0LWVudW0tdHlwZS10YWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmllbGRzIHtcclxuICAgIHR5cGU6IHB4dEVudW1UeXBlVGFnO1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIHRhZzogcHh0RW51bVRhZ0h0bWw7XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gcHh0RW51bVRhZ0h0bWwge1xyXG4gICAgSW5wdXQgPSAxLFxyXG4gICAgQ29tYm8gPSAyLFxyXG4gICAgRmlsdGVyID0gMyxcclxuICAgIENoZWNrYm94ID0gNFxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtdXBsb2FkLWZpbGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRVcGxvYWRGaWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6c3RyaW5nO1xuICBAT3V0cHV0KCkgZmlsZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBhcnJheUltYWdlcyA6RmlsZVJlYWRlcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBvbkNoYW5nZUltYWdlbShldmVudCkge1xuICAgIGlmIChldmVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBpbWFnZW06IEZpbGUgPSBldmVudDtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXI9IGltYWdlbS5uYW1lO1xuICAgIHJldHVybiB0aGlzLmZpbGVTZWxlY3RlZC5uZXh0KGltYWdlbSk7XG4gICAgfVxuXG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFVwbG9hZEZpbGVDb21wb25lbnQgfSBmcm9tICcuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBleHBvcnRzOltQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzIDogW1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0VXBsb2FkRmlsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU9wdGlvbnMsIE5neEdhbGxlcnlJbWFnZSwgTmd4R2FsbGVyeUFuaW1hdGlvbiB9IGZyb20gJ25neC1nYWxsZXJ5JztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWdhbGxlcnknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0R2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZ2FsbGVyeU9wdGlvbnM6IE5neEdhbGxlcnlPcHRpb25zW107XG4gIEBJbnB1dCgpIGdhbGxlcnlJbWFnZXM6IE5neEdhbGxlcnlJbWFnZVtdO1xuICBASW5wdXQoKSB3aWR0aDogYW55ID0gXCIxMDAlXCI7XG4gIEBJbnB1dCgpIGhlaWdodDogYW55ID0gJzQwMHB4JztcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmdhbGxlcnlPcHRpb25zID0gW1xuICAgICAge1xuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgdGh1bWJuYWlsc0NvbHVtbnM6IDQsXG4gICAgICAgIGltYWdlQW5pbWF0aW9uOiBOZ3hHYWxsZXJ5QW5pbWF0aW9uLlNsaWRlXG4gICAgICB9LFxuICAgICAgLy8gbWF4LXdpZHRoIDgwMFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA4MDAsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICBpbWFnZVBlcmNlbnQ6IDgwLFxuICAgICAgICB0aHVtYm5haWxzUGVyY2VudDogMjAsXG4gICAgICAgIHRodW1ibmFpbHNNYXJnaW46IDIwLFxuICAgICAgICB0aHVtYm5haWxNYXJnaW46IDIwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA0MDAsXG4gICAgICAgIHByZXZpZXc6IGZhbHNlXG4gICAgICB9XG4gICAgXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOZ3hHYWxsZXJ5TW9kdWxlIH0gZnJvbSAnbmd4LWdhbGxlcnknO1xuaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLCBOZ3hHYWxsZXJ5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0R2FsbGVyeUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0R2FsbGVyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0R2FsbGVyeU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsImNvbXBvbmVudE1hcHBlciIsIm5vb3AiLCJDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU1FLHdCQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtLQUFLOztnQkFKM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7O2dCQUptQixnQkFBZ0I7O3lCQUFwQzs7Ozs7OztBQ0FBOzs2QkFLMEMsSUFBSSxPQUFPLEVBQU87dUNBQ0csSUFBSSxDQUFDLGFBQWEs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