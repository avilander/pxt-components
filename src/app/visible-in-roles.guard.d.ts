import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHelperService } from './services/pxt-http/http-helper-service';
import { AuthorityService } from './services/authority.service';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material';
export declare class VisibleInRolesGuard implements CanActivate {
    private router;
    private httpHelper;
    private authorityService;
    private userService;
    private dialog;
    private urlHelper;
    constructor(router: Router, httpHelper: HttpHelperService, authorityService: AuthorityService, userService: UserService, dialog: MatDialog, urlHelper: HttpHelperService);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    openDialog(erro: any): void;
}
