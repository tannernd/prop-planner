import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkLogin } from "../../js/login";

function loggedInRedirect(Component) {
  return function (props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      async function fetchLoginStatus() {
        const loggedIn = await checkLogin();
        setIsLoggedIn(loggedIn);
      }

      fetchLoginStatus();
    }, []);

    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return <Component {...props} />;
  };
}

export default loggedInRedirect;
