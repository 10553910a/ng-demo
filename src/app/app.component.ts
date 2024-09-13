import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ng-demo';

  menuPrincipal=[{
    'Titulo':' Inicio',
    'Icon':'fas fa-home',
    'routerLink':'inicio'
  },
  {
    'Titulo':' Clientes',
    'Icon':'fas fa-user',
    'routerLink':'clientes'
  },
  {
    'Titulo':' Proveedores',
    'Icon':'fas fa-user',
    'routerLink':'proveedores'
  },
  {
    'Titulo':' Articulos',
    'Icon':'fas fa-user',
    'routerLink':'articulos'
  },
  {
    'Titulo':' Mantenimiento',
    'Icon':'fas fa-user',
    'routerLink':'mantenimiento'
  },
]
}
