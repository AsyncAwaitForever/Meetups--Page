import React, { useState } from "react";
import FormButton from "../Button/Button";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./signUpForm.scss";


const SignUpForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signup:", { email, password, username });
      };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
     
   
    
  return (
   <div className="signup-container">

    <h2>Become A Member</h2>

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
        <TextField
          label="Username"
          type="text"
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
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormButton type="button" text="Signup" className="login-button" onClick={handleSignup} />
        
      </form>
   </div> 
  )
}

export default SignUpForm