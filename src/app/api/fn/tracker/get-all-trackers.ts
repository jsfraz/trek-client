/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsTracker } from '../../models/models-tracker';

export interface GetAllTrackers$Params {
}

export function getAllTrackers(http: HttpClient, rootUrl: string, params?: GetAllTrackers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ModelsTracker>>> {
  const rb = new RequestBuilder(rootUrl, getAllTrackers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ModelsTracker>>;
    })
  );
}

getAllTrackers.PATH = '/api/tracker/all';
