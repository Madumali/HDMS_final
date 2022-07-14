import React, { useState, useEffect } from "react";
import Input from "../../../components/controls/Input";
import Controls from "../../../components/controls/Controls";
import { useForm } from "../../../components/useForm";
import { Form } from "../../../components/useForm";
import Grid from "@mui/material/Grid";
import { Box, makeStyles, Paper} from "@material-ui/core";
import bgimg from "../../../components/images/suwapeksha.jpg";
import { useStyles } from "../../../components/BodyStyles";
import * as bookingServices from "../../bookservice/bookingServices";
import Notification from "../../../components/Notification";

const useStyless = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage : `url(${bgimg})`,
    backgroundRepeat:'no-repeat',
    backgroundSize : 'cover',
    display:'flex',
    alighItems : 'center',
    justifyContent:'center'
  },
  paper: {
    backgroundColor: '#673ab7'
  }
}))

const initialFValues = {

    donor_password:"",
    email: "",
    cpassword:""
  };

const ForgetPw = (props) => {
    const classes = useStyles();
    const classess = useStyless();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
        if ("email" in fieldValues)
        {
          const emptyMail = fieldValues.email.length;
          const validEmail = /$^|.+@.+..+/.test(fieldValues.email);
          if (emptyMail === 0)
          {
            temp.email = "Email is required";
          } else if (!validEmail)
          {
            temp.email = "Email is not valid";
          } else {
            temp.email = "";
          }
        }
    if ("donor_password" in fieldValues)
    {
    const empty = fieldValues.donor_password.length;
    const upper = /[A-Z]/.test(fieldValues.donor_password);
    const intege = /[0-9]/.test(fieldValues.donor_password) ;
    const lenth =  /^[A-Za-z0-9]{7,13}$/.test(fieldValues.donor_password);
    if(empty===0){
      temp.donor_password = "Password is required"
    }
    else if(!upper)
    {
      temp.donor_password = "Password should contain at least one uppercase"
    } else if (!intege)
    {
      temp.donor_password = "Password should contain at least one integer"
    } else if(!lenth)
    {
      temp.donor_password = "Password should be between range 8-14"
    }else{
      temp.donor_password = ""
    }
    if ("cpassword" in fieldValues || "donor_password" in fieldValues)
    {

      const confrm = fieldValues.cpassword
      if ( confrm > 0)
      {
        if (fieldValues.cpassword !== fieldValues.donor_password )
          {
        temp.cpassword = "Confirm password is not matched";
          } else {
            temp.cpassword = "";
          }
      }
    }
    }
   
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
  useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("donors",values)
      addOrEdit(values, resetForm);
      
    }
   
  };

  const addOrEdit = (forget, resetForm) => {
    if(forget.email != null){
     bookingServices.ForgetPass(forget, forget.email )
         .then((data) =>  {
           console.log("bookdata",data)
           if (data.status == 200) {
             setNotify({
               isOpen: true,
               message: "Successfully updated",
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
 

    return( 
        <div className={classess.root}>
        <Box className = {classes.container} >
        <Paper className={classes.paper5}>
    <Form onSubmit={handleSubmit}>
      
     
           <Grid container spacing={0}>
           
             <Grid item  xs={12} md={12}>
               <Controls.Input
               variant="filled"
                 name="email"
                 label="Email"
                 type="email"
                 value={values.email}
                 onChange={handleInputChange}
                 error={errors.email}
               />
             </Grid>
             <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
               type="password"
                 label="Password"
                 name="donor_password"
                 value={values.donor_password}
                 onChange={handleInputChange}
                 error={errors.donor_password}
                 
               />
             </Grid>

             <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
               type="password"
                 label="Confirm Password"
                 name="cpassword"
                 value={values.cpassword}
                 onChange={handleInputChange}
                 error={errors.cpassword}
                 
               />
             </Grid>
             <Grid item  xs={12} md={12}>
             <Controls.Button type="submit" text="Submit" style={{marginRight:5}}/>
                 <Controls.Button
                   text="Reset"
                   color="default"
                   onClick={resetForm}
                 />
                    </Grid>
           </Grid>
         </Form>
         </Paper>
        </Box>
        <Notification  
    notify={notify}
    setNotify={setNotify}/>
        </div>
   );

}
export default ForgetPw;