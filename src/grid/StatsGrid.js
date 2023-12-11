import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import StatObject from "./StatObject";
import AddStats from "./AddStats";
import { useWebSocket } from "../WebSocketContext";

function StatsGrid({ backendHost }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useWebSocket();

  useEffect(() => {
    if (!socket) {
      // Wait for socket to be ready
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${backendHost}:3001/stats-demo-server/v1`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        setIsLoading(false);
        // Listen for new stats
        socket.addEventListener("message", (event) => {
          const data = JSON.parse(event.data);
          if (!data.updated) {
            return;
          }
          setIsLoading(true);
          setData(data);
          setIsLoading(false);
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backendHost, socket]);

  return (
    <div>
      {isLoading ? (
        <p>Loading Stats...</p>
      ) : (
        <Container fluid="md">
          <Row>
            {data.stats.map((item, index) => (
              <StatObject key={index} {...item} />
            ))}
            <AddStats backendHost={backendHost} />
          </Row>
        </Container>
      )}
    </div>
  );
}

export default StatsGrid;
