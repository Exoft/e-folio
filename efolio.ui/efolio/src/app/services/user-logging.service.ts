import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserLoggingService {

    constructor(private httpClient: HttpClient) { }

    signIn(loginData): Observable<any> {
        return this.httpClient.post('http://localhost:5000/api/account/login/', loginData)
    }

    signUp(registerData): Observable<any> {
        return this.httpClient.post('http://localhost:5000/api/account/register/', registerData);
    }

    getUserInfo(userId) : Observable<any>{
        return this.httpClient.get('http://localhost:5000/api/admin/' + userId);
    }

    isAuthenticated(): boolean {
        let token = localStorage.getItem("accessToken");
        return token !== null && token !== undefined;
    }

    userRole(): String {
        let role = localStorage.getItem("userRole") || "unauthorized";
        return role;
    }
}
