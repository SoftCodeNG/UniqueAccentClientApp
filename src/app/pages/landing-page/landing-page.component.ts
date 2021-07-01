import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetHeaderVisibility} from '../../store/app-store/app.action'; // lib


// @ts-ignore
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private courseService: any;
  private courseDetails: any;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SetHeaderVisibility('visible'));
  }
  // getCoursesDetails(slug: string): void{
  //   this.courseService.getCourseDteail(slug).subscribe(res => {
  //   this.courseDetails = res; };
  // })

}
