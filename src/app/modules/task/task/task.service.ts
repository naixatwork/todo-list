import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawTask } from '#modules/task/task/task.model';

@Injectable()
export class TaskService {
  constructor(private readonly http: HttpClient) {}

  public getTaskByList(listId: string): Observable<Array<RawTask>> {
    return this.http.get<Array<RawTask>>(`tasks/query/${listId}`);
  }

  public toggleTask(id: string, done: boolean): Observable<RawTask> {
    return this.http.put<RawTask>(`tasks/${id}`, { id, done: !done });
  }
}
