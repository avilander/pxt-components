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
export class RequestBaseService {
    /**
     * @param {?} httpService
     * @param {?} helper
     */
    constructor(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
        this.urlService = helper.getApi();
    }
    /**
     * @return {?}
     */
    load() {
        return this.httpService.doGet(this.urlServiceAuto);
    }
    ;
    /**
     * @param {?=} model
     * @return {?}
     */
    save(model) {
        return this.httpService.doPost(this.urlServiceAuto, model);
    }
    ;
    /**
     * @param {?} id
     * @return {?}
     */
    delete(id) {
        return this.httpService.doDelete(this.urlServiceAuto, id);
    }
    ;
    /**
     * @param {?} path
     * @return {?}
     */
    get(path) {
        return this.httpService.doGet(this.urlService + '/' + path);
    }
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    post(path, model) {
        return this.httpService.doPost(this.urlService + "/" + path, model);
    }
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    put(path, model) {
        return this.httpService.doPut(this.urlService + '/' + path, model);
    }
    ;
    /**
     * @param {?} path
     * @param {?} id
     * @return {?}
     */
    doDelete(path, id) {
        return this.httpService.doPut(this.urlService + '/' + path, id);
    }
    ;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUcxRCxNQUFNOzs7OztJQU1KLFlBQW9CLFdBQTJCLEVBQVUsTUFBMEI7UUFBL0QsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDbkM7Ozs7SUFDRCxJQUFJO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUNwRDtJQUFBLENBQUM7Ozs7O0lBQ0YsSUFBSSxDQUFDLEtBQVM7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM1RDtJQUFBLENBQUM7Ozs7O0lBQ0YsTUFBTSxDQUFDLEVBQUU7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMzRDtJQUFBLENBQUM7Ozs7O0lBQ0YsR0FBRyxDQUFDLElBQVk7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDN0Q7SUFBQSxDQUFDOzs7Ozs7SUFDRixJQUFJLENBQUMsSUFBWSxFQUFFLEtBQVM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRyxLQUFLLENBQUMsQ0FBQztLQUN0RTtJQUFBLENBQUM7Ozs7OztJQUNGLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBUztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3BFO0lBQUEsQ0FBQzs7Ozs7O0lBQ0YsUUFBUSxDQUFDLElBQVksRUFBRyxFQUFVO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUcsRUFBRSxDQUFDLENBQUM7S0FDbEU7SUFBQSxDQUFDOzs7WUE5QkgsVUFBVTs7OztZQUhGLGNBQWM7WUFDZCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4vcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vaHR0cC1oZWxwZXItc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0QmFzZVNlcnZpY2U8VD4ge1xuXG4gIHB1YmxpYyBtb2RlbDogVDtcbiAgcHVibGljIHVybFNlcnZpY2UgOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxTZXJ2aWNlQXV0byA6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBQeHRIdHRwU2VydmljZSwgcHJpdmF0ZSBoZWxwZXIgOiBIdHRwSGVscGVyU2VydmljZSkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBUKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlQXV0bywgbW9kZWwpO1xuICB9O1xuICBkZWxldGUoaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZUF1dG8sIGlkKTtcbiAgfTtcbiAgZ2V0KHBhdGggOnN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHRoaXMudXJsU2VydmljZSArICcvJyArIHBhdGgpO1xuICB9O1xuICBwb3N0KHBhdGggOnN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9Qb3N0KHRoaXMudXJsU2VydmljZSArIFwiL1wiICsgcGF0aCAsIG1vZGVsKTtcbiAgfTtcbiAgcHV0KHBhdGggOnN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQodGhpcy51cmxTZXJ2aWNlICsgJy8nICsgcGF0aCwgbW9kZWwpO1xuICB9O1xuICBkb0RlbGV0ZShwYXRoIDpzdHJpbmcgLCBpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQodGhpcy51cmxTZXJ2aWNlICsgJy8nICsgcGF0aCAsIGlkKTtcbiAgfTtcbn1cbiJdfQ==