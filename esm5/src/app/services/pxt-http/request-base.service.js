/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PxtHttpService } from './pxt-http.service';
import { environment } from '../../../environments/environment';
/**
 * @template T
 */
var RequestBaseService = /** @class */ (function () {
    function RequestBaseService(httpService) {
        this.httpService = httpService;
        this.pathUrl = "";
        this.object = /** @type {?} */ ({});
        this.pathUrl = environment.esbApiPxt;
    }
    /**
     * @param {?=} model
     * @return {?}
     */
    RequestBaseService.prototype.load = /**
     * @param {?=} model
     * @return {?}
     */
    function (model) {
        /** @type {?} */
        var urlApi = this.pathUrl + model.constructor.name;
        console.log(urlApi);
        debugger;
        return this.httpService.doGet(urlApi);
    };
    ;
    /**
     * @param {?} model
     * @return {?}
     */
    RequestBaseService.prototype.save = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        /** @type {?} */
        var urlApi = this.pathUrl + model.constructor.name;
        return this.httpService.doPost(urlApi, model);
    };
    ;
    /**
     * @param {?} model
     * @return {?}
     */
    RequestBaseService.prototype.delete = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        /** @type {?} */
        var urlApi = this.pathUrl + model.constructor.name;
        return this.httpService.doDelete(urlApi, model);
    };
    ;
    RequestBaseService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RequestBaseService.ctorParameters = function () { return [
        { type: PxtHttpService }
    ]; };
    return RequestBaseService;
}());
export { RequestBaseService };
if (false) {
    /** @type {?} */
    RequestBaseService.prototype.pathUrl;
    /** @type {?} */
    RequestBaseService.prototype.object;
    /** @type {?} */
    RequestBaseService.prototype.httpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7O0lBTTlELDRCQUFvQixXQUEyQjtRQUEzQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7dUJBRnJDLEVBQUU7d0NBQ0MsRUFBTztRQUVsQixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7S0FDdEM7Ozs7O0lBQ0QsaUNBQUk7Ozs7SUFBSixVQUFLLEtBQVM7O1FBQ1osSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLFFBQVEsQ0FBQztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QztJQUFBLENBQUM7Ozs7O0lBQ0YsaUNBQUk7Ozs7SUFBSixVQUFLLEtBQVE7O1FBQ1gsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQy9DO0lBQUEsQ0FBQzs7Ozs7SUFDRixtQ0FBTTs7OztJQUFOLFVBQU8sS0FBVTs7UUFDZixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDakQ7SUFBQSxDQUFDOztnQkFwQkgsVUFBVTs7OztnQkFIRixjQUFjOzs2QkFEdkI7O1NBS2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlIDxUPiB7XG4gIHBhdGhVcmwgPSBcIlwiO1xuICBvYmplY3QgOiBUID0ge30gYXMgVDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UpIHtcbiAgICB0aGlzLnBhdGhVcmwgPSBlbnZpcm9ubWVudC5lc2JBcGlQeHQ7XG4gIH1cbiAgbG9hZChtb2RlbD86IFQpOiBhbnkge1xuICAgIGxldCB1cmxBcGkgPSB0aGlzLnBhdGhVcmwgKyBtb2RlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIGNvbnNvbGUubG9nKHVybEFwaSk7XG4gICAgZGVidWdnZXI7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodXJsQXBpKTtcbiAgfTtcbiAgc2F2ZShtb2RlbDogVCk6IGFueSB7XG4gICAgbGV0IHVybEFwaSA9IHRoaXMucGF0aFVybCArIG1vZGVsLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHVybEFwaSwgbW9kZWwpO1xuICB9O1xuICBkZWxldGUobW9kZWw6IGFueSkge1xuICAgIGxldCB1cmxBcGkgPSB0aGlzLnBhdGhVcmwgKyBtb2RlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHVybEFwaSwgbW9kZWwpO1xuICB9O1xufVxuIl19