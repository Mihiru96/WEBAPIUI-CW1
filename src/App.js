import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { SnackbarProvider } from "notistack";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Login from "./Components/Pages/Login";
import Home from "./Components/Pages/Home"
import ForgotPassword from "./Components/Pages/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Flights from "./Components/Pages/Flights";
import Hotels from "./Components/Pages/Hotels";
import Packages from "./Components/Pages/Packages";
import AuthContext from "./Store/AuthManager";
import BookFlight from "./Components/Pages/BookFlight";

let theme = createTheme({});
theme = responsiveFontSizes(theme);

function App() {
  const authCtx = useContext(AuthContext);

  return (

    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
        domRoot={document.getElementById("notification")}
      >
        <Routes>
          <Route
            path="/"
            element={
              !authCtx.isLoggedIn ? <Login /> : <Home />}
          />
          <Route
            path="/forgotPassword"
            element={<ForgotPassword />}
          />
          <Route
            path="/resetPassword"
            element={<ResetPassword />}
          />
          <Route
            path="/flights"
            element={!authCtx.isLoggedIn || authCtx.userRole != "Backoffice Staff" ? <Login /> : <Flights />}
          />
          <Route
            path="/hotels"
            element={!authCtx.isLoggedIn || authCtx.userRole != "Backoffice Staff" ? <Login /> : <Hotels />}
          />
          <Route
            path="/packages"
            element={!authCtx.isLoggedIn || authCtx.userRole != "Backoffice Staff" ? <Login /> : <Packages />}
          />
          <Route
            path="/bookflight"
            element={!authCtx.isLoggedIn || authCtx.userRole != "Backoffice Staff" ? <Login /> : <BookFlight />}
          />
             <Route
            path="/bookPackage"
            element={!authCtx.isLoggedIn || authCtx.userRole != "Backoffice Staff" ? <Login /> : <BookPackage />}
          />
            <Route

            path="/Home"
            element={
              authCtx.isLoggedIn ? <Home /> : <Navigate to="/" />
            }
          />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;