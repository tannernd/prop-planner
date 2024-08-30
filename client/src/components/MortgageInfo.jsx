import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { useFormikContext } from "formik";
import { mortgageCalc } from "../js/property";

const MortgageInfo = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldTouched,
    validateField,
    setFieldValue,
  } = useFormikContext();

  const handleChangeSelect = (name, value) => {
    setFieldValue(name, value);
    // Validate immediately when value is set
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <h3>Mortgage</h3>
      <p>Please enter a loan amount, rate, and term to calculate a payment.</p>
      <Row>
        <Col md={3}>
          <Form.Label>Lender</Form.Label>
          <Form.Group>
            <Form.Control
              type="text"
              id="lender"
              name="lender"
              placeholder="Lender"
              value={values.lender}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("lender");
              }}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Label>Loan Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              id="loan_amount"
              name="loan_amount"
              step=".01"
              placeholder="Loan Amount"
              value={values.loan_amount}
              onChange={(e) => {
                handleChange(e);
                const currentValues = {
                  ...values,
                  [e.target.name]: e.target.value,
                };
                const payment = mortgageCalc(currentValues);
                if (!isNaN(payment)) {
                  setFieldValue("payment", payment);
                }
              }}
              onBlur={(e) => {
                setFieldTouched(e.target.name, true);
                const payment = mortgageCalc(values);
                if (!isNaN(payment)) {
                  setFieldValue("payment", payment);
                }
                validateField(e.target.name);
              }}
              isInvalid={touched.loan_amount && !!errors.loan_amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.loan_amount}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Label>Rate</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="rate"
              name="rate"
              step=".01"
              placeholder="Rate"
              value={values.rate}
              onChange={(e) => {
                handleChange(e);
                const currentValues = {
                  ...values,
                  [e.target.name]: e.target.value,
                };
                const payment = mortgageCalc(currentValues);
                if (!isNaN(payment)) {
                  setFieldValue("payment", payment);
                }
              }}
              onBlur={(e) => {
                setFieldTouched(e.target.name, true);
                const payment = mortgageCalc(values);
                if (!isNaN(payment)) {
                  setFieldValue("payment", payment);
                }
                validateField(e.target.name);
              }}
              isInvalid={touched.rate && !!errors.rate}
            />
            <InputGroup.Text>%</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.rate}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Label>Term (Months)</Form.Label>
          <Form.Group>
            <Form.Control
              type="number"
              id="term"
              name="term"
              step=".01"
              placeholder="Term (Months)"
              value={values.term}
              onChange={(e) => {
                handleChange(e);
                const currentValues = {
                  ...values,
                  [e.target.name]: e.target.value,
                };
                const payment = mortgageCalc(currentValues);
                if (!isNaN(payment)) {
                  setFieldValue("payment", payment);
                }
              }}
              onBlur={(e) => {
                setFieldTouched(e.target.name, true);
                const payment = mortgageCalc(values);
                if (!isNaN(payment)) {
                  setFieldValue("payment", payment);
                }
                validateField(e.target.name);
              }}
              isInvalid={touched.term && !!errors.term}
            />
            <Form.Control.Feedback type="invalid">
              {errors.term}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Label>Payment</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              readOnly
              type="number"
              id="payment"
              name="payment"
              step=".01"
              placeholder="Payment"
              value={values.payment}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("payment");
                validateField("payment");
              }}
              isInvalid={touched.payment && !!errors.payment}
            />
            <Form.Control.Feedback type="invalid">
              {errors.payment}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default MortgageInfo;
