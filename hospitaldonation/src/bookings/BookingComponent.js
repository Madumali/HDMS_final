import React from "react";
import Box from '@mui/material/Box';
import {
    BrowserRouter as Router,
    Switch,
    Route,

  } from "react-router-dom";
  
  
  import { ThemeProvider } from '@material-ui/core/styles';
  import { createTheme } from '@material-ui/core/styles';
  import { useStyles } from "../components/Header/HeaderStyle";
//   import Protected from "../../Protected";
  import NavBar from "./NavBar";
  import AddBookings from "./pages/reserve/reservations/AddBookings";
  import Dates from "./pages/reserve/schedule/ReserveCalender";
  import ItemNeed from "./pages/reserve/ItemNeed";
  import BookSide from "./BookSide";
import Home from "./pages//Home";
import LogInD from "./pages/login/LogInD";
// import Protected from "./Protected";
import Donateus from "./pages/donateus/Donateus";
import SignUp from "./pages/signup/SignUp";
import ConfirmPage from "./pages/login/ConfirmPage";
import LoginSignup from "./pages/container/LoginSignup";
import MainPage from "./pages/reserve/mainpage/MainPage";
import BookingTable from "./pages/reserve/reservations/bookingdetails/BookingTable"
import Nav from "./Nav";
import Protected2 from "../Protected2";

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



 const BookingComponent =()=> {
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
    <ThemeProvider theme={theme}>

    <NavBar handleDrawerToggle = {handleDrawerToggle}/>
    {/* <Nav /> */}
    <BookSide mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleDrawerClose={handleDrawerClose}/>
    {/* route register */}
<Box className={classes.wrapper}>
    <Switch>
    {/* <Route exact path='/' component={(props)=> <Protected Cmp = {Dashboard} {...props}/>} /> */}
            {/* <Route exact path='/bookings/home' component={()=> <Home/>} />
            <Route exact path='/bookings/donate' component={()=> <Donateus/>} />
            <Route exact path='/bookings/main' component={()=> <LoginSignup/>} />
            <Route exact path='/bookings/signin' component={()=> <LogInD/>} />
            <Route exact path='/bookings/verify/:token_mail' component={()=> <ConfirmPage/>} />
            <Route exact path='/bookings/signup' component={()=> <SignUp/>} /> */}
            <Route exact path='/mainpage' component={(props)=><Protected2 Cmp ={MainPage}{...props}/>} />
            <Route exact path='/mainpage/mybookings' component={(props)=> <Protected2 Cmp ={BookingTable}{...props}/>} />
            <Route exact path='/mainpage/mydonations' component={(props)=><Protected2 Cmp ={AddBookings}{...props}/>} />

       </Switch>
      
</Box>


 {/* <CssBaseline />  */}
       </ThemeProvider>
       </>
   
   )
   
}
export default BookingComponent;