import { SocketData } from "@common/model/interface/socket";

function Socket(
  this: SocketData,
  opts: {
    url: string;
    pingTimeout: number;
    pongTimeout: number;
    reconnectTimeout?: number;
  },
  token: string
) {
  this.opts = {
    url: opts.url,
    pingTimeout: opts.pingTimeout || 15000,
    pongTimeout: opts.pongTimeout || 10000,
    reconnectTimeout: opts.reconnectTimeout || 5000,
    pingMsg: "{ type: 'heartBeat' }"
  };
  this.token = token;
  this.ws = null;
  this.onopen = () => {
    const open = "onOpen";
  };
  this.onmessage = e => {
    //
  };
  this.onclose = () => {
    //
  };
  this.onerror = err => {
    //
  };
  this.onreconnect = () => {
    //
  };
  this.isReconnecting = false;
  this.isForbidReconnect = false;
  this.create(this.opts.url, token);
}

Socket.prototype.create = function(url: string, token: string) {
  try {
    this.ws = new WebSocket(url, token);
    this.initEventHandle();
  } catch (e) {
    this.reconnect();
    throw e;
  }
};

Socket.prototype.initEventHandle = function() {
  this.ws.onopen = () => {
    this.onopen();
    this.checkHeart(); // 开始心跳检测
  };
  this.ws.onmessage = (event: MessageEvent) => {
    this.onmessage(event);
    this.checkHeart(); // 获取到消息表示连接正常，重置心跳检测
  };
  this.ws.onclose = () => {

    this.onclose();
    this.reconnect(); // 关闭,重新连接
  };
  this.ws.onerror = () => {
    this.onerror();
    this.reconnect(); // 报错,重新连接
  };
};

Socket.prototype.reconnect = function() {
  if (this.isReconnecting || this.isForbidReconnect) {
    return;
  }
  this.isReconnecting = true;
  this.onreconnect();

  setTimeout(() => {
    this.create(this.opts.url, this.token); // todo 重新需要重新请求url
    this.isReconnecting = false;
  }, this.opts.reconnectTimeout);
};

Socket.prototype.send = function(msg: string) {
  this.ws.send(msg);
};

Socket.prototype.checkHeart = function() {
  this.resetHeartCheck();
  this.startHeartCheck();
};

Socket.prototype.startHeartCheck = function() {
  if (this.isForbidReconnect) return; // 不再重连后不执行心跳
  this.pingTime = setTimeout(() => {

    this.ws.send(this.opts.pingMsg);
    // 如果后端超过一定时间未返回则重连
    this.pongTime = setTimeout(() => {

      this.ws.close();
    }, this.opts.pongTimeout);
  }, this.opts.pingTimeout);
};

Socket.prototype.resetHeartCheck = function() {
  clearTimeout(this.pingTime);
  clearTimeout(this.pongTime);
};

Socket.prototype.close = function() {
  // 手动关闭不再重连

  this.isForbidReconnect = true;
  this.resetHeartCheck();
  this.ws.close();
};

export default Socket;
