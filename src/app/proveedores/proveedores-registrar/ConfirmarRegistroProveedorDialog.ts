import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-registro-proveedor-dialog',
  templateUrl: './ConfirmarRegistroProveedorDialog.html',
  styleUrls: ['./ConfirmarRegistroProveedorDialog.scss']
})
export class ConfirmarRegistroProveedorDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarRegistroProveedorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}