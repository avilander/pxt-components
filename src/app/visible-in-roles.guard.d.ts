import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHelperService } from './services/pxt-http/http-helper-service';
import { AuthorityService } from './services/authority.service';
export declare class VisibleInRolesGuard implements CanActivate {
    private router;
    private httpHelper;
    private authorityService;
    constructor(router: Router, httpHelper: HttpHelperService, authorityService: AuthorityService);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
