import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupFunctionality } from '../../shared/models/groupfunctionality';// Importez le modèle de données approprié

@Injectable({
  providedIn: 'root'
})
export class GroupFunctionalityService {
  url: string = "http://localhost:8000";
  endpoint: string = 'group-functionalities'; // Mettez à jour l'endpoint
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers': '*',
      'Acces-Control-Allow-Methods': '*',
      'Acces-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(groupFunctionality: GroupFunctionality): Observable<GroupFunctionality> {
    return this.httpClient.post<GroupFunctionality>(`${this.url}/${this.endpoint}`, groupFunctionality, this.optionRequete);
  }

  public update(groupFunctionality: GroupFunctionality): Observable<GroupFunctionality> {
    return this.httpClient.put<GroupFunctionality>(
      `${this.url}/${this.endpoint}/${groupFunctionality.id}`,
      groupFunctionality,
      this.optionRequete
    );
  }

  read(id: number): Observable<GroupFunctionality> {
    return this.httpClient.get<GroupFunctionality>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  list(): Observable<GroupFunctionality[]> {
    return this.httpClient.get<GroupFunctionality[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }
}
