import { Injectable, Injector } from '@angular/core';
import { ListService } from '#modules/task/list/list.service';
import {
  CreateList,
  List,
  RawList,
  UpdateList,
} from '#modules/task/list/list.model';
import { Response } from '#shared/models/response.model';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ListFacade {
  private get listService(): ListService {
    return this.injector.get(ListService);
  }

  constructor(private readonly injector: Injector) {}

  public getLists(): Observable<Response<List>> {
    return this.listService
      .getLists()
      .pipe(map((response) => ListFacade.filterLists(response)));
  }

  private static filterLists(rawLists: Array<RawList>): Response<List> {
    if (!rawLists) return { data: [], count: 0 };

    const lists = _.map(rawLists, (rawList) => {
      const filteredList: List = {
        id: rawList._id,
        title: rawList.title ?? '',
        date: new Date(rawList.date) ?? null,
        isMain: false,
      };
      return filteredList;
    });

    return {
      data: lists,
      count: lists.length,
    };
  }

  public getMainList(): Observable<List> {
    return this.listService
      .getMainList()
      .pipe(map((response) => ListFacade.filterList(response)));
  }

  public getListById(id: string): Observable<List> {
    return this.listService
      .getListById(id)
      .pipe(map((response) => ListFacade.filterList(response)));
  }

  public createList(list: CreateList): Observable<List> {
    return this.listService
      .createList(list)
      .pipe(map((response) => ListFacade.filterList(response)));
  }

  public updateList(list: UpdateList): Observable<List> {
    return this.listService
      .updateList(list)
      .pipe(map((response) => ListFacade.filterList(response)));
  }

  private static filterList(rawList: RawList): List {
    return {
      id: rawList._id,
      title: rawList.title ?? '',
      date: new Date(rawList.date) ?? new Date(),
      isMain: rawList.isMain,
    };
  }

  public deleteList(id: string): Observable<null> {
    return this.listService.deleteList(id);
  }
}
