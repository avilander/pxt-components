import { PxtHttpService } from './pxt-http.service';
import { HttpHelperService } from './http-helper-service';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
export declare class RequestBaseService<T> {
    private httpService;
    private helper;
    private tokenService;
    _httpClient: HttpClient;
    model: T;
    urlService: string;
    urlServiceAuto: string;
    constructor(httpService: PxtHttpService, helper: HttpHelperService, tokenService: TokenService, _httpClient: HttpClient);
    load(): any;
    save(model?: T): any;
    delete(id: any): any;
    doGet(path: string): any;
    doPost(path: string, model?: T): any;
    doPut(path: string, model?: T): any;
    doDelete(path: string, id: number): any;
    uploadImage(path: any, params?: Map<any, any>): any;
    setParamsFormdata(params: Map<any, any>): FormData;
    private buildRequestParams(params);
}
