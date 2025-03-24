import { Container, Box, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import mkulimaImage from "../../assets/mkulima.png";
import loginImage from "../../assets/floral.png";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!username.trim()) {
      setError(true);
      return;
    }
    navigate("/password", { state: { username } });
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
              textAlign: "center",
              background: `url(${loginImage}) center/cover`,
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
              Enter your username to continue
            </Typography>

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              variant="standard"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              error={error}
              helperText={error ? "Username is required" : ""}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#e8b409", color: "white" }}
              endIcon={<ArrowForwardIcon />}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
