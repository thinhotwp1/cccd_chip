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
      // gọi lấy lại message sau mỗi 3s
      console.log('Get message after 3s')
      console.log('message: ',this.message)
      setTimeout(() => this.getMessage(), 3000);
    
  }

  sendMessage() {
    // Gửi một message đến WebSocket server
    this.webSocketService.send({ message: 'Hello, WebSocket!' });
  }

  disconnect() {
    // Reconnect to websocket
    this.webSocketService.disconnect();
  }


  ngOnDestroy() {
    // Đảm bảo rằng kết nối WebSocket được đóng khi component bị hủy
    this.webSocketService.disconnect();
  }

  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.message;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  clearData(){
    this.message='null'
  }
}
