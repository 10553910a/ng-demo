import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../Modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class TipoProveedorService {

  private baseURL = "http://localhost:8090/tipoProvedor/";

  constructor(private http: HttpClient) { }

  getTipoProveedor() {
    return this.http.get<Respuesta>(this.baseURL);
  }
}
