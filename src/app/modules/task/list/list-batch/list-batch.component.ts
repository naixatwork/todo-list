import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateList, List, UpdateList } from '#modules/task/list/list.model';
import { ListFacade } from '#modules/task/list/list.facade';

@Component({
  selector: 'app-list-batch',
  templateUrl: './list-batch.component.html',
  styleUrls: ['./list-batch.component.scss'],
})
export class ListBatchComponent implements OnInit {
  public form!: FormGroup;
  public today: Date;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ListBatchComponent>,
    private readonly listFacade: ListFacade,
    @Inject(MAT_DIALOG_DATA) public readonly data: List | null
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      title: [this.data?.title ?? '', [Validators.required]],
      date: [this.data?.date ?? ''],
    });
  }

  public submit(): void {
    if (this.isUpdate()) {
      this.updateList();
    } else {
      this.createList();
    }
  }

  private createList(): void {
    const value: CreateList = {
      ...this.form.value,
    };
    this.listFacade.createList(value).subscribe((response) => {
      this.closeDialog(response);
    });
  }

  private updateList(): void {
    const value: UpdateList = {
      id: this.data?.id,
      ...this.form.value,
    };
    this.listFacade.updateList(value).subscribe((response) => {
      this.closeDialog(response);
    });
  }

  private closeDialog(closeValue?: List): void {
    this.dialogRef.close(closeValue);
  }

  public isUpdate(): boolean {
    return !!this.data;
  }
}
