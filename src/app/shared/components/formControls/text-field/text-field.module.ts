import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [TextFieldComponent],
})
export class TextFieldModule {}
