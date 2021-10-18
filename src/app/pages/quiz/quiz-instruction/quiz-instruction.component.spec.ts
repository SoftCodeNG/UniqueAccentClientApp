import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInstructionComponent } from './quiz-instruction.component';

describe('QuizSectionComponent', () => {
  let component: QuizInstructionComponent;
  let fixture: ComponentFixture<QuizInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});