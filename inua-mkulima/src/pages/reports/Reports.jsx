import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Sidebar from "../utils/Sidebar";
import Topbar from "../utils/Topbar";

const Reports = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  const transactionDetails = {
    date: "2025-03-24",
    reference: "TXN123456789",
    wallet: "Inua Mkulima Wallet",
    farmerName: "John Doe / FM12345",
    farmerPhone: "0712******",
    agroDealer: "Green Agrovet",
    merchantId: "MCH987654",
    merchantPhone: "0722******",
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box sx={{ padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#016527",
              color: "white",
              padding: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", width: "30%" }}>
              Transaction Receipt
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <img
                src="../../assets/kenya.png"
                alt="Kenya"
                style={{ height: 40 }}
              />
              <img
                src="../../assets/bank.png"
                alt="Bank"
                style={{ height: 40 }}
              />
            </Box>
          </Box>

          <Divider sx={{ marginY: 2, backgroundColor: "#016527", height: 2 }} />

          <Box sx={{ backgroundColor: "#f5f5f5", padding: 3, borderRadius: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <Typography>
                <strong>Date:</strong> {transactionDetails.date}
              </Typography>
              <Typography>
                <strong>Reference Number:</strong>{" "}
                {transactionDetails.reference}
              </Typography>
              <Typography>
                <strong>Wallet:</strong> {transactionDetails.wallet}
              </Typography>
              <Typography>
                <strong>Farmer Name/ID:</strong> {transactionDetails.farmerName}
              </Typography>
              <Typography>
                <strong>Farmer Phone No:</strong>{" "}
                {transactionDetails.farmerPhone}
              </Typography>
              <Typography>
                <strong>Agro-Dealer Name:</strong>{" "}
                {transactionDetails.agroDealer}
              </Typography>
              <Typography>
                <strong>Merchant ID:</strong> {transactionDetails.merchantId}
              </Typography>
              <Typography>
                <strong>Merchant Phone:</strong>{" "}
                {transactionDetails.merchantPhone}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#016527" }}>
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
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.price.toLocaleString()}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                        No transactions available.
                      </TableCell>
                    </TableRow>
                  )}
                  {cart.length > 0 && (
                    <TableRow sx={{ backgroundColor: "#016527" }}>
                      <TableCell colSpan={2}></TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Total Amount
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {totalAmount.toLocaleString()} KES
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
