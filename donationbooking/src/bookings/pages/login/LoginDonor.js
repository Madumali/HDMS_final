import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, Container } from '@mui/material'
import { useStyles } from "../../../components/BodyStyles";
import Notification from "../../../components/Notification";
import Logo from "../../../components/Logo";
import Apeksha from "../../../components/Apeksha";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { isObject } from "lodash";
import { useHistory } from "react-router-dom";
import Controls from "../../../components/controls/Controls";

const LoginDonor = ({handleChange}) => {

const dispatch = useDispatch();
const history = useHistory();
const classes = useStyles();
const avatarStyle = { height:60, width:60, variant:"rounded"}
const btnstyle = { marginTop:"20px ", borderRadius:50 }
const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

 const initialValues = {
        email: '',
        donor_password: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('please enter valid email').required("Email is required"),
        donor_password: Yup.string().required("Password is required")
    })



    const onSubmit = (values, props) => {
        fetch("http://localhost:4000/bookings/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
        .then((response) => {
          if (response.status == 204) {
            alert("Success");
          }
          else {
            return response.json();
          }
        })
        .then(data => {
          console.log("Success:", data);
      if(data.status == 200)
      {
            localStorage.setItem("DonorisLoggedIn", true);
            localStorage.setItem("DonorauthToken", data.token);
            localStorage.setItem("donorname", data.donor_id);
            localStorage.setItem("Dname", data.donor_name);
          
            dispatch({type: "auth", authData: data});
            history.push("/bookings/mainpage");
          } else if(data.status == 400){
  
            setNotify({
              isOpen: true, 
              message: (data.msg),
              type: 'warning'
          })
          }
        })
      
        .catch((error) => {
         
          console.error("Error:", error);
        });
      setTimeout(() => {
          props.resetForm()
          props.setSubmitting(false)
      }, 2000)

  }

const donorid = localStorage.getItem("donorname");

    return( 

<Paper  className={classes.paper} >
      
      <Grid align='center' style={{marginTop:'2vh'}}>
        <Avatar style={avatarStyle}><Apeksha /></Avatar>
        <h2>Sign In</h2>
      </Grid>
            <Grid container  spacing={5}>
          <Grid item  xs={12} md={12} >
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
         
                    {(props) => (
                        <Form>
                            <Field as={Controls.Input} label='Username' name="email"
                            variant="outlined"
                            style={{marginBottom:"30px"}}
                                placeholder='Enter username' fullWidth 
                                helperText={<ErrorMessage name="email" color='red'/>}
                            />
                            <Field as={Controls.Input} label='Password' name="donor_password" variant="outlined" 
                                placeholder='Enter password' type='password' fullWidth 
                                helperText={<ErrorMessage name="donor_password" color='red'/>} />
                           
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
              
                </Formik>
                </Grid>
          <Grid item xs={12} md={12}>
           
            <Typography style={{fontWeight:600, marginBottom:5, textAlign:"center"}}>
                   <Link to={`/bookings/signin/id`} >
                      Forgot password ?
              </Link>
              </Typography>
              <Typography style={{fontWeight:600,  textAlign:"center"}}> Not registered ?
                   <Link  onClick={()=> handleChange("event",1)}>
                      Sign Up 
              </Link>
              </Typography>
          </Grid>
         
              
       
        <Grid item xs={12} md={12} align='center'>
          <Logo/>
         
        </Grid>
        </Grid>
      <Notification
              notify={notify}
              setNotify={setNotify}
          />
    </Paper>







    

     
          );
}

export default LoginDonor;