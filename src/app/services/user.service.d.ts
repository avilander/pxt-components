import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
export declare class UserService {
    private httpService;
    private helper;
    private path;
    constructor(httpService: PxtHttpService, helper: HttpHelperService);
    logout(): void;
    getUsuarioLogado(): any;
    setUsuarioLogado(username: string): void;
    buscarPorIdentificacaoAcesso(identificacaoAcesso: string): any;
}
