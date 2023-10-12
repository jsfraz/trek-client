import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { TrackerService } from '../api/services';

@Component({
  selector: 'app-edit-tracker',
  templateUrl: './edit-tracker.component.html',
  styleUrls: ['./edit-tracker.component.css']
})
export class EditTrackerComponent {
  updateForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private fb: FormBuilder, public trackerService: TrackerService, public dialogRef: MatDialogRef<EditTrackerComponent>, public matDialog: MatDialog) {
    this.updateForm = this.fb.group({
      name: [''],
    });
  }

  // update tracker
  updateTracker() {
    var name: string = this.updateForm.value['name'];

    this.trackerService.updateTrackerName({id: this.data, name: name}).subscribe({
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
