
import React, { useEffect, useState } from "react";
import SignUpDonorForm from "./SignUpDonorForm";
import { Paper } from "@mui/material";
import Notification from "../../../components/Notification";
import { useStyles } from "../../../components/BodyStyles";
import * as bookingServices from "../../bookservice/bookingServices";


const SignUp = () => {
  const classes = useStyles();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })




 

  const addOrEdit = (book, resetForm) => {
   if(book.donor_id == null){
    bookingServices.insertDonor("http://localhost:4000/bookings/signup",book )
        .then((data) =>  {
          console.log("bookdata",data)
          if (data.status == 200) {
            setNotify({
              isOpen: true,
              message: "Sign Up Success.Please check your email to verify email",
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

    resetForm()
  } 
   
    

  }

  


  return (
  

 <>
<Paper className={classes.paper3}>
     
        <SignUpDonorForm addOrEdit = {addOrEdit} />
        <Notification
          notify={notify}
          setNotify={setNotify} />  
        </Paper>
        
  
</>
  
  );
};
export default SignUp;