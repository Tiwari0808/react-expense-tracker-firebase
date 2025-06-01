import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
    
  return (
    <div>
        <h3>Something went wrong</h3>
        <Button onClick={()=>navigate('/signUp')}>Go to Login Page</Button>
    </div>
  )
}

export default ErrorPage