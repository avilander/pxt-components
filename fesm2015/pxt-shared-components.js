import { Directive, ViewContainerRef, Injectable, Injector, Component, Inject, Input, ComponentFactoryResolver, ElementRef, NgModule, Pipe, EventEmitter, Output, ViewChild, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, forwardRef, HostListener, defineInjectable, inject, ChangeDetectorRef } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatMenuTrigger, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatLineModule, MatCommonModule, MatOptionModule, MatFormFieldModule, MatPseudoCheckboxModule, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Headers, Http, RequestOptions, XHRBackend, HttpModule } from '@angular/http';
import { MediaMatcher } from '@angular/cdk/layout';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { CommonModule, UpperCasePipe, DatePipe } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    /**
     * @return {?}
     */
    getUrlLogo() {
        return this.configService.getConfiguration('IMAGEM_LOGO', 'SGI');
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
                //console.log("error 400");
                this.openDialog(400);
                // this.tokenService.removeTokenStorage();
                //window.location.href = environment.esbApiPxt + "?erro=400";
                break;
            case 404:
                // console.log("error 400");
                this.openDialog(404);
                //this.tokenService.removeTokenStorage();
                //window.location.href = environment.esbApiPxt + "?erro=404";
                break;
            case 403:
                //console.log(403);
                this.openDialog(403);
                //this.tokenService.removeTokenStorage();
                //window.location.href = environment.esbApiPxt + "?erro=404";
                break;
            default:
                // console.log(error);
                this.openDialog(401);
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
            //console.log(this.urlHelper.getFrontSgi());
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
/** @type {?} */
const pxtConfiguration = { systemId: 104, systemPrex: "SGE_NEW" };

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class UserService {
    /**
     * @param {?} httpService
     * @param {?} helper
     */
    constructor(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
        this.path = 'usuarios';
        this.path = this.helper.getApiSgi() + this.path;
    }
    /**
     * @return {?}
     */
    logout() {
        localStorage.clear();
        window.location.href = this.helper.getFrontSgi() + '?prefixoSistema=' + pxtConfiguration.systemPrex;
    }
    /**
     * @return {?}
     */
    static getUsuarioLogado() {
        debugger;
        /** @type {?} */
        let usuario = {};
        if (localStorage.getItem('USRLGD') !== null) {
            /** @type {?} */
            let usuarioBase64 = atob(localStorage.getItem('USRLGD'));
            usuario = JSON.parse(usuarioBase64);
        }
        else {
            /** @type {?} */
            const decoded = /** @type {?} */ (jwt_decode(localStorage.getItem('token')));
            usuario.identificacaoAcesso = decoded.sub;
            usuario.codigoPessoa = decoded.person_id;
        }
        return usuario;
    }
    /**
     * @param {?} username
     * @return {?}
     */
    setUsuarioLogado(username) {
        this.buscarPorIdentificacaoAcesso(username).subscribe(val => {
            /** @type {?} */
            let usuario = {};
            usuario = val;
            if (usuario === null) {
                usuario = {};
            }
            /** @type {?} */
            let usuarioBase64 = btoa(JSON.stringify(usuario));
            localStorage.setItem('USRLGD', usuarioBase64);
        });
    }
    /**
     * @return {?}
     */
    static getRules() {
        debugger;
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().identificacaoAcesso);
        /** @type {?} */
        const authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
        /** @type {?} */
        let permissoes = authority.authorities;
        return permissoes;
    }
    /**
     * @param {?} identificacaoAcesso
     * @return {?}
     */
    buscarPorIdentificacaoAcesso(identificacaoAcesso) {
        return this.httpService.doGet(this.path + '/?identificador=' + identificacaoAcesso);
    }
}
UserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
UserService.ctorParameters = () => [
    { type: PxtHttpService },
    { type: HttpHelperService }
];
/** @nocollapse */ UserService.ngInjectableDef = defineInjectable({ factory: function UserService_Factory() { return new UserService(inject(PxtHttpService), inject(HttpHelperService)); }, token: UserService, providedIn: "root" });

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
     * @param {?} userService
     * @param {?} httpHelperService
     */
    constructor(changeDetectorRef, media, componentFactoryResolver, pxtAppComponentService, userService, httpHelperService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.pxtAppComponentService = pxtAppComponentService;
        this.userService = userService;
        this.httpHelperService = httpHelperService;
        //Properties
        this.routes = [];
        this.groups = [];
        this.menus = [];
        this.system = "SYSTEM NAME";
        this.urlImg = 'http://imagensdsv.peixoto.com.br/auth/mini_logo.png';
        this.menuSelected = "";
        this.usuerLogged = {};
        this.shouldRun = true;
        this.currentAdIndex = -1;
        this.urlLogo = '';
        setTimeout(() => {
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
        }, 2000);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        clearInterval(this.interval);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.urlLogo = this.httpHelperService.getUrlLogo();
        if (this.urlLogo.endsWith('/')) {
            this.urlLogo = this.urlLogo.substring(0, this.urlLogo.length - 1);
        }
        //this.atualizarMenuRotaAtual();
        this.findUserLogged();
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
    ;
    /**
     * @return {?}
     */
    logout() {
        this.userService.logout();
    }
    ;
    /**
     * @return {?}
     */
    findUserLogged() {
        setTimeout(() => {
            this.usuerLogged = UserService.getUsuarioLogado();
        }, 2000);
    }
}
PxtAppComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-app',
                template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button style=\"z-index: 1;\" (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <img [src]=\"urlLogo\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{system | uppercaseFirst}}</h1>\n    <h1 class=\"system\" *ngIf=\"!mobileQuery.matches\">{{menuSelected | uppercaseFirst}}</h1>\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button [matMenuTriggerFor]=\"notification\"><mat-icon>notifications</mat-icon> </button>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    <mat-menu #notification=\"matMenu\" [overlapTrigger]=\"false\">\n        <span disabled mat-menu-item><small>Sem novas notifica\u00E7\u00F5es</small></span>\n      </mat-menu>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <span disabled mat-menu-item *ngIf=\"usuerLogged\" ><small>Ol\u00E1, {{usuerLogged.nome | uppercaseFirst}}</small></span>\n      <button mat-menu-item (click)=\"logout()\">\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [mode]=\"'over'\" [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n      <span *ngFor=\"let item of menus\">\n        <!-- Handle branch node menu items -->\n        <span *ngIf=\"item.childs && item.childs.length > 0\" >\n          <button mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\" [isUserInRule]=\"item?.isUserInRule\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <pxt-app-menu-item #menu [items]=\"item.childs\"></pxt-app-menu-item>\n        </span>\n        <!-- Handle leaf node menu items -->\n        <span *ngIf=\"!item.childs || item.childs.length === 0\">\n          <button *ngIf=\"item.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"selectItemMenu(item)\" [isUserInRule]=\"item?.isUserInRule\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <button *ngIf=\"item.menuType=='group'\" mat-menu-item color=\"primary\" [isUserInRule]=\"item?.isUserInRule\" >\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n        </span>\n      </span>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n\n</div>",
                styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}.form{margin-left:10px;border:2px solid #d3d3d3;width:600px;padding-left:5px;margin-top:10px}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}pxt-input{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
PxtAppComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: MediaMatcher },
    { type: ComponentFactoryResolver },
    { type: undefined, decorators: [{ type: Inject, args: [PxtAppComponentService,] }] },
    { type: UserService },
    { type: HttpHelperService }
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
                template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n  <span *ngFor=\"let child of items\">\n    <!-- Handle branch node menu items -->\n    <span *ngIf=\"child.childs && child.childs.length > 0\" [isUserInRule]=\"child.isUserInRule\">\n      <a mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\"  [isUserInRule]=\"child.isUserInRule\" >\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n      <pxt-app-menu-item #menu [items]=\"child.childs\" [isUserInRule]=\"child.isUserInRule\"></pxt-app-menu-item>\n    </span>\n    <!-- Handle leaf node menu items -->\n    <span *ngIf=\"!child.childs || child.childs.length === 0\">\n      <a *ngIf=\"child.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"loadComponent(child)\" [isUserInRule]=\"child.isUserInRule\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n\n      <a *ngIf=\"child.menuType=='group'\" mat-menu-item color=\"primary\" [isUserInRule]=\"child.isUserInRule\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n    </span>\n  </span>\n</mat-menu>",
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
class RulesDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        debugger;
        /** @type {?} */
        let permissoes = this.getRules();
        this.el.nativeElement.style.display = permissoes.includes(this.rule) ? '' : 'none';
    }
    /**
     * @return {?}
     */
    getRules() {
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().login);
        /** @type {?} */
        const authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
        /** @type {?} */
        let permissoes = authority.authorities;
        return permissoes;
    }
}
RulesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[isUserInRule]'
            },] }
];
/** @nocollapse */
RulesDirective.ctorParameters = () => [
    { type: ElementRef }
];
RulesDirective.propDecorators = {
    rule: [{ type: Input, args: ['isUserInRule',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DirectiveModule {
}
DirectiveModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [RulesDirective],
                exports: [RulesDirective]
            },] }
];

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
                    PipeModule,
                    DirectiveModule
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
class VisibleInRolesGuard {
    /**
     * @param {?} router
     * @param {?} httpHelper
     * @param {?} authorityService
     * @param {?} userService
     */
    constructor(router, httpHelper, authorityService, userService) {
        this.router = router;
        this.httpHelper = httpHelper;
        this.authorityService = authorityService;
        this.userService = userService;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        const token = localStorage.getItem('token');
        debugger;
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
                else {
                    /** @type {?} */
                    const authority = jwt_decode(tokenAuthorities);
                    this.userService.setUsuarioLogado(decoded.sub); // envia username
                    if (decoded.exp === undefined) {
                        return false;
                    }
                }
                //----------------------------------------------------------------------------------------------------------------------
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
    { type: AuthorityService },
    { type: UserService }
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
        return next.handle(request)
            .pipe(tap(event => {
        }, error => {
            // http response status code
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
                    DirectiveModule,
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
    }
    /**
     * @return {?}
     */
    applyFilterArray() {
        if (this.filters.length > 0) {
            this.filters.forEach(filter => {
                filter = filter.name.trim();
                filter = filter.toLowerCase();
                this.dataSource.filter = filter;
            });
        }
        else {
            this.applyFilter("");
        }
    }
    /**
     * @return {?}
     */
    applyFilterx() {
        /** @type {?} */
        const tableFilters = [];
        this.filters.forEach((filter) => {
            tableFilters.push({
                id: "nomeImagem",
                value: filter.name
            });
        });
        this.dataSource.filter = JSON.stringify(tableFilters);
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
     * @param {?} filter
     * @return {?}
     */
    remove(filter) {
        /** @type {?} */
        const index = this.filters.indexOf(filter);
        if (index >= 0) {
            this.filters.splice(index, 1);
        }
        this.applyFilterArray();
    }
}
PxtFilterMatTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-filter-mat-table',
                template: "<mat-card class=\"card-filter\" >\n    <div class=\"filters\">\n        <mat-form-field class=\"example-chip-list\">\n            <mat-chip-list #chipList>\n              <mat-chip *ngFor=\"let filter of filters\" [selectable]=\"selectable\"\n                       [removable]=\"removable\" (removed)=\"remove(filter)\">\n                {{filter.name}}\n                <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon>\n              </mat-chip>\n              <input [placeholder]=\"placeholder\"\n                     [matChipInputFor]=\"chipList\"\n                     [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n                     [matChipInputAddOnBlur]=\"addOnBlur\"\n                     (matChipInputTokenEnd)=\"add($event)\">\n            </mat-chip-list>\n          </mat-form-field>\n    </div>\n  </mat-card >",
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

export { PxtAppModule, PxtAppComponent, PxtContentModule, PxtContentComponent, MaterialAngularModule, PxtSubmenusModule, PxtSubmenusComponent, PxtDatePickerModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1 as CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, PxtDatepickerComponent, PxtDialogModule, PxtDialogComponent, PxtFilterModule, PxtFilterComponent, PxtDialogFilterCustomModule, PxtDialogFilterCustomComponent, PxtSelectModule, PipeModule, PxtInputFilterModule, PxtInputFilterComponent, PxtFilterMatTableModule, ControllerPipe, PxtAppComponentService, PxtHttpService, ConfigService, HttpHelperService, RequestBaseService, VisibleInRolesGuard, AuthorityService, pxtConfiguration, pxtFields, pxtEnumTagHtml, PxtUploadFileModule, PxtGalleryModule, PxtGalleryComponent, pxtCheckboxField, pxtfilterCustomField, pxtDateField, pxtFilterField, pxtInputField, pxtRadioButtonField, pxtSelectField, HashDirective as ɵm, DirectiveModule as ɵd, DynamicFieldDirective as ɵbd, DynamicFieldDirectiveDialog as ɵbc, PxtContentBody as ɵh, RulesDirective as ɵe, PxtAppMenuItemComponent as ɵg, PxtAppMenuItemModule as ɵf, PxtDialogFilterComponent as ɵbb, PxtDialogFilterModule as ɵba, PxtFilterMatTableComponent as ɵbe, PxtUploadFileComponent as ɵbf, PxtButtonComponent as ɵr, PxtButtonModule as ɵq, PxtCheckboxComponent as ɵz, PxtCheckboxModule as ɵy, PxtDateComponent as ɵt, PxtDateModule as ɵs, PxtInputComponent as ɵp, PxtInputModule as ɵo, PxtRadiobuttonComponent as ɵx, PxtRadiobuttonModule as ɵw, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR as ɵu, PxtSelectComponent as ɵv, DateFormatPipe as ɵb, DateTimeFormatPipe as ɵc, UpercaseFirst as ɵa, ErrorService as ɵl, HttpErrorHandler as ɵk, TokenService as ɵj, InterceptService as ɵn, UserService as ɵi };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3Rva2VuLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvZXJyb3Iuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvaHR0cC1lcnJvci1oYW5kbGVyLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2RlbHMvcHh0Q29uZmlndXJhdGlvbi50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3VwcGVyY2FzZS1maXJzdC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvdXRpbC9jb25zdGFudHMudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtdGltZS1mb3JtYXQucGlwZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvY29udHJvbGxlci5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvcnVsZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2RpcmVjdGl2ZS9kaXJlY3RpdmUubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC1tZW51LWl0ZW0vcHh0LWFwcC1tZW51LWl0ZW0ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL0hhc2hEaXJlY3RpdmUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC92aXNpYmxlLWluLXJvbGVzLmd1YXJkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaW50ZXJjZXB0b3IvaW50ZXJjZXB0LXNlcnZpY2UgLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZGF0ZS1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1maWx0ZXItZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXIvcHh0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci9weHQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci1tYXQtdGFibGUvcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXItbWF0LXRhYmxlL3B4dC1maWx0ZXItbWF0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWVsZHMtbW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2VudW0vcHh0LWVudW0tdGFnLWh0bWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3VibWVudXNJdGVuczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnN1Ym1lbnVzSXRlbnMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRDb21wb25lbnRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9sb2FkQ29tcG9uZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldFVzZXJMb2dnZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VyTG9nZ2VkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0VXNlckxvZ2dlZC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRJbmZvSW5pdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9Jbml0aWFsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRJbmZvSW5pdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZXRTdWJtZW51cyhyb3V0ZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VibWVudXNJdGVucy5uZXh0KHJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbEluZm8oaW5mb0luaXRpYWwpIHtcclxuICAgICAgICB0aGlzLl9zZXRJbmZvSW5pdC5uZXh0KGluZm9Jbml0aWFsKVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50Lm5leHQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NldFVzZXJMb2dnZWQubmV4dCh1c2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBjb25maWc6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgbG9hZCh1cmw6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5qZWN0SHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGluamVjdEh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgICBtYXAocmVzID0+IHJlcylcclxuICAgICAgKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWd1cmF0aW9uKGVsZW1lbnQ6IHN0cmluZywgZGF0YUxpc3Q/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZGF0YUxpc3QpIHtcclxuICAgICAgY29uc3QgdXJsV2l0aEVsZW1lbnQgPSB0aGlzLmNvbmZpZ1tlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhEYXRhTGlzdCA9IHRoaXMuY29uZmlnW2RhdGFMaXN0XVtlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhEYXRhTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2ZXJpZnlVcmwodHlwZU1vZGVsOiBhbnkpIHtcclxuICAgIGlmICh0eXBlTW9kZWwuaW5jbHVkZXMoJy8nLCB0eXBlTW9kZWwubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgY29uc3QgdHlwZVJlbGVhc2UgPSB0eXBlTW9kZWw7XHJcbiAgICAgIHJldHVybiB0eXBlUmVsZWFzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlTW9kZWwgKyAnLyc7XHJcbiAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEZyb250U2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdGUk9OVCcsICdTR0knKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpVXJsIChuYW1lLCB1cmwpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbih1cmwsIG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVybExvZ28oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ0lNQUdFTV9MT0dPJywgJ1NHSScpO1xyXG4gIH1cclxufSIsIlxuZXhwb3J0IGNvbnN0IGVudmlyb25tZW50ID0ge1xuICBwcm9kdWN0aW9uOiB0cnVlLFxuICBlbnZOYW1lOiAnZGV2JyxcbiAgdmVyc2lvbjogJzAuMC4xJyxcbiAgQ09ORklHX0ZJTEU6ICdhc3NldHMvY29uZmlnL2Vudi5qc29uJyxcbiAgZXNiQXBpUHh0IDogXCJodHRwOi8vZXNiZHN2LnBlaXhvdG8uY29tLmJyL3NnZS9cIiwgIFxuICBzeXN0ZW06IHtcbiAgICBpZDogMTA4LFxuICAgIHByZXg6IFwiUE9SQ1JQXCJcbiAgfVxufTtcblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG52YXIgc3lzdGVtID0gZW52aXJvbm1lbnQuc3lzdGVtO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICB9XG4gIHNldFRva2VuU3RvcmFnZShyZXM6IGFueSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICB9XG4gIHJlbW92ZVRva2VuU3RvcmFnZSgpIHtcbiAgICB2YXIgdG9rZW4gPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICBjb25zdCBkZWNvZGVkID0gPGFueT4gand0X2RlY29kZSh0b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3lzdGVtLmlkK3N5c3RlbS5wcmV4K2RlY29kZWQuc3ViKTtcbiAgfVxuICBcbiAgZGVsZXRlVG9rZW4oKSB7XG4gICAgdGhpcy5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgfVxuXG4gIHRva2VuRXhpc3RzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gbnVsbCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gdW5kZWZpbmVkICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1weHQtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGZhbHNlKTtcbiAgfVxuICBjb25maXJtYXRpb24oKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEVycm9yU2VydmljZSB7XHJcblxyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nID0gXCJcIjtcclxuICBcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG5leHBvcnQgdHlwZSBIYW5kbGVFcnJvciA9IDxUPiAob3BlcmF0aW9uPzogc3RyaW5nLCByZXN1bHQ/OiBUKSA9PiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBPYnNlcnZhYmxlPFQ+O1xyXG5cclxuLyoqIEhhbmRsZXMgSHR0cENsaWVudCBlcnJvcnMgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEVycm9ySGFuZGxlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UpIHsgfVxyXG5cclxuICAvKiogQ3JlYXRlIGhhbmRsZUVycm9yIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBrbm93cyB0aGUgc2VydmljZSBuYW1lICovXHJcbiAgY3JlYXRlSGFuZGxlRXJyb3IgPSAoc2VydmljZU5hbWUgPSAnJykgPT4gPFQ+XHJcbiAgICAob3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdCA9IHt9IGFzIFQpID0+IHRoaXMuaGFuZGxlRXJyb3Ioc2VydmljZU5hbWUsIG9wZXJhdGlvbiwgcmVzdWx0KTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHNlcnZpY2VOYW1lOiBuYW1lIG9mIHRoZSBkYXRhIHNlcnZpY2VcclxuICAgKiBAcGFyYW0gb3BlcmF0aW9uOiBuYW1lIG9mIHRoZSBmYWlsZWQgb3BlcmF0aW9uXHJcbiAgICogQHBhcmFtIHJlc3VsdDogb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAqL1xyXG4gIGhhbmRsZUVycm9yPFQ+IChzZXJ2aWNlTmFtZSA9ICcnLCBvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0ID0ge30gYXMgVCkge1xyXG5cclxuICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgIC8vIFRvZG8gLT4gU2VuZCB0aGUgZXJyb3IgdG8gcmVtb3RlIGxvZ2dpbmcgaW5mcmFzdHJ1Y3R1cmVcclxuICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxyXG5cclxuICAgICAgY29uc3QgbWVzc2FnZSA9IChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yRXZlbnQpID9cclxuICAgICAgICBlcnJvci5lcnJvci5tZXNzYWdlIDpcclxuICAgICAgIGB7ZXJyb3IgY29kZTogJHtlcnJvci5zdGF0dXN9LCBib2R5OiBcIiR7ZXJyb3IubWVzc2FnZX1cIn1gO1xyXG5cclxuICAgICAgLy8gVG9kbyAtPiBUcmFuc2Zvcm1pbmcgZXJyb3IgZm9yIHVzZXIgY29uc3VtcHRpb25cclxuICAgICAgdGhpcy5lcnJvclNlcnZpY2UuZXJyb3JNZXNzYWdlID0gYCR7c2VydmljZU5hbWV9IC0+ICR7b3BlcmF0aW9ufSBmYWlsZWQuXFxuICBNZXNzYWdlOiAke21lc3NhZ2V9YDtcclxuICAgICAgLy8gLT4gUmV0dXJuIGEgc2FmZSByZXN1bHQuXHJcbiAgICAgIHJldHVybiBvZiggcmVzdWx0ICk7XHJcbiAgICB9O1xyXG4gIH1cclxufSIsImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdCwgZm9yd2FyZFJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNBcmdzLCBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiwgZmluYWxpemUsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi8uLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vLi4vLi4vbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JIYW5kbGVyLCBIYW5kbGVFcnJvciB9IGZyb20gJy4vaHR0cC1lcnJvci1oYW5kbGVyJztcblxuLy9pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vSHR0cEhlbHBlclNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHh0SHR0cFNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcblxuICBwcml2YXRlIGhhbmRsZUVycm9yOiBIYW5kbGVFcnJvcjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kLFxuICAgIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgdXJsSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBodHRwRXJyb3JIYW5kbGVyOiBIdHRwRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGJhY2tlbmQsIG9wdGlvbnMpO1xuICAgIHRoaXMuaGFuZGxlRXJyb3IgPSBodHRwRXJyb3JIYW5kbGVyLmNyZWF0ZUhhbmRsZUVycm9yKCdDdXN0b21lclNlcnZpY2UnKTtcbiAgfVxuXG4gIHVybFJlcXVlc3Q6IGFueTtcbiAgb3JpZ1JlcXVlc3Q6IFJlcXVlc3Q7XG4gIGlzVW5hdGhvdXJpemVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBDb250cm9sIFNlcnZpY2VzXG4gICAqL1xuICBnZXRIZWFkZXJzKCkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDYWNoZS1Db250cm9sJywgJ25vLXN0b3JlJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ1ByYWdtYScsICduby1jYWNoZScpO1xuXG4gICAgaGVhZGVycy5hcHBlbmQoXCJDYWNoZS1Db250cm9sXCIsIFwibm8tY2FjaGVcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIiwgXCJ0cnVlXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgSEVBRCwgUE9TVCwgUFVULCBQQVRDSCwgREVMRVRFLCBPUFRJT05TXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkNvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbiwgQWNjZXB0XCIpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgaGFuZGxlUmVzcG9uc2Uob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxSZXNwb25zZT4sIHVybD86IHN0cmluZykge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGNvbnN0IG9yaWcgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJlc3VsdCA9IG9ic2VydmFibGUucGlwZShcbiAgICAgLy8gY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdhZGRDdXN0b21lcicsIG51bGwpKSxcbiAgICAgIFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25DYXRjaChlcnJvcik7XG4gICAgICB9KSxcbiAgICAgIFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uUmVzdWx0KHJlcyk7XG4gICAgICB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBvblJlc3VsdChyZXMpIHtcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIGlmIChyZXMuc3RhdHVzID09IDIwMSkge1xuICAgICAgcmV0dXJuIHJlcy5fYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICB9XG5cbiAgZG9HZXQoYXBpOiBzdHJpbmcsIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICAvLyB0aGlzLnByZUxvYWRlclNlcnZpY2UudXBkYXRlKHRydWUpO1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKSk7XG4gIH1cblxuICBkb1Bvc3QoZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gZW5kcG9pbnQ7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wb3N0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1B1dChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucHV0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1BhdGgoYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBhdGNoKHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb0RlbGV0ZShhcGk6IHN0cmluZywgcGFyYW1zOiBhbnksIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgdXJsUGFyYW0gPSB1cmwgKyAnLycgKyBwYXJhbXM7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmRlbGV0ZSh1cmxQYXJhbSwgcmVxdWVzdE9wdGlvbnMpLCB1cmxQYXJhbSk7XG4gIH1cblxuXG4gIHJlcXVlc3QodXJsOiBzdHJpbmcgfCBSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIG9wdGlvbnMgPSB0aGlzLnJlcXVlc3RBcmdzKG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy51cmxSZXF1ZXN0ID0gdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmwudXJsO1xuICAgICAgdGhpcy5vcmlnUmVxdWVzdCA9IHVybDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy51cmxSZXF1ZXN0ICE9PSBlbnZpcm9ubWVudC5DT05GSUdfRklMRSkge1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpO1xuICAgICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5vcmlnUmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cmwgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJldHVybiBzdXBlci5yZXF1ZXN0KHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RBcmdzKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zQXJncyk6IFJlcXVlc3RPcHRpb25zQXJncyB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuICBwdWJsaWMgb25DYXRjaChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKCF0aGlzLmlzVW5hdGhvdXJpemVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMSk7XG4gICAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDFcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVW5hdGhvdXJpemVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwMDpcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMCk7XG4gICAgICAgIC8vIHRoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwNDpcbiAgICAgICAvLyBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwNClcbiAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDA0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDM6XG4gICAgICAgIC8vY29uc29sZS5sb2coNDAzKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMylcbiAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDA0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHRoaXMub3BlbkRpYWxvZyg0MDEpO1xuICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89MFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG5cblxuICBvcGVuRGlhbG9nKGVycm8pIHtcbiAgICB2YXIgY29udGVudERpYWxvZyA9IFwiVm9jw4PCqiBzZXLDg8KhIHJlZGlyZWNpb25hZG8gYSB0ZWxhIGRlIGF1dGVudGljYcODwqfDg8KjbyFcIlxuXG4gICAgbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUHh0RGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgIGRhdGE6IHsgdGl0bGVEaWFsb2c6IFwiRXJybyAtIFwiICsgZXJybywgY29udGVudERpYWxvZzogY29udGVudERpYWxvZyB9XG4gICAgfSk7XG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMudXJsSGVscGVyLmdldEZyb250U2dpKCkpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnVybEhlbHBlci5nZXRGcm9udFNnaSgpICsgXCI/ZXJybz1cIiArIGVycm87XG4gICAgfSk7XG5cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHB4dENvbmZpZ3VyYXRpb24gPSB7c3lzdGVtSWQ6IDEwNCAsc3lzdGVtUHJleDogXCJTR0VfTkVXXCJ9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9weHRDb25maWd1cmF0aW9uXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIHBhdGggPSAndXN1YXJpb3MnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLnBhdGggPSB0aGlzLmhlbHBlci5nZXRBcGlTZ2koKSsgdGhpcy5wYXRoO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5oZWxwZXIuZ2V0RnJvbnRTZ2koKSArICc/cHJlZml4b1Npc3RlbWE9JyArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VXN1YXJpb0xvZ2FkbygpOiBhbnkge1xuICAgIGRlYnVnZ2VyXG4gICAgbGV0IHVzdWFyaW86IGFueSA9IHt9O1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVVNSTEdEJykgIT09IG51bGwpIHtcbiAgICAgIGxldCB1c3VhcmlvQmFzZTY0OiBzdHJpbmcgPSBhdG9iKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVU1JMR0QnKSk7XG4gICAgICB1c3VhcmlvID0gSlNPTi5wYXJzZSh1c3VhcmlvQmFzZTY0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+and0X2RlY29kZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG4gICAgICB1c3VhcmlvLmlkZW50aWZpY2FjYW9BY2Vzc28gPSBkZWNvZGVkLnN1YjtcbiAgICAgIHVzdWFyaW8uY29kaWdvUGVzc29hID0gZGVjb2RlZC5wZXJzb25faWQ7XG4gICAgfVxuICAgIHJldHVybiB1c3VhcmlvO1xuICB9XG5cbiAgc2V0VXN1YXJpb0xvZ2Fkbyh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5idXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKHVzZXJuYW1lKS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIGxldCB1c3VhcmlvOiBhbnkgPSB7fTtcbiAgICAgIHVzdWFyaW8gPSB2YWw7XG4gICAgICBpZiAodXN1YXJpbyA9PT0gbnVsbCkge1xuICAgICAgICB1c3VhcmlvID0ge307XG4gICAgICB9XG4gICAgICBsZXQgdXN1YXJpb0Jhc2U2NDogc3RyaW5nID0gYnRvYShKU09OLnN0cmluZ2lmeSh1c3VhcmlvKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVVNSTEdEJywgdXN1YXJpb0Jhc2U2NCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFJ1bGVzKCk6IHN0cmluZ1tdIHtcbiAgICBkZWJ1Z2dlclxuICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArcHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1QcmV4ICsgVXNlclNlcnZpY2UuZ2V0VXN1YXJpb0xvZ2FkbygpLmlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICAgIGNvbnN0IGF1dGhvcml0eSA9IDxhbnk+and0X2RlY29kZSh0b2tlbkF1dGhvcml0aWVzKTtcbiAgICBsZXQgcGVybWlzc29lczogc3RyaW5nW10gPSBhdXRob3JpdHkuYXV0aG9yaXRpZXM7XG4gICAgcmV0dXJuIHBlcm1pc3NvZXM7XG4gIH1cblxuICBidXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKGlkZW50aWZpY2FjYW9BY2Vzc286IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMucGF0aCArICcvP2lkZW50aWZpY2Fkb3I9JyArIGlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgSW5wdXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQeHRBcHAgfSBmcm9tICcuL3B4dC1hcHAnO1xuaW1wb3J0IHsgUHh0QXBwTW9kZWwgfSBmcm9tICcuL21vZGVsL3B4dC1hcHAubW9kZWwnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0TWVudSwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2FmZUh0bWwsIERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC5jb21wb25lbnQuc2NzcyddXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50IHtcblxuICAvL1Byb3BlcnRpZXNcbiAgcm91dGVzOiBhbnlbXSA9IFtdO1xuICBncm91cHM6IGFueVtdID0gW107XG4gIG1lbnVzOiBhbnlbXSA9IFtdO1xuICBzeXN0ZW06IFN0cmluZyA9IFwiU1lTVEVNIE5BTUVcIlxuICB1cmxJbWc6IHN0cmluZyA9ICdodHRwOi8vaW1hZ2Vuc2Rzdi5wZWl4b3RvLmNvbS5ici9hdXRoL21pbmlfbG9nby5wbmcnO1xuICBtZW51U2VsZWN0ZWQgPSBcIlwiO1xuICB1c3VlckxvZ2dlZDogYW55ID0ge307XG4gIG1lbnVzSHRtbDogU2FmZUh0bWw7XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgX21vYmlsZVF1ZXJ5TGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF0TWVudTogTWF0TWVudTtcbiAgQFZpZXdDaGlsZCgnbWVudXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgc3ViQ29udGFpbmVyMTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnVUcmlnZ2VyJywgeyByZWFkOiBNYXRNZW51VHJpZ2dlciB9KSBjb250ZXh0TWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuICBtZW51c1JlY2VpdmVkOiBhbnlbXTtcbiAgdXJsTG9nbzogc3RyaW5nID0gJyc7XG5cbiAgLy9Db25zdHJ1Y3RvclxuICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgbWVkaWE6IE1lZGlhTWF0Y2hlcixcbiAgICBwdWJsaWMgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQEluamVjdChQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSBwdWJsaWMgcHh0QXBwQ29tcG9uZW50U2VydmljZSxcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGh0dHBIZWxwZXJTZXJ2aWNlOiBIdHRwSGVscGVyU2VydmljZSxcbiAgKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1vYmlsZVF1ZXJ5ID0gbWVkaWEubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNjAwcHgpJyk7XG4gICAgICB0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyID0gKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5tb2JpbGVRdWVyeS5hZGRMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICAgIHRoaXMucmVzdWx0ID0gcHh0QXBwQ29tcG9uZW50U2VydmljZS5pbmZvSW5pdGlhbC5zdWJzY3JpYmUoaW5mb0luaXRpYWwgPT4ge1xuICAgICAgICBpZiAoaW5mb0luaXRpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy51c3VlckxvZ2dlZCA9IGluZm9Jbml0aWFsLnVzZXJMb2dnZWQ7XG4gICAgICAgICAgdGhpcy5zeXN0ZW0gPSBpbmZvSW5pdGlhbC5zeXN0ZW07XG4gICAgICAgICAgdGhpcy5tZW51c1JlY2VpdmVkID0gaW5mb0luaXRpYWwuc2lkZUJhck1lbnVzO1xuICAgICAgICAgIHRoaXMubWVudXMgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgICAgdGhpcy5wcmVwYXJlTWVudSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlQ29tcG9uZW50KCk7XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVybExvZ28gPSB0aGlzLmh0dHBIZWxwZXJTZXJ2aWNlLmdldFVybExvZ28oKTtcbiAgICBpZiAodGhpcy51cmxMb2dvLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgIHRoaXMudXJsTG9nbyA9IHRoaXMudXJsTG9nby5zdWJzdHJpbmcoMCwgdGhpcy51cmxMb2dvLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICAvL3RoaXMuYXR1YWxpemFyTWVudVJvdGFBdHVhbCgpO1xuICAgIHRoaXMuZmluZFVzZXJMb2dnZWQoKTtcbiAgfVxuXG4gIC8vIEluY2x1ZGUgb2YgY29tcG9uZW50cyBpbiB0aGUgYXBwbGljYXRpb24gYm9keVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnksIGFkSG9zdCkge1xuICAgIHRoaXMubWVudVNlbGVjdGVkID0gcm91dGUubWVudVRleHQ7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlLm1lbnVTb3VyY2U7XG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShhZEl0ZW0uY29tcG9uZW50KTtcbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IGFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cblxuICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZpY2UgcmVzcG9uc2libGUgZm9yIGluY2x1ZGluZyBjb21wb25lbnRzIGluIHRoZSBib2R5IG9mIHRoZSBhcHBsaWNhdGlvblxuICBzdWJzY3JpYmVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnRPYnNlcnZhYmxlLnN1YnNjcmliZShjb21wb25lbnRPYmogPT4ge1xuICAgICAgdmFyIGFycmF5QXV4ID0gdGhpcy5tZW51c1JlY2VpdmVkLmZpbHRlcih4ID0+IHgubWVudVNvdXJjZSAhPSB1bmRlZmluZWQgJiYgeC5tZW51U291cmNlLmNvbXBvbmVudCA9PT0gY29tcG9uZW50T2JqLmNvbXBvbmVudCk7XG4gICAgICBpZiAoYXJyYXlBdXgubGVuZ3RoID09IDEpIHtcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSBhcnJheUF1eFswXS5tZW51VGV4dDtcbiAgICAgIH1cbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50T2JqLmNvbXBvbmVudCk7XG4gICAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuYWRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICBsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICAoPEFkQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YSA9IGNvbXBvbmVudE9iai5kYXRhO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gUmVzcG9uc2libGUgZm9yIGNhbGwgbWV0aG9kIFwibG9hZGNvbXBvbmVudHMoKVwiIGluZm9ybWluZyBwYXJhbWV0ZXJzXG4gIHNlbGVjdEl0ZW1NZW51KG5hdikge1xuICAgIHRoaXMubG9hZENvbXBvbmVudChuYXYsIHRoaXMuYWRIb3N0KTtcbiAgfVxuXG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgcHJlcGFyaW5nIGFwcGxpY2F0aW9uIG1lbnVzO1xuICBwcmVwYXJlTWVudSgpIHtcbiAgICBsZXQgYXJyYXlBdXg6IGFueVtdO1xuICAgIGFycmF5QXV4ID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiZ3JvdXBcIiAmJiB4Lm1lbnVQYXJlbnQgPT0gXCJcIik7XG4gICAgdmFyIGFycmF5QXV4R3JvdXAgPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJncm91cFwiICYmIHgubWVudVBhcmVudCAhPT0gXCJcIik7XG4gICAgdmFyIGFycmF5QXV4SXRlbSA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcIml0ZW1cIiAmJiB4Lm1lbnVQYXJlbnQgIT09IFwiXCIpO1xuXG4gICAgLy9hZGQgaXRlbnMgaW4gZ3JvdXBzXG4gICAgYXJyYXlBdXhJdGVtLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eEdyb3VwLmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy9hZGQgZ3JvdXBzIGluIGdyb3Vwc1xuICAgIGFycmF5QXV4R3JvdXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4R3JvdXAuZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pXG4gICAgICB9O1xuICAgIH0pO1xuICAgIC8vYWRkIGdyb3VwcyBpbiBzdXBlci1ncm91cHNcbiAgICBhcnJheUF1eEdyb3VwLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvL2FkZCBpdGVucyBpbiBzdXBlci1ncm91cHNcbiAgICBhcnJheUF1eEl0ZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHZhciBhcnJheVRtcCA9IGFycmF5QXV4LmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB0aGlzLm1lbnVzID0gYXJyYXlBdXg7XG4gIH07XG5cbiAgbG9nb3V0KCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UubG9nb3V0KCk7XG4gIH07XG5cbiAgZmluZFVzZXJMb2dnZWQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVzdWVyTG9nZ2VkID0gVXNlclNlcnZpY2UuZ2V0VXN1YXJpb0xvZ2FkbygpO1xuICAgIH0sIDIwMDApO1xuICB9XG59XG4iLCJpbXBvcnQgJy4vLi4vLi4vLi4vcG9seWZpbGxzJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge0Nka1RhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtDZGtUcmVlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgTWF0QmFkZ2VNb2R1bGUsXG4gIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICBNYXRCdXR0b25Nb2R1bGUsXG4gIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgTWF0Q2FyZE1vZHVsZSxcbiAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gIE1hdENoaXBzTW9kdWxlLFxuICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICBNYXREaWFsb2dNb2R1bGUsXG4gIE1hdERpdmlkZXJNb2R1bGUsXG4gIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgTWF0R3JpZExpc3RNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRMaXN0TW9kdWxlLFxuICBNYXRNZW51TW9kdWxlLFxuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gIE1hdFJhZGlvTW9kdWxlLFxuICBNYXRSaXBwbGVNb2R1bGUsXG4gIE1hdFNlbGVjdE1vZHVsZSxcbiAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgTWF0U2xpZGVyTW9kdWxlLFxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgTWF0U25hY2tCYXJNb2R1bGUsXG4gIE1hdFNvcnRNb2R1bGUsXG4gIE1hdFN0ZXBwZXJNb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRUYWJzTW9kdWxlLFxuICBNYXRUb29sYmFyTW9kdWxlLFxuICBNYXRUb29sdGlwTW9kdWxlLFxuICBNYXRUcmVlTW9kdWxlLFxuICBNYXRMaW5lTW9kdWxlLFxuICBNYXRDb21tb25Nb2R1bGUsXG4gIE1hdE9wdGlvbk1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge3BsYXRmb3JtQnJvd3NlckR5bmFtaWN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG5pbXBvcnQge0Jyb3dzZXJBbmltYXRpb25zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ2RrVHJlZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxNYXRJY29uTW9kdWxlLE1hdExpbmVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxNYXRTb3J0TW9kdWxlLE1hdFRhYnNNb2R1bGUsTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxNYXRDaGlwc01vZHVsZSxNYXRJbnB1dE1vZHVsZSxNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxNYXRCdXR0b25Nb2R1bGUsTWF0Q29tbW9uTW9kdWxlLE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsTWF0UmlwcGxlTW9kdWxlLE1hdFNlbGVjdE1vZHVsZSxNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxNYXRTaWRlbmF2TW9kdWxlLE1hdFN0ZXBwZXJNb2R1bGUsTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLE1hdFRvb2x0aXBNb2R1bGUsTWF0Q2hlY2tib3hNb2R1bGUsTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsTWF0RXhwYW5zaW9uTW9kdWxlLE1hdEZvcm1GaWVsZE1vZHVsZSxNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxNYXROYXRpdmVEYXRlTW9kdWxlLE1hdEJvdHRvbVNoZWV0TW9kdWxlLE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxNYXRCdXR0b25Ub2dnbGVNb2R1bGUsTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBCcm93c2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLE1hdENhcmRNb2R1bGUsTWF0SWNvbk1vZHVsZSxNYXRMaW5lTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsTWF0U29ydE1vZHVsZSxNYXRUYWJzTW9kdWxlLE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsTWF0Q2hpcHNNb2R1bGUsTWF0SW5wdXRNb2R1bGUsTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsTWF0QnV0dG9uTW9kdWxlLE1hdENvbW1vbk1vZHVsZSxNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLE1hdFJpcHBsZU1vZHVsZSxNYXRTZWxlY3RNb2R1bGUsTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsTWF0U2lkZW5hdk1vZHVsZSxNYXRTdGVwcGVyTW9kdWxlLE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxNYXRUb29sdGlwTW9kdWxlLE1hdENoZWNrYm94TW9kdWxlLE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLE1hdEV4cGFuc2lvbk1vZHVsZSxNYXRGb3JtRmllbGRNb2R1bGUsTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsTWF0TmF0aXZlRGF0ZU1vZHVsZSxNYXRCb3R0b21TaGVldE1vZHVsZSxNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxNYXRBdXRvY29tcGxldGVNb2R1bGUsTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQ29tbW9uTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsQW5ndWxhck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gJy4vdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0QmFzZVNlcnZpY2Uge1xuXG4gIHB1YmxpYyBtb2RlbDogYW55O1xuICBwdWJsaWMgdXJsU2VydmljZTogc3RyaW5nO1xuICBwdWJsaWMgdXJsU2VydmljZUF1dG86IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBQeHRIdHRwU2VydmljZSxcbiAgICBwcml2YXRlIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSxcbiAgICBwdWJsaWMgX2h0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCk7XG4gIH1cbiAgbG9hZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMudXJsU2VydmljZUF1dG8pO1xuICB9O1xuICBzYXZlKG1vZGVsPzogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlQXV0bywgbW9kZWwpO1xuICB9O1xuICBkZWxldGUoaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZUF1dG8sIGlkKTtcbiAgfTtcblxuICBkb0dldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IE1hcDxhbnksIGFueT4pIHtcbiAgICBsZXQgdXJsXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkICYmIHBhcmFtcy5zaXplID4gMCkge1xuICAgICAgdXJsID0gcGF0aCArIHRoaXMuYnVpbGRSZXF1ZXN0UGFyYW1zKHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHBhdGg7XG4gICAgfVxuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldChwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlICsgdXJsKTtcbiAgICB9XG4gIH07XG5cbiAgZG9Qb3N0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBhbnkpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHBhdGgsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZSArIHBhdGgsIG1vZGVsKTtcbiAgICB9O1xuICB9O1xuXG4gIGRvUHV0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBhbnkpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQocGF0aCwgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dCh0aGlzLnVybFNlcnZpY2UgKyBwYXRoLCBtb2RlbCk7XG4gICAgfVxuICB9O1xuXG4gIGRvRGVsZXRlKHBhdGg6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZShwYXRoLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZSArIHBhdGgsIGlkKTtcbiAgICB9O1xuICB9O1xuXG4gIHVwbG9hZEltYWdlKHBhdGgsIHBhcmFtcz86IE1hcDxhbnksIGFueT4pOiBhbnkge1xuXG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpIDw9IC0xKSB7XG4gICAgICBwYXRoID0gdGhpcy51cmxTZXJ2aWNlICsgcGF0aCA7XG4gICAgfTtcblxuICAgIGNvbnN0IGhlYWRlciA9IHtcbiAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnLmNvbmNhdCh0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpKVxuICAgIH07XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSBuZXcgSHR0cEhlYWRlcnMoaGVhZGVyKTtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgY29uc3QgZm9ybWRhdGEgPSB0aGlzLnNldFBhcmFtc0Zvcm1kYXRhKHBhcmFtcyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KCdQT1NUJywgcGF0aCwgZm9ybWRhdGEsIHtcbiAgICAgIGhlYWRlcnM6IGh0dHBPcHRpb25zLFxuICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9odHRwQ2xpZW50LnJlcXVlc3QocmVxKTtcbiAgfVxuXG5cbiAgc2V0UGFyYW1zRm9ybWRhdGEocGFyYW1zOiBNYXA8YW55LCBhbnk+KTogRm9ybURhdGEge1xuICAgIGNvbnN0IGZvcm1kYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGxldCBwcmltZWlyYUl0ZXJhY2FvID0gdHJ1ZTtcbiAgICBwYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgZm9ybWRhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3JtZGF0YTtcbiAgfTtcblxuICBwcml2YXRlIGJ1aWxkUmVxdWVzdFBhcmFtcyhwYXJhbXM6IE1hcDxhbnksIGFueT4pOiBzdHJpbmcge1xuICAgIGxldCBmaW5hbCA9ICcnO1xuICAgIGxldCBwcmltZWlyYUl0ZXJhY2FvID0gdHJ1ZTtcbiAgICBwYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgaWYgKHByaW1laXJhSXRlcmFjYW8pIHtcbiAgICAgICAgZmluYWwgKz0gJz8nICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICAgIHByaW1laXJhSXRlcmFjYW8gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbmFsICs9ICcmJyArIGtleSArICc9JyArIHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaW5hbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlLCBVcHBlckNhc2VQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICd1cHBlcmNhc2VGaXJzdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVwZXJjYXNlRmlyc3QgZXh0ZW5kcyBVcHBlckNhc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICBpZiAodGV4dCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFyIHdvcmRzID0gdGV4dC50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKTtcclxuICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCB3b3Jkcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIGlmICh3b3Jkc1thXS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICB2YXIgdyA9IHdvcmRzW2FdO1xyXG4gICAgICAgICAgd29yZHNbYV0gPSB3WzBdLnRvVXBwZXJDYXNlKCkgKyB3LnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gd29yZHMuam9pbihcIiBcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9GTVQgPSAnZGQvTU0veXl5eSc7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgREFURV9USU1FX0ZNVCA9IGAke0NvbnN0YW50cy5EQVRFX0ZNVH0gLSBoaDptbTpzcyBhYDtcclxuICB9IiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdkYXRlRm9ybWF0J1xyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfRk1UKTtcclxuICAgIH1cclxuICB9IiwiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2RhdGVUaW1lRm9ybWF0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICB2YXIgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoXCJlbi1VU1wiKTtcclxuICAgIHJldHVybiAgZGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBDb25zdGFudHMuREFURV9USU1FX0ZNVCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlLCBVcHBlckNhc2VQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdjb250cm9sbGVyUGlwZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICBpZiAodGV4dCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFyIHdvcmRzID0gdGV4dDtcclxuICAgICAgdmFyIGF1eCA9IFwiXCI7XHJcbiAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgd29yZHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICBpZiAoYSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGF1eCA9IHdvcmRzW2FdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGF1eCA9IGF1eCArIHdvcmRzW2FdIDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGF1eDtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBVcGVyY2FzZUZpcnN0IH0gZnJvbSAnLi91cHBlcmNhc2UtZmlyc3QnO1xyXG5pbXBvcnQgeyBEYXRlRm9ybWF0UGlwZSB9IGZyb20gJy4vZGF0ZS1mb3JtYXQucGlwZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lRm9ybWF0UGlwZSB9IGZyb20gJy4vZGF0ZS10aW1lLWZvcm1hdC5waXBlJztcclxuaW1wb3J0IHsgQ29udHJvbGxlclBpcGUgfSBmcm9tICcuL2NvbnRyb2xsZXIucGlwZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbVXBlcmNhc2VGaXJzdCwgRGF0ZUZvcm1hdFBpcGUsRGF0ZVRpbWVGb3JtYXRQaXBlLCBDb250cm9sbGVyUGlwZSBdLFxyXG4gICAgZXhwb3J0czogW1VwZXJjYXNlRmlyc3QsIERhdGVGb3JtYXRQaXBlLERhdGVUaW1lRm9ybWF0UGlwZSwgQ29udHJvbGxlclBpcGUgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGlwZU1vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYXBwLW1lbnUtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgaXRlbXM6IGFueVtdO1xuICBAVmlld0NoaWxkKCdjaGlsZE1lbnUnKSBwdWJsaWMgY2hpbGRNZW51O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUHh0QXBwQ29tcG9uZW50U2VydmljZSkgcHVibGljIHB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHsgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRDb21wb25lbnQoY2hpbGQpIHtcbiAgICB0aGlzLnB4dEFwcENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudCh7Y29tcG9uZW50OiBjaGlsZC5tZW51U291cmNlLmNvbXBvbmVudCwgZGF0YTpcIlwifSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHh0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpc1VzZXJJblJ1bGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSdWxlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdpc1VzZXJJblJ1bGUnKSBydWxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgZGVidWdnZXJcbiAgICBsZXQgcGVybWlzc29lczogc3RyaW5nW10gPSB0aGlzLmdldFJ1bGVzKCk7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBwZXJtaXNzb2VzLmluY2x1ZGVzKHRoaXMucnVsZSkgPyAnJyA6ICdub25lJztcbiAgfVxuXG4gIHB1YmxpYyAgZ2V0UnVsZXMoKTogc3RyaW5nW10ge1xuICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIFVzZXJTZXJ2aWNlLmdldFVzdWFyaW9Mb2dhZG8oKS5sb2dpbik7XG4gICAgY29uc3QgYXV0aG9yaXR5ID0gPGFueT5qd3RfZGVjb2RlKHRva2VuQXV0aG9yaXRpZXMpO1xuICAgIGxldCBwZXJtaXNzb2VzOiBzdHJpbmdbXSA9IGF1dGhvcml0eS5hdXRob3JpdGllcztcbiAgICByZXR1cm4gcGVybWlzc29lcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSdWxlc0RpcmVjdGl2ZSB9IGZyb20gJy4uL3J1bGVzLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUnVsZXNEaXJlY3RpdmVdLFxuICBleHBvcnRzOltSdWxlc0RpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEaXJlY3RpdmVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL2RpcmVjdGl2ZS9kaXJlY3RpdmUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZSxcbiAgICBEaXJlY3RpdmVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwTWVudUl0ZW1Db21wb25lbnRdLFxuICAgZXhwb3J0czogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dEFwcE1lbnVJdGVtQ29tcG9uZW50IF1cbiAgXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1lbnVJdGVtTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2hhc2hdJyxcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBIYXNoRGlyZWN0aXZlICB7XHJcbiAgICBASW5wdXQoKSBoYXNoOiBzdHJpbmc7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XHJcbiAgfSIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpc2libGVJblJvbGVzR3VhcmQgfSBmcm9tICcuLi92aXNpYmxlLWluLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhvcml0eVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBfaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHsgfVxuXG4gIGJ1c2NhckF1dGhvcml0aWVzIChjb2RpZ29TaXN0ZW1hKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5faHR0cEhlbHBlci5nZXRBcGlTZ2koKSArIFwicGVybWlzc29lcy9idXNjYXJQZXJmaWxTaXN0ZW1hLz9cIjtcbiAgICBjb25zdCBwYXJhbXMgPSBcImNvZGlnb1Npc3RlbWE9XCIgKyBjb2RpZ29TaXN0ZW1hO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRvR2V0KHVybCArIHBhcmFtcyk7XG4gIH1cbn0iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhvcml0eVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgcHh0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuL21vZGVscy9weHRDb25maWd1cmF0aW9uXCJcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXNpYmxlSW5Sb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsIHByaXZhdGUgYXV0aG9yaXR5U2VydmljZTogQXV0aG9yaXR5U2VydmljZSwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHsgfVxyXG4gIGNhbkFjdGl2YXRlKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgZGVidWdnZXI7XHJcbiAgICBpZiAodG9rZW4gIT09ICd1bmRlZmluZWQnICYmIHRva2VuICE9PSAnJyAmJiB0b2tlbiAhPT0gbnVsbCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW4pO1xyXG4gICAgICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViKTtcclxuICAgICAgICBpZiAodG9rZW5BdXRob3JpdGllcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gJycgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hdXRob3JpdHlTZXJ2aWNlLmJ1c2NhckF1dGhvcml0aWVzKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQpLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIGRlY29kZWQuc3ViLCBkYXRhLmF1dGhvcml0eSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBhdXRob3JpdHk6IGFueSA9IGp3dF9kZWNvZGUodG9rZW5BdXRob3JpdGllcyk7XHJcbiAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnNldFVzdWFyaW9Mb2dhZG8oZGVjb2RlZC5zdWIpOyAvLyBlbnZpYSB1c2VybmFtZVxyXG4gICAgICAgICAgaWYgKGRlY29kZWQuZXhwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmh0dHBIZWxwZXIuZ2V0VXJsQXV0ZW50aWNhY2FvKCkgKyBcIj9lcnJvPTQwMVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHR0cEhlbHBlci5nZXRVcmxBdXRlbnRpY2FjYW8oKSArIFwiP2Vycm89NDAxXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gVW5kZWZpbmVkXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBIdHRwRXZlbnQsIFxyXG4gIEh0dHBJbnRlcmNlcHRvciwgXHJcbiAgSHR0cEhhbmRsZXIsIFxyXG4gIEh0dHBSZXF1ZXN0LFxyXG4gIEh0dHBSZXNwb25zZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpLy97cHJvdmlkZWRJbjogJ3Jvb3QnfVxyXG5cclxuZXhwb3J0IGNsYXNzIEludGVyY2VwdFNlcnZpY2UgIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0Ly8gaW50ZXJjZXB0IHJlcXVlc3QgYW5kIGFkZCB0b2tlblxyXG4gIFx0aW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTpPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcblxyXG4gICAgXHQvLyBtb2RpZnkgcmVxdWVzdFxyXG5cdCAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XHJcblx0ICAgICAgc2V0SGVhZGVyczoge1xyXG5cdCAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdNWV9UT0tFTicpfWBcclxuXHQgICAgICB9XHJcblx0ICAgIH0pO1xyXG5cclxuXHJcblx0ICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KVxyXG5cdCAgICAucGlwZShcclxuXHQgICAgICAgIHRhcChldmVudCA9PiB7XHJcblx0ICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xyXG5cdCAgICAgICAgICBcclxuXHQgICAgICAgICAgfVxyXG5cdCAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG5cdCAgIFx0XHRcdC8vIGh0dHAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcclxuXHJcblxyXG5cdCAgICAgICAgfSlcclxuXHQgICAgICApXHJcblxyXG4gICAgfTtcclxuICBcclxuIFxyXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIEFQUF9JTklUSUFMSVpFUiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWFwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUHh0QXBwTWVudUl0ZW1Nb2R1bGUgfSBmcm9tICcuL3B4dC1hcHAtbWVudS1pdGVtL3B4dC1hcHAtbWVudS1pdGVtLm1vZHVsZSc7XG5pbXBvcnQgeyBIYXNoRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9IYXNoRGlyZWN0aXZlJztcbmltcG9ydCB7IFZpc2libGVJblJvbGVzR3VhcmQgfSBmcm9tICcuLi8uLi92aXNpYmxlLWluLXJvbGVzLmd1YXJkJztcbmltcG9ydCB7IEF1dGhvcml0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC90b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0ck1vZHVsZSB9IGZyb20gJ25neC10b2FzdHInO1xuaW1wb3J0IHsgSHR0cEVycm9ySGFuZGxlciB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtZXJyb3ItaGFuZGxlcic7XG5pbXBvcnQgeyBJbnRlcmNlcHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWludGVyY2VwdG9yL2ludGVyY2VwdC1zZXJ2aWNlICc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERpcmVjdGl2ZU1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvZGlyZWN0aXZlL2RpcmVjdGl2ZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgRGlyZWN0aXZlTW9kdWxlLFxuICAgIFB4dEFwcE1lbnVJdGVtTW9kdWxlLFxuICAgIFRvYXN0ck1vZHVsZS5mb3JSb290KHtwcm9ncmVzc0JhcjogdHJ1ZX0pICAgIFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRBcHBDb21wb25lbnQsIFB4dENvbnRlbnRCb2R5LCBIYXNoRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1B4dEFwcENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1B4dEFwcENvbXBvbmVudFNlcnZpY2UsIFxuICAgIFB4dEh0dHBTZXJ2aWNlLCBcbiAgICBSZXF1ZXN0QmFzZVNlcnZpY2UsIFxuICAgIEh0dHBIZWxwZXJTZXJ2aWNlLCBcbiAgICBDb25maWdTZXJ2aWNlLCAgXG4gICAgSHR0cEVycm9ySGFuZGxlciwgIFxuICAgIFZpc2libGVJblJvbGVzR3VhcmQsXG4gICAgVG9rZW5TZXJ2aWNlLFxuICAgIEF1dGhvcml0eVNlcnZpY2UsXG4gIEludGVyY2VwdFNlcnZpY2UgLCB7XG4gICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgdXNlQ2xhc3M6IEludGVyY2VwdFNlcnZpY2UsXG4gICAgbXVsdGk6IHRydWVcbiAgfV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dElucHV0RmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgaW5wdXRUeXBlPzogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRDaGVja2JveEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIGZpbHRlcnM/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBweHREYXRlRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdHlwZT86IHN0cmluZztcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRGaWx0ZXJGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59XHJcbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0UmFkaW9CdXR0b25GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dFNlbGVjdEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIGNsYXNzTmFtZT86IGFueTtcclxuICAgIG9wdGlvbnM/OiBzdHJpbmdbXTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICBwYXJhbWV0ZXI/OiBhbnk7IFxyXG59IiwiaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHB4dGZpbHRlckN1c3RvbUZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGNsYXNzTmFtZT86IGFueTtcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIGZpbHRlcnM/OiBhbnk7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBweHRJbnB1dEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1pbnB1dC1maWVsZCc7XG5pbXBvcnQgeyBweHRDaGVja2JveEZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1jaGVja2JveC1maWVsZCc7XG5pbXBvcnQgeyBweHREYXRlRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWRhdGUtZmllbGQnO1xuaW1wb3J0IHsgcHh0RmlsdGVyRmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LWZpbHRlci1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5pbXBvcnQgeyBweHRTZWxlY3RGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkJztcbmltcG9ydCB7IHB4dGZpbHRlckN1c3RvbUZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItY3VzdG9tLWZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWNvbnRlbnQtYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1jb250ZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFkQ29tcG9uZW50IHtcbiAgLy9Qcm9wZXJ0aWVzIFxuICBASW5wdXQoKSBkYXRhOiBhbnk7XG4gIEBJbnB1dCgpIGF1dG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBmaWVsZHM6IFB4dEZpZWxkQ29uZmlnW10gPSBbXTtcbiAgQElucHV0KCkgY29sczogbnVtYmVyID0gNTtcbiAgQElucHV0KCkgZmllbGQ6IGFueTtcbiAgY29sc0luaXRpYWwgPSA1O1xuICBAT3V0cHV0KCkgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnZhbHVlO1xuICB9XG5cbiAgLy9Db25zdHJ1Y3RvclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIGlmICh0aGlzLmZpZWxkICE9IHVuZGVmaW5lZCl7XG4gICAgT2JqZWN0LmtleXModGhpcy5maWVsZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLmZpZWxkW2tleV0uY29uc3RydWN0b3IubmFtZSkge1xuXG4gICAgICAgIC8vRmlsdGVyQ3VzdG9tXG4gICAgICAgIGNhc2UgcHh0ZmlsdGVyQ3VzdG9tRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VGaWx0ZXJDdXN0b20gPSA8cHh0ZmlsdGVyQ3VzdG9tRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRmlsdGVyQ3VzdG9tLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0lucHV0XG4gICAgICAgIGNhc2UgcHh0SW5wdXRGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUlucHV0ID0gPHB4dElucHV0RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlSW5wdXQudHlwZSA9ICdpbnB1dCc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0NoZWNrYm94XG4gICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgIHZhciBpbnN0YW5jZUNoZWNrID0gPHB4dENoZWNrYm94RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlQ2hlY2sudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0RhdGVcbiAgICAgICAgY2FzZSBweHREYXRlRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRlID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vRmlsdGVyXG4gICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VGaWx0ZXIgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUZpbHRlci50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9SYWRpb0J1dHRvblxuICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VSYWRpbyA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIFxuICAgICAgICAvL1NlbGVjdFxuICAgICAgICBjYXNlIHB4dFNlbGVjdEZpZWxkLm5hbWU6XG4gICAgICAgIHZhciBpbnN0YW5jZVNlbGVjdCA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICBpbnN0YW5jZVNlbGVjdC50eXBlID0gJ3NlbGVjdCc7XG4gICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIHRoaXMuY29sc0luaXRpYWwgPSB0aGlzLmNvbHM7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVDb250cm9sKCk7XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIHB1YmxpYyBvblN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcblxuICAgICAgdGhpcy5zdWJtaXQuZW1pdCh0aGlzLmZvcm0udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRlQWxsRm9ybUZpZWxkcyh0aGlzLmZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1ldGhvZCByZXNwb25zaWJsZSBmb3IgY3JlYXRlIGNvbnRyb2xcbiAgcHVibGljIGNyZWF0ZUNvbnRyb2woKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSBcImJ1dHRvblwiKSByZXR1cm47XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5mYi5jb250cm9sKFxuICAgICAgICB7IHZhbHVlOiBmaWVsZC52YWx1ZSwgZGlzYWJsZWQ6IGZpZWxkLmRpc2FibGVkIH0sXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb25zKGZpZWxkLnZhbGlkYXRpb25zIHx8IFtdKVxuICAgICAgKTtcbiAgICAgIGdyb3VwLmFkZENvbnRyb2woZmllbGQubmFtZSwgY29udHJvbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgcHVibGljIGJpbmRWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogYW55KTogYW55IHtcbiAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdmFsaWRMaXN0ID0gW107XG4gICAgICB2YWxpZGF0aW9ucy5mb3JFYWNoKHZhbGlkID0+IHtcbiAgICAgICAgdmFsaWRMaXN0LnB1c2godmFsaWQudmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZExpc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZmllbGQpO1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cbiAgc2NyZWVuV2lkdGg7XG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudD8pIHtcbiAgICB0aGlzLnNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgaWYgKHRoaXMuc2NyZWVuV2lkdGggPD0gODAwKSB7XG4gICAgICB0aGlzLmNvbHMgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY3JlZW5XaWR0aCA8PSAxMTAwKSB7XG4gICAgICB0aGlzLmNvbHMgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbHMgPSB0aGlzLmNvbHNJbml0aWFsO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtaW5wdXQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1idXR0b24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiAgIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWRhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWRhdGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGF0ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY2hlY2tib3guY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1yYWRpb2J1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dFNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlbGVjaW9uZSc7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG4gIEBJbnB1dCgpIHBhcmFtczogYW55O1xuICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnBhcmFtcyAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMucGFyYW1zLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IGNoYW5nZXMucGFyYW1zLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMuZmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRyb2xsZXIgPSBcIlwiO1xuICBhdXRvID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIG9wdGlvbjogYW55O1xuXG4gIG9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbjtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRPcHRpb24oZjogYW55KSB7XG4gICAgaWYgKGYgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZiAhPT0gdGhpcy5vcHRpb24pIHtcbiAgICAgICAgdGhpcy5vcHRpb24gPSBmO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZi5jb2RpZ28pO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMub3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLm9wdGlvbiA9IHZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHh0aHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5tb2RlbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMubW9kZWwuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIHRoaXMuZmllbGQgPSB0aGlzLm1vZGVsO1xuICAgICAgdGhpcy5hdXRvID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZpZWxkICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpZWxkLmNsYXNzTmFtZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMuZmllbGQuY2xhc3NOYW1lLm5hbWU7XG4gICAgICB0aGlzLmF1dG8gPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBmaW5kKCkge1xuICAgIGlmICh0aGlzLmNvbnRyb2xsZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnB4dGh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCB0aGlzLnBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgICAgICB0aGlzLmZpZWxkLm9wdGlvbnMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZpbmQoKTtcbiAgfTtcbn1cblxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEsIE1hdFRhYmxlRGF0YVNvdXJjZSwgTWF0U29ydCwgTWF0UGFnaW5hdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcblxuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnc2VsZW5pdW0td2ViZHJpdmVyL2h0dHAnO1xuXG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kaWFsb2ctZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGRpc3BsYXllZENvbHVtbnMgPSBbJ2NvZGlnbycsICdkZXNjcmljYW8nXTtcbiAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8YW55PigpO1xuICBjb250cm9sbGVyID0gXCJcIjtcbiAgY29scyA9IDI7XG4gIGZpZWxkczogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBmaWVsZHNIaXN0OiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIGF1dG86IGJvb2xlYW47XG4gIGZpbHRlciA9IHsgY29kZTogdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogdW5kZWZpbmVkIH07XG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcblxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBkYXRhLmNvbnRyb2xsZXI7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdXRvID0gdGhpcy5kYXRhLmF1dG87XG4gICAgaWYgKHRoaXMuYXV0bykge1xuICAgICAgdGhpcy5maWVsZCA9IHRoaXMuZGF0YS5maWx0ZXJzO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5maWVsZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRba2V5XS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgY2FzZSBweHRmaWx0ZXJDdXN0b21GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRmlsdGVyQ3VzdG9tLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9JbnB1dFxuICAgICAgICAgIGNhc2UgcHh0SW5wdXRGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlSW5wdXQgPSA8cHh0SW5wdXRGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlSW5wdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0NoZWNrYm94XG4gICAgICAgICAgY2FzZSBweHRDaGVja2JveEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlQ2hlY2sudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vRGF0ZVxuICAgICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRlID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vRmlsdGVyXG4gICAgICAgICAgY2FzZSBweHRGaWx0ZXJGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUZpbHRlci50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9SYWRpb0J1dHRvblxuICAgICAgICAgIGNhc2UgcHh0UmFkaW9CdXR0b25GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvL1NlbGVjdFxuICAgICAgICAgIGNhc2UgcHh0U2VsZWN0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVNlbGVjdCA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmZpZWxkcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZmllbGRzSGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuZGlzcGxheWVkQ29sdW1ucyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5kYXRhLmRpc3BsYXllZENvbHVtbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsYXRpb24oKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodW5kZWZpbmVkKTtcbiAgfVxuICBjb25maXJtYXRpb24oZXZlbnQpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgfVxuXG4gIC8vU2VhcmNoLlxuICBzZWFyY2goKSB7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBNYXA8YW55LCBhbnk+KCk7XG4gICAgZGVidWdnZXI7XG4gICAgaWYgKHRoaXMuZGF0YS5hdXRvICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuYXV0bykge1xuICAgICAgaWYgKHRoaXMuZm9ybS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybS52YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmZvcm0udmFsdWVba2V5XSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5zZXQoa2V5LCB0aGlzLmZvcm0udmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5odHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgcGFyYW1zKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZmlsdGVyLmNvZGUgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmlsdGVyLmNvZGUgIT0gMCAmJiB0aGlzLmZpbHRlci5jb2RlICE9IFwiXCIpIHtcbiAgICAgICAgcGFyYW1zLnNldChcImNvZGlnb1wiLCB0aGlzLmZpbHRlci5jb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmZpbHRlci5kZXNjcmlwdGlvbiAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWx0ZXIuZGVzY3JpcHRpb24gIT0gXCJcIikge1xuICAgICAgICBwYXJhbXMuc2V0KFwiZGVzY3JpY2FvXCIsIHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLmNvbnRyb2xsZXIsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNlbGVjdFJvdyhyb3cpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShyb3cpO1xuICB9O1xuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIGNyZWF0ZUNvbnRyb2woKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSBcImJ1dHRvblwiKSByZXR1cm47XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5mYi5jb250cm9sKFxuICAgICAgICB7IHZhbHVlOiBmaWVsZC52YWx1ZSwgZGlzYWJsZWQ6IGZpZWxkLmRpc2FibGVkIH0sXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb25zKGZpZWxkLnZhbGlkYXRpb25zIHx8IFtdKVxuICAgICAgKTtcbiAgICAgIGdyb3VwLmFkZENvbnRyb2woZmllbGQubmFtZSwgY29udHJvbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9O1xuXG4gIGJpbmRWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogYW55KTogYW55IHtcbiAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdmFsaWRMaXN0ID0gW107XG4gICAgICB2YWxpZGF0aW9ucy5mb3JFYWNoKHZhbGlkID0+IHtcbiAgICAgICAgdmFsaWRMaXN0LnB1c2godmFsaWQudmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZExpc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZmllbGQpO1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodW5kZWZpbmVkKTtcbiAgfTtcbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbi8qXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1pbnB1dC1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgLy9wcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0Rpc2FibGVkID0gdHJ1ZTtcbiAgYXV0bzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xhc3NOYW1lIDpTdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDogU3RyaW5nID0gXCIgXCI7XG4gIEBJbnB1dCgpIGRpc3BsYXllZENvbHVtbnMgOiBhbnlbXTtcbiAgQE91dHB1dCgpIG9uVmFsdWVDYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIHZhbHVlIDpTdHJpbmcgPSBcIiBcIjtcbiAgIFxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgLy9wcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuIFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jbGFzc05hbWUgIT0gdW5kZWZpbmVkICYmICFjaGFuZ2VzLmNsYXNzTmFtZS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5jbGFzc05hbWUgPSBjaGFuZ2VzLmNsYXNzTmFtZS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnBsYWNlaG9sZGVyICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5wbGFjZWhvbGRlci5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGNoYW5nZXMucGxhY2Vob2xkZXIuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnZhbHVlICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy52YWx1ZS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IGNoYW5nZXMudmFsdWUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSBjaGFuZ2VzLmRpc3BsYXllZENvbHVtbnMuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmZpZWxkICE9IHVuZGVmaW5lZCl7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvL01ldGhvZCByZXNwb3NpYmxlIGZvciBvcGVuIGRpYWxvZyBmaWx0ZXJcbiAgb3BlbkZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZC5maWx0ZXJzICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCwge1xuICAgICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgICAgcGFuZWxDbGFzczogJ3B4dC1kaWFsb2cnLFxuICAgICAgICBkYXRhOiB7IGF1dG86IHRoaXMuYXV0bywgZmlsdGVyczogdGhpcy5maWVsZC5maWx0ZXJzLCBjb250cm9sbGVyOiB0aGlzLmZpZWxkLmNsYXNzTmFtZSwgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgdGhpcy5maWVsZC5jbGFzc05hbWUgKyBcIiApXCIgfVxuICAgICAgfSk7XG4gICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5maWVsZC52YWx1ZSA9IHJlc3VsdC5jb2RpZ287XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1lbHNlIHtcbiAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCwge1xuICAgICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgICAgcGFuZWxDbGFzczogJ3B4dC1kaWFsb2cnLFxuICAgICAgICBkYXRhOiB7Y29udHJvbGxlcjogdGhpcy5jbGFzc05hbWUsIGRpc3BsYXllZENvbHVtbnM6dGhpcy5kaXNwbGF5ZWRDb2x1bW5zLCB0aXRsZURpYWxvZzogXCJTZWxlY2lvbmU6ICggXCIgKyAgdGhpcy5jbGFzc05hbWUgKyBcIiApXCIgfVxuICAgICAgfSk7XG4gICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHJlc3VsdFt0aGlzLmRpc3BsYXllZENvbHVtbnNbMV1dO1xuICAgICAgICAgIHRoaXMub25WYWx1ZUNhbGxiYWNrLmVtaXQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY29tcG9uZW50TWFwcGVyID0ge1xyXG4gIGlucHV0OiBQeHRJbnB1dENvbXBvbmVudCxcclxuICBidXR0b246IFB4dEJ1dHRvbkNvbXBvbmVudCxcclxuICBkYXRlOiBQeHREYXRlQ29tcG9uZW50LFxyXG4gIHNlbGVjdDogUHh0U2VsZWN0Q29tcG9uZW50LFxyXG4gIHJhZGlvYnV0dG9uOiBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCxcclxuICBjaGVja2JveDogUHh0Q2hlY2tib3hDb21wb25lbnQsXHJcbiAgZmlsdGVyOiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCxcclxufTtcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW2R5bmFtaWNGaWVsZF1cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmaWVsZDogRmllbGRDb25maWc7XHJcbiAgQElucHV0KCkgZ3JvdXA6IEZvcm1Hcm91cDtcclxuICBjb21wb25lbnRSZWY6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb21wb25lbnRNYXBwZXJbdGhpcy5maWVsZC50eXBlXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGQgPSB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0SW5wdXRDb21wb25lbnRdLFxuICBleHBvcnRzOltQeHRJbnB1dENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0SW5wdXRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3B4dC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6W1B4dEJ1dHRvbkNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0QnV0dG9uQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRCdXR0b25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERhdGVDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dERhdGVDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHREYXRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHREYXRlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3B4dC1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0U2VsZWN0Q29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0U2VsZWN0Q29tcG9uZW50XSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFNlbGVjdE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tICcuL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1B4dFJhZGlvYnV0dG9uQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRSYWRpb2J1dHRvbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL3B4dC1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0Q2hlY2tib3hDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0Q2hlY2tib3hDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dENoZWNrYm94Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDaGVja2JveE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFB4dERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtZGF0ZS9weHQtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFNlbGVjdENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCBjb21wb25lbnRNYXBwZXIgPSB7XHJcbiAgaW5wdXQ6IFB4dElucHV0Q29tcG9uZW50LFxyXG4gIGJ1dHRvbjogUHh0QnV0dG9uQ29tcG9uZW50LFxyXG4gIGRhdGU6IFB4dERhdGVDb21wb25lbnQsXHJcbiAgc2VsZWN0OiBQeHRTZWxlY3RDb21wb25lbnQsXHJcbiAgcmFkaW9idXR0b246IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50LFxyXG4gIGNoZWNrYm94OiBQeHRDaGVja2JveENvbXBvbmVudCxcclxuICBmaWx0ZXI6IFB4dElucHV0RmlsdGVyQ29tcG9uZW50LFxyXG59O1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbZHluYW1pY0ZpZWxkRGlhbG9nXVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZENvbmZpZztcclxuICBASW5wdXQoKSBncm91cDogRm9ybUdyb3VwO1xyXG4gIGNvbXBvbmVudFJlZjogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcclxuICApIHsgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIGNvbXBvbmVudE1hcHBlclt0aGlzLmZpZWxkLnR5cGVdXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5maWVsZCA9IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS1kaWFsb2cnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nXSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdLFxuICBleHBvcnRzOltQeHREaWFsb2dGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dERpYWxvZ0ZpbHRlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RBVEEsIHVzZVZhbHVlOiB7fX0sXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TLCB1c2VWYWx1ZToge2hhc0JhY2tkcm9wOiB0cnVlfX1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQeHREaWFsb2dGaWx0ZXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQeHREaWFsb2dGaWx0ZXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRJbnB1dEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRJbnB1dEZpbHRlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyB0ZW1wbGF0ZUppdFVybCB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlJztcbmltcG9ydCB7IFB4dElucHV0TW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0QnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHREYXRlTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUubW9kdWxlJztcbmltcG9ydCB7IFB4dFNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Nb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgSHR0cE1vZHVsZSxcbiAgICBQeHRJbnB1dE1vZHVsZSxcbiAgICBQeHRCdXR0b25Nb2R1bGUsXG4gICAgUHh0RGF0ZU1vZHVsZSxcbiAgICBQeHRTZWxlY3RNb2R1bGUsXG4gICAgUHh0UmFkaW9idXR0b25Nb2R1bGUsXG4gICAgUHh0Q2hlY2tib3hNb2R1bGUsXG4gICAgUHh0SW5wdXRGaWx0ZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0Q29udGVudENvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXSxcbiAgIGV4cG9ydHM6IFtQeHRDb250ZW50Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFB4dENvbnRlbnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRNb2R1bGUgeyB9XG4iLCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uIHtcclxuICAgIGljb246IFN0cmluZztcclxuICAgIG1lbnU6IFN0cmluZztcclxuICAgIGVuYWJsZTogQm9vbGVhbjtcclxuICAgIGVudW0gOiBOdW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihpY29uOiBTdHJpbmcsIG1lbnU6IFN0cmluZywgZW5hYmxlOiBCb29sZWFuLCBpZCA6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5tZW51ID0gbWVudTtcclxuICAgICAgICB0aGlzLmVuYWJsZSA9IGVuYWJsZTtcclxuICAgICAgICB0aGlzLmVudW0gPSBpZDtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gT3B0aW9uc1N1Ym1lbnUge1xyXG4gICAgU0FMVkFSID0gMSxcclxuICAgIFBFU1FVSVNBUiA9IDIsXHJcbiAgICBMSU1QQVIgPSAzLFxyXG4gICAgTk9WTyA9IDQsXHJcbiAgICBWT0xUQVI9IDUsXHJcbiAgICBFWENMVUlSPSA2XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEJ1dHRvbiB9IGZyb20gJy4vbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsJztcbmltcG9ydCB7IE9wdGlvbnNTdWJtZW51IH0gZnJvbSAnLi9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0nO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBVcGVyY2FzZUZpcnN0IH0gZnJvbSAnLi4vLi4vcGlwZXMvdXBwZXJjYXNlLWZpcnN0JztcbmltcG9ydCB7IENvbnRyb2xsZXJQaXBlIH0gZnJvbSAnLi4vLi4vcGlwZXMvY29udHJvbGxlci5waXBlJztcbmltcG9ydCB7IFRvYXN0clNlcnZpY2UgfSBmcm9tICduZ3gtdG9hc3RyJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtc3VibWVudXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c0NvbXBvbmVudDxUPiB7XG5cbiAgQElucHV0KCkgbW9kZWw/OiBUID0ge30gYXMgVDtcbiAgcHJpdmF0ZSB1cmxTZXJ2aWNlID0gXCJcIjtcblxuICBAT3V0cHV0KCkgbGlzdGluZzogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNTYXZlOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHN0YXR1c0RlbGV0ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI/OiBTdHJpbmc7XG5cbiAgc2F2ZSgpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0aW9uTW9kZWwoKSkge1xuICAgICAgdGhpcy5fc2VydmljZUJhc2Uuc2F2ZSh0aGlzLm1vZGVsKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zdGF0dXNTYXZlLmVtaXQocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgc2VhcmNoKCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmxvYWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMubGlzdGluZy5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIGRlbGV0ZShpZCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmRlbGV0ZShpZCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLnN0YXR1c0RlbGV0ZS5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIGNsZWFyKCkge1xuICAgIHRoaXMubW9kZWwgPSB7fSBhcyBUO1xuICB9O1xuICBhZGQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdhZGQoKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcbiAgYmFjaygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2JhY2soKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcbiAgY29scyA9IDM7XG4gIGNvbHNwYW4gPSAxO1xuICBidXR0b25zOiBQeHRCdXR0b25bXSA9IFtdO1xuICBlbmFibGVTYXZlID0gdHJ1ZTtcbiAgZW5hYmxlQmFjayA9IHRydWU7XG4gIGVuYWJsZUNsZWFyID0gdHJ1ZTtcbiAgZW5hYmxlU2VhcmNoID0gdHJ1ZTtcbiAgZW5hYmxlQWRkID0gdHJ1ZTtcbiAgZW5hYmxlRGVsZXRlID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX3B4dEFwcFNlcnZpY2U6IFB4dEFwcENvbXBvbmVudFNlcnZpY2UsXG4gICAgcHVibGljIF9zZXJ2aWNlQmFzZTogUmVxdWVzdEJhc2VTZXJ2aWNlLFxuICAgIHB1YmxpYyBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBub3RpZmljYXRpb25TZXJ2aWNlOiBUb2FzdHJTZXJ2aWNlKSB7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImtleWJvYXJkX2JhY2tzcGFjZVwiLCBcIlZPTFRBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5WT0xUQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiU0FMVkFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlNBTFZBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJOT1ZPXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51Lk5PVk8pKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiTElNUEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkxJTVBBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJzZWFyY2hcIiwgXCJQRVNRVUlTQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuUEVTUVVJU0FSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkVYQ0xVSVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuRVhDTFVJUikpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkZWJ1Z2dlcjtcbiAgICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKSArIG5ldyBDb250cm9sbGVyUGlwZSgpLnRyYW5zZm9ybSh0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgdGhpcy5fc2VydmljZUJhc2UudXJsU2VydmljZUF1dG8gPSB0aGlzLnVybFNlcnZpY2U7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHZhbGlkYXRpb25Nb2RlbCgpIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5tb2RlbCkubGVuZ3RoID4gMCkge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5tb2RlbCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tb2RlbFtrZXldICE9IHVuZGVmaW5lZCAmJiB0aGlzLm1vZGVsW2tleV0gIT0gXCJcIikge1xuICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcIkNhbXBvIE9icmlnYXTDg8KzcmlvXCIsIGtleS50b1N0cmluZygpLnRvTG9jYWxlVXBwZXJDYXNlKCkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdnZXI7XG4gICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uud2FybmluZyhcIk5lbmh1bSBjYW1wbyBwcmVlbmNoaWRvLlwiLCBcIkF2aXNvIVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0U3VibWVudXNDb21wb25lbnQgfSBmcm9tICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBUb2FzdHJNb2R1bGUgfSBmcm9tICduZ3gtdG9hc3RyJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0U3VibWVudXNDb21wb25lbnRdLFxuICBwcm92aWRlcnM6W1B4dEh0dHBTZXJ2aWNlLCBSZXF1ZXN0QmFzZVNlcnZpY2UsIEh0dHBIZWxwZXJTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c01vZHVsZSB7IH1cblxuICAiLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHh0RGF0ZXBpY2tlckNvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdweHQtZGF0ZXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHh0RGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogU3RyaW5nID0gXCJFc2NvbGhhIHVtYSBkYXRhXCI7XHJcbiAgQElucHV0KCkgbWluRGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBtYXhEYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpIGlucHV0RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZGF0ZU1vZGVsOiBEYXRlO1xyXG5cclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG5cclxuICBnZXQgZGF0YVNlbGVjaW9uYWRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0ZU1vZGVsO1xyXG4gIH1cclxuXHJcbiAgc2V0IGRhdGFTZWxlY2lvbmFkYShkOiBEYXRlKSB7XHJcbiAgICBpZiAoZCAhPT0gdGhpcy5kYXRlTW9kZWwpIHtcclxuICAgICAgdGhpcy5kYXRlTW9kZWwgPSBkO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkJsdXIoKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuZGF0ZU1vZGVsID0gdmFsdWU7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG9uRGF0ZUNoYW5nZSgpIHtcclxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0cnVlKTtcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy53cml0ZVZhbHVlKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLm9uRGF0ZUNoYW5nZSgpO1xyXG4gIH1cclxuICBcclxufSIsIlxyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUHh0RGF0ZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFtEYXRlUGlwZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZXBpY2tlckNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1B4dERhdGVwaWNrZXJDb21wb25lbnRdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHh0RGF0ZVBpY2tlck1vZHVsZSB7XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0RGlhbG9nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dDb21wb25lbnRdXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHh0LWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWZpbHRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZGF0YSA6IGFueTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dDb21wb25lbnQ+LCBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEZpbHRlckNvbXBvbmVudF1cbiBcbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSwgTWF0VGFibGVEYXRhU291cmNlLCBNYXRQYWdpbmF0b3IsIE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZmlsdGVyczogYW55O1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuICBcbiAgZGlzcGxheWVkQ29sdW1ucyA9IFsnY29kaWdvJywgJ2Rlc2NyaWNhbyddO1xuICBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIC8vU2VhcmNoLlxuICBzZWFyY2goKSB7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBNYXA8YW55LCBhbnk+KCk7XG4gICAgaWYgKHRoaXMuZmlsdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1trZXldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBhcmFtcy5zZXQoa2V5LCB0aGlzLmZpbHRlcnNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgICB9KTtcbiAgfTtcblxuICAvL1JvdyBTZWxlY3RlZFxuICBzZWxlY3RSb3cocm93KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uocm93KTtcbiAgfTtcblxuICAvL0Nsb3NlXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH07XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnRdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV0sXG4gIGV4cG9ydHM6W1B4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREFUQSwgdXNlVmFsdWU6IHt9fSxcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMsIHVzZVZhbHVlOiB7aGFzQmFja2Ryb3A6IHRydWV9fVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ0ZpbHRlckN1c3RvbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRDaGlwSW5wdXRFdmVudCwgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtDT01NQSwgRU5URVJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1maWx0ZXItbWF0LXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1maWx0ZXItbWF0LXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8YW55PigpO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6IFN0cmluZyA7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICB2aXNpYmxlID0gdHJ1ZTtcbiAgc2VsZWN0YWJsZSA9IHRydWU7XG4gIHJlbW92YWJsZSA9IHRydWU7XG4gIGFkZE9uQmx1ciA9IHRydWU7XG4gIHJlYWRvbmx5IHNlcGFyYXRvcktleXNDb2RlczogbnVtYmVyW10gPSBbRU5URVIsIENPTU1BXTtcbiAgZmlsdGVyczogYW55W10gPSBbXTtcblxuICBhZGQoZXZlbnQ6IE1hdENoaXBJbnB1dEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC5pbnB1dDtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnZhbHVlO1xuXG4gICAgLy8gQWRkIG91ciBmcnVpdFxuICAgIGlmICgodmFsdWUgfHwgJycpLnRyaW0oKSkge1xuICAgICAgLy8gdGhpcy5maWx0ZXJzID0gW107XG4gICAgICB0aGlzLmZpbHRlcnMucHVzaCh7IG5hbWU6IHZhbHVlLnRyaW0oKSB9KTtcbiAgICAgIC8vdGhpcy5hcHBseUZpbHRlcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgdGhlIGlucHV0IHZhbHVlXG4gICAgaWYgKGlucHV0KSB7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgICAvL3RoaXMuYXBwbHlGaWx0ZXJ4ICgpO1xuICAgIHRoaXMuYXBwbHlGaWx0ZXJBcnJheSgpO1xuXG4gIH1cbiAgYXBwbHlGaWx0ZXJBcnJheSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgIGZpbHRlciA9IGZpbHRlci5uYW1lLnRyaW0oKTtcbiAgICAgICAgZmlsdGVyID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHBseUZpbHRlcihcIlwiKTtcbiAgICB9XG4gIH1cblxuICBhcHBseUZpbHRlcnggKCl7XG4gICAgICBjb25zdCB0YWJsZUZpbHRlcnMgPSBbXTtcbiAgICAgIHRoaXMuZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgdGFibGVGaWx0ZXJzLnB1c2goe1xuICAgICAgICAgIGlkOiBcIm5vbWVJbWFnZW1cIixcbiAgICAgICAgICB2YWx1ZTogZmlsdGVyLm5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBKU09OLnN0cmluZ2lmeSh0YWJsZUZpbHRlcnMpO1xuICB9XG5cbiAgYXBwbHlGaWx0ZXIoZmlsdGVyOiBzdHJpbmcpIHtcbiAgICBmaWx0ZXIgPSBmaWx0ZXIudHJpbSgpO1xuICAgIGZpbHRlciA9IGZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBmaWx0ZXI7XG4gIH1cbiAgXG4gIHJlbW92ZShmaWx0ZXI6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWx0ZXJzLmluZGV4T2YoZmlsdGVyKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5maWx0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlGaWx0ZXJBcnJheSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEZpbHRlck1hdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZmlsdGVyLW1hdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEZpbHRlck1hdFRhYmxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEZpbHRlck1hdFRhYmxlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzIDogW1B4dEZpbHRlck1hdFRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJNYXRUYWJsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IHB4dEVudW1UYWdIdG1sIH0gZnJvbSBcIi4uL2VudW0vcHh0LWVudW0tdGFnLWh0bWxcIjtcclxuaW1wb3J0IHsgcHh0RW51bVR5cGVUYWcgfSBmcm9tIFwiLi4vZW51bS9weHQtZW51bS10eXBlLXRhZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBweHRGaWVsZHMge1xyXG4gICAgdHlwZTogcHh0RW51bVR5cGVUYWc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgdGFnOiBweHRFbnVtVGFnSHRtbDtcclxufVxyXG4iLCJleHBvcnQgZW51bSBweHRFbnVtVGFnSHRtbCB7XHJcbiAgICBJbnB1dCA9IDEsXHJcbiAgICBDb21ibyA9IDIsXHJcbiAgICBGaWx0ZXIgPSAzLFxyXG4gICAgQ2hlY2tib3ggPSA0XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC11cGxvYWQtZmlsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtdXBsb2FkLWZpbGUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFVwbG9hZEZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDpzdHJpbmc7XG4gIEBPdXRwdXQoKSBmaWxlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGFycmF5SW1hZ2VzIDpGaWxlUmVhZGVyO1xuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIG9uQ2hhbmdlSW1hZ2VtKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGltYWdlbTogRmlsZSA9IGV2ZW50O1xuICAgICAgdGhpcy5wbGFjZWhvbGRlcj0gaW1hZ2VtLm5hbWU7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVNlbGVjdGVkLm5leHQoaW1hZ2VtKTtcbiAgICB9XG5cbiAgfTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0VXBsb2FkRmlsZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6W1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHMgOiBbUHh0VXBsb2FkRmlsZUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRVcGxvYWRGaWxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hHYWxsZXJ5T3B0aW9ucywgTmd4R2FsbGVyeUltYWdlLCBOZ3hHYWxsZXJ5QW5pbWF0aW9uIH0gZnJvbSAnbmd4LWdhbGxlcnknO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZ2FsbGVyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBnYWxsZXJ5T3B0aW9uczogTmd4R2FsbGVyeU9wdGlvbnNbXTtcbiAgQElucHV0KCkgZ2FsbGVyeUltYWdlczogTmd4R2FsbGVyeUltYWdlW107XG4gIEBJbnB1dCgpIHdpZHRoOiBhbnkgPSBcIjEwMCVcIjtcbiAgQElucHV0KCkgaGVpZ2h0OiBhbnkgPSAnNDAwcHgnO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZ2FsbGVyeU9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICB0aHVtYm5haWxzQ29sdW1uczogNCxcbiAgICAgICAgaW1hZ2VBbmltYXRpb246IE5neEdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgIH0sXG4gICAgICAvLyBtYXgtd2lkdGggODAwXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIGltYWdlUGVyY2VudDogODAsXG4gICAgICAgIHRodW1ibmFpbHNQZXJjZW50OiAyMCxcbiAgICAgICAgdGh1bWJuYWlsc01hcmdpbjogMjAsXG4gICAgICAgIHRodW1ibmFpbE1hcmdpbjogMjBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDQwMCxcbiAgICAgICAgcHJldmlldzogZmFsc2VcbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL3B4dC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IE5neEdhbGxlcnlNb2R1bGUgfSBmcm9tICduZ3gtZ2FsbGVyeSc7XG5pbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsIE5neEdhbGxlcnlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dEdhbGxlcnlDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRHYWxsZXJ5TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImNvbXBvbmVudE1hcHBlciIsIm5vb3AiLCJDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBTUUsWUFBbUIsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7S0FBSzs7O1lBSjNELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2FBQzdCOzs7O1lBSm1CLGdCQUFnQjs7Ozs7OztBQ0FwQzs7NkJBSzBDLElBQUksT0FBTyxFQUFPO3VDQUNHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFOzhCQUVyRCxJQUFJLE9BQU8sRUFBTzt1Q0FDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTs4QkFFdEQsSUFBSSxPQUFPLEVBQU87b0NBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7NEJBRXJELElBQUksT0FBTyxFQUFPOzJCQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFOzs7Ozs7SUFFL0UsV0FBVyxDQUFDLE1BQVc7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUQsY0FBYyxDQUFDLFdBQVc7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFD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LENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDdEQ7S0FDRjs7Ozs7OztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBVztRQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0Q7S0FDRjs7Ozs7OztJQUVELEtBQUssQ0FBQyxJQUFZLEVBQUUsS0FBVztRQUM3QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUQ7S0FDRjs7Ozs7OztJQUVELFFBQVEsQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDOUQ7S0FDRjs7Ozs7OztJQUVELFdBQVcsQ0FBQyxJQUFJLEVB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