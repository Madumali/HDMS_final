import React, { usestate } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import emblem from "../components/images/emblem.png";
import nci from "../components/images/nciNew2.png";
import hdms from "../components/images/hdms logo5.png";
import { useStyles } from "../components/BodyStyles";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const Nav1 = () => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElNav2, setAnchorElNav2] = React.useState(null);

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

  return (
    <AppBar position="fixed" className={classes.nav} style={{backgroundColor:"blue",}}>
      <Toolbar>
  
      </Toolbar>
    </AppBar>
  );
};
export default Nav1;
