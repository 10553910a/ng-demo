import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-registro-articulos-dialog',
  templateUrl: './ConfirmarRegistroArticulosDialog.html',
  styleUrls: ['./ConfirmarRegistroArticulosDialog.scss']
})
export class ConfirmarRegistroArticulosDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarRegistroArticulosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}