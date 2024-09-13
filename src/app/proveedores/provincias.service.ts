import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../Modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  private baseURL = "http://localhost:8090/provincias/";

  constructor(private http: HttpClient) { }

  getProvincias() {
    return this.http.get<Respuesta>(this.baseURL);
  }
}

