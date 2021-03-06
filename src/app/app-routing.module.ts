import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import {DxDataGridModule, DxFileUploaderModule, DxFormModule, DxPopupModule} from 'devextreme-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {CoursesComponent} from './pages/courses/courses.component';
import {MatIconModule} from '@angular/material/icon';
import {ExamsComponent} from './pages/exams/exams.component';
import {ExamDetailComponent} from './pages/exam-detail/exam-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ExamTaskDetailComponent} from './pages/exam-task-detail/exam-task-detail.component';
import {DatasetComponent} from './pages/dataset/dataset.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'exams',
    component: ExamsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'exams/:id',
    component: ExamDetailComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'exam-tasks/:id',
    component: ExamTaskDetailComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'dataset',
    component: DatasetComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    DxDataGridModule,
    DxFormModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    DxDataGridModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DxPopupModule,
    DxFileUploaderModule,
    CommonModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    CoursesComponent,
    ExamsComponent,
    ExamDetailComponent,
    ExamTaskDetailComponent,
    DatasetComponent
  ]
})
export class AppRoutingModule { }
