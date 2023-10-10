import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../api/services';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, public userService: UserService, public dialogRef: MatDialogRef<CreateUserComponent>, public matDialog: MatDialog) {
    this.createForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  // create user
  createUser() {
    var username: string = this.createForm.value['username'];
    var password: string = this.createForm.value['password'];

    this.userService.createUser({ username: username, password: password }).subscribe({
      next: (v) => {
        // success
        this.dialogRef.close(true);
      },
      error: (e) => {
        // error
        this.dialogRef.close(false);
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
}
