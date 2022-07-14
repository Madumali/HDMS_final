import React, { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useStyles } from "../components/BodyStyles";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import mypic from "../components/Header/Navtabs/mypic.jpg";









const Nav2 = ({handleDrawerToggle}) => {

  const classes = useStyles();
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElNav2, setAnchorElNav2] = React.useState(null);
   const [opens, setOpen] = useState(false);
  const [auth, setAuth] = useState(false)
  const anchorRef = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenu2 = () => {
    setAnchorElNav2(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenNavMenu2 = (event) => {
    setAnchorElNav2(event.currentTarget);
  };

  const donor = localStorage.getItem("Dname");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout= () => {
    localStorage.clear();
    history.push('/bookings/main');
  }
 

  return (
    <Box flexDirection="column" sx={{ flexGrow: 1 }}> 
    <AppBar position="fixed" className={classes.navHome} style={{backgroundColor:"#E0F7FA95",}}>
      <Toolbar variant="dense">
         
       <>

<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <ListRoundedIcon style={{color:"black"}} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Link
                to="/bookings/home"
                style={{ textDecoration: "none", color: "#616161",marginTop:-10 }}
              >
                <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600}}>
                  <HomeIcon />
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem   onClick={handleOpenNavMenu2} style={{ marginTop:-10}}>
              
          <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600, color: "#616161"}} > Donate Us <ArrowRightIcon className={classes.arrow}/> 
          </Typography>
          {/* </IconButton> */}

              <Menu
            id="menu-appbar2"
            anchorEl={anchorElNav2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={Boolean(anchorElNav2)}
            onClose={handleCloseNavMenu2}
            sx={{
              display: { xs: "block",sm:"block", md: "none" },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu2}>
            <Link to="/bookings/donate" style={{ textDecoration: "none", color: "#616161", paddingTop:0 }}>
                <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600}}>
                  How To Donate
                </Typography>
              </Link>
            </MenuItem>
           
            </Menu>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} style={{ marginTop:-10}}>
            <Link to="/bookings/main" target={"_blank"}  style={{ textDecoration: "none", color: "#616161" }}>
          <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600}}>Sign In</Typography>
        </Link>
        </MenuItem>
          </Menu>
        </Box>





        <Link to="/bookings/home" className={classes.home} style={{fontFamily:"Times New Roman", fontWeight:600,marginTop:-5 }}>
          <Typography variant="h6">
            <HomeIcon  style={{color:"black" }}/> 
          </Typography>
        </Link>
        <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar2"
            aria-haspopup="true"
            onClick={handleOpenNavMenu2}
            // onMouseOver = {handleOpenNavMenu2}
            onMouseMove={handleOpenNavMenu2}
            color="inherit"
          >
       
          <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600, color:"black"}}>| Donate Us |</Typography>
          </IconButton>
          <Menu
            id="menu-appbar2"
            anchorEl={anchorElNav2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNav2)}
            onClose={handleCloseNavMenu2}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu2}>
            <Link to="/bookings/donate" style={{ textDecoration: "none", color: "#616161", paddingTop:0 }}>
                <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600}}>
                  How To Donate
                </Typography>
              </Link>
            </MenuItem>
            </Menu>
      
        <Link to="/bookings/main" target={"_blank"} className={classes.signin}>
          <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600, color:"black"}}>Sign In</Typography>
        </Link>
        </>
     


      </Toolbar>
    </AppBar>
    </Box>
  );
};
export default Nav2;
