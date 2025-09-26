// WebSocket.js
import { Message } from 'element-ui';
class WebSocketUtil {
    constructor(url, onMesCallBack) {
        this.url = url;
        this.websocket = null;
        this.isConnected = false;
        this.onMesCallBack = onMesCallBack;
    }

    connect() {
        this.websocket = new WebSocket(this.url);

        this.websocket.onopen = () => {
            this.isConnected = true;
            Message.success('WebSocket连接已建立');
        };

        this.websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.onMesCallBack(message);
            // Message.success('收到消息:', message);
        };

        this.websocket.onclose = () => {
            this.isConnected = false;
            Message.error('WebSocket连接已关闭');
        };

        this.websocket.onerror = (error) => {
            Message.error('WebSocket连接发生错误');
            //    Message.error('WebSocket连接发生错误:', error);
        };
    }

    send(message) {
        if (this.isConnected) {
            this.websocket.send(JSON.stringify(message));
            // console.log('发送消息:', message);
        } else {
            Message.error('WebSocket未连接');
        }
    }

    close() {
        if (this.isConnected) {
            this.websocket.close();
        } else {
            Message.error('WebSocket未连接');
        }
    }
}

export default WebSocketUtil;
