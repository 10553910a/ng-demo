import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-success-dialog',
  templateUrl: './edit-success-dialog.component.html',
  styleUrls: ['./edit-success-dialog.component.css'],
  
})
export class EditSuccessDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditSuccessDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigate(['/clientes']); // Navegar a la lista de clientes después de cerrar
  }
}


