import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrackerComponent } from './create-tracker.component';

describe('CreateTrackerComponent', () => {
  let component: CreateTrackerComponent;
  let fixture: ComponentFixture<CreateTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTrackerComponent]
    });
    fixture = TestBed.createComponent(CreateTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
