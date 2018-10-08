import { ComponentFactoryResolver, OnInit, ViewContainerRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../interfaces/field.interface";
export declare class DynamicFieldDirective implements OnInit {
    private resolver;
    private container;
    field: FieldConfig;
    group: FormGroup;
    componentRef: any;
    constructor(resolver: ComponentFactoryResolver, container: ViewContainerRef);
    ngOnInit(): void;
}
