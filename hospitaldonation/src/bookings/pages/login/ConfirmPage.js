import React, { useState, useEffect }  from "react";
import { Link, useParams } from "react-router-dom";
import vid from "../../../components/images/video/Star - 6962.mp4";
import Box from '@mui/material/Box';
import { Grid, Paper, Avatar, TextField, Button, Typography, Container } from '@mui/material';
import { useStyles } from "../../../components/BodyStyles";

const ConfirmPage = () => {
    let { token_mail } = useParams();
    const [confirmation, setConfirmation] = useState();
    const [display, setDisplay] = useState(true);
    const classes = useStyles();

    const VerifyDonor = () =>{
        console.log(token_mail, 'email token');
        const token = localStorage.getItem('authToken');
        fetch("http://localhost:4000/bookings/verify/"+ token_mail,
        {
          method: "GET",
          headers:  {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        })
        .then((response) => {
          console.log(response)
          return response.json()
         
        }) 
            .then(data => {
              console.log("this is data",data);
                if(data.statusTxt == "true")
                {
                  setDisplay(false);
                    setConfirmation(data.msg);
                } 
        
                // setUserData(dataarray);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
      
      }
      useEffect(()=>{
        VerifyDonor()
      }, []);

      return(
          <>
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
        
        <Paper className={classes.paper4}>
          <Box>
          {display ?<Typography variant="h2" >
    Your Email Has Been Verified.
 
  <Link to="/bookings/signin"> Login </Link> Here
</Typography> : <Typography variant="h2" >
    {confirmation}
  <Link to="/bookings/main"> Login </Link> Here
</Typography>}
          </Box>
         
        </Paper>
        
        
        </>
      );
}
export default ConfirmPage