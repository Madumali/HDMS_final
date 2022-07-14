import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";

import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MyBreadcrumb from "./MyBreadcrumb";
// import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
  root:{
    display:'flex',
  },
  appBar:{
    zIndex:theme.zIndex.drawer + 1,
  },
}));
export default function MAppBar() {
  const classes = useStyles();

  let user = localStorage.getItem("name");

  const drawerWidth = 240;
  const history = useHistory();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false
  // })
    localStorage.clear();
    history.push('/login');
    setAuth(false);
  };

  

 
  return (

    <div className={classes.root}>
   
    <CssBaseline />
    
     
       {/* <FormGroup> 
        <FormControlLabel
          control={
         <Switch 
              checked={auth}
               onChange={handleChange}
             aria-label="login switch"
             />
           }
           label={auth ? 'Login' : 'Logout'}
        /> 
      </FormGroup>  */}
      {/* {auth ? 'Logout' : 'Login'} */}
      <AppBar position="fixed"  className={classes.appBar}>
        <Toolbar>
          
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton> */}
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
          </Typography> 
          {auth && (
            
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{fontSize:15}}
                text={user}
                
               
              >
                
               <span> {user} </span>
                
              <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={ handleClose}>Logout</MenuItem>
              
              </Menu>
             
            </div>
            
          
          )}
           
        </Toolbar>
       
      </AppBar>
      <MyBreadcrumb />
      {/* <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            /> */}
    
    </div>
  );
}
