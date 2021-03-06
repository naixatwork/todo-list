import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RawTask } from '#modules/task/task/task.model';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AnalyticService {
  constructor(private readonly http: HttpClient) {}

  public getCompletedTasks(): Observable<Array<RawTask>> {
    return this.http.get<Array<RawTask>>('compeleted').pipe(delay(500));
  }
}
