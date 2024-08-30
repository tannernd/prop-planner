import { useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import signupFormHandler from "../js/signup";

const SignUp = (props) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object().shape({
    firstname: yup.string().required("Please enter your first name"),
    lastname: yup.string().required("Please enter your last name"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Invalid email"),
    password: yup.string().required("Please enter your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <Row className="justify-content-center">
      <Col md={4}>
        <Card>
          <Card.Body>
            {showErrorMessage ? (
              <Alert variant="warning">{errorMsg}</Alert>
            ) : (
              ""
            )}
            <Card.Title className="text-center">Sign Up</Card.Title>
            <Card.Text as={"div"}>
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  signupFormHandler(values, setErrorMsg, setShowErrorMessage);
                }}
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
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
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        autoComplete="given-name"
                        name="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("firstname");
                          validateField("firstname");
                        }}
                        isInvalid={touched.firstname && !!errors.firstname}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstname}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        autoComplete="family-name"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("lastname");
                          validateField("lastname");
                        }}
                        isInvalid={touched.lastname && !!errors.lastname}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastname}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
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
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("confirmPassword");
                          validateField("confirmPassword");
                        }}
                        isInvalid={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="d-block mx-auto">
                      Sign Up
                    </Button>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                Already have an account? <a href="/login">Login</a> here.
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
