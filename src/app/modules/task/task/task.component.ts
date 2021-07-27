import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);
  }
}
