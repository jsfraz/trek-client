import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isTokenValid() !== true) {
      window.alert('User is not logged in.');
      this.router.navigate(['login'])
    }
    return true;
  }
}