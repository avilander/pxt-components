/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
var InterceptService = /** @class */ (function () {
    function InterceptService() {
    }
    // intercept request and add token
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    InterceptService.prototype.intercept = /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        // modify request
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + localStorage.getItem('MY_TOKEN')
            }
        });
        console.log("----request----");
        console.log(request);
        console.log("--- end of request---");
        return next.handle(request)
            .pipe(tap(function (event) {
            if (event instanceof HttpResponse) {
                console.log(" all looks good");
                // http response status code
                console.log(event.status);
            }
        }, function (error) {
            // http response status code
            console.log("----response----");
            console.error("status code:");
            console.error(error.status);
            console.error(error.message);
            console.log("--- end of response---");
        }));
    };
    ;
    InterceptService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InterceptService.ctorParameters = function () { return []; };
    return InterceptService;
}());
export { InterceptService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0LXNlcnZpY2UgLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy9weHQtaW50ZXJjZXB0b3IvaW50ZXJjZXB0LXNlcnZpY2UgLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFLTCxZQUFZLEVBQ2IsTUFBTSxzQkFBc0IsQ0FBQTtBQUU3QixPQUFPLEVBQWEsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0lBTTlDO0tBQWlCO0lBRWpCLGtDQUFrQzs7Ozs7O0lBQ2hDLG9DQUFTOzs7OztJQUFULFVBQVUsT0FBeUIsRUFBRSxJQUFpQjs7UUFHcEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdEIsVUFBVSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxZQUFVLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFHO2FBQzVEO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBR25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUMxQixJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQUEsS0FBSztZQUNQLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7O2dCQUUvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzQjtTQUNGLEVBQUUsVUFBQSxLQUFLOztZQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUV4QyxDQUFDLENBQ0gsQ0FBQTtLQUVIO0lBQUEsQ0FBQzs7Z0JBM0NMLFVBQVU7Ozs7MkJBWFg7O1NBYWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBFdmVudCwgXHJcbiAgSHR0cEludGVyY2VwdG9yLCBcclxuICBIdHRwSGFuZGxlciwgXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvcix0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKCkvL3twcm92aWRlZEluOiAncm9vdCd9XHJcblxyXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0U2VydmljZSAgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHQvLyBpbnRlcmNlcHQgcmVxdWVzdCBhbmQgYWRkIHRva2VuXHJcbiAgXHRpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOk9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuXHJcbiAgICBcdC8vIG1vZGlmeSByZXF1ZXN0XHJcblx0ICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcclxuXHQgICAgICBzZXRIZWFkZXJzOiB7XHJcblx0ICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01ZX1RPS0VOJyl9YFxyXG5cdCAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0ICAgXHJcblx0ICAgXHRjb25zb2xlLmxvZyhcIi0tLS1yZXF1ZXN0LS0tLVwiKTtcclxuXHJcblx0IFx0Y29uc29sZS5sb2cocmVxdWVzdCk7XHJcblxyXG5cdCBcdGNvbnNvbGUubG9nKFwiLS0tIGVuZCBvZiByZXF1ZXN0LS0tXCIpO1xyXG4gXHJcblxyXG5cdCAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdClcclxuXHQgICAgLnBpcGUoXHJcblx0ICAgICAgICB0YXAoZXZlbnQgPT4ge1xyXG5cdCAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcclxuXHQgICAgICAgICAgICAgXHJcblx0ICAgICAgICAgICAgY29uc29sZS5sb2coXCIgYWxsIGxvb2tzIGdvb2RcIik7XHJcblx0ICAgICAgICAgICAgLy8gaHR0cCByZXNwb25zZSBzdGF0dXMgY29kZVxyXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnN0YXR1cyk7XHJcblx0ICAgICAgICAgIH1cclxuXHQgICAgICAgIH0sIGVycm9yID0+IHtcclxuXHQgICBcdFx0XHQvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0tcmVzcG9uc2UtLS0tXCIpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoXCJzdGF0dXMgY29kZTpcIik7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5lcnJvcihlcnJvci5zdGF0dXMpO1xyXG5cdCAgICAgICAgICBcdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCItLS0gZW5kIG9mIHJlc3BvbnNlLS0tXCIpO1xyXG5cclxuXHQgICAgICAgIH0pXHJcblx0ICAgICAgKVxyXG5cclxuICAgIH07XHJcbiAgXHJcbiBcclxufSJdfQ==