import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Exam} from '../../shared/models/exam.model';
import {ExamService} from '../../shared/services/exam.service';
import {ExamTask} from '../../shared/models/exam-task';
import {ExamTaskService} from '../../shared/services/exam-task.service';
import {environment} from '../../../environments/environment';
import {AlertifyService} from '../../shared/services/alertify.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  exam: Exam;
  examTasks: ExamTask[];
  uploadExamTasksUrl = environment.backendApi + 'ExamTasks/Excel';
  examTasksFile: any[] = [];
  uploadStudentSolutionsUrl = environment.backendApi + 'StudentSolutions/Excel';
  studentSolutionsFile: any[] = [];
  headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token')};
  examTaskExamplePopup = false;
  studentSolutionExamplePopup = false;

  constructor(private route: ActivatedRoute, private examService: ExamService,
              private examTaskService: ExamTaskService, private router: Router, private alertify: AlertifyService) {
    this.route.paramMap.subscribe(params => {
      const idParams = params.get('id');
      this.examService.getExam(idParams).subscribe((exam: Exam) => {
        this.exam = exam;
      });
      this.examTaskService.getExamTasks(idParams).subscribe((examTasks: ExamTask[]) => {
        this.examTasks = examTasks;
      });
      this.uploadExamTasksUrl = environment.backendApi + 'ExamTasks/Excel?examId=' + idParams;
      this.uploadStudentSolutionsUrl = environment.backendApi + 'StudentSolutions/Excel?examId=' + idParams;
    });
  }

  ngOnInit(): void {
  }

  onDetailExamTask = (e) => {
    const item = Object.assign({}, e.row.data);
    this.router.navigate(['/exam-tasks', item.id]);
  }

  onDeleteExamTask = (e) => {
    const item = Object.assign({}, e.row.data);
    this.examTaskService.deleteExamTask(item.id).subscribe(
      res => {
        this.exam = res;
        this.alertify.success('Exam task is deleted');
      },
      err => this.alertify.error('Exam cannot be deleted')
    );
  }

  onExamSave(): void {
    this.examService.updateExam(this.exam).subscribe(
      res => {
        this.exam = res;
        this.alertify.success('Exam is updated');
      },
      err => this.alertify.error('Exam cannot be updated')
    );
  }

  onShowExamTaskExample(): void {
    this.examTaskExamplePopup = true;
  }

  onShowStudentSolutionExample(): void {
    this.studentSolutionExamplePopup = true;
  }
}
