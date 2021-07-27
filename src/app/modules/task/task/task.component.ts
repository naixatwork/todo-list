import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFacade } from '#modules/task/task/task.facade';
import { switchMap } from 'rxjs/operators';
import { Task } from './task.model';
import { TaskService } from '#modules/task/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public queue: Array<Task>;
  public completed: Array<Task>;

  constructor(
    private readonly taskService: TaskService,
    private readonly taskFacade: TaskFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.queue = [];
    this.completed = [];
  }

  ngOnInit(): void {
    this.tasksInit();
  }

  private tasksInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) =>
          this.taskFacade.getFilteredTasksByStatus(params?.listId)
        )
      )
      .subscribe((response) => {
        this.queue = response.data.queue;
        this.completed = response.data.completed;
      });
  }

  public toggleTask(id: string, done: boolean): void {
    this.taskService.toggleTask(id, done).subscribe(() => {
      this.tasksInit();
    });
  }
}
