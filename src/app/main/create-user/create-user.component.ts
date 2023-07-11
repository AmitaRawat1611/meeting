import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.value;
  const hasCharacter = /[a-zA-Z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  const valid = hasCharacter && hasUppercase && hasLowercase && hasSpecialChar;
  return valid ? null : { invalidPassword: true };
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form!: FormGroup;
  update: boolean = false;
  show: boolean = true;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator,
      ]),
    });

    if (this.data) {
      this.form.patchValue(this.data);
      this.update = true;
      this.show = false;
    }
  }

  get name() {
    return this.form.get('name');
  }
  get age() {
    return this.form.get('age');
  }
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dRef: MatDialogRef<CreateUserComponent>,
    private snackBar: MatSnackBar
  ) {}
  onSubmit() {
    console.log(this.form.value);

    if (this.update) {
      this.service.updateUser(this.form.value).subscribe((res: any) => {
        console.log(res, 'Update user');
        if (res.statusDesc === 'Your request processed successfully') {
          this.dRef.close(true);
          this.snackBar.open('User Updated!', 'Close', {
            duration: 3500,
          });
        }
      });
    } else {
      this.service.createUser(this.form.value).subscribe((res: any) => {
        console.log(res);
        if (res.statusDesc === 'Your request processed successfully') {
          this.dRef.close(true);
          this.snackBar.open('User Added!', 'Close', {
            duration: 3500,
          });
        }
      });
    }
  }

  close() {
    this.dRef.close(false);
  }
}
