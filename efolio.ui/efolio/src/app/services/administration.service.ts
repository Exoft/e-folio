import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from '../components/models/developer.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get('http://localhost:5000/api/admin', {
      headers: httpHeaders
    });
  }
  
  getOneUser(id: number){
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get('http://localhost:5000/api/admin/'+ id.toString(), {
      headers: httpHeaders
    });
  }

  getAllDevelopers() {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get<Developer>('http://localhost:5000/api/developers', {
      headers: httpHeaders
    });
  }

  getOneDeveloper(id: number){
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get<Developer>('http://localhost:5000/api/developers/' + id, {
        headers: httpHeaders
    });
  }
  addDeveloper(developer: Developer){
    developer.id = 0;
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.post<Developer>('http://localhost:5000/api/developers', {
        headers: httpHeaders
    });
  }

  deleteOneDeveloper(id: number) {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.delete<Developer>('http://localhost:5000/api/developers/' + id.toString(), {
      headers: httpHeaders
    });
  }

  addHeaders(headers: HttpHeaders) {  
    headers.append('Access-Control-Allow-Origin', '*');
  }
}
