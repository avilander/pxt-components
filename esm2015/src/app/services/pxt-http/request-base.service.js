/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PxtHttpService } from './pxt-http.service';
/**
 * @template T
 */
export class RequestBaseService {
    /**
     * @param {?} httpService
     */
    constructor(httpService) {
        this.httpService = httpService;
    }
    /**
     * @param {?} urlApi
     * @param {?=} model
     * @return {?}
     */
    load(urlApi, model) {
        return this.httpService.doGet(urlApi);
    }
    ;
    /**
     * @param {?} urlApi
     * @param {?=} model
     * @return {?}
     */
    save(urlApi, model) {
        return this.httpService.doPost(urlApi, model);
    }
    ;
    /**
     * @param {?} urlApi
     * @param {?=} model
     * @return {?}
     */
    delete(urlApi, model) {
        return this.httpService.doDelete(urlApi, '');
    }
    ;
}
RequestBaseService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RequestBaseService.ctorParameters = () => [
    { type: PxtHttpService }
];
if (false) {
    /** @type {?} */
    RequestBaseService.prototype.httpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUdwRCxNQUFNOzs7O0lBRUosWUFBb0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0tBQzlDOzs7Ozs7SUFDRCxJQUFJLENBQUMsTUFBTSxFQUFHLEtBQVM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZDO0lBQUEsQ0FBQzs7Ozs7O0lBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRyxLQUFTO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDL0M7SUFBQSxDQUFDOzs7Ozs7SUFDRixNQUFNLENBQUMsTUFBTSxFQUFHLEtBQVM7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRyxFQUFFLENBQUMsQ0FBQztLQUMvQztJQUFBLENBQUM7OztZQWJILFVBQVU7Ozs7WUFGRixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlIDxUPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UpIHtcbiAgfVxuICBsb2FkKHVybEFwaSAsIG1vZGVsPzogVCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodXJsQXBpKTtcbiAgfTtcbiAgc2F2ZSh1cmxBcGkgLCBtb2RlbD86IFQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh1cmxBcGksIG1vZGVsKTtcbiAgfTtcbiAgZGVsZXRlKHVybEFwaSAsIG1vZGVsPzogVCkgOmFueXtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh1cmxBcGkgLCAnJyk7XG4gIH07XG59XG4iXX0=