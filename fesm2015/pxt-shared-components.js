import { Directive, ViewContainerRef, Injectable, ChangeDetectorRef, Component, Input, ViewChild, ComponentFactoryResolver, Inject, NgModule, Injector, Pipe, Output, EventEmitter, forwardRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatMenuTrigger, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatLineModule, MatCommonModule, MatOptionModule, MatFormFieldModule, MatPseudoCheckboxModule } from '@angular/material';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { CommonModule, UpperCasePipe, DatePipe } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpRequest, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Headers, Http, RequestOptions, XHRBackend, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryModule } from 'ngx-gallery';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtContentBody {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
PxtContentBody.decorators = [
    { type: Directive, args: [{
                selector: '[ad-pxt-content]',
            },] }
];
/** @nocollapse */
PxtContentBody.ctorParameters = () => [
    { type: ViewContainerRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtAppComponentService {
    constructor() {
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
    setSubmenus(routes) {
        this.submenusItens.next(routes);
    }
    /**
     * @param {?} infoInitial
     * @return {?}
     */
    setInitialInfo(infoInitial) {
        this._setInfoInit.next(infoInitial);
    }
    /**
     * @param {?} component
     * @return {?}
     */
    loadComponent(component) {
        this._loadComponent.next(component);
    }
    /**
     * @param {?} user
     * @return {?}
     */
    setUser(user) {
        this._setUserLogged.next(user);
    }
}
PxtAppComponentService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtAppComponent {
    /**
     * @param {?} changeDetectorRef
     * @param {?} media
     * @param {?} componentFactoryResolver
     * @param {?} pxtAppComponentService
     */
    constructor(changeDetectorRef, media, componentFactoryResolver, pxtAppComponentService) {
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
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.result = pxtAppComponentService.infoInitial.subscribe(infoInitial => {
            if (infoInitial != undefined) {
                this.usuerLogged = infoInitial.userLogged;
                this.system = infoInitial.system;
                this.menusReceived = infoInitial.sideBarMenus;
                this.menus = infoInitial.sideBarMenus;
                this.prepareMenu();
            }
        });
        this.subscribeComponent();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        clearInterval(this.interval);
    }
    /**
     * @param {?} route
     * @param {?} adHost
     * @return {?}
     */
    loadComponent(route, adHost) {
        this.menuSelected = route.menuText;
        /** @type {?} */
        let adItem = route.menuSource;
        /** @type {?} */
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        /** @type {?} */
        let viewContainerRef = adHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        let componentRef = viewContainerRef.createComponent(componentFactory);
    }
    /**
     * @return {?}
     */
    subscribeComponent() {
        this.pxtAppComponentService.loadComponentObservable.subscribe(componentObj => {
            /** @type {?} */
            var arrayAux = this.menusReceived.filter(x => x.menuSource != undefined && x.menuSource.component === componentObj.component);
            console.log(arrayAux);
            if (arrayAux.length == 1) {
                this.menuSelected = arrayAux[0].menuText;
            }
            /** @type {?} */
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentObj.component);
            /** @type {?} */
            let viewContainerRef = this.adHost.viewContainerRef;
            viewContainerRef.clear();
            /** @type {?} */
            let componentRef = viewContainerRef.createComponent(componentFactory);
            (/** @type {?} */ (componentRef.instance)).data = componentObj.data;
        });
    }
    /**
     * @param {?} nav
     * @return {?}
     */
    selectItemMenu(nav) {
        this.loadComponent(nav, this.adHost);
    }
    /**
     * @return {?}
     */
    prepareMenu() {
        /** @type {?} */
        let arrayAux;
        arrayAux = this.menus.filter(x => x.menuType == "group" && x.menuParent == "");
        /** @type {?} */
        var arrayAuxGroup = this.menus.filter(x => x.menuType == "group" && x.menuParent !== "");
        /** @type {?} */
        var arrayAuxItem = this.menus.filter(x => x.menuType == "item" && x.menuParent !== "");
        //add itens in groups
        arrayAuxItem.forEach(item => {
            /** @type {?} */
            var arrayTmp = arrayAuxGroup.filter(x => x.menuId == item.menuParent);
            if (arrayTmp.length == 1) {
                if (arrayTmp[0].childs == undefined) {
                    arrayTmp[0].childs = [];
                }
                arrayTmp[0].childs.push(item);
            }
        });
        //add groups in groups
        arrayAuxGroup.forEach(item => {
            /** @type {?} */
            var arrayTmp = arrayAuxGroup.filter(x => x.menuId == item.menuParent);
            if (arrayTmp.length == 1) {
                if (arrayTmp[0].childs == undefined) {
                    arrayTmp[0].childs = [];
                }
                arrayTmp[0].childs.push(item);
            }
        });
        //add groups in super-groups
        arrayAuxGroup.forEach(item => {
            /** @type {?} */
            var arrayTmp = arrayAux.filter(x => x.menuId == item.menuParent);
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
        arrayAuxItem.forEach(item => {
            /** @type {?} */
            var arrayTmp = arrayAux.filter(x => x.menuId == item.menuParent);
            if (arrayTmp.length == 1) {
                if (arrayTmp[0].childs == undefined) {
                    arrayTmp[0].childs = [];
                }
                arrayTmp[0].childs.push(item);
            }
        });
        this.menus = arrayAux;
    }
}
PxtAppComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-app',
                template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button style=\"z-index: 1;\" (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <img [src]=\"urlImg\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{system | uppercaseFirst}}</h1>\n    <h1 class=\"system\">{{menuSelected | uppercaseFirst}}</h1>\n    <span class=\"example-spacer\"></span>\n    <span>Ol\u00E1, {{usuerLogged | uppercaseFirst}} </span>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <button mat-menu-item>\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n       \n        <span *ngFor=\"let item of menus\">\n          <!-- Handle branch node menu items -->\n          <span *ngIf=\"item.childs && item.childs.length > 0\">\n            <button mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n              <mat-icon>{{item.menuIcon}}</mat-icon>\n              <span>{{item.menuText | uppercaseFirst}}</span>\n            </button>\n            <pxt-app-menu-item #menu [items]=\"item.childs\"></pxt-app-menu-item>\n          </span>\n          <!-- Handle leaf node menu items -->\n          <span *ngIf=\"!item.childs || item.childs.length === 0\">\n            <button *ngIf=\"item.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"selectItemMenu(item)\">\n              <mat-icon>{{item.menuIcon}}</mat-icon>\n              <span>{{item.menuText | uppercaseFirst}}</span>\n            </button>\n            <button *ngIf=\"item.menuType=='group'\" mat-menu-item color=\"primary\" >\n                <mat-icon>{{item.menuIcon}}</mat-icon>\n                <span>{{item.menuText | uppercaseFirst}}</span>\n              </button>\n          </span>\n        </span>\n      \n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n\n</div>\n<div *ngIf=\"!shouldRun\">Please open on Stackblitz to see result</div>",
                styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-container>.example-toolbar,.example-is-mobile .example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}"]
            }] }
];
/** @nocollapse */
PxtAppComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: MediaMatcher },
    { type: ComponentFactoryResolver },
    { type: undefined, decorators: [{ type: Inject, args: [PxtAppComponentService,] }] }
];
PxtAppComponent.propDecorators = {
    matMenu: [{ type: Input }],
    subContainer1: [{ type: ViewChild, args: ['menus', { read: ViewContainerRef },] }],
    contextMenuTrigger: [{ type: ViewChild, args: ['contextMenuTrigger', { read: MatMenuTrigger },] }],
    adHost: [{ type: ViewChild, args: [PxtContentBody,] }]
};

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
class MaterialAngularModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ConfigService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    load(url) {
        /** @type {?} */
        const injectHttp = this.injector.get(HttpClient);
        return new Promise((resolve) => {
            injectHttp.get(url).pipe(map(res => res)).subscribe(config => {
                this.config = config;
                resolve();
            });
        });
    }
    /**
     * @param {?} element
     * @param {?=} dataList
     * @return {?}
     */
    getConfiguration(element, dataList) {
        if (!dataList) {
            /** @type {?} */
            const urlWithElement = this.config[element];
            return this.verifyUrl(urlWithElement);
        }
        else {
            /** @type {?} */
            const urlWithDataList = this.config[dataList][element];
            return this.verifyUrl(urlWithDataList);
        }
    }
    /**
     * @param {?} typeModel
     * @return {?}
     */
    verifyUrl(typeModel) {
        if (typeModel.includes('/', typeModel.length - 1)) {
            /** @type {?} */
            const typeRelease = typeModel;
            return typeRelease;
        }
        else {
            /** @type {?} */
            const newType = typeModel + '/';
            return newType;
        }
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HttpHelperService {
    /**
     * @param {?} configService
     */
    constructor(configService) {
        this.configService = configService;
    }
    /**
     * @return {?}
     */
    getApi() {
        return this.configService.getConfiguration('API', 'PATH');
    }
    ;
    /**
     * @return {?}
     */
    getApiSgi() {
        return this.configService.getConfiguration('API', 'SGI');
    }
    ;
    /**
     * @param {?} name
     * @param {?} url
     * @return {?}
     */
    getApiUrl(name, url) {
        return this.configService.getConfiguration(url, name);
    }
}
HttpHelperService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpHelperService.ctorParameters = () => [
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const environment = {
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
class TokenService {
    constructor() {
    }
    /**
     * @return {?}
     */
    getAccessToken() {
        debugger;
        /** @type {?} */
        const token = localStorage.getItem('token');
        if (token != null) {
            return token;
        }
    }
    /**
     * @param {?} res
     * @return {?}
     */
    setTokenStorage(res) {
        localStorage.setItem('token', JSON.stringify(res));
    }
    /**
     * @return {?}
     */
    removeTokenStorage() {
        /** @type {?} */
        var token = localStorage.getItem('token');
        /** @type {?} */
        const decoded = /** @type {?} */ (jwt_decode(token));
        localStorage.removeItem(system.id + system.prex + decoded.sub);
    }
    /**
     * @return {?}
     */
    deleteToken() {
        this.removeTokenStorage();
    }
    /**
     * @return {?}
     */
    tokenExists() {
        return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== '';
    }
}
TokenService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TokenService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtHttpService extends Http {
    /**
     * @param {?} backend
     * @param {?} options
     * @param {?} injector
     * @param {?} tokenService
     */
    constructor(backend, options, injector, tokenService) {
        super(backend, options);
        this.backend = backend;
        this.injector = injector;
        this.tokenService = tokenService;
        this.isUnathourized = false;
    }
    /**
     *  Control Services
     * @return {?}
     */
    getHeaders() {
        /** @type {?} */
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Cache-Control', 'no-store');
        headers.append('Pragma', 'no-cache');
        return headers;
    }
    /**
     * @param {?} observable
     * @param {?=} url
     * @return {?}
     */
    handleResponse(observable, url) {
        /** @type {?} */
        let result = null;
        /** @type {?} */
        const orig = this.origRequest;
        result = observable.pipe(catchError((error) => {
            return this.onCatch(error);
        }), map(res => {
            return this.onResult(res);
        }));
        return result;
    }
    /**
     * @param {?} res
     * @return {?}
     */
    onResult(res) {
        if (res.status == 201) {
            return res._body;
        }
        else {
            return res.json();
        }
    }
    /**
     * @param {?} api
     * @param {?=} loader
     * @return {?}
     */
    doGet(api, loader) {
        /** @type {?} */
        const url = api;
        /** @type {?} */
        const requestOptions = new RequestOptions({ headers: this.getHeaders() });
        return this.handleResponse(super.get(url, requestOptions));
    }
    /**
     * @param {?} endpoint
     * @param {?=} params
     * @return {?}
     */
    doPost(endpoint, params) {
        /** @type {?} */
        const url = endpoint;
        /** @type {?} */
        const requestOptions = new RequestOptions({ headers: this.getHeaders() });
        return this.handleResponse(super.post(url, params, requestOptions), url);
    }
    /**
     * @param {?} api
     * @param {?=} params
     * @return {?}
     */
    doPut(api, params) {
        /** @type {?} */
        const url = api;
        /** @type {?} */
        const requestOptions = new RequestOptions({ headers: this.getHeaders() });
        return this.handleResponse(super.put(url, params, requestOptions), url);
    }
    /**
     * @param {?} api
     * @param {?=} params
     * @param {?=} loader
     * @return {?}
     */
    doPath(api, params, loader) {
        /** @type {?} */
        const url = api;
        /** @type {?} */
        const requestOptions = new RequestOptions({ headers: this.getHeaders() });
        return this.handleResponse(super.patch(url, params, requestOptions), url);
    }
    /**
     * @param {?} api
     * @param {?} params
     * @param {?=} loader
     * @return {?}
     */
    doDelete(api, params, loader) {
        /** @type {?} */
        const url = api;
        /** @type {?} */
        const urlParam = url + '/' + params;
        /** @type {?} */
        const requestOptions = new RequestOptions({ headers: this.getHeaders() });
        return this.handleResponse(super.delete(urlParam, requestOptions), urlParam);
    }
    /**
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    request(url, options) {
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
            const token = this.tokenService.getAccessToken();
            if (token != null) {
                this.origRequest.headers.set('Authorization', 'Bearer '.concat(token));
                options.headers.set('Authorization', 'Bearer '.concat(token));
            }
        }
        url = this.origRequest;
        return super.request(url, options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    requestArgs(options) {
        if (options == null) {
            options = new RequestOptions({ headers: this.getHeaders() });
        }
        return options;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    onCatch(error) {
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
    }
}
PxtHttpService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PxtHttpService.ctorParameters = () => [
    { type: XHRBackend },
    { type: RequestOptions },
    { type: Injector },
    { type: TokenService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class RequestBaseService {
    /**
     * @param {?} httpService
     * @param {?} helper
     * @param {?} tokenService
     * @param {?} _httpClient
     */
    constructor(httpService, helper, tokenService, _httpClient) {
        this.httpService = httpService;
        this.helper = helper;
        this.tokenService = tokenService;
        this._httpClient = _httpClient;
        this.urlService = helper.getApi();
    }
    /**
     * @return {?}
     */
    load() {
        return this.httpService.doGet(this.urlServiceAuto);
    }
    ;
    /**
     * @param {?=} model
     * @return {?}
     */
    save(model) {
        return this.httpService.doPost(this.urlServiceAuto, model);
    }
    ;
    /**
     * @param {?} id
     * @return {?}
     */
    delete(id) {
        return this.httpService.doDelete(this.urlServiceAuto, id);
    }
    ;
    /**
     * @param {?} path
     * @return {?}
     */
    doGet(path) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doGet(path);
        }
        else {
            return this.httpService.doGet(this.urlService + path);
        }
    }
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    doPost(path, model) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doPost(path, model);
        }
        else {
            return this.httpService.doPost(this.urlService + path, model);
        }
    }
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    doPut(path, model) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doPut(path, model);
        }
        else {
            return this.httpService.doPut(this.urlService + path, model);
        }
    }
    ;
    /**
     * @param {?} path
     * @param {?} id
     * @return {?}
     */
    doDelete(path, id) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doDelete(path, id);
        }
        else {
            return this.httpService.doDelete(this.urlService + path, id);
        }
    }
    ;
    /**
     * @param {?} path
     * @param {?=} params
     * @return {?}
     */
    uploadImage(path, params) {
        /** @type {?} */
        const header = {
            'Authorization': 'Bearer '.concat(this.tokenService.getAccessToken())
        };
        /** @type {?} */
        const httpOptions = new HttpHeaders(header);
        /** @type {?} */
        const token = this.tokenService.getAccessToken();
        /** @type {?} */
        const formdata = this.setParamsFormdata(params);
        /** @type {?} */
        const req = new HttpRequest('POST', path, formdata, {
            headers: httpOptions,
            reportProgress: true,
            responseType: 'text'
        });
        return this._httpClient.request(req);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    setParamsFormdata(params) {
        /** @type {?} */
        const formdata = new FormData();
        params.forEach((value, key) => {
            formdata.append(key, value);
        });
        return formdata;
    }
    ;
    /**
     * @param {?} params
     * @return {?}
     */
    buildRequestParams(params) {
        /** @type {?} */
        let final = '';
        /** @type {?} */
        let primeiraIteracao = true;
        params.forEach((value, key) => {
            if (primeiraIteracao) {
                final += '?' + key + '=' + value;
                primeiraIteracao = false;
            }
            else {
                final += '&' + key + '=' + value;
            }
        });
        return final;
    }
}
RequestBaseService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RequestBaseService.ctorParameters = () => [
    { type: PxtHttpService },
    { type: HttpHelperService },
    { type: TokenService },
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class UpercaseFirst extends UpperCasePipe {
    /**
     * @param {?} text
     * @param {?=} args
     * @return {?}
     */
    transform(text, args) {
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
}
UpercaseFirst.decorators = [
    { type: Pipe, args: [{
                name: 'uppercaseFirst'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Constants {
}
Constants.DATE_FMT = 'dd/MM/yyyy';
Constants.DATE_TIME_FMT = `${Constants.DATE_FMT} - hh:mm:ss a`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DateFormatPipe extends DatePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        return super.transform(value, Constants.DATE_FMT);
    }
}
DateFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateFormat'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DateTimeFormatPipe extends DatePipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args) {
        /** @type {?} */
        var datePipe = new DatePipe("en-US");
        return datePipe.transform(value, Constants.DATE_TIME_FMT);
    }
}
DateTimeFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateTimeFormat'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PipeModule {
}
PipeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe],
                exports: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtAppMenuItemComponent {
    /**
     * @param {?} pxtAppComponentService
     */
    constructor(pxtAppComponentService) {
        this.pxtAppComponentService = pxtAppComponentService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} child
     * @return {?}
     */
    loadComponent(child) {
        this.pxtAppComponentService.loadComponent({ component: child.menuSource.component, data: "" });
    }
}
PxtAppMenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-app-menu-item',
                template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n  <span *ngFor=\"let child of items\">\n    <!-- Handle branch node menu items -->\n    <span *ngIf=\"child.childs && child.childs.length > 0\">\n      <a mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n      <pxt-app-menu-item #menu [items]=\"child.childs\"></pxt-app-menu-item>\n    </span>\n    <!-- Handle leaf node menu items -->\n    <span *ngIf=\"!child.childs || child.childs.length === 0\">\n      <a *ngIf=\"child.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"loadComponent(child)\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n\n      <a *ngIf=\"child.menuType=='group'\" mat-menu-item color=\"primary\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n    </span>\n  </span>\n</mat-menu>",
                styles: [""]
            }] }
];
/** @nocollapse */
PxtAppMenuItemComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PxtAppComponentService,] }] }
];
PxtAppMenuItemComponent.propDecorators = {
    items: [{ type: Input }],
    childMenu: [{ type: ViewChild, args: ['childMenu',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtAppMenuItemModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HashDirective {
    /**
     * @param {?} vcRef
     */
    constructor(vcRef) {
        this.vcRef = vcRef;
    }
}
HashDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hash]',
            },] }
];
/** @nocollapse */
HashDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
HashDirective.propDecorators = {
    hash: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AuthorityService {
    /**
     * @param {?} _http
     * @param {?} _httpHelper
     */
    constructor(_http, _httpHelper) {
        this._http = _http;
        this._httpHelper = _httpHelper;
    }
    /**
     * @param {?} codigoSistema
     * @return {?}
     */
    buscarAuthorities(codigoSistema) {
        /** @type {?} */
        const url = this._httpHelper.getApiSgi() + "permissoes/buscarPerfilSistema/?";
        /** @type {?} */
        const params = "codigoSistema=" + codigoSistema;
        return this._http.doGet(url + params);
    }
}
AuthorityService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthorityService.ctorParameters = () => [
    { type: PxtHttpService },
    { type: HttpHelperService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const pxtConfiguration = { systemId: 104, systemPrex: "SGE_NEW" };

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisibleInRolesGuard {
    /**
     * @param {?} router
     * @param {?} httpHelper
     * @param {?} authorityService
     */
    constructor(router, httpHelper, authorityService) {
        this.router = router;
        this.httpHelper = httpHelper;
        this.authorityService = authorityService;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        const token = localStorage.getItem('token');
        if (token !== 'undefined' && token !== '' && token !== null) {
            try {
                /** @type {?} */
                const decoded = /** @type {?} */ (jwt_decode(token));
                /** @type {?} */
                var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + decoded.sub);
                if (tokenAuthorities === 'undefined' || tokenAuthorities === '' || tokenAuthorities === null) {
                    this.authorityService.buscarAuthorities(pxtConfiguration.systemId).subscribe(data => {
                        localStorage.setItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + decoded.sub, data.authority);
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
    }
}
VisibleInRolesGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
VisibleInRolesGuard.ctorParameters = () => [
    { type: Router },
    { type: HttpHelperService },
    { type: AuthorityService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtAppModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtContentComponent {
    constructor() {
    }
}
PxtContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-content-body',
                template: "\n<mat-card>\n    <ng-content></ng-content>\n</mat-card>",
                styles: [".pxt-content-body{padding:10px}.pxt-content-body mat-card{margin:5px;border-top:4px solid;border-radius:4px;border-bottom:4px solid}"]
            }] }
];
/** @nocollapse */
PxtContentComponent.ctorParameters = () => [];
PxtContentComponent.propDecorators = {
    data: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtContentModule {
}
PxtContentModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MaterialAngularModule,
                    HttpClientModule,
                    HttpModule
                ],
                declarations: [PxtContentComponent],
                exports: [PxtContentComponent],
                entryComponents: [PxtContentComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtButton {
    /**
     * @param {?} icon
     * @param {?} menu
     * @param {?} enable
     * @param {?} id
     */
    constructor(icon, menu, enable, id) {
        this.icon = icon;
        this.menu = menu;
        this.enable = enable;
        this.enum = id;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const OptionsSubmenu = {
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
class PxtSubmenusComponent {
    /**
     * @param {?} _pxtAppService
     * @param {?} _serviceBase
     * @param {?} helper
     */
    constructor(_pxtAppService, _serviceBase, helper) {
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
        setTimeout(() => {
            this.urlService = helper.getApi() + this.model.constructor.name;
            this._serviceBase.urlServiceAuto = this.urlService;
            console.log(this.urlService);
        }, 100);
    }
    /**
     * @return {?}
     */
    save() {
        this._serviceBase.save(this.model).subscribe(result => {
            this.statusSave.emit(result);
        });
    }
    ;
    /**
     * @return {?}
     */
    search() {
        this._serviceBase.load().subscribe(result => {
            this.listing.emit(result);
        });
    }
    ;
    /**
     * @param {?} id
     * @return {?}
     */
    delete(id) {
        this._serviceBase.delete(id).subscribe(result => {
            this.statusDelete.emit(result);
        });
    }
    ;
    /**
     * @return {?}
     */
    clear() {
        this.model = /** @type {?} */ ({});
    }
    ;
    /**
     * @return {?}
     */
    add() {
        throw new Error("Method 'add()' not implemented.");
    }
    ;
    /**
     * @return {?}
     */
    back() {
        throw new Error("Method 'back()' not implemented.");
    }
    ;
}
PxtSubmenusComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-submenus',
                template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"delete(0)\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu | uppercaseFirst}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                styles: [""]
            }] }
];
/** @nocollapse */
PxtSubmenusComponent.ctorParameters = () => [
    { type: PxtAppComponentService },
    { type: RequestBaseService },
    { type: HttpHelperService }
];
PxtSubmenusComponent.propDecorators = {
    model: [{ type: Input }],
    listing: [{ type: Output }],
    statusSave: [{ type: Output }],
    statusDelete: [{ type: Output }],
    controller: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtSubmenusModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => {
};
/** @type {?} */
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PxtDatepickerComponent),
    multi: true
};
class PxtDatepickerComponent {
    constructor() {
        this.placeholder = "Escolha uma data";
        this.inputDisabled = false;
        this.onChange = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @return {?}
     */
    get dataSelecionada() {
        return this.dateModel;
    }
    /**
     * @param {?} d
     * @return {?}
     */
    set dataSelecionada(d) {
        if (d !== this.dateModel) {
            this.dateModel = d;
            this.onChangeCallback(d);
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.dateModel = value;
        this.onChangeCallback(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    onDateChange() {
        this.onChange.emit(true);
    }
    /**
     * @return {?}
     */
    clear() {
        this.writeValue(undefined);
        this.onDateChange();
    }
}
PxtDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-datepicker',
                template: "<mat-form-field (click)=\"inputDisabled ? picker.open() : undefined\">\r\n  <input matInput [matDatepicker]=\"picker\" [placeholder]=\"placeholder\" disabled=\"{{inputDisabled}}\" [min]=\"minDate\" [max]=\"maxDate\"\r\n    [(ngModel)]=\"dataSelecionada\" (dateChange)=\"onDateChange()\">\r\n  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n  <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\r\n  <button mat-icon-button class=\"btn-clear\" type=\"button\" (click)=\"clear()\">\r\n    <mat-icon>clear</mat-icon>\r\n  </button>\r\n</mat-form-field>",
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                styles: ["mat-form-field{width:100%}.btn-clear{width:24px;height:24px;line-height:24px;right:0;top:0;position:absolute;margin-top:4px;opacity:.8}.btn-clear mat-icon{font-size:17px}"]
            }] }
];
/** @nocollapse */
PxtDatepickerComponent.ctorParameters = () => [];
PxtDatepickerComponent.propDecorators = {
    placeholder: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    inputDisabled: [{ type: Input }],
    onChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtDatePickerModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtUploadFileComponent {
    constructor() {
        this.fileSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChangeImagem(event) {
        if (event != undefined) {
            /** @type {?} */
            let imagem = event;
            this.placeholder = imagem.name;
            return this.fileSelected.next(imagem);
        }
    }
    ;
}
PxtUploadFileComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-upload-file',
                template: "<mat-form-field>\n  <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"imgFileInput.click()\">\n    <mat-icon>add</mat-icon>\n  </button>\n  <input hidden type=\"file\" accept=\"image/*\" #imgFileInput (change)=\"onChangeImagem($event.target.files[0])\" />\n  <div (click)=\"imgFileInput.click()\">\n    <input matInput type=\"text\" disabled [placeholder]=\"placeholder\">\n  </div>\n</mat-form-field>",
                styles: ["mat-form-field{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}"]
            }] }
];
/** @nocollapse */
PxtUploadFileComponent.ctorParameters = () => [];
PxtUploadFileComponent.propDecorators = {
    placeholder: [{ type: Input }],
    fileSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtUploadFileModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtGalleryComponent {
    constructor() {
        this.width = "100%";
        this.height = '400px';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
}
PxtGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-gallery',
                template: "<ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n",
                styles: [".custom-position{z-index:0!important}"]
            }] }
];
/** @nocollapse */
PxtGalleryComponent.ctorParameters = () => [];
PxtGalleryComponent.propDecorators = {
    galleryImages: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtGalleryModule {
}
PxtGalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MaterialAngularModule, NgxGalleryModule],
                declarations: [PxtGalleryComponent],
                exports: [PxtGalleryComponent],
                entryComponents: [PxtGalleryComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { PxtAppModule, PxtAppComponent, PxtContentModule, PxtContentComponent, MaterialAngularModule, PxtSubmenusModule, PxtSubmenusComponent, PipeModule, PxtAppComponentService, PxtHttpService, ConfigService, HttpHelperService, RequestBaseService, VisibleInRolesGuard, AuthorityService, pxtConfiguration, PxtDatePickerModule, PxtUploadFileModule, PxtGalleryModule, PxtGalleryComponent, HashDirective as ɵg, PxtContentBody as ɵf, PxtAppMenuItemComponent as ɵe, PxtAppMenuItemModule as ɵd, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR as ɵi, PxtDatepickerComponent as ɵj, PxtUploadFileComponent as ɵk, DateFormatPipe as ɵb, DateTimeFormatPipe as ɵc, UpercaseFirst as ɵa, TokenService as ɵh };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC90b2tlbi5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvdXBwZXJjYXNlLWZpcnN0LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC91dGlsL2NvbnN0YW50cy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvZGF0ZS1mb3JtYXQucGlwZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvZGF0ZS10aW1lLWZvcm1hdC5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZGVscy9weHRDb25maWd1cmF0aW9uLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC92aXNpYmxlLWluLXJvbGVzLmd1YXJkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtdXBsb2FkLWZpbGUvcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtdXBsb2FkLWZpbGUvcHh0LXVwbG9hZC1maWxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZ2FsbGVyeS9weHQtZ2FsbGVyeS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYWQtcHh0LWNvbnRlbnRdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRCb2R5IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFB4dEFwcENvbXBvbmVudFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBzdWJtZW51c0l0ZW5zOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3VibWVudXNJdGVuc09ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuc3VibWVudXNJdGVucy5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkQ29tcG9uZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9hZENvbXBvbmVudE9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX2xvYWRDb21wb25lbnQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0VXNlckxvZ2dlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHVzZXJMb2dnZWRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRVc2VyTG9nZ2VkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldEluZm9Jbml0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW5mb0luaXRpYWw6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3NldEluZm9Jbml0LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNldFN1Ym1lbnVzKHJvdXRlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdWJtZW51c0l0ZW5zLm5leHQocm91dGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbml0aWFsSW5mbyhpbmZvSW5pdGlhbCkge1xyXG4gICAgICAgIHRoaXMuX3NldEluZm9Jbml0Lm5leHQoaW5mb0luaXRpYWwpXHJcbiAgICB9XHJcblxyXG4gICAgbG9hZENvbXBvbmVudChjb21wb25lbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQubmV4dChjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXIodXNlcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0VXNlckxvZ2dlZC5uZXh0KHVzZXIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgSW5wdXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQeHRBcHAgfSBmcm9tICcuL3B4dC1hcHAnO1xuaW1wb3J0IHsgUHh0QXBwTW9kZWwgfSBmcm9tICcuL21vZGVsL3B4dC1hcHAubW9kZWwnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0TWVudSwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2FmZUh0bWwsIERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLmNvbXBvbmVudC5zY3NzJ11cblxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnQge1xuXG4gIC8vUHJvcGVydGllc1xuICByb3V0ZXM6IGFueVtdID0gW107XG4gIGdyb3VwczogYW55W10gPSBbXTtcbiAgbWVudXM6IGFueVtdID0gW107XG4gIHN5c3RlbTogU3RyaW5nID0gXCJTWVNURU0gTkFNRVwiXG4gIHVybEltZzogc3RyaW5nID0gJ2h0dHA6Ly9pbWFnZW5zZHN2LnBlaXhvdG8uY29tLmJyL2F1dGgvbWluaV9sb2dvLnBuZyc7XG4gIG1lbnVTZWxlY3RlZCA9IFwiXCI7XG4gIHVzdWVyTG9nZ2VkID0gXCJMb29nZ2VkIHVzZXJcIjtcbiAgbWVudXNIdG1sOiBTYWZlSHRtbDtcbiAgcmVzdWx0OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBfbW9iaWxlUXVlcnlMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgbW9iaWxlUXVlcnk6IE1lZGlhUXVlcnlMaXN0O1xuICBzaG91bGRSdW4gPSB0cnVlO1xuICBASW5wdXQoKSBtYXRNZW51OiBNYXRNZW51O1xuICBAVmlld0NoaWxkKCdtZW51cycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBzdWJDb250YWluZXIxOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdjb250ZXh0TWVudVRyaWdnZXInLCB7IHJlYWQ6IE1hdE1lbnVUcmlnZ2VyIH0pIGNvbnRleHRNZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXI7XG4gIGN1cnJlbnRBZEluZGV4ID0gLTE7XG4gIEBWaWV3Q2hpbGQoUHh0Q29udGVudEJvZHkpIGFkSG9zdDogUHh0Q29udGVudEJvZHk7XG4gIGludGVydmFsOiBhbnk7XG4gIG1lbnVzUmVjZWl2ZWQgOiBhbnlbXTtcbiAgXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IoY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG1lZGlhOiBNZWRpYU1hdGNoZXIsXG4gICAgcHVibGljIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEBJbmplY3QoUHh0QXBwQ29tcG9uZW50U2VydmljZSkgcHVibGljIHB4dEFwcENvbXBvbmVudFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeSA9IG1lZGlhLm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDYwMHB4KScpO1xuICAgIHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIgPSAoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5hZGRMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICB0aGlzLnJlc3VsdCA9IHB4dEFwcENvbXBvbmVudFNlcnZpY2UuaW5mb0luaXRpYWwuc3Vic2NyaWJlKGluZm9Jbml0aWFsID0+IHtcbiAgICAgIGlmIChpbmZvSW5pdGlhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy51c3VlckxvZ2dlZCA9IGluZm9Jbml0aWFsLnVzZXJMb2dnZWQ7XG4gICAgICAgIHRoaXMuc3lzdGVtID0gaW5mb0luaXRpYWwuc3lzdGVtO1xuICAgICAgICB0aGlzLm1lbnVzUmVjZWl2ZWQgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMubWVudXMgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMucHJlcGFyZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmliZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgLy8gSW5jbHVkZSBvZiBjb21wb25lbnRzIGluIHRoZSBhcHBsaWNhdGlvbiBib2R5XG4gIGxvYWRDb21wb25lbnQocm91dGU6IGFueSwgYWRIb3N0KSB7XG4gICAgdGhpcy5tZW51U2VsZWN0ZWQgPSByb3V0ZS5tZW51VGV4dDtcbiAgICBsZXQgYWRJdGVtID0gcm91dGUubWVudVNvdXJjZTtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGFkSXRlbS5jb21wb25lbnQpO1xuICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gYWRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgfVxuXG4gIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VydmljZSByZXNwb25zaWJsZSBmb3IgaW5jbHVkaW5nIGNvbXBvbmVudHMgaW4gdGhlIGJvZHkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gIHN1YnNjcmliZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLnB4dEFwcENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudE9ic2VydmFibGUuc3Vic2NyaWJlKGNvbXBvbmVudE9iaiA9PiB7XG4gICAgICB2YXIgYXJyYXlBdXggPSB0aGlzLm1lbnVzUmVjZWl2ZWQuZmlsdGVyKHg9PngubWVudVNvdXJjZSAhPSB1bmRlZmluZWQgJiYgeC5tZW51U291cmNlLmNvbXBvbmVudCA9PT0gY29tcG9uZW50T2JqLmNvbXBvbmVudCk7XG4gICAgICBjb25zb2xlLmxvZyhhcnJheUF1eCk7XG4gICAgICBpZihhcnJheUF1eC5sZW5ndGggPT0gMSl7XG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gYXJyYXlBdXhbMF0ubWVudVRleHQ7XG4gICAgICB9XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgKDxBZENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGEgPSBjb21wb25lbnRPYmouZGF0YTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJlc3BvbnNpYmxlIGZvciBjYWxsIG1ldGhvZCBcImxvYWRjb21wb25lbnRzKClcIiBpbmZvcm1pbmcgcGFyYW1ldGVyc1xuICBzZWxlY3RJdGVtTWVudShuYXYpIHtcbiAgICB0aGlzLmxvYWRDb21wb25lbnQobmF2LCB0aGlzLmFkSG9zdCk7XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIHByZXBhcmluZyBhcHBsaWNhdGlvbiBtZW51cztcbiAgcHJlcGFyZU1lbnUoKSB7XG4gICAgbGV0IGFycmF5QXV4OiBhbnlbXTtcbiAgICBhcnJheUF1eCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ID09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEdyb3VwID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiZ3JvdXBcIiAmJiB4Lm1lbnVQYXJlbnQgIT09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEl0ZW0gPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJpdGVtXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIGdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIC8vYWRkIGdyb3VwcyBpbiBncm91cHNcbiAgICBhcnJheUF1eEdyb3VwLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eEdyb3VwLmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKVxuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy9hZGQgaXRlbnMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhJdGVtLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMubWVudXMgPSBhcnJheUF1eDtcbiAgfVxufVxuIiwiaW1wb3J0ICcuLy4uLy4uLy4uL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtDZGtUYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7Q2RrVHJlZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gIE1hdEJhZGdlTW9kdWxlLFxuICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxuICBNYXRDaGlwc01vZHVsZSxcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgTWF0RGlhbG9nTW9kdWxlLFxuICBNYXREaXZpZGVyTW9kdWxlLFxuICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gIE1hdEdyaWRMaXN0TW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TGlzdE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRSYWRpb01vZHVsZSxcbiAgTWF0UmlwcGxlTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNpZGVuYXZNb2R1bGUsXG4gIE1hdFNsaWRlck1vZHVsZSxcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gIE1hdFNuYWNrQmFyTW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRTdGVwcGVyTW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VGFic01vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgTWF0VHJlZU1vZHVsZSxcbiAgTWF0TGluZU1vZHVsZSxcbiAgTWF0Q29tbW9uTW9kdWxlLFxuICBNYXRPcHRpb25Nb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gIFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtwbGF0Zm9ybUJyb3dzZXJEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsTWF0SWNvbk1vZHVsZSxNYXRMaW5lTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsTWF0U29ydE1vZHVsZSxNYXRUYWJzTW9kdWxlLE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsTWF0Q2hpcHNNb2R1bGUsTWF0SW5wdXRNb2R1bGUsTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsTWF0QnV0dG9uTW9kdWxlLE1hdENvbW1vbk1vZHVsZSxNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLE1hdFJpcHBsZU1vZHVsZSxNYXRTZWxlY3RNb2R1bGUsTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsTWF0U2lkZW5hdk1vZHVsZSxNYXRTdGVwcGVyTW9kdWxlLE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxNYXRUb29sdGlwTW9kdWxlLE1hdENoZWNrYm94TW9kdWxlLE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLE1hdEV4cGFuc2lvbk1vZHVsZSxNYXRGb3JtRmllbGRNb2R1bGUsTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsTWF0TmF0aXZlRGF0ZU1vZHVsZSxNYXRCb3R0b21TaGVldE1vZHVsZSxNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxNYXRBdXRvY29tcGxldGVNb2R1bGUsTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ2RrVHJlZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gIGNvbmZpZzogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcclxuICApIHsgfVxyXG5cclxuICBsb2FkKHVybDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmplY3RIdHRwID0gdGhpcy5pbmplY3Rvci5nZXQoSHR0cENsaWVudCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgaW5qZWN0SHR0cC5nZXQodXJsKS5waXBlKFxyXG4gICAgICAgIG1hcChyZXMgPT4gcmVzKVxyXG4gICAgICApLnN1YnNjcmliZShjb25maWcgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvbmZpZ3VyYXRpb24oZWxlbWVudDogc3RyaW5nLCBkYXRhTGlzdD86IHN0cmluZykge1xyXG4gICAgaWYgKCFkYXRhTGlzdCkge1xyXG4gICAgICBjb25zdCB1cmxXaXRoRWxlbWVudCA9IHRoaXMuY29uZmlnW2VsZW1lbnRdO1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlVcmwodXJsV2l0aEVsZW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdXJsV2l0aERhdGFMaXN0ID0gdGhpcy5jb25maWdbZGF0YUxpc3RdW2VsZW1lbnRdO1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlVcmwodXJsV2l0aERhdGFMaXN0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZlcmlmeVVybCh0eXBlTW9kZWw6IGFueSkge1xyXG4gICAgaWYgKHR5cGVNb2RlbC5pbmNsdWRlcygnLycsIHR5cGVNb2RlbC5sZW5ndGggLSAxKSkge1xyXG4gICAgICBjb25zdCB0eXBlUmVsZWFzZSA9IHR5cGVNb2RlbDtcclxuICAgICAgcmV0dXJuIHR5cGVSZWxlYXNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbmV3VHlwZSA9IHR5cGVNb2RlbCArICcvJztcclxuICAgICAgcmV0dXJuIG5ld1R5cGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEhlbHBlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0QXBpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnUEFUSCcpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBnZXRBcGlTZ2koKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ0FQSScsICdTR0knKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpVXJsIChuYW1lLCB1cmwpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbih1cmwsIG5hbWUpO1xyXG4gIH1cclxufSIsIlxuZXhwb3J0IGNvbnN0IGVudmlyb25tZW50ID0ge1xuICBwcm9kdWN0aW9uOiB0cnVlLFxuICBlbnZOYW1lOiAnZGV2JyxcbiAgdmVyc2lvbjogJzAuMC4xJyxcbiAgQ09ORklHX0ZJTEU6ICdhc3NldHMvY29uZmlnL2Vudi5qc29uJyxcbiAgZXNiQXBpUHh0IDogXCJodHRwOi8vZXNiZHN2LnBlaXhvdG8uY29tLmJyL3NnZS9cIixcbiAgc3lzdGVtOiB7XG4gICAgaWQ6IDEwOCxcbiAgICBwcmV4OiBcIlBPUkNSUFwiXG4gIH1cbn07XG5cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cCwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcblxudmFyIHN5c3RlbSA9IGVudmlyb25tZW50LnN5c3RlbTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgZGVidWdnZXJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICB9XG4gIHNldFRva2VuU3RvcmFnZShyZXM6IGFueSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICB9XG4gIHJlbW92ZVRva2VuU3RvcmFnZSgpIHtcbiAgICB2YXIgdG9rZW4gPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICBjb25zdCBkZWNvZGVkID0gPGFueT4gand0X2RlY29kZSh0b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3lzdGVtLmlkK3N5c3RlbS5wcmV4K2RlY29kZWQuc3ViKTtcbiAgfVxuICBcbiAgZGVsZXRlVG9rZW4oKSB7XG4gICAgdGhpcy5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgfVxuXG4gIHRva2VuRXhpc3RzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gbnVsbCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gdW5kZWZpbmVkICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBmb3J3YXJkUmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlLCBYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc0FyZ3MsIFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuLCBmaW5hbGl6ZSwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuLy9pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vSHR0cEhlbHBlclNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHh0SHR0cFNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQsXG4gICAgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgLy9wcml2YXRlIHVybEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZVxuICApIHtcbiAgICBzdXBlcihiYWNrZW5kLCBvcHRpb25zKTtcbiAgfVxuXG4gIHVybFJlcXVlc3Q6IGFueTtcbiAgb3JpZ1JlcXVlc3Q6IFJlcXVlc3Q7XG4gIGlzVW5hdGhvdXJpemVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBDb250cm9sIFNlcnZpY2VzXG4gICAqL1xuICBnZXRIZWFkZXJzKCkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDYWNoZS1Db250cm9sJywgJ25vLXN0b3JlJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ1ByYWdtYScsICduby1jYWNoZScpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgaGFuZGxlUmVzcG9uc2Uob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxSZXNwb25zZT4sIHVybD86IHN0cmluZykge1xuXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgY29uc3Qgb3JpZyA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmVzdWx0ID0gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25DYXRjaChlcnJvcik7XG4gICAgICB9KSxcbiAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vblJlc3VsdChyZXMpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgb25SZXN1bHQocmVzKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gMjAxKSB7XG4gICAgICByZXR1cm4gcmVzLl9ib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gIH1cblxuICBkb0dldChhcGk6IHN0cmluZywgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIC8vIHRoaXMucHJlTG9hZGVyU2VydmljZS51cGRhdGUodHJ1ZSk7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZ2V0KHVybCwgcmVxdWVzdE9wdGlvbnMpKTtcbiAgfVxuXG4gIGRvUG9zdChlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBlbmRwb2ludDtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBvc3QodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUHV0KGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wdXQodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUGF0aChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55LCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucGF0Y2godXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvRGVsZXRlKGFwaTogc3RyaW5nLCBwYXJhbXM6IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCB1cmxQYXJhbSA9IHVybCArICcvJyArIHBhcmFtcztcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZGVsZXRlKHVybFBhcmFtLCByZXF1ZXN0T3B0aW9ucyksIHVybFBhcmFtKTtcbiAgfVxuXG5cbiAgcmVxdWVzdCh1cmw6IHN0cmluZyB8IFJlcXVlc3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgb3B0aW9ucyA9IHRoaXMucmVxdWVzdEFyZ3Mob3B0aW9ucyk7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsUmVxdWVzdCA9IHVybC51cmw7XG4gICAgICB0aGlzLm9yaWdSZXF1ZXN0ID0gdXJsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVybFJlcXVlc3QgIT09IGVudmlyb25tZW50LkNPTkZJR19GSUxFKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLm9yaWdSZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgICBvcHRpb25zLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVybCA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmV0dXJuIHN1cGVyLnJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdEFyZ3Mob3B0aW9uczogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnNBcmdzIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIHB1YmxpYyBvbkNhdGNoKGVycm9yOiBhbnkpIHtcbiAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xuICAgICAgY2FzZSA0MDE6XG4gICAgICAgIGlmICghdGhpcy5pc1VuYXRob3VyaXplZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKDQwMSk7XG4gICAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDFcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVW5hdGhvdXJpemVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwMDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIC8vIHRoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwNDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIC8vdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwNFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgNDAwXCIpO1xuICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89MFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4vcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlPFQ+IHtcblxuICBwdWJsaWMgbW9kZWw6IFQ7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0bzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBfaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBUKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlQXV0bywgbW9kZWwpO1xuICB9O1xuICBkZWxldGUoaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZUF1dG8sIGlkKTtcbiAgfTtcblxuICBkb0dldChwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQocGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMudXJsU2VydmljZSArIHBhdGgpO1xuICAgIH1cbiAgfTtcblxuICBkb1Bvc3QocGF0aDogc3RyaW5nLCBtb2RlbD86IFQpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHBhdGgsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9O1xuICB9O1xuXG4gIGRvUHV0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHBhdGgsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH1cbiAgfTtcblxuICBkb0RlbGV0ZShwYXRoOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUocGF0aCwgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh0aGlzLnVybFNlcnZpY2UgKyBwYXRoLCBpZCk7XG4gICAgfTtcbiAgfTtcblxuICB1cGxvYWRJbWFnZShwYXRoLCBwYXJhbXM/OiBNYXA8YW55LCBhbnk+KTogYW55IHtcbiAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJy5jb25jYXQodGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSlcbiAgICB9O1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0gbmV3IEh0dHBIZWFkZXJzKGhlYWRlcik7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IGZvcm1kYXRhID0gdGhpcy5zZXRQYXJhbXNGb3JtZGF0YShwYXJhbXMpO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCgnUE9TVCcsIHBhdGgsIGZvcm1kYXRhLCB7XG4gICAgICBoZWFkZXJzOiBodHRwT3B0aW9ucyxcbiAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlLFxuICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCdcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faHR0cENsaWVudC5yZXF1ZXN0KHJlcSk7XG4gIH1cblxuXG4gIHNldFBhcmFtc0Zvcm1kYXRhKHBhcmFtczogTWFwPGFueSwgYW55PikgOiBGb3JtRGF0YXtcbiAgICBjb25zdCBmb3JtZGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBsZXQgcHJpbWVpcmFJdGVyYWNhbyA9IHRydWU7XG4gICAgcGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGZvcm1kYXRhLmFwcGVuZChrZXksIHZhbHVlICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1kYXRhO1xuICB9O1xuXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtczogTWFwPGFueSwgYW55Pik6IHN0cmluZyB7XG4gICAgbGV0IGZpbmFsID0gJyc7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpZiAocHJpbWVpcmFJdGVyYWNhbykge1xuICAgICAgICBmaW5hbCArPSAnPycgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgcHJpbWVpcmFJdGVyYWNhbyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWwgKz0gJyYnICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndXBwZXJjYXNlRmlyc3QnXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgVXBlcmNhc2VGaXJzdCBleHRlbmRzIFVwcGVyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHZhciB3b3JkcyA9IHRleHQudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB3b3Jkcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICBpZiAod29yZHNbYV0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICAgIHZhciB3ID0gd29yZHNbYV07XHJcbiAgICAgICAgICAgICAgd29yZHNbYV0gPSB3WzBdLnRvVXBwZXJDYXNlKCkgKyB3LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcclxuICAgIH1cclxuICB9IiwiZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9GTVQgPSAnZGQvTU0veXl5eSc7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9USU1FX0ZNVCA9IGAke0NvbnN0YW50cy5EQVRFX0ZNVH0gLSBoaDptbTpzcyBhYDtcclxuICB9IiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdkYXRlRm9ybWF0J1xyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfRk1UKTtcclxuICAgIH1cclxuICB9IiwiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2RhdGVUaW1lRm9ybWF0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICB2YXIgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoXCJlbi1VU1wiKTtcclxuICAgIHJldHVybiAgZGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9USU1FX0ZNVCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4vdXBwZXJjYXNlLWZpcnN0JztcclxuaW1wb3J0IHsgRGF0ZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtZm9ybWF0LnBpcGUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtdGltZS1mb3JtYXQucGlwZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlIF0sXHJcbiAgICBleHBvcnRzOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBpcGVNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGl0ZW1zOiBhbnlbXTtcbiAgQFZpZXdDaGlsZCgnY2hpbGRNZW51JykgcHVibGljIGNoaWxkTWVudTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkQ29tcG9uZW50KGNoaWxkKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnQoe2NvbXBvbmVudDogY2hpbGQubWVudVNvdXJjZS5jb21wb25lbnQsIGRhdGE6XCJcIn0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRBcHBNZW51SXRlbUNvbXBvbmVudF0sXG4gICBleHBvcnRzOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgXVxuICBcbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaGFzaF0nLFxyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIEhhc2hEaXJlY3RpdmUgIHtcclxuICAgIEBJbnB1dCgpIGhhc2g6IHN0cmluZztcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2Y1JlZjogVmlld0NvbnRhaW5lclJlZikge31cclxuICB9IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlzaWJsZUluUm9sZXNHdWFyZCB9IGZyb20gJy4uL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aG9yaXR5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIF9odHRwSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSkgeyB9XG5cbiAgYnVzY2FyQXV0aG9yaXRpZXMgKGNvZGlnb1Npc3RlbWEpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9odHRwSGVscGVyLmdldEFwaVNnaSgpICsgXCJwZXJtaXNzb2VzL2J1c2NhclBlcmZpbFNpc3RlbWEvP1wiO1xuICAgIGNvbnN0IHBhcmFtcyA9IFwiY29kaWdvU2lzdGVtYT1cIiArIGNvZGlnb1Npc3RlbWE7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZG9HZXQodXJsICsgcGFyYW1zKTtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBweHRDb25maWd1cmF0aW9uID0ge3N5c3RlbUlkOiAxMDQgLHN5c3RlbVByZXg6IFwiU0dFX05FV1wifVxyXG4gICIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aG9yaXR5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIlxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzaWJsZUluUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGh0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLCBwcml2YXRlIGF1dGhvcml0eVNlcnZpY2U6IEF1dGhvcml0eVNlcnZpY2UpIHsgfVxyXG4gIGNhbkFjdGl2YXRlKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgaWYgKHRva2VuICE9PSAndW5kZWZpbmVkJyAmJiB0b2tlbiAhPT0gJycgJiYgdG9rZW4gIT09IG51bGwpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKHRva2VuKTtcclxuICAgICAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1Yik7XHJcbiAgICAgICAgaWYgKHRva2VuQXV0aG9yaXRpZXMgPT09ICd1bmRlZmluZWQnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09ICcnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXV0aG9yaXR5U2VydmljZS5idXNjYXJBdXRob3JpdGllcyhweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1YiwgZGF0YS5hdXRob3JpdHkpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmh0dHBIZWxwZXIuZ2V0VXJsQXV0ZW50aWNhY2FvKCkgKyBcIj9lcnJvPTQwMVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gVW5kZWZpbmVkXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSwgICAgXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcENvbXBvbmVudCwgUHh0Q29udGVudEJvZHksIEhhc2hEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbUHh0QXBwQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbUHh0QXBwQ29tcG9uZW50U2VydmljZSwgUHh0SHR0cFNlcnZpY2UsIFxuICAgIFJlcXVlc3RCYXNlU2VydmljZSwgSHR0cEhlbHBlclNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsICAgICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFRva2VuU2VydmljZSxBdXRob3JpdHlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2FkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jb250ZW50LWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY29udGVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFkQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF0YTogYW55O1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyB0ZW1wbGF0ZUppdFVybCB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgSHR0cE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRDb250ZW50Q29tcG9uZW50XSxcbiAgIGV4cG9ydHM6IFtQeHRDb250ZW50Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dENvbnRlbnRDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50TW9kdWxlIHsgfVxuIiwiXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbiB7XHJcbiAgICBpY29uOiBTdHJpbmc7XHJcbiAgICBtZW51OiBTdHJpbmc7XHJcbiAgICBlbmFibGU6IEJvb2xlYW47XHJcbiAgICBlbnVtIDogTnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoaWNvbjogU3RyaW5nLCBtZW51OiBTdHJpbmcsIGVuYWJsZTogQm9vbGVhbiwgaWQgOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICAgICAgdGhpcy5lbnVtID0gaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIE9wdGlvbnNTdWJtZW51IHtcclxuICAgIFNBTFZBUiA9IDEsXHJcbiAgICBQRVNRVUlTQVIgPSAyLFxyXG4gICAgTElNUEFSID0gMyxcclxuICAgIE5PVk8gPSA0LFxyXG4gICAgVk9MVEFSPSA1LFxyXG4gICAgRVhDTFVJUj0gNlxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzU2F2ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNEZWxldGU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjb250cm9sbGVyPzogU3RyaW5nO1xuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2Uuc2F2ZSh0aGlzLm1vZGVsKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMuc3RhdHVzU2F2ZS5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBkZWxldGUoaWQpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5kZWxldGUoaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNEZWxldGUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBjbGVhcigpIHtcbiAgIHRoaXMubW9kZWwgPSB7fSBhcyBUO1xuICB9O1xuICBhZGQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdhZGQoKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcbiAgYmFjaygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2JhY2soKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcblxuICBidXR0b25zOiBQeHRCdXR0b25bXSA9IFtdO1xuICBlbmFibGVTYXZlID0gdHJ1ZTtcbiAgZW5hYmxlQmFjayA9IHRydWU7XG4gIGVuYWJsZUNsZWFyID0gdHJ1ZTtcbiAgZW5hYmxlU2VhcmNoID0gdHJ1ZTtcbiAgZW5hYmxlQWRkID0gdHJ1ZTtcbiAgZW5hYmxlRGVsZXRlID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX3B4dEFwcFNlcnZpY2U6IFB4dEFwcENvbXBvbmVudFNlcnZpY2UsIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZTxUPixwdWJsaWMgaGVscGVyOiAgSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwia2V5Ym9hcmRfYmFja3NwYWNlXCIsIFwiVk9MVEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlZPTFRBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJTQUxWQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuU0FMVkFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIk5PVk9cIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTk9WTykpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJMSU1QQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTElNUEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcInNlYXJjaFwiLCBcIlBFU1FVSVNBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5QRVNRVUlTQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiRVhDTFVJUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5FWENMVUlSKSk7XG5cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cmxTZXJ2aWNlID0gaGVscGVyLmdldEFwaSgpICsgdGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgdGhpcy5fc2VydmljZUJhc2UudXJsU2VydmljZUF1dG8gPSB0aGlzLnVybFNlcnZpY2UgO1xuICAgICAgY29uc29sZS5sb2codGhpcy51cmxTZXJ2aWNlKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTdWJtZW51c0NvbXBvbmVudCB9IGZyb20gJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBwcm92aWRlcnM6W1B4dEh0dHBTZXJ2aWNlLCBSZXF1ZXN0QmFzZVNlcnZpY2UsIEh0dHBIZWxwZXJTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c01vZHVsZSB7IH1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dERhdGVwaWNrZXJDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncHh0LWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFN0cmluZyA9IFwiRXNjb2xoYSB1bWEgZGF0YVwiO1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBpbnB1dERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGRhdGVNb2RlbDogRGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgZ2V0IGRhdGFTZWxlY2lvbmFkYSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGVNb2RlbDtcclxuICB9XHJcblxyXG4gIHNldCBkYXRhU2VsZWNpb25hZGEoZDogRGF0ZSkge1xyXG4gICAgaWYgKGQgIT09IHRoaXMuZGF0ZU1vZGVsKSB7XHJcbiAgICAgIHRoaXMuZGF0ZU1vZGVsID0gZDtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmRhdGVNb2RlbCA9IHZhbHVlO1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBvbkRhdGVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMud3JpdGVWYWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UoKTtcclxuICB9XHJcbiAgXHJcbn0iLCJcclxuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFB4dERhdGVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1B4dERhdGVwaWNrZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVQaWNrZXJNb2R1bGUge1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXVwbG9hZC1maWxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQE91dHB1dCgpIGZpbGVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgYXJyYXlJbWFnZXM6IEZpbGVSZWFkZXI7XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgb25DaGFuZ2VJbWFnZW0oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgaW1hZ2VtOiBGaWxlID0gZXZlbnQ7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gaW1hZ2VtLm5hbWU7XG4gICAgICByZXR1cm4gdGhpcy5maWxlU2VsZWN0ZWQubmV4dChpbWFnZW0pO1xuICAgIH1cblxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRVcGxvYWRGaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50cyA6IFtQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEdhbGxlcnlPcHRpb25zLCBOZ3hHYWxsZXJ5SW1hZ2UsIE5neEdhbGxlcnlBbmltYXRpb24gfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1nYWxsZXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGdhbGxlcnlPcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9uc1tdO1xuICBASW5wdXQoKSBnYWxsZXJ5SW1hZ2VzOiBOZ3hHYWxsZXJ5SW1hZ2VbXTtcbiAgQElucHV0KCkgd2lkdGg6IGFueSA9IFwiMTAwJVwiO1xuICBASW5wdXQoKSBoZWlnaHQ6IGFueSA9ICc0MDBweCc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5nYWxsZXJ5T3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHRodW1ibmFpbHNDb2x1bW5zOiA0LFxuICAgICAgICBpbWFnZUFuaW1hdGlvbjogTmd4R2FsbGVyeUFuaW1hdGlvbi5TbGlkZVxuICAgICAgfSxcbiAgICAgIC8vIG1heC13aWR0aCA4MDBcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogODAwLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgaW1hZ2VQZXJjZW50OiA4MCxcbiAgICAgICAgdGh1bWJuYWlsc1BlcmNlbnQ6IDIwLFxuICAgICAgICB0aHVtYm5haWxzTWFyZ2luOiAyMCxcbiAgICAgICAgdGh1bWJuYWlsTWFyZ2luOiAyMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNDAwLFxuICAgICAgICBwcmV2aWV3OiBmYWxzZVxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0R2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU1vZHVsZSB9IGZyb20gJ25neC1nYWxsZXJ5JztcbmltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdGVyaWFsQW5ndWxhck1vZHVsZSwgTmd4R2FsbGVyeU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0R2FsbGVyeUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dEdhbGxlcnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dEdhbGxlcnlNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQU1FLFlBQW1CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENB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