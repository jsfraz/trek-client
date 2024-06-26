/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsGnssDataSummary } from '../../models/models-gnss-data-summary';

export interface GetAllGnssRecords$Params {
  id: number;
  offset?: number;
}

export function getAllGnssRecords(http: HttpClient, rootUrl: string, params: GetAllGnssRecords$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsGnssDataSummary>> {
  const rb = new RequestBuilder(rootUrl, getAllGnssRecords.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
    rb.query('offset', params.offset, {});
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

getAllGnssRecords.PATH = '/api/user/gnss/all';
