import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Loading from "../components/Loading";
import PropertyInfo from "../components/PropertyInfo";
import FinancialInfo from "../components/FinancialInfo";
import MarketInfo from "../components/MarketInfo";
import { addPropertySubmit } from "../js/property";
import {
  propertyInfoSchema,
  financialSchema,
  marketInfoSchema,
} from "../js/validation";

const AddProperty = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/prop-planner/users/check-session");
        const data = await response.json();
        if (data.logged_in) {
          setLoading(false);
        } else {
          setError("Unauthorized - Please login");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    })();
  }, []);
  const schema = yup
    .object()
    .shape({ ...propertyInfoSchema, ...financialSchema, ...marketInfoSchema });
  if (!loading && !error) {
    return (
      <Row>
        <Formik
          validationSchema={schema}
          onSubmit={addPropertySubmit}
          initialValues={{
            name: "",
            property_type: "",
            year_built: "",
            total_units: "",
            property_desc: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            offer_amount: "",
            property_value: "",
            closing_amount: "",
            tax_rate: "",
            appreciation: "",
            annual_rent_increase: "",
            annual_expense_increase: "",
            vacancy: "",
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
              <PropertyInfo />
              <FinancialInfo />
              <MarketInfo />
              <Col md={12}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form>
          )}
        </Formik>
      </Row>
    );
  } else if (!!error) {
    return (
      <>
        <div>{error}</div>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default AddProperty;
