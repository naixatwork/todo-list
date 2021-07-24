import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
  exports: [RouterModule],
})
export class AuthModule {}
