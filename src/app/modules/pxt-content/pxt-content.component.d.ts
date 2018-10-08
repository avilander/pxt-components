import { EventEmitter } from '@angular/core';
import { AdComponent } from '../../interfaces/ad.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PxtFieldConfig } from '../../interfaces/pxt-field-config';
export declare class PxtContentComponent implements AdComponent {
    fb: FormBuilder;
    data: any;
    auto?: boolean;
    fields: PxtFieldConfig[];
    cols: number;
    field: any;
    colsInitial: number;
    submit: EventEmitter<any>;
    form: FormGroup;
    readonly value: any;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    onSubmit(event: Event): void;
    createControl(): FormGroup;
    bindValidations(validations: any): any;
    validateAllFormFields(formGroup: FormGroup): void;
    screenWidth: any;
    onResize(event?: any): void;
}
