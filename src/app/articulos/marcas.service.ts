import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../Modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  private baseURL = "http://localhost:8090/marcas/";

  constructor(private http: HttpClient) { }

  getMarcas() {
    return this.http.get<Respuesta>(this.baseURL); 
  }
}
