import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from './clientes';
import { Respuesta } from '../Modelo/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //url para lista clientes en el back-end
  private baseURL ="http://localhost:8090/clientes/getAll";
  private baseURL2 ="http://localhost:8090/clientes/insert";
  private baseURL3 ="http://localhost:8090/clientes/delete";
  private baseURL4 ="http://localhost:8090/clientes/getById";
  private baseURL5 ="http://localhost:8090/clientes/update";
  constructor(private httpClient : HttpClient) { }
  
//este metodo obtiene los clientes
  obtenerListaDeClientes(){   
    return this.httpClient.get<Respuesta>(this.baseURL);    
 }

 registrarClientes(clientes:Clientes){
  return this.httpClient.post<Respuesta>(this.baseURL2,clientes);
   
 }
 obtenerClientePorId(id_cliente:number){
  return this.httpClient.get<Respuesta>(`${this.baseURL4}/${id_cliente}`);

 }
 eliminarCliente(id_cliente:number){    
  const url = `${this.baseURL3}/${id_cliente}`;
  return this.httpClient.delete<Respuesta>(url);
 
 }
 actualizarCliente(id_cliente:number,cliente:Clientes){
  return this.httpClient.put<Respuesta>(`${this.baseURL5}/${id_cliente}`,cliente);
 }
 
}
