import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../proveedores.service';
import { Proveedores } from '../proveedores';
import {Router} from '@angular/router';
import  Swal from 'sweetalert2';
import { ProvinciasService } from '../provincias.service';
import {Provincias} from '../provincias'

@Component({
  selector: 'app-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.css']
  
})
export class ProveedoresComponent implements OnInit{

  proveedores : Proveedores[]=[];
  provincias : Provincias[];
  busqueda: string = '';
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 13; // Cantidad de elementos por página
  displayClientes: any[] = []; // Array de clientes que se mostrarán en la página actual
  

  constructor(private proveedoresService: ProveedoresService,private router:Router,
    private provinciaService:ProvinciasService){}

 ngOnInit(){
  this.obtenerProveedores();
  }
 

  private obtenerProveedores(){
    this.proveedoresService.obtenerListaDeProveedores().subscribe(dato=>{
      if(dato.res=='OK'){
        this.proveedores = dato.object as Proveedores[] ;
        console.log(dato);
      }
      else{ 
      }

    });
  }
  verDetalles(id_proveedor:number){
    this.router.navigate(['proveedores-detalles',id_proveedor]);

  }
  
  registrarProveedores(){
    this.router.navigate(['proveedores-registrar']);
    
  }

  eliminarProveedor(id_proveedor:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',      
    }).then((result) => {
      if (result.value) {
        // Realizar la eliminación
        this.proveedoresService.eliminarProveedor(id_proveedor).subscribe(data=>{
          if(data.res=='OK'){        
            console.log(data);
            //funcion para actualizar la pantalla una vez eliminado el proveedor
            this.proveedores = this.proveedores.filter(p => p.id_proveedor !== id_proveedor);
          }
        });        
            Swal.fire(
              'Eliminado',
              'El elemento ha sido eliminado.',
              'success'
            ).then(() => {
              // Cerrar la ventana modal
              Swal.close();
                           
            });
         
      }
    }); 
  }
  actualizarProveedor(id_proveedor:number){    
    this.router.navigate(['proveedores-actualizar',id_proveedor]);
      
  }
  buscarProveedor(){
    // Filtrar la matriz de clientes según la cadena de búsqueda
    const proveedorFiltrados = this.proveedores.filter(proveedores =>
      proveedores.razonSocial.toLowerCase().includes(this.busqueda.toLowerCase())
  );

  // Actualizar la matriz de clientes mostrados en la tabla
  this.proveedores = proveedorFiltrados;
  
  this.currentPage = 1;//paginacion
  this.actualizarProveedoresMostrados();//paginacion
  }
   //paginacion
   actualizarProveedoresMostrados() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayClientes = this.proveedores.slice(startIndex, endIndex);
  }
  cambiarPagina(page: number) {
    this.currentPage = page;
    this.actualizarProveedoresMostrados();
  }
  
  paginaAnterior() {
    if (this.currentPage > 1) {
      this.cambiarPagina(this.currentPage - 1);
    }
  }
  
  paginaSiguiente() {
    const totalPages = Math.ceil(this.proveedores.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.cambiarPagina(this.currentPage + 1);
    }
  }
  getPaginas(): number[] {
    const totalPages = this.getTotalPaginas();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  
  getTotalPaginas(): number {
    return Math.ceil(this.proveedores.length / this.itemsPerPage);
  }

}
