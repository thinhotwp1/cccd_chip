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
  dataCardBeforeClear: any;

  constructor(private webSocketService: WebSocketService) {
    // Kết nối đến WebSocket ip tùy chỉnh, mặc định sẽ là localhost
    this.message = 'Waiting ...';

    // Phần sử dụng sdk
    this.webSocketService.connect("10.2.148.149"); // ví dụ: this.webSocketService.connect("10.2.148.117");
    this.getMessage();
  }

  getMessage(){
    // Khi có dữ liệu mới sẽ tự cập nhật this.data và view lên màn hình
    this.webSocketService.onDataReceived().subscribe((data) => {
      console.log('Có dữ liệu mới:', data);
      // Thực hiện xử lý dữ liệu ở đây
      this.message = data
    });
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
    const alertClearData = 'Xóa data thành công, vui lòng đọc lại căn cước công dân gắn chip !';
    if(this.message != alertClearData){
      this.dataCardBeforeClear = this.message
    }
    this.message = alertClearData
    this.webSocketService.clearData()
  }

  getOldCard(){
    const el = document.createElement('textarea');
    el.value = this.dataCardBeforeClear;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
