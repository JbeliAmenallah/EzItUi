
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prediction } from '../../shared/models/prediction';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://localhost:8080/predictions';

  constructor(private http: HttpClient) { }

  addPredictionForUsername(username: string): Observable<Prediction> {
    return this.http.get<Prediction>(`${this.apiUrl}/add/${username}`);
  }

  getPredictionById(id: number): Observable<Prediction> {
    return this.http.get<Prediction>(`${this.apiUrl}/${id}`);
  }

  getPredictionByUsername(username: string): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.apiUrl}/user/${username}`);
  }

  getPredictionsByYearAndUsername(username: string, year: number): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.apiUrl}/user/${username}/year/${year}`);
  }
}
