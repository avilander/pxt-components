/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PxtDialogFilterComponent } from '../../../pxt-dialog/pxt-dialog-filter/pxt-dialog-filter.component';
import { MatDialog } from '@angular/material';
var PxtInputFilterComponent = /** @class */ (function () {
    //private onChangeCallback: (_: any) => void = noop;
    function PxtInputFilterComponent(dialog) {
        this.dialog = dialog;
        this.isDisabled = true;
        this.placeholder = " ";
        this.onValueCallback = new EventEmitter();
        this.value = " ";
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PxtInputFilterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["className"] != undefined && !changes["className"].firstChange) {
            this.className = changes["className"].currentValue;
        }
        if (changes["placeholder"] != undefined && !changes["placeholder"].firstChange) {
            this.placeholder = changes["placeholder"].currentValue;
        }
        if (changes["value"] != undefined && !changes["value"].firstChange) {
            this.value = changes["value"].currentValue;
        }
        if (changes["displayedColumns"] != undefined && !changes["displayedColumns"].firstChange) {
            this.displayedColumns = changes["displayedColumns"].currentValue;
        }
    };
    /**
     * @return {?}
     */
    PxtInputFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.field != undefined) {
            this.value = this.field.value;
        }
    };
    /*
    get inputValue() {
      return this.value;
    }
  
    set inputValue(f: any) {
      if (f != undefined) {
        if (f !== this.value) {
          this.value = f;
          this.onChangeCallback(f);
        }
      }
    }
  */
    //Method resposible for open dialog filter
    /**
     * @return {?}
     */
    PxtInputFilterComponent.prototype.openFilter = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.field != undefined && this.field.filters != undefined) {
            this.auto = true;
            /** @type {?} */
            var dialogRef = this.dialog.open(PxtDialogFilterComponent, {
                width: '600px',
                panelClass: 'pxt-dialog',
                data: { auto: this.auto, filters: this.field.filters, controller: this.field.className, titleDialog: "Selecione: ( " + this.field.className + " )" }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result !== undefined) {
                    _this.field.value = result.codigo;
                }
            });
        }
        else {
            /** @type {?} */
            var dialogRef = this.dialog.open(PxtDialogFilterComponent, {
                width: '600px',
                panelClass: 'pxt-dialog',
                data: { controller: this.className, displayedColumns: this.displayedColumns, titleDialog: "Selecione: ( " + this.className + " )" }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result !== undefined) {
                    _this.value = result.descricao;
                    _this.onValueCallback.emit(result);
                }
            });
        }
    };
    PxtInputFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-input-filter',
                    template: "<!--\n<mat-grid-list cols=\"6\" rowHeight=\"5:3\">\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='5'>\n    <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" disabled=\"isDisabled\">\n      <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n      <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n        <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n      </ng-container>\n    </mat-form-field>\n  </mat-grid-tile>\n\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='1'>\n    <button mat-icon-button>\n      <mat-icon (click)=\"openFilter()\">search</mat-icon>\n    </button>\n  </mat-grid-tile>\n\n</mat-grid-list>\n-->\n<div *ngIf=\"this.field != undefined\">\n  <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label | uppercaseFirst\" size=\"10\"\n      [type]=\"field.inputType\">\n    <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n      <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n    </ng-container>\n  </mat-form-field>\n</div>\n\n<div *ngIf=\"this.field == undefined\">\n    <mat-form-field class=\"demo-full-width\">\n  <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n    <mat-icon>search</mat-icon>\n  </button>\n  <input matInput [placeholder]=\"placeholder | uppercaseFirst\" size=\"10\" disabled=\"true\"  [(ngModel)]=\"value\">\n</mat-form-field>\n</div>",
                    styles: ["mat-form-field{width:100%;height:100%}.btn-input-file{position:absolute;right:0;bottom:0}:host{width:100%;height:100%}.pxt-dialog .mat-dialog-container{padding:0!important}::ng-deep .mat-dialog-container{padding:0!important}"]
                }] }
    ];
    /** @nocollapse */
    PxtInputFilterComponent.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    PxtInputFilterComponent.propDecorators = {
        className: [{ type: Input }],
        placeholder: [{ type: Input }],
        displayedColumns: [{ type: Input }],
        onValueCallback: [{ type: Output }],
        value: [{ type: Input }]
    };
    return PxtInputFilterComponent;
}());
export { PxtInputFilterComponent };
if (false) {
    /** @type {?} */
    PxtInputFilterComponent.prototype.isDisabled;
    /** @type {?} */
    PxtInputFilterComponent.prototype.auto;
    /** @type {?} */
    PxtInputFilterComponent.prototype.className;
    /** @type {?} */
    PxtInputFilterComponent.prototype.placeholder;
    /** @type {?} */
    PxtInputFilterComponent.prototype.displayedColumns;
    /** @type {?} */
    PxtInputFilterComponent.prototype.onValueCallback;
    /** @type {?} */
    PxtInputFilterComponent.prototype.value;
    /** @type {?} */
    PxtInputFilterComponent.prototype.field;
    /** @type {?} */
    PxtInputFilterComponent.prototype.group;
    /** @type {?} */
    PxtInputFilterComponent.prototype.dialog;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQWMsTUFBTSxFQUFFLFlBQVksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFHN0csT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQTZCNUMsb0RBQW9EO0lBRXBELGlDQUFtQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXOzBCQWJ2QixJQUFJOzJCQUdlLEdBQUc7K0JBRVksSUFBSSxZQUFZLEVBQUU7cUJBQ3hDLEdBQUc7S0FPYTs7Ozs7SUFJekMsNkNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8saUJBQWMsU0FBUyxJQUFJLENBQUMsT0FBTyxjQUFXLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLGNBQVcsWUFBWSxDQUFDO1NBQ2pEO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxtQkFBZ0IsU0FBUyxJQUFJLENBQUMsT0FBTyxnQkFBYSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxnQkFBYSxZQUFZLENBQUM7U0FDckQ7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGFBQVUsU0FBUyxJQUFJLENBQUMsT0FBTyxVQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLFVBQU8sWUFBWSxDQUFDO1NBQ3pDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyx3QkFBcUIsU0FBUyxJQUFJLENBQUMsT0FBTyxxQkFBa0IsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxxQkFBa0IsWUFBWSxDQUFDO1NBQy9EO0tBQ0Y7Ozs7SUFFRCwwQ0FBUTs7O0lBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUMvQjtLQUNGO0lBRUQ7Ozs7Ozs7Ozs7Ozs7SUFhQTtJQUNBLDBDQUEwQzs7OztJQUMxQyw0Q0FBVTs7O0lBQVY7UUFBQSxpQkEwQkM7UUF6QkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7WUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Z0JBQ3pELEtBQUssRUFBRSxPQUFPO2dCQUNkLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFO2FBQ3JKLENBQUMsQ0FBQztZQUNILFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDbEM7YUFDRixDQUFDLENBQUM7U0FDSjtRQUFBLElBQUksQ0FBQyxDQUFDOztZQUNMLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO2dCQUN6RCxLQUFLLEVBQUUsT0FBTztnQkFDZCxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsSUFBSSxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxlQUFlLEdBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEVBQUU7YUFDbkksQ0FBQyxDQUFDO1lBQ0gsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNuQzthQUNGLENBQUMsQ0FBQztTQUNKO0tBQ0Y7O2dCQXZGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsKzZEQUFnRDs7aUJBR2pEOzs7O2dCQWhCUSxTQUFTOzs7NEJBb0JmLEtBQUs7OEJBQ0wsS0FBSzttQ0FDTCxLQUFLO2tDQUNMLE1BQU07d0JBQ04sS0FBSzs7a0NBNUJSOztTQXFCYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9weHQtZGlhbG9nL3B4dC1kaWFsb2ctZmlsdGVyL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQeHRGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvcHh0LWZpZWxkLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuLypcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFB4dElucHV0RmlsdGVyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG4qL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWlucHV0LWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuc2NzcyddLFxuICAvL3Byb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGlzRGlzYWJsZWQgPSB0cnVlO1xuICBhdXRvOiBib29sZWFuO1xuICBASW5wdXQoKSBjbGFzc05hbWUgOlN0cmluZztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgOiBTdHJpbmcgPSBcIiBcIjtcbiAgQElucHV0KCkgZGlzcGxheWVkQ29sdW1ucyA6IGFueVtdO1xuICBAT3V0cHV0KCkgb25WYWx1ZUNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgdmFsdWUgOlN0cmluZyA9IFwiIFwiO1xuICAgXG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICAvL3ByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jbGFzc05hbWUgIT0gdW5kZWZpbmVkICYmICFjaGFuZ2VzLmNsYXNzTmFtZS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5jbGFzc05hbWUgPSBjaGFuZ2VzLmNsYXNzTmFtZS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnBsYWNlaG9sZGVyICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5wbGFjZWhvbGRlci5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGNoYW5nZXMucGxhY2Vob2xkZXIuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnZhbHVlICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy52YWx1ZS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IGNoYW5nZXMudmFsdWUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5kaXNwbGF5ZWRDb2x1bW5zLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSBjaGFuZ2VzLmRpc3BsYXllZENvbHVtbnMuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmZpZWxkICE9IHVuZGVmaW5lZCl7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKlxuICBnZXQgaW5wdXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIHNldCBpbnB1dFZhbHVlKGY6IGFueSkge1xuICAgIGlmIChmICE9IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGYgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGY7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiovXG4gIC8vTWV0aG9kIHJlc3Bvc2libGUgZm9yIG9wZW4gZGlhbG9nIGZpbHRlclxuICBvcGVuRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLmZpZWxkICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZpZWxkLmZpbHRlcnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmF1dG8gPSB0cnVlO1xuICAgICAgbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LCB7XG4gICAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgICBwYW5lbENsYXNzOiAncHh0LWRpYWxvZycsXG4gICAgICAgIGRhdGE6IHsgYXV0bzogdGhpcy5hdXRvLCBmaWx0ZXJzOiB0aGlzLmZpZWxkLmZpbHRlcnMsIGNvbnRyb2xsZXI6IHRoaXMuZmllbGQuY2xhc3NOYW1lLCB0aXRsZURpYWxvZzogXCJTZWxlY2lvbmU6ICggXCIgKyB0aGlzLmZpZWxkLmNsYXNzTmFtZSArIFwiIClcIiB9XG4gICAgICB9KTtcbiAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmZpZWxkLnZhbHVlID0gcmVzdWx0LmNvZGlnbztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfWVsc2Uge1xuICAgICAgbGV0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50LCB7XG4gICAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgICBwYW5lbENsYXNzOiAncHh0LWRpYWxvZycsXG4gICAgICAgIGRhdGE6IHtjb250cm9sbGVyOiB0aGlzLmNsYXNzTmFtZSwgZGlzcGxheWVkQ29sdW1uczp0aGlzLmRpc3BsYXllZENvbHVtbnMsIHRpdGxlRGlhbG9nOiBcIlNlbGVjaW9uZTogKCBcIiArICB0aGlzLmNsYXNzTmFtZSArIFwiIClcIiB9XG4gICAgICB9KTtcbiAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LmRlc2NyaWNhbztcbiAgICAgICAgICB0aGlzLm9uVmFsdWVDYWxsYmFjay5lbWl0KHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19