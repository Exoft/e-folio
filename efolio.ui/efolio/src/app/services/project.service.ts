import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/Project');
  }

  getProject(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/Project/' + id);
  }

  getProjectSearched(searchString: string): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/Project/search/' + searchString.toLowerCase() + '?from=0&size=100');
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<void>('http://localhost:5000/api/Project/' + id);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put<void>('http://localhost:5000/api/Project/', project);
  }

  addProject(project: Project): Observable<any> {
    return this.http.post<void>('http://localhost:5000/api/Project/', project);
  }

}
