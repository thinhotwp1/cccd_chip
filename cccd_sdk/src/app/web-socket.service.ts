// websocket.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private jsonRaw:any = 'Waiting ...'  ;
  private dataSubject = new Subject<string>(); // Sử dụng Subject để thông báo khi có dữ liệu mới

  public socket$!: WebSocketSubject<any>;

  constructor() {
  }

  getMessage(): string {
    // Trả về tin nhắn đã xử lý
    return this.jsonRaw;
  }


  clearData() {
     this.jsonRaw = 'Xóa data thành công, vui lòng đọc lại căn cước công dân gắn chip !';
  }

  public connect(ip:any) {
    console.log("Connect socket every 3s ...")
    var wsUrl: string = '';

    if (ip == '') {
      wsUrl = 'ws://localhost:8765/plugin/sign';
    } else {
      wsUrl = `ws://${ip}:8765/plugin/sign`;
    }
    this.socket$ = webSocket(wsUrl);

    this.socket$.subscribe(
      (data) => {
        // Xử lý dữ liệu khi nhận được từ WebSocket
        // Xử lý chuỗi và thay thế dấu " bằng \"
        this.jsonRaw = data.replace(/"/g, '\\"');
        // use rxjs here
        this.dataSubject.next(this.jsonRaw); // Gửi dữ liệu đến Subject
      },
      (error) => {
        // Xử lý lỗi khi kết nối bị ngắt
        console.error('Lỗi kết nối WebSocket:', error);

        // Kết nối lại sau một khoảng thời gian
        setTimeout(() => this.connect(ip), 3000);
      }
    );
  }

  // Hàm này để subscribe từ bên ngoài để biết khi có dữ liệu mới
  public onDataReceived() {
    return this.dataSubject.asObservable();
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
