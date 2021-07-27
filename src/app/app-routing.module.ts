import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { AuthGuard } from '#modules/auth/auth.guard';

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
  {
    path: 'task',
    loadChildren: () =>
      import('#modules/task/task.module').then((m) => m.TaskModule),
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'task',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
