// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import LoginPage from "./screens/LoginScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./components/UserHead.jsx";
import Profile from "./screens/Profile.jsx";
//admin
import AdminLogin from "./screens/admin/AdminLogin.jsx";
import AdminHome from "./screens/admin/AdminHome.jsx";
// import AdminHeader from "./components/admin/AdminHeader.jsx";
import PrivateRouteAdmin from "./components/AdminPrivateRoute.jsx";
import AdminAddUser from "./screens/admin/AdminAddUser.jsx";
import AdminEditProfil from "./screens/admin/AdminEditProfile.jsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/editProfile" element={<ProfileScreen />} />
          </Route>
        </Route>
      </Routes>
      <Routes>
      
        <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/admin/dashboard"  element={<AdminHome />} />
            <Route path="/admin/dashboard/adduser"  element={<AdminAddUser />} />
            <Route path="/admin/dashboard/edit-user"  element={<AdminEditProfil />} />

        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
