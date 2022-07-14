
import React, { useState } from "react";
import SignUpDonorForm from "./SignUpDonorForm";
import { Paper, Box, Grid } from "@mui/material";
import Notification from "../../../components/Notification";
import Controls from "../../../components/controls/Controls";
import {Link, useHistory} from "react-router-dom";
import { useStyles } from "../../../components/BodyStyles";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import vid from "../../../components/images/video/Star - 6962.mp4";
import Cards from "../donateus/Cards";
import donation from "../../../components/images/donation.jpg"
import * as bookingServices from "../../bookservice/bookingServices";


const SignUp = () => {
  const classes = useStyles();
  const [check, setCheck] = useState(false);
  const [records, setRecords] = useState();
  const [response, setResponse] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const history = useHistory();


  const addOrEdit = (book, resetForm) => {
   if(book.donor_id == null){
    bookingServices.insertDonor("http://localhost:4000/bookings/signup",book )
        .then((data) =>  {
          if (data.status == 200) {
            setNotify({
              isOpen: true,
              message: "Successfully Added",
              type: "success",
            });
           
          } else if (data.status == 400) {
            setNotify({
              isOpen: true,
              message: "Something Wrong!",
              type: "warning",
            });
          }
            })
    .catch((error) => {
      console.error("Error:", error);
    });
  } else
//   setNotify({
//     isOpen: true,
//     message: "Something Wrong!",
//     type: "warning",
//   });
    resetForm()
    
//     setRecords()
  }

  


  return (
  
    /* <Box className={classes.section} style={{marginTop:3}} > */
        /* <video loop autoPlay style={{
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
        </video> */
    /* <Grid container spacing={1}>
<Grid item xs={12} md={5}>
    <Cards image={donation}
height={{ xs: "250px",sm:"300px", md: "450px" }} />
</Grid>
<Grid item xs={12} md={7}> */
 
<Paper className={classes.paper3}>
     
        <SignUpDonorForm addOrEdit = {addOrEdit} />
        <Notification
          notify={notify}
          setNotify={setNotify} /> 
           <Typography style={{fontWeight:600, marginBottom:10, textAlign:"center"}}> If You are a Group Or Company {" "} 
                   <Link to ="/bookings/signupteam" target={"_blank"}>
                      Sign Up 
              </Link>
            {"  "}  Here
              </Typography>
        </Paper>


  

  
  );
};
export default SignUp;