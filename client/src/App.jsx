import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/prop-planner/users/check-session");
        const data = await response.json();
        setIsLoggedIn(data.logged_in);
      } catch (error) {
        console.error("Error checking session:", error);
      }
      setLoading(false);
    })();
  }, []);
  if (!loading) {
    return (
      <Container fluid="md">
        <NavBar isLoggedIn={isLoggedIn} />
        <Outlet />
        <Footer />
      </Container>
    );
  }
}

export default App;
