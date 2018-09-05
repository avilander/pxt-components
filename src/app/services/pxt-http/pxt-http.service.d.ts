import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { Headers, Http, RequestOptions, Response, XHRBackend, Request } from '@angular/http';
import { HttpHelperService } from './HttpHelperService';
export declare class PxtHttpService extends Http {
    private backend;
    private injector;
    private router;
    private urlHelper;
    constructor(backend: XHRBackend, options: RequestOptions, injector: Injector, router: Router, urlHelper: HttpHelperService);
    urlRequest: any;
    origRequest: Request;
    isUnathourized: boolean;
    /**
     *  Control Services
     */
    getHeaders(): Headers;
    handleResponse(observable: Observable<Response>, url?: string, loader?: boolean): any;
    onResult(res: any): any;
    doGet(api: string, loader?: boolean): any;
    doPost(endpoint: string, params?: any, loader?: boolean): any;
    doPut(api: string, params?: any, loader?: boolean): any;
    doPath(api: string, params?: any, loader?: boolean): any;
    doDelete(api: string, params: any, loader?: boolean): any;
    private requestArgs(options);
    onCatch(error: any): Observable<never>;
}
