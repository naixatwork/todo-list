import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBatchComponent } from './task-batch.component';

describe('TaskBatchComponent', () => {
  let component: TaskBatchComponent;
  let fixture: ComponentFixture<TaskBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
