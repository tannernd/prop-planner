import { Formik } from "formik";
import { Modal, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import {
  propertyInfoSchema,
  financialSchema,
  marketInfoSchema,
  incomeInfoSchema,
  expenseInfoSchema,
  mortgageInfoSchema,
} from "../../js/validation";
import {
  updateProperty,
  updateFinancialInfo,
  updateMarketInfo,
  updateIncome,
  updateExpense,
  updateMortgage,
  deleteSubmit,
} from "../../js/property";
import { initialValueInfo } from "../../js/helpers";
import PropertyInfo from "../../components/PropertyInfo";
import FinancialInfo from "../FinancialInfo";
import MarketInfo from "../MarketInfo";
import IncomeInfo from "../IncomeInfo";
import ExpenseInfo from "../ExpenseInfo";
import MortgageInfo from "../MortgageInfo";

const PropertyModal = (props) => {
  const {
    handleClose,
    show,
    propertyData,
    setPropertyData,
    modal,
    setModal,
    modalData,
    setModalData,
  } = props;

  let schema;
  const { id: propertyId } = useParams("id");
  let modalBody;
  let modalSubmit;
  let modalItemId;
  let modalHeader = "";

  switch (modal) {
    case "propInfo":
      modalSubmit = updateProperty;
      modalItemId = propertyId;
      schema = yup.object().shape({ ...propertyInfoSchema });
      modalHeader = "Update Property Info";
      modalBody = () => {
        return <PropertyInfo />;
      };
      break;
    case "financialInfo":
      modalSubmit = updateFinancialInfo;
      modalItemId = propertyData.financials[0].id;
      schema = yup.object().shape({ ...financialSchema });
      modalHeader = "Update Financials";
      modalBody = () => {
        return <FinancialInfo />;
      };
      break;
    case "marketInfo":
      modalSubmit = updateMarketInfo;
      modalItemId = propertyData.markets[0].id;
      schema = yup.object().shape({ ...marketInfoSchema });
      modalHeader = "Update Market Info";
      modalBody = () => {
        return <MarketInfo />;
      };
      break;
    case "income":
      modalSubmit = updateIncome;
      modalItemId = !!modalData.data ? modalData.data.id : "";
      schema = yup.object().shape({ ...incomeInfoSchema });
      modalHeader = "Update Income";
      modalBody = () => {
        return <IncomeInfo />;
      };
      break;
    case "expense":
      modalSubmit = updateExpense;
      modalItemId = !!modalData.data ? modalData.data.id : "";
      schema = yup.object().shape({ ...expenseInfoSchema });
      modalHeader = "Update Expense";
      modalBody = () => {
        return <ExpenseInfo />;
      };
      break;
    case "mortgage":
      modalSubmit = updateMortgage;
      modalItemId = !!modalData.data ? modalData.data.id : "";
      schema = yup.object().shape({ ...mortgageInfoSchema });
      modalHeader = "Update Mortgage Info";
      modalBody = () => {
        return <MortgageInfo />;
      };
      break;
  }
  switch (modalData.type) {
    case "propInfo":
      return (
        <Modal
          show={show}
          onHide={handleClose()}
          dialogClassName="custom-modal-size"
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalHeader}</Modal.Title>
          </Modal.Header>
          <Formik
            validationSchema={schema}
            initialValues={initialValueInfo(propertyData, modal)}
            onSubmit={(values) => {
              values.id = modalItemId;
              if (modal != "propInfo") {
                values.property_id = propertyId;
              }
              modalSubmit(values, handleClose(), setPropertyData);
            }}
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
                <Modal.Body>{modalBody()}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose()}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      );
    case "table":
      return (
        <>
          <Modal
            show={show}
            onHide={handleClose()}
            dialogClassName="custom-modal-size"
          >
            <Modal.Header closeButton>
              <Modal.Title>{modalHeader}</Modal.Title>
            </Modal.Header>
            <Formik
              validationSchema={schema}
              initialValues={initialValueInfo(modalData.data, modal)}
              onSubmit={(values) => {
                values.id = modalItemId;
                values.property_id = propertyId;
                modalSubmit(values, handleClose(), setPropertyData);
              }}
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
                  <Modal.Body>{modalBody()}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose()}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </Modal>
        </>
      );
    case "delete":
      return (
        <>
          <Modal
            show={show}
            onHide={handleClose()}
            dialogClassName="custom-modal-size"
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Are you sure you want to delete this item?</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose()}>
                Close
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  deleteSubmit(modalData, handleClose(), setPropertyData);
                }}
              >
                Delete Item
              </Button>
            </Modal.Footer>
          </Modal>
          <div>Delete Modal</div>
        </>
      );
  }
};

export default PropertyModal;
