/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
import jwt_decode from 'jwt-decode';
import { pxtAppConfig } from "../models/pxtConfiguration";
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
        window.location.href = this.helper.getFrontSgi() + '?sistema=' + pxtAppConfig.systemPath;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFLMUQsTUFBTTs7Ozs7SUFJSixZQUFvQixXQUEyQixFQUFVLE1BQXlCO1FBQTlELGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQW1CO29CQUZuRSxVQUFVO1FBR3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2pEOzs7O0lBRUQsTUFBTTtRQUNKLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLFdBQVcsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO0tBQzFGOzs7O0lBRU0sTUFBTSxDQUFDLGdCQUFnQjtRQUM1QixRQUFRLENBQUE7O1FBQ1IsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFDNUMsSUFBSSxhQUFhLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNyQztRQUFDLElBQUksQ0FBQyxDQUFDOztZQUNOLE1BQU0sT0FBTyxxQkFBUSxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDO1lBQy9ELE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUMxQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7OztJQUdqQixnQkFBZ0IsQ0FBQyxRQUFnQjtRQUMvQixJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUMxRCxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLEdBQUcsRUFBRSxDQUFDO2FBQ2Q7O1lBQ0QsSUFBSSxhQUFhLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxRCxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFDRCw0QkFBNEIsQ0FBQyxtQkFBMkI7UUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztLQUNyRjs7O1lBM0NGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQU5RLGNBQWM7WUFEZCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgcHh0QXBwQ29uZmlnIH0gZnJvbSBcIi4uL21vZGVscy9weHRDb25maWd1cmF0aW9uXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIHBhdGggPSAndXN1YXJpb3MnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIGhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLnBhdGggPSB0aGlzLmhlbHBlci5nZXRBcGlTZ2koKSArIHRoaXMucGF0aDtcbiAgfVxuXG4gIGxvZ291dCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaGVscGVyLmdldEZyb250U2dpKCkgKyAnP3Npc3RlbWE9JyArIHB4dEFwcENvbmZpZy5zeXN0ZW1QYXRoO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRVc3VhcmlvTG9nYWRvKCk6IGFueSB7XG4gICAgZGVidWdnZXJcbiAgICBsZXQgdXN1YXJpbzogYW55ID0ge307XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVU1JMR0QnKSAhPT0gbnVsbCkge1xuICAgICAgbGV0IHVzdWFyaW9CYXNlNjQ6IHN0cmluZyA9IGF0b2IobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VTUkxHRCcpKTtcbiAgICAgIHVzdWFyaW8gPSBKU09OLnBhcnNlKHVzdWFyaW9CYXNlNjQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKTtcbiAgICAgIHVzdWFyaW8uaWRlbnRpZmljYWNhb0FjZXNzbyA9IGRlY29kZWQuc3ViO1xuICAgICAgdXN1YXJpby5jb2RpZ29QZXNzb2EgPSBkZWNvZGVkLnBlcnNvbl9pZDtcbiAgICB9XG4gICAgcmV0dXJuIHVzdWFyaW87XG4gIH1cblxuICBzZXRVc3VhcmlvTG9nYWRvKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmJ1c2NhclBvcklkZW50aWZpY2FjYW9BY2Vzc28odXNlcm5hbWUpLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgbGV0IHVzdWFyaW86IGFueSA9IHt9O1xuICAgICAgdXN1YXJpbyA9IHZhbDtcbiAgICAgIGlmICh1c3VhcmlvID09PSBudWxsKSB7XG4gICAgICAgIHVzdWFyaW8gPSB7fTtcbiAgICAgIH1cbiAgICAgIGxldCB1c3VhcmlvQmFzZTY0OiBzdHJpbmcgPSBidG9hKEpTT04uc3RyaW5naWZ5KHVzdWFyaW8pKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdVU1JMR0QnLCB1c3VhcmlvQmFzZTY0KTtcbiAgICB9KTtcbiAgfVxuICBidXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKGlkZW50aWZpY2FjYW9BY2Vzc286IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMucGF0aCArICcvP2lkZW50aWZpY2Fkb3I9JyArIGlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICB9XG59XG4iXX0=