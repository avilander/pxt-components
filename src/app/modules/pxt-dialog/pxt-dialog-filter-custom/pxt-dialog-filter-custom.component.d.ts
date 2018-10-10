import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { RequestBaseService } from '../../../services/pxt-http/request-base.service';
export declare class PxtDialogFilterCustomComponent implements OnInit {
    private fb;
    private dialogRef;
    data: any;
    http: RequestBaseService;
    filters: any;
    model: any;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    constructor(fb: FormBuilder, dialogRef: MatDialogRef<PxtDialogFilterCustomComponent>, data: any, http: RequestBaseService);
    ngOnInit(): void;
    search(): void;
    selectRow(row: any): void;
    close(): void;
}
