import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from '#shared/components/dialog/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [ConfirmComponent],
  entryComponents: [ConfirmComponent],
})
export class ConfirmModule {}
