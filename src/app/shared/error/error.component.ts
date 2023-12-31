import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor(private authService: AuthService) {}
  errorStatus: any;
  ngOnInit() {
    this.errorStatus = this.authService.getErrorStatus();
  }
}
