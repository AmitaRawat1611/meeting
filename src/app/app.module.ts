import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainComponent } from './main/main.component';
import { SidenavComponent } from './main/sidenav/sidenav.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';

import { SharedModule } from './shared/shared.module';

import { HeaderInterceptor } from './headers.interceptor';
import { UserManageComponent } from './main/user-manage/user-manage.component';
import { MeetingComponent } from './main/meeting/meeting.component';
import { CreateUserComponent } from './main/create-user/create-user.component';

import { CreateMeetingComponent } from './main/create-meeting/create-meeting.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { DeleteUserComponent } from './main/user-manage/delete-user/delete-user.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    MainComponent,
    SidenavComponent,
    DashboardComponent,
    UserManageComponent,
    MeetingComponent,
    CreateUserComponent,
    CreateMeetingComponent,
    ForgotPasswordComponent,
    DeleteUserComponent,
    CalendarComponent,
  ],
  imports: [
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    FullCalendarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
