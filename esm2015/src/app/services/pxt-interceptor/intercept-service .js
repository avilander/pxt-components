/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
export class InterceptService {
    constructor() { }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        // modify request
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('MY_TOKEN')}`
            }
        });
        return next.handle(request)
            .pipe(tap(event => {
            if (event instanceof HttpResponse) {
            }
        }, error => {
            // http response status code
        }));
    }
    ;
}
InterceptService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InterceptService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0LXNlcnZpY2UgLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy9weHQtaW50ZXJjZXB0b3IvaW50ZXJjZXB0LXNlcnZpY2UgLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFLTCxZQUFZLEVBQ2IsTUFBTSxzQkFBc0IsQ0FBQTtBQUU3QixPQUFPLEVBQWEsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJL0MsTUFBTTtJQUVMLGlCQUFpQjs7Ozs7O0lBR2YsU0FBUyxDQUFDLE9BQXlCLEVBQUUsSUFBaUI7O1FBR3BELE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3RCLFVBQVUsRUFBRTtnQkFDVixhQUFhLEVBQUUsVUFBVSxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2FBQzVEO1NBQ0YsQ0FBQyxDQUFDO1FBR0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQzFCLElBQUksQ0FDRCxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQzthQUVuQztTQUNGLEVBQUUsS0FBSyxDQUFDLEVBQUU7O1NBSVYsQ0FBQyxDQUNILENBQUE7S0FFSDtJQUFBLENBQUM7OztZQTlCTCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBFdmVudCwgXHJcbiAgSHR0cEludGVyY2VwdG9yLCBcclxuICBIdHRwSGFuZGxlciwgXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvcix0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKCkvL3twcm92aWRlZEluOiAncm9vdCd9XHJcblxyXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0U2VydmljZSAgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHQvLyBpbnRlcmNlcHQgcmVxdWVzdCBhbmQgYWRkIHRva2VuXHJcbiAgXHRpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOk9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHJcbiAgICBcdC8vIG1vZGlmeSByZXF1ZXN0XHJcblx0ICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcclxuXHQgICAgICBzZXRIZWFkZXJzOiB7XHJcblx0ICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01ZX1RPS0VOJyl9YFxyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblxyXG5cclxuXHQgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpXHJcblx0ICAgIC5waXBlKFxyXG5cdCAgICAgICAgdGFwKGV2ZW50ID0+IHtcclxuXHQgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XHJcblx0ICAgICAgICAgIFxyXG5cdCAgICAgICAgICB9XHJcblx0ICAgICAgICB9LCBlcnJvciA9PiB7XHJcblx0ICAgXHRcdFx0Ly8gaHR0cCByZXNwb25zZSBzdGF0dXMgY29kZVxyXG5cclxuXHJcblx0ICAgICAgICB9KVxyXG5cdCAgICAgIClcclxuXHJcbiAgICB9O1xyXG4gIFxyXG4gXHJcbn0iXX0=