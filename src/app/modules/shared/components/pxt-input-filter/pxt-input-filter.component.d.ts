import { OnInit } from '@angular/core';
import { PxtFieldConfig } from '../../../../interfaces/pxt-field-config';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
export declare class PxtInputFilterComponent implements OnInit {
    dialog: MatDialog;
    isDisabled: boolean;
    auto: boolean;
    field: PxtFieldConfig;
    group: FormGroup;
    value: "";
    constructor(dialog: MatDialog);
    ngOnInit(): void;
    openFilter(): void;
}
