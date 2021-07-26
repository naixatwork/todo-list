import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('#modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('#modules/settings/settings.module').then((m) => m.SettingsModule),
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
