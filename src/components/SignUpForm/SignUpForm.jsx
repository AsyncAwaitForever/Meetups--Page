import React, { useState } from "react";
import FormButton from "../Button/Button";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./signUpForm.scss";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    const endpoint = "https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/signup"; 

    if (isValid) {
      try {

       
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        });

        if (!response.ok) {
          throw new Error("Signup failed");
        }

        const data = await response.json();
        console.log("Signup successful:", data);
        setSuccessMessage("Signup successful!"); 
      } catch (error) {
        console.error("Error during signup:", error);
        setErrors((prev) => ({ ...prev, server: error.message })); 
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
      // Username validation
    if (username.length < 3 || username.length > 15) {
      newErrors.username = "Username must be between 3 and 15 characters";
    }
    // Password validation
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*]/;
    if (password.length < 6 || !hasNumber.test(password) || !hasSpecialChar.test(password)) {
      newErrors.password = "Password must be at least 6 characters long, contain a number, and a special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <h2>Become A Member</h2>
      {successMessage && <p className="success-message">{successMessage}</p>} 

      <form onSubmit={handleSignup}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "blue",
              backgroundColor: "#A1AFFB",
              transform: "translate(10px, -16px)",
              padding: "2px",
              fontSize: "14px",
              borderRadius: "4px",
            },
          }}
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" })); 
          }}
          required
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Username"
          type="text"
          variant="outlined"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "blue",
              backgroundColor: "#A1AFFB",
              transform: "translate(10px, -16px)",
              padding: "2px",
              fontSize: "14px",
              borderRadius: "4px",
            },
          }}
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: "" })); 
          }}
          required
          error={Boolean(errors.username)}
          helperText={errors.username}
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
              padding: "2px",
              fontSize: "16px",
              borderRadius: "4px",
            },
          }}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" })); 
          }}
          required
          error={Boolean(errors.password)}
          helperText={errors.password}
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
        {errors.server && <p className="error-message">{errors.server}</p>} 
        <FormButton type="submit" text="Signup" className="login-button" />
      </form>
    </div>
  );
};

export default SignUpForm;
