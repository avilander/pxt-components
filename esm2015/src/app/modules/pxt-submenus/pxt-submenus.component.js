/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { PxtButton } from './model/pxt-submenus.model';
import { OptionsSubmenu } from './enum/option-submenu.enum';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
import { HttpHelperService } from '../../services/pxt-http/HttpHelperService';
/**
 * @template T
 */
export class PxtSubmenusComponent {
    /**
     * @param {?} _pxtAppService
     * @param {?} _serviceBase
     * @param {?} helper
     */
    constructor(_pxtAppService, _serviceBase, helper) {
        this._pxtAppService = _pxtAppService;
        this._serviceBase = _serviceBase;
        this.helper = helper;
        this.model = /** @type {?} */ ({});
        this.urlService = "";
        this.listing = new EventEmitter();
        this.buttons = [];
        this.enableSave = true;
        this.enableBack = true;
        this.enableClear = true;
        this.enableSearch = true;
        this.enableAdd = true;
        this.enableDelete = true;
        this.buttons.push(new PxtButton("keyboard_backspace", "VOLTAR", true, OptionsSubmenu.VOLTAR));
        this.buttons.push(new PxtButton("add", "SALVAR", true, OptionsSubmenu.SALVAR));
        this.buttons.push(new PxtButton("add", "NOVO", true, OptionsSubmenu.NOVO));
        this.buttons.push(new PxtButton("delete", "LIMPAR", true, OptionsSubmenu.LIMPAR));
        this.buttons.push(new PxtButton("search", "PESQUISAR", true, OptionsSubmenu.PESQUISAR));
        this.buttons.push(new PxtButton("delete", "EXCLUIR", true, OptionsSubmenu.EXCLUIR));
        setTimeout(() => {
            this.urlService = helper.getApi() + this.model.constructor.name;
            console.log(this.urlService);
        }, 100);
    }
    /**
     * @return {?}
     */
    save() {
        this._serviceBase.save(this.urlService, this.model).subscribe(result => {
            console.log(result);
        });
    }
    /**
     * @return {?}
     */
    search() {
        this._serviceBase.load(this.urlService, this.model).subscribe(result => {
            this.listing.emit(result);
        });
    }
    /**
     * @return {?}
     */
    delete() {
        this._serviceBase.delete(this.urlService, this.model).subscribe(result => {
            this.listing.emit(result);
        });
    }
    /**
     * @return {?}
     */
    clear() {
        throw new Error("Method 'clear()' not implemented.");
    }
    /**
     * @return {?}
     */
    add() {
        throw new Error("Method 'add()' not implemented.");
    }
    /**
     * @return {?}
     */
    back() {
        throw new Error("Method 'back()' not implemented.");
    }
}
PxtSubmenusComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-submenus',
                template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu}}\n  </a>\n  <a (click)=\"delete()\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                styles: [""]
            }] }
];
/** @nocollapse */
PxtSubmenusComponent.ctorParameters = () => [
    { type: PxtAppComponentService },
    { type: RequestBaseService },
    { type: HttpHelperService }
];
PxtSubmenusComponent.propDecorators = {
    model: [{ type: Input }],
    listing: [{ type: Output }],
    controller: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PxtSubmenusComponent.prototype.model;
    /** @type {?} */
    PxtSubmenusComponent.prototype.type;
    /** @type {?} */
    PxtSubmenusComponent.prototype.urlService;
    /** @type {?} */
    PxtSubmenusComponent.prototype.listing;
    /** @type {?} */
    PxtSubmenusComponent.prototype.controller;
    /** @type {?} */
    PxtSubmenusComponent.prototype.buttons;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableSave;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableBack;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableClear;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableSearch;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableAdd;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableDelete;
    /** @type {?} */
    PxtSubmenusComponent.prototype._pxtAppService;
    /** @type {?} */
    PxtSubmenusComponent.prototype._serviceBase;
    /** @type {?} */
    PxtSubmenusComponent.prototype.helper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBdUMsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7OztBQU05RSxNQUFNOzs7Ozs7SUEyQ0osWUFBbUIsY0FBc0MsRUFBUyxZQUFtQyxFQUFRLE1BQTBCO1FBQXBILG1CQUFjLEdBQWQsY0FBYyxDQUF3QjtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUFRLFdBQU0sR0FBTixNQUFNLENBQW9CO3VDQXpDbEgsRUFBTzswQkFFUCxFQUFFO3VCQUVnQixJQUFJLFlBQVksRUFBRTt1QkE2QmxDLEVBQUU7MEJBQ1osSUFBSTswQkFDSixJQUFJOzJCQUNILElBQUk7NEJBQ0gsSUFBSTt5QkFDUCxJQUFJOzRCQUNELElBQUk7UUFHakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwRixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFFO1lBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlCLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FFVDs7OztJQTlDRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckIsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCLENBQUMsQ0FBQTtLQUNIOzs7O0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQUE7S0FDSDs7OztJQUVELEtBQUs7UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FDdEQ7Ozs7SUFDRCxHQUFHO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ3BEOzs7O0lBQ0QsSUFBSTtRQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztLQUNyRDs7O1lBdENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsMDNCQUE0Qzs7YUFFN0M7Ozs7WUFSUSxzQkFBc0I7WUFDdEIsa0JBQWtCO1lBRWxCLGlCQUFpQjs7O29CQVF2QixLQUFLO3NCQUlMLE1BQU07eUJBQ04sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHh0QnV0dG9uIH0gZnJvbSAnLi9tb2RlbC9weHQtc3VibWVudXMubW9kZWwnO1xuaW1wb3J0IHsgT3B0aW9uc1N1Ym1lbnUgfSBmcm9tICcuL2VudW0vb3B0aW9uLXN1Ym1lbnUuZW51bSc7XG5pbXBvcnQgeyBQeHRDb250ZW50Qm9keSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcHh0LWNvbnRlbnQtYm9keSc7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWFwcC1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9IdHRwSGVscGVyU2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdweHQtc3VibWVudXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQeHRTdWJtZW51c0NvbXBvbmVudDxUPiB7XG5cbiAgQElucHV0KCkgbW9kZWw/OiBUID0ge30gYXMgVDtcbiAgdHlwZTogKG5ldyAoKSA9PiBUKTtcbiAgcHJpdmF0ZSB1cmxTZXJ2aWNlID0gXCJcIjtcblxuICBAT3V0cHV0KCkgbGlzdGluZzogRXZlbnRFbWl0dGVyPFRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI/OiBTdHJpbmc7XG5cbiAgc2F2ZSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5zYXZlKHRoaXMudXJsU2VydmljZSwgdGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIH0pO1xuICB9XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKHRoaXMudXJsU2VydmljZSwgdGhpcy5tb2RlbCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pXG4gIH1cbiAgZGVsZXRlKCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmRlbGV0ZSh0aGlzLnVybFNlcnZpY2UsIHRoaXMubW9kZWwpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5saXN0aW5nLmVtaXQocmVzdWx0KTtcbiAgICB9KVxuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdjbGVhcigpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG4gIGFkZCgpOiBUIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2FkZCgpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH1cblxuICBidXR0b25zOiBQeHRCdXR0b25bXSA9IFtdO1xuICBlbmFibGVTYXZlID0gdHJ1ZTtcbiAgZW5hYmxlQmFjayA9IHRydWU7XG4gIGVuYWJsZUNsZWFyID0gdHJ1ZTtcbiAgZW5hYmxlU2VhcmNoID0gdHJ1ZTtcbiAgZW5hYmxlQWRkID0gdHJ1ZTtcbiAgZW5hYmxlRGVsZXRlID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX3B4dEFwcFNlcnZpY2U6IFB4dEFwcENvbXBvbmVudFNlcnZpY2UsIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZTxUPixwdWJsaWMgaGVscGVyOiAgSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwia2V5Ym9hcmRfYmFja3NwYWNlXCIsIFwiVk9MVEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlZPTFRBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJTQUxWQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuU0FMVkFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIk5PVk9cIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTk9WTykpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJMSU1QQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTElNUEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcInNlYXJjaFwiLCBcIlBFU1FVSVNBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5QRVNRVUlTQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiRVhDTFVJUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5FWENMVUlSKSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVybFNlcnZpY2UgPSBoZWxwZXIuZ2V0QXBpKCkgKyB0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWUgO1xuICAgICAgY29uc29sZS5sb2codGhpcy51cmxTZXJ2aWNlKTtcbiAgICB9LCAxMDApO1xuXG4gIH1cblxufVxuIl19