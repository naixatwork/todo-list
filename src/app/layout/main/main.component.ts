import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private readonly mainService: MainService) {}

  ngOnInit(): void {}

  public openSheet(): void {
    this.mainService.openSheet();
  }
}
