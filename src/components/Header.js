import React from "react";
// import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
// import logo from "../img/TIME_WHITE_.gif";

function Header() {
  return (
    <>
      <Navbar className="p-1" bg="primary" variant="dark">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand className="m-0 text-center p-0" href="#home">
            Charge Station Finder
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
