/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RequestBaseService } from '../../../../services/pxt-http/request-base.service';
/** @type {?} */
const noop = () => {
};
const ɵ0 = noop;
/** @type {?} */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PxtSelectComponent),
    multi: true
};
export class PxtSelectComponent {
    /**
     * @param {?} pxthttp
     */
    constructor(pxthttp) {
        this.pxthttp = pxthttp;
        this.required = false;
        this.placeholder = 'Selecione';
        this.controller = "";
        this.auto = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.options = [];
    }
    /**
     * @return {?}
     */
    get selectedOption() {
        return this.option;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} f
     * @return {?}
     */
    set selectedOption(f) {
        if (f !== this.option) {
            this.option = f;
            this.onChangeCallback(f.codigo);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.option = value;
        this.onChangeCallback(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.model != undefined) {
            this.controller = this.model.constructor.name;
            this.field = this.model;
            this.auto = false;
        }
        else if (this.field != undefined && this.field.className != undefined) {
            this.controller = this.field.className.name;
            this.auto = true;
        }
    }
    ;
    /**
     * @return {?}
     */
    find() {
        if (this.controller != undefined) {
            this.pxthttp.doGet(this.controller, this.params).subscribe(result => {
                console.log(result);
                if (this.auto) {
                    this.field.options = result;
                }
                else {
                    this.options = result;
                }
            });
        }
    }
    ;
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.find();
    }
    ;
}
PxtSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-select',
                template: "\n\n<mat-form-field *ngIf=\"auto\" class=\"demo-full-width\" [formGroup]=\"group\">\n  <mat-select [placeholder]=\"field.label | uppercaseFirst\" [formControlName]=\"field.name\"  >\n    <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n    <mat-option *ngFor=\"let item of field.options\" [value]=\"item.identificador\">{{item.codigo +' - '+item.descricao}}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<mat-form-field *ngIf=\"!auto\" class=\"demo-full-width\">\n    <mat-select placeholder=\"{{ placeholder }}\" required=\"{{required}}\" [(ngModel)]=\"selectedOption\" >\n      <mat-option>Selecione uma op\u00E7\u00E3o</mat-option>\n      <mat-option *ngFor=\"let option of options\" [value]=\"option\">\n        {{ option.codigo + ' - ' + option.descricao }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>",
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                styles: [":host{width:100%;height:100%}mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
PxtSelectComponent.ctorParameters = () => [
    { type: RequestBaseService }
];
PxtSelectComponent.propDecorators = {
    required: [{ type: Input }],
    placeholder: [{ type: Input }],
    model: [{ type: Input }],
    params: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PxtSelectComponent.prototype.required;
    /** @type {?} */
    PxtSelectComponent.prototype.placeholder;
    /** @type {?} */
    PxtSelectComponent.prototype.model;
    /** @type {?} */
    PxtSelectComponent.prototype.params;
    /** @type {?} */
    PxtSelectComponent.prototype.controller;
    /** @type {?} */
    PxtSelectComponent.prototype.auto;
    /** @type {?} */
    PxtSelectComponent.prototype.onTouchedCallback;
    /** @type {?} */
    PxtSelectComponent.prototype.onChangeCallback;
    /** @type {?} */
    PxtSelectComponent.prototype.field;
    /** @type {?} */
    PxtSelectComponent.prototype.group;
    /** @type {?} */
    PxtSelectComponent.prototype.option;
    /** @type {?} */
    PxtSelectComponent.prototype.options;
    /** @type {?} */
    PxtSelectComponent.prototype.pxthttp;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LXNlbGVjdC9weHQtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBYSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQzs7QUFFeEYsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0NBQ2pCLENBQUM7OztBQUVGLGFBQWEsbUNBQW1DLEdBQVE7SUFDcEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQVFGLE1BQU07Ozs7SUFpREosWUFBbUIsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7d0JBL0NqQixLQUFLOzJCQUNILFdBQVc7MEJBSTdCLEVBQUU7b0JBQ1IsS0FBSztpQ0FFNEIsSUFBSTtnQ0FDQyxJQUFJO3VCQU9oQyxFQUFFO0tBaUNsQjs7OztJQS9CRCxJQUFJLGNBQWM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDMUI7Ozs7O0lBRUQsSUFBSSxjQUFjLENBQUMsQ0FBTTtRQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztLQUNGOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDNUI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9COzs7O0lBT0QsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7U0FDbkI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjtLQUNGO0lBQUEsQ0FBQzs7OztJQUVGLElBQUk7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztvQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7aUJBQzdCO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2lCQUN2QjthQUNGLENBQUMsQ0FBQztTQUNKO0tBQ0Y7SUFBQSxDQUFDOzs7O0lBQ0YsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNiO0lBQUEsQ0FBQzs7O1lBcEZILFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsZzFCQUEwQztnQkFFMUMsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7O2FBQ2pEOzs7O1lBaEJRLGtCQUFrQjs7O3VCQW1CeEIsS0FBSzswQkFDTCxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHRTZWxlY3RDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlbGVjaW9uZSc7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG4gIEBJbnB1dCgpIHBhcmFtczogYW55O1xuXG4gIGNvbnRyb2xsZXIgPSBcIlwiO1xuICBhdXRvID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgZmllbGQ6IFB4dEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIG9wdGlvbjogYW55O1xuXG4gIG9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbjtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRPcHRpb24oZjogYW55KSB7XG4gICAgaWYgKGYgIT09IHRoaXMub3B0aW9uKSB7XG4gICAgICB0aGlzLm9wdGlvbiA9IGY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZi5jb2RpZ28pO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMub3B0aW9uID0gdmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHh0aHR0cDogUmVxdWVzdEJhc2VTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1vZGVsICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb250cm9sbGVyID0gdGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgdGhpcy5maWVsZCA9IHRoaXMubW9kZWw7XG4gICAgICB0aGlzLmF1dG8gPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmllbGQgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmllbGQuY2xhc3NOYW1lICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb250cm9sbGVyID0gdGhpcy5maWVsZC5jbGFzc05hbWUubmFtZTtcbiAgICAgIHRoaXMuYXV0byA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIGZpbmQoKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbGxlciE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5weHRodHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgdGhpcy5wYXJhbXMpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBpZih0aGlzLmF1dG8pe1xuICAgICAgICAgIHRoaXMuZmllbGQub3B0aW9ucyA9IHJlc3VsdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5vcHRpb25zID0gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuICAgIHRoaXMuZmluZCgpO1xuICB9O1xufVxuXG5cbiJdfQ==