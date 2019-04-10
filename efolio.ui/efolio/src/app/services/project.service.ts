import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  GetAll() {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get<any>('http://localhost:5000/api/Project', {
      headers: httpHeaders
    });
  }

  GetProject(id: number) {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.get<any>('http://localhost:5000/api/Project/' + id, {
      headers: httpHeaders
    });
  }
  getProjectSearched(searchString: string) {
    return this.http.get<any>('http://localhost:5000/api/Project/search/' + searchString.toLowerCase() + '?from=0&size=100');
  }

  addHeaders(headers: HttpHeaders) {
    headers.append('Authorization', 'kbasdlkgjbasalskfhalkdg');
    headers.append('Own-header', 'Ostap');
  }

  DeleteProject(id: number) {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.delete<void>('http://localhost:5000/api/Project/' + id, {
      headers: httpHeaders
    });
  }

  UpdateProject(project: Project) {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.put<void>('http://localhost:5000/api/Project/', project, {
      headers: httpHeaders
    });
  }

  AddProject(project: Project) {
    const httpHeaders = new HttpHeaders();
    this.addHeaders(httpHeaders);
    return this.http.post<void>('http://localhost:5000/api/Project/', project, {
      headers: httpHeaders
    });
  }

}
