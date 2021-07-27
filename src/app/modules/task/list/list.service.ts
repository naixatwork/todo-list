import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateList, RawList, UpdateList } from '#modules/task/list/list.model';

@Injectable()
export class ListService {
  constructor(private readonly http: HttpClient) {}

  public getLists(): Observable<Array<RawList>> {
    return this.http.get<Array<RawList>>('lists');
  }

  public getListById(id: string): Observable<RawList> {
    return this.http.get<RawList>(`lists/${id}`);
  }

  public createList(list: CreateList): Observable<RawList> {
    return this.http.post<RawList>(`lists`, { ...list });
  }

  public updateList(list: UpdateList): Observable<RawList> {
    return this.http.post<RawList>(`lists/${list.id}`, { ...list });
  }

  public deleteList(id: string): Observable<null> {
    return this.http.delete<null>(`lists/${id}`);
  }

  public getMainList(): Observable<RawList> {
    return this.http.get<RawList>('mainList');
  }
}
