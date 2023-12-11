import Col from "react-bootstrap/Col";

function StatObject(props) {
  const { name, value } = props;
  return (
    <Col>
      <div className="stat-object">
        <p>{name}</p>
        <p>{value}</p>
      </div>
    </Col>
  );
}

export default StatObject;
