import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FunctionalityCriterion } from '../../shared/models/functionalityCriterion';


@Injectable({
  providedIn: 'root'
})
export class FunctionalityCriterionService {
  url: string = "http://localhost:8000"; 
  type: string = "type=";
  endpoint: string = 'functionalityCriterion';
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers': '*',
      'Acces-Control-Allow-Methods': '*',
      'Acces-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(functionalityCriterion: FunctionalityCriterion): Observable<FunctionalityCriterion> {
    return this.httpClient.post<FunctionalityCriterion>(`${this.url}/${this.endpoint}`, functionalityCriterion, this.optionRequete);
  }
  update(functionalityCriterion: FunctionalityCriterion): Observable<FunctionalityCriterion> {
    if (functionalityCriterion) {
      return this.httpClient.put<FunctionalityCriterion>(
        `${this.url}/${this.endpoint}/${functionalityCriterion.id}`,
        functionalityCriterion
      );
    } else {
      console.error('L\'identifiant de la fonctionnalité n\'est pas défini.');
      return new Observable<FunctionalityCriterion>();
    }
  }

  read(id: number): Observable<FunctionalityCriterion> {
    return this.httpClient.get<FunctionalityCriterion>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  list(): Observable<FunctionalityCriterion[]> {
    return this.httpClient.get<FunctionalityCriterion[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }
  listByFunctionalityId(id : number): Observable<FunctionalityCriterion[]> {
    return this.httpClient.get<FunctionalityCriterion[]>(`${this.url}/${this.endpoint}/functionality/${id}`, this.optionRequete);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }
 

}
