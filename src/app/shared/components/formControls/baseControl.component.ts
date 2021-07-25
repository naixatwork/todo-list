import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseControlComponent,
    },
  ],
  template: '',
})
export abstract class BaseControlComponent<T = any>
  implements ControlValueAccessor, Validator
{
  @Input() public readonly label!: string;
  private _value: T | undefined;
  public get value(): T | undefined {
    return this._value;
  }
  public set value(value) {
    this._value = value;
    if (value) this.onChange(value);
  }

  private onChange!: (value: T) => {};

  writeValue(value: T) {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: T) => {}) {}

  setDisabledState?(isDisabled: boolean) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
