import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import loginFormHandler from "../js/login";
import loggedInRedirect from "../components/HOC/loggedInRedirect";

const Login = (props) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Invalid email"),
    password: yup.string().required("Please enter your password"),
  });

  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("loggedOut") === "true") {
      setShowLogoutMessage(true);
      sessionStorage.removeItem("loggedOut");
    }
  }, []);

  return (
    <Row className="justify-content-center">
      <Col md={4}>
        <Card>
          <Card.Body>
            {showLogoutMessage ? (
              <Alert variant="success">You have been logged out</Alert>
            ) : (
              ""
            )}
            {showErrorMessage ? (
              <Alert variant="warning">{errorMsg}</Alert>
            ) : (
              ""
            )}
            <Card.Title className="text-center">Login</Card.Title>
            <Card.Text as={"div"}>
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  loginFormHandler(values, setErrorMsg, setShowErrorMessage);
                }}
                initialValues={{
                  email: "",
                  password: "",
                }}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldTouched,
                  validateField,
                  values,
                  touched,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("email");
                          validateField("email");
                        }}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("password");
                          validateField("password");
                        }}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="d-block mx-auto">
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                Don't have an account? <a href="/signup">Sign Up</a> here.
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default loggedInRedirect(Login);
