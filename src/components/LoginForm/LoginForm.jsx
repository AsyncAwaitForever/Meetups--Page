import React, { useState } from "react";
import FormButton from "../Button/Button";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./loginForm.scss";

const LoginForm = ({ toggleOverlay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });

    const mockEndpoint = 'https://jsonplaceholder.typicode.com/posts';

    try {
      const response = await fetch(mockEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const token = "mock-token-12345"; 
      console.log("Simulated token:", token);
      console.log("Simulated login success with data:", { ...data, token });

      sessionStorage.setItem('token', token);
      alert("Login successfully!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    alert("Token removed!");
  };

  return (
    <div className="loginForm-container">
      <h2>Start Your Journey</h2>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormButton type="submit" text="Login" className="login-button" />
        <FormButton type="button" text="Sign Up" className="overlayToggle-button" onClick={toggleOverlay} />
      </form>
      <button onClick={handleLogout} style={{ marginTop: '10px' }}>
        Remove Token (Logout)
      </button>
    </div>
  );
};

export default LoginForm;
