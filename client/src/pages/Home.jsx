import { Row, Col, Image, Stack } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Row>
        <Stack>
          <h1>PropPlanner</h1>
          <p>
            Lightning fast ROI reports for your potential investment Properties.
          </p>
          <a href="/signup">Get Started</a>
        </Stack>
      </Row>
      <Row>
        <Col xs={2}>
          <Image fluid src="/images/logo.png" />
        </Col>
        <Col xs={10}>
          <Image fluid src="/images/reportexample.png" />
        </Col>
      </Row>
    </>
  );
};
export default Home;
