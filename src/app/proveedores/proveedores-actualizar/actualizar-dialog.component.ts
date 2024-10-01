import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-dialog',
  templateUrl: './actualizar-dialog.component.html',
  styleUrls: ['./actualizar-dialog.component.css'],
  
})
export class ActulizarDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ActulizarDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigate(['/proveedores']); // Navegar a la lista de clientes después de cerrar
  }
} 
