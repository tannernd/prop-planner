import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatCurrency } from "../js/helpers";
import { Table, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PropertyModal from "../components/modals/PropertyModal";
import AuthCheck from "../components/HOC/AuthCheck";

const Property = (props) => {
  const [show, setShow] = useState(false);
  const [propertyData, setPropertyData] = useState(props.propertyData);
  const [modalData, setModalData] = useState({});
  const [modal, setModal] = useState("");

  useEffect(() => {
    document.title = "Getting Property";
  }, []);
  const handleClose = () => {
    return () => {
      setShow(false);
    };
  };
  document.title = propertyData.name;
  return (
    <>
      <main>
        <Row>
          <Col md={10}>
            <h3>{propertyData.name}</h3>
          </Col>
          <Col md={2} className="justify-content-end text-end">
            <Link to={`/reports/${propertyData.id}`}>
              View Report
              <FontAwesomeIcon className="ms-3" icon={faFileLines} />
            </Link>
          </Col>
        </Row>
        <Card>
          <Card.Header as={Row}>
            <Col md={11}>
              <h5>Property Info </h5>
            </Col>
            <Col md={1}>
              <Link
                className="d-flex justify-content-end"
                onClick={() => {
                  setModal("propInfo");
                  setShow(true);
                  setModalData({
                    type: "propInfo",
                  });
                }}
                to={"#"}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
            </Col>
          </Card.Header>
          <Card.Body>
            {!!propertyData.description ? (
              <Row>
                <Col lg={3} sm={12} className="fw-bold">
                  Description:
                </Col>
                <Col lg={9} sm={12}>
                  {propertyData.description}
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row>
              <Col lg={3} sm={12} className="fw-bold">
                Address:
              </Col>
              <Col lg={9} sm={12}>
                <p className="card-text">{propertyData.address1}</p>
                {!!propertyData.address2 ? (
                  <p className="card-text">{propertyData.address2}</p>
                ) : (
                  ""
                )}
                <p className="card-text">
                  {propertyData.city}, {propertyData.state} {propertyData.zip}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={3} sm={12} className="fw-bold">
                Property Type:
              </Col>
              <Col lg={9} sm={12}>
                {propertyData.property_type}
              </Col>
            </Row>
            {!!propertyData.year_built ? (
              <Row>
                <Col lg={3} sm={12} className="fw-bold">
                  Year Built:
                </Col>
                <Col lg={9} sm={12}>
                  {propertyData.year_built}
                </Col>
              </Row>
            ) : (
              ""
            )}
            {!!propertyData.total_units ? (
              <Row>
                <Col lg={3} sm={12} className="fw-bold">
                  Total Units:
                </Col>
                <Col lg={9} sm={12}>
                  {propertyData.total_units}
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as={Row}>
            <Col>
              <h5>Financials</h5>
            </Col>
            <Col>
              <Link
                className="d-flex justify-content-end"
                to={"#"}
                onClick={() => {
                  setModal("financialInfo");
                  setShow(true);
                  setModalData({
                    type: "propInfo",
                  });
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
            </Col>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg={3} sm={12} className="fw-bold">
                Offer Amount:
              </Col>
              <Col lg={3} sm={12}>
                {formatCurrency(propertyData.financials[0].offer_amount)}
              </Col>
              <Col lg={3} sm={12} className="fw-bold">
                Property Value:
              </Col>
              <Col lg={3} sm={12}>
                {formatCurrency(propertyData.financials[0].property_value)}
              </Col>
            </Row>
            <Row>
              <Col lg={3} sm={12} className="fw-bold">
                Closing Amount:
              </Col>
              <Col lg={3} sm={12}>
                {formatCurrency(propertyData.financials[0].closing_amount)}
              </Col>
              <Col lg={3} sm={12} className="fw-bold">
                Tax Rate:
              </Col>
              <Col lg={3} sm={12}>
                {propertyData.financials[0].tax_rate}%
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as={Row}>
            <Col>
              <h5>Market Info</h5>
            </Col>
            <Col>
              <Link
                className="d-flex justify-content-end"
                onClick={() => {
                  setModal("marketInfo");
                  setShow(true);
                  setModalData({
                    type: "propInfo",
                  });
                }}
                to={"#"}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
            </Col>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg={3} sm={12} className="fw-bold">
                Appreciation:
              </Col>
              <Col lg={3} sm={12}>
                {propertyData.markets[0].appreciation}%
              </Col>
              <Col lg={3} sm={12} className="fw-bold">
                Annual Rent Increase:
              </Col>
              <Col lg={3} sm={12}>
                {propertyData.markets[0].annual_rent_increase}%
              </Col>
            </Row>
            <Row>
              <Col lg={3} sm={12} className="fw-bold">
                Annual Expense Increase:
              </Col>
              <Col lg={3} sm={12} className="col-lg-3 col-sm-12">
                {propertyData.markets[0].annual_expense_increase}%
              </Col>
              <Col lg={3} sm={12} className="col-lg-3 col-sm-12 fw-bold">
                Vacancy:
              </Col>
              <Col lg={3} sm={12} className="col-lg-3 col-sm-12">
                {propertyData.markets[0].vacancy}%
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as={Row}>
            <Col>
              <h5>Income</h5>
            </Col>
            <Col>
              <Link
                className="d-flex justify-content-end"
                onClick={() => {
                  setModal("income");
                  setShow(true);
                  setModalData({
                    type: "table",
                    data: {},
                  });
                }}
                to={"#"}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </Col>
          </Card.Header>
          <Card.Body>
            {propertyData.incomes[0] != null ? (
              <div className="table-responsive">
                <Table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyData.incomes.map((income, key) => {
                      return (
                        <tr key={key}>
                          <td>{income.description}</td>
                          <td>{formatCurrency(income.amount)}</td>
                          <td>
                            <span className="d-flex justify-content-end">
                              <Link
                                to={"#"}
                                onClick={(e) => {
                                  setModal("income");
                                  setShow(true);
                                  setModalData({
                                    type: "table",
                                    data: income,
                                    key: key,
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Link>
                              <Link
                                to={"#"}
                                onClick={(e) => {
                                  setModal("income");
                                  setShow(true);
                                  setModalData({
                                    type: "delete",
                                    deleteType: "income",
                                    id: income.id,
                                    property_id: income.property_id,
                                  });
                                }}
                              >
                                <FontAwesomeIcon
                                  className="ms-3"
                                  icon={faTrash}
                                />
                              </Link>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p>Please add an income</p>
            )}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as={Row}>
            <Col>
              <h5>Expenses</h5>
            </Col>
            <Col>
              <Link
                className="d-flex justify-content-end"
                to={"#"}
                onClick={(e) => {
                  setModal("expense");
                  setShow(true);
                  setModalData({
                    type: "table",
                    data: {},
                  });
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </Col>
          </Card.Header>
          <div className="card-body">
            {propertyData.expenses[0] != null ? (
              <div className="table-responsive">
                <Table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyData.expenses.map((expense, key) => {
                      return (
                        <tr key={key}>
                          <td>{expense.description}</td>
                          <td>{formatCurrency(expense.amount)}</td>
                          <td>
                            <span className="d-flex justify-content-end">
                              <Link
                                onClick={(e) => {
                                  setModal("expense");
                                  setShow(true);
                                  setModalData({
                                    type: "table",
                                    data: expense,
                                  });
                                }}
                                to={"#"}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Link>
                              <Link
                                onClick={(e) => {
                                  setModal("expense");
                                  setShow(true);
                                  setModalData({
                                    type: "delete",
                                    deleteType: "expense",
                                    id: expense.id,
                                    property_id: expense.property_id,
                                  });
                                }}
                                to={"#"}
                              >
                                <FontAwesomeIcon
                                  className="ms-3"
                                  icon={faTrash}
                                />
                              </Link>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p>Please add an Expense</p>
            )}
          </div>
        </Card>
        <Card>
          <Card.Header as={Row}>
            <Col>
              <h5>Mortgage</h5>
            </Col>
            <Col>
              <Link
                className="d-flex justify-content-end"
                to={"#"}
                onClick={(e) => {
                  setModal("mortgage");
                  setShow(true);
                  setModalData({
                    type: "table",
                    data: {},
                  });
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </Col>
          </Card.Header>
          <div className="card-body">
            {propertyData.mortgages[0] != null ? (
              <div className="table-responsive">
                <Table className="table">
                  <thead>
                    <tr>
                      <th>Lender</th>
                      <th>Loan Amount</th>
                      <th>Rate</th>
                      <th>Term</th>
                      <th>Payment</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyData.mortgages.map((mortgage, key) => {
                      return (
                        <tr key={key}>
                          <td>{mortgage.lender}</td>
                          <td>{formatCurrency(mortgage.loan_amount)}</td>
                          <td>{mortgage.rate}%</td>
                          <td>{mortgage.term}</td>
                          <td>{formatCurrency(mortgage.payment)}</td>
                          <td>
                            <span className="d-flex justify-content-end">
                              <Link
                                onClick={(e) => {
                                  setModal("mortgage");
                                  setShow(true);
                                  setModalData({
                                    type: "table",
                                    data: mortgage,
                                  });
                                }}
                                to={"#"}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Link>
                              <Link
                                onClick={(e) => {
                                  setModal("expense");
                                  setShow(true);
                                  setModalData({
                                    type: "delete",
                                    deleteType: "mortgage",
                                    id: mortgage.id,
                                    property_id: mortgage.property_id,
                                  });
                                }}
                                to={"#"}
                              >
                                <FontAwesomeIcon
                                  className="ms-3"
                                  icon={faTrash}
                                />
                              </Link>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p>Please add a Mortgage</p>
            )}
          </div>
        </Card>
      </main>
      <PropertyModal
        handleClose={handleClose}
        show={show}
        propertyData={propertyData}
        setPropertyData={setPropertyData}
        modal={modal}
        setModal={setModal}
        setModalData={setModalData}
        modalData={modalData}
      />
    </>
  );
};

export default AuthCheck(Property, true);
