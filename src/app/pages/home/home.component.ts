import { Component } from '@angular/core';
import {PredictionRequest, PredictionResult} from "../../shared/models/prediction.model";
import {PredictionService} from "../../shared/services/prediction.service";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  predictionRequest: PredictionRequest = {firstSentence: 'Test is done', secondSentence: 'Test isn\'t done'};
  predictionResult: PredictionResult = {correctnessPercentage: 0.0};
  constructor(private predictionService: PredictionService) {}

  createPredictionEvent() {
    this.predictionService.createPrediction(this.predictionRequest).subscribe(
      res => this.predictionResult = res,
      err => console.log(err)
    );
  }
}
