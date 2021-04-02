import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetails4Component } from './course-details4.component';

describe('CourseDetails4Component', () => {
  let component: CourseDetails4Component;
  let fixture: ComponentFixture<CourseDetails4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetails4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetails4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
