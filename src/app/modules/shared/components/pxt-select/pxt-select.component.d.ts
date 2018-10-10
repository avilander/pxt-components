import { OnInit } from '@angular/core';
import { PxtFieldConfig } from '../../../../interfaces/pxt-field-config';
import { FormGroup, ControlValueAccessor } from '@angular/forms';
import { RequestBaseService } from '../../../../services/pxt-http/request-base.service';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class PxtSelectComponent implements OnInit, ControlValueAccessor {
    pxthttp: RequestBaseService;
    required: boolean;
    placeholder: string;
    model: any;
    params: any;
    controller: string;
    auto: boolean;
    private onTouchedCallback;
    private onChangeCallback;
    field: PxtFieldConfig;
    group: FormGroup;
    option: any;
    options: any[];
    selectedOption: any;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    constructor(pxthttp: RequestBaseService);
    ngOnInit(): void;
    find(): void;
    ngAfterViewInit(): void;
}
