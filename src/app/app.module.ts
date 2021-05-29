import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {FooterModule} from './shared/components';
import {AppInfoService, AuthService, ScreenService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PredictionService} from './shared/services/prediction.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { Configuration } from 'msal';
import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';
import { msalConfig, msalAngularConfig } from './app-config';
import { CoursesComponent } from './pages/courses/courses.component';
import {CourseService} from './shared/services/course.service';
import { ExamsComponent } from './pages/exams/exams.component';
import {ExamService} from './shared/services/exam.service';
import { ExamDetailComponent } from './pages/exam-detail/exam-detail.component';
import {ExamTaskService} from './shared/services/exam-task.service';
import { ExamTaskDetailComponent } from './pages/exam-task-detail/exam-task-detail.component';
import {StudentSolutionService} from './shared/services/student-solution.service';

// Remove this line to use Angular Universal
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;


function MSALConfigFactory(): Configuration {
  return msalConfig;
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return msalAngularConfig;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MsalModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    PredictionService,
    CourseService,
    ExamService,
    ExamTaskService,
    StudentSolutionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
