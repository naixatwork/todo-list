import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task/task.component';
import { ListComponent } from './list/list.component';
import { ListBatchComponent } from './list/list-batch/list-batch.component';
import { TaskBatchComponent } from './task/task-batch/task-batch.component';
import { ListService } from '#modules/task/list/list.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ListFacade } from '#modules/task/list/list.facade';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListsViewComponent } from './list/lists-view/lists-view.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TaskGuard } from '#modules/task/task.guard';

@NgModule({
  providers: [ListService, ListFacade, TaskGuard],
  declarations: [
    TaskComponent,
    ListComponent,
    ListBatchComponent,
    TaskBatchComponent,
    ListsViewComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
  ],
})
export class TaskModule {}
