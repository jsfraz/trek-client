import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

// Enable production
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/*
sudo npm install -g ng-openapi-gen
ng-openapi-gen --input http://localhost:8080/api/openapi.json --output src/app/api
*/

export class Utils {
  static isTokenExpired(): boolean {
      let token = localStorage.getItem('access_token') ?? '';
      var expired: boolean = true;
      if (token != '') {
          expired = new JwtHelperService().isTokenExpired(token);
      }
      return expired;
  }
}