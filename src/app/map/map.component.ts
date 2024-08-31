import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  ngOnInit(): void {
    // Brightness mode
    this.getMapBrightnessMode();
  }

  // Map options
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
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
}
