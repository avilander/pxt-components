/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PxtHttpService } from './pxt-http.service';
import { HttpHelperService } from './http-helper-service';
/**
 * @template T
 */
var RequestBaseService = /** @class */ (function () {
    function RequestBaseService(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
        this.urlService = helper.getApi();
    }
    /**
     * @return {?}
     */
    RequestBaseService.prototype.load = /**
     * @return {?}
     */
    function () {
        return this.httpService.doGet(this.urlServiceAuto);
    };
    ;
    /**
     * @param {?=} model
     * @return {?}
     */
    RequestBaseService.prototype.save = /**
     * @param {?=} model
     * @return {?}
     */
    function (model) {
        return this.httpService.doPost(this.urlServiceAuto, model);
    };
    ;
    /**
     * @param {?} id
     * @return {?}
     */
    RequestBaseService.prototype.delete = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.httpService.doDelete(this.urlServiceAuto, id);
    };
    ;
    /**
     * @param {?} path
     * @return {?}
     */
    RequestBaseService.prototype.get = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.httpService.doGet(this.urlService + '/' + path);
    };
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    RequestBaseService.prototype.post = /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    function (path, model) {
        return this.httpService.doPost(this.urlService + "/" + path, model);
    };
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    RequestBaseService.prototype.put = /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    function (path, model) {
        return this.httpService.doPut(this.urlService + '/' + path, model);
    };
    ;
    /**
     * @param {?} path
     * @param {?} id
     * @return {?}
     */
    RequestBaseService.prototype.doDelete = /**
     * @param {?} path
     * @param {?} id
     * @return {?}
     */
    function (path, id) {
        return this.httpService.doPut(this.urlService + '/' + path, id);
    };
    ;
    RequestBaseService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RequestBaseService.ctorParameters = function () { return [
        { type: PxtHttpService },
        { type: HttpHelperService }
    ]; };
    return RequestBaseService;
}());
export { RequestBaseService };
if (false) {
    /** @type {?} */
    RequestBaseService.prototype.model;
    /** @type {?} */
    RequestBaseService.prototype.urlService;
    /** @type {?} */
    RequestBaseService.prototype.urlServiceAuto;
    /** @type {?} */
    RequestBaseService.prototype.httpService;
    /** @type {?} */
    RequestBaseService.prototype.helper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7SUFTeEQsNEJBQW9CLFdBQTJCLEVBQVUsTUFBMEI7UUFBL0QsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDbkM7Ozs7SUFDRCxpQ0FBSTs7O0lBQUo7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3BEO0lBQUEsQ0FBQzs7Ozs7SUFDRixpQ0FBSTs7OztJQUFKLFVBQUssS0FBUztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzVEO0lBQUEsQ0FBQzs7Ozs7SUFDRixtQ0FBTTs7OztJQUFOLFVBQU8sRUFBRTtRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzNEO0lBQUEsQ0FBQzs7Ozs7SUFDRixnQ0FBRzs7OztJQUFILFVBQUksSUFBWTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUM3RDtJQUFBLENBQUM7Ozs7OztJQUNGLGlDQUFJOzs7OztJQUFKLFVBQUssSUFBWSxFQUFFLEtBQVM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRyxLQUFLLENBQUMsQ0FBQztLQUN0RTtJQUFBLENBQUM7Ozs7OztJQUNGLGdDQUFHOzs7OztJQUFILFVBQUksSUFBWSxFQUFFLEtBQVM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNwRTtJQUFBLENBQUM7Ozs7OztJQUNGLHFDQUFROzs7OztJQUFSLFVBQVMsSUFBWSxFQUFHLEVBQVU7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRyxFQUFFLENBQUMsQ0FBQztLQUNsRTtJQUFBLENBQUM7O2dCQTlCSCxVQUFVOzs7O2dCQUhGLGNBQWM7Z0JBQ2QsaUJBQWlCOzs2QkFGMUI7O1NBS2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlPFQ+IHtcblxuICBwdWJsaWMgbW9kZWw6IFQ7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlIDogc3RyaW5nO1xuICBwdWJsaWMgdXJsU2VydmljZUF1dG8gOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UsIHByaXZhdGUgaGVscGVyIDogSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCk7XG4gIH1cbiAgbG9hZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMudXJsU2VydmljZUF1dG8pO1xuICB9O1xuICBzYXZlKG1vZGVsPzogVCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZUF1dG8sIG1vZGVsKTtcbiAgfTtcbiAgZGVsZXRlKGlkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh0aGlzLnVybFNlcnZpY2VBdXRvLCBpZCk7XG4gIH07XG4gIGdldChwYXRoIDpzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyAnLycgKyBwYXRoKTtcbiAgfTtcbiAgcG9zdChwYXRoIDpzdHJpbmcsIG1vZGVsPzogVCkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2UgKyBcIi9cIiArIHBhdGggLCBtb2RlbCk7XG4gIH07XG4gIHB1dChwYXRoIDpzdHJpbmcsIG1vZGVsPzogVCkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArICcvJyArIHBhdGgsIG1vZGVsKTtcbiAgfTtcbiAgZG9EZWxldGUocGF0aCA6c3RyaW5nICwgaWQ6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArICcvJyArIHBhdGggLCBpZCk7XG4gIH07XG59XG4iXX0=