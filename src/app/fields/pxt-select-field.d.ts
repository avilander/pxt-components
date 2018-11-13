import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class PxtSelectField implements PxtFieldConfig {
    position: number;
    label?: string;
    name?: string;
    inputType?: string;
    className?: any;
    options?: string[];
    type: string;
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
    parameter?: any;
}
