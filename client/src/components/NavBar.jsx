import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import logout from "../js/logout";

const NavBar = (props) => {
  const isLoggedIn = props.isLoggedIn;
  return (
    <>
      <Nav>
        <Nav.Item className="p-2">
          <Nav.Link href="/" className="logo">
            <img className="nav-logo" src="/images/logo.png" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <h4 className="p-3">Property Planner</h4>
        </Nav.Item>
        {!isLoggedIn ? (
          <>
            <Nav.Item className="p-2 ms-auto">
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item className="p-2">
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item className="p-2 ms-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item className="p-2">
              <Nav.Link href="/login" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </>
  );
};

export default NavBar;
