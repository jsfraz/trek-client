/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createTracker } from '../fn/tracker/create-tracker';
import { CreateTracker$Params } from '../fn/tracker/create-tracker';
import { deleteTracker } from '../fn/tracker/delete-tracker';
import { DeleteTracker$Params } from '../fn/tracker/delete-tracker';
import { getAllTrackers } from '../fn/tracker/get-all-trackers';
import { GetAllTrackers$Params } from '../fn/tracker/get-all-trackers';
import { ModelsTracker } from '../models/models-tracker';
import { ModelsTrackerToken } from '../models/models-tracker-token';
import { regenerateTrackerToken } from '../fn/tracker/regenerate-tracker-token';
import { RegenerateTrackerToken$Params } from '../fn/tracker/regenerate-tracker-token';
import { updateTrackerName } from '../fn/tracker/update-tracker-name';
import { UpdateTrackerName$Params } from '../fn/tracker/update-tracker-name';


/**
 * Trackers
 */
@Injectable({ providedIn: 'root' })
export class TrackerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createTracker()` */
  static readonly CreateTrackerPath = '/api/tracker';

  /**
   * Create tracker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTracker()` instead.
   *
   * This method doesn't expect any request body.
   */
  createTracker$Response(params: CreateTracker$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsTrackerToken>> {
    return createTracker(this.http, this.rootUrl, params, context);
  }

  /**
   * Create tracker.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTracker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createTracker(params: CreateTracker$Params, context?: HttpContext): Observable<ModelsTrackerToken> {
    return this.createTracker$Response(params, context).pipe(
      map((r: StrictHttpResponse<ModelsTrackerToken>): ModelsTrackerToken => r.body)
    );
  }

  /** Path part for operation `deleteTracker()` */
  static readonly DeleteTrackerPath = '/api/tracker';

  /**
   * Delete tracker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTracker()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTracker$Response(params: DeleteTracker$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteTracker(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete tracker.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTracker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTracker(params: DeleteTracker$Params, context?: HttpContext): Observable<void> {
    return this.deleteTracker$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllTrackers()` */
  static readonly GetAllTrackersPath = '/api/tracker/all';

  /**
   * Get all trackers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTrackers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrackers$Response(params?: GetAllTrackers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ModelsTracker>>> {
    return getAllTrackers(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all trackers.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTrackers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrackers(params?: GetAllTrackers$Params, context?: HttpContext): Observable<Array<ModelsTracker>> {
    return this.getAllTrackers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ModelsTracker>>): Array<ModelsTracker> => r.body)
    );
  }

  /** Path part for operation `updateTrackerName()` */
  static readonly UpdateTrackerNamePath = '/api/tracker/name';

  /**
   * Update tracker name.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTrackerName()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateTrackerName$Response(params: UpdateTrackerName$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateTrackerName(this.http, this.rootUrl, params, context);
  }

  /**
   * Update tracker name.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTrackerName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateTrackerName(params: UpdateTrackerName$Params, context?: HttpContext): Observable<void> {
    return this.updateTrackerName$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `regenerateTrackerToken()` */
  static readonly RegenerateTrackerTokenPath = '/api/tracker/token';

  /**
   * Regenerate tracker token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regenerateTrackerToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  regenerateTrackerToken$Response(params: RegenerateTrackerToken$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsTrackerToken>> {
    return regenerateTrackerToken(this.http, this.rootUrl, params, context);
  }

  /**
   * Regenerate tracker token.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regenerateTrackerToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  regenerateTrackerToken(params: RegenerateTrackerToken$Params, context?: HttpContext): Observable<ModelsTrackerToken> {
    return this.regenerateTrackerToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<ModelsTrackerToken>): ModelsTrackerToken => r.body)
    );
  }

}
