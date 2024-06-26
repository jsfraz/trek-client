import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {

  // TODO change when newer version is released
  debUrl = 'https://github.com/jsfraz/trek-tracker/releases/download/1.0.0/trek-tracker-1.0.0.deb';

  // Return deb file name
  getFileName(): string {
    const parts = this.debUrl.split('/');
    return parts[parts.length - 1];
  }
}