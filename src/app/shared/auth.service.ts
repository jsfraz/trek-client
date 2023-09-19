import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AuthenticationService, UserService } from '../api/services';
import { ModelsUser } from '../api/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { initFlowbite } from 'flowbite';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  currentUser: ModelsUser = { id: 0, username: '', superuser: false };

  constructor(public router: Router, private userService: UserService, private authenticationService: AuthenticationService, public matDialog: MatDialog) { }

  // login (handlení errorů: https://rxjs.dev/deprecations/subscribe-arguments)
  signIn(username: string, password: string) {
    this.authenticationService.login({ username: username, password: password }).subscribe({
      next: (v) => {
        // kód pro úspěch
        localStorage.setItem('access_token', v.accessToken);
        this.userService.whoAmI().subscribe(
          {
            next: (v) => {
              // kód pro úspěch
              this.currentUser = v;
              this.router.navigate(['']);
            },
            error: (e) => {
              // kód pro error
              console.error(e);
            },
            complete: () => {
              // kód pro dokončení
              // init flowbite
              initFlowbite();
            }
          }
        );
      },
      error: (e) => {
        // kód pro error
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.width = '500px';
        dialogConfig.data = e;
        this.matDialog.open(AlertComponent, dialogConfig);
      },
      complete: () => {
        // kód pro dokončení
      }
    });
  }

  // vrátí token
  getToken() {
    return localStorage.getItem('access_token');
  }

  // je přihlášen?
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  // odhlášení
  doLogout() {
    localStorage.clear();
    this.currentUser = { id: 0, username: '', superuser: false };
    this.router.navigate(['login']);
  }
}