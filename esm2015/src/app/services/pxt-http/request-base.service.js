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
    doGet(path) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doGet(path + '/' + path);
        }
        else {
            return this.httpService.doGet(this.urlService + '/' + path);
        }
    }
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    doPost(path, model) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doPost(path + "/" + path, model);
        }
        else {
            return this.httpService.doPost(this.urlService + "/" + path, model);
        }
        ;
    }
    ;
    /**
     * @param {?} path
     * @param {?=} model
     * @return {?}
     */
    doPut(path, model) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doPut(path + '/' + path, model);
        }
        else {
            return this.httpService.doPut(this.urlService + '/' + path, model);
        }
    }
    ;
    /**
     * @param {?} path
     * @param {?} id
     * @return {?}
     */
    doDelete(path, id) {
        if (path.indexOf('http') > -1) {
            return this.httpService.doPut(path + '/' + path, id);
        }
        else {
            return this.httpService.doPut(this.urlService + '/' + path, id);
        }
        ;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUcxRCxNQUFNOzs7OztJQU1KLFlBQW9CLFdBQTJCLEVBQVUsTUFBeUI7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDbkM7Ozs7SUFDRCxJQUFJO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUNwRDtJQUFBLENBQUM7Ozs7O0lBQ0YsSUFBSSxDQUFDLEtBQVM7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM1RDtJQUFBLENBQUM7Ozs7O0lBQ0YsTUFBTSxDQUFDLEVBQUU7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMzRDtJQUFBLENBQUM7Ozs7O0lBRUYsS0FBSyxDQUFDLElBQVk7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDbEQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM3RDtLQUNGO0lBQUEsQ0FBQzs7Ozs7O0lBRUYsTUFBTSxDQUFDLElBQVksRUFBRSxLQUFTO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyRTtRQUFBLENBQUM7S0FDSDtJQUFBLENBQUM7Ozs7OztJQUVGLEtBQUssQ0FBQyxJQUFZLEVBQUUsS0FBUztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEU7S0FDRjtJQUFBLENBQUM7Ozs7OztJQUVGLFFBQVEsQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakU7UUFBQSxDQUFDO0tBQ0g7SUFBQSxDQUFDOzs7WUFsREgsVUFBVTs7OztZQUhGLGNBQWM7WUFDZCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4vcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vaHR0cC1oZWxwZXItc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0QmFzZVNlcnZpY2U8VD4ge1xuXG4gIHB1YmxpYyBtb2RlbDogVDtcbiAgcHVibGljIHVybFNlcnZpY2U6IHN0cmluZztcbiAgcHVibGljIHVybFNlcnZpY2VBdXRvOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UsIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSkge1xuICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKTtcbiAgfVxuICBsb2FkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy51cmxTZXJ2aWNlQXV0byk7XG4gIH07XG4gIHNhdmUobW9kZWw/OiBUKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb1Bvc3QodGhpcy51cmxTZXJ2aWNlQXV0bywgbW9kZWwpO1xuICB9O1xuICBkZWxldGUoaWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvRGVsZXRlKHRoaXMudXJsU2VydmljZUF1dG8sIGlkKTtcbiAgfTtcblxuICBkb0dldChwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQocGF0aCArICcvJyArIHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0dldCh0aGlzLnVybFNlcnZpY2UgKyAnLycgKyBwYXRoKTtcbiAgICB9XG4gIH07XG5cbiAgZG9Qb3N0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdChwYXRoICsgXCIvXCIgKyBwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh0aGlzLnVybFNlcnZpY2UgKyBcIi9cIiArIHBhdGgsIG1vZGVsKTtcbiAgICB9O1xuICB9O1xuXG4gIGRvUHV0KHBhdGg6IHN0cmluZywgbW9kZWw/OiBUKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignaHR0cCcpID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHBhdGggKyAnLycgKyBwYXRoLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUHV0KHRoaXMudXJsU2VydmljZSArICcvJyArIHBhdGgsIG1vZGVsKTtcbiAgICB9XG4gIH07XG4gIFxuICBkb0RlbGV0ZShwYXRoOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAocGF0aC5pbmRleE9mKCdodHRwJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQocGF0aCArICcvJyArIHBhdGgsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9QdXQodGhpcy51cmxTZXJ2aWNlICsgJy8nICsgcGF0aCwgaWQpO1xuICAgIH07XG4gIH07XG59XG4iXX0=