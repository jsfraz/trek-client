import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, LatLngExpression, tileLayer } from 'leaflet';
import { GnssDataService, TrackerService } from '../api/services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { ModelsGnssData, ModelsGnssDataSummary, ModelsTracker } from '../api/models';
// https://github.com/themesberg/flowbite/issues/120#issuecomment-2187010089
import flatpickr from 'flatpickr';
import * as Leaflet from 'leaflet';
import { formatNumber } from '@angular/common';

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
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 2, maxZoom: 20, attribution: '' })
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
  // Data
  gnssSummary: ModelsGnssDataSummary | null = null;
  // Map polylines
  polylines: Leaflet.Polyline[] = [];
  // Points
  markers: Leaflet.CircleMarker[] = [];
  points: boolean = false;

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
      enableSeconds: true,
      dateFormat: "m.d. Y H:i:s",
      onChange: (selectedDates) => {
        // console.log("Start Date:", selectedDates);
        this.from = selectedDates[0];
      }
    });

    flatpickr("#end-datetime", {
      enableTime: true,
      enableSeconds: true,
      dateFormat: "m.d. Y H:i:s",
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
    var mode: string = localStorage.getItem('brightness_mode_map') ?? 'light';
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
    this.loading = true;
    // Reset
    this.gnssSummary = null;
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
          this.gnssSummary = v;
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
          this.loading = false;
          this.show();
        }
      });
    } else {
      // Load data from to
      this.gnssDataService.getGnssRecordsByTimestamps({ id: this.selectedTracker!.id, offset: this.offset, fromUtc: this.from!.toUTCString(), toUtc: this.to!.toUTCString() }).subscribe({
        next: (v) => {
          // success
          this.gnssSummary = v;
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
          this.loading = false;
          this.show();
        }
      });
    }
  }

  show(): void {
    // Return if no data is retuned from server
    if (this.gnssSummary == null) {
      return;
    }
    // Create polylines from points that connect
    var latlngs: LatLngExpression[] = [];
    for (let i = 0; i < this.gnssSummary.data.length; i++) {
      // Add marker with description
      if (this.points) {
        this.addMarker(this.gnssSummary.data[i]);
      }
      // Push if the point is first in polyline
      if (latlngs.length == 0) {
        latlngs.push({ lat: this.gnssSummary.data[i].latitude, lng: this.gnssSummary.data[i].longitude });
      } else {
        // Check if connects
        if (this.connects(new Date(this.gnssSummary.data[i - 1].timestamp), new Date(this.gnssSummary.data[i].timestamp))) {
          latlngs.push({ lat: this.gnssSummary.data[i].latitude, lng: this.gnssSummary.data[i].longitude });
        } else {
          // Does not connect, end polyline
          this.polylines.push(Leaflet.polyline(latlngs, { color: 'red' }).addTo(this.map));
          latlngs = [];
        }
      }
      // End of the loop
      if (i == this.gnssSummary.data.length - 1) {
        this.polylines.push(Leaflet.polyline(latlngs, { color: 'red' }).addTo(this.map));
      }
    }
    // Show polylines on map
    this.polylines.forEach(x => {
      x.addTo(this.map);
    });
    // Show markers on map
    this.markers.forEach(x => {
      x.addTo(this.map);
    });
  }

  connects(date1: Date, date2: Date): boolean {
    const difference = date2.getTime() - date1.getTime();
    return difference <= 1250 * this.offset;
  }

  roundNumber(num: number): string {
    let roundedString: string = num.toFixed(2);
    return roundedString.replace('.', ',');
  }

  clearButton(): void {
    // Delete polylines
    this.polylines.forEach(x => {
      x.remove();
    });
    this.polylines = [];
    // Delete markers
    this.markers.forEach(x => {
      x.remove();
    });
    this.markers = [];
  }

  canClear(): boolean {
    return this.polylines.length != 0 || this.polylines.length != 0;
  }

  onMarkerMouseOver(event: Leaflet.LeafletEvent, description: string) {
    Leaflet.tooltip()
      .setLatLng(event.target.getLatLng())
      .setContent(description)
      .openOn(this.map);
  }

  pointsCheckboxChanged(): void {
    this.points = !this.points;
    if (this.points) {
      // Add markers
      if (this.gnssSummary != null) {
        this.gnssSummary.data.forEach(x => {
          this.addMarker(x);
        });
        // Show markers on map
        this.markers.forEach(x => {
          x.addTo(this.map);
        });
      }
    } else {
      // Delete markers
      this.markers.forEach(x => {
        x.remove();
      });
    }
  }

  addMarker(data: ModelsGnssData): void {
    const marker = Leaflet.circleMarker({ lat: data.latitude, lng: data.longitude }, { color: 'blue', radius: 3, fill: true, fillColor: 'blue', fillOpacity: 1 })
      .on('click', (event) => this.onMarkerMouseOver(event, 'Speed: <strong>' + this.roundNumber(data.speed) + ' km/h</strong><br>' + this.formatDate(new Date(data.timestamp))));
    this.markers.push(marker);
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${month}.${day}. ${year} ${hours}:${minutes}:${seconds}`;
  }
}
