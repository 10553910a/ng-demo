import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../proveedores';
import { ProveedoresService } from '../proveedores.service';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarRegistroProveedorDialog } from './ConfirmarRegistroProveedorDialog';
import { Provincias } from '../provincias';
import { ProvinciasService } from '../provincias.service';
import { TipoProveedor } from '../tipoProveedor';
import { TipoProveedorService } from '../tipo-proveedor.service';
import { TipoContrib} from '../../clientes/tipoContribuy';
import { TipoContribService } from '../../clientes/tipo-contrib.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-proveedores-registrar',
  templateUrl: './proveedores-registrar.component.html',
  styleUrls: ['./ConfirmarRegistroProveedorDialog.scss',
              './proveedores-registrar.component.css']

  
})
export class ProveedoresRegistrarComponent implements OnInit {

  proveedor : Proveedores = new Proveedores();
  provincias : Provincias[];  
  tipoProveedor: TipoProveedor[];
  tipoContrib:TipoContrib[];
  

  constructor(private proveedorServicio:ProveedoresService,private router:Router,private dialog: MatDialog,
    private provinciaService:ProvinciasService, private tipoProvService:TipoProveedorService,
    private tipoContServcice:TipoContribService){}

  ngOnInit(){
    this.obtenerProvincias()
   // this.obtenerTipoProveedor()
   
  this. obtenerTipoContribuy()
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
  // ViewChild para obtener una referencia al elemento del DOM
  @ViewChild('provinciaSelect') provinciaSelect: ElementRef;

  // Función que se ejecuta cuando se presiona Enter en el input #localidadInput
  onEnterPress() {
    // Enfoca el select #provinciaSelect
    this.provinciaSelect.nativeElement.focus();
  }
  @ViewChild('contribuyenteSelect') contribuyenteSelect: ElementRef;

  // Función que se ejecuta cuando se presiona Enter en el input #localidadInput
  onEnterPress2() {
    // Enfoca el select #provinciaSelect
    this.contribuyenteSelect.nativeElement.focus();
  }

  @ViewChild('tipoProveedorSelect') tipoProveedorSelect: ElementRef;

  // Función que se ejecuta cuando se presiona Enter en el input #localidadInput
  onEnterPress3() {
    // Enfoca el select #provinciaSelect
    this.tipoProveedorSelect.nativeElement.focus();
  }

  @ViewChild('statusSelect') statusSelect: ElementRef;

  // Función que se ejecuta cuando se presiona Enter en el input #localidadInput
  onEnterPress4() {
    // Enfoca el select #provinciaSelect
    this.statusSelect.nativeElement.focus();
  }
  @ViewChild('telefonoInput') telefonoInput: ElementRef;

  onProvinciaSelectChange() {
    // Enfoca el input #telefonoInput
    this.telefonoInput.nativeElement.focus();
  }
  

  @ViewChild('cuitInput') cuitInput: ElementRef;

  onContribuyenteSelectChange() {
    // Enfoca el input #telefonoInput
    this.cuitInput.nativeElement.focus();
  }

  onEnter(event: any, nextInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evitar el comportamiento por defecto del Enter en un formulario (submit)
      nextInput.focus();
    }
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
  guardarProveedor(){
    this.proveedorServicio.guardarProveedor(this.proveedor).subscribe(
      data => {
        if(data.res == 'OK'){
          alert('Registro exitoso');
          console.log(data);
          const dialogRef = this.dialog.open(ConfirmarRegistroProveedorDialog, {
            width: '400px',
            data: {},
            position: {top: '50',left: '50%' },
            panelClass: 'my-dialog'
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
              // Si el usuario seleccionó "Sí", se queda en la plantilla de registrar proveedores
              console.log("Registro otro proveedor");
              this.proveedor = new Proveedores();
            } else {
              // Si el usuario seleccionó "No", se va a la plantilla de listar proveedores
              console.log("Listar proveedores");
              this.irAlaListaProveedores();
            }
          });
        }
      },
      error => {
        alert('Error al guardar el proveedor');
        console.log(error);
      }
    );
  }

  irAlaListaProveedores(){
    this.router.navigate(['/proveedores']); 
  }

  onSubmit(){
    this.guardarProveedor();
    }

}
