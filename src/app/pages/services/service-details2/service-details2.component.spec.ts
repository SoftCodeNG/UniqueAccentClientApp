import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetails2Component } from './service-details2.component';

describe('ServiceDetails2Component', () => {
  let component: ServiceDetails2Component;
  let fixture: ComponentFixture<ServiceDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetails2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
