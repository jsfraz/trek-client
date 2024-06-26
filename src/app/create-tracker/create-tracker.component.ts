import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { TrackerService } from '../api/services';
import { TokenComponent } from '../token/token.component';

@Component({
  selector: 'app-create-tracker',
  templateUrl: './create-tracker.component.html',
  styleUrls: ['./create-tracker.component.css']
})
export class CreateTrackerComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, public trackerService: TrackerService, public dialogRef: MatDialogRef<CreateTrackerComponent>, public matDialog: MatDialog) {
    this.createForm = this.fb.group({
      name: [''],
    });
  }

  // create tracker
  createTracker() {
    var name: string = this.createForm.value['name'];

    this.trackerService.createTracker({ name: name }).subscribe({
      next: (v) => {
        // success
        this.dialogRef.close(true);
        
        // show tracker token
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.width = '500px';
        dialogConfig.data = v.token;
        this.matDialog.open(TokenComponent, dialogConfig);
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
