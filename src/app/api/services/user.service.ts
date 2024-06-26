/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createUser } from '../fn/user/create-user';
import { CreateUser$Params } from '../fn/user/create-user';
import { deleteUser } from '../fn/user/delete-user';
import { DeleteUser$Params } from '../fn/user/delete-user';
import { getAllUsers } from '../fn/user/get-all-users';
import { GetAllUsers$Params } from '../fn/user/get-all-users';
import { ModelsUser } from '../models/models-user';
import { updateUser } from '../fn/user/update-user';
import { UpdateUser$Params } from '../fn/user/update-user';
import { whoAmI } from '../fn/user/who-am-i';
import { WhoAmI$Params } from '../fn/user/who-am-i';


/**
 * Users
 */
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createUser()` */
  static readonly CreateUserPath = '/api/user';

  /**
   * Create user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  createUser$Response(params: CreateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return createUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Create user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createUser(params: CreateUser$Params, context?: HttpContext): Observable<void> {
    return this.createUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/api/user';

  /**
   * Delete user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<void> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/api/user';

  /**
   * Update user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<void> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/api/user/all';

  /**
   * Get all users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ModelsUser>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all users.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<ModelsUser>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ModelsUser>>): Array<ModelsUser> => r.body)
    );
  }

  /** Path part for operation `whoAmI()` */
  static readonly WhoAmIPath = '/api/user/whoami';

  /**
   * Get current user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `whoAmI()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI$Response(params?: WhoAmI$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsUser>> {
    return whoAmI(this.http, this.rootUrl, params, context);
  }

  /**
   * Get current user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `whoAmI$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI(params?: WhoAmI$Params, context?: HttpContext): Observable<ModelsUser> {
    return this.whoAmI$Response(params, context).pipe(
      map((r: StrictHttpResponse<ModelsUser>): ModelsUser => r.body)
    );
  }

}
