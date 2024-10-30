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

    const endpoint = 'https://uw8qzn03l8.execute-api.eu-north-1.amazonaws.com/login';

    try {
      const response = await fetch(endpoint, {
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
      console.log("Response data:", data);

      if (data.success && data.token) {
        sessionStorage.setItem('token', data.token);
        console.log("Token saved in session storage.");
        alert("Login successful!");
      } else {
        throw new Error("Login failed: invalid response data.");
      }
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
