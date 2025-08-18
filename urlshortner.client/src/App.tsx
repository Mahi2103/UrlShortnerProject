import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

// Helper to check if user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  return !!token && !!userId;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/shorten");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/shorten" element={<Header />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
