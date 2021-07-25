import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '#shared/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, CustomValidators.match('admin')]],
    });
  }

  public signIn(): void {
    SignInComponent.setAuthToLocalStorage(this.form.value);
    this.navigateToApplication();
  }

  private navigateToApplication(): void {
    this.router.navigate(['/']).then();
  }

  private static setAuthToLocalStorage(value: any): void {
    localStorage.setItem('auth', JSON.stringify(value));
  }
}
