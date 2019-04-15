import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              private loader: LoaderService,
              public loginValidatorBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.isAuthenticated();
    if (!user) {
      this.loginValidatorBar.open('Please sign in to eFolio or create an account', 'Ok', {
        duration: 3000,
        panelClass: ['snackBar'],
      });
      this.router.navigate(['account']);
    }
    return user;
  }
}



