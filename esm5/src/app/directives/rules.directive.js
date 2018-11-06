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
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().login);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9kaXJlY3RpdmVzL3J1bGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0lBU3JELHdCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtLQUFLOzs7O0lBRXRDLHdDQUFlOzs7SUFBZjtRQUFBLGlCQU1DO1FBTEMsVUFBVSxDQUFDOztZQUNULElBQUksVUFBVSxHQUFhLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNwRixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBRVQ7Ozs7SUFFTSxpQ0FBUTs7Ozs7UUFDYixJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1SSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUM5QixJQUFNLFNBQVMscUJBQVEsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7O1lBQ3BELElBQUksVUFBVSxHQUFhLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDakQsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUNuQjtRQUNELE1BQU0sQ0FBQyxFQUFFLENBQUM7OztnQkF4QmIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQVAwQixVQUFVOzs7dUJBVWxDLEtBQUssU0FBQyxjQUFjOzt5QkFWdkI7O1NBUWEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHB4dENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaXNVc2VySW5SdWxlXSdcbn0pXG5leHBvcnQgY2xhc3MgUnVsZXNEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnaXNVc2VySW5SdWxlJykgcnVsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbGV0IHBlcm1pc3NvZXM6IHN0cmluZ1tdID0gdGhpcy5nZXRSdWxlcygpO1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBwZXJtaXNzb2VzLmluY2x1ZGVzKHRoaXMucnVsZSkgPyAnJyA6ICdub25lJztcbiAgICB9LCAyMDApO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0UnVsZXMoKTogc3RyaW5nW10ge1xuICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIFVzZXJTZXJ2aWNlLmdldFVzdWFyaW9Mb2dhZG8oKS5sb2dpbik7XG4gICAgaWYgKHRva2VuQXV0aG9yaXRpZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGF1dGhvcml0eSA9IDxhbnk+and0X2RlY29kZSh0b2tlbkF1dGhvcml0aWVzKTtcbiAgICAgIGxldCBwZXJtaXNzb2VzOiBzdHJpbmdbXSA9IGF1dGhvcml0eS5hdXRob3JpdGllcztcbiAgICAgIHJldHVybiBwZXJtaXNzb2VzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cbn1cbiJdfQ==