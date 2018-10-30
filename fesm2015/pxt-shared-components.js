import { Directive, ViewContainerRef, Injectable, ChangeDetectorRef, Component, Input, ViewChild, ComponentFactoryResolver, Inject, NgModule, Injector, Pipe, EventEmitter, Output, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, forwardRef, HostListener, defineInjectable } from '@angular/core';
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
import { Headers, Http, RequestOptions, XHRBackend, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
                template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button style=\"z-index: 1;\" (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <img [src]=\"urlImg\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{system | uppercaseFirst}}</h1>\n    <h1 class=\"system\" *ngIf=\"!mobileQuery.matches\">{{menuSelected | uppercaseFirst}}</h1>\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button [matMenuTriggerFor]=\"notification\"><mat-icon>notifications</mat-icon> </button>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    <mat-menu #notification=\"matMenu\" [overlapTrigger]=\"false\">\n        <span disabled mat-menu-item><small>Sem novas notifica\u00E7\u00F5es</small></span>\n      </mat-menu>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <span disabled mat-menu-item *ngIf=\"usuerLogged\" ><small>Ol\u00E1, {{usuerLogged | uppercaseFirst}}</small></span>\n      <button mat-menu-item>\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [mode]=\"'over'\" [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n      <span *ngFor=\"let item of menus\">\n        <!-- Handle branch node menu items -->\n        <span *ngIf=\"item.childs && item.childs.length > 0\">\n          <button mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <pxt-app-menu-item #menu [items]=\"item.childs\"></pxt-app-menu-item>\n        </span>\n        <!-- Handle leaf node menu items -->\n        <span *ngIf=\"!item.childs || item.childs.length === 0\">\n          <button *ngIf=\"item.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"selectItemMenu(item)\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <button *ngIf=\"item.menuType=='group'\" mat-menu-item color=\"primary\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n        </span>\n      </span>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n\n</div>",
                styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}.form{margin-left:10px;border:2px solid #d3d3d3;width:600px;padding-left:5px;margin-top:10px}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}pxt-input{width:100%;height:100%}"]
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
     * @return {?}
     */
    getFrontSgi() {
        return this.configService.getConfiguration('FRONT', 'SGI');
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
class PxtDialogComponent {
    /**
     * @param {?} fb
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    cancelation() {
        this.dialogRef.close(false);
    }
    /**
     * @return {?}
     */
    confirmation() {
        this.dialogRef.close(true);
    }
}
PxtDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pxt-dialog',
                template: "<div class=\"example-container\">\n    <mat-card>\n        <h2 mat-dialog-title>{{data.titleDialog}}</h2>\n        <mat-dialog-content>\n            {{data.contentDialog}}\n        </mat-dialog-content>\n        <mat-dialog-actions>\n            <button mat-button (click)=\"confirmation()\">Confirmar</button>\n            <button mat-button mat-dialog-close>Cancelar</button>\n        </mat-dialog-actions>\n    </mat-card>\n</div>",
                styles: [".example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}::ng-deep .mat-dialog-container{padding:0!important;max-height:inherit}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}"]
            }] }
];
/** @nocollapse */
PxtDialogComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
PxtDialogComponent.propDecorators = {
    placeholder: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ErrorService {
    constructor() {
        this.errorMessage = "";
    }
}
ErrorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ErrorService.ctorParameters = () => [];
/** @nocollapse */ ErrorService.ngInjectableDef = defineInjectable({ factory: function ErrorService_Factory() { return new ErrorService(); }, token: ErrorService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Handles HttpClient errors
 */
class HttpErrorHandler {
    /**
     * @param {?} errorService
     */
    constructor(errorService) {
        this.errorService = errorService;
        /**
         * Create handleError function that already knows the service name
         */
        this.createHandleError = (serviceName = '') => (operation = 'operation', result = /** @type {?} */ ({})) => this.handleError(serviceName, operation, result);
    }
    /**
     * @template T
     * @param {?=} serviceName
     * @param {?=} operation
     * @param {?=} result
     * @return {?}
     */
    handleError(serviceName = '', operation = 'operation', result = /** @type {?} */ ({})) {
        return (error) => {
            // Todo -> Send the error to remote logging infrastructure
            console.error(error);
            /** @type {?} */
            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `{error code: ${error.status}, body: "${error.message}"}`;
            // Todo -> Transforming error for user consumption
            this.errorService.errorMessage = `${serviceName} -> ${operation} failed.\n  Message: ${message}`;
            // -> Return a safe result.
            return of(result);
        };
    }
}
HttpErrorHandler.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpErrorHandler.ctorParameters = () => [
    { type: ErrorService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtHttpService extends Http {
    /**
     * @param {?} backend
     * @param {?} options
     * @param {?} injector
     * @param {?} urlHelper
     * @param {?} dialog
     * @param {?} tokenService
     * @param {?} httpErrorHandler
     */
    constructor(backend, options, injector, urlHelper, dialog, tokenService, httpErrorHandler) {
        super(backend, options);
        this.backend = backend;
        this.injector = injector;
        this.urlHelper = urlHelper;
        this.dialog = dialog;
        this.tokenService = tokenService;
        this.httpErrorHandler = httpErrorHandler;
        this.isUnathourized = false;
        this.handleError = httpErrorHandler.createHandleError('CustomerService');
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
        headers.append("Cache-Control", "no-cache");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Credentials", "true");
        headers.append("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
        headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
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
        result = observable.pipe(
        // catchError(this.handleError('addCustomer', null)),
        catchError((error) => {
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
        console.log(res);
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
    }
    /**
     * @param {?} erro
     * @return {?}
     */
    openDialog(erro) {
        /** @type {?} */
        var contentDialog = "Você será redirecionado a tela de autenticação!";
        /** @type {?} */
        let dialogRef = this.dialog.open(PxtDialogComponent, {
            width: '600px',
            panelClass: 'pxt-dialog',
            data: { titleDialog: "Erro - " + erro, contentDialog: contentDialog }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(this.urlHelper.getFrontSgi());
            window.location.href = this.urlHelper.getFrontSgi() + "?erro=" + erro;
        });
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
    { type: HttpHelperService },
    { type: MatDialog },
    { type: TokenService },
    { type: HttpErrorHandler }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @param {?=} params
     * @return {?}
     */
    doGet(path, params) {
        /** @type {?} */
        let url;
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
        if (path.indexOf('http') <= -1) {
            path = this.urlService + path;
        }
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
class ControllerPipe {
    /**
     * @param {?} text
     * @param {?=} args
     * @return {?}
     */
    transform(text, args) {
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
    }
}
ControllerPipe.decorators = [
    { type: Pipe, args: [{
                name: 'controllerPipe'
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
                declarations: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe, ControllerPipe],
                exports: [UpercaseFirst, DateFormatPipe, DateTimeFormatPipe, ControllerPipe]
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
class InterceptService {
    constructor() { }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        // modify request
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('MY_TOKEN')}`
            }
        });
        console.log("----request----");
        console.log(request);
        console.log("--- end of request---");
        return next.handle(request)
            .pipe(tap(event => {
            if (event instanceof HttpResponse) {
                console.log(" all looks good");
                // http response status code
                console.log(event.status);
            }
        }, error => {
            // http response status code
            console.log("----response----");
            console.error("status code:");
            console.error(error.status);
            console.error(error.message);
            console.log("--- end of response---");
        }));
    }
    ;
}
InterceptService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InterceptService.ctorParameters = () => [];

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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtInputField {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtCheckboxField {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtDateField {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtFilterField {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtRadioButtonField {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtSelectField {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtfilterCustomField {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtContentComponent {
    /**
     * @param {?} fb
     */
    constructor(fb) {
        this.fb = fb;
        this.fields = [];
        this.cols = 5;
        this.colsInitial = 5;
        this.submit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get value() {
        return this.form.value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.field != undefined) {
            Object.keys(this.field).forEach(key => {
                switch (this.field[key].constructor.name) {
                    //FilterCustom
                    case pxtfilterCustomField.name:
                        /** @type {?} */
                        var instanceFilterCustom = /** @type {?} */ (this.field[key]);
                        instanceFilterCustom.type = 'filter';
                        this.fields.push(instanceFilterCustom);
                        break;
                    //Input
                    case pxtInputField.name:
                        /** @type {?} */
                        var instanceInput = /** @type {?} */ (this.field[key]);
                        instanceInput.type = 'input';
                        this.fields.push(instanceInput);
                        break;
                    //Checkbox
                    case pxtCheckboxField.name:
                        /** @type {?} */
                        var instanceCheck = /** @type {?} */ (this.field[key]);
                        instanceCheck.type = 'checkbox';
                        this.fields.push(instanceCheck);
                        break;
                    //Date
                    case pxtDateField.name:
                        /** @type {?} */
                        var instanceDate = /** @type {?} */ (this.field[key]);
                        instanceDate.type = 'date';
                        this.fields.push(instanceDate);
                        break;
                    //Filter
                    case pxtFilterField.name:
                        /** @type {?} */
                        var instanceFilter = /** @type {?} */ (this.field[key]);
                        instanceFilter.type = 'filter';
                        this.fields.push(instanceFilter);
                        break;
                    //RadioButton
                    case pxtRadioButtonField.name:
                        /** @type {?} */
                        var instanceRadio = /** @type {?} */ (this.field[key]);
                        instanceRadio.type = 'radio';
                        this.fields.push(instanceRadio);
                        break;
                    //Select
                    case pxtSelectField.name:
                        /** @type {?} */
                        var instanceSelect = /** @type {?} */ (this.field[key]);
                        instanceSelect.type = 'select';
                        this.fields.push(instanceSelect);
                        break;
                    default:
                        break;
                }
            });
        }
        this.onResize();
        this.colsInitial = this.cols;
        this.form = this.createControl();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.form.valid) {
            this.submit.emit(this.form.value);
        }
        else {
            this.validateAllFormFields(this.form);
        }
    }
    /**
     * @return {?}
     */
    createControl() {
        /** @type {?} */
        const group = this.fb.group({});
        this.fields.forEach(field => {
            if (field.type === "button")
                return;
            /** @type {?} */
            const control = this.fb.control({ value: field.value, disabled: field.disabled }, this.bindValidations(field.validations || []));
            group.addControl(field.name, control);
        });
        return group;
    }
    /**
     * @param {?} validations
     * @return {?}
     */
    bindValidations(validations) {
        if (validations.length > 0) {
            /** @type {?} */
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }
    /**
     * @param {?} formGroup
     * @return {?}
     */
    validateAllFormFields(formGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            /** @type {?} */
            const control = formGroup.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    onResize(event) {
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
    }
}
PxtContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-content-body',
                template: "<mat-card class=\"pxt-mat-card\">\n    <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\" (window:resize)=\"onResize($event)\">\n            <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n                <div>\n                <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n                    <ng-container class=\"pxt-style\" dynamicField [field]=\"field\" [group]=\"form\">\n                    </ng-container>\n                </mat-grid-tile>\n                <mat-grid-tile class=\"mat-grid-tile-content\">\n                </mat-grid-tile>\n            </div>\n            </mat-grid-list>\n        </form>\n    </div>\n    <div *ngIf=\"!auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\" (window:resize)=\"onResize($event)\">\n                <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n                        <ng-content></ng-content>\n                </mat-grid-list>\n        </form>\n    </div>\n</mat-card>",
                styles: [".pxt-content-body{padding:10px}.pxt-content-body mat-card{margin:5px;border-top:4px solid;border-radius:4px;border-bottom:4px solid}mat-form-field,pxt-datepicker,select-filial,td{width:100%}.btn-input-file{position:absolute;right:0;bottom:0}.div-imagem-cardapio{margin-bottom:2%;text-align:center}.pxt-component-tag{width:100%}.pxt-style{width:100%;height:100%}::ng-deep .mat-grid-tile .mat-figure{right:15px!important}.pxt-mat-card{padding:10px!important}"]
            }] }
];
/** @nocollapse */
PxtContentComponent.ctorParameters = () => [
    { type: FormBuilder }
];
PxtContentComponent.propDecorators = {
    data: [{ type: Input }],
    auto: [{ type: Input }],
    fields: [{ type: Input }],
    cols: [{ type: Input }],
    field: [{ type: Input }],
    submit: [{ type: Output }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtInputComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
PxtInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-input',
                template: "<mat-form-field  [formGroup]=\"group\" > \n  <input matInput [formControlName]=\"field.name\" [placeholder]=\"field.label | uppercaseFirst\"  size=\"10\" [type]=\"field.inputType\">\n</mat-form-field>",
                styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
PxtInputComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtButtonComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
PxtButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-button',
                template: "<div class=\"demo-full-width margin-top\" [formGroup]=\"group\">\n  <button type=\"submit\" mat-button color=\"primary\">{{field.label | uppercaseFirst}}</button>\n</div>",
                styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
PxtButtonComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtDateComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
PxtDateComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-date',
                template: "<mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n  <input matInput [matDatepicker]=\"picker\" [formControlName]=\"field.name\" [placeholder]=\"field.label | uppercaseFirst \">\n  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n  <mat-hint></mat-hint>\n  <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n    <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n  </ng-container>\n</mat-form-field>",
                styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
PxtDateComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtCheckboxComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
PxtCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-checkbox',
                template: "<div class=\"demo-full-width\" [formGroup]=\"group\">\n  <mat-checkbox [formControlName]=\"field.name\" color=\"primary\"  >{{field.label | uppercaseFirst }}</mat-checkbox>\n</div>",
                styles: [":host{width:100%;height:100%;padding-top:13%}mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
PxtCheckboxComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtRadiobuttonComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
PxtRadiobuttonComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-radiobutton',
                template: "<div class=\"demo-full-width\" [formGroup]=\"group\">\n  <label class=\"radio-label-padding\">{{field.label | uppercaseFirst}}:</label>\n  <mat-radio-group [formControlName]=\"field.name\" color=\"primary\" >\n    <mat-radio-button color=\"primary\"  *ngFor=\"let item of field.options\" [value]=\"item\">{{item}}</mat-radio-button>\n  </mat-radio-group>\n</div>",
                styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
PxtRadiobuttonComponent.ctorParameters = () => [];

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
    useExisting: forwardRef(() => PxtSelectComponent),
    multi: true
};
class PxtSelectComponent {
    /**
     * @param {?} pxthttp
     */
    constructor(pxthttp) {
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
    ngOnChanges(changes) {
        if (changes["params"] != undefined && !changes["params"].firstChange) {
            this.params = changes["params"].currentValue;
            this.find();
        }
    }
    /**
     * @return {?}
     */
    get selectedOption() {
        return this.option;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} f
     * @return {?}
     */
    set selectedOption(f) {
        if (f != undefined) {
            if (f !== this.option) {
                this.option = f;
                this.onChangeCallback(f.codigo);
                this.selectionChange.emit(this.option);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.option = value;
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
        if (this.model != undefined) {
            this.controller = this.model.constructor.name;
            this.field = this.model;
            this.auto = false;
        }
        else if (this.field != undefined && this.field.className != undefined) {
            this.controller = this.field.className.name;
            this.auto = true;
        }
    }
    ;
    /**
     * @return {?}
     */
    find() {
        if (this.controller != undefined) {
            this.pxthttp.doGet(this.controller, this.params).subscribe(result => {
                if (this.auto) {
                    this.field.options = result;
                }
                else {
                    this.options = result;
                }
            });
        }
    }
    ;
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.find();
    }
    ;
}
PxtSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-select',
                template: "\n\n<mat-form-field *ngIf=\"auto\" class=\"demo-full-width\" [formGroup]=\"group\">\n  <mat-select [placeholder]=\"field.label | uppercaseFirst\" [formControlName]=\"field.name\"  >\n    <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n    <mat-option *ngFor=\"let item of field.options\" [value]=\"item.identificador\">{{item.codigo +' - '+item.descricao}}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<mat-form-field *ngIf=\"!auto\" class=\"demo-full-width\">\n    <mat-select placeholder=\"{{ placeholder }}\" required=\"{{required}}\" [(ngModel)]=\"selectedOption\">\n      <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n      <mat-option *ngFor=\"let option of options\" [value]=\"option\">\n        {{ option.codigo + ' - ' + option.descricao }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>",
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
PxtSelectComponent.ctorParameters = () => [
    { type: RequestBaseService }
];
PxtSelectComponent.propDecorators = {
    required: [{ type: Input }],
    placeholder: [{ type: Input }],
    model: [{ type: Input }],
    params: [{ type: Input }],
    selectionChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtDialogFilterComponent {
    /**
     * @param {?} fb
     * @param {?} dialogRef
     * @param {?} data
     * @param {?} helper
     * @param {?} http
     */
    constructor(fb, dialogRef, data, helper, http) {
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
    /**
     * @return {?}
     */
    get value() {
        return this.form.value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.auto = this.data.auto;
        if (this.auto) {
            this.field = this.data.filters;
            Object.keys(this.field).forEach(key => {
                switch (this.field[key].constructor.name) {
                    case pxtfilterCustomField.name:
                        /** @type {?} */
                        var instanceFilterCustom = /** @type {?} */ (this.field[key]);
                        instanceFilterCustom.type = 'filter';
                        this.fields.push(instanceFilterCustom);
                        this.fieldsHist.push(instanceFilterCustom);
                        break;
                    //Input
                    case pxtInputField.name:
                        /** @type {?} */
                        var instanceInput = /** @type {?} */ (this.field[key]);
                        instanceInput.type = 'input';
                        this.fields.push(instanceInput);
                        this.fieldsHist.push(instanceInput);
                        break;
                    //Checkbox
                    case pxtCheckboxField.name:
                        /** @type {?} */
                        var instanceCheck = /** @type {?} */ (this.field[key]);
                        instanceCheck.type = 'checkbox';
                        this.fields.push(instanceCheck);
                        this.fieldsHist.push(instanceCheck);
                        break;
                    //Date
                    case pxtDateField.name:
                        /** @type {?} */
                        var instanceDate = /** @type {?} */ (this.field[key]);
                        instanceDate.type = 'date';
                        this.fields.push(instanceDate);
                        this.fieldsHist.push(instanceDate);
                        break;
                    //Filter
                    case pxtFilterField.name:
                        /** @type {?} */
                        var instanceFilter = /** @type {?} */ (this.field[key]);
                        instanceFilter.type = 'filter';
                        this.fields.push(instanceFilter);
                        this.fieldsHist.push(instanceFilter);
                        break;
                    //RadioButton
                    case pxtRadioButtonField.name:
                        /** @type {?} */
                        var instanceRadio = /** @type {?} */ (this.field[key]);
                        instanceRadio.type = 'radio';
                        this.fields.push(instanceRadio);
                        this.fieldsHist.push(instanceRadio);
                        break;
                    //Select
                    case pxtSelectField.name:
                        /** @type {?} */
                        var instanceSelect = /** @type {?} */ (this.field[key]);
                        instanceSelect.type = 'select';
                        this.fields.push(instanceSelect);
                        this.fieldsHist.push(instanceSelect);
                        break;
                }
            });
            this.fields.sort((a, b) => {
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
            this.fieldsHist.sort((a, b) => {
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
    }
    /**
     * @return {?}
     */
    cancelation() {
        this.dialogRef.close(undefined);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    confirmation(event) {
        this.dialogRef.close(true);
    }
    /**
     * @return {?}
     */
    search() {
        /** @type {?} */
        let params = new Map();
        debugger;
        if (this.data.auto != undefined && this.data.auto) {
            if (this.form.value !== undefined) {
                Object.keys(this.form.value).forEach(key => {
                    if (this.form.value[key] != undefined) {
                        params.set(key, this.form.value[key]);
                    }
                });
            }
            this.http.doGet(this.controller, params).subscribe(result => {
                this.dataSource.data = result;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        }
        else {
            if (this.filter.code != undefined && this.filter.code != 0 && this.filter.code != "") {
                params.set("codigo", this.filter.code);
            }
            if (this.filter.description != undefined && this.filter.description != "") {
                params.set("descricao", this.filter.description);
            }
            this.http.doGet(this.controller, params).subscribe(result => {
                this.dataSource.data = result;
            });
        }
    }
    ;
    /**
     * @param {?} row
     * @return {?}
     */
    selectRow(row) {
        this.dialogRef.close(row);
    }
    ;
    /**
     * @return {?}
     */
    createControl() {
        /** @type {?} */
        const group = this.fb.group({});
        this.fields.forEach(field => {
            if (field.type === "button")
                return;
            /** @type {?} */
            const control = this.fb.control({ value: field.value, disabled: field.disabled }, this.bindValidations(field.validations || []));
            group.addControl(field.name, control);
        });
        return group;
    }
    ;
    /**
     * @param {?} validations
     * @return {?}
     */
    bindValidations(validations) {
        if (validations.length > 0) {
            /** @type {?} */
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }
    ;
    /**
     * @param {?} formGroup
     * @return {?}
     */
    validateAllFormFields(formGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            /** @type {?} */
            const control = formGroup.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }
    ;
    /**
     * @return {?}
     */
    close() {
        this.dialogRef.close(undefined);
    }
    ;
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
PxtDialogFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-dialog-filter',
                template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <div *ngIf=\"!auto\">\n          <mat-grid-list class=\"mat-grid-tile-content\" [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile [colspan]='1'>\n              <mat-form-field>\n                <input type=\"number\" matInput placeholder=\"Codigo\" [(ngModel)]=\"filter.code\">\n              </mat-form-field>\n            </mat-grid-tile>\n            <mat-grid-tile  class=\"mat-grid-tile-content\" [colspan]='1'>\n              <mat-form-field>\n                <input matInput placeholder=\"Descri\u00E7\u00E3o\" [(ngModel)]=\"filter.description\">\n              </mat-form-field>\n            </mat-grid-tile>\n          </mat-grid-list>\n      </div>\n\n      <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\">\n          <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n              <ng-container dynamicFieldDialog [field]=\"field\" [group]=\"form\">\n              </ng-container>\n            </mat-grid-tile>\n            <mat-grid-tile class=\"mat-grid-tile-content\">\n            </mat-grid-tile>\n          </mat-grid-list>\n        </form>\n      </div>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n\n          <ng-container *ngFor=\"let column of displayedColumns\" [matColumnDef]=\"column\">\n              <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> {{column}} </mat-header-cell>\n              <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\">{{item[column]}} </mat-cell>\n            </ng-container>\n        <!--\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n             -->\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n \n      </mat-table>\n   \n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}mat-form-field{width:100%;height:100%}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}"]
            }] }
];
/** @nocollapse */
PxtDialogFilterComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: HttpHelperService },
    { type: RequestBaseService }
];
PxtDialogFilterComponent.propDecorators = {
    paginator: [{ type: ViewChild, args: [MatPaginator,] }],
    sort: [{ type: ViewChild, args: [MatSort,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtInputFilterComponent {
    /**
     * @param {?} dialog
     */
    constructor(dialog) {
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
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.field != undefined) {
            this.value = this.field.value;
        }
    }
    /**
     * @return {?}
     */
    openFilter() {
        if (this.field != undefined && this.field.filters != undefined) {
            this.auto = true;
            /** @type {?} */
            let dialogRef = this.dialog.open(PxtDialogFilterComponent, {
                width: '600px',
                panelClass: 'pxt-dialog',
                data: { auto: this.auto, filters: this.field.filters, controller: this.field.className, titleDialog: "Selecione: ( " + this.field.className + " )" }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    this.field.value = result.codigo;
                }
            });
        }
        else {
            /** @type {?} */
            let dialogRef = this.dialog.open(PxtDialogFilterComponent, {
                width: '600px',
                panelClass: 'pxt-dialog',
                data: { controller: this.className, displayedColumns: this.displayedColumns, titleDialog: "Selecione: ( " + this.className + " )" }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    this.value = result[this.displayedColumns[1]];
                    this.onValueCallback.emit(result);
                }
            });
        }
    }
}
PxtInputFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-input-filter',
                template: "<!--\n<mat-grid-list cols=\"6\" rowHeight=\"5:3\">\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='5'>\n    <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" disabled=\"isDisabled\">\n      <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n      <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n        <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n      </ng-container>\n    </mat-form-field>\n  </mat-grid-tile>\n\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='1'>\n    <button mat-icon-button>\n      <mat-icon (click)=\"openFilter()\">search</mat-icon>\n    </button>\n  </mat-grid-tile>\n\n</mat-grid-list>\n-->\n<div *ngIf=\"this.field != undefined\">\n  <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label | uppercaseFirst\" size=\"10\"\n      [type]=\"field.inputType\">\n    <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n      <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n    </ng-container>\n  </mat-form-field>\n</div>\n\n<div *ngIf=\"this.field == undefined\">\n  <mat-form-field class=\"demo-full-width\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [placeholder]=\"placeholder | uppercaseFirst\" size=\"10\" disabled=\"true\" [(ngModel)]=\"value\">\n  </mat-form-field>\n</div>",
                styles: ["mat-form-field{width:100%;height:100%}.btn-input-file{position:absolute;right:0;bottom:0}:host{width:100%;height:100%}.pxt-dialog .mat-dialog-container{padding:0!important}::ng-deep .mat-dialog-container{padding:0!important}"]
            }] }
];
/** @nocollapse */
PxtInputFilterComponent.ctorParameters = () => [
    { type: MatDialog }
];
PxtInputFilterComponent.propDecorators = {
    className: [{ type: Input }],
    placeholder: [{ type: Input }],
    displayedColumns: [{ type: Input }],
    onValueCallback: [{ type: Output }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const componentMapper = {
    input: PxtInputComponent,
    button: PxtButtonComponent,
    date: PxtDateComponent,
    select: PxtSelectComponent,
    radiobutton: PxtRadiobuttonComponent,
    checkbox: PxtCheckboxComponent,
    filter: PxtInputFilterComponent,
};
class DynamicFieldDirective {
    /**
     * @param {?} resolver
     * @param {?} container
     */
    constructor(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}
DynamicFieldDirective.decorators = [
    { type: Directive, args: [{
                selector: "[dynamicField]"
            },] }
];
/** @nocollapse */
DynamicFieldDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef }
];
DynamicFieldDirective.propDecorators = {
    field: [{ type: Input }],
    group: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtInputModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtButtonModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtDateModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtSelectModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtRadiobuttonModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtCheckboxModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const componentMapper$1 = {
    input: PxtInputComponent,
    button: PxtButtonComponent,
    date: PxtDateComponent,
    select: PxtSelectComponent,
    radiobutton: PxtRadiobuttonComponent,
    checkbox: PxtCheckboxComponent,
    filter: PxtInputFilterComponent,
};
class DynamicFieldDirectiveDialog {
    /**
     * @param {?} resolver
     * @param {?} container
     */
    constructor(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(componentMapper$1[this.field.type]);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}
DynamicFieldDirectiveDialog.decorators = [
    { type: Directive, args: [{
                selector: "[dynamicFieldDialog]"
            },] }
];
/** @nocollapse */
DynamicFieldDirectiveDialog.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef }
];
DynamicFieldDirectiveDialog.propDecorators = {
    field: [{ type: Input }],
    group: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
const ɵ0$1 = {}, ɵ1 = { hasBackdrop: true };
class PxtDialogFilterModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtInputFilterModule {
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
     * @param {?} notificationService
     */
    constructor(_pxtAppService, _serviceBase, helper, notificationService) {
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
        setTimeout(() => {
            debugger;
            this.urlService = helper.getApi() + new ControllerPipe().transform(this.model.constructor.name);
            this._serviceBase.urlServiceAuto = this.urlService;
        }, 100);
    }
    /**
     * @return {?}
     */
    save() {
        if (this.validationModel()) {
            this._serviceBase.save(this.model).subscribe(result => {
                this.statusSave.emit(result);
            });
        }
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
    /**
     * @return {?}
     */
    validationModel() {
        if (Object.keys(this.model).length > 0) {
            Object.keys(this.model).forEach(key => {
                if (this.model[key] != undefined && this.model[key] != "") {
                    this.notificationService.error("Campo Obrigatório", key.toString().toLocaleUpperCase());
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
    }
    ;
}
PxtSubmenusComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-submenus',
                template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"delete(0)\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu | uppercaseFirst}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                styles: [".btn-input-file{position:absolute;right:0;bottom:0}"]
            }] }
];
/** @nocollapse */
PxtSubmenusComponent.ctorParameters = () => [
    { type: PxtAppComponentService },
    { type: RequestBaseService },
    { type: HttpHelperService },
    { type: ToastrService }
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
const noop$1 = () => {
};
/** @type {?} */
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PxtDatepickerComponent),
    multi: true
};
class PxtDatepickerComponent {
    constructor() {
        this.placeholder = "Escolha uma data";
        this.inputDisabled = false;
        this.onChange = new EventEmitter();
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
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
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1],
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
class PxtDialogModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtFilterComponent {
    /**
     * @param {?} fb
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
PxtFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pxt-filter',
                template: "<h2 mat-dialog-title>{{data.titleDialog}}</h2>\n\n<mat-dialog-content>\n\n  <mat-form-field>\n    <ng-content>\n\n    </ng-content>\n  </mat-form-field>\n\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button>Confirmar</button>\n  <button mat-button>Cancelar</button>\n</mat-dialog-actions>",
                styles: [""]
            }] }
];
/** @nocollapse */
PxtFilterComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtFilterModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtDialogFilterCustomComponent {
    /**
     * @param {?} fb
     * @param {?} dialogRef
     * @param {?} data
     * @param {?} http
     */
    constructor(fb, dialogRef, data, http) {
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    search() {
        /** @type {?} */
        let params = new Map();
        if (this.filters !== undefined) {
            Object.keys(this.filters).forEach(key => {
                if (this.filters[key] != undefined) {
                    params.set(key, this.filters[key]);
                }
            });
        }
        this.http.doGet(this.model.constructor.name, params).subscribe(result => {
            this.dataSource.data = result;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    ;
    /**
     * @param {?} row
     * @return {?}
     */
    selectRow(row) {
        this.dialogRef.close(row);
    }
    ;
    /**
     * @return {?}
     */
    close() {
        this.dialogRef.close(undefined);
    }
    ;
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
PxtDialogFilterCustomComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-dialog-filter-custom',
                template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\">\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <ng-content></ng-content>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n      </mat-table>\n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}::ng-deep .mat-dialog-container{padding:0!important;max-height:inherit}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}mat-form-field{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
PxtDialogFilterCustomComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: RequestBaseService }
];
PxtDialogFilterCustomComponent.propDecorators = {
    filters: [{ type: Input }],
    model: [{ type: Input }],
    paginator: [{ type: ViewChild, args: [MatPaginator,] }],
    sort: [{ type: ViewChild, args: [MatSort,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
const ɵ0$3 = {}, ɵ1$1 = { hasBackdrop: true };
class PxtDialogFilterCustomModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtFilterMatTableComponent {
    constructor() {
        this.dataSource = new MatTableDataSource();
        this.placeholder = "";
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
    ngOnInit() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    add(event) {
        /** @type {?} */
        const input = event.input;
        /** @type {?} */
        const value = event.value;
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
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    applyFilter(filter) {
        filter = filter.trim();
        filter = filter.toLowerCase();
        this.dataSource.filter = filter;
    }
    /**
     * @param {?} fruit
     * @return {?}
     */
    remove(fruit) {
        /** @type {?} */
        const index = this.filters.indexOf(fruit);
        if (index >= 0) {
            this.filters.splice(index, 1);
        }
        this.applyFilter('');
    }
    /**
     * @return {?}
     */
    configureFilterPredicate() {
        this.dataSource.filterPredicate = (row, event) => (row.codigo.toString().indexOf(event) >= 0 ||
            row.nomeImagem.toString().indexOf(event) >= 0);
    }
}
PxtFilterMatTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-filter-mat-table',
                template: "<mat-card class=\"card-filter\" >\n    <div class=\"filters\">\n        <mat-form-field class=\"example-chip-list\">\n            <mat-chip-list #chipList>\n              <mat-chip *ngFor=\"let filter of filters\" [selectable]=\"selectable\"\n                       [removable]=\"removable\" (removed)=\"remove(filter)\">\n                {{filter.name}}\n                <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon>\n              </mat-chip>\n              <input placeholder=\"placeholder\"\n                     [matChipInputFor]=\"chipList\"\n                     [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n                     [matChipInputAddOnBlur]=\"addOnBlur\"\n                     (matChipInputTokenEnd)=\"add($event)\">\n            </mat-chip-list>\n          </mat-form-field>\n    </div>\n  </mat-card >",
                styles: [".card-filter{padding:initial!important}.filters{font-size:16px;padding-left:10px;padding-right:10px}mat-form-field{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
PxtFilterMatTableComponent.ctorParameters = () => [];
PxtFilterMatTableComponent.propDecorators = {
    dataSource: [{ type: Input }],
    placeholder: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PxtFilterMatTableModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class pxtFields {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const pxtEnumTagHtml = {
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

export { PxtAppModule, PxtAppComponent, PxtContentModule, PxtContentComponent, MaterialAngularModule, PxtSubmenusModule, PxtSubmenusComponent, PxtDatePickerModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1 as CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, PxtDatepickerComponent, PxtDialogModule, PxtDialogComponent, PxtFilterModule, PxtFilterComponent, PxtDialogFilterCustomModule, PxtDialogFilterCustomComponent, PxtSelectModule, PipeModule, PxtInputFilterModule, PxtInputFilterComponent, PxtFilterMatTableModule, ControllerPipe, PxtAppComponentService, PxtHttpService, ConfigService, HttpHelperService, RequestBaseService, VisibleInRolesGuard, AuthorityService, pxtConfiguration, pxtFields, pxtEnumTagHtml, PxtUploadFileModule, PxtGalleryModule, PxtGalleryComponent, pxtCheckboxField, pxtfilterCustomField, pxtDateField, pxtFilterField, pxtInputField, pxtRadioButtonField, pxtSelectField, HashDirective as ɵg, DynamicFieldDirective as ɵba, DynamicFieldDirectiveDialog as ɵz, PxtContentBody as ɵf, PxtAppMenuItemComponent as ɵe, PxtAppMenuItemModule as ɵd, PxtDialogFilterComponent as ɵy, PxtDialogFilterModule as ɵx, PxtFilterMatTableComponent as ɵbb, PxtUploadFileComponent as ɵbc, PxtButtonComponent as ɵo, PxtButtonModule as ɵn, PxtCheckboxComponent as ɵw, PxtCheckboxModule as ɵv, PxtDateComponent as ɵq, PxtDateModule as ɵp, PxtInputComponent as ɵm, PxtInputModule as ɵl, PxtRadiobuttonComponent as ɵu, PxtRadiobuttonModule as ɵt, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR as ɵr, PxtSelectComponent as ɵs, DateFormatPipe as ɵb, DateTimeFormatPipe as ɵc, UpercaseFirst as ɵa, ErrorService as ɵj, HttpErrorHandler as ɵi, TokenService as ɵh, InterceptService as ɵk };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC90b2tlbi5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2Vycm9yLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtZXJyb3ItaGFuZGxlci50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3VwcGVyY2FzZS1maXJzdC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvdXRpbC9jb25zdGFudHMudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtdGltZS1mb3JtYXQucGlwZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvY29udHJvbGxlci5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZGVscy9weHRDb25maWd1cmF0aW9uLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC92aXNpYmxlLWluLXJvbGVzLmd1YXJkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaW50ZXJjZXB0b3IvaW50ZXJjZXB0LXNlcnZpY2UgLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZGF0ZS1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1maWx0ZXItZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXIvcHh0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci9weHQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci1tYXQtdGFibGUvcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXItbWF0LXRhYmxlL3B4dC1maWx0ZXItbWF0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWVsZHMtbW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2VudW0vcHh0LWVudW0tdGFnLWh0bWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3VibWVudXNJdGVuczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnN1Ym1lbnVzSXRlbnMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRDb21wb25lbnRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9sb2FkQ29tcG9uZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldFVzZXJMb2dnZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VyTG9nZ2VkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0VXNlckxvZ2dlZC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRJbmZvSW5pdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9Jbml0aWFsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRJbmZvSW5pdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZXRTdWJtZW51cyhyb3V0ZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VibWVudXNJdGVucy5uZXh0KHJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbEluZm8oaW5mb0luaXRpYWwpIHtcclxuICAgICAgICB0aGlzLl9zZXRJbmZvSW5pdC5uZXh0KGluZm9Jbml0aWFsKVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50Lm5leHQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NldFVzZXJMb2dnZWQubmV4dCh1c2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHh0QXBwIH0gZnJvbSAnLi9weHQtYXBwJztcbmltcG9ydCB7IFB4dEFwcE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9weHQtYXBwLm1vZGVsJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdE1lbnUsIE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFNhZmVIdG1sLCBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC5jb21wb25lbnQuc2NzcyddXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50IHtcblxuICAvL1Byb3BlcnRpZXNcbiAgcm91dGVzOiBhbnlbXSA9IFtdO1xuICBncm91cHM6IGFueVtdID0gW107XG4gIG1lbnVzOiBhbnlbXSA9IFtdO1xuICBzeXN0ZW06IFN0cmluZyA9IFwiU1lTVEVNIE5BTUVcIlxuICB1cmxJbWc6IHN0cmluZyA9ICdodHRwOi8vaW1hZ2Vuc2Rzdi5wZWl4b3RvLmNvbS5ici9hdXRoL21pbmlfbG9nby5wbmcnO1xuICBtZW51U2VsZWN0ZWQgPSBcIlwiO1xuICB1c3VlckxvZ2dlZCA9IFwiTG9vZ2dlZCB1c2VyXCI7XG4gIG1lbnVzSHRtbDogU2FmZUh0bWw7XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgX21vYmlsZVF1ZXJ5TGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF0TWVudTogTWF0TWVudTtcbiAgQFZpZXdDaGlsZCgnbWVudXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgc3ViQ29udGFpbmVyMTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnVUcmlnZ2VyJywgeyByZWFkOiBNYXRNZW51VHJpZ2dlciB9KSBjb250ZXh0TWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuICBtZW51c1JlY2VpdmVkIDogYW55W107XG4gIFxuICAvL0NvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBtZWRpYTogTWVkaWFNYXRjaGVyLFxuICAgIHB1YmxpYyBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMubW9iaWxlUXVlcnkgPSBtZWRpYS5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA2MDBweCknKTtcbiAgICB0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyID0gKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubW9iaWxlUXVlcnkuYWRkTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgdGhpcy5yZXN1bHQgPSBweHRBcHBDb21wb25lbnRTZXJ2aWNlLmluZm9Jbml0aWFsLnN1YnNjcmliZShpbmZvSW5pdGlhbCA9PiB7XG4gICAgICBpZiAoaW5mb0luaXRpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudXN1ZXJMb2dnZWQgPSBpbmZvSW5pdGlhbC51c2VyTG9nZ2VkO1xuICAgICAgICB0aGlzLnN5c3RlbSA9IGluZm9Jbml0aWFsLnN5c3RlbTtcbiAgICAgICAgdGhpcy5tZW51c1JlY2VpdmVkID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLm1lbnVzID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICB0aGlzLnByZXBhcmVNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpYmVDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubW9iaWxlUXVlcnkucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIC8vIEluY2x1ZGUgb2YgY29tcG9uZW50cyBpbiB0aGUgYXBwbGljYXRpb24gYm9keVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnksIGFkSG9zdCkge1xuICAgIHRoaXMubWVudVNlbGVjdGVkID0gcm91dGUubWVudVRleHQ7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlLm1lbnVTb3VyY2U7XG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShhZEl0ZW0uY29tcG9uZW50KTtcbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IGFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZpY2UgcmVzcG9uc2libGUgZm9yIGluY2x1ZGluZyBjb21wb25lbnRzIGluIHRoZSBib2R5IG9mIHRoZSBhcHBsaWNhdGlvblxuICBzdWJzY3JpYmVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnRPYnNlcnZhYmxlLnN1YnNjcmliZShjb21wb25lbnRPYmogPT4ge1xuICAgICAgdmFyIGFycmF5QXV4ID0gdGhpcy5tZW51c1JlY2VpdmVkLmZpbHRlcih4PT54Lm1lbnVTb3VyY2UgIT0gdW5kZWZpbmVkICYmIHgubWVudVNvdXJjZS5jb21wb25lbnQgPT09IGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgaWYoYXJyYXlBdXgubGVuZ3RoID09IDEpe1xuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IGFycmF5QXV4WzBdLm1lbnVUZXh0O1xuICAgICAgfVxuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRPYmouY29tcG9uZW50KTtcbiAgICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5hZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICg8QWRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhID0gY29tcG9uZW50T2JqLmRhdGE7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXNwb25zaWJsZSBmb3IgY2FsbCBtZXRob2QgXCJsb2FkY29tcG9uZW50cygpXCIgaW5mb3JtaW5nIHBhcmFtZXRlcnNcbiAgc2VsZWN0SXRlbU1lbnUobmF2KSB7XG4gICAgdGhpcy5sb2FkQ29tcG9uZW50KG5hdiwgdGhpcy5hZEhvc3QpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBwcmVwYXJpbmcgYXBwbGljYXRpb24gbWVudXM7XG4gIHByZXBhcmVNZW51KCkge1xuICAgIGxldCBhcnJheUF1eDogYW55W107XG4gICAgYXJyYXlBdXggPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJncm91cFwiICYmIHgubWVudVBhcmVudCA9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhHcm91cCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcbiAgICB2YXIgYXJyYXlBdXhJdGVtID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiaXRlbVwiICYmIHgubWVudVBhcmVudCAhPT0gXCJcIik7XG5cbiAgICAvL2FkZCBpdGVucyBpbiBncm91cHNcbiAgICBhcnJheUF1eEl0ZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4R3JvdXAuZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSlcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy9hZGQgZ3JvdXBzIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4R3JvdXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4LmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIHN1cGVyLWdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLm1lbnVzID0gYXJyYXlBdXg7XG4gIH1cbn1cbiIsImltcG9ydCAnLi8uLi8uLi8uLi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7Q2RrVGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge0Nka1RyZWVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICBNYXRCYWRnZU1vZHVsZSxcbiAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSxcbiAgTWF0Q2hpcHNNb2R1bGUsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gIE1hdERpYWxvZ01vZHVsZSxcbiAgTWF0RGl2aWRlck1vZHVsZSxcbiAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdExpc3RNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0UmFkaW9Nb2R1bGUsXG4gIE1hdFJpcHBsZU1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRTaWRlbmF2TW9kdWxlLFxuICBNYXRTbGlkZXJNb2R1bGUsXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0U3RlcHBlck1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdFRhYnNNb2R1bGUsXG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdFRvb2x0aXBNb2R1bGUsXG4gIE1hdFRyZWVNb2R1bGUsXG4gIE1hdExpbmVNb2R1bGUsXG4gIE1hdENvbW1vbk1vZHVsZSxcbiAgTWF0T3B0aW9uTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICBcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7cGxhdGZvcm1Ccm93c2VyRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsTWF0Q2FyZE1vZHVsZSxNYXRJY29uTW9kdWxlLE1hdExpbmVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxNYXRTb3J0TW9kdWxlLE1hdFRhYnNNb2R1bGUsTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxNYXRDaGlwc01vZHVsZSxNYXRJbnB1dE1vZHVsZSxNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxNYXRCdXR0b25Nb2R1bGUsTWF0Q29tbW9uTW9kdWxlLE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsTWF0UmlwcGxlTW9kdWxlLE1hdFNlbGVjdE1vZHVsZSxNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxNYXRTaWRlbmF2TW9kdWxlLE1hdFN0ZXBwZXJNb2R1bGUsTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLE1hdFRvb2x0aXBNb2R1bGUsTWF0Q2hlY2tib3hNb2R1bGUsTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsTWF0RXhwYW5zaW9uTW9kdWxlLE1hdEZvcm1GaWVsZE1vZHVsZSxNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxNYXROYXRpdmVEYXRlTW9kdWxlLE1hdEJvdHRvbVNoZWV0TW9kdWxlLE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxNYXRCdXR0b25Ub2dnbGVNb2R1bGUsTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBjb25maWc6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgbG9hZCh1cmw6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5qZWN0SHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGluamVjdEh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgICBtYXAocmVzID0+IHJlcylcclxuICAgICAgKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWd1cmF0aW9uKGVsZW1lbnQ6IHN0cmluZywgZGF0YUxpc3Q/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZGF0YUxpc3QpIHtcclxuICAgICAgY29uc3QgdXJsV2l0aEVsZW1lbnQgPSB0aGlzLmNvbmZpZ1tlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhEYXRhTGlzdCA9IHRoaXMuY29uZmlnW2RhdGFMaXN0XVtlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhEYXRhTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2ZXJpZnlVcmwodHlwZU1vZGVsOiBhbnkpIHtcclxuICAgIGlmICh0eXBlTW9kZWwuaW5jbHVkZXMoJy8nLCB0eXBlTW9kZWwubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgY29uc3QgdHlwZVJlbGVhc2UgPSB0eXBlTW9kZWw7XHJcbiAgICAgIHJldHVybiB0eXBlUmVsZWFzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlTW9kZWwgKyAnLyc7XHJcbiAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEZyb250U2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdGUk9OVCcsICdTR0knKTtcclxuICB9O1xyXG5cclxuXHJcbiAgcHVibGljIGdldEFwaVVybCAobmFtZSwgdXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24odXJsLCBuYW1lKTtcclxuICB9XHJcbn0iLCJcbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudCA9IHtcbiAgcHJvZHVjdGlvbjogdHJ1ZSxcbiAgZW52TmFtZTogJ2RldicsXG4gIHZlcnNpb246ICcwLjAuMScsXG4gIENPTkZJR19GSUxFOiAnYXNzZXRzL2NvbmZpZy9lbnYuanNvbicsXG4gIGVzYkFwaVB4dCA6IFwiaHR0cDovL2VzYmRzdi5wZWl4b3RvLmNvbS5ici9zZ2UvXCIsICBcbiAgc3lzdGVtOiB7XG4gICAgaWQ6IDEwOCxcbiAgICBwcmV4OiBcIlBPUkNSUFwiXG4gIH1cbn07XG5cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cCwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcblxudmFyIHN5c3RlbSA9IGVudmlyb25tZW50LnN5c3RlbTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfVxuICBzZXRUb2tlblN0b3JhZ2UocmVzOiBhbnkpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgfVxuICByZW1vdmVUb2tlblN0b3JhZ2UoKSB7XG4gICAgdmFyIHRva2VuID0gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXG4gICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+IGp3dF9kZWNvZGUodG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN5c3RlbS5pZCtzeXN0ZW0ucHJleCtkZWNvZGVkLnN1Yik7XG4gIH1cbiAgXG4gIGRlbGV0ZVRva2VuKCkge1xuICAgIHRoaXMucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gIH1cblxuICB0b2tlbkV4aXN0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IG51bGwgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IHVuZGVmaW5lZCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gJyc7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBjYW5jZWxhdGlvbigpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShmYWxzZSk7XG4gIH1cbiAgY29uZmlybWF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFcnJvclNlcnZpY2Uge1xyXG5cclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZyA9IFwiXCI7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IEVycm9yU2VydmljZSB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgSGFuZGxlRXJyb3IgPSA8VD4gKG9wZXJhdGlvbj86IHN0cmluZywgcmVzdWx0PzogVCkgPT4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gT2JzZXJ2YWJsZTxUPjtcclxuXHJcbi8qKiBIYW5kbGVzIEh0dHBDbGllbnQgZXJyb3JzICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBFcnJvckhhbmRsZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqIENyZWF0ZSBoYW5kbGVFcnJvciBmdW5jdGlvbiB0aGF0IGFscmVhZHkga25vd3MgdGhlIHNlcnZpY2UgbmFtZSAqL1xyXG4gIGNyZWF0ZUhhbmRsZUVycm9yID0gKHNlcnZpY2VOYW1lID0gJycpID0+IDxUPlxyXG4gICAgKG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQgPSB7fSBhcyBUKSA9PiB0aGlzLmhhbmRsZUVycm9yKHNlcnZpY2VOYW1lLCBvcGVyYXRpb24sIHJlc3VsdCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBzZXJ2aWNlTmFtZTogbmFtZSBvZiB0aGUgZGF0YSBzZXJ2aWNlXHJcbiAgICogQHBhcmFtIG9wZXJhdGlvbjogbmFtZSBvZiB0aGUgZmFpbGVkIG9wZXJhdGlvblxyXG4gICAqIEBwYXJhbSByZXN1bHQ6IG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgKi9cclxuICBoYW5kbGVFcnJvcjxUPiAoc2VydmljZU5hbWUgPSAnJywgb3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdCA9IHt9IGFzIFQpIHtcclxuXHJcbiAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAvLyBUb2RvIC0+IFNlbmQgdGhlIGVycm9yIHRvIHJlbW90ZSBsb2dnaW5nIGluZnJhc3RydWN0dXJlXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcblxyXG4gICAgICBjb25zdCBtZXNzYWdlID0gKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3JFdmVudCkgP1xyXG4gICAgICAgIGVycm9yLmVycm9yLm1lc3NhZ2UgOlxyXG4gICAgICAgYHtlcnJvciBjb2RlOiAke2Vycm9yLnN0YXR1c30sIGJvZHk6IFwiJHtlcnJvci5tZXNzYWdlfVwifWA7XHJcblxyXG4gICAgICAvLyBUb2RvIC0+IFRyYW5zZm9ybWluZyBlcnJvciBmb3IgdXNlciBjb25zdW1wdGlvblxyXG4gICAgICB0aGlzLmVycm9yU2VydmljZS5lcnJvck1lc3NhZ2UgPSBgJHtzZXJ2aWNlTmFtZX0gLT4gJHtvcGVyYXRpb259IGZhaWxlZC5cXG4gIE1lc3NhZ2U6ICR7bWVzc2FnZX1gO1xyXG4gICAgICAvLyAtPiBSZXR1cm4gYSBzYWZlIHJlc3VsdC5cclxuICAgICAgcmV0dXJuIG9mKCByZXN1bHQgKTtcclxuICAgIH07XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBmb3J3YXJkUmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlLCBYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc0FyZ3MsIFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuLCBmaW5hbGl6ZSwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi8uLi8uLi9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIsIEhhbmRsZUVycm9yIH0gZnJvbSAnLi9odHRwLWVycm9yLWhhbmRsZXInO1xuXG4vL2ltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9IdHRwSGVscGVyU2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQeHRIdHRwU2VydmljZSBleHRlbmRzIEh0dHAge1xuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3I6IEhhbmRsZUVycm9yO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQsXG4gICAgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSB1cmxIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSxcbiAgICBwcml2YXRlIGh0dHBFcnJvckhhbmRsZXI6IEh0dHBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoYmFja2VuZCwgb3B0aW9ucyk7XG4gICAgdGhpcy5oYW5kbGVFcnJvciA9IGh0dHBFcnJvckhhbmRsZXIuY3JlYXRlSGFuZGxlRXJyb3IoJ0N1c3RvbWVyU2VydmljZScpO1xuICB9XG5cbiAgdXJsUmVxdWVzdDogYW55O1xuICBvcmlnUmVxdWVzdDogUmVxdWVzdDtcbiAgaXNVbmF0aG91cml6ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIENvbnRyb2wgU2VydmljZXNcbiAgICovXG4gIGdldEhlYWRlcnMoKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgICBoZWFkZXJzLmFwcGVuZCgnUHJhZ21hJywgJ25vLWNhY2hlJyk7XG5cbiAgICBoZWFkZXJzLmFwcGVuZChcIkNhY2hlLUNvbnRyb2xcIiwgXCJuby1jYWNoZVwiKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiLCBcInRydWVcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBIRUFELCBQT1NULCBQVVQsIFBBVENILCBERUxFVEUsIE9QVElPTlNcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBBY2NlcHRcIik7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBoYW5kbGVSZXNwb25zZShvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiwgdXJsPzogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgY29uc3Qgb3JpZyA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmVzdWx0ID0gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAvLyBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ2FkZEN1c3RvbWVyJywgbnVsbCkpLFxuICAgICAgXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkNhdGNoKGVycm9yKTtcbiAgICAgIH0pLFxuICAgICAgXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25SZXN1bHQocmVzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIG9uUmVzdWx0KHJlcykge1xuICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gMjAxKSB7XG4gICAgICByZXR1cm4gcmVzLl9ib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gIH1cblxuICBkb0dldChhcGk6IHN0cmluZywgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIC8vIHRoaXMucHJlTG9hZGVyU2VydmljZS51cGRhdGUodHJ1ZSk7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZ2V0KHVybCwgcmVxdWVzdE9wdGlvbnMpKTtcbiAgfVxuXG4gIGRvUG9zdChlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBlbmRwb2ludDtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBvc3QodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUHV0KGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wdXQodXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvUGF0aChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55LCBsb2FkZXI/OiBib29sZWFuKSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucGF0Y2godXJsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSwgdXJsKTtcbiAgfVxuXG4gIGRvRGVsZXRlKGFwaTogc3RyaW5nLCBwYXJhbXM6IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCB1cmxQYXJhbSA9IHVybCArICcvJyArIHBhcmFtcztcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIuZGVsZXRlKHVybFBhcmFtLCByZXF1ZXN0T3B0aW9ucyksIHVybFBhcmFtKTtcbiAgfVxuXG5cbiAgcmVxdWVzdCh1cmw6IHN0cmluZyB8IFJlcXVlc3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgb3B0aW9ucyA9IHRoaXMucmVxdWVzdEFyZ3Mob3B0aW9ucyk7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsUmVxdWVzdCA9IHVybC51cmw7XG4gICAgICB0aGlzLm9yaWdSZXF1ZXN0ID0gdXJsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVybFJlcXVlc3QgIT09IGVudmlyb25tZW50LkNPTkZJR19GSUxFKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLm9yaWdSZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgICBvcHRpb25zLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnLmNvbmNhdCh0b2tlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVybCA9IHRoaXMub3JpZ1JlcXVlc3Q7XG4gICAgcmV0dXJuIHN1cGVyLnJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdEFyZ3Mob3B0aW9uczogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnNBcmdzIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIHB1YmxpYyBvbkNhdGNoKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgIGNhc2UgNDAxOlxuICAgICAgICBpZiAoIXRoaXMuaXNVbmF0aG91cml6ZWQpIHtcbiAgICAgICAgICB0aGlzLm9wZW5EaWFsb2coNDAxKTtcbiAgICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwMVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNVbmF0aG91cml6ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAwOlxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMCk7XG4gICAgICAgIC8vIHRoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwNDpcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA0MDBcIik7XG4gICAgICAgIHRoaXMub3BlbkRpYWxvZyg0MDQpXG4gICAgICAgIC8vdGhpcy50b2tlblNlcnZpY2UucmVtb3ZlVG9rZW5TdG9yYWdlKCk7XG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQgKyBcIj9lcnJvPTQwNFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAzOlxuICAgICAgICBjb25zb2xlLmxvZyg0MDMpO1xuICAgICAgICB0aGlzLm9wZW5EaWFsb2coNDAzKVxuICAgICAgICAvL3RoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIC8vdGhpcy5vcGVuRGlhbG9nKDUwMCk7XG4gICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz0wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cblxuXG4gIG9wZW5EaWFsb2coZXJybykge1xuICAgIHZhciBjb250ZW50RGlhbG9nID0gXCJWb2PDg8KqIHNlcsODwqEgcmVkaXJlY2lvbmFkbyBhIHRlbGEgZGUgYXV0ZW50aWNhw4PCp8ODwqNvIVwiXG5cbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgcGFuZWxDbGFzczogJ3B4dC1kaWFsb2cnLFxuICAgICAgZGF0YTogeyB0aXRsZURpYWxvZzogXCJFcnJvIC0gXCIgKyBlcnJvLCBjb250ZW50RGlhbG9nOiBjb250ZW50RGlhbG9nIH1cbiAgICB9KTtcbiAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsSGVscGVyLmdldEZyb250U2dpKCkpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnVybEhlbHBlci5nZXRGcm9udFNnaSgpICsgXCI/ZXJybz1cIiArIGVycm87XG4gICAgfSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RCYXNlU2VydmljZSB7XG5cbiAgcHVibGljIG1vZGVsOiBhbnk7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0bzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRva2VuU2VydmljZTogVG9rZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBfaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2VBdXRvLCBtb2RlbCk7XG4gIH07XG4gIGRlbGV0ZShpZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlQXV0bywgaWQpO1xuICB9O1xuXG4gIGRvR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogTWFwPGFueSwgYW55Pikge1xuICAgIGxldCB1cmxcbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zLnNpemUgPiAwKSB7XG4gICAgICB1cmwgPSBwYXRoICsgdGhpcy5idWlsZFJlcXVlc3RQYXJhbXMocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gcGF0aDtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyB1cmwpO1xuICAgIH1cbiAgfTtcblxuICBkb1Bvc3QocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QocGF0aCwgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH07XG4gIH07XG5cbiAgZG9QdXQocGF0aDogc3RyaW5nLCBtb2RlbD86IGFueSkge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dChwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9EZWxldGUocGF0aDogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHBhdGgsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgaWQpO1xuICAgIH07XG4gIH07XG5cbiAgdXBsb2FkSW1hZ2UocGF0aCwgcGFyYW1zPzogTWFwPGFueSwgYW55Pik6IGFueSB7XG5cbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPD0gLTEpIHtcbiAgICAgIHBhdGggPSB0aGlzLnVybFNlcnZpY2UgKyBwYXRoIDtcbiAgICB9O1xuXG4gICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcuY29uY2F0KHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCkpXG4gICAgfTtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IG5ldyBIdHRwSGVhZGVycyhoZWFkZXIpO1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBjb25zdCBmb3JtZGF0YSA9IHRoaXMuc2V0UGFyYW1zRm9ybWRhdGEocGFyYW1zKTtcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QoJ1BPU1QnLCBwYXRoLCBmb3JtZGF0YSwge1xuICAgICAgaGVhZGVyczogaHR0cE9wdGlvbnMsXG4gICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHBDbGllbnQucmVxdWVzdChyZXEpO1xuICB9XG5cblxuICBzZXRQYXJhbXNGb3JtZGF0YShwYXJhbXM6IE1hcDxhbnksIGFueT4pOiBGb3JtRGF0YSB7XG4gICAgY29uc3QgZm9ybWRhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBmb3JtZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1kYXRhO1xuICB9O1xuXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtczogTWFwPGFueSwgYW55Pik6IHN0cmluZyB7XG4gICAgbGV0IGZpbmFsID0gJyc7XG4gICAgbGV0IHByaW1laXJhSXRlcmFjYW8gPSB0cnVlO1xuICAgIHBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBpZiAocHJpbWVpcmFJdGVyYWNhbykge1xuICAgICAgICBmaW5hbCArPSAnPycgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgcHJpbWVpcmFJdGVyYWNhbyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmluYWwgKz0gJyYnICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3VwcGVyY2FzZUZpcnN0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBlcmNhc2VGaXJzdCBleHRlbmRzIFVwcGVyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHdvcmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgaWYgKHdvcmRzW2FdLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgIHZhciB3ID0gd29yZHNbYV07XHJcbiAgICAgICAgICB3b3Jkc1thXSA9IHdbMF0udG9VcHBlckNhc2UoKSArIHcuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX0ZNVCA9ICdkZC9NTS95eXl5JztcclxuICAgIHN0YXRpYyByZWFkb25seSBEQVRFX1RJTUVfRk1UID0gYCR7Q29uc3RhbnRzLkRBVEVfRk1UfSAtIGhoOm1tOnNzIGFgO1xyXG4gIH0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2RhdGVGb3JtYXQnXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9GTVQpO1xyXG4gICAgfVxyXG4gIH0iLCJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi91dGlsL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZGF0ZVRpbWVGb3JtYXQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZUZvcm1hdFBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIHZhciBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZShcImVuLVVTXCIpO1xyXG4gICAgcmV0dXJuICBkYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIENvbnN0YW50cy5EQVRFX1RJTUVfRk1UKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0ZVBpcGUsIFVwcGVyQ2FzZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NvbnRyb2xsZXJQaXBlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0O1xyXG4gICAgICB2YXIgYXV4ID0gXCJcIjtcclxuICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB3b3Jkcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIGlmIChhID09IDApIHtcclxuICAgICAgICAgICAgYXV4ID0gd29yZHNbYV0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYXV4ID0gYXV4ICsgd29yZHNbYV0gO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYXV4O1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFVwZXJjYXNlRmlyc3QgfSBmcm9tICcuL3VwcGVyY2FzZS1maXJzdCc7XHJcbmltcG9ydCB7IERhdGVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLWZvcm1hdC5waXBlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVGb3JtYXRQaXBlIH0gZnJvbSAnLi9kYXRlLXRpbWUtZm9ybWF0LnBpcGUnO1xyXG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4vY29udHJvbGxlci5waXBlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUsIENvbnRyb2xsZXJQaXBlIF0sXHJcbiAgICBleHBvcnRzOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlLCBDb250cm9sbGVyUGlwZSBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaXBlTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBpdGVtczogYW55W107XG4gIEBWaWV3Q2hpbGQoJ2NoaWxkTWVudScpIHB1YmxpYyBjaGlsZE1lbnU7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSBwdWJsaWMgcHh0QXBwQ29tcG9uZW50U2VydmljZSkgeyB9XG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbG9hZENvbXBvbmVudChjaGlsZCkge1xuICAgIHRoaXMucHh0QXBwQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50KHtjb21wb25lbnQ6IGNoaWxkLm1lbnVTb3VyY2UuY29tcG9uZW50LCBkYXRhOlwiXCJ9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICAgZXhwb3J0czogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IF1cbiAgXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2hhc2hdJyxcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBIYXNoRGlyZWN0aXZlICB7XHJcbiAgICBASW5wdXQoKSBoYXNoOiBzdHJpbmc7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XHJcbiAgfSIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpc2libGVJblJvbGVzR3VhcmQgfSBmcm9tICcuLi92aXNpYmxlLWluLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhvcml0eVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBfaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHsgfVxuXG4gIGJ1c2NhckF1dGhvcml0aWVzIChjb2RpZ29TaXN0ZW1hKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5faHR0cEhlbHBlci5nZXRBcGlTZ2koKSArIFwicGVybWlzc29lcy9idXNjYXJQZXJmaWxTaXN0ZW1hLz9cIjtcbiAgICBjb25zdCBwYXJhbXMgPSBcImNvZGlnb1Npc3RlbWE9XCIgKyBjb2RpZ29TaXN0ZW1hO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRvR2V0KHVybCArIHBhcmFtcyk7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgcHh0Q29uZmlndXJhdGlvbiA9IHtzeXN0ZW1JZDogMTA0ICxzeXN0ZW1QcmV4OiBcIlNHRV9ORVdcIn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXNpYmxlSW5Sb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsIHByaXZhdGUgYXV0aG9yaXR5U2VydmljZTogQXV0aG9yaXR5U2VydmljZSkgeyB9XHJcbiAgY2FuQWN0aXZhdGUobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuIHtcclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICBpZiAodG9rZW4gIT09ICd1bmRlZmluZWQnICYmIHRva2VuICE9PSAnJyAmJiB0b2tlbiAhPT0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW4pO1xyXG4gICAgICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViKTtcclxuICAgICAgICBpZiAodG9rZW5BdXRob3JpdGllcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gJycgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hdXRob3JpdHlTZXJ2aWNlLmJ1c2NhckF1dGhvcml0aWVzKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQpLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViLCBkYXRhLmF1dGhvcml0eSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5odHRwSGVscGVyLmdldFVybEF1dGVudGljYWNhbygpICsgXCI/ZXJybz00MDFcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJUb2tlbiBVbmRlZmluZWRcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBFdmVudCwgXHJcbiAgSHR0cEludGVyY2VwdG9yLCBcclxuICBIdHRwSGFuZGxlciwgXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvcix0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKCkvL3twcm92aWRlZEluOiAncm9vdCd9XHJcblxyXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0U2VydmljZSAgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHQvLyBpbnRlcmNlcHQgcmVxdWVzdCBhbmQgYWRkIHRva2VuXHJcbiAgXHRpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOk9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHJcbiAgICBcdC8vIG1vZGlmeSByZXF1ZXN0XHJcblx0ICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcclxuXHQgICAgICBzZXRIZWFkZXJzOiB7XHJcblx0ICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01ZX1RPS0VOJyl9YFxyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0ICAgXHJcblx0ICAgXHRjb25zb2xlLmxvZyhcIi0tLS1yZXF1ZXN0LS0tLVwiKTtcclxuXHJcblx0IFx0Y29uc29sZS5sb2cocmVxdWVzdCk7XHJcblxyXG5cdCBcdGNvbnNvbGUubG9nKFwiLS0tIGVuZCBvZiByZXF1ZXN0LS0tXCIpO1xyXG4gXHJcblxyXG5cdCAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdClcclxuXHQgICAgLnBpcGUoXHJcblx0ICAgICAgICB0YXAoZXZlbnQgPT4ge1xyXG5cdCAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcclxuXHQgICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgY29uc29sZS5sb2coXCIgYWxsIGxvb2tzIGdvb2RcIik7XHJcblx0ICAgICAgICAgICAgLy8gaHR0cCByZXNwb25zZSBzdGF0dXMgY29kZVxyXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnN0YXR1cyk7XHJcblx0ICAgICAgICAgIH1cclxuXHQgICAgICAgIH0sIGVycm9yID0+IHtcclxuXHQgICBcdFx0XHQvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0tcmVzcG9uc2UtLS0tXCIpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoXCJzdGF0dXMgY29kZTpcIik7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5lcnJvcihlcnJvci5zdGF0dXMpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0gZW5kIG9mIHJlc3BvbnNlLS0tXCIpO1xyXG5cclxuXHQgICAgICAgIH0pXHJcblx0ICAgICAgKVxyXG5cclxuICAgIH07XHJcbiAgXHJcbiBcclxufSIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdHJNb2R1bGUgfSBmcm9tICduZ3gtdG9hc3RyJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWVycm9yLWhhbmRsZXInO1xuaW1wb3J0IHsgSW50ZXJjZXB0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1pbnRlcmNlcHRvci9pbnRlcmNlcHQtc2VydmljZSAnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSxcbiAgICBUb2FzdHJNb2R1bGUuZm9yUm9vdCh7cHJvZ3Jlc3NCYXI6IHRydWV9KSAgICBcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwQ29tcG9uZW50LCBQeHRDb250ZW50Qm9keSwgSGFzaERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQeHRBcHBDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtQeHRBcHBDb21wb25lbnRTZXJ2aWNlLCBcbiAgICBQeHRIdHRwU2VydmljZSwgXG4gICAgUmVxdWVzdEJhc2VTZXJ2aWNlLCBcbiAgICBIdHRwSGVscGVyU2VydmljZSwgXG4gICAgQ29uZmlnU2VydmljZSwgIFxuICAgIEh0dHBFcnJvckhhbmRsZXIsICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFxuICAgIFRva2VuU2VydmljZSxcbiAgICBBdXRob3JpdHlTZXJ2aWNlLFxuICBJbnRlcmNlcHRTZXJ2aWNlICwge1xuICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgIHVzZUNsYXNzOiBJbnRlcmNlcHRTZXJ2aWNlLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRJbnB1dEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0Q2hlY2tib3hGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RGF0ZUZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHR5cGU/OiBzdHJpbmc7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmlsdGVyRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgY2xhc3NOYW1lPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dFJhZGlvQnV0dG9uRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRTZWxlY3RGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgcGFyYW1ldGVyPzogYW55OyBcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRmaWx0ZXJDdXN0b21GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jb250ZW50LWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY29udGVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZENvbXBvbmVudCB7XG4gIC8vUHJvcGVydGllcyBcbiAgQElucHV0KCkgZGF0YTogYW55O1xuICBASW5wdXQoKSBhdXRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmllbGRzOiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIEBJbnB1dCgpIGNvbHM6IG51bWJlciA9IDU7XG4gIEBJbnB1dCgpIGZpZWxkOiBhbnk7XG4gIGNvbHNJbml0aWFsID0gNTtcbiAgQE91dHB1dCgpIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IocHVibGljIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy5maWVsZFtrZXldLmNvbnN0cnVjdG9yLm5hbWUpIHtcblxuICAgICAgICAvL0ZpbHRlckN1c3RvbVxuICAgICAgICBjYXNlIHB4dGZpbHRlckN1c3RvbUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlckN1c3RvbSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9JbnB1dFxuICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VJbnB1dCA9IDxweHRJbnB1dEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9DaGVja2JveFxuICAgICAgICBjYXNlIHB4dENoZWNrYm94RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9EYXRlXG4gICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0ZpbHRlclxuICAgICAgICBjYXNlIHB4dEZpbHRlckZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgY2FzZSBweHRSYWRpb0J1dHRvbkZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBcbiAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgY2FzZSBweHRTZWxlY3RGaWVsZC5uYW1lOlxuICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlU2VsZWN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB0aGlzLmNvbHNJbml0aWFsID0gdGhpcy5jb2xzO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBwdWJsaWMgb25TdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XG5cbiAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZUFsbEZvcm1GaWVsZHModGhpcy5mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIHB1YmxpYyBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG4gIHNjcmVlbldpZHRoO1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLnNjcmVlbldpZHRoIDw9IDgwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NyZWVuV2lkdGggPD0gMTEwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xzID0gdGhpcy5jb2xzSW5pdGlhbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWlucHV0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4gICIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kYXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtcmFkaW9idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHRTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWxlY2lvbmUnO1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBwYXJhbXM6IGFueTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5wYXJhbXMgIT0gdW5kZWZpbmVkICYmICFjaGFuZ2VzLnBhcmFtcy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSBjaGFuZ2VzLnBhcmFtcy5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmZpbmQoKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sbGVyID0gXCJcIjtcbiAgYXV0byA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBvcHRpb246IGFueTtcblxuICBvcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIGdldCBzZWxlY3RlZE9wdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb247XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkT3B0aW9uKGY6IGFueSkge1xuICAgIGlmIChmICE9IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGYgIT09IHRoaXMub3B0aW9uKSB7XG4gICAgICAgIHRoaXMub3B0aW9uID0gZjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGYuY29kaWdvKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLm9wdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5vcHRpb24gPSB2YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHB4dGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB0aGlzLmZpZWxkID0gdGhpcy5tb2RlbDtcbiAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZC5jbGFzc05hbWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLmZpZWxkLmNsYXNzTmFtZS5uYW1lO1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgZmluZCgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5weHRodHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgdGhpcy5wYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvKSB7XG4gICAgICAgICAgdGhpcy5maWVsZC5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5maW5kKCk7XG4gIH07XG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFNvcnQsIE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbmltcG9ydCB7IHB4dElucHV0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWlucHV0LWZpZWxkJztcbmltcG9ydCB7IHB4dENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkJztcbmltcG9ydCB7IHB4dERhdGVGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZGF0ZS1maWVsZCc7XG5pbXBvcnQgeyBweHRGaWx0ZXJGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkJztcbmltcG9ydCB7IHB4dFNlbGVjdEZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1zZWxlY3QtZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQnO1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJ3NlbGVuaXVtLXdlYmRyaXZlci9odHRwJztcblxuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGlhbG9nLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGNvbHMgPSAyO1xuICBmaWVsZHM6IFB4dEZpZWxkQ29uZmlnW10gPSBbXTtcbiAgZmllbGRzSGlzdDogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBhdXRvOiBib29sZWFuO1xuICBmaWx0ZXIgPSB7IGNvZGU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHVuZGVmaW5lZCB9O1xuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgaHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gZGF0YS5jb250cm9sbGVyO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXV0byA9IHRoaXMuZGF0YS5hdXRvO1xuICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgIHRoaXMuZmllbGQgPSB0aGlzLmRhdGEuZmlsdGVycztcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmZpZWxkW2tleV0uY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgICAgIGNhc2UgcHh0ZmlsdGVyQ3VzdG9tRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlckN1c3RvbSA9IDxweHRmaWx0ZXJDdXN0b21GaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vSW5wdXRcbiAgICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUlucHV0ID0gPHB4dElucHV0RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VJbnB1dC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9DaGVja2JveFxuICAgICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0RhdGVcbiAgICAgICAgICBjYXNlIHB4dERhdGVGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0ZpbHRlclxuICAgICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgICBjYXNlIHB4dFNlbGVjdEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlU2VsZWN0LnR5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5maWVsZHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZpZWxkc0hpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmRpc3BsYXllZENvbHVtbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGF0YS5kaXNwbGF5ZWRDb2x1bW5zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH1cbiAgY29uZmlybWF0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICAvL1NlYXJjaC5cbiAgc2VhcmNoKCkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgTWFwPGFueSwgYW55PigpO1xuICAgIGRlYnVnZ2VyO1xuICAgIGlmICh0aGlzLmRhdGEuYXV0byAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLmF1dG8pIHtcbiAgICAgIGlmICh0aGlzLmZvcm0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0udmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5mb3JtLnZhbHVlW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdGhpcy5mb3JtLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLmNvbnRyb2xsZXIsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmZpbHRlci5jb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpbHRlci5jb2RlICE9IDAgJiYgdGhpcy5maWx0ZXIuY29kZSAhPSBcIlwiKSB7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJjb2RpZ29cIiwgdGhpcy5maWx0ZXIuY29kZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5maWx0ZXIuZGVzY3JpcHRpb24gIT0gdW5kZWZpbmVkICYmIHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uICE9IFwiXCIpIHtcbiAgICAgICAgcGFyYW1zLnNldChcImRlc2NyaWNhb1wiLCB0aGlzLmZpbHRlci5kZXNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3RSb3cocm93KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uocm93KTtcbiAgfTtcbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfTtcblxuICBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG4vKlxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbiovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIC8vcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXNEaXNhYmxlZCA9IHRydWU7XG4gIGF1dG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzTmFtZSA6U3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6IFN0cmluZyA9IFwiIFwiO1xuICBASW5wdXQoKSBkaXNwbGF5ZWRDb2x1bW5zIDogYW55W107XG4gIEBPdXRwdXQoKSBvblZhbHVlQ2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSB2YWx1ZSA6U3RyaW5nID0gXCIgXCI7XG4gICBcbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIC8vcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcbiBcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY2xhc3NOYW1lICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5jbGFzc05hbWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2hhbmdlcy5jbGFzc05hbWUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wbGFjZWhvbGRlciAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMucGxhY2Vob2xkZXIuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjaGFuZ2VzLnBsYWNlaG9sZGVyLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy52YWx1ZSAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMudmFsdWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucyAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy9NZXRob2QgcmVzcG9zaWJsZSBmb3Igb3BlbiBkaWFsb2cgZmlsdGVyXG4gIG9wZW5GaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmllbGQgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmllbGQuZmlsdGVycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXV0byA9IHRydWU7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YTogeyBhdXRvOiB0aGlzLmF1dG8sIGZpbHRlcnM6IHRoaXMuZmllbGQuZmlsdGVycywgY29udHJvbGxlcjogdGhpcy5maWVsZC5jbGFzc05hbWUsIHRpdGxlRGlhbG9nOiBcIlNlbGVjaW9uZTogKCBcIiArIHRoaXMuZmllbGQuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuZmllbGQudmFsdWUgPSByZXN1bHQuY29kaWdvO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9ZWxzZSB7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YToge2NvbnRyb2xsZXI6IHRoaXMuY2xhc3NOYW1lLCBkaXNwbGF5ZWRDb2x1bW5zOnRoaXMuZGlzcGxheWVkQ29sdW1ucywgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgIHRoaXMuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHRbdGhpcy5kaXNwbGF5ZWRDb2x1bW5zWzFdXTtcbiAgICAgICAgICB0aGlzLm9uVmFsdWVDYWxsYmFjay5lbWl0KHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHh0RGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRDaGVja2JveENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGNvbXBvbmVudE1hcHBlciA9IHtcclxuICBpbnB1dDogUHh0SW5wdXRDb21wb25lbnQsXHJcbiAgYnV0dG9uOiBQeHRCdXR0b25Db21wb25lbnQsXHJcbiAgZGF0ZTogUHh0RGF0ZUNvbXBvbmVudCxcclxuICBzZWxlY3Q6IFB4dFNlbGVjdENvbXBvbmVudCxcclxuICByYWRpb2J1dHRvbjogUHh0UmFkaW9idXR0b25Db21wb25lbnQsXHJcbiAgY2hlY2tib3g6IFB4dENoZWNrYm94Q29tcG9uZW50LFxyXG4gIGZpbHRlcjogUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQsXHJcbn07XHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBcIltkeW5hbWljRmllbGRdXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkQ29uZmlnO1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBGb3JtR3JvdXA7XHJcbiAgY29tcG9uZW50UmVmOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkgeyB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dElucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0SW5wdXRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOltQeHRCdXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEJ1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0RGF0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOltQeHRTZWxlY3RDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRDaGVja2JveENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY29tcG9uZW50TWFwcGVyID0ge1xyXG4gIGlucHV0OiBQeHRJbnB1dENvbXBvbmVudCxcclxuICBidXR0b246IFB4dEJ1dHRvbkNvbXBvbmVudCxcclxuICBkYXRlOiBQeHREYXRlQ29tcG9uZW50LFxyXG4gIHNlbGVjdDogUHh0U2VsZWN0Q29tcG9uZW50LFxyXG4gIHJhZGlvYnV0dG9uOiBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCxcclxuICBjaGVja2JveDogUHh0Q2hlY2tib3hDb21wb25lbnQsXHJcbiAgZmlsdGVyOiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCxcclxufTtcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW2R5bmFtaWNGaWVsZERpYWxvZ11cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmaWVsZDogRmllbGRDb25maWc7XHJcbiAgQElucHV0KCkgZ3JvdXA6IEZvcm1Hcm91cDtcclxuICBjb21wb25lbnRSZWY6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb21wb25lbnRNYXBwZXJbdGhpcy5maWVsZC50eXBlXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGQgPSB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZ10sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZyc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUHh0RGlhbG9nRmlsdGVyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0RmlsdGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgdGVtcGxhdGVKaXRVcmwgfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQeHRJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlJztcbmltcG9ydCB7IFB4dEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0RGF0ZU1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlck1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBNb2R1bGUsXG4gICAgUHh0SW5wdXRNb2R1bGUsXG4gICAgUHh0QnV0dG9uTW9kdWxlLFxuICAgIFB4dERhdGVNb2R1bGUsXG4gICAgUHh0U2VsZWN0TW9kdWxlLFxuICAgIFB4dFJhZGlvYnV0dG9uTW9kdWxlLFxuICAgIFB4dENoZWNrYm94TW9kdWxlLFxuICAgIFB4dElucHV0RmlsdGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENvbnRlbnRDb21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gICBleHBvcnRzOiBbUHh0Q29udGVudENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRDb250ZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50TW9kdWxlIHsgfVxuIiwiXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbiB7XHJcbiAgICBpY29uOiBTdHJpbmc7XHJcbiAgICBtZW51OiBTdHJpbmc7XHJcbiAgICBlbmFibGU6IEJvb2xlYW47XHJcbiAgICBlbnVtIDogTnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoaWNvbjogU3RyaW5nLCBtZW51OiBTdHJpbmcsIGVuYWJsZTogQm9vbGVhbiwgaWQgOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICAgICAgdGhpcy5lbnVtID0gaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIE9wdGlvbnNTdWJtZW51IHtcclxuICAgIFNBTFZBUiA9IDEsXHJcbiAgICBQRVNRVUlTQVIgPSAyLFxyXG4gICAgTElNUEFSID0gMyxcclxuICAgIE5PVk8gPSA0LFxyXG4gICAgVk9MVEFSPSA1LFxyXG4gICAgRVhDTFVJUj0gNlxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4uLy4uL3BpcGVzL3VwcGVyY2FzZS1maXJzdCc7XG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL2NvbnRyb2xsZXIucGlwZSc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzU2F2ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNEZWxldGU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjb250cm9sbGVyPzogU3RyaW5nO1xuXG4gIHNhdmUoKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbk1vZGVsKCkpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnNhdmUodGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzU2F2ZS5lbWl0KHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBkZWxldGUoaWQpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5kZWxldGUoaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNEZWxldGUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBjbGVhcigpIHtcbiAgICB0aGlzLm1vZGVsID0ge30gYXMgVDtcbiAgfTtcbiAgYWRkKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYWRkKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGNvbHMgPSAzO1xuICBjb2xzcGFuID0gMTtcbiAgYnV0dG9uczogUHh0QnV0dG9uW10gPSBbXTtcbiAgZW5hYmxlU2F2ZSA9IHRydWU7XG4gIGVuYWJsZUJhY2sgPSB0cnVlO1xuICBlbmFibGVDbGVhciA9IHRydWU7XG4gIGVuYWJsZVNlYXJjaCA9IHRydWU7XG4gIGVuYWJsZUFkZCA9IHRydWU7XG4gIGVuYWJsZURlbGV0ZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9weHRBcHBTZXJ2aWNlOiBQeHRBcHBDb21wb25lbnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uU2VydmljZTogVG9hc3RyU2VydmljZSkge1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJrZXlib2FyZF9iYWNrc3BhY2VcIiwgXCJWT0xUQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuVk9MVEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIlNBTFZBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5TQUxWQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiTk9WT1wiLCB0cnVlLCBPcHRpb25zU3VibWVudS5OT1ZPKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkxJTVBBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5MSU1QQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwic2VhcmNoXCIsIFwiUEVTUVVJU0FSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlBFU1FVSVNBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJFWENMVUlSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkVYQ0xVSVIpKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGVidWdnZXI7XG4gICAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCkgKyBuZXcgQ29udHJvbGxlclBpcGUoKS50cmFuc2Zvcm0odGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnVybFNlcnZpY2VBdXRvID0gdGhpcy51cmxTZXJ2aWNlO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICB2YWxpZGF0aW9uTW9kZWwoKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxba2V5XSAhPSB1bmRlZmluZWQgJiYgdGhpcy5tb2RlbFtrZXldICE9IFwiXCIpIHtcbiAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXCJDYW1wbyBPYnJpZ2F0w4PCs3Jpb1wiLCBrZXkudG9TdHJpbmcoKS50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmcoXCJOZW5odW0gY2FtcG8gcHJlZW5jaGlkby5cIiwgXCJBdmlzbyFcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFB4dFN1Ym1lbnVzQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtc3VibWVudXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgVG9hc3RyTW9kdWxlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOltQeHRIdHRwU2VydmljZSwgUmVxdWVzdEJhc2VTZXJ2aWNlLCBIdHRwSGVscGVyU2VydmljZSwgQ29uZmlnU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNNb2R1bGUgeyB9XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHREYXRlcGlja2VyQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3B4dC1kYXRlcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBTdHJpbmcgPSBcIkVzY29saGEgdW1hIGRhdGFcIjtcclxuICBASW5wdXQoKSBtaW5EYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgaW5wdXREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBkYXRlTW9kZWw6IERhdGU7XHJcblxyXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xyXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcblxyXG4gIGdldCBkYXRhU2VsZWNpb25hZGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlTW9kZWw7XHJcbiAgfVxyXG5cclxuICBzZXQgZGF0YVNlbGVjaW9uYWRhKGQ6IERhdGUpIHtcclxuICAgIGlmIChkICE9PSB0aGlzLmRhdGVNb2RlbCkge1xyXG4gICAgICB0aGlzLmRhdGVNb2RlbCA9IGQ7XHJcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlTW9kZWwgPSB2YWx1ZTtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgb25EYXRlQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUodW5kZWZpbmVkKTtcclxuICAgIHRoaXMub25EYXRlQ2hhbmdlKCk7XHJcbiAgfVxyXG4gIFxyXG59IiwiXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQeHREYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW0RhdGVQaXBlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUHh0RGF0ZXBpY2tlckNvbXBvbmVudF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHREYXRlUGlja2VyTW9kdWxlIHtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREaWFsb2dDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dERpYWxvZ0NvbXBvbmVudF1cblxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1weHQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZmlsdGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBkYXRhIDogYW55O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0NvbXBvbmVudD4sIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBkYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RmlsdGVyQ29tcG9uZW50XVxuIFxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFBhZ2luYXRvciwgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGlhbG9nLWZpbHRlci1jdXN0b20nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmaWx0ZXJzOiBhbnk7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG4gIFxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgcHVibGljIGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgLy9TZWFyY2guXG4gIHNlYXJjaCgpIHtcbiAgICBsZXQgcGFyYW1zID0gbmV3IE1hcDxhbnksIGFueT4oKTtcbiAgICBpZiAodGhpcy5maWx0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJzW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGFyYW1zLnNldChrZXksIHRoaXMuZmlsdGVyc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWUsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vUm93IFNlbGVjdGVkXG4gIHNlbGVjdFJvdyhyb3cpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShyb3cpO1xuICB9O1xuXG4gIC8vQ2xvc2VcbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodW5kZWZpbmVkKTtcbiAgfTtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ3VzdG9tTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdENoaXBJbnB1dEV2ZW50LCBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0NPTU1BLCBFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWZpbHRlci1tYXQtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZmlsdGVyLW1hdC10YWJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEZpbHRlck1hdFRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+KCk7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDogU3RyaW5nID0gXCJcIjtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHZpc2libGUgPSB0cnVlO1xuICBzZWxlY3RhYmxlID0gdHJ1ZTtcbiAgcmVtb3ZhYmxlID0gdHJ1ZTtcbiAgYWRkT25CbHVyID0gdHJ1ZTtcbiAgcmVhZG9ubHkgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuICBmaWx0ZXJzOiBhbnlbXSA9IFtdO1xuXG4gIGFkZChldmVudDogTWF0Q2hpcElucHV0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LmlucHV0O1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudmFsdWU7XG5cbiAgICAvLyBBZGQgb3VyIGZydWl0XG4gICAgaWYgKCh2YWx1ZSB8fCAnJykudHJpbSgpKSB7XG4gICAgICB0aGlzLmZpbHRlcnMgPSBbXTtcbiAgICAgIHRoaXMuZmlsdGVycy5wdXNoKHtuYW1lOiB2YWx1ZS50cmltKCl9KTtcbiAgICAgIHRoaXMuYXBwbHlGaWx0ZXIodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IHRoZSBpbnB1dCB2YWx1ZVxuICAgIGlmIChpbnB1dCkge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9IFxuICB9XG5cbiAgYXBwbHlGaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcbiAgICBmaWx0ZXIgPSBmaWx0ZXIudHJpbSgpO1xuICAgIGZpbHRlciA9IGZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBmaWx0ZXI7XG4gIH1cblxuICByZW1vdmUoZnJ1aXQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWx0ZXJzLmluZGV4T2YoZnJ1aXQpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseUZpbHRlcignJyk7XG4gIH1cblxuXG4gIGNvbmZpZ3VyZUZpbHRlclByZWRpY2F0ZSgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyUHJlZGljYXRlID0gKHJvdywgZXZlbnQpID0+XG4gICAgICAoIHJvdy5jb2RpZ28udG9TdHJpbmcoKS5pbmRleE9mKGV2ZW50KSA+PSAwIHx8XG4gICAgICByb3cubm9tZUltYWdlbS50b1N0cmluZygpLmluZGV4T2YoZXZlbnQpID49IDApO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50cyA6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyTWF0VGFibGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBweHRFbnVtVGFnSHRtbCB9IGZyb20gXCIuLi9lbnVtL3B4dC1lbnVtLXRhZy1odG1sXCI7XHJcbmltcG9ydCB7IHB4dEVudW1UeXBlVGFnIH0gZnJvbSBcIi4uL2VudW0vcHh0LWVudW0tdHlwZS10YWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmllbGRzIHtcclxuICAgIHR5cGU6IHB4dEVudW1UeXBlVGFnO1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIHRhZzogcHh0RW51bVRhZ0h0bWw7XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gcHh0RW51bVRhZ0h0bWwge1xyXG4gICAgSW5wdXQgPSAxLFxyXG4gICAgQ29tYm8gPSAyLFxyXG4gICAgRmlsdGVyID0gMyxcclxuICAgIENoZWNrYm94ID0gNFxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtdXBsb2FkLWZpbGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRVcGxvYWRGaWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6c3RyaW5nO1xuICBAT3V0cHV0KCkgZmlsZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBhcnJheUltYWdlcyA6RmlsZVJlYWRlcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBvbkNoYW5nZUltYWdlbShldmVudCkge1xuICAgIGlmIChldmVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBpbWFnZW06IEZpbGUgPSBldmVudDtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXI9IGltYWdlbS5uYW1lO1xuICAgIHJldHVybiB0aGlzLmZpbGVTZWxlY3RlZC5uZXh0KGltYWdlbSk7XG4gICAgfVxuXG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFVwbG9hZEZpbGVDb21wb25lbnQgfSBmcm9tICcuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBleHBvcnRzOltQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzIDogW1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0VXBsb2FkRmlsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU9wdGlvbnMsIE5neEdhbGxlcnlJbWFnZSwgTmd4R2FsbGVyeUFuaW1hdGlvbiB9IGZyb20gJ25neC1nYWxsZXJ5JztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWdhbGxlcnknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0R2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZ2FsbGVyeU9wdGlvbnM6IE5neEdhbGxlcnlPcHRpb25zW107XG4gIEBJbnB1dCgpIGdhbGxlcnlJbWFnZXM6IE5neEdhbGxlcnlJbWFnZVtdO1xuICBASW5wdXQoKSB3aWR0aDogYW55ID0gXCIxMDAlXCI7XG4gIEBJbnB1dCgpIGhlaWdodDogYW55ID0gJzQwMHB4JztcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmdhbGxlcnlPcHRpb25zID0gW1xuICAgICAge1xuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgdGh1bWJuYWlsc0NvbHVtbnM6IDQsXG4gICAgICAgIGltYWdlQW5pbWF0aW9uOiBOZ3hHYWxsZXJ5QW5pbWF0aW9uLlNsaWRlXG4gICAgICB9LFxuICAgICAgLy8gbWF4LXdpZHRoIDgwMFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA4MDAsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICBpbWFnZVBlcmNlbnQ6IDgwLFxuICAgICAgICB0aHVtYm5haWxzUGVyY2VudDogMjAsXG4gICAgICAgIHRodW1ibmFpbHNNYXJnaW46IDIwLFxuICAgICAgICB0aHVtYm5haWxNYXJnaW46IDIwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA0MDAsXG4gICAgICAgIHByZXZpZXc6IGZhbHNlXG4gICAgICB9XG4gICAgXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOZ3hHYWxsZXJ5TW9kdWxlIH0gZnJvbSAnbmd4LWdhbGxlcnknO1xuaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLCBOZ3hHYWxsZXJ5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0R2FsbGVyeUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0R2FsbGVyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0R2FsbGVyeU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJjb21wb25lbnRNYXBwZXIiLCJub29wIiwiQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQU1FLFlBQW1CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0tBQUs7OztZQUozRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjthQUM3Qjs7OztZQUptQixnQkFBZ0I7Ozs7Ozs7QUNBcEM7OzZCQUswQyxJQUFJLE9BQU8sRUFBTzt1Q0FDRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTs4QkFFckQs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QyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLEtBQVc7UUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9EO0tBQ0Y7Ozs7Ozs7SUFFRCxLQUFLLENBQUMsSUFBWSxFQUFFLEtBQVc7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlEO0tBQ0Y7Ozs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBWSxFQUFFLEVBQVU7UUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlEO0tBQ0Y7Ozs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQXNCO1FBRXRD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