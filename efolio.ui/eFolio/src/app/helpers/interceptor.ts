import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { throwError, empty } from 'rxjs';
import { LoaderService } from '../services/loader.service'; 
import { AuthService } from '../services/auth.service';
 
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private router: Router, 
                private notification: MatSnackBar,
                private loaderService: LoaderService,
                private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('accessToken');
        if (userToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: userToken,
                }
            });
        }

        return next.handle(req).pipe(
            catchError((resp) => {
                let observable : Observable<HttpEvent<any>>;

                if (resp instanceof HttpErrorResponse) {
                    if (resp.status === 401) {
   			observable = empty();
                        
			this.authService.deleteUserData();
                        this.router.navigate['account'];
                    } else if (resp.status === 0 || resp.status >= 500 ) {
   			observable = empty();
                        
			this.loaderService.stopLoading();
                        let displayMessage : string;

                        if (resp.status === 0) {
                            displayMessage = 'Cannot connect to server.';
                        } else { 
                            displayMessage = 'Server error.';
                        } 
                        
                        this.notification.open(displayMessage, 'Ok', {
                            duration: 8000,
                            panelClass: ['snackBar'],
                        });
                    } 
		    else {
                        observable = throwError(resp);
                    }
                }
                else {
                    observable = throwError(resp)
                }
                return observable;
            })
        );
    }
}
