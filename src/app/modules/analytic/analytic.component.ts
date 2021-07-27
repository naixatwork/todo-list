import { Component, OnInit } from '@angular/core';
import {
  Column,
  IndexColumn,
  Mode,
  OperationColumn,
  TableConfig,
} from '#shared/components/table/table.model';
import { Task } from '#modules/task/task/task.model';
import { Subject } from 'rxjs';
import { AnalyticFacade } from '#modules/analytic/analytic.facade';
import { tableStateManager } from '#shared/components/table/tableStateManager.operator';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss'],
})
export class AnalyticComponent implements OnInit {
  public config: TableConfig<Task> = new TableConfig<Task>([], [], {
    mode: null,
    length: null,
  });

  private unsubscribeAll: Subject<null>;

  constructor(private readonly analyticFacade: AnalyticFacade) {
    this.unsubscribeAll = new Subject<null>();
  }

  ngOnInit(): void {
    this.dataInit();
  }

  private dataInit(): void {
    tableStateManager<Task>(
      this.analyticFacade.getCompletedTasks(),
      this.config
    ).subscribe((response) => {
      this.configInit(response.data, response.count);
    });
  }

  private configInit(data: Array<Task>, length: number): void {
    this.config = new TableConfig<Task>(
      data,
      [
        new IndexColumn(),
        new Column('title'),
        new OperationColumn(
          [
            {
              color: (task) => (task.done ? 'primary' : 'warn'),
              icon: (task) => (task.done ? 'done' : 'close'),
              tooltip: (task) => (task.done ? 'completed' : 'doing'),
              operation: (task) => this.showRow(task),
            },
            {
              color: 'accent',
              icon: 'visibility',
              tooltip: 'detail',
              operation: (task) => this.showRow(task),
            },
          ],
          '',
          'lg:w-32'
        ),
      ],
      { mode: Mode.LOCAL, length }
    );
  }

  public showRow(task): void {
    window.alert(JSON.stringify(task));
  }
}
