import { Injectable, Injector } from '@angular/core';
import { AnalyticService } from '#modules/analytic/analytic.service';
import { Observable } from 'rxjs';
import { Response } from '#shared/models/response.model';
import { Task } from '#modules/task/task/task.model';
import { map } from 'rxjs/operators';
import { TaskFacade } from '#modules/task/task/task.facade';

@Injectable()
export class AnalyticFacade {
  private get analyticService(): AnalyticService {
    return this.injector.get(AnalyticService);
  }

  constructor(private readonly injector: Injector) {}

  public getCompletedTasks(): Observable<Response<Task>> {
    return this.analyticService.getCompletedTasks().pipe(
      map((response) => {
        return TaskFacade.filterTasks(response);
      })
    );
  }
}
