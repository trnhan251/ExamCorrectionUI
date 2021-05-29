import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Exam} from '../../shared/models/exam.model';
import {ExamService} from '../../shared/services/exam.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  exam: Exam;
  constructor(private route: ActivatedRoute, private examService: ExamService) {
    this.route.paramMap.subscribe(params => {
      const idParams = params.get('id');
      this.examService.getExam(idParams).subscribe((exam: Exam) => {
        this.exam = exam;
      });
    });
  }

  ngOnInit(): void {
  }

}
