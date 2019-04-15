import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from '../models/developer.model';
import { Observable } from 'rxjs';

@Injectable()
export class DeveloperService {

  constructor(private http: HttpClient) { }

  getAllDevelopers() {
    return this.http.get<Developer>('http://localhost:5000/api/developers');
  }

  getOneDeveloper(id: number):Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/developers/' + id);
  }
}
