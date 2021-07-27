import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RawTask } from '#modules/task/task/task.model';
import { Observable } from 'rxjs';

@Injectable()
export class AnalyticService {
  constructor(private readonly http: HttpClient) {}

  public getCompletedTasks(): Observable<Array<RawTask>> {
    return this.http.get<Array<RawTask>>('compeleted');
  }
}
