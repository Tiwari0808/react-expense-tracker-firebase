import React, { useContext, useState } from 'react'
import SignUp from './components/SignUp'
import MainNavbar from './components/MainNavbar'
import ProfileBanner from './components/ProfileBanner'
import { Route, Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import { AuthContext } from './Contexts/Auth-Context'
import AboutPage from './pages/AboutPage'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <>
    <MainNavbar/>
    {isLoggedIn && <ProfileBanner/>}
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      {isLoggedIn&&<Route path='/profile' element={<ProfilePage/>}/>}
      {!isLoggedIn&&<Route path='/signUp' element={<SignUp/>}/>}
      {isLoggedIn&&<Route path='/about' element={<AboutPage/>}/>}
      <Route path='*' element={<ErrorPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
