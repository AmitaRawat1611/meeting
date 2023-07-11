import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  constructor(private http: HttpClient) {}
  // data: any[] = [
  //   {
  //     title: 'Douglas  Pace',
  //     summary: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  //   },
  //   {
  //     title: 'Mcleod  Mueller',
  //     summary: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  //   },
  //   {
  //     title: 'Day  Meyers',
  //     summary: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  //   },
  //   {
  //     title: 'Aguirre  Ellis',
  //     summary: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  //   },
  //   {
  //     title: 'Cook  Tyson',
  //     summary: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  //   },
  // ];
  noData: boolean = false;
  notifications: any;
  notificationsCount: any;
  ngOnInit() {
    this.http.get(environment.userApi + '/profile').subscribe((res: any) => {
      console.log(res);
      // this.notificationCount = res.notifications.length;
      this.notifications = res.notifications;
      this.notificationsCount = res.notifications.length;
      if (
        this.notifications === undefined ||
        this.notifications.length === 0 ||
        this.notifications.length < 0
      ) {
        this.noData = true;
      }
    });
  }
}
