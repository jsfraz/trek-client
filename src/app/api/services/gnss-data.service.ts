/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllGnssRecords } from '../fn/gnss-data/get-all-gnss-records';
import { GetAllGnssRecords$Params } from '../fn/gnss-data/get-all-gnss-records';
import { getGnssRecordsByTimestamps } from '../fn/gnss-data/get-gnss-records-by-timestamps';
import { GetGnssRecordsByTimestamps$Params } from '../fn/gnss-data/get-gnss-records-by-timestamps';
import { ModelsGnssDataSummary } from '../models/models-gnss-data-summary';


/**
 * GNSS data
 */
@Injectable({ providedIn: 'root' })
export class GnssDataService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllGnssRecords()` */
  static readonly GetAllGnssRecordsPath = '/api/user/gnss/all';

  /**
   * Get all GNSS records for tracker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllGnssRecords()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGnssRecords$Response(params: GetAllGnssRecords$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsGnssDataSummary>> {
    return getAllGnssRecords(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all GNSS records for tracker.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllGnssRecords$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGnssRecords(params: GetAllGnssRecords$Params, context?: HttpContext): Observable<ModelsGnssDataSummary> {
    return this.getAllGnssRecords$Response(params, context).pipe(
      map((r: StrictHttpResponse<ModelsGnssDataSummary>): ModelsGnssDataSummary => r.body)
    );
  }

  /** Path part for operation `getGnssRecordsByTimestamps()` */
  static readonly GetGnssRecordsByTimestampsPath = '/api/user/gnss/all/fromTo';

  /**
   * Get GNSS records between two dates for tracker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGnssRecordsByTimestamps()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGnssRecordsByTimestamps$Response(params: GetGnssRecordsByTimestamps$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsGnssDataSummary>> {
    return getGnssRecordsByTimestamps(this.http, this.rootUrl, params, context);
  }

  /**
   * Get GNSS records between two dates for tracker.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGnssRecordsByTimestamps$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGnssRecordsByTimestamps(params: GetGnssRecordsByTimestamps$Params, context?: HttpContext): Observable<ModelsGnssDataSummary> {
    return this.getGnssRecordsByTimestamps$Response(params, context).pipe(
      map((r: StrictHttpResponse<ModelsGnssDataSummary>): ModelsGnssDataSummary => r.body)
    );
  }

}
