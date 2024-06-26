import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  debUrl = '';

  ngOnInit(): void {
    // Set baseUrl
    this.debUrl = environment.baseApiUrl + '/download/trek-tracker-latest.deb'
  }
}