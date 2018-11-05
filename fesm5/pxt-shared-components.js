import { Directive, ViewContainerRef, Injectable, Injector, Component, Inject, Input, ComponentFactoryResolver, ElementRef, NgModule, EventEmitter, Output, ViewChild, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, forwardRef, Pipe, HostListener, defineInjectable, inject, ChangeDetectorRef } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatMenuTrigger, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatLineModule, MatCommonModule, MatOptionModule, MatFormFieldModule, MatPseudoCheckboxModule, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { __extends } from 'tslib';
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
    /**
     * @return {?}
     */
    HttpHelperService.prototype.getUrlLogo = /**
     * @return {?}
     */
    function () {
        return this.configService.getConfiguration('IMAGEM_LOGO', 'SGI');
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
            //console.log(this.urlHelper.getFrontSgi());
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
/** @type {?} */
var pxtConfiguration = { systemId: 104, systemPrex: "SGE_NEW" };

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var UserService = /** @class */ (function () {
    function UserService(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
        this.path = 'usuarios';
        this.path = this.helper.getApiSgi() + this.path;
    }
    /**
     * @return {?}
     */
    UserService.prototype.logout = /**
     * @return {?}
     */
    function () {
        localStorage.clear();
        window.location.href = this.helper.getFrontSgi() + '?prefixoSistema=' + pxtConfiguration.systemPrex;
    };
    /**
     * @return {?}
     */
    UserService.getUsuarioLogado = /**
     * @return {?}
     */
    function () {
        debugger;
        /** @type {?} */
        var usuario = {};
        if (localStorage.getItem('USRLGD') !== null) {
            /** @type {?} */
            var usuarioBase64 = atob(localStorage.getItem('USRLGD'));
            usuario = JSON.parse(usuarioBase64);
        }
        else {
            /** @type {?} */
            var decoded = /** @type {?} */ (jwt_decode(localStorage.getItem('token')));
            usuario.identificacaoAcesso = decoded.sub;
            usuario.codigoPessoa = decoded.person_id;
        }
        return usuario;
    };
    /**
     * @param {?} username
     * @return {?}
     */
    UserService.prototype.setUsuarioLogado = /**
     * @param {?} username
     * @return {?}
     */
    function (username) {
        this.buscarPorIdentificacaoAcesso(username).subscribe(function (val) {
            /** @type {?} */
            var usuario = {};
            usuario = val;
            if (usuario === null) {
                usuario = {};
            }
            /** @type {?} */
            var usuarioBase64 = btoa(JSON.stringify(usuario));
            localStorage.setItem('USRLGD', usuarioBase64);
        });
    };
    /**
     * @return {?}
     */
    UserService.getRules = /**
     * @return {?}
     */
    function () {
        debugger;
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().identificacaoAcesso);
        /** @type {?} */
        var authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
        /** @type {?} */
        var permissoes = authority.authorities;
        return permissoes;
    };
    /**
     * @param {?} identificacaoAcesso
     * @return {?}
     */
    UserService.prototype.buscarPorIdentificacaoAcesso = /**
     * @param {?} identificacaoAcesso
     * @return {?}
     */
    function (identificacaoAcesso) {
        return this.httpService.doGet(this.path + '/?identificador=' + identificacaoAcesso);
    };
    UserService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    UserService.ctorParameters = function () { return [
        { type: PxtHttpService },
        { type: HttpHelperService }
    ]; };
    /** @nocollapse */ UserService.ngInjectableDef = defineInjectable({ factory: function UserService_Factory() { return new UserService(inject(PxtHttpService), inject(HttpHelperService)); }, token: UserService, providedIn: "root" });
    return UserService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtAppComponent = /** @class */ (function () {
    //Constructor
    function PxtAppComponent(changeDetectorRef, media, componentFactoryResolver, pxtAppComponentService, userService, httpHelperService) {
        var _this = this;
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
    /**
     * @return {?}
     */
    PxtAppComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.urlLogo = this.httpHelperService.getUrlLogo();
        if (this.urlLogo.endsWith('/')) {
            this.urlLogo = this.urlLogo.substring(0, this.urlLogo.length - 1);
        }
        //this.atualizarMenuRotaAtual();
        this.findUserLogged();
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
    /**
     * @return {?}
     */
    PxtAppComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.userService.logout();
    };
    /**
     * @return {?}
     */
    PxtAppComponent.prototype.findUserLogged = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.usuerLogged = UserService.getUsuarioLogado();
        }, 2000);
    };
    PxtAppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-app',
                    template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button style=\"z-index: 1;\" (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <img [src]=\"urlLogo\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{system | uppercaseFirst}}</h1>\n    <h1 class=\"system\" *ngIf=\"!mobileQuery.matches\">{{menuSelected | uppercaseFirst}}</h1>\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button [matMenuTriggerFor]=\"notification\"><mat-icon>notifications</mat-icon> </button>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\">\n      <mat-icon>account_circle</mat-icon>\n    </button>\n    <mat-menu #notification=\"matMenu\" [overlapTrigger]=\"false\">\n        <span disabled mat-menu-item><small>Sem novas notifica\u00E7\u00F5es</small></span>\n      </mat-menu>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <span disabled mat-menu-item *ngIf=\"usuerLogged\" ><small>Ol\u00E1, {{usuerLogged.nome | uppercaseFirst}}</small></span>\n      <button mat-menu-item (click)=\"logout()\">\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [mode]=\"'over'\" [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n      <span *ngFor=\"let item of menus\">\n        <!-- Handle branch node menu items -->\n        <span *ngIf=\"item.childs && item.childs.length > 0\" >\n          <button mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\" [isUserInRule]=\"item.isUserInRule\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <pxt-app-menu-item #menu [items]=\"item.childs\"></pxt-app-menu-item>\n        </span>\n        <!-- Handle leaf node menu items -->\n        <span *ngIf=\"!item.childs || item.childs.length === 0\">\n          <button *ngIf=\"item.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"selectItemMenu(item)\" [isUserInRule]=\"item.isUserInRule\">\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n          <button *ngIf=\"item.menuType=='group'\" mat-menu-item color=\"primary\" [isUserInRule]=\"item.isUserInRule\" >\n            <mat-icon>{{item.menuIcon}}</mat-icon>\n            <span>{{item.menuText | uppercaseFirst}}</span>\n          </button>\n        </span>\n      </span>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n\n</div>",
                    styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}.system{width:100%;text-align:center;position:fixed}.basic-container{padding:0 0 400px}.basic-container .menu-bar{min-height:auto}.basic-container .menu-bar .mat-toolbar-row{height:auto}.version-info{font-size:8pt;float:right;padding:8px}.form{margin-left:10px;border:2px solid #d3d3d3;width:600px;padding-left:5px;margin-top:10px}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}pxt-input{width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    PxtAppComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: MediaMatcher },
        { type: ComponentFactoryResolver },
        { type: undefined, decorators: [{ type: Inject, args: [PxtAppComponentService,] }] },
        { type: UserService },
        { type: HttpHelperService }
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
                    template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n  <span *ngFor=\"let child of items\">\n    <!-- Handle branch node menu items -->\n    <span *ngIf=\"child.childs && child.childs.length > 0\" [isUserInRule]=\"child.isUserInRule\">\n      <a mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\"  [isUserInRule]=\"child.isUserInRule\" >\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n      <pxt-app-menu-item #menu [items]=\"child.childs\" [isUserInRule]=\"child.isUserInRule\"></pxt-app-menu-item>\n    </span>\n    <!-- Handle leaf node menu items -->\n    <span *ngIf=\"!child.childs || child.childs.length === 0\">\n      <a *ngIf=\"child.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"loadComponent(child)\" [isUserInRule]=\"child.isUserInRule\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n\n      <a *ngIf=\"child.menuType=='group'\" mat-menu-item color=\"primary\" [isUserInRule]=\"child.isUserInRule\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n    </span>\n  </span>\n</mat-menu>",
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
var RulesDirective = /** @class */ (function () {
    function RulesDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    RulesDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        debugger;
        /** @type {?} */
        var permissoes = this.getRules();
        this.el.nativeElement.style.display = permissoes.includes(this.rule) ? '' : 'none';
    };
    /**
     * @return {?}
     */
    RulesDirective.prototype.getRules = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().login);
        /** @type {?} */
        var authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
        /** @type {?} */
        var permissoes = authority.authorities;
        return permissoes;
    };
    RulesDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[isUserInRule]'
                },] }
    ];
    /** @nocollapse */
    RulesDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    RulesDirective.propDecorators = {
        rule: [{ type: Input, args: ['isUserInRule',] }]
    };
    return RulesDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DirectiveModule = /** @class */ (function () {
    function DirectiveModule() {
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
    return DirectiveModule;
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
                        PipeModule,
                        DirectiveModule
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
var VisibleInRolesGuard = /** @class */ (function () {
    function VisibleInRolesGuard(router, httpHelper, authorityService, userService) {
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
    VisibleInRolesGuard.prototype.canActivate = /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    function (next, state) {
        /** @type {?} */
        var token = localStorage.getItem('token');
        debugger;
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
                else {
                    /** @type {?} */
                    var authority = jwt_decode(tokenAuthorities);
                    this.userService.setUsuarioLogado(decoded_1.sub); // envia username
                    if (decoded_1.exp === undefined) {
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
    };
    VisibleInRolesGuard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    VisibleInRolesGuard.ctorParameters = function () { return [
        { type: Router },
        { type: HttpHelperService },
        { type: AuthorityService },
        { type: UserService }
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
        return next.handle(request)
            .pipe(tap(function (event) {
        }, function (error) {
            // http response status code
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

export { PxtAppModule, PxtAppComponent, PxtContentModule, PxtContentComponent, MaterialAngularModule, PxtSubmenusModule, PxtSubmenusComponent, PxtDatePickerModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR$1 as CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, PxtDatepickerComponent, PxtDialogModule, PxtDialogComponent, PxtFilterModule, PxtFilterComponent, PxtDialogFilterCustomModule, PxtDialogFilterCustomComponent, PxtSelectModule, PipeModule, PxtInputFilterModule, PxtInputFilterComponent, PxtFilterMatTableModule, ControllerPipe, PxtAppComponentService, PxtHttpService, ConfigService, HttpHelperService, RequestBaseService, VisibleInRolesGuard, AuthorityService, pxtConfiguration, pxtFields, pxtEnumTagHtml, PxtUploadFileModule, PxtGalleryModule, PxtGalleryComponent, pxtCheckboxField, pxtfilterCustomField, pxtDateField, pxtFilterField, pxtInputField, pxtRadioButtonField, pxtSelectField, HashDirective as ɵm, DirectiveModule as ɵd, DynamicFieldDirective as ɵbd, DynamicFieldDirectiveDialog as ɵbc, PxtContentBody as ɵh, RulesDirective as ɵe, PxtAppMenuItemComponent as ɵg, PxtAppMenuItemModule as ɵf, PxtDialogFilterComponent as ɵbb, PxtDialogFilterModule as ɵba, PxtFilterMatTableComponent as ɵbe, PxtUploadFileComponent as ɵbf, PxtButtonComponent as ɵr, PxtButtonModule as ɵq, PxtCheckboxComponent as ɵz, PxtCheckboxModule as ɵy, PxtDateComponent as ɵt, PxtDateModule as ɵs, PxtInputComponent as ɵp, PxtInputModule as ɵo, PxtRadiobuttonComponent as ɵx, PxtRadiobuttonModule as ɵw, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR as ɵu, PxtSelectComponent as ɵv, DateFormatPipe as ɵb, DateTimeFormatPipe as ɵc, UpercaseFirst as ɵa, ErrorService as ɵl, HttpErrorHandler as ɵk, TokenService as ɵj, InterceptService as ɵn, UserService as ɵi };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3Rva2VuLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvZXJyb3Iuc2VydmljZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvaHR0cC1lcnJvci1oYW5kbGVyLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2RlbHMvcHh0Q29uZmlndXJhdGlvbi50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL3VwcGVyY2FzZS1maXJzdC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvdXRpbC9jb25zdGFudHMudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtZm9ybWF0LnBpcGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3BpcGVzL2RhdGUtdGltZS1mb3JtYXQucGlwZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvcGlwZXMvY29udHJvbGxlci5waXBlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2RpcmVjdGl2ZXMvcnVsZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2RpcmVjdGl2ZS9kaXJlY3RpdmUubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC1tZW51LWl0ZW0vcHh0LWFwcC1tZW51LWl0ZW0ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL0hhc2hEaXJlY3RpdmUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC92aXNpYmxlLWluLXJvbGVzLmd1YXJkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9zZXJ2aWNlcy9weHQtaW50ZXJjZXB0b3IvaW50ZXJjZXB0LXNlcnZpY2UgLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtZGF0ZS1maWVsZC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZmllbGRzL3B4dC1maWx0ZXItZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2ZpZWxkcy9weHQtc2VsZWN0LWZpZWxkLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1zZWxlY3QvcHh0LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQvcHh0LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtYnV0dG9uL3B4dC1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1yYWRpb2J1dHRvbi9weHQtcmFkaW9idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3gubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZy50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtaW5wdXQtZmlsdGVyL3B4dC1pbnB1dC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1zdWJtZW51cy9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0udHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXN1Ym1lbnVzL3B4dC1zdWJtZW51cy5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWRhdGVwaWNrZXIvcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kYXRlcGlja2VyL3B4dC1kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXIvcHh0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci9weHQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXItY3VzdG9tL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWZpbHRlci1tYXQtdGFibGUvcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXItbWF0LXRhYmxlL3B4dC1maWx0ZXItbWF0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kZWxzL3B4dC1maWVsZHMtbW9kZWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL2VudW0vcHh0LWVudW0tdGFnLWh0bWwudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LXVwbG9hZC1maWxlL3B4dC11cGxvYWQtZmlsZS5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWdhbGxlcnkvcHh0LWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1nYWxsZXJ5L3B4dC1nYWxsZXJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3VibWVudXNJdGVuczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnN1Ym1lbnVzSXRlbnMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxvYWRDb21wb25lbnRPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9sb2FkQ29tcG9uZW50LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3NldFVzZXJMb2dnZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1c2VyTG9nZ2VkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0VXNlckxvZ2dlZC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRJbmZvSW5pdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9Jbml0aWFsOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9zZXRJbmZvSW5pdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZXRTdWJtZW51cyhyb3V0ZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VibWVudXNJdGVucy5uZXh0KHJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbEluZm8oaW5mb0luaXRpYWwpIHtcclxuICAgICAgICB0aGlzLl9zZXRJbmZvSW5pdC5uZXh0KGluZm9Jbml0aWFsKVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDb21wb25lbnQoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50Lm5leHQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3NldFVzZXJMb2dnZWQubmV4dCh1c2VyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBjb25maWc6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7IH1cclxuXHJcbiAgbG9hZCh1cmw6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5qZWN0SHR0cCA9IHRoaXMuaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGluamVjdEh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgICBtYXAocmVzID0+IHJlcylcclxuICAgICAgKS5zdWJzY3JpYmUoY29uZmlnID0+IHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWd1cmF0aW9uKGVsZW1lbnQ6IHN0cmluZywgZGF0YUxpc3Q/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZGF0YUxpc3QpIHtcclxuICAgICAgY29uc3QgdXJsV2l0aEVsZW1lbnQgPSB0aGlzLmNvbmZpZ1tlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVybFdpdGhEYXRhTGlzdCA9IHRoaXMuY29uZmlnW2RhdGFMaXN0XVtlbGVtZW50XTtcclxuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5VXJsKHVybFdpdGhEYXRhTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2ZXJpZnlVcmwodHlwZU1vZGVsOiBhbnkpIHtcclxuICAgIGlmICh0eXBlTW9kZWwuaW5jbHVkZXMoJy8nLCB0eXBlTW9kZWwubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgY29uc3QgdHlwZVJlbGVhc2UgPSB0eXBlTW9kZWw7XHJcbiAgICAgIHJldHVybiB0eXBlUmVsZWFzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlTW9kZWwgKyAnLyc7XHJcbiAgICAgIHJldHVybiBuZXdUeXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEZyb250U2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdGUk9OVCcsICdTR0knKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpVXJsIChuYW1lLCB1cmwpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbih1cmwsIG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVybExvZ28oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ0lNQUdFTV9MT0dPJywgJ1NHSScpO1xyXG4gIH1cclxufSIsIlxuZXhwb3J0IGNvbnN0IGVudmlyb25tZW50ID0ge1xuICBwcm9kdWN0aW9uOiB0cnVlLFxuICBlbnZOYW1lOiAnZGV2JyxcbiAgdmVyc2lvbjogJzAuMC4xJyxcbiAgQ09ORklHX0ZJTEU6ICdhc3NldHMvY29uZmlnL2Vudi5qc29uJyxcbiAgZXNiQXBpUHh0IDogXCJodHRwOi8vZXNiZHN2LnBlaXhvdG8uY29tLmJyL3NnZS9cIiwgIFxuICBzeXN0ZW06IHtcbiAgICBpZDogMTA4LFxuICAgIHByZXg6IFwiUE9SQ1JQXCJcbiAgfVxufTtcblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG52YXIgc3lzdGVtID0gZW52aXJvbm1lbnQuc3lzdGVtO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICB9XG4gIHNldFRva2VuU3RvcmFnZShyZXM6IGFueSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICB9XG4gIHJlbW92ZVRva2VuU3RvcmFnZSgpIHtcbiAgICB2YXIgdG9rZW4gPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICBjb25zdCBkZWNvZGVkID0gPGFueT4gand0X2RlY29kZSh0b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3lzdGVtLmlkK3N5c3RlbS5wcmV4K2RlY29kZWQuc3ViKTtcbiAgfVxuICBcbiAgZGVsZXRlVG9rZW4oKSB7XG4gICAgdGhpcy5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgfVxuXG4gIHRva2VuRXhpc3RzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gbnVsbCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gdW5kZWZpbmVkICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1weHQtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGZhbHNlKTtcbiAgfVxuICBjb25maXJtYXRpb24oKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEVycm9yU2VydmljZSB7XHJcblxyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nID0gXCJcIjtcclxuICBcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG5leHBvcnQgdHlwZSBIYW5kbGVFcnJvciA9IDxUPiAob3BlcmF0aW9uPzogc3RyaW5nLCByZXN1bHQ/OiBUKSA9PiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBPYnNlcnZhYmxlPFQ+O1xyXG5cclxuLyoqIEhhbmRsZXMgSHR0cENsaWVudCBlcnJvcnMgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEVycm9ySGFuZGxlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UpIHsgfVxyXG5cclxuICAvKiogQ3JlYXRlIGhhbmRsZUVycm9yIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBrbm93cyB0aGUgc2VydmljZSBuYW1lICovXHJcbiAgY3JlYXRlSGFuZGxlRXJyb3IgPSAoc2VydmljZU5hbWUgPSAnJykgPT4gPFQ+XHJcbiAgICAob3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdCA9IHt9IGFzIFQpID0+IHRoaXMuaGFuZGxlRXJyb3Ioc2VydmljZU5hbWUsIG9wZXJhdGlvbiwgcmVzdWx0KTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHNlcnZpY2VOYW1lOiBuYW1lIG9mIHRoZSBkYXRhIHNlcnZpY2VcclxuICAgKiBAcGFyYW0gb3BlcmF0aW9uOiBuYW1lIG9mIHRoZSBmYWlsZWQgb3BlcmF0aW9uXHJcbiAgICogQHBhcmFtIHJlc3VsdDogb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAqL1xyXG4gIGhhbmRsZUVycm9yPFQ+IChzZXJ2aWNlTmFtZSA9ICcnLCBvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0ID0ge30gYXMgVCkge1xyXG5cclxuICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgIC8vIFRvZG8gLT4gU2VuZCB0aGUgZXJyb3IgdG8gcmVtb3RlIGxvZ2dpbmcgaW5mcmFzdHJ1Y3R1cmVcclxuICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxyXG5cclxuICAgICAgY29uc3QgbWVzc2FnZSA9IChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yRXZlbnQpID9cclxuICAgICAgICBlcnJvci5lcnJvci5tZXNzYWdlIDpcclxuICAgICAgIGB7ZXJyb3IgY29kZTogJHtlcnJvci5zdGF0dXN9LCBib2R5OiBcIiR7ZXJyb3IubWVzc2FnZX1cIn1gO1xyXG5cclxuICAgICAgLy8gVG9kbyAtPiBUcmFuc2Zvcm1pbmcgZXJyb3IgZm9yIHVzZXIgY29uc3VtcHRpb25cclxuICAgICAgdGhpcy5lcnJvclNlcnZpY2UuZXJyb3JNZXNzYWdlID0gYCR7c2VydmljZU5hbWV9IC0+ICR7b3BlcmF0aW9ufSBmYWlsZWQuXFxuICBNZXNzYWdlOiAke21lc3NhZ2V9YDtcclxuICAgICAgLy8gLT4gUmV0dXJuIGEgc2FmZSByZXN1bHQuXHJcbiAgICAgIHJldHVybiBvZiggcmVzdWx0ICk7XHJcbiAgICB9O1xyXG4gIH1cclxufSIsImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdCwgZm9yd2FyZFJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNBcmdzLCBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiwgZmluYWxpemUsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi8uLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi90b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vLi4vLi4vbW9kdWxlcy9weHQtZGlhbG9nL3B4dC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JIYW5kbGVyLCBIYW5kbGVFcnJvciB9IGZyb20gJy4vaHR0cC1lcnJvci1oYW5kbGVyJztcblxuLy9pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vSHR0cEhlbHBlclNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHh0SHR0cFNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcblxuICBwcml2YXRlIGhhbmRsZUVycm9yOiBIYW5kbGVFcnJvcjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kLFxuICAgIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgdXJsSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBodHRwRXJyb3JIYW5kbGVyOiBIdHRwRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGJhY2tlbmQsIG9wdGlvbnMpO1xuICAgIHRoaXMuaGFuZGxlRXJyb3IgPSBodHRwRXJyb3JIYW5kbGVyLmNyZWF0ZUhhbmRsZUVycm9yKCdDdXN0b21lclNlcnZpY2UnKTtcbiAgfVxuXG4gIHVybFJlcXVlc3Q6IGFueTtcbiAgb3JpZ1JlcXVlc3Q6IFJlcXVlc3Q7XG4gIGlzVW5hdGhvdXJpemVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBDb250cm9sIFNlcnZpY2VzXG4gICAqL1xuICBnZXRIZWFkZXJzKCkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDYWNoZS1Db250cm9sJywgJ25vLXN0b3JlJyk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ1ByYWdtYScsICduby1jYWNoZScpO1xuXG4gICAgaGVhZGVycy5hcHBlbmQoXCJDYWNoZS1Db250cm9sXCIsIFwibm8tY2FjaGVcIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIiwgXCJ0cnVlXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgSEVBRCwgUE9TVCwgUFVULCBQQVRDSCwgREVMRVRFLCBPUFRJT05TXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkNvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbiwgQWNjZXB0XCIpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgaGFuZGxlUmVzcG9uc2Uob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxSZXNwb25zZT4sIHVybD86IHN0cmluZykge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGNvbnN0IG9yaWcgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJlc3VsdCA9IG9ic2VydmFibGUucGlwZShcbiAgICAgLy8gY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdhZGRDdXN0b21lcicsIG51bGwpKSxcbiAgICAgIFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25DYXRjaChlcnJvcik7XG4gICAgICB9KSxcbiAgICAgIFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uUmVzdWx0KHJlcyk7XG4gICAgICB9KVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBvblJlc3VsdChyZXMpIHtcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIGlmIChyZXMuc3RhdHVzID09IDIwMSkge1xuICAgICAgcmV0dXJuIHJlcy5fYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICB9XG5cbiAgZG9HZXQoYXBpOiBzdHJpbmcsIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICAvLyB0aGlzLnByZUxvYWRlclNlcnZpY2UudXBkYXRlKHRydWUpO1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKSk7XG4gIH1cblxuICBkb1Bvc3QoZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gZW5kcG9pbnQ7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShzdXBlci5wb3N0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1B1dChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgY29uc3QgdXJsID0gYXBpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogdGhpcy5nZXRIZWFkZXJzKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2Uoc3VwZXIucHV0KHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb1BhdGgoYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSwgbG9hZGVyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IHVybCA9IGFwaTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLnBhdGNoKHVybCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucyksIHVybCk7XG4gIH1cblxuICBkb0RlbGV0ZShhcGk6IHN0cmluZywgcGFyYW1zOiBhbnksIGxvYWRlcj86IGJvb2xlYW4pIHtcbiAgICBjb25zdCB1cmwgPSBhcGk7XG4gICAgY29uc3QgdXJsUGFyYW0gPSB1cmwgKyAnLycgKyBwYXJhbXM7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiB0aGlzLmdldEhlYWRlcnMoKSB9KTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHN1cGVyLmRlbGV0ZSh1cmxQYXJhbSwgcmVxdWVzdE9wdGlvbnMpLCB1cmxQYXJhbSk7XG4gIH1cblxuXG4gIHJlcXVlc3QodXJsOiBzdHJpbmcgfCBSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIG9wdGlvbnMgPSB0aGlzLnJlcXVlc3RBcmdzKG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy51cmxSZXF1ZXN0ID0gdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybFJlcXVlc3QgPSB1cmwudXJsO1xuICAgICAgdGhpcy5vcmlnUmVxdWVzdCA9IHVybDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy51cmxSZXF1ZXN0ICE9PSBlbnZpcm9ubWVudC5DT05GSUdfRklMRSkge1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpO1xuICAgICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5vcmlnUmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJy5jb25jYXQodG9rZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cmwgPSB0aGlzLm9yaWdSZXF1ZXN0O1xuICAgIHJldHVybiBzdXBlci5yZXF1ZXN0KHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RBcmdzKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zQXJncyk6IFJlcXVlc3RPcHRpb25zQXJncyB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IHRoaXMuZ2V0SGVhZGVycygpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuICBwdWJsaWMgb25DYXRjaChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKCF0aGlzLmlzVW5hdGhvdXJpemVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMSk7XG4gICAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDFcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVW5hdGhvdXJpemVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwMDpcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMCk7XG4gICAgICAgIC8vIHRoaXMudG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuU3RvcmFnZSgpO1xuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0ICsgXCI/ZXJybz00MDBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwNDpcbiAgICAgICAvLyBjb25zb2xlLmxvZyhcImVycm9yIDQwMFwiKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwNClcbiAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDA0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDM6XG4gICAgICAgIC8vY29uc29sZS5sb2coNDAzKTtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKDQwMylcbiAgICAgICAgLy90aGlzLnRva2VuU2VydmljZS5yZW1vdmVUb2tlblN0b3JhZ2UoKTtcbiAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89NDA0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHRoaXMub3BlbkRpYWxvZyg0MDEpO1xuICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGVudmlyb25tZW50LmVzYkFwaVB4dCArIFwiP2Vycm89MFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG5cblxuICBvcGVuRGlhbG9nKGVycm8pIHtcbiAgICB2YXIgY29udGVudERpYWxvZyA9IFwiVm9jw4PCqiBzZXLDg8KhIHJlZGlyZWNpb25hZG8gYSB0ZWxhIGRlIGF1dGVudGljYcODwqfDg8KjbyFcIlxuXG4gICAgbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUHh0RGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgIGRhdGE6IHsgdGl0bGVEaWFsb2c6IFwiRXJybyAtIFwiICsgZXJybywgY29udGVudERpYWxvZzogY29udGVudERpYWxvZyB9XG4gICAgfSk7XG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMudXJsSGVscGVyLmdldEZyb250U2dpKCkpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnVybEhlbHBlci5nZXRGcm9udFNnaSgpICsgXCI/ZXJybz1cIiArIGVycm87XG4gICAgfSk7XG5cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHB4dENvbmZpZ3VyYXRpb24gPSB7c3lzdGVtSWQ6IDEwNCAsc3lzdGVtUHJleDogXCJTR0VfTkVXXCJ9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9weHRDb25maWd1cmF0aW9uXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIHBhdGggPSAndXN1YXJpb3MnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLnBhdGggPSB0aGlzLmhlbHBlci5nZXRBcGlTZ2koKSsgdGhpcy5wYXRoO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5oZWxwZXIuZ2V0RnJvbnRTZ2koKSArICc/cHJlZml4b1Npc3RlbWE9JyArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VXN1YXJpb0xvZ2FkbygpOiBhbnkge1xuICAgIGRlYnVnZ2VyXG4gICAgbGV0IHVzdWFyaW86IGFueSA9IHt9O1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVVNSTEdEJykgIT09IG51bGwpIHtcbiAgICAgIGxldCB1c3VhcmlvQmFzZTY0OiBzdHJpbmcgPSBhdG9iKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVU1JMR0QnKSk7XG4gICAgICB1c3VhcmlvID0gSlNPTi5wYXJzZSh1c3VhcmlvQmFzZTY0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+and0X2RlY29kZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG4gICAgICB1c3VhcmlvLmlkZW50aWZpY2FjYW9BY2Vzc28gPSBkZWNvZGVkLnN1YjtcbiAgICAgIHVzdWFyaW8uY29kaWdvUGVzc29hID0gZGVjb2RlZC5wZXJzb25faWQ7XG4gICAgfVxuICAgIHJldHVybiB1c3VhcmlvO1xuICB9XG5cbiAgc2V0VXN1YXJpb0xvZ2Fkbyh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5idXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKHVzZXJuYW1lKS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIGxldCB1c3VhcmlvOiBhbnkgPSB7fTtcbiAgICAgIHVzdWFyaW8gPSB2YWw7XG4gICAgICBpZiAodXN1YXJpbyA9PT0gbnVsbCkge1xuICAgICAgICB1c3VhcmlvID0ge307XG4gICAgICB9XG4gICAgICBsZXQgdXN1YXJpb0Jhc2U2NDogc3RyaW5nID0gYnRvYShKU09OLnN0cmluZ2lmeSh1c3VhcmlvKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVVNSTEdEJywgdXN1YXJpb0Jhc2U2NCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFJ1bGVzKCk6IHN0cmluZ1tdIHtcbiAgICBkZWJ1Z2dlclxuICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArcHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1QcmV4ICsgVXNlclNlcnZpY2UuZ2V0VXN1YXJpb0xvZ2FkbygpLmlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICAgIGNvbnN0IGF1dGhvcml0eSA9IDxhbnk+and0X2RlY29kZSh0b2tlbkF1dGhvcml0aWVzKTtcbiAgICBsZXQgcGVybWlzc29lczogc3RyaW5nW10gPSBhdXRob3JpdHkuYXV0aG9yaXRpZXM7XG4gICAgcmV0dXJuIHBlcm1pc3NvZXM7XG4gIH1cblxuICBidXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKGlkZW50aWZpY2FjYW9BY2Vzc286IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMucGF0aCArICcvP2lkZW50aWZpY2Fkb3I9JyArIGlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgSW5wdXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQeHRBcHAgfSBmcm9tICcuL3B4dC1hcHAnO1xuaW1wb3J0IHsgUHh0QXBwTW9kZWwgfSBmcm9tICcuL21vZGVsL3B4dC1hcHAubW9kZWwnO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0TWVudSwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2FmZUh0bWwsIERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWFwcC5jb21wb25lbnQuc2NzcyddXG5cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50IHtcblxuICAvL1Byb3BlcnRpZXNcbiAgcm91dGVzOiBhbnlbXSA9IFtdO1xuICBncm91cHM6IGFueVtdID0gW107XG4gIG1lbnVzOiBhbnlbXSA9IFtdO1xuICBzeXN0ZW06IFN0cmluZyA9IFwiU1lTVEVNIE5BTUVcIlxuICB1cmxJbWc6IHN0cmluZyA9ICdodHRwOi8vaW1hZ2Vuc2Rzdi5wZWl4b3RvLmNvbS5ici9hdXRoL21pbmlfbG9nby5wbmcnO1xuICBtZW51U2VsZWN0ZWQgPSBcIlwiO1xuICB1c3VlckxvZ2dlZDogYW55ID0ge307XG4gIG1lbnVzSHRtbDogU2FmZUh0bWw7XG4gIHJlc3VsdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgX21vYmlsZVF1ZXJ5TGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF0TWVudTogTWF0TWVudTtcbiAgQFZpZXdDaGlsZCgnbWVudXMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgc3ViQ29udGFpbmVyMTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnVUcmlnZ2VyJywgeyByZWFkOiBNYXRNZW51VHJpZ2dlciB9KSBjb250ZXh0TWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuICBtZW51c1JlY2VpdmVkOiBhbnlbXTtcbiAgdXJsTG9nbzogc3RyaW5nID0gJyc7XG5cbiAgLy9Db25zdHJ1Y3RvclxuICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgbWVkaWE6IE1lZGlhTWF0Y2hlcixcbiAgICBwdWJsaWMgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQEluamVjdChQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSBwdWJsaWMgcHh0QXBwQ29tcG9uZW50U2VydmljZSxcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGh0dHBIZWxwZXJTZXJ2aWNlOiBIdHRwSGVscGVyU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeSA9IG1lZGlhLm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDYwMHB4KScpO1xuICAgIHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIgPSAoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5hZGRMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICB0aGlzLnJlc3VsdCA9IHB4dEFwcENvbXBvbmVudFNlcnZpY2UuaW5mb0luaXRpYWwuc3Vic2NyaWJlKGluZm9Jbml0aWFsID0+IHtcbiAgICAgIGlmIChpbmZvSW5pdGlhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy51c3VlckxvZ2dlZCA9IGluZm9Jbml0aWFsLnVzZXJMb2dnZWQ7XG4gICAgICAgIHRoaXMuc3lzdGVtID0gaW5mb0luaXRpYWwuc3lzdGVtO1xuICAgICAgICB0aGlzLm1lbnVzUmVjZWl2ZWQgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMubWVudXMgPSBpbmZvSW5pdGlhbC5zaWRlQmFyTWVudXM7XG4gICAgICAgIHRoaXMucHJlcGFyZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmliZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cmxMb2dvID0gdGhpcy5odHRwSGVscGVyU2VydmljZS5nZXRVcmxMb2dvKCk7XG4gICAgaWYgKHRoaXMudXJsTG9nby5lbmRzV2l0aCgnLycpKSB7XG4gICAgICB0aGlzLnVybExvZ28gPSB0aGlzLnVybExvZ28uc3Vic3RyaW5nKDAsIHRoaXMudXJsTG9nby5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgLy90aGlzLmF0dWFsaXphck1lbnVSb3RhQXR1YWwoKTtcbiAgICB0aGlzLmZpbmRVc2VyTG9nZ2VkKCk7XG4gIH1cblxuICAvLyBJbmNsdWRlIG9mIGNvbXBvbmVudHMgaW4gdGhlIGFwcGxpY2F0aW9uIGJvZHlcbiAgbG9hZENvbXBvbmVudChyb3V0ZTogYW55LCBhZEhvc3QpIHtcbiAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IHJvdXRlLm1lbnVUZXh0O1xuICAgIGxldCBhZEl0ZW0gPSByb3V0ZS5tZW51U291cmNlO1xuICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoYWRJdGVtLmNvbXBvbmVudCk7XG4gICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSBhZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICB9XG5cbiAgLy8gU3Vic2NyaXB0aW9uIHRvIHRoZSBzZXJ2aWNlIHJlc3BvbnNpYmxlIGZvciBpbmNsdWRpbmcgY29tcG9uZW50cyBpbiB0aGUgYm9keSBvZiB0aGUgYXBwbGljYXRpb25cbiAgc3Vic2NyaWJlQ29tcG9uZW50KCkge1xuICAgIHRoaXMucHh0QXBwQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50T2JzZXJ2YWJsZS5zdWJzY3JpYmUoY29tcG9uZW50T2JqID0+IHtcbiAgICAgIHZhciBhcnJheUF1eCA9IHRoaXMubWVudXNSZWNlaXZlZC5maWx0ZXIoeCA9PiB4Lm1lbnVTb3VyY2UgIT0gdW5kZWZpbmVkICYmIHgubWVudVNvdXJjZS5jb21wb25lbnQgPT09IGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgaWYgKGFycmF5QXV4Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gYXJyYXlBdXhbMF0ubWVudVRleHQ7XG4gICAgICB9XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudE9iai5jb21wb25lbnQpO1xuICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgKDxBZENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGEgPSBjb21wb25lbnRPYmouZGF0YTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJlc3BvbnNpYmxlIGZvciBjYWxsIG1ldGhvZCBcImxvYWRjb21wb25lbnRzKClcIiBpbmZvcm1pbmcgcGFyYW1ldGVyc1xuICBzZWxlY3RJdGVtTWVudShuYXYpIHtcbiAgICB0aGlzLmxvYWRDb21wb25lbnQobmF2LCB0aGlzLmFkSG9zdCk7XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIHByZXBhcmluZyBhcHBsaWNhdGlvbiBtZW51cztcbiAgcHJlcGFyZU1lbnUoKSB7XG4gICAgbGV0IGFycmF5QXV4OiBhbnlbXTtcbiAgICBhcnJheUF1eCA9IHRoaXMubWVudXMuZmlsdGVyKHggPT4geC5tZW51VHlwZSA9PSBcImdyb3VwXCIgJiYgeC5tZW51UGFyZW50ID09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEdyb3VwID0gdGhpcy5tZW51cy5maWx0ZXIoeCA9PiB4Lm1lbnVUeXBlID09IFwiZ3JvdXBcIiAmJiB4Lm1lbnVQYXJlbnQgIT09IFwiXCIpO1xuICAgIHZhciBhcnJheUF1eEl0ZW0gPSB0aGlzLm1lbnVzLmZpbHRlcih4ID0+IHgubWVudVR5cGUgPT0gXCJpdGVtXCIgJiYgeC5tZW51UGFyZW50ICE9PSBcIlwiKTtcblxuICAgIC8vYWRkIGl0ZW5zIGluIGdyb3Vwc1xuICAgIGFycmF5QXV4SXRlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXhHcm91cC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIC8vYWRkIGdyb3VwcyBpbiBncm91cHNcbiAgICBhcnJheUF1eEdyb3VwLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eEdyb3VwLmZpbHRlcih4ID0+IHgubWVudUlkID09IGl0ZW0ubWVudVBhcmVudCk7XG4gICAgICBpZiAoYXJyYXlUbXAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKGFycmF5VG1wWzBdLmNoaWxkcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVRtcFswXS5jaGlsZHMucHVzaChpdGVtKVxuICAgICAgfTtcbiAgICB9KTtcbiAgICAvL2FkZCBncm91cHMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhHcm91cC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdmFyIGFycmF5VG1wID0gYXJyYXlBdXguZmlsdGVyKHggPT4geC5tZW51SWQgPT0gaXRlbS5tZW51UGFyZW50KTtcbiAgICAgIGlmIChhcnJheVRtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoYXJyYXlUbXBbMF0uY2hpbGRzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcyA9IFtdO1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5VG1wWzBdLmNoaWxkcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy9hZGQgaXRlbnMgaW4gc3VwZXItZ3JvdXBzXG4gICAgYXJyYXlBdXhJdGVtLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB2YXIgYXJyYXlUbXAgPSBhcnJheUF1eC5maWx0ZXIoeCA9PiB4Lm1lbnVJZCA9PSBpdGVtLm1lbnVQYXJlbnQpO1xuICAgICAgaWYgKGFycmF5VG1wLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcnJheVRtcFswXS5jaGlsZHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlUbXBbMF0uY2hpbGRzLnB1c2goaXRlbSk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5tZW51cyA9IGFycmF5QXV4O1xuICB9O1xuXG4gIGxvZ291dCgpIHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ291dCgpO1xuICB9O1xuXG4gIGZpbmRVc2VyTG9nZ2VkKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51c3VlckxvZ2dlZCA9IFVzZXJTZXJ2aWNlLmdldFVzdWFyaW9Mb2dhZG8oKTtcbiAgICB9LCAyMDAwKTtcbiAgfVxufVxuIiwiaW1wb3J0ICcuLy4uLy4uLy4uL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtDZGtUYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7Q2RrVHJlZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gIE1hdEJhZGdlTW9kdWxlLFxuICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxuICBNYXRDaGlwc01vZHVsZSxcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgTWF0RGlhbG9nTW9kdWxlLFxuICBNYXREaXZpZGVyTW9kdWxlLFxuICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gIE1hdEdyaWRMaXN0TW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TGlzdE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRSYWRpb01vZHVsZSxcbiAgTWF0UmlwcGxlTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNpZGVuYXZNb2R1bGUsXG4gIE1hdFNsaWRlck1vZHVsZSxcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gIE1hdFNuYWNrQmFyTW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRTdGVwcGVyTW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VGFic01vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgTWF0VHJlZU1vZHVsZSxcbiAgTWF0TGluZU1vZHVsZSxcbiAgTWF0Q29tbW9uTW9kdWxlLFxuICBNYXRPcHRpb25Nb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0UHNldWRvQ2hlY2tib3hNb2R1bGUsXG4gIFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtwbGF0Zm9ybUJyb3dzZXJEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENka1RhYmxlTW9kdWxlLFxuICAgIENka1RyZWVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0VHJlZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsTWF0SWNvbk1vZHVsZSxNYXRMaW5lTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsTWF0U29ydE1vZHVsZSxNYXRUYWJzTW9kdWxlLE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsTWF0Q2hpcHNNb2R1bGUsTWF0SW5wdXRNb2R1bGUsTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsTWF0QnV0dG9uTW9kdWxlLE1hdENvbW1vbk1vZHVsZSxNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLE1hdFJpcHBsZU1vZHVsZSxNYXRTZWxlY3RNb2R1bGUsTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsTWF0U2lkZW5hdk1vZHVsZSxNYXRTdGVwcGVyTW9kdWxlLE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxNYXRUb29sdGlwTW9kdWxlLE1hdENoZWNrYm94TW9kdWxlLE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLE1hdEV4cGFuc2lvbk1vZHVsZSxNYXRGb3JtRmllbGRNb2R1bGUsTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsTWF0TmF0aXZlRGF0ZU1vZHVsZSxNYXRCb3R0b21TaGVldE1vZHVsZSxNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxNYXRBdXRvY29tcGxldGVNb2R1bGUsTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gICAgQ2RrVHJlZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxNYXRDYXJkTW9kdWxlLE1hdEljb25Nb2R1bGUsTWF0TGluZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLE1hdFNvcnRNb2R1bGUsTWF0VGFic01vZHVsZSxNYXRUcmVlTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLE1hdENoaXBzTW9kdWxlLE1hdElucHV0TW9kdWxlLE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLE1hdEJ1dHRvbk1vZHVsZSxNYXRDb21tb25Nb2R1bGUsTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdE9wdGlvbk1vZHVsZSxNYXRSaXBwbGVNb2R1bGUsTWF0U2VsZWN0TW9kdWxlLE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLE1hdFNpZGVuYXZNb2R1bGUsTWF0U3RlcHBlck1vZHVsZSxNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsTWF0VG9vbHRpcE1vZHVsZSxNYXRDaGVja2JveE1vZHVsZSxNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxNYXRFeHBhbnNpb25Nb2R1bGUsTWF0Rm9ybUZpZWxkTW9kdWxlLE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLE1hdE5hdGl2ZURhdGVNb2R1bGUsTWF0Qm90dG9tU2hlZXRNb2R1bGUsTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsTWF0QXV0b2NvbXBsZXRlTW9kdWxlLE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIEJyb3dzZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4vcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tICcuL3Rva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlIHtcblxuICBwdWJsaWMgbW9kZWw6IGFueTtcbiAgcHVibGljIHVybFNlcnZpY2U6IHN0cmluZztcbiAgcHVibGljIHVybFNlcnZpY2VBdXRvOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2UsXG4gICAgcHVibGljIF9odHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7XG4gICAgdGhpcy51cmxTZXJ2aWNlID0gaGVscGVyLmdldEFwaSgpO1xuICB9XG4gIGxvYWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2VBdXRvKTtcbiAgfTtcbiAgc2F2ZShtb2RlbD86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZUF1dG8sIG1vZGVsKTtcbiAgfTtcbiAgZGVsZXRlKGlkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh0aGlzLnVybFNlcnZpY2VBdXRvLCBpZCk7XG4gIH07XG5cbiAgZG9HZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBNYXA8YW55LCBhbnk+KSB7XG4gICAgbGV0IHVybFxuICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCAmJiBwYXJhbXMuc2l6ZSA+IDApIHtcbiAgICAgIHVybCA9IHBhdGggKyB0aGlzLmJ1aWxkUmVxdWVzdFBhcmFtcyhwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBwYXRoO1xuICAgIH1cbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQocGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMudXJsU2VydmljZSArIHVybCk7XG4gICAgfVxuICB9O1xuXG4gIGRvUG9zdChwYXRoOiBzdHJpbmcsIG1vZGVsPzogYW55KSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdChwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2UgKyBwYXRoLCBtb2RlbCk7XG4gICAgfTtcbiAgfTtcblxuICBkb1B1dChwYXRoOiBzdHJpbmcsIG1vZGVsPzogYW55KSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHBhdGgsIG1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQodGhpcy51cmxTZXJ2aWNlICsgcGF0aCwgbW9kZWwpO1xuICAgIH1cbiAgfTtcblxuICBkb0RlbGV0ZShwYXRoOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9EZWxldGUocGF0aCwgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh0aGlzLnVybFNlcnZpY2UgKyBwYXRoLCBpZCk7XG4gICAgfTtcbiAgfTtcblxuICB1cGxvYWRJbWFnZShwYXRoLCBwYXJhbXM/OiBNYXA8YW55LCBhbnk+KTogYW55IHtcblxuICAgIGlmIChwYXRoLmluZGV4T2YoJ2h0dHAnKSA8PSAtMSkge1xuICAgICAgcGF0aCA9IHRoaXMudXJsU2VydmljZSArIHBhdGggO1xuICAgIH07XG5cbiAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJy5jb25jYXQodGhpcy50b2tlblNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSlcbiAgICB9O1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0gbmV3IEh0dHBIZWFkZXJzKGhlYWRlcik7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLnRva2VuU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IGZvcm1kYXRhID0gdGhpcy5zZXRQYXJhbXNGb3JtZGF0YShwYXJhbXMpO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCgnUE9TVCcsIHBhdGgsIGZvcm1kYXRhLCB7XG4gICAgICBoZWFkZXJzOiBodHRwT3B0aW9ucyxcbiAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlLFxuICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCdcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faHR0cENsaWVudC5yZXF1ZXN0KHJlcSk7XG4gIH1cblxuXG4gIHNldFBhcmFtc0Zvcm1kYXRhKHBhcmFtczogTWFwPGFueSwgYW55Pik6IEZvcm1EYXRhIHtcbiAgICBjb25zdCBmb3JtZGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBsZXQgcHJpbWVpcmFJdGVyYWNhbyA9IHRydWU7XG4gICAgcGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGZvcm1kYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWRhdGE7XG4gIH07XG5cbiAgcHJpdmF0ZSBidWlsZFJlcXVlc3RQYXJhbXMocGFyYW1zOiBNYXA8YW55LCBhbnk+KTogc3RyaW5nIHtcbiAgICBsZXQgZmluYWwgPSAnJztcbiAgICBsZXQgcHJpbWVpcmFJdGVyYWNhbyA9IHRydWU7XG4gICAgcGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChwcmltZWlyYUl0ZXJhY2FvKSB7XG4gICAgICAgIGZpbmFsICs9ICc/JyArIGtleSArICc9JyArIHZhbHVlO1xuICAgICAgICBwcmltZWlyYUl0ZXJhY2FvID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaW5hbCArPSAnJicgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmluYWw7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSwgVXBwZXJDYXNlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAndXBwZXJjYXNlRmlyc3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVcGVyY2FzZUZpcnN0IGV4dGVuZHMgVXBwZXJDYXNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKHRleHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZhciB3b3JkcyA9IHRleHQudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIik7XHJcbiAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgd29yZHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICBpZiAod29yZHNbYV0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgdmFyIHcgPSB3b3Jkc1thXTtcclxuICAgICAgICAgIHdvcmRzW2FdID0gd1swXS50b1VwcGVyQ2FzZSgpICsgdy5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHdvcmRzLmpvaW4oXCIgXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERBVEVfRk1UID0gJ2RkL01NL3l5eXknO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERBVEVfVElNRV9GTVQgPSBgJHtDb25zdGFudHMuREFURV9GTVR9IC0gaGg6bW06c3MgYWA7XHJcbiAgfSIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL3V0aWwvY29uc3RhbnRzXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnZGF0ZUZvcm1hdCdcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0UGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICAgIHJldHVybiBzdXBlci50cmFuc2Zvcm0odmFsdWUsIENvbnN0YW50cy5EQVRFX0ZNVCk7XHJcbiAgICB9XHJcbiAgfSIsImltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL3V0aWwvY29uc3RhbnRzXCI7XHJcblxyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdkYXRlVGltZUZvcm1hdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVUaW1lRm9ybWF0UGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgdmFyIGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKFwiZW4tVVNcIik7XHJcbiAgICByZXR1cm4gIGRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfVElNRV9GTVQpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSwgVXBwZXJDYXNlUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnY29udHJvbGxlclBpcGUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKHRleHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZhciB3b3JkcyA9IHRleHQ7XHJcbiAgICAgIHZhciBhdXggPSBcIlwiO1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHdvcmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgaWYgKGEgPT0gMCkge1xyXG4gICAgICAgICAgICBhdXggPSB3b3Jkc1thXS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBhdXggPSBhdXggKyB3b3Jkc1thXSA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhdXg7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4vdXBwZXJjYXNlLWZpcnN0JztcclxuaW1wb3J0IHsgRGF0ZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtZm9ybWF0LnBpcGUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUZvcm1hdFBpcGUgfSBmcm9tICcuL2RhdGUtdGltZS1mb3JtYXQucGlwZSc7XHJcbmltcG9ydCB7IENvbnRyb2xsZXJQaXBlIH0gZnJvbSAnLi9jb250cm9sbGVyLnBpcGUnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1VwZXJjYXNlRmlyc3QsIERhdGVGb3JtYXRQaXBlLERhdGVUaW1lRm9ybWF0UGlwZSwgQ29udHJvbGxlclBpcGUgXSxcclxuICAgIGV4cG9ydHM6IFtVcGVyY2FzZUZpcnN0LCBEYXRlRm9ybWF0UGlwZSxEYXRlVGltZUZvcm1hdFBpcGUsIENvbnRyb2xsZXJQaXBlIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBpcGVNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGl0ZW1zOiBhbnlbXTtcbiAgQFZpZXdDaGlsZCgnY2hpbGRNZW51JykgcHVibGljIGNoaWxkTWVudTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkQ29tcG9uZW50KGNoaWxkKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnQoe2NvbXBvbmVudDogY2hpbGQubWVudVNvdXJjZS5jb21wb25lbnQsIGRhdGE6XCJcIn0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaXNVc2VySW5SdWxlXSdcbn0pXG5leHBvcnQgY2xhc3MgUnVsZXNEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnaXNVc2VySW5SdWxlJykgcnVsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGRlYnVnZ2VyXG4gICAgbGV0IHBlcm1pc3NvZXM6IHN0cmluZ1tdID0gdGhpcy5nZXRSdWxlcygpO1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gcGVybWlzc29lcy5pbmNsdWRlcyh0aGlzLnJ1bGUpID8gJycgOiAnbm9uZSc7XG4gIH1cblxuICBwdWJsaWMgIGdldFJ1bGVzKCk6IHN0cmluZ1tdIHtcbiAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBVc2VyU2VydmljZS5nZXRVc3VhcmlvTG9nYWRvKCkubG9naW4pO1xuICAgIGNvbnN0IGF1dGhvcml0eSA9IDxhbnk+and0X2RlY29kZSh0b2tlbkF1dGhvcml0aWVzKTtcbiAgICBsZXQgcGVybWlzc29lczogc3RyaW5nW10gPSBhdXRob3JpdHkuYXV0aG9yaXRpZXM7XG4gICAgcmV0dXJuIHBlcm1pc3NvZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUnVsZXNEaXJlY3RpdmUgfSBmcm9tICcuLi9ydWxlcy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1J1bGVzRGlyZWN0aXZlXSxcbiAgZXhwb3J0czpbUnVsZXNEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIERpcmVjdGl2ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgRGlyZWN0aXZlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kaXJlY3RpdmUvZGlyZWN0aXZlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGUsXG4gICAgRGlyZWN0aXZlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcE1lbnVJdGVtQ29tcG9uZW50XSxcbiAgIGV4cG9ydHM6IFtQeHRBcHBNZW51SXRlbUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRBcHBNZW51SXRlbUNvbXBvbmVudCBdXG4gIFxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNZW51SXRlbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1toYXNoXScsXHJcbiAgfSlcclxuICBleHBvcnQgY2xhc3MgSGFzaERpcmVjdGl2ZSAge1xyXG4gICAgQElucHV0KCkgaGFzaDogc3RyaW5nO1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxyXG4gIH0iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRob3JpdHlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogUHh0SHR0cFNlcnZpY2UsIHByaXZhdGUgX2h0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlKSB7IH1cblxuICBidXNjYXJBdXRob3JpdGllcyAoY29kaWdvU2lzdGVtYSkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2h0dHBIZWxwZXIuZ2V0QXBpU2dpKCkgKyBcInBlcm1pc3NvZXMvYnVzY2FyUGVyZmlsU2lzdGVtYS8/XCI7XG4gICAgY29uc3QgcGFyYW1zID0gXCJjb2RpZ29TaXN0ZW1hPVwiICsgY29kaWdvU2lzdGVtYTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5kb0dldCh1cmwgKyBwYXJhbXMpO1xuICB9XG59IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRob3JpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiXHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzaWJsZUluUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGh0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLCBwcml2YXRlIGF1dGhvcml0eVNlcnZpY2U6IEF1dGhvcml0eVNlcnZpY2UsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7IH1cclxuICBjYW5BY3RpdmF0ZShuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHwgUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgaWYgKHRva2VuICE9PSAndW5kZWZpbmVkJyAmJiB0b2tlbiAhPT0gJycgJiYgdG9rZW4gIT09IG51bGwpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKHRva2VuKTtcclxuICAgICAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1Yik7XHJcbiAgICAgICAgaWYgKHRva2VuQXV0aG9yaXRpZXMgPT09ICd1bmRlZmluZWQnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09ICcnIHx8IHRva2VuQXV0aG9yaXRpZXMgPT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXV0aG9yaXR5U2VydmljZS5idXNjYXJBdXRob3JpdGllcyhweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBkZWNvZGVkLnN1YiwgZGF0YS5hdXRob3JpdHkpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgYXV0aG9yaXR5OiBhbnkgPSBqd3RfZGVjb2RlKHRva2VuQXV0aG9yaXRpZXMpO1xyXG4gICAgICAgICAgdGhpcy51c2VyU2VydmljZS5zZXRVc3VhcmlvTG9nYWRvKGRlY29kZWQuc3ViKTsgLy8gZW52aWEgdXNlcm5hbWVcclxuICAgICAgICAgIGlmIChkZWNvZGVkLmV4cCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5odHRwSGVscGVyLmdldFVybEF1dGVudGljYWNhbygpICsgXCI/ZXJybz00MDFcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmh0dHBIZWxwZXIuZ2V0VXJsQXV0ZW50aWNhY2FvKCkgKyBcIj9lcnJvPTQwMVwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlRva2VuIFVuZGVmaW5lZFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSHR0cEV2ZW50LCBcclxuICBIdHRwSW50ZXJjZXB0b3IsIFxyXG4gIEh0dHBIYW5kbGVyLCBcclxuICBIdHRwUmVxdWVzdCxcclxuICBIdHRwUmVzcG9uc2VcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKS8ve3Byb3ZpZGVkSW46ICdyb290J31cclxuXHJcbmV4cG9ydCBjbGFzcyBJbnRlcmNlcHRTZXJ2aWNlICBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdC8vIGludGVyY2VwdCByZXF1ZXN0IGFuZCBhZGQgdG9rZW5cclxuICBcdGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6T2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG5cclxuICAgIFx0Ly8gbW9kaWZ5IHJlcXVlc3RcclxuXHQgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xyXG5cdCAgICAgIHNldEhlYWRlcnM6IHtcclxuXHQgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTVlfVE9LRU4nKX1gXHJcblx0ICAgICAgfVxyXG5cdCAgICB9KTtcclxuXHJcblxyXG5cdCAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdClcclxuXHQgICAgLnBpcGUoXHJcblx0ICAgICAgICB0YXAoZXZlbnQgPT4ge1xyXG5cdCAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcclxuXHQgICAgICAgICAgXHJcblx0ICAgICAgICAgIH1cclxuXHQgICAgICAgIH0sIGVycm9yID0+IHtcclxuXHQgICBcdFx0XHQvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXHJcblxyXG5cclxuXHQgICAgICAgIH0pXHJcblx0ICAgICAgKVxyXG5cclxuICAgIH07XHJcbiAgXHJcbiBcclxufSIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdHJNb2R1bGUgfSBmcm9tICduZ3gtdG9hc3RyJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWVycm9yLWhhbmRsZXInO1xuaW1wb3J0IHsgSW50ZXJjZXB0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1pbnRlcmNlcHRvci9pbnRlcmNlcHQtc2VydmljZSAnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEaXJlY3RpdmVNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2RpcmVjdGl2ZS9kaXJlY3RpdmUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIERpcmVjdGl2ZU1vZHVsZSxcbiAgICBQeHRBcHBNZW51SXRlbU1vZHVsZSxcbiAgICBUb2FzdHJNb2R1bGUuZm9yUm9vdCh7cHJvZ3Jlc3NCYXI6IHRydWV9KSAgICBcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0QXBwQ29tcG9uZW50LCBQeHRDb250ZW50Qm9keSwgSGFzaERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQeHRBcHBDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtQeHRBcHBDb21wb25lbnRTZXJ2aWNlLCBcbiAgICBQeHRIdHRwU2VydmljZSwgXG4gICAgUmVxdWVzdEJhc2VTZXJ2aWNlLCBcbiAgICBIdHRwSGVscGVyU2VydmljZSwgXG4gICAgQ29uZmlnU2VydmljZSwgIFxuICAgIEh0dHBFcnJvckhhbmRsZXIsICBcbiAgICBWaXNpYmxlSW5Sb2xlc0d1YXJkLFxuICAgIFRva2VuU2VydmljZSxcbiAgICBBdXRob3JpdHlTZXJ2aWNlLFxuICBJbnRlcmNlcHRTZXJ2aWNlICwge1xuICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgIHVzZUNsYXNzOiBJbnRlcmNlcHRTZXJ2aWNlLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRJbnB1dEZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIGlucHV0VHlwZT86IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHZhbGlkYXRpb25zPzogVmFsaWRhdG9yW107XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0Q2hlY2tib3hGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RGF0ZUZpZWxkIGltcGxlbWVudHMgUHh0RmllbGRDb25maWcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIGxhYmVsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgY29sc3Bhbj86IG51bWJlcjtcclxuICAgIHR5cGU/OiBzdHJpbmc7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmlsdGVyRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgY2xhc3NOYW1lPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWdcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHB4dFJhZGlvQnV0dG9uRmllbGQgaW1wbGVtZW50cyBQeHRGaWVsZENvbmZpZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRTZWxlY3RGaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGNvbHNwYW4/OiBudW1iZXI7XHJcbiAgICB2YWxpZGF0aW9ucz86IFZhbGlkYXRvcltdO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgcGFyYW1ldGVyPzogYW55OyBcclxufSIsImltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBweHRmaWx0ZXJDdXN0b21GaWVsZCBpbXBsZW1lbnRzIFB4dEZpZWxkQ29uZmlnIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBhbnk7XHJcbiAgICBpbnB1dFR5cGU/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJzPzogYW55O1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU/OiBhbnk7XHJcbiAgICBjb2xzcGFuPzogbnVtYmVyO1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgdmFsaWRhdGlvbnM/OiBWYWxpZGF0b3JbXTtcclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jb250ZW50LWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY29udGVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZENvbXBvbmVudCB7XG4gIC8vUHJvcGVydGllcyBcbiAgQElucHV0KCkgZGF0YTogYW55O1xuICBASW5wdXQoKSBhdXRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmllbGRzOiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIEBJbnB1dCgpIGNvbHM6IG51bWJlciA9IDU7XG4gIEBJbnB1dCgpIGZpZWxkOiBhbnk7XG4gIGNvbHNJbml0aWFsID0gNTtcbiAgQE91dHB1dCgpIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIC8vQ29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IocHVibGljIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy5maWVsZFtrZXldLmNvbnN0cnVjdG9yLm5hbWUpIHtcblxuICAgICAgICAvL0ZpbHRlckN1c3RvbVxuICAgICAgICBjYXNlIHB4dGZpbHRlckN1c3RvbUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlckN1c3RvbSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9JbnB1dFxuICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VJbnB1dCA9IDxweHRJbnB1dEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9DaGVja2JveFxuICAgICAgICBjYXNlIHB4dENoZWNrYm94RmllbGQubmFtZTpcbiAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy9EYXRlXG4gICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgIGluc3RhbmNlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvL0ZpbHRlclxuICAgICAgICBjYXNlIHB4dEZpbHRlckZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgY2FzZSBweHRSYWRpb0J1dHRvbkZpZWxkLm5hbWU6XG4gICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBcbiAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgY2FzZSBweHRTZWxlY3RGaWVsZC5uYW1lOlxuICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlU2VsZWN0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB0aGlzLmNvbHNJbml0aWFsID0gdGhpcy5jb2xzO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICB9XG5cbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBwdWJsaWMgb25TdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XG5cbiAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZUFsbEZvcm1GaWVsZHModGhpcy5mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIHB1YmxpYyBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG4gIHNjcmVlbldpZHRoO1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGlmICh0aGlzLnNjcmVlbldpZHRoIDw9IDgwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NyZWVuV2lkdGggPD0gMTEwMCkge1xuICAgICAgdGhpcy5jb2xzID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xzID0gdGhpcy5jb2xzSW5pdGlhbDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvZmllbGQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWlucHV0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4gICIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kYXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtcmFkaW9idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpIHt9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHRTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWxlY2lvbmUnO1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBwYXJhbXM6IGFueTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5wYXJhbXMgIT0gdW5kZWZpbmVkICYmICFjaGFuZ2VzLnBhcmFtcy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSBjaGFuZ2VzLnBhcmFtcy5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmZpbmQoKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sbGVyID0gXCJcIjtcbiAgYXV0byA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBvcHRpb246IGFueTtcblxuICBvcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIGdldCBzZWxlY3RlZE9wdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb247XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkT3B0aW9uKGY6IGFueSkge1xuICAgIGlmIChmICE9IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGYgIT09IHRoaXMub3B0aW9uKSB7XG4gICAgICAgIHRoaXMub3B0aW9uID0gZjtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGYuY29kaWdvKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLm9wdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5vcHRpb24gPSB2YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHB4dGh0dHA6IFJlcXVlc3RCYXNlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB0aGlzLmZpZWxkID0gdGhpcy5tb2RlbDtcbiAgICAgIHRoaXMuYXV0byA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZC5jbGFzc05hbWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSB0aGlzLmZpZWxkLmNsYXNzTmFtZS5uYW1lO1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgZmluZCgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5weHRodHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgdGhpcy5wYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvKSB7XG4gICAgICAgICAgdGhpcy5maWVsZC5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5maW5kKCk7XG4gIH07XG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBLCBNYXRUYWJsZURhdGFTb3VyY2UsIE1hdFNvcnQsIE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5cbmltcG9ydCB7IHB4dElucHV0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWlucHV0LWZpZWxkJztcbmltcG9ydCB7IHB4dENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWNoZWNrYm94LWZpZWxkJztcbmltcG9ydCB7IHB4dERhdGVGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZGF0ZS1maWVsZCc7XG5pbXBvcnQgeyBweHRGaWx0ZXJGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWZpZWxkJztcbmltcG9ydCB7IHB4dFNlbGVjdEZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1zZWxlY3QtZmllbGQnO1xuaW1wb3J0IHsgcHh0UmFkaW9CdXR0b25GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtcmFkaW9idXR0b24tZmllbGQnO1xuaW1wb3J0IHsgcHh0ZmlsdGVyQ3VzdG9tRmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LWZpbHRlci1jdXN0b20tZmllbGQnO1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJ3NlbGVuaXVtLXdlYmRyaXZlci9odHRwJztcblxuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZGlhbG9nLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBkaXNwbGF5ZWRDb2x1bW5zID0gWydjb2RpZ28nLCAnZGVzY3JpY2FvJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcbiAgY29udHJvbGxlciA9IFwiXCI7XG4gIGNvbHMgPSAyO1xuICBmaWVsZHM6IFB4dEZpZWxkQ29uZmlnW10gPSBbXTtcbiAgZmllbGRzSGlzdDogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBhdXRvOiBib29sZWFuO1xuICBmaWx0ZXIgPSB7IGNvZGU6IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHVuZGVmaW5lZCB9O1xuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgaHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gZGF0YS5jb250cm9sbGVyO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXV0byA9IHRoaXMuZGF0YS5hdXRvO1xuICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgIHRoaXMuZmllbGQgPSB0aGlzLmRhdGEuZmlsdGVycztcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmZpZWxkW2tleV0uY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgICAgIGNhc2UgcHh0ZmlsdGVyQ3VzdG9tRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlckN1c3RvbSA9IDxweHRmaWx0ZXJDdXN0b21GaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUZpbHRlckN1c3RvbS50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRmlsdGVyQ3VzdG9tKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vSW5wdXRcbiAgICAgICAgICBjYXNlIHB4dElucHV0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUlucHV0ID0gPHB4dElucHV0RmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VJbnB1dC50eXBlID0gJ2lucHV0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VJbnB1dCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9DaGVja2JveFxuICAgICAgICAgIGNhc2UgcHh0Q2hlY2tib3hGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlQ2hlY2sgPSA8cHh0Q2hlY2tib3hGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUNoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUNoZWNrKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0RhdGVcbiAgICAgICAgICBjYXNlIHB4dERhdGVGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRGF0ZSA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZURhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0ZpbHRlclxuICAgICAgICAgIGNhc2UgcHh0RmlsdGVyRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZUZpbHRlciA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VGaWx0ZXIudHlwZSA9ICdmaWx0ZXInO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZUZpbHRlcik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vUmFkaW9CdXR0b25cbiAgICAgICAgICBjYXNlIHB4dFJhZGlvQnV0dG9uRmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVJhZGlvID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZVJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVJhZGlvKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9TZWxlY3RcbiAgICAgICAgICBjYXNlIHB4dFNlbGVjdEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTZWxlY3QgPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlU2VsZWN0LnR5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VTZWxlY3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5maWVsZHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZpZWxkc0hpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPCBiLnBvc2l0aW9uKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbikgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUNvbnRyb2woKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmRpc3BsYXllZENvbHVtbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGF0YS5kaXNwbGF5ZWRDb2x1bW5zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbmNlbGF0aW9uKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH1cbiAgY29uZmlybWF0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICAvL1NlYXJjaC5cbiAgc2VhcmNoKCkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgTWFwPGFueSwgYW55PigpO1xuICAgIGRlYnVnZ2VyO1xuICAgIGlmICh0aGlzLmRhdGEuYXV0byAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLmF1dG8pIHtcbiAgICAgIGlmICh0aGlzLmZvcm0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0udmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5mb3JtLnZhbHVlW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdGhpcy5mb3JtLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLmNvbnRyb2xsZXIsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmZpbHRlci5jb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpbHRlci5jb2RlICE9IDAgJiYgdGhpcy5maWx0ZXIuY29kZSAhPSBcIlwiKSB7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJjb2RpZ29cIiwgdGhpcy5maWx0ZXIuY29kZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5maWx0ZXIuZGVzY3JpcHRpb24gIT0gdW5kZWZpbmVkICYmIHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uICE9IFwiXCIpIHtcbiAgICAgICAgcGFyYW1zLnNldChcImRlc2NyaWNhb1wiLCB0aGlzLmZpbHRlci5kZXNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLmh0dHAuZG9HZXQodGhpcy5jb250cm9sbGVyLCBwYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3RSb3cocm93KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uocm93KTtcbiAgfTtcbiAgLy8gTWV0aG9kIHJlc3BvbnNpYmxlIGZvciBjcmVhdGUgY29udHJvbFxuICBjcmVhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gXCJidXR0b25cIikgcmV0dXJuO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZmIuY29udHJvbChcbiAgICAgICAgeyB2YWx1ZTogZmllbGQudmFsdWUsIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCB9LFxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9ucyhmaWVsZC52YWxpZGF0aW9ucyB8fCBbXSlcbiAgICAgICk7XG4gICAgICBncm91cC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cDtcbiAgfTtcblxuICBiaW5kVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkTGlzdCA9IFtdO1xuICAgICAgdmFsaWRhdGlvbnMuZm9yRWFjaCh2YWxpZCA9PiB7XG4gICAgICAgIHZhbGlkTGlzdC5wdXNoKHZhbGlkLnZhbGlkYXRvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRMaXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgdmFsaWRhdGVBbGxGb3JtRmllbGRzKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHVuZGVmaW5lZCk7XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG4vKlxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbiovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtaW5wdXQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIC8vcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFB4dElucHV0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXNEaXNhYmxlZCA9IHRydWU7XG4gIGF1dG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzTmFtZSA6U3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6IFN0cmluZyA9IFwiIFwiO1xuICBASW5wdXQoKSBkaXNwbGF5ZWRDb2x1bW5zIDogYW55W107XG4gIEBPdXRwdXQoKSBvblZhbHVlQ2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSB2YWx1ZSA6U3RyaW5nID0gXCIgXCI7XG4gICBcbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIC8vcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcbiBcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY2xhc3NOYW1lICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5jbGFzc05hbWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2hhbmdlcy5jbGFzc05hbWUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wbGFjZWhvbGRlciAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMucGxhY2Vob2xkZXIuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjaGFuZ2VzLnBsYWNlaG9sZGVyLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy52YWx1ZSAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMudmFsdWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucyAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMuZGlzcGxheWVkQ29sdW1ucy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy9NZXRob2QgcmVzcG9zaWJsZSBmb3Igb3BlbiBkaWFsb2cgZmlsdGVyXG4gIG9wZW5GaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmllbGQgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmllbGQuZmlsdGVycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXV0byA9IHRydWU7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YTogeyBhdXRvOiB0aGlzLmF1dG8sIGZpbHRlcnM6IHRoaXMuZmllbGQuZmlsdGVycywgY29udHJvbGxlcjogdGhpcy5maWVsZC5jbGFzc05hbWUsIHRpdGxlRGlhbG9nOiBcIlNlbGVjaW9uZTogKCBcIiArIHRoaXMuZmllbGQuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuZmllbGQudmFsdWUgPSByZXN1bHQuY29kaWdvO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9ZWxzZSB7XG4gICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQsIHtcbiAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcbiAgICAgICAgZGF0YToge2NvbnRyb2xsZXI6IHRoaXMuY2xhc3NOYW1lLCBkaXNwbGF5ZWRDb2x1bW5zOnRoaXMuZGlzcGxheWVkQ29sdW1ucywgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgIHRoaXMuY2xhc3NOYW1lICsgXCIgKVwiIH1cbiAgICAgIH0pO1xuICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHRbdGhpcy5kaXNwbGF5ZWRDb2x1bW5zWzFdXTtcbiAgICAgICAgICB0aGlzLm9uVmFsdWVDYWxsYmFjay5lbWl0KHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9maWVsZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHh0RGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRDaGVja2JveENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1jaGVja2JveC9weHQtY2hlY2tib3guY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGNvbXBvbmVudE1hcHBlciA9IHtcclxuICBpbnB1dDogUHh0SW5wdXRDb21wb25lbnQsXHJcbiAgYnV0dG9uOiBQeHRCdXR0b25Db21wb25lbnQsXHJcbiAgZGF0ZTogUHh0RGF0ZUNvbXBvbmVudCxcclxuICBzZWxlY3Q6IFB4dFNlbGVjdENvbXBvbmVudCxcclxuICByYWRpb2J1dHRvbjogUHh0UmFkaW9idXR0b25Db21wb25lbnQsXHJcbiAgY2hlY2tib3g6IFB4dENoZWNrYm94Q29tcG9uZW50LFxyXG4gIGZpbHRlcjogUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQsXHJcbn07XHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBcIltkeW5hbWljRmllbGRdXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkQ29uZmlnO1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBGb3JtR3JvdXA7XHJcbiAgY29tcG9uZW50UmVmOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxyXG4gICkgeyB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29tcG9uZW50TWFwcGVyW3RoaXMuZmllbGQudHlwZV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkID0gdGhpcy5maWVsZDtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dElucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czpbUHh0SW5wdXRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOltQeHRCdXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dEJ1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QnV0dG9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGF0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHREYXRlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0RGF0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGF0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOltQeHRTZWxlY3RDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFNlbGVjdENvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtcmFkaW9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0UmFkaW9idXR0b25Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQeHRSYWRpb2J1dHRvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0UmFkaW9idXR0b25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dENoZWNrYm94Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRDaGVja2JveENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q2hlY2tib3hNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFB4dElucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0L3B4dC1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWJ1dHRvbi9weHQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ZpZWxkLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQeHREYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWRhdGUvcHh0LWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWNoZWNrYm94L3B4dC1jaGVja2JveC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHh0UmFkaW9idXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtcmFkaW9idXR0b24vcHh0LXJhZGlvYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQeHRTZWxlY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFB4dElucHV0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY29tcG9uZW50TWFwcGVyID0ge1xyXG4gIGlucHV0OiBQeHRJbnB1dENvbXBvbmVudCxcclxuICBidXR0b246IFB4dEJ1dHRvbkNvbXBvbmVudCxcclxuICBkYXRlOiBQeHREYXRlQ29tcG9uZW50LFxyXG4gIHNlbGVjdDogUHh0U2VsZWN0Q29tcG9uZW50LFxyXG4gIHJhZGlvYnV0dG9uOiBQeHRSYWRpb2J1dHRvbkNvbXBvbmVudCxcclxuICBjaGVja2JveDogUHh0Q2hlY2tib3hDb21wb25lbnQsXHJcbiAgZmlsdGVyOiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCxcclxufTtcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6IFwiW2R5bmFtaWNGaWVsZERpYWxvZ11cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlRGlhbG9nIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBmaWVsZDogRmllbGRDb25maWc7XHJcbiAgQElucHV0KCkgZ3JvdXA6IEZvcm1Hcm91cDtcclxuICBjb21wb25lbnRSZWY6IGFueTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7IH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb21wb25lbnRNYXBwZXJbdGhpcy5maWVsZC50eXBlXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGQgPSB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uLy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC1kaXJlY3RpdmUtZGlhbG9nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LER5bmFtaWNGaWVsZERpcmVjdGl2ZURpYWxvZ10sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BXSxcbiAgZXhwb3J0czpbUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHREaWFsb2dGaWx0ZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge319LFxuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtoYXNCYWNrZHJvcDogdHJ1ZX19XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmVEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQtZGlyZWN0aXZlLWRpYWxvZyc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUHh0RGlhbG9nRmlsdGVyTW9kdWxlLFxuICAgIFBpcGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0SW5wdXRGaWx0ZXJDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dElucHV0RmlsdGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgdGVtcGxhdGVKaXRVcmwgfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQeHRJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC9weHQtaW5wdXQubW9kdWxlJztcbmltcG9ydCB7IFB4dEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1idXR0b24vcHh0LWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0RGF0ZU1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1kYXRlL3B4dC1kYXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtc2VsZWN0L3B4dC1zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IFB4dFJhZGlvYnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvcHh0LXJhZGlvYnV0dG9uL3B4dC1yYWRpb2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgUHh0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9weHQtY2hlY2tib3gvcHh0LWNoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBQeHRJbnB1dEZpbHRlck1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3B4dC1pbnB1dC1maWx0ZXIvcHh0LWlucHV0LWZpbHRlci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBNb2R1bGUsXG4gICAgUHh0SW5wdXRNb2R1bGUsXG4gICAgUHh0QnV0dG9uTW9kdWxlLFxuICAgIFB4dERhdGVNb2R1bGUsXG4gICAgUHh0U2VsZWN0TW9kdWxlLFxuICAgIFB4dFJhZGlvYnV0dG9uTW9kdWxlLFxuICAgIFB4dENoZWNrYm94TW9kdWxlLFxuICAgIFB4dElucHV0RmlsdGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENvbnRlbnRDb21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gICBleHBvcnRzOiBbUHh0Q29udGVudENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBQeHRDb250ZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50TW9kdWxlIHsgfVxuIiwiXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFB4dEJ1dHRvbiB7XHJcbiAgICBpY29uOiBTdHJpbmc7XHJcbiAgICBtZW51OiBTdHJpbmc7XHJcbiAgICBlbmFibGU6IEJvb2xlYW47XHJcbiAgICBlbnVtIDogTnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoaWNvbjogU3RyaW5nLCBtZW51OiBTdHJpbmcsIGVuYWJsZTogQm9vbGVhbiwgaWQgOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICAgICAgdGhpcy5lbnVtID0gaWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIE9wdGlvbnNTdWJtZW51IHtcclxuICAgIFNBTFZBUiA9IDEsXHJcbiAgICBQRVNRVUlTQVIgPSAyLFxyXG4gICAgTElNUEFSID0gMyxcclxuICAgIE5PVk8gPSA0LFxyXG4gICAgVk9MVEFSPSA1LFxyXG4gICAgRVhDTFVJUj0gNlxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4uLy4uL3BpcGVzL3VwcGVyY2FzZS1maXJzdCc7XG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL2NvbnRyb2xsZXIucGlwZSc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc3RhdHVzU2F2ZTogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzdGF0dXNEZWxldGU6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjb250cm9sbGVyPzogU3RyaW5nO1xuXG4gIHNhdmUoKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGlvbk1vZGVsKCkpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnNhdmUodGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzU2F2ZS5lbWl0KHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBkZWxldGUoaWQpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5kZWxldGUoaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNEZWxldGUuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBjbGVhcigpIHtcbiAgICB0aGlzLm1vZGVsID0ge30gYXMgVDtcbiAgfTtcbiAgYWRkKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAnYWRkKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH07XG4gIGNvbHMgPSAzO1xuICBjb2xzcGFuID0gMTtcbiAgYnV0dG9uczogUHh0QnV0dG9uW10gPSBbXTtcbiAgZW5hYmxlU2F2ZSA9IHRydWU7XG4gIGVuYWJsZUJhY2sgPSB0cnVlO1xuICBlbmFibGVDbGVhciA9IHRydWU7XG4gIGVuYWJsZVNlYXJjaCA9IHRydWU7XG4gIGVuYWJsZUFkZCA9IHRydWU7XG4gIGVuYWJsZURlbGV0ZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9weHRBcHBTZXJ2aWNlOiBQeHRBcHBDb21wb25lbnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZSxcbiAgICBwdWJsaWMgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uU2VydmljZTogVG9hc3RyU2VydmljZSkge1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJrZXlib2FyZF9iYWNrc3BhY2VcIiwgXCJWT0xUQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuVk9MVEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIlNBTFZBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5TQUxWQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiTk9WT1wiLCB0cnVlLCBPcHRpb25zU3VibWVudS5OT1ZPKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkxJTVBBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5MSU1QQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwic2VhcmNoXCIsIFwiUEVTUVVJU0FSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlBFU1FVSVNBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJFWENMVUlSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkVYQ0xVSVIpKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGVidWdnZXI7XG4gICAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCkgKyBuZXcgQ29udHJvbGxlclBpcGUoKS50cmFuc2Zvcm0odGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgIHRoaXMuX3NlcnZpY2VCYXNlLnVybFNlcnZpY2VBdXRvID0gdGhpcy51cmxTZXJ2aWNlO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICB2YWxpZGF0aW9uTW9kZWwoKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxba2V5XSAhPSB1bmRlZmluZWQgJiYgdGhpcy5tb2RlbFtrZXldICE9IFwiXCIpIHtcbiAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXCJDYW1wbyBPYnJpZ2F0w4PCs3Jpb1wiLCBrZXkudG9TdHJpbmcoKS50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmcoXCJOZW5odW0gY2FtcG8gcHJlZW5jaGlkby5cIiwgXCJBdmlzbyFcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFB4dFN1Ym1lbnVzQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtc3VibWVudXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgVG9hc3RyTW9kdWxlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZSxcbiAgICBQaXBlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dFN1Ym1lbnVzQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOltQeHRIdHRwU2VydmljZSwgUmVxdWVzdEJhc2VTZXJ2aWNlLCBIdHRwSGVscGVyU2VydmljZSwgQ29uZmlnU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNNb2R1bGUgeyB9XG5cbiAgIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dERhdGVwaWNrZXJDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncHh0LWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRhdGVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFN0cmluZyA9IFwiRXNjb2xoYSB1bWEgZGF0YVwiO1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBpbnB1dERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGRhdGVNb2RlbDogRGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgZ2V0IGRhdGFTZWxlY2lvbmFkYSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGVNb2RlbDtcclxuICB9XHJcblxyXG4gIHNldCBkYXRhU2VsZWNpb25hZGEoZDogRGF0ZSkge1xyXG4gICAgaWYgKGQgIT09IHRoaXMuZGF0ZU1vZGVsKSB7XHJcbiAgICAgIHRoaXMuZGF0ZU1vZGVsID0gZDtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmRhdGVNb2RlbCA9IHZhbHVlO1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBvbkRhdGVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMud3JpdGVWYWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UoKTtcclxuICB9XHJcbiAgXHJcbn0iLCJcclxuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFB4dERhdGVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3B4dC1kYXRlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1B4dERhdGVwaWNrZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtQeHREYXRlcGlja2VyQ29tcG9uZW50XSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFB4dERhdGVQaWNrZXJNb2R1bGUge1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGlhbG9nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1B4dERpYWxvZ0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czpbUHh0RGlhbG9nQ29tcG9uZW50XVxuXG59KVxuZXhwb3J0IGNsYXNzIFB4dERpYWxvZ01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBQeHREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9weHQtZGlhbG9nL3B4dC1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXB4dC1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1maWx0ZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGRhdGEgOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nQ29tcG9uZW50PiwgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIGRhdGEpIHtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsIFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0RmlsdGVyQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOltQeHRGaWx0ZXJDb21wb25lbnRdXG4gXG59KVxuZXhwb3J0IGNsYXNzIFB4dEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEsIE1hdFRhYmxlRGF0YVNvdXJjZSwgTWF0UGFnaW5hdG9yLCBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZGlhbG9nLWZpbHRlci1jdXN0b20uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGZpbHRlcnM6IGFueTtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcblxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcbiAgXG4gIGRpc3BsYXllZENvbHVtbnMgPSBbJ2NvZGlnbycsICdkZXNjcmljYW8nXTtcbiAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgaHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICAvL1NlYXJjaC5cbiAgc2VhcmNoKCkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgTWFwPGFueSwgYW55PigpO1xuICAgIGlmICh0aGlzLmZpbHRlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5maWx0ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcnNba2V5XSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdGhpcy5maWx0ZXJzW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5odHRwLmRvR2V0KHRoaXMubW9kZWwuY29uc3RydWN0b3IubmFtZSwgcGFyYW1zKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gICAgfSk7XG4gIH07XG5cbiAgLy9Sb3cgU2VsZWN0ZWRcbiAgc2VsZWN0Um93KHJvdykge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHJvdyk7XG4gIH07XG5cbiAgLy9DbG9zZVxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh1bmRlZmluZWQpO1xuICB9O1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnQgfSBmcm9tICcuL3B4dC1kaWFsb2ctZmlsdGVyLWN1c3RvbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0RGlhbG9nRmlsdGVyQ3VzdG9tQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUFdLFxuICBleHBvcnRzOltQeHREaWFsb2dGaWx0ZXJDdXN0b21Db21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6W1B4dERpYWxvZ0ZpbHRlckN1c3RvbUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNQVRfRElBTE9HX0RBVEEsIHVzZVZhbHVlOiB7fX0sXG4gICAge3Byb3ZpZGU6IE1BVF9ESUFMT0dfREVGQVVMVF9PUFRJT05TLCB1c2VWYWx1ZToge2hhc0JhY2tkcm9wOiB0cnVlfX1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJDdXN0b21Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0Q2hpcElucHV0RXZlbnQsIE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7Q09NTUEsIEVOVEVSfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtZmlsdGVyLW1hdC10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtZmlsdGVyLW1hdC10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1maWx0ZXItbWF0LXRhYmxlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyTWF0VGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPGFueT4oKTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgOiBTdHJpbmcgO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgdmlzaWJsZSA9IHRydWU7XG4gIHNlbGVjdGFibGUgPSB0cnVlO1xuICByZW1vdmFibGUgPSB0cnVlO1xuICBhZGRPbkJsdXIgPSB0cnVlO1xuICByZWFkb25seSBzZXBhcmF0b3JLZXlzQ29kZXM6IG51bWJlcltdID0gW0VOVEVSLCBDT01NQV07XG4gIGZpbHRlcnM6IGFueVtdID0gW107XG5cbiAgYWRkKGV2ZW50OiBNYXRDaGlwSW5wdXRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXQ7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC52YWx1ZTtcblxuICAgIC8vIEFkZCBvdXIgZnJ1aXRcbiAgICBpZiAoKHZhbHVlIHx8ICcnKS50cmltKCkpIHtcbiAgICAgIC8vIHRoaXMuZmlsdGVycyA9IFtdO1xuICAgICAgdGhpcy5maWx0ZXJzLnB1c2goeyBuYW1lOiB2YWx1ZS50cmltKCkgfSk7XG4gICAgICAvL3RoaXMuYXBwbHlGaWx0ZXIodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IHRoZSBpbnB1dCB2YWx1ZVxuICAgIGlmIChpbnB1dCkge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9XG4gICAgLy90aGlzLmFwcGx5RmlsdGVyeCAoKTtcbiAgICB0aGlzLmFwcGx5RmlsdGVyQXJyYXkoKTtcblxuICB9XG4gIGFwcGx5RmlsdGVyQXJyYXkoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICBmaWx0ZXIgPSBmaWx0ZXIubmFtZS50cmltKCk7XG4gICAgICAgIGZpbHRlciA9IGZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoXCJcIik7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlGaWx0ZXJ4ICgpe1xuICAgICAgY29uc3QgdGFibGVGaWx0ZXJzID0gW107XG4gICAgICB0aGlzLmZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgIHRhYmxlRmlsdGVycy5wdXNoKHtcbiAgICAgICAgICBpZDogXCJub21lSW1hZ2VtXCIsXG4gICAgICAgICAgdmFsdWU6IGZpbHRlci5uYW1lXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gSlNPTi5zdHJpbmdpZnkodGFibGVGaWx0ZXJzKTtcbiAgfVxuXG4gIGFwcGx5RmlsdGVyKGZpbHRlcjogc3RyaW5nKSB7XG4gICAgZmlsdGVyID0gZmlsdGVyLnRyaW0oKTtcbiAgICBmaWx0ZXIgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyO1xuICB9XG4gIFxuICByZW1vdmUoZmlsdGVyOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmlsdGVycy5pbmRleE9mKGZpbHRlcik7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5RmlsdGVyQXJyYXkoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50cyA6IFtQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0RmlsdGVyTWF0VGFibGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBweHRFbnVtVGFnSHRtbCB9IGZyb20gXCIuLi9lbnVtL3B4dC1lbnVtLXRhZy1odG1sXCI7XHJcbmltcG9ydCB7IHB4dEVudW1UeXBlVGFnIH0gZnJvbSBcIi4uL2VudW0vcHh0LWVudW0tdHlwZS10YWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgcHh0RmllbGRzIHtcclxuICAgIHR5cGU6IHB4dEVudW1UeXBlVGFnO1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIHRhZzogcHh0RW51bVRhZ0h0bWw7XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gcHh0RW51bVRhZ0h0bWwge1xyXG4gICAgSW5wdXQgPSAxLFxyXG4gICAgQ29tYm8gPSAyLFxyXG4gICAgRmlsdGVyID0gMyxcclxuICAgIENoZWNrYm94ID0gNFxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtdXBsb2FkLWZpbGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXVwbG9hZC1maWxlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRVcGxvYWRGaWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6c3RyaW5nO1xuICBAT3V0cHV0KCkgZmlsZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBhcnJheUltYWdlcyA6RmlsZVJlYWRlcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBvbkNoYW5nZUltYWdlbShldmVudCkge1xuICAgIGlmIChldmVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBpbWFnZW06IEZpbGUgPSBldmVudDtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXI9IGltYWdlbS5uYW1lO1xuICAgIHJldHVybiB0aGlzLmZpbGVTZWxlY3RlZC5uZXh0KGltYWdlbSk7XG4gICAgfVxuXG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFB4dFVwbG9hZEZpbGVDb21wb25lbnQgfSBmcm9tICcuL3B4dC11cGxvYWQtZmlsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBleHBvcnRzOltQeHRVcGxvYWRGaWxlQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzIDogW1B4dFVwbG9hZEZpbGVDb21wb25lbnRdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0VXBsb2FkRmlsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmd4R2FsbGVyeU9wdGlvbnMsIE5neEdhbGxlcnlJbWFnZSwgTmd4R2FsbGVyeUFuaW1hdGlvbiB9IGZyb20gJ25neC1nYWxsZXJ5JztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWdhbGxlcnknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWdhbGxlcnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0R2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZ2FsbGVyeU9wdGlvbnM6IE5neEdhbGxlcnlPcHRpb25zW107XG4gIEBJbnB1dCgpIGdhbGxlcnlJbWFnZXM6IE5neEdhbGxlcnlJbWFnZVtdO1xuICBASW5wdXQoKSB3aWR0aDogYW55ID0gXCIxMDAlXCI7XG4gIEBJbnB1dCgpIGhlaWdodDogYW55ID0gJzQwMHB4JztcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmdhbGxlcnlPcHRpb25zID0gW1xuICAgICAge1xuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgdGh1bWJuYWlsc0NvbHVtbnM6IDQsXG4gICAgICAgIGltYWdlQW5pbWF0aW9uOiBOZ3hHYWxsZXJ5QW5pbWF0aW9uLlNsaWRlXG4gICAgICB9LFxuICAgICAgLy8gbWF4LXdpZHRoIDgwMFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA4MDAsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICBpbWFnZVBlcmNlbnQ6IDgwLFxuICAgICAgICB0aHVtYm5haWxzUGVyY2VudDogMjAsXG4gICAgICAgIHRodW1ibmFpbHNNYXJnaW46IDIwLFxuICAgICAgICB0aHVtYm5haWxNYXJnaW46IDIwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA0MDAsXG4gICAgICAgIHByZXZpZXc6IGZhbHNlXG4gICAgICB9XG4gICAgXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOZ3hHYWxsZXJ5TW9kdWxlIH0gZnJvbSAnbmd4LWdhbGxlcnknO1xuaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlLCBOZ3hHYWxsZXJ5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUHh0R2FsbGVyeUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRHYWxsZXJ5Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbUHh0R2FsbGVyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0R2FsbGVyeU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsImNvbXBvbmVudE1hcHBlciIsIm5vb3AiLCJDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU1FLHdCQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtLQUFLOztnQkFKM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7O2dCQUptQixnQkFBZ0I7O3lCQUFwQzs7Ozs7OztBQ0FBOzs2QkFLMEMsSUFBSSxPQUFPLEVBQU87dUNBQ0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7OEJBRXJELElBQUksT0FBTyxFQUFPO3VDQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFOzhCQUV0RCxJQUFJLE9BQU8sRUFBTztvQ0FDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTs0QkFFckQsSUFBSSxPQUFPLEVBQU87MkJBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7Ozs7OztJQUUvRSw0Q0FBVzs7OztJQUFYLFVBQVksTUFBVztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFRCwrQ0FBYzs7OztJQUFkLFVBQWUsV0FBVztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtLQUN0Qzs7Ozs7SUFF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