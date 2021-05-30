import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PredictionRequest} from '../models/prediction.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable()
export class CourseService {
  api = environment.backendApi + 'Courses';


  constructor(private http: HttpClient) {
  }

  public getCourses(): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get(this.api, httpOptions);
  }

  public createCourse(course): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.api, course, httpOptions);
  }

  public updateCourse(course): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.api, course, httpOptions);
  }

  public deleteCourse(id): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(this.api + '/' + id, httpOptions);
  }
}
