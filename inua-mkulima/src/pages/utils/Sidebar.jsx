import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Dashboard, Receipt, BarChart } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Summary", path: "/summary" },
    { text: "Transactions", path: "/transactions" },
    { text: "Reports", path: "/reports" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          marginTop: "64px",
          height: "calc(100% - 64px)",
          position: "fixed",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor:
                location.pathname === item.path ? "#0c8f39" : "transparent",
              color: location.pathname === item.path ? "white" : "inherit",
              "&:hover": {
                backgroundColor: "#0c8f39",
                color: "white",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "white" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
