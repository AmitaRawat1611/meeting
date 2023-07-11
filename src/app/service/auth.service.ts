import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  token: any;
  error!: boolean;
  errorStatus!: any;

  setErrorStatus(status: any) {
    this.errorStatus = status;
  }
  getErrorStatus() {
    return this.errorStatus;
  }
  //get login status
  getLoginStatus(data: object) {
    return this.http.post(
      environment.apiUrl + '/meets/login',
      JSON.stringify(data)
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  //Get all users
  users: any = [];
  getAllUsers() {
    return this.http.get(environment.adminApi + '/all-users');
  }

  //get active users
  activeUsers: any;
  getActiveUsers() {
    return this.http.get(environment.userApi + '/active-users');
  }

  //Create users
  createUser(data: any) {
    return this.http.post(
      environment.adminApi + '/register-member',
      JSON.stringify(data)
    );
  }

  //delete user
  deleteUser(username: any) {
    return this.http.post(
      environment.adminApi + '/delete-member',
      JSON.stringify(username)
    );
  }

  updateUser(data: any) {
    return this.http.post(
      environment.adminApi + '/update-member',
      JSON.stringify(data)
    );
  }

  //create meeting
  createMeeting(data: any) {
    return this.http.post(
      environment.userApi + '/register-meeting',
      JSON.stringify(data)
    );
  }

  //get meeting details
  getMeetingDetails() {
    return this.http.get(environment.userApi + '/profile');
  }
}
