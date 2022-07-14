import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import { useStyles } from "../../../../components/BodyStyles";
import AddBookings from "../reservations/AddBookings";
import Dates from "../schedule/ReserveCalender";
import ItemNeed from "../ItemNeed";

import { Divider, Typography } from "@material-ui/core";


const MainPage = () => {
    const classes = useStyles();



    return(
    <Box className={classes.container}>
      
  
        <Grid container spacing={1}>
       
        <Grid item xs={12} md={5} marginLeft={2}>
        <Paper style={{margin:"0px auto"}}>
        <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:5, textAlign : "center"}}>
            Reservation Form
             </Typography>
            <Divider />
            <AddBookings/> 
        </Paper>
                
          
        </Grid>
   
        <Grid item xs={12} md={3} marginLeft={2}>
        <ItemNeed/>
        </Grid>

        <Grid item xs={12} md={3} marginLeft={2}>
        <Paper style={{width:380, paddingBottom:10, paddingLeft:10, marginTop:-12}}>
            <Dates/>
        </Paper>
        </Grid>

        </Grid>
   
    </Box>);
}
export default MainPage;