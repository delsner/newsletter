import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  error: string = null;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService) {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((result) => {
      if (result) {
        this.dialogRef.close(true);
      } else {
        this.error = 'Error!';
      }
    });
  }

  signup() {
    this.authService.signup(this.username, this.password).subscribe((result) => {
      if (result) {
        this.dialogRef.close(true);
      } else {
        this.error = 'Error!';
      }
    });
  }


}
