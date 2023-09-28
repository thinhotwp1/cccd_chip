import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'cccd_sdk';
  messages: string[] = []; // Mảng để lưu trữ các tin nhắn từ WebSocket


  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.socket$.subscribe((data: any) => {
      // Xử lý tin nhắn từ WebSocket và thêm vào mảng messages
      this.messages.push(data.message);
    });
  }

  sendMessage() {
    // Gửi một message đến WebSocket server
    this.webSocketService.send({ message: 'Hello, WebSocket!' });
  }

  reconnect() {
    // Reconnect to websocket
    this.webSocketService.connect();
  }


  ngOnDestroy() {
    // Đảm bảo rằng kết nối WebSocket được đóng khi component bị hủy
    this.webSocketService.disconnect();
  }
}
