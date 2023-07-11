import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  // role!:any;
  role = localStorage.getItem('role');
  admin!: boolean;
  user!: boolean;
  ngOnInit() {
    console.log(this.role);
    if (this.role === 'ROLE_ADMIN') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
}
