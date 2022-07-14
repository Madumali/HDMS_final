import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import NavBar from "../../../NavBar";
import { useStyles } from "../../../../components/BodyStyles";
import AddBookings from "../reservations/AddBookings";
import Dates from "../schedule/ReserveCalender";
import ItemNeed from "../ItemNeed";
import BookSide from "../../../BookSide";
import BookingTable from "../reservations/bookingdetails/BookingTable";


const MainPage = () => {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const handleDrawerClose = () => {
      setMobileOpen(false);
    };
    




    return(
    <Box className={classes.container}>
       {/* <NavBar handleDrawerToggle={handleDrawerToggle}/> */}
  
        <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
        {/* <BookSide mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleDrawerClose={handleDrawerClose}/> */}

        </Grid>

        <Grid item xs={12} md={2}>
            {/* <Paper style={{ height:550, margin:"0 auto", paddingTop:"30px"}}> */}
                <ItemNeed/>
            {/* </Paper> */}
        </Grid>
        {/* backgroundColor:"#7fffd4", */}
        <Grid item xs={12} md={5}>
        <Paper style={{margin:"0px auto"}}>
            <AddBookings/> 
        </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
        <Paper style={{ paddingLeft: 30, paddingBottom:10}}>
            <Dates/>
        </Paper>
        </Grid>

        </Grid>
        <BookingTable/>
    </Box>);
}
export default MainPage;