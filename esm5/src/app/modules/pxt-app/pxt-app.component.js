/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { PxtContentBody } from '../../directives/pxt-content-body';
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
export { PxtAppComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWFwcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQWEsS0FBSyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0lBZWpFLEtBQUs7SUFDSiwwSUFBMEk7SUFDMUksa0lBQWtJO0lBQ25JLElBQUk7SUFFSix5QkFBWSxpQkFBb0MsRUFBRSxLQUFtQixFQUMzRDtRQUFBLDZCQUF3QixHQUF4Qix3QkFBd0I7eUJBWHRCLGtCQUFrQjt5QkFHakIsSUFBSTt5QkFtQkwsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxlQUFZLENBQUMsR0FBRyxDQUFDLENBQUUsRUFBbkIsQ0FBbUIsQ0FBQzs4QkFFbEQsQ0FBQyxDQUFDO1FBWmpCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxjQUFNLE9BQUEsaUJBQWlCLENBQUMsYUFBYSxFQUFFLEVBQWpDLENBQWlDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUNyRCxDQUFDO0tBQ0g7Ozs7SUFDRCxxQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMzRCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzlCOzs7O0lBUUQsa0NBQVE7OztJQUFSO0tBQ0M7Ozs7O0lBQ0QsdUNBQWE7Ozs7SUFBYixVQUFjLEtBQVU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7UUFFakMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDOztRQUNuQixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBRS9GLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFFekIsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0tBRXZFOzs7OztJQUdELHdDQUFjOzs7O0lBQWQsVUFBZSxHQUFHO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6Qjs7Z0JBdERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsd25DQUF1Qzs7aUJBRXhDOzs7O2dCQVJRLGlCQUFpQjtnQkFEakIsWUFBWTtnQkFDK0Msd0JBQXdCOzs7eUJBZXpGLEtBQUs7eUJBcUJMLFNBQVMsU0FBQyxjQUFjOzswQkFyQzNCOztTQVVhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgSW5wdXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRBcHBDb21wb25lbnQge1xuXG4gICBtZW51VGl0bGU9IFwiTWVudSBTZWxlY2lvbmFkb1wiXG4gICBfbW9iaWxlUXVlcnlMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgIG1vYmlsZVF1ZXJ5OiBNZWRpYVF1ZXJ5TGlzdDtcbiAgIHNob3VsZFJ1biA9IHRydWU7XG4gIEBJbnB1dCgpIFJPVVRFUzogUm91dGVzIDtcbiAgLy89IFtcbiAgIC8vIHsgcGF0aDogJ3BvcnRhbC1mb3JuZWNlZG9yL2Zvcm5lY2Vkb3InLCBjb21wb25lbnQ6IFRlc3RlMUNvbXBvbmVudCAsIGRhdGE6IHsgaWNvbjogJ2FjY2Vzc2liaWxpdHknLCB0ZXh0OiAnUGFkcsOjbyAxJywgYWN0aXZlOmZhbHNlIH0gfSxcbiAgIC8vIHsgcGF0aDogJ3BvcnRhbC1mb3JuZWNlZG9yL3Byb2R1dG8nLCBjb21wb25lbnQ6IFRlc3RlMkNvbXBvbmVudCwgZGF0YTogeyBpY29uOiAnZGFzaGJvYXJkJywgdGV4dDogJ1BhZHLDo28gMicsICBhY3RpdmU6dHJ1ZSB9IH0sXG4gIC8vXTtcblxuICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIG1lZGlhOiBNZWRpYU1hdGNoZXIsIFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5ID0gbWVkaWEubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNjAwcHgpJyk7XG4gICAgdGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lciA9ICgpID0+IGNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLm1vYmlsZVF1ZXJ5LmFkZExpc3RlbmVyKHRoaXMuX21vYmlsZVF1ZXJ5TGlzdGVuZXJcbiAgICApO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubW9iaWxlUXVlcnkucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIGZpbGxlck5hdiA9IEFycmF5LmZyb20oe2xlbmd0aDogNTB9LCAoXywgaSkgPT4gYE5hdiBJdGVtICR7aSArIDF9YCk7XG5cbiAgY3VycmVudEFkSW5kZXggPSAtMTtcbiAgQFZpZXdDaGlsZChQeHRDb250ZW50Qm9keSkgYWRIb3N0OiBQeHRDb250ZW50Qm9keTtcbiAgaW50ZXJ2YWw6IGFueTtcblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBsb2FkQ29tcG9uZW50KHJvdXRlOiBhbnkpIHtcbiAgICB0aGlzLm1lbnVUaXRsZSA9IHJvdXRlLmRhdGEudGV4dDtcbiAgICAvL3RoaXMuY3VycmVudEFkSW5kZXggPSAodGhpcy5jdXJyZW50QWRJbmRleCArIDEpICUgdGhpcy5hZHMubGVuZ3RoO1xuICAgIGxldCBhZEl0ZW0gPSByb3V0ZTtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGFkSXRlbS5jb21wb25lbnQpO1xuXG4gICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmFkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAvLyg8VGVzdGUxQ29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YSA9IGFkSXRlbS5kYXRhO1xuICB9XG5cblxuICBzZWxlY3RJdGVtTWVudShuYXYpe1xuICAgIGNvbnNvbGUubG9nKG5hdik7XG4gICAgdGhpcy5sb2FkQ29tcG9uZW50KG5hdik7XG4gIH1cblxufVxuIl19