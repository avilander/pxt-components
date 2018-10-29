/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
var HttpHelperService = /** @class */ (function () {
    function HttpHelperService(configService) {
        this.configService = configService;
    }
    /**
     * @return {?}
     */
    HttpHelperService.prototype.getApi = /**
     * @return {?}
     */
    function () {
        return this.configService.getConfiguration('API', 'PATH');
    };
    ;
    /**
     * @return {?}
     */
    HttpHelperService.prototype.getApiSgi = /**
     * @return {?}
     */
    function () {
        return this.configService.getConfiguration('API', 'SGI');
    };
    ;
    /**
     * @return {?}
     */
    HttpHelperService.prototype.getFrontSgi = /**
     * @return {?}
     */
    function () {
        return this.configService.getConfiguration('FRONT', 'SGI');
    };
    ;
    /**
     * @param {?} name
     * @param {?} url
     * @return {?}
     */
    HttpHelperService.prototype.getApiUrl = /**
     * @param {?} name
     * @param {?} url
     * @return {?}
     */
    function (name, url) {
        return this.configService.getConfiguration(url, name);
    };
    HttpHelperService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpHelperService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    return HttpHelperService;
}());
export { HttpHelperService };
if (false) {
    /** @type {?} */
    HttpHelperService.prototype.configService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0lBSS9DLDJCQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtLQUMvQzs7OztJQUNNLGtDQUFNOzs7O1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztJQUMzRCxDQUFDOzs7O0lBRUsscUNBQVM7Ozs7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7O0lBQzFELENBQUM7Ozs7SUFFSyx1Q0FBVzs7OztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7O0lBQzVELENBQUM7Ozs7OztJQUdLLHFDQUFTOzs7OztjQUFFLElBQUksRUFBRSxHQUFHO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O2dCQWxCekQsVUFBVTs7OztnQkFGRixhQUFhOzs0QkFKdEI7O1NBT2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpIHtcclxuICB9XHJcbiAgcHVibGljIGdldEFwaSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbignQVBJJywgJ1BBVEgnKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0QXBpU2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdBUEknLCAnU0dJJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldEZyb250U2dpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCdGUk9OVCcsICdTR0knKTtcclxuICB9O1xyXG5cclxuXHJcbiAgcHVibGljIGdldEFwaVVybCAobmFtZSwgdXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24odXJsLCBuYW1lKTtcclxuICB9XHJcbn0iXX0=