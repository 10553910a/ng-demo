import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-registro-cliente-dialog',
  templateUrl: './ConfirmarRegistroClienteDialog.html',
  styleUrls: ['./ConfirmarRegistroClienteDialog.scss']
})
export class ConfirmarRegistroClienteDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarRegistroClienteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}