import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Functionality } from '../../shared/models/functionality';
import { Resource } from '../../shared/models/resource';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {
  getAffectedResources(functionalityId: number) {
    throw new Error('Method not implemented.');
  }
  url: string = "http://localhost:8000"; 
  endpoint: string = 'functionalities';
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers': '*',
      'Acces-Control-Allow-Methods': '*',
      'Acces-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(functionality: Functionality): Observable<Functionality> {
    return this.httpClient.post<Functionality>(`${this.url}/${this.endpoint}`, functionality, this.optionRequete);
  }

  public update(functionality: Functionality): Observable<Functionality> {
    return this.httpClient.put<Functionality>(
      `${this.url}/${this.endpoint}/${functionality.id}`,
      functionality,
      this.optionRequete
    );
  }

  read(id: number): Observable<Functionality> {
    return this.httpClient.get<Functionality>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  list(): Observable<Functionality[]> {
    return this.httpClient.get<Functionality[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  assignResourceToFunctionality(functionalityId: number, resourceId: number) {
    const url = `${this.url}/${this.endpoint}/${functionalityId}/resources/${resourceId}`;
    return this.httpClient.post(url, null);
}
  getAssignedResources(functionalityId: number): Observable<Resource[]> {
    const url = `${this.endpoint}/${functionalityId}/resources`;
    return this.httpClient.get<Resource[]>(url);
  }
getFunctionalityWithResources(id: number): Observable<Functionality> {
  return this.httpClient.get<Functionality>(`http://localhost:8000/functionalities/${id}`);
}



}
