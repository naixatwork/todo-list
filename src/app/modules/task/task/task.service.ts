import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTask, RawTask, UpdateTask } from '#modules/task/task/task.model';

@Injectable()
export class TaskService {
  constructor(private readonly http: HttpClient) {}

  public getTaskByList(listId: string): Observable<Array<RawTask>> {
    return this.http.get<Array<RawTask>>(`tasks/query/${listId}`);
  }

  public getTaskById(id: string): Observable<RawTask> {
    return this.http.get<RawTask>(`tasks/${id}`);
  }

  public toggleTask(id: string, done: boolean): Observable<RawTask> {
    return this.http.put<RawTask>(`tasks/${id}`, { id, done: !done });
  }

  public createTask(task: CreateTask): Observable<never> {
    return this.http.post<never>(`tasks`, { ...task });
  }

  public updateTask(task: UpdateTask): Observable<never> {
    return this.http.put<never>(`tasks/${task.id}`, { ...task });
  }

  public deleteTask(id: string): Observable<never> {
    return this.http.delete<never>(`tasks/${id}`);
  }
}
