import { Validator } from "./field.interface";
export interface PxtFieldConfig {
    label?: string;
    name?: string;
    className?: any;
    inputType?: string;
    options?: string[];
    collections?: any;
    filters?: any;
    type?: string;
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
}
