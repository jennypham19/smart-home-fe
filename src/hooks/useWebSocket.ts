import { useCallback, useEffect, useRef, useState } from 'react';

import { getAccessToken } from '@/utils/AuthHelper';

/**
 * Base URL cho WebSocket.
 * Ưu tiên biến môi trường VITE_WS_URL; nếu không có thì suy ra từ VITE_API_BASE_URL
 * bằng cách đổi http -> ws, https -> wss (ví dụ http://localhost:3002 -> ws://localhost:3002).
 */
const WS_BASE =
  (import.meta.env.VITE_WS_URL as string | undefined) ||
  ((import.meta.env.VITE_API_BASE_URL as string | undefined) || '').replace(/^http/i, 'ws');

export type WebSocketStatus = 'connecting' | 'open' | 'closed';

export interface UseWebSocketOptions {
  /** Đường dẫn endpoint socket phía BE, ví dụ '/ws' hoặc '/socket'. */
  path?: string;
  /** Gắn access token vào query ?token= (mặc định có). */
  withToken?: boolean;
  /** Nhận message: data đã được parse JSON nếu parse được, ngược lại là chuỗi thô. */
  onMessage?: (data: any, event: MessageEvent) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  /** Tự kết nối lại khi rớt (mặc định bật). */
  reconnect?: boolean;
  /** Khoảng thời gian giữa các lần thử lại (ms). */
  reconnectInterval?: number;
  /** Số lần thử lại tối đa. */
  maxReconnectAttempts?: number;
  /** Cho phép bật/tắt kết nối. */
  enabled?: boolean;
}

/**
 * Hook kết nối WebSocket thuần tới BE, có tự reconnect, gắn token và parse JSON.
 * Trả về { status, send, close, reconnect }.
 */
export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {
    path = '/ws',
    withToken = true,
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 10,
    enabled = true,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptsRef = useRef(0);
  const manuallyClosedRef = useRef(false);

  // Luôn giữ callback mới nhất mà không cần tạo lại kết nối
  const handlersRef = useRef({ onMessage, onOpen, onClose, onError });
  handlersRef.current = { onMessage, onOpen, onClose, onError };

  // Ref trỏ tới hàm connect để dùng trong onclose (tránh phụ thuộc vòng)
  const connectRef = useRef<() => void>(() => {});

  const [status, setStatus] = useState<WebSocketStatus>('closed');

  const buildUrl = useCallback(() => {
    const base = `${WS_BASE}${path}`;
    if (!withToken) return base;
    const token = getAccessToken();
    if (!token) return base;
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${sep}token=${encodeURIComponent(token)}`;
  }, [path, withToken]);

  const connect = useCallback(() => {
    if (!enabled) return;

    // Đã có kết nối đang mở / đang mở dở thì thôi
    const current = wsRef.current;
    if (
      current &&
      (current.readyState === WebSocket.OPEN || current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    manuallyClosedRef.current = false;
    setStatus('connecting');

    let ws: WebSocket;
    try {
      ws = new WebSocket(buildUrl());
    } catch {
      // Tạo socket lỗi -> lên lịch thử lại
      if (reconnect && attemptsRef.current < maxReconnectAttempts) {
        attemptsRef.current += 1;
        reconnectTimerRef.current = setTimeout(() => connectRef.current(), reconnectInterval);
      }
      return;
    }
    wsRef.current = ws;

    ws.onopen = (e) => {
      attemptsRef.current = 0;
      setStatus('open');
      handlersRef.current.onOpen?.(e);
    };

    ws.onmessage = (e) => {
      let parsed: any = e.data;
      try {
        parsed = JSON.parse(e.data);
      } catch {
        /* không phải JSON -> giữ nguyên chuỗi */
      }
      handlersRef.current.onMessage?.(parsed, e);
    };

    ws.onerror = (e) => {
      handlersRef.current.onError?.(e);
    };

    ws.onclose = (e) => {
      setStatus('closed');
      handlersRef.current.onClose?.(e);
      // Chỉ reconnect khi không chủ động đóng và chưa vượt số lần thử
      if (reconnect && !manuallyClosedRef.current && attemptsRef.current < maxReconnectAttempts) {
        attemptsRef.current += 1;
        reconnectTimerRef.current = setTimeout(() => connectRef.current(), reconnectInterval);
      }
    };
  }, [enabled, buildUrl, reconnect, reconnectInterval, maxReconnectAttempts]);

  connectRef.current = connect;

  /** Gửi dữ liệu (object sẽ được JSON.stringify). Trả về true nếu gửi được. */
  const send = useCallback((data: any) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(typeof data === 'string' ? data : JSON.stringify(data));
      return true;
    }
    return false;
  }, []);

  /** Chủ động đóng kết nối (không reconnect). */
  const close = useCallback(() => {
    manuallyClosedRef.current = true;
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    attemptsRef.current = 0;
    wsRef.current?.close();
  }, []);

  useEffect(() => {
    if (enabled) {
      attemptsRef.current = 0;
      connect();
    }
    return () => {
      manuallyClosedRef.current = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [enabled, connect]);

  return { status, send, close, reconnect: connect };
};

export default useWebSocket;
