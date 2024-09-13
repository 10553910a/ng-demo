import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../Modelo/Respuesta';
import { Unidad } from '../articulos/unidad-venta';

@Injectable({
  providedIn: 'root'
})
export class UnidadVentaService {

  private baseURL = "http://localhost:8090/unidad/";

  constructor(private http: HttpClient) { }

  getUnidadVenta(){
    return this.http.get<Respuesta>(this.baseURL);
  }

  insertUnidadVenta(UnidadVenta:Unidad){    
    return this.http.post<Respuesta>(this.baseURL,UnidadVenta);
  }
}
