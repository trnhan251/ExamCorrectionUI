import { Component, OnInit } from '@angular/core';
import {Course} from '../../shared/models/course.model';
import {CourseService} from '../../shared/services/course.service';
import {AuthService} from '../../shared/services';
import {ExamService} from '../../shared/services/exam.service';
import {Exam} from '../../shared/models/exam.model';
import {Router} from '@angular/router';
import {AlertifyService} from '../../shared/services/alertify.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  dataSource: any;
  exams: Exam[];
  courses: Course[] = [];
  addPopupVisible = false;
  currentExam: Exam = {};
  currentCourse: Course = {};

  constructor(private examService: ExamService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService, private courseService: CourseService) {
    this.dataSource = {
      store: {
        type: 'array',
        key: 'id',
        data: []
      }
    };

    this.examService.getExams().subscribe((res: Exam[]) => {
      this.exams = res;
      if (this.exams != null) {
        this.dataSource = {
          store: {
            type: 'array',
            key: 'id',
            data: this.exams
          },
          select : [
            'id',
            'courseId',
            'courseName',
            'name',
            'description',
            'date',
            'scoreThreshold'
          ]
        };
      }
    });

    this.courseService.getCourses().subscribe((res: Course[]) => {
      this.courses = res;
    });
  }

  ngOnInit(): void {
  }

  onDetailClick = (e) => {
    const item = Object.assign({}, e.row.data);
    this.router.navigate(['/exams', item.id]);
  }

  closePopup(): void {
    this.currentExam = {};
  }

  onAddExam(): void {
    this.currentExam.courseId = this.currentCourse.id;
    this.examService.createExam(this.currentExam).subscribe(
      res => {
        this.currentExam = res;
        this.alertify.success('Exam was created');
      },
      err => this.alertify.error('Exam cannot be created')
    );
  }

  onAddButtonClick(): void {
    this.addPopupVisible = true;
    this.currentExam = {};
    this.currentCourse = {};
  }

  onChangeCourse($event): void {
    this.currentExam.courseId = $event.value.id;
  }
}
