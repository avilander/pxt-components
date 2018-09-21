/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
import { HttpHelperService } from '../services/pxt-http/HttpHelperService';
var AuthorityService = /** @class */ (function () {
    function AuthorityService(_http, _httpHelper) {
        this._http = _http;
        this._httpHelper = _httpHelper;
    }
    /**
     * @param {?} codigoSistema
     * @return {?}
     */
    AuthorityService.prototype.buscarAuthorities = /**
     * @param {?} codigoSistema
     * @return {?}
     */
    function (codigoSistema) {
        /** @type {?} */
        var url = this._httpHelper.getApiSeguranca() + "permissoes/buscarPerfilSistema/?";
        /** @type {?} */
        var params = "codigoSistema=" + codigoSistema;
        return this._http.doGet(url + params);
    };
    AuthorityService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthorityService.ctorParameters = function () { return [
        { type: PxtHttpService },
        { type: HttpHelperService }
    ]; };
    return AuthorityService;
}());
export { AuthorityService };
if (false) {
    /** @type {?} */
    AuthorityService.prototype._http;
    /** @type {?} */
    AuthorityService.prototype._httpHelper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXR5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7SUFHekUsMEJBQW9CLEtBQXFCLEVBQVUsV0FBOEI7UUFBN0QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7S0FBSzs7Ozs7SUFFdEYsNENBQWlCOzs7O0lBQWpCLFVBQW1CLGFBQWE7O1FBQzlCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLEdBQUcsa0NBQWtDLENBQUM7O1FBQ3BGLElBQU0sTUFBTSxHQUFHLGdCQUFnQixHQUFDLGFBQWEsQ0FBQztRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZDOztnQkFSRixVQUFVOzs7O2dCQUZGLGNBQWM7Z0JBQ2QsaUJBQWlCOzsyQkFIMUI7O1NBS2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlzaWJsZUluUm9sZXNHdWFyZCB9IGZyb20gJy4uL3Zpc2libGUtaW4tcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvSHR0cEhlbHBlclNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhvcml0eVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBfaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UpIHsgfVxuXG4gIGJ1c2NhckF1dGhvcml0aWVzIChjb2RpZ29TaXN0ZW1hKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5faHR0cEhlbHBlci5nZXRBcGlTZWd1cmFuY2EoKSArIFwicGVybWlzc29lcy9idXNjYXJQZXJmaWxTaXN0ZW1hLz9cIjtcbiAgICBjb25zdCBwYXJhbXMgPSBcImNvZGlnb1Npc3RlbWE9XCIrY29kaWdvU2lzdGVtYTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5kb0dldCh1cmwgKyBwYXJhbXMpO1xuICB9XG59Il19