import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { getuserIdFromToken, isTokenValid } from "./store/utils";
import { Button, Spinner } from "react-bootstrap";
import { authActions } from "./store/authSlice";
import { fetchData } from "./store/profileSlice";
import MyVerticallyCenteredModal from "./components/AddExpense";
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const SignUp = lazy(() => import("./components/SignUp"));
const MainNavbar = lazy(() => import("./components/MainNavbar"));
const ProfileBanner = lazy(() => import("./components/ProfileBanner"));
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token);
  const storedToken=localStorage.getItem('token');

  useEffect(() => {
    if (!isTokenValid() && isLoggedIn) {
      dispatch(authActions.logout());
    }
  }, [isLoggedIn]);

useEffect(() => {
  const interval = setInterval(() => {
    const storedToken = localStorage.getItem("token");
    if (token !== storedToken) {
      dispatch(authActions.logout());
    }
  }, 1000);

  return () => clearInterval(interval);
}, [token, dispatch]);


  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <MainNavbar />
      {isLoggedIn && !emailVerified && <ProfileBanner />}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/profilePage" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
