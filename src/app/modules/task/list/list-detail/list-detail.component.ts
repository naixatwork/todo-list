import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ListFacade } from '#modules/task/list/list.facade';
import { List } from '#modules/task/list/list.model';
import { ListBatchComponent } from '#modules/task/list/list-batch/list-batch.component';
import { Router } from '@angular/router';
import { ConfirmComponent } from '#shared/components/dialog/confirm/confirm.component';
import { Confirm } from '#shared/models/confirm.model';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit {
  mainList: List | null;
  constructor(
    private readonly sheetRef: MatBottomSheetRef<ListDetailComponent>,
    private readonly listFacade: ListFacade,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public readonly activeList: List
  ) {
    this.mainList = null;
  }

  ngOnInit(): void {
    this.mainListInit();
  }

  public deleteList(): void {
    const confirmData: Confirm = {
      question: `Are you sure about deleting ${this.activeList.title} list?`,
    };
    this.matDialog
      .open(ConfirmComponent, {
        data: confirmData,
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) this.deleteListFromServer(this.activeList.id);
      });
  }

  public deleteListFromServer(id: string): void {
    this.listFacade.deleteList(id).subscribe(() => {
      this.navigateToList(this.mainList?.id);
      this.closeSheet();
    });
  }

  public editList(): void {
    this.matDialog
      .open(ListBatchComponent, { data: this.activeList })
      .afterClosed()
      .subscribe((response: List | undefined) => {
        if (response) this.navigateToList(this.activeList.id);
        this.closeSheet();
      });
  }

  private navigateToList(listId: string | undefined): void {
    // quick fix to trigger reload
    const randomNumber = Math.random();
    this.router
      .navigate([`task/${listId}?${randomNumber}`], {
        skipLocationChange: true,
      })
      .then(() => {});
  }

  private mainListInit(): void {
    this.listFacade.getMainList().subscribe((response) => {
      this.mainList = response;
    });
  }

  private closeSheet(): void {
    this.sheetRef.dismiss();
  }

  public isMainListActive(): boolean {
    return this.mainList?.id === this.activeList.id;
  }
}
