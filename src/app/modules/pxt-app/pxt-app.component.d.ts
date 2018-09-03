import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { PxtContentBody } from '../../directives/pxt-content-body';
import { Routes } from '@angular/router';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
export declare class PxtAppComponent {
    componentFactoryResolver: ComponentFactoryResolver;
    pxtAppComponentService: PxtAppComponentService;
    routes: Routes[];
    submenus: any[];
    menuSelected: string;
    _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    shouldRun: boolean;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, componentFactoryResolver: ComponentFactoryResolver, pxtAppComponentService: PxtAppComponentService);
    ngOnDestroy(): void;
    fillerNav: string[];
    currentAdIndex: number;
    adHost: PxtContentBody;
    interval: any;
    ngOnInit(): void;
    loadComponent(route: any): void;
    subscribeComponent(): void;
    selectItemMenu(nav: any): void;
}
