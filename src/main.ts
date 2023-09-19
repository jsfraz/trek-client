import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/*
OpenAPI
ng-openapi-gen --input http://localhost:8080/api/openapi.json --output src/app/api
*/