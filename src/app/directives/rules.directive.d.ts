import { ElementRef } from '@angular/core';
export declare class RulesDirective {
    el: ElementRef;
    rule: string;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    getRules(): string[];
}
