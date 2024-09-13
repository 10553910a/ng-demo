import { Component,OnInit } from '@angular/core';
import {ArticulosService} from '../articulos.service';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Articulos} from '../articulos';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-editar',
  templateUrl: './articulos-editar.component.html',
  styleUrls: ['./articulos-editar.component.css']
})
export class ArticulosEditarComponent implements OnInit {
  constructor(private route:ActivatedRoute,private articulosService:ArticulosService,
    private router: Router){}
  
  id_articulo:number;
  articulos : Articulos = new Articulos;
  ngOnInit():void{
    //this.actualizarArticulo();
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

      actualizarArticulo() {
        this.articulosService.editarArticulo(this.id_articulo,this.articulos).subscribe(data=> {
          this.articulos = data.object as Articulos;
          console.log(data);
          this.router.navigate(['/articulos']);
        },
        (error) => {
          console.error(error);
        }
      );

      }

      onSubmit(){    
        this.router.navigate(['/articulos']);      
      }
      /*onSubmit1(){
        this.actualizarArticulo();    
        this.articulosService.editarArticulo(this.id_articulo,this.articulos).subscribe(data=> {
         
      });
    }*/
}
