import React, { createContext, useContext, useEffect, useState } from "react";

const WS_ENDPOINT = `ws://${window.location.hostname}:3001/stats-demo-server/v1`;

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(WS_ENDPOINT);
    setSocket(ws);
    // Dispose of socket
    return () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
