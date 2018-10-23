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
        this.value = "";
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
                data: { controller: this.className, titleDialog: "Selecione: ( " + this.className + " )" }
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
                    template: "<!--\n<mat-grid-list cols=\"6\" rowHeight=\"5:3\">\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='5'>\n    <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\" disabled=\"isDisabled\">\n      <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label\" size=\"10\" [type]=\"field.inputType\">\n      <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n        <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n      </ng-container>\n    </mat-form-field>\n  </mat-grid-tile>\n\n  <mat-grid-tile class=\"mat-grid-tile-content\" colspan='1'>\n    <button mat-icon-button>\n      <mat-icon (click)=\"openFilter()\">search</mat-icon>\n    </button>\n  </mat-grid-tile>\n\n</mat-grid-list>\n-->\n<div *ngIf=\"this.field != undefined\">\n  <mat-form-field class=\"demo-full-width\" [formGroup]=\"group\">\n    <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n      <mat-icon>search</mat-icon>\n    </button>\n    <input matInput [formControlName]=\"field.name\" [(ngModel)]=\"field.value\" [placeholder]=\"field.label | uppercaseFirst\" size=\"10\"\n      [type]=\"field.inputType\">\n    <ng-container *ngFor=\"let validation of field.validations;\" ngProjectAs=\"mat-error\">\n      <mat-error *ngIf=\"group.get(field.name).hasError(validation.name)\">{{validation.message}}</mat-error>\n    </ng-container>\n  </mat-form-field>\n</div>\n\n<div *ngIf=\"this.field == undefined\">\n    <mat-form-field class=\"demo-full-width\">\n  <button class=\"btn-input-file\" mat-raised-button type=\"button\" color=\"primary\" (click)=\"openFilter()\">\n    <mat-icon>search</mat-icon>\n  </button>\n  <input matInput [placeholder]=\"placeholder | uppercaseFirst\" size=\"10\" disabled=\"true\" [value]=\"value\">\n</mat-form-field>\n</div>",
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
        onValueCallback: [{ type: Output }]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvcHh0LWlucHV0LWZpbHRlci9weHQtaW5wdXQtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQWMsTUFBTSxFQUFFLFlBQVksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFHN0csT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQTJCNUMsb0RBQW9EO0lBRXBELGlDQUFtQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXOzBCQVh2QixJQUFJOzJCQUdlLEdBQUc7K0JBQ1ksSUFBSSxZQUFZLEVBQUU7cUJBQy9DLEVBQUU7S0FNcUI7Ozs7O0lBSXpDLDZDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLGlCQUFjLFNBQVMsSUFBSSxDQUFDLE9BQU8sY0FBVyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxjQUFXLFlBQVksQ0FBQztTQUNqRDtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sbUJBQWdCLFNBQVMsSUFBSSxDQUFDLE9BQU8sZ0JBQWEsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sZ0JBQWEsWUFBWSxDQUFDO1NBQ3JEO0tBQ0Y7Ozs7SUFFRCwwQ0FBUTs7O0lBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUMvQjtLQUNGO0lBRUQ7Ozs7Ozs7Ozs7Ozs7SUFhQTtJQUNBLDBDQUEwQzs7OztJQUMxQyw0Q0FBVTs7O0lBQVY7UUFBQSxpQkEyQkM7UUExQkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7WUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Z0JBQ3pELEtBQUssRUFBRSxPQUFPO2dCQUNkLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFO2FBQ3JKLENBQUMsQ0FBQztZQUNILFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDbEM7YUFDRixDQUFDLENBQUM7U0FDSjtRQUFBLElBQUksQ0FBQyxDQUFDOztZQUNMLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO2dCQUN6RCxLQUFLLEVBQUUsT0FBTztnQkFDZCxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsSUFBSSxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLGVBQWUsR0FBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRTthQUMzRixDQUFDLENBQUM7WUFDSCxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtnQkFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ25DO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7S0FFRjs7Z0JBL0VGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwwNkRBQWdEOztpQkFHakQ7Ozs7Z0JBaEJRLFNBQVM7Ozs0QkFvQmYsS0FBSzs4QkFDTCxLQUFLO2tDQUNMLE1BQU07O2tDQTFCVDs7U0FxQmEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0RGlhbG9nRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vcHh0LWRpYWxvZy9weHQtZGlhbG9nLWZpbHRlci9weHQtZGlhbG9nLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHh0RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3B4dC1maWVsZC1jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbi8qXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQeHRJbnB1dEZpbHRlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1pbnB1dC1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWlucHV0LWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1pbnB1dC1maWx0ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgLy9wcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUHh0SW5wdXRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0Rpc2FibGVkID0gdHJ1ZTtcbiAgYXV0bzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xhc3NOYW1lIDpTdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyIDogU3RyaW5nID0gXCIgXCI7XG4gIEBPdXRwdXQoKSBvblZhbHVlQ2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgdmFsdWUgOiBTdHJpbmcgPSBcIlwiO1xuICBmaWVsZDogUHh0RmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgLy9wcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuIFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHsgfVxuXG5cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY2xhc3NOYW1lICE9IHVuZGVmaW5lZCAmJiAhY2hhbmdlcy5jbGFzc05hbWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2hhbmdlcy5jbGFzc05hbWUuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wbGFjZWhvbGRlciAhPSB1bmRlZmluZWQgJiYgIWNoYW5nZXMucGxhY2Vob2xkZXIuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjaGFuZ2VzLnBsYWNlaG9sZGVyLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgZ2V0IGlucHV0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cblxuICBzZXQgaW5wdXRWYWx1ZShmOiBhbnkpIHtcbiAgICBpZiAoZiAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChmICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBmO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZik7XG4gICAgICB9XG4gICAgfVxuICB9XG4qL1xuICAvL01ldGhvZCByZXNwb3NpYmxlIGZvciBvcGVuIGRpYWxvZyBmaWx0ZXJcbiAgb3BlbkZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWVsZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZC5maWx0ZXJzICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hdXRvID0gdHJ1ZTtcbiAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCwge1xuICAgICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgICAgcGFuZWxDbGFzczogJ3B4dC1kaWFsb2cnLFxuICAgICAgICBkYXRhOiB7IGF1dG86IHRoaXMuYXV0bywgZmlsdGVyczogdGhpcy5maWVsZC5maWx0ZXJzLCBjb250cm9sbGVyOiB0aGlzLmZpZWxkLmNsYXNzTmFtZSwgdGl0bGVEaWFsb2c6IFwiU2VsZWNpb25lOiAoIFwiICsgdGhpcy5maWVsZC5jbGFzc05hbWUgKyBcIiApXCIgfVxuICAgICAgfSk7XG4gICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5maWVsZC52YWx1ZSA9IHJlc3VsdC5jb2RpZ287XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1lbHNlIHtcbiAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFB4dERpYWxvZ0ZpbHRlckNvbXBvbmVudCwge1xuICAgICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgICAgcGFuZWxDbGFzczogJ3B4dC1kaWFsb2cnLFxuICAgICAgICBkYXRhOiB7Y29udHJvbGxlcjogdGhpcy5jbGFzc05hbWUsIHRpdGxlRGlhbG9nOiBcIlNlbGVjaW9uZTogKCBcIiArICB0aGlzLmNsYXNzTmFtZSArIFwiIClcIiB9XG4gICAgICB9KTtcbiAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LmRlc2NyaWNhbztcbiAgICAgICAgICB0aGlzLm9uVmFsdWVDYWxsYmFjay5lbWl0KHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG59XG4iXX0=