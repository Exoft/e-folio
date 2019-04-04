import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    const headers = new HttpHeaders();
    this.addHeaders(headers);
    return this.http.get('http://localhost:5000/api/admin', {
      headers
    });
  }
  addHeaders(headers: HttpHeaders) {
    headers.append('Access-Control-Allow-Origin', '*');
  }
  getOneUser(id: number) {
    const headers = new HttpHeaders();
    this.addHeaders(headers);
    return this.http.get('http://localhost:5000/api/admin/' + id.toString(), {
      headers
    });
  }
}
