import { Alert, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProfileBanner = () => {
    const navigate = useNavigate();
    const goTOProfileHandler = ()=>{
        navigate('/profile')
    }
  return (
   <Container>
    <Alert variant='warning' className="d-flex justify-content-between align-items-center">
        <span>Your Profile is incomplete</span>
        <Button onClick={goTOProfileHandler}>Complete Now</Button>
    </Alert>
   </Container>
  )
}

export default ProfileBanner