import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class PxtfilterCustomField implements PxtFieldConfig {
    position: number;
    label?: string;
    name?: string;
    className?: any;
    inputType?: string;
    filters?: any;
    type: string;
    value?: any;
    colspan?: number;
    disabled?: boolean;
    validations?: Validator[];
}
