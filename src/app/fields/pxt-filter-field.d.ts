import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class pxtFilterField implements PxtFieldConfig {
    position: number;
    label?: string;
    name?: string;
    className?: any;
    type: string;
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
}
