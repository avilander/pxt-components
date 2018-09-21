import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { Headers, Http, RequestOptions, Response, XHRBackend, RequestOptionsArgs, Request } from '@angular/http';
import { TokenService } from './token.service';
export declare class PxtHttpService extends Http {
    private backend;
    private injector;
    private tokenService;
    constructor(backend: XHRBackend, options: RequestOptions, injector: Injector, tokenService: TokenService);
    urlRequest: any;
    origRequest: Request;
    isUnathourized: boolean;
    /**
     *  Control Services
     */
    getHeaders(): Headers;
    handleResponse(observable: Observable<Response>, url?: string): any;
    onResult(res: any): any;
    doGet(api: string, loader?: boolean): any;
    doPost(endpoint: string, params?: any): any;
    doPut(api: string, params?: any): any;
    doPath(api: string, params?: any, loader?: boolean): any;
    doDelete(api: string, params: any, loader?: boolean): any;
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    private requestArgs(options);
    onCatch(error: any): Observable<never>;
}
