// src/pages/Signup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../api/authApi/authApi";
import "../pages/signup.css"
const Signup = () => {
  const navigate = useNavigate();
  const [signup, { isLoading, isError }] = useSignupMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData).unwrap();
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
  <div className="signup-container">
  <div className="signup-box">
    <h2 className="signup-title">Create Account</h2>
    <form onSubmit={handleSubmit} className="signup-form">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Sign Up"}
      </button>
      {isError && <p className="error-message">Sign up failed.</p>}
    </form>
  </div>
</div>

  );
};

export default Signup;
