import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../core/quiz.service";

@Component({
  selector: 'app-quiz1',
  templateUrl: './quiz1.component.html',
  styleUrls: ['./quiz1.component.scss']
})
export class Quiz1Component implements OnInit {
  recordedFile: any

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
  }

  afterRecording(audio: any) {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement
    audioPlayer.src = audio
  }

  startRecording() {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement
    const downloadLink = document.getElementById('download') as HTMLAnchorElement;
    const stopButton = document.getElementById('stop');

    let record: any


    const uploadAudioAnswer = this.uploadAudioAnswer(record, downloadLink)

    const handleSuccess = function(stream) {
      const options = {mimeType: 'audio/webm'};
      const recordedChunks = [];
      // @ts-ignore
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) recordedChunks.push(e.data);
        record = recordedChunks;
      });

      mediaRecorder.addEventListener('stop', () => uploadAudioAnswer);


      stopButton.addEventListener('click', function() {
        mediaRecorder.stop();
      });

      mediaRecorder.start();
    };
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }

  uploadAudioAnswer(recordedChunks, downloadLink): any {
    this.recordedFile = new Blob(recordedChunks)
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
        downloadLink.download = 'iLoveUche.mp3';

        this.quizService.uploadMedia(this.recordedFile).subscribe(res => {
          console.log(res)
        })
  }
}
