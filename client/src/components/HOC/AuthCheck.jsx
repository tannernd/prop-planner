import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getSingleProperty, getAllProperties } from "../../js/property";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

function AuthCheck(Component, propertyFlag = false) {
  return function (props) {
    const [isAuth, setIsAuth] = useState(true);
    const [propertyData, setPropertyData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id: propertyId } = useParams("id");

    useEffect(() => {
      async function fetchAuthStatus() {
        if (propertyFlag) {
          const data = await getSingleProperty(propertyId);
          setPropertyData(data.propertyData);
          setIsAuth(data.auth);
          setLoading(false);
        } else {
          const data = await getAllProperties();
          setPropertyData(data.propertyData);
          setIsAuth(data.auth);
          setLoading(false);
        }
      }

      fetchAuthStatus();
    }, []);
    if (!loading) {
      if (!isAuth) {
        return <Navigate to="/unauthorized" />;
      }
      return <Component propertyData={propertyData} />;
    } else {
      return <Loading />;
    }
  };
}

export default AuthCheck;
