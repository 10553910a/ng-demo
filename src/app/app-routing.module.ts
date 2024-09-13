import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { RegistrarClientesComponent } from './clientes/registrar-clientes/registrar-clientes.component';
import { ActualizarClientesComponent } from './clientes/clientes-actualizar/actualizar-clientes.component';
import { ClientesDetallesComponent } from './clientes/clientes-detalles/clientes-detalles.component';
import { ProveedoresComponent } from './proveedores/listar-proveedores/listar-proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProveedoresDetallesComponent } from './proveedores/proveedores-detalles/proveedores-detalles.component';
import { ProveedoresRegistrarComponent } from './proveedores/proveedores-registrar/proveedores-registrar.component';
import { ProveedoresActualizarComponent } from './proveedores/proveedores-actualizar/proveedores-actualizar.component';
import { ListarArticulosComponent } from './articulos/articulos-listar/listar-articulos.component';
import { ArticulosRegistrarComponent } from './articulos/articulos-registrar/articulos-registrar.component';
import { ArticulosDetallesComponent } from './articulos/articulos-detalles/articulos-detalles.component';
import { ArticulosEditarComponent } from './articulos/articulos-editar/articulos-editar.component';
import { MantenimientoComponent }  from './mantenimiento/mantenimiento.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent },
  {path : 'clientes', component:ListarClientesComponent},
  {path :'', redirectTo:'inicio',pathMatch:'full'},
  {path : 'registrar-clientes', component: RegistrarClientesComponent},
  {path : 'actualizar-clientes/:id_cliente', component: ActualizarClientesComponent},
  {path : 'clientes-detalles/:id_cliente', component: ClientesDetallesComponent},
  {path : 'proveedores', component:ProveedoresComponent},
  {path : 'proveedores-detalles/:id_proveedor', component: ProveedoresDetallesComponent},
  {path : 'proveedores-registrar', component: ProveedoresRegistrarComponent},
  {path : 'proveedores-actualizar/:id_proveedor', component: ProveedoresActualizarComponent},
  {path : 'articulos', component:  ListarArticulosComponent},
  {path : 'articulos-registrar', component:  ArticulosRegistrarComponent},
  {path : 'articulos-detalles/:id_articulo', component:  ArticulosDetallesComponent},
  {path : 'articulos-editar/:id_articulo', component:  ArticulosEditarComponent},
  {path : 'mantenimiento', component:   MantenimientoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
