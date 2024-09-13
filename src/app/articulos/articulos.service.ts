import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../Modelo/Respuesta';
import { Articulos } from './articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService { 

  private baseURL ="http://localhost:8090/articulos/";

  constructor(private httpClient : HttpClient) { }

  obtenerListaDeArticulos(){   
    return this.httpClient.get<Respuesta>(this.baseURL);    
 }
 registrarArticulos(articulos:Articulos){
  return this.httpClient.post<Respuesta>(this.baseURL,articulos);
 }
 eliminarArticulo(id_articulo:number){    
  const url = `${this.baseURL}${id_articulo}`;
  return this.httpClient.delete<Respuesta>(url);
 
 }
 obtenerArticuloPorId(id_articulo:number){
  return this.httpClient.get<Respuesta>(`${this.baseURL}${id_articulo}`);

 }
 editarArticulo(id: number, articulo: Articulos) {
  // Construye la URL incluyendo la parte '/update/' y el id
  const url = `${this.baseURL}update/${id}`;
  return this.httpClient.put<Respuesta>(url, articulo);
}

}
