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
            // this.filters = [];
            this.filters.push({ name: value.trim() });
            //this.applyFilter(value);
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        //this.applyFilterx ();
        this.applyFilterArray();
    };
    /**
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.applyFilterArray = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filters.length > 0) {
            this.filters.forEach(function (filter) {
                filter = filter.name.trim();
                filter = filter.toLowerCase();
                _this.dataSource.filter = filter;
            });
        }
        else {
            this.applyFilter("");
        }
    };
    /**
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.applyFilterx = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tableFilters = [];
        this.filters.forEach(function (filter) {
            tableFilters.push({
                id: "nomeImagem",
                value: filter.name
            });
        });
        this.dataSource.filter = JSON.stringify(tableFilters);
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
     * @param {?} filter
     * @return {?}
     */
    PxtFilterMatTableComponent.prototype.remove = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        /** @type {?} */
        var index = this.filters.indexOf(filter);
        if (index >= 0) {
            this.filters.splice(index, 1);
        }
        this.applyFilterArray();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC90b2tlbi5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2Vycm9yLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtZXJyb3ItaGFuZGxlci50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3VwcGVyY2FzZS1maXJzdC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvdXRpbC9jb25zdGFudHMudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtdGltZS1mb3JtYXQucGlwZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvY29udHJvbGxlci5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZGVscy9weHRDb25maWd1cmF0aW9uLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC92aXNpYmxlLWluLXJvbGVzLmd1YXJkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaW50ZXJjZXB0b3IvaW50ZXJjZXB0LXNlcnZpY2UgLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZGF0ZS1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1maWx0ZXItZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXIvcHh0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci9weHQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci1tYXQtdGFibGUvcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXItbWF0LXRhYmxlL3B4dC1maWx0ZXItbWF0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWVsZHMtbW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2VudW0vcHh0LWVudW0tdGFnLWh0bWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3VibWVudXNJdGVuczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnN1Ym1lbnVzSXRlbnMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRDb21wb25lbnRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9sb2FkQ29tcG9uZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldFVzZXJMb2dnZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VyTG9nZ2VkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0VXNlckxvZ2dlZC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRJbmZvSW5pdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9Jbml0aWFsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRJbmZvSW5pdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZXRTdWJtZW51cyhyb3V0ZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VibWVudXNJdGVucy5uZXh0KHJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbEluZm8oaW5mb0luaXRpYWwpIHtcclxuICAgICAgICB0aGlzLl9zZXRJbmZvSW5pdC5uZXh0KGluZm9Jbml0aWFsKVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50Lm5leHQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NldFVzZXJMb2dnZWQubmV4dCh1c2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHh0QXBwIH0gZnJvbSAnLi9weHQtYXBwJztcbmltcG9ydCB7IFB4dEFwcE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9weHQtYXBwLm1vZGVsJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdE1lbnUsIE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFNhZmVIdG1sLCBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC5jb21wb25lbnQuc2NzcyddXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50IHtcblxuICAvL1Byb3BlcnRpZXNcbiAgcm91dGVzOiBhbnlbXSA9IFtdO1xuICBncm91cHM6IGFueVtdID0gW107XG4gIG1lbnVzOiBhbnlbXSA9IFtdO1xuICBzeXN0ZW06IFN0cmluZyA9IFwiU1lTVEVNIE5BTUVcIlxuICB1cmxJbWc6IHN0cmluZyA9ICdodHRwOi8vaW1hZ2Vuc2Rzdi5wZWl4b3RvLmNvbS5ici9hdXRoL21pbmlfbG9nby5wbmcnO1xuICBtZW51U2VsZWN0ZWQgPSBcIlwiO1xuICB1c3VlckxvZ2dlZCA9IFwiTG9vZ2dlZCB1c2VyXCI7XG4gIG1lbnVzSHRtbDogU2FmZUh0bWw7XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgX21vYmlsZVF1ZXJ5TGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF0TWVudTogTWF0TWVudTtcbiAgQFZpZXdDaGlsZCgnbWVudXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgc3ViQ29udGFpbmVyMTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnVUcmlnZ2VyJywgeyByZWFkOiBNYXRNZW51VHJpZ2dlciB9KSBjb250ZXh0TWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuICBtZW51c1JlY2VpdmVkIDogYW55W107XG4gIFxuICAvL0NvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBtZWRpYTogTWVkaWFNYXRjaGVyLFxuICAgIHB1YmxpYyBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMubW9iaWxlUXVlcnkgPSBtZWRpYS5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA2MDBweCknKTtcbiAgICB0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyID0gKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubW9iaWxlUXVlcnkuYWRkTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgdGhpcy5yZXN1bHQgPSBweHRBcHBDb21wb25lbnRTZXJ2aWNlLmluZm9Jbml0aWFsLnN1YnNjcmliZShpbmZvSW5pdGlhbCA9PiB7XG4gICAgICBpZiAoaW5mb0luaXRpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudXN1ZXJMb2dnZWQgPSBpbmZvSW5pdGlhbC51c2VyTG9nZ2VkO1xuICAgICAgICB0aGlzLnN5c3RlbSA9IGluZm9Jbml0aWFsLnN5c3RlbTtcbiAgICAgICAgdGhpcy5tZW51c1JlY2VpdmVkID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLm1lbnVzID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLnByZXBhcmVNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpYmVDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubW9iaWxlUXVlcnkucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIC8vIEluY2x1ZGUgb2YgY29tcG9uZW50cyBpbiB0aGUgYXBwbGljYXRpb24gYm9keVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnksIGFkSG9zdCkge1xuICAgIHRoaXMubWVudVNlbGVjdGVkID0gcm91dGUubWVudVRleHQ7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlLm1lbnVTb3VyY2U7XG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShhZEl0ZW0uY29tcG9uZW50KTtcbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IGFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZpY2UgcmVzcG9uc2libGUgZm9yIGluY2x1ZGluZyBjb21wb25lbnRzIGluIHRoZSBib2R5IG9mIHRoZSBhcHBsaWNhdGlvblxuICBzdWJzY3JpYmVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnRPYnNlcnZhYmxlLnN1YnNjcmliZShjb21wb25lbnRPYmogPT4ge1xuICAgICAgdmFyIGFycmF5QXV4ID0gdGhpcy5tZW51c1JlY2VpdmVkLmZpbHRlcih4PT54Lm1lbnVTb3VyY2UgIT0gdW5kZWZpbmVkICYmIHgubWVudVNvdXJjZS5jb21wb25lbnQgPT09IGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgaWYoYXJyYXlBdXgubGVuZ3RoID09IDEpe1xuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IGFycmF5QXV4WzBdLm1lbnVUZXh0O1xuICAgICAgfVxuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRPYmouY29tcG9uZW50KTtcbiAgICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5hZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICg8QWRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhID0gY29tcG9uZW50T2JqLmRhdGE7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXNwb25zaWJsZSBmb3IgY2FsbCBtZXRob2QgXCJsb2FkY29tcG9uZW50cygpXCIgaW5mb3JtaW5nIHBhcmFtZXRlcnNcbiAgc2VsZWN0SXRlbU1lbnUobmF2KSB7XG4gICAgdGhpcy5sb2FkQ29tcG9uZW50KG5hdiwgdGhpcy5hZEhvc3QpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBwcmVwYXJpbmcgYXBwbGljYXRpb24gbWVudXM7XG4gIHByZXBhcmVNZW51KCkge1xuICAgIGxldCBhcnJheUF1eDogYW55W107XG4gICAgYXJyYXlBdXggPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJncm91cFwiICYmIHgubWVudVBhcmVudCA9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhHcm91cCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhJdGVtID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiaXRlbVwiICYmIHgubWVudVBhcmVudCAhPT0gXCJcIik7XG5cbiAgICAvL2FkZCBpdGVucyBpbiBncm91cHNcbiAgICBhcnJheUF1eEl0ZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4R3JvdXAuZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSlcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy9hZGQgZ3JvdXBzIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4R3JvdXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4LmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLm1lbnVzID0gYXJyYXlBdXg7XG4gIH1cbn1cbiIsImltcG9ydCAnLi8uLi8uLi8uLi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7Q2RrVGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0Nka1RyZWVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICBNYXRCYWRnZU1vZHVsZSxcbiAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSxcbiAgTWF0Q2hpcHNNb2R1bGUsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gIE1hdERpYWxvZ01vZHVsZSxcbiAgTWF0RGl2aWRlck1vZHVsZSxcbiAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdExpc3RNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0UmFkaW9Nb2R1bGUsXG4gIE1hdFJpcHBsZU1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTaWRlbmF2TW9kdWxlLFxuICBNYXRTbGlkZXJNb2R1bGUsXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0U3RlcHBlck1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRhYnNNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdFRvb2x0aXBNb2R1bGUsXG4gIE1hdFRyZWVNb2R1bGUsXG4gIE1hdExpbmVNb2R1bGUsXG4gIE1hdENvbW1vbk1vZHVsZSxcbiAgTWF0T3B0aW9uTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICBcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7cGxhdGZvcm1Ccm93c2VyRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsTWF0Q2FyZE1vZHVsZSxNYXRJY29uTW9kdWxlLE1hdExpbmVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxNYXRTb3J0TW9kdWxlLE1hdFRhYnNNb2R1bGUsTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxNYXRDaGlwc01vZHVsZSxNYXRJbnB1dE1vZHVsZSxNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxNYXRCdXR0b25Nb2R1bGUsTWF0Q29tbW9uTW9kdWxlLE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsTWF0UmlwcGxlTW9kdWxlLE1hdFNlbGVjdE1vZHVsZSxNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxNYXRTaWRlbmF2TW9kdWxlLE1hdFN0ZXBwZXJNb2R1bGUsTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLE1hdFRvb2x0aXBNb2R1bGUsTWF0Q2hlY2tib3hNb2R1bGUsTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsTWF0RXhwYW5zaW9uTW9kdWxlLE1hdEZvcm1GaWVsZE1vZHVsZSxNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxNYXROYXRpdmVEYXRlTW9kdWxlLE1hdEJvdHRvbVNoZWV0TW9kdWxlLE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxNYXRCdXR0b25Ub2dnbGVNb2R1bGUsTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBjb25maWc6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgbG9hZCh1cmw6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5qZWN0SHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGluamVjdEh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgICBtYXAocmVzID0+IHJlcylcclxuICAgICAgKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWd1cmF0aW9uKGVsZW1lbnQ6IHN0cmluZywgZGF0YUxpc3Q/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZGF0YUxpc3QpIHtcclxuICAgICAgY29uc3QgdXJsV2l0aEVsZW1lbnQgPSB0aGlzLmNvbmZpZ1tlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhEYXRhTGlzdCA9IHRoaXMuY29uZmlnW2RhdGFMaXN0XVtlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhEYXRhTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2ZXJpZnlVcmwodHlwZU1vZGVsOiBhbnkpIHtcclxuICAgIGlmICh0eXBlTW9kZWwuaW5jbHVkZXMoJy8nLCB0eXBlTW9kZWwubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgY29uc3QgdHlwZVJlbGVhc2UgPSB0eXBlTW9kZWw7XHJcbiAgICAgIHJldHVybiB0eXBlUmVsZWFzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlTW9kZWwgKyAnLyc7XHJcbiAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEZyb250U2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdGUk9OVCcsICdTR0knKTtcclxuICB9O1xyXG5cclxuXHJcbiAgcHVibGljIGdldEFwaVVybCAobmFtZSwgdXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24odXJsLCBuYW1lKTtcclxuICB9XHJcbn0iLCJcbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudCA9IHtcbiAgcHJvZHVjdGlvbjogdHJ1ZSxcbiAgZW52TmFtZTogJ2RldicsXG4gIHZlcnNpb246ICcwLjAuMScsXG4gIENPTkZJR19GSUxFOiAnYXNzZXRzL2NvbmZpZy9lbnYuanNvbicsXG4gIGVzYkFwaVB4dCA6IFwiaHR0cDovL2VzYmRzdi5wZWl4b3RvLmNvbS5ici9zZ2UvXCIsICBcbiAgc3lzdGVtOiB7XG4gICAgaWQ6IDEwOCxcbiAgICBwcmV4OiBcIlBPUkNSUFwiXG4gIH1cbn07XG5cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cCwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcblxudmFyIHN5c3RlbSA9IGVudmlyb25tZW50LnN5c3RlbTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfVxuICBzZXRUb2tlblN0b3JhZ2UocmVzOiBhbnkpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgfVxuICByZW1vdmVUb2tlblN0b3JhZ2UoKSB7XG4gICAgdmFyIHRva2VuID0gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXG4gICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+IGp3dF9kZWNvZGUodG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN5c3RlbS5pZCtzeXN0ZW0ucHJleCtkZWNvZGVkLnN1Yik7XG4gIH1cbiAgXG4gIGRlbGV0ZVRva2VuKCkge1xuICAgIHRoaXMucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gIH1cblxuICB0b2tlbkV4aXN0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IG51bGwgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IHVuZGVmaW5lZCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gJyc7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBjYW5jZWxhdGlvbigpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShmYWxzZSk7XG4gIH1cbiAgY29uZmlybWF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFcnJvclNlcnZpY2Uge1xyXG5cclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZyA9IFwiXCI7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IEVycm9yU2VydmljZSB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgSGFuZGxlRXJyb3IgPSA8VD4gKG9wZXJhdGlvbj86IHN0cmluZywgcmVzdWx0PzogVCkgPT4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gT2JzZXJ2YWJsZTxUPjtcclxuXHJcbi8qKiBIYW5kbGVzIEh0dHBDbGllbnQgZXJyb3JzICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBFcnJvckhhbmRsZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqIENyZWF0ZSBoYW5kbGVFcnJvciBmdW5jdGlvbiB0aGF0IGFscmVhZHkga25vd3MgdGhlIHNlcnZpY2UgbmFtZSAqL1xyXG4gIGNyZWF0ZUhhbmRsZUVycm9yID0gKHNlcnZpY2VOYW1lID0gJycpID0+IDxUPlxyXG4gICAgKG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQgPSB7fSBhcyBUKSA9PiB0aGlzLmhhbmRsZUVycm9yKHNlcnZpY2VOYW1lLCBvcGVyYXRpb24sIHJlc3VsdCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBzZXJ2aWNlTmFtZTogbmFtZSBvZiB0aGUgZGF0YSBzZXJ2aWNlXHJcbiAgICogQHBhcmFtIG9wZXJhdGlvbjogbmFtZSBvZiB0aGUgZmFpbGVkIG9wZXJhdGlvblxyXG4gICAqIEBwYXJhbSByZXN1bHQ6IG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgKi9cclxuICBoYW5kbGVFcnJvcjxUPiAoc2VydmljZU5hbWUgPSAnJywgb3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdCA9IHt9IGFzIFQpIHtcclxuXHJcbiAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAvLyBUb2RvIC0+IFNlbmQgdGhlIGVycm9yIHRvIHJlbW90ZSBsb2dnaW5nIGluZnJhc3RydWN0dXJlXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcblxyXG4gICAgICBjb25zdCBtZXNzYWdlID0gKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3JFdmVudCkgP1xyXG4gICAgICAgIGVycm9yLmVycm9yLm1lc3NhZ2UgOlxyXG4gICAgICAgYHtlcnJvciBjb2RlOiAke2Vycm9yLnN0YXR1c30sIGJvZHk6IFwiJHtlcnJvci5tZXNzYWdlfVwifWA7XHJcblxyXG4gICAgICAvLyBUb2RvIC0+IFRyYW5zZm9ybWluZyBlcnJvciBmb3IgdXNlciBjb25zdW1wdGlvblxyXG4gICAgICB0aGlzLmVycm9yU2VydmljZS5lcnJvck1lc3NhZ2UgPSBgJHtzZXJ2aWNlTmFtZX0gLT4gJHtvcGVyYXRpb259IGZhaWxlZC5cXG4gIE1lc3NhZ2U6ICR7bWVzc2FnZX1gO1xyXG4gICAgICAvLyAtPiBSZXR1cm4gYSBzYWZlIHJlc3VsdC5cclxuICAgICAgcmV0dXJuIG9mKCByZXN1bHQgKTtcclxuICAgIH07XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBmb3J3YXJkUmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlLCBYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc0FyZ3MsIFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuLCBmaW5hbGl6ZSwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi8uLi8uLi9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIsIEhhbmRsZUVycm9yIH0gZnJvbSAnLi9odHRwLWVycm9yLWhhbmRsZXInO1xuXG4vL2ltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9IdHRwSGVscGVyU2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQeHRIdHRwU2VydmljZSBleHRlbmRzIEh0dHAge1xuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3I6IEhhbmRsZUVycm9yO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQsXG4gICAgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSB1cmxIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSxcbiAgICBwcml2YXRlIGh0dHBFcnJvckhhbmRsZXI6IEh0dHBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoYmFja2VuZCwgb3B0aW9ucyk7XG4gICAgdGhpcy5oYW5kbGVFcnJvciA9IGh0dHBFcnJvckhhbmRsZXIuY3JlYXRlSGFuZGxlRXJyb3IoJ0N1c3RvbWVyU2VydmljZScpO1xuICB9XG5cbiAgdXJsUmVxdWVzdDogYW55O1xuICBvcmlnUmVxdWVzdDogUmVxdWVzdDtcbiAgaXNVbmF0aG91cml6ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIENvbnRyb2wgU2VydmljZXNcbiAgICovXG4gIGdldEhlYWRlcnMoKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnUHJhZ21hJywgJ25vLWNhY2hlJyk7XG5cbiAgICBoZWFkZXJzLmFwcGVuZChcIkNhY2hlLUNvbnRyb2xcIiwgXCJuby1jYWNoZVwiKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiLCBcInRydWVcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBIRUFELCBQT1NULCBQVVQsIFBBVENILCBERUxFVEUsIE9QVElPTlNcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBBY2NlcHRcIik7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBoYW5kbGVSZXNwb25zZShvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiwgdXJsPzogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgY29uc3Qgb3JpZyA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmVzdWx0ID0gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAvLyBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ2FkZEN1c3RvbWVyJywgbnVsbCkpLFxuICAgICAgXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkNhdGNoKGVycm9yKTtcbiAgICAgIH0pLFxuICAgICAgXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25SZXN1bHQocmVzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIG9uUmVzdWx0KHJlcykge1xuICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gMjAxKSB7XG4gICAgICByZXR1cm4gcmVzLl9ib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gIH1cblxuICBkb0dldChhcGk6IHN0cmluZywgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIC8vIHRoaXMucHJlTG9hZGVyU2VydmljZS51cGRhdGUodHJ1ZSk7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZ2V0KHVybCwgcmVxdWVzdE9wdGlvbnMpKTtcbiAgfVxuXG4gIGRvUG9zdChlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBlbmRwb2ludDtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBvc3QodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUHV0KGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wdXQodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUGF0aChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55LCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucGF0Y2godXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvRGVsZXRlKGFwaTogc3RyaW5nLCBwYXJhbXM6IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCB1cmxQYXJhbSA9IHVybCArICcvJyArIHBhcmFtcztcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZGVsZXRlKHVybFBhcmFtLCByZXF1ZXN0T3B0aW9ucyksIHVybFBhcmFtKTtcbiAgfVxuXG5cbiAgcmVxdWVzdCh1cmw6IHN0cmluZyB8IFJlcXVlc3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgb3B0aW9ucyA9IHRoaXMucmVxdWVzdEFyZ3Mob3B0aW9ucyk7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsUmVxdWVzdCA9IHVybC51cmw7XG4gICAgICB0aGlzLm9yaWdSZXF1ZXN0ID0gdXJsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVybFJlcXVlc3QgIT09IGVudmlyb25tZW50LkNPTkZJR19GSUxFKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLm9yaWdSZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgICBvcHRpb25zLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVybCA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmV0dXJuIHN1cGVyLnJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdEFyZ3Mob3B0aW9uczogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnNBcmdzIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIHB1YmxpYyBvbkNhdGNoKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgIGNhc2UgNDAxOlxuICAgICAgICBpZiAoIXRoaXMuaXNVbmF0aG91cml6ZWQpIHtcbiAgICAgICAgICB0aGlzLm9wZW5EaWFsb2coNDAxKTtcbiAgICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwMVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNVbmF0aG91cml6ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAwOlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMCk7XG4gICAgICAgIC8vIHRoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwNDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIHRoaXMub3BlbkRpYWxvZyg0MDQpXG4gICAgICAgIC8vdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwNFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAzOlxuICAgICAgICBjb25zb2xlLmxvZyg0MDMpO1xuICAgICAgICB0aGlzLm9wZW5EaWFsb2coNDAzKVxuICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIC8vdGhpcy5vcGVuRGlhbG9nKDUwMCk7XG4gICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz0wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cblxuXG4gIG9wZW5EaWFsb2coZXJybykge1xuICAgIHZhciBjb250ZW50RGlhbG9nID0gXCJWb2PDg8KqIHNlcsODwqEgcmVkaXJlY2lvbmFkbyBhIHRlbGEgZGUgYXV0ZW50aWNhw4PCp8ODwqNvIVwiXG5cbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgcGFuZWxDbGFzczogJ3B4dC1kaWFsb2cnLFxuICAgICAgZGF0YTogeyB0aXRsZURpYWxvZzogXCJFcnJvIC0gXCIgKyBlcnJvLCBjb250ZW50RGlhbG9nOiBjb250ZW50RGlhbG9nIH1cbiAgICB9KTtcbiAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsSGVscGVyLmdldEZyb250U2dpKCkpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnVybEhlbHBlci5nZXRGcm9udFNnaSgpICsgXCI/ZXJybz1cIiArIGVycm87XG4gICAgfSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RCYXNlU2VydmljZSB7XG5cbiAgcHVibGljIG1vZGVsOiBhbnk7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0bzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBfaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2VBdXRvLCBtb2RlbCk7XG4gIH07XG4gIGRlbGV0ZShpZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlQXV0bywgaWQpO1xuICB9O1xuXG4gIGRvR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogTWFwPGFueSwgYW55Pikge1xuICAgIGxldCB1cmxcbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zLnNpemUgPiAwKSB7XG4gICAgICB1cmwgPSBwYXRoICsgdGhpcy5idWlsZFJlcXVlc3RQYXJhbXMocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gcGF0aDtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyB1cmwpO1xuICAgIH1cbiAgfTtcblxuICBkb1Bvc3QocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QocGF0aCwgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH07XG4gIH07XG5cbiAgZG9QdXQocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dChwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9EZWxldGUocGF0aDogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHBhdGgsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgaWQpO1xuICAgIH07XG4gIH07XG5cbiAgdXBsb2FkSW1hZ2UocGF0aCwgcGFyYW1zPzogTWFwPGFueSwgYW55Pik6IGFueSB7XG5cbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPD0gLTEpIHtcbiAgICAgIHBhdGggPSB0aGlzLnVybFNlcnZpY2UgKyBwYXRoIDtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcuY29uY2F0KHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpXG4gICAgfTtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IG5ldyBIdHRwSGVhZGVycyhoZWFkZXIpO1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBjb25zdCBmb3JtZGF0YSA9IHRoaXMuc2V0UGFyYW1zRm9ybWRhdGEocGFyYW1zKTtcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QoJ1BPU1QnLCBwYXRoLCBmb3JtZGF0YSwge1xuICAgICAgaGVhZGVyczogaHR0cE9wdGlvbnMsXG4gICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHBDbGllbnQucmVxdWVzdChyZXEpO1xuICB9XG5cblxuICBzZXRQYXJhbXNGb3JtZGF0YShwYXJhbXM6IE1hcDxhbnksIGFueT4pOiBGb3JtRGF0YSB7XG4gICAgY29uc3QgZm9ybWRhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBmb3JtZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1kYXRhO1xuICB9O1xuXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtczogTWFwPGFueSwgYW55Pik6IHN0cmluZyB7XG4gICAgbGV0IGZpbmFsID0gJyc7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpZiAocHJpbWVpcmFJdGVyYWNhbykge1xuICAgICAgICBmaW5hbCArPSAnPycgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgcHJpbWVpcmFJdGVyYWNhbyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWwgKz0gJyYnICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3VwcGVyY2FzZUZpcnN0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBlcmNhc2VGaXJzdCBleHRlbmRzIFVwcGVyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHdvcmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgaWYgKHdvcmRzW2FdLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgIHZhciB3ID0gd29yZHNbYV07XHJcbiAgICAgICAgICB3b3Jkc1thXSA9IHdbMF0udG9VcHBlckNhc2UoKSArIHcuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX0ZNVCA9ICdkZC9NTS95eXl5JztcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX1RJTUVfRk1UID0gYCR7Q29uc3RhbnRzLkRBVEVfRk1UfSAtIGhoOm1tOnNzIGFgO1xyXG4gIH0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2RhdGVGb3JtYXQnXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9GTVQpO1xyXG4gICAgfVxyXG4gIH0iLCJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZGF0ZVRpbWVGb3JtYXQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIHZhciBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZShcImVuLVVTXCIpO1xyXG4gICAgcmV0dXJuICBkYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIENvbnN0YW50cy5EQVRFX1RJTUVfRk1UKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NvbnRyb2xsZXJQaXBlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0O1xyXG4gICAgICB2YXIgYXV4ID0gXCJcIjtcclxuICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB3b3Jkcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIGlmIChhID09IDApIHtcclxuICAgICAgICAgICAgYXV4ID0gd29yZHNbYV0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYXV4ID0gYXV4ICsgd29yZHNbYV0gO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYXV4O1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFVwZXJjYXNlRmlyc3QgfSBmcm9tICcuL3VwcGVyY2FzZS1maXJzdCc7XHJcbmltcG9ydCB7IERhdGVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLWZvcm1hdC5waXBlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLXRpbWUtZm9ybWF0LnBpcGUnO1xyXG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4vY29udHJvbGxlci5waXBlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUsIENvbnRyb2xsZXJQaXBlIF0sXHJcbiAgICBleHBvcnRzOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlLCBDb250cm9sbGVyUGlwZSBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaXBlTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBpdGVtczogYW55W107XG4gIEBWaWV3Q2hpbGQoJ2NoaWxkTWVudScpIHB1YmxpYyBjaGlsZE1lbnU7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSBwdWJsaWMgcHh0QXBwQ29tcG9uZW50U2VydmljZSkgeyB9XG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbG9hZENvbXBvbmVudChjaGlsZCkge1xuICAgIHRoaXMucHh0QXBwQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50KHtjb21wb25lbnQ6IGNoaWxkLm1lbnVTb3VyY2UuY29tcG9uZW50LCBkYXRhOlwiXCJ9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICAgZXhwb3J0czogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IF1cbiAgXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2hhc2hdJyxcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBIYXNoRGlyZWN0aXZlICB7XHJcbiAgICBASW5wdXQoKSBoYXNoOiBzdHJpbmc7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XHJcbiAgfSIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpc2libGVJblJvbGVzR3VhcmQgfSBmcm9tICcuLi92aXNpYmxlLWluLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhvcml0eVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBfaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHsgfVxuXG4gIGJ1c2NhckF1dGhvcml0aWVzIChjb2RpZ29TaXN0ZW1hKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5faHR0cEhlbHBlci5nZXRBcGlTZ2koKSArIFwicGVybWlzc29lcy9idXNjYXJQZXJmaWxTaXN0ZW1hLz9cIjtcbiAgICBjb25zdCBwYXJhbXMgPSBcImNvZGlnb1Npc3RlbWE9XCIgKyBjb2RpZ29TaXN0ZW1hO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRvR2V0KHVybCArIHBhcmFtcyk7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgcHh0Q29uZmlndXJhdGlvbiA9IHtzeXN0ZW1JZDogMTA0ICxzeXN0ZW1QcmV4OiBcIlNHRV9ORVdcIn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXNpYmxlSW5Sb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsIHByaXZhdGUgYXV0aG9yaXR5U2VydmljZTogQXV0aG9yaXR5U2VydmljZSkgeyB9XHJcbiAgY2FuQWN0aXZhdGUobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuIHtcclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICBpZiAodG9rZW4gIT09ICd1bmRlZmluZWQnICYmIHRva2VuICE9PSAnJyAmJiB0b2tlbiAhPT0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW4pO1xyXG4gICAgICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViKTtcclxuICAgICAgICBpZiAodG9rZW5BdXRob3JpdGllcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gJycgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hdXRob3JpdHlTZXJ2aWNlLmJ1c2NhckF1dGhvcml0aWVzKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQpLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViLCBkYXRhLmF1dGhvcml0eSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5odHRwSGVscGVyLmdldFVybEF1dGVudGljYWNhbygpICsgXCI/ZXJybz00MDFcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJUb2tlbiBVbmRlZmluZWRcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBFdmVudCwgXHJcbiAgSHR0cEludGVyY2VwdG9yLCBcclxuICBIdHRwSGFuZGxlciwgXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvcix0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKCkvL3twcm92aWRlZEluOiAncm9vdCd9XHJcblxyXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0U2VydmljZSAgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHQvLyBpbnRlcmNlcHQgcmVxdWVzdCBhbmQgYWRkIHRva2VuXHJcbiAgXHRpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOk9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHJcbiAgICBcdC8vIG1vZGlmeSByZXF1ZXN0XHJcblx0ICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcclxuXHQgICAgICBzZXRIZWFkZXJzOiB7XHJcblx0ICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01ZX1RPS0VOJyl9YFxyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0ICAgXHJcblx0ICAgXHRjb25zb2xlLmxvZyhcIi0tLS1yZXF1ZXN0LS0tLVwiKTtcclxuXHJcblx0IFx0Y29uc29sZS5sb2cocmVxdWVzdCk7XHJcblxyXG5cdCBcdGNvbnNvbGUubG9nKFwiLS0tIGVuZCBvZiByZXF1ZXN0LS0tXCIpO1xyXG4gXHJcblxyXG5cdCAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdClcclxuXHQgICAgLnBpcGUoXHJcblx0ICAgICAgICB0YXAoZXZlbnQgPT4ge1xyXG5cdCAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcclxuXHQgICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgY29uc29sZS5sb2coXCIgYWxsIGxvb2tzIGdvb2RcIik7XHJcblx0ICAgICAgICAgICAgLy8gaHR0cCByZXNwb25zZSBzdGF0dXMgY29kZVxyXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnN0YXR1cyk7XHJcblx0ICAgICAgICAgIH1cclxuXHQgICAgICAgIH0sIGVycm9yID0+IHtcclxuXHQgICBcdFx0XHQvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0tcmVzcG9uc2UtLS0tXCIpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoXCJzdGF0dXMgY29kZTpcIik7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5lcnJvcihlcnJvci5zdGF0dXMpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0gZW5kIG9mIHJlc3BvbnNlLS0tXCIpO1xyXG5cclxuXHQgICAgICAgIH0pXHJcblx0ICAgICAgKVxyXG5cclxuICAgIH07XHJcbiAgXHJcbiBcclxufSIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdHJNb2R1bGUgfSBmcm9tICduZ3gtdG9hc3RyJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWVycm9yLWhhbmRsZXInO1xuaW1wb3J0IHsgSW50ZXJjZXB0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1pbnRlcmNlcHRvci9pbnRlcmNlcHQtc2VydmljZSAnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSxcbiAgICBUb2FzdHJNb2R1bGUuZm9yUm9vdCh7cHJvZ3Jlc3NCYXI6IHRydWV9KSAgICBcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwQ29tcG9uZW50LCBQeHRDb250ZW50Qm9keSwgSGFzaERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQeHRBcHBDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtQeHRBcHBDb21wb25lbnRTZXJ2aWNlLCBcbiAgICBQeHRIdHRwU2VydmljZSwgXG4gICAgUmVxdWVzdEJhc2VTZXJ2aWNlLCBcbiAgICBIdHRwSGVscGVyU2VydmljZSwgXG4gICAgQ29uZmlnU2VydmljZSwgIFxuICAgIEh0dHBFcnJvckhhbmRsZXIsICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFxuICAgIFRva2VuU2VydmljZSxcbiAgICBBdXRob3JpdHlTZXJ2aWNlLFxuICBJbnRlcmNlcHRTZXJ2aWNlICwge1xuICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgIHVzZUNsYXNzOiBJbnRlcmNlcHRTZXJ2aWNlLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRJbnB1dEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0Q2hlY2tib3hGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RGF0ZUZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHR5cGU/OiBzdHJpbmc7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmlsdGVyRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgY2xhc3NOYW1lPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dFJhZGlvQnV0dG9uRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRTZWxlY3RGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgcGFyYW1ldGVyPzogYW55OyBcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRmaWx0ZXJDdXN0b21GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jb250ZW50LWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY29udGVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZENvbXBvbmVudCB7XG4gIC8vUHJvcGVydGllcyBcbiAgQElucHV0KCkgZGF0YTogYW55O1xuICBASW5wdXQoKSBhdXRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmllbGRzOiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIEBJbnB1dCgpIGNvbHM6IG51bWJlciA9IDU7XG4gIEBJbnB1dCgpIGZpZWxkOiBhbnk7XG4gIGNvbHNJbml0aWFsID0gNTtcbiAgQE91dHB1dCgpIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IocHVibGljIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy5maWVsZFtrZXldLmNvbnN0cnVjdG9yLm5hbWUpIHtcblxuICAgICAgICAvL0ZpbHRlckN1c3RvbVxuICAgICAgICBjYXNlIHB4dGZpbHRlckN1c3RvbUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlckN1c3RvbSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9JbnB1dFxuICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VJbnB1dCA9IDxweHRJbnB1dEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9DaGVja2JveFxuICAgICAgICBjYXNlIHB4dENoZWNrYm94RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9EYXRlXG4gICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0ZpbHRlclxuICAgICAgICBjYXNlIHB4dEZpbHRlckZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgY2FzZSBweHRSYWRpb0J1dHRvbkZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBcbiAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgY2FzZSBweHRTZWxlY3RGaWVsZC5uYW1lOlxuICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlU2VsZWN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB0aGlzLmNvbHNJbml0aWFsID0gdGhpcy5jb2xzO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBwdWJsaWMgb25TdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XG5cbiAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZUFsbEZvcm1GaWVsZHModGhpcy5mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIHB1YmxpYyBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG4gIHNjcmVlbldpZHRoO1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLnNjcmVlbldpZHRoIDw9IDgwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NyZWVuV2lkdGggPD0gMTEwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xzID0gdGhpcy5jb2xzSW5pdGlhbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWlucHV0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4gICIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kYXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtcmFkaW9idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHRTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWxlY2lvbmUnO1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBwYXJhbXM6IGFueTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5wYXJhbXMgIT0gdW5kZWZpbmVkICYmICFjaGFuZ2VzLnBhcmFtcy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSBjaGFuZ2VzLnBhcmFtcy5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmZpbmQoKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sbGVyID0gXCJcIjtcbiAgYXV0byA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBvcHRpb246IGFueTtcblxuICBvcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIGdldCBzZWxlY3RlZE9wdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb247XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkT3B0aW9uKGY6IGFueSkge1xuICAgIGlmIChmICE9IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGYgIT09IHRoaXMub3B0aW9uKSB7XG4gICAgICAgIHRoaXMub3B0aW9uID0gZjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGYuY29kaWdvKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLm9wdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5vcHRpb24gPSB2YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHB4dGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB0aGlzLmZpZWxkID0gdGhpcy5tb2RlbDtcbiAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZC5jbGFzc05hbWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLmZpZWxkLmNsYXNzTmFtZS5uYW1lO1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgZmluZCgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5weHRodHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgdGhpcy5wYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvKSB7XG4gICAgICAgICAgdGhpcy5maWVsZC5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5maW5kKCk7XG4gIH07XG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFNvcnQsIE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbmltcG9ydCB7IHB4dElucHV0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWlucHV0LWZpZWxkJztcbmltcG9ydCB7IHB4dENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkJztcbmltcG9ydCB7IHB4dERhdGVGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZGF0ZS1maWVsZCc7XG5pbXBvcnQgeyBweHRGaWx0ZXJGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkJztcbmltcG9ydCB7IHB4dFNlbGVjdEZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1zZWxlY3QtZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQnO1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJ3NlbGVuaXVtLXdlYmRyaXZlci9odHRwJztcblxuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGlhbG9nLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGNvbHMgPSAyO1xuICBmaWVsZHM6IFB4dEZpZWxkQ29uZmlnW10gPSBbXTtcbiAgZmllbGRzSGlzdDogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBhdXRvOiBib29sZWFuO1xuICBmaWx0ZXIgPSB7IGNvZGU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHVuZGVmaW5lZCB9O1xuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgaHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gZGF0YS5jb250cm9sbGVyO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXV0byA9IHRoaXMuZGF0YS5hdXRvO1xuICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgIHRoaXMuZmllbGQgPSB0aGlzLmRhdGEuZmlsdGVycztcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmZpZWxkW2tleV0uY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgICAgIGNhc2UgcHh0ZmlsdGVyQ3VzdG9tRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlckN1c3RvbSA9IDxweHRmaWx0ZXJDdXN0b21GaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vSW5wdXRcbiAgICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUlucHV0ID0gPHB4dElucHV0RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VJbnB1dC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9DaGVja2JveFxuICAgICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0RhdGVcbiAgICAgICAgICBjYXNlIHB4dERhdGVGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0ZpbHRlclxuICAgICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgICBjYXNlIHB4dFNlbGVjdEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlU2VsZWN0LnR5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5maWVsZHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZpZWxkc0hpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmRpc3BsYXllZENvbHVtbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGF0YS5kaXNwbGF5ZWRDb2x1bW5zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH1cbiAgY29uZmlybWF0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICAvL1NlYXJjaC5cbiAgc2VhcmNoKCkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgTWFwPGFueSwgYW55PigpO1xuICAgIGRlYnVnZ2VyO1xuICAgIGlmICh0aGlzLmRhdGEuYXV0byAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLmF1dG8pIHtcbiAgICAgIGlmICh0aGlzLmZvcm0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0udmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5mb3JtLnZhbHVlW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdGhpcy5mb3JtLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLmNvbnRyb2xsZXIsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmZpbHRlci5jb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpbHRlci5jb2RlICE9IDAgJiYgdGhpcy5maWx0ZXIuY29kZSAhPSBcIlwiKSB7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJjb2RpZ29cIiwgdGhpcy5maWx0ZXIuY29kZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5maWx0ZXIuZGVzY3JpcHRpb24gIT0gdW5kZWZpbmVkICYmIHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uICE9IFwiXCIpIHtcbiAgICAgICAgcGFyYW1zLnNldChcImRlc2NyaWNhb1wiLCB0aGlzLmZpbHRlci5kZXNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3RSb3cocm93KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uocm93KTtcbiAgfTtcbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfTtcblxuICBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG4vKlxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbiovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIC8vcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXNEaXNhYmxlZCA9IHRydWU7XG4gIGF1dG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzTmFtZSA6U3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6IFN0cmluZyA9IFwiIFwiO1xuICBASW5wdXQoKSBkaXNwbGF5ZWRDb2x1bW5zIDogYW55W107XG4gIEBPdXRwdXQoKSBvblZhbHVlQ2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSB2YWx1ZSA6U3RyaW5nID0gXCIgXCI7XG4gICBcbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIC8vcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcbiBcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY2xhc3NOYW1lICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5jbGFzc05hbWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2hhbmdlcy5jbGFzc05hbWUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wbGFjZWhvbGRlciAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMucGxhY2Vob2xkZXIuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjaGFuZ2VzLnBsYWNlaG9sZGVyLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy52YWx1ZSAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMudmFsdWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucyAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy9NZXRob2QgcmVzcG9zaWJsZSBmb3Igb3BlbiBkaWFsb2cgZmlsdGVyXG4gIG9wZW5GaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmllbGQgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmllbGQuZmlsdGVycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXV0byA9IHRydWU7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YTogeyBhdXRvOiB0aGlzLmF1dG8sIGZpbHRlcnM6IHRoaXMuZmllbGQuZmlsdGVycywgY29udHJvbGxlcjogdGhpcy5maWVsZC5jbGFzc05hbWUsIHRpdGxlRGlhbG9nOiBcIlNlbGVjaW9uZTogKCBcIiArIHRoaXMuZmllbGQuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuZmllbGQudmFsdWUgPSByZXN1bHQuY29kaWdvO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9ZWxzZSB7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YToge2NvbnRyb2xsZXI6IHRoaXMuY2xhc3NOYW1lLCBkaXNwbGF5ZWRDb2x1bW5zOnRoaXMuZGlzcGxheWVkQ29sdW1ucywgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgIHRoaXMuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHRbdGhpcy5kaXNwbGF5ZWRDb2x1bW5zWzFdXTtcbiAgICAgICAgICB0aGlzLm9uVmFsdWVDYWxsYmFjay5lbWl0KHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHh0RGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRDaGVja2JveENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGNvbXBvbmVudE1hcHBlciA9IHtcclxuICBpbnB1dDogUHh0SW5wdXRDb21wb25lbnQsXHJcbiAgYnV0dG9uOiBQeHRCdXR0b25Db21wb25lbnQsXHJcbiAgZGF0ZTogUHh0RGF0ZUNvbXBvbmVudCxcclxuICBzZWxlY3Q6IFB4dFNlbGVjdENvbXBvbmVudCxcclxuICByYWRpb2J1dHRvbjogUHh0UmFkaW9idXR0b25Db21wb25lbnQsXHJcbiAgY2hlY2tib3g6IFB4dENoZWNrYm94Q29tcG9uZW50LFxyXG4gIGZpbHRlcjogUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQsXHJcbn07XHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBcIltkeW5hbWljRmllbGRdXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkQ29uZmlnO1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBGb3JtR3JvdXA7XHJcbiAgY29tcG9uZW50UmVmOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkgeyB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dElucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0SW5wdXRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOltQeHRCdXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEJ1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0RGF0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOltQeHRTZWxlY3RDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRDaGVja2JveENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY29tcG9uZW50TWFwcGVyID0ge1xyXG4gIGlucHV0OiBQeHRJbnB1dENvbXBvbmVudCxcclxuICBidXR0b246IFB4dEJ1dHRvbkNvbXBvbmVudCxcclxuICBkYXRlOiBQeHREYXRlQ29tcG9uZW50LFxyXG4gIHNlbGVjdDogUHh0U2VsZWN0Q29tcG9uZW50LFxyXG4gIHJhZGlvYnV0dG9uOiBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCxcclxuICBjaGVja2JveDogUHh0Q2hlY2tib3hDb21wb25lbnQsXHJcbiAgZmlsdGVyOiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCxcclxufTtcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW2R5bmFtaWNGaWVsZERpYWxvZ11cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmaWVsZDogRmllbGRDb25maWc7XHJcbiAgQElucHV0KCkgZ3JvdXA6IEZvcm1Hcm91cDtcclxuICBjb21wb25lbnRSZWY6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb21wb25lbnRNYXBwZXJbdGhpcy5maWVsZC50eXBlXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGQgPSB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZ10sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZyc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUHh0RGlhbG9nRmlsdGVyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0RmlsdGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgdGVtcGxhdGVKaXRVcmwgfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQeHRJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlJztcbmltcG9ydCB7IFB4dEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0RGF0ZU1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlck1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBNb2R1bGUsXG4gICAgUHh0SW5wdXRNb2R1bGUsXG4gICAgUHh0QnV0dG9uTW9kdWxlLFxuICAgIFB4dERhdGVNb2R1bGUsXG4gICAgUHh0U2VsZWN0TW9kdWxlLFxuICAgIFB4dFJhZGlvYnV0dG9uTW9kdWxlLFxuICAgIFB4dENoZWNrYm94TW9kdWxlLFxuICAgIFB4dElucHV0RmlsdGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENvbnRlbnRDb21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gICBleHBvcnRzOiBbUHh0Q29udGVudENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRDb250ZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50TW9kdWxlIHsgfVxuIiwiXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbiB7XHJcbiAgICBpY29uOiBTdHJpbmc7XHJcbiAgICBtZW51OiBTdHJpbmc7XHJcbiAgICBlbmFibGU6IEJvb2xlYW47XHJcbiAgICBlbnVtIDogTnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoaWNvbjogU3RyaW5nLCBtZW51OiBTdHJpbmcsIGVuYWJsZTogQm9vbGVhbiwgaWQgOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICAgICAgdGhpcy5lbnVtID0gaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIE9wdGlvbnNTdWJtZW51IHtcclxuICAgIFNBTFZBUiA9IDEsXHJcbiAgICBQRVNRVUlTQVIgPSAyLFxyXG4gICAgTElNUEFSID0gMyxcclxuICAgIE5PVk8gPSA0LFxyXG4gICAgVk9MVEFSPSA1LFxyXG4gICAgRVhDTFVJUj0gNlxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4uLy4uL3BpcGVzL3VwcGVyY2FzZS1maXJzdCc7XG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL2NvbnRyb2xsZXIucGlwZSc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzU2F2ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNEZWxldGU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjb250cm9sbGVyPzogU3RyaW5nO1xuXG4gIHNhdmUoKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbk1vZGVsKCkpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnNhdmUodGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzU2F2ZS5lbWl0KHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBkZWxldGUoaWQpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5kZWxldGUoaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNEZWxldGUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBjbGVhcigpIHtcbiAgICB0aGlzLm1vZGVsID0ge30gYXMgVDtcbiAgfTtcbiAgYWRkKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYWRkKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGNvbHMgPSAzO1xuICBjb2xzcGFuID0gMTtcbiAgYnV0dG9uczogUHh0QnV0dG9uW10gPSBbXTtcbiAgZW5hYmxlU2F2ZSA9IHRydWU7XG4gIGVuYWJsZUJhY2sgPSB0cnVlO1xuICBlbmFibGVDbGVhciA9IHRydWU7XG4gIGVuYWJsZVNlYXJjaCA9IHRydWU7XG4gIGVuYWJsZUFkZCA9IHRydWU7XG4gIGVuYWJsZURlbGV0ZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9weHRBcHBTZXJ2aWNlOiBQeHRBcHBDb21wb25lbnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uU2VydmljZTogVG9hc3RyU2VydmljZSkge1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJrZXlib2FyZF9iYWNrc3BhY2VcIiwgXCJWT0xUQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuVk9MVEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIlNBTFZBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5TQUxWQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiTk9WT1wiLCB0cnVlLCBPcHRpb25zU3VibWVudS5OT1ZPKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkxJTVBBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5MSU1QQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwic2VhcmNoXCIsIFwiUEVTUVVJU0FSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlBFU1FVSVNBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJFWENMVUlSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkVYQ0xVSVIpKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGVidWdnZXI7XG4gICAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCkgKyBuZXcgQ29udHJvbGxlclBpcGUoKS50cmFuc2Zvcm0odGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnVybFNlcnZpY2VBdXRvID0gdGhpcy51cmxTZXJ2aWNlO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICB2YWxpZGF0aW9uTW9kZWwoKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxba2V5XSAhPSB1bmRlZmluZWQgJiYgdGhpcy5tb2RlbFtrZXldICE9IFwiXCIpIHtcbiAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXCJDYW1wbyBPYnJpZ2F0w4PCs3Jpb1wiLCBrZXkudG9TdHJpbmcoKS50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmcoXCJOZW5odW0gY2FtcG8gcHJlZW5jaGlkby5cIiwgXCJBdmlzbyFcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFB4dFN1Ym1lbnVzQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtc3VibWVudXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgVG9hc3RyTW9kdWxlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOltQeHRIdHRwU2VydmljZSwgUmVxdWVzdEJhc2VTZXJ2aWNlLCBIdHRwSGVscGVyU2VydmljZSwgQ29uZmlnU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNNb2R1bGUgeyB9XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHREYXRlcGlja2VyQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3B4dC1kYXRlcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBTdHJpbmcgPSBcIkVzY29saGEgdW1hIGRhdGFcIjtcclxuICBASW5wdXQoKSBtaW5EYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgaW5wdXREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBkYXRlTW9kZWw6IERhdGU7XHJcblxyXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xyXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcblxyXG4gIGdldCBkYXRhU2VsZWNpb25hZGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlTW9kZWw7XHJcbiAgfVxyXG5cclxuICBzZXQgZGF0YVNlbGVjaW9uYWRhKGQ6IERhdGUpIHtcclxuICAgIGlmIChkICE9PSB0aGlzLmRhdGVNb2RlbCkge1xyXG4gICAgICB0aGlzLmRhdGVNb2RlbCA9IGQ7XHJcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlTW9kZWwgPSB2YWx1ZTtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgb25EYXRlQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUodW5kZWZpbmVkKTtcclxuICAgIHRoaXMub25EYXRlQ2hhbmdlKCk7XHJcbiAgfVxyXG4gIFxyXG59IiwiXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQeHREYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW0RhdGVQaXBlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUHh0RGF0ZXBpY2tlckNvbXBvbmVudF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlUGlja2VyTW9kdWxlIHtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREaWFsb2dDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dERpYWxvZ0NvbXBvbmVudF1cblxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1weHQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZmlsdGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBkYXRhIDogYW55O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBkYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RmlsdGVyQ29tcG9uZW50XVxuIFxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFBhZ2luYXRvciwgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGlhbG9nLWZpbHRlci1jdXN0b20nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmaWx0ZXJzOiBhbnk7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG4gIFxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgcHVibGljIGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgLy9TZWFyY2guXG4gIHNlYXJjaCgpIHtcbiAgICBsZXQgcGFyYW1zID0gbmV3IE1hcDxhbnksIGFueT4oKTtcbiAgICBpZiAodGhpcy5maWx0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJzW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGFyYW1zLnNldChrZXksIHRoaXMuZmlsdGVyc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWUsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vUm93IFNlbGVjdGVkXG4gIHNlbGVjdFJvdyhyb3cpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShyb3cpO1xuICB9O1xuXG4gIC8vQ2xvc2VcbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodW5kZWZpbmVkKTtcbiAgfTtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdENoaXBJbnB1dEV2ZW50LCBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0NPTU1BLCBFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWZpbHRlci1tYXQtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZmlsdGVyLW1hdC10YWJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEZpbHRlck1hdFRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+KCk7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDogU3RyaW5nIDtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHZpc2libGUgPSB0cnVlO1xuICBzZWxlY3RhYmxlID0gdHJ1ZTtcbiAgcmVtb3ZhYmxlID0gdHJ1ZTtcbiAgYWRkT25CbHVyID0gdHJ1ZTtcbiAgcmVhZG9ubHkgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuICBmaWx0ZXJzOiBhbnlbXSA9IFtdO1xuXG4gIGFkZChldmVudDogTWF0Q2hpcElucHV0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LmlucHV0O1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudmFsdWU7XG5cbiAgICAvLyBBZGQgb3VyIGZydWl0XG4gICAgaWYgKCh2YWx1ZSB8fCAnJykudHJpbSgpKSB7XG4gICAgICAvLyB0aGlzLmZpbHRlcnMgPSBbXTtcbiAgICAgIHRoaXMuZmlsdGVycy5wdXNoKHsgbmFtZTogdmFsdWUudHJpbSgpIH0pO1xuICAgICAgLy90aGlzLmFwcGx5RmlsdGVyKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBSZXNldCB0aGUgaW5wdXQgdmFsdWVcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgfVxuICAgIC8vdGhpcy5hcHBseUZpbHRlcnggKCk7XG4gICAgdGhpcy5hcHBseUZpbHRlckFycmF5KCk7XG5cbiAgfVxuICBhcHBseUZpbHRlckFycmF5KCkge1xuICAgIGlmICh0aGlzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5maWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgZmlsdGVyID0gZmlsdGVyLm5hbWUudHJpbSgpO1xuICAgICAgICBmaWx0ZXIgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGx5RmlsdGVyKFwiXCIpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5RmlsdGVyeCAoKXtcbiAgICAgIGNvbnN0IHRhYmxlRmlsdGVycyA9IFtdO1xuICAgICAgdGhpcy5maWx0ZXJzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgICB0YWJsZUZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgaWQ6IFwibm9tZUltYWdlbVwiLFxuICAgICAgICAgIHZhbHVlOiBmaWx0ZXIubmFtZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kYXRhU291cmNlLmZpbHRlciA9IEpTT04uc3RyaW5naWZ5KHRhYmxlRmlsdGVycyk7XG4gIH1cblxuICBhcHBseUZpbHRlcihmaWx0ZXI6IHN0cmluZykge1xuICAgIGZpbHRlciA9IGZpbHRlci50cmltKCk7XG4gICAgZmlsdGVyID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5kYXRhU291cmNlLmZpbHRlciA9IGZpbHRlcjtcbiAgfVxuICBcbiAgcmVtb3ZlKGZpbHRlcjogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseUZpbHRlckFycmF5KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RmlsdGVyTWF0VGFibGVDb21wb25lbnQgfSBmcm9tICcuL3B4dC1maWx0ZXItbWF0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RmlsdGVyTWF0VGFibGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0RmlsdGVyTWF0VGFibGVDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHMgOiBbUHh0RmlsdGVyTWF0VGFibGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dEZpbHRlck1hdFRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgcHh0RW51bVRhZ0h0bWwgfSBmcm9tIFwiLi4vZW51bS9weHQtZW51bS10YWctaHRtbFwiO1xyXG5pbXBvcnQgeyBweHRFbnVtVHlwZVRhZyB9IGZyb20gXCIuLi9lbnVtL3B4dC1lbnVtLXR5cGUtdGFnXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dEZpZWxkcyB7XHJcbiAgICB0eXBlOiBweHRFbnVtVHlwZVRhZztcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICB0YWc6IHB4dEVudW1UYWdIdG1sO1xyXG59XHJcbiIsImV4cG9ydCBlbnVtIHB4dEVudW1UYWdIdG1sIHtcclxuICAgIElucHV0ID0gMSxcclxuICAgIENvbWJvID0gMixcclxuICAgIEZpbHRlciA9IDMsXHJcbiAgICBDaGVja2JveCA9IDRcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXVwbG9hZC1maWxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgOnN0cmluZztcbiAgQE91dHB1dCgpIGZpbGVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgYXJyYXlJbWFnZXMgOkZpbGVSZWFkZXI7XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgb25DaGFuZ2VJbWFnZW0oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgaW1hZ2VtOiBGaWxlID0gZXZlbnQ7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyPSBpbWFnZW0ubmFtZTtcbiAgICByZXR1cm4gdGhpcy5maWxlU2VsZWN0ZWQubmV4dChpbWFnZW0pO1xuICAgIH1cblxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRVcGxvYWRGaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50cyA6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEdhbGxlcnlPcHRpb25zLCBOZ3hHYWxsZXJ5SW1hZ2UsIE5neEdhbGxlcnlBbmltYXRpb24gfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1nYWxsZXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGdhbGxlcnlPcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9uc1tdO1xuICBASW5wdXQoKSBnYWxsZXJ5SW1hZ2VzOiBOZ3hHYWxsZXJ5SW1hZ2VbXTtcbiAgQElucHV0KCkgd2lkdGg6IGFueSA9IFwiMTAwJVwiO1xuICBASW5wdXQoKSBoZWlnaHQ6IGFueSA9ICc0MDBweCc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5nYWxsZXJ5T3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHRodW1ibmFpbHNDb2x1bW5zOiA0LFxuICAgICAgICBpbWFnZUFuaW1hdGlvbjogTmd4R2FsbGVyeUFuaW1hdGlvbi5TbGlkZVxuICAgICAgfSxcbiAgICAgIC8vIG1heC13aWR0aCA4MDBcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogODAwLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgaW1hZ2VQZXJjZW50OiA4MCxcbiAgICAgICAgdGh1bWJuYWlsc1BlcmNlbnQ6IDIwLFxuICAgICAgICB0aHVtYm5haWxzTWFyZ2luOiAyMCxcbiAgICAgICAgdGh1bWJuYWlsTWFyZ2luOiAyMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNDAwLFxuICAgICAgICBwcmV2aWV3OiBmYWxzZVxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0R2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU1vZHVsZSB9IGZyb20gJ25neC1nYWxsZXJ5JztcbmltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdGVyaWFsQW5ndWxhck1vZHVsZSwgTmd4R2FsbGVyeU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0R2FsbGVyeUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dEdhbGxlcnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJjb21wb25lbnRNYXBwZXIiLCJub29wIiwiQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFNRSx3QkFBbUIsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7S0FBSzs7Z0JBSjNELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2lCQUM3Qjs7OztnQkFKbUIsZ0JBQWdCOzt5QkFBcEM7Ozs7Ozs7QUNBQTs7NkJBSzBDLElBQUksT0FBTyxFQUFPO3VDQUNHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFOzhCQUVyRCxJQUFJLE9BQU8sRUFBTzt1Q0FDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTs4QkFFdEQsSUFBSSxPQUFPLEVBQU87b0NBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7NEJBRXJELElBQUksT0FBTyxFQUFPOzJCQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFOzs7Ozs7SUFFL0UsNENBQVc7Ozs7SUFBWCxVQUFZLE1BQVc7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUQsK0NBQWM7Ozs7SUFBZCxVQUFlLFdBQVc7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7S0FDdEM7Ozs7O0lBRUQsOENBQWE7Ozs7SUFBYixVQUFjLFNBQWM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdkM7Ozs7O0lBRUQs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