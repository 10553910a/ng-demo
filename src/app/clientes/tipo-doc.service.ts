import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../Modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class TipoDocService  {

  private baseURL = "http://localhost:8090/tipodocumento/";

  constructor(private http: HttpClient) { }

  getTiposDoc() {
    return this.http.get<Respuesta>(this.baseURL);
  }
}
