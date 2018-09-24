import { OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class PxtDatepickerComponent implements OnInit, ControlValueAccessor {
    placeholder: String;
    minDate: Date;
    maxDate: Date;
    inputDisabled: boolean;
    onChange: EventEmitter<boolean>;
    dateModel: Date;
    private onTouchedCallback;
    private onChangeCallback;
    dataSelecionada: Date;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    constructor();
    ngOnInit(): void;
    onDateChange(): void;
    clear(): void;
}
