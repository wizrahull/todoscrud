import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthModule";

export default function Navb() {
  const { authUser, setAuthUser, isLogged, setIslogged } = useAuth();
  const navigate = useNavigate();

  const handlelogout = () => {
    setAuthUser(null);
    setIslogged(false);
    navigate("/login");
  };

  React.useEffect(() => {
    checkauth();
  }, []);

  function checkauth() {
    if (!isLogged) {
      navigate("/login");
    }
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">TODOS</Navbar.Brand>
          <Nav className="me-auto">
            {isLogged ? (
              <>
                <NavLink to="/login" onClick={handlelogout}>
                  Logout
                </NavLink>
                <NavLink to="/homepage" className="mx-2">
                  Homepage
                </NavLink>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </Nav>

          <p className="text-white mx-2"> {authUser ? authUser.name : null}</p>
          <p className="text-white"> {authUser ? authUser.email : null}</p>
        </Container>
      </Navbar>
    </div>
  );
}
