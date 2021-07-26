import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private readonly mainService: MainService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  closeSheet(): void {
    this.mainService.closeSheet();
  }

  signOut(): void {
    localStorage.removeItem('auth');
    this.closeSheet();
  }
}
