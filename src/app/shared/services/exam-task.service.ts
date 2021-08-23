import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PredictionRequest} from '../models/prediction.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable()
export class ExamTaskService {
  api = environment.backendApi + 'ExamTasks';

  constructor(private http: HttpClient) {
  }

  public getExamTasks(id): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(this.api, {params: {examId: id}});
  }

  public getExamTask(id): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(this.api + '/' + id, httpOptions);
  }

  public updateExamTask(examTask): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.api, examTask, httpOptions);
  }

  public deleteExamTask(id): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(this.api + '/' + id, httpOptions);
  }
}
