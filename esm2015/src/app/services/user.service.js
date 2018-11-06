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
        window.location.href = this.helper.getFrontSgi() + '?sistema=' + pxtConfiguration.systemPath;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUs5RCxNQUFNOzs7OztJQUlKLFlBQW9CLFdBQTJCLEVBQVUsTUFBeUI7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7b0JBRm5FLFVBQVU7UUFHdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDakQ7Ozs7SUFFRCxNQUFNO1FBQ0osWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztLQUM5Rjs7OztJQUVNLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDNUIsUUFBUSxDQUFBOztRQUNSLElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQzVDLElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakUsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckM7UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFDTixNQUFNLE9BQU8scUJBQVEsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQztZQUMvRCxPQUFPLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUMxQyxPQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7U0FDMUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7SUFHakIsZ0JBQWdCLENBQUMsUUFBZ0I7UUFDL0IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7WUFDMUQsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsT0FBTyxHQUFHLEVBQUUsQ0FBQzthQUNkOztZQUNELElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDMUQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBQ0QsNEJBQTRCLENBQUMsbUJBQTJCO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDLENBQUM7S0FDckY7OztZQTNDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFOUSxjQUFjO1lBRGQsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcGF0aCA9ICd1c3Vhcmlvcyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UsIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSkge1xuICAgIHRoaXMucGF0aCA9IHRoaXMuaGVscGVyLmdldEFwaVNnaSgpICsgdGhpcy5wYXRoO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5oZWxwZXIuZ2V0RnJvbnRTZ2koKSArICc/c2lzdGVtYT0nICsgcHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1QYXRoO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRVc3VhcmlvTG9nYWRvKCk6IGFueSB7XG4gICAgZGVidWdnZXJcbiAgICBsZXQgdXN1YXJpbzogYW55ID0ge307XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVU1JMR0QnKSAhPT0gbnVsbCkge1xuICAgICAgbGV0IHVzdWFyaW9CYXNlNjQ6IHN0cmluZyA9IGF0b2IobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VTUkxHRCcpKTtcbiAgICAgIHVzdWFyaW8gPSBKU09OLnBhcnNlKHVzdWFyaW9CYXNlNjQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKTtcbiAgICAgIHVzdWFyaW8uaWRlbnRpZmljYWNhb0FjZXNzbyA9IGRlY29kZWQuc3ViO1xuICAgICAgdXN1YXJpby5jb2RpZ29QZXNzb2EgPSBkZWNvZGVkLnBlcnNvbl9pZDtcbiAgICB9XG4gICAgcmV0dXJuIHVzdWFyaW87XG4gIH1cblxuICBzZXRVc3VhcmlvTG9nYWRvKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmJ1c2NhclBvcklkZW50aWZpY2FjYW9BY2Vzc28odXNlcm5hbWUpLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgbGV0IHVzdWFyaW86IGFueSA9IHt9O1xuICAgICAgdXN1YXJpbyA9IHZhbDtcbiAgICAgIGlmICh1c3VhcmlvID09PSBudWxsKSB7XG4gICAgICAgIHVzdWFyaW8gPSB7fTtcbiAgICAgIH1cbiAgICAgIGxldCB1c3VhcmlvQmFzZTY0OiBzdHJpbmcgPSBidG9hKEpTT04uc3RyaW5naWZ5KHVzdWFyaW8pKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdVU1JMR0QnLCB1c3VhcmlvQmFzZTY0KTtcbiAgICB9KTtcbiAgfVxuICBidXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKGlkZW50aWZpY2FjYW9BY2Vzc286IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMucGF0aCArICcvP2lkZW50aWZpY2Fkb3I9JyArIGlkZW50aWZpY2FjYW9BY2Vzc28pO1xuICB9XG59XG4iXX0=