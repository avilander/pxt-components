/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { PxtButton } from './model/pxt-submenus.model';
import { OptionsSubmenu } from './enum/option-submenu.enum';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
import { HttpHelperService } from '../../services/pxt-http/http-helper-service';
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
            this._serviceBase.urlServiceAuto = this.urlService;
            console.log(this.urlService);
        }, 100);
    }
    /**
     * @return {?}
     */
    save() {
        this._serviceBase.save(this.model).subscribe(result => {
            console.log(result);
        });
    }
    /**
     * @return {?}
     */
    search() {
        this._serviceBase.load().subscribe(result => {
            this.listing.emit(result);
        });
    }
    /**
     * @return {?}
     */
    delete() {
        this._serviceBase.delete(1).subscribe(result => {
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
                template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"delete()\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu | uppercaseFirst}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBdUMsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7OztBQU1oRixNQUFNOzs7Ozs7SUEwQ0osWUFBbUIsY0FBc0MsRUFBUyxZQUFtQyxFQUFRLE1BQTBCO1FBQXBILG1CQUFjLEdBQWQsY0FBYyxDQUF3QjtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUFRLFdBQU0sR0FBTixNQUFNLENBQW9CO3VDQXhDbEgsRUFBTzswQkFDUCxFQUFFO3VCQUVnQixJQUFJLFlBQVksRUFBRTt1QkE2QmxDLEVBQUU7MEJBQ1osSUFBSTswQkFDSixJQUFJOzJCQUNILElBQUk7NEJBQ0gsSUFBSTt5QkFDUCxJQUFJOzRCQUNELElBQUk7UUFHakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUdwRixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2hFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUU7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUIsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNUOzs7O0lBaERELElBQUk7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckIsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0IsQ0FBQyxDQUFBO0tBQ0g7Ozs7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCLENBQUMsQ0FBQTtLQUNIOzs7O0lBRUQsS0FBSztRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUN0RDs7OztJQUNELEdBQUc7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDcEQ7Ozs7SUFDRCxJQUFJO1FBQ0YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQ3JEOzs7WUFyQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixnK0JBQTRDOzthQUU3Qzs7OztZQVJRLHNCQUFzQjtZQUN0QixrQkFBa0I7WUFFbEIsaUJBQWlCOzs7b0JBUXZCLEtBQUs7c0JBR0wsTUFBTTt5QkFDTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjb250cm9sbGVyPzogU3RyaW5nO1xuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2Uuc2F2ZSh0aGlzLm1vZGVsKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cbiAgc2VhcmNoKCkge1xuICAgIHRoaXMuX3NlcnZpY2VCYXNlLmxvYWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMubGlzdGluZy5lbWl0KHJlc3VsdCk7XG4gICAgfSlcbiAgfVxuICBkZWxldGUoKSB7XG4gICAgdGhpcy5fc2VydmljZUJhc2UuZGVsZXRlKDEpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5saXN0aW5nLmVtaXQocmVzdWx0KTtcbiAgICB9KVxuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdjbGVhcigpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG4gIGFkZCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2FkZCgpJyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG4gIGJhY2soKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdiYWNrKCknIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH1cblxuICBidXR0b25zOiBQeHRCdXR0b25bXSA9IFtdO1xuICBlbmFibGVTYXZlID0gdHJ1ZTtcbiAgZW5hYmxlQmFjayA9IHRydWU7XG4gIGVuYWJsZUNsZWFyID0gdHJ1ZTtcbiAgZW5hYmxlU2VhcmNoID0gdHJ1ZTtcbiAgZW5hYmxlQWRkID0gdHJ1ZTtcbiAgZW5hYmxlRGVsZXRlID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX3B4dEFwcFNlcnZpY2U6IFB4dEFwcENvbXBvbmVudFNlcnZpY2UsIHB1YmxpYyBfc2VydmljZUJhc2U6IFJlcXVlc3RCYXNlU2VydmljZTxUPixwdWJsaWMgaGVscGVyOiAgSHR0cEhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwia2V5Ym9hcmRfYmFja3NwYWNlXCIsIFwiVk9MVEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlZPTFRBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJTQUxWQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuU0FMVkFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIk5PVk9cIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTk9WTykpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJMSU1QQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTElNUEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcInNlYXJjaFwiLCBcIlBFU1FVSVNBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5QRVNRVUlTQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiRVhDTFVJUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5FWENMVUlSKSk7XG5cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cmxTZXJ2aWNlID0gaGVscGVyLmdldEFwaSgpICsgdGhpcy5tb2RlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgdGhpcy5fc2VydmljZUJhc2UudXJsU2VydmljZUF1dG8gPSB0aGlzLnVybFNlcnZpY2UgO1xuICAgICAgY29uc29sZS5sb2codGhpcy51cmxTZXJ2aWNlKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbn1cbiJdfQ==