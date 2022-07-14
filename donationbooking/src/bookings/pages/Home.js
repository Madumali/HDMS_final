import React from "react";
import BookSide from "../BookSide";
import Nav2 from "../Nav2";
// import NavBar from "../NavBar";
import { Box, Grid, Typography } from "@material-ui/core";
import baby from "../../components/images/booking/don.jpg"
import vid from "../../components/images/booking/space.mp4";
import { useStyles } from "../../components/BodyStyles";
import apeksha from "../../components/images/booking/apeksh.jpg"
import don from "../../components/images/booking/don.jpg"
import don2 from "../../components/images/booking/don2.jpg"
import razavi2 from "../../components/images/booking/razavi2.webp"

 const Home = () => {
const classes = useStyles();
    return(
        <div >
      <video loop autoPlay style={{
                position:"absolute",
                width:"100%",
                height:"100%",
                top:"50%",
                left:"50%",
                objectFit:"cover",
                transform:"translate(-50%, -50%)",
                zIndex:"-1"
            }} >
            <source src={vid} type="video/mp4" />
        </video>
        <Nav2/>
        
   <Grid container spacing={1} >
       <Grid item xs={4} sm={6} md={12}>
              <img src={razavi2 } className={classes.apeImg}/>
              </Grid>
              <Grid item xs={4} sm={6} md={12}>
              <Box
                  sx={{
                    marginTop:{ xs: 2, md:-1.5},
                    marginLeft:{xs:2,md:0},
                   
                    padding:2,
                      width: { xs: 320,sm:400, md: 1700 },
                      height: { xs: 450,sm:400, md:150 },
                      border:"1px solid lightBlue",
                      backgroundColor: '#ffffff95',
                      '&:hover': {
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}>

<Typography variant="h2"  style={{fontSize:"60px", textAlign:"center",color:"#304ffe"}}>
Welcome To National Cancer Institute Sri Lanka

        </Typography>
        
        <Typography variant="body2" color="text.secondary" style={{ fontSize:"18px",textAlign:"center"}}>
 
        The National Cancer Institute (NCI) is the leading tertiary hospital for cancer treatment in Sri Lanka, which is offering high quality cancer care with dedicated team of healthcare professionals
        </Typography>
        </Box>
        </Grid>
      
       
       {/* <Grid item xs={4} sm={6} md={12}>
              </Grid>
              <img src={baby} className={classes.babyImg}/> */}
   </Grid>

      </div>
        );
}
export default Home;