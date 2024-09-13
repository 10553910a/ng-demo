import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../Modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class TipoContribService {

  private baseURL = "http://localhost:8090/tipocontribuyente/";

  constructor(private http: HttpClient) { }

  obtenerTipoContrib(){
    return this.http.get<Respuesta>(this.baseURL);
  }
}
