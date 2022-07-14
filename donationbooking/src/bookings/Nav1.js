import React, { usestate } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useStyles } from "../components/BodyStyles";

const Nav1 = () => {
  const classes = useStyles();


  return (
    <AppBar position="fixed" className={classes.nav} style={{backgroundColor:"blue",}}>
      <Toolbar>
  
      </Toolbar>
    </AppBar>
  );
};
export default Nav1;
