import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from './shared/auth.guard';
import { UserComponent } from './user/user.component';
import { TrackerComponent } from './tracker/tracker.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: '', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'trackers', component: TrackerComponent, canActivate: [AuthGuard] },
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
