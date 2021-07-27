import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFacade } from '#modules/task/task/task.facade';
import { switchMap } from 'rxjs/operators';
import { Task } from './task.model';
import { TaskService } from '#modules/task/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Confirm } from '#shared/models/confirm.model';
import { ConfirmComponent } from '#shared/components/dialog/confirm/confirm.component';

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog
  ) {
    this.queue = [];
    this.completed = [];
  }

  ngOnInit(): void {
    this.tasksInit();
  }

  public deleteTask(id: string, title: string): void {
    const confirmData: Confirm = {
      question: `Are you sure about deleting ${title} task?`,
    };
    this.matDialog
      .open(ConfirmComponent, {
        data: confirmData,
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) this.deleteTaskFromServer(id);
      });
  }

  private deleteTaskFromServer(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasksInit();
    });
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
