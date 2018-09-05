/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHelperService } from './HttpHelperService';
import { PxtHttpService } from './pxt-http.service';
var RequestBaseService = /** @class */ (function () {
    function RequestBaseService(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
        this.pathUrl = "";
        this.pathUrl = this.helper.getApi();
        console.log(this.pathUrl);
    }
    /**
     * @param {?} controller
     * @return {?}
     */
    RequestBaseService.prototype.get = /**
     * @param {?} controller
     * @return {?}
     */
    function (controller) {
    };
    ;
    /**
     * @param {?} model
     * @param {?} controller
     * @return {?}
     */
    RequestBaseService.prototype.post = /**
     * @param {?} model
     * @param {?} controller
     * @return {?}
     */
    function (model, controller) {
        /*
            this.helper.getApi() + controller;
            console.log(this.helper.getApi() + controller);
            */
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
    };
    ;
    /**
     * @param {?} id
     * @return {?}
     */
    RequestBaseService.prototype.load = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
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
    RequestBaseService.prototype.pathUrl;
    /** @type {?} */
    RequestBaseService.prototype.httpService;
    /** @type {?} */
    RequestBaseService.prototype.helper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUFLbEQsNEJBQW9CLFdBQTJCLEVBQVUsTUFBeUI7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7dUJBRHhFLEVBQUU7UUFFVixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBQ0QsZ0NBQUc7Ozs7SUFBSCxVQUFJLFVBQVU7S0FFYjtJQUFBLENBQUM7Ozs7OztJQUNGLGlDQUFJOzs7OztJQUFKLFVBQUssS0FBVSxFQUFFLFVBQWtCOzs7OztLQUtsQztJQUFBLENBQUM7Ozs7O0lBQ0YsbUNBQU07Ozs7SUFBTixVQUFPLEtBQVU7S0FFaEI7SUFBQSxDQUFDOzs7OztJQUNGLGlDQUFJOzs7O0lBQUosVUFBSyxFQUFFO0tBRU47O2dCQXJCRixVQUFVOzs7O2dCQUZGLGNBQWM7Z0JBRGQsaUJBQWlCOzs2QkFEMUI7O1NBS2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL0h0dHBIZWxwZXJTZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9weHQtaHR0cC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RCYXNlU2VydmljZSB7XG4gIHBhdGhVcmwgPSBcIlwiO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5wYXRoVXJsID0gdGhpcy5oZWxwZXIuZ2V0QXBpKCk7XG4gICAgY29uc29sZS5sb2codGhpcy5wYXRoVXJsKTtcbiAgfVxuICBnZXQoY29udHJvbGxlcik6IGFueSB7XG5cbiAgfTtcbiAgcG9zdChtb2RlbDogYW55LCBjb250cm9sbGVyOiBTdHJpbmcpIHtcbiAgIC8qXG4gICAgdGhpcy5oZWxwZXIuZ2V0QXBpKCkgKyBjb250cm9sbGVyO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaGVscGVyLmdldEFwaSgpICsgY29udHJvbGxlcik7XG4gICAgKi9cbiAgfTtcbiAgZGVsZXRlKG1vZGVsOiBhbnkpIHtcblxuICB9O1xuICBsb2FkKGlkKSB7XG5cbiAgfVxufVxuIl19