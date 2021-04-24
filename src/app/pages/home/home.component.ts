import { Component } from '@angular/core';
import {PredictionRequest} from "../../shared/models/prediction-request.model";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  predictionRequest: PredictionRequest = {firstSentence: 'Test is done', secondSentence: 'Test isn\'t done'};
  constructor() {}
}
