import { Row, Col, Form } from "react-bootstrap";
import { useFormikContext } from "formik";
import Select from "react-select";
import selectTheme from "../../data/selectTheme.json";
import selectOptions from "../../data/SelectOptions.json";

const PropertyInfo = (props) => {
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
      <h4>Property Info</h4>
      <Row>
        <Form.Group as={Col} md={3}>
          <Form.Label>Property Name:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            placeholder="Property Name"
            value={values.name}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("name");
              validateField("name");
            }}
            isInvalid={touched.name && !!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Label>Property Type:</Form.Label>
          <Select
            defaultValue={values.property_type}
            className={
              "react-select  " + (errors.property_type ? " is-invalid" : "")
            }
            classNamePrefix="react-select"
            options={selectOptions.propertyTypeOptions}
            value={values.property_type}
            name="property_type"
            onChange={(value) => handleChangeSelect("property_type", value)}
            onBlur={() => setFieldTouched("property_type")}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                ...selectTheme,
              },
            })}
          />
          {errors.property_type && (
            <div className="invalid-feedback d-block">
              {errors.property_type.value}
            </div>
          )}
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Label>Year Built:</Form.Label>
          <Form.Control
            type="number"
            id="year_built"
            name="year_built"
            step="1"
            placeholder="Year Built"
            value={values.year_built}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("year_built");
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Label>Total Units:</Form.Label>
          <Form.Control
            type="number"
            id="total_units"
            name="total_units"
            step="1"
            placeholder="Total Units"
            value={values.total_units}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("total_units");
            }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md={12}>
          <Form.Label>Property Description: </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="description"
            name="description"
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("description");
            }}
            defaultValue={values.description}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md={12}>
          <Form.Label>Address: </Form.Label>
          <Form.Control
            type="text"
            id="address1"
            name="address1"
            placeholder="Address"
            value={values.address1}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("address1");
              validateField("address1");
            }}
            isInvalid={touched.address1 && !!errors.address1}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address1}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md={12}>
          <Form.Label>Address 2: </Form.Label>
          <Form.Control
            type="text"
            id="address2"
            name="address2"
            placeholder="Address 2"
            value={values.address2}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("address2");
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} md={6}>
          <Form.Label>City: </Form.Label>
          <Form.Control
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={values.city}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("city");
              validateField("city");
            }}
            isInvalid={touched.city && !!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <Form.Label>State: </Form.Label>
          <Select
            className={"react-select  " + (errors.state ? " is-invalid" : "")}
            classNamePrefix="react-select"
            options={selectOptions.stateOptions}
            value={values.state}
            name="state"
            onChange={(value) => handleChangeSelect("state", value)}
            onBlur={() => setFieldTouched("state")}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                ...selectTheme,
              },
            })}
          />
          {errors.state && (
            <div className="invalid-feedback d-block">{errors.state.value}</div>
          )}
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <Form.Label>Zip Code: </Form.Label>
          <Form.Control
            type="text"
            id="zip"
            name="zip"
            placeholder="Zip Code"
            value={values.zip}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched("zip");
              validateField("zip");
            }}
            isInvalid={touched.zip && !!errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
};

export default PropertyInfo;
