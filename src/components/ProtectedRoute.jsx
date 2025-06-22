import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../store/utils';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  if (isLoggedIn && isTokenValid()) {
    return children;
  } else {
    return <Navigate to="/signUp" replace />;
  }
};

export default ProtectedRoute;