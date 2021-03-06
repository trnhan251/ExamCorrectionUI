import { Component, OnInit } from '@angular/core';
import {Exam} from '../../shared/models/exam.model';
import {ExamTask} from '../../shared/models/exam-task';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../shared/services/exam.service';
import {ExamTaskService} from '../../shared/services/exam-task.service';
import {StudentSolutionService} from '../../shared/services/student-solution.service';
import {StudentSolution} from '../../shared/models/student-solution';
import {AlertifyService} from '../../shared/services/alertify.service';

@Component({
  selector: 'app-exam-task-detail',
  templateUrl: './exam-task-detail.component.html',
  styleUrls: ['./exam-task-detail.component.scss']
})
export class ExamTaskDetailComponent implements OnInit {
  examTask: ExamTask = {};
  studentSolutions: StudentSolution[];
  studentSolutionPopup = false;
  currentStudentSolution: StudentSolution = {};

  constructor(private route: ActivatedRoute, private examTaskService: ExamTaskService,
              private studentSolutionService: StudentSolutionService, private alertify: AlertifyService) {
    this.route.paramMap.subscribe(params => {
      const idParams = params.get('id');
      this.examTaskService.getExamTask(idParams).subscribe((examTask: ExamTask) => {
        this.examTask = examTask;
      });
      this.studentSolutionService.getStudentSolutions(idParams).subscribe((studentSolutions: StudentSolution[]) => {
        this.studentSolutions = studentSolutions;
      });
    });
  }

  ngOnInit(): void {
  }

  onDetailStudentSolution = (e) => {
    const item = Object.assign({}, e.row.data);
    this.studentSolutionPopup = true;
    this.currentStudentSolution = item;
  }

  onDeleteStudentSolution = (e) => {
    const item = Object.assign({}, e.row.data);
    this.studentSolutionService.deleteStudentSolution(item.id).subscribe(
      res => {
        this.examTask = res;
        this.alertify.success('Student solution was deleted');
      },
      err => this.alertify.error('Student solution cannot be deleted')
    );
  }

  closePopup(): void {
    this.currentStudentSolution = {};
  }

  onExamTaskSave(): void {
    this.examTaskService.updateExamTask(this.examTask).subscribe(
      res => {
        this.examTask = res;
        this.alertify.success('Exam task was updated');
      },
      err => this.alertify.error('Exam task cannot be updated')
    );
  }

  onStudentSolutionSave(): void {
    this.studentSolutionService.updateStudentSolution(this.currentStudentSolution).subscribe(res => {
      this.currentStudentSolution = res;
      this.alertify.success('Student solution was updated');
      this.studentSolutionService.getStudentSolutions(this.examTask.id).subscribe((studentSolutions: StudentSolution[]) => {
        this.studentSolutions = studentSolutions;
      });
    }, err => this.alertify.error('Student solution cannot be updated'));
  }

  onScoreStudentSolution(): void {
    this.studentSolutionService.scoreStudentSolution(this.currentStudentSolution.id).subscribe(res => {
      this.currentStudentSolution = res;
      this.alertify.success('Student solution was scored');
      this.studentSolutionService.getStudentSolutions(this.examTask.id).subscribe((studentSolutions: StudentSolution[]) => {
        this.studentSolutions = studentSolutions;
      });
    }, err => this.alertify.error('Student solution cannot be scored'));
  }

  onAddToDataset(): void {
    this.studentSolutionService.addIntoDataset(this.currentStudentSolution.id).subscribe(res => {
      this.alertify.success('Data was added to dataset');
    }, err => this.alertify.error('Cannot be added to dataset'));
  }
}
