import { Component, OnInit } from '@angular/core';
import {Exam} from '../../shared/models/exam.model';
import {ExamService} from '../../shared/services/exam.service';
import {AuthService} from '../../shared/services';
import {Router} from '@angular/router';
import {Dataset} from '../../shared/models/dataset.model';
import {DatasetService} from '../../shared/services/dataset.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  dataSource: any;
  dataset: Dataset[];
  currentData: Dataset = {};
  datasetPopup = false;

  constructor(private datasetService: DatasetService, private authService: AuthService, private router: Router) {
    this.dataSource = {
      store: {
        type: 'array',
        key: 'id',
        data: []
      }
    };

    this.datasetService.getListDataset().subscribe((res: Dataset[]) => {
      this.dataset = res;
      if (this.dataset != null) {
        this.dataSource = {
          store: {
            type: 'array',
            key: 'id',
            data: this.dataset
          },
          select : [
            'id',
            'sentence1',
            'sentence2',
            'score',
            'isSimilar',
            'createdDate'
          ]
        };
      }
    });
  }

  ngOnInit(): void {
  }

  onDetailClick = (e) => {
    const item = Object.assign({}, e.row.data);
    this.currentData = item;
    this.datasetPopup = true;
  }

  onAddCourseClick(): void {
  }

  onDataSave(): void {
  }

  closePopup(): void {
    this.currentData = {};
  }

  onAddButtonClick(): void {
  }
}
