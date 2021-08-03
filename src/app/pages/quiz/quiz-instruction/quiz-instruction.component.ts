import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../core/quiz.service";

@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-instruction.component.html',
  styleUrls: ['./quiz-instruction.component.scss']
})
export class QuizInstructionComponent implements OnInit {
  public quizDetails: any;

  constructor(
        private quizService: QuizService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
  ) {}

  ngOnInit(): void {
        this.getQuizDetails(this.activatedRoute.snapshot.params.slug);
  }

    getQuizDetails(slug: string): void {
    this.quizService.getQuizDetails(slug).subscribe(res => {
      this.quizDetails = res;
      console.log(res);
    });
  }

}
