import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Confirm } from '#shared/models/confirm.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: Confirm
  ) {}

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
