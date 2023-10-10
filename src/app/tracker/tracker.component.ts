import { Component, OnInit } from '@angular/core';
import { ModelsTracker } from '../api/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { TrackerService } from '../api/services';
import { CreateTrackerComponent } from '../create-tracker/create-tracker.component';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  trackers: ModelsTracker[] = [];

  constructor(private trackerService: TrackerService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllTrackers();
  }

  // get all trackers
  getAllTrackers(): void {
    this.trackerService.getAllTrackers().subscribe({
      next: (v) => {
        // success
        this.trackers = v.sort((a, b) => a.name.localeCompare(b.name));
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

  // delete tracker
  deleteTracker(id: number): void {
    this.trackerService.deleteTracker({ id: id }).subscribe({
      next: (v) => {
        // success
        this.getAllTrackers();
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

  // opens dialog for new tracker
  openNewTrackerDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '500px';

    this.matDialog.open(CreateTrackerComponent, dialogConfig).afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.getAllTrackers();
        }
      }
    });
  }

  // opens dialog for regenerating key
  openRegenerateKeyDialog(id: number): void {
    // TODO regenerate key
  }

  // opens dialog for editing name
  openEditNameDialog(tracker: ModelsTracker): void {
    // TODO edit name
  }
}
