import { Stack, Nav, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <>
      <Row className="mt-3 justify-content-center">
        <Col xs lg="2" className="my-auto text-center">
          <Stack>
            <p>About Us</p>
            <Link to={`/#`}>Who We Are</Link>
            <Link to={`/#`}>Careers</Link>
          </Stack>
        </Col>
        <Col xs lg="2" className="my-auto text-center">
          <p>Social</p>
          <Nav className="justify-content-center">
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faXTwitter} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faYoutube} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Col className="my-auto text-center" md={6}>
          <span>© Nate-Tanner.com, {year}</span>
        </Col>
      </Row>
    </>
  );
};
export default Footer;
