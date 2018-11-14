/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { pxtAppConfig } from "../models/pxtConfiguration";
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';
var RulesDirective = /** @class */ (function () {
    function RulesDirective(el, userService) {
        this.el = el;
        this.userService = userService;
    }
    /**
     * @return {?}
     */
    RulesDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            /** @type {?} */
            var permissoes = _this.getRules();
            _this.el.nativeElement.style.display = permissoes.includes(_this.rule) ? '' : 'none';
        }, 200);
    };
    /**
     * @return {?}
     */
    RulesDirective.prototype.getRules = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtAppConfig.systemId + pxtAppConfig.systemPrex + this.userService.getUsuarioLogado().identificador);
        if (tokenAuthorities !== null) {
            /** @type {?} */
            var authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
            /** @type {?} */
            var permissoes = authority.authorities;
            return permissoes;
        }
        return [];
    };
    RulesDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[isUserInRule]'
                },] }
    ];
    /** @nocollapse */
    RulesDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: UserService }
    ]; };
    RulesDirective.propDecorators = {
        rule: [{ type: Input, args: ['isUserInRule',] }]
    };
    return RulesDirective;
}());
export { RulesDirective };
if (false) {
    /** @type {?} */
    RulesDirective.prototype.rule;
    /** @type {?} */
    RulesDirective.prototype.el;
    /** @type {?} */
    RulesDirective.prototype.userService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9kaXJlY3RpdmVzL3J1bGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQVNyRCx3QkFBbUIsRUFBYyxFQUFTLFdBQXlCO1FBQWhELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztLQUFLOzs7O0lBRXhFLHdDQUFlOzs7SUFBZjtRQUFBLGlCQU1DO1FBTEMsVUFBVSxDQUFDOztZQUNULElBQUksVUFBVSxHQUFhLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNwRixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBRVQ7Ozs7SUFFTSxpQ0FBUTs7Ozs7UUFDYixJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqSixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUM5QixJQUFNLFNBQVMscUJBQVEsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7O1lBQ3BELElBQUksVUFBVSxHQUFhLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDakQsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUNuQjtRQUNELE1BQU0sQ0FBQyxFQUFFLENBQUM7OztnQkF4QmIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQVAwQixVQUFVO2dCQUc1QixXQUFXOzs7dUJBT2pCLEtBQUssU0FBQyxjQUFjOzt5QkFWdkI7O1NBUWEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHB4dEFwcENvbmZpZyB9IGZyb20gXCIuLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpc1VzZXJJblJ1bGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSdWxlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdpc1VzZXJJblJ1bGUnKSBydWxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgdXNlclNlcnZpY2UgOiBVc2VyU2VydmljZSkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbGV0IHBlcm1pc3NvZXM6IHN0cmluZ1tdID0gdGhpcy5nZXRSdWxlcygpO1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBwZXJtaXNzb2VzLmluY2x1ZGVzKHRoaXMucnVsZSkgPyAnJyA6ICdub25lJztcbiAgICB9LCAyMDApO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0UnVsZXMoKTogc3RyaW5nW10ge1xuICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0QXBwQ29uZmlnLnN5c3RlbUlkICsgcHh0QXBwQ29uZmlnLnN5c3RlbVByZXggKyB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzdWFyaW9Mb2dhZG8oKS5pZGVudGlmaWNhZG9yKTtcbiAgICBpZiAodG9rZW5BdXRob3JpdGllcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgYXV0aG9yaXR5ID0gPGFueT5qd3RfZGVjb2RlKHRva2VuQXV0aG9yaXRpZXMpO1xuICAgICAgbGV0IHBlcm1pc3NvZXM6IHN0cmluZ1tdID0gYXV0aG9yaXR5LmF1dGhvcml0aWVzO1xuICAgICAgcmV0dXJuIHBlcm1pc3NvZXM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19