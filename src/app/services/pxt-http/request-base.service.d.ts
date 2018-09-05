import { HttpHelperService } from './HttpHelperService';
import { PxtHttpService } from './pxt-http.service';
export declare class RequestBaseService {
    private httpService;
    private helper;
    pathUrl: string;
    constructor(httpService: PxtHttpService, helper: HttpHelperService);
    get(controller: any): any;
    post(model: any, controller: String): void;
    delete(model: any): void;
    load(id: any): void;
}
