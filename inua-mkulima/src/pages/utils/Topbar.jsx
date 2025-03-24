import { useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

const Topbar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#202d01", zIndex: 1201 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Logged in As:
          </Typography>
          <Button color="inherit" onClick={() => setActiveTab("Dashboard")}>
            Emilys
          </Button>
          <Button color="inherit" onClick={() => setActiveTab("Transactions")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {activeTab === "Dashboard" && (
          <Typography variant="h5">Welcome to the Dashboard</Typography>
        )}
        {activeTab === "Transactions" && (
          <Typography variant="h5">Transaction Details</Typography>
        )}
        {activeTab === "Reports" && (
          <Typography variant="h5">Reports Overview</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
