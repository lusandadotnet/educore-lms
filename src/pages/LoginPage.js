import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Simulate backend login
    try {
      // Replace with actual API call
      // const response = await fetch('/api/login', { ... })
      // const data = await response.json();
      // Example mock response:
      let role = "student";
      if (email.includes("admin")) role = "admin"; // @nkosi just to make app tests
      
      else if (email.includes("")) role = "lecturer";
      else if (email.includes("S229036821")) role = "student";
      // Redirect based on role
      if (role === "admin") navigate("/admin");
      else if (role === "lecturer") navigate("/lecturer");
      else if (role === "student") navigate("/student");
      else setError("Invalid role");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <img
            src="/images/educore-logo.png"
            alt="Educore College Logo"
            className="mb-3"
            style={{ maxWidth: "200px", height: "auto" }}
          />
          <h3 className="text-primary">Educore College - Online</h3>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-end">
            <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
