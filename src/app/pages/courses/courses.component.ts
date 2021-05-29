import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared/services/course.service';
import {Course} from '../../shared/models/course.model';
import {AuthService} from '../../shared/services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  dataSource: any;
  courses: Course[];

  constructor(private courseService: CourseService, private authService: AuthService) {
    this.dataSource = {
      store: {
        type: 'array',
        key: 'id',
        data: []
      }
    };

    this.courseService.getCourses().subscribe((res: Course[]) => {
      this.courses = res;
      if (this.courses != null) {
        this.dataSource = {
          store: {
            type: 'array',
            key: 'id',
            data: this.courses
          },
          select : [
            'id',
            'name',
            'description'
          ]
        };
      }
    });
  }

  ngOnInit(): void {
  }

  onDetailClick = (e) => {
    const item = Object.assign({}, e.row.data);
  }

  onAddCourseClick(): void {
  }
}
