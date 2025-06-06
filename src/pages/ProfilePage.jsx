import { useRef, useContext, useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { AuthContext } from "../Contexts/Auth-Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const nameInputRef = useRef();
  const photoInputRef = useRef();
  const { verifyEmail } = useContext(AuthContext);
  const token = useSelector(state=>state.auth.token);

  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCakUs_qV484dbihixd259CT1ao8wOIIh4`,
          {
            idToken: token,
          }
        );

        if (res.data.users && res.data.users.length > 0) {
          const user = res.data.users[0];
          if (user.displayName) nameInputRef.current.value = user.displayName;
          if (user.photoUrl) photoInputRef.current.value = user.photoUrl;
          setEmailVerified(user.emailVerified);
          toast.success('Previous Data fetched Successfully')
        } else {
         toast.error('Could not fetch profile data');
        }
      } catch (error) {
        console.error("Error fetching Profie", error.message);
      }
    };
    if (token) {
      fetchdata();
    }
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhoto = photoInputRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCakUs_qV484dbihixd259CT1ao8wOIIh4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredPhoto,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      toast.success('Profile updated successfully!')
    } else {
      let errMsg = data.error.message ;
      toast.success(errMsg || 'Error submitting data');
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
            {!emailVerified && (
              <Button variant="warning" onClick={() => verifyEmail()}>
                Verify Email
              </Button>
            )}
            <Button type="submit" className="mt-3">
              Update
            </Button>
            {}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
