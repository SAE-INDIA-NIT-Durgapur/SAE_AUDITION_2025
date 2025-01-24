import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ThreeDScene from "./components/ThreeDScene";
import HomePage from "./pages/HomePage";

import About from "./pages/About";
import RegisterPage from "./pages/RegisterPage";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import GoogleAuth from "./pages/GoogleAuth";

import LandingLayout from "./Layouts/LandingLayout";
import MainLayout from "./Layouts/MainLayout";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Formsubmitted from "./pages/FormSubmitted/Formsubmitted";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LandingLayout>
              <GoogleAuth />
            </LandingLayout>
          }
        />

        <Route
          path="/home"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/aboutSae"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          }
        />
        <Route
          path="/adminLogin"
          element={
            <MainLayout>
              <AdminLogin />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/formSubmitted"
          element={
            <MainLayout>
              <Formsubmitted />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
