import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { PxtContentBody } from '../../directives/pxt-content-body';
import { Routes } from '@angular/router';
export declare class PxtAppComponent {
    private componentFactoryResolver;
    menuTitle: string;
    _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    shouldRun: boolean;
    ROUTES: Routes;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, componentFactoryResolver: ComponentFactoryResolver);
    ngOnDestroy(): void;
    fillerNav: string[];
    currentAdIndex: number;
    adHost: PxtContentBody;
    interval: any;
    ngOnInit(): void;
    loadComponent(route: any): void;
    selectItemMenu(nav: any): void;
}
