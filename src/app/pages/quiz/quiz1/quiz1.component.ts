import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../core/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-quiz1',
  templateUrl: './quiz1.component.html',
  styleUrls: ['./quiz1.component.scss']
})
export class Quiz1Component implements OnInit {
  public quizDetails: any;
  allQuestions: any[];
  currentQuestion: any;
  currentRecordedFile: any;
  answeredQuestions = [];
  currentQuestionIndex = 0;
  isRecording = false;
  isRecorded = false;
  next: string;
  prev: string;

  constructor(
    public quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getQuizDetails(this.activatedRoute.snapshot.params.slug);
  }

  handleSuccess(stream) {
    if (this.isRecorded === false) {
      this.isRecording = true;
    }
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement
    const stopButton = document.getElementById('stop');

    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    // @ts-ignore
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
      // console.log(e)
    });

    mediaRecorder.addEventListener('stop', () => {
      let recordedFile = <any>new File([new Blob(recordedChunks)], 'recordedAudio.mp3', {lastModified: 1534584790000, type: 'audio/mp3'})
      // Make file available to be played
      const reader = new FileReader()
      reader.readAsDataURL(recordedFile);
      reader.addEventListener("load", function () {
        const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement
        if (typeof reader.result === "string") {
          audioPlayer.src = reader.result
        }
      }, false);
      this.isRecording = false;
      this.isRecorded = true;
      this.currentRecordedFile = recordedFile

      // const nextButton = document.getElementById('next') as HTMLButtonElement;
      // nextButton.addEventListener('click', () => {
      //   if (recordedFile) {
      //     this.quizService.uploadMedia(recordedFile).subscribe(res => {
      //       console.log(res)
      //       recordedFile = null
      //       this.answeredQuestions.push(this.currentQuestion)
      //       this.navigate('next')
      //     })
      //   } else {
      //     this.navigate('next')
      //   }
      // })
    });


      stopButton.addEventListener('click', () => {
        console.log('clicking stop')
        this.isRecording = false;
        mediaRecorder.stop();
      });

      mediaRecorder.start();
    };

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((rec) => this.handleSuccess(rec));
  }

  getQuizDetails(slug: string): void {
    this.quizService.getQuizDetails(slug).subscribe(res => {
      this.quizDetails = res;
      this.allQuestions = res.quizQuestions;
      this.currentQuestion = this.allQuestions[0]
      console.log(res);
    });
  }

    navigate(direction: string): void {
    if (this.isRecording) {
      this.toastr.info('You can\'t navigate when recording is in progress')
    } else {
      const tempCurrentQuestion = this.currentQuestion
      this.allQuestions.forEach((r, index) => {
        if (r === tempCurrentQuestion) {
          if (direction === 'next') {
            if (this.currentRecordedFile) {
              this.quizService.uploadMedia(this.currentRecordedFile).subscribe(res => {
                console.log(res)
                this.currentRecordedFile = null
                this.answeredQuestions.push(this.currentQuestion)
                this.currentQuestion = this.allQuestions[index + 1]
                this.currentQuestionIndex = index + 1
              })
            } else {
              this.currentQuestion = this.allQuestions[index + 1]
              this.currentQuestionIndex = index + 1
            }

          } else {
            this.currentQuestion = this.allQuestions[index - 1]
            this.currentQuestionIndex = index - 1
          }
          this.isRecording = false
          this.isRecorded = false
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      })
    }
  }

  changeQuestionNumber(question: any, index: any): void {
    if (this.currentRecordedFile) {
      this.toastr.info('You have a pending recorded file. Kindly click on next to submit or cancel the recorded file to use number navigation')
    } else if (this.isRecording) {
      this.toastr.info('You can\'t navigate when recording is in progress')
    } else {
      this.currentQuestion = question
      this.currentQuestionIndex = index
    }
  }
}
