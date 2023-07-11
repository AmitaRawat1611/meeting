import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    public dRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) private username: any,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  deleteUser() {
    this.authService.deleteUser(this.username).subscribe(
      (res: any) => {
        console.log(res, 'DELETE');
        console.log('Deleted');

        if (res.statusDesc === 'Your request processed successfully') {
          this.dRef.close(true);
          this.snackBar.open('User DELETED!', 'Close', {
            duration: 3500,
          });
        }
      },
      (err) => {
        alert('Not deleted');

        this.snackBar.open('User not deleted', 'Close', {
          duration: 3500,
        });
      }
    );
  }

  no() {
    this.dRef.close(false);
  }
}
