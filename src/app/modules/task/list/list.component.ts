import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListFacade } from '#modules/task/list/list.facade';
import { List } from '#modules/task/list/list.model';
import { forkJoin, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ListsViewComponent } from '#modules/task/list/lists-view/lists-view.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  public activeList: List | null;

  private unsubscribeAll: Subject<null>;

  constructor(
    private readonly listFacade: ListFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bottomSheet: MatBottomSheet
  ) {
    this.activeList = null;
    this.unsubscribeAll = new Subject<null>();
  }

  ngOnInit(): void {
    this.setActiveList();
  }

  public openListsView(): void {
    this.bottomSheet.open(ListsViewComponent, {
      data: this.activeList?.id,
      panelClass: ['bg-transparent', 'shadow-none', 'p-0'],
    });
  }

  private setActiveList(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.listFacade.getListById(params?.listId)),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((response) => {
        this.activeList = response;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
