import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '#shared/validators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private unsubscribeAll: Subject<null>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.unsubscribeAll = new Subject<null>();
  }

  ngOnInit(): void {
    this.formInit();
    this.repeatPasswordValidationInit();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
  }

  private repeatPasswordValidationInit(): void {
    const { password, repeatPassword } = this.form.controls;
    password.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        repeatPassword.setValidators([
          Validators.required,
          CustomValidators.match(value),
        ]);
      });
  }

  public singUp(): void {
    SignUpComponent.setAuthToLocalStorage(this.form.value);
    this.navigateToApplication();
  }

  private navigateToApplication(): void {
    this.router.navigate(['/settings']).then();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private static setAuthToLocalStorage(value: any): void {
    localStorage.setItem('auth', JSON.stringify(value));
  }
}
