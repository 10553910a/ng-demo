import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from '../Modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  private baseURL = "http://localhost:8090/rubros/";

  constructor(private http: HttpClient) { }

  getRubros(){
    return this.http.get<Respuesta>(this.baseURL);
  }
}
