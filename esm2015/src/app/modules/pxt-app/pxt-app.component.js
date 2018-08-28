/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { PxtContentBody } from '../../directives/pxt-content-body';
export class PxtAppComponent {
    /**
     * @param {?} changeDetectorRef
     * @param {?} media
     * @param {?} componentFactoryResolver
     */
    constructor(changeDetectorRef, media, componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.menuTitle = "Menu Selecionado";
        this.shouldRun = true;
        this.ROUTES = [];
        this.fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
        this.currentAdIndex = -1;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        clearInterval(this.interval);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} route
     * @return {?}
     */
    loadComponent(route) {
        this.menuTitle = route.data.text;
        /** @type {?} */
        let adItem = route;
        /** @type {?} */
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        /** @type {?} */
        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        let componentRef = viewContainerRef.createComponent(componentFactory);
        //(<Teste1Component>componentRef.instance).data = adItem.data;
    }
    /**
     * @param {?} nav
     * @return {?}
     */
    selectItemMenu(nav) {
        console.log(nav);
        this.loadComponent(nav);
    }
}
PxtAppComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-app',
                template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\" *ngIf=\"shouldRun\">\n\n  <mat-toolbar color=\"primary\" class=\"example-toolbar\">\n    <button mat-icon-button (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <h1 class=\"example-app-name\">{{menuTitle}}</h1>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav [mode]=\"mobileQuery.matches ? 'over' : 'side'\" [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n\n      <mat-nav-list>\n        <a mat-list-item routerLink=\".\" (click)=\"selectItemMenu(nav)\" *ngFor=\"let nav of ROUTES\">\n          <mat-icon matListIcon>{{nav.data.icon}}</mat-icon>\n          <h3 matLine> {{nav.data.text}} </h3>\n        </a>\n      </mat-nav-list>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n</div>\n<div *ngIf=\"!shouldRun\">Please open on Stackblitz to see result</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
PxtAppComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: MediaMatcher },
    { type: ComponentFactoryResolver }
];
PxtAppComponent.propDecorators = {
    ROUTES: [{ type: Input }],
    adHost: [{ type: ViewChild, args: [PxtContentBody,] }]
};
if (false) {
    /** @type {?} */
    PxtAppComponent.prototype.menuTitle;
    /** @type {?} */
    PxtAppComponent.prototype._mobileQueryListener;
    /** @type {?} */
    PxtAppComponent.prototype.mobileQuery;
    /** @type {?} */
    PxtAppComponent.prototype.shouldRun;
    /** @type {?} */
    PxtAppComponent.prototype.ROUTES;
    /** @type {?} */
    PxtAppComponent.prototype.fillerNav;
    /** @type {?} */
    PxtAppComponent.prototype.currentAdIndex;
    /** @type {?} */
    PxtAppComponent.prototype.adHost;
    /** @type {?} */
    PxtAppComponent.prototype.interval;
    /** @type {?} */
    PxtAppComponent.prototype.componentFactoryResolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWFwcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQWEsS0FBSyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFRbkUsTUFBTTs7Ozs7O0lBV0osWUFBWSxpQkFBb0MsRUFBRSxLQUFtQixFQUMzRDtRQUFBLDZCQUF3QixHQUF4Qix3QkFBd0I7eUJBVnRCLGtCQUFrQjt5QkFHakIsSUFBSTtzQkFDUyxFQUd6Qjt5QkFjVyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7OEJBRWxELENBQUMsQ0FBQztRQVpqQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUNyRCxDQUFDO0tBQ0g7Ozs7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDM0QsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM5Qjs7OztJQVFELFFBQVE7S0FDUDs7Ozs7SUFDRCxhQUFhLENBQUMsS0FBVTtRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztRQUVqQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBQ25CLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFFL0YsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQ3BELGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDOztRQUV6QixJQUFJLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7S0FFdkU7Ozs7O0lBR0QsY0FBYyxDQUFDLEdBQUc7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCOzs7WUFyREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQix3bkNBQXVDOzthQUV4Qzs7OztZQVJRLGlCQUFpQjtZQURqQixZQUFZO1lBQytDLHdCQUF3Qjs7O3FCQWV6RixLQUFLO3FCQW9CTCxTQUFTLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lZGlhTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBJbnB1dCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1hcHAuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dEFwcENvbXBvbmVudCB7XG5cbiAgIG1lbnVUaXRsZT0gXCJNZW51IFNlbGVjaW9uYWRvXCJcbiAgIF9tb2JpbGVRdWVyeUxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICAgbW9iaWxlUXVlcnk6IE1lZGlhUXVlcnlMaXN0O1xuICAgc2hvdWxkUnVuID0gdHJ1ZTtcbiAgQElucHV0KCkgUk9VVEVTOiBSb3V0ZXMgPSBbXG4gICAvLyB7IHBhdGg6ICdwb3J0YWwtZm9ybmVjZWRvci9mb3JuZWNlZG9yJywgY29tcG9uZW50OiBUZXN0ZTFDb21wb25lbnQgLCBkYXRhOiB7IGljb246ICdhY2Nlc3NpYmlsaXR5JywgdGV4dDogJ1BhZHLDo28gMScsIGFjdGl2ZTpmYWxzZSB9IH0sXG4gICAvLyB7IHBhdGg6ICdwb3J0YWwtZm9ybmVjZWRvci9wcm9kdXRvJywgY29tcG9uZW50OiBUZXN0ZTJDb21wb25lbnQsIGRhdGE6IHsgaWNvbjogJ2Rhc2hib2FyZCcsIHRleHQ6ICdQYWRyw6NvIDInLCAgYWN0aXZlOnRydWUgfSB9LFxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgbWVkaWE6IE1lZGlhTWF0Y2hlciwgXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgIHRoaXMubW9iaWxlUXVlcnkgPSBtZWRpYS5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA2MDBweCknKTtcbiAgICB0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyID0gKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubW9iaWxlUXVlcnkuYWRkTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lclxuICAgICk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgZmlsbGVyTmF2ID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA1MH0sIChfLCBpKSA9PiBgTmF2IEl0ZW0gJHtpICsgMX1gKTtcblxuICBjdXJyZW50QWRJbmRleCA9IC0xO1xuICBAVmlld0NoaWxkKFB4dENvbnRlbnRCb2R5KSBhZEhvc3Q6IFB4dENvbnRlbnRCb2R5O1xuICBpbnRlcnZhbDogYW55O1xuXG4gIG5nT25Jbml0KCkge1xuICB9XG4gIGxvYWRDb21wb25lbnQocm91dGU6IGFueSkge1xuICAgIHRoaXMubWVudVRpdGxlID0gcm91dGUuZGF0YS50ZXh0O1xuICAgIC8vdGhpcy5jdXJyZW50QWRJbmRleCA9ICh0aGlzLmN1cnJlbnRBZEluZGV4ICsgMSkgJSB0aGlzLmFkcy5sZW5ndGg7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlO1xuICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoYWRJdGVtLmNvbXBvbmVudCk7XG5cbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuYWRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXG4gICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIC8vKDxUZXN0ZTFDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhID0gYWRJdGVtLmRhdGE7XG4gIH1cblxuXG4gIHNlbGVjdEl0ZW1NZW51KG5hdil7XG4gICAgY29uc29sZS5sb2cobmF2KTtcbiAgICB0aGlzLmxvYWRDb21wb25lbnQobmF2KTtcbiAgfVxuXG59XG4iXX0=