import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrackerComponent } from './edit-tracker.component';

describe('EditTrackerNameComponent', () => {
  let component: EditTrackerComponent;
  let fixture: ComponentFixture<EditTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTrackerComponent]
    });
    fixture = TestBed.createComponent(EditTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
