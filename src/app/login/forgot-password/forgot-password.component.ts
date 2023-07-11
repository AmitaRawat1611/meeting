import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  showDiv: boolean = false;
  showBtn: boolean = true;
  showBtn3: boolean = false;
  showUpdateField: boolean = false;
  showForgotField: boolean = true;
  showfield: boolean = true;
  form!: FormGroup;
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    console.log(environment.userApi + '/profile');
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator,
      ]),
    });
  }
  errMsg!: string;

  onSubmitUsername() {
    console.log(this.form.value);
    let username: any = { username: this.form.value.username };
    console.log(username, 'USERNAME');

    //send username
    this.http
      .post(
        environment.apiUrl + '/meets/forgot-password',
        JSON.stringify(username)
      )
      .subscribe(
        (res: any) => {
          console.log(res, 'FORGOT PASSWORD');
          if (res.statusDesc === 'Your request processed successfully') {
            this.showDiv = true;
            this.showBtn = false;
          } else {
            this.errMsg = res.statusDesc;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  errorMsg!: string;
  onSubmitOtp() {
    console.log(this.form.value);
    let value: any = {
      username: this.form.value.username,
      otp: Number(this.form.value.otp),
    };
    console.log(value, 'OTP');

    this.http
      .post(environment.apiUrl + '/meets/otp-login', JSON.stringify(value))
      .subscribe((res: any) => {
        console.log(res, 'OTP RESP');
        if (res.statusDesc === 'Bad Credentials.') {
          this.errorMsg = res.statusDesc;
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.showBtn3 = true;
          this.showUpdateField = true;
          this.showForgotField = false;
          this.showBtn = false;
          this.showfield = false;
        }
      });
  }
  token: any;
  onSubmitPassword() {
    console.log(this.form.value);

    let value: any = {
      password: this.form.value.password,
    };
    this.http
      .post(environment.userApi + '/password-change', JSON.stringify(value))
      .subscribe((res: any) => {
        console.log('PASSWORD', res);
        if (res.statusDesc === 'Your request processed successfully') {
          this.router.navigate(['']);
        }
      });
  }
}
