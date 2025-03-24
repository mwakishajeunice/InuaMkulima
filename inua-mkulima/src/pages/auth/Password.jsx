import {
  Container,
  InputAdornment,
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mkulimaImage from "../../assets/mkulima.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Password = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  if (!username) {
    navigate("/login");
    return null;
  }

  const handleSignIn = async () => {
    if (!password.trim()) {
      setError(true);
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
        mode: "cors",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();
      console.log("Login Successful:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "block" },
              background: `url(${mkulimaImage}) center/cover`,
            }}
          ></Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 4,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              WELCOME TO
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#0c8f39",
                fontWeight: "bold",
                mb: 2,
                textAlign: "left",
              }}
            >
              Inua Mkulima - Subsidy Program
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Enter your password to continue
            </Typography>

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              variant="standard"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#e8b409", color: "white" }}
              endIcon={<ArrowForwardIcon />}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Password;
