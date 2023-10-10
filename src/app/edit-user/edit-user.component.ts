import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { ModelsUser } from '../api/models';
import { UserService } from '../api/services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  updateForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModelsUser, public dialogRef: MatDialogRef<EditUserComponent>, private fb: FormBuilder, public userService: UserService, public matDialog: MatDialog) {
    this.updateForm = this.fb.group({
      username: [this.data.username],
      password: ['']
    });
  }

  // updaets user
  updateUser() {
    var username: string = this.updateForm.value['username'];
    var password: string = this.updateForm.value['password'];

    this.userService.updateUser({ id: this.data.id, username: username, password: password }).subscribe({
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
