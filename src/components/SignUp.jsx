import React from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'

const SignUp = () => {
  return (
    <Container className='mt-5'>
        <Row>
            <Col lg={6}>
               <Card>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Form>
                        <Form.Group controlId='emailInput'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='passwordInput'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password'></Form.Control>
                        </Form.Group>
                         <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm Password'></Form.Control>
                        </Form.Group>
                    </Form>
                </Card.Body>
               </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default SignUp