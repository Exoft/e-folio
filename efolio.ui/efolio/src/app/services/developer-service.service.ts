import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from '../models/developer.model';

@Injectable()
export class DeveloperServiceService {

  constructor(private http: HttpClient) { }

  getAllDevelopers() {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get<Developer>('http://localhost:5000/api/developers', {
      headers: httpHeaders
    });
  }

  getOneDeveloper(id: number) {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get<any>('http://localhost:5000/api/developers/' + id, {
        headers: httpHeaders
    });
  }

  addHeaders(headers: HttpHeaders) {
    headers.append('Authorization', 'qwertyasdfgzxvc');
    headers.append('Own-header', 'Name');
  }

  getDevelopersSearched(searchString: string, from: number, size: number) {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get<Developer>( 'http://localhost:5000/api/developers/' + 'search/' + searchString.toLowerCase() +
      '?from=' + from + '&size=' + size);
  }
}
