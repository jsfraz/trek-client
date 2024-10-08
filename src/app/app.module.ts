import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TrackerComponent } from './tracker/tracker.component';
import { CreateTrackerComponent } from './create-tracker/create-tracker.component';
import { TokenComponent } from './token/token.component';
import { EditTrackerComponent } from './edit-tracker/edit-tracker.component';
import { SetupComponent } from './setup/setup.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiModule } from './api/api.module';
import { environment } from 'src/environments/environment';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        MapComponent,
        UserComponent,
        CreateUserComponent,
        EditUserComponent,
        TrackerComponent,
        CreateTrackerComponent,
        TokenComponent,
        EditTrackerComponent,
        SetupComponent,
    ],
    imports: [
        ApiModule.forRoot({ rootUrl: environment.baseApiUrl }), // Set baseApiUrl
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTooltipModule,
        LeafletModule,
        FormsModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }, provideHttpClient(withInterceptorsFromDi()), { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,],
    bootstrap: [AppComponent],
})

export class AppModule { }
