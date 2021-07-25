import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseControlComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: BaseControlComponent,
    },
  ],
  template: '',
})
export abstract class BaseControlComponent<T = any>
  implements ControlValueAccessor
{
  @Input() public label!: string;
  public control!: AbstractControl;

  private _value: T | undefined;
  public get value(): T | undefined {
    return this._value;
  }
  public set value(value) {
    this._value = value;
    this.markAsTouched();
    if (this.onChange) {
      this.onChange(value);
    }
  }
  private onChange!: (value: T | undefined) => {};
  private onTouched = () => {};
  private touched = false;

  writeValue(value: T) {
    this.value = value;
  }

  registerOnChange(onChange: (value: T | undefined) => {}) {
    this.onChange = onChange;
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  registerOnTouched(onTouched: () => {}) {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean) {}

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    return null;
  }
}
