import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import "./mainNavbar.css";
import { FaMoneyBillTransfer, FaMoon, FaSun } from "react-icons/fa6";
import { themeActions } from "../store/themeSlice";

const MainNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const isPremiumActive = useSelector(
    (state) => state.expenses.isPremiumActive
  );
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const { name, photoUrl } = useSelector((state) => state.profile);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/signUp");
  };

  return (
    <Navbar
      expand="lg"
      className={isDarkTheme ? "bg-dark navbar-dark" : "bg-light navbar-light"}>
      <Container className="our container-fluid">
        <Navbar.Brand className="brand-div">
          <FaMoneyBillTransfer id="brand-icon" /> Expense Tracker
          {isPremiumActive && <span className="badge bg-success">Premium</span>}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="second-nav">
            {isLoggedIn && (
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to={"/signUp"}>
                Login
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to={"/about"}>
                About
              </Nav.Link>
            )}
            {isLoggedIn && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}

            {isLoggedIn && (
              <span
                id="theme-icon"
                onClick={() => dispatch(themeActions.toggleTheme())}>
                {isDarkTheme ? <FaSun /> : <FaMoon />}
              </span>
            )}
           
            {isLoggedIn && (
              <Nav.Link as={Link} to={"/profilePage"}>
                <div id="user" >
                <img
                  id="navProfileImg"
                  src={`${photoUrl}`}
                  alt="Profile Image"
                />
                {name}
              </div>
              </Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
