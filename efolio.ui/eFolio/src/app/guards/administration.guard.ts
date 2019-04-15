import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdministrationGuard implements CanActivate {
  constructor(private authService: AuthService,
              private loader: LoaderService,
              private router: Router,
              private notification: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let canActivate: boolean = this.authService.isAuthenticated();

    canActivate = canActivate && this.authService.userRole() === 'admin';

    if (!canActivate) {
      this.loader.stopLoading();
      this.notification.open('You do not have enough rights', 'Ok', {
        duration: 3000,
        panelClass: ['snackBar'],
      });
      this.router.navigate(['/']);
    }
    return canActivate;
  }
}
