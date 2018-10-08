import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { PxtDialogComponent } from '../pxt-dialog/pxt-dialog.component';
export declare class PxtFilterComponent implements OnInit {
    private fb;
    private dialogRef;
    data: any;
    constructor(fb: FormBuilder, dialogRef: MatDialogRef<PxtDialogComponent>, data: any);
    ngOnInit(): void;
}
