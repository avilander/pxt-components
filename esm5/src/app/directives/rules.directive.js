/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { pxtConfiguration } from "../models/pxtConfiguration";
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';
var RulesDirective = /** @class */ (function () {
    function RulesDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    RulesDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        debugger;
        /** @type {?} */
        var permissoes = this.getRules();
        this.el.nativeElement.style.display = permissoes.includes(this.rule) ? '' : 'none';
    };
    /**
     * @return {?}
     */
    RulesDirective.prototype.getRules = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().login);
        /** @type {?} */
        var authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
        /** @type {?} */
        var permissoes = authority.authorities;
        return permissoes;
    };
    RulesDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[isUserInRule]'
                },] }
    ];
    /** @nocollapse */
    RulesDirective.ctorParameters = function () { return [
        { type: ElementRef }
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9kaXJlY3RpdmVzL3J1bGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0lBU3JELHdCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtLQUFLOzs7O0lBRXRDLHdDQUFlOzs7SUFBZjtRQUNFLFFBQVEsQ0FBQTs7UUFDUixJQUFJLFVBQVUsR0FBYSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDcEY7Ozs7SUFFTyxpQ0FBUTs7Ozs7UUFDZCxJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFDNUksSUFBTSxTQUFTLHFCQUFRLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDOztRQUNwRCxJQUFJLFVBQVUsR0FBYSxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxVQUFVLENBQUM7OztnQkFuQnJCLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7OztnQkFQMEIsVUFBVTs7O3VCQVVsQyxLQUFLLFNBQUMsY0FBYzs7eUJBVnZCOztTQVFhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9weHRDb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2lzVXNlckluUnVsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGVzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ2lzVXNlckluUnVsZScpIHJ1bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBkZWJ1Z2dlclxuICAgIGxldCBwZXJtaXNzb2VzOiBzdHJpbmdbXSA9IHRoaXMuZ2V0UnVsZXMoKTtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHBlcm1pc3NvZXMuaW5jbHVkZXModGhpcy5ydWxlKSA/ICcnIDogJ25vbmUnO1xuICB9XG5cbiAgcHVibGljICBnZXRSdWxlcygpOiBzdHJpbmdbXSB7XG4gICAgdmFyIHRva2VuQXV0aG9yaXRpZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShweHRDb25maWd1cmF0aW9uLnN5c3RlbUlkICsgcHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1QcmV4ICsgVXNlclNlcnZpY2UuZ2V0VXN1YXJpb0xvZ2FkbygpLmxvZ2luKTtcbiAgICBjb25zdCBhdXRob3JpdHkgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW5BdXRob3JpdGllcyk7XG4gICAgbGV0IHBlcm1pc3NvZXM6IHN0cmluZ1tdID0gYXV0aG9yaXR5LmF1dGhvcml0aWVzO1xuICAgIHJldHVybiBwZXJtaXNzb2VzO1xuICB9XG59XG4iXX0=