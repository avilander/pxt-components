/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
var PxtAppComponentService = /** @class */ (function () {
    function PxtAppComponentService() {
        this.submenusItens = new Subject();
        this.submenusItensObservable = this.submenusItens.asObservable();
        this._loadComponent = new Subject();
        this.loadComponentObservable = this._loadComponent.asObservable();
        this._setUserLogged = new Subject();
        this.userLoggedObservable = this._setUserLogged.asObservable();
        this._setInfoInit = new Subject();
        this.infoInitial = this._setInfoInit.asObservable();
    }
    /**
     * @param {?} routes
     * @return {?}
     */
    PxtAppComponentService.prototype.setSubmenus = /**
     * @param {?} routes
     * @return {?}
     */
    function (routes) {
        this.submenusItens.next(routes);
    };
    /**
     * @param {?} infoInitial
     * @return {?}
     */
    PxtAppComponentService.prototype.setInitialInfo = /**
     * @param {?} infoInitial
     * @return {?}
     */
    function (infoInitial) {
        this._setInfoInit.next(infoInitial);
    };
    /**
     * @param {?} component
     * @return {?}
     */
    PxtAppComponentService.prototype.loadComponent = /**
     * @param {?} component
     * @return {?}
     */
    function (component) {
        this._loadComponent.next(component);
    };
    /**
     * @param {?} user
     * @return {?}
     */
    PxtAppComponentService.prototype.setUser = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        this._setUserLogged.next(user);
    };
    PxtAppComponentService.decorators = [
        { type: Injectable }
    ];
    return PxtAppComponentService;
}());
export { PxtAppComponentService };
if (false) {
    /** @type {?} */
    PxtAppComponentService.prototype.submenusItens;
    /** @type {?} */
    PxtAppComponentService.prototype.submenusItensObservable;
    /** @type {?} */
    PxtAppComponentService.prototype._loadComponent;
    /** @type {?} */
    PxtAppComponentService.prototype.loadComponentObservable;
    /** @type {?} */
    PxtAppComponentService.prototype._setUserLogged;
    /** @type {?} */
    PxtAppComponentService.prototype.userLoggedObservable;
    /** @type {?} */
    PxtAppComponentService.prototype._setInfoInit;
    /** @type {?} */
    PxtAppComponentService.prototype.infoInitial;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs2QkFJRCxJQUFJLE9BQU8sRUFBTzt1Q0FDRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTs4QkFFckQsSUFBSSxPQUFPLEVBQU87dUNBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7OEJBRXRELElBQUksT0FBTyxFQUFPO29DQUNELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFOzRCQUVyRCxJQUFJLE9BQU8sRUFBTzsyQkFDUixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTs7Ozs7O0lBRS9FLDRDQUFXOzs7O0lBQVgsVUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ25DOzs7OztJQUVELCtDQUFjOzs7O0lBQWQsVUFBZSxXQUFXO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0tBQ3RDOzs7OztJQUVELDhDQUFhOzs7O0lBQWIsVUFBYyxTQUFjO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3ZDOzs7OztJQUVELHdDQUFPOzs7O0lBQVAsVUFBUSxJQUFTO1FBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7O2dCQTVCSixVQUFVOztpQ0FIWDs7U0FJYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHh0QXBwQ29tcG9uZW50U2VydmljZSB7XHJcbiAgICBwcml2YXRlIHN1Ym1lbnVzSXRlbnM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBzdWJtZW51c0l0ZW5zT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5zdWJtZW51c0l0ZW5zLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRDb21wb25lbnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBsb2FkQ29tcG9uZW50T2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fbG9hZENvbXBvbmVudC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXRVc2VyTG9nZ2VkOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdXNlckxvZ2dlZE9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3NldFVzZXJMb2dnZWQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0SW5mb0luaXQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBpbmZvSW5pdGlhbDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fc2V0SW5mb0luaXQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgc2V0U3VibWVudXMocm91dGVzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnN1Ym1lbnVzSXRlbnMubmV4dChyb3V0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluaXRpYWxJbmZvKGluZm9Jbml0aWFsKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0SW5mb0luaXQubmV4dChpbmZvSW5pdGlhbClcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQ29tcG9uZW50KGNvbXBvbmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZENvbXBvbmVudC5uZXh0KGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VXNlcih1c2VyOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9zZXRVc2VyTG9nZ2VkLm5leHQodXNlcik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==