import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor(public authService: AuthService) {
    this.socket = io(environment.baseApiUrl + '?apiKey=' + this.authService.getToken(), { autoConnect: false });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  connected(): boolean {
    return this.socket.connected;
  }
}
