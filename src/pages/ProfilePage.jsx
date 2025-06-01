import React, { useRef, useContext } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { AuthContext } from '../Contexts/Auth-Context';

const ProfilePage = () => {
  const nameInputRef = useRef();
  const photoInputRef = useRef();
  const { token } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhoto = photoInputRef.current.value;

    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCakUs_qV484dbihixd259CT1ao8wOIIh4',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredPhoto,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert('Profile updated successfully!');
    } else {
      alert(data.error.message || 'Update failed');
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Complete Your Profile</Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" ref={nameInputRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Photo URL</Form.Label>
              <Form.Control type="text" ref={photoInputRef} required />
            </Form.Group>
            <Button type="submit" className="mt-3">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
