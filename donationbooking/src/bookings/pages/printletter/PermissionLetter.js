import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useStyles } from "../../../components/BodyStyles";
import header from "../../../components/images/header1.jpg";
import hdmsLogo5 from "../../../components/images/hdms logo5.png";


 export const PermissionLetter = React.forwardRef((props, ref) => {

  let currentDateTime = Date().toLocaleString();
  const classes = useStyles();
 
  const [bookingData, setBookingData] = useState([]);
const currentdate = new Date();
const date = `${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()}`;



let name = localStorage.getItem("donorname");
let id = localStorage.getItem("print");


  useEffect(() => {
    getApprovedBooking();
  }, []);
  
  const getApprovedBooking = () => {

    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/bookings/forletterprint/"+id+"/"+name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
     
        if (data.msg == "No data available") {
    
        } else {
          const dataarray = [];
          for (const key in data) {
            const don = {
              id: key,
              ...data[key],
            };
            dataarray.push(don);
          }
      
          setBookingData(dataarray);
        
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



  return (
  
    <Box className={classes.printback}>
      
      <div ref={ref}>
      <Paper className={classes.paperStylepdf}>
      
        <Grid container spacing={0.5}>
         <Grid item md={6}>
         <img src={header} style = {{maxHeight:400, maxWidth: 790, margin: "auto  1px auto 4px"}}/>
         </Grid>
         <Grid item md={6}></Grid>
          
        </Grid>
        <Box sx={{ pl: 5, py: 1, pr: 2 }}>
        
          <Typography style={{ fontWeight: 600,textAlign: "center",marginTop:10 }}> Gate Pass For Donation </Typography>
          <Typography style={{ fontWeight: 600,textAlign: "center",marginTop:-20 }}>_______________________________</Typography>
          <Typography style={{
                fontSize: 14, marginTop: 20,fontWeight: 600
              }}>It is with immense gratitude we thank you for the thoughtful and Generous Gesture for the Donation to Apeksha Hospital.</Typography>
{bookingData.map((donor) => (
    <div key={donor.id} style={{marginLeft:110}}>
          <Typography  style={{ fontSize: 14,fontWeight: 600, marginTop: 30,textAlign: "center" }}>
            <Grid container spacing={1}>
            
              <Grid item xs={4} style={{ backgroundColor: "lightBlue", border:"1px solid lightBlue" }}>
           
                Donor Name{" "}
              </Grid>{" "}
             <Grid item xs={1}> - </Grid>
              <Grid item xs={4}  style={{ border:"1px solid lightBlue"  }}>
               
                {donor.donor_name}
              </Grid>
             
            </Grid>
          </Typography>
         
         <br/>
          
              <Typography style={{ textAlign: "center",fontSize: 14,fontWeight: 600 }}>
                <Grid container spacing={1}>
                <Grid item xs={4} style={{ backgroundColor: "lightBlue", border:"1px solid lightBlue" }}>
                   National Id
                  </Grid>{" "}
                  <Grid item xs={1}> - </Grid>
                  <Grid item xs={4} style={{  border:"1px solid lightBlue" }}>
                    {" "}
                   
                    {donor.national_id}
                  </Grid>
                  <Grid> </Grid>
                 
                </Grid>
                
              </Typography>

              <br/>
          
          <Typography style={{ textAlign: "center",fontSize: 14,fontWeight: 600 }}>
            <Grid container spacing={1}>
            <Grid item xs={4} style={{ backgroundColor: "lightBlue", border:"1px solid lightBlue" }}>
               Donation
              </Grid>{" "}
              <Grid item xs={1}> - </Grid>
              <Grid item xs={4} style={{  border:"1px solid lightBlue" }}>
                {" "}
               
                {donor.itemname}{" "}
              </Grid>
              <Grid> </Grid>
             
            </Grid>
            
          </Typography>

          <br/>
          
          <Typography style={{ textAlign: "center",fontSize: 14,fontWeight: 600 }}>
            <Grid container spacing={1}>
            <Grid item xs={4} style={{ backgroundColor: "lightBlue", border:"1px solid lightBlue" }}>
               Reserved Date
              </Grid>{" "}
              <Grid item xs={1}> - </Grid>
              <Grid item xs={4} style={{  border:"1px solid lightBlue" }}>
                {" "}
               
                {donor.reserved_date}{" "}
              </Grid>
              <Grid> </Grid>
             
            </Grid>
            
          </Typography>
         
            </div>
          ))}

<Typography style={{fontSize: 14, marginTop: 80, fontWeight: 600, textAlign:"left"}}>
________________<br/>
Cheked By <br/>
-------------------------------<br/>
(Name Of the security guard) <br/>
Apeksha Hospital-Maharagama.
</Typography>

<Grid container>
  <Grid item xs={12} sm={4} md={4} marginTop={20} fontFamily="helvetica" fontSize={10}>  {currentDateTime} </Grid>
  <Grid item xs={12} sm={4} md={4}><img src={hdmsLogo5} alt="this is car image" style = {{height:70, width: 200, margin: "30px auto", paddingBottom:0}}/></Grid>
  <Grid item xs={12} sm={4} md={4}></Grid>

</Grid>



        </Box>
      </Paper>
      </div>
    </Box>
    
  );
 
});
export default PermissionLetter;
