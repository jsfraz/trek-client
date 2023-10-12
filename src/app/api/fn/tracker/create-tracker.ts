/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsTrackerToken } from '../../models/models-tracker-token';

export interface CreateTracker$Params {
  name: string;
}

export function createTracker(http: HttpClient, rootUrl: string, params: CreateTracker$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsTrackerToken>> {
  const rb = new RequestBuilder(rootUrl, createTracker.PATH, 'post');
  if (params) {
    rb.query('name', params.name, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ModelsTrackerToken>;
    })
  );
}

createTracker.PATH = '/api/tracker';
