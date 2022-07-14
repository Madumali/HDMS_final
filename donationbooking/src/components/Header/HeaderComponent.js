import React from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import routes from"../../utils/routes";
import Box from '@mui/material/Box';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
    Link,
    useHistory
  } from "react-router-dom";
  
  import AddNewUsers from "../../systemuser/newusers/AddNewUsers";
  import Categories from "../../category/Categories";
  import Login from "../../loginPage/Login";
  import AddDonors from "../../donors/adddorors/AddDonors";
  import AddDonation from "../../donation/newdonation/AddDonation";
  import AddItem from "../../items/AddItem";
  import AddRequired from "../../required/AddRequired";
  import AddIssuance from "../../issuance/AddIssuance";
  import CurrentDonation from "../../donation/newdonation/CurrentDonation";
  import Print from "../../donation/newdonation/Print";
  import DonationList from '../../donation/alldonation/DonationList';
  import Inventory from "../../inventory/Inventory";
  import { ThemeProvider } from '@material-ui/core/styles';
  import { createTheme } from '@material-ui/core/styles';
  import { useStyles } from "./HeaderStyle";
  import Protected from "../../Protected";
import Dashboard from "../../dashboard/Dashboard";
import AllUsers from "../../systemuser/allusers/AllUsers";
import AllDonor from "../../donors/alldonors/AllDonor";
import {CssBaseline} from '@material-ui/core';

  const theme = createTheme({
      palette: {
        primary: {
          main: "#2196F3",
          light: '#E3F2FD',
          200:'#90CAF9',
      mainp: "#333996",
      lightp: '#3c44b126'
        },
        secondary: {
          main: "#673ab7",
          light: '#ede7f6',
      mains: "#f83245",
      lights: '#f8324526'
        },
        warning: {
          main: "#b9f6ca",
          light: "#ffe57f"
        },
        default:"#ffffff",
        error: {
          main: "#f44336",
          light: "#ef9a9a"
        },
        background: {
          default: "#f4f5fd"
        },
      },
      // #b9f6ca
      // #ffe57f
      overrides:{
        MuiAppBar:{
          root:{
            transform:'translateZ(0)'
          }
        }
      },
      props:{
        MuiIconButton:{
          disableRipple:true
        }
      }
    })



 const HeaderComponent =()=> {
     const classes = useStyles()


     const [mobileOpen, setMobileOpen] = React.useState(false);

const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
};
const handleDrawerClose = () => {
  setMobileOpen(false);
};

     
     return(
     <>
       {/* <Router> */}
     {/* <ThemeProvider theme={theme}> */}
     {/* <Route exact path='/login' component={()=><Login/>} /> */}
     <Navbar handleDrawerToggle={handleDrawerToggle}/>
     <SideNav mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleDrawerClose={handleDrawerClose}/>
    
<Box className={classes.wrapper}>
     <Switch>
        <Route exact path='/' component={(props)=> <Protected Cmp = {Dashboard} {...props}/>} />
        <Route exact path='/system-user' component={(props)=> <Protected Cmp = {AddNewUsers} {...props}/>} />
        <Route exact path='/system-user/addnew' component={(props)=> <Protected Cmp = {AddNewUsers} {...props}/>} />
        <Route exact path='/system-user/userlist' component={(props)=> <Protected Cmp = {AllUsers} {...props}/>} />
        <Route exact path='/items' component={(props)=> <Protected Cmp = {AddItem } {...props}/>} />
        <Route exact path='/items/category' component={(props)=> <Protected Cmp = {Categories } {...props}/>} />
        <Route exact path='/items/items' component={(props)=> <Protected Cmp = {AddItem } {...props}/>} />
        <Route exact path='/donations/list' component={(props)=> <Protected Cmp = {DonationList} {...props}/>} />
        <Route exact path='/dashboard' component={(props)=> <Protected Cmp = {Dashboard} {...props}/>} />
        <Route exact path='/donors' component={(props)=> <Protected Cmp = {AddDonors} {...props}/>} />
        <Route exact path='/donors/list' component={(props)=> <Protected Cmp = {AllDonor} {...props}/>} />
        <Route exact path='/donations' component={(props)=> <Protected Cmp = {AddDonation} {...props}/>} />
        {/* <Route exact path='/donors/all/:id' component={()=> <AddDonation/>} /> */}
        <Route exact path='/donations/list' component={(props)=> <Protected Cmp = {DonationList} {...props}/>} />
        <Route exact path='/requires' component={(props)=> <Protected Cmp = {AddRequired} {...props}/>} />
        <Route exact path='/issuance' component={(props)=> <Protected Cmp = {AddIssuance} {...props}/>} />
        <Route exact path='/inventory' component={(props)=> <Protected Cmp = {Inventory} {...props}/>} />
        <Route exact path='/print' component={(props)=> <Protected Cmp = {Print} {...props}/>} />
        <Route exact path='/current' component={(props)=> <Protected Cmp = {CurrentDonation} {...props}/>} />
      
        {/* <Route exact path='/items' component={(props)=> <Protected Cmp = { AddItem } {...props}/>} /> */}


        {/* {routes.map((item,index) => {
                const roleName = localStorage.getItem('userrole');
               if (!item.roles || (item.roles && item.roles.findIndex((el) => el === roleName) > -1)) {
           return(
              <Route key = { index } path = {item.path} >
             {(props)=> <Protected Cmp = {item.component}  {...item.roles}/>}
            </Route>
           );
           }
           })}  */}
{/* {item.subNav.map((item, index)=> {
              <Route key = { index } path = {item.path} >
                  {item.component}
                  </Route> 
              })}  */}
             
        </Switch>
       
</Box>
{/* </Router> */}
        {/* <CssBaseline /> */}
        {/* </ThemeProvider> */}
        </>
    
    )
    
 }
 export default HeaderComponent;