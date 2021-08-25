import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../core/quiz.service";

@Component({
  selector: 'app-quiz1',
  templateUrl: './quiz1.component.html',
  styleUrls: ['./quiz1.component.scss']
})
export class Quiz1Component implements OnInit {
  isRecording = false;
  isRecorded = false;

  constructor(
    public quizService: QuizService
  ) { }

  ngOnInit(): void {
  }

  handleSuccess(stream) {
    this.isRecording = true;
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

        const nextButton = document.getElementById('next') as HTMLButtonElement;
        nextButton.addEventListener('click', () => {
          this.quizService.uploadMedia(recordedFile).subscribe(res => {
            console.log(res)
          })
        })
      });


      stopButton.addEventListener('click', function() {
        console.log('clicking stop')
        mediaRecorder.stop();
      });

      mediaRecorder.start();
    };

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((rec) => this.handleSuccess(rec));
  }
}
