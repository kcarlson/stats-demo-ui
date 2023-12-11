import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ backendHost, children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(`ws://${backendHost}:3001/stats-demo-server/v1`);
    setSocket(ws);
    // TODO: Reconnect on close
    // Dispose of socket
    return () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [backendHost]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
