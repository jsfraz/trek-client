import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, LatLngExpression, tileLayer } from 'leaflet';
import { GnssDataService, TrackerService } from '../api/services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { ModelsGnssDataSummary, ModelsTracker } from '../api/models';
// https://github.com/themesberg/flowbite/issues/120#issuecomment-2187010089
import flatpickr from 'flatpickr';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  // Map
  map!: Leaflet.Map;
  // Map options
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '' })
    ],
    zoom: 5,
    center: latLng(53.5775, 23.106111)
  };
  // Dark/light mode
  isDarkMode: boolean = false;
  // Tracker list
  trackers: ModelsTracker[] = [];
  // Currently selected tracker
  selectedTracker: ModelsTracker | null = null;
  // Return all tracker data
  allData: boolean = false;
  // Show tracker in real time
  live: boolean = false;
  // From
  from: Date | null = null;
  // To
  to: Date | null = null;
  // Offset
  offset: number = 1;
  // Loading
  loading: boolean = false;
  // Map polylines
  polylines: Leaflet.Polyline[] = [];

  constructor(private trackerService: TrackerService, private gnssDataService: GnssDataService, private matDialog: MatDialog) { }

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
    flatpickr("#start-datetime", {
      enableTime: true,
      dateFormat: "m.d. Y H:i",
      onChange: (selectedDates) => {
        // console.log("Start Date:", selectedDates);
        this.from = selectedDates[0];
      }
    });

    flatpickr("#end-datetime", {
      enableTime: true,
      dateFormat: "m.d. Y H:i",
      onChange: (selectedDates) => {
        // console.log("End Date:", selectedDates);
        this.to = selectedDates[0];
      }
    });
  }

  onMapReady(map: Leaflet.Map) {
    this.map = map;
  }

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

  allDataCheckboxChanged(): void {
    this.allData = !this.allData;
  }

  liveCheckboxChanged(): void {
    this.live = !this.live;
  }

  isFromToValid(): boolean {
    if (this.from == null || this.to == null) {
      return false;
    }
    return this.from < this.to;
  }

  showButton(): void {
    // Delete polylines
    this.polylines.forEach(x => {
      x.remove();
    });
    this.polylines = [];
    // Load all data
    if (this.allData) {
      this.gnssDataService.getAllGnssRecords({ id: this.selectedTracker!.id, offset: this.offset }).subscribe({
        next: (v) => {
          // success
          this.show(v); 
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
    } else {
      // Load data from to
      this.gnssDataService.getGnssRecordsByTimestamps({ id: this.selectedTracker!.id, offset: this.offset, fromUtc: this.from!.toUTCString(), toUtc: this.to!.toUTCString() }).subscribe({
        next: (v) => {
          // success
          this.show(v);
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
  }

  show(gnssSummary: ModelsGnssDataSummary | null): void {
    // Return if no data is retuned from server
    if (gnssSummary == null) {
      return;
    }
    // Create polylines from points that connect
    var latlngs: LatLngExpression[] = [];
    for (let i = 0; i < gnssSummary.data.length; i++) {
      // Push if the point is first in polyline
      if (latlngs.length == 0) {
        latlngs.push({ lat: gnssSummary.data[i].latitude, lng: gnssSummary.data[i].longitude });
      } else {
        // Check if connects
        if (this.connects(new Date(gnssSummary.data[i - 1].timestamp), new Date(gnssSummary.data[i].timestamp))) {
          latlngs.push({ lat: gnssSummary.data[i].latitude, lng: gnssSummary.data[i].longitude });
        } else {
          // Does not connect, end polyline
          this.polylines.push(Leaflet.polyline(latlngs, { color: 'red' }).addTo(this.map));
          latlngs = [];
        }
      }
      // End of the loop
      if (i == gnssSummary.data.length - 1) {
        this.polylines.push(Leaflet.polyline(latlngs, { color: 'red' }).addTo(this.map));
      }
    }
    console.info(this.polylines);
    // Show on map
    this.polylines.forEach(x => {
      x.addTo(this.map);
    });
  }

  connects(date1: Date, date2: Date): boolean {
    const difference = date2.getTime() - date1.getTime();
    return difference <= 1250 * this.offset;
  }
}
