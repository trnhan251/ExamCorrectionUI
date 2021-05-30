import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PredictionRequest} from '../models/prediction.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PredictionService {
  api = environment.backendApi + 'Prediction';


  constructor(private http: HttpClient) {
  }

  public createPrediction(predictionRequest: PredictionRequest): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.api, predictionRequest, httpOptions);
  }
}
