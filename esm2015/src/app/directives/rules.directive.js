/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { pxtAppConfig } from "../models/pxtConfiguration";
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';
export class RulesDirective {
    /**
     * @param {?} el
     * @param {?} userService
     */
    constructor(el, userService) {
        this.el = el;
        this.userService = userService;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            /** @type {?} */
            let permissoes = this.getRules();
            this.el.nativeElement.style.display = permissoes.includes(this.rule) ? '' : 'none';
        }, 200);
    }
    /**
     * @return {?}
     */
    getRules() {
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtAppConfig.systemId + pxtAppConfig.systemPrex + this.userService.getUsuarioLogado().identificador);
        if (tokenAuthorities !== null) {
            /** @type {?} */
            const authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
            /** @type {?} */
            let permissoes = authority.authorities;
            return permissoes;
        }
        return [];
    }
}
RulesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[isUserInRule]'
            },] }
];
/** @nocollapse */
RulesDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: UserService }
];
RulesDirective.propDecorators = {
    rule: [{ type: Input, args: ['isUserInRule',] }]
};
if (false) {
    /** @type {?} */
    RulesDirective.prototype.rule;
    /** @type {?} */
    RulesDirective.prototype.el;
    /** @type {?} */
    RulesDirective.prototype.userService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9kaXJlY3RpdmVzL3J1bGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBS3ZELE1BQU07Ozs7O0lBSUosWUFBbUIsRUFBYyxFQUFTLFdBQXlCO1FBQWhELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztLQUFLOzs7O0lBRXhFLGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRyxFQUFFOztZQUNkLElBQUksVUFBVSxHQUFhLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNwRixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBRVQ7Ozs7SUFFTSxRQUFROztRQUNiLElBQUksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pKLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQzlCLE1BQU0sU0FBUyxxQkFBUSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBQzs7WUFDcEQsSUFBSSxVQUFVLEdBQWEsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUNqRCxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ25CO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7OztZQXhCYixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQVAwQixVQUFVO1lBRzVCLFdBQVc7OzttQkFPakIsS0FBSyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBweHRBcHBDb25maWcgfSBmcm9tIFwiLi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaXNVc2VySW5SdWxlXSdcbn0pXG5leHBvcnQgY2xhc3MgUnVsZXNEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnaXNVc2VySW5SdWxlJykgcnVsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHVzZXJTZXJ2aWNlIDogVXNlclNlcnZpY2UpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxldCBwZXJtaXNzb2VzOiBzdHJpbmdbXSA9IHRoaXMuZ2V0UnVsZXMoKTtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gcGVybWlzc29lcy5pbmNsdWRlcyh0aGlzLnJ1bGUpID8gJycgOiAnbm9uZSc7XG4gICAgfSwgMjAwKTtcblxuICB9XG5cbiAgcHVibGljIGdldFJ1bGVzKCk6IHN0cmluZ1tdIHtcbiAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dEFwcENvbmZpZy5zeXN0ZW1JZCArIHB4dEFwcENvbmZpZy5zeXN0ZW1QcmV4ICsgdGhpcy51c2VyU2VydmljZS5nZXRVc3VhcmlvTG9nYWRvKCkuaWRlbnRpZmljYWRvcik7XG4gICAgaWYgKHRva2VuQXV0aG9yaXRpZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGF1dGhvcml0eSA9IDxhbnk+and0X2RlY29kZSh0b2tlbkF1dGhvcml0aWVzKTtcbiAgICAgIGxldCBwZXJtaXNzb2VzOiBzdHJpbmdbXSA9IGF1dGhvcml0eS5hdXRob3JpdGllcztcbiAgICAgIHJldHVybiBwZXJtaXNzb2VzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cbn1cbiJdfQ==