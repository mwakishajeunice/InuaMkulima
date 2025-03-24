import { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import Sidebar from "../utils/Sidebar";
import Topbar from "../utils/Topbar";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        const filteredProducts = data.products.filter((product) =>
          product.category.includes("groceries")
        );

        setProducts(filteredProducts);
        setTotalBalance(
          filteredProducts.reduce((sum, product) => sum + product.price, 0)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, total: product.price }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={sxStyles.sectionTitle}>
            Products
          </Typography>
          <Typography variant="h5" sx={sxStyles.sectionSubtitle}>
            Product Details
          </Typography>
          <Typography variant="body1" sx={sxStyles.walletText}>
            Inua mkulima wallet is{" "}
            <strong>KES {totalBalance.toLocaleString()}</strong>
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Box sx={sxStyles.card}>
              <Typography variant="h6" sx={sxStyles.cardTitle}>
                Available Products
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={sxStyles.tableHeader}>
                      <TableCell sx={sxStyles.headerText}>
                        Product Name
                      </TableCell>
                      <TableCell sx={sxStyles.headerText}>
                        Price (KES)
                      </TableCell>
                      <TableCell sx={sxStyles.headerText}>Add</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>
                            {product.price.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => addToCart(product)}
                              sx={sxStyles.addButton}
                            >
                              <AddIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} sx={sxStyles.emptyText}>
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={sxStyles.card}>
              <Typography variant="h6" sx={sxStyles.cardTitle}>
                Selected Products
              </Typography>
              {cart.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={sxStyles.tableHeader}>
                        <TableCell sx={sxStyles.headerText}>Product</TableCell>
                        <TableCell sx={sxStyles.headerText}>Qty</TableCell>
                        <TableCell sx={sxStyles.headerText}>Price</TableCell>
                        <TableCell sx={sxStyles.headerText}>Total</TableCell>
                        <TableCell sx={sxStyles.headerText}>Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price.toLocaleString()}</TableCell>
                          <TableCell>{item.total.toLocaleString()}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => removeFromCart(item.id)}
                              sx={sxStyles.removeButton}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" sx={sxStyles.emptyText}>
                  Your cart is empty.
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={sxStyles.backButton}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              sx={sxStyles.totalButton}
              onClick={() => navigate("/summary", { state: { cart } })}
              disabled={cart.length === 0}
            >
              Deduct {totalCartAmount.toLocaleString()} KES
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const sxStyles = {
  sectionTitle: { fontWeight: "bold", mb: 2 },
  sectionSubtitle: { fontWeight: "bold", mb: 2 },
  walletText: { mb: 3, fontSize: "1.2rem" },
  card: {
    flex: 1,
    padding: 2,
    backgroundColor: "#ffffff",
    boxShadow: "0px 3px 6px #00000029",
    border: "1px solid #DDDDDD",
    borderRadius: "8px",
    height: "450px",
    overflow: "auto",
  },
  cardTitle: { fontWeight: "bold", mb: 2 },
  tableHeader: { backgroundColor: "#0c8f39" },
  headerText: { color: "white", fontWeight: "bold" },
  addButton: { color: "#0c8f39" },
  removeButton: { color: "red" },
  emptyText: { textAlign: "center", mt: 2 },
  backButton: {
    backgroundColor: "#e1b406",
    color: "white",
    "&:hover": { backgroundColor: "#d1a205" },
  },
  totalButton: {
    backgroundColor: "#000000",
    color: "white",
    "&:hover": { backgroundColor: "#333333" },
    padding: "10px 20px",
    fontSize: "1rem",
  },
};

export default Dashboard;
