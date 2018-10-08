import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { HttpHelperService } from '../../../services/pxt-http/http-helper-service';
import { RequestBaseService } from '../../../services/pxt-http/request-base.service';
import { PxtFieldConfig } from '../../../interfaces/pxt-field-config';
export declare class PxtDialogFilterComponent implements OnInit {
    private fb;
    private dialogRef;
    data: any;
    helper: HttpHelperService;
    http: RequestBaseService<any>;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    controller: string;
    fields: PxtFieldConfig[];
    auto: boolean;
    filter: {
        code: any;
        description: any;
    };
    field: PxtFieldConfig;
    form: FormGroup;
    readonly value: any;
    constructor(fb: FormBuilder, dialogRef: MatDialogRef<PxtDialogFilterComponent>, data: any, helper: HttpHelperService, http: RequestBaseService<any>);
    ngOnInit(): void;
    cancelation(): void;
    confirmation(event: any): void;
    search(): void;
    ngAfterViewInit(): void;
    selectRow(row: any): void;
    createControl(): FormGroup;
    bindValidations(validations: any): any;
    validateAllFormFields(formGroup: FormGroup): void;
    close(): void;
}
