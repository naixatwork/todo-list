import { BehaviorSubject } from 'rxjs';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

export class TableConfig<T> {
  constructor(
    public data: Array<T>,
    public columns: Array<ColumnType<T>>,
    _pagination: { length: number | null; mode: Mode | null }
  ) {
    this.pagination.total = _pagination.length;
    this.pagination.mode = _pagination.mode;
  }
  public state: BehaviorSubject<State> = new BehaviorSubject<State>(State.INIT);
  public pagination: Pagination = {
    total: null,
    pageIndex: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 50, 100],
    mode: null,
  };
}

// State
export enum State {
  LOADING = 'LOADING',
  PRESENT = 'PRESENT',
  FAIL = 'FAIL',
  INIT = 'INIT',
}

// Pagination
export interface Pagination {
  total: number | null;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: Array<number>;
  mode: Mode | null;
}
export enum Mode {
  LOCAL = 'LOCAL',
  SERVER = 'SERVER',
}

// Columns
export type ColumnType<T> =
  | Column<T>
  | IndexColumn
  | DateColumn<T>
  | PriceColumn<T>
  | OperationColumn<T>;

export abstract class AbstractColumn<T> {
  constructor(
    public key: keyof T | 'operation' | 'index',
    public header?: string | 'operation' | 'index',
    public width?: string | null,
    public className?: string | null
  ) {
    if (!header) {
      this.header = key.toString();
    }
  }
  public kind:
    | 'abstract'
    | 'basic'
    | 'index'
    | 'date'
    | 'price'
    | 'template'
    | 'operation' = 'abstract';
}

export class Column<T> extends AbstractColumn<T> {
  public kind: AbstractColumn<T>['kind'] = 'basic';
}

export class IndexColumn extends AbstractColumn<never> {
  constructor() {
    super('index', 'No.', '100px');
  }
  public kind: AbstractColumn<never>['kind'] = 'index';
}

export class DateColumn<T> extends AbstractColumn<T> {
  public kind: AbstractColumn<T>['kind'] = 'date';
}

export class PriceColumn<T> extends AbstractColumn<T> {
  public kind: AbstractColumn<T>['kind'] = 'price';
}

export class TemplateColumn<T> extends AbstractColumn<T> {
  public kind: AbstractColumn<T>['kind'] = 'template';
}

export class OperationColumn<T> extends AbstractColumn<T> {
  constructor(
    public operation: Array<Operation<T>>,
    public width: string = '250px',
    public className?: string
  ) {
    super('operation', 'operation', width, className);
  }
  public kind: AbstractColumn<T>['kind'] = 'operation';
}

// Operation
export interface Operation<T> {
  tooltip?: string | ((row: T) => string);
  icon: string | ((row: T) => string);
  color: ThemePalette | ((row: T) => ThemePalette);
  operation(row: T): void;
}
