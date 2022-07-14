import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavBar from "../../NavBar";
import { Divider } from "@mui/material";
import { Container, Grid } from "@mui/material";
import Cards from "./Cards";
import donation from "../../../components/images/donation.jpg";
import { useStyles } from "../../../components/BodyStyles";
import CircleIcon from '@mui/icons-material/Circle';

 const HowTo = () => {

    const classes = useStyles()
     return(
   
     <Container className={classes.container}>
         <Grid container spacing={1}>
             <Grid item xs={12} md={6}>

             {/* <Cards
image={donation}
height={{ xs: "250px",sm:"300px", md: "450px" }}

main = "Please consider the following when you donate :"
/> */}
<img src={donation} />


             </Grid>
             <Grid item xs={12} md={6}>
                 <Box
                  sx={{
                    //  display: { xs: "block", md: "none" },
                    margin:{ xs: 4, md: 1},
                    padding:2,
                      width: { xs: 320,sm:500, md: 600 },
                      height: { xs: 450,sm:400, md: 300 },
                      border:"1px solid lightBlue",
                    //  / backgroundColor: 'primary.dark',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}>

<Typography variant="body2" color="text.secondary" style={{display:"flex", fontSize:"18px", textAlign:"center"}}>
Your donations are highly appreciated. 

        </Typography>
        <br/>

<Typography variant="body2" color="text.secondary" style={{display:"flex", fontSize:"18px"}}>
    <CircleIcon  sx={{marginRight:1, fontSize:"18px"}}/>
We accept donations only in the name of our institution. We currently do not accept any monetary donations.
        </Typography>
        <br/>
        <Typography variant="body2" color="text.secondary" style={{display:"flex", fontSize:"18px"}}>
    <CircleIcon fontSize="small" sx={{marginRight:1, fontSize:"18px"}}/>
    Bring your donations between 11.30 a.m. to 4.30 p.m. on weekdays and between 9.00 a.m. to 1.00 p.m. on weekends.
        </Typography>
        <br/>
        <Typography variant="body2" color="text.secondary" style={{display:"flex", fontSize:"18px"}}>
    <CircleIcon fontSize="small" sx={{marginRight:1, fontSize:"18px"}}/>
    Please use paper bags.
        </Typography>
        <br/>
        <Typography variant="body2" color="text.secondary" style={{display:"flex", fontSize:"18px"}}>
    <CircleIcon fontSize="small" sx={{marginRight:1, fontSize:"18px"}}/>
    During donations, do not take any photographs which might violate patient privacy.
        </Typography>
                 </Box>
             </Grid>

         </Grid>


 


</Container>
 
     );
 }
 export default HowTo;
