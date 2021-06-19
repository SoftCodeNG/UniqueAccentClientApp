import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss']
})
export class CourseGridComponent implements OnInit {
  @Input() allCourses: any[];

  constructor() { }

  ngOnInit(): void {}
}
