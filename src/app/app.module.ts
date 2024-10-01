import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './clientes/cliente.service';
import { RegistrarClientesComponent } from './clientes/registrar-clientes/registrar-clientes.component';
import { ActualizarClientesComponent } from './clientes/clientes-actualizar/actualizar-clientes.component';
import { ClientesDetallesComponent } from './clientes/clientes-detalles/clientes-detalles.component';
import { ProveedoresComponent } from './proveedores/listar-proveedores/listar-proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProveedoresDetallesComponent } from './proveedores/proveedores-detalles/proveedores-detalles.component';
import { ProveedoresRegistrarComponent } from './proveedores/proveedores-registrar/proveedores-registrar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProveedoresActualizarComponent } from './proveedores/proveedores-actualizar/proveedores-actualizar.component';
import { ListarArticulosComponent } from './articulos/articulos-listar/listar-articulos.component';
import { ArticulosRegistrarComponent } from './articulos/articulos-registrar/articulos-registrar.component';
import { ArticulosDetallesComponent } from './articulos/articulos-detalles/articulos-detalles.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ArticulosEditarComponent } from './articulos/articulos-editar/articulos-editar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';





@NgModule({
  declarations: [
    AppComponent,
    ListarClientesComponent,
    RegistrarClientesComponent,
    ActualizarClientesComponent,
    ClientesDetallesComponent,   
    ProveedoresComponent,
    InicioComponent,
    ProveedoresDetallesComponent,
    ProveedoresRegistrarComponent,
    ProveedoresActualizarComponent,
    ListarArticulosComponent,
    ArticulosRegistrarComponent,
    ArticulosDetallesComponent,
    MantenimientoComponent,
    ArticulosEditarComponent
  ],
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [ClienteService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
