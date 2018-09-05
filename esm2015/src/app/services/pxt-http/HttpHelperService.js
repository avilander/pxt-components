/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
export class HttpHelperService {
    /**
     * @param {?} configService
     */
    constructor(configService) {
        this.configService = configService;
    }
    /**
     * @return {?}
     */
    getApi() {
        return this.configService.getConfiguration('PATH', 'API');
    }
    ;
    /**
     * @return {?}
     */
    getUrlAutenticacao() {
        return this.configService.getConfiguration('AUTENTICACAO', 'SISTEMAS');
    }
    ;
}
HttpHelperService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpHelperService.ctorParameters = () => [
    { type: ConfigService }
];
if (false) {
    /** @type {?} */
    HttpHelperService.prototype.configService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cEhlbHBlclNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL0h0dHBIZWxwZXJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRCxNQUFNOzs7O0lBQ0osWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7S0FDL0M7Ozs7SUFDTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDOztJQUMzRCxDQUFDOzs7O0lBQ0ssa0JBQWtCO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQzs7SUFDeEUsQ0FBQzs7O1lBVEgsVUFBVTs7OztZQUZGLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEhlbHBlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0QXBpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdQQVRIJywgJ0FQSScpO1xyXG4gIH07XHJcbiAgcHVibGljIGdldFVybEF1dGVudGljYWNhbygpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVVURU5USUNBQ0FPJywgJ1NJU1RFTUFTJyk7XHJcbiAgfTtcclxufSJdfQ==