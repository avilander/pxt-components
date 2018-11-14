import { ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
export declare class RulesDirective {
    el: ElementRef;
    userService: UserService;
    rule: string;
    constructor(el: ElementRef, userService: UserService);
    ngAfterViewInit(): void;
    getRules(): string[];
}
