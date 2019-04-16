import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from '../models/developer.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiString = 'http://localhost:5000/api/email/';

  constructor(private http: HttpClient) { }

  sendEmail(emailData){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(this.apiString, emailData , {
        headers:httpHeaders
     })
  }
}
