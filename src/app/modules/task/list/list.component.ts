import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListFacade } from '#modules/task/list/list.facade';
import { List } from '#modules/task/list/list.model';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ListsViewComponent } from '#modules/task/list/lists-view/lists-view.component';
import { ListDetailComponent } from '#modules/task/list/list-detail/list-detail.component';

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

  private setActiveList(): void {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.listFacade.getListById(params?.listId)))
      .subscribe((response) => {
        this.activeList = response;
      });
  }

  public openListsView(): void {
    this.bottomSheet.open(ListsViewComponent, {
      data: this.activeList?.id,
      panelClass: ['bg-transparent', 'shadow-none', 'p-0'],
    });
  }

  public openListDetail(): void {
    this.bottomSheet.open(ListDetailComponent, {
      data: this.activeList,
      panelClass: ['bg-transparent', 'shadow-none', 'p-0'],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
