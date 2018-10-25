/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpHelperService } from '../../../services/pxt-http/http-helper-service';
import { RequestBaseService } from '../../../services/pxt-http/request-base.service';
import { pxtInputField } from '../../../fields/pxt-input-field';
import { pxtCheckboxField } from '../../../fields/pxt-checkbox-field';
import { pxtDateField } from '../../../fields/pxt-date-field';
import { pxtFilterField } from '../../../fields/pxt-filter-field';
import { pxtSelectField } from '../../../fields/pxt-select-field';
import { pxtRadioButtonField } from '../../../fields/pxt-radiobutton-field';
import { pxtfilterCustomField } from '../../../fields/pxt-filter-custom-field';
var PxtDialogFilterComponent = /** @class */ (function () {
    function PxtDialogFilterComponent(fb, dialogRef, data, helper, http) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.helper = helper;
        this.http = http;
        this.displayedColumns = ['codigo', 'descricao'];
        this.dataSource = new MatTableDataSource();
        this.controller = "";
        this.cols = 2;
        this.fields = [];
        this.fieldsHist = [];
        this.filter = { code: undefined, description: undefined };
        this.controller = data.controller;
    }
    Object.defineProperty(PxtDialogFilterComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.form.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.auto = this.data.auto;
        if (this.auto) {
            this.field = this.data.filters;
            Object.keys(this.field).forEach(function (key) {
                switch (_this.field[key].constructor.name) {
                    case pxtfilterCustomField.name:
                        /** @type {?} */
                        var instanceFilterCustom = /** @type {?} */ (_this.field[key]);
                        instanceFilterCustom.type = 'filter';
                        _this.fields.push(instanceFilterCustom);
                        _this.fieldsHist.push(instanceFilterCustom);
                        break;
                    //Input
                    case pxtInputField.name:
                        /** @type {?} */
                        var instanceInput = /** @type {?} */ (_this.field[key]);
                        instanceInput.type = 'input';
                        _this.fields.push(instanceInput);
                        _this.fieldsHist.push(instanceInput);
                        break;
                    //Checkbox
                    case pxtCheckboxField.name:
                        /** @type {?} */
                        var instanceCheck = /** @type {?} */ (_this.field[key]);
                        instanceCheck.type = 'checkbox';
                        _this.fields.push(instanceCheck);
                        _this.fieldsHist.push(instanceCheck);
                        break;
                    //Date
                    case pxtDateField.name:
                        /** @type {?} */
                        var instanceDate = /** @type {?} */ (_this.field[key]);
                        instanceDate.type = 'date';
                        _this.fields.push(instanceDate);
                        _this.fieldsHist.push(instanceDate);
                        break;
                    //Filter
                    case pxtFilterField.name:
                        /** @type {?} */
                        var instanceFilter = /** @type {?} */ (_this.field[key]);
                        instanceFilter.type = 'filter';
                        _this.fields.push(instanceFilter);
                        _this.fieldsHist.push(instanceFilter);
                        break;
                    //RadioButton
                    case pxtRadioButtonField.name:
                        /** @type {?} */
                        var instanceRadio = /** @type {?} */ (_this.field[key]);
                        instanceRadio.type = 'radio';
                        _this.fields.push(instanceRadio);
                        _this.fieldsHist.push(instanceRadio);
                        break;
                    //Select
                    case pxtSelectField.name:
                        /** @type {?} */
                        var instanceSelect = /** @type {?} */ (_this.field[key]);
                        instanceSelect.type = 'select';
                        _this.fields.push(instanceSelect);
                        _this.fieldsHist.push(instanceSelect);
                        break;
                }
            });
            this.fields.sort(function (a, b) {
                if (a.position < b.position)
                    return -1;
                if (a.position > b.position)
                    return 1;
                if (a.position < b.position)
                    return -1;
                if (a.position > b.position)
                    return 1;
                return 0;
            });
            this.fieldsHist.sort(function (a, b) {
                if (a.position < b.position)
                    return -1;
                if (a.position > b.position)
                    return 1;
                if (a.position < b.position)
                    return -1;
                if (a.position > b.position)
                    return 1;
                return 0;
            });
            this.form = this.createControl();
        }
        else {
            if (this.data.displayedColumns != undefined) {
                this.displayedColumns = this.data.displayedColumns;
            }
        }
    };
    /**
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.cancelation = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(undefined);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.confirmation = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dialogRef.close(true);
    };
    //Search.
    /**
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.search = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var params = new Map();
        debugger;
        if (this.data.auto != undefined && this.data.auto) {
            if (this.form.value !== undefined) {
                Object.keys(this.form.value).forEach(function (key) {
                    if (_this.form.value[key] != undefined) {
                        params.set(key, _this.form.value[key]);
                    }
                });
            }
            this.http.doGet(this.controller, params).subscribe(function (result) {
                _this.dataSource.data = result;
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            });
        }
        else {
            if (this.filter.code != undefined && this.filter.code != 0 && this.filter.code != "") {
                params.set("codigo", this.filter.code);
            }
            if (this.filter.description != undefined && this.filter.description != "") {
                params.set("descricao", this.filter.description);
            }
            this.http.doGet(this.controller, params).subscribe(function (result) {
                _this.dataSource.data = result;
            });
        }
    };
    ;
    /**
     * @param {?} row
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.selectRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.dialogRef.close(row);
    };
    ;
    // Method responsible for create control
    /**
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.createControl = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var group = this.fb.group({});
        this.fields.forEach(function (field) {
            if (field.type === "button")
                return;
            /** @type {?} */
            var control = _this.fb.control({ value: field.value, disabled: field.disabled }, _this.bindValidations(field.validations || []));
            group.addControl(field.name, control);
        });
        return group;
    };
    ;
    /**
     * @param {?} validations
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.bindValidations = /**
     * @param {?} validations
     * @return {?}
     */
    function (validations) {
        if (validations.length > 0) {
            /** @type {?} */
            var validList_1 = [];
            validations.forEach(function (valid) {
                validList_1.push(valid.validator);
            });
            return Validators.compose(validList_1);
        }
        return null;
    };
    ;
    /**
     * @param {?} formGroup
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.validateAllFormFields = /**
     * @param {?} formGroup
     * @return {?}
     */
    function (formGroup) {
        Object.keys(formGroup.controls).forEach(function (field) {
            /** @type {?} */
            var control = formGroup.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    };
    ;
    /**
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(undefined);
    };
    ;
    /**
     * @return {?}
     */
    PxtDialogFilterComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    PxtDialogFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-dialog-filter',
                    template: "<div class=\"example-container\">\n  <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8 height-toolbar\">\n    <h1 style=\"margin-left: 8px; font-weight: bold\">{{data.titleDialog}}</h1>\n\n    <span class=\"example-spacer\"></span>\n    <button mat-icon-button (click)=\"close()\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n  </mat-toolbar>\n\n  <mat-toolbar color=\"primary\" class=\"mat-toolbar-submenu\">\n    <a mat-button (click)=\"search()\">\n      <mat-icon>search</mat-icon> Pesquisar\n    </a>\n  </mat-toolbar>\n  <mat-dialog-content>\n    <mat-card>\n      <div *ngIf=\"!auto\">\n          <mat-grid-list class=\"mat-grid-tile-content\" [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile [colspan]='1'>\n              <mat-form-field>\n                <input type=\"number\" matInput placeholder=\"Codigo\" [(ngModel)]=\"filter.code\">\n              </mat-form-field>\n            </mat-grid-tile>\n            <mat-grid-tile  class=\"mat-grid-tile-content\" [colspan]='1'>\n              <mat-form-field>\n                <input matInput placeholder=\"Descri\u00E7\u00E3o\" [(ngModel)]=\"filter.description\">\n              </mat-form-field>\n            </mat-grid-tile>\n          </mat-grid-list>\n      </div>\n\n      <div *ngIf=\"auto\">\n        <form [formGroup]=\"form\" class=\"dynamic-form\">\n          <mat-grid-list [cols]=\"cols\" rowHeight=\"5:1\">\n            <mat-grid-tile class=\"mat-grid-tile-content\" *ngFor=\"let field of fields;\" [colspan]='field.colspan'>\n              <ng-container dynamicFieldDialog [field]=\"field\" [group]=\"form\">\n              </ng-container>\n            </mat-grid-tile>\n            <mat-grid-tile class=\"mat-grid-tile-content\">\n            </mat-grid-tile>\n          </mat-grid-list>\n        </form>\n      </div>\n      <mat-table #table [dataSource]=\"dataSource\" class=\"striped centered\" matSort>\n\n          <ng-container *ngFor=\"let column of displayedColumns\" [matColumnDef]=\"column\">\n              <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> {{column}} </mat-header-cell>\n              <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\">{{item[column]}} </mat-cell>\n            </ng-container>\n        <!--\n        <ng-container matColumnDef=\"codigo\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"mat-row-custom-id\"> C\u00F3digo </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"mat-row-custom-id\"> {{item.codigo}} </mat-cell>\n        </ng-container>\n        <ng-container matColumnDef=\"descricao\">\n          <mat-header-cell *matHeaderCellDef mat-sort-header class=\"my-mat-header-cell-size-custom\"> Descri\u00E7\u00E3o </mat-header-cell>\n          <mat-cell *matCellDef=\"let item\" class=\"my-mat-header-cell-size-custom\"> {{item.descricao}} </mat-cell>\n        </ng-container>\n             -->\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"mat-row-custom\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" class=\"pointer-cursor mat-row-custom\" (click)=\"selectRow(row)\"></mat-row>\n \n      </mat-table>\n   \n      <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\">\n      </mat-paginator>\n    </mat-card>\n  </mat-dialog-content>\n</div>",
                    styles: [".td-id{width:5%}.mat-toolbar-submenu{height:20%!important}.height-toolbar{height:45px!important}.example-container>.example-toolbar{background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}.example-is-mobile .example-toolbar{position:fixed;background:linear-gradient(0deg,navy,#3f51b5 58%,#3f51b5 80%,#3f51b5)}mat-form-field{width:100%;height:100%}.mat-dialog-container{padding:0!important}.mat-dialog-content{padding:inherit!important;margin:inherit!important;max-height:inherit}.example-spacer{flex:1 1 auto}"]
                }] }
    ];
    /** @nocollapse */
    PxtDialogFilterComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
        { type: HttpHelperService },
        { type: RequestBaseService }
    ]; };
    PxtDialogFilterComponent.propDecorators = {
        paginator: [{ type: ViewChild, args: [MatPaginator,] }],
        sort: [{ type: ViewChild, args: [MatSort,] }]
    };
    return PxtDialogFilterComponent;
}());
export { PxtDialogFilterComponent };
if (false) {
    /** @type {?} */
    PxtDialogFilterComponent.prototype.displayedColumns;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.dataSource;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.controller;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.cols;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.fields;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.fieldsHist;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.auto;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.filter;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.field;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.form;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.paginator;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.sort;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.fb;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.dialogRef;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.data;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.helper;
    /** @type {?} */
    PxtDialogFilterComponent.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3B4dC1kaWFsb2cvcHh0LWRpYWxvZy1maWx0ZXIvcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBUyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBYSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0csT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDbkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFHckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztJQStCN0Usa0NBQ1UsSUFDQSxXQUN3QixJQUFTLEVBQ2xDLFFBQ0E7UUFKQyxPQUFFLEdBQUYsRUFBRTtRQUNGLGNBQVMsR0FBVCxTQUFTO1FBQ2UsU0FBSSxH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SyxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzNDLENBQUMsQ0FBQztLQUNKO0lBQUEsQ0FBQzs7OztJQUVGLHdDQUFLOzs7SUFBTDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2pDO0lBQUEsQ0FBQzs7OztJQUNGLGtEQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQzs7Z0JBcE1GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixxMkdBQWlEOztpQkFFbEQ7Ozs7Z0JBckIrQixXQUFXO2dCQUNsQyxZQUFZO2dEQTZDaEIsTUFBTSxTQUFDLGVBQWU7Z0JBNUNsQixpQkFBaUI7Z0JBQ2pCLGtCQUFrQjs7OzRCQWdDeEIsU0FBUyxTQUFDLFlBQVk7dUJBQ3RCLFNBQVMsU0FBQyxPQUFPOzttQ0FyQ3BCOztTQXVCYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEsIE1hdFRhYmxlRGF0YVNvdXJjZSwgTWF0U29ydCwgTWF0UGFnaW5hdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9odHRwLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9weHQtZmllbGQtY29uZmlnJztcblxuaW1wb3J0IHsgcHh0SW5wdXRGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHsgcHh0Q2hlY2tib3hGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtY2hlY2tib3gtZmllbGQnO1xuaW1wb3J0IHsgcHh0RGF0ZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1kYXRlLWZpZWxkJztcbmltcG9ydCB7IHB4dEZpbHRlckZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1maWx0ZXItZmllbGQnO1xuaW1wb3J0IHsgcHh0U2VsZWN0RmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZHMvcHh0LXNlbGVjdC1maWVsZCc7XG5pbXBvcnQgeyBweHRSYWRpb0J1dHRvbkZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZmllbGRzL3B4dC1yYWRpb2J1dHRvbi1maWVsZCc7XG5pbXBvcnQgeyBweHRmaWx0ZXJDdXN0b21GaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkcy9weHQtZmlsdGVyLWN1c3RvbS1maWVsZCc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnc2VsZW5pdW0td2ViZHJpdmVyL2h0dHAnO1xuXG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1kaWFsb2ctZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1kaWFsb2ctZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LWRpYWxvZy1maWx0ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGRpc3BsYXllZENvbHVtbnMgPSBbJ2NvZGlnbycsICdkZXNjcmljYW8nXTtcbiAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8YW55PigpO1xuICBjb250cm9sbGVyID0gXCJcIjtcbiAgY29scyA9IDI7XG4gIGZpZWxkczogUHh0RmllbGRDb25maWdbXSA9IFtdO1xuICBmaWVsZHNIaXN0OiBQeHRGaWVsZENvbmZpZ1tdID0gW107XG4gIGF1dG86IGJvb2xlYW47XG4gIGZpbHRlciA9IHsgY29kZTogdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogdW5kZWZpbmVkIH07XG4gIGZpZWxkOiBQeHRGaWVsZENvbmZpZztcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcblxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxQeHREaWFsb2dGaWx0ZXJDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBodHRwOiBSZXF1ZXN0QmFzZVNlcnZpY2UpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBkYXRhLmNvbnRyb2xsZXI7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdXRvID0gdGhpcy5kYXRhLmF1dG87XG4gICAgaWYgKHRoaXMuYXV0bykge1xuICAgICAgdGhpcy5maWVsZCA9IHRoaXMuZGF0YS5maWx0ZXJzO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5maWVsZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRba2V5XS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgY2FzZSBweHRmaWx0ZXJDdXN0b21GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyQ3VzdG9tID0gPHB4dGZpbHRlckN1c3RvbUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlRmlsdGVyQ3VzdG9tLnR5cGUgPSAnZmlsdGVyJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VGaWx0ZXJDdXN0b20pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy9JbnB1dFxuICAgICAgICAgIGNhc2UgcHh0SW5wdXRGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlSW5wdXQgPSA8cHh0SW5wdXRGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUlucHV0LnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZUlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlSW5wdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvL0NoZWNrYm94XG4gICAgICAgICAgY2FzZSBweHRDaGVja2JveEZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VDaGVjayA9IDxweHRDaGVja2JveEZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlQ2hlY2sudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlQ2hlY2spO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VDaGVjayk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vRGF0ZVxuICAgICAgICAgIGNhc2UgcHh0RGF0ZUZpZWxkLm5hbWU6XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VEYXRlID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goaW5zdGFuY2VEYXRlKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vRmlsdGVyXG4gICAgICAgICAgY2FzZSBweHRGaWx0ZXJGaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlRmlsdGVyID0gPHB4dERhdGVGaWVsZD50aGlzLmZpZWxkW2tleV07XG4gICAgICAgICAgICBpbnN0YW5jZUZpbHRlci50eXBlID0gJ2ZpbHRlcic7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzSGlzdC5wdXNoKGluc3RhbmNlRmlsdGVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy9SYWRpb0J1dHRvblxuICAgICAgICAgIGNhc2UgcHh0UmFkaW9CdXR0b25GaWVsZC5uYW1lOlxuICAgICAgICAgICAgdmFyIGluc3RhbmNlUmFkaW8gPSA8cHh0RGF0ZUZpZWxkPnRoaXMuZmllbGRba2V5XTtcbiAgICAgICAgICAgIGluc3RhbmNlUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGluc3RhbmNlUmFkaW8pO1xuICAgICAgICAgICAgdGhpcy5maWVsZHNIaXN0LnB1c2goaW5zdGFuY2VSYWRpbyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvL1NlbGVjdFxuICAgICAgICAgIGNhc2UgcHh0U2VsZWN0RmllbGQubmFtZTpcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVNlbGVjdCA9IDxweHREYXRlRmllbGQ+dGhpcy5maWVsZFtrZXldO1xuICAgICAgICAgICAgaW5zdGFuY2VTZWxlY3QudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkc0hpc3QucHVzaChpbnN0YW5jZVNlbGVjdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmZpZWxkcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZmllbGRzSGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbikgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA+IGIucG9zaXRpb24pIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24pIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlQ29udHJvbCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuZGlzcGxheWVkQ29sdW1ucyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5kYXRhLmRpc3BsYXllZENvbHVtbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsYXRpb24oKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodW5kZWZpbmVkKTtcbiAgfVxuICBjb25maXJtYXRpb24oZXZlbnQpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgfVxuXG4gIC8vU2VhcmNoLlxuICBzZWFyY2goKSB7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBNYXA8YW55LCBhbnk+KCk7XG4gICAgZGVidWdnZXI7XG4gICAgaWYgKHRoaXMuZGF0YS5hdXRvICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuYXV0bykge1xuICAgICAgaWYgKHRoaXMuZm9ybS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybS52YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmZvcm0udmFsdWVba2V5XSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5zZXQoa2V5LCB0aGlzLmZvcm0udmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5odHRwLmRvR2V0KHRoaXMuY29udHJvbGxlciwgcGFyYW1zKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSByZXN1bHQ7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZmlsdGVyLmNvZGUgIT0gdW5kZWZpbmVkICYmIHRoaXMuZmlsdGVyLmNvZGUgIT0gMCAmJiB0aGlzLmZpbHRlci5jb2RlICE9IFwiXCIpIHtcbiAgICAgICAgcGFyYW1zLnNldChcImNvZGlnb1wiLCB0aGlzLmZpbHRlci5jb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmZpbHRlci5kZXNjcmlwdGlvbiAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWx0ZXIuZGVzY3JpcHRpb24gIT0gXCJcIikge1xuICAgICAgICBwYXJhbXMuc2V0KFwiZGVzY3JpY2FvXCIsIHRoaXMuZmlsdGVyLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaHR0cC5kb0dldCh0aGlzLmNvbnRyb2xsZXIsIHBhcmFtcykuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNlbGVjdFJvdyhyb3cpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShyb3cpO1xuICB9O1xuICAvLyBNZXRob2QgcmVzcG9uc2libGUgZm9yIGNyZWF0ZSBjb250cm9sXG4gIGNyZWF0ZUNvbnRyb2woKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSBcImJ1dHRvblwiKSByZXR1cm47XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5mYi5jb250cm9sKFxuICAgICAgICB7IHZhbHVlOiBmaWVsZC52YWx1ZSwgZGlzYWJsZWQ6IGZpZWxkLmRpc2FibGVkIH0sXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb25zKGZpZWxkLnZhbGlkYXRpb25zIHx8IFtdKVxuICAgICAgKTtcbiAgICAgIGdyb3VwLmFkZENvbnRyb2woZmllbGQubmFtZSwgY29udHJvbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9O1xuXG4gIGJpbmRWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogYW55KTogYW55IHtcbiAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdmFsaWRMaXN0ID0gW107XG4gICAgICB2YWxpZGF0aW9ucy5mb3JFYWNoKHZhbGlkID0+IHtcbiAgICAgICAgdmFsaWRMaXN0LnB1c2godmFsaWQudmFsaWRhdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZExpc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoZm9ybUdyb3VwOiBGb3JtR3JvdXApIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZmllbGQpO1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodW5kZWZpbmVkKTtcbiAgfTtcbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgfVxufVxuIl19