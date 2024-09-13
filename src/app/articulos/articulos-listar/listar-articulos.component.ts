import { Component, OnInit } from '@angular/core';
import { Articulos } from '../articulos';
import { ArticulosService} from '../articulos.service'
import {Router} from '@angular/router';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css']
})
export class ListarArticulosComponent implements OnInit{

  constructor(private artiulosServicio : ArticulosService, private router:Router) {}


  articulos:Articulos[]=[];

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Cantidad de elementos por página
  displayClientes: any[] = []; // Array de clientes que se mostrarán en la página actual

  ngOnInit(): void {
    this.octenerArticulos();
  }
  private octenerArticulos(){
    this.artiulosServicio.obtenerListaDeArticulos().subscribe(data=>{
      if(data.res=='OK'){
        this.articulos = data.object as Articulos[] ;       
        console.log(data);

        // Llamar a getTotalPaginas() después de obtener los clientes
      const paginas = this.getTotalPaginas();
      }
      else{
      }
    });
  }  
   
  actualizarArticulo(idArticulo:number){
    this.router.navigate(['articulos-editar',idArticulo]);
  }
  eliminarArticulo(idArticulo:number){
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
        this.artiulosServicio.eliminarArticulo(idArticulo).subscribe(data=>{
          if(data.res=='OK'){        
            console.log(data);
            this.octenerArticulos();
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
  verDetalles(idArticulo:number){
    this.router.navigate(['articulos-detalles',idArticulo]);
  }

  registrarArticulos(){
    this.router.navigate(['articulos-registrar']);
  }

  buscarArticulos(){
     // Filtrar la matriz de clientes según la cadena de búsqueda
     const articulosFiltrados = this.articulos.filter(articulos =>
      articulos.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
     );
      // Actualizar la matriz de clientes mostrados en la tabla
  this.articulos = articulosFiltrados;
  
  this.currentPage = 1;//paginacion
  this.actualizarArticulosMostrados();//paginacion
  }
  busqueda: string = '';
  actualizarArticulosMostrados() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayClientes = this.articulos.slice(startIndex, endIndex);
  }

  cambiarPagina(page: number){
    this.currentPage = page;
    this.actualizarArticulosMostrados()
  }
  
  paginaAnterior(){
    if (this.currentPage > 1) {
      this.cambiarPagina(this.currentPage - 1);
    }
  }

  paginaSiguiente(){
    const totalPages = Math.ceil(this.articulos.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.cambiarPagina(this.currentPage + 1);
    }
  }
  getPaginas(): number[] {
    const totalPages = this.getTotalPaginas();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  
  getTotalPaginas(){
    return Math.ceil(this.articulos.length / this.itemsPerPage);
  }
 


}
