import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BookingTable from "../bookings/pages/reserve/reservations/bookingdetails/BookingTable";
import MainPage from "../bookings/pages/reserve/mainpage/MainPage";
import ConfirmPage from "../bookings/pages/login/ConfirmPage";
import Print from "../bookings/pages/printletter/Print";
import MyProfile from "../bookings/pages/donor/MyProfile";


const bookroutes = [
  {
    path: "/bookings/mainpage",
    displayName: "Dashboard",
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
    path: "/bookings/mainpage/mybookings/print",
    displayName: "",
    component: <div> <Print/>  </div>,

  },
  {
    path: "/bookings/verify/:token_mail",
    displayName: "",
    component: <div> <ConfirmPage/> </div>,
    // icon: <AdminPanelSettingsOutlinedIcon />,
  
  },
  {
    path: "/myprofile",
    displayName: "",
    component: <div> <MyProfile/>  </div>,

  },
];

export default bookroutes;