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
        return this.httpService.doGet(this.urlService + '/?' + path);
    };
    /**
     * @param {?=} model
     * @return {?}
     */
    RequestBaseService.prototype.post = /**
     * @param {?=} model
     * @return {?}
     */
    function (model) {
        return this.httpService.doPost(this.urlService, model);
    };
    /**
     * @param {?=} model
     * @return {?}
     */
    RequestBaseService.prototype.put = /**
     * @param {?=} model
     * @return {?}
     */
    function (model) {
        return this.httpService.doPut(this.urlService, model);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    RequestBaseService.prototype.doDelete = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.httpService.doPut(this.urlService, id);
    };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7SUFTeEQsNEJBQW9CLFdBQTJCLEVBQVUsTUFBMEI7UUFBL0QsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDbkM7Ozs7SUFDRCxpQ0FBSTs7O0lBQUo7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3BEO0lBQUEsQ0FBQzs7Ozs7SUFDRixpQ0FBSTs7OztJQUFKLFVBQUssS0FBUztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzVEO0lBQUEsQ0FBQzs7Ozs7SUFDRixtQ0FBTTs7OztJQUFOLFVBQU8sRUFBRTtRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzNEO0lBQUEsQ0FBQzs7Ozs7SUFDRixnQ0FBRzs7OztJQUFILFVBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztLQUM5RDs7Ozs7SUFDRCxpQ0FBSTs7OztJQUFKLFVBQUssS0FBUztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFHLEtBQUssQ0FBQyxDQUFDO0tBQ3pEOzs7OztJQUNELGdDQUFHOzs7O0lBQUgsVUFBSSxLQUFTO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUcsS0FBSyxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBQ0QscUNBQVE7Ozs7SUFBUixVQUFTLEVBQVU7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUcsRUFBRSxDQUFDLENBQUM7S0FDckQ7O2dCQTlCRixVQUFVOzs7O2dCQUhGLGNBQWM7Z0JBQ2QsaUJBQWlCOzs2QkFGMUI7O1NBS2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVxdWVzdEJhc2VTZXJ2aWNlPFQ+IHtcblxuICBwdWJsaWMgbW9kZWw6IFQ7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlIDogc3RyaW5nO1xuICBwdWJsaWMgdXJsU2VydmljZUF1dG8gOiBzdHJpbmc7XG4gIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBoZWxwZXIgOiBIdHRwSGVscGVyU2VydmljZSkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBUKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlQXV0bywgbW9kZWwpO1xuICB9O1xuICBkZWxldGUoaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZUF1dG8sIGlkKTtcbiAgfTtcbiAgZ2V0KHBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyAnLz8nICsgcGF0aCk7XG4gIH1cbiAgcG9zdChtb2RlbD86IFQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlICwgbW9kZWwpO1xuICB9XG4gIHB1dChtb2RlbD86IFQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1B1dCh0aGlzLnVybFNlcnZpY2UgLCBtb2RlbCk7XG4gIH1cbiAgZG9EZWxldGUoaWQ6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSAsIGlkKTtcbiAgfVxufVxuIl19