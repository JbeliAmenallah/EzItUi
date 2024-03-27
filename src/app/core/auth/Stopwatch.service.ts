import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stopwatch } from '../../shared/models/stopwatch'; // Assurez-vous d'importer le bon modèle pour le chronomètre


@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  url: string = "http://localhost:8000";
  endpoint: string = 'stopwatches'; // Assurez-vous d'utiliser le bon endpoint pour les chronomètres
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers': '*',
      'Acces-Control-Allow-Methods': '*',
      'Acces-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(stopwatch: Stopwatch): Observable<Stopwatch> {
    return this.httpClient.post<Stopwatch>(`${this.url}/${this.endpoint}`, stopwatch, this.optionRequete);
  }

  public update(stopwatch: Stopwatch): Observable<Stopwatch> {
    return this.httpClient.put<Stopwatch>(
      `${this.url}/${this.endpoint}/${stopwatch.id}`,
      stopwatch,
      this.optionRequete
    );
  }

  read(id: number): Observable<Stopwatch> {
    return this.httpClient.get<Stopwatch>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  list(): Observable<Stopwatch[]> {
    return this.httpClient.get<Stopwatch[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }
}
