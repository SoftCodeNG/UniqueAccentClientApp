import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGridListComponent } from './course-grid-list.component';

describe('CourseGridListComponent', () => {
  let component: CourseGridListComponent;
  let fixture: ComponentFixture<CourseGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGridListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
