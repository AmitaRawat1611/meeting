import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { UpdateUserDetailsComponent } from './update-user-details/update-user-details.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  date = new Date();
  name!: string;
  gender!: string;
  role!: any;
  age!: number;
  email: any;
  notificationCount!: number;
  profileData: any;
  // router: any;
  values: any;
  ngOnInit() {
    this.http.get(environment.userApi + '/profile').subscribe((res: any) => {
      console.log(res);
      this.values = res;
      this.name = res.name;
      this.age = res.age;
      this.gender = res.gender;
      this.email = res.email;
      this.notificationCount = res.notifications.length;
      // this.profileData = res;

      // console.log(this.notificationCount);
      if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        this.role = 'Admin';
      } else {
        this.role = 'User';
      }
    });
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}
  logout() {
    this.http.post(environment.userApi + '/logout', {}).subscribe((res) => {
      // console.log(res, 'LOGOUT');
    });
    this.router.navigate(['']);
  }

  updateDetails(data: any) {
    this.dialog.open(UpdateUserDetailsComponent, { data });
  }
}
