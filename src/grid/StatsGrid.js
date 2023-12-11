import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import StatObject from "./StatObject";

function StatsGrid() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/stats-demo-server/v1"
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

    fetchData(); // Invoke the fetch function
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

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
          </Row>
        </Container>
      )}
    </div>
  );
}

export default StatsGrid;
