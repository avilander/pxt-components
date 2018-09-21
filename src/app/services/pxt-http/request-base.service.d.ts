import { PxtHttpService } from './pxt-http.service';
import { HttpHelperService } from './http-helper-service';
export declare class RequestBaseService<T> {
    private httpService;
    private helper;
    model: T;
    urlService: string;
    urlServiceAuto: string;
    constructor(httpService: PxtHttpService, helper: HttpHelperService);
    load(): any;
    save(model?: T): any;
    delete(id: any): any;
    get(path: string): any;
    post(path: string, model?: T): any;
    put(path: string, model?: T): any;
    doDelete(path: string, id: number): any;
}
