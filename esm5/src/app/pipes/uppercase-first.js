/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Pipe } from "@angular/core";
import { UpperCasePipe } from "@angular/common";
var UpercaseFirst = /** @class */ (function (_super) {
    tslib_1.__extends(UpercaseFirst, _super);
    function UpercaseFirst() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} text
     * @param {?=} args
     * @return {?}
     */
    UpercaseFirst.prototype.transform = /**
     * @param {?} text
     * @param {?=} args
     * @return {?}
     */
    function (text, args) {
        /** @type {?} */
        var words = text.toLowerCase().split(" ");
        for (var a = 0; a < words.length; a++) {
            if (words[a].length > 3) {
                /** @type {?} */
                var w = words[a];
                words[a] = w[0].toUpperCase() + w.slice(1);
            }
        }
        return words.join(" ");
    };
    UpercaseFirst.decorators = [
        { type: Pipe, args: [{
                    name: 'uppercaseFirst'
                },] }
    ];
    return UpercaseFirst;
}(UpperCasePipe));
export { UpercaseFirst };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXJjYXNlLWZpcnN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9waXBlcy91cHBlcmNhc2UtZmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQVksYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBS3JCLHlDQUFhOzs7Ozs7Ozs7SUFDOUMsaUNBQVM7Ozs7O0lBQVQsVUFBVSxJQUFTLEVBQUUsSUFBVTs7UUFDM0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUN4QixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7O2dCQWJKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsZ0JBQWdCO2lCQUN2Qjs7d0JBTEg7RUFNcUMsYUFBYTtTQUFuQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERhdGVQaXBlLCBVcHBlckNhc2VQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ3VwcGVyY2FzZUZpcnN0J1xyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIFVwZXJjYXNlRmlyc3QgZXh0ZW5kcyBVcHBlckNhc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0odGV4dDogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgICAgICB2YXIgd29yZHMgPSB0ZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgd29yZHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAgICAgaWYgKHdvcmRzW2FdLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgICAgICB2YXIgdyA9IHdvcmRzW2FdO1xyXG4gICAgICAgICAgICAgIHdvcmRzW2FdID0gd1swXS50b1VwcGVyQ2FzZSgpICsgdy5zbGljZSgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd29yZHMuam9pbihcIiBcIik7XHJcbiAgICB9XHJcbiAgfSJdfQ==