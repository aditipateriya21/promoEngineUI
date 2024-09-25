
import React from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton,Menu,MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const logoSrc='/nextuplelogo.png'

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleClick}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
                    >
                        <img src={logoSrc} alt="logo" style={{ height: 40, marginRight: 650 }} />
                        PromoEngine
                    </Typography>
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={Link} to="/create-rule" onClick={handleClose}>
                    Create Rule
                </MenuItem>
                <MenuItem component={Link} to="/order-explainer" onClick={handleClose}>
                    Order Explainer
                </MenuItem>
                <MenuItem component={Link} to="/evaluate-order" onClick={handleClose}>
                    Evaluate Order
                </MenuItem>
            </Menu>
        </>
    );
}

export default Header;
