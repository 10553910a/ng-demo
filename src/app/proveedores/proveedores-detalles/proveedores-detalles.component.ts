import { Component,  OnInit } from '@angular/core';
import { Proveedores} from '../proveedores';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService} from '../proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores-detalles',
  templateUrl: './proveedores-detalles.component.html',
  styleUrls: ['./proveedores-detalles.component.css']
 
  
})
export class ProveedoresDetallesComponent implements OnInit {

  id_proveedor: number;
  proveedor:Proveedores;

  constructor(private route:ActivatedRoute,private proveedoresService:ProveedoresService,
    private router: Router){}

  ngOnInit(): void {
    this.id_proveedor = this.route.snapshot.params['id_proveedor'];
    this.proveedor = new Proveedores();
    this.proveedoresService.obtenerProveedorPorId(this.id_proveedor).subscribe(dato=>{
     if(dato.res=='OK'){
      console.log(dato);
      this.proveedor = dato.object as Proveedores;
      Swal.fire(`Detalles del Proveedor: ${this.proveedor.razonSocial}`);
     }
    }); 
  }
  onSubmit(){    
    this.router.navigate(['/proveedores']);      
}
actualizarProveedor(id_proveedor:number){
  this.router.navigate(['proveedores-actualizar',id_proveedor]);
    
}

}
