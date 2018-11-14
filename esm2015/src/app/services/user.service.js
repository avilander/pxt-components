/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
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
    getUsuarioLogado() {
        /** @type {?} */
        let usuario = {};
        if (localStorage.getItem('USRLGD') !== null) {
            /** @type {?} */
            let usuarioBase64 = atob(localStorage.getItem('USRLGD'));
            usuario = JSON.parse(usuarioBase64);
        }
        else {
            localStorage.clear();
            window.location.href = this.helper.getFrontSgi() + '?sistema=' + pxtAppConfig.systemPath;
            /*
                  const decoded = <any>jwt_decode(localStorage.getItem('token'));
                  usuario.identificacaoAcesso = decoded.sub;
                  usuario.codigoPessoa = decoded.person_id;
                  */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUsxRCxNQUFNOzs7OztJQUlKLFlBQW9CLFdBQTJCLEVBQVUsTUFBeUI7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7b0JBRm5FLFVBQVU7UUFHdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDakQ7Ozs7SUFFRCxNQUFNO1FBQ0osWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7S0FDMUY7Ozs7SUFFTyxnQkFBZ0I7O1FBQ3RCLElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQzVDLElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakUsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLFdBQVcsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDOzs7Ozs7U0FNMUY7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7SUFHakIsZ0JBQWdCLENBQUMsUUFBZ0I7UUFDL0IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7WUFDMUQsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsT0FBTyxHQUFHLEVBQUUsQ0FBQzthQUNkOztZQUNELElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDMUQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBQ0QsNEJBQTRCLENBQUMsbUJBQTJCO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDLENBQUM7S0FDckY7OztZQTlDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFOUSxjQUFjO1lBRGQsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IHB4dEFwcENvbmZpZyB9IGZyb20gXCIuLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBwYXRoID0gJ3VzdWFyaW9zJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5wYXRoID0gdGhpcy5oZWxwZXIuZ2V0QXBpU2dpKCkgKyB0aGlzLnBhdGg7XG4gIH1cblxuICBsb2dvdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmhlbHBlci5nZXRGcm9udFNnaSgpICsgJz9zaXN0ZW1hPScgKyBweHRBcHBDb25maWcuc3lzdGVtUGF0aDtcbiAgfVxuXG4gIHB1YmxpYyAgZ2V0VXN1YXJpb0xvZ2FkbygpOiBhbnkge1xuICAgIGxldCB1c3VhcmlvOiBhbnkgPSB7fTtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VTUkxHRCcpICE9PSBudWxsKSB7XG4gICAgICBsZXQgdXN1YXJpb0Jhc2U2NDogc3RyaW5nID0gYXRvYihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVVNSTEdEJykpO1xuICAgICAgdXN1YXJpbyA9IEpTT04ucGFyc2UodXN1YXJpb0Jhc2U2NCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmhlbHBlci5nZXRGcm9udFNnaSgpICsgJz9zaXN0ZW1hPScgKyBweHRBcHBDb25maWcuc3lzdGVtUGF0aDtcbiAgICAgIC8qXG4gICAgICBjb25zdCBkZWNvZGVkID0gPGFueT5qd3RfZGVjb2RlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKTtcbiAgICAgIHVzdWFyaW8uaWRlbnRpZmljYWNhb0FjZXNzbyA9IGRlY29kZWQuc3ViO1xuICAgICAgdXN1YXJpby5jb2RpZ29QZXNzb2EgPSBkZWNvZGVkLnBlcnNvbl9pZDtcbiAgICAgICovXG4gICAgfVxuICAgIHJldHVybiB1c3VhcmlvO1xuICB9XG5cbiAgc2V0VXN1YXJpb0xvZ2Fkbyh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5idXNjYXJQb3JJZGVudGlmaWNhY2FvQWNlc3NvKHVzZXJuYW1lKS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIGxldCB1c3VhcmlvOiBhbnkgPSB7fTtcbiAgICAgIHVzdWFyaW8gPSB2YWw7XG4gICAgICBpZiAodXN1YXJpbyA9PT0gbnVsbCkge1xuICAgICAgICB1c3VhcmlvID0ge307XG4gICAgICB9XG4gICAgICBsZXQgdXN1YXJpb0Jhc2U2NDogc3RyaW5nID0gYnRvYShKU09OLnN0cmluZ2lmeSh1c3VhcmlvKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVVNSTEdEJywgdXN1YXJpb0Jhc2U2NCk7XG4gICAgfSk7XG4gIH1cbiAgYnVzY2FyUG9ySWRlbnRpZmljYWNhb0FjZXNzbyhpZGVudGlmaWNhY2FvQWNlc3NvOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnBhdGggKyAnLz9pZGVudGlmaWNhZG9yPScgKyBpZGVudGlmaWNhY2FvQWNlc3NvKTtcbiAgfVxufVxuIl19