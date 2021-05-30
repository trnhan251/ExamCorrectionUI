import {Component, OnInit} from '@angular/core';
import {PredictionRequest, PredictionResult} from '../../shared/models/prediction.model';
import {PredictionService} from '../../shared/services/prediction.service';
import {AuthService} from '../../shared/services';
import {HttpClient} from '@angular/common/http';
import {apiConfig} from '../../app-config';
import {Subscription} from 'rxjs';
import {BroadcastService} from '@azure/msal-angular';
import {AlertifyService} from '../../shared/services/alertify.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
  predictionRequest: PredictionRequest = {sentence1: 'Test is done', sentence2: 'Test isn\'t done'};
  predictionResult: PredictionResult = {correctnessPercentage: 0.0};
  result = 0.0;
  constructor(private predictionService: PredictionService, private alertfiy: AlertifyService) {}

  createPredictionEvent(): void {
    this.predictionService.createPrediction(this.predictionRequest).subscribe(
      res => {
        this.result = res;
        this.alertfiy.success('Scored');
      },
      err => {
        console.log(err);
        this.alertfiy.error('Error or you did not login');
      }
    );
  }

  ngOnInit(): void {
  }
}
