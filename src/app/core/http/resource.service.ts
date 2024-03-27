import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import {Injectable} from "@angular/core";
import { Resource } from '../../shared/models/resource';

@Injectable({
    providedIn: 'root'
})
export class ResourceService {
    url: string = "http://localhost:8000";
    type: string = "type=";
    endpoint: string = 'resources'
    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Acces-Control-Expose-Headers': '*',
            'Acces-Control-Allow-Methods': '*',
            'Acces-Control-Allow-Headers': '*',
        }),
    }

    constructor(private httpClient: HttpClient) {}

    public create(resource: Resource): Observable<Resource> {
        return this.httpClient.post<Resource>(`${this.url}/${this.endpoint}`, resource)
    }

    public createFormData(data: FormData) {
        return this.httpClient.post(`${this.url}/${this.endpoint}`, data)
    }

    public update(resource: Resource): Observable<Resource> {
        return this.httpClient.put<Resource>(
            `${this.url}/${this.endpoint}/${resource.id}`,
            resource,
        )
    }

    read(id: number): Observable<Resource> {
        return this.httpClient.get<Resource>(`${this.url}/${this.endpoint}/${id}`)
    }


    list(/*queryOptions: QueryOptions*/): Observable<Resource[]> {
        return this.httpClient.get<Resource[]>(
            `${this.url}/${this.endpoint}`
        ) /* ?${queryOptions.toQueryString()} */
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`)
    }

  
}
