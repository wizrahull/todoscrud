import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../Auth/AuthModule";

export default function Navb() {
  const { authUser, setAuthUser, isLogged, setIslogged } = useAuth();

  const handlelogout = () => {
    setAuthUser(null);
    setIslogged(false);
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">TODOS</Navbar.Brand>
          <Nav className="me-auto">
            {isLogged ? (
              <NavLink onClick={handlelogout}>Logout</NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
            <NavLink to="/homepage" className="mx-2">
              Homepage
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
