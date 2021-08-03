import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {QuizComponent} from "./quiz.component";
import {QuizInstructionComponent} from "./quiz-instruction/quiz-instruction.component";

const routes: Routes = [
{
    path: '',
    component: QuizComponent
  },
  {
    path: 'instruction/:slug',
    component: QuizInstructionComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
