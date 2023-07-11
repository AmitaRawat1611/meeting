import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.scss'],
})
export class UpdateUserDetailsComponent {
  form!: FormGroup;
  // update: boolean = false;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });

    if (this.data) {
      this.form.patchValue(this.data);
      // this.update = true;
    }
  }

  constructor(
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  onSubmit() {
    console.log(this.form.value);
    this.http
      .post(
        'http://192.168.0.65:9090/meets/api-v1/user/profile-update',
        JSON.stringify(this.form.value)
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res.statusDesc === 'Your request processed successfully') {
          this.snackBar.open('Profile Updated!', 'Close', {
            duration: 3500,
          });
        }
      });
    // if (this.update) {
    //   this.service.updateUser(this.form.value);
    // } else {
    //   this.service.createUser(this.form.value);
    // }
  }
}
