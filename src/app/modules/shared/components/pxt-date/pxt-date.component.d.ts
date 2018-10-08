import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PxtFieldConfig } from '../../../../interfaces/pxt-field-config';
export declare class PxtDateComponent implements OnInit {
    field: PxtFieldConfig;
    group: FormGroup;
    constructor();
    ngOnInit(): void;
}
