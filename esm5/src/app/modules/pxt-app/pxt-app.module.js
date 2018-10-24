/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxtAppComponent } from './pxt-app.component';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { PxtContentBody } from '../../directives/pxt-content-body';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { ConfigService } from '../../services/pxt-http/config.service';
import { HttpHelperService } from '../../services/pxt-http/http-helper-service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
import { PxtHttpService } from '../../services/pxt-http/pxt-http.service';
import { PipeModule } from '../../pipes/pipes.module';
import { MatMenuModule } from '@angular/material';
import { PxtAppMenuItemModule } from './pxt-app-menu-item/pxt-app-menu-item.module';
import { HashDirective } from '../../directives/HashDirective';
import { VisibleInRolesGuard } from '../../visible-in-roles.guard';
import { AuthorityService } from '../../services/authority.service';
import { TokenService } from '../../services/pxt-http/token.service';
import { ToastrModule } from 'ngx-toastr';
var PxtAppModule = /** @class */ (function () {
    function PxtAppModule() {
    }
    PxtAppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule,
                        PipeModule,
                        MatMenuModule,
                        PxtAppMenuItemModule,
                        ToastrModule.forRoot({ progressBar: true })
                    ],
                    declarations: [PxtAppComponent, PxtContentBody, HashDirective],
                    exports: [PxtAppComponent],
                    providers: [PxtAppComponentService, PxtHttpService,
                        RequestBaseService, HttpHelperService, ConfigService,
                        VisibleInRolesGuard, TokenService, AuthorityService]
                },] }
    ];
    return PxtAppModule;
}());
export { PxtAppModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWFwcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9weHQtc2hhcmVkLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcHh0LWFwcC9weHQtYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBNkQsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7Z0JBRXpDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixxQkFBcUI7d0JBQ3JCLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixvQkFBb0I7d0JBQ3BCLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUM7cUJBQzFDO29CQUNELFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDO29CQUM5RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQWM7d0JBQ2hELGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGFBQWE7d0JBQ3BELG1CQUFtQixFQUFDLFlBQVksRUFBQyxnQkFBZ0IsQ0FBQztpQkFDckQ7O3VCQW5DRDs7U0FvQ2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQeHRBcHBDb21wb25lbnQgfSBmcm9tICcuL3B4dC1hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQW5ndWxhck1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLWFuZ3VsYXIvbWF0ZXJpYWwtYW5ndWxhci5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcmVxdWVzdC1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHh0SHR0cFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9weHQtaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IFBpcGVNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFB4dEFwcE1lbnVJdGVtTW9kdWxlIH0gZnJvbSAnLi9weHQtYXBwLW1lbnUtaXRlbS9weHQtYXBwLW1lbnUtaXRlbS5tb2R1bGUnO1xuaW1wb3J0IHsgSGFzaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvSGFzaERpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXNpYmxlSW5Sb2xlc0d1YXJkIH0gZnJvbSAnLi4vLi4vdmlzaWJsZS1pbi1yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRob3JpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aG9yaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdHJNb2R1bGUgfSBmcm9tICduZ3gtdG9hc3RyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUsXG4gICAgUGlwZU1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIFB4dEFwcE1lbnVJdGVtTW9kdWxlLFxuICAgIFRvYXN0ck1vZHVsZS5mb3JSb290KHtwcm9ncmVzc0JhcjogdHJ1ZX0pICAgIFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRBcHBDb21wb25lbnQsIFB4dENvbnRlbnRCb2R5LCBIYXNoRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1B4dEFwcENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1B4dEFwcENvbXBvbmVudFNlcnZpY2UsIFB4dEh0dHBTZXJ2aWNlLCBcbiAgICBSZXF1ZXN0QmFzZVNlcnZpY2UsIEh0dHBIZWxwZXJTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCAgICAgXG4gICAgVmlzaWJsZUluUm9sZXNHdWFyZCxUb2tlblNlcnZpY2UsQXV0aG9yaXR5U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUHh0QXBwTW9kdWxlIHsgfVxuIl19