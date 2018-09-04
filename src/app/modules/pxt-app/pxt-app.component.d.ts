import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { PxtContentBody } from '../../directives/pxt-content-body';
export declare class PxtAppComponent {
    componentFactoryResolver: ComponentFactoryResolver;
    pxtAppComponentService: any;
    routes: any[];
    submenus: any[];
    system: String;
    urlImg: string;
    menuSelected: string;
    usuerLogged: string;
    _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    shouldRun: boolean;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, componentFactoryResolver: ComponentFactoryResolver, pxtAppComponentService: any);
    ngOnDestroy(): void;
    currentAdIndex: number;
    adHost: PxtContentBody;
    interval: any;
    ngOnInit(): void;
    loadComponent(route: any, adHost: any): void;
    subscribeComponent(): void;
    selectItemMenu(nav: any): void;
}
