import { Component, OnInit } from '@angular/core';
import { SettingService } from '#shared/services/setting.service';
import { Background } from '#shared/models/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private readonly settingService: SettingService) {}

  ngOnInit(): void {}

  setBackground(): void {
    this.settingService.background.next(Background.CLOUDLY);
  }
}
