import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selected!: Date | null;

  constructor(private service: AuthService, private http: HttpClient) {}
  totalUsers: any;

  activeUsers: any;
  inactiveUsers: any;
  dataSource: any;
  name: any;
  noData: boolean = false;
  futureMeetings: any;
  todaysMeetings: any;
  allMeetings: any;
  ngOnInit(): void {
    //get meetings

    //Get total users
    this.service.getAllUsers().subscribe((res: any) => {
      this.totalUsers = res.membersList.length;
      console.log(this.totalUsers);
    });

    //Get Active users
    this.service.getActiveUsers().subscribe((res: any) => {
      this.activeUsers = res.count;
      console.log(this.activeUsers);
    });

    //get all meetings info
    this.http
      .get(environment.userApi + '/all-meetings')
      .subscribe((res: any) => {
        this.allMeetings = res.allMeetings;
        this.todaysMeetings = res.todaysMeetings;
        this.futureMeetings = res.futureMeetings;
      });

    //get notifications
    this.http.get(environment.userApi + '/profile').subscribe((res: any) => {
      console.log(res.meetings, 'NOTIFI');
      this.name = res.name.split(' ')[0];
      this.dataSource = res.meetings;
      if (
        this.dataSource === null ||
        this.dataSource === undefined ||
        this.dataSource === ''
      ) {
        this.noData = true;
      }
    });
  }
  displayedColumns: string[] = [
    'id',
    'description',
    'hostName',
    'start',
    'end',
  ];
  // dataSource = ELEMENT_DATA;

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}
