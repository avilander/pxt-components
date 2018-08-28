import { Directive, ViewContainerRef, ChangeDetectorRef, Component, Input, ViewChild, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtContentBody = /** @class */ (function () {
    function PxtContentBody(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    PxtContentBody.decorators = [
        { type: Directive, args: [{
                    selector: '[ad-pxt-content]',
                },] }
    ];
    /** @nocollapse */
    PxtContentBody.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return PxtContentBody;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtAppComponent = /** @class */ (function () {
    //= [
    // { path: 'portal-fornecedor/fornecedor', component: Teste1Component , data: { icon: 'accessibility', text: 'Padrão 1', active:false } },
    // { path: 'portal-fornecedor/produto', component: Teste2Component, data: { icon: 'dashboard', text: 'Padrão 2',  active:true } },
    //];
    function PxtAppComponent(changeDetectorRef, media, componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.menuTitle = "Menu Selecionado";
        this.shouldRun = true;
        this.fillerNav = Array.from({ length: 50 }, function (_, i) { return "Nav Item " + (i + 1); });
        this.currentAdIndex = -1;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    /**
     * @return {?}
     */
    PxtAppComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        clearInterval(this.interval);
    };
    /**
     * @return {?}
     */
    PxtAppComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} route
     * @return {?}
     */
    PxtAppComponent.prototype.loadComponent = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        this.menuTitle = route.data.text;
        /** @type {?} */
        var adItem = route;
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        /** @type {?} */
        var viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var componentRef = viewContainerRef.createComponent(componentFactory);
        //(<Teste1Component>componentRef.instance).data = adItem.data;
    };
    /**
     * @param {?} nav
     * @return {?}
     */
    PxtAppComponent.prototype.selectItemMenu = /**
     * @param {?} nav
     * @return {?}
     */
    function (nav) {
        console.log(nav);
        this.loadComponent(nav);
    };
    PxtAppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-app',
                    template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\" *ngIf=\"shouldRun\">\n\n  <mat-toolbar color=\"primary\" class=\"example-toolbar\">\n    <button mat-icon-button (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <h1 class=\"example-app-name\">{{menuTitle}}</h1>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [mode]=\"mobileQuery.matches ? 'over' : 'side'\" [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n\n      <mat-nav-list>\n        <a mat-list-item routerLink=\".\" (click)=\"selectItemMenu(nav)\" *ngFor=\"let nav of ROUTES\">\n          <mat-icon matListIcon>{{nav.data.icon}}</mat-icon>\n          <h3 matLine> {{nav.data.text}} </h3>\n        </a>\n      </mat-nav-list>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n</div>\n<div *ngIf=\"!shouldRun\">Please open on Stackblitz to see result</div>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PxtAppComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: MediaMatcher },
        { type: ComponentFactoryResolver }
    ]; };
    PxtAppComponent.propDecorators = {
        ROUTES: [{ type: Input }],
        adHost: [{ type: ViewChild, args: [PxtContentBody,] }]
    };
    return PxtAppComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MaterialAngularModule = /** @class */ (function () {
    function MaterialAngularModule() {
    }
    MaterialAngularModule.decorators = [
        { type: NgModule, args: [{
                    exports: [
                        CdkTableModule,
                        CdkTreeModule,
                        MatAutocompleteModule,
                        MatBadgeModule,
                        MatBottomSheetModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatChipsModule,
                        MatStepperModule,
                        MatDatepickerModule,
                        MatDialogModule,
                        MatDividerModule,
                        MatExpansionModule,
                        MatGridListModule,
                        MatIconModule,
                        MatInputModule,
                        MatListModule,
                        MatMenuModule,
                        MatNativeDateModule,
                        MatPaginatorModule,
                        MatProgressBarModule,
                        MatProgressSpinnerModule,
                        MatRadioModule,
                        MatRippleModule,
                        MatSelectModule,
                        MatSidenavModule,
                        MatSliderModule,
                        MatSlideToggleModule,
                        MatSnackBarModule,
                        MatSortModule,
                        MatTableModule,
                        MatTabsModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        MatTreeModule,
                        MatIconModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        CommonModule
                    ]
                },] }
    ];
    return MaterialAngularModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtAppModule = /** @class */ (function () {
    function PxtAppModule() {
    }
    PxtAppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule
                    ],
                    declarations: [PxtAppComponent, PxtContentBody],
                    exports: [PxtAppComponent]
                },] }
    ];
    return PxtAppModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtContentComponent = /** @class */ (function () {
    function PxtContentComponent() {
    }
    /**
     * @return {?}
     */
    PxtContentComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        //throw new Error("Method not implemented.");
    };
    /**
     * @return {?}
     */
    PxtContentComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        //throw new Error("Method not implemented.");
    };
    PxtContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-content-body',
                    template: "<mat-card>\n CARD GENERICO\n</mat-card>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PxtContentComponent.ctorParameters = function () { return []; };
    return PxtContentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PxtContentModule = /** @class */ (function () {
    function PxtContentModule() {
    }
    PxtContentModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule
                    ],
                    declarations: [PxtContentComponent],
                    exports: [PxtContentComponent]
                },] }
    ];
    return PxtContentModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { PxtAppModule, PxtAppComponent, PxtContentModule, PxtContentComponent, PxtContentBody as ɵb, MaterialAngularModule as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXNoYXJlZC1jb21wb25lbnRzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHkudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLmNvbXBvbmVudC50cyIsIm5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzL3NyYy9hcHAvbW9kdWxlcy9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlLnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC5tb2R1bGUudHMiLCJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy9zcmMvYXBwL21vZHVsZXMvcHh0LWNvbnRlbnQvcHh0LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvc3JjL2FwcC9tb2R1bGVzL3B4dC1jb250ZW50L3B4dC1jb250ZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkLXB4dC1jb250ZW50XScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQeHRDb250ZW50Qm9keSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxyXG59XHJcbiIsImltcG9ydCB7IE1lZGlhTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBJbnB1dCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1hcHAuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcENvbXBvbmVudCB7XG5cbiAgIG1lbnVUaXRsZT0gXCJNZW51IFNlbGVjaW9uYWRvXCJcbiAgIF9tb2JpbGVRdWVyeUxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICAgbW9iaWxlUXVlcnk6IE1lZGlhUXVlcnlMaXN0O1xuICAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgUk9VVEVTOiBSb3V0ZXMgO1xuICAvLz0gW1xuICAgLy8geyBwYXRoOiAncG9ydGFsLWZvcm5lY2Vkb3IvZm9ybmVjZWRvcicsIGNvbXBvbmVudDogVGVzdGUxQ29tcG9uZW50ICwgZGF0YTogeyBpY29uOiAnYWNjZXNzaWJpbGl0eScsIHRleHQ6ICdQYWRyw4PCo28gMScsIGFjdGl2ZTpmYWxzZSB9IH0sXG4gICAvLyB7IHBhdGg6ICdwb3J0YWwtZm9ybmVjZWRvci9wcm9kdXRvJywgY29tcG9uZW50OiBUZXN0ZTJDb21wb25lbnQsIGRhdGE6IHsgaWNvbjogJ2Rhc2hib2FyZCcsIHRleHQ6ICdQYWRyw4PCo28gMicsICBhY3RpdmU6dHJ1ZSB9IH0sXG4gIC8vXTtcblxuICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIG1lZGlhOiBNZWRpYU1hdGNoZXIsIFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5ID0gbWVkaWEubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNjAwcHgpJyk7XG4gICAgdGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lciA9ICgpID0+IGNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5LmFkZExpc3RlbmVyKHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXJcbiAgICApO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubW9iaWxlUXVlcnkucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIGZpbGxlck5hdiA9IEFycmF5LmZyb20oe2xlbmd0aDogNTB9LCAoXywgaSkgPT4gYE5hdiBJdGVtICR7aSArIDF9YCk7XG5cbiAgY3VycmVudEFkSW5kZXggPSAtMTtcbiAgQFZpZXdDaGlsZChQeHRDb250ZW50Qm9keSkgYWRIb3N0OiBQeHRDb250ZW50Qm9keTtcbiAgaW50ZXJ2YWw6IGFueTtcblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnkpIHtcbiAgICB0aGlzLm1lbnVUaXRsZSA9IHJvdXRlLmRhdGEudGV4dDtcbiAgICAvL3RoaXMuY3VycmVudEFkSW5kZXggPSAodGhpcy5jdXJyZW50QWRJbmRleCArIDEpICUgdGhpcy5hZHMubGVuZ3RoO1xuICAgIGxldCBhZEl0ZW0gPSByb3V0ZTtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGFkSXRlbS5jb21wb25lbnQpO1xuXG4gICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAvLyg8VGVzdGUxQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YSA9IGFkSXRlbS5kYXRhO1xuICB9XG5cblxuICBzZWxlY3RJdGVtTWVudShuYXYpe1xuICAgIGNvbnNvbGUubG9nKG5hdik7XG4gICAgdGhpcy5sb2FkQ29tcG9uZW50KG5hdik7XG4gIH1cblxufVxuIiwiaW1wb3J0ICcuLy4uLy4uLy4uL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtDZGtUYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7Q2RrVHJlZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gIE1hdEJhZGdlTW9kdWxlLFxuICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxuICBNYXRDaGlwc01vZHVsZSxcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgTWF0RGlhbG9nTW9kdWxlLFxuICBNYXREaXZpZGVyTW9kdWxlLFxuICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gIE1hdEdyaWRMaXN0TW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0TGlzdE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRSYWRpb01vZHVsZSxcbiAgTWF0UmlwcGxlTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFNpZGVuYXZNb2R1bGUsXG4gIE1hdFNsaWRlck1vZHVsZSxcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gIE1hdFNuYWNrQmFyTW9kdWxlLFxuICBNYXRTb3J0TW9kdWxlLFxuICBNYXRTdGVwcGVyTW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0VGFic01vZHVsZSxcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgTWF0VHJlZU1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7cGxhdGZvcm1Ccm93c2VyRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgICBDZGtUcmVlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdFRyZWVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsQW5ndWxhck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dEFwcENvbXBvbmVudCwgUHh0Q29udGVudEJvZHldLFxuICBleHBvcnRzOiBbUHh0QXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1jb250ZW50LWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtY29udGVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95ICB7XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy90aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvL3Rocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9weHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtYW5ndWxhci9tYXRlcmlhbC1hbmd1bGFyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxBbmd1bGFyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1B4dENvbnRlbnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHh0Q29udGVudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHh0Q29udGVudE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU1FLHdCQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtLQUFLOztnQkFKM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7O2dCQUptQixnQkFBZ0I7O3lCQUFwQzs7Ozs7OztBQ0FBOzs7OztJQXNCRSx5QkFBWSxpQkFBb0MsRUFBRSxLQUFtQixFQUMzRDtRQUFBLDZCQUF3QixHQUF4Qix3QkFBd0I7eUJBWHRCLGtCQUFrQjt5QkFHakIsSUFBSTt5QkFtQkwsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxlQUFZLENBQUMsR0FBRyxDQUFDLENBQUUsR0FBQSxDQUFDOzhCQUVsRCxDQUFDLENBQUM7UUFaakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGNBQU0sT0FBQSxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsR0FBQSxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FDckQsQ0FBQztLQUNIOzs7O0lBQ0QscUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDM0QsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM5Qjs7OztJQVFELGtDQUFROzs7SUFBUjtLQUNDOzs7OztJQUNELHVDQUFhOzs7O0lBQWIsVUFBYyxLQUFVO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O1FBRWpDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQzs7UUFDbkIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUUvRixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBRXpCLElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztLQUV2RTs7Ozs7SUFHRCx3Q0FBYzs7OztJQUFkLFVBQWUsR0FBRztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7O2dCQXRERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLHduQ0FBdUM7O2lCQUV4Qzs7OztnQkFSUSxpQkFBaUI7Z0JBRGpCLFlBQVk7Z0JBQytDLHdCQUF3Qjs7O3lCQWV6RixLQUFLO3lCQXFCTCxTQUFTLFNBQUMsY0FBYzs7MEJBckMzQjs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Z0JBaURDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLHFCQUFxQjt3QkFDckIsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsdUJBQXVCO3dCQUN2QixZQUFZO3FCQUNiO2lCQUNGOztnQ0E3RkQ7Ozs7Ozs7QUNBQTs7OztnQkFVQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1oscUJBQXFCO3FCQUN0QjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDO29CQUMvQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCOzt1QkFqQkQ7Ozs7Ozs7QUNBQTtJQWVFO0tBQWlCOzs7O0lBTmpCLHlDQUFXOzs7SUFBWDs7S0FFQzs7OztJQUNELHNDQUFROzs7SUFBUjs7S0FFQzs7Z0JBWkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLG1EQUEyQzs7aUJBRTVDOzs7OzhCQU5EOzs7Ozs7O0FDQUE7Ozs7Z0JBS0MsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHFCQUFxQjtxQkFDdEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQ25DLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUMvQjs7MkJBWkQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==