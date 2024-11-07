import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS for styling
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      // Assuming the response contains a status and a role
      if (response.data.status === "success") {
        const { role } = response.data; // Get the role from the response
        localStorage.setItem("employeeRole", role); // Store the role in local storage

        // Navigate to Dashboard based on role
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an Account?</p>
      <Link to="/register">Sign Up</Link>
    </div>
  );
};

export default Login;
