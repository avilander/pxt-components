import { PxtHttpService } from './pxt-http.service';
export declare class RequestBaseService<T> {
    private httpService;
    constructor(httpService: PxtHttpService);
    load(urlApi: any, model?: T): any;
    save(urlApi: any, model?: T): any;
    delete(urlApi: any, model?: T): any;
}
