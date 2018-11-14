import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { RequestBaseService } from './pxt-http/request-base.service';
import { UserService } from './user.service';
export declare class AuthorityService {
    private _http;
    private _httpHelper;
    requestBaseService: RequestBaseService;
    userService: UserService;
    constructor(_http: PxtHttpService, _httpHelper: HttpHelperService, requestBaseService: RequestBaseService, userService: UserService);
    buscarAuthorities(codigoSistema: any): any;
}
