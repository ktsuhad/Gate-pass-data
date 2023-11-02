// Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { setToken } = useAuth(); // Use the AuthContext
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setToken(null);
    handleProfileMenuClose();
    // Redirect to the login page or any other desired location
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Gate pass
        </Typography>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton
            color="inherit"
            aria-label="profile"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleIcon fontSize='large'/>
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
