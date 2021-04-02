import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetails3Component } from './course-details3.component';

describe('CourseDetails3Component', () => {
  let component: CourseDetails3Component;
  let fixture: ComponentFixture<CourseDetails3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetails3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetails3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
