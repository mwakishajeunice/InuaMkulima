import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import Sidebar from "../utils/Sidebar";
import Topbar from "../utils/Topbar";

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount || 0;
  const referenceNumber = `AGR${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Paper sx={{ padding: 4, textAlign: "center", maxWidth: 400 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Payment Successful
            </Typography>
            <Typography variant="h6">Ref: {referenceNumber}</Typography>
            <Typography>Date: {currentDate}</Typography>
            <Typography sx={{ fontSize: "1.2rem", mt: 1 }}>
              Amount Paid: <strong>KES {totalAmount.toLocaleString()}</strong>
            </Typography>
            <Typography sx={{ mt: 1, fontStyle: "italic" }}>
              Statement: Agrovet product purchase for Name Sample - 071****
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "black" }}
              >
                Download Receipt
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#000", color: "white" }}
                onClick={() => navigate("/reports")}
              >
                Done
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Transaction;
