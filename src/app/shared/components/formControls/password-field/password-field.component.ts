import { Component, ContentChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '#shared/components/formControls/baseControl.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordFieldComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PasswordFieldComponent,
    },
  ],
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent extends BaseControlComponent<string> {
  @ContentChild(MatIcon) suffixIcon!: MatIcon;
}
