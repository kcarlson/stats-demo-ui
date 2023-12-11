import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { useWebSocket } from "../WebSocketContext";

function StatObject(props) {
  const socket = useWebSocket();
  const [socketData, setSocketData] = useState(null);
  const { name, value, min, max } = props;

  useEffect(() => {
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      //   console.log("Message received:", data);
      setSocketData(data.stats.find((i) => i.name === name));
    });
  }, [name, socket]);

  return (
    <Col xs={12} md={6}>
      <div className="square border border-dark p-4 position-relative">
        <div className="position-absolute top-0 start-0 text-white bg-dark p-2">
          {name}
        </div>
        <div className="text-center display-1 mt-5">
          {socketData?.value ?? value}
        </div>
        <div className="position-absolute bottom-0 start-0 text-white bg-dark p-2">
          Min: {socketData?.min ?? min}
        </div>
        <div className="position-absolute bottom-0 end-0 text-white bg-dark p-2">
          Max: {socketData?.max ?? max}
        </div>
      </div>
    </Col>
  );
}

export default StatObject;
