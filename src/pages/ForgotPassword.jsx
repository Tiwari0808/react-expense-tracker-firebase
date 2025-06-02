import axios from "axios";
import React, { useRef, useState } from "react";
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
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        let res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCakUs_qV484dbihixd259CT1ao8wOIIh4',{
            requestType:'PASSWORD_RESET',
            email:emailInputRef.current.value
        })
        setIsLoading(false)
        if(res.status === 200){
            toast.success('Password reset link sent Successfully')
            setTimeout(() => navigate("/signUp"), 3000)
             emailInputRef.current.value = '';
        }
    } catch (error) {
         setIsLoading(false);
          emailInputRef.current.value = '';
        toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="passwordReset">
                  <Form.Label className="mb-2">
                    Enter the email with which you have registerd.
                  </Form.Label>
                  <Form.Control
                    placeholder="email"
                    ref={emailInputRef} required></Form.Control>
                </Form.Group>
                <Button className="mt-3" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="me-2" size="sm" /> Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </Form>
              {!isLoading&&<a
                className="cursor-pointer text-decoration-none mt-2"
                onClick={() => navigate("/signUp")}
                style={{ cursor: "pointer" }}>
                Already a user? Login
              </a>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
