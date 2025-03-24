import { useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#0c8f39" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => setActiveTab("Dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => setActiveTab("Transactions")}>
            Transactions
          </Button>
          <Button color="inherit" onClick={() => setActiveTab("Reports")}>
            Reports
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

export default Dashboard;
