/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Constants } from "../util/constants";
var DateFormatPipe = /** @class */ (function (_super) {
    tslib_1.__extends(DateFormatPipe, _super);
    function DateFormatPipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    DateFormatPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        return _super.prototype.transform.call(this, value, Constants.DATE_FMT);
    };
    DateFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'dateFormat'
                },] }
    ];
    return DateFormatPipe;
}(DatePipe));
export { DateFormatPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcGlwZXMvZGF0ZS1mb3JtYXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBS1IsMENBQVE7Ozs7Ozs7OztJQUMxQyxrQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQVUsRUFBRSxJQUFVO1FBQzlCLE1BQU0sQ0FBQyxpQkFBTSxTQUFTLFlBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNuRDs7Z0JBTkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxZQUFZO2lCQUNuQjs7eUJBTkg7RUFPc0MsUUFBUTtTQUEvQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vdXRpbC9jb25zdGFudHNcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdkYXRlRm9ybWF0J1xyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRQaXBlIGV4dGVuZHMgRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfRk1UKTtcclxuICAgIH1cclxuICB9Il19