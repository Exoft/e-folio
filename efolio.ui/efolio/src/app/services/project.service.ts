import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiString = environment.apiUrl + '/api/Project/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiString);
  }

  getProject(id: number): Observable<any> {
    return this.http.get<any>(this.apiString + id);
  }

  getProjectSearched(searchString: string, from: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiString + 'search/' + searchString.toLowerCase() +
      '?from=' + from + '&size=' + size);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<void>(this.apiString + id);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put<void>(this.apiString, project);
  }

  addProject(project: Project): Observable<any> {
    return this.http.post<void>(this.apiString, project);
  }

  getProjectSize(): Observable<number> {
    return this.http.get<number>(this.apiString + 'size');
  }
}
