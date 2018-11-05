/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { ErrorService } from './error.service';
import { of } from 'rxjs';
/** @typedef {?} */
var HandleError;
export { HandleError };
/**
 * Handles HttpClient errors
 */
export class HttpErrorHandler {
    /**
     * @param {?} errorService
     */
    constructor(errorService) {
        this.errorService = errorService;
        /**
         * Create handleError function that already knows the service name
         */
        this.createHandleError = (serviceName = '') => (operation = 'operation', result = /** @type {?} */ ({})) => this.handleError(serviceName, operation, result);
    }
    /**
     * @template T
     * @param {?=} serviceName
     * @param {?=} operation
     * @param {?=} result
     * @return {?}
     */
    handleError(serviceName = '', operation = 'operation', result = /** @type {?} */ ({})) {
        return (error) => {
            /** @type {?} */
            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `{error code: ${error.status}, body: "${error.message}"}`;
            // Todo -> Transforming error for user consumption
            this.errorService.errorMessage = `${serviceName} -> ${operation} failed.\n  Message: ${message}`;
            // -> Return a safe result.
            return of(result);
        };
    }
}
HttpErrorHandler.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpErrorHandler.ctorParameters = () => [
    { type: ErrorService }
];
if (false) {
    /**
     * Create handleError function that already knows the service name
     * @type {?}
     */
    HttpErrorHandler.prototype.createHandleError;
    /** @type {?} */
    HttpErrorHandler.prototype.errorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWVycm9yLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7QUFPdEMsTUFBTTs7OztJQUVKLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjOzs7O2lDQUcxQixDQUFDLFdBQVcsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ3ZDLFNBQVMsR0FBRyxXQUFXLEVBQUUsTUFBTSxxQkFBRyxFQUFPLENBQUEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztLQUo5Qzs7Ozs7Ozs7SUFXbkQsV0FBVyxDQUFLLFdBQVcsR0FBRyxFQUFFLEVBQUUsU0FBUyxHQUFHLFdBQVcsRUFBRSxNQUFNLHFCQUFHLEVBQU8sQ0FBQTtRQUV6RSxNQUFNLENBQUMsQ0FBQyxLQUF3QixFQUFpQixFQUFFOztZQUlqRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLFlBQVksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEIsZ0JBQWdCLEtBQUssQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDOztZQUczRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxHQUFHLFdBQVcsT0FBTyxTQUFTLHdCQUF3QixPQUFPLEVBQUUsQ0FBQzs7WUFFakcsTUFBTSxDQUFDLEVBQUUsQ0FBRSxNQUFNLENBQUUsQ0FBQztTQUNyQixDQUFDO0tBQ0g7OztZQTdCRixVQUFVOzs7O1lBUEYsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG5leHBvcnQgdHlwZSBIYW5kbGVFcnJvciA9IDxUPiAob3BlcmF0aW9uPzogc3RyaW5nLCByZXN1bHQ/OiBUKSA9PiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBPYnNlcnZhYmxlPFQ+O1xyXG5cclxuLyoqIEhhbmRsZXMgSHR0cENsaWVudCBlcnJvcnMgKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEVycm9ySGFuZGxlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UpIHsgfVxyXG5cclxuICAvKiogQ3JlYXRlIGhhbmRsZUVycm9yIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBrbm93cyB0aGUgc2VydmljZSBuYW1lICovXHJcbiAgY3JlYXRlSGFuZGxlRXJyb3IgPSAoc2VydmljZU5hbWUgPSAnJykgPT4gPFQ+XHJcbiAgICAob3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdCA9IHt9IGFzIFQpID0+IHRoaXMuaGFuZGxlRXJyb3Ioc2VydmljZU5hbWUsIG9wZXJhdGlvbiwgcmVzdWx0KTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHNlcnZpY2VOYW1lOiBuYW1lIG9mIHRoZSBkYXRhIHNlcnZpY2VcclxuICAgKiBAcGFyYW0gb3BlcmF0aW9uOiBuYW1lIG9mIHRoZSBmYWlsZWQgb3BlcmF0aW9uXHJcbiAgICogQHBhcmFtIHJlc3VsdDogb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAqL1xyXG4gIGhhbmRsZUVycm9yPFQ+IChzZXJ2aWNlTmFtZSA9ICcnLCBvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0ID0ge30gYXMgVCkge1xyXG5cclxuICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgIC8vIFRvZG8gLT4gU2VuZCB0aGUgZXJyb3IgdG8gcmVtb3RlIGxvZ2dpbmcgaW5mcmFzdHJ1Y3R1cmVcclxuICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxyXG5cclxuICAgICAgY29uc3QgbWVzc2FnZSA9IChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yRXZlbnQpID9cclxuICAgICAgICBlcnJvci5lcnJvci5tZXNzYWdlIDpcclxuICAgICAgIGB7ZXJyb3IgY29kZTogJHtlcnJvci5zdGF0dXN9LCBib2R5OiBcIiR7ZXJyb3IubWVzc2FnZX1cIn1gO1xyXG5cclxuICAgICAgLy8gVG9kbyAtPiBUcmFuc2Zvcm1pbmcgZXJyb3IgZm9yIHVzZXIgY29uc3VtcHRpb25cclxuICAgICAgdGhpcy5lcnJvclNlcnZpY2UuZXJyb3JNZXNzYWdlID0gYCR7c2VydmljZU5hbWV9IC0+ICR7b3BlcmF0aW9ufSBmYWlsZWQuXFxuICBNZXNzYWdlOiAke21lc3NhZ2V9YDtcclxuICAgICAgLy8gLT4gUmV0dXJuIGEgc2FmZSByZXN1bHQuXHJcbiAgICAgIHJldHVybiBvZiggcmVzdWx0ICk7XHJcbiAgICB9O1xyXG4gIH1cclxufSJdfQ==