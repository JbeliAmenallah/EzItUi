import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url: string = "http://localhost:8000";

  endpoint: string = 'tasks';
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers': '*',
      'Acces-Control-Allow-Methods': '*',
      'Acces-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.url}/${this.endpoint}`, task, this.optionRequete);
  }

  public update(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(
      `${this.url}/${this.endpoint}/${task.id}`,
      task,
      this.optionRequete
    );
  }

  read(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  list(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  // Ajouter cette méthode pour récupérer la liste des fonctionnalités
  listFunctionalities(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/functionalities`, this.optionRequete);
  }
  getTasksByFunctionalityId(id: number):
  Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}/${this.endpoint}/functionality/${id}`, this.optionRequete);
  }

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }
  
}
