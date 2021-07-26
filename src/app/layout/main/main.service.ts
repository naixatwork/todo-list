import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MenuComponent } from './menu/menu.component';

@Injectable()
export class MainService {
  constructor(private readonly bottomSheet: MatBottomSheet) {}

  public openSheet(): void {
    this.bottomSheet.open(MenuComponent, {
      panelClass: ['bg-transparent', 'shadow-none', 'p-0'],
    });
  }

  public closeSheet(): void {
    this.bottomSheet.dismiss();
  }
}
