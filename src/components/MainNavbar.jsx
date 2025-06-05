import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

const MainNavbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const isPremium = useSelector(state => state.expenses.isPremium);
  const navigate = useNavigate()
  const isPremiumActive = useSelector(state => state.expenses.isPremiumActive);
   const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const logoutHandler = ()=>{
    dispatch(authActions.logout())
    navigate('/signUp')
  }
  return (
    <Navbar expand="lg"  className={isDarkTheme ? 'bg-dark navbar-dark' : 'bg-light navbar-light'}>
      <Container>
        <Navbar.Brand>Expense-Tracker {isPremiumActive && <span className="badge bg-success">Premium</span>}</Navbar.Brand>
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
