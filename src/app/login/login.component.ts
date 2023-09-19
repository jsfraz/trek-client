import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Utils } from 'src/main';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public matDialog: MatDialog
  ) {
    // form
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {
    // check token
    if (!Utils.isTokenExpired()) {
      this.router.navigate([''])
    }
  }

  // login
  loginUser() {
    this.authService.signIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
  }
}
