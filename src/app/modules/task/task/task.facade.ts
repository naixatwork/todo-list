import { Injectable, Injector } from '@angular/core';
import { TaskService } from '#modules/task/task/task.service';
import { Observable } from 'rxjs';
import { Response } from '#shared/models/response.model';
import * as _ from 'lodash';
import { RawTask, Task, SituationalTask } from '#modules/task/task/task.model';
import { map } from 'rxjs/operators';

@Injectable()
export class TaskFacade {
  private get taskService(): TaskService {
    return this.injector.get(TaskService);
  }
  constructor(private readonly injector: Injector) {}

  public getTasksByList(listId: string): Observable<Response<Task>> {
    return this.taskService
      .getTaskByList(listId)
      .pipe(map((rawLists) => TaskFacade.filterTasks(rawLists)));
  }

  public getFilteredTasksByStatus(listId: string): Observable<SituationalTask> {
    return this.taskService
      .getTaskByList(listId)
      .pipe(
        map((rawLists) =>
          TaskFacade.filterTasksBySituation(
            TaskFacade.filterTasks(rawLists).data
          )
        )
      );
  }

  private static filterTasks(rawTasks: Array<RawTask>): Response<Task> {
    if (!rawTasks) return { data: [], count: 0 };

    const tasks = _.map(rawTasks, (rawTask) => {
      const filteredTask: Task = {
        id: rawTask._id,
        title: rawTask.title,
        description: rawTask.description,
        date: new Date(rawTask.date),
        list: rawTask.list,
        done: rawTask.done,
      };
      return filteredTask;
    });

    return {
      data: tasks,
      count: tasks.length,
    };
  }

  private static filterTasksBySituation(Tasks: Array<Task>): SituationalTask {
    return {
      count: Tasks.length,
      data: {
        queue: _.filter(Tasks, (task) => !task.done),
        completed: _.filter(Tasks, (task) => task.done),
      },
    };
  }
}
