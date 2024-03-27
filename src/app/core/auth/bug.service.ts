import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bug } from '../../shared/models/bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  url: string = "http://localhost:8000"; 
  type: string = "type=";
  endpoint: string = 'bugs';
  optionRequest = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(bug: Bug): Observable<Bug> {
    return this.httpClient.post<Bug>(`${this.url}/${this.endpoint}`, bug, this.optionRequest);
  }

  update(bug: Bug): Observable<Bug> {
    if (bug) {
      return this.httpClient.put<Bug>(
        `${this.url}/${this.endpoint}/${bug.id}`,
        bug
      );
    } else {
      console.error('The identifier of the bug is not defined.');
      return new Observable<Bug>();
    }
  }

  read(id: number): Observable<Bug> {
    return this.httpClient.get<Bug>(`${this.url}/${this.endpoint}/${id}`, this.optionRequest);
  }

  list(): Observable<Bug[]> {
    return this.httpClient.get<Bug[]>(`${this.url}/${this.endpoint}`, this.optionRequest);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequest);
  }
}
