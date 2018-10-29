import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
export declare class PxtDialogComponent implements OnInit {
    private fb;
    private dialogRef;
    data: any;
    placeholder: string;
    constructor(fb: FormBuilder, dialogRef: MatDialogRef<PxtDialogComponent>, data: any);
    ngOnInit(): void;
    cancelation(): void;
    confirmation(): void;
}
