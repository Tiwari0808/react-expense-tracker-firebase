import { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { toast } from "react-toastify";
import './signup.css'

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const isLoginHandler = () => {
    setIsLogin(!isLogin);
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrMsg(null);
    setSuccessMsg(null);
    if (!isLogin) {
      if (passwordInputRef.current.value !== confirmPasswordRef.current.value) {
        setErrMsg("Password did not match");
        return;
      }
    }

    setIsLoading(true);
    let url;
    const api_key = import.meta.env.VITE_FIREBASE_API_KEY;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          returnSecureToken: true,
        }),
      });
      setIsLoading(false);
      const data = await res.json();
      

      if (!res.ok) {
        setErrMsg(data.error.message || "Error Occured");
        return;
      } else {
        dispatch(authActions.login(data.idToken));
        navigate("/");
        toast.success("Logged in Successfully");
        setSuccessMsg(isLogin ? "Login Successful!" : "Sign Up Successful!");
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        if (!isLogin) {
          confirmPasswordRef.current.value = "";
        }

        if (!isLogin) {
          setIsLogin(true);
          setSuccessMsg((prev) => prev + " Login Now");
        }
      }
    } catch (error) {
      setIsLoading(false);
      setErrMsg("Something Went Wrong");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>{isLogin ? "Login" : "Sign Up"}</Card.Title>
              {errMsg && <p className="text-danger">{errMsg}</p>}
              {successMsg && <p className="text-success">{successMsg}</p>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="emailInput">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    ref={emailInputRef}
                    required></Form.Control>
                </Form.Group>
                <Form.Group controlId="passwordInput">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    ref={passwordInputRef}
                    required></Form.Control>
                </Form.Group>
                {!isLogin && (
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      ref={confirmPasswordRef}
                      required></Form.Control>
                  </Form.Group>
                )}
                {!isLoading ? (
                  <Button className="mt-3 p-2" type="submit">
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                ) : (
                  <Button className="mt-3 p-2" type="submit" disabled={isLoading}>
                     <Spinner className="mx-2" animation="border" size="sm"/>
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                )}
                <br></br>
                {isLogin && (
                  <a
                    onClick={() => navigate("/forgotPassword")}
                    className="mt-2">
                    Forgot Password?
                  </a>
                )}
              </Form>
            </Card.Body>
          </Card>
          <Button
            variant="secondary"
            className="w-50 mt-3"
            onClick={isLoginHandler}>
            {isLogin
              ? "Do not have an account? Sign Up"
              : "Already have an Account? Login"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
