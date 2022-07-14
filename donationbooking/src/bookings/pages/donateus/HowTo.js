import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavBar from "../../NavBar";
import { Divider } from "@mui/material";
import { Container, Grid } from "@mui/material";
import Cards from "./Cards";
import donation from "../../../components/images/booking/don2.jpg";
import { useStyles } from "../../../components/BodyStyles";
import CircleIcon from '@mui/icons-material/Circle';

 const HowTo = () => {

    const classes = useStyles()
     return(
   
     <Container className={classes.container}>
         <Grid container spacing={1}>
             <Grid item xs={12} md={5}>

       
<img src={donation} className={classes.donImg} />


             </Grid>
             <Grid item xs={12} md={7}>
                 <Box
                  sx={{
                    marginTop:{ xs: 1, md:28},
                    marginLeft:{xs:2,md:20},
                   
                    padding:2,
                      width: { xs: 320,sm:650, md: 600 },
                      height: { xs: 300,sm:330, md: 400 },
                      border:"2px solid lightBlue",
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}>
                    <Typography variant="h2"  style={{ fontSize:"18px", textAlign:"center",color:"#009688"}}>
                    GENERAL GUIDELINES FOR DONATION
                    </Typography> <br/>
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
