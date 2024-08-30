import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { useFormikContext } from "formik";

const FinancialInfo = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldTouched,
    validateField,
  } = useFormikContext();

  return (
    <>
      <h4>Financial Info</h4>
      <Row className="mb-4">
        <Col as={Col} md={3}>
          <Form.Label>Offer Amount:</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
            <Form.Control
              type="number"
              id="offer_amount"
              name="offer_amount"
              step=".01"
              placeholder="Offer Amount"
              value={values.offer_amount}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("offer_amount");
                validateField("offer_amount");
              }}
              isInvalid={!!errors.offer_amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.offer_amount}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col as={Col} md={3}>
          <Form.Label>Property Value:</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
            <Form.Control
              type="number"
              id="property_value"
              name="property_value"
              step=".01"
              placeholder="Property Value"
              value={values.property_value}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("property_value");
                validateField("property_value");
              }}
              isInvalid={!!errors.property_value}
            />
            <Form.Control.Feedback type="invalid">
              {errors.property_value}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col as={Col} md={3}>
          <Form.Label>Closing Costs Amount:</Form.Label>
          <InputGroup as={Col} md={3}>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
            <Form.Control
              type="number"
              id="closing_amount"
              name="closing_amount"
              step=".01"
              placeholder="Closing Costs Amount"
              value={values.closing_amount}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("closing_amount");
                validateField("closing_amount");
              }}
              isInvalid={!!errors.closing_amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.closing_amount}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Label>Income Tax Rate:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="tax_rate"
              name="tax_rate"
              step="1"
              placeholder="Income Tax Rate"
              value={values.tax_rate}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("tax_rate");
                validateField("tax_rate");
              }}
              isInvalid={!!errors.tax_rate}
            />
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.tax_rate}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default FinancialInfo;
