import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { useFormikContext } from "formik";
import selectOptions from "../../data/SelectOptions.json";
import selectTheme from "../../data/selectTheme.json";
import Select from "react-select";

const IncomeInfo = (props) => {
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
      <h3>Income</h3>
      <Row>
        <Col md={6}>
          <Form.Label>Income Type</Form.Label>
          <Select
            defaultValue={values.description}
            className={
              "react-select  " + (errors.description ? " is-invalid" : "")
            }
            classNamePrefix="react-select"
            options={selectOptions.incomeOptions}
            value={values.description}
            name="description"
            onChange={(value) => handleChangeSelect("description", value)}
            onBlur={() => setFieldTouched("description")}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                ...selectTheme,
              },
            })}
          />
          {errors.description && (
            <div className="invalid-feedback d-block">
              {errors.description.value}
            </div>
          )}
        </Col>
        <Col md={6}>
          <Form.Label>Income Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              id="amount"
              name="amount"
              step=".01"
              placeholder="Income Amount"
              value={values.amount}
              onChange={handleChange}
              onBlur={() => {
                setFieldTouched("amount");
                validateField("amount");
              }}
              isInvalid={touched.amount && !!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default IncomeInfo;
