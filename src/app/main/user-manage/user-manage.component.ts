import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';

export interface UserData {
  name: string;
  age: number;
  gender: string;
  email: string;
}

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  users: any;
  dataSource: any;
  ngOnInit(): void {
    this.displayUser();

    console.log(this.users, 'DETAILS');
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'gender',
    'email',
    'action',
  ];

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  openDialog() {
    const createDialog = this.dialog.open(CreateUserComponent, {
      width: '50%',
    });
    createDialog.afterClosed().subscribe((res) => {
      res ? this.displayUser() : '';
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateUser(data: any) {
    console.log(data);
    const updateDialog = this.dialog.open(CreateUserComponent, {
      data,
      width: '50%',
    });
    updateDialog.afterClosed().subscribe((res) => {
      res ? this.displayUser() : '';
    });
  }
  deleteForm(data: any) {
    console.log(data);
    let username: any = { username: data };
    this.authService.deleteUser(username).subscribe(
      (res) => {
        console.log(res, 'DELETE');
        console.log('Deleted');
        this.displayUser();
      },
      (err) => {
        alert('Not deleted');
      }
    );
  }

  displayUser() {
    this.authService.getAllUsers().subscribe(
      (result: any) => {
        console.log('Result:::', result.membersList);

        this.users = result.membersList;
        this.dataSource = new MatTableDataSource<UserData>(this.users);
        this.dataSource.paginator = this.paginator;

        console.log(this.users);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //delete dialog
  openDeleteDialog(username: any) {
    let data: any = { username: username };
    console.log(data);
    const delDialog = this.dialog.open(DeleteUserComponent, {
      height: '25%',
      data,
    });

    delDialog.afterClosed().subscribe((res) => {
      res ? this.displayUser() : '';
    });
   
  }
}
