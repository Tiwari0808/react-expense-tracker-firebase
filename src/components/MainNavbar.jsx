import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const MainNavbar = () => {
  return (
    <Navbar expand="lg">
        <Container>
            <Navbar.Brand>Expense-Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls='main-navbar'/>
            <Navbar.Collapse id='main-navbar'>
                <Nav>
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Login</Nav.Link>
                    <Nav.Link>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default MainNavbar