import { Component, ContentChild, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() label!: string;
  @ContentChild(MatIcon) suffixIcon!: MatIcon;

  constructor(public readonly ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any) {}

  registerOnChange(fn: any) {}

  registerOnTouched(fn: any) {}

  setDisabledState?(isDisabled: boolean) {}
}
