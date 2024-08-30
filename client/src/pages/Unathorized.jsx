import { Link } from "react-router-dom";
const Unauthorized = (props) => {
  return (
    <>
      <h1>You are not authorized for this page.</h1>
      <p>
        Please <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default Unauthorized;
