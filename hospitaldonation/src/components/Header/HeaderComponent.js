import React from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Box from '@mui/material/Box';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  
  import AddNewUsers from "../../systemuser/newusers/AddNewUsers";
  import Categories from "../../category/Categories";
  import AddDonors from "../../donors/adddorors/AddDonors";
  import AddDonation from "../../donation/newdonation/AddDonation";
  import AddItem from "../../items/AddItem";
  import AddRequired from "../../required/AddRequired";
  import AddIssuance from "../../issuance/AddIssuance";
  import CurrentDonation from "../../donation/newdonation/CurrentDonation";
  import Print from "../../donation/newdonation/Print";
  import DonationList from '../../donation/alldonation/DonationList';
  import Inventory from "../../inventory/Inventory";
  import { createTheme } from '@material-ui/core/styles';
  import { useStyles } from "./HeaderStyle";
  import Protected from "../../Protected";
import Dashboard from "../../dashboard/Dashboard";
import AllUsers from "../../systemuser/allusers/AllUsers";
import AllDonor from "../../donors/alldonors/AllDonor";
import MyBreadcrumb from "../MyBreadcrumb";
import SingleUser from "../../systemuser/allusers/SingleUser";
import ReportsMain from "../../reports/ReportsMain";
import DonorReports from "../../reports/donordetail/DonorReports";
import BloodDonorsReport from "../../reports/donordetail/BloodDonorsReport";
import DonationReports from "../../reports/itemDonation/DonationReports";
import RequestsReports from "../../reports/itemDonation/RequestsReports";
import BackupDonor from "../../backups/donorBackup/BackupDonor"
import BackupDonation from "../../backups/donationBackup/BackupDonation";
import BackupIssue from "../../backups/donIssueBackup/BackupIssue";
import IssueList from "../../issuance/IssueList";
import RequestList from "../../required/RequestList";
import RequireForEach from "../../required/RequireForEach";
import MyCalendar from "../../reservation/Progress";
import Approve from "../../reservation/approval/Approve";
import Print2 from "../../reservation/Print2";

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
     <Navbar handleDrawerToggle={handleDrawerToggle}/>
     <SideNav mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleDrawerClose={handleDrawerClose}/>
    
<Box className={classes.wrapper}>
  <div style={{marginLeft:1150,marginTop:4}}>
  <MyBreadcrumb />
  </div>
     <Switch>
        <Route exact path='/' component={(props)=> <Protected Cmp = {Dashboard} {...props}/>} />
        <Route exact path='/user' component={(props)=> <Protected Cmp = {AddNewUsers} {...props}/>} />
        <Route exact path='/user/addnew' component={(props)=> <Protected Cmp = {AddNewUsers} {...props}/>} />
        <Route exact path='/user/list' component={(props)=> <Protected Cmp = {AllUsers} {...props}/>} />
        <Route exact path='/user/list/:id' component={(props)=> <Protected Cmp = {SingleUser} {...props}/>} />
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
        <Route exact path='/requires/list' component={(props)=> <Protected Cmp = {RequestList} {...props}/>} />
        <Route exact path='/requires/mylist' component={(props)=> <Protected Cmp = {RequireForEach} {...props}/>} />
        <Route exact path='/issuance' component={(props)=> <Protected Cmp = {AddIssuance} {...props}/>} />
        <Route exact path='/issuance/list' component={(props)=> <Protected Cmp = {IssueList} {...props}/>} />
        <Route exact path='/inventory' component={(props)=> <Protected Cmp = {Inventory} {...props}/>} />
        <Route exact path='/print' component={(props)=> <Protected Cmp = {Print} {...props}/>} />
        <Route exact path='/printletter' component={(props)=> <Protected Cmp = {Print2} {...props}/>} />
        <Route exact path='/current' component={(props)=> <Protected Cmp = {CurrentDonation} {...props}/>} />
        <Route exact path='/reports' component={(props)=> <Protected Cmp = {ReportsMain} {...props}/>} />
        <Route exact path='/reports/donor' component={(props)=> <Protected Cmp = {DonorReports} {...props}/>} />
        <Route exact path='/reports/blooddonors' component={(props)=> <Protected Cmp = {BloodDonorsReport} {...props}/>} />
        <Route exact path='/reports/donations' component={(props)=> <Protected Cmp = {DonationReports} {...props}/>} />
        <Route exact path='/reports/needs' component={(props)=> <Protected Cmp = {RequestsReports} {...props}/>} />
        <Route exact path='/backup' component={(props)=> <Protected Cmp = {BackupDonor} {...props}/>} />
        <Route exact path='/backup/donors' component={(props)=> <Protected Cmp = {BackupDonor} {...props}/>} />
        <Route exact path='/backup/donation' component={(props)=> <Protected Cmp = {BackupDonation} {...props}/>} />
        <Route exact path='/backup/issue' component={(props)=> <Protected Cmp = {BackupIssue} {...props}/>} />
        <Route exact path='/reserve' component={(props)=> <Protected Cmp = {MyCalendar} {...props}/>} />
        <Route exact path='/reserve/approvallist' component={(props)=> <Protected Cmp = {Approve} {...props}/>} />



        
             
        </Switch>
       
</Box>

        </>
    
    )
    
 }
 export default HeaderComponent;