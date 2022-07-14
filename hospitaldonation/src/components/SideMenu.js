
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Protected from '../Protected';
import Toolbar from '@mui/material/Toolbar';

import routes from "../utils/routes";
import LogoNci from "./LogoNci";
import ReactLogo from './ReactLogo';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Grid, InputBase, Badge} from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';

import SideSubMenu from './SideSubMenu';
import AddNewUsers from "../systemuser/newusers/AddNewUsers";
import Categories from "../category/Categories";
import Login from "../loginPage/Login";
import AddDonors from "../donors/adddorors/AddDonors";
import AddDonation from "../donation/newdonation/AddDonation";
import AddItem from "../items/AddItem";
import AddRequired from "../required/AddRequired";
import AddIssuance from "../issuance/AddIssuance";
import CurrentDonation from "../donation/newdonation/CurrentDonation";
import Print from "../donation/newdonation/Print";
import DonationList from '../donation/alldonation/DonationList';
// import MAppBar from "../components/MAppBar";
// import { makeStyles, withStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  useHistory
} from "react-router-dom";

import Collapse from '@mui/material/Collapse';
import { useDispatch } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MAppBar from './MAppBar';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

  
// import AddNewUsers from "../systemuser/newusers/AddNewUsers";
const drawerWidth = 240;
const style =  {
        sideMenu: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: '0px',
            width: '239px',
            height: '100%',
            textDecoration: 'none',
            background:'',
            color:'black',

            '&.hover':{
              background:"#252831"
                      }
        },
        
        a: {
      textDecoration: 'none'
        },
          grid: {
          flexDirection:"row",
          display:"flex",
          justifyContent:"flex-end",


        },
        
      
        }
        console.log("routes",routes);
export const SideMenu = (props) => {

  const [open, setOpen] = React.useState(true);
  const [subnav, setSubnav] = React.useState(false);

  const showSubnav = ()=> setSubnav(!subnav)
  

  const handleClick = () => setOpen(!open);
  

  let user = localStorage.getItem("name");

  const drawerWidth = 240;
  const history = useHistory();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  
    const { classes } = props;
  const { window } = props;
 
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // const handleChange = (event,reason) => {
  //   setAuth(event.target.checked);
  //   if (reason === 'clickaway') {
  //     return;
  // }
  // setAuth(true);
  // };
  const handleMenu = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
   
    localStorage.clear();
    history.push('/login');
   
  };

  const handleClosemenu = () => {
    setAnchorEl(null);
   
  };
  



  const drawer = (
    <div >
      <LogoNci />
      <Toolbar />
      
      <Divider />
     
      {/* <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
        {routes.map((item, index) => {
            <Link to = {item.path} style={{textDecoration:"none", color:"#616161"}}>
        
          {/* <SideSubMenu key = {index} item = {item} />  */}
          {/* </Link> */}
        
           {/* })}
       </List>  */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

 

  return (

      <Router> 
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
           <MailIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
          </Typography>
          {auth && (

            <>
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
                onClose={handleClosemenu}
              >
             
              <MenuItem onClick={handleClosemenu}>{user}</MenuItem>
               <MenuItem onClick={ handleClose}>Logout</MenuItem>
               
              </Menu>
             
            </>
          )}
           <ReactLogo />
        </Toolbar>
        
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
          style={{overflowY:'scroll', overflowX:'hidden'}}
        >
          {drawer}
          {routes.map((item, index) => {
          return <SideSubMenu key = {index} item = {item} />
          })}
        </Drawer>

      
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        <Toolbar />
   

        <Switch>
        <Route exact path='/login' component={()=><Login/>} />
        <Route exact path='/system-user' component={(props)=> <Protected Cmp = {AddNewUsers} {...props}/>} />
        <Route exact path='/system-user/addnew' component={()=> <AddNewUsers/>} />
        <Route exact path='/system-user/userlist' component={()=> <AddNewUsers/>} />
        <Route exact path='/items' component={()=> <AddItem />} />
        <Route exact path='/items/category' component={()=> <Categories />} />
        <Route exact path='/items/items' component={()=> <AddItem />} />
        <Route exact path='/donations/list' component={()=> <DonationList/>} />
        {/* <Route exact path='/items' component={(props)=> <Protected Cmp = { AddItem } {...props}/>} /> */}

        {routes.map((item,index) => {
            // const Component = item.component;
           return(
              <Route key = { index } path = {item.path} >
              {item.component}  
            </Route>
           );
          
           })} 
{/* {item.subNav.map((item, index)=> {
              <Route key = { index } path = {item.path} >
                  {item.component}
                  </Route> 
              })}  */}
             
        </Switch>
        {/* <Switch>
         

          {routes.map((item, index) => {
            const Component = item.component;

         
            return (
              
              <Route key = { index } path = {item.path} >
              {item.component} 
            </Route>
            );
          })}

        </Switch> */}
      </Box>
    </Box>
    </Router> 
  );
}

// export default SideMenu;

SideMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};









/* <ListItemButton key={index} >
            <ListItemIcon style={{color:"#616161"}}>
              {item.icon}
            </ListItemIcon>
            
            <ListItemText  primary={item.displayName}  />
            {
              item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null

            }
          </ListItemButton> */