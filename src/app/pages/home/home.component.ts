import {Component, OnInit} from '@angular/core';
import {PredictionRequest, PredictionResult} from '../../shared/models/prediction.model';
import {PredictionService} from '../../shared/services/prediction.service';
import {AuthService} from '../../shared/services';
import {HttpClient} from '@angular/common/http';
import {apiConfig} from '../../app-config';
import {Subscription} from 'rxjs';
import {BroadcastService} from '@azure/msal-angular';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
  predictionRequest: PredictionRequest = {sentence1: 'Test is done', sentence2: 'Test isn\'t done'};
  predictionResult: any = 0.0;

  constructor(private predictionService: PredictionService, private authService: AuthService,
              private http: HttpClient, private broadcastService: BroadcastService) {}

  createPredictionEvent(): void {
    this.predictionService.createPrediction(this.predictionRequest).subscribe(
      res => this.predictionResult = res,
      err => console.log(err)
    );
  }

  getProfile(): void {
  }

  ngOnInit(): void {
    this.getProfile();
  }
}
