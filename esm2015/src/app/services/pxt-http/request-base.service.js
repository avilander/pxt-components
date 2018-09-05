/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHelperService } from './HttpHelperService';
import { PxtHttpService } from './pxt-http.service';
export class RequestBaseService {
    /**
     * @param {?} httpService
     * @param {?} helper
     */
    constructor(httpService, helper) {
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
    get(controller) {
    }
    ;
    /**
     * @param {?} model
     * @param {?} controller
     * @return {?}
     */
    post(model, controller) {
        /*
            this.helper.getApi() + controller;
            console.log(this.helper.getApi() + controller);
            */
    }
    ;
    /**
     * @param {?} model
     * @return {?}
     */
    delete(model) {
    }
    ;
    /**
     * @param {?} id
     * @return {?}
     */
    load(id) {
    }
}
RequestBaseService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RequestBaseService.ctorParameters = () => [
    { type: PxtHttpService },
    { type: HttpHelperService }
];
if (false) {
    /** @type {?} */
    RequestBaseService.prototype.pathUrl;
    /** @type {?} */
    RequestBaseService.prototype.httpService;
    /** @type {?} */
    RequestBaseService.prototype.helper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRCxNQUFNOzs7OztJQUVKLFlBQW9CLFdBQTJCLEVBQVUsTUFBeUI7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7dUJBRHhFLEVBQUU7UUFFVixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBQ0QsR0FBRyxDQUFDLFVBQVU7S0FFYjtJQUFBLENBQUM7Ozs7OztJQUNGLElBQUksQ0FBQyxLQUFVLEVBQUUsVUFBa0I7Ozs7O0tBS2xDO0lBQUEsQ0FBQzs7Ozs7SUFDRixNQUFNLENBQUMsS0FBVTtLQUVoQjtJQUFBLENBQUM7Ozs7O0lBQ0YsSUFBSSxDQUFDLEVBQUU7S0FFTjs7O1lBckJGLFVBQVU7Ozs7WUFGRixjQUFjO1lBRGQsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuL0h0dHBIZWxwZXJTZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9weHQtaHR0cC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RCYXNlU2VydmljZSB7XG4gIHBhdGhVcmwgPSBcIlwiO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5wYXRoVXJsID0gdGhpcy5oZWxwZXIuZ2V0QXBpKCk7XG4gICAgY29uc29sZS5sb2codGhpcy5wYXRoVXJsKTtcbiAgfVxuICBnZXQoY29udHJvbGxlcik6IGFueSB7XG5cbiAgfTtcbiAgcG9zdChtb2RlbDogYW55LCBjb250cm9sbGVyOiBTdHJpbmcpIHtcbiAgIC8qXG4gICAgdGhpcy5oZWxwZXIuZ2V0QXBpKCkgKyBjb250cm9sbGVyO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaGVscGVyLmdldEFwaSgpICsgY29udHJvbGxlcik7XG4gICAgKi9cbiAgfTtcbiAgZGVsZXRlKG1vZGVsOiBhbnkpIHtcblxuICB9O1xuICBsb2FkKGlkKSB7XG5cbiAgfVxufVxuIl19