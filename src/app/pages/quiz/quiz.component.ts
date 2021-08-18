import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../core/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {}

  confirmPasscode(passcode: string): void {
    this.quizService.confirmPasscode(passcode).subscribe(res => {
      console.log(res);
      if (res) {
        this.router.navigate([`/quiz/instruction/${res.slug}`])
      } else {
        this.toastr.error('Invalid Passcode');
      }
    });
  }
}
