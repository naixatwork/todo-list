import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { List } from '#modules/task/list/list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ListBatchComponent } from '#modules/task/list/list-batch/list-batch.component';
import { ListFacade } from '#modules/task/list/list.facade';

@Component({
  selector: 'app-lists-view',
  templateUrl: './lists-view.component.html',
  styleUrls: ['./lists-view.component.scss'],
})
export class ListsViewComponent implements OnInit {
  public lists: Array<List>;

  constructor(
    private readonly listFacade: ListFacade,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly sheetRef: MatBottomSheetRef<ListsViewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public readonly activeListId: string,
    private readonly matDialog: MatDialog
  ) {
    this.lists = [];
  }

  ngOnInit(): void {
    this.listsInit();
  }

  private listsInit(): void {
    this.listFacade.getLists().subscribe((response) => {
      this.lists = response.data;
    });
  }

  public navigateToList(id: string): void {
    this.router.navigate([`task/${id}`]).then();
    this.closeSheet();
  }

  public createList(): void {
    this.matDialog
      .open(ListBatchComponent, {
        data: null,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) this.appendCreatedList(data);
      });
  }

  private appendCreatedList(list: List): void {
    this.lists.push(list);
  }

  private closeSheet(): void {
    this.sheetRef.dismiss();
  }
}
