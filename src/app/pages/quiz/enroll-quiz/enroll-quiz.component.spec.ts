import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollQuizComponent } from './enroll-quiz.component';

describe('EnrollQuizComponent', () => {
  let component: EnrollQuizComponent;
  let fixture: ComponentFixture<EnrollQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
