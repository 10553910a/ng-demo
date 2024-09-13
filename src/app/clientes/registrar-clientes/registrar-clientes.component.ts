import { Component, OnInit} from '@angular/core';
import { Clientes} from '../clientes';
import { ClienteService } from '../cliente.service';
import { Router} from '@angular/router';
import { TipoDoc} from '../tipoDoc';
import { TipoDocService} from '../tipo-doc.service';
import { TipoContrib} from '../tipoContribuy';
import { TipoContribService } from '../tipo-contrib.service';
import { ConfirmarRegistroClienteDialog } from './ConfirmarRegistroClienteDialog';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-registrar-clientes',
  templateUrl: './registrar-clientes.component.html',
  styleUrls: ['./registrar-clientes.component.css']
})
export class RegistrarClientesComponent implements OnInit {

  clientes : Clientes = new Clientes();
  tipoDoc : TipoDoc [];
  tipoContrib:TipoContrib[];
    
  constructor(private clientesServicio:ClienteService,private router:Router,
    private tipoDocService:TipoDocService,private tipoContServcice:TipoContribService,
    private dialog: MatDialog){}

  ngOnInit():void{  
     this.obtenerTipoDoc()
     this.obtenerTipoContribuy()
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

  @ViewChild('documentoInput') documentoInput: ElementRef;

  onDocumentoSelectChange() {
    // Enfoca el input #telefonoInput
    this.documentoInput.nativeElement.focus();
  }

  @ViewChild('direccionInput') direccionInput: ElementRef;

  onContribuyenteSelectChange() {
    // Enfoca el input #telefonoInput
    this.direccionInput.nativeElement.focus();
  }

  onEnter(event: any, nextInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevenir comportamiento predeterminado de enviar el formulario
      nextInput.focus();
    }
  }

  @ViewChild('contriSelectc') contriSelectc: ElementRef;

  // Función que se ejecuta cuando se presiona Enter en el input #localidadInput
  onEnterPress() {
    // Enfoca el select #provinciaSelect
    this.contriSelectc.nativeElement.focus();
  }

  private obtenerTipoDoc(){
    this.tipoDocService.getTiposDoc().subscribe(dato=>{
      if(dato.res=='OK'){
        this.tipoDoc = dato.object as TipoDoc[] ;
        console.log(dato);
      }
      else{ 
      }

    });
  } 
  
  guardarClientes(){
    this.clientesServicio.registrarClientes(this.clientes).subscribe(datos=>{
      if(datos.res=='OK'){
        alert('Registro exitoso');
        console.log(datos);
        
        const dialogRef = this.dialog.open(ConfirmarRegistroClienteDialog, {
          width: '400px',
          data: {},
          position: {top: '50',left: '50%' },
          panelClass: 'my-dialog'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            // Si el usuario seleccionó "Sí", se queda en la plantilla de registrar proveedores
            console.log("Registro otro proveedor");
            this.clientes = new Clientes();
          } else {
            // Si el usuario seleccionó "No", se va a la plantilla de listar proveedores
            console.log("Listar proveedores");
            this.irAlaListaClientes();
          }
        })
      }
    }); 
  }
   
  
  irAlaListaClientes(){
    this.router.navigate(['/clientes']);
  }
  onSubmit(){
  this.guardarClientes();
  }
  
}

