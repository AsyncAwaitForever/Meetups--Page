import React, { useState } from "react";
import FormButton from "../Button/Button";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./loginForm.scss";

const LoginForm = ({ toggleOverlay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="loginForm-container">
      <h2>Start Your Journey</h2>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "blue",
              backgroundColor: "#A1AFFB", 
              transform: "translate(10px, -16px)",  
                padding:"2px",
                fontSize:"14px",
                borderRadius:"4px"
            },
          }}
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
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "blue",
              backgroundColor: "#A1AFFB", 
              transform: "translate(10px, -16px)", 
                padding:"2px",
                fontSize:"16px",
                borderRadius:"4px"
            },
          }}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormButton type="button" text="Login" className="login-button" onClick={handleLogin} />
        <FormButton type="button" text="Sign Up" className="overlayToggle-button" onClick={toggleOverlay} />
      </form>
    </div>
  );
};

export default LoginForm;
