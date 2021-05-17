import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaises } from '../models/IPaises';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'https://restcountries.eu/rest/v2';

  public getAllPaises():Observable<IPaises[]> {
    return this.http.get<IPaises[]>(`${this.baseUrl}/all`);
  }
}
