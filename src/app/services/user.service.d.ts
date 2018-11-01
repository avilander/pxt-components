import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
export declare class UserService {
    private httpService;
    private helper;
    private path;
    constructor(httpService: PxtHttpService, helper: HttpHelperService);
    logout(): void;
    static getUsuarioLogado(): any;
    setUsuarioLogado(username: string): void;
    static getRules(): string[];
    buscarPorIdentificacaoAcesso(identificacaoAcesso: string): any;
}
