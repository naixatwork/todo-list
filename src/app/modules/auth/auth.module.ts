import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from '#modules/auth/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '#shared/components/formControls/text-field/text-field.module';
import { PasswordFieldModule } from '#shared/components/formControls/password-field/password-field.module';

@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TextFieldModule,
    PasswordFieldModule,
  ],
  exports: [RouterModule],
})
export class AuthModule {}
