import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  // @ViewChild('myForm') form!: NgForm;
  form!: FormGroup;
  ngOnInit() {
    console.log(environment.userApi + '/profile');
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    localStorage.clear();
  }
  constructor(private authService: AuthService, private router: Router) {}

  status: boolean = true;
  error: boolean = false;
  errorLogin: boolean = false;
  token: any;
  onSubmit() {
    console.log(this.form.value);
    this.authService.getLoginStatus(this.form.value).subscribe(
      (result: any) => {
        console.log(result['role']);
        console.log(result['token'], 'RESULT');
        localStorage.setItem('role', result['role']);
        localStorage.setItem('token', result['token']);
        if (
          localStorage.getItem('token') !== 'undefined' ||
          localStorage.getItem('token') !== ' '
        ) {
          this.errorLogin = true;
        }
        if (localStorage.getItem('token')) {
          this.router.navigate(['/main']);
        }
      },
      (err) => {
        this.error = true;
      }
    );
  }
}
