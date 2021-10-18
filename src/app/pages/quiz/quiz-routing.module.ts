import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {QuizComponent} from "./quiz.component";
import {QuizInstructionComponent} from "./quiz-instruction/quiz-instruction.component";
import {Quiz1Component} from "./quiz1/quiz1.component";
import {QuizEndComponent} from "./quiz-end/quiz-end.component";

const routes: Routes = [
{
    path: '',
    component: QuizComponent
  },
  {
    path: 'instruction/:slug',
    component: QuizInstructionComponent
  },
  {
    path: 'questions/:slug',
    component: Quiz1Component
  },
  {
    path: 'quiz-end',
    component: QuizEndComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
