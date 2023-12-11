import React, { useState } from "react";
import Col from "react-bootstrap/Col";

function AddStats({ onAdd }) {
  const [inputValue, setInputValue] = useState(""); // State to hold input field value

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update input field value in state
  };

  // Add button inside to add a new stat object to the DOM and call the backend
  const handleClick = async () => {
    try {
      console.log("inputValue:", inputValue);
      const requestBody = {
        stats: [
          {
            name: inputValue,
          },
        ],
      };
      const response = await fetch(
        `http://${process.env.HOSTNAME}:3001/stats-demo-server/v1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // Handle the API response
      const data = await response.json();
      onAdd(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleKeyDown = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    await handleClick();
  };

  return (
    <Col>
      <div className="square border border-dark p-4 position-relative">
        <div className="position-absolute top-0 start-0 text-white bg-dark p-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter stat name and hit enter"
          />
        </div>
        <div className="text-center display-1 mt-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add
          </button>
        </div>
      </div>
    </Col>
  );
}

export default AddStats;
