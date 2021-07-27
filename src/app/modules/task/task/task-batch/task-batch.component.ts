import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskFacade } from '#modules/task/task/task.facade';
import { CreateTask, Task, UpdateTask } from '../task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '#modules/task/task/task.service';

@Component({
  selector: 'app-task-batch',
  templateUrl: './task-batch.component.html',
  styleUrls: ['./task-batch.component.scss'],
})
export class TaskBatchComponent implements OnInit {
  public form!: FormGroup;

  private listId!: string;
  private taskId: string | undefined;
  private taskToUpdate: Task | undefined;

  public today: Date;

  constructor(
    private readonly taskService: TaskService,
    private readonly taskFacade: TaskFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.taskInit();
    this.formInit();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      title: [this.taskToUpdate?.title ?? '', [Validators.required]],
      description: [this.taskToUpdate?.description ?? '', []],
      date: [this.taskToUpdate?.date ?? '', []],
      done: [this.taskToUpdate?.done ?? false, [Validators.required]],
      list: [this.listId, [Validators.required]],
    });
  }

  private taskInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params) => {
          this.listId = params['listId'];
          this.taskId = params['taskId'];
        }),
        switchMap((params) => {
          if (this.isUpdate()) {
            return this.taskFacade.getTaskById(this.taskId as string);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((response) => {
        if (response) {
          this.taskToUpdate = response;
          this.formPatchValue(response);
        }
      });
  }

  private formPatchValue(values: Task): void {
    this.form.patchValue(values);
  }

  public submit(): void {
    if (this.isUpdate()) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  private createTask(): void {
    const value: CreateTask = {
      ...this.form.value,
    };
    this.taskService.createTask(value).subscribe(() => {
      this.navigateToList();
    });
  }

  private updateTask(): void {
    const value: UpdateTask = {
      id: this.taskId,
      ...this.form.value,
    };
    this.taskService.updateTask(value).subscribe(() => {
      this.navigateToList();
    });
  }

  private navigateToList(): void {
    if (this.isUpdate()) {
      this.router
        .navigate(['../..'], { relativeTo: this.activatedRoute })
        .then();
    } else {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute }).then();
    }
  }

  public isUpdate(): boolean {
    return !!this.taskId;
  }
}
