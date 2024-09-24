import { Component,OnInit} from '@angular/core';
import { ProveedoresService} from '../proveedores.service';
import { Proveedores} from '../proveedores';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Provincias } from '../provincias';
import { ProvinciasService } from '../provincias.service';
import { TipoContrib} from '../tipoContribuy';
import { TipoContribService } from '../../clientes/tipo-contrib.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-proveedores-actualizar',
  templateUrl: './proveedores-actualizar.component.html',
  styleUrls: ['./proveedores-actualizar.component.css']
})
export class ProveedoresActualizarComponent implements OnInit {

  constructor(private route:ActivatedRoute,private proveedorService:ProveedoresService,private router:Router,
    private provinciaService:ProvinciasService,
    private tipoContServcice:TipoContribService){
    
  }

  id_proveedor:number;
  proveedor : Proveedores = new Proveedores;
  provincias : Provincias[];
  tipoContrib:TipoContrib[];

  ngOnInit(): void {    
    this.id_proveedor = this.route.snapshot.params['id_proveedor'];
    console.log(this.id_proveedor);
    this.actualizarProveedor();
    this.obtenerProvincias();
    this. obtenerTipoContribuy();
  }

  private obtenerProvincias(){
    this.provinciaService.getProvincias().subscribe(dato=>{
      if(dato.res=='OK'){
        this.provincias = dato.object as Provincias[] ;
        console.log(dato);
      }
      else{ 
      }

    }); 
  }

  onSubmit(){
   this. actualizarProveedor();
   this.proveedorService.actualizarProveedor(this.id_proveedor,this.proveedor).subscribe(data=> {
      console.log(data);
      this.router.navigate(['/proveedores']);
    },
    (error) => {
      console.error(error);
    }
  );

  }

  actualizarProveedor(){
    console.log(this.id_proveedor);
    this.proveedorService.obtenerProveedorPorId(this.id_proveedor).subscribe(data=> {
        this.proveedor = data.object as Proveedores;
        
       
      },
      (error) => {
        console.error(error);
      }
    );
    
  }
  irProveedor(){    
    this.router.navigate(['/proveedores']);      
}

private obtenerTipoContribuy(){
  this.tipoContServcice.obtenerTipoContrib().subscribe(dato=>{
    if(dato.res=='OK'){
      this.tipoContrib = dato.object as TipoContrib[] ;
      console.log(dato);
    }
    else{ 
    }

  });

}
irAlSiguiente(event: any, nextInput: HTMLInputElement) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evitar el comportamiento por defecto del Enter en un formulario (submit)
    nextInput.focus();
  }
}
@ViewChild('localidad') localidad: ElementRef;

  onProvinciaSelectChange() {
    // Enfoca el input #telefonoInput
    this.localidad.nativeElement.focus();
  }

    // ViewChild para obtener una referencia al elemento del DOM
    @ViewChild('provinciaSelect') provinciaSelect: ElementRef;

    // Función que se ejecuta cuando se presiona Enter en el input #localidadInput
    onEnterPress() {
      // Enfoca el select #provinciaSelect
      this.provinciaSelect.nativeElement.focus();
    }
     // ViewChild para obtener una referencia al elemento del DOM
     @ViewChild('tipoContSelect') tipoContSelect: ElementRef;

     // Función que se ejecuta cuando se presiona Enter en el input #localidadInput
     onTipoCont() {
       // Enfoca el select #provinciaSelect
       this.tipoContSelect.nativeElement.focus();
     }
     @ViewChild('cuitInput') cuitInput: ElementRef;

     onTipoContr() {
    // Enfoca el input #telefonoInput
    this.cuitInput.nativeElement.focus();
  }
  @ViewChild('statusSelect') statusSelect: ElementRef;

  onStatus() {
 // Enfoca el input #telefonoInput
 this.statusSelect.nativeElement.focus();
}
@ViewChild('tipoProveSelect') tipoProveSelect: ElementRef;

onCambioStatus() {
// Enfoca el input #telefonoInput
this.tipoProveSelect.nativeElement.focus();
}

}
