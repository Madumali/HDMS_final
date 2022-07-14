import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddNewUsers from "../systemuser/newusers/AddNewUsers";
import Category from "../category/Categories";
import Login from "../loginPage/Login";
import AddDonors from "../donors/adddorors/AddDonors";
import AddDonation from "../donation/newdonation/AddDonation";
import AddItem from "../items/AddItem";
import AddRequired from "../required/AddRequired";
import AddIssuance from "../issuance/AddIssuance";
import CurrentDonation from "../donation/newdonation/CurrentDonation";
import Print from "../donation/newdonation/Print";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import DonationList from "../donation/alldonation/DonationList";
import Dashboard from "../dashboard/Dashboard";
import Inventory from "../inventory/Inventory";
import AllUsers from "../systemuser/allusers/AllUsers";
import BookingTable from "../bookings/pages/reserve/reservations/bookingdetails/BookingTable";
import MainPage from "../bookings/pages/reserve/mainpage/MainPage";
//   if(isLoggedIn === 'null'){
//   return <Redirect from="/" to="/login" />
//   }


const bookroutes = [
  {
    path: "/bookings/mainpage",
    displayName: "dashboard",
    component: <div> <MainPage/>  </div>,
    icon: <DashboardOutlinedIcon />,
  },
  {
    path: "/bookings/mainpage/mybookings",
    displayName: "My Bookings",
    component: <div> <BookingTable/>  </div>,
    icon: <DashboardOutlinedIcon />,
  },
  {
    path: "/bookings/mainpage/mydonations",
    displayName: "My Donations",
    component: <div>  </div>,
    icon: <AdminPanelSettingsOutlinedIcon />,
  
  },
];

export default bookroutes;