import { OnInit } from '@angular/core';
import { PxtFieldConfig } from '../../../../interfaces/pxt-field-config';
import { FormGroup } from '@angular/forms';
export declare class PxtCheckboxComponent implements OnInit {
    field: PxtFieldConfig;
    group: FormGroup;
    constructor();
    ngOnInit(): void;
}
