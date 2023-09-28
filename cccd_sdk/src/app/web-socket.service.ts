// websocket.service.ts
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private jsonRaw:any;
  public socket$!: WebSocketSubject<any>;

  constructor() {
    this.connect();
  }

  getMessage(): string {
    // Trả về tin nhắn đã xử lý
    return this.jsonRaw;
  }

  
  clearData() {
     this.jsonRaw = 'Xóa data thành công, vui lòng đọc lại căn cước công dân gắn chip !';
  }

  public connect() {
    console.log("Connect socket every 3s ...")
    const wsUrl = 'ws://127.0.0.1:8765/plugin/sign';
    this.socket$ = webSocket(wsUrl);

    this.socket$.subscribe(
      (data) => {
        // Xử lý dữ liệu khi nhận được từ WebSocket
        // Xử lý chuỗi và thay thế dấu " bằng \"
        this.jsonRaw = data.replace(/"/g, '\\"');
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
