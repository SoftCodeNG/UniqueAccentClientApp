import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../core/quiz.service";
import {ToastrService} from "ngx-toastr";

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
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getQuizDetails(this.activatedRoute.snapshot.params.slug);
  }

  getQuizDetails(slug: string): void {
    this.quizService.getQuizDetails(slug).subscribe(res => {
      this.quizDetails = res;
      console.log(res);
    });
  }

  registerCandidate(candidateName: string, candidateNumber: string): void {
    const payload = {
      quizId: sessionStorage.getItem('quizId'),
      candidateName: candidateName,
      candidateNumber: candidateNumber,
      passCode: sessionStorage.getItem('passCode')
    }
    console.log('The data to be posted', payload)
    this.quizService.registerCandidate(payload).subscribe(res => {
      if (res) {
        this.router.navigate([`/quiz/questions/${this.activatedRoute.snapshot.params.slug}`]).then()
        console.log(res);
      } else {
        this.toastr.error('Input name and number');
      }
    });

  }
}


