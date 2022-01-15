export interface SocketData {
  opts: {
    url: string,
    pingTimeout: number,
    pongTimeout: number,
    reconnectTimeout: number,
    pingMsg: string,
  }
  token: string,
  ws: WebSocket | null
  onopen: () => void
  onmessage: (msg) => void
  onclose: () => void
  onreconnect: () => void
  onerror: (err) => void
  create: (url: string, token: string) => void
  isReconnecting: boolean
  isForbidReconnect: boolean
  close: () => void
}
