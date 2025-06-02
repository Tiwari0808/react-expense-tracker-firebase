import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AuthContext } from "../Contexts/Auth-Context";
import { Link, useNavigate } from "react-router-dom";

const MainNavbar = () => {
  const { isLoggedIn, logout} = useContext(AuthContext);
  const navigate = useNavigate()
  const logoutHandler = ()=>{
    logout();
    navigate('/signUp')
  }
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>Expense-Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            {isLoggedIn && <Nav.Link as={Link} to={'/'}>Home</Nav.Link>}
            {!isLoggedIn&&<Nav.Link as={Link} to={'/signUp'}>Login</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={'/about'}>About</Nav.Link>}
            {isLoggedIn && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
