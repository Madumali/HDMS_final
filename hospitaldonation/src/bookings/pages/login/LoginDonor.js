import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import NavBar from "../../NavBar";
// import { Divider} from "@material-ui/core";
import { Grid, Paper, Avatar, TextField, Button, Typography, Container } from '@mui/material'
import { useStyles } from "../../../components/BodyStyles";
import Notification from "../../../components/Notification";
import Logo from "../../../components/Logo";
import Apeksha from "../../../components/Apeksha";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from "react-redux";
import { isObject } from "lodash";
import { useHistory } from "react-router-dom";

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
        email: Yup.string().email('please enter valid email').required("Required"),
        donor_password: Yup.string().required("Required")
    })



    const onSubmit = (values, props) => {
        // const data = {username: username, user_password: user_password};
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
          console.log("Success:", data.token);
          if(isObject(data))
          {
            localStorage.setItem("DonorisLoggedIn", true);
            localStorage.setItem("DonorauthToken", data.token);
            localStorage.setItem("donorname", data.donor_id);
            localStorage.setItem("Dname", data.donor_name);
          
            dispatch({type: "auth", authData: data});
            history.push("/mainpage");
          } else {
            // alert (data);
           
            setNotify({
              isOpen: true, 
              message: (data),
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
                            <Field as={TextField} label='Username' name="email"
                            variant="outlined"
                            style={{marginBottom:"30px"}}
                                placeholder='Enter username' fullWidth required
                                helperText={<ErrorMessage name="email" color='#b71c1c'/>}
                            />
                            <Field as={TextField} label='Password' name="donor_password" variant="outlined" 
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="donor_password" color='#b71c1c'/>} />
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
              
                </Formik>
                </Grid>
          <Grid item xs={12} md={12}>
            {/* <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth >Sign in</Button> */}
            <Typography style={{fontWeight:600, marginBottom:5, textAlign:"center"}}>
                   <Link href="#" >
                      Forgot password ?
              </Link>
              </Typography>
              <Typography style={{fontWeight:600,  textAlign:"center"}}> Not registered ?
                   <Link to ="#" onClick={()=> handleChange("event",1)}>
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