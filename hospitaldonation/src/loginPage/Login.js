import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { isObject } from "lodash";
import { useHistory } from "react-router-dom";
import Logo from "../components/Logo";
import Apeksha from "../components/Apeksha";
import Notification from "../components/Notification";
import { makeStyles} from "@material-ui/core";
import bgimg from "../components/images/suwapeksha.jpg";
import {useForm, Form} from "../components/useForm";
import Controls from '../components/controls/Controls';



const useStyles = makeStyles((theme) => ({
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
  username: '',
  user_password: '',
  
}




const Login = () => {
const classes = useStyles();
  const paperStyle = { padding: 20, height: '70%', width: 370, margin: "90px auto",backgroundColor: '#ffffff95' }
  const avatarStyle = { height:60, width:60, variant:"rounded"}
  const btnstyle = { margin: '8px 0', borderRadius:10 }


  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [user_password, setUserPass] = useState("");
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const history = useHistory();
  

   //const required = (value) => (value ? undefined : "Required");
   const validate = (fieldValues = values) => {
    let temp = { ...errors };

        if ("username" in fieldValues)
        temp.username = fieldValues.username.length !=0 
          ? ""
          : "User name is Required.";
        
        if ("user_password" in fieldValues)
        temp.user_password = fieldValues.user_password.length !=0 
          ? ""
          : "User Password is Required.";
        

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
      userLogin(values, resetForm);
      
    }
  };

  const userLogin = (user, resetForm) => {

    fetch("http://localhost:4000/system-user/authenticate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
        console.log("is object",isObject(data))
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("name", data.user_full_name);
        localStorage.setItem("userrole", data.user_role);
        localStorage.setItem("id", data.uid);
        dispatch({type: "auth", authData: data});
        history.push("/");
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
  
};
 return (
    <div className={ classes.root}>

    <Grid>
      <Paper elevation={10} style={paperStyle}>
      
        <Grid align='center' style={{marginTop:'5vh'}}>
          <Avatar style={avatarStyle}><Apeksha /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        {/* <Box
          sx={{
            width: 360,
            height: 370,
            bgcolor: 'white',
            '&:hover': {
              // backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          
        >   */}
        
        <Form onSubmit={handleSubmit}>
      
               <Grid container direction={"column"} spacing={5}>
            <Grid item >
            <Controls.Input
           type="text"
             name="username"
             label="Username"
             value={values.username}
             onChange={handleInputChange}
             error={errors.username}
             style={{width:350}}
           />
            <Controls.Input
           type='password'
             name="user_password"
             label="Password"
             value={values.user_password}
             onChange={handleInputChange}
             error={errors.user_password}
             style={{width:350}}
           />
              {/* <TextField label='Username' placeholder='Enter username'
              onChange = {(e) => setUserName(e.target.value)}
              fullWidth required 
              inputProps={{style: {textTransform: "uppercase"}}}/> */}
            {/* </Grid>
            <Grid item >
              <TextField label='Password' placeholder='Enter password'
              onChange= {(e) => setUserPass(e.target.value)}
              type='password' fullWidth required 
              inputProps={{style: {textTransform: "uppercase"}}}
              /> */}
            </Grid>
            {/* <FormControlLabel */}
            {/* // control={ */}
            {/* //     <Checkbox */}
            {/* //         name="checkedB"
                //         color="primary"
                //     />
                //     }
                //     label="Remember me"
                //  /> */}
            <Grid item >
              <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            </Grid>
            {/* <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography> */}
                
          </Grid>
          </Form>
          <Grid align='center'>
          <Logo/>
         
        </Grid>
        {/* </Box> */}
        <Notification
                notify={notify}
                setNotify={setNotify}
            />
      </Paper>
    </Grid>
    </div>
  )
}

export default Login;