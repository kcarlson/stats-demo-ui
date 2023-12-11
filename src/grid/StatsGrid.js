import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import StatObject from "./StatObject";
import AddStats from "./AddStats";

function StatsGrid() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Reconnect on close
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${process.env.HOSTNAME}:3001/stats-demo-server/v1`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOnAdd = (newData) => {
    setIsLoading(true);
    console.log("Success:", newData);
    setData(newData);
    setIsLoading(false);
  };

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
            <AddStats onAdd={handleOnAdd} />
          </Row>
        </Container>
      )}
    </div>
  );
}

export default StatsGrid;
