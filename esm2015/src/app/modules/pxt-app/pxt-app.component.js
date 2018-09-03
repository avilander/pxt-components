/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { PxtContentBody } from '../../directives/pxt-content-body';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
export class PxtAppComponent {
    /**
     * @param {?} changeDetectorRef
     * @param {?} media
     * @param {?} componentFactoryResolver
     * @param {?} pxtAppComponentService
     */
    constructor(changeDetectorRef, media, componentFactoryResolver, pxtAppComponentService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.pxtAppComponentService = pxtAppComponentService;
        this.routes = [];
        this.submenus = [];
        this.menuSelected = "";
        this.shouldRun = true;
        this.fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
        this.currentAdIndex = -1;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        pxtAppComponentService.submenusItensObservable.subscribe(routes => {
            if (routes != undefined) {
                this.routes = routes;
            }
            else {
                this.routes = [];
            }
        });
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
        this.subscribeComponent();
    }
    /**
     * @param {?} route
     * @return {?}
     */
    loadComponent(route) {
        this.menuSelected = route.data.text;
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
     * @return {?}
     */
    subscribeComponent() {
        debugger;
        this.pxtAppComponentService.loadComponentObservable.subscribe(component => {
            debugger;
            /** @type {?} */
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            /** @type {?} */
            let viewContainerRef = this.adHost.viewContainerRef;
            viewContainerRef.clear();
            /** @type {?} */
            let componentRef = viewContainerRef.createComponent(componentFactory);
        });
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
                template: "<div class=\"example-container\" [class.example-is-mobile]=\"mobileQuery.matches\">\n\n    <mat-toolbar color=\"primary\" class=\"example-toolbar mat-elevation-z8\">\n    <button mat-icon-button (click)=\"snav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n    <h1 class=\"example-app-name\">{{menuSelected}}</h1>\n    <span class=\"example-spacer\"></span>\n    <span >Ol\u00E1,</span>\n    <button mat-icon-button [matMenuTriggerFor]=\"user\"><mat-icon>account_circle</mat-icon> </button>\n    <mat-menu #user=\"matMenu\" [overlapTrigger]=\"false\">\n      <button mat-menu-item >\n        <mat-icon>exit_to_app</mat-icon>\n        <span>Sair</span>\n      </button>\n    </mat-menu>\n  </mat-toolbar>\n  <mat-sidenav-container class=\"example-sidenav-container\" [style.marginTop.px]=\"mobileQuery.matches ? 56 : 0\">\n    <mat-sidenav #snav  [fixedInViewport]=\"mobileQuery.matches\" fixedTopGap=\"56\">\n\n      <mat-nav-list>\n        <a mat-list-item routerLink=\".\" (click)=\"selectItemMenu(nav)\" *ngFor=\"let nav of routes\">\n          <mat-icon matListIcon>{{nav.data.icon}}</mat-icon>\n          <h3 matLine> {{nav.data.text}} </h3>\n        </a>\n      </mat-nav-list>\n    </mat-sidenav>\n    <mat-sidenav-content class=\"pxt-content-body\">\n      <ng-template ad-pxt-content></ng-template>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n</div>\n<div *ngIf=\"!shouldRun\">Please open on Stackblitz to see result</div>",
                styles: [".example-spacer{flex:1 1 auto}.example-container{display:flex;flex-direction:column;position:absolute;top:0;bottom:0;left:0;right:0}.example-container>.example-toolbar,.example-is-mobile .example-toolbar{z-index:2}.example-sidenav-container{flex:1}.example-is-mobile .example-sidenav-container{flex:1 0 auto}mat-sidenav-content{padding:0}.icone-menu{line-height:inherit;width:2rem;display:block;float:left;text-align:center;margin-right:1rem}.arrow-after-menu{line-height:inherit;width:2rem;display:block;float:right;text-align:center}.titulo-menu{padding-right:20px}mat-nav-list span::after{font-family:'Material Icons';content:\"keyboard_arrow_right\";color:#9e9e9e;font-size:18px;position:absolute;right:0;padding-right:10px}"]
            }] }
];
/** @nocollapse */
PxtAppComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: MediaMatcher },
    { type: ComponentFactoryResolver },
    { type: PxtAppComponentService }
];
PxtAppComponent.propDecorators = {
    adHost: [{ type: ViewChild, args: [PxtContentBody,] }]
};
if (false) {
    /** @type {?} */
    PxtAppComponent.prototype.routes;
    /** @type {?} */
    PxtAppComponent.prototype.submenus;
    /** @type {?} */
    PxtAppComponent.prototype.menuSelected;
    /** @type {?} */
    PxtAppComponent.prototype._mobileQueryListener;
    /** @type {?} */
    PxtAppComponent.prototype.mobileQuery;
    /** @type {?} */
    PxtAppComponent.prototype.shouldRun;
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
    /** @type {?} */
    PxtAppComponent.prototype.pxtAppComponentService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWFwcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQW9CLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFLbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFPbkYsTUFBTTs7Ozs7OztJQVdKLFlBQVksaUJBQW9DLEVBQUUsS0FBbUIsRUFDNUQsMEJBQTJELHNCQUE4QztRQUF6Ryw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQW1DLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7c0JBVi9GLEVBQUU7d0JBQ0gsRUFBRTs0QkFFTCxFQUFFO3lCQUlMLElBQUk7eUJBc0JKLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzs4QkFFcEQsQ0FBQyxDQUFDO1FBcEJqQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDeEQsc0JBQXNCLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUN0QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQ2xCO1NBRUYsQ0FBQyxDQUFDO0tBRUo7Ozs7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDM0QsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM5Qjs7OztJQVFELFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztLQUMzQjs7Ozs7SUFDRCxhQUFhLENBQUMsS0FBVTtRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztRQUVwQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBQ25CLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFFL0YsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQ3BELGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDOztRQUN6QixJQUFJLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7S0FFdkU7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsUUFBUSxDQUFDO1FBQ1QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4RSxRQUFRLENBQUM7O1lBQ1QsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBQ3hGLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUNwRCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFDekIsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkUsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBR0QsY0FBYyxDQUFDLEdBQUc7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCOzs7WUF4RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQiw4N0NBQXVDOzthQUV4Qzs7OztZQVpRLGlCQUFpQjtZQURqQixZQUFZO1lBQytDLHdCQUF3QjtZQU1uRixzQkFBc0I7OztxQkF5QzVCLFNBQVMsU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuXG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUHh0QXBwIH0gZnJvbSAnLi9weHQtYXBwJztcbmltcG9ydCB7IFB4dEFwcE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9weHQtYXBwLm1vZGVsJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1hcHAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnQge1xuXG4gIHJvdXRlczogUm91dGVzW10gPSBbXTtcbiAgc3VibWVudXM6IGFueVtdID0gW107XG5cbiAgbWVudVNlbGVjdGVkID0gXCJcIjtcblxuICBfbW9iaWxlUXVlcnlMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgbW9iaWxlUXVlcnk6IE1lZGlhUXVlcnlMaXN0O1xuICBzaG91bGRSdW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgbWVkaWE6IE1lZGlhTWF0Y2hlcixcbiAgICBwdWJsaWMgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlOiBQeHRBcHBDb21wb25lbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5tb2JpbGVRdWVyeSA9IG1lZGlhLm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDYwMHB4KScpO1xuICAgIHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIgPSAoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5tb2JpbGVRdWVyeS5hZGRMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcbiAgICBweHRBcHBDb21wb25lbnRTZXJ2aWNlLnN1Ym1lbnVzSXRlbnNPYnNlcnZhYmxlLnN1YnNjcmliZShyb3V0ZXMgPT4ge1xuICAgICAgaWYgKHJvdXRlcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXIpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBmaWxsZXJOYXYgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1MCB9LCAoXywgaSkgPT4gYE5hdiBJdGVtICR7aSArIDF9YCk7XG5cbiAgY3VycmVudEFkSW5kZXggPSAtMTtcbiAgQFZpZXdDaGlsZChQeHRDb250ZW50Qm9keSkgYWRIb3N0OiBQeHRDb250ZW50Qm9keTtcbiAgaW50ZXJ2YWw6IGFueTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmliZUNvbXBvbmVudCgpO1xuICB9XG4gIGxvYWRDb21wb25lbnQocm91dGU6IGFueSkge1xuICAgIHRoaXMubWVudVNlbGVjdGVkID0gcm91dGUuZGF0YS50ZXh0O1xuICAgIC8vdGhpcy5jdXJyZW50QWRJbmRleCA9ICh0aGlzLmN1cnJlbnRBZEluZGV4ICsgMSkgJSB0aGlzLmFkcy5sZW5ndGg7XG4gICAgbGV0IGFkSXRlbSA9IHJvdXRlO1xuICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoYWRJdGVtLmNvbXBvbmVudCk7XG5cbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuYWRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAvLyg8VGVzdGUxQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YSA9IGFkSXRlbS5kYXRhO1xuICB9XG5cbiAgc3Vic2NyaWJlQ29tcG9uZW50KCkge1xuICAgIGRlYnVnZ2VyO1xuICAgIHRoaXMucHh0QXBwQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50T2JzZXJ2YWJsZS5zdWJzY3JpYmUoY29tcG9uZW50ID0+IHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIH0pO1xuICB9XG5cblxuICBzZWxlY3RJdGVtTWVudShuYXYpIHtcbiAgICBjb25zb2xlLmxvZyhuYXYpO1xuICAgIHRoaXMubG9hZENvbXBvbmVudChuYXYpO1xuICB9XG5cbn1cbiJdfQ==