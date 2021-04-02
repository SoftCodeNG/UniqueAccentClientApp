import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetails4Component } from './service-details4.component';

describe('ServiceDetails4Component', () => {
  let component: ServiceDetails4Component;
  let fixture: ComponentFixture<ServiceDetails4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetails4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetails4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
