import { Component, OnInit } from '@angular/core';
import { Articulos } from '../articulos';
import { Router} from '@angular/router';
import { ArticulosService } from '../articulos.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarRegistroArticulosDialog } from './ConfirmarRegistroArticulosDialog';
import { Marcas } from '../marcas'
import { MarcasService } from '../marcas.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Proveedores } from '../proveedores';
import { ProveedoresService } from '../proveedores.service';
import { Rubro } from '../rubros';
import { RubrosService } from '../rubros.service';
import { Unidad } from '../unidad-venta';
import { UnidadVentaService } from '../unidad-venta.service';

@Component({
  selector: 'app-articulos-registrar',
  templateUrl: './articulos-registrar.component.html',
  styleUrls: ['./articulos-registrar.component.css']
})
export class ArticulosRegistrarComponent implements OnInit {
  @ViewChild('marcasSelect') marcasSelect: ElementRef;
  @ViewChild('proveedorSelect') proveedorSelect: ElementRef;
  @ViewChild('rubroSelect') rubroSelect: ElementRef;
  @ViewChild('precioInput') precioInput: ElementRef;
  @ViewChild('unidadSelect') unidadSelect: ElementRef;
  @ViewChild('codigoInput') codigoInput: ElementRef;
  
  
  constructor( private router:Router,
  private articulosServicio:ArticulosService,
  private dialog: MatDialog,
  private marcasService : MarcasService,
  private proveedoresService : ProveedoresService,
  private rubrosService: RubrosService,
  private unidadService:UnidadVentaService){}

  articulos : Articulos = new Articulos();
  marcas: Marcas[];
  proveedores: Proveedores[];
  rubros: Rubro[];
  unidad: Unidad[];
  codigo: '' // Esta propiedad almacenará el valor en el formato deseado
  
  
  ngOnInit(): void {
    this.obtenerMarcas();
    this.obtenerProveedores();
    this.obtenerRubros();
    this.obtenerUnidadVenta();
  }
   onSubmit(){
    this.guardarArticulos();
  }
  private obtenerMarcas(){
    this.marcasService.getMarcas().subscribe(dato=>{
      if(dato.res=='OK'){
        this.marcas = dato.object as Marcas[] ;
        console.log(dato);
      }
      else{ 
      }

    });
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
  private obtenerRubros(){
    this.rubrosService.getRubros().subscribe(datos=>{
      if(datos.res=='OK'){
        this.rubros = datos.object as Rubro[];
        console.log(datos);

      }
    })
  }
  private obtenerUnidadVenta(){
    this.unidadService.getUnidadVenta().subscribe(dato=>{
      if(dato.res=='OK'){
        this.unidad = dato.object as Unidad[] ;
        console.log(dato);
      }
      else{ 
      }

    });
  }

  guardarArticulos(){
    this.articulosServicio.registrarArticulos(this.articulos).subscribe(datos=>{
      if(datos.res=='OK'){
        alert('Registro exitoso');
        console.log(datos);
        
        const dialogRef = this.dialog.open(ConfirmarRegistroArticulosDialog, {
          width: '400px',
          data: {},
          position: {top: '50',left: '50%' },
          panelClass: 'my-dialog'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            // Si el usuario seleccionó "Sí", se queda en la plantilla de registrar proveedores
            console.log("Registro otro proveedor");
            this.articulos = new Articulos();
          } else {
            // Si el usuario seleccionó "No", se va a la plantilla de listar proveedores
            console.log("Listar proveedores");
            this.irAlaListaArticulos();
          }
        })
      }
    }); 
  }

  irAlaListaArticulos(){
    this.router.navigate(['/articulos']);
  }
  // En el componente
// En el componente
onEnter(event: KeyboardEvent, nextInput: HTMLInputElement) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar el comportamiento por defecto del Enter en un formulario (submit)
    nextInput.focus();
  }
}



// Función que se ejecuta cuando se presiona Enter en el input #localidadInput
onEnterPress() {
  // Enfoca el select #provinciaSelect
  this.marcasSelect.nativeElement.focus();
}
onEnterPress2() {
  // Enfoca el select #provinciaSelect
  this.unidadSelect.nativeElement.focus();
}

onUnidadSelectChange() {
  // Enfoca el input #telefonoInput
  this.codigoInput.nativeElement.focus();
}

onMarcaSelectChange() {
  // Enfoca el input #telefonoInput
  this.proveedorSelect.nativeElement.focus();
}



onProveedorSelectChange() {
  // Enfoca el input #telefonoInput
  this.rubroSelect.nativeElement.focus();
}



onRubroSelectChange() {
 
  // Enfoca el input #telefonoInput
  this.precioInput.nativeElement.focus();
}

calcularMargen(){

  if (this.articulos.precioCompra !== undefined &&
    this.articulos.margen !== undefined 
    ) {

    // Realizar cálculo del Precio Venta
    const precioCompra = this.articulos.precioCompra;
    const margen = this.articulos.margen;
    

    // Realizar el cálculo basado en la fórmula deseada (por ejemplo, Precio Compra + Margen + IVA)
    const precioSinIva = precioCompra +(precioCompra * (margen / 100));
   
    
    // Convertir a número y asignar al campo de Precio Venta
    this.articulos.precioVenta = parseFloat(precioSinIva.toFixed(2));
    // Establecer el valor calculado en el campo de Precio Venta
   
}



}
calcularPrecioConIva(){
  this.articulos.iva =0;
  if(this.articulos.precioVenta  !== undefined &&
    this.articulos.iva !== undefined){

    const precioVenta = this.articulos.precioVenta;
    const iva = this.articulos.iva;

    const precioIva =   precioVenta +( precioVenta * (iva / 100));

     // Convertir a número y asignar al campo de Precio Venta
     this.articulos.precioVentaIva = parseFloat( precioIva.toFixed(2));
     // Establecer el valor calculado en el campo de Precio Venta
  
  }
  
}

calcularPorcentajeUtilidad(){
  
  if(this.articulos.precioCompra !== undefined &&
    this.articulos.precioVenta !== undefined){

      const precio = this.articulos.precioVenta;
      const costo = this.articulos.precioCompra;

      const margen =   ((precio - costo) / costo) * 100;
      
      this.articulos.margen =  parseFloat( margen.toFixed(2));
  }
}

calcularPorcentajeDescuento(){
  
  if(this.articulos.precioCompra !== undefined &&
    this.articulos.precioVenta !== undefined &&
    this.articulos.margen !== undefined &&
    this.articulos.porcentajeDescuento !== undefined){

      const porcentajeDescuento = this.articulos.porcentajeDescuento;
      const costo = this.articulos.precioCompra;
      const margenUtilidad = this.articulos.margen;
      const iva = this.articulos.iva;
     
     
      const nvoMargen =  ( margenUtilidad - porcentajeDescuento);
      const precioOferta = costo + (costo * (nvoMargen / 100));
      const pOfertaConIva = precioOferta +( precioOferta * (iva / 100));

      
      this.articulos.precioOferta =  parseFloat(pOfertaConIva.toFixed(2));
  }else{
    this.articulos.precioOferta = null;
  }
}
formatCodigo(newValue: string): void {
  // Aplicar el formato deseado: tres letras mayúsculas - tres números
  const formattedValue = newValue.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Eliminar caracteres no deseados

  if (formattedValue.length <= 6) {
    this.articulos.codigo = formattedValue.replace(/(\w{3})(\w{3})/, '$1-$2');
  } else {
    // Si el valor es demasiado largo, recortar a 6 caracteres y aplicar el formato
    this.articulos.codigo = formattedValue.slice(0, 6).replace(/(\w{3})(\w{3})/, '$1-$2');
  }
}

limpiar(){
  this.articulos.descripcion = '';
  this.articulos.presentacion = '';
  this.articulos.codigo = '';
  this.articulos.unidadVenta = null;
  this.articulos.barra = null;
  this.articulos.idMarca = null;
  this.articulos.idProveedor = null;
  this.articulos.idRubro = null;
  this.articulos.precioCompra = null;
  this.articulos.margen = null;
  this.articulos.precioVenta = null;
  this.articulos.iva = null;
  this.articulos.precioVentaIva = null;
  this.articulos.porcentajeDescuento = null;
  this.articulos.precioOferta = null;
  this.articulos.puntoPedido = null;

}




}
