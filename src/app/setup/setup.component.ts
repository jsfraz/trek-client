import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {

  // TODO change when newer version is released
  debUrl = 'https://github.com/jsfraz/trek-tracker/releases/download/1.0.0/trek-tracker-1.0.0.deb';

  constructor(public router: Router) {}

  // Return deb file name
  getFileName(): string {
    const parts = this.debUrl.split('/');
    return parts[parts.length - 1];
  }
}