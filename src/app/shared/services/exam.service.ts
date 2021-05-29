import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PredictionRequest} from '../models/prediction.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable()
export class ExamService {
  api = environment.backendApi + 'Exams';

  constructor(private http: HttpClient) {
  }

  public getExams(): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(this.api, httpOptions);
  }

  public getExam(id): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(this.api + '/' + id, httpOptions);
  }
}
