import { Component, OnInit } from '@angular/core';
import { ListFacade } from '#modules/task/list/list.facade';
import { List } from '#modules/task/list/list.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ListsViewComponent } from '#modules/task/list/lists-view/lists-view.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  lists: Array<List>;

  constructor(
    private readonly listFacade: ListFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bottomSheet: MatBottomSheet
  ) {
    this.lists = [];
  }

  ngOnInit(): void {
    this.listsInit();
  }

  listsInit(): void {
    forkJoin({
      lists: this.listFacade.getLists(),
      mainList: this.listFacade.getMainList(),
    })
      .pipe(
        map((response) => {
          return [response.mainList, ...response.lists.data];
        })
      )
      .subscribe((response) => {
        this.lists = response;
      });
  }

  openListsView(): void {
    this.bottomSheet.open(ListsViewComponent, {
      panelClass: ['bg-transparent', 'shadow-none', 'p-0'],
    });
  }
}
