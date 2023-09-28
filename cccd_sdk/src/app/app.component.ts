import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'cccd_sdk';
 
  message: any; // Tin nhắn đã xử lý từ WebSocketService

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.connect(); // Kết nối đến WebSocket
    this.getMessage();
  }

  getMessage(){
    this.message = this.webSocketService.getMessage();
    console.log('message: ',this.message)
    if (typeof this.message == 'undefined' && !this.message) {
      // gọi lấy lại message sau mỗi 3s nếu không nhận được tin nhắn
      console.log('Get message after 3s')
      setTimeout(() => this.getMessage(), 3000);
    }
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
