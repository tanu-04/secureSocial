import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ChatBot from "./pages/chatbot";
import Login from "./pages/login";
import Register from "./pages/register";
import LandingPage from "./pages/landing";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token")); // Retrieve token from localStorage

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Save token to localStorage
    } else {
      localStorage.removeItem("token"); // Remove token if not present
    }
  }, [token]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatbot" element={<ChatBot token={token} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
