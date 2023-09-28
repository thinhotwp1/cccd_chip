// websocket.service.ts
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket$!: WebSocketSubject<any>;

  constructor() {
    this.connect();
  }

  public connect() {
    console.log("Connect socket ...")
    const wsUrl = 'ws://127.0.0.1:8765/plugin/sign';
    this.socket$ = webSocket(wsUrl);

    this.socket$.subscribe(
      (data) => {
        // Xử lý dữ liệu khi nhận được từ WebSocket
        console.log('Dữ liệu từ WebSocket:', data);
      },
      (error) => {
        // Xử lý lỗi khi kết nối bị ngắt
        console.error('Lỗi kết nối WebSocket:', error);

        // Kết nối lại sau một khoảng thời gian
        setTimeout(() => this.connect(), 3000);
      }
    );
  }

  send(data: any) {
    // Gửi dữ liệu đến WebSocket
    this.socket$.next(data);
  }

  disconnect() {
    // Đóng kết nối WebSocket
    this.socket$.complete();
  }
}
