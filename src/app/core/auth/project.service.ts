import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import {Injectable} from "@angular/core";
import { Project } from '../../shared/models/project';


@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    url: string = "http://localhost:8000";
    type: string = "type=";
    endpoint: string = 'projects'
    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Acces-Control-Expose-Headers': '*',
            'Acces-Control-Allow-Methods': '*',
            'Acces-Control-Allow-Headers': '*',
        }),
    }

    constructor(private httpClient: HttpClient) {}

    public create(project: Project): Observable<Project> {
        return this.httpClient.post<Project>(`${this.url}/${this.endpoint}`, project)
    }

    public createFormData(data: FormData) {
        return this.httpClient.post(`${this.url}/${this.endpoint}`, data)
    }


    public update(project: Project): Observable<Project> {
        return this.httpClient.put<Project>(
            `${this.url}/${this.endpoint}/${project.id}`, 
            project,
        );
    }
    
    read(id: number): Observable<Project> {
        return this.httpClient.get<Project>(`${this.url}/${this.endpoint}/${id}`)
    }


    list(/*queryOptions: QueryOptions*/): Observable<Project[]> {
        return this.httpClient.get<Project[]>(
            `${this.url}/${this.endpoint}`
        ) /* ?${queryOptions.toQueryString()} */
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`)
    }
     

    addResource(idProject: number, idResource: number) {
        return this.httpClient.post(
            `${this.url}/${this.endpoint}/${idProject}/resources/${idResource}`,
            null // Vous pouvez passer un corps (body) si nécessaire
        );
    }



    // public addFile(data: FormData, itemId: number, fileName: string) {
    //     return this.httpClient.post(
    //         `${this.url}/${this.endpoint}/${itemId}/${fileName}`,
    //         data,
    //     )
    // }
}
