import { Component, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { BaseControlComponent } from '#shared/components/formControls/baseControl.component';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextFieldComponent,
    },
  ],
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent extends BaseControlComponent<string> {
  @ContentChild(MatIcon) suffixIcon!: MatIcon;
}
