import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    let headers = new HttpHeaders();
    this.addHeaders(headers);
    return this.http.get('http://localhost:5000/api/admin', {
      headers: headers
    })
  }
  addHeaders(headers: HttpHeaders) {  
    headers.append('Access-Control-Allow-Origin', '*');
  }
  getOneUser(id: number){
    let headers = new HttpHeaders();
    this.addHeaders(headers);
    return this.http.get('http://localhost:5000/api/admin/'+ id.toString(), {
      headers: headers
    });
  }
}
