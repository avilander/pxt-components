import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
import { HttpHelperService } from '../services/pxt-http/HttpHelperService';
export declare class AuthorityService {
    private _http;
    private _httpHelper;
    constructor(_http: PxtHttpService, _httpHelper: HttpHelperService);
    buscarAuthorities(codigoSistema: any): any;
}