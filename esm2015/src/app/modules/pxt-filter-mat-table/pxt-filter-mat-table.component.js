/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
export class PxtFilterMatTableComponent {
    constructor() {
        this.dataSource = new MatTableDataSource();
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.filters = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    add(event) {
        /** @type {?} */
        const input = event.input;
        /** @type {?} */
        const value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.filters = [];
            this.filters.push({ name: value.trim() });
            this.applyFilter(value);
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    applyFilter(filter) {
        filter = filter.trim();
        filter = filter.toLowerCase();
        this.dataSource.filter = filter;
    }
    /**
     * @param {?} fruit
     * @return {?}
     */
    remove(fruit) {
        /** @type {?} */
        const index = this.filters.indexOf(fruit);
        if (index >= 0) {
            this.filters.splice(index, 1);
        }
        this.applyFilter('');
    }
    /**
     * @return {?}
     */
    configureFilterPredicate() {
        this.dataSource.filterPredicate = (row, event) => (row.codigo.toString().indexOf(event) >= 0 ||
            row.nomeImagem.toString().indexOf(event) >= 0);
    }
}
PxtFilterMatTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-filter-mat-table',
                template: "<mat-card class=\"card-filter\" >\n    <div class=\"filters\">\n        <mat-form-field class=\"example-chip-list\">\n            <mat-chip-list #chipList>\n              <mat-chip *ngFor=\"let filter of filters\" [selectable]=\"selectable\"\n                       [removable]=\"removable\" (removed)=\"remove(filter)\">\n                {{filter.name}}\n                <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon>\n              </mat-chip>\n              <input [placeholder]=\"placeholder\"\n                     [matChipInputFor]=\"chipList\"\n                     [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n                     [matChipInputAddOnBlur]=\"addOnBlur\"\n                     (matChipInputTokenEnd)=\"add($event)\">\n            </mat-chip-list>\n          </mat-form-field>\n    </div>\n  </mat-card >",
                styles: [".card-filter{padding:initial!important}.filters{font-size:16px;padding-left:10px;padding-right:10px}mat-form-field{width:100%;height:100%}"]
            }] }
];
/** @nocollapse */
PxtFilterMatTableComponent.ctorParameters = () => [];
PxtFilterMatTableComponent.propDecorators = {
    dataSource: [{ type: Input }],
    placeholder: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.dataSource;
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.placeholder;
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.visible;
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.selectable;
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.removable;
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.addOnBlur;
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.separatorKeysCodes;
    /** @type {?} */
    PxtFilterMatTableComponent.prototype.filters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3B4dC1maWx0ZXItbWF0LXRhYmxlL3B4dC1maWx0ZXItbWF0LXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBa0IsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBcUIsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBT25ELE1BQU07SUFJSjswQkFGc0IsSUFBSSxrQkFBa0IsRUFBTzt1QkFPekMsSUFBSTswQkFDRCxJQUFJO3lCQUNMLElBQUk7eUJBQ0osSUFBSTtrQ0FDd0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO3VCQUNyQyxFQUFFO0tBVkY7Ozs7SUFFakIsUUFBUTtLQUNQOzs7OztJQVNELEdBQUcsQ0FBQyxLQUF3Qjs7UUFDMUIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzs7UUFDMUIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzs7UUFHMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6Qjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbEI7S0FDRjs7Ozs7SUFFRCxXQUFXLENBQUMsTUFBYztRQUN4QixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ2pDOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFVOztRQUNmLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN0Qjs7OztJQUdELHdCQUF3QjtRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUMvQyxDQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0MsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FFbEQ7OztZQTFERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsKzFCQUFvRDs7YUFFckQ7Ozs7O3lCQUdFLEtBQUs7MEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRDaGlwSW5wdXRFdmVudCwgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtDT01NQSwgRU5URVJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1maWx0ZXItbWF0LXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1maWx0ZXItbWF0LXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWZpbHRlci1tYXQtdGFibGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRGaWx0ZXJNYXRUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8YW55PigpO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA6IFN0cmluZyA7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICB2aXNpYmxlID0gdHJ1ZTtcbiAgc2VsZWN0YWJsZSA9IHRydWU7XG4gIHJlbW92YWJsZSA9IHRydWU7XG4gIGFkZE9uQmx1ciA9IHRydWU7XG4gIHJlYWRvbmx5IHNlcGFyYXRvcktleXNDb2RlczogbnVtYmVyW10gPSBbRU5URVIsIENPTU1BXTtcbiAgZmlsdGVyczogYW55W10gPSBbXTtcblxuICBhZGQoZXZlbnQ6IE1hdENoaXBJbnB1dEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC5pbnB1dDtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnZhbHVlO1xuXG4gICAgLy8gQWRkIG91ciBmcnVpdFxuICAgIGlmICgodmFsdWUgfHwgJycpLnRyaW0oKSkge1xuICAgICAgdGhpcy5maWx0ZXJzID0gW107XG4gICAgICB0aGlzLmZpbHRlcnMucHVzaCh7bmFtZTogdmFsdWUudHJpbSgpfSk7XG4gICAgICB0aGlzLmFwcGx5RmlsdGVyKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBSZXNldCB0aGUgaW5wdXQgdmFsdWVcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgfSBcbiAgfVxuXG4gIGFwcGx5RmlsdGVyKGZpbHRlcjogc3RyaW5nKSB7XG4gICAgZmlsdGVyID0gZmlsdGVyLnRyaW0oKTtcbiAgICBmaWx0ZXIgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyO1xuICB9XG5cbiAgcmVtb3ZlKGZydWl0OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmlsdGVycy5pbmRleE9mKGZydWl0KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5maWx0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlGaWx0ZXIoJycpO1xuICB9XG5cblxuICBjb25maWd1cmVGaWx0ZXJQcmVkaWNhdGUoKSB7XG4gICAgdGhpcy5kYXRhU291cmNlLmZpbHRlclByZWRpY2F0ZSA9IChyb3csIGV2ZW50KSA9PlxuICAgICAgKCByb3cuY29kaWdvLnRvU3RyaW5nKCkuaW5kZXhPZihldmVudCkgPj0gMCB8fFxuICAgICAgcm93Lm5vbWVJbWFnZW0udG9TdHJpbmcoKS5pbmRleE9mKGV2ZW50KSA+PSAwKTtcblxuICB9XG5cbn1cbiJdfQ==