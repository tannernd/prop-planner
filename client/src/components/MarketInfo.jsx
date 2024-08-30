import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { useFormikContext } from "formik";
import Select from "react-select";
import selectTheme from "../../data/selectTheme.json";
import selectOptions from "../../data/SelectOptions.json";

const MarketInfo = (props) => {
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
      <h4>Market Info</h4>
      <Row className="mb-4">
        <Col as={Col} md={3}>
          <Form.Label>Appreciation Percent:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="appreciation"
              name="appreciation"
              step=".01"
              placeholder="Appreciation %"
              value={values.appreciation}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("appreciation");
                validateField("appreciation");
              }}
              isInvalid={!!errors.appreciation}
            />
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.appreciation}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col as={Col} md={3}>
          <Form.Label>Annual Rent Increase Percent:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="annual_rent_increase"
              name="annual_rent_increase"
              step=".01"
              placeholder="Annual Rent Increase %"
              value={values.annual_rent_increase}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("annual_rent_increase");
                validateField("annual_rent_increase");
              }}
              isInvalid={!!errors.annual_rent_increase}
            />
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.annual_rent_increase}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col as={Col} md={3}>
          <Form.Label>Annual Expense Increase Percent:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="annual_expense_increase"
              name="annual_expense_increase"
              step=".01"
              placeholder="Annual Expense Increase %"
              value={values.annual_expense_increase}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("annual_expense_increase");
                validateField("annual_expense_increase");
              }}
              isInvalid={!!errors.annual_expense_increase}
            />
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.annual_expense_increase}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Label>Vacancy Percent:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              id="vacancy"
              name="vacancy"
              step="1"
              placeholder="Vacancy Percent"
              value={values.vacancy}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("vacancy");
                validateField("vacancy");
              }}
              isInvalid={!!errors.vacancy}
            />
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.vacancy}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default MarketInfo;
