import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Background } from '#shared/models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  public background: BehaviorSubject<Background> =
    new BehaviorSubject<Background>(Background.cloudly);
  constructor() {}
}
