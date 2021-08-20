import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../core/quiz.service";

@Component({
  selector: 'app-quiz1',
  templateUrl: './quiz1.component.html',
  styleUrls: ['./quiz1.component.scss']
})
export class Quiz1Component implements OnInit {

  constructor(
    public quizService: QuizService
  ) { }

  ngOnInit(): void {
  }

  afterRecording(audio: any) {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement
    audioPlayer.src = audio
  }


  handleSuccess(stream) {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function(e) {
      // Do something with the data, e.g. convert it to WAV
      console.log(context.baseLatency);
      console.log(context.outputLatency);
    };


    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement
    const downloadLink = document.getElementById('download') as HTMLAnchorElement;
    const stopButton = document.getElementById('stop');

      const options = {mimeType: 'audio/webm'};
      const recordedChunks = [];
      // @ts-ignore
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) recordedChunks.push(e.data);
        console.log(e)
      });

      mediaRecorder.addEventListener('stop', () => {
        let recordedFile = new File([new Blob(recordedChunks)], 'recordedAudio.mp3', {lastModified: 1534584790000, type: 'audio/mp3'})
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
        downloadLink.download = 'iLoveUche.mp3';
        console.log('file created', recordedFile)

        this.quizService.uploadMedia(recordedFile).subscribe(res => {
          console.log(res)
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
