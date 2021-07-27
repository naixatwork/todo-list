import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { State, TableConfig } from './table.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit, OnChanges, OnDestroy {
  @Input() public config!: TableConfig<T>;

  public dataSource!: MatTableDataSource<T>;
  public state!: State;
  public displayedColumns!: Array<keyof T>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private unsubscribeAll: Subject<never>;

  constructor() {
    this.state = State.INIT;
    this.displayedColumns = [];
    this.unsubscribeAll = new Subject<never>();
  }

  ngOnInit(): void {
    this.stateInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'].currentValue) {
      this.config = changes['config'].currentValue;
      this.dataInit();
      this.displayedColumnsInit();
      this.dataSource.paginator = this.paginator;
    }
  }

  private dataInit(): void {
    this.dataSource = new MatTableDataSource<T>(this.config.data);
  }

  private displayedColumnsInit(): void {
    this.displayedColumns = _.map(this.config.columns, 'key') as Array<keyof T>;
  }

  private stateInit(): void {
    this.config.state
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((state) => {
        this.state = state;
      });
  }

  public getIndexFromPagination(index: number): number | null {
    if (!this.paginator) return null;

    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }

  public checkType(input: string | ((data: T) => string), data: T): string {
    if (typeof input === 'function') {
      return input(data);
    }
    return input;
  }

  public checkColorType(input: string): ThemePalette {
    return input as ThemePalette;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
