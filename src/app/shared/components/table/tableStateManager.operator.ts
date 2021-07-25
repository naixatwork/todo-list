import { State, TableConfig } from './table.model';
import { defer, Observable } from 'rxjs';
import { Response } from '#shared/models/response.model';
import { tap } from 'rxjs/operators';

export function tableStateManager<T>(
  http: Observable<Response<T>>,
  config: TableConfig<T>
): Observable<Response<T>> {
  return defer(() => {
    config.state.next(State.LOADING);
    return http.pipe(
      tap(() => {
        config.state.next(State.PRESENT);
      })
    );
  });
}
