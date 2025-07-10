import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApi/authApi";
import "../pages/login.css";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginApi, { isLoading, isError }] = useLoginMutation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginApi(formData).unwrap();

      console.log(res, "response  ");
      login(res.jwt, res?.userId); // Save token in context
      navigate("/chat");
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Login to WhatsApp Cloud</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isError && <div className="login-error">Login Unsuccessful</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
