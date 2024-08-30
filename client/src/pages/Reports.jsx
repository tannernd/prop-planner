import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Nav, Tab } from "react-bootstrap";

import PropertyObj from "../lib/PropertyObj";
import { getSingleProperty } from "../js/property";
import Apod from "../components/reports/Apod";
import Cashflow from "../components/reports/Cashflow";
import CriticalOutput from "../components/reports/CriticalOutput";

const Reports = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyData, setPropertyData] = useState({});
  const { id: propertyId } = useParams("id");
  useEffect(() => {
    document.title = "Getting Property";
    getSingleProperty(propertyId, error, setPropertyData, setError, setLoading);
  }, []);
  if (!loading && !error) {
    const propertyObj = new PropertyObj(propertyData);
    const propertyReports = propertyObj.getAllReports();
    document.title = propertyData.name + " Reports";
    return (
      <>
        <Tab.Container defaultActiveKey="APOD">
          <Row>
            <Nav as={Col} variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="APOD">APOD</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="CF">Cashflow</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="CO">Critical Output</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav as={Col} className="justify-content-end">
              <Nav.Item>
                <Nav.Link href={"/property/" + propertyId}>
                  Back to Property
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="APOD">
                <Apod propertyReports={propertyReports} />
              </Tab.Pane>
              <Tab.Pane eventKey="CF">
                <Cashflow propertyReports={propertyReports} />
              </Tab.Pane>
              <Tab.Pane eventKey="CO">
                <CriticalOutput propertyReports={propertyReports} />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </>
    );
  } else if (!!error) {
    return (
      <>
        <div>{error}</div>
      </>
    );
  } else {
    return (
      <>
        <div>Loading</div>
      </>
    );
  }
};

export default Reports;
