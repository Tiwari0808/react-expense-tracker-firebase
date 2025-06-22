import { useRef, useContext, useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { AuthContext } from "../Contexts/Auth-Context";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateProfile } from "../store/profileSlice";
import './profilePage.css'
const ProfilePage = ({}) => {
  const nameInputRef = useRef();
  const photoInputRef = useRef();
  const emailRef = useRef();
  const { verifyEmail } = useContext(AuthContext);
  const token = useSelector((state) => state.auth.token);
  const [emailInfo, setEmailInfo] = useState("Email not verified! Please verify");
  const dispatch = useDispatch();
  const { name, email, photoUrl, emailVerified, loading, error } = useSelector(
    (state) => state.profile
  );

  const verifyEmailHandler = () => {
    verifyEmail();
    toast.info("Verification Email Sent");
  };


  useEffect(() => {
    if (token) {
      dispatch(fetchData(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (nameInputRef.current && name) {
      nameInputRef.current.value = name;
    }
    if (photoInputRef.current && photoUrl) {
      photoInputRef.current.value = photoUrl;
    }
  }, [name, photoUrl]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhoto = photoInputRef.current.value;

    dispatch(
      updateProfile({ name: enteredName, token, photoUrl: enteredPhoto })
    )
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        toast.error(err || "Failed to update profile");
      });
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Complete Your Profile</Card.Title>
          <img id="profileImg" src={`${photoUrl}`} alt="Profile Image" />
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" ref={nameInputRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Photo URL</Form.Label>
              <Form.Control type="text" ref={photoInputRef} required />
            </Form.Group>
            {!emailVerified && <p className="text-danger">{emailInfo}</p>}
            
            {emailVerified ? 
              
              <p className="text-success">Your Email is {email} . Email Verified</p>
              : <p className="text-danger">Your Email {email} not verified! Verify now</p>
            }
            {!emailVerified && (
              <Button variant="warning" onClick={() => verifyEmailHandler()}>
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
