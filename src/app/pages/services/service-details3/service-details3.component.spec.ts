import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetails3Component } from './service-details3.component';

describe('ServiceDetails3Component', () => {
  let component: ServiceDetails3Component;
  let fixture: ComponentFixture<ServiceDetails3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetails3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetails3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
