import { OnInit } from '@angular/core';
export declare class PxtAppMenuItemComponent implements OnInit {
    pxtAppComponentService: any;
    items: any[];
    childMenu: any;
    constructor(pxtAppComponentService: any);
    ngOnInit(): void;
    loadComponent(child: any): void;
}
