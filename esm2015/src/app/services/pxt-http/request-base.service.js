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
export class RequestBaseService {
    /**
     * @param {?} httpService
     */
    constructor(httpService) {
        this.httpService = httpService;
        this.pathUrl = "";
        this.object = /** @type {?} */ ({});
        this.pathUrl = environment.esbApiPxt;
    }
    /**
     * @param {?=} model
     * @return {?}
     */
    load(model) {
        /** @type {?} */
        let urlApi = this.pathUrl + model.constructor.name;
        console.log(urlApi);
        debugger;
        return this.httpService.doGet(urlApi);
    }
    ;
    /**
     * @param {?} model
     * @return {?}
     */
    save(model) {
        /** @type {?} */
        let urlApi = this.pathUrl + model.constructor.name;
        return this.httpService.doPost(urlApi, model);
    }
    ;
    /**
     * @param {?} model
     * @return {?}
     */
    delete(model) {
        /** @type {?} */
        let urlApi = this.pathUrl + model.constructor.name;
        return this.httpService.doDelete(urlApi, model);
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
    RequestBaseService.prototype.pathUrl;
    /** @type {?} */
    RequestBaseService.prototype.object;
    /** @type {?} */
    RequestBaseService.prototype.httpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFHaEUsTUFBTTs7OztJQUdKLFlBQW9CLFdBQTJCO1FBQTNCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjt1QkFGckMsRUFBRTt3Q0FDQyxFQUFPO1FBRWxCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztLQUN0Qzs7Ozs7SUFDRCxJQUFJLENBQUMsS0FBUzs7UUFDWixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsUUFBUSxDQUFDO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZDO0lBQUEsQ0FBQzs7Ozs7SUFDRixJQUFJLENBQUMsS0FBUTs7UUFDWCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDL0M7SUFBQSxDQUFDOzs7OztJQUNGLE1BQU0sQ0FBQyxLQUFVOztRQUNmLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNqRDtJQUFBLENBQUM7OztZQXBCSCxVQUFVOzs7O1lBSEYsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RCYXNlU2VydmljZSA8VD4ge1xuICBwYXRoVXJsID0gXCJcIjtcbiAgb2JqZWN0IDogVCA9IHt9IGFzIFQ7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IFB4dEh0dHBTZXJ2aWNlKSB7XG4gICAgdGhpcy5wYXRoVXJsID0gZW52aXJvbm1lbnQuZXNiQXBpUHh0O1xuICB9XG4gIGxvYWQobW9kZWw/OiBUKTogYW55IHtcbiAgICBsZXQgdXJsQXBpID0gdGhpcy5wYXRoVXJsICsgbW9kZWwuY29uc3RydWN0b3IubmFtZTtcbiAgICBjb25zb2xlLmxvZyh1cmxBcGkpO1xuICAgIGRlYnVnZ2VyO1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvR2V0KHVybEFwaSk7XG4gIH07XG4gIHNhdmUobW9kZWw6IFQpOiBhbnkge1xuICAgIGxldCB1cmxBcGkgPSB0aGlzLnBhdGhVcmwgKyBtb2RlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRvUG9zdCh1cmxBcGksIG1vZGVsKTtcbiAgfTtcbiAgZGVsZXRlKG1vZGVsOiBhbnkpIHtcbiAgICBsZXQgdXJsQXBpID0gdGhpcy5wYXRoVXJsICsgbW9kZWwuY29uc3RydWN0b3IubmFtZTtcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5kb0RlbGV0ZSh1cmxBcGksIG1vZGVsKTtcbiAgfTtcbn1cbiJdfQ==