import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { TrackerService } from '../api/services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { ModelsTracker } from '../api/models';
// https://github.com/themesberg/flowbite/issues/120#issuecomment-2187010089
import DateRangePicker from 'flowbite-datepicker/DateRangePicker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  trackers: ModelsTracker[] = [];
  selectedTracker: ModelsTracker | null = null;

  constructor(private trackerService: TrackerService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    // Brightness mode
    this.getMapBrightnessMode();
    // Get trackers
    this.trackerService.getAllTrackers().subscribe({
      next: (v) => {
        // success
        this.trackers = v;
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

  ngAfterViewInit(): void {
    const dateRangePickerEl = document.getElementById('date-rangepicker');
    new DateRangePicker(dateRangePickerEl, {
        // options
    });
}

  // Map options
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '' })
    ],
    zoom: 5,
    center: latLng(53.5775, 23.106111)
  };
  // dark/light mode
  isDarkMode: boolean = false;

  getMapBrightnessMode(): void {
    var mode: string = localStorage.getItem('brightness_mode_map') ?? 'dark';
    if (mode == 'dark') {
      // set dark mode
      this.isDarkMode = true;
      localStorage.setItem('brightness_mode_map', mode);
    } else {
      // set light mode
      this.isDarkMode = false;
      localStorage.setItem('brightness_mode_map', mode);
    }
  }

  toggleDarkMap(): void {
    if (this.isDarkMode) {
      // set light light
      localStorage.setItem('brightness_mode_map', 'light');
    } else {
      // set dark mode
      localStorage.setItem('brightness_mode_map', 'dark');
    }
    this.isDarkMode = !this.isDarkMode;
  }

  selectedTrackerChanged(): void {
    
  }
}
