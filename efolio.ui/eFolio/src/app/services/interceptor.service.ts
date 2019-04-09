import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('accessToken');
        if (userToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: userToken,
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return next.handle(req);
    }
}
