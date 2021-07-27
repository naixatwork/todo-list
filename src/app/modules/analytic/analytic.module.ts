import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticComponent } from './analytic.component';
import { TableModule } from '#shared/components/table/table.module';
import { AnalyticFacade } from '#modules/analytic/analytic.facade';
import { AnalyticService } from '#modules/analytic/analytic.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AnalyticComponent,
  },
];

@NgModule({
  providers: [AnalyticFacade, AnalyticService],
  declarations: [AnalyticComponent],
  imports: [RouterModule.forChild(routes), CommonModule, TableModule],
})
export class AnalyticModule {}
