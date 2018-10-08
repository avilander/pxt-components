import { OnInit } from '@angular/core';
import { FieldConfig } from '../../../../interfaces/field.interface';
import { FormGroup } from '@angular/forms';
export declare class PxtInputComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    constructor();
    ngOnInit(): void;
}
