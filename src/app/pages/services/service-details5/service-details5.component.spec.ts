import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetails5Component } from './service-details5.component';

describe('ServiceDetails5Component', () => {
  let component: ServiceDetails5Component;
  let fixture: ComponentFixture<ServiceDetails5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetails5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetails5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
