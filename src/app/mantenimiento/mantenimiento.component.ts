import { Component,OnInit } from '@angular/core';
import { UnidadVentaService } from '../articulos/unidad-venta.service';
import { Router} from '@angular/router';
import { Unidad } from '../articulos/unidad-venta';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.sass']
})
export class MantenimientoComponent implements OnInit {

  constructor(
    private unidadService:UnidadVentaService,
    private router:Router,){}
    unidad: Unidad;
    unidades : Unidad = new Unidad();
  
  ngOnInit(): void {
    
  }
 
  guargarUnidad() {
    console.log("lego al ts")
    this.unidadService.insertUnidadVenta(this.unidades).subscribe(
      datos => {
        if (datos.res == 'OK') {
          alert('Registro exitoso');
          console.log(datos);
        }
      },
      error => {
        console.error('Error al registrar unidad:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
      }
    );
  }
  

}
