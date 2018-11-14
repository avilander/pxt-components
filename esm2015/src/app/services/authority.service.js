/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { RequestBaseService } from './pxt-http/request-base.service';
import { pxtAppConfig } from './../models/pxtConfiguration';
import { UserService } from './user.service';
export class AuthorityService {
    /**
     * @param {?} _http
     * @param {?} _httpHelper
     * @param {?} requestBaseService
     * @param {?} userService
     */
    constructor(_http, _httpHelper, requestBaseService, userService) {
        this._http = _http;
        this._httpHelper = _httpHelper;
        this.requestBaseService = requestBaseService;
        this.userService = userService;
    }
    /**
     * @param {?} codigoSistema
     * @return {?}
     */
    buscarAuthorities(codigoSistema) {
        /** @type {?} */
        const url = this._httpHelper.getApiSgi() + "permissaoUsuario";
        /** @type {?} */
        var params = new Map();
        params.set("sistema", pxtAppConfig.systemId);
        params.set("identificator", this.userService.getUsuarioLogado().identificator);
        return this.requestBaseService.doGet(url + params);
    }
}
AuthorityService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthorityService.ctorParameters = () => [
    { type: PxtHttpService },
    { type: HttpHelperService },
    { type: RequestBaseService },
    { type: UserService }
];
if (false) {
    /** @type {?} */
    AuthorityService.prototype._http;
    /** @type {?} */
    AuthorityService.prototype._httpHelper;
    /** @type {?} */
    AuthorityService.prototype.requestBaseService;
    /** @type {?} */
    AuthorityService.prototype.userService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXR5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE1BQU07Ozs7Ozs7SUFDSixZQUFvQixLQUFxQixFQUFVLFdBQThCLEVBQ3hFLG9CQUFnRCxXQUF3QjtRQUQ3RCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUN4RSx1QkFBa0IsR0FBbEIsa0JBQWtCO1FBQThCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0tBQUs7Ozs7O0lBRXRGLGlCQUFpQixDQUFFLGFBQWE7O1FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsa0JBQWtCLENBQUM7O1FBQzlELElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxFQUFhLENBQUM7UUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7S0FDcEQ7OztZQVhGLFVBQVU7Ozs7WUFMRixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLGtCQUFrQjtZQUVsQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlzaWJsZUluUm9sZXNHdWFyZCB9IGZyb20gJy4uL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IHB4dEFwcENvbmZpZyB9IGZyb20gJy4vLi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3VzZXIuc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aG9yaXR5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IFB4dEh0dHBTZXJ2aWNlLCBwcml2YXRlIF9odHRwSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSwgXG4gICAgcHVibGljIHJlcXVlc3RCYXNlU2VydmljZSA6IFJlcXVlc3RCYXNlU2VydmljZSwgcHVibGljIHVzZXJTZXJ2aWNlIDpVc2VyU2VydmljZSkgeyB9XG5cbiAgYnVzY2FyQXV0aG9yaXRpZXMgKGNvZGlnb1Npc3RlbWEpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9odHRwSGVscGVyLmdldEFwaVNnaSgpICsgXCJwZXJtaXNzYW9Vc3VhcmlvXCI7XG4gICAgdmFyIHBhcmFtcyA9IG5ldyBNYXA8YW55LCBhbnk+ICgpO1xuICAgIHBhcmFtcy5zZXQoXCJzaXN0ZW1hXCIsIHB4dEFwcENvbmZpZy5zeXN0ZW1JZCk7XG4gICAgcGFyYW1zLnNldChcImlkZW50aWZpY2F0b3JcIiwgdGhpcy51c2VyU2VydmljZS5nZXRVc3VhcmlvTG9nYWRvKCkuaWRlbnRpZmljYXRvcik7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdEJhc2VTZXJ2aWNlLmRvR2V0KHVybCArIHBhcmFtcyk7XG4gIH1cbn0iXX0=