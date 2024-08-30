import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseMedical,
  faFileLines,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import PropertyModal from "../components/modals/PropertyModal";
import AuthCheck from "../components/HOC/AuthCheck";
import { checkLogin } from "../js/login";

const Dashboard = (props) => {
  const [propertyData, setPropertyData] = useState(props.propertyData);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const loggedIn = checkLogin();
  }, []);

  const handleClose = () => {
    return () => {
      setShow(false);
    };
  };
  return (
    <>
      <main>
        <h3 style={{ display: "inline" }}>Property List</h3>
        <Link className="ps-3" to={"/addproperty"}>
          <FontAwesomeIcon icon={faHouseMedical} />
        </Link>
        <Table responsive>
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Offer Amount</th>
              <th>Market Value</th>
              <th>Reports</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(propertyData).length != 0 ? (
              propertyData.map((property, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/property/${property.id}`}>{property.name}</Link>
                  </td>
                  <td>{property.address1}</td>
                  <td>{property.city}</td>
                  <td>{property.state}</td>
                  <td>{property.financials[0].offer_amount}</td>
                  <td>{property.financials[0].property_value}</td>
                  <td>
                    <Link to={`/reports/${property.id}`}>
                      <FontAwesomeIcon icon={faFileLines} />
                    </Link>
                  </td>
                  <td>
                    <Link
                      onClick={(e) => {
                        setShow(true);
                        setModalData({
                          type: "delete",
                          deleteType: "property",
                          id: property.id,
                        });
                      }}
                      to={"#"}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Please enter a property.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </main>
      <PropertyModal
        handleClose={handleClose}
        show={show}
        propertyData={propertyData}
        setPropertyData={setPropertyData}
        setModalData={setModalData}
        modalData={modalData}
      />
    </>
  );
};
export default AuthCheck(Dashboard);
