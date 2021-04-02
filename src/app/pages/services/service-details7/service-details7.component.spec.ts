import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetails7Component } from './service-details7.component';

describe('ServiceDetails7Component', () => {
  let component: ServiceDetails7Component;
  let fixture: ComponentFixture<ServiceDetails7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetails7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetails7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
