import { Component,OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router} from '@angular/router';
import { Clientes} from '../clientes';
import { ActivatedRoute } from '@angular/router';
import { TipoDoc} from '../tipoDoc';
import { TipoDocService} from '../tipo-doc.service';
import { TipoContrib} from '../tipoContribuy';
import { TipoContribService } from '../tipo-contrib.service';
import { MatDialog } from '@angular/material/dialog';
import { EditSuccessDialogComponent } from './edit-success-dialog.component'; // Asegúrate de poner la ruta correcta


@Component({
  selector: 'app-actualizar-clientes',
  templateUrl: './actualizar-clientes.component.html',
  styleUrls: ['./actualizar-clientes.component.css']
})
export class ActualizarClientesComponent implements OnInit {

  constructor(private route:ActivatedRoute,private clientesService:ClienteService,
    private router:Router, private tipoDocService:TipoDocService,
    private tipoContServcice:TipoContribService,
    public dialog: MatDialog){}
  
  id_cliente:number;
  clientes : Clientes = new Clientes;
  tipoDoc : TipoDoc[];
  tipoContrib:TipoContrib[];

  ngOnInit():void{
    this.id_cliente = this.route.snapshot.params['id_cliente'];
    console.log(this.id_cliente);
    this.actualizarClientes();
    this.obtenerTipoDoc();
    this.obtenerTipoContribuy();
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
  irAlaListaClientes(){
    this.router.navigate(['/clientes']);
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

  actualizarClientes(){
    console.log(this.id_cliente);
    this.clientesService.obtenerClientePorId(this.id_cliente).subscribe(data=> {
        this.clientes = data.object as Clientes;
        
       
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  onSubmit() {
    this.clientesService.actualizarCliente(this.id_cliente, this.clientes).subscribe(data => {
      console.log(data);
  
      // Abrir el diálogo de éxito en el centro
      const dialogRef = this.dialog.open(EditSuccessDialogComponent, {
        width: '400px',
        data: {},
        position: {top: '50',left: '50%' },
        panelClass: 'my-dialog'
      });
  
      // Navegar a la lista de clientes después de cerrar el diálogo
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    },
    (error) => {
      console.error(error);
    });
  }
  
  
  
  
      
  
}
