import React, { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const isLoginHandler = () => {
    setIsLogin(!isLogin);
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      if (passwordInputRef.current.value !== confirmPasswordRef.current.value) {
        alert("password did not match");
        return;
      }
    }
    if (isLogin) {
    } else {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCakUs_qV484dbihixd259CT1ao8wOIIh4",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailInputRef.current.value,
              password: passwordInputRef.current.value,
              returnSecureToken: true,
            }),
          }
        );
        const data = await res.json();
        console.log('login successful',data); 
      } catch (error) {console.log(error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>{isLogin ? "Login" : "Sign Up"}</Card.Title>
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
                <Button className="mt-3" type="submit">
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
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
