import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetails6Component } from './service-details6.component';

describe('ServiceDetails6Component', () => {
  let component: ServiceDetails6Component;
  let fixture: ComponentFixture<ServiceDetails6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetails6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetails6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
