import { Component, OnInit } from '@angular/core';
import { ModelsUser } from '../api/models';
import { UserService } from '../api/services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: ModelsUser[] = [];

  constructor(private userService: UserService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  // get all users
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (v) => {
        // success
        this.users = v.sort((a, b) => Number(b.superuser) - Number(a.superuser));
      },
      error: (e) => {
        // error
        console.error(e);
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

  // delete user
  deleteUser(id: number): void {
    this.userService.deleteUser({ id: id }).subscribe({
      next: (v) => {
        // success
        this.getAllUsers();
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

  // opens dialog for new user
  openNewUserDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '500px';

    this.matDialog.open(CreateUserComponent, dialogConfig).afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.getAllUsers();
        }
      }
    });
  }

  // opens dialog for editing user
  openEditUserDialog(user: ModelsUser): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '500px';
    dialogConfig.data = user;

    this.matDialog.open(EditUserComponent, dialogConfig).afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.getAllUsers();
        }
      }
    });
  }
}
