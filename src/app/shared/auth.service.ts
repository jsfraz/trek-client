import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AuthenticationService, UserService } from '../api/services';
import { ModelsUser } from '../api/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { initFlowbite } from 'flowbite';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  currentUser: ModelsUser | null = null;

  constructor(public router: Router, private userService: UserService, private authenticationService: AuthenticationService, public matDialog: MatDialog, private jwtHelper: JwtHelperService) { }

  signIn(username: string, password: string) {
    this.authenticationService.login({ username: username, password: password }).subscribe({
      next: (v) => {
        // success
        localStorage.setItem('access_token', v.accessToken);
        this.userService.whoAmI().subscribe(
          {
            next: (v) => {
              // success
              this.currentUser = v;
              this.router.navigate(['']);
            },
            error: (e) => {
              // error
              console.error(e);
            },
            complete: () => {
              // complete
              // init flowbite
              initFlowbite();
            }
          }
        );
      },
      error: (e) => {
        // error
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.width = '500px';
        dialogConfig.data = e;
        this.matDialog.open(AlertComponent, dialogConfig);
      },
      complete: () => {
        // complete
      }
    });
  }

  logout(): void {
    this.currentUser = null;
    this.deleteToken();
    this.router.navigate(['login']);
}

getToken(): string |null {
    return localStorage.getItem('access_token');
}

setToken(token: string): void {
    localStorage.setItem('access_token', token);
}

deleteToken(): void {
    localStorage.removeItem('access_token');
}

isTokenValid(): boolean {
    let token = this.getToken();
    // Check if token is empty
    if (token == null) {
        return false;
    }
    // Check by decoding
    try {
        this.jwtHelper.decodeToken(token!);
    } catch (e: any) {
        console.error(e);
        return false;
    }
    // Check if token is valid
    return !this.jwtHelper.isTokenExpired(token);
}
}