import { Component, OnInit } from '@angular/core';
import { Articulos } from '../articulos';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from '../articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-detalles',
  templateUrl: './articulos-detalles.component.html',
  styleUrls: ['./articulos-detalles.component.css']
})
export class ArticulosDetallesComponent implements OnInit {
  
  constructor(private route:ActivatedRoute,
  private router: Router,
  private articulosService:ArticulosService){}
  articulos:Articulos;
  id_articulo: number;

  ngOnInit(): void {
    this.detallesArticulo();
}
detallesArticulo(){
  this.id_articulo = this.route.snapshot.params['id_articulo'];
  this.articulos = new Articulos();
  this.articulosService.obtenerArticuloPorId(this.id_articulo).subscribe(dato=>{
   if(dato.res=='OK'){
    console.log(dato);
    this.articulos = dato.object as Articulos;
    Swal.fire(`Detalles del articulo: ${this.articulos.descripcion}`);
  }
}); 
}
irAlaListaArticulos(){    
  this.router.navigate(['/articulos']);      
}


}
 
