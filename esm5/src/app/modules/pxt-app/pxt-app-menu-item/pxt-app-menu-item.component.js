/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Inject } from '@angular/core';
import { PxtAppComponentService } from '../../../services/pxt-app-components.service';
var PxtAppMenuItemComponent = /** @class */ (function () {
    function PxtAppMenuItemComponent(pxtAppComponentService) {
        this.pxtAppComponentService = pxtAppComponentService;
    }
    /**
     * @return {?}
     */
    PxtAppMenuItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} child
     * @return {?}
     */
    PxtAppMenuItemComponent.prototype.loadComponent = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        this.pxtAppComponentService.loadComponent({ component: child.menuSource.component, data: "" });
    };
    PxtAppMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-app-menu-item',
                    template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n  <span *ngFor=\"let child of items\">\n    <!-- Handle branch node menu items -->\n    <span *ngIf=\"child.childs && child.childs.length > 0\" [isUserInRule]=\"child.isUserInRule\">\n      <a mat-menu-item color=\"primary\" [matMenuTriggerFor]=\"menu.childMenu\"  [isUserInRule]=\"child.isUserInRule\" >\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n      <pxt-app-menu-item #menu [items]=\"child.childs\" [isUserInRule]=\"child.isUserInRule\"></pxt-app-menu-item>\n    </span>\n    <!-- Handle leaf node menu items -->\n    <span *ngIf=\"!child.childs || child.childs.length === 0\">\n      <a *ngIf=\"child.menuType=='item'\" mat-menu-item color=\"primary\" (click)=\"loadComponent(child)\" [isUserInRule]=\"child.isUserInRule\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n\n      <a *ngIf=\"child.menuType=='group'\" mat-menu-item color=\"primary\" [isUserInRule]=\"child.isUserInRule\">\n        <mat-icon>{{child.menuIcon}}</mat-icon>\n        {{child.menuText | uppercaseFirst}}\n      </a>\n    </span>\n  </span>\n</mat-menu>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PxtAppMenuItemComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PxtAppComponentService,] }] }
    ]; };
    PxtAppMenuItemComponent.propDecorators = {
        items: [{ type: Input }],
        childMenu: [{ type: ViewChild, args: ['childMenu',] }]
    };
    return PxtAppMenuItemComponent;
}());
export { PxtAppMenuItemComponent };
if (false) {
    /** @type {?} */
    PxtAppMenuItemComponent.prototype.items;
    /** @type {?} */
    PxtAppMenuItemComponent.prototype.childMenu;
    /** @type {?} */
    PxtAppMenuItemComponent.prototype.pxtAppComponentService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3B4dC1hcHAvcHh0LWFwcC1tZW51LWl0ZW0vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOztJQWFwRixpQ0FBbUQsc0JBQXNCO1FBQXRCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBQTtLQUFLOzs7O0lBQzlFLDBDQUFROzs7SUFBUjtLQUNDOzs7OztJQUVELCtDQUFhOzs7O0lBQWIsVUFBYyxLQUFLO1FBQ2pCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7S0FDN0Y7O2dCQWhCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsaXRDQUFpRDs7aUJBRWxEOzs7O2dEQU1jLE1BQU0sU0FBQyxzQkFBc0I7Ozt3QkFIekMsS0FBSzs0QkFDTCxTQUFTLFNBQUMsV0FBVzs7a0NBWnhCOztTQVNhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LWFwcC1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LWFwcC1tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtYXBwLW1lbnUtaXRlbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGl0ZW1zOiBhbnlbXTtcbiAgQFZpZXdDaGlsZCgnY2hpbGRNZW51JykgcHVibGljIGNoaWxkTWVudTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFB4dEFwcENvbXBvbmVudFNlcnZpY2UpIHB1YmxpYyBweHRBcHBDb21wb25lbnRTZXJ2aWNlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkQ29tcG9uZW50KGNoaWxkKSB7XG4gICAgdGhpcy5weHRBcHBDb21wb25lbnRTZXJ2aWNlLmxvYWRDb21wb25lbnQoe2NvbXBvbmVudDogY2hpbGQubWVudVNvdXJjZS5jb21wb25lbnQsIGRhdGE6XCJcIn0pO1xuICB9XG5cbn1cbiJdfQ==