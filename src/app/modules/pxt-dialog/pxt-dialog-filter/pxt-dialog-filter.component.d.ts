import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpHelperService } from '../../../services/pxt-http/http-helper-service';
import { RequestBaseService } from '../../../services/pxt-http/request-base.service';
import { PxtFieldConfig } from '../../../interfaces/pxt-field-config';
export declare class PxtDialogFilterComponent implements OnInit {
    private fb;
    private dialogRef;
    data: any;
    helper: HttpHelperService;
    http: RequestBaseService;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    controller: string;
    cols: number;
    fields: PxtFieldConfig[];
    fieldsHist: PxtFieldConfig[];
    auto: boolean;
    filter: {
        code: any;
        description: any;
    };
    field: PxtFieldConfig;
    form: FormGroup;
    paginator: MatPaginator;
    sort: MatSort;
    readonly value: any;
    constructor(fb: FormBuilder, dialogRef: MatDialogRef<PxtDialogFilterComponent>, data: any, helper: HttpHelperService, http: RequestBaseService);
    ngOnInit(): void;
    cancelation(): void;
    confirmation(event: any): void;
    search(): void;
    selectRow(row: any): void;
    createControl(): FormGroup;
    bindValidations(validations: any): any;
    validateAllFormFields(formGroup: FormGroup): void;
    close(): void;
    ngAfterViewInit(): void;
}
