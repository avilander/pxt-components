/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
import jwt_decode from 'jwt-decode';
import { pxtConfiguration } from "../models/pxtConfiguration";
import * as i0 from "@angular/core";
import * as i1 from "./pxt-http/pxt-http.service";
import * as i2 from "./pxt-http/http-helper-service";
export class UserService {
    /**
     * @param {?} httpService
     * @param {?} helper
     */
    constructor(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
        this.path = 'usuarios';
        this.path = this.helper.getApiSgi() + this.path;
    }
    /**
     * @return {?}
     */
    logout() {
        localStorage.clear();
        window.location.href = this.helper.getFrontSgi() + '?prefixoSistema=' + pxtConfiguration.systemPrex;
    }
    /**
     * @return {?}
     */
    static getUsuarioLogado() {
        debugger;
        /** @type {?} */
        let usuario = {};
        if (localStorage.getItem('USRLGD') !== null) {
            /** @type {?} */
            let usuarioBase64 = atob(localStorage.getItem('USRLGD'));
            usuario = JSON.parse(usuarioBase64);
        }
        else {
            /** @type {?} */
            const decoded = /** @type {?} */ (jwt_decode(localStorage.getItem('token')));
            usuario.identificacaoAcesso = decoded.sub;
            usuario.codigoPessoa = decoded.person_id;
        }
        return usuario;
    }
    /**
     * @param {?} username
     * @return {?}
     */
    setUsuarioLogado(username) {
        this.buscarPorIdentificacaoAcesso(username).subscribe(val => {
            /** @type {?} */
            let usuario = {};
            usuario = val;
            if (usuario === null) {
                usuario = {};
            }
            /** @type {?} */
            let usuarioBase64 = btoa(JSON.stringify(usuario));
            localStorage.setItem('USRLGD', usuarioBase64);
        });
    }
    /**
     * @return {?}
     */
    static getRules() {
        debugger;
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().identificacaoAcesso);
        /** @type {?} */
        const authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
        /** @type {?} */
        let permissoes = authority.authorities;
        return permissoes;
    }
    /**
     * @param {?} identificacaoAcesso
     * @return {?}
     */
    buscarPorIdentificacaoAcesso(identificacaoAcesso) {
        return this.httpService.doGet(this.path + '/?identificador=' + identificacaoAcesso);
    }
}
UserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
UserService.ctorParameters = () => [
    { type: PxtHttpService },
    { type: HttpHelperService }
];
/** @nocollapse */ UserService.ngInjectableDef = i0.defineInjectable({ factory: function UserService_Factory() { return new UserService(i0.inject(i1.PxtHttpService), i0.inject(i2.HttpHelperService)); }, token: UserService, providedIn: "root" });
if (false) {
    /** @type {?} */
    UserService.prototype.path;
    /** @type {?} */
    UserService.prototype.httpService;
    /** @type {?} */
    UserService.prototype.helper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUs5RCxNQUFNOzs7OztJQUlKLFlBQW9CLFdBQTJCLEVBQVUsTUFBeUI7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7b0JBRm5FLFVBQVU7UUFHdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDaEQ7Ozs7SUFFRCxNQUFNO1FBQ0osWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO0tBQ3JHOzs7O0lBRU0sTUFBTSxDQUFDLGdCQUFnQjtRQUM1QixRQUFRLENBQUE7O1FBQ1IsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFDNUMsSUFBSSxhQUFhLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNyQztRQUFDLElBQUksQ0FBQyxDQUFDOztZQUNOLE1BQU0sT0FBTyxxQkFBUSxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDO1lBQy9ELE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUMxQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7OztJQUdqQixnQkFBZ0IsQ0FBQyxRQUFnQjtRQUMvQixJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUMxRCxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLEdBQUcsRUFBRSxDQUFDO2FBQ2Q7O1lBQ0QsSUFBSSxhQUFhLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxRCxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDSjs7OztJQUVNLE1BQU0sQ0FBQyxRQUFRO1FBQ3BCLFFBQVEsQ0FBQTs7UUFDUixJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFFLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztRQUN6SixNQUFNLFNBQVMscUJBQVEsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7O1FBQ3BELElBQUksVUFBVSxHQUFhLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDakQsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7O0lBR3BCLDRCQUE0QixDQUFDLG1CQUEyQjtRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3JGOzs7WUFwREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTlEsY0FBYztZQURkLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9weHRDb25maWd1cmF0aW9uXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIHBhdGggPSAndXN1YXJpb3MnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLnBhdGggPSB0aGlzLmhlbHBlci5nZXRBcGlTZ2koKSsgdGhpcy5wYXRoO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5oZWxwZXIuZ2V0RnJvbnRTZ2koKSArICc/cHJlZml4b1Npc3RlbWE9JyArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VXN1YXJpb0xvZ2FkbygpOiBhbnkge1xuICAgIGRlYnVnZ2VyXG4gICAgbGV0IHVzdWFyaW86IGFueSA9IHt9O1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVVNSTEdEJykgIT09IG51bGwpIHtcbiAgICAgIGxldCB1c3VhcmlvQmFzZTY0OiBzdHJpbmcgPSBhdG9iKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVU1JMR0QnKSk7XG4gICAgICB1c3VhcmlvID0gSlNPTi5wYXJzZSh1c3VhcmlvQmFzZTY0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+and0X2RlY29kZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG4gICAgICB1c3VhcmlvLmlkZW50aWZpY2FjYW9BY2Vzc28gPSBkZWNvZGVkLnN1YjtcbiAgICAgIHVzdWFyaW8uY29kaWdvUGVzc29hID0gZGVjb2RlZC5wZXJzb25faWQ7XG4gICAgfVxuICAgIHJldHVybiB1c3VhcmlvO1xuICB9XG5cbiAgc2V0VXN1YXJpb0xvZ2Fkbyh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5idXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKHVzZXJuYW1lKS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIGxldCB1c3VhcmlvOiBhbnkgPSB7fTtcbiAgICAgIHVzdWFyaW8gPSB2YWw7XG4gICAgICBpZiAodXN1YXJpbyA9PT0gbnVsbCkge1xuICAgICAgICB1c3VhcmlvID0ge307XG4gICAgICB9XG4gICAgICBsZXQgdXN1YXJpb0Jhc2U2NDogc3RyaW5nID0gYnRvYShKU09OLnN0cmluZ2lmeSh1c3VhcmlvKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVVNSTEdEJywgdXN1YXJpb0Jhc2U2NCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFJ1bGVzKCk6IHN0cmluZ1tdIHtcbiAgICBkZWJ1Z2dlclxuICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArcHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1QcmV4ICsgVXNlclNlcnZpY2UuZ2V0VXN1YXJpb0xvZ2FkbygpLmlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICAgIGNvbnN0IGF1dGhvcml0eSA9IDxhbnk+and0X2RlY29kZSh0b2tlbkF1dGhvcml0aWVzKTtcbiAgICBsZXQgcGVybWlzc29lczogc3RyaW5nW10gPSBhdXRob3JpdHkuYXV0aG9yaXRpZXM7XG4gICAgcmV0dXJuIHBlcm1pc3NvZXM7XG4gIH1cblxuICBidXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKGlkZW50aWZpY2FjYW9BY2Vzc286IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMucGF0aCArICcvP2lkZW50aWZpY2Fkb3I9JyArIGlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICB9XG59XG4iXX0=