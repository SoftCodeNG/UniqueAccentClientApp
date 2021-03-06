import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input() allCourses: any[];

  constructor() { }

  ngOnInit(): void {}
}
