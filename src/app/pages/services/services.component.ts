import { Component, OnInit } from '@angular/core';
import {HomePageService} from '../../core/services/home-page.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: any;

  constructor(
      private homePageService: HomePageService
  ) {
  }

  ngOnInit(): void {
     this.getAllServices();
  }
 getAllServices(): void {
    this.homePageService.getAllServices().subscribe(res => {
      this.services = res;
      console.log('Adeola is here: ', this.services);
    });
  }
}
