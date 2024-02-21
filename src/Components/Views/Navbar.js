import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthModule";
import { toast } from "react-toastify";

export default function Navb() {
  const { authUser, setAuthUser, isLogged, setIslogged } = useAuth();
  const navigate = useNavigate();

  const handlelogout = () => {
    setAuthUser(null);
    setIslogged(false);
    navigate("/login");
    localStorage.clear();
    toast("Logged Out");
  };

  React.useEffect(() => {
    checkauth();
  }, [isLogged]);

  function checkauth() {
    if (!isLogged) {
      navigate("/login");
    }
  }

  return (
    <div>
      {isLogged ? (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>
              <NavLink to="/">TODOS </NavLink>
            </Navbar.Brand>
            <Nav className="me-auto">
              <NavLink to="/homepage" className="mx-2">
                Homepage
              </NavLink>
            </Nav>

            <NavLink to="/profile">
              {authUser ? authUser.name : null}{" "}
              {authUser ? authUser.email : null}
            </NavLink>
            <NavLink className="mx-2" to="/login" onClick={handlelogout}>
              Logout
            </NavLink>
          </Container>
        </Navbar>
      ) : null}
    </div>
  );
}
