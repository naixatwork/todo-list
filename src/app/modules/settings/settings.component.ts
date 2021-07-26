import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingService } from '#shared/services/setting.service';
import { Background } from '#shared/models/settings.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public background!: Background;
  private unsubscribeAll: Subject<null> = new Subject<null>();

  constructor(private readonly settingService: SettingService) {}

  ngOnInit(): void {
    this.backgroundInit();
  }

  backgroundInit(): void {
    this.settingService.background
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.background = value;
      });
  }

  setBackground(background: string | Background): void {
    this.settingService.background.next(background as Background);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
