import React from "react";
import BookSide from "../BookSide";
import Nav from "../Nav";
import NavBar from "../NavBar";
import Box from '@mui/material/Box';
import {
    BrowserRouter as Router,
    Switch,
    Route,

  } from "react-router-dom";
  import MainPage from "./reserve/mainpage/MainPage";
  import BookingTable from "./reserve/reservations/bookingdetails/BookingTable";
  import AddBookings from "./reserve/reservations/AddBookings";
  import { useStyles } from "../../components/Header/HeaderStyle";
  import BookingComponent from "../BookingComponent";

 const Home = () => {
 
//     const classes = useStyles();


//     const [mobileOpen, setMobileOpen] = React.useState(false);

// const handleDrawerToggle = () => {
//  setMobileOpen(!mobileOpen);
// };
// const handleDrawerClose = () => {
//  setMobileOpen(false);
// }
    return(
    <>
        
        <NavBar/>
        <BookingComponent/>
        {/* <Nav handleDrawerToggle = {handleDrawerToggle}/> */}
    {/* <BookSide mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleDrawerClose={handleDrawerClose}/>
    {/* route register */}
{/* <Box className={classes.wrapper}>
    <Switch>  */}
  
            {/* <Route exact path='/bookings/home' component={()=> <Home/>} />
            <Route exact path='/bookings/donate' component={()=> <Donateus/>} />
            <Route exact path='/bookings/main' component={()=> <LoginSignup/>} />
            <Route exact path='/bookings/signin' component={()=> <LogInD/>} />
            <Route exact path='/bookings/verify/:token_mail' component={()=> <ConfirmPage/>} />
            <Route exact path='/bookings/signup' component={()=> <SignUp/>} /> */}
            {/* <Route exact path='/bookings/mainpage' component={()=> <MainPage/>} />
            <Route exact path='/bookings/mainpage/mybookings' component={()=> <BookingTable/>} />
            <Route exact path='/bookings/mainpage/mydonations' component={()=> <AddBookings/>} />

       </Switch>
      
</Box> */}

      </>
        );
}
export default Home;