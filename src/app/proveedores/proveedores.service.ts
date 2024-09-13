import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from '../Modelo/Respuesta';
import { Proveedores } from './proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private baseURL = "http://localhost:8090/proveedores/";

  constructor(private httpClient: HttpClient) { }

  obtenerListaDeProveedores(){   
    return this.httpClient.get<Respuesta>(this.baseURL);    
 }
 obtenerProveedorPorId(id_proveedor:number){
  return this.httpClient.get<Respuesta>(`${this.baseURL}${id_proveedor}`);

 } 
 eliminarProveedor(id_proveedor:number){    
  const url = `${this.baseURL}${id_proveedor}`;
  return this.httpClient.delete<Respuesta>(url);
 
 }

 guardarProveedor(proveedor:Proveedores){
  return this.httpClient.post<Respuesta>(this.baseURL,proveedor);

 }

 actualizarProveedor(id_proveedor:number,proveedor:Proveedores){
  return this.httpClient.put<Respuesta>(`${this.baseURL}${id_proveedor}`,proveedor);
 }
 }
  

