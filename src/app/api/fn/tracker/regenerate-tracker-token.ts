/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsTrackerToken } from '../../models/models-tracker-token';

export interface RegenerateTrackerToken$Params {
  id: number;
}

export function regenerateTrackerToken(http: HttpClient, rootUrl: string, params: RegenerateTrackerToken$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsTrackerToken>> {
  const rb = new RequestBuilder(rootUrl, regenerateTrackerToken.PATH, 'patch');
  if (params) {
    rb.query('id', params.id, {});
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

regenerateTrackerToken.PATH = '/api/tracker/token';
