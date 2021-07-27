import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawList } from '#modules/task/list/list.model';

@Injectable()
export class ListService {
  constructor(private readonly http: HttpClient) {}

  public getLists(): Observable<Array<RawList>> {
    return this.http.get<Array<RawList>>('tasks');
  }

  public getMainList(): Observable<RawList> {
    return this.http.get<RawList>('mainList');
  }
}
