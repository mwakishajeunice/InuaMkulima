import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Sidebar from "../utils/Sidebar";
import Topbar from "../utils/Topbar";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Order Summary
          </Typography>

          {cart.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#0c8f39" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Product Name
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Price (KES)
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.price.toLocaleString()}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No products in the cart.
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              sx={{
                backgroundColor: "#e1b406",
                color: "white",
                "&:hover": { backgroundColor: "#d1a205" },
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              sx={{
                backgroundColor: "#000000",
                color: "white",
                "&:hover": { backgroundColor: "#333333" },
              }}
              onClick={() => {
                localStorage.setItem("cart", JSON.stringify(cart));
                navigate("/transactions", { state: { totalAmount } });
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
