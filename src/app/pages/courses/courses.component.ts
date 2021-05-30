import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../shared/services/course.service';
import {Course} from '../../shared/models/course.model';
import {AuthService} from '../../shared/services';
import {AlertifyService} from '../../shared/services/alertify.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  dataSource: any;
  courses: Course[];
  addPopupVisible = false;
  editPopupVisible = false;
  currentCourse: Course = {};

  constructor(private courseService: CourseService, private authService: AuthService, private alertify: AlertifyService) {
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

  onEditClick = (e) => {
    this.currentCourse = Object.assign({}, e.row.data);
    this.editPopupVisible = true;
  }

  onAddCourseClick(): void {
    this.currentCourse = {};
    this.addPopupVisible = true;
  }

  closePopup(): void {
    this.currentCourse = {};
  }

  onCourseSave(): void {
    this.courseService.updateCourse(this.currentCourse).subscribe(
      res => {
        this.currentCourse = res;
        this.alertify.success('Course is updated');
      },
      error => this.alertify.error('Course cannot be updated')
    );
  }

  onCourseCreate(): void {
    this.courseService.createCourse(this.currentCourse).subscribe(
      res => {
        this.currentCourse = res;
        this.alertify.success('Course is created');
      },
      error => this.alertify.error('Course cannot be created')
    );
  }
}
