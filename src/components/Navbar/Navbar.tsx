import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
function Navbar() {
  return (
    <div>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Link to="/login">
              {" "}
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/signup">
              {" "}
              <Button color="inherit">SignUp</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <p className="text-3xl font-bold underline">Hello world!</p>
    </div>
  );
}

export default Navbar;
