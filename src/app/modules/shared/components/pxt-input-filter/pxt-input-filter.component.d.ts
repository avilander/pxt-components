import { OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { PxtFieldConfig } from '../../../../interfaces/pxt-field-config';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
export declare class PxtInputFilterComponent implements OnInit {
    dialog: MatDialog;
    isDisabled: boolean;
    auto: boolean;
    className: String;
    placeholder: String;
    displayedColumns: any[];
    onValueCallback: EventEmitter<any>;
    value: String;
    field: PxtFieldConfig;
    group: FormGroup;
    constructor(dialog: MatDialog);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    openFilter(): void;
}
