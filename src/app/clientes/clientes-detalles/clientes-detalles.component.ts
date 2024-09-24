import { Component, OnInit } from '@angular/core';
import {Clientes} from '../clientes'
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-detalles',
  templateUrl: './clientes-detalles.component.html',
  styleUrls: ['./clientes-detalles.component.css']
})
export class ClientesDetallesComponent implements OnInit {

  id_cliente: number;
  cliente:Clientes;
  clientes:Clientes[];

  constructor(private route:ActivatedRoute,private clientesService:ClienteService,
    private router: Router ){}

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.params['id_cliente'];
    this.cliente = new Clientes();
    this.clientesService.obtenerClientePorId(this.id_cliente).subscribe(dato=>{
     if(dato.res=='OK'){
      console.log(dato);
      this.cliente = dato.object as Clientes;
      Swal.fire(`Detalles del cliente: ${this.cliente.razon_social}`);
     }
    }); 
    
  }
  onSubmit(){    
      this.router.navigate(['/clientes']);  
           
  }
  actualizarCliente(id_cliente: number) {
    this.router.navigate(['actualizar-clientes', id_cliente]);
  }
  
  
  }


