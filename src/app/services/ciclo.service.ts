import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Ciclo } from '../models/ciclo';
@Injectable({
  providedIn: 'root'
})
export class CicloService {


  ciclo:Ciclo

  readonly URL_API = 'https://dualapi.herokuapp.com/api/CiclosFs';

  constructor(private http: HttpClient) {

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  getCiclos() {
    return this.http.get<[]>(this.URL_API);
  }

  getCicloPorId(id) {
    return this.http.get<Ciclo>(`${this.URL_API}/${id}`);
  }

  deleteCiclos(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
  postCiclos(ciclo:Ciclo){
    return this.http.post<[]>(this.URL_API,ciclo);
  }

  patchCiclos(id,ciclos: Ciclo) {
    const ciclosTemp = {
      ...ciclos
    };
  
    delete ciclosTemp.id;
    return this.http.patch(this.URL_API + `/${id}`, ciclosTemp);
  }
}