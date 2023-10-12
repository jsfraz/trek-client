/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsGnssDataSummary } from '../../models/models-gnss-data-summary';

export interface GetGnssRecordsByTimestamps$Params {
  from: string;
  id: number;
  offset?: number;
  to: string;
}

export function getGnssRecordsByTimestamps(http: HttpClient, rootUrl: string, params: GetGnssRecordsByTimestamps$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsGnssDataSummary>> {
  const rb = new RequestBuilder(rootUrl, getGnssRecordsByTimestamps.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {});
    rb.query('id', params.id, {});
    rb.query('offset', params.offset, {});
    rb.query('to', params.to, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ModelsGnssDataSummary>;
    })
  );
}

getGnssRecordsByTimestamps.PATH = '/api/user/gnss/all/fromTo';
