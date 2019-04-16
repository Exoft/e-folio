import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from '../models/developer.model';
import { Observable, merge, EMPTY, concat } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('http://localhost:5000/api/admin');
  }

  getOneUser(id: number): Observable<any> {
    return this.http.get('http://localhost:5000/api/admin/' + id.toString());
  }

  getAllDevelopers(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/developers');
  }

  getOneDeveloper(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/developers/' + id);
  }

  addDeveloper(developer: Developer): Observable<any> {
    return this.http.post<void>('http://localhost:5000/api/developers/', developer);
  }

  deleteOneDeveloper(id: number): Observable<any> {
    return this.http.delete<void>('http://localhost:5000/api/developers/' + id);
  }

  editDeveloper(developer: Developer, imageData: FormData): Observable<any> {
    return this.http.put<Developer>('http://localhost:5000/api/developers/', developer).pipe(
      switchMap(resp => {
        console.log(imageData);
        if (imageData) {
          return this.http.put<FormData>(
            'http://localhost:5000/api/developers/avatar/' + developer.id,
             imageData
          );
        } else {
          return EMPTY;
        }
      })
    );
  }
}
