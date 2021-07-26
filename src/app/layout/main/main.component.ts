import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from './main.service';
import { SettingService } from '#shared/services/setting.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Background } from '#shared/models/settings.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public background!: Background;

  private unsubscribeAll: Subject<null> = new Subject<null>();

  constructor(
    private readonly mainService: MainService,
    public readonly settingService: SettingService
  ) {}

  ngOnInit(): void {
    this.backgroundInit();
  }

  private backgroundInit(): void {
    this.settingService.background
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.background = value;
      });
  }

  public openSheet(): void {
    this.mainService.openSheet();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
