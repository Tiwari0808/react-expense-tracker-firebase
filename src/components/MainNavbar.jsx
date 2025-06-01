import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { AuthContext } from '../Contexts/Auth-Context'

const MainNavbar = () => {
   const {isLoggedIn} = useContext(AuthContext)
  return (
    <Navbar expand="lg">
        <Container>
            <Navbar.Brand>Expense-Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls='main-navbar'/>
            <Navbar.Collapse id='main-navbar'>
                <Nav>
                    {isLoggedIn&&<Nav.Link>Home</Nav.Link>}
                    <Nav.Link>{isLoggedIn?'Logout':'Login'}</Nav.Link>
                    {isLoggedIn&&<Nav.Link>About</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default MainNavbar