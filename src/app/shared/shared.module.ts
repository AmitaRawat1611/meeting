import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { ErrorComponent } from './error/error.component';
import { Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { UpdateUserDetailsComponent } from './header/update-user-details/update-user-details.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
  },
];
@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent,
    NotificationComponent,
    UpdateUserDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,

    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, ErrorComponent],
})
export class SharedModule {}
