import { PxtHttpService } from './pxt-http.service';
export declare class RequestBaseService<T> {
    private httpService;
    pathUrl: string;
    object: T;
    constructor(httpService: PxtHttpService);
    load(model?: T): any;
    save(model: T): any;
    delete(model: any): any;
}
