import SignUp from './components/SignUp'
import MainNavbar from './components/MainNavbar'
import ProfileBanner from './components/ProfileBanner'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import ErrorPage from './pages/ErrorPage'
import ForgotPassword from './pages/ForgotPassword'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux'

const App = () => {
 const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

  return (
    <>
    <MainNavbar/>
    {isLoggedIn && <ProfileBanner/>}
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      {isLoggedIn&&<Route path='/profile' element={<ProfilePage/>}/>}
      {!isLoggedIn&&<Route path='/signUp' element={<SignUp/>}/>}
      {isLoggedIn&&<Route path='/about' element={<AboutPage/>}/>}
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='*' element={<ErrorPage/>}></Route>
    </Routes>
    <ToastContainer position="top-right" autoClose={3000}/>
    </>
  )
}

export default App
