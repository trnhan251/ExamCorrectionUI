import { Component, OnInit } from '@angular/core';
import {Course} from '../../shared/models/course.model';
import {CourseService} from '../../shared/services/course.service';
import {AuthService} from '../../shared/services';
import {ExamService} from '../../shared/services/exam.service';
import {Exam} from '../../shared/models/exam.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  dataSource: any;
  exams: Exam[];

  constructor(private examService: ExamService, private authService: AuthService, private router: Router) {
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
  }

  ngOnInit(): void {
  }

  onDetailClick = (e) => {
    const item = Object.assign({}, e.row.data);
    this.router.navigate(['/exams', item.id]);
  }

  onAddCourseClick(): void {
  }
}
