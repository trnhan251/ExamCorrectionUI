import { Component, OnInit } from '@angular/core';
import {Exam} from '../../shared/models/exam.model';
import {ExamService} from '../../shared/services/exam.service';
import {AuthService} from '../../shared/services';
import {Router} from '@angular/router';
import {Dataset} from '../../shared/models/dataset.model';
import {DatasetService} from '../../shared/services/dataset.service';
import {AlertifyService} from '../../shared/services/alertify.service';
import {environment} from '../../../environments/environment';

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
  addPopup = false;
  uploadDatasetUrl = environment.backendApi + 'Dataset/Excel';
  datasetFile: any[] = [];
  headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token')};
  newDataExamplePopup = false;

  constructor(private datasetService: DatasetService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService) {
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

  closePopup(): void {
    this.currentData = {};
  }

  onAddButtonClick(): void {
    this.addPopup = true;
    this.currentData = {};
  }

  onDataCreate(): void {
    this.datasetService.createData(this.currentData).subscribe(
      res => {
        this.currentData = res;
        this.alertify.success('New data was created');
      },
      err => this.alertify.error('Cannot create the new data')
    );
  }

  onDataSave(): void {
    this.datasetService.updateData(this.currentData).subscribe(
      res => {
        this.currentData = res;
        this.alertify.success('New data was created');
      },
      err => this.alertify.error('Cannot create the new data')
    );
  }

  onNewDataExample(): void {
    this.newDataExamplePopup = true;
  }
}
