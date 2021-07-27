import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '#modules/task/list/list.component';
import { TaskComponent } from '#modules/task/task/task.component';
import { TaskGuard } from '#modules/task/task.guard';

const routes: Routes = [
  {
    path: ':listId',
    component: ListComponent,
    children: [
      {
        path: '',
        component: TaskComponent,
      },
    ],
  },
  {
    path: '**',
    canActivate: [TaskGuard],
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
