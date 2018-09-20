/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DatePipe } from "@angular/common";
import { Pipe } from "@angular/core";
import { Constants } from "../util/constants";
var DateTimeFormatPipe = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeFormatPipe, _super);
    function DateTimeFormatPipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    DateTimeFormatPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        /** @type {?} */
        var datePipe = new DatePipe("en-US");
        return datePipe.transform(value, Constants.DATE_TIME_FMT);
    };
    DateTimeFormatPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'dateTimeFormat'
                },] }
    ];
    return DateTimeFormatPipe;
}(DatePipe));
export { DateTimeFormatPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWZvcm1hdC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9waXBlcy9kYXRlLXRpbWUtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQU1OLDhDQUFROzs7Ozs7Ozs7SUFDOUMsc0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVTs7UUFDOUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUM1RDs7Z0JBUEYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxnQkFBZ0I7aUJBQ3ZCOzs2QkFQRDtFQVF3QyxRQUFRO1NBQW5DLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL3V0aWwvY29uc3RhbnRzXCI7XHJcblxyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdkYXRlVGltZUZvcm1hdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVUaW1lRm9ybWF0UGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgdmFyIGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKFwiZW4tVVNcIik7XHJcbiAgICByZXR1cm4gIGRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgQ29uc3RhbnRzLkRBVEVfVElNRV9GTVQpO1xyXG4gIH1cclxufSJdfQ==