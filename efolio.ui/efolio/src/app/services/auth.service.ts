import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    signIn(loginData): Observable<any> {
        return this.httpClient.post(environment.apiUrl + '/api/account/login/', loginData);
    }

    signUp(registerData): Observable<any> {
        return this.httpClient.post(environment.apiUrl + '/api/account/register/', registerData);
    }

    getUserInfo(userId): Observable<any> {
        return this.httpClient.get(environment.apiUrl + '/api/admin/' + userId);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('accessToken');
        return token !== null && token !== undefined;
    }

    userRole(): string {
        const role = localStorage.getItem('userRole') || 'unauthorized';
        return role;
    }

    deleteUserData() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    }
}
