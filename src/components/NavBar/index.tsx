import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import rccLogo from "../../assets/rccLogo.png";

export function NavigationBar() {
  return (
    <Navbar
      variant="light"
      className="mb-3"
      style={{ backgroundColor: "#000" }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <img src={rccLogo} alt="RCC" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
