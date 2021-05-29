import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PredictionRequest} from '../models/prediction.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable()
export class StudentSolutionService {
  api = environment.backendApi + 'StudentSolutions';

  constructor(private http: HttpClient) {
  }

  public getStudentSolutions(taskId): any {
    return this.http.get(this.api, {params: {examTaskId: taskId}});
  }

  public getStudentSolution(id): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(this.api + '/' + id, httpOptions);
  }

  public updateStudentSolution(studentSolution): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.api, studentSolution, httpOptions);
  }

  public scoreStudentSolution(id): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.api + '/' + id + '/Score', null, httpOptions);
  }
}
