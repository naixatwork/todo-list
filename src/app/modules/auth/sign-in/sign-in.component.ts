import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '#shared/validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, CustomValidators.match('admin')]],
    });

    this.form.get('username')?.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  public signIn(): void {
    console.log(this.form.value);
  }
}
